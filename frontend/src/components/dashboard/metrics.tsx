import { useState } from "react";
import DarkCard from "./darkCard";
import { ChartLine } from "lucide-react";
import LinearProgress from "./linearProgress";
import { Gauge } from "../gauge";
import React from 'react'
import MetricProgressBar from "./metricProgressBar";



/*
Dropdown: 
  - should be able to change props of the progress bar
  - therefore, can use state for unit
  - unit changed on update of dropdown
  - should be able to pass an array of values to dropdown

create seperate component for the metricsProgressBar and the dropdown so dropdown 
can provide context to the metricsProgressBar
want to make it easy to take in props to change percent of progress Bars
*/
interface MetricsProps {
    pressure1: number
    pressure2: number
    pressure3: number
    gaugePressure : number
}


const Metrics = ({pressure1, pressure2, pressure3, gaugePressure} : MetricsProps) => {
 
    

  function graphIcon() {
    return (
        <ChartLine/>
    )
  }
  return (
    <div className="">
        <DarkCard header="SENSORS" headerIcon={graphIcon()}>
            <MetricProgressBar
                value={pressure1}
                unitType="psi"
            />
            <MetricProgressBar
                value={pressure2}
                unitType="degrees"
            />
            <MetricProgressBar
                value={pressure3}
                unitType="miles"
            />
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