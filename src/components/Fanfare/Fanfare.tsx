import confetti from 'canvas-confetti';
import sndPop from '../../assets/pop.mp3';
import sndYahaha from '../../assets/yahaha.mp3';
import { debounce } from '@material-ui/core';

const playPop = new Audio(sndPop);
const playYahaha = new Audio(sndYahaha);
playPop.volume = 0.69;

export const playFanfare = debounce(() => {
  playPop.play();
  confetti({
    particleCount: 120,
    spread: 69,
    origin: { y: 0.6 },
  });
  setTimeout(() => playYahaha.play(), 900);
});

