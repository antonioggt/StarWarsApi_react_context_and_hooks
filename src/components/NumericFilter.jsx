import React, { useContext, useEffect, useState } from 'react';
import FilterContext from '../context/FilterContext';

function NumericFilter() {
  const { setFirstFilter, firstFilter } = useContext(FilterContext);
  const [previState, setPreviState] = useState([]);
  const [typeSelect, setTypeSelect] = useState('population');
  const [operatorSelect, setOperatorSelect] = useState('maior que');
  const [numberInput, setNumberInput] = useState(0);

  useEffect(() => {
    if (previState.length === 0) {
      setPreviState(firstFilter);
    }
  }, [previState.length, firstFilter]);

  function handleTypeSelect({ target }) {
    setTypeSelect(target.value);
  }

  function handleOperatorSelect({ target }) {
    setOperatorSelect(target.value);
  }

  function handleNumberInput({ target }) {
    setNumberInput(target.value);
  }

  function handleNumericChanges() {
    console.log(previState.filter((el) => +el[typeSelect] < +numberInput));
    switch (operatorSelect) {
    case 'maior que':
      setFirstFilter(previState.filter((el) => +el[typeSelect] > +numberInput));
      break;
    case 'igual a':
      setFirstFilter(previState.filter((el) => +el[typeSelect] === +numberInput));
      break;
    case 'menor que':
      setFirstFilter(previState.filter((el) => +el[typeSelect] < +numberInput));
      break;
    default:
      break;
    }
  }
  return (
    <div>
      <select
        data-testid="column-filter"
        value={ typeSelect }
        onChange={ handleTypeSelect }
      >
        <option
          key="population"
        >
          population
        </option>
        <option
          key="orbital_period"
        >
          orbital_period
        </option>
        <option
          key="diameter"
        >
          diameter
        </option>
        <option
          key="rotation_period"
        >
          rotation_period
        </option>
        <option
          key="surface_water"
        >
          surface_water
        </option>
      </select>
      <select
        data-testid="comparison-filter"
        value={ operatorSelect }
        onChange={ handleOperatorSelect }
      >
        <option
          key="maior que"
        >
          maior que
        </option>
        <option
          key="igual a"
        >
          igual a
        </option>
        <option
          key="menor que"
        >
          menor que
        </option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ handleNumberInput }
        value={ numberInput }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleNumericChanges }
      >
        filtrar
      </button>
    </div>
  );
}

export default NumericFilter;
