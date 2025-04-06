import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

interface CustomDropdownProps {
  items: MenuProps['items']; // Dropdown menu items
  triggerText: string; // Text to display for the dropdown trigger
  onClick?: (key: string) => void; // Optional callback for item selection
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ items, triggerText, onClick }) => {
  // Handle menu item click
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (onClick) {
      onClick(e.key); // Pass the selected item's key to the callback
    }
  };

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {triggerText}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default CustomDropdown;