<template>
  <v-container>
  <v-alert v-if="error" type="error">
      {{ errorMsg }}
    </v-alert>
    <v-alert v-if="success" type="success">
      {{ successMsg }}
    </v-alert>
    <v-row justify="center">
      <v-col cols="4">
        <v-card>
          <v-card-title>Create a new pokemon</v-card-title>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row>
                  <v-text-field
                    v-model="name"
                    label="name"
                    required
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <v-text-field
                      v-model="hp"
                      label="HP"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="atk"
                      label="Attack"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="def"
                      label="Defense"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="satk"
                      label="Spe. Attack"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="sdef"
                      label="Spe. Defense"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="spe"
                      label="Speed"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="type1"
                    label="Type 1"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="type2"
                    label="Type 2"
                    required
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="img_url"
                    label="Image"
                    required
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="clear()" color="warning">Reset</v-btn>
            <v-btn @click="send()" color="primary">Send</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      hp: 0,
      atk: 0,
      def: 0,
      satk: 0,
      sdef: 0,
      spe: 0,
      type1: null,
      type2: null,
      img_url: "",
      error: false,
      success: false,
      errorMsg: "",
      successMsg: "",
    };
  },

  methods: {
    clear() {
      this.name = null;
      this.hp = 0;
      this.atk = 0;
      this.def = 0;
      this.satk = 0;
      this.sdef = 0;
      this.spe = 0;
      this.type1 = null;
      this.type2 = null;
      this.img_url = "";
    },
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

    async send() {
      try {
        let resp = await axios.post("http://localhost:5000/pokemons/", {
          name: this.name,
          HP: this.hp,
          Atk: this.atk,
          Def: this.def,
          Satk: this.satk,
          Sdef: this.sdef,
          Spe: this.spe,
          type1: this.type1,
          type2: this.type2,
          img_url: this.img_url,
        });
        if (resp.data == 'KO')
          this.launchError("Invalid parameters given !");
        else
          this.launchSuccess("Seems Ok !");
      } catch (err) { 
        this.launchError("Server didn't respond !");
      }
    },
  },
};
</script>

<style></style>
