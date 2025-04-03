import { ReactElement } from 'react'
import Object from '@/components/rocket-object'
import LinearProgress from '@/components/dashboard/linearProgress'
import Timeline from './timeline'
export default function Dashboard({ children }: { children: ReactElement }) {
    return (
        <div className="fixed">
            <Timeline />
            <Object />
            <LinearProgress percent={50} />
            {children}
        </div>
    )
}
