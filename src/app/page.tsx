'use client';

import { useState, useEffect, useRef } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';

export default function Home() {
  const [chatVisible, setChatVisible] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const initialCode = `function App() {
  return (
    <div>
      <h1>Hello, world!</h1>
      <p>This is a simple webpage.</p>
    </div>
  );
}

export default App;`;

  const [code] = useState(initialCode);

  const handleAsk = async () => {
    if (!chatInput.trim()) return;
    setLoading(true);
    setResponse('');

    const res = await fetch('/api/hint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: chatInput, code }),
    });

    const data = await res.json();
    setResponse(data.answer || 'No response.');
    setLoading(false);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setChatVisible(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="w-full bg-black text-white relative">
      {/* Sandpack Editor */}
      <div className="w-full">
        <Sandpack
          template="react"
          theme="dark"
          files={{
            '/App.js': {
              code,
              active: true,
            },
          }}
          options={{
            showLineNumbers: true,
            showTabs: true,
            wrapContent: true,
            editorHeight: 500,
          }}
        />
      </div>

      {/* Ask ChatGPT Button */}
      <button
        onClick={() => setChatVisible(true)}
        className="fixed bottom-5 right-5 z-50 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
      >
        Ask ChatGPT
      </button>

      {/* Modal */}
      {chatVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1e1e1e] p-6 rounded-lg w-full max-w-md text-white relative">
            {/* Close button top-right */}
            <button
              onClick={() => setChatVisible(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-lg"
            >
              &times;
            </button>

            <h2 className="text-lg mb-4 font-semibold">Ask ChatGPT for a Hint</h2>

            {/* Textarea + Submit (if no response) */}
            {!response && (
              <>
                <textarea
                  ref={textareaRef}
                  className="w-full p-2 rounded bg-[#2e2e2e] text-white mb-3"
                  placeholder="What do you need help with?"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  rows={3}
                />
                <button
                  onClick={handleAsk}
                  className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded text-sm"
                  disabled={loading}
                >
                  {loading ? 'Thinking...' : 'Submit'}
                </button>
              </>
            )}

            {/* Response + New Question + Close */}
            {response && (
              <div className="mt-4 space-y-4">
                <div className="p-3 rounded bg-[#2a2a2a] text-sm text-gray-200 whitespace-pre-wrap">
                  {response}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setResponse('');
                      setChatInput('');
                      setTimeout(() => textareaRef.current?.focus(), 0);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded text-sm"
                  >
                    New Question
                  </button>
                  <button
                    onClick={() => setChatVisible(false)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
