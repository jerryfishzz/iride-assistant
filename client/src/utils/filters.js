import { filter, pipe, prop } from 'ramda'

const filterAll = () => false
const bypass = any => any

export const getAllFilters = (filters, onProduct = true) => {
  const isTrue = val => val === true
  const statusIsTrue = pipe(prop('status'), isTrue)

  const getFilter = onProduct ? prop('filter') : prop('variantFilter')
  const values = Object.values(filters)
  const filterFuncs = values.filter(statusIsTrue).map(getFilter)

  return filterFuncs.length > 0
    ? // Note, in map, the ramda 'filter' actually will return a function that receive an array as paramter to be invoked.
      // It is equal to arr => arr.filter(func) shown below.
      // So it cannot be written as 'filterFuncs.map(filter)'.
      pipe(...filterFuncs.map(filterFunc => filter(filterFunc)))
    : bypass
}

// This is the way not using ramda filter method but only js
// const getAllFilters = filterFuncs => {
//   return filterFuncs.length > 0
//     ? pipe(...filterFuncs.map(func => arr => arr.filter(func)))
//     : bypass
// }
