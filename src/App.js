import React from 'react';
import { Routes, Route } from "react-router-dom";
import Dashboard from '../src/pages/Dashboard';
import UserEdit from '../src/pages/UserEdit';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/edit-user/:id" exact element={<UserEdit />} />
      </Routes>
    </div>
  );
}

export default App;
