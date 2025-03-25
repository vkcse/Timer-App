import React, { useState, useEffect } from 'react';
import TimerForm from './TimerForm';
import TimerList from './TimerList';
import './App.css';

function App() {
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => {
        return prev.map(timer => {
          if (timer.status === 'running' && timer.remaining > 0) {
            const newRemaining = timer.remaining - 1;
            if (newRemaining === 0) {
              return { ...timer, status: 'completed', remaining: 0 };
            }
            return { ...timer, remaining: newRemaining };
          }
          return timer;
        });
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timers]);

  const addTimer = (timer) => {
    const newTimer = {
      ...timer,
      id: Date.now(),
      remaining: timer.duration,
      status: 'paused'
    };
    setTimers(prev => [...prev, newTimer]);
  };

  return (
    <div className="app">
      <h1>Timer App</h1>
      <TimerForm onAdd={addTimer} />
      <TimerList timers={timers} setTimers={setTimers} />
    </div>
  );
}

export default App;