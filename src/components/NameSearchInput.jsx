import React, { useContext } from 'react';
import FilterContext from '../context/FilterContext';

function NameSearchInput() {
  const { setFirstFilter, dinamicFilter } = useContext(FilterContext);

  function handleChanges(e) {
    setFirstFilter(dinamicFilter.filter((element) => (
      element.name.includes(e.target.value))));
  }
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        onChange={ handleChanges }
      />
    </div>
  );
}

export default NameSearchInput;
