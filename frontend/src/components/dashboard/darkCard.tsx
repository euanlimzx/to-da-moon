import type { ReactNode } from 'react'

interface DarkCardProps {
    children: ReactNode
    header?: string
    headerIcon?: ReactNode
}

export default function DarkCard({
    children,
    header,
    headerIcon,
}: DarkCardProps) {
    return (
        <div className="z-10 inline-block rounded-lg bg-black bg-opacity-50 p-5 shadow-lg">
            {(header || headerIcon) && (
                <div className="mb-4 flex items-center text-white">
                    {headerIcon && <div className="mr-2">{headerIcon}</div>}
                    {header && (
                        <h2 className="text-xl font-semibold">{header}</h2>
                    )}
                </div>
            )}
            <div>{children}</div>
        </div>
    )
}
