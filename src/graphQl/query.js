import { gql } from "@apollo/client";

/**
 * GraphQL Query to Get ALl Products From Projection
 */
const getProducts = gql`
  query getAllProducts {
    products {
      id
      name {
        ...nameFragement
      }
      metaDescription {
        ...nameFragement
      }
      masterVariant {
        ...variantFragment
      }
      variants {
        ...variantFragment
      }
    }
  }

  fragment nameFragement on name {
    en
    de
  }

  # Because there are common Values in MasterVariant and Variant
  fragment variantFragment on Variant {
    prices {
      value {
        centAmount
        currencyCode
        fractionDigits
      }
    }
    images {
      url
    }
    sku
    attributes {
      name
      value
    }
  }
`;

/**
 * GraphQL Query to Get Product by ID From Projection
 */
const getProductById = gql`
  query fetchProductById($productId: ID!) {
    product(id: $productId) {
      id
      name {
        ...nameFragement
      }
      metaDescription {
        ...nameFragement
      }
      masterVariant {
        ...variantFragment
      }
      variants {
        ...variantFragment
      }
    }
  }

  fragment nameFragement on name {
    en
    de
  }

  # Because there are common Values in MasterVariant and Variant
  fragment variantFragment on Variant {
    prices {
      value {
        centAmount
        currencyCode
        fractionDigits
      }
    }
    images {
      url
    }
    sku
    attributes {
      name
      value
    }
  }
`;

export { getProducts, getProductById };
