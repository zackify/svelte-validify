<script type="ts">
  import set from "lodash/set";
  import { setContext } from "svelte";
  import { validate } from "./validate";
  import { derived } from "svelte/store";
  import type { Writable } from "svelte/store";
  import type { HandleChangeProps, InputContext } from "./types";
  export let form: Writable<any>;
  export let onSubmit: () => any;
  let rules = {};

  const handleBlur = (name: string) => {
    form.update((self) => ({
      ...self,
      valuesBlurred: { ...self.valuesBlurred, [name]: true },
    }));
    validate({
      form,
      rules,
      values: $form.values,
      valuesBlurred: $form.valuesBlurred,
    });
  };

  const handleChange = ({ name, value }: HandleChangeProps) => {
    form.update((self) => {
      set(self.values, name, value);
      return { ...self };
    });
    validate({
      form,
      rules,
      values: $form.values,
      valuesBlurred: $form.valuesBlurred,
    });
  };

  const handleSubmit = () => {
    validate({
      form,
      values: $form.values,
      rules,
    });
    if (!$form.errors.length) return onSubmit();

    // if there are errors, mark all values as blurred,
    // so validation runs on change after hitting submit
    form.update((self) => ({
      ...self,
      valuesBlurred: Object.keys(rules).reduce(
        (acc, name) => ({ ...acc, [name]: true }),
        {}
      ),
    }));
  };

  setContext<InputContext>("input", ({ name, rules: fieldRules }) => {
    rules[name] = fieldRules;
    return derived(form, ($form) => ({
      value: $form.values[name],
      errors: $form.errors
        .filter((error) => error.name === name)
        .map((error) => error.message),
      handleChange: (value) => handleChange({ name, value, form }),
      handleBlur: () => handleBlur(name),
    }));
  });
</script>

<form on:submit|preventDefault={handleSubmit}>
  <slot />
</form>
