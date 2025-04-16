import React from "react";
import { usePluginData } from "@docusaurus/useGlobalData";
import SectionContainer from "../sectionContainer";
import { useHistory } from "@docusaurus/router";
import Translate from "@docusaurus/Translate";
import "./index.scss";

export default function BlogPost() {
  const {
    blogGlobalData: { blogPosts },
  } = usePluginData("blog-global-dataPlugin");

  const history = useHistory();

  return (
    <SectionContainer className="blogPostContainer">
      <div className="row">
        {/* Left Section - Title and View All */}
        <div className="left">
          <h1 className="newsTitle">
            <Translate>Recent News</Translate>
          </h1>
          <a onClick={() => history.push("blog")} className="viewAll">
            <Translate>View All</Translate>
          </a>
        </div>

        {/* Right Section - Blog Posts */}
        <div className="right">
          {blogPosts.slice(0, 3).map((item, index) => (
            <div key={index} className="viewBlogContainer">
              <h3
                className="blogTitle"
                onClick={() => history.push(item.metadata.permalink)}
              >
                {item.metadata.title}
              </h3>
              {item.metadata?.frontMatter?.summary && (
                <p className="blogSummary">
                  {item.metadata?.frontMatter.summary}
                </p>
              )}
              <div className="info">
                <div className="author">
                  {(item.metadata?.authors || []).map((author) => (
                    <a href={author.url} target="_blank">
                      {author.name}
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
