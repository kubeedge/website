// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const versionsArchived = require("./versionsArchived.json");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "KubeEdge",

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

  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicons/apple-touch-icon.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicons/favicon-32x32.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicons/favicon-16x16.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "shortcut icon",
        type: "image/x-icon",
        href: "/favicons/favicon.ico",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "manifest",
        href: "/favicons/site.webmanifest",
      },
    },
    {
      tagName: "meta",
      attributes: {
        name: "theme-color",
        content: "#ffffff",
      },
    },
    {
      tagName: "meta",
      attributes: {
        name: "msapplication-config",
        content: "/favicons/browserconfig.xml",
      },
    },
  ],

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/kubeedge/website/blob/master/",
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
          editUrl: "https://github.com/kubeedge/website/tree/master/",
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
          target: "_self",
          href: "/",
        },
        items: [
          {
            label: "Documentation",
            position: "left",
            items: Object.keys(versionsArchived).map((v) => ({
              label: v,
              href: versionsArchived[v],
              target: "_self",
            })),
            className: "navbar__link--community",
          },
          {
            label: "Blog",
            to: "/blog",
            position: "left",
            target: "_self",
          },
          { to: "/case-studies", label: "Case Studies", position: "left" },
          { to: "/partners", label: "Partners", position: "left" },
          {
            type: "dropdown",
            label: "Community",
            position: "left",
            items: [
              {
                label: "Job Center",
                to: "/job-center",
              },
            ],
            hide: true,
          },
          {
            label: "Downloads",
            to: "https://github.com/kubeedge/kubeedge/releases",
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
            className: "header-x-link heade-icon",
          },
          {
            to: "/docs/community/slack",
            position: "right",
            className: "header-slack-link heade-icon",
          },
          {
            type: "localeDropdown",
            position: "right",
          },
        ].filter((item) => !item.hide),
      },
      footer: {
        style: "dark",
        links: [],
        copyright: `
          <div class="footer-container">
            <div class="footer-left">
              <div class="footer-logo">
                <img src="/img/avatar.png" alt="KubeEdge Logo" width="50" />
                <span>kubeEdge</span>
              </div>
              <div class="footer-copyright-text">
                ${new Date().getFullYear()} © KubeEdge Project Authors. All rights reserved.
              </div>
              <div class="footer-trademark">
                The Linux Foundation has registered trademarks and uses trademarks. For a 
                list of trademarks of The Linux Foundation, please see our 
                <a href="https://www.linuxfoundation.org/trademark-usage">Trademark Usage</a>
                page.
              </div>
            </div>
            <div class="footer-right">
              <div class="footer-column">
                <h3>Site Map</h3>
                <ul>
                  <li><a href="/blog">Blog</a></li>
                  <li><a href="/case-studies">Case Studies</a></li>
                  <li><a href="/partners">Partners</a></li>
                  <li><a target="_blank" href="https://github.com/kubeedge/kubeedge/releases">Download</a></li>
                </ul>
              </div>
              <div class="footer-column">
                <h3>Join the Community</h3>
                <div class="social-icons">
                  <a href="https://github.com/kubeedge/kubeedge" class="social-icon footer-github-link">
                    GitHub
                  </a>
                  <a href="/docs/community/slack" class="social-icon footer-slack-link">
                    Slack
                  </a>
                  <a href="https://twitter.com/KubeEdge" class="social-icon footer-x-link">
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        `,
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
