// eslint-disable-next-line
import React, { useEffect, useState } from 'react'


const Timer = (props) => {
    // eslint-disable-next-line
    const { isRunning, onTimesUp, setIsRunning } = props
    // eslint-disable-next-line
    const [count, setCount] = useState(600)
    // eslint-disable-next-line
    const [timer, setTimer] = useState(null);
    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10)
        const hours = Math.floor(sec_num / 3600)
        const minutes = Math.floor(sec_num / 60) % 60
        const seconds = sec_num % 60
        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }

    // useEffect(() => {
    //     if (!isRunning) {
    //         clearInterval(timer);
    //         return;
    //     }

    //     const intervalId = setInterval(() => {
    //         setCount(prevCount => prevCount - 1);
    //     }, 1000);

    //     setTimer(intervalId);

    //     if (count === 0) {
    //         onTimesUp();
    //         setIsRunning(false);
    //         clearInterval(timer);
    //     }

    //     return () => {
    //         clearInterval(intervalId);
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isRunning, count]);

    return (
        <div>{toHHMMSS(count)}</div>
    )
}

export default Timer