import React, { useRef, useState } from 'react';
import { uploadVideo } from './api';

function Trim({ video }) {
  const videoRef = useRef(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleTrim = async () => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('video', video);
      formData.append('startTime', startTime);
      formData.append('endTime', endTime);

      const response = await uploadVideo(formData);
      console.log('Video uploaded:', response);
      alert('Video trimmed and uploaded successfully!');
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video');
    } finally {
      setIsUploading(false);
    }
  };

  const duration = videoRef.current?.duration || 0;

  return (
    <div className="trim">
      <h2>Trim Video</h2>
      <video ref={videoRef} src={URL.createObjectURL(video)} controls width="100%" />
      
      <div className="trim-controls">
        <label>
          Start Time (seconds):
          <input 
            type="number" 
            min="0" 
            max={duration}
            value={startTime}
            onChange={(e) => setStartTime(parseFloat(e.target.value))}
          />
        </label>
        
        <label>
          End Time (seconds):
          <input 
            type="number" 
            min="0" 
            max={duration}
            value={endTime}
            onChange={(e) => setEndTime(parseFloat(e.target.value))}
          />
        </label>
      </div>

      <button 
        onClick={handleTrim} 
        className="btn btn-primary"
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Trim & Upload'}
      </button>
    </div>
  );
}

export default Trim;
