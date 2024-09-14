export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };
    const response = await fetch(
      `https://coach-demo-ece25-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(newRequest),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to create request!');
    }
    console.log(responseData);
    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;
    context.commit('addRequest', newRequest);
  },
  async fetchRequest(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://coach-demo-ece25-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +
        token
    );
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error('Failed to fetch requests!');
    }
    const requests = [];
    for (const key in responseData) {
      const request = {
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
        coachId: coachId,
        id: key,
      };
      requests.push(request);
    }
    context.commit('setRequests', requests);
  },
};
