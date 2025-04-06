import Timeline from './timeline'
import Overview, { Config } from './overview'
import Metrics from './metrics'
export default function Dashboard({ config }: { config: Config }) {
    return (
        <div className="absolute z-50 h-screen w-screen p-10">
            <Timeline
                numStages={config.numStages}
                currStage={config.currStage}
                isActive={config.isActive}
            />
            <div className="flex justify-between items-start w-full mt-10">
                <Overview config={config} />
                <Metrics pressure1={40} pressure2={30} pressure3={100} gaugePressure={50} />
            </div>
        </div>
    )
}
