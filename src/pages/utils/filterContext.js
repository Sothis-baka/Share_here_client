import React from 'react'
const FilterContext = React.createContext({ rule: '', keyword: '' });

export const FilterProvider = FilterContext.Provider;
export default FilterContext;