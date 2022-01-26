<template>
  <v-app dark>
    <v-app-bar dense app>

      <v-toolbar-title>Tricking Liberary</v-toolbar-title>

      <v-spacer></v-spacer>


      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed @click="toggleActivity">
            Upload
          </v-btn>
        </template>

      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  methods:{
    ...mapMutations("videos", ["toggleActivity"])
  }
}
</script>
