/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import { Card } from "antd"
import { useDispatch } from "react-redux"
import { DeleteFilled } from "@ant-design/icons"
import { deleteFirm } from "@/redux/actions"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const { Meta } = Card

function FirmCard({ firm }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = () => {
    dispatch(deleteFirm(firm.id))
    toast.success("Firm deleted successfully")
  }

  const handleClick = () => {
    navigate(`/firms/${firm.id}`)
  }

  return (
    <Card
      hoverable
      style={{ width: 300, marginTop: 16 }}
      actions={[<DeleteFilled onClick={handleDelete} key="delete" />]}
    >
      <Meta
        onClick={handleClick}
        title={firm.name}
        description={firm.description}
      />
    </Card>
  )
}

export default FirmCard
