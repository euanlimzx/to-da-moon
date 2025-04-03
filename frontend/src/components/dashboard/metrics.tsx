import DarkCard from "./darkCard";
import { ChartLine } from "lucide-react";
import LinearProgress from "./linearProgress";
import { Gauge } from "../gauge";
import React from 'react'

/*
want to make it easy to take in props to change percent of progress Bars
*/
interface MetricsProps {
    pressure1: number
    pressure2: number
    pressure3: number
    gaugePressure : number
}
interface MetricProgressBarProps {
    value: number;
    unitType?: string;
}

// Turn metricProgressBar into a React component
const MetricProgressBar: React.FC<MetricProgressBarProps> = ({
    value,
    unitType = "psi",
  }) => {
    return (
      <div className="col w-full space-y-2"
            style={{ width: "15vw" }} // Set width to 10% of the viewport width
      >
        <p className="text-md">{unitType} Progress</p>
        <div className="flex items-center space-x-2">
          <LinearProgress percent={value} strokeWidth={10} />
          <p className="text-sm">
            {value} {unitType}
          </p>
        </div>
      </div>
    );
  };


function graphIcon() {
    return (
        <ChartLine/>
    )
}


const Metrics = ({pressure1, pressure2, pressure3, gaugePressure} : MetricsProps) => {
  return (
    <div className="">
        <DarkCard header="SENSORS" headerIcon={graphIcon()}>
            <MetricProgressBar value={pressure1} unitType="psi" />
            <MetricProgressBar value={pressure2} unitType="psi" />
            <MetricProgressBar value={pressure3} unitType="psi" />
            <Gauge 
                value={gaugePressure}
                size={'medium'}
                showValue={true}
                color={'#507CFF'}
            />
        </DarkCard>
    </div>
  )
}

export default Metrics