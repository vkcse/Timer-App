import React from 'react';

function TimerList({ timers, setTimers }) {
  const categories = [...new Set(timers.map(t => t.category))];
  const [expanded, setExpanded] = React.useState({});

  const toggleCategory = (category) => {
    setExpanded(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const handleTimerAction = (id, action) => {
    setTimers(prev => prev.map(timer => {
      if (timer.id === id) {
        switch (action) {
          case 'start':
            return { ...timer, status: 'running' };
          case 'pause':
            return { ...timer, status: 'paused' };
          case 'reset':
            return { ...timer, status: 'paused', remaining: timer.duration };
          default:
            return timer;
        }
      }
      return timer;
    }));
  };

  const handleBulkAction = (category, action) => {
    setTimers(prev => prev.map(timer => {
      if (timer.category === category) {
        switch (action) {
          case 'start':
            return { ...timer, status: 'running' };
          case 'pause':
            return { ...timer, status: 'paused' };
          case 'reset':
            return { ...timer, status: 'paused', remaining: timer.duration };
          default:
            return timer;
        }
      }
      return timer;
    }));
  };

  return (
    <div className="timer-list">
      {categories.map(category => (
        <div key={category} className="category">
          <div className="category-header">
            <h2 onClick={() => toggleCategory(category)}>
              {category} {expanded[category] ? '▼' : '▶'}
            </h2>
            <div className="bulk-actions">
              <button onClick={() => handleBulkAction(category, 'start')}>Start All</button>
              <button onClick={() => handleBulkAction(category, 'pause')}>Pause All</button>
              <button onClick={() => handleBulkAction(category, 'reset')}>Reset All</button>
            </div>
          </div>
          
          {expanded[category] && (
            <div className="timers">
              {timers.filter(t => t.category === category).map(timer => (
                <div key={timer.id} className="timer">
                  <div>
                    <h3>{timer.name}</h3>
                    <p>Remaining: {timer.remaining}s</p>
                    <p>Status: {timer.status}</p>
                    <div className="progress-bar">
                      <div
                        style={{
                          width: `${(timer.remaining / timer.duration) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                  <div className="timer-actions">
                    <button onClick={() => handleTimerAction(timer.id, 'start')}>Start</button>
                    <button onClick={() => handleTimerAction(timer.id, 'pause')}>Pause</button>
                    <button onClick={() => handleTimerAction(timer.id, 'reset')}>Reset</button>
                  </div>
                  {timer.status === 'completed' && (
                    <div className="modal">
                      Congratulations! {timer.name} has completed!
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TimerList;