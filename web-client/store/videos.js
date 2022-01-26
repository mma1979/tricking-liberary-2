const initState = () => ({
  uploadPromise: null,
  active: false
});

export const state = initState;

export const mutations = {
  toggleActivity(state){
    state.active = !state.active;
  },
  setTask(state, {uploadPromise}) {
    state.uploadPromise = uploadPromise
  },
  reset(state) {
    Object.assign(state, initState());
  }
}

export const actions = {
  startUploadVideo({commit, dispatch}, {form}) {
    // const uploadPromise = this.$axios.$post(`${this.$config.baseUrl}/api/videos`, form);
    // using axios config in nuxt.config.js
    const uploadPromise = this.$axios.$post(`/api/videos`, form);
    commit("setTask", {uploadPromise});
  }
}
