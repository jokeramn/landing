let player;
const playerContainer = $('.player');

let eventsInit = () => {
  $('.player__start').click(e => {
    e.preventDefault();

    const btn = $(e.currentTarget);

    if (playerContainer.hasClass('player--paused')) {
      playerContainer.removeClass('player--paused');
      player.pauseVideo();
    } else {
      playerContainer.addClass('player--paused');
      player.playVideo();
    }
  });
};

const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);
  const min = addZero(Math.floor(roundTime / 60));
  const sec = addZero(roundTime - min * 60);

  function addZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  return `${min} : ${sec}`;
};

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();

  $('.player__duration-estimate').text(formatTime(durationSec));

  if (typeof interval !== 'undefined') {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();

    $('.player__duration-completed').text(formatTime(completedSec));
  }, 1000);
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '405',
    width: '660',
    videoId: 'aqAxCVD2U80',
    events: {
      'onReady': onPlayerReady,
      /* 'onStateChange': onPlayerStateChange */
    },
    playerVars: {
      controls: 0,
    }
  });
}

eventsInit();