import DarkCard from './darkCard'
import { TableOfContents } from 'lucide-react'
import { OverviewConfig } from '@/types/HudTypes'
import DashboardCompassController from '../compass/dashboardCompassController'
function infoIcon() {
  return <TableOfContents />
}

export default function Overview({ config }: { config: OverviewConfig }) {
  return (
    <DarkCard header="Overview" headerIcon={infoIcon()}>
      <p className="font-bold">{config.name}</p>
      <DashboardCompassController />
    </DarkCard>
  )
}
