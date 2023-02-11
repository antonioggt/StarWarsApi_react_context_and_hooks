import React, { useContext, useEffect, useState } from 'react';
import FilterContext from '../context/FilterContext';

const typeOptions = ['population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water'];

function NumericFilter() {
  const { setFirstFilter, firstFilter, dinamicFilter } = useContext(FilterContext);
  // const [previState, setPreviState] = useState([]);
  const [typeState, setTypeState] = useState(typeOptions);
  const [typeSelect, setTypeSelect] = useState('population');
  const [operatorSelect, setOperatorSelect] = useState('maior que');
  const [numberInput, setNumberInput] = useState(0);
  const [multipleFilters, setMultiplesFilters] = useState([]);
  const [accFilters, setAccFilters] = useState([]);
  const [filterIds, setFilterIds] = useState(0);

  /* useEffect(() => {
    if (previState.length === 0) {
      setPreviState(firstFilter);
    }
  }, [previState.length/* firstFilter ]); */

  function handleTypeSelect({ target }) {
    setTypeSelect(target.value);
  }

  function handleOperatorSelect({ target }) {
    setOperatorSelect(target.value);
  }

  function handleNumberInput({ target }) {
    setNumberInput(target.value);
  }

  function handleInitialSearch() {
    const firstComp = typeSelect === 'population';
    const secondComp = operatorSelect === 'maior que';
    const thirdComp = +numberInput === 0;
    if (firstComp && secondComp && thirdComp) {
      setFirstFilter(firstFilter.filter((el) => el[typeSelect] !== 'unknown'));
      return true;
    }
    return false;
  }

  function handleNumericChanges() {
    /* console.log(previState.filter((el) => +el[typeSelect] < +numberInput)); */
    switch (operatorSelect) {
    case 'maior que':
      setFirstFilter(firstFilter.filter((el) => +el[typeSelect] > +numberInput));
      setAccFilters([...accFilters,
        {
          typeSelect,
          operatorSelect,
          numberInput,
          id: filterIds + 1,
        }]);
      setFilterIds(filterIds + 1);
      break;
    case 'igual a':
      setFirstFilter(firstFilter.filter((el) => +el[typeSelect] === +numberInput));
      setFilterIds(filterIds + 1);
      setAccFilters([...accFilters,
        {
          typeSelect,
          operatorSelect,
          numberInput,
          id: filterIds + 1,
        }]);
      setFilterIds(filterIds + 1);
      break;
    case 'menor que':
      setFirstFilter(firstFilter.filter((el) => +el[typeSelect] < +numberInput));
      setFilterIds(filterIds + 1);
      setAccFilters([...accFilters,
        {
          typeSelect,
          operatorSelect,
          numberInput,
          id: filterIds + 1,
        }]);
      setFilterIds(filterIds + 1);
      break;
    default:
      break;
    }
  }

  function handleMultipleFilters() {
    if (multipleFilters.length > 0) {
      switch (operatorSelect) {
      case 'maior que':
        setFirstFilter(multipleFilters.filter((el) => +el[typeSelect] > +numberInput));
        break;
      case 'igual a':
        setFirstFilter(multipleFilters.filter((el) => +el[typeSelect] === +numberInput));
        break;
      case 'menor que':
        setFirstFilter(multipleFilters.filter((el) => +el[typeSelect] < +numberInput));
        break;
      default:
        break;
      }
    }
  }

  useEffect(() => {
    setMultiplesFilters(firstFilter);
  }, [firstFilter]);

  function handleXButton({ target }, removed) {
    const filterRemover = accFilters.filter((el) => el.id !== +target.id);
    // const newTypesOptions = typeOptions.filter((el) => el !== removed);
    setTypeState([...typeState, removed]);
    setAccFilters(filterRemover);
  }

  function removeTypeOptions() {
    const repeatedType = typeState.filter((el) => el !== typeSelect);
    setTypeState(repeatedType);
    setTypeSelect(repeatedType[0]);
  }

  function handleRemoveAllFilters() {
    setAccFilters([]);
    setTypeState(typeOptions);
  }

  useEffect(() => {
    if (accFilters.length > 0) {
      const reducedFilter = accFilters.reduce((acc, el) => {
        console.log(accFilters);
        switch (el.operatorSelect) {
        case 'maior que':
          return acc.filter((item) => +item[el.typeSelect] > +el.numberInput);
        case 'igual a':
          return acc.filter((item) => +item[el.typeSelect] === +el.numberInput);
        case 'menor que':
          return acc.filter((item) => +item[el.typeSelect] < +el.numberInput);
        default:
          return acc;
        }
      }, dinamicFilter);
      setFirstFilter(reducedFilter);
    } else {
      setFirstFilter(dinamicFilter);
    }
  }, [accFilters]);

  function handleNumericMultipleFilters() {
    if (handleInitialSearch()) return;
    handleNumericChanges();
    handleMultipleFilters();
    removeTypeOptions();
  }

  return (
    <div>
      <select
        data-testid="column-filter"
        value={ typeSelect }
        onChange={ handleTypeSelect }
      >
        { typeState.map((el) => (
          <option
            key={ el }
          >
            {el}
          </option>)) }
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
        onClick={ handleNumericMultipleFilters }
      >
        filtrar
      </button>
      {accFilters.map((el) => (
        <div
          key={ el.id }
          data-testid="filter"
        >
          <p>{ el.typeSelect }</p>
          <p>{ el.operatorSelect }</p>
          <p>{ el.numberInput }</p>
          <button
            type="button"
            name={ el.typeSelect }
            id={ el.id }
            onClick={ (event) => handleXButton(event, el.typeSelect) }
          >
            X
          </button>
        </div>
      ))}
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ handleRemoveAllFilters }
      >
        Remove All
      </button>
    </div>
  );
}

export default NumericFilter;
