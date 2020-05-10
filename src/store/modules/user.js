export const state = {
  loggedInUser: null
}

export const mutations = {
  SET_LOGGED_IN_USER(state, user) {
    state.loggedInUser = user
  }
}

export const actions = {
  setLoggedInUser({ commit }, { user }) {
      commit('SET_LOGGED_IN_USER', user)
  },
}
export const getters = {
    loggedInUser: state => {
      return state.loggedInUser
    }
}
