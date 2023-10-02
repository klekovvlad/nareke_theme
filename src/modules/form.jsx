import React from "react";
import { listenInput, sendForm } from "./scripts/sendForm";

export const Form = () => {
    return (
        <form className="form">
            <div className="input-wrapper"><input type="text" onClick={listenInput} name="date" placeholder="Дата заезда"/></div>
            <div className="input-wrapper"><input type="text" onClick={listenInput} name="adults" placeholder="Количество человек"/></div>
            <div className="input-wrapper"><input type="text" onClick={listenInput} name="firstname" placeholder="Имя"/></div>
            <div className="input-wrapper"><input type="tel" onClick={listenInput} name="phone" placeholder="Телефон"/></div>
            <input type="email" id="email" name="email"/>
            <button type="submit" onClick={sendForm}>Отправить</button>
        </form>
    )
}