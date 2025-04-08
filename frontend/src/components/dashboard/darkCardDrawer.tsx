import { useState } from 'react'
import { Drawer } from 'vaul'
import Overview from './overview'
import Metrics from './metrics'
import RotationVisualizer from '../rotation-visualizer'

export default function DarkCardDrawer({
  OverviewConfig,
  HudConfigs,
  isPhonePortrait,
  drawerOpen,
  setDrawerOpen,
}) {
  return (
    <Drawer.Root defaultOpen open={drawerOpen} onOpenChange={setDrawerOpen}>
      {drawerOpen || (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center">
          <Drawer.Trigger className="mx-auto w-48 rounded-lg bg-black px-4 py-2 text-white opacity-85">
            See Launch Numbers
          </Drawer.Trigger>
        </div>
      )}
      <Drawer.Portal>
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex h-[55vh] flex-col rounded-t-lg bg-black bg-opacity-50 p-4 pb-6 shadow-lg outline-none">
          <div
            aria-hidden
            className="mx-auto mb-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300"
          />
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
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
