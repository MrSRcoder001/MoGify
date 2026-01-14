import React, { useRef, useState } from 'react';

function Recorder({ onRecordComplete }) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always' },
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        onRecordComplete(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="recorder">
      <h2>Screen Recorder</h2>
      <div className="controls">
        {!isRecording ? (
          <button onClick={startRecording} className="btn btn-primary">
            Start Recording
          </button>
        ) : (
          <button onClick={stopRecording} className="btn btn-danger">
            Stop Recording
          </button>
        )}
      </div>
      {isRecording && <p className="recording-indicator">● Recording...</p>}
    </div>
  );
}

export default Recorder;
