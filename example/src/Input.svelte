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
