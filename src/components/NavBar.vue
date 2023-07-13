<template>
  <div>
    <v-app-bar color="black accent-4" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Cursos</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <router-link to="/" class="text-light">
            <v-list-item :key="'home'" @click="redirectTo('home')" :disabled="currentRoute === 'home'">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link to="/administracion" class="text-light">
            <v-list-item :key="'administracion'" @click="redirectTo('administracion')" :disabled="currentRoute === 'administracion'">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Administracion</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "nav-bar",
  // props: {},
  data: function () {
    return {
      drawer: false,
      group: null,
      routes: [
        {
          icon: "mdi-home",
          title: "Inicio",
          name: "home",
        },
        {
          icon: "mdi-account",
          title: "Administracion",
          name: "administracion",
        },
      ],
    };
  },
};
</script>
