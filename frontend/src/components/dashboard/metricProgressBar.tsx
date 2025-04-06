import React from 'react';
import { useState } from 'react';
import LinearProgress from "./linearProgress";
import type { MenuProps } from "antd";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from "antd";

interface MetricProgressBarProps {
  value: number;
  unitType?: string;
}

const MetricProgressBar = ({ value, unitType = "Pressure" }: MetricProgressBarProps) => {
  const dropdownMenuUnits = ["psi", "degrees", "miles"];
  
  // State to track the selected unit - initialize with first option or props value if provided
  const [unit, setUnit] = useState(unitType === "Pressure" ? "psi" : dropdownMenuUnits[0]);

  // Handle menu item click - simplified to directly use the unit value
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setUnit(e.key); // Update the unit state with the selected key
  };

  // Define dropdown menu items
  const items: MenuProps["items"] = dropdownMenuUnits.map((unitOption) => ({
    key: unitOption,
    label: unitOption, 
  }));

  return (
    <div className="col w-full gap-2" style={{ width: "15vw" }}>
      <p className="text-md">{unitType} Progress</p>
      <div className="flex items-center space-x-2">
        <LinearProgress percent={value} strokeWidth={10} />
        <p className="text-sm">
          {value} {unit}
        </p>
        <Dropdown 
          menu={{ 
            items, 
            onClick: handleMenuClick 
          }} 
          trigger={['click']}
          className="cursor-pointer"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {unit}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default MetricProgressBar;