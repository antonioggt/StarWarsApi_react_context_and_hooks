import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import FilterContext from './FilterContext';

function FilterProvider({ children }) {
  const [dinamicFilter, setDinamicFilter] = useState([]);
  const [firstFilter, setFirstFilter] = useState([]);

  useEffect(() => {
    const fetchPlanetsApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const jason = await response.json();
      setDinamicFilter(jason.results);
      setFirstFilter(jason.results);
    };
    fetchPlanetsApi();
  }, []);

  const object = useMemo(() => ({
    dinamicFilter, firstFilter, setDinamicFilter, setFirstFilter,
  }), [dinamicFilter, firstFilter, setDinamicFilter, setFirstFilter]);

  return (
    <FilterContext.Provider value={ object }>
      { children }
    </FilterContext.Provider>
  );
}

export default FilterProvider;

FilterProvider.propTypes = {
  children: PropTypes.elementType.isRequired,
};
