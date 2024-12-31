import { defineConfig } from 'vitepress'
import { sidebar as sidebarConfig } from './sidebar'
import {nav as navConfig} from './nav'
import mdItCustomAttrs  from 'markdown-it-custom-attrs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tech Notes",
  lang: 'zh-CN',
  base: "/tech-notes/",
  srcDir: './docs',
  description: "A VitePress Site",
  markdown:{
    lineNumbers: true, 
    config: (md) => {
      md.use(mdItCustomAttrs, 'image', {
          'data-fancybox': "gallery"
      });
    }
  },
  head: [
    ["link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css" }],
    ["script", { src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js" }],
    ['link', { rel: 'icon', href: '/tech-notes/favicon.ico' }],
    ['meta', { property: 'og:locale', content: 'zh' }],
  ],
  rewrites: {
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: navConfig,

    logo: '/favicon.png',

    sidebar: sidebarConfig,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    returnToTopLabel: "返回顶部",

    sidebarMenuLabel:"菜单",

    outline: {
      level: [2, 3],
      label:"导航"
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    }

  }
})
