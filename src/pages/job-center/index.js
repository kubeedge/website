import React from "react";
import Layout from "@theme/Layout";
import { usePluginData } from "@docusaurus/useGlobalData";
import JobCard from "@site/src/components/jobCard";
import Translate from "@docusaurus/Translate";
import "./index.scss";

export default function JobCenter() {
  const { jobcenterGlobalData } = usePluginData("jobcenter-global-dataPlugin");

  return (
    <Layout>
      <div className="job-center-container">
        <div className="job-center-header">
          <h1 className="job-center-title">
            <Translate>Job Center</Translate>
          </h1>
          <p className="job-center-subtitle">
            <Translate>
              Welcome to the KubeEdge Job Center. We wish you the best of luck
              to find the right job or top talent here.
            </Translate>
          </p>
          <a
            className="button"
            href="https://github.com/kubeedge/website/blob/master/src/components/jobCard/README.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Translate>POST A JOB</Translate>
          </a>
        </div>
        <div className="job-list">
          {jobcenterGlobalData.map((item, index) => (
            <JobCard
              key={item.metadata?.permalink || item.metadata?.title || index}
              title={item.metadata?.title}
              company={item.metadata?.frontMatter?.company}
              date={item.metadata?.frontMatter?.date}
              expirydate={item.metadata?.frontMatter?.expirydate}
              address={item.metadata?.frontMatter?.address}
              logo={item.metadata?.frontMatter?.logo}
              link={item.metadata?.permalink}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
