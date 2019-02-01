+++
# Hero Carousel widget.
widget = "hero_carousel"
active = true
date = 2017-10-15T00:00:00

# Order that this section will appear in.
weight = 1

# Slide interval.
# Use `false` to disable animation or enter a time in ms, e.g. `5000` (5s).
interval = 6000

# Minimum slide height.
# Specify a height to ensure a consistent height for each slide.
height = "350px"

# Slides.
# Duplicate an `[[item]]` block to add more slides.
[[item]]
  title = "Welcome to KubeEdge"
  content = "A Kubernetes Native Edge Computing Framework <br /> <a class=\"github-button\" href=\"https://github.com/kubeedge/kubeedge\" data-icon=\"octicon-star\" data-size=\"large\" data-show-count=\"true\" aria-label=\"Star this on GitHub\">Star</a>"
  align = "center"  # Choose `center`, `left`, or `right`.

  # Overlay a color or image (optional).
  #   Deactivate an option by commenting out the line, prefixing it with `#`.
  overlay_color = "#666"  # An HTML color value.
  overlay_img = "headers/bubbles-wide.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.5  # Darken the image. Value in range 0-1.

  # Call to action button (optional).
  #   Activate the button by specifying a URL and button label below.
  #   Deactivate by commenting out parameters, prefixing lines with `#`.
  cta_label = "Learn More About KubeEdge"
  cta_url = "/en/docs/kubeedge/"
  cta_icon_pack = "fas"
  cta_icon = "graduation-cap"

[[item]]
  title = "Compute at the Edge"
  content = "Reduce transmission costs, shrink latency between the data and the decision, improve quality of service."
  align = "right"

  overlay_color = "#555"  # An HTML color value.
  overlay_img = "headers/header-edge-2.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.65  # Darken the image. Value in range 0-1.

[[item]]
  title = "Simplify development"
  content = "Same code can be run on a device or on the cloud. You can code in any language you know and use existing business logic without any change."
  align = "right"

  overlay_color = "#333"  # An HTML color value.
  overlay_img = "headers/header-code.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.85  # Darken the image. Value in range 0-1.

[[item]]
  title = "Kubernetes-Native"
  content = "KubeEdge is built upon Kubernetes and provides fundamental infrastructure support for network, application management and metadata synchronization between cloud and edge."
  align = "center"

  overlay_color = "#333"  # An HTML color value.
  overlay_img = "headers/header-k8s.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.75  # Darken the image. Value in range 0-1.

[[item]]
  title = "Abundant applications"
  content = "You can easily get and deploy complicated machine learning, image recognition, event processing and other high level applications to your edge side."
  align = "left"

  overlay_color = "#333"  # An HTML color value.
  overlay_img = "headers/header-apps-2.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.75  # Darken the image. Value in range 0-1.

+++

<div class="mt-3">
  <a class="github-button" href="https://github.com/kubeedge/kubeedge" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star this on GitHub">Star</a>
</div>
<script async defer src="https://buttons.github.io/buttons.js"></script>