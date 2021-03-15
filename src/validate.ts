import get from "lodash/get";
import type { Writable } from "svelte/store";
import type { Error, FormRules } from "./types";

type Props = {
  form: Writable<any>;
  values: any;
  rules: FormRules;
  valuesBlurred?: { [key: string]: boolean };
};

export const validate = ({ form, values, rules, valuesBlurred }: Props) => {
  let newErrors = Object.keys(rules)
    .filter((field) => {
      if (valuesBlurred) return valuesBlurred[field];
      return true;
    })
    .map((field) =>
      rules[field].map((rule) => {
        let error = rule(get(values, field) || "", values);
        if (!error) return false;

        return {
          name: field,
          message: error,
        };
      })
    )
    .reduce((acc, row) => [...acc, ...row], [])
    .filter(Boolean) as Error[];
  form.update((self) => ({
    ...self,
    errors: newErrors,
    disabled: newErrors.length,
  }));
};
