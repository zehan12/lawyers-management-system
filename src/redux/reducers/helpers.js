import {
  formatLawyersData,
  getIndexFromId,
  toggleSlot,
} from "@/component/utils"
import * as R from "ramda"
import { v4 as uuidv4 } from "uuid"

export const getBaseFirmData = (firmData) => ({
  id: uuidv4(),
  name: firmData.name,
  description: firmData.description,
  lawyers: [],
})

export const updateLawyerInFirm = (state, payload) => {
  const cloneState = R.clone(state)
  const firmIndex = getIndexFromId(cloneState, payload.firmId)

  const cloneFirm = R.clone(cloneState[firmIndex])
  const cloneLawyers = R.clone(cloneFirm.lawyers)

  const LawyerIndex = getIndexFromId(cloneLawyers, payload.lawyerId)

  const cloneLawyer = R.clone(cloneLawyers[LawyerIndex])

  cloneLawyers[LawyerIndex].slots = toggleSlot(
    cloneLawyer,
    payload.selectedSlot.id,
    true
  )

  cloneState[firmIndex] = { ...cloneFirm, lawyers: cloneLawyers }

  return cloneState
}

export const addLawyerToFirm = (state, payload) => {
  const { firmId, lawyer } = payload

  const cloneState = R.clone(state)
  const firmIndex = getIndexFromId(cloneState, firmId)

  const cloneFirm = R.clone(cloneState[firmIndex])

  cloneFirm.lawyers = [
    ...cloneFirm.lawyers,
    { ...lawyer, id: uuidv4(), slots: [] },
  ]
  cloneState[firmIndex] = { ...cloneFirm, formattedData: false }

  return cloneState
}

export const formatFirmData = (state, firmId) => {
  const cloneState = R.clone(state)
  const firmIndex = getIndexFromId(cloneState, firmId)
  let cloneFirm = R.clone(cloneState[firmIndex])

  if (cloneFirm.formattedData) return cloneState

  const lawyers = R.clone(cloneFirm.lawyers)

  const formattedLawyers = formatLawyersData(lawyers)

  cloneFirm = { ...cloneFirm, lawyers: formattedLawyers, formattedData: true }
  cloneState[firmIndex] = cloneFirm
  return cloneState
}
