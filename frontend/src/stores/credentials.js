import { defineStore } from "pinia";

export const useCredentialsStore = defineStore({
  id: "credentials",
  state: () => ({
    username: "",
    token: "",
  }),
  getters: {
    getToken: (state) => state.token,
    getUsername: (state) => state.username,
  },
});
