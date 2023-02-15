import { applyMiddleware, createStore, compose } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers"

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const setToLocalStorage =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action)
    localStorage.setItem("legistify-store", JSON.stringify(getState()))

    return result
  }

const reHydrateStore = () => {
  const data = localStorage.getItem("legistify-store")
  if (data) {
    return JSON.parse(data)
  }
  return undefined
}

const enhancer = composeEnhancers(applyMiddleware(thunk, setToLocalStorage))
const store = createStore(rootReducer, reHydrateStore(), enhancer)

// store.subscribe(() => {
//   localStorage.setItem("reduxState", JSON.stringify(store.getState()))
// })  // Using Middleware as Bonus
export default store
