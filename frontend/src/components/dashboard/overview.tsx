import DarkCard from './darkCard'
import { TableOfContents } from 'lucide-react'
import { OverviewConfig } from '@/types/HudTypes'
function infoIcon() {
    return (
        <TableOfContents />
    )
}


export default function Overview({ config }: { config: OverviewConfig }) {
    return (
        <DarkCard header="Overview" headerIcon={infoIcon()}>
            <p className="font-bold">{config.name}</p>
            <p>{JSON.stringify(config)}</p>
        </DarkCard>
    )
}
