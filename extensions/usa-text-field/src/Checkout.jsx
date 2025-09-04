import {
  reactExtension,
  Banner,
  BlockStack,
  TextField,
  Text,
  useApi,
  useApplyAttributeChange,
  useBuyerJourneyIntercept,
  useShippingAddress,
  useTranslate,
} from "@shopify/ui-extensions-react/checkout";
import { useState, useEffect, useRef } from "react";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const { settings } = useApi();
  const { countryCode } = useShippingAddress();
  const translate = useTranslate();
  const applyAttributeChange = useApplyAttributeChange();

  const isUSA = countryCode?.toLowerCase() === "us";
  const requiredField = settings.current.required_field;
  const activeField = settings.current.active_field;

  const [usaField, setUsaField] = useState("");
  const [usaFieldError, setUsaFieldError] = useState("");
  const prevValue = useRef("");

  // Buyer Journey Intercept
  useBuyerJourneyIntercept(({ canBlockProgress }) => {
    if (canBlockProgress && activeField && isUSA) {
      if (requiredField && !isUsaFieldSet()) {
        return {
          behavior: "block",
          reason: "Missing required field",
          perform: (result) => {
            if (result.behavior === "block") {
              if (!isUsaFieldSet()) {
                setUsaFieldError(translate("fieldError"));
              }
            }
          },
        };
      }
    }
    return { behavior: "allow" };
  });

  // Attribute syncing
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (usaField && usaField !== prevValue.current) {
        applyAttributeChange({
          type: "updateAttribute",
          key: "ssn_ein",
          value: usaField,
        });
        prevValue.current = usaField;
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [usaField]);

  function isUsaFieldSet() {
    return usaField.trim() !== "";
  }

  if (!activeField || !isUSA) {
    return null;
  }

  // UI
  return (
      <TextField
        label={translate("fieldPlaceholder")}
        value={usaField}
        onChange={(value) => {
          setUsaField(value);
          if (usaFieldError) setUsaFieldError("");
        }}
        error={usaFieldError}
        required={Boolean(requiredField)}
      />
  );
}
