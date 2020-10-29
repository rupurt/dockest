/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')

const Container = CompLibrary.Container
const GridBlock = CompLibrary.GridBlock

const Button = props => (
  <div className="pluginWrapper buttonWrapper">
    <a className="button" href={props.href} target={props.target}>
      {props.children}
    </a>
  </div>
)

/**
 * baseUrl: '/dockest/'
 * docsUrl: 'docs'
 */
const createLinkGenerator = ({ siteConfig, language = '', next = false }) => {
  const { baseUrl, docsUrl } = siteConfig
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
  const langPart = `${language ? `${language}/` : ''}`
  const withNext = next ? 'next/' : ''

  return doc => `${baseUrl}${docsPart}${withNext}${langPart}${doc}`
}

class HomeSplash extends React.Component {
  render() {
    const { siteConfig } = this.props
    const { baseUrl } = siteConfig
    const docUrl = createLinkGenerator(this.props)
    const nextDocUrl = createLinkGenerator({
      siteConfig: this.props.siteConfig,
      language: this.props.language,
      next: true,
    })

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    )

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        <img
          style={{ maxWidth: '350px', marginBottom: '50px' }}
          src={`${baseUrl}img/logo.svg`}
          alt={siteConfig.title}
          aria-label="https://github.com/erikengervall/dockest"
        />

        <small>{siteConfig.tagline}</small>
      </h2>
    )

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    )

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <div style={{ width: '100%', marginBottom: 10 }}>
              <Button href={docUrl('introduction')}>Docs - Latest major release</Button>
            </div>
            <div style={{ width: '100%', marginBottom: 10 }}>
              <Button href={nextDocUrl('introduction')}>Docs - Master</Button>
            </div>
            <div style={{ width: '100%' }}>
              <Button target="_blank" href={siteConfig.repoUrl}>
                Github
              </Button>
            </div>
          </PromoSection>
        </div>
      </SplashContainer>
    )
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = '' } = this.props

    const Block = props => (
      <Container padding={['bottom', 'top']} id={props.id} background={props.background}>
        <GridBlock align="center" contents={props.children} layout={props.layout} />
      </Container>
    )

    const Features = () => (
      <div id="feature">
        <Block layout="fourColumn">
          {[
            {
              title: 'Good old JavaScript',
              content:
                'Dockest abstracts away the need for extensive Docker knowledge and eliminates funky bash scripts',
            },
            {
              title: 'Completely modular and extendable',
              content:
                'Dockest is built with modularity in mind, making introduction of new types of services a breeze',
            },
            {
              title: 'Naturally extends your development environment',
              content: 'Dockest utilizes Docker Compose, the very same tool most developers use during development',
            },
          ]}
        </Block>
      </div>
    )

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />

        <div className="mainContainer">
          <Features />
        </div>
      </div>
    )
  }
}

module.exports = Index
