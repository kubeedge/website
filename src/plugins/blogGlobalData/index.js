/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require("path");
const pluginContentBlog = require("@docusaurus/plugin-content-blog");
const { normalizeUrl } = require("@docusaurus/utils");

/**
 * @param {import('@docusaurus/types').LoadContext} context
 * @returns {import('@docusaurus/types').Plugin}
 */
async function blogGlobalDataPlugin(context, options) {
  const currentLocale = context.i18n.currentLocale;
  const blogDir =
    currentLocale === "zh-Hans"
      ? path.join(
          context.siteDir,
          "i18n/zh-Hans/docusaurus-plugin-content-blog"
        )
      : path.join(context.siteDir, "blog");
  const blogPlugin = await pluginContentBlog.default(context, {
    ...options,
    path: blogDir,
    id: "blogGlobalDataPlugin",
  });

  return {
    name: "blog-global-dataPlugin",
    async loadContent() {
      const content = await blogPlugin.loadContent();
      content.blogPosts.forEach((post, index) => {
        const pageIndex = Math.floor(index / options.postsPerPage);
        post.metadata.listPageLink = normalizeUrl([
          context.baseUrl,
          options.routeBasePath,
          pageIndex === 0 ? "/" : `/page/${pageIndex + 1}`,
        ]);
      });

      return content;
    },
    contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData({ blogGlobalData: content });
    },
  };
}

blogGlobalDataPlugin.validateOptions = pluginContentBlog.validateOptions;

module.exports = blogGlobalDataPlugin;
