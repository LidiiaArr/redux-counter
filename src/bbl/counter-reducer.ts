import {Dispatch} from "redux";
import {AppStateType} from "./store";


const initialState = {
    value: 100
}

type InitialStateType = typeof initialState

export const counterReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "INC-VALUE":
            return {
                ...state, value: state.value + 1
            }
        case "SET-VALUE-FROM-LOCAL-STORAGE":
            return {
                ...state, value: action.value
            }
        case "DEC-VALUE":
            return {
                ...state, value: state.value - 1
            }
        case "CLEAR-VALUE":
            return {
                ...state, value: 0
            }
        case "SET-VALUE-TO-LOCAL-STORAGE":
            return {
                ...state, value: action.value
            }
        default:
            return state
    }
}

export const setToLocalStorageAC = (value: number) => ({type: 'SET-VALUE-TO-LOCAL-STORAGE', value} as const)
export type setToLocalStorageActionType = ReturnType<typeof setToLocalStorageAC>
export const  clearValueAC = () => ({type: 'CLEAR-VALUE'} as const)
export type clearValueActionType = ReturnType<typeof clearValueAC>
export const decValueAC = () => ({type: 'DEC-VALUE'} as const)
export type DecValueActionType = ReturnType<typeof decValueAC>

export const incValueAC = () => ({type: 'INC-VALUE'} as const)
export type IncValueActionType = ReturnType<typeof incValueAC>

export const setValueFromLSAC = (value: number) => ({type: 'SET-VALUE-FROM-LOCAL-STORAGE', value} as const)
export type SetValueFromLSActionType = ReturnType<typeof setValueFromLSAC>

type ActionType = IncValueActionType | SetValueFromLSActionType | DecValueActionType | clearValueActionType
| setToLocalStorageActionType

//THUNK
export const incValueTC = () => (dispatch: Dispatch, getState: () => AppStateType) => {
    let currentValue = getState().counter.value
    localStorage.setItem('counterValue', JSON.stringify(currentValue +1))
    dispatch(incValueAC())
}

//санккреэйтор это функция которая возвращает другую функцию
//localStorage это side effect поэтому делается в санке

export const setValueFromLSTC = () => (dispatch: Dispatch) => {
        let valueAsString = localStorage.getItem('counterValue')
        if (valueAsString) {
            let newValue = JSON.parse(valueAsString)
            dispatch(setValueFromLSAC(newValue))
        }
}

export const decValueTC = () => (dispatch: Dispatch, getState: () => AppStateType) => {
    let currentValue = getState().counter.value
    localStorage.setItem('counterValue', JSON.stringify(currentValue -1))
    dispatch(decValueAC())
}

export const clearValueAndLSTC = () => (dispatch: Dispatch) => {
    localStorage.clear()
    dispatch(clearValueAC())
}

export const setToLocalStorageTC = (value: number) => (dispatch: Dispatch) => {
    localStorage.setItem('counterValue', JSON.stringify(value))
    dispatch(setToLocalStorageAC(value))
}