<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" :key="item.songid">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import { search } from '@/api/search'
import { ERR_OK } from '@/api/config'
import { isValidMusic, createSong, processSongUrl } from '@/common/js/song'

const TYPE_SINGER = 'singer'
const perpage = 20

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.search()
  },
  data () {
    return {
      page: 1,
      result: []
    }
  },
  methods: {
    search () {
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        console.log(res)
        if (res.code === ERR_OK) {
          this.result = this._genResult(res.data)
          console.log(this.result)
        }
      })
    },
    _genResult (data) {
      let ret = []
      if (data.zhida && data.zhida.singerid && this.page === 1) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } })
      }
      return processSongUrl(this._normalizeSongs(data.song.list)).then(songs => {
        ret = ret.concat(songs)
        return ret
      })
    },
    _normalizeSongs (list) {
      const ret = []
      list.forEach((musicData) => {
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    // 左边图标
    getIconCls (item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    // 右边歌曲名称
    getDisplayName (item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.songname}`
      }
    }
  },
  watch: {
    query () {
      this.search()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable';
@import '@/common/scss/mixin';

.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }
    .icon {
      flex: 0 0 30px;
      width: 30px;
      [class^="icon-"] {
        font-size: 14px;
        color: $color-text-d;
      }
    }
    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;
      .text {
        @include no-wrap()
      }
    }
  }
}
</style>
