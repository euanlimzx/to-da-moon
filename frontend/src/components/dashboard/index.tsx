import Timeline from './timeline'
import RotationVisualizer from '@/components/rotation-visualizer'
import { HudConfig } from '@/types/HudTypes'
import Metrics from './metrics'
import Overview from './overview'
import { OverviewConfig } from '@/types/HudTypes'
interface DashboardProps {
    OverviewConfig: OverviewConfig
    HudConfigs: HudConfig[]
}

export default function Dashboard({
    OverviewConfig,
    HudConfigs,
}: DashboardProps) {
    /*TODO: Samuel 
        refactoring: 
        - metrics should be passed in a list of configs
        - for each config map one of the data display component based on the config
    */
    return (
        <div className="absolute z-50 h-screen w-screen p-10 md:p-4">
            <Timeline OverviewConfig={OverviewConfig} />

            {/* TODO @Shawn: make these take up less space on a mid sized screen */}
            <div className="mt-10 flex w-full items-start justify-between md:mt-4">
                <div className="flex h-full w-full flex-col gap-4">
                    <div className="w-1/2 lg:w-1/4">
                        <Overview config={OverviewConfig} />
                    </div>
                    <div className="h-64 w-1/2 lg:w-1/4">
                        <RotationVisualizer />
                    </div>
                </div>
                <div className="w-1/2 lg:w-1/4">
                    <Metrics
                        HudConfigs={HudConfigs}
                        OverviewConfig={OverviewConfig}
                    />
                </div>
            </div>
        </div>
    )
}
