import React from "react"
import { Layout } from "antd"
import "./MainLayout.css"
import { Link } from "react-router-dom"

const { Header, Footer } = Layout

function MainLayout({ children }) {
  const logo = "https://i.postimg.cc/Y9SJD8Kp/pngegg-1.png"
  return (
    <Layout className="layout">
      <Header className="header">
        <Link to="/">
          <div className="logo">
            <img src={logo} className="logo-image" alt="logo" />
          </div>
        </Link>
      </Header>
      {children}
      <Footer style={{ textAlign: "center" }}>
        Made With ❤️ and ☕ by Zehan Khan
      </Footer>
    </Layout>
  )
}

export default MainLayout
