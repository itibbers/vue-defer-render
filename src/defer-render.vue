<template>
    <div class="defer-render" ref="dom" :style="'width:' + width + ';height:' + height">
        <slot v-if="show"></slot>
        <slot name="tip" v-if="!show" v-html="tip"></slot>
    </div>
</template>

<script>
    /* eslint-disable */

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
            tip: {
                type: String,
                default: 'loading'
            }
        },
        data() {
            return {
                show: false
            }
        },
        mounted() {
            this.lazyLoad()
        },
        methods: {
            lazyLoad() {
                if (this.visiable()) {
                    this.show = true
                    console.log('loaded')
                } else {
                    this.show = false
                    setTimeout(() => {
                        this.show = true
                        console.log('lazy-render')
                    }, 1000)
                }
            },
            visiable() {
                return checkVisible(this.$refs.dom)
            }
        }
    }
</script>
