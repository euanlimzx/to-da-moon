import DarkCard from "./darkCard";
import { ChartLine } from "lucide-react";
import React from 'react'
import MetricProgressBar from "./metricProgressBar";
import { HudConfig, OverviewConfig } from "@/types/HudTypes";



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
  HudConfigs: HudConfig[]
  OverviewConfig: OverviewConfig
}


/*
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
*/


const Metrics = ({HudConfigs, OverviewConfig}: MetricsProps) => {
  function graphIcon() {
    return (
        <ChartLine/>
    )
  }
  return (
    <div className="">
        <DarkCard header="SENSORS" headerIcon={graphIcon()}>
        <div className="space-y-4">
                {HudConfigs?.map((config, index) => (
                    <div key={`${index}`}>
                        <MetricProgressBar 
                            metricConfig={config}
                            OverviewConfig={OverviewConfig}
                        /> 
                    </div>
                ))}
            </div>
        </DarkCard>
    </div>
  )
}

export default Metrics