export const sidebar = {
  '/java/': [
    {
      text: 'Java',
      collapsed: false,
      items: [
        { text: '多线程', link: '/java/thread' },
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