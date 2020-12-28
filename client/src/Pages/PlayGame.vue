<template>
  <div class="flex flex-row h-screen flex-grow">
    <div class="w-3/5 bg-red-200 flex flex-col items-center">
      <div class="h-3/5 text-3xl flex items-center">
        {{ activeQuestion.value }}
      </div>
      <div class="h-2/5 flex w-full flex-wrap items-center text-center">
        <div class="answer text-2xl" :key="answer.id" v-for="answer in activeQuestion.answers">
          <span v-if="answer.value.length > 0">{{answer.value}}</span>
          <span v-else class="blur">{{ answer.scrambled }}</span>
        </div>
      </div>
    </div>
    <div data-v-dc5e39be="" class="flex flex-col flex-grow space-x-2 items-center flex-grow">
      <div class="w-3/5 flex-grow p-6"
           :key="gamePlayer.id"
           v-for="gamePlayer in game.gamePlayers">
        <div
            class="h-full w-full rounded bg-gray-400 flex justify-center items-center"
            :class="{ 'border-4 border-gradient-tr-main-gradient' : (activePlayer.id === gamePlayer.id ) }">
          <span class="text-6xl ">{{ gamePlayer.seconds }}</span>
        </div>
      </div>
      <div data-v-dc5e39be="" class="w-3/5 flex-grow p-6">
        <div data-v-dc5e39be="" class="h-full w-full rounded bg-gray-400 flex justify-center items-center"><span
            data-v-dc5e39be="" class="text-6xl ">60</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import {timer} from "rxjs";
import {tap} from "rxjs/operators";

export default {
  name: "PlayGame",
  data() {
    return {
      activeQuestion: "",
      activePlayer : {}
    }
  },
  mounted() {
    this.subscribeToRoom();
    this.initTicker();

    this.sockets.subscribe('setQuestion', function (data) {
      this.activeQuestion = data;
    });

    this.sockets.subscribe('showAnswer', function(data){

      const answerToShow = this.activeQuestion.answers.find((answer)=> {
        return answer.id === data.id;
      });

      answerToShow.value = data.value;
    })

    this.sockets.subscribe('activateUser', function(activePlayer){
      this.activePlayer = this.game.gamePlayers.find((gamePlayer) => gamePlayer.id === activePlayer.player.id)
    })

    const self = this;
    this.sockets.subscribe('startTicking', () => self.startTicking())
    this.sockets.subscribe('stopTicking', () => self.stopTicking());
  },

  methods: {
    subscribeToRoom() {
      const self = this;
      this.$socket.on('connect', function () {
        self.$socket.emit('room', self.game.id);
      });
    },
    initTicker() {
      this.ticker = timer(1000, 1000).pipe(tap());
    },
    startTicking() {

      const tickTick = this.ticker.subscribe(() => {
        this.activePlayer.seconds -= 1;
      })

      this.ticker = tickTick;
    },
    async stopTicking() {
      await this.ticker.unsubscribe();
      this.initTicker();
    },
    modifySeconds(seconds) {

      if (this.activePlayer === null) {
        return;
      }

      this.activePlayer.seconds += seconds;
    }
  },
  props: {
    game: {}
  }
}
</script>

<style scoped>
  .answer{
    flex: 1 0 33.33%;
    max-width: 50%;
  }

  .blur {
    color: transparent;
    text-shadow: 0 0 10px rgba(0,0,0,0.5);
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  }
</style>
