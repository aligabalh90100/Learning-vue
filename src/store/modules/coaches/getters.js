export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches.length;
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;
    const coachId = rootGetters.userId;
    return coaches.some((coach) => coach.id === coachId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) return true;

    const currentTime = new Date().getTime();
    return (currentTime - lastFetch) / 1000 > 60;
  },
};
