export const sidebar = {
  '/java/': [
    {
      text: 'Java',
      collapsed: false,
      items: [
        { text: '多线程', link: '/java/base/thread' },
      ]
    },
    {
      text: '设计模式',
      collapsed: false,
      items: [
        { text: '代理模式', link: '/java/design/proxy' },
      ]
    }
  ],
  '/mysql/': [
    {
      text: 'Mysql',
      collapsed: false,
      items: [
        { text: '索引', link: '/mysql/' },
        { text: '优化', link: '/mysql/optimize' },
        { text: 'Explain', link: '/mysql/explain' },
      ]
    }
  ],
  '/linux/': [
    {
      text: 'Linux',
      collapsed: false,
      items: [
        { text: 'Linux命令汇总', link: '/linux/note' },
      ]
    }
  ],
  '/example/': [
    {
      text: '示例',
      items: [
        { text: 'Markdown 扩展', link: '/example/markdown-examples' },
        { text: '运行时api', link: '/example/api-examples' }
      ]
    }
  ]
}