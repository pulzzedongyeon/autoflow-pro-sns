<template>
  <Popup @closed="$emit('closed')">
    <div class="option-popup">
      <div
        v-for="option in options"
        v-bind:key="option.action"
        class="option"
        :class="option.color"
        @click="$emit(option.action)"
        >
        {{ option.title }}
      </div>
    </div>
  </Popup>
</template>

<script>
  
  import Popup from '@/components/Popup.vue'

  export default {
    name: "OptionPopup",
    emits: ["modifyClicked", "deleteClicked"],
    props: {
      options: {
        type: Array,
        required: true
      }
    },
    components: {
      Popup,
    },
  }

</script>

<style scoped>

  .option-popup {
    width: 300px;
  }
  .option {
    cursor: pointer;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
    padding: 15px 0;
    color: gray;
  }
  .option:hover {
    color: darkslategray;
  }
  .option:first-child {
    border-bottom: 1px solid lightgray;
  }

  .option.blue {
    color: slateblue;
  }
  .option.blue:hover {
    color: darkblue;
  }
  .option.red {
    color: red;
  }
  .option.red:hover {
    color: darkred;
  }

</style>