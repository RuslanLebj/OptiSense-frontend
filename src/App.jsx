import React from 'react';
import './App.css';
import Layout from './layout/Layout';

function App() {
  return (
    <div>
      <Layout />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Welcome to My App</h1>
      </div>
    </div>
  );
}

export default App
