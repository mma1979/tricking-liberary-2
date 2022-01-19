<template>
  <div>


    <div v-if="tricks">
      <div v-for="t in tricks">
        {{ t.name }}
        <div>
          <video width="400" height="275" :src="`${$config.baseUrl}/api/videos/${t.video}`" controls></video>
        </div>
      </div>
    </div>


    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">
          Upload Video
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">
          Trick Information
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Confirmation
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div>
            <v-file-input label="Choose video" accept="video/*" @change="handleFile"></v-file-input>
          </div>


        </v-stepper-content>

        <v-stepper-content step="2">
          <div>
            <v-text-field label="Trick Name" v-model="trickName"/>
            <v-btn @click="saveTrick">Save Trick</v-btn>
          </div>


        </v-stepper-content>

        <v-stepper-content step="3">
          <div>
            Success
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>


  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import Axios from "axios";

export default {
  name: "index.vue",
  data() {
    return {
      trickName: "",
      step: 1
    }
  },
  computed: {
    ...mapState('tricks', ['tricks']),
    ...mapState('videos', ['uploadPromise']),
  },
  methods: {
    ...mapMutations({
      resetTricks: 'tricks/reset',
      setTricks: 'tricks/setTricks',
      resetVideos: 'videos/reset'
    }),
    ...mapActions('tricks', ['createTrick']),
    ...mapActions('videos', ['startUploadVideo']),
    async saveTrick() {
      if(!this.uploadPromise){
        console.log("uploadPromise is null");
        return;
      }
      const video = await this.uploadPromise;
      await this.createTrick({trick: {name: this.trickName, video: video}});
      this.trickName = '';
      this.step++;
      this.resetVideos();
    },
    async handleFile(file) {
      if (!file) return;

      const form = new FormData();
      form.append("video", file);
      this.startUploadVideo({form});
      this.step++;
    }
  }
}
</script>

<style scoped>

</style>
