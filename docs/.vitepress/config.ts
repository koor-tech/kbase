import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Knowledge Center",
  titleTemplate: ':title | Koor Technologies, Inc.',
  description: "For help with KSD, Rook, and Ceph",
  lang: 'en-US',
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/koor-logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'KSD', link: '/trial/' },
      { text: 'Support', link: '/support/' },
    ],

    search: {
      provider: 'local'
    },

    sidebar: [
      {
        text: 'KSD Trial',
        items: [
          { text: 'Your Free Trial', link: '/trial/' },
          { text: 'Getting Started', link: '/trial/getting-started' },
        ]
      },
      {
        text: 'Support',
        items: [
          { text: 'Help Desk', link: '/support/help-desk' },
          { text: 'Office Hours', link: '/support/office-hours' },
        ]
      },
    ],

    footer: {
      message: "Data storage is easy. It's the details that are hard. That's why there's Koor.",
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
