import {
  addLawyerToFirm,
  formatFirmData,
  getBaseFirmData,
  updateLawyerInFirm,
} from "./helpers"
import {
  ADD_FIRM,
  ADD_LAWYER,
  BOOK_LAWYER_SLOTS,
  DELETE_FIRM,
  FORMAT_DATA,
} from "../constants"

const initialLawyerData = [
  {
    id: "unique-lawyer-id",
    name: "Lawyer-Name-1",
    speciality: ["Lawyer-1-Speciality-1", "Lawyer-1-Speciality-2"],
    availablity: {
      startTime: "9",
      endTime: "17",
    },
    slots: [],
    cost: 300,
  },
  {
    id: "unique-lawyer-id-2",
    name: "Lawyer-Name-2",
    speciality: ["Lawyer-2-Speciality-1", "Lawyer-2-Speciality-2"],
    availablity: {
      startTime: 14,
      endTime: 17,
    },
    slots: [],
    cost: 500,
  },
]
const initialFirmData = [
  {
    id: "unique-firm-id",
    name: "Firm-Title",
    description: "firm Description",
    lawyers: initialLawyerData,
    formattedData: false,
  },
]

const rootReducer = (state = initialFirmData, action = {}) => {
  switch (action.type) {
    case ADD_FIRM:
      return [...state, getBaseFirmData(action.payload)]
    case ADD_LAWYER:
      return addLawyerToFirm(state, action.payload)
    case DELETE_FIRM:
      return state.filter((firm) => firm.id !== action.payload.id)
    case BOOK_LAWYER_SLOTS:
      return updateLawyerInFirm(state, action.payload)
    case FORMAT_DATA:
      return formatFirmData(state, action.payload.firmId)
    default:
      return state
  }
}

export default rootReducer
