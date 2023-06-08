import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Knowledge Center",
  titleTemplate: ':title | Koor Technologies, Inc.',
  description: "For help with KSD, Rook, and Ceph",
  lang: 'en-US',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/koor-logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Office Hours', link: '/office-hours' },
    ],

    sidebar: [
      {
        text: 'Support',
        items: [
          { text: 'Office Hours', link: '/office-hours' },
        ]
      }
    ],

    footer: {
      message: 'Data storage is easy. It\'s the details that are hard.',
      copyright: 'Copyright © 2023 Koor Technologies, Inc.'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/koor-tech' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/koor-technologies-inc/' },
      { icon: 'twitter', link: 'https://twitter.com/koor_tech' },
      { icon: 'youtube', link: 'https://www.youtube.com/@koor-tech' },
    ]
  }
})
