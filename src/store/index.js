import Vue from 'vue'
import Vuex from 'vuex'
import { loadingState, loadingMutations } from '../lib'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        ...loadingState
    },
    mutations: {
        ...loadingMutations
    }
})

export default store