import React from "react";
import SectionContainer from "../sectionContainer";
import Translate from "@docusaurus/Translate";
import "./index.scss";

const supportList = [
  {
    name: "ARM",
    img_src: "img/supporters/arm.svg",
    external_link: "https://www.arm.com/",
  },

  {
    name: "BoCloud",
    img_src: "img/supporters/bocloud.svg",
    external_link: "https://www.bocloud.com.cn/product/BeyondEdge",
  },

  {
    name: "China Mobile",
    img_src: "img/supporters/china-mobile.png",
    external_link: "https://www.chinamobileltd.com/en/global/home.php",
  },

  {
    name: "China Southern Power Grid Shenzheng Digital Power Grid",
    img_src: "img/supporters/szdgri.png",
    external_link: "https://www.szdgri.com/",
  },

  {
    name: "China Telecom",
    img_src: "img/supporters/china-telecom.svg",
    external_link: "https://www.chinatelecomglobal.com/",
  },

  {
    name: "ChinaUnicom-WoCloud",
    img_src: "img/supporters/china-unicom-wocloud.png",
    external_link: "https://cucc.wocloud.cn/",
  },

  {
    name: "DaoCloud",
    img_src: "img/supporters/daocloud.svg",
    external_link: "https://www.daocloud.io/",
  },

  {
    name: "EMQ",
    img_src: "img/supporters/emq.svg",
    external_link: "https://www.emqx.com/en",
  },

  {
    name: "Futurewei Technologies",
    img_src: "img/supporters/futurewei-technologies.svg",
    external_link: "https://www.futurewei.com/",
  },

  {
    name: "HuaweiCloud",
    img_src: "img/supporters/huawei.png",
    external_link: "https://www.huaweicloud.com/product/ief.html",
  },

  {
    name: "Harmony Cloud",
    img_src: "img/supporters/harmony-cloud.svg",
    external_link: "https://harmonycloud.cn/product/2",
  },

  {
    name: "Inspur",
    img_src: "img/supporters/inspur.svg",
    external_link: "https://en.inspur.com",
  },

  {
    name: "TenxCloud",
    img_src: "img/supporters/tenxcloud.svg",
    external_link: "https://www.tenxcloud.com/tedge",
  },

  {
    name: "jylink",
    img_src: "img/supporters/jylink.png",
    external_link: "http://www.jylink.com/",
  },

  {
    name: "KubeSphere Container Platform",
    img_src: "img/supporters/kubesphere.svg",
    external_link: "https://kubesphere.io",
  },

  { name: "Orange", 
  img_src: "img/supporters/orange.png", 
  external_link: "https://www.orange.com/en",
  },
  {
    name: "Raisecom Technology",
    img_src: "img/supporters/raisecom-technology.png",
    external_link: "https://www.raisecom.com/",
  },

  {
    name: "XH-iot",
    img_src: "img/supporters/xh-iot.svg",
    external_link: "https://xh-iot.net/",
  },

  {
    name: "CAICT",
    img_src: "img/supporters/CAICT.jpg",
    external_link: "https://www.caict.ac.cn/",
  },

  {
    name: "BUAA",
    img_src: "img/supporters/buaa.png",
    external_link: "https://www.buaa.edu.cn/index.htm",
  },

  {
    name: "Software Engineering Laboratory of Zhejiang University",
    img_src: "img/supporters/SEL-ZJU.svg",
    external_link: "https://www.sel.zju.edu.cn/",
  },

  {
    name: "USTC",
    img_src: "img/supporters/ustc.svg",
    external_link: "https://www.ustc.edu.cn/",
  },

  {
    name: "UESTC",
    img_src: "img/supporters/uestc.png",
    external_link: "https://www.uestc.edu.cn/",
  },

  {
    name: "Zhejiang Lab",
    img_src: "img/supporters/zhejiang-lab.png",
    external_link: "https://www.zhejianglab.com/",
  },

  {
    name: "ictnj",
    img_src: "img/supporters/ictnj.svg",
    external_link: "https://www.ictnj.ac.cn/",
  },

  {
    name: "ci4rail",
    img_src: "img/supporters/ci4rail.png",
    external_link: "https://www.ci4rail.com/",
  },

  {
    name: "vastaitech",
    img_src: "img/supporters/vastaitech.svg",
    external_link: "https://www.vastaitech.com/",
  },

  {
    name: "njhyst",
    img_src: "img/supporters/njhyst.png",
    external_link: "http://njhyst.com/",
  }
];

export default function Supporters() {
  return (
    <SectionContainer className={"supporterContainer"}>
      <h1>
        <Translate>Supporters</Translate>
      </h1>
      <div className={"supporterBoxContainer"}>
        {supportList.map((item, index) => (
          <div key={index} className="supporterBox">
            <div className="imgContainer">
              <img
                alt={item.name}
                src={item.img_src}
                onClick={() => window.open(item.external_link)}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
