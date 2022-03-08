import { useReducer, useCallback } from "react";

const initialValue = { value: "", isTouched: false };

const inputReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return { value: action.value, isTouched: state.isTouched };
    case "BLUR":
      return { isTouched: true, value: state.value };
    case "RESET":
      return { value: "", isTouched: false };

    default:
      throw new Error();
  }
};

const useInput = (validateField) => {
  const [input, dispatch] = useReducer(inputReducer, initialValue);

  const isValid = validateField(input.value);
  const hasError = !isValid && input.isTouched;

  const onBlurChangeHandler = useCallback(() => dispatch({ type: "BLUR" }), []);
  const onChangeHandler = useCallback(
    (event) => dispatch({ type: "INPUT", value: event.target.value }),
    []
  );
  const reset = () => dispatch({ type: "RESET" });

  return {
    value: input.value,
    onBlur: onBlurChangeHandler,
    onChange: onChangeHandler,
    reset,
    isValid,
    hasError,
  };
};

export default useInput;
