import React, { useState, useEffect, useRef } from 'react';
import { useList } from "../context/Chatcontext";
import TranslateIcon from '@mui/icons-material/Translate';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';

export const ChatWindow = () => {
    const messages = useList();
    console.log(messages.list);

    return (
        <div className=''>
            {messages.list.map((item, index) => (
                <div key={index} className={`${item.type === "bot" ? "flex justify-start" : "flex justify-end"}`}>
                    <Message message={item.message} type={item.type} />
                </div>
            ))}
        </div>
    );
};




const Message = ({ message, type }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const handleMenuClick = (event) => {
        event.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOptionClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className={`relative`} onClick={handleClickOutside}>
            <div
                className={`${isMenuOpen?"bg-gradient-to-r from-sky-400 to-blue-500":"bg-gradient-to-r from-blue-500 to-blue-800"} text-white m-4 p-3 rounded-tl-lg rounded-tr-lg md:max-w-[2000px] max-w-[500px] ${type === "bot" ? "rounded-br-lg" : "rounded-bl-lg"}`}
                onClick={handleMenuClick}
            >
                <p>{message}</p>
            </div>
            {isMenuOpen && (
                <div ref={menuRef} className="absolute top-full right-0 mt-2 max-w-[200px] bg-white border border-gray-300 rounded-lg shadow-lg z-50 flex">
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleOptionClick}><TranslateIcon/></div>
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleOptionClick}><ContentCopyIcon/></div>
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleOptionClick}><EditIcon/></div>
                </div>
            )}
        </div>
    );
};
