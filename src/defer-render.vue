<template>
  <div class="defer-render" ref="render" :style="style">
    <slot v-if="show"></slot>
    <slot name="skeleton" v-if="!show">{{ skeleton }}</slot>
  </div>
</template>

<script>
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)

  function checkVisible(elm) {
    var rect = elm.getBoundingClientRect()
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0)
  }

  export default {
    name: 'vue-defer-render',
    props: {
      width: String,
      height: {
        type: String,
        default: '1rem'
      },
      skeleton: {
        type: String,
        default: 'loading'
      },
      delay: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        show: false
      }
    },
    computed: {
      style() {
        return {
          width: this.show ? 'auto' : this.width,
          height: this.show ? 'auto' : this.height
        }
      }
    },
    mounted() {
      this.deferRender()
    },
    methods: {
      deferRender() {
        if (this.visiable()) {
          this.show = true
          this.$emit('loaded')
        } else {
          this.show = false
          setTimeout(() => {
            this.show = true
            this.$emit('loaded')
          }, this.delay)
        }
      },
      visiable() {
        return checkVisible(this.$refs.render)
      }
    }
  }
</script>
