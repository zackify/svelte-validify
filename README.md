# Svelte Validify

An attempt to bring [react-validify](https://github.com/zackify/validify) over to Svelte.

The goal with this library is to be the most flexible form library while also having the smallest API.

Todo: Test coverage

## Get started

- Install it
- Make a custom Input component
- The end

## Install

```
npm install svelte-validify
```

## Making an Input Component

Your input component must implement `handleChange` `handleBlur` `errors` and `value` to function properly.

Once you add these methods to your component, form validation will be taken care of for you. 

When a user has an invalid field, the error will not be shown until blurring the field, or someone submits the form.

After this happens, validation runs onChange for the best UX possible.

```svelte
<script type="ts">
  import { useField } from "svelte-validify";
  import type { RuleFn } from "svelte-validify";

  export let name: string;
  export let rules: RuleFn[] = [];

  let field = useField({ name, rules });
</script>

<div>
  {#if $field.errors.length}
    <div>{$field.errors[0]}</div>
  {/if}
  <input
    type="text"
    {name}
    value={$field.value}
    on:blur={$field.handleBlur}
    on:keyup={(e) => $field.handleChange(e.currentTarget.value)}
  />
</div>

```

## Using a Form

Import the Form component, and createForm method from the library.

Initialize the form with a few values if you'd like.

Render inputs, and set custom rules. You can see this in action by running the example folder :)
```svelte
<script lang="ts">
  import { Form, createForm } from "svelte-validify";
  import Input from "./Input.svelte";

  // Always create a form, and add some optional values
  let form = createForm({ name: "Bob", email: "test" });

  // Rules run at the correct times, on blur, or onChange after initial blur / submit
  // you don't have to think about it!
  let isRequired = (value) => (!value ? "Field is required" : "");
</script>

<Form {form} onSubmit={() => console.log($form.values)}>
  <Input name="name" rules={[ isRequired]} />
  <Input name="email" rules={[isRequired]} />
  <button type="submit" disabled={$form.disabled}>Hello!</button>
</Form>
```

