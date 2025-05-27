import React from 'react';
import Layout from '@theme/Layout';
import VideosContent from '@site/src/pages/video-tutorials/videos.mdx';
import './index.scss';

export default function VideoTutorials() {
  return (
    <Layout title="KubeEdge Video Tutorials">
      <div className="video-tutorials-page">
        <div className="video-header">
          <h1 className="video-title">KubeEdge Learning Video List</h1>
        </div>
        <div className="video-content">
          <div className="video-md">
            <VideosContent />
          </div>
        </div>
      </div>
    </Layout>
  );
}
