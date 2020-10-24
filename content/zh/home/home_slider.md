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
height = "1360px"

# Slides.
# Duplicate an `[[item]]` block to add more slides.
[[item]]
  title = "KubeEdge"
  header1 = "Kubernetes"
  header2 = "本地优势"
  header3 = "计算框架"
  align = "left"

  # overlay_color = "#555"  # An HTML color value.
  overlay_img = "headers/header-kubeedge.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0  # Darken the image. Value in range 0-1.
  
  content_center_icon = "/img/hero/content-kubeedge.png" 

  content1_icon = "/img/hero/content-icon1.png"  # Icon path relative to your `static/` folder.
  content1_title = "无缝云边缘协调"
  content1_line1 = "双向的沟通,"
  content1_line2 = "能够与位于专用子网的边缘节点通话。"
  content1_line3 = "同时支持元数据和数据。"

  content2_icon = "/img/hero/content-icon2.png"
  content2_title = "边缘的自主权"
  content2_line1 = "每个节点的元数据持久，节点恢复期间"
  content2_line2 = "不需要列表监视，准备得更快。"
  content2_line3 = "即使在与云断开连接时，"
  content2_line4 = "edge也能自主运行。"

  content3_icon = "/img/hero/content-icon3.png"
  content3_title = "低资源准备"
  content3_line1 = "可以在资源有限的情况下工作，"
  content3_line2 = "foot print存储 ~70mb。"
  content3_line3 = "支持CRI，与Containerd集成，"
  content3_line4 = "CRI- O，运行时开销更少。"

  content4_icon = "/img/hero/content-icon4.png"
  content4_title = "简化设备通信"
  content4_line1 = "在物联网和工业互联网的应用程序"
  content4_line2 = "和设备之间方便的通信。"

# [[item]]
  # title = "欢迎来到KubeEdge"
  # content = "Kubernetes原生边缘计算框架 <br /> <a class=\"github-button\" href=\"https://github.com/kubeedge/kubeedge\" data-icon=\"octicon-star\" data-size=\"large\" data-show-count=\"true\" aria-label=\"Star this on # GitHub\">Star</a>"
  # align = "center"  # Choose `center`, `left`, or `right`.
# 
  # # Overlay a color or image (optional).
  # #   Deactivate an option by commenting out the line, prefixing it with `#`.
  # overlay_color = "#666"  # An HTML color value.
  # overlay_img = "headers/bubbles-wide.jpg"  # Image path relative to your # `static/img/` folder.
  # overlay_filter = 0.5  # Darken the image. Value in range 0-1.
# 
  # # Call to action button (optional).
  # #   Activate the button by specifying a URL and button label below.
  # #   Deactivate by commenting out parameters, prefixing lines with `#`.
  # cta_label = "了解有关KubeEdge的更多信息"
  # cta_url = "https://docs.kubeedge.io"
  # cta_icon_pack = "fas"
  # cta_icon = "graduation-cap"
# 
# [[item]]
  # title = "在边缘计算"
  # content = "降低传输成本，缩短数据与决策之间的延迟，提高服务质量。"
  # align = "right"
# 
  # overlay_color = "#555"  # An HTML color value.
  # overlay_img = "headers/header-edge-2.jpg"  # Image path relative to your # `static/img/` folder.
  # overlay_filter = 0.65  # Darken the image. Value in range 0-1.

# [[item]]
  # title = "简化开发"
  # content = "开发人员可以编写常规的基于http或mqtt的应用程序；容纳并在Edge或Cloud# 的任何地方运行。"
  # align = "right"
# 
  # overlay_color = "#333"  # An HTML color value.
  # overlay_img = "headers/header-code.jpg"  # Image path relative to your # `static/img/` folder.
  # overlay_filter = 0.85  # Darken the image. Value in range 0-1.
# 
# [[item]]
  # title = "Kubernetes原生"
  # content = "KubeEdge基于kubernetes构建，为云和边缘之间的网络，应用程序管理和元# 数据同步提供基础架构支持。"
  # align = "center"
# 
  # overlay_color = "#333"  # An HTML color value.
  # overlay_img = "headers/header-k8s.jpg"  # Image path relative to your # `static/img/` folder.
  # overlay_filter = 0.75  # Darken the image. Value in range 0-1.
# 
# [[item]]
  # title = "丰富的应用程序"
  # content = "您可以轻松地将复杂的机器学习，图像识别，事件处理和其他高级应用程序部# 署到您的边缘。 "
  # align = "left"
# 
  # overlay_color = "#333"  # An HTML color value.
  # overlay_img = "headers/header-apps-2.jpg"  # Image path relative to your # `static/img/` folder.
  # overlay_filter = 0.75  # Darken the image. Value in range 0-1.

+++

<div class="mt-3">
  <a class="github-button" href="https://github.com/kubeedge/kubeedge" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star this on GitHub">Star</a>
</div>
<script async defer src="https://buttons.github.io/buttons.js"></script>
