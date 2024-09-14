export default {
  async signup(context, payload) {
    const responseData = await handleAuthUser(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
      payload
    );
    context.commit('setUser', {
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
      token: responseData.idToken,
    });
  },
  async login(context, payload) {
    const responseData = await handleAuthUser(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
      payload
    );

    context.commit('setUser', {
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
      token: responseData.idToken,
    });
  },
  logout(context) {
    context.commit('logout');
  },
};

async function handleAuthUser(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    }),
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message || 'Failed to sign up');
  }

  return responseData;
}
