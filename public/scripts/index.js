function makeNoize(link, volume = 0.25) {
  const popSound = new Audio(link);
  popSound.volume = volume;
  popSound.play();
}

const buttons = document.querySelectorAll('.main-button, .card-button, a');
buttons.forEach((el) => {
  el.addEventListener('mouseenter', () => {
    makeNoize('/media/over.wav', 0.15);
  });
  el.addEventListener('click', () => {
    makeNoize('/media/click.wav', 0.15);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  makeNoize('/media/click.wav', 0.15);
});
