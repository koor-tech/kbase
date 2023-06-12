import { defineConfig } from "vitepress";
import _ from "lodash";
import { glob } from "glob";
import * as fs from "fs";
import markdownIt from "markdown-it";
import meta from "markdown-it-meta";

// Load all MD files in a specified directory and order by metadata 'order' value
function getChildren(
  parent_path: string,
  dir: string
): { text: string; link: string }[] {
  let files = glob
    .sync(parent_path + (dir ? `/${dir}` : "") + "/**/*.md")
    .map((path) => {
      // Instantiate MarkdownIt
      const md = new markdownIt();
      // Add markdown-it-meta
      md.use(meta);
      // Get the order value
      const file = fs.readFileSync(path, "utf8");
      md.render(file);

      // No types for markdownIt :-(
      let order = 0;
      if (md.meta !== undefined && md.meta.order !== undefined) {
        order = md.meta.order;
      }
      let title = file;
      if (md.meta !== undefined && md.meta.title !== undefined) {
        title = md.meta.title;
      }
      // Remove "parent_path" and ".md"
      path = path.slice(parent_path.length + 1, -3);
      // Remove "README", making it the de facto index page
      if (path.endsWith("README")) {
        path = path.slice(0, -6);
      }

      return {
        title,
        path,
        order,
      };
    });

  // Return the ordered list of files, sort by 'order' then 'path'
  return _.sortBy(files, ["order", "path"]).map((file) => {
    return { text: file.title, link: file.path };
  });
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Knowledge Center",
  titleTemplate: ":title | Koor Technologies, Inc.",
  description: "For help with KSD, Rook, and Ceph",
  lang: "en-US",
  head: [["link", { rel: "icon", type: "image/x-icon", href: "/favicon.png" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/koor-logo.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "KSD", link: "/trial/" },
      { text: "Support", link: "/support/" },
      { text: "Knowledge", link: "/knowledge/" },
    ],

    sidebar: {
      "/support/": [
        {
          text: "KSD Trial",
          items: [
            { text: "Your Free Trial", link: "/trial/" },
            { text: "Getting Started", link: "/trial/getting-started" },
          ],
        },
        {
          text: "Support",
          items: [
            { text: "Help Desk", link: "/support/help-desk" },
            { text: "Office Hours", link: "/support/office-hours" },
          ],
        },
      ],
      "/trial/": [
        {
          text: "KSD Trial",
          items: [
            { text: "Your Free Trial", link: "/trial/" },
            { text: "Getting Started", link: "/trial/getting-started" },
          ],
        },
        {
          text: "Support",
          items: [
            { text: "Help Desk", link: "/support/help-desk" },
            { text: "Office Hours", link: "/support/office-hours" },
          ],
        },
      ],
      "/knowledge/": [
        {
          text: "Ceph",
          items: getChildren("docs", "knowledge/ceph"),
        },
        {
          text: "Rook",
          items: getChildren("docs", "knowledge/rook"),
        },
      ],
    },

    footer: {
      message:
        "Data storage is easy. It's the details that are hard. That's why there's Koor.",
      copyright: "Copyright © 2023 Koor Technologies, Inc.",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/koor-tech" },
      {
        icon: "linkedin",
        link: "https://www.linkedin.com/company/koor-technologies-inc/",
      },
      { icon: "twitter", link: "https://twitter.com/koor_tech" },
      { icon: "youtube", link: "https://www.youtube.com/@koor-tech" },
    ],
  },
  markdown: {
    lineNumbers: true,
  },
});
