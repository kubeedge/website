import React from "react";
import clsx from "clsx";
import Slider from "react-slick";
import Translate from "@docusaurus/Translate";
import { useHistory } from "@docusaurus/router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";

const sliderItems = [
  {
    title: <Translate>Welcome to KubeEdge</Translate>,
    subTitle: (
      <Translate>A Kubernetes Native Edge Computing Framework</Translate>
    ),
    gitRepoUrl: "https://github.com/kubeedge/kubeedge",
    backgroundImage: "img/headers/bubbles-wide.jpg",
    opacity: 0.4,
    align: "center",
  },
  {
    title: <Translate>KubeEdge v1.9 is live!</Translate>,
    subTitle: "",
    button: {
      text: <Translate>Click for more info</Translate>,
      url: "/blog/release-v1.9",
    },
    backgroundImage: "img/headers/header-kubecon.jpg",
    opacity: 0.25,
    align: "center",
  },
  {
    title: <Translate>Compute at the Edge</Translate>,
    subTitle: (
      <Translate>
        Reduce transmission costs, shrink latency between the data and the
        decision, improve quality of service.
      </Translate>
    ),
    backgroundImage: "img/headers/header-edge-2.jpg",
    opacity: 0.5,
    align: "right",
  },
  {
    title: <Translate>Simplified development</Translate>,
    subTitle: (
      <Translate>
        Developers can write regular http or mqtt based applications;
        containerize and run anywhere at Edge or Cloud.
      </Translate>
    ),
    backgroundImage: "img/headers/header-code.jpg",
    opacity: 0.75,
    align: "right",
  },
  {
    title: <Translate>Kubernetes-Native</Translate>,
    subTitle: (
      <Translate>
        KubeEdge is built upon Kubernetes. Users can orchestrate apps, manage
        devices and monitor app and device status on Edge nodes just like a
        traditional Kubernetes cluster in the Cloud.
      </Translate>
    ),
    backgroundImage: "img/headers/header-k8s.jpg",
    opacity: 0.75,
    align: "center",
  },
  {
    title: <Translate>Abundant applications</Translate>,
    subTitle: (
      <Translate>
        It is easy to get and deploy existing complicated machine learning,
        image recognition, event processing and other high level applications to
        the Edge.
      </Translate>
    ),
    backgroundImage: "img/headers/header-apps-2.jpg",
    opacity: 0.75,
    align: "left",
  },
];

const SlideItem = (props) => {
  const {
    title,
    subTitle,
    button,
    backgroundImage,
    gitRepoUrl,
    align = "center",
    opacity = 0.5,
  } = props;

  const history = useHistory();

  return (
    <div
      className={clsx("slick-item", align)}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, ${opacity}), rgba(0, 0, 0, ${opacity})),url(${backgroundImage})`,
      }}
    >
      <div className={clsx("title")}>
        <div className={clsx("main-title")}>{title}</div>
        <div className={clsx("sub-title")}>{subTitle}</div>
      </div>
      {gitRepoUrl && (
        <span style={{ marginTop: 10 }}>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=kubeedge&amp;repo=kubeedge&amp;type=star&amp;count=true&amp;size=large"
            width={160}
            height={30}
            title="GitHub Stars"
          />
        </span>
      )}
      {button && (
        <div className={clsx("button")}>
          <a onClick={() => history.push(button.url)}>{button.text}</a>
        </div>
      )}
    </div>
  );
};

export const HomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={"slider-container"}>
      <Slider {...settings}>
        {sliderItems.map((i, index) => (
          <SlideItem key={index} {...i} />
        ))}
      </Slider>
    </div>
  );
};
