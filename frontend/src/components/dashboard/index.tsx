import { ReactElement } from 'react'
export default function Dashboard({ children }: { children: ReactElement }) {
    return <div className="fixed">{children}</div>
}
