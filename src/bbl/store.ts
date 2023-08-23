import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {counterReducer} from "./counter-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    counter: counterReducer
})
export type AppStateType = ReturnType<typeof rootReducer>
export const store  = createStore(rootReducer, applyMiddleware(thunk))
//добавляем в стор мидлваре

export type AppStoreType = typeof store

export type AppDispatchType = ThunkDispatch<AppStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatchType>()