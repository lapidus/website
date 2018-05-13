import React from 'react'
import bem from 'utils/bem'

import { Wrap, button, Space, Text } from 'blocks'
import './style.sass'

import logo from 'images/dato_logo_full.svg'

const b = bem.lock('Navbar')

const Navbar = ({ linkComponent: Link }) => (
  <div className={b()} data-datocms-noindex>
    <Space both={3}>
      <Wrap>
        <div className={b('inner')}>
          <div className={b('logo-container')}>
            <Link className={b('logo')} to="/">
              <img src={logo} alt="DatoCMS" />
            </Link>
          </div>
          <div className={b('nav')}>
            <Link className={b('text-link')} activeClassName={b('text-link', { active: true })} to="/features/">
              Features
            </Link>
            <Link className={b('text-link')} activeClassName={b('text-link', { active: true })} to="/use-cases/">
              Use cases
            </Link>
            <Link className={b('text-link')} activeClassName={b('text-link', { active: true })} to="/pricing/">
              Pricing
            </Link>
            <Link className={b('text-link')} activeClassName={b('text-link', { active: true })} to="/docs/">
              Learn
            </Link>
            <Link className={b('text-link')} activeClassName={b('text-link', { active: true })} to="/blog/">
              Blog
            </Link>
            <div className={b('text-link', { handle: true })}>
              <span>Support</span>
              <div className={b('menu')}>
                <a className={b('menu-item')} href="/support/" rel="nofollow">
                  Open a ticket
                </a>
                <a className={b('menu-item')} href="https://github.com/datocms/feature-requests/issues" rel="nofollow">
                  Feature requests
                </a>
                <a className={b('menu-item')} href="/slack/">
                  Slack community
                </a>
              </div>
            </div>
          </div>
          <div className={b('actions')}>
            <a className={b('text-link')} href="https://dashboard.datocms.com/sign_in">
              Login
            </a>
            <a className={button({ red: true })} href="https://dashboard.datocms.com/register">
              Try it free
            </a>
          </div>
        </div>
      </Wrap>
    </Space>
  </div>
)

export default Navbar

