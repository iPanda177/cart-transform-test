// @ts-check

/**
 * @typedef {import("../generated/api").InputQuery} InputQuery
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 */

/**
 * @type {FunctionResult}
 */
const NO_CHANGES = {
  operations: [],
};

export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
(input) => {
  const cartOperations = {
    operations: [],
  };
  const case2 = input.cart.lines.filter((line) => line.quantity >= 5 && line.merchandise.test_case_2.value === "true");

  if (case2.length > 1) {
    cartOperations.operations.push({
      merge: {
        cartLines: case2.map((line) => ({
          cartLineId: line.id,
          quantity: line.quantity,
        })),
        parentVariantId: "gid://shopify/ProductVariant/46991621292342",
        price: {
          percentageDecrease: {
            value: 50
          },
        }
      }
    });
  }

  if (cartOperations.operations.length > 0) {
    return cartOperations
  };

  const case1 = input.cart.lines.filter((line) => line.merchandise.test_case_1.value === "true");

  if (case1.length >= 1) {
    case1.forEach((line) => {
      cartOperations.operations.push({
        expand: {
          cartLineId: line.id,
          expandedCartItems: [{
            merchandiseId: "gid://shopify/ProductVariant/46991620342070",
            quantity: 1,
          }],
          price: {
            percentageDecrease: {
              value: 20,
            }
          }
        }
      });
    });
  }

  return cartOperations.operations.length > 0 ? cartOperations : NO_CHANGES;
};
