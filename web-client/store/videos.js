const initState = () => ({
  uploadPromise: null
});

export const state = initState;

export const mutations = {
  setTask(state, {uploadPromise}) {
    state.uploadPromise = uploadPromise
  },
  reset(state) {
    Object.assign(state, initState());
  }
}

export const actions = {
  startUploadVideo({commit, dispatch}, {form}) {
    const uploadPromise = this.$axios.$post(`${this.$config.baseUrl}/api/videos`, form);
    commit("setTask", {uploadPromise});
  }
}
