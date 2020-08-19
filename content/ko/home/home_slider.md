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
height = "350px"

# Slides.
# Duplicate an `[[item]]` block to add more slides.
[[item]]
  title = "KubeEdge v1.3 발표"
  align = "center"

  overlay_color = "#555"  # An HTML color value.
  overlay_img = "headers/header-kubecon.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.25  # Darken the image. Value in range 0-1.

  cta_label = "세부 정보 확인"
  cta_url = "/en/blog/release-v1.3"
  cta_icon_pack = "fas"
  cta_icon = "fa fa-bullhorn"

[[item]]
  title = "KubeEdge에 오신걸 환영합니다."
  content = "쿠버네티스 네이티브 엣지 컴퓨팅 프레임워크 <br /> <a class=\"github-button\" href=\"https://github.com/kubeedge/kubeedge\" data-icon=\"octicon-star\" data-size=\"large\" data-show-count=\"true\" aria-label=\"Star this on GitHub\">Star</a>"
  align = "center"  # Choose `center`, `left`, or `right`.

  # Overlay a color or image (optional).
  #   Deactivate an option by commenting out the line, prefixing it with `#`.
  overlay_color = "#666"  # An HTML color value.
  overlay_img = "headers/bubbles-wide.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.5  # Darken the image. Value in range 0-1.

  # Call to action button (optional).
  #   Activate the button by specifying a URL and button label below.
  #   Deactivate by commenting out parameters, prefixing lines with `#`.
  cta_label = "KubeEdge에 대하여 더 공부해보기"
  cta_url = "https://docs.kubeedge.io"
  cta_icon_pack = "fas"
  cta_icon = "graduation-cap"

[[item]]
  title = "엣지에서의 연산"
  content = "전송 비용을 줄이고 데이터와 의사 결정 사이의 대기 시간을 줄이며 서비스 품질을 향상시킵니다."
  align = "right"

  overlay_color = "#555"  # An HTML color value.
  overlay_img = "headers/header-edge-2.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.65  # Darken the image. Value in range 0-1.

[[item]]
  title = "개발환경 단순화"
  content = "개발자들은 일반적으로 사용되는 http나 mqtt 기반의 응용 프로그램을 작성할 수 있습니다. 어플리케이션은 컨테이너화 될 수 있으며, 엣지와 클라우드 환경 모두에서 실행 가능합니다."
  align = "left"

  overlay_color = "#333"  # An HTML color value.
  overlay_img = "headers/header-code.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.85  # Darken the image. Value in range 0-1.

[[item]]
  title = "쿠버네티스 네이티브"
  content = "KubeEdge는 쿠버네티스를 기반으로 합니다. 기존 쿠버네티스 클러스터와 마찬가지로 엣지 노드에서 앱을 조정하고 장치를 관리하며, 앱 및 장치의 상태를 모니터링 할 수 있습니다."
  align = "center"

  overlay_color = "#333"  # An HTML color value.
  overlay_img = "headers/header-k8s.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.75  # Darken the image. Value in range 0-1.

[[item]]
  title = "풍부한 응용"
  content = "기존의 복잡한 기계 학습, 이미지 인식, 이벤트 처리 및 기타 고급 응용 프로그램을 엣지에 쉽게 배포 할 수 있습니다."
  align = "left"

  overlay_color = "#333"  # An HTML color value.
  overlay_img = "headers/header-apps-2.jpg"  # Image path relative to your `static/img/` folder.
  overlay_filter = 0.75  # Darken the image. Value in range 0-1.

+++

<div class="mt-3">
  <a class="github-button" href="https://github.com/kubeedge/kubeedge" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star this on GitHub">Star</a>
</div>
<script async defer src="https://buttons.github.io/buttons.js"></script>
