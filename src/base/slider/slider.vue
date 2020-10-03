<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <div
        class="dot"
        v-for="(item, index) in dots"
        :key="item"
        :class="{active: currentPageIndex === index}"
      >
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { addClass } from '@/common/js/dom'

export default {
  name: 'slider',
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted () {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()

      if (this.autoPlay) {
        this._play()
      }
    }, 20)

    window.addEventListener('resize', () => {
      if (!this.slider || !this.slider.enabled) {
        return
      }

      clearTimeout(this.resizeTimer)

      this.resizeTimer = setTimeout(() => {
        if (this.slider.isInTransition) {
          this._onScrollEnd()
        } else {
          if (this.autoPlay) {
            this._play()
          }
        }

        this.refresh()
      }, 60)
    })
  },
  activated () {
    this.slider.enable()
    const pageIndex = this.slider.getCurrentPage().pageX
    this.slider.goToPage(pageIndex, 0, 0)
    this.currentPageIndex = pageIndex
    if (this.autoPlay) {
      this._play()
    }
  },
  deactivated () {
    this.slider.disable()
    clearTimeout(this.timer)
  },
  beforeDestroy () {
    this.slider.disable()
    clearTimeout(this.timer)
  },
  methods: {
    // 刷新slider
    refresh () {
      if (this.slider) {
        this._setSliderWidth(true)
        this.slider.refresh()
      }
    },
    // 轮播图播放
    _play () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    },
    // 设置轮播图宽度
    _setSliderWidth (isResize) {
      this.children = this.$refs.sliderGroup.children

      let width = 0
      const sliderWidth = this.$refs.slider.clientWidth

      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i]
        addClass(child, 'slider-item')

        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }

      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }

      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots () {
      this.dots = new Array(this.children.length)
    },
    // 初始化Slider
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        slide: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })
      // 滚动结束事件
      this.slider.on('scrollEnd', this._onScrollEnd)

      this.slider.on('touchEnd', () => {
        if (this.autoPlay) {
          this._play()
        }
      })

      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    _onScrollEnd () {
      const pageIndex = this.slider.getCurrentPage().pageX
      this.currentPageIndex = pageIndex

      if (this.autoPlay) {
        this._play()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable";
.slider {
  min-height: 1px;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
