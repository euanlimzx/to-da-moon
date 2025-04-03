export const Gauge = ({
    value,
    size = 'small',
    showValue = true,
    color = '#FFFFFF', // Default to white
    bgcolor = '#333333', // Default background color
}: {
    value: number
    size: 'small' | 'medium' | 'large'
    showValue: boolean
    color?: string // Accepts a color hash code
    bgcolor?: string // Accepts a background color hash code
}) => {
    const circumference = 332 // 2 * Math.PI * 53; // 2 * pi * radius
    const valueInCircumference = (value / 100) * circumference
    const strokeDasharray = `${circumference} ${circumference}`
    const initialOffset = circumference
    const strokeDashoffset = initialOffset - valueInCircumference

    const sizes = {
        small: {
            width: '36',
            height: '36',
            textSize: 'text-xs',
        },
        medium: {
            width: '72',
            height: '72',
            textSize: 'text-lg',
        },
        large: {
            width: '144',
            height: '144',
            textSize: 'text-3xl',
        },
    }

    return (
        <div className="relative flex flex-col items-center justify-center">
            <svg
                fill="none"
                shapeRendering="crispEdges"
                height={sizes[size].height}
                width={sizes[size].width}
                viewBox="0 0 120 120"
                strokeWidth="2"
                className="-rotate-90 transform"
            >
                {/* Background Circle */}
                <circle
                    stroke={bgcolor} // Use the background color hash
                    strokeWidth="12"
                    fill="transparent"
                    shapeRendering="geometricPrecision"
                    r="53"
                    cx="60"
                    cy="60"
                />
                {/* Foreground Circle */}
                <circle
                    stroke={color} // Use the stroke color hash
                    strokeWidth="12"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    shapeRendering="geometricPrecision"
                    strokeLinecap="round"
                    fill="transparent"
                    r="53"
                    cx="60"
                    cy="60"
                    style={{
                        strokeDashoffset: strokeDashoffset,
                        transition:
                            'stroke-dasharray 1s ease 0s, stroke 1s ease 0s',
                    }}
                />
            </svg>

            {showValue ? (
                <div className="animate-gauge_fadeIn absolute flex">
                    <p className={`text-gray ${sizes[size].textSize}`}>
                        {value}
                    </p>
                </div>
            ) : null}
        </div>
    )
}