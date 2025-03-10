import { ReactElement } from 'react'
import Object from '../object'
export default function Dashboard({ children }: { children: ReactElement }) {
    return (
        <div className="fixed">
            <Object />
            {children}
        </div>
    )
}
