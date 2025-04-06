import { useState, ReactElement } from 'react'
import Timeline from './timeline'
import Overview from './overview'
import RotationVisualizer from '@/components/rotation-visualizer'

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
            <div className="flex flex-col gap-4">
                {/* TODO @Shawn: make these take up less space on a mid sized screen */}
                <div className="w-1/4">
                    <Overview />
                </div>
                <div className="h-64 w-1/4">
                    <RotationVisualizer />
                </div>
            </div>
        </div>
    )
}
