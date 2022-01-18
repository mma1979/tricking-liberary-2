<template>
  <div>

    <v-file-input accept="video/*" @change="handleFile"></v-file-input>

    <div v-if="tricks">
      <p v-for="t in tricks">
        {{ t.name }}
      </p>
    </div>
    <div>
      <v-text-field label="Trick Name" v-model="trickName"/>
      <v-btn @click="saveTrick">Save Trick</v-btn>
    </div>

    <v-btn @click="resetTricks">Reset Tricks</v-btn>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import Axios from "axios";

export default {
  name: "index.vue",
  data() {
    return {
      trickName: ""
    }
  },
  computed: {
    ...mapState('tricks', {
      tricks: state => state.tricks
    })
  },
  methods: {
    ...mapMutations({
      resetTricks: 'tricks/reset',
      setTricks: 'tricks/setTricks'
    }),
    ...mapActions('tricks', ['createTrick']),
    async saveTrick() {
      await this.createTrick({trick: {name: this.trickName}})
      this.trickName='';
    },
    async handleFile(file){
      if(!file) return;

      const form = new FormData();
      form.append("video", file);

      const result = await Axios.post("http://localhost:5000/api/videos", form);

      console.log("Result: ", result);
    }
  }
}
</script>

<style scoped>

</style>
