import { toast } from "react-toastify"
import {
  ADD_FIRM,
  BOOK_LAWYER_SLOTS,
  DELETE_FIRM,
  ADD_LAWYER,
} from "../constants"

export const addFirm =
  (firm, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: ADD_FIRM,
      payload: firm,
    })
    toast.success("Firm added successfully")
    cb()
  }

export const addLawyer =
  (firmId, lawyer, cb = () => {}) =>
  (dispatch) => {
    dispatch({
      type: ADD_LAWYER,
      payload: { lawyer, firmId },
    })
    toast.success("Lawyer added successfully")
    cb()
  }

export const deleteFirm = (firmId) => (dispatch) =>
  dispatch({
    type: DELETE_FIRM,
    payload: { id: firmId },
  })

export const bookLawyerSlots = (firmId, lawyerId, newLawyer) => (dispatch) =>
  dispatch({
    type: BOOK_LAWYER_SLOTS,
    payload: {
      firmId,
      lawyerId,
      newLawyer,
    },
  })
