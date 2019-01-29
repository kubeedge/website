+++
# Hero Carousel widget.
widget = "hero_carousel"
active = true
date = 2017-10-15T00:00:00

# Order that this section will appear in.
weight = 1

# Slide interval.
# Use `false` to disable animation or enter a time in ms, e.g. `5000` (5s).
interval = 5000

# Minimum slide height.
# Specify a height to ensure a consistent height for each slide.
height = "350px"

# Slides.
# Duplicate an `[[item]]` block to add more slides.
[[item]]
  title = "嗨！我是KubeEdge"
  content = "一个支持Edge计算的开放平台 :smile:"
  align = "center"  # Choose `center`, `left`, or `right`.

  # Overlay a color or image (optional).
  #   Deactivate an option by commenting out the line, prefixing it with `#`.
  overlay_color = "#666"  # An HTML color value.
  overlay_img = "headers/bubbles-wide.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.5  # Darken the image. Value in range 0-1.

  # Call to action button (optional).
  #   Activate the button by specifying a URL and button label below.
  #   Deactivate by commenting out parameters, prefixing lines with `#`.
  cta_label = "了解有关KubeEdge的更多信息"
  cta_url = "https://github.com/kubeedge/kubeedge"
  cta_icon_pack = "fas"
  cta_icon = "graduation-cap"

[[item]]
  title = "在边缘计算"
  content = "降低传输成本，缩短数据与决策之间的延迟，提高服务质量。"
  align = "left"

  overlay_color = "#555"  # An HTML color value.
  overlay_img = "headers/bubbles-wide.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.5  # Darken the image. Value in range 0-1.

[[item]]
  title = "简化开发"
  content = "相同的代码可以在设备或云中运行，您可以使用您知道的任何语言进行编码，并使用现有的业务逻辑而无需任何更改。"
  align = "right"

  overlay_color = "#333"  # An HTML color value.
  overlay_img = "headers/bubbles-wide.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.5  # Darken the image. Value in range 0-1.

[[item]]
  title = "Kubernetes本土"
  content = "KubeEdge基于kubernetes构建，为云和边缘之间的网络，应用程序管理和元数据同步提供基础架构支持。"
  align = "left"

  overlay_color = "#333"  # An HTML color value.
  overlay_img = "headers/bubbles-wide.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.5  # Darken the image. Value in range 0-1.

[[item]]
  title = "丰富的应用程序"
  content = "您可以轻松地将复杂的机器学习，图像识别，事件处理和其他高级应用程序部署到您的边缘。 "
  align = "right"

  overlay_color = "#333"  # An HTML color value.
  overlay_img = "headers/bubbles-wide.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.5  # Darken the image. Value in range 0-1.

+++
