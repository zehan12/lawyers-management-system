import React, { useEffect, useState } from "react"
import { Layout, Breadcrumb, Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import LawyersTable from "./LawyersTable"
import LawyerCreate from "./LawyerCreate"

const { Content } = Layout

function LawyersList() {
  const { firmId } = useParams()
  const firms = useSelector((state) => state)

  const [firmName, setFirmName] = useState("")
  const [drawerVisible, setdrawerVisible] = useState(false) // drawer to create lawyer

  const showDrawer = () => {
    setdrawerVisible(true)
  }

  const onClose = () => {
    setdrawerVisible(false)
  }
  const getFirm = (id) => firms.find((firm) => firm.id === id)

  useEffect(() => {
    const lawyersData = getFirm(firmId)
    setFirmName(lawyersData.name)
  }, [firmId, firms])

  return (
    <Content className="content site-drawer-render-in-current-wrapper">
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/">Firms</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{firmName}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        <h1>Lawyers List</h1>
        <div style={{ float: "right" }}>
          <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
            {" "}
            Add Lawyer
          </Button>
        </div>
        <div className="lawyers-list">
          <LawyersTable />
        </div>
      </div>
      <LawyerCreate firmId={firmId} onClose={onClose} visible={drawerVisible} />
    </Content>
  )
}

export default LawyersList
