import Timeline from './timeline'
import RotationVisualizer from '@/components/rotation-visualizer'
import Overview, { Config } from './overview'
import { HudConfig } from '@/types/HudTypes'
import Metrics from './metrics'

interface DashboardProps {
    config: Config
    HudConfigs : HudConfig[]
}

export default function Dashboard({ config, HudConfigs }: DashboardProps) {
    /*TODO: Samuel 
        refactoring: 
        - metrics should be passed in a list of configs
        - for each config map one of the data display component based on the config
    */
    return (
        <div className="absolute z-50 h-screen w-screen p-10">
            <Timeline
                numStages={config.numStages}
                currStage={config.currStage}
                isActive={config.isActive}
            />
            <div className="flex flex-col gap-4">
                {/* TODO @Shawn: make these take up less space on a mid sized screen */}
                <div className="flex justify-between items-start w-full mt-10">
                    <div className="w-1/4">
                        <Overview config={config}/>
                    </div>
                    <Metrics pressure1={40} pressure2={30} pressure3={100} gaugePressure={50} />
               </div>
               
                <div className="h-64 w-1/4">
                    <RotationVisualizer />
                </div>
             </div>
        </div>
    )
}
