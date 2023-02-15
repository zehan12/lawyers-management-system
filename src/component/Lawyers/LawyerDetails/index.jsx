import React, { useEffect, useState } from "react"
import * as R from "ramda"
import { Tag, Descriptions, Breadcrumb, Layout, Button } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { BOOK_LAWYER_SLOTS, FORMAT_DATA } from "@/redux/constants"
import { formatSingleLawyerData, getDataFromId } from "../../utils"
import SlotsBooking from "./SlotsBooking"

const { Content } = Layout

function LawyerDetails() {
  const dispatch = useDispatch()
  const { firmId, lawyerId } = useParams()
  const firms = useSelector((state) => state)
  const [formattedLawyer, setFormattedLawyer] = useState({})
  const [drawerVisible, setdrawerVisible] = useState(false) // drawer to bookSlot

  const firm = getDataFromId(firms, firmId)
  const lawyersData = firm.lawyers
  const lawyer = getDataFromId(lawyersData, lawyerId)

  const showDrawer = () => {
    setdrawerVisible(true)
  }

  const onClose = () => {
    setdrawerVisible(false)
  }

  const onBook = (selectedSlot) => {
    dispatch({
      type: BOOK_LAWYER_SLOTS,
      payload: {
        firmId,
        lawyerId,
        selectedSlot,
      },
    })
  }

  useEffect(() => {
    if (firm.formattedData) {
      setFormattedLawyer(lawyer)
    } else {
      setFormattedLawyer(formatSingleLawyerData(lawyer))
      dispatch({
        type: FORMAT_DATA,
        payload: {
          firmId,
        },
      })
    }
  }, [firmId, lawyerId, firms])

  if (R.isEmpty(formattedLawyer)) return <div>loading...</div>

  return (
    <Content className="content site-drawer-render-in-current-wrapper">
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/">Firms</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/firms/${firm.id}`}>{firm.name}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{lawyer.name}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        <Descriptions title="Lawyer Details">
          <Descriptions.Item span={3} label="Name">
            {lawyer?.name}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Speciality">
            {formattedLawyer?.speciality?.map((speciality) => (
              <Tag key={speciality}>{speciality}</Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Availablity">
            {formattedLawyer?.availablity?.startTime}:00 -{" "}
            {formattedLawyer?.availablity?.endTime}
            :00
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Available Slots">
            {formattedLawyer.totalSlots -
              formattedLawyer.slots.filter((slot) => slot.booked).length}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Booking History">
            {formattedLawyer?.slots
              ?.filter((s) => s.booked)
              .map((slot) => (
                <Tag key={slot.id}>
                  {slot.startTime}:00 - {slot.endTime}:00
                </Tag>
              ))}
          </Descriptions.Item>
        </Descriptions>
        <Button onClick={showDrawer}>Book Slot</Button>
      </div>
      <SlotsBooking
        onBook={onBook}
        onClose={onClose}
        visible={drawerVisible}
        lawyer={formattedLawyer}
      />
    </Content>
  )
}

export default LawyerDetails
