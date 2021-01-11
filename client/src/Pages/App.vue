<template>
  <div class="flex flex-col items-center h-screen md:flex-row">
    <div class="container mx-auto">
      <div class="flex justify-center px-2 py-6 ">
        <div
            class="flex bg-gradient-to-bl from-start to-end text-white p-6 w-full rounded-lg xl:w-3/4 lg:w-11/12 lg:shadow-xl ">
          <div class="relative hidden w-full h-auto bg-cover border-r rounded-l-lg bg-blue-1300 lg:block lg:w-6/12 p-4">
            <div class="">
              <button @click="openQuizCreateModal($event, $el)"
                      class="bg-none border-2 border-black text-black hover:bg-black hover:text-white text-center font-bold py-4 mt-2 w-full rounded-full"
              >Quiz samenstellen
              </button>
            </div>
          </div>
          <div class="relative hidden w-full h-auto bg-cover rounded-l-lg bg-blue-1300 lg:block lg:w-6/12 p-4">
            <button @click="openQuizJoinModal($event, $el)"
                    class="bg-none border-2 border-black text-black hover:bg-black hover:text-white text-center font-bold py-4 mt-2 w-full rounded-full">
              Deelnemen aan een quiz
            </button>
          </div>
        </div>
      </div>
      <button @click="openQuizJoinModal($event, $el)"
              class="bg-none border-2 border-black text-black hover:bg-black hover:text-white text-center font-bold py-4 mt-2 w-full rounded-full">
        Deelnemen aan een quiz
      </button>
    </div>
    <modal ref="quizCreateModal" @close="clearInputs()">
      <template v-slot:header>
        <label for="game-name">
          <span class="text-3xl font-bold">Hoe noem je je quiz?</span>
        </label>
      </template>
      <template v-slot:body>
        <form @submit="createGame($event)">
          <input ref="gameName" v-model="gameName" autofocus="autofocus" type="text" id="game-name"
                 class="px-4 py-2 border-2 border-black rounded w-full">
          <button type="submit"
                  class="mt-3 w-full bg-black font-bold text-white text-center rounded py-2 text-uppercase">
            GO!
          </button>
        </form>
      </template>
    </modal>
    <modal ref="quizJoinModal">
      <template v-slot:header>
        <label for="join-code" class="flex flex-col">
          <span class="text-3xl font-bold">Join code: </span>
          <span class="leading-relaxed">Deze code moet je krijgen van de quizmaster en is uniek voor iedere quiz.</span>
        </label>
      </template>
      <template v-slot:body>
        <form @submit="joinGame($event)">
          <input ref="joinCode" v-model="joinCode" autofocus="autofocus" type="text" id="join-code"
                 class="px-4 py-2 border-2 border-black rounded w-full">
          <button type="submit"
                  class="mt-3 w-full bg-black font-bold text-white text-center rounded py-2 text-uppercase">
            Let's play!
          </button>
        </form>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "../components/Modal";
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      joinCode: "",
      gameName: ""
    }
  },
  methods: {
    clearInputs() {
      this.gameName = "";
    },
    openQuizJoinModal(e, el){
      el.blur();
      this.$refs.quizJoinModal.open();
      this.$nextTick(() => {
        this.$refs.joinCode.focus();
      })
    },
    openQuizCreateModal(e, el) {
      el.blur();

      this.$refs.quizCreateModal.open()

      this.$nextTick(() => {
        this.$refs.gameName.focus();
      });
    },
    createGame(e) {
      e.preventDefault();
      axios
          .post('/create-game', {
            name: this.gameName
          })
          .then((response) => {

            this.gameName = "";
            this.$refs.quizCreateModal.close()

            this.$inertia.visit(response.data.composeuri);
          });
    },
    joinGame(e){

      e.preventDefault();
      this.$inertia.post('/play', {
        joinCode: this.joinCode
      })

    }
  },
  components: {
    Modal,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
