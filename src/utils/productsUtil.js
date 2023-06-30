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

const camelToFlat = (camel) => {
  const camelCase = camel.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
  let flat = "";
  camelCase.forEach((word) => {
    flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " ";
  });
  return flat;
};

/**
 * Function to Product Attributes
 *
 * @param {Object} - { Attributes }
 * @returns - Foramted Attributes
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

export { getPrice, formatAttributes, camelToFlat };
