<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox"></search-box>
    </div>
    <!-- <div class="shortcut-wrapper">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li @click="addQuery(item.k)" class="item" v-for="(item, index) in hotKey" :key="index">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div> -->
    <div class="search-result">
      <suggest :query="'周杰伦'"></suggest>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import SearchBox from '@/base/search-box/search-box'
import { getHotKey } from '@/api/search'
import { ERR_OK } from '@/api/config'
import Suggest from '../suggest/suggest'

export default {
  created () {
    this._getHotKey()
  },
  data () {
    return {
      hotKey: []
    }
  },
  methods: {
    addQuery (query) {
      this.$refs.searchBox.setQuery(query)
    },
    _getHotKey () {
      getHotKey().then((res) => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    }
  },
  components: {
    SearchBox,
    Suggest
  }
}
</script>

<style lang="scss" scoped>
@import '@/common/scss/variable';
@import '@/common/scss/mixin';

.search {
  .search-box-wrapper {
    margin: 20px;
  }
  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;
    .shortcut {
      height: 100%;
      overflow: hidden;
      .hot-key {
        margin: 0 20px 20px 20px;
        .title {
          margin-bottom: 20px;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
    }
  }
}
</style>
