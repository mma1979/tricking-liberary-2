const initState = () => ({
  uploadPromise: null,
  active: false,
  type: "",
  step: 1
});



export const state = initState;

export const mutations = {
  setType(state, {type}){
    state.type = type;
    state.step++
  },
  toggleActivity(state){
    state.active = !state.active;
    if (!state.active){
      Object.assign(state, initState());
    }
  },
  setTask(state, {uploadPromise}) {
    state.uploadPromise = uploadPromise
    state.step++
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
  },
  async createTrick({commit, dispatch}, {trick}){
    await this.$axios.post(`/api/tricks`, trick);
    await dispatch("tricks/fetchTricks");
  }
}
