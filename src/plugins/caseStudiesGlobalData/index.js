/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require("path");
const pluginContentPage = require("@docusaurus/plugin-content-blog");

/**
 * @param {import('@docusaurus/types').LoadContext} context
 * @returns {import('@docusaurus/types').Plugin}
 */
async function casestudiesGlobalDataPlugin(context, options) {
  const currentLocale = context.i18n.currentLocale;
  const caseStudiesDir =
    currentLocale === "zh"
      ? path.join(context.siteDir, "i18n/zh/docusaurus-plugin-content-page/case-studies")
      : path.join(context.siteDir, "src/pages/case-studies");
  const casestudiesPlugin = await pluginContentPage.default(context, {
    ...options,
    routeBasePath: "case-studies",
    path: caseStudiesDir,
    id: "casestudiesGlobalDataPlugin",
  });

  return {
    name: "casestudies-global-dataPlugin",
    async loadContent() {
      const content = await casestudiesPlugin.loadContent();

      return content;
    },
    contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;

      setGlobalData({ casestudiesGlobalData: content.blogPosts });
    },
  };
}

casestudiesGlobalDataPlugin.validateOptions = pluginContentPage.validateOptions;

module.exports = casestudiesGlobalDataPlugin;
