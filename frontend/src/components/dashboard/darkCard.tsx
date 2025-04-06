import type { ReactNode } from 'react'

interface DarkCardProps {
    children: ReactNode
    header?: string
    headerIcon?: ReactNode
    lessPadding?: boolean
    grow?: boolean
    hideOverflow?: boolean
}

export default function DarkCard({
    children,
    header,
    headerIcon,
    lessPadding = false,
    grow = false,
    hideOverflow = false,
}: DarkCardProps) {
    return (
        <div
            className={`z-10 inline-block rounded-lg bg-black bg-opacity-50 shadow-lg ${grow && 'h-full w-full'} ${lessPadding ? 'p-3' : 'p-5'} ${hideOverflow && 'overflow-hidden'}`}
        >
            {(header || headerIcon) && (
                <div className="mb-4 flex items-center text-white">
                    {headerIcon && <div className="mr-2">{headerIcon}</div>}
                    {header && (
                        <h2 className="text-xl font-semibold">{header}</h2>
                    )}
                </div>
            )}
            <div className={`${grow ? 'h-full w-full' : ''}`}>{children}</div>
        </div>
    )
}
