import Timeline from './timeline'
import RotationVisualizer from '@/components/rotation-visualizer'
import { HudConfig } from '@/types/HudTypes'
import Metrics from './metrics'
import Overview from './overview'
import { OverviewConfig } from '@/types/HudTypes'
import DarkCardDrawer from './darkCardDrawer'
import { target } from '../compass/dashboardCompassController'

interface DashboardProps {
  OverviewConfig: OverviewConfig
  HudConfigs: HudConfig[]
  isPhonePortrait: boolean
  target: target
}

export default function Dashboard({
  OverviewConfig,
  HudConfigs,
  isPhonePortrait,
  drawerOpen,
  setDrawerOpen,
  target,
}: DashboardProps) {
  /*TODO: Samuel 
        refactoring: 
        - metrics should be passed in a list of configs
        - for each config map one of the data display component based on the config
    */

  return (
    <div className="md:p-4 absolute z-30 h-screen w-screen p-10 mobile-portrait:p-4">
      <Timeline OverviewConfig={OverviewConfig} />

      {/* TODO @Shawn: make these take up less space on a mid sized screen */}
      {isPhonePortrait ? (
        <div className="absolute bottom-0 left-0 right-0 z-50 h-[55vh] w-full">
          <DarkCardDrawer
            OverviewConfig={OverviewConfig}
            HudConfigs={HudConfigs}
            isPhonePortrait={isPhonePortrait}
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            target={target}
          />
        </div>
      ) : (
        <div className="md:mt-4 mt-10 flex w-full items-start justify-between">
          <div className="flex h-full w-full flex-col gap-4">
            <div className="lg:w-1/4 w-1/2">
              <Overview config={OverviewConfig} target={target} />
            </div>
            <div className="lg:w-1/4 h-64 w-1/2">
              <RotationVisualizer />
            </div>
          </div>
          <div className="lg:w-1/4 w-1/2">
            <Metrics HudConfigs={HudConfigs} OverviewConfig={OverviewConfig} />
          </div>
        </div>
      )}
    </div>
  )
}
