import type { ReactNode } from 'react'

interface DarkCardProps {
    children: ReactNode
    header?: string
    headerIcon?: ReactNode
    padding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
    hideOverflow?: boolean
}

// Map of padding values to Tailwind classes
const paddingClasses = {
    0: 'p-0',
    1: 'p-1',
    2: 'p-2',
    3: 'p-3',
    4: 'p-4',
    5: 'p-5',
    6: 'p-6',
    8: 'p-8',
    10: 'p-10',
    12: 'p-12',
    16: 'p-16',
}

export default function DarkCard({
    children,
    header,
    headerIcon,
    padding = 5,
    hideOverflow = false,
}: DarkCardProps) {
    return (
        <div
            className={`z-10 inline-block h-full w-full rounded-lg bg-black bg-opacity-50 shadow-lg ${paddingClasses[padding]} ${hideOverflow ? 'overflow-hidden' : ''}`}
        >
            {(header || headerIcon) && (
                <div className="mb-4 flex items-center text-white">
                    {headerIcon && <div className="mr-2">{headerIcon}</div>}
                    {header && (
                        <h2 className="text-xl font-semibold">{header}</h2>
                    )}
                </div>
            )}
            <div className="h-full w-full">{children}</div>
        </div>
    )
}
