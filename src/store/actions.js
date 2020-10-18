import * as types from './mutation-types'

// 选择播放
export const selectPlay = function ({ commit, state }, { list, index }) {
  commit(types.SET_SEQUENCE_LIST, list)
  // 顺序播放
  commit(types.SET_PLAYLIST, list)
  // 索引
  commit(types.SET_CURRENT_INDEX, index)
  // 全屏
  commit(types.SET_FULL_SCREEN, true)
  // 播放状态
  commit(types.SET_PLAYING_STATE, true)
}
