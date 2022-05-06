import { combineReducers, createStore } from "redux"
import { ratesReducer } from "./reducers/ratesReducer"
import { userReducer } from "./reducers/userReducer"

const reducers = combineReducers({
    user: userReducer,
    rates: ratesReducer
})

export const store = createStore(reducers)