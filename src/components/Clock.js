import React from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
const Clock = () => {
    return (
        <><div className="clock1">
            <CountdownCircleTimer
                isPlaying
                duration={700}
                size={400}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer></div></>
    )
}

export default Clock