import LinearProgress from './linearProgress'
import { OverviewConfig } from '@/types/HudTypes'

interface TimelineProps {
    OverviewConfig: OverviewConfig
}

const Timeline = ({ OverviewConfig}: TimelineProps) => {
    return (
        <div className="pb-4">
            <div className="flex items-center gap-2 pb-2">
                <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full ${OverviewConfig.isActive ? 'bg-red-500' : 'bg-green-500'}`}
                ></div>
                {OverviewConfig.isActive ? 'LIVE' : 'INACTIVE'}
            </div>
            <LinearProgress percent={(OverviewConfig.currStage / OverviewConfig.numStages) * 100} OverviewConfig={OverviewConfig} />
            <div className="flex w-full items-center justify-between">
                {/* Dynamically generate circles */}
                {Array.from({ length: OverviewConfig.numStages }).map((_, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div
                            className={`flex h-3 w-3 items-center justify-center rounded-full`}
                            style={{
                                backgroundColor:
                                    index < OverviewConfig.currStage
                                        ? '#3182CE'
                                        : 'rgba(0, 0, 0, 0.5)',
                            }}
                        ></div>
                        <span className="mt-2 text-lg">{`Phase ${index + 1}`}</span>
                        {/* todo @euan make this phases represent a certain stage? */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Timeline
