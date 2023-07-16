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
      anonymousId
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
      anonymousId
    }
  }
`;

const removeLineItemQuery = gql`
  mutation deleteFromCart($input: EditLineItem) {
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
      anonymousId
    }
  }
`;

const updateLineItemQtyQuery = gql`
  mutation updateItemQty($input: EditLineItem) {
    updateItemQty(input: $input) {
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
      anonymousId
    }
  }
`;

const addShippingAddressQuery = gql`
  mutation AddShippingAddr($input: Address) {
    addShippingAddr(input: $input)
  }
`;

export {
  addToCartQuery,
  fetchLineItemQuery,
  removeLineItemQuery,
  updateLineItemQtyQuery,
  addShippingAddressQuery,
};
