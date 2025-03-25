import React, { useState } from 'react';

function TimerForm({ onAdd }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && duration && category) {
      onAdd({
        name,
        duration: parseInt(duration),
        category
      });
      setName('');
      setDuration('');
      setCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="timer-form">
      <input
        type="text"
        placeholder="Timer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Duration (seconds)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      
      <button type="submit">Add Timer</button>
    </form>
  );
}

export default TimerForm;