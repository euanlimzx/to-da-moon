import DarkCard from './darkCard'
import { TableOfContents } from 'lucide-react'
import { OverviewConfig } from '@/types/HudTypes'
import DashboardCompassController from '../compass/dashboardCompassController'
import { target } from '../compass/dashboardCompassController'
function infoIcon() {
  return <TableOfContents />
}

export default function Overview({
  config,
  target,
}: {
  config: OverviewConfig
  target: target
}) {
  return (
    <DarkCard header="Overview" headerIcon={infoIcon()}>
      <p className="font-bold">{config.name}</p>
      <DashboardCompassController target={target} />
    </DarkCard>
  )
}
