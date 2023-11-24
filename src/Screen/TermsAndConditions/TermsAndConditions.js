import React, { useState } from 'react';

const WheelOfFortune = () => {
  const segments = ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5'];
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const spinWheel = () => {
    if (!spinning) {
      setSpinning(true);
      const randomIndex = Math.floor(Math.random() * segments.length);
      const spinDuration = 5000; // milliseconds

      setTimeout(() => {
        setSelectedSegment(segments[randomIndex]);
        setSpinning(false);
      }, spinDuration);
    }
  };

  const getRainbowColor = (index) => {
    const hue = (index * (360 / segments.length)) % 360;
    return `hsl(${hue}, 80%, 70%)`; // Adjust saturation and lightness for a more elegant look
  };

  const calculateArrowRotation = () => {
    if (selectedSegment) {
      const index = segments.indexOf(selectedSegment);
      return `rotate(${index * (360 / segments.length)}deg)`;
    }
    return 'rotate(0deg)';
  };

  return (
    <div style={{ position: 'relative', textAlign: 'center', width: '300px' }}>
      <div
        style={{
          width: '100%',
          height: '300px',
          borderRadius: '50%',
          border: '10px solid #333',
          position: 'relative',
          overflow: 'hidden',
          transition: spinning ? 'transform 5s ease-out' : 'none',
          transform: spinning ? 'rotate(720deg)' : 'none', // Rotate only when spinning
        }}
        className={`wheel ${spinning ? 'spinning' : ''}`}
        onClick={spinWheel}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'black',
          }}
        ></div>
        {segments.map((segment, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              clipPath: 'polygon(50% 50%, 0 0, 100% 0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2em',
              fontWeight: 'bold',
              color: '#fff',
              background: `radial-gradient(circle, ${getRainbowColor(index)}, transparent)`,
              transform: `rotate(${index * (360 / segments.length)}deg)`, // Rotate only when spinning
            }}
            className={`segment segment-${index + 1}`}
          >
            {segment}
          </div>
        ))}
        <div
          style={{
            position: 'absolute',
            top: '10px', // Adjust the distance from the top
            left: '50%',
            transform: `translateX(-50%) ${calculateArrowRotation()}`, // Dynamically calculate rotation
            width: '0',
            height: '0',
            borderLeft: '15px solid transparent',
            borderRight: '15px solid transparent',
            borderBottom: '30px solid #FFD700', // Arrow color
            zIndex: '2',
          }}
        ></div>
      </div>
      <div style={{ marginTop: '20px', fontSize: '1.5em', fontWeight: 'bold' }} className="result">
        {selectedSegment ? <p>Result: {selectedSegment}</p> : null}
      </div>
    </div>
  );
};

export default WheelOfFortune;
