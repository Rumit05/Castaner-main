export async function getCheckoutProfileId(graphql) {
    const response = await graphql(
      `
        query checkoutProfiles {
            checkoutProfiles(first: 10) {
            edges {
                node {
                id
                name
                isPublished
                }
            }
            }
        }
      
      `
    );
    return response.json();
}
  
export async function setStyling(graphql, id) {
    const response = await graphql(
        `mutation ChangeColorScheme1($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
            checkoutBrandingUpsert(checkoutBrandingInput: $checkoutBrandingInput, checkoutProfileId: $checkoutProfileId) {
              checkoutBranding {
               designSystem {
                colors {
                  schemes {
                    scheme1 {
                      primaryButton {
                        background
                        hover {
                            background
                        }
                      }
                    }
                    scheme2 {
                      base {
                        border
                      }
                      primaryButton {
                        background
                      }
                    }
                  }
                }
               }
              }
              userErrors {
                field
                message
              }
            }
          }
          `,{
            variables: {
                "checkoutProfileId": id,
                "checkoutBrandingInput": {
                  "designSystem": {
                    "colors": {
                      "schemes": {
                        "scheme1": {
                          "primaryButton": {
                            "background": "#222222",
                            "hover": {
                                "background": "#090909"
                            }
                          }
                        },
                        "scheme2": {
                          "base": {
                            "border": "#DADADA"
                          },
                          "primaryButton": {
                            "background": "#000000"
                          }
                        }
                      }
                    }
                  }
                }
              }
          }
    )
    return response.json();
}


export async function setFocusBorderColor(graphql, id) {
  const response = await graphql(
      `mutation ChangeGlobalColors($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
        checkoutBrandingUpsert(checkoutBrandingInput: $checkoutBrandingInput, checkoutProfileId: $checkoutProfileId) {
          checkoutBranding {
           designSystem {
            colors {
              global {
                accent
                decorative
              }
            }
           }
          }
          userErrors {
            field
            message
          }
        }
      }
      `,{
        variables: {
          "checkoutProfileId": id,
          "checkoutBrandingInput": {
            "designSystem": {
              "colors": {
                "global": {
                  "accent": "#9b9b9b",
                  "decorative": "#E32C2B" 
                }
              }
            }
          }
        }  
      }
  )
  return response.json();
}

export async function changeOrderSummaryScheme(graphql, id) {
  const response = await graphql(
    `mutation ChangeOrderSummaryScheme($checkoutBrandingInput: CheckoutBrandingInput!, $checkoutProfileId: ID!) {
      checkoutBrandingUpsert(checkoutBrandingInput: $checkoutBrandingInput, checkoutProfileId: $checkoutProfileId) {
        checkoutBranding {
          customizations {
            primaryButton {
              inlinePadding
              blockPadding
            }
            headingLevel1{
              typography{
                weight
                size 
              }
            }
            orderSummary {
              colorScheme
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
    `,{
      variables: {
        "checkoutProfileId": id,
        "checkoutBrandingInput": {
          "customizations": {
            "primaryButton": {
              "inlinePadding": "BASE",
              "blockPadding": "BASE"
            },
            "headingLevel1": {
              "typography": {
                "weight": "BASE",
                "size" : "LARGE"
              }
            },
            "orderSummary": {
              "colorScheme": "COLOR_SCHEME2"
            }
          }
        }
      } 
    }
  );
  return response.json();
}

export async function getfunctionid(graphql) {
  const response = await graphql(
    `
    query {
      shopifyFunctions(first: 50) {
        nodes {
          app {
            title
          }
          apiType
          title
          id
        }
      }
    }
    `
  );
  return response.json();
}

export async function CrateDiscoutCode(graphql) {
  const response = await graphql(
    `
    mutation {
      discountAutomaticAppCreate(automaticAppDiscount: {
        title: "descuento de membresía",
        functionId: "16a3bd6d-956e-4668-b316-f301e724dd4a",
        startsAt: "2024-01-09T12:00:00Z"
      }) {
         automaticAppDiscount {
          discountId
         }
         userErrors {
          field
          message
         }
      }
    }
    
    `
  );
  return response.json();
}

export async function hideMethod(graphql) {
  const response = await graphql(`
    mutation {
      paymentCustomizationCreate(paymentCustomization: {
        title: "Hide payment method Klarna",
        enabled: true,
        functionId: "019a52b5-ec5a-7093-82f8-22cca49d5256"
      }) {
        paymentCustomization {
          id
        }
        userErrors {
          message
        }
      }
    }
  `);

  return response.json();
}

