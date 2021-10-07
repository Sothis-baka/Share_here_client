import React from 'react'

/* context to save post filter rules */
const FilterContext = React.createContext({ rule: '', keyword: '' });

export const FilterProvider = FilterContext.Provider;
export default FilterContext;