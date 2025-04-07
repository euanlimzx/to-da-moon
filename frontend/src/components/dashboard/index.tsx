import Timeline from './timeline'
import RotationVisualizer from '@/components/rotation-visualizer'
import { HudConfig } from '@/types/HudTypes'
import Metrics from './metrics'
import Overview from './overview'
import { OverviewConfig } from '@/types/HudTypes'
interface DashboardProps {
    OverviewConfig : OverviewConfig
    HudConfigs : HudConfig[]
}

export default function Dashboard({ OverviewConfig, HudConfigs }: DashboardProps) {
    /*TODO: Samuel 
        refactoring: 
        - metrics should be passed in a list of configs
        - for each config map one of the data display component based on the config
    */
    return (
        <div className="absolute z-50 h-screen w-screen p-10">
            <Timeline
                OverviewConfig={OverviewConfig}
            />
            <div className="flex flex-col gap-4">
                {/* TODO @Shawn: make these take up less space on a mid sized screen */}
                <div className="flex justify-between items-start w-full mt-10">
                    <div className="w-1/4">
                        <Overview config={OverviewConfig}/>
                    </div>
                    <Metrics HudConfigs={HudConfigs} OverviewConfig={OverviewConfig}/>
               </div>
               
                <div className="h-64 w-1/4">
                    <RotationVisualizer />
                </div>
             </div>
        </div>
    )
}
