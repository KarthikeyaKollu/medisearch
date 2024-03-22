import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
export const ListContext = createContext();

export const useList = () => {
  const data = useContext(ListContext)
  return data
}

// Create provider component
export const ListProvider = ({ children }) => {

  const messages = [
    { type: "bot", message: "Hi there! How can I help you today?" },
    { type: "human", message: "I'm looking for information about your products." },
    { type: "bot", message: "Sure, I can help with that. What specific information are you looking for?" },
    { type: "human", message: "I'd like to know about your pricing plans." },
    { type: "bot", message: "Our pricing plans vary depending on the features you need. Would you like me to provide more details?" },
    { type: "human", message: "Yes, please." },
    { type: "bot", message: "Great! Let me give you an overview of our pricing options..." },
    { type: "human", message: "I'd like to know about your pricing plans." },
    { type: "bot", message: "Our pricing plans vary depending on the features you need. Would you like me to provide more details?" },
    { type: "human", message: "Yes, please." },
    { type: "bot", message: "Great! Let me give you an overview of our pricing options..." },
    { type: "human", message: "I'd like to know about your pricing plans." },
    { type: "bot", message: "Our pricing plans vary depending on the features you need. Would you like me to provide more details?" },
    { type: "human", message: "Yes, please." },
    { type: "bot", message: "Great! Let me give you an overview of our pricing options..." },
    { type: "human", message: "I'd like to know about your pricing plans." },
    { type: "bot", message: "Our pricing plans vary depending on the features you need. Would you like me to provide more details?" },
    { type: "human", message: "Yes, please." },
    { type: "bot", message: "Great! Let me give you an overview of our pricing options..." },
  ];


  const [list, setList] = useState(messages);
  const [message, setmessage] = useState({})





  useEffect(()=>{
    setList([...list,message]);
    


    
  },[message])


 







  return (
    <ListContext.Provider value={{ setList, list,setmessage }}>
      {children}
    </ListContext.Provider>
  );
};
