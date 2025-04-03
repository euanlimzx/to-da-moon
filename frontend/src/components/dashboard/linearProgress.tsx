import React from 'react'
import { Flex, Progress } from 'antd'
import type { ProgressProps } from 'antd/es/progress'

interface LinearProgressProps {
    percent: number
    trailColor?: string
}

const twoColors: ProgressProps['strokeColor'] = {
    '60%': '#507CFF',
    '100%': '#C0D7FA',
}

const LinearProgress = ({
    percent,
    trailColor = 'rgba(0, 0, 0, 0.5)',
}: LinearProgressProps) => {
    return (
        <Flex gap="small" vertical>
            <Progress
                percent={percent}
                percentPosition={{ align: 'end', type: 'inner' }}
                size={[400, 20]}
                strokeColor={twoColors}
                trailColor={trailColor}
            />
        </Flex>
    )
}

export default LinearProgress
