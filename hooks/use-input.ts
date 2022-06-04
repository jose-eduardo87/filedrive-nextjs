import { useReducer, useCallback, ChangeEvent } from "react";

enum ActionKind {
  Input = "INPUT",
  Blur = "BLUR",
  Reset = "RESET",
}

type State = {
  value: string;
  isTouched: boolean;
};

type Action = {
  type: ActionKind;
  value?: string;
};

const inputReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionKind.Input:
      return { value: action.value as string, isTouched: state.isTouched };
    case ActionKind.Blur:
      return { value: state.value, isTouched: true };
    case ActionKind.Reset:
      return { value: "", isTouched: false };

    default:
      throw new Error();
  }
};

const useInput = (validateField: (arg: string) => boolean, inputValue = "") => {
  const initialValue = { value: inputValue, isTouched: false };
  const [input, dispatch] = useReducer(inputReducer, initialValue);

  const isValid = validateField(input.value);
  const hasError = !isValid && input.isTouched;

  const onBlurChangeHandler = useCallback(
    () => dispatch({ type: ActionKind.Blur }),
    []
  );
  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: ActionKind.Input, value: event.target.value }),
    []
  );
  const reset = () => dispatch({ type: ActionKind.Reset });

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
