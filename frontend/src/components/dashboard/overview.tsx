import DarkCard from './darkCard'
import { TableOfContents } from 'lucide-react'

function infoIcon() {
    return (
        <TableOfContents />
    )
}

export interface Config {
    name: string
    currStage: number
    numStages: number
    isActive: boolean
    isDelayed: boolean
    estimatedLaunchTime: number
}

export default function Overview({ config }: { config: Config }) {
    return (
        <DarkCard header="Overview" headerIcon={infoIcon()}>
            <p className="font-bold">{config.name}</p>
            <p>{JSON.stringify(config)}</p>
        </DarkCard>
    )
}
