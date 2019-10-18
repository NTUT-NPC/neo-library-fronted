import Vue from 'vue'
import Vuex from 'vuex'
import loadData from './api/loadData'
import db from './plugins/IndexedDBHelper'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: localStorage.getItem('language') || null,
    token: localStorage.getItem('token') || null,
    characterIndex: (() => {
      const a = Number(localStorage.getItem('characterIndex'))
      if (a >= 0) return a
      return null
    })(),
    currentStageIndex: (() => {
      const a = Number(localStorage.getItem('currentStageIndex'))
      if (a >= 0) return a
      return null
    })(),
    inventory: JSON.parse(localStorage.getItem('inventory')) || [],
    review: JSON.parse(localStorage.getItem('review')) || [],
    loadedData: {},
    hasCompleteGameMain: localStorage.getItem('hasCompleteGameMain') || false,
    hasCompleteGameForm: localStorage.getItem('hasCompleteGameForm') || false,
    showProgressDialog: false,
    progressDialogText: ''
  },
  getters: {
    character ({ characterIndex }) {
      const characters = ['wukong', 'wuneng', 'wujing']
      return characters[characterIndex]
    },
    stages ({ currentStageIndex, loadedData }, { character }) {
      return Object.entries(loadedData)
        .filter(([key]) => key.includes(`${character}/stage-`))
        .map(([key, stage]) => stage)
    },
    currentStage ({ loadedData, currentStageIndex }, { stages }) {
      if (currentStageIndex === null) return null
      return stages[currentStageIndex]
    }
  },
  mutations: {
    SET_LANGUAGE (state, language) {
      state.language = language
      localStorage.setItem('language', language)
    },
    SET_TOKEN (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    SET_CHARACTER_INDEX (state, characterIndex) {
      state.characterIndex = characterIndex
      localStorage.setItem('characterIndex', characterIndex)
    },
    SET_CURRENT_STAGE_INDEX (state, currentStageIndex) {
      state.currentStageIndex = currentStageIndex
      localStorage.setItem('currentStageIndex', currentStageIndex)
    },
    ADD_INVENTORY (state, itemId) {
      state.inventory.push(itemId)
      localStorage.setItem('inventory', JSON.stringify(state.inventory))
    },
    ADD_REVIEW (state, reviewId) {
      state.review.push(reviewId)
      localStorage.setItem('review', JSON.stringify(state.review))
    },
    ADD_LOADED_DATA (state, loadedData) {
      Object.assign(state.loadedData, loadedData)
    },
    COMPLETE_GAME_MAIN (state) {
      state.hasCompleteGameMain = true
      localStorage.setItem('hasCompleteGameMain', true)
    },
    COMPLETE_GAME_FORM (state) {
      state.hasCompleteGameMain = true
      localStorage.setItem('hasCompleteGameForm', true)
    },
    SET_SHOW_PROGRESS_DIALOG (state, newValue) {
      state.showProgressDialog = newValue
    },
    SET_PROGRESS_DIALOG_TEXT (state, text) {
      state.progressDialogText = text
    }
  },
  actions: {
    setLanguage ({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setToken ({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    setCharacterIndex ({ commit }, characterIndex) {
      commit('SET_CHARACTER_INDEX', characterIndex)
    },
    setCurrentStageIndex ({ commit }, currentStageIndex) {
      commit('SET_CURRENT_STAGE_INDEX', currentStageIndex)
    },
    addInventory ({ commit }, itemId) {
      commit('ADD_INVENTORY', itemId)
    },
    addReview ({ commit }, reviewId) {
      commit('ADD_REVIEW', reviewId)
    },
    async loadCommonData ({ state, commit }) {
      let data = await db.get('common')
      const isLoadFromDB = !!data
      data = data || await loadData.loadCommonData(state.language)
      commit('ADD_LOADED_DATA', data)
      if (!isLoadFromDB) db.set('common', data)
    },
    async loadCharacterData ({ state, commit }) {
      const characters = ['wukong', 'wuneng', 'wujing']
      const character = characters[state.characterIndex]
      let data = await db.get(character)
      const isLoadFromDB = !!data
      data = data || await loadData.loadCharacterData(state.language, state.characterIndex)
      commit('ADD_LOADED_DATA', data)
      if (!isLoadFromDB) db.set(character, data)
    },
    completeGameMain ({ commit }) {
      commit('COMPLETE_GAME_MAIN')
    },
    completeGameForm ({ commit }) {
      commit('COMPLETE_GAME_FORM')
    },
    setShowProgressDialog ({ commit }, newValue) {
      commit('SET_SHOW_PROGRESS_DIALOG', newValue)
    },
    setProgressDialogText ({ commit }, text) {
      commit('SET_PROGRESS_DIALOG_TEXT', text)
    }
  }
})
