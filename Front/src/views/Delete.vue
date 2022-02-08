<template>
  <v-container>
    <v-alert v-if="error" type="error">
      {{ errorMsg }}
    </v-alert>
    <v-alert v-if="success" type="success">
      {{ successMsg }}
    </v-alert>

    <v-data-table
      :headers="headers"
      :items="pokemons"
      :items-per-page="20"
      class="elevation-1"
    >
      <template v-slot:item.img_url="{ item }">
        <v-img max-width="100" :aspect-ratio="16/9" :src="item.img_url"></v-img>
      </template>

      <template v-slot:item.id="{ item }">
        <div class="text-center">
          <v-btn rounded fab small color="error" @click="send(item.id)">
            <v-icon> mdi-minus </v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      headers: [
        {
          text: "Image",
          value: "img_url",
        },
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Delete",
          value: "id",
          align: "center"
        },
      ],
      pokemons: [],
      error: false,
      success: false,
      errorMsg: "",
      successMsg: "",
    };
  },

  methods: {
    launchError(msg) {
      let self = this;
      this.error = true;
      this.errorMsg = msg;
      setTimeout(() => {
        self.error = false;
        self.errorMsg = "";
      }, 5000);
    },

    launchSuccess(msg) {
      let self = this;
      this.success = true;
      this.successMsg = msg;
      setTimeout(() => {
        self.success = false;
        self.successMsg = "";
      }, 5000);
    },

    async send(id) {
      console.log("Trying to edit %d", id);
      for (let i in this.pokemons) {
        if (this.pokemons[i].id == id) {
          let id = this.pokemons[i].id;
          try {
            let ret = await axios.delete(
              "http://localhost:5000/pokemons/" + id
            );
            if (ret.statusText == "OK")
              this.launchSuccess("Deleted Successfully");
            this.pokemons.splice(i, 1);
          } catch (err) {
            this.launchError("Server didn't respond !");
          }
          break;
        }
      }
    },
  },

  async created() {
    try {
      let query = await axios.get("http://localhost:5000/pokemons/");
      console.log(query.data);
      if (
        !(query.data instanceof Array) ||
        !query.data.every((e) => e instanceof Object)
      )
        this.launchError("Un-processable data");
      else if (!query.data) this.launchError("No data received");
      else {
        this.launchSuccess("Data successfully received !");
        this.pokemons = query.data;
      }
    } catch (err) {
      this.launchError("Server didn't respond !");
    }
  },
};
</script>

<style></style>
