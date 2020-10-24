+++
# Hero Carousel widget.
widget = "slider"
active = true
date = 2017-10-15T00:00:00

# Order that this section will appear in.
weight = 1

# Slide interval.
# Use `false` to disable animation or enter a time in ms, e.g. `5000` (5s).
interval = 6000

# Minimum slide height.
# Specify a height to ensure a consistent height for each slide.
# height = "1360px"
# Slides.
# Duplicate an `[[item]]` block to add more slides.
[[item]]
  title = "KubeEdge"
  header1 = "Kubernetes"
  header2 = "Native Edge"
  header3 = "Computing Framework"
  align = "left"

  # overlay_color = "#555"  # An HTML color value.
  overlay_img = "headers/header-kubeedge.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0  # Darken the image. Value in range 0-1.
  
  content_center_icon = "/img/hero/content-kubeedge.png" 

  content1_icon = "/img/hero/content-icon1.png"  # Icon path relative to your `static/` folder.

  content1_title = "Seamless Cloud-Edge Coordination"
  content1_line1 = "Bidirectional communication,"
  content1_line2 = "able to talk to edge nodes located in private subnet."
  content1_line3 = "Support both meta data and data."

  content2_icon = "/img/hero/content-icon2.png"
  content2_title = "Edge Autonomy"
  content2_line1 = "Meta Data persistent per node,no list-watch needed "
  content2_line2 = "during node recovery,get ready faster."
  content2_line3 = "Autonomous operation of edge even during"
  content2_line4 = "disconnection from cloud."

  content3_icon = "/img/hero/content-icon3.png"
  content3_title = "Low Resource Readiness"
  content3_line1 = "Can work in constrained resource situations,"
  content3_line2 = "Mmemory foot print ~70mb."
  content3_line3 = "Support CRI,integrate with Containerd,"
  content3_line4 = "CRI- O, less runtime overhead."

  content4_icon = "/img/hero/content-icon4.png"
  content4_title = "Simplified Device COmmunication"
  content4_line1 = "Easy communication between application and"
  content4_line2 = "devices for IOT and Industrial internet."


  # cta_label = "Click here for more details"
  # cta_url = "/en/blog/release-v1.3"
  # cta_icon_pack = "fas"
  # cta_icon = "fa fa-bullhorn"


# [[item]]
  # title = "Welcome to KubeEdge"
  # content = "A Kubernetes Native Edge Computing Framework <br /> <a class=\"github-button\" href=\"https://github.com/kubeedge/kubeedge\" 
  # data-icon=\"octicon-star\" data-size=\"large\" data-show-count=\"true\" aria-label=\"Star this on GitHub\">Star</a>"
  # align = "center"  # Choose `center`, `left`, or `right`.
# 
  # # Overlay a color or image (optional).
  # #   Deactivate an option by commenting out the line, prefixing it with `#`.
  # overlay_color = "#666"  # An HTML color value.
  # overlay_img = "headers/bubbles-wide.jpg"  # Image path relative to your `static/img/` folder.
  # overlay_filter = 0.5  # Darken the image. Value in range 0-1.
# 
  # # Call to action button (optional).
  # #   Activate the button by specifying a URL and button label below.
  # #   Deactivate by commenting out parameters, prefixing lines with `#`.
  # cta_label = "Learn More About KubeEdge"
  # cta_url = "https://docs.kubeedge.io"
  # cta_icon_pack = "fas"
  # cta_icon = "graduation-cap"
# 
# [[item]]
  # title = "Compute at the Edge"
  # content = "Reduce transmission costs, shrink latency between the data and the decision, improve quality of service."
  # align = "right"
# 
  # overlay_color = "#555"  # An HTML color value.
  # overlay_img = "headers/header-edge-2.jpg"  # Image path relative to your `static/img/` folder.
  # overlay_filter = 0.65  # Darken the image. Value in range 0-1.
# 
# [[item]]
  # title = "Simplified development"
  # content = "Developers can write regular http or mqtt based applications; containerize and run anywhere at Edge or Cloud.."
  # align = "left"
# 
  # overlay_color = "#333"  # An HTML color value.
  # overlay_img = "headers/header-code.jpg"  # Image path relative to your `static/img/` folder.
  # overlay_filter = 0.85  # Darken the image. Value in range 0-1.
# 
# [[item]]
  # title = "Kubernetes-Native"
  # content = "KubeEdge is built upon Kubernetes. Users can orchestrate apps, manage devices and monitor app and device status on Edge # nodes just like a traditional Kubernetes cluster in the Cloud"
  # align = "center"
# 
  # overlay_color = "#333"  # An HTML color value.
  # overlay_img = "headers/header-k8s.jpg"  # Image path relative to your `static/img/` folder.
  # overlay_filter = 0.75  # Darken the image. Value in range 0-1.
# 
# [[item]]
  # title = "Abundant applications"
  # content = "It is easy to get and deploy existing complicated machine learning, image recognition, event processing and other high level # applications to the Edge."
  # align = "left"
# 
  # overlay_color = "#333"  # An HTML color value.
  # overlay_img = "headers/header-apps-2.jpg"  # Image path relative to your `static/img/` folder.
  # overlay_filter = 0.75  # Darken the image. Value in range 0-1.

+++

<div class="mt-3">
  <a class="github-button" href="https://github.com/kubeedge/kubeedge" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star this on GitHub">Star</a>
</div>
<script async defer src="https://buttons.github.io/buttons.js"></script>
