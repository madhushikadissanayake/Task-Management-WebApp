import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './components/SignInPage';
import Dashboard from './components/Dashboard';

function App() {
  // In a real app, you'd manage authentication state here
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/signin" 
            element={
              isAuthenticated ? 
              <Navigate to="/dashboard" replace /> : 
              <SignInPage onSignIn={() => setIsAuthenticated(true)} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
              <Dashboard /> : 
              <Navigate to="/signin" replace />
            } 
          />
          <Route path="/" element={<Navigate to="/signin" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;