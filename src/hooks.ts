import { getContext } from "svelte";
import { writable } from "svelte/store";
import type { InputContextProps, InputContext } from "./types";
import type { WritableForm } from "./types";

export const useField = ({ name, rules }: InputContextProps) => {
  return getContext<InputContext>("input")({ name, rules });
};

export const createForm = <Values = any>(values: Values) => {
  return writable<WritableForm<Values>>({
    values,
    errors: [],
    disabled: false,
    valuesBlurred: {},
  });
};
