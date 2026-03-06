const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const exportDir = path.join(__dirname, '..', '..', '..', 'zee-crawled', 'export', 'pages');
const sitemapPath = path.join(__dirname, '..', '..', '..', 'zee-crawled', 'export', 'sitemap.json');
const outDir = path.join(__dirname, '..', 'src', 'content', 'writing');

function slugFromUrl(url) {
  try {
    const u = new URL(url);
    let p = u.pathname.replace(/^\//, '').replace(/\/$/, '');
    if (!p) p = 'home';
    return p.replace(/\//g, '-');
  } catch (e) {
    return url.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  }
}

function ensureOutDir() {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
}

function extractContent(html) {
  const $ = cheerio.load(html);
  // prefer div[property="text"] as in crawled pages
  const contentEl = $('[property="text"]').first();
  if (contentEl.length) return contentEl.html();
  // fallback: article content
  const article = $('article').first();
  if (article.length) return article.html();
  // fallback: body
  return $('body').html();
}

function extractTitle(html) {
  const $ = cheerio.load(html);
  const h1 = $('h1').first().text().trim();
  if (h1) return h1;
  const t = $('title').text().trim();
  return t || 'Post';
}

function extractDate(html) {
  const $ = cheerio.load(html);
  const meta = $('meta[property="datePublished"]').attr('content') || $('meta[name="date"]').attr('content');
  if (meta) return meta;
  const meta2 = $('meta[class="uk-margin-remove-adjacent"][property="datePublished"]').attr('content');
  if (meta2) return meta2;
  return '';
}

function extractExcerpt(contentHtml) {
  if (!contentHtml) return '';
  const $ = cheerio.load(contentHtml);
  const p = $('p').first().text().trim();
  return p || '';
}

function writeMarkdown(slug, frontmatter, contentHtml) {
  const fm = ['---'];
  Object.keys(frontmatter).forEach((k) => {
    if (frontmatter[k]) fm.push(`${k}: "${String(frontmatter[k]).replace(/"/g, '\\"')}"`);
  });
  fm.push('---\n');
  const md = fm.join('\n') + '\n' + (contentHtml || '');
  fs.writeFileSync(path.join(outDir, `${slug}.md`), md, 'utf8');
}

function run() {
  ensureOutDir();
  const sitemap = JSON.parse(fs.readFileSync(sitemapPath, 'utf8'));
  sitemap.forEach((url) => {
    // map url to local export path
    try {
      const u = new URL(url);
      let p = u.pathname.replace(/^\//, '').replace(/\/$/, '');
      if (!p) p = 'index';
      const localPath = path.join(exportDir, p, 'index.html');
      if (!fs.existsSync(localPath)) {
        // try direct file (e.g., pray.html)
        const alt = path.join(exportDir, `${p}.html`);
        if (fs.existsSync(alt)) {
          const html = fs.readFileSync(alt, 'utf8');
          const title = extractTitle(html);
          const content = extractContent(html);
          const date = extractDate(html);
          const excerpt = extractExcerpt(content);
          const slug = slugFromUrl(url);
          writeMarkdown(slug, { title, date, excerpt }, content);
          console.log('Imported', url, '->', slug);
        } else {
          console.warn('Missing export for', url);
        }
        return;
      }

      const html = fs.readFileSync(localPath, 'utf8');
      const title = extractTitle(html);
      const content = extractContent(html);
      const date = extractDate(html);
      const excerpt = extractExcerpt(content);
      const slug = slugFromUrl(url);
      writeMarkdown(slug, { title, date, excerpt }, content);
      console.log('Imported', url, '->', slug);
    } catch (e) {
      console.error('Error processing', url, e.message);
    }
  });
}

run();
