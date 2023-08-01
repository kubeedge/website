import React from "react";
import { Row, Col } from "antd";
import Layout from "@theme/Layout";
import { usePluginData } from "@docusaurus/useGlobalData";
import CaseCard from "@site/src/components/caseCard";
import TagToggle from "@site/src/components/tagToggle";
import { CARD_BACKGROUND_IMAGE_URL } from "@site/src/const";
import Translate from "@docusaurus/Translate";
import "./index.scss";

export default function CaseStudies() {
  const { casestudiesGlobalData } = usePluginData(
    "casestudies-global-dataPlugin"
  );
  const [filters, setFilters] = React.useState();

  const casestudiesGlobalDataMemo = React.useMemo(() => {
    if (filters) {
      return casestudiesGlobalData.filter((item) =>
        (item.metadata?.frontMatter?.tags ?? []).includes(filters)
      );
    }

    return casestudiesGlobalData;
  }, [filters]);

  return (
    <Layout>
      <div className="case-studies-container">
        <div className="case-studies-header">
          <h1 className="case-studies">
            <Translate>Case Studies</Translate>
          </h1>
          <p className="case-studies-subtitle">
            <Translate>Tell successful stories of using KubeEdge in various business scenarios and the positive effects brought by them</Translate>
          </p>
          <button className="button" type="button">
            <a href="https://github.com/kubeedge/website" target="_blank">
              <Translate>POST YOUR CASE</Translate>
            </a>
          </button>
        </div>
        <div className="case-list">
          <TagToggle selected={filters} onChange={(e) => setFilters(e)} />
          <Row gutter={[48, 48]}>
            {casestudiesGlobalDataMemo.map((item, index) => (
              <Col xs={24} sm={24} md={24} lg={12}>
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
