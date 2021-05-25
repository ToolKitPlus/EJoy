import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },

    state,

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING,

    mutations: {
      walletWeb3 (state, payload) {
        console.log('walletWeb3 Mutation being executed', payload)
        state.account = payload.account
        state.web3 = payload.web3
      },
      walletEthers (state, payload) {
        console.log('walletEthers Mutation being executed', payload)
        state.ethers = payload.ethers
      }
    },

    actions: {
      walletWeb3 ({ commit }, payload) {
        console.log('committing result to walletWeb3 mutation')
        commit('walletWeb3', payload)
      },
      walletEthers ({ commit }, payload) {
        console.log('connectWalletEthers result to walletEthers mutation')
        commit('walletEthers', payload)
      }
    }
  })

  return Store
}
