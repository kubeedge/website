import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { TAG_Type_EN, TAG_TYPE_ZH } from "@site/src/const";
import Translate from "@docusaurus/Translate";
import "./index.scss";

export default function TagToggle({ selected, onChange }) {
  const { i18n } = useDocusaurusContext();
  const tagType = i18n.currentLocale === "en" ? TAG_Type_EN : TAG_TYPE_ZH;
  const activeIndex = selected ? Math.max(tagType.indexOf(selected), 0) : 0;

  const handleOnclick = (tag, index) => {
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
            <button
              className={`tag-toggle ${activeIndex === index ? "active" : ""}`}
              key={index}
              type="button"
              aria-pressed={activeIndex === index}
              onClick={() => handleOnclick(tag, index)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
