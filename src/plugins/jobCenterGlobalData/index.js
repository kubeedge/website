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
async function jobcenterGlobalDataPlugin(context, options) {
  const currentLocale = context.i18n.currentLocale;
  const jobCenterDir =
    currentLocale === "zh"
      ? path.join(context.siteDir, "i18n/zh/docusaurus-plugin-content-page/job-center")
      : path.join(context.siteDir, "src/pages/job-center");
  const jobcenterPlugin = await pluginContentPage.default(context, {
    ...options,
    routeBasePath: "job-center",
    path: jobCenterDir,
    id: "jobcenterGlobalDataPlugin",
  });

  return {
    name: "jobcenter-global-dataPlugin",
    async loadContent() {
      const content = await jobcenterPlugin.loadContent();

      return content;
    },
    contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;

      setGlobalData({ jobcenterGlobalData: content.blogPosts });
    },
  };
}

jobcenterGlobalDataPlugin.validateOptions = pluginContentPage.validateOptions;

module.exports = jobcenterGlobalDataPlugin;
