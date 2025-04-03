import { useState, ReactElement } from 'react'
import Timeline from './timeline'
import Overview from './overview'
import Metrics from './metrics'
export default function Dashboard() {
    const numStages = 5
    const [currStage, setCurrStage] = useState(3)
    const [isActive, setIsActive] = useState(true)
    return (
        <div className="absolute z-50 h-screen w-screen p-10">
            <Timeline
                numStages={numStages}
                currStage={currStage}
                isActive={isActive}
            />
            <div className="flex justify-between items-start w-full mt-10">
                <Overview />
                <Metrics pressure1={40} pressure2={30} pressure3={100} gaugePressure={50} />
            </div>
        </div>
    )
}
