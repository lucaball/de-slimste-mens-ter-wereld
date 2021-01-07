<template>
  <div class="flex flex-col items-stretch h-screen">
    <nav id="header" class="flex w-full top-0 border-b-2 border-black py-4 px-2 items-center justify-between">
      <div>
        <h3 class="font-bold text-3xl">{{ game.name }}</h3>
        <small>Joincode: {{ game.joinCode }}</small>
      </div>
      <div class="mr-8">
        <button class="border-2 px-2 rounded" @click="startGame">Start game</button>
      </div>
    </nav>
    <div class="w-12/12 flex flex-col flex-grow">
      <div class="flex flew-col h-full">
        <div class="flex flex-col w-2/12 text-center border-r-2 border-black">
          <span class="flex items-center flex-1 self-center" v-for="round in game.rounds" :key="round.id">
            <inertia-link class="hover:underline" :href="'/game/' + game.id + '/rounds/' + round.id">
              <span class="py-2 hover:border-b">
                {{ round.name }}
              </span>
            </inertia-link>
          </span>
        </div>
        <div class="flex flex-row w-10/12">
          <slot></slot>
        </div>
      </div>
      <modal ref="startGameModal">
        <template v-slot:header>
          Start het spel, deel onderstaande joincode met de deelnemers.
        </template>
        <template v-slot:body class="flex flex-col">
          {{ game.joinCode }}
          <span class="my-2">
            Als quizmaster kun je de quiz beheren via deze URL.
            Je opent die best op een apart scherm of tablet.
          </span>
          <span class="my-2">
            https://localhost:3000/play
          </span>
          <span class="my-2">
            Op het speelscherm zie je hetzelfde als als de medespelers
          </span>
          <InertiaLink
              class="border-2 w-full p-2 rounded"
              :href="'/play?j=' + game.joinCode + '&a=1'"
          >
            Naar speelscherm
          </InertiaLink>
        </template>
      </modal>
    </div>
  </div>
</template>

<script>
import Modal from "../components/Modal";

export default {
  name: "GameComposite",
  components: {Modal},
  methods: {
    startGame() {
      this.$refs.startGameModal.open();
    }
  },
  props: {
    game: {}
  }
}
</script>

<style scoped>

</style>
