import React from 'react'
import Link from 'gatsby-link'
import { Wrap, button, Space, text } from 'blocks'
import sortBy from 'sort-by'
import Sticky from 'react-stickynode'
import Helmet from 'react-helmet'

import bem from 'utils/bem'

import 'prismjs/themes/prism-okaidia.css'
import './style.sass'

const b = bem.lock('DocPage')

const PageLink = ({ to, children }) => (
  <Link
    exact
    to={to.path.replace(/.*\/src/, '').replace(/(\/index)?\.md$/, '/')}
    activeClassName="is-active"
  >
    {children}
  </Link>
)

const findFrontmatterValue = (value, page, pages) => {
  if (page.frontmatter[value]) {
    return page.frontmatter[value]
  }

  const contentPage = pages
    .find(p => p.path.includes(page.frontmatter.copyFrom))

  if (contentPage) {
    return contentPage.frontmatter[value]
  }

  return ''
}

const findTitle = findFrontmatterValue.bind(this, 'title');
const findPosition = findFrontmatterValue.bind(this, 'position');

export default class DocAside extends React.Component {

  handleOpenCrisp(e) {
    e.preventDefault();
    $crisp.push(["do", "chat:open"])
  }

  render() {
    const { pathContext, data } = this.props;

    const dir = pathContext.sourcePath.replace(/[^\/]*$/, '');
    const pages = data.pages.edges.map(edge => edge.node);

    const categoryPages = pages
      .filter(page => page.path.replace(/[^\/]*$/, '') === dir)
      .sort((a, b) => (
        findPosition(a, pages) - findPosition(b, pages)
      ));

    const page = categoryPages.find(page => page.path === pathContext.sourcePath);
    const index = categoryPages.indexOf(page)

    const prevPage = index > 0 &&
      categoryPages[index - 1]

    const nextPage = index < categoryPages.length - 1 &&
      categoryPages[index + 1]

    const categoryTitle = findTitle(categoryPages[0], pages);

    return (
      <div>
        <Helmet title={`${index === 0 ? 'Introduction' : findTitle(page, pages)} - ${categoryTitle} - DatoCMS`} />
        <Wrap>
          <div className={b()}>
            <div className={b('menu')} data-datocms-noindex>
              <Sticky top={100}>
                <ul className={b('menu-pages')}>
                  {
                    categoryPages.map((page, i) => (
                      <li key={page.path} className={b('menu-page')}>
                        <PageLink to={page}>
                          {i === 0 ? "Introduction" : findTitle(page, pages)}
                        </PageLink>
                      </li>
                    ))
                  }
                </ul>

                <div className={b('menu-back')}>
                  <Link to="/docs">
                    ‹ Go back to docs
                  </Link>
                </div>

                <div className={b('contribute')}>
                  <div className={b('contribute-title')}>
                    Something is missing in this page?
                  </div>
                  <a href="#" onClick={this.handleOpenCrisp.bind(this)}>Chat with us</a>, submit an <a target="_blank" href="https://github.com/datocms/website/issues/new">issue</a> or <a target="_blank" href={pathContext.repoPath}>propose a change</a> on Github!
                </div>
              </Sticky>
            </div>

            <div className={b('content')}>
              <Space bottom={5}>
                {
                  categoryPages.length > 1 && findPosition(page, pages) !== 1 &&
                    <h6 className={b('content-category')}>
                      {categoryTitle}
                    </h6>
                }
                <h1  className={b('content-title')}>
                  {findTitle(page, pages)}
                </h1>
              </Space>

              <div className={b('content-body')}>
                <div dangerouslySetInnerHTML={{ __html: pathContext.html }} />
                {this.props.children}
              </div>


              <div className={b('nav')}>
                <div className={b('nav-prev')}>
                  {
                    prevPage &&
                      <PageLink to={prevPage}>
                        ‹ {index === 1 ? "Introduction" : findTitle(prevPage, pages)}
                      </PageLink>
                  }
                </div>
                <div className={b('nav-next')}>
                  {
                    nextPage &&
                      <PageLink to={nextPage}>
                        {findTitle(nextPage, pages)} ›
                      </PageLink>
                  }
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </div>
    )
  }
}
