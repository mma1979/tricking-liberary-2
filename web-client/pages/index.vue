<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>

      <div v-if="tricks">
        <p v-for="t in tricks">
          {{t.name}}
        </p>
      </div>
      <div>
        <v-text-field v-model="trickName" label="Trick Name"></v-text-field>
        <v-btn @click="saveTrick"> Save Trick </v-btn>

      </div>

          {{ message }} - {{version}}
          <br/>
          <v-btn @click="reset"> Reset Message </v-btn>
          <v-btn @click="resetTricks"> Reset Tricks </v-btn>

    </v-col>
  </v-row>
</template>

<script>

import Axios from "axios";
import {mapState, mapMutations, mapActions} from "vuex";


export default {
  name: 'IndexPage',
  data() {
    // local state
    return {
     trickName: ''
    }
  },
  computed: {
    ...mapState({
      message: state => state.message,
      version: state => state.version
    }),
    ...mapState("tricks",{
      tricks: state => state.tricks
    })
  },
  methods: {
    ...mapMutations([
                   'reset'
                 ]),
    ...mapMutations({
      resetTricks:'tricks/reset',
      setTricks: 'tricks/setTricks'
    }),
    ...mapActions('tricks', ['creatTrick', 'fetchTricks']),
    async saveTrick(){
      await this.creatTrick({trick:{name: this.trickName}});
      this.trickName='';
    }
  }
  // async fetch(){
  //   await this.$store.dispatch("fetchMessage");
  // }
  // asyncData(ctx) {
  //  return  Axios.get("http://localhost:51559/api/home")
  //     .then(res=>{
  //       return {message:res.data};
  //     })
  // }

}
</script>
