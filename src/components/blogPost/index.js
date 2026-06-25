import React from "react";
import { usePluginData } from "@docusaurus/useGlobalData";
import Link from "@docusaurus/Link";
import SectionContainer from "../sectionContainer";
import Translate from "@docusaurus/Translate";
import "./index.scss";

export default function BlogPost() {
  const {
    blogGlobalData: { blogPosts },
  } = usePluginData("blog-global-dataPlugin");

  return (
    <SectionContainer className="blogPostContainer">
      <div className="row">
        <div className="left">
          <h1>
            <Translate>Recent News</Translate>
          </h1>
          <Link to="/blog">
            <Translate>View All</Translate>
          </Link>
        </div>
        <div className="right">
          {blogPosts.slice(0, 3).map((item) => (
            <div key={item.metadata.permalink} className="viewBlogContainer">
              <h3>
                <Link className="post-link" to={item.metadata.permalink}>
                  {item.metadata.title}
                </Link>
              </h3>
              {item.metadata?.frontMatter?.summary && (
                <p>{item.metadata?.frontMatter.summary}</p>
              )}
              <div className="info">
                <div className="author">
                  {(item.metadata?.authors || []).map((item) => (
                    <a href={item.url} target="_blank">
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="update-time">
                  <Translate>Last updated on</Translate>{" "}
                  {item.metadata.formattedDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
