import { FC } from "react";
import { useRouter } from "next/router";
import Select, { StylesConfig } from "react-select";

interface DropdownInterface {
  defaultValue:
    | Partial<{
        value: string;
        label: string;
        disabled: boolean;
      }>
    | undefined;
  onChange: () => Promise<void>;
}

export interface Options {
  value: string;
  label: string;
  disabled: boolean;
}

const customStyles: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "gray" : "black",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

const Dropdown: FC<DropdownInterface> = ({ defaultValue, onChange }) => {
  const { locale } = useRouter();
  const isEnglish = locale === "en";
  const LANGUAGE_OPTIONS: Options[] = [
    {
      value: "en",
      label: isEnglish ? "English" : "Inglês",
      disabled: isEnglish ? true : false,
    },
    {
      value: "pt-BR",
      label: isEnglish ? "Portuguese" : "Português",
      disabled: !isEnglish ? true : false,
    },
  ];

  return (
    <Select
      styles={customStyles}
      defaultValue={defaultValue}
      isSearchable={false}
      isOptionDisabled={(option) => option.disabled!}
      onChange={onChange}
      options={LANGUAGE_OPTIONS}
    />
  );
};

export default Dropdown;
