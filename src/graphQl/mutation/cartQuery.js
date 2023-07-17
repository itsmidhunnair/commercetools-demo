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
      taxedPrice {
        totalNet {
          centAmount
          currencyCode
          fractionDigits
        }
        totalTax {
          centAmount
          currencyCode
          fractionDigits
        }
        totalGross {
          centAmount
          currencyCode
          fractionDigits
        }
      }
      shippingAddress {
        building
        city
        country
        email
        firstName
        lastName
        mobile
        postalCode
        salutation
        state
        streetName
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
    addShippingAddr(input: $input) {
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
      taxedPrice {
        totalNet {
          centAmount
          currencyCode
          fractionDigits
        }
        totalTax {
          centAmount
          currencyCode
          fractionDigits
        }
        totalGross {
          centAmount
          currencyCode
          fractionDigits
        }
      }
      shippingAddress {
        building
        city
        country
        email
        firstName
        lastName
        mobile
        postalCode
        salutation
        state
        streetName
      }
      billingAddress {
        building
        city
        country
        email
        firstName
        lastName
        mobile
        postalCode
        salutation
        state
        streetName
      }
    }
  }
`;

const addBillingAddressQuery = gql`
  mutation addBillingAddr($input: Address) {
    addBillingAddr(input: $input) {
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
      taxedPrice {
        totalNet {
          centAmount
          currencyCode
          fractionDigits
        }
        totalTax {
          centAmount
          currencyCode
          fractionDigits
        }
        totalGross {
          centAmount
          currencyCode
          fractionDigits
        }
      }
      shippingAddress {
        building
        city
        country
        email
        firstName
        lastName
        mobile
        postalCode
        salutation
        state
        streetName
      }
      billingAddress {
        building
        city
        country
        email
        firstName
        lastName
        mobile
        postalCode
        salutation
        state
        streetName
      }
    }
  }
`;

const addShippingMethodQuery = gql`
  mutation AddShippingMeth($input: ShippingMethod) {
    addShippingMeth(input: $input) {
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
      taxedPrice {
        totalNet {
          centAmount
          currencyCode
          fractionDigits
        }
        totalTax {
          centAmount
          currencyCode
          fractionDigits
        }
        totalGross {
          centAmount
          currencyCode
          fractionDigits
        }
      }
      shippingAddress {
        building
        city
        country
        email
        firstName
        lastName
        mobile
        postalCode
        salutation
        state
        streetName
      }
      shippingInfo
    }
  }
`;

const placeOrderQuery = gql`
  mutation PlaceOrder($input: CartInfo) {
    placeOrder(input: $input)
  }
`;

export {
  addToCartQuery,
  fetchLineItemQuery,
  removeLineItemQuery,
  updateLineItemQtyQuery,
  addShippingAddressQuery,
  addShippingMethodQuery,
  addBillingAddressQuery,
  placeOrderQuery,
};
