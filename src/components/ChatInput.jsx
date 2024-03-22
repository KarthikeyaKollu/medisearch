import React, { useState, useRef } from 'react';
import { useList } from '../context/Chatcontext'
import { classicNameResolver } from 'typescript';

export const ChatInput = () => {
  const [inputText, setInputText] = useState('');
  const { list, setList, setmessage } = useList()
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setimage] = useState(null)
  const fileInputRef = useRef(null);


  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      setmessage({ type: "human", message: inputText })
      setInputText('');
      setimage(null)
      // simulateDelayedResponse(inputText).then((response) => {
      //   console.log(response); // Simulated bot response
      //   setList((prevlist) => ([...prevlist, response]))

      // });
      if (selectedFile == null) {
        getData1()
      }
      else {
        getData()
      }
    }
  };



  function simulateDelayedResponse(message, delay = 2000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulating some processing time
        resolve({ type: "bot", message: `Received: ${message}` });
      }, delay);
    });
  }




  const getData = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('query', inputText);
      const response = await fetch('http://192.168.29.249:5001/process_image', { // Replace with your backend URL http://192.168.29.249:5001
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data)
      console.log(data.response);
      setList((prevlist) => ([...prevlist, { type: "bot", message: data.message }]))
      setSelectedFile(null)
      

    }
    catch (err) {
      console.log(err)
    }
  }
  const getData1 = async () => {
    try {
      const formData = new FormData();
      formData.append('query', inputText);
      const response = await fetch('http://192.168.29.249:5001/process_text', { // Replace with your backend URL http://192.168.29.249:5001
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data)
      console.log(data.response);
      setList((prevlist) => ([...prevlist, { type: "bot", message: data.message }]))

    }
    catch (err) {
      console.log(err)
    }
  }




  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setimage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };





  return (
    <div>
      <form onSubmit={handleSubmit} className='bg-slate-800 w-[90%] max-w-[1000px] mx-auto rounded-xl  text-white h-[60px] flex'>



        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={handleInputChange}
          className='w-[85%] bg-transparent pl-8 h-full rounded-xl mr-2'
        />
        <button type="submit">Send</button>

        <button onClick={handleButtonClick}>Choose</button>



      </form>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      {image && (<div className="fixed top-0 left-0 w-[100%] h-[91%] shadow-lg flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm ">

        <div className="absolute  p-5 rounded-lg ">
          <button className='' onClick={() => setimage(null)}>close</button>
          <img src={image} alt="Selected" width="300px" height="300px" className='rounded-xl' />
        </div>


      </div>)
      }

    </div>
  )
}
