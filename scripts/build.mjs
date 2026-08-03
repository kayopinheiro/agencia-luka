import {readFile, writeFile} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const PROJECT_ID = '4fkgluuh'
const DATASET = 'production'
const API_VERSION = '2024-01-01'
const PLACEHOLDER_IMAGE = 'https://placehold.co/1120x500'

const CATEGORY_LABELS = {
  branding: 'branding',
  'midias-sociais': 'mídias sociais',
  web: 'web',
  fotografia: 'fotografia',
  trafego: 'tráfego',
}

const QUERY = `*[_type=="case"]|order(order asc){
  title,
  "slug": slug.current,
  category,
  overlayColor,
  "thumbnailUrl": thumbnail.asset->url,
  intro,
  "introImageUrl": introImage.asset->url,
  challengeText,
  "challengeImageUrl": challengeImage.asset->url,
  solutionText,
  results
}`

async function fetchCases() {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(QUERY)}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Sanity query failed: ${res.status} ${res.statusText}`)
  }
  const {result} = await res.json()
  return result
}

function escapeHtml(str) {
  return String(str ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function portableTextToHtml(blocks) {
  if (!Array.isArray(blocks) || blocks.length === 0) return ''
  return blocks
    .map((block) => {
      const text = (block.children || []).map((span) => escapeHtml(span.text)).join('')
      return `            <p>${text}</p>`
    })
    .join('\n')
}

function renderMaisCasesCard(item) {
  return `          <a href="case-${item.slug}.html" class="card-service">
            <div class="card-service__media">
              <img class="card-service__img" src="${item.thumbnailUrl}" alt="${escapeHtml(item.title)}">
              <div class="card-service__overlay" style="background-color:${item.overlayColor}"></div>
              <div class="card-service__arrow">
                <svg viewBox="0 0 24 24"><path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z"/></svg>
              </div>
              <div class="card-service__tags">
                <span class="card-tag"><span class="card-tag__dot"></span>${CATEGORY_LABELS[item.category] || item.category}</span>
              </div>
              <h3 class="card-service__title">${escapeHtml(item.title)}</h3>
            </div>
          </a>`
}

function renderHomeCard(item) {
  return `            <a href="case-${item.slug}.html" class="card-service">
              <div class="card-service__media">
                <img class="card-service__img" src="${item.thumbnailUrl}" alt="${escapeHtml(item.title)}">
                <div class="card-service__overlay" style="background-color:${item.overlayColor}"></div>
                <div class="card-service__arrow">
                  <svg viewBox="0 0 24 24"><path d="M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z"/></svg>
                </div>
                <div class="card-service__tags">
                  <span class="card-tag"><span class="card-tag__dot"></span>${CATEGORY_LABELS[item.category] || item.category}</span>
                </div>
                <h3 class="card-service__title">${escapeHtml(item.title)}</h3>
              </div>
            </a>`
}

function fillTemplate(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return key in values ? values[key] : match
  })
}

async function buildCasePages(cases) {
  const template = await readFile(path.join(root, 'case.template.html'), 'utf8')

  for (const item of cases) {
    const others = cases.filter((c) => c.slug !== item.slug).slice(0, 3)
    const categoryLabel = CATEGORY_LABELS[item.category] || item.category

    const html = fillTemplate(template, {
      title: escapeHtml(item.title),
      slug: item.slug,
      categoryLabel: escapeHtml(categoryLabel),
      description: escapeHtml(
        `Conheça o case ${item.title}: estratégia, desafio, solução e resultados do projeto de ${categoryLabel} desenvolvido pela Agência Luka.`,
      ),
      thumbnailUrl: item.thumbnailUrl,
      introText: escapeHtml(item.intro),
      introImageUrl: item.introImageUrl || PLACEHOLDER_IMAGE,
      challengeText: escapeHtml(item.challengeText),
      challengeImageUrl: item.challengeImageUrl || PLACEHOLDER_IMAGE,
      solutionHtml: portableTextToHtml(item.solutionText),
      resultsText: escapeHtml(item.results),
      maisCasesHtml: others.map(renderMaisCasesCard).join('\n\n'),
    })

    await writeFile(path.join(root, `case-${item.slug}.html`), html)
    console.log(`✔ case-${item.slug}.html`)
  }
}

async function buildHomeGrid(cases) {
  const indexPath = path.join(root, 'index.html')
  const index = await readFile(indexPath, 'utf8')

  const gridHtml = cases.map(renderHomeCard).join('\n\n')
  const startMarker = '<!-- CASES_GRID_START -->'
  const endMarker = '<!-- CASES_GRID_END -->'
  const startIdx = index.indexOf(startMarker)
  const endIdx = index.indexOf(endMarker)

  if (startIdx === -1 || endIdx === -1) {
    throw new Error(`Markers ${startMarker} / ${endMarker} not found in index.html`)
  }

  const updated =
    index.slice(0, startIdx + startMarker.length) +
    '\n' +
    gridHtml +
    '\n\n          ' +
    index.slice(endIdx)

  await writeFile(indexPath, updated)
  console.log('✔ index.html cases grid updated')
}

async function main() {
  const cases = await fetchCases()
  if (!cases.length) {
    throw new Error('No case documents found in Sanity — aborting build to avoid wiping content')
  }
  await buildCasePages(cases)
  await buildHomeGrid(cases)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
