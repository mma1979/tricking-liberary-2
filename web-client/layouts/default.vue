<template>
  <v-app dark>
    <v-app-bar dense app>

      <v-toolbar-title>Tricking Liberary</v-toolbar-title>

      <v-spacer></v-spacer>


      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed v-bind="attrs" v-on="on">
            Upload
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="()=>{}">
            <v-list-item-title>Trick</v-list-item-title>
          </v-list-item>
          <v-list-item >
            <v-list-item-title>Submission</v-list-item-title>
          </v-list-item>
        </v-list>
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
export default {}
</script>
