export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.tokenExpiration = payload.tokenExpiration;
  },
  logout(state) {
    state.userId = null;
    state.token = null;
    state.tokenExpiration = null;
  },
};
