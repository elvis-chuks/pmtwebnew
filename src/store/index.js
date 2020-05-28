import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings:{},
    tripDetails:{},
    base_url:"https://pmtapi.elvischuks.com.ng",
    // base_url:"http://127.0.0.1:5000"
  },
  mutations: {
    updateSettings(state,payload){
      state.settings = payload;
    },
    updateTrip(state,payload){
      for(var prop in payload){
        if(payload.hasOwnProperty(prop) && !state.tripDetails[prop]){
          state.tripDetails[prop] = payload[prop];
        }
      }
    },
    updateSeats(state,payload){
      state.tripDetails.selectedSeats = payload;
    }
  },
  getters:{
    bookableDates: state => {
      if(state.settings[0] == undefined){
        return 2
      }else{
        return state.settings[0].NoOfAdvertizedDays;
      }
    },
    getTrips: state => {
      return state.tripDetails;
    },
    getUrl: state => {
      return state.base_url;
    }
  },
  actions:{
    clearTrips (context){
      setTimeout(() => {
        this.state.tripDetails = {};
        // this.state.base_url = "https://pmtapi.elvischuks.com.ng";
      })
    }
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
      // storage: {
      //   getItem: (key) => Cookies.get(key),
      //   // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      //   setItem: (key, value) =>
      //     Cookies.set(key, value, { expires: 3, secure: true }),
      //   removeItem: (key) => Cookies.remove(key),
      // },
    }),
  ],
})
