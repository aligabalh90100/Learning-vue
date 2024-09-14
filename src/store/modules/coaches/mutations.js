export default {
  registerCoach(state, action) {
    state.coaches.push(action);
  },
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
