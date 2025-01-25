import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = () => {
    const [workTime, setWorkTime] = useState(25 * 60);
    const [breakTime, setBreakTime] = useState(5 * 60);
    const [isWorkTime, setIsWorkTime] = useState(true);
    const [timeLeft, setTimeLeft] = useState(workTime);
    const [isRunning, setIsRunning] = useState(false);
    const [enteredWorkTime, setEnteredWorkTime] = useState('');
    const [enteredBreakTime, setEnteredBreakTime] = useState('');

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setIsRunning(false);
                        setTimeout(() => {
                            setIsWorkTime(!isWorkTime);
                            setIsRunning(true);
                        }, 1000); // 1 second delay before starting the next task
                        if (isWorkTime) {
                            alert("Work time is over. Break time starts now!");
                        } else {
                            alert("Break time is over. Work time starts now!");
                        }
                        return isWorkTime ? breakTime : workTime;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, isWorkTime, workTime, breakTime]);

    useEffect(() => {
        setTimeLeft(isWorkTime ? workTime : breakTime);
    }, [isWorkTime, workTime, breakTime]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setIsWorkTime(true);
        setTimeLeft(workTime);
    };

    const handleWorkTimeChange = (e) => {
        setEnteredWorkTime(e.target.value);
    };

    const handleBreakTimeChange = (e) => {
        setEnteredBreakTime(e.target.value);
    };

    const handleSetTimes = () => {
        const newWorkTime = parseFloat(enteredWorkTime) * 60;
        const newBreakTime = parseFloat(enteredBreakTime) * 60;
        setWorkTime(newWorkTime);
        setBreakTime(newBreakTime);
        if (isWorkTime) {
            setTimeLeft(newWorkTime);
        } else {
            setTimeLeft(newBreakTime);
        }
    };

    return (
        <div className='timer'>
            <div>
                <h1>{isWorkTime ? 'Work Time' : 'Break Time'}</h1>
                <h2>{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</h2>
                <button onClick={handleStart}>Start</button>
                <button onClick={handlePause}>Pause</button>
                <button onClick={handleReset}>Reset</button>
                <br />
                <input
                    type="number"
                    placeholder="Enter Work Time (minutes)"
                    value={enteredWorkTime}
                    onChange={handleWorkTimeChange}
                />
                <input
                    type="number"
                    placeholder="Enter Break Time (minutes)"
                    value={enteredBreakTime}
                    onChange={handleBreakTimeChange}
                />
                <button onClick={handleSetTimes}>Set</button>
            </div>
        </div>
    );
};

export default Timer;