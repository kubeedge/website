import React, { useMemo } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { TAG_Type_EN, TAG_TYPE_ZH } from "@site/src/const";
import Translate from "@docusaurus/Translate";
import "./index.scss";

export default function TagToggle({ selected, onChange }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const { i18n } = useDocusaurusContext();

  const tagType = useMemo(() => {
    if (i18n.currentLocale === "en") {
      return TAG_Type_EN;
    }

    return TAG_TYPE_ZH;
  }, []);

  const handleOnclick = (tag, index) => {
    setActiveIndex(index);

    if (index === 0) {
      onChange("");
    } else {
      onChange(tag);
    }
  };

  return (
    <div className="tag-toggle-container">
      <div className="tag-toggle-list">
        <div className="title">
          <Translate>Case Category</Translate>
        </div>
        <div className="tag-list">
          {tagType.map((tag, index) => (
            <div
              className={`tag-toggle ${activeIndex === index ? "active" : ""}`}
              key={index}
              onClick={() => handleOnclick(tag, index)}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
