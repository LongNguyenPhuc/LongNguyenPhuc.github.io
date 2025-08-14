export { Layout }
import type { LayoutProps } from '../libs/types/common'

import React from 'react'
import '@styles/index.css'

function Layout({ children }: LayoutProps) {
  return (
    <React.StrictMode>
      <Navigation>
        <a href='/'>Home</a>
        <a href='/about'>About</a>
      </Navigation>
      <Content>{children}</Content>
    </React.StrictMode>
  )
}

function Navigation({ children }: LayoutProps) {
  return (
    <div
      style={{
        paddingBottom: 25,
        paddingTop: 5,
        fontSize: '1.2em',
        display: 'flex',
        justifyContent: 'center',
        gap: 25
      }}
    >
      {children}
    </div>
  )
}

function Content({ children }: LayoutProps) {
  return <div>{children}</div>
}
