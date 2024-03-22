import React, { useState, useEffect } from 'react';
import {Drawer, Space } from 'antd';
import MenuIcon from '@mui/icons-material/Menu';
import { SideBar } from './SideBar';

export const SideDrawer = () => {
  const [open, setOpen] = useState(false);
  const placement = 'left';

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSidebarOptionClick = () => {
    onClose();
  };

  return (
    <>
      <Space>
        <button type="primary" onClick={showDrawer}>
        <MenuIcon />
        </button>
      </Space>
      <Drawer
        title="Menu"
        placement={placement}
        width={300}
        onClose={onClose}
        open={open}
      >
        <div>
            <SideBar onOptionClick={handleSidebarOptionClick} />
        </div>
      </Drawer>
    </>
  );
};
