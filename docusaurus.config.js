// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const versionsArchived = require("./versionsArchived.json");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "KubeEdge",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://kubeedge.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh"],
    localeConfigs: {
      en: {
        htmlLang: "en-GB",
        label: "English",
      },
      zh: {
        label: "简体中文",
      },
    },
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/kubeedge/website/tree/main",
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        gtag: {
          trackingID: "G-9PL5BPEXGS",
          anonymizeIP: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/kubeedge/website/tree/main",
          postsPerPage: 5,
          blogSidebarCount: "ALL",
          blogSidebarTitle: "All our posts",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/docusaurus-social-card.jpg",
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: "KubeEdge",
        logo: {
          src: "img/avatar.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "documentationSideBar",
            position: "left",
            label: "Documentation",
          },
          { to: "/blog", label: "Blog", position: "left" },
          { to: "/case-studies", label: "Case Studies", position: "left" },
          {
            type: 'dropdown',
            label: 'Community',
            position: 'left',
            items: [
              {
                label: 'Job Center',
                to: "/job-center",
              },
            ],
          },
          {
            to: "https://github.com/kubeedge/kubeedge/releases",
            label: "Downloads",
            position: "left",
          },
          {
            href: "https://github.com/kubeedge/kubeedge",
            position: "right",
            className: "header-github-link heade-icon",
          },
          {
            href: "https://twitter.com/KubeEdge",
            position: "right",
            className: "header-twitter-link heade-icon",
          },
          {
            href: "https://kubeedge.slack.com/join/shared_invite/enQtNjc0MTg2NTg2MTk0LWJmOTBmOGRkZWNhMTVkNGU1ZjkwNDY4MTY4YTAwNDAyMjRkMjdlMjIzYmMxODY1NGZjYzc4MWM5YmIxZjU1ZDI#/shared-invite/email",
            position: "right",
            className: "header-slack-link heade-icon",
          },
          {
            type: "localeDropdown",
            position: "right",
          },
          {
            label: "Versions",
            position: "right",
            items: Object.keys(versionsArchived).map((v) => ({
              label: v,
              href: versionsArchived[v],
              target: "_self",
            })),
            className: "navbar__link--community",
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            html: '<p style="font-size: large;">KubeEdge is a <a href="https://cncf.io/">Cloud Native Computing Foundation</a> incubating project.</p>',
          },
          {
            html: '<img src="https://github.com/cncf/artwork/blob/master/other/cncf/horizontal/color/cncf-color.png?raw=true" class="footer__logo light">',
          },
          {
            html: '<img src="https://github.com/cncf/artwork/blob/master/other/cncf/horizontal/white/cncf-white.png?raw=true" class="footer__logo dark">',
          },
          {
            html: '<p>The Linux Foundation has registered trademarks and uses trademarks. For a list of trademarks of The Linux Foundation, please see our <a href="https://www.linuxfoundation.org/trademark-usage" target="_blank">Trademark Usage</a> page.</p>',
          },
        ],
        copyright: `${new Date().getFullYear()} © KubeEdge Project Authors. All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  plugins: [
    [require.resolve("./src/plugins/blogGlobalData/index.js"), {}],
    [require.resolve("./src/plugins/caseStudiesGlobalData/index.js"), {}],
    [require.resolve("./src/plugins/jobCenterGlobalData/index.js"), {}],
    "docusaurus-plugin-sass",
  ],
};

module.exports = config;
