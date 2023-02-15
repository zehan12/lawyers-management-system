import { FORMAT_DATA } from "@/redux/constants"
import { Table, Tag } from "antd"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { formatLawyersData, getDataFromId } from "@/component/utils"
import "./LawyersTable.css"

function LawyersTable() {
  const { firmId } = useParams()
  const firms = useSelector((state) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formattedlawyers, setFormattedLawyers] = useState([])

  const firm = getDataFromId(firms, firmId)
  const lawyersData = firm.lawyers

  useEffect(() => {
    if (firm.formattedData) {
      setFormattedLawyers(lawyersData)
    } else {
      setFormattedLawyers(formatLawyersData(lawyersData))
      dispatch({
        type: FORMAT_DATA,
        payload: {
          firmId,
        },
      })
    }
  }, [firmId, lawyersData])

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Speciality",
      dataIndex: "speciality",
      key: "speciality",
      render: (tags) =>
        tags.map((tag) => (
          <Tag key={tag} color="blue">
            {tag}
          </Tag>
        )),
    },
    {
      title: "Slots",
      key: "slots",
      render: (text, record) => (
        <span>
          Available Slots:{" "}
          {record.totalSlots -
            record.slots.filter((slot) => slot.booked).length}
        </span>
      ),
    },
    {
      title: "Cost per session",
      dataIndex: "cost",
      key: "cost",
    },
  ]

  // const expandableIcon = ({ expanded, onExpand, record, ...rest }) =>
  //   !expanded ? (
  //     <Button onClick={(e) => onExpand(record, e)}>Check Availibity</Button>
  //   ) : null
  // <Button onClick={(e) => onExpand(record, e)}>Book</Button>

  // const expandedRowRender = (lawyer, ...rest) => {
  //   console.log()
  //   return (
  //     <SlotsBooking
  //       lawyer={lawyer}
  //       slots={lawyer?.slots?.filter((slot) => !slot.booked)}
  //       onBook={(lawyerId, selectedSlots) => {
  //         const cloneLawyer = { ...lawyer }
  //         cloneLawyer.slots = cloneLawyer.slots.map((slot) => {
  //           if (selectedSlots.some((s) => s.id === slot.id)) {
  //             const newSlot = { ...slot }
  //             newSlot.booking = true
  //             return newSlot
  //           }
  //           return slot
  //         })

  //         dispatch(bookLawyerSlots(firmId, lawyer.id, cloneLawyer))
  //       }}
  //     />
  //   )
  // }

  return (
    <Table
      rowClassName={() => "table-row"}
      onRow={(record) => ({
        onClick: () => {
          navigate(`/firms/${firmId}/lawyers/${record.id}`)
        }, // click row
      })}
      // expandable={{
      //   expandedRowRender,
      //   expandIcon: expandableIcon,
      // }}

      dataSource={formattedlawyers}
      columns={columns}
    />
  )
}

export default LawyersTable
