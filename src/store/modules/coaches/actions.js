export default {
  async registerCoach(context, formData) {
    // console.log(context);
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: formData.first,
      lastName: formData.last,
      hourlyRate: formData.rate,
      description: formData.desc,
      areas: formData.areas,
    };

    const token = context.rootGetters.token;
    const response = await fetch(
      `https://coach-demo-ece25-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` +
        token,
      {
        method: 'PUT',
        body: JSON.stringify({
          ...coachData,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    if (!response.ok) {
      // error
      throw new Error(responseData.message || 'Failed to Fetch Coaches!');
    }
    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context, payload) {
    if (!context.getters.shouldUpdate && !payload.forceUpdate) {
      return;
    }
    const response = await fetch(
      `https://coach-demo-ece25-default-rtdb.firebaseio.com/coaches.json`
    );
    const responseData = await response.json();
    if (!response.ok) {
      // error
    }
    const coaches = [];
    for (const key in responseData) {
      const coach = {
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        hourlyRate: responseData[key].hourlyRate,
        description: responseData[key].description,
        areas: responseData[key].areas,
        id: key,
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  },
};
