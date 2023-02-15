import React, { useState } from "react"
import { Layout, Breadcrumb, Card } from "antd"
import { useSelector } from "react-redux"
import "./FirmsList.css"
import { PlusSquareOutlined } from "@ant-design/icons"
import FirmCard from "./FirmCard"
import FirmCreate from "../FirmCreate"

const { Content } = Layout

function FirmsList() {
  const [drawerVisible, setdrawerVisible] = useState(false) // drawer to create firm

  const showDrawer = () => {
    setdrawerVisible(true)
  }

  const onClose = () => {
    setdrawerVisible(false)
  }

  const firms = useSelector((state) => state)

  return (
    <Content className="content site-drawer-render-in-current-wrapper">
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        <h1>Firms List</h1>
        <div className="firms-list">
          {firms.map((firm) => (
            <FirmCard firm={firm} key={firm.id} />
          ))}
          <Card
            hoverable
            onClick={showDrawer}
            className="add-firm-card"
            style={{ width: 300, marginTop: 16 }}
          >
            <PlusSquareOutlined
              style={{ fontSize: "36px" }}
              twoToneColor="#7e1232"
            />
            <span>Add Firm</span>
          </Card>
        </div>
      </div>

      <FirmCreate onClose={onClose} drawerVisible={drawerVisible} />
    </Content>
  )
}

export default FirmsList
