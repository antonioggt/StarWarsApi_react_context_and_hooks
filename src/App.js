import React from 'react';
import './App.css';
import NameSearchInput from './components/NameSearchInput';
import NumericFilter from './components/NumericFilter';
import Table from './components/Table';

function App() {
  return (
    <div>
      <NameSearchInput />
      <NumericFilter />
      <Table />
    </div>
  );
}

export default App;
