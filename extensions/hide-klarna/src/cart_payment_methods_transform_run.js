// @ts-check

// Use JSDoc annotations for type safety
/**
 * @typedef {import("../generated/api").CartPaymentMethodsTransformRunInput} CartPaymentMethodsTransformRunInput
 * @typedef {import("../generated/api").CartPaymentMethodsTransformRunResult} CartPaymentMethodsTransformRunResult
 */

/**
 * @type {CartPaymentMethodsTransformRunResult}
 */
const NO_CHANGES = {
  operations: [],
};

// The configured entrypoint for the 'cart.payment-methods.transform.run' extension target
/**
 * @param {CartPaymentMethodsTransformRunInput} input
 * @returns {CartPaymentMethodsTransformRunResult}
 */
export function cartPaymentMethodsTransformRun(input) {

  
  const hidePaymentMethod = input.paymentMethods
    .find(method => method.name.includes("Klarna"));

  if (!hidePaymentMethod) {
    return NO_CHANGES;
  }

  return {
    operations: [{
      paymentMethodHide: {
        paymentMethodId: hidePaymentMethod.id
      }
    }]
  };
};