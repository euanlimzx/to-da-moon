import { useState } from 'react'
import LinearProgress from './linearProgress'

const Timeline = () => {
    const numberOfStages = 5
    const [progress, setProgress] = useState(3)
    const [isActive, setIsActive] = useState(false)

    return (
        <div>
            <div className="flex items-center gap-2 pb-2">
                <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full ${isActive ? 'bg-red-500' : 'bg-green-500'}`}
                ></div>
                {isActive ? 'LIVE' : 'INACTIVE'}
            </div>
            <LinearProgress percent={(progress / numberOfStages) * 100} />
            <div className="flex w-full items-center justify-between">
                {/* Dynamically generate circles */}
                {Array.from({ length: numberOfStages }).map((_, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div
                            className={`flex h-3 w-3 items-center justify-center rounded-full`}
                            style={{
                                backgroundColor:
                                    index < progress
                                        ? '#3182CE'
                                        : 'rgba(0, 0, 0, 0.5)',
                            }}
                        ></div>
                        <span className="mt-2 text-lg">{`Phase ${index + 1}`}</span>
                        {/* todo @euan make this phases represent a certain stage? */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Timeline
