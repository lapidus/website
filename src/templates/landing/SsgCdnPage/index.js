import React from 'react'
import Link from 'gatsby-link'
import { Wrap, button, Space, text } from 'blocks'

import bem from 'utils/bem'

import '../style.sass'

const b = bem.lock('LandingPage')

export default class SsgCdnPage extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        {data.ssg.name}
        {data.cdn.name}
      </div>
    );
  }
}

export const query = graphql`
  query SsgCdnPageQuery($ssgSlug: String!, $cdnSlug: String!) {
    ssg: datoCmsIntegration(slug: { eq: $ssgSlug }) {
      name
      logo { url }
      projectUrl
      documentationUrl
      slug
    }
    cdn: datoCmsIntegration(slug: { eq: $cdnSlug }) {
      name
      logo { url }
      projectUrl
      documentationUrl
      slug
    }
  }
`

