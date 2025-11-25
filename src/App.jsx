import { useState, useEffect } from 'react';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';
import './App.css';

function App() {
  const [LDProvider, setLDProvider] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initLD = async () => {
      try {
        const clientKey = import.meta.env.VITE_LAUNCH_DARKLY_CLIENT_KEY;

        if (!clientKey) {
          throw new Error('LaunchDarkly client key not found in environment variables');
        }

        const provider = await asyncWithLDProvider({
          clientSideID: clientKey,
          context: {
            kind: 'user',
            key: 'demo-user-123',
            name: 'Demo User',
            email: 'demo@example.com'
          }
        });

        setLDProvider(() => provider);
      } catch (err) {
        console.error('LaunchDarkly initialization error:', err);
        setError(err.message);
      }
    };

    initLD();
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <h2>❌ LaunchDarkly Initialization Error</h2>
        <p>{error}</p>
        <p>Please check your .env file and ensure VITE_LAUNCH_DARKLY_CLIENT_KEY is set.</p>
      </div>
    );
  }

  if (!LDProvider) {
    return (
      <div className="loading-container">
        <h2>🔄 Connecting to LaunchDarkly...</h2>
      </div>
    );
  }

  return (
    <LDProvider>
      <DemoApp />
    </LDProvider>
  );
}

export default App;
