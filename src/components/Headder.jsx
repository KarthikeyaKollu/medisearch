import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, Space } from 'antd'; 
import { SideDrawer } from './SideDrawer';
import logo from "../assets/logo.png"
import avatarpic from "../assets/avatarpic.jpeg"

export const Headder = () => {



  return (
    <div className='w-full flex justify-between shadow-xl bg-white sticky top-0'>
        
        <div className='p-4 sm:hidden'>
        <SideDrawer/>
        </div>

        <div className='p-3 sm:block'>
            <img src={logo} alt="" className='w-[25%] mx-auto sm:mx-0' />
        </div>

        <div className='p-3 sm:p-5'>
        <Avatar size="large" src={avatarpic} />
        </div>

    </div>
  )
}