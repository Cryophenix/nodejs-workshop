<template>
  <v-app>
    <v-app-bar app>
      <v-btn text color="primary" to="/create">Create</v-btn>
      <v-btn text color="secondary" to="/">Read</v-btn>
      <v-btn text color="warning" to="/update">Update</v-btn>
      <v-btn text color="error" to="/delete">Delete</v-btn>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
