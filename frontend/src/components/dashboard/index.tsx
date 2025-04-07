import Timeline from './timeline'
import RotationVisualizer from '@/components/rotation-visualizer'
import { HudConfig } from '@/types/HudTypes'
import Metrics from './metrics'
import Overview from './overview'
import { OverviewConfig } from '@/types/HudTypes'
import DarkCard from './darkCard'
interface DashboardProps {
  OverviewConfig: OverviewConfig
  HudConfigs: HudConfig[]
  isPhonePortrait: boolean
}

export default function Dashboard({
  OverviewConfig,
  HudConfigs,
  isPhonePortrait,
}: DashboardProps) {
  /*TODO: Samuel 
        refactoring: 
        - metrics should be passed in a list of configs
        - for each config map one of the data display component based on the config
    */
  return (
    <div className="md:p-4 absolute z-50 h-screen w-screen p-10 mobile-portrait:p-4">
      <Timeline OverviewConfig={OverviewConfig} />

      {/* TODO @Shawn: make these take up less space on a mid sized screen */}
      {isPhonePortrait ? (
        <div className="absolute bottom-0 left-0 right-0 h-[55vh] w-full">
          <DarkCard removeCornerRounding reduceBottomPadding>
            <div className="flex h-full flex-col">
              <div className="scroll no-scrollbar overflow-y-auto">
                <div className="flex flex-col gap-4">
                  <div>
                    <Overview config={OverviewConfig} />
                  </div>
                  <div>
                    <Metrics
                      HudConfigs={HudConfigs}
                      OverviewConfig={OverviewConfig}
                    />
                  </div>
                  <div>
                    <RotationVisualizer isPhonePortrait={isPhonePortrait} />
                  </div>
                </div>
              </div>
            </div>
          </DarkCard>
        </div>
      ) : (
        <div className="md:mt-4 mt-10 flex w-full items-start justify-between">
          <div className="flex h-full w-full flex-col gap-4">
            <div className="lg:w-1/4 w-1/2">
              <Overview config={OverviewConfig} />
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
