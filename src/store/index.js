import Vue from "vue";
import Vuex from "vuex";
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  	authenticated:false,
  	user:null
  },
  mutations: {
  	SET_AUTHENTICATED(state,value)
  	{
  		state.authenticated = value;
  	},

  	SET_USER(state,value)
  	{
  		state.user = value;
  	}
  },
  actions: {
  	async signIn({dispatch},credentials)
  	{
      await Axios.get('sanctum/csrf-cookie');
      await Axios.post('api/login',{credentials});

      dispatch('user');
  	},

  	// async signOut({dispatch})
  	// {

  	// },

  	user({commit})
  	{
      return Axios.get('/api/user').then((response) => {
        commit('SET_AUTHENTICATED', true)
        commit('SET_USER', response.data)
      }).catch(() => {
        commit('SET_AUTHENTICATED', false)
        commit('SET_USER', null)
      });
  	}
  },
  modules: {}
});
