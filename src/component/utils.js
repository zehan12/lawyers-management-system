import * as R from "ramda"

export const formatSingleLawyerData = (lawyer) => {
  const {
    availablity: { startTime, endTime },
  } = lawyer
  const totalSlots = endTime - startTime
  const slotsList = []

  for (let i = 0; i < totalSlots; i += 1) {
    const id = `${String(+startTime + i)}-${String(+startTime + i + 1)}`
    const slotPresent = lawyer?.slots?.find((slot) => slot.id === id)

    if (slotPresent) {
      slotsList.push(slotPresent)
    }
    slotsList.push({
      id,
      startTime: Number(startTime) + i,
      endTime: Number(startTime) + i + 1,
      booked: false,
    })
  }
  return {
    ...lawyer,
    key: lawyer.id,
    totalSlots: lawyer.availablity.endTime - lawyer.availablity.startTime,
    slots: slotsList,
  }
}

export const formatLawyersData = (lawyers) =>
  lawyers.map((lawyer) => formatSingleLawyerData(lawyer))

export const getIndexFromId = (arr, id) => arr.findIndex((v) => v.id === id)

export const getDataFromId = (arr, id) => arr.find((v) => v.id === id)

export const toggleSlot = (lawyer, slotId, isBooked) => {
  const lawyerClone = R.clone(lawyer)
  const slotIndex = getIndexFromId(lawyerClone.slots, slotId)
  const slot = R.clone(lawyerClone.slots[slotIndex])
  slot.booked = isBooked
  lawyerClone.slots[slotIndex] = slot
  return [...lawyerClone.slots]
}
