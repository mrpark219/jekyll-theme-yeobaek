# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name = "jekyll-theme-yeobaek"
  spec.version = "0.1.0"
  spec.authors = ["SungHwan Park"]
  spec.summary = "A quiet, content-first Jekyll theme for technical writing"
  spec.description = "A light Jekyll blog theme with a Dracula syntax palette, post search, and a table of contents."
  spec.homepage = "https://github.com/mrpark219/jekyll-theme-yeobaek"
  spec.license = "MIT"
  spec.files = Dir.glob("{_layouts,_includes,assets}/**/*").select { |path| File.file?(path) } + %w[README.md LICENSE THIRD_PARTY_NOTICES.md]
  spec.required_ruby_version = ">= 2.7"
  spec.add_runtime_dependency "jekyll", ">= 4.3", "< 5.0"
end
