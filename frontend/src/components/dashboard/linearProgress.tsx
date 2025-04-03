import React from 'react'
import { Flex, Progress } from 'antd'
import type { ProgressProps } from 'antd/es/progress'

interface LinearProgressProps {
    percent: number
    strokeWidth: number
    trailColor?: string
}

const twoColors: ProgressProps['strokeColor'] = {
    '60%': '#507CFF',
    '100%': '#C0D7FA',
}

const LinearProgress = ({
    percent,
    strokeWidth = 15,
    trailColor = 'rgba(0, 0, 0, 0.5)',
}: LinearProgressProps) => {
    return (
        <Flex gap="small" vertical className="w-full">
            <Progress
                percent={percent}
                percentPosition={{ align: 'end', type: 'inner' }}
                size="default"
                strokeWidth={strokeWidth}
                strokeColor={twoColors}
                trailColor={trailColor}
            />
        </Flex>
    )
}

export default LinearProgress
