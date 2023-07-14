import { find } from "lodash";

/**
 * Function to convert Int Amount to Decimal
 *
 * @param {Object} - { centAmount, fractionDigits }
 * @returns - Price with Decimal
 */
const getPrice = ({ centAmount, fractionDigits }) => {
  const price = centAmount / Math.pow(10, fractionDigits);

  return price;
};

/**
 * Function to convert camelCase String to Normal String
 *
 * @param {String} camelCase
 * @example camelCase -> Camel Case
 * @returns {String} Normal Case
 */
const camelToFlat = (camel) => {
  const camelCase = camel.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
  let flat = "";
  camelCase.forEach((word) => {
    flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " ";
  });
  return flat;
};

/**
 * Returns Formated Product Attributes
 *
 * @param {Object} - { Attributes }
 * @returns - Foramted Attributes - {name : value}
 */
const formatAttributes = ({ attributes }) => {
  const formatedAttributes = attributes.map((attribute) => ({
    name: camelToFlat(attribute.name),
    value:
      attribute.value?.label?.en ||
      attribute.value?.label ||
      attribute.value?.en ||
      attribute.value?.key ||
      attribute.value,
  }));
  return formatedAttributes;
};

/**
 * To Destructure Data from the Data object received from the server
 *
 * @param {{data: Object}} - Raw data of Single Product Received from server
 * @returns {{name: String, image: String, currencyCode: String, price: Number, gender: String, style: String, availableColors: String}} destructured data
 * @example - {name: productName, image: imageUrl}
 */

const destructData = (data) => {
  const desructuredData = {};
  desructuredData.name = data.name.en;
  desructuredData.image = data.masterVariant.images[0].url;
  desructuredData.currencyCode =
    data.masterVariant.prices[0].value.currencyCode;
  desructuredData.sku = data.masterVariant.sku;
  const centAmount = data.masterVariant.prices[0].value.centAmount;
  const fractionDigits = data.masterVariant.prices[0].value.fractionDigits;

  // To get just gender of each item
  desructuredData.gender = find(data?.masterVariant.attributes, {
    name: "gender",
  })?.value.key;

  // To get just style of each item
  desructuredData.style = find(data?.masterVariant.attributes, {
    name: "style",
  })?.value.key;

  // To get Available colors of each product (incl. Variants)
  desructuredData.availableColors = data?.variants.map(
    (variant) => find(variant?.attributes, { name: "color" })?.value?.key
  );

  desructuredData.price = getPrice({ centAmount, fractionDigits });

  return desructuredData;
};

export { getPrice, formatAttributes, camelToFlat, destructData };
