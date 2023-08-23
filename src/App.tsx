import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import { useSelector} from "react-redux";
import {AppStateType, useAppDispatch} from "./bbl/store";
import {
    clearValueAndLSTC,
    decValueTC,
    incValueTC, setToLocalStorageTC,
    setValueFromLSTC
} from "./bbl/counter-reducer";

function App() {

    const value = useSelector<AppStateType, number>(state => state.counter.value)
    const dispatch = useAppDispatch()
    const [valueInput, setValueInput] = useState< string >('')

console.log(valueInput)

    useEffect(()=> {
        dispatch(setValueFromLSTC())
    },[])
    //useEffect отработает единожды
    const incHandler = () => {
        dispatch(incValueTC())
    }
    const decHandler = () => {
        dispatch(decValueTC())
    }

    const clearLocalStorageHandler = () => {
        dispatch(clearValueAndLSTC())
    }

    const setToLocalStorageHandler = () => {
        if(valueInput){
            setValueInput('')
            dispatch(setToLocalStorageTC(+valueInput))
        }

    }

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(isNaN(+e.currentTarget.value)  ) {
            alert('pls number')
        } else {
            setValueInput(e.currentTarget.value)
        }

    }


    // const [value, setValue] = useState(0)
    // useEffect(()=> {
    //     localStorage.setItem('useEffect', JSON.stringify(value))
    // },[value])
    // //каждый раз когда value меняется вызывай колбек
    // //и при вмонтировании компоненты
    //
    // useEffect(()=> {
    //     let valueAsString = localStorage.getItem('counterValue')
    //     if (valueAsString) setValue(JSON.parse(valueAsString))
    // },[])
    // //попадать в useEffect единожды при вмонтировании


    // //JSON.stringify преобразует число/объект/массив в строку
    //
    // const getFromLocalStorageHandler = () => {
    //     let valueAsString = localStorage.getItem('counterValue')
    //     if (valueAsString) setValue(JSON.parse(valueAsString))
    // }
    // const clearLocalStorageHandler = () => {
    //     localStorage.clear()
    //     //удаляю весь localStorage
    //     setValue(0)
    // }


    // console.log(localStorage.key(0))
    // //получить ключ на заданной позиции
    // //доступ к элементу по индексу
    // const removeItemAllLocalStorageHandler = () => {
    //     localStorage.removeItem('counterValue')
    // }

    return (
        <div className="App">
            <h1>{value}</h1>
            <button onClick={incHandler}>inc</button>
            <button onClick={decHandler}>dec</button>
            <button onClick={clearLocalStorageHandler}>clearAllLocalStorage</button>
            <div>
                <input value={valueInput} onChange={inputChange}/>
                <button onClick={setToLocalStorageHandler}>setToLocalStorage</button>

            </div>
            {/*<button onClick={getFromLocalStorageHandler}>getFromLocalStorage</button>*/}
            {/*<button onClick={clearLocalStorageHandler}>clearAllLocalStorage</button>*/}
            {/*<button onClick={removeItemAllLocalStorageHandler}>removeItemAllLocalStorage</button>*/}


        </div>
    );
}

export default App;


//localStorage - браузерное хранилище
//которое представляет собой строковый тип данных
//ключ - значение
//вечное хранение (до снесения браузера)

//sessionStorage - браузерное хранилище - живет пока открыта вкладка
//теже методы .clear() .getItem() .removeItem() .setItem() .key()