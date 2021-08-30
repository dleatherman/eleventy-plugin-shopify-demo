// const pluginShopify = require("../"); // For local development

const pluginShopify = require("eleventy-plugin-shopify");

require("dotenv").config();

const { SHOPIFY_STORE_URL, SHOPIFY_ACCESS_TOKEN, SHOPIFY_API_VERSION } = process.env;

const productsQuery = `
query {
  products(first: 100, sortKey: CREATED_AT) {
    edges {
      node {
        id
        title
        handle
        descriptionHtml
        productType
        tags
        totalInventory
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        variants(sortKey: POSITION, first: 100) {
          edges {
            node {
              id
              title
              quantityAvailable
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
}`

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginShopify, {
    url: SHOPIFY_STORE_URL,
    key: SHOPIFY_ACCESS_TOKEN,
    version: SHOPIFY_API_VERSION,
    productsQuery: productsQuery,
  });
};