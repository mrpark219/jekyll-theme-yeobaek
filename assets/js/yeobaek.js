(() => {
  const search = document.getElementById('post-search');
  if (search) {
    const rows = [...document.querySelectorAll('[data-post-row]')];
    const status = document.getElementById('search-status');
    search.addEventListener('input', () => {
      const query = search.value.trim().toLocaleLowerCase();
      let visible = 0;
      rows.forEach((row) => {
        const matches = row.textContent.toLocaleLowerCase().includes(query);
        row.hidden = !matches;
        if (matches) visible += 1;
      });
      status.textContent = query ? `${visible}개 글` : '';
    });
  }

  const article = document.getElementById('article-body');
  if (!article) return;

  const toc = document.getElementById('toc');
  const tocLinks = document.getElementById('toc-links');
  const headings = [...article.querySelectorAll('h2, h3')];
  if (headings.length > 0 && toc && tocLinks) {
    headings.forEach((heading, index) => {
      if (!heading.id) heading.id = `section-${index + 1}`;
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.dataset.level = heading.tagName.slice(1);
      tocLinks.append(link);
    });
    toc.hidden = false;
  }

  article.querySelectorAll('table').forEach((table) => {
    if (table.parentElement.classList.contains('table-wrapper')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper';
    table.replaceWith(wrapper);
    wrapper.append(table);
  });

  const diagramSources = [...article.querySelectorAll('.language-mermaid')];
  if (diagramSources.length && globalThis.mermaid) {
    const diagrams = diagramSources.map((source) => {
      const diagram = document.createElement('div');
      diagram.className = 'mermaid';
      diagram.textContent = source.querySelector('code')?.textContent || source.textContent;
      (source.closest('pre') || source).replaceWith(diagram);
      return diagram;
    });
    globalThis.mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'strict' });
    globalThis.mermaid.run({ nodes: diagrams }).catch(() => {});
  }

  article.querySelectorAll('pre').forEach((pre) => {
    const languageClass = [...(pre.closest('[class*="language-"]')?.classList || [])].find((name) => name.startsWith('language-'));
    const code = pre.querySelector('code');
    const wrapper = document.createElement('div');
    wrapper.className = 'code-frame';
    pre.replaceWith(wrapper);
    wrapper.append(pre);
    const caption = document.createElement('span');
    caption.className = 'code-caption';
    caption.textContent = languageClass ? languageClass.replace('language-', '').toUpperCase() : 'CODE';
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'copy-code';
    copy.textContent = 'Copy';
    copy.setAttribute('aria-label', '코드 복사');
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code?.textContent || pre.textContent);
        copy.textContent = 'Copied';
        setTimeout(() => { copy.textContent = 'Copy'; }, 1600);
      } catch {
        copy.textContent = '복사 실패';
      }
    });
    wrapper.append(caption, copy);
  });
})();
