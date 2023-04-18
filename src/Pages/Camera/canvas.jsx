import React, { useState, useRef } from 'react';

const DragLine = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const lineRef = useRef(null);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    const lineRect = lineRef.current.getBoundingClientRect();
    setDragOffset({
      x: event.clientX - lineRect.left,
      y: event.clientY - lineRect.top
    });
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      setPosition({
        x: event.clientX - dragOffset.x,
        y: event.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ position: 'relative', width: '500px', height: '500px' }}
    >
      <div
        ref={lineRef}
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          width: '50%',
          height: 1,
          background: 'red'
        }}
      />
    </div>
  );
};

export default DragLine;
