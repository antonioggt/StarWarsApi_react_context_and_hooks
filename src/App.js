import React from 'react';
import './App.css';
import AscDescFilter from './components/AscDescFilter';
import NameSearchInput from './components/NameSearchInput';
import NumericFilter from './components/NumericFilter';
import Table from './components/Table';

function App() {
  return (
    <div>
      <NameSearchInput />
      <NumericFilter />
      <AscDescFilter />
      <Table />
    </div>
  );
}

export default App;
