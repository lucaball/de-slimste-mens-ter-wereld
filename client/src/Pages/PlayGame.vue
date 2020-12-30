<template>
  <div class="flex md:flex-col lg:flex-row lg:h-screen lg:flex-grow text-shadow-sm">
    <div class="w-4/5 bg-gradient-to-bl from-start to-end flex flex-col items-center">
      <div class="h-3/5 text-3xl w-full flex items-center justify-center text-center p-4">
        <span class="text-white" v-if="activeQuestion.type === 'text'"> {{ activeQuestion.value }}</span>
        <img class="max-h-full" v-if="activeQuestion.type === 'image'" :src="activeQuestion.value" alt=""/>
        <video class="max-h-full" :src="activeQuestion.value" ref="video" autoplay
               v-if="activeQuestion.type === 'video'"/>
      </div>
      <div class="h-2/5 flex w-full flex-wrap items-center text-center">
        <div class="answer text-2xl" :key="answer.id" v-for="answer in activeQuestion.answers">
          <span class="text-white" v-if="answer.value.length > 0">{{ answer.value }}</span>
          <span v-else class="blur">{{ answer.scrambled }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col flex-grow">
<!--      <div class="flex-1" :key="gamePlayer.id" v-for="(gamePlayer, index) in game.gamePlayers">-->
<!--        <div class="h-full w-full relative"-->
<!--            :class="{ 'border-4 border-gradient-tr-main-gradient' : (activePlayer.id === gamePlayer.id ) }">-->
<!--          <span class="text-white text-center bg-gradient-to-bl from-start to-end player-seconds">{{ gamePlayer.seconds }}</span>-->
<!--          <video autoplay muted class="h-full w-full object-cover absolute" ref="player_video" autoPlay></video>-->
<!--        </div>-->
<!--      </div>-->
      <div class="flex-1" v-for="peer in peers">
        <div class="h-full w-full relative">
          <PlayerVideo :peer="peer"></PlayerVideo>
        </div>
      </div>
      <div class="flex-1">
        <div class="h-full w-full rounded bg-gray-400 flex justify-center items-center relative">
          <video muted autoplay class="h-full w-full object-cover absolute" id="local-video" ref="adminVideo"></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {timer} from "rxjs";
import {tap} from "rxjs/operators";
import Peer from "simple-peer";
import PlayerVideo from "../components/PlayGame/PlayerVideo";

export default {
  name: "PlayGame",
  components: {PlayerVideo},
  data() {
    return {
      activeQuestion: "",
      activePlayer: {},
      peers : [],
      activeIndex: 0
    }
  },
  watch: {
    activeQuestion: function (question) {
      if (question.type === "video") {
        this.$refs.video.play();
      }
    }
  },
  mounted() {

    this.subscribeToRoom();
    this.initTicker();

    this.currentPlayer = this.game.gamePlayers[0]

    navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then((stream) => {

          this.$refs.adminVideo.srcObject = stream;
          this.$socket.emit('join-room', this.game.id);

          this.sockets.subscribe('all-joined-players', players => {
            players.forEach((player) => {
              const peer = this.createPeer(player, this.sockets.id, stream);
              this.peers.push({peerID: player, peer});
            })
          });

          this.sockets.subscribe('user-joined', (data) => {
            const peer = this.addPeer(data.signal, data.callerID, stream);
            this.peers.push({ peerID: data.callerID, peer});
          });

          this.sockets.subscribe('receiving-returned-signal', (payload) => {
            const item = this.peers.find(p => p.peerID === payload.id);
            console.log(item);
            item.peer.signal(payload.signal);
          });


        })
        .catch(error => { console.log(error); })
    ;

    this.sockets.subscribe('setQuestion', function (data) {
      this.activeQuestion = data;
    });
    this.sockets.subscribe('showAnswer', function (data) {

      const answerToShow = this.activeQuestion.answers.find((answer) => {
        return answer.id === data.id;
      });

      answerToShow.value = data.value;
    });
    this.sockets.subscribe('addSeconds', function (data) {
      this.activePlayer.seconds += data.seconds;
    });
    this.sockets.subscribe('activateUser', function (activePlayer) {
      this.activePlayer = this.game.gamePlayers.find((gamePlayer) => gamePlayer.id === activePlayer.player.id)
    })
    this.sockets.subscribe('startTicking', () => this.startTicking())
    this.sockets.subscribe('stopTicking', () => this.stopTicking());
    this.sockets.subscribe('stopTicking', () => this.stopTicking());
  },

  methods: {
    subscribeToRoom() {
      this.$socket.on('connect', () => {
        this.$socket.emit('room', this.game.id);
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
    },
    createPeer(userToSignal, callerID, stream){

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on('signal', (signal) => this.$socket.emit('sending-signal', { userToSignal, callerID, signal}));

      return peer;
    },
    addPeer(incomingSignal, callerID, stream) {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      })

      peer.on("signal", signal => {
        this.$socket.emit("returning-signal", {signal, callerID})
      })

      peer.signal(incomingSignal);

      return peer;
    }
  },
  props: {
    game: {}
  }
}
</script>

<style scoped>

.player-seconds{
  z-index:10;
  min-width: 85px;
  border-radius: 50%;
  position: absolute;
  left: 10px;
  bottom: 10px ;
  font-size: 1.5rem;
}
* {
  text-shadow: 0 0 10px rgba(9, 9, 9, 0.5);
}

.answer {
  flex: 1 0 33.33%;
  max-width: 100%;
}

.blur {
  color: transparent !important;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                                   supported by Chrome, Edge, Opera and Firefox */
}
</style>
