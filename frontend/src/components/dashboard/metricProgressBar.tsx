import React from 'react';
import LinearProgress from "./linearProgress";
import { useState, useEffect, useRef } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons'; // Added UpOutlined
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
    const intervalId = setInterval(() => {
      setMetricHistory(prev => {
        const newPoint = { [metricConfig.dataName]: latestValueRef.current };
        const newHistory = [...prev, newPoint];
        return newHistory.slice(-30);
      });
    }, 500); // Update every 500ms
    
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [metricConfig.dataName]);

  const handleDisplaySwitch = () => {
    setOpenSecondDisplay(!openSecondDisplay);
  }

  return (
    <div className="col w-full gap-2 mb-4">
      <p className="text-md font-medium">{metricConfig.dataName}</p>
      <div className="flex items-center space-x-2">
        <LinearProgress percent={metricConfig.value} strokeWidth={10} OverviewConfig={OverviewConfig}/>
        <label className="text-sm">
          {metricConfig.value} 
        </label>
        <label className="text-sm">
          {metricConfig.units}
        </label>
        
        {/* Animated arrow that changes direction */}
        <div className="cursor-pointer" onClick={handleDisplaySwitch}>
          {openSecondDisplay ? (
            <UpOutlined className="transition-transform duration-300" />
          ) : (
            <DownOutlined className="transition-transform duration-300" />
          )}
        </div>
      </div>

      {/* Animated container for secondary display */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          openSecondDisplay ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <div className="flex items-center justify-center">
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
      </div>
    </div>
  );
};

export default MetricProgressBar;