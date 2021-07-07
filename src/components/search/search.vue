<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box></search-box>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import SearchBox from '@/base/search-box/search-box'

export default {
  components: {
    SearchBox
  }
}
</script>

<style lang="scss" scoped>
.search {
  .search-box-wrapper {
    margin: 20px;
  }
}
</style>
