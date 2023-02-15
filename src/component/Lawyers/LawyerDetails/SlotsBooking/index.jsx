import React, { useEffect, useState } from "react"
import { Button, Drawer, Empty, Space, Tag } from "antd"
import "./slotBooking.css"

function SlotsBooking({ lawyer, onBook, onClose, visible }) {
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState({})

  useEffect(() => {
    setAvailableSlots(lawyer.slots.filter((slot) => !slot.booked))
  }, [lawyer])

  const getSelectedSlot = (slot) => selectedSlot.id === slot.id

  const bookSlots = () => {
    onBook(selectedSlot)
  }

  return (
    <Drawer
      title="Slots Booking"
      placement="right"
      closable={false}
      size="large"
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => bookSlots()} type="primary">
            Book Slot
          </Button>
        </Space>
      }
      onClose={onClose}
      visible={visible}
      getContainer={false}
      style={{ position: "absolute" }}
    >
      <div className="expandable-container">
        <div className="expandable-tags">
          {availableSlots.length ? (
            availableSlots.map((slot) => (
              <Tag
                key={slot.id}
                color={!getSelectedSlot(slot) ? "" : "green"}
                onClick={() => setSelectedSlot(slot)}
              >{` ${slot.startTime}:00 - ${slot.endTime}:00 `}</Tag>
            ))
          ) : (
            <Empty description={<span>Appointments not Available</span>} />
          )}
        </div>
      </div>
    </Drawer>
  )
}

export default SlotsBooking
