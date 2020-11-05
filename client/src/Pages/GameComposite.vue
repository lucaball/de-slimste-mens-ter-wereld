<template>
  <div>
    <nav id="header" class="w-full top-0 border-b-2 border-black py-4 px-2">
      Hello
    </nav>
    {{ game }}
  </div>
</template>

<script>
export default {
  name: "GameComposite",
  props: {
    game: {}
  }
}
</script>

<style scoped>

</style>