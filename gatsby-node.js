const p = require('path')
const groupBy = require('group-by');
const cartesianProduct = require('cartesian-product');

const docPages = ({ graphql, boundActionCreators: { createPage } }) => {
  return graphql(
    `
      {
        files: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/.*docs.*/" } }
        ) {
          edges {
            node {
              path: fileAbsolutePath
              frontmatter {
                copyFrom
              }
            }
          }
        }
      }
    `
  )
  .then(result => {
    const pages = result.data.files.edges.map(edge => edge.node);

    pages.forEach((page) => {
      const { path, frontmatter: { copyFrom, category } } = page
      const url = path.replace(`${__dirname}/src`, '').replace(/(\/index)?\.md$/, '')

      createPage({
        path: url,
        component: p.resolve(`./src/templates/DocPage/index.js`),
        context: { path },
      })
    })
  })
}

const landingPages = ({ graphql, boundActionCreators: { createPage } }) => {
  return graphql(
    `
      {
        integrations: allDatoCmsIntegration {
          edges {
            node {
              slug
              type: integrationType {
                slug
              }
            }
          }
        }
      }
    `
  )
  .then(result => {
    const integrations = result.data.integrations.edges
      .map(edge => edge.node)
      .map(integration => ({ slug: integration.slug, type: integration.type.slug }));

    const byType = groupBy(integrations, 'type');

    byType['static-generator'].forEach(({ slug }) => (
      createPage({
        path: `/cms/${slug}/`,
        component: p.resolve(`./src/templates/landing/SsgPage/index.js`),
        context: { slug },
      })
    ))

    byType['language'].forEach(({ slug }) => (
      createPage({
        path: `/cms/${slug}/`,
        component: p.resolve(`./src/templates/landing/LanguagePage/index.js`),
        context: { slug },
      })
    ))

    byType['framework'].forEach(({ slug }) => (
      createPage({
        path: `/cms/${slug}/`,
        component: p.resolve(`./src/templates/landing/FrameworkPage/index.js`),
        context: { slug },
      })
    ))

    cartesianProduct([
      byType['static-generator'],
      byType['cdn']
    ]).forEach(([{ slug: ssgSlug }, { slug: cdnSlug }]) => (
      createPage({
        path: `/cms/${ssgSlug}/${cdnSlug}/`,
        component: p.resolve(`./src/templates/landing/SsgCdnPage/index.js`),
        context: { ssgSlug, cdnSlug },
      })
    ))

    cartesianProduct([
      byType['static-generator'],
      byType['git']
    ]).forEach(([{ slug: ssgSlug }, { slug: gitSlug }]) => (
      createPage({
        path: `/cms/${ssgSlug}/${gitSlug}/`,
        component: p.resolve(`./src/templates/landing/SsgGitPage/index.js`),
        context: { ssgSlug, gitSlug },
      })
    ))

    cartesianProduct([
      byType['static-generator'],
      byType['cdn'],
      byType['git']
    ]).forEach(([{ slug: ssgSlug }, { slug: cdnSlug }, { slug: gitSlug }]) => (
      createPage({
        path: `/cms/${ssgSlug}/${cdnSlug}/${gitSlug}/`,
        component: p.resolve(`./src/templates/landing/SsgCdnGitPage/index.js`),
        context: { ssgSlug, cdnSlug, gitSlug },
      })
    ))
  });
}

exports.createPages = (options) => {
  return Promise.all([
    docPages(options),
    landingPages(options),
  ]);
}
