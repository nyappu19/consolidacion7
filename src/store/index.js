import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cursos: [],
  },
  mutations: {
    setCursos(state, cursos) {
      state.cursos = cursos;
    },
  },
  actions: {
    fetchCursos({ commit }) {
      fetch('/cursos.json')
        .then((response) => response.json())
        .then((data) => {
          commit('setCursos', data);
        })
        .catch((error) => {
          console.error('Error al cargar los cursos:', error);
        });
    },
  },
});
