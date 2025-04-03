import { useState, ReactElement } from 'react'
import Timeline from './timeline'
import Overview from './overview'
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
            <Overview />
        </div>
    )
}
