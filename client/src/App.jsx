import React, { useState } from 'react';
import Recorder from './Recorder';
import Trim from './Trim';
import Preview from './Preview';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('recorder');
  const [recordedVideo, setRecordedVideo] = useState(null);

  return (
    <div className="App">
      <header>
        <h1>Demo(MoG) Recorder</h1>
      </header>
      <nav>
        <button 
          className={activeTab === 'recorder' ? 'active' : ''}
          onClick={() => setActiveTab('recorder')}
        >
          Record
        </button>
        <button 
          className={activeTab === 'trim' ? 'active' : ''}
          onClick={() => setActiveTab('trim')}
          disabled={!recordedVideo}
        >
          Trim
        </button>
        <button 
          className={activeTab === 'preview' ? 'active' : ''}
          onClick={() => setActiveTab('preview')}
          disabled={!recordedVideo}
        >
          Preview
        </button>
      </nav>
      
      <main>
        {activeTab === 'recorder' && <Recorder onRecordComplete={setRecordedVideo} />}
        {activeTab === 'trim' && recordedVideo && <Trim video={recordedVideo} />}
        {activeTab === 'preview' && recordedVideo && <Preview video={recordedVideo} />}
      </main>
      <footer>
        <pre>Developed By Mr satish rathod </pre>
      </footer>
    </div>
    
  );
}

export default App;
