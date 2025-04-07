import React from 'react';
import LinearProgress from "./linearProgress";
import { useState, useEffect, useRef } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { HudConfig } from '@/types/HudTypes';
import { OverviewConfig } from '@/types/HudTypes';
import { Gauge } from '@/components/gauge';
import Chart from '@/components/dashboard/linearGraph';

interface MetricProgressBarProps {
  metricConfig : HudConfig; 
  OverviewConfig: OverviewConfig;
}

const MetricProgressBar = ({ metricConfig, OverviewConfig }: MetricProgressBarProps) => {
  const [openSecondDisplay, setOpenSecondDisplay] = useState(false);

  const [metricHistory, setMetricHistory] = useState<{ [key: string]: number }[]>([]);
  const latestValueRef = useRef(metricConfig.value);
  
  // Update latest value reference without rerendering
  useEffect(() => {
    latestValueRef.current = metricConfig.value;
  }, [metricConfig.value]);
  
  // Sample at regular intervals (e.g., every 500ms)
  useEffect(() => {
    setMetricHistory(prev => {
      const newPoint = { [metricConfig.dataName]: latestValueRef.current };
      const newHistory = [...prev, newPoint];
      return newHistory.slice(-30);
    });
  }, [metricConfig.dataName])

  const handleDisplaySwitch = () => {
    setOpenSecondDisplay(!openSecondDisplay);
  }

  return (
    <div className="col w-full gap-2" style={{ width: "15vw" }}>
      <p className="text-md">{metricConfig.dataName}</p>
      <div className="flex items-center space-x-2">
        <LinearProgress percent={metricConfig.value} strokeWidth={10} OverviewConfig={OverviewConfig}/>
        <label className="text-sm">
          {metricConfig.value} 
        </label>
        <label className="text-sm">
          {metricConfig.units}
        </label>
        <DownOutlined className="cursor-pointer" onClick={()=>handleDisplaySwitch()}/>
      </div>
      {openSecondDisplay && (
        <div className="flex items-center justify-center mt-2">
          {metricConfig.secondDisplayType === 'gauge' && (
            <Gauge 
              value={metricConfig.value} 
              size={'medium'} 
              showValue={true} 
              color={'#507CFF'}
            />
          )}
          
          {metricConfig.secondDisplayType === 'graph' && (
            <div className="w-full">
              <Chart data={metricHistory} dataName={metricConfig.dataName}/>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MetricProgressBar;