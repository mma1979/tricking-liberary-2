<template>
  <div>
    <div class="text-center">
      LOGO
    </div>

    <div v-if="tricks">
      <p v-for="t in tricks">
        {{ t.name }}
      </p>
    </div>
    <div>
      <v-text-field label="Trick Name" v-model="trickName"/>
      <v-btn @click="saveTrick">Save Trick</v-btn>
    </div>

    {{message}}
    <v-btn @click="reset">Reset Message</v-btn>
    <v-btn @click="resetTricks">Reset Tricks</v-btn>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';

export default {
  name: "index.vue",
  data() {
    return {
      trickName: ""
    }
  },
  computed: {
    ...mapState({
      message: state => state.message,
      version: state => state.version
    }),
    ...mapState('tricks', {
      tricks: state => state.tricks
    })
  },
  methods: {
    ...mapMutations({
      reset: 'reset'
    }),
    ...mapMutations({
      resetTricks: 'tricks/reset',
      setTricks: 'tricks/setTricks'
    }),
    ...mapActions('tricks', ['createTrick']),
    async saveTrick() {
      await this.createTrick({trick: {name: this.trickName}})
      this.trickName='';
    }
  }
}
</script>

<style scoped>

</style>
