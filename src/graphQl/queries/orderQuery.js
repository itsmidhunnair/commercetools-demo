import { gql } from "@apollo/client";

/**
 * GQL Query to fetch all orders
 */
const fetchAllOrdersQuery = gql`
  query Query {
    fetchOrders {
      customerEmail
      customerId
      id
      orderNumber
      orderState
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
      shippingInfo
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
      taxedShippingPrice {
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
      totalPrice {
        currencyCode
        centAmount
        fractionDigits
      }
      version
    }
  }
`;

export { fetchAllOrdersQuery };
