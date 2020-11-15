<template>
  <div>
    <button v-if="!confirm" @click="confirm = true;" class="pr-2 pb-2 text-gray-500 hover:text-black">
      <TrashIcon :size=20></TrashIcon>
    </button>
    <div class="inline-flex" v-if="confirm" @click="$emit('confirm', true)">
      <span class="mr-2">
        Zeker?
      </span>
      <button class="text-green-500 pr-2 pb-2 hover:text-green-900 rounded-l">
        <ConfirmIcon></ConfirmIcon>
      </button>
      <button @click="confirm = false;" class="pr-2 pb-2 text-red-500 hover:text-red-900 rounded-r">
        <UndoIcon :size="20"></UndoIcon>
      </button>
    </div>
  </div>

</template>

<script>
import TrashIcon from "../../Icons/TrashIcon";
import ConfirmIcon from "../../Icons/ConfirmIcon";
import UndoIcon from "../../Icons/UndoIcon";
export default {
name: "DeleteButton",
  data(){
   return {
      confirm : false
   }
  },
  components: {UndoIcon, ConfirmIcon, TrashIcon}
}
</script>

<style scoped>

</style>
