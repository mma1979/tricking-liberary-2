import Axios from "axios";

const initState = () => ({
  tricks: []
});

export const state = initState();

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
    const tricks = (await Axios.get("http://localhost:51559/api/tricks")).data;
    console.table(tricks);
    commit("setTricks", {tricks});
  },

  async creatTrick({commit, dispatch}, {trick}){
    await Axios.post("http://localhost:51559/api/tricks", trick);
    await dispatch("fetchTricks");

  }
}
