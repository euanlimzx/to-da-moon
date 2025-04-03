import DarkCard from './darkCard'
import { TableOfContents } from 'lucide-react'

function infoIcon() {
    return (
        <TableOfContents />
    )
}

export default function Overview() {
    return (
        <DarkCard header="OVERVIEW" headerIcon={infoIcon()}>
            <p className="font-bold">PROMETHEUS HOT FIRE</p>
            <p>Lorem ipsum dolor sit amet consectetur</p>
            <p>Lorem ipsum dolor sit amet consectetur</p>
            <p>Lorem ipsum dolor sit amet consectetur</p>
        </DarkCard>
    )
}
