import React, { useState, useRef } from 'react';
import { useList } from '../context/Chatcontext'
import SendIcon from '@mui/icons-material/Send';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Box from '@mui/material/Box';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import HeadsetIcon from '@mui/icons-material/Headset';


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

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className='flex space-x-0 justify-center mr-4 md:flex md:w-[80%] sticky bottom-0'>

      <div className='mt-2'>
      <Box position="relative">
      <Button
        aria-controls="attach-file-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ fontSize: '1.5rem' }}
      >
        <AttachFileIcon sx={{ fontSize: '2rem' }} />
      </Button>
      <Menu
        id="attach-file-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        getContentAnchorEl={null}
      
        sx={{ position: 'absolute', top: '-40px' }}
      >
        <MenuItem onClick={handleClose} sx={{ color: '#f321c6' }}>
          <ImageIcon className='mr-1' />Image
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ color: '#882bf1' }}>
          <InsertDriveFileIcon className='mr-1' />File
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ color: '#f3700b' }}>
          <HeadsetIcon className='mr-1' />Audio
        </MenuItem>
        </Menu>
        </Box>
      </div>

      <form onSubmit={handleSubmit} className='bg-slate-800 w-[90%] max-w-[1000px] mx-auto rounded-2xl  text-white h-[60px] flex'>



        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={handleInputChange}
          className='w-[90%] bg-transparent pl-8 h-full rounded-xl mr-5'
        />
        <button type="submit" className='mr-3'><SendIcon/></button>

        <button onClick={handleButtonClick} className='mr-3' ><AddPhotoAlternateIcon/></button>



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