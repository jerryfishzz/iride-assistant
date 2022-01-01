import fetch from 'node-fetch'
import { API_VERSION, options, STORE_NAME } from '../utils/shopifyConfig.js'

export const queryProducts = async () => {
  const response = await fetch(`https://${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}/products.json`, options)
  return response.json()
}

export const queryByCollection = async collectionId => {
  const response = await fetch(`https://${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}/products.json?collection_id=${collectionId}`, options)
  const products = await response.json()
  
  // The return is an simple object, not a promise
  return {
    responseHeaders: response.headers,
    products
  }
}

export const queryByLimitAndPageInfo = async (limit, pageInfo) => {
  const response = await fetch(`https://${STORE_NAME}.myshopify.com/admin/api/${API_VERSION}/products.json?limit=${limit}&page_info=${pageInfo}`, options)
  return response.json()
}