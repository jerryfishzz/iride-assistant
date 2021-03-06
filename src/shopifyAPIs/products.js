import debugModule from 'debug'
import { handleFetch } from '../utils/functions.js'
import { OPTIONS_GET, BASE_REQUEST_URL } from '../utils/shopifyConfig.js'

const debug = debugModule('app: productAPI')

const PRODUCT_REQUEST_URL = `${BASE_REQUEST_URL}products.json`

export const queryProducts = () => {
  return handleFetch(PRODUCT_REQUEST_URL, OPTIONS_GET)
}

export const queryByCollectionId = collectionId => {
  const url = `${PRODUCT_REQUEST_URL}?collection_id=${collectionId}`
  return handleFetch(url, OPTIONS_GET)
}

export const queryByPageInfo = (limit, pageInfo) => {
  const url = `${PRODUCT_REQUEST_URL}?limit=${limit}&page_info=${pageInfo}`
  return handleFetch(url, OPTIONS_GET)
}

export const queryByProductId = productId => {
  const url = `${BASE_REQUEST_URL}products/${productId}.json`
  return handleFetch(url, OPTIONS_GET)
}
