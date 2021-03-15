<script lang="ts">
  import { Form, createForm } from "svelte-validify";
  import Input from "./Input.svelte";

  //Always create a form, and add some optional values
  let form = createForm({ name: "Bob", email: "test" });

  //Dummy rules
  let cannotBeBad = (value) => (value === "bad" ? "Cannot use bad words" : "");
  let isRequired = (value) => (!value ? "Field is required" : "");
</script>

<Form {form} onSubmit={() => console.log($form.values)}>
  <Input name="name" rules={[cannotBeBad, isRequired]} />
  <Input name="email" rules={[isRequired]} />
  <button type="submit" disabled={$form.disabled}>Hello!</button>
</Form>
