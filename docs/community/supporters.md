---
title: Supporters
sidebar_position: 8
---

# Add Your Company/Organization Logo to the Supporters

We value and appreciate the support of every company and organization in our community. If you believe in our project and would like to show your support, you are welcome to upload your company or organization logo to the [Supporters section](https://kubeedge.io/#supporters) on our official website homepage.

To add your company or organization logo to the Supporters, please follow these two steps

1. Copy your company or organization’s logo in [supporters images](https://github.com/kubeedge/website/tree/master/static/img/supporters) in [kubeedge/website](https://github.com/kubeedge/website) repository, preferably in `.svg` format.

2. Add your company of organization info in [supporter list](https://github.com/kubeedge/website/blob/master/src/components/supporters/index.js) in [kubeedge/website](https://github.com/kubeedge/website) repository like so:
```
{
    name: "Company Name",
    img_src: "img/supporters/{company}.svg", 
    external_link: "Your company website",
},
```

Once you have completed the above steps, you can submit a pull request to the [website repository](https://github.com/kubeedge/website). Our team will review it, and if everything is in order, your company or organization logo will be added to the Supporters section on the KubeEdge website.