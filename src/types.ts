import type { Readable } from "svelte/store";

export type InputContextProps = {
  name: string;
  rules: any;
};

export type HandleChangeProps = {
  name: string;
  value: any;
  form: any;
};
export type InputContext = (
  props: InputContextProps
) => Readable<{
  value: any;
  errors: Error[];
  handleChange: (value: any) => any;
  handleBlur: () => any;
}>;

export type WritableForm<Values> = {
  values: Values;
  disabled: boolean;
  errors: [];
  valuesBlurred: { [key: string]: boolean };
};

export type RuleFn = (
  value: string,
  values: { [key: string]: string }
) => string | boolean | undefined | null;

export type FormRules = { [key: string]: RuleFn[] };

export type Error = {
  name: string;
  message: string;
};
