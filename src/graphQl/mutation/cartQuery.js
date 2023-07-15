import { gql } from "@apollo/client";

/**
 * GQL Query to Create cart or add item to
 */
const addToCartQuery = gql`
  mutation addToCart($input: CartData) {
    addToCart(input: $input) {
      id
      version
      lineItems {
        id
        name {
          en
        }
        productId
        variant {
          images {
            url
          }
          prices {
            value {
              currencyCode
              centAmount
              fractionDigits
            }
          }
          sku
        }
        quantity
      }
      totalPrice {
        centAmount
        currencyCode
        fractionDigits
      }
    }
  }
`;

const fetchLineItemQuery = gql`
  mutation fetchCart($cartId: String) {
    fetchCart(cart_id: $cartId) {
      anonymousId
      lineItems {
        id
        name {
          en
        }
        productId
        variant {
          images {
            url
          }
          prices {
            value {
              currencyCode
              centAmount
              fractionDigits
            }
          }
          sku
        }
        quantity
      }
      totalLineItemQuantity
      totalPrice {
        centAmount
        currencyCode
        fractionDigits
      }
    }
  }
`;

const removeLineItemQuery = gql`
  mutation deleteFromCart($input: DeleteItemFromCart) {
    deleteFromCart(input: $input) {
      id
      version
      lineItems {
        id
        name {
          en
        }
        productId
        variant {
          images {
            url
          }
          prices {
            value {
              currencyCode
              centAmount
              fractionDigits
            }
          }
          sku
        }
        quantity
      }
      totalPrice {
        centAmount
        currencyCode
        fractionDigits
      }
    }
  }
`;

export { addToCartQuery, fetchLineItemQuery, removeLineItemQuery };
