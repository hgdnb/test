import * as types from './mutation-types'

const mutaions = {
  [types.isLoading] (state, info) {
    state.isLoading = info
  },
  [types.isDisabled] (state, info) {
    state.isDisabled = info
  },
  [types.excelJson] (state, excelJson) {
    state.excelJson = excelJson
  }
}

export default mutaions
