<template>
  <transition appear name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import MusicList from '@/components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getSingerDetail } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import { createSong, processSongUrl } from '@/common/js/song'

export default {
  data () {
    return {
      songs: []
    }
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this._getDetail()
  },
  methods: {
    _getDetail () {
      // 如果singer的id不存在
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          processSongUrl(this._normalizeSongs(res.data.list)).then(songs => {
            this.songs = songs
          })
        }
      })
    },
    // 处理后台数据
    _normalizeSongs (list) {
      const ret = []
      list.forEach(item => {
        const { musicData } = item
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable';

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}
.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
