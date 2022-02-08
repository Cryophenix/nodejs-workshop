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
      </template> </v-data-table
  ></v-container>
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
  },

  async created() {
    try {
      let query = await axios.get(this.$api_url + "/pokemons/");
      console.log(query.data)
      if (!(query.data instanceof Array) || !(query.data.every((e) => e instanceof Object))) this.launchError("Un-processable data");
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
