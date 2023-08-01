import React from "react";
import Layout from "@theme/Layout";
import { usePluginData } from "@docusaurus/useGlobalData";
import JobCard from "@site/src/components/jobCard";
import Translate from "@docusaurus/Translate";
import "./index.scss";

export default function JobCenter() {
  const { jobcenterGlobalData } = usePluginData("jobcenter-global-dataPlugin");
  console.log(jobcenterGlobalData);

  return (
    <Layout>
      <div className="job-center-container">
        <div className="job-center-header">
          <h1 className="job-center-title">
            <Translate>Job Center</Translate>
          </h1>
          <p className="job-center-subtitle">
            <Translate>Welcome to the KubeEdge Job Center. We wish you the best of luck to find the right job or top telent here.</Translate>
          </p>
          <button className="button" type="button">
            <a href="https://github.com/kubeedge/website" target="_blank">
              <Translate>POST A JOB</Translate>
            </a>
          </button>
        </div>
        <div className="job-list">
          {jobcenterGlobalData.map((item) => (
            <JobCard
              title={item.metadata?.title}
              company={item.metadata?.frontMatter?.company}
              date={item.metadata?.formattedDate}
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
