import Axios from "axios";

const initState = () => ({
  message: "init",
  version: 1.0
});

export const state = initState;

export const mutations = {
  setMessage(state, message){
    state.message = message
  },
  reset(state){
    Object.assign(state, initState());
  }
}

export  const actions = {
  // async fetchMessage({commit}){
  //   const message = (await Axios.get("http://localhost:5000/api/home")).data;
  //   console.log(message)
  //   commit("setMessage", message);
  // }

  async nuxtServerInit({commit, dispatch}){
    const message = (await Axios.get("http://localhost:5000/api/home")).data;
    console.log(message)
    commit("setMessage", message);
    await dispatch("tricks/fetchTricks")
  }
}
