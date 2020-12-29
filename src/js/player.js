let player;
const playerContainer = $('.player');

let eventsInit = () => {
  $('.player__start').click(e => {
    e.preventDefault();

    if (playerContainer.hasClass('player--paused')) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  $('.player__playback').click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPosition = (player.getDuration() / 100) * newButtonPositionPercent;

    $('.player__playback-button').css({
      left: `${newButtonPositionPercent}%`
    });

    player.seekTo(newPlaybackPosition);
  });

  $('.player__splash').click(e => {
    player.playVideo();
  });
};

eventsInit();

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
    const completedPersent = (completedSec / durationSec) * 100;

    $('.player__playback-button').css({
      left: `${completedPersent}%`
    });

    $('.player__duration-completed').text(formatTime(completedSec));
  }, 1000);
};

const onPlayerStateChange = event => {
  /*   -1(воспроизведение видео не начато)
    0(воспроизведение видео завершено)
    1(воспроизведение)
    2(пауза)
    3(буферизация)
    5(видео подают реплики) */
  switch (event.data) {
    case 1:
      playerContainer.addClass('player--active');
      playerContainer.addClass('player--paused');
      break;

    case 2:
      playerContainer.removeClass('player--active');
      playerContainer.removeClass('player--paused');
      break;
  }
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '405',
    width: '660',
    videoId: 'aqAxCVD2U80',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
    }
  });
}

const volumeLevel = $('.player__volume-range')

$(".player__volume-mute").click(e => {
  e.preventDefault();
  const playerVolumeMuteBtn = $(".player__volume-mute")

  if (playerVolumeMuteBtn.hasClass("player__volume--active")) {
      player.unMute();
      playerVolumeMuteBtn.removeClass("player__volume--active");
      volumeLevel.val(100);
  } else {
      player.mute();
      playerVolumeMuteBtn.addClass("player__volume--active");
      volumeLevel.val(0);
  }
  
});

volumeLevel.change(e => {
  const clickedPosition = e.target.value;
  player.setVolume(clickedPosition);
});
