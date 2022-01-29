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

    <v-dialog :value="active" persistent width="650">

      <v-card>
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1">
             Select Type
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="step > 2" step="2">
              Upload Video
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="step > 3" step="3">
              Trick Information
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="4">
              Confirmation
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <div class="d-flex flex-column align-center">
                <v-btn class="my-2" @click="setType({type: uploadTypes.TRICK})">Trick</v-btn>
                <v-btn class="my-2"  @click="setType({type: uploadTypes.SUBMISSION})">Submission</v-btn>
              </div>


            </v-stepper-content>


            <v-stepper-content step="2">
              <div>
                <v-file-input label="Choose video" accept="video/*" @change="handleFile"></v-file-input>
              </div>


            </v-stepper-content>

            <v-stepper-content step="3">
              <div>
                <v-text-field label="Trick Name" v-model="trickName"/>
                <v-btn @click="saveTrick">Save Trick</v-btn>
              </div>


            </v-stepper-content>

            <v-stepper-content step="4">
              <div>
                Success
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="toggleActivity">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import { UPLOAD_TYPE } from '@/data/enums'

export default {
  name: "index.vue",
  data() {
    return {
      trickName: ""
    }
  },
  computed: {
    ...mapState('tricks', ['tricks']),
    ...mapState('videos', ['uploadPromise', 'active', 'step']),
    uploadTypes(){
      return UPLOAD_TYPE
    }
  },
  methods: {
    ...mapMutations({
      resetTricks: 'tricks/reset',
      setTricks: 'tricks/setTricks',
      resetVideos: 'videos/reset',
      toggleActivity: 'videos/toggleActivity',
      setType: 'videos/setType'
    }),
    ...mapActions('tricks', ['createTrick']),
    ...mapActions('videos', ['startUploadVideo' ]),
    async saveTrick() {
      if (!this.uploadPromise) {
        console.log("uploadPromise is null");
        return;
      }
      const video = await this.uploadPromise;
      await this.createTrick({trick: {name: this.trickName, video: video}});
      this.trickName = '';

    },
    async handleFile(file) {
      if (!file) return;

      const form = new FormData();
      form.append("video", file);
      this.startUploadVideo({form});
      this.resetVideos();
    }
  }
}
</script>

<style scoped>

</style>
