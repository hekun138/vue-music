<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable";
@import "@/common/scss/mixin";

.m-header {
  position: relative;
  height: 44px;
  text-align: center;
  color: $color-theme;
  font-size: 0;
  .icon {
    display: inline-block;
    width: 30px;
    height: 32px;
    background-size: 30px 32px;
    margin-top: 6px;
    margin-right: 9px;
    vertical-align: top;
    @include bg-image('logo');
  }
  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: $font-size-large;
  }
  .mine {
    position: absolute;
    top: 0;
    right: 0;
    .icon-mine {
      display: inline-block;
      padding:12px;
      font-size: 20px;
      color: $color-theme;
    }
  }
}
</style>
