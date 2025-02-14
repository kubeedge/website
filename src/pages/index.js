import React from "react";
import Layout from "@theme/Layout";
import { HomeSlider } from "@site/src/components/slider";
import About from "@site/src/components/about";
import Why from "@site/src/components/why";
import Supporters from "@site/src/components/supporters";
import BlogPost from "@site/src/components/blogPost";
import CncfCard from "@site/src/components/cncfcard";
import "./index.scss";
export default function Home() {
  return (
    <Layout>
      <HomeSlider />
      <About />
      <Why />
      <div id="supporters">
        <Supporters />
      </div>
      <BlogPost />
      <CncfCard />
    </Layout>
  );
}
