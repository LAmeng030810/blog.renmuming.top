import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "任沐铭的博客",
  description: "部署网站",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "文档", link: "/markdown-examples" }],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "网站部署", link: "/markdown-examples" },
          { text: "Vue3依赖包", link: "/vue3-package" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/LAmeng030810/blog.renmuming.top",
      },
    ],
  },
});
