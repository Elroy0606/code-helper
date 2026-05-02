import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';

function App() {
  const timerRef = useRef(null);
  const [code, setCode] = useState('<h1>Hello World!</h1>\n<p>Start building your first brick here.</p>');
  const [isThinking, setIsThinking] = useState(false); // New: Tracks if AI is busy
  const [isSuccess, setIsSuccess] = useState(false);

const [aiMessage, setAiMessage] = useState("Ready to build your first brick?");

  const askRobot = async (userCode) => {
    setIsThinking(true);
    
    setTimeout(() => {
      // Check if they finished the "First Brick" mission
      if (userCode.includes('<h1>') && userCode.includes('<button>')) {
        setAiMessage("Incredible! You've built a header AND a button!");
        setIsSuccess(true); // Trigger the celebration
      } else {
        setAiMessage("Keep going! Try adding a <button> next.");
        setIsSuccess(false);
      }
      setIsThinking(false);
    }, 8000); // 8 seconds simulated delay
  };
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0f172a', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* HEADER SECTION */}
      <header style={{ height: '128px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', padding: '0 32px', backgroundColor: '#1e293b' }}>
        <div style={{ width: '64px', height: '64px', backgroundColor: '#facc15', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0 }}>
          🤖
        </div>
        <div style={{ marginLeft: '24px', backgroundColor: 'white', color: '#0f172a', padding: '16px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>
            {isThinking ? "🤔 Let me see..." : aiMessage}
          </p>
        </div>
      </header>

      {/* MAIN WORKSPACE */}
      <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* LEFT SIDE: EDITOR */}
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', borderRight: '1px solid #334155' }}>
          <div style={{ backgroundColor: '#0f172a', padding: '8px 16px', fontSize: '13px', color: '#94a3b8', borderBottom: '1px solid #1e293b' }}>
            index.html
          </div>
          <div style={{ flex: 1 }}>
            <Editor
              height="100%"
              defaultLanguage="html"
              theme="vs-dark"
              value={code}
              onChange={(val) => {
                setCode(val || '');
                
                // 1. Clear the old timer if the user is still typing
                if (timerRef.current) clearTimeout(timerRef.current);

                // 2. Start a new timer. Only "Ask Robot" after 1 second of silence.
                timerRef.current = setTimeout(() => {
                  askRobot(val || '');
                }, 1000); 
              }}
            />
          </div>
        </div>

        {/* RIGHT SIDE: PREVIEW */}
        <div style={{ width: '50%', backgroundColor: 'white', color: 'black', display: 'flex', flexDirection: 'column' }}>
          <div style={{ backgroundColor: '#f1f5f9', padding: '8px 16px', fontSize: '13px', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>
            Live Preview
          </div>
          <div style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
            <div dangerouslySetInnerHTML={{ __html: code }} />
          </div>
        </div>

      </main>

      {isSuccess && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#facc15', padding: '40px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)', zIndex: 100, color: '#0f172a' }}>
          <h2 style={{ fontSize: '32px', margin: 0 }}>Mission Accomplished! 🏆</h2>
          <p style={{ fontWeight: 'bold' }}>You've mastered the Foundation Bricks.</p>
            <button 
              onClick={() => {
                setIsSuccess(false);
                setCode('<!-- Lesson 2: Add a list! -->\n<ul>\n  <li>Item 1</li>\n</ul>');
                setAiMessage("New Mission: Can you add 3 items to the list?");
              }} 
              style={{ 
                marginTop: '20px', 
                padding: '10px 20px', 
                backgroundColor: '#0f172a', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Next Lesson
            </button>
        </div>
      )}
    </div>
  );
}

export default App;