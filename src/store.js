import { createStore } from "vuex";
import axios from "axios";

const USER_KEY = "usuario";

export default createStore({
  state: {
    usuario: null,
  },
  mutations: {
    setUsuario(state, usuario) {
      state.usuario = usuario;
      localStorage.setItem(USER_KEY, JSON.stringify(usuario));
    },
    cargarUsuarioDesdeLocalStorage(state) {
      const usuario = localStorage.getItem(USER_KEY);
      if (usuario) {
        state.usuario = JSON.parse(usuario);
      }
    },
  },
  actions: {
    async obtenerUsuarioTest({ commit }) {
      try {
        // Realizar la solicitud GET al servidor para obtener el usuario Test
        const response = await axios.get("http://localhost:8080/users/1");

        // Almacenar el usuario en el estado del store
        commit("setUsuario", response.data);

        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        throw error;
      }
    },
  },
  getters: {},
});