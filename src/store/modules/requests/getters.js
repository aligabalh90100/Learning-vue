export default {
  allRequests(state, _, _2, rootGetters) {
    const userId = rootGetters.userId;
    return state.requests.filter((req) => req.coachId == userId);
  },
};
