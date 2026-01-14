import React, { useRef } from 'react';

function Preview({ video }) {
  const videoRef = useRef(null);

  const downloadVideo = () => {
    const url = URL.createObjectURL(video);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'screen-recording.webm';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="preview">
      <h2>Preview</h2>
      <video ref={videoRef} src={URL.createObjectURL(video)} controls width="100%" />
      
      <div className="preview-controls">
        <button onClick={() => videoRef.current?.play()} className="btn btn-secondary">
          Play
        </button>
        <button onClick={() => videoRef.current?.pause()} className="btn btn-secondary">
          Pause
        </button>
        <button onClick={downloadVideo} className="btn btn-primary">
          Download
        </button>
      </div>
    </div>
  );
}

export default Preview;
