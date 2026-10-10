(() => {
  const search = document.getElementById('post-search');
  if (search) {
    const form = document.getElementById('post-filters');
    const category = document.getElementById('post-category');
    const clear = document.getElementById('clear-filters');
    const status = document.getElementById('search-status');
    const empty = document.getElementById('posts-empty');
    const normalize = (value) => value.normalize('NFC').toLocaleLowerCase();
    const rows = [...document.querySelectorAll('[data-post-row]')].map((element) => ({
      element,
      text: normalize(element.dataset.search),
      categories: JSON.parse(element.dataset.categories),
    }));

    const update = (saveUrl = true) => {
      const query = search.value.trim();
      const terms = normalize(query).split(/\s+/).filter(Boolean);
      let visible = 0;
      rows.forEach(({ element, text, categories }) => {
        const matches = terms.every((term) => text.includes(term)) && (!category.value || categories.includes(category.value));
        element.hidden = !matches;
        if (matches) visible += 1;
      });
      status.textContent = `${visible} ${visible === 1 ? 'post' : 'posts'}`;
      empty.hidden = visible > 0;
      clear.disabled = !query && !category.value;
      if (saveUrl) {
        const url = new URL(window.location.href);
        if (query) url.searchParams.set('q', query);
        else url.searchParams.delete('q');
        if (category.value) url.searchParams.set('category', category.value);
        else url.searchParams.delete('category');
        window.history.replaceState(null, '', url);
      }
    };
    const restore = () => {
      const params = new URL(window.location.href).searchParams;
      search.value = params.get('q') || '';
      category.value = params.get('category') || '';
      if (category.selectedIndex < 0) category.value = '';
      update(false);
    };
    form.hidden = false;
    search.addEventListener('input', () => update());
    category.addEventListener('change', () => update());
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      update();
    });
    clear.addEventListener('click', () => {
      search.value = '';
      category.value = '';
      update();
      search.focus();
    });
    window.addEventListener('popstate', restore);
    // A browser can restore a page from its back/forward cache with newer URL state.
    window.addEventListener('pageshow', restore);
    restore();
  }

  const article = document.getElementById('article-body');
  if (!article) return;

  const toc = document.getElementById('toc');
  const tocLinks = document.getElementById('toc-links');
  const headings = [...article.querySelectorAll('h2, h3')];
  if (headings.length > 0 && toc && tocLinks) {
    headings.forEach((heading, index) => {
      if (!heading.id) {
        let id = `section-${index + 1}`;
        while (document.getElementById(id)) id += '-heading';
        heading.id = id;
      }
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.dataset.level = heading.tagName.slice(1);
      tocLinks.append(link);
    });
    toc.hidden = false;
    const grid = document.querySelector('.article-grid');
    const slot = document.getElementById('mobile-toc-slot');
    const details = document.getElementById('toc-details');
    const mobile = window.matchMedia('(max-width: 720px)');
    const placeToc = () => {
      if (mobile.matches) slot.append(toc);
      else grid.append(toc);
      grid.classList.toggle('has-toc', !mobile.matches);
      details.open = !mobile.matches;
    };
    placeToc();
    mobile.addEventListener('change', placeToc);
    tocLinks.addEventListener('click', (event) => {
      if (mobile.matches && event.target.closest('a')) details.open = false;
    });

    const links = [...tocLinks.querySelectorAll('a')];
    const updateActiveSection = () => {
      let active = 0;
      headings.forEach((heading, index) => {
        if (heading.getBoundingClientRect().top <= 100) active = index;
      });
      links.forEach((link, index) => {
        if (index === active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    let scrollScheduled = false;
    const scheduleActiveSection = () => {
      if (scrollScheduled) return;
      scrollScheduled = true;
      window.requestAnimationFrame(() => {
        updateActiveSection();
        scrollScheduled = false;
      });
    };
    window.addEventListener('scroll', scheduleActiveSection, { passive: true });
    window.addEventListener('resize', scheduleActiveSection);
    window.addEventListener('hashchange', scheduleActiveSection);
    window.addEventListener('load', scheduleActiveSection);
    updateActiveSection();
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
