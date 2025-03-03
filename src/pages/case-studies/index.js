import React from "react";
import { Row, Col } from "antd";
import Layout from "@theme/Layout";
import { usePluginData } from "@docusaurus/useGlobalData";
import CaseCard from "@site/src/components/caseCard";
import TagToggle from "@site/src/components/tagToggle";
import { CARD_BACKGROUND_IMAGE_URL } from "@site/src/const";
import Translate from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "./index.scss";

export default function CaseStudies() {
  const { i18n } = useDocusaurusContext();
  const { casestudiesGlobalData } = usePluginData(
    "casestudies-global-dataPlugin"
  );
  const [filters, setFilters] = React.useState(null);

  const filteredCaseStudies = React.useMemo(() => {
    return filters
      ? casestudiesGlobalData.filter((item) =>
          (item.metadata?.frontMatter?.tags ?? []).includes(filters)
        )
      : casestudiesGlobalData;
  }, [filters, casestudiesGlobalData]);

  return (
    <Layout>
      <div className="case-studies-container">
        <div className="case-studies-header">
          <h1 className="case-studies-title">
            <Translate>Case Studies</Translate>
          </h1>
          <p className="case-studies-subtitle">
            <Translate>
              Showcase of KubeEdge-based solutions and successful stories of
              using KubeEdge in various business scenarios and the positive
              effects brought by them.
            </Translate>
          </p>
          <button className="post-button">
            <a
              href={`https://kubeedge.io/${i18n.currentLocale}/docs/community/casestudies/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Translate>POST YOUR CASE</Translate>
            </a>
          </button>
        </div>
        <div className="case-list">
          <TagToggle selected={filters} onChange={(e) => setFilters(e)} />
          <Row gutter={[24, 24]}>
            {filteredCaseStudies.map((item, index) => (
              <Col xs={24} sm={24} md={12} lg={8} key={index}>
                <CaseCard
                  title={item.metadata?.title}
                  subTitle={item.metadata?.frontMatter?.subTitle}
                  date={item.metadata?.formattedDate}
                  desc={item.metadata?.description}
                  imgUrl={
                    item.metadata?.frontMatter?.background ||
                    CARD_BACKGROUND_IMAGE_URL[
                      index % CARD_BACKGROUND_IMAGE_URL.length
                    ]
                  }
                  link={item.metadata?.permalink}
                  tags={item.metadata?.frontMatter?.tags}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Layout>
  );
}
