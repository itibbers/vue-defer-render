import deferRender from './src/defer-render.vue'

const install = Vue => {
    if (install.installed) return
    Vue.component(deferRender.name, deferRender)
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install
}
