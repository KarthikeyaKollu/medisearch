import React from 'react'
import { useList } from "../context/Chatcontext"
export const ChatWindow = () => {
    const messages = useList()
    console.log(messages.list)


    return (
        <div className='' >

            {messages.list.map((item, index) => (

                <div key={index} className={`${item.type == "bot" ? "flex justify-start" : "flex justify-end"}`} > <Message message={item.message} type={item.type} /> </div>

            ))}


        </div>
    )
}


const Message = ({ message,type }) => {
    return (
        <div className={`bg-slate-800 text-white m-4 p-3 rounded-tl-lg rounded-tr-lg  md:max-w-[2000px] max-w-[500px] ${type=="bot" ?"rounded-br-lg":"rounded-bl-lg"}`} >

            <p>{message}</p>

        </div>
    )
}
