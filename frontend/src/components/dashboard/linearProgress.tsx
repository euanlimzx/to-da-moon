import React, { useEffect } from 'react'
import { useState } from 'react'
import { Flex, Progress } from 'antd'
import type { ProgressProps } from 'antd/es/progress'
import type { OverviewConfig } from '@/types/HudTypes'

interface LinearProgressProps {
    percent: number
    strokeWidth?: number
    trailColor?: string
    OverviewConfig: OverviewConfig
}

enum StreamStatus {
    active = "active",
    normal = "normal",
}

const twoColors: ProgressProps['strokeColor'] = {
    '60%': '#507CFF',
    '100%': '#C0D7FA',
}


const LinearProgress = ({
    percent,
    strokeWidth = 15,
    trailColor = '#000000',
    OverviewConfig
}: LinearProgressProps) => {

    const [barStatus, setBarStatus] = useState<keyof typeof StreamStatus>("normal")
    
    // Use useEffect to update state based on props
    useEffect(() => {
        if (OverviewConfig?.isActive) {
            setBarStatus('active')
        } else {
            setBarStatus('normal')
        }
    }, [OverviewConfig?.isActive]) // Only run when isActive changes
    
    return (
        <Flex gap="small" vertical className="w-full">
            <Progress
                percent={percent}
                percentPosition={{ align: 'end', type: 'inner' }}
                format={() => null} // Removes the percentage text
                size="default"
                status={barStatus} //change based on OverviewConfig passed in
                strokeWidth={strokeWidth}
                strokeColor={twoColors}
                trailColor={trailColor}
            />
        </Flex>
    )
}
export default LinearProgress