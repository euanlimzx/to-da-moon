import Timeline from './timeline'
import Overview, { Config } from './overview'
export default function Dashboard({ config }: { config: Config }) {
    return (
        <div className="absolute z-50 h-screen w-screen p-10">
            <Timeline
                numStages={config.numStages}
                currStage={config.currStage}
                isActive={config.isActive}
            />
            <Overview config={config} />
        </div>
    )
}
