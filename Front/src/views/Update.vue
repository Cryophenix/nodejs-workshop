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
        <v-img :aspect-ratio="16 / 9" :src="item.img_url"></v-img>
      </template>

      <template v-slot:item.name="{ item }">
        <v-text-field v-model="item.name"></v-text-field>
      </template>
      <template v-slot:item.HP="{ item }">
        <v-text-field v-model="item.HP"></v-text-field>
      </template>
      <template v-slot:item.Atk="{ item }">
        <v-text-field v-model="item.Atk"></v-text-field>
      </template>
      <template v-slot:item.Def="{ item }">
        <v-text-field v-model="item.Def"></v-text-field>
      </template>
      <template v-slot:item.Satk="{ item }">
        <v-text-field v-model="item.Satk"></v-text-field>
      </template>
      <template v-slot:item.Sdef="{ item }">
        <v-text-field v-model="item.Sdef"></v-text-field>
      </template>
      <template v-slot:item.Spe="{ item }">
        <v-text-field v-model="item.Spe"></v-text-field>
      </template>

      <template v-slot:item.type1="{ item }">
        <v-text-field v-model="item.type1"></v-text-field>
      </template>
      <template v-slot:item.type2="{ item }">
        <v-text-field v-model="item.type2"></v-text-field>
      </template>

      <template v-slot:item.id="{ item }">
        <div class="text-center">
          <v-btn rounded fab small color="success" @click="send(item.id)">
            <v-icon> mdi-pencil </v-icon>
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
          text: "HP",
          value: "HP",
        },
        {
          text: "Atk",
          value: "Atk",
        },
        {
          text: "Def",
          value: "Def",
        },
        {
          text: "Satk",
          value: "Satk",
        },
        {
          text: "Sdef",
          value: "Sdef",
        },
        {
          text: "Spe",
          value: "Spe",
        },
        {
          text: "Type 1",
          value: "type1",
        },
        {
          text: "Type 2",
          value: "type2",
        },
        {
          text: "Validate",
          value: "id",
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
          delete this.pokemons[i].id;
          try {
            await axios.put(
              "http://localhost:5000/pokemons/" + id,
              this.pokemons[i]
            );
          } catch (err) {
            this.launchError("Server didn't respond to PUT " + this.$api_url + "/pokemons/id");
          }
          this.pokemons[i].id = id;
          break;
        }
      }
    },
  },

  async created() {
    try {
      let query = await axios.get(this.$api_url + "/pokemons/");
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
      this.launchError("Server didn't respond to GET " + this.$api_url + "/pokemons/");
    }
  },
};
</script>

<style></style>
