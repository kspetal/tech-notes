/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './style/index.css'

export default {
    Layout,
    extends: DefaultTheme,
}