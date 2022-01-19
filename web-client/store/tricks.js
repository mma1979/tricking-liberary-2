﻿
const initState = () => ({
  tricks: []
});

export const state = initState;

export const mutations = {
  setTricks(state, {tricks}){
    state.tricks = tricks
  },
  reset(state){
    Object.assign(state, initState());
  }
}

export  const actions = {
  async fetchTricks({commit}){
    const tricks = await this.$axios.$get(`${this.$config.baseUrl}/api/tricks`);
    commit("setTricks", {tricks});
  },

  async createTrick({commit, dispatch}, {trick}){
    await this.$axios.post(`${this.$config.baseUrl}/api/tricks`, trick);
    await dispatch("fetchTricks");

  }
}
