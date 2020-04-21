<template>
  <div>
    <h1>Defer Render Test</h1>
    <p>Reference: <a href="http://github.com/itibbers/vue-defer-render">vue-defer-render</a></p>

    <p>
      <span>Child Count: {{ rows }} x Child DOM Count: {{ cols }}, {{ optimized ? 'with' : 'without' }} vue-defer-render. {{ msg }}</span>
    </p>

    <p>
      <button v-if="optimized" @click="loadBase">Disable defer-render</button>
      <button v-else @click="loadOptimized">Enable defer-render</button>
      <button @click="rerender">Rerender</button>
    </p>

    <div v-if="optimized">
      <defer-render v-for="i in rows" :key="i" height="20rem" :delay="1000">
        <child :cols="cols"></child>
      </defer-render>
    </div>
    <div v-else>
      <child v-for="i in rows" :key="i" :cols="cols"></child>
    </div>
  </div>
</template>

<script>
  import deferRender from '../src/defer-render.vue'
  import child from './child.vue'

  var ROWS = 1000
  var COLS = 20
  var OPTIMIZED = window.location.hash === '#optimized'

  window.onhashchange = function() {
    window.location.reload()
  }

  var s = performance.now()

  export default {
    components: {
      'defer-render': deferRender,
      'child': child
    },
    data() {
      return {
        cols: COLS,
        rows: ROWS,
        optimized: OPTIMIZED,
        msg: 'loading...'
      }
    },
    created() {
      window.addEventListener('DOMContentLoaded', this.calc())
    },
    methods: {
      loadBase() {
        window.location.hash = ''
      },
      loadOptimized() {
        window.location.hash = '#optimized'
      },
      rerender() {
        window.location.reload()
      },
      calc() {
        this.msg = 'DOMContentLoaded took: ' + (window.performance.now() - s).toFixed(2) + 'ms'
      }
    }
  }
</script>
