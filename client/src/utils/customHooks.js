import { createContext, useContext, useEffect, useState } from 'react'
import { getAllFilters } from './filters'
import { mapValueToArray } from './helper'

/**
 * Helper function to create context.
 * Will show error if content is out of context.
 */
export function createCtx(providerName, displayName) {
  const ctx = createContext(undefined)

  if (ctx && displayName) {
    ctx.displayName = displayName
  }

  function useCtx(componentName = 'Consumer components') {
    const c = useContext(ctx)
    if (c === undefined)
      throw new Error(
        `${componentName} must be inside ${providerName} with a value`
      )
    return c
  }
  return [useCtx, ctx.Provider]
}

/**
 * Checkbox having indeterminate status
 * This hook only deals with its immedieate parent but not grandparent
 */

// Avoids selected value exceeding the max value.
// Useful when checked is true by default.
export const getIncrementSelected = length => selected =>
  selected + 1 > length ? length : selected + 1

// Avoids selected value going lower than 0.
// Useful when checked is false by default.
export const decrementSelected = selected => {
  if (!selected) return selected
  return selected - 1
}

/**
 * Filtered products
 */
export const useFilteredProducts = (productsMap, filters) => {
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const products = mapValueToArray(productsMap)
    const filteredProducts = getAllFilters(filters)(products)

    setFilteredProducts(filteredProducts)
  }, [filters, productsMap])

  return [filteredProducts, setFilteredProducts]
}

/**
 * Reset price
 */
export const useReset = resetFromAbove => {
  const [reset, setReset] = useState(0)

  const resetPriceSetting = e => {
    e.preventDefault()
    setReset(prev => prev + 1)
  }

  useEffect(() => {
    if (resetFromAbove && resetFromAbove !== reset) setReset(resetFromAbove)
  }, [reset, resetFromAbove])

  return [reset, resetPriceSetting]
}
