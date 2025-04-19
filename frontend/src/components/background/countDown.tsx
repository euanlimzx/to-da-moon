import React from 'react'

interface CountDownProps {
    time: number
}

const CountDown = ({time} : CountDownProps) => {
    if (time === -1) {
        return null; // Render nothing if time is -1
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50">
            {time > 0 ? (
                <div className="text-white text-6xl font-bold animate-pulse">
                    {time}
                </div>
            ) : (
                <div className="text-green-500 text-6xl font-bold animate-ping">
                    Start!
                </div>
            )}
        </div>
    );
}

export default CountDown