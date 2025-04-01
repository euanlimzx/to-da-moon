import React from 'react'
import { Flex, Progress } from 'antd'

interface LinearProgressProps {
    percent: number
    colorHash ?: string
    trailColor ?: string
}

const LinearProgress = ( {percent, colorHash = "#E6F4FF", trailColor = "#808080"} : LinearProgressProps) => {
  return (
    <Flex gap="small" vertical>
        <Progress
            percent={percent}
            percentPosition={{ align: 'end', type: 'inner' }}
            size={[400, 20]}
            strokeColor={colorHash}
            trailColor={trailColor}
        />
    </Flex>
  )
}

export default LinearProgress