<template>
  <div class="popup-background" @click="$emit('closed')">
    <div class="popup-close" @click="$emit('closed')">
      <SvgIcon type="mdi" :path="closeIcon" :size="32"/>
    </div>
  </div>
  <div class="popup-content">
    <slot></slot>
  </div>
</template>

<script>

  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiClose } from '@mdi/js'

  export default {
    name: "Popup",
    emits: ["closed"],
    components: {
      SvgIcon,
    },
    data () {
      return {
        closeIcon: mdiClose,
      }
    },
  }

</script>

<style scoped>

  .popup-background {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, .5);
  }
  .popup-background .popup-close {
    cursor: pointer;
    color: white;
    position: absolute;
    top: 0;
    right: 0;
    margin: 30px;
  }

  .popup-content {
    position: fixed;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 8px;
    border: 1px solid lightgray;
  }

</style>