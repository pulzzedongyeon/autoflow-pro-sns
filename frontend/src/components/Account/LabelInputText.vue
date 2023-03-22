<template>
  <div class="form-label-group">
    <input
      :type="type"
      :name="label"
      :id="label"
      required
      class="form-control"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label :for="label">{{ label }}</label>
  </div>
</template>

<script>

  export default {
    name: 'LabelInputText',
    props: {
      modelValue: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'text'
      }
    },
  }

</script>

<style scoped>

  .form-label-group {
    position: relative;
  }
  label {
    position: absolute;
    top: 0;
    left: 10px;
    color: rgb(142, 142, 142);
    font-size: 12px;
    line-height: 40px;
    margin: 0;
    padding: 0;
    pointer-events: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transform-origin: left;
    transition: transform ease-out .1s;
  }
  input {
    background: rgb(250, 250, 250);
    padding: 8px 0 8px 10px;
    color: rgb(38, 38, 38);
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    height: 40px;
    margin-bottom: 1rem;
  }

  input:valid {
    padding-top: 16px;
  }
  input:valid ~ label {
    transform: scale(calc(10 / 12)) translateY(-10px);
  }

</style>