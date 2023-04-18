import React, { useRef, useEffect } from 'react';

const Video = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('Failed to access camera', err);
      });
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Video;
