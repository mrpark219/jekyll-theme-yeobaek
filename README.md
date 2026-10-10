# 여백 (Yeobaek)

여백은 글과 소개에 집중하는 밝은 Jekyll 테마입니다. 테마 저장소에는 공통 레이아웃, 스타일, 기능만 넣고, 글과 이력서는 블로그 저장소에서 관리합니다. 본문은 밝은 배경을 사용하고 코드 블록에만 [Dracula Classic](https://draculatheme.com/) 색상을 적용합니다.

## 시작하기

블로그의 `Gemfile`에 GitHub 저장소와 버전 태그를 지정합니다.

```ruby
gem "jekyll-theme-yeobaek", git: "https://github.com/mrpark219/jekyll-theme-yeobaek.git", tag: "v0.2.6"
gem "jekyll-seo-tag"
gem "jekyll-sitemap"
```

블로그의 `_config.yml`에는 테마와 플러그인을 설정합니다.

```yaml
theme: jekyll-theme-yeobaek
plugins:
  - jekyll-seo-tag
  - jekyll-sitemap

# 기존 /posts/글주소/ 형식을 유지하려면 추가합니다.
defaults:
  - scope:
      path: ""
      type: posts
    values:
      layout: post
      permalink: /posts/:title/
```

테마를 직접 수정하며 확인할 때는 같은 상위 디렉터리에 두 저장소를 놓고 `git:` 설정 대신 `path: "../jekyll-theme-yeobaek"`를 사용할 수 있습니다. 최소 구성은 [`example/`](example/)에서 볼 수 있습니다.

## 블로그에서 관리할 파일

- `_posts/`: 글 원본입니다. 각 글의 제목, 날짜, 설명, 카테고리와 태그를 front matter에 작성합니다.
- `about.md` 또는 `about.html`: 소개 및 이력서입니다. 기본 소개 레이아웃은 `layout: about`을 사용합니다. 별도 마크업으로 이력서를 꾸미려면 블로그에서 직접 작성할 수 있습니다.
- `_data/featured.yml`: 홈에 고정할 대표 글과 외부 링크의 순서입니다.
- `_data/external_posts.yml`: Medium 등 외부에 직접 작성한 글의 제목, 원래 발행일, 주제와 주소입니다. Posts와 홈의 최근 글에 로컬 글과 함께 표시됩니다.
- `_config.yml`: 사이트 주소, 작성자 소개, 연락처, 댓글, 검색 엔진 메타데이터 등의 설정입니다.
- `assets/css/custom.css`: 블로그 전용 스타일입니다. 테마 스타일 뒤에 불러옵니다.
- `robots.txt`: 테마의 `assets/robots.txt`가 사이트 주소에 맞춰 루트 경로에 생성됩니다. 블로그에서 규칙을 바꾸려면 같은 `assets/robots.txt` 경로에 파일을 두고 `permalink: /robots.txt`를 지정합니다.

테마의 `_layouts`나 `_includes`와 같은 경로에 파일을 두면 블로그에서 해당 화면 요소를 바꿀 수 있습니다. 개인 글과 이력서 데이터는 테마에 포함하지 않습니다.

## 주요 설정

```yaml
yeobaek:
  brand: Alex / notes
  owner: Alex
  role: Backend Engineer
  intro_title: 안녕하세요, Alex입니다.
  intro: 직접 겪은 개발 문제와 해결 과정을 기록합니다.
  featured_title: Featured
  social:
    - label: GitHub
      url: https://github.com/example
    - label: Email
      url: mailto:alex@example.com
    - label: LinkedIn
      url: https://www.linkedin.com/in/example/
  comments:
    repo: example/blog
    issue_term: pathname
    label: comment
  custom_css: /assets/css/custom.css
  favicon: /assets/favicon.svg
```

`comments` 설정을 생략하면 댓글 영역이 나타나지 않습니다. 댓글은 GitHub Issues를 이용하는 utterances를 사용하므로, 사용 전 해당 저장소에 utterances 앱을 설치해야 합니다. `favicon`을 생략하면 테마의 기본 SVG 아이콘을 사용하며, 블로그의 `assets/favicon.svg`로 교체할 수 있습니다.

홈의 대표 항목은 다음처럼 지정합니다.

```yaml
- type: post
  title: 대표 글 제목
  description: 글을 한 줄로 소개합니다.
  url: /posts/example/
- type: link
  title: 프로젝트 저장소
  description: 만든 것을 소개합니다.
  url: https://github.com/example/project
  image: /assets/project-cover.png
```

대표 항목의 섹션 제목은 기본적으로 `Featured`이며, `yeobaek.featured_title`에서 `대표 글과 프로젝트` 등으로 바꿀 수 있습니다. 종류 라벨 없이 제목과 설명을 표시하고, 외부 링크에는 도메인명과 ↗, 내부 글에는 →를 표시합니다.

글의 front matter에 `image`가 있으면 홈의 최신 글과 Posts 목록에 썸네일이 표시됩니다. 대표 글은 연결된 글의 이미지를 사용합니다. 외부 링크는 `image`에 직접 고른 대표 이미지를 지정할 수 있고, 기존 `thumbnail` 설정으로 작은 아이콘을 지정하는 방식도 지원합니다. 이미지가 없으면 모든 목록에서 빈 이미지 칸 없이 텍스트만 표시하며, 파비콘을 자동으로 가져오거나 대신 표시하지 않습니다.

## 외부에 작성한 글

Medium 등 외부에 작성한 글은 블로그 저장소의 `_data/external_posts.yml`에 등록합니다. 글 본문은 원래 사이트에서 읽으며, 테마는 제목과 설명을 목록에 표시합니다.

```yaml
- title: Medium에 작성한 글 제목
  description: 글을 한 줄로 소개합니다.
  url: https://medium.com/@username/article
  date: "2026-01-02T09:00:00+09:00"
  source: Medium
  categories: [Development]
  tags: [Jekyll, Writing]
  image: /assets/images/medium-cover.jpg # 선택 사항, 외부 이미지 URL도 가능
```

`title`, `url`, `date`는 필수입니다. `date`는 이 파일에 등록한 날짜가 아니라 **글의 원래 발행일**이며, 시간대가 포함된 ISO 8601 형식을 권장합니다. `categories`와 `tags`는 배열로 작성합니다. `source`를 생략하면 링크의 도메인명을 표시합니다. 외부 사이트에서 날짜나 이미지를 자동으로 수집하지는 않습니다.

Posts와 홈의 최근 글은 로컬 글과 외부 글을 발행일 기준 최신순으로 합쳐 표시합니다. 같은 URL은 한 번만 표시하며, 로컬 글과 겹치면 로컬 글을 사용합니다. `_data/featured.yml`은 홈의 고정 항목과 순서만 관리하며, Posts의 정렬에는 영향을 주지 않습니다. 외부 글을 홈에 고정하려면 제목과 설명을 다시 입력할 필요 없이 다음처럼 연결할 수 있습니다.

```yaml
- type: link
  url: https://medium.com/@username/article
```

이 경우 `external_posts.yml`의 제목·설명·이미지를 재사용합니다. `featured.yml`에서 직접 지정한 값이 있으면 그 값을 우선합니다. 프로젝트나 다른 외부 링크는 기존처럼 `featured.yml`에만 등록해도 되며, Posts에는 추가되지 않습니다.

## 포함된 기능과 스타일

- **Posts 검색:** 로컬·외부 글의 제목, 전체 설명, 카테고리, 태그, 출처를 검색하고 카테고리로 필터링합니다. 여러 검색어는 모두 일치하는 글을 찾습니다. 검색어와 주제는 URL의 `q`, `category`에 유지되어 새로고침하거나 주소를 공유해도 복원됩니다. 결과 수, 검색 결과 없음 안내와 필터 초기화를 제공합니다. 별도 검색 서비스는 필요하지 않습니다.
- **글 목차:** 글의 H2·H3 제목으로 생성하고 현재 읽는 항목을 강조합니다. 모바일에서는 글 제목과 메타 정보 아래에 접이식 목차로 표시합니다. 목차가 없는 글은 한 열로 표시합니다.
- **이전 글·다음 글:** 본문 하단에 발행일 순서로 바로 이전 글과 다음 글을 표시합니다. 카테고리·태그와 관계없이 외부 글도 포함하며, 첫 글과 마지막 글에서는 존재하는 방향만 표시합니다. 전체 목록 링크도 제공합니다.
- **코드와 다이어그램:** 코드 글꼴은 D2Coding, 코드 색상은 Dracula Classic을 사용합니다. Mermaid는 테마에 포함된 파일을 불러옵니다.
- **SEO:** `jekyll-seo-tag`와 `jekyll-sitemap`을 블로그에 설치하면 메타데이터와 사이트맵을 생성합니다. 실제 색인 여부는 검색 엔진의 판단에 따릅니다.

외부 글꼴·색상·라이브러리의 라이선스는 [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md)를 확인하세요.

## 로컬 실행

```sh
cd example
bundle install
bundle exec jekyll serve
```

실제 블로그를 실행할 때는 블로그 저장소에서 같은 명령을 사용합니다. GitHub 의존성을 사용하면 `bundle install`이 지정된 태그의 테마를 받아옵니다. `example/`은 테마 개발용이므로 로컬 `path:`를 사용합니다.
