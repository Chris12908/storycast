// Progressive enhancement: transcript lines seek the media and follow playback.
// Works with a native <audio>/<video> element or an embedded YouTube player.
(() => {
  const cues = [...document.querySelectorAll('.cue')];
  if (!cues.length) return;
  const times = cues.map(c => Number(c.dataset.t));
  const mark = t => {
    let active = -1;
    times.forEach((x, i) => { if (t >= x) active = i; });
    cues.forEach((c, i) => c.setAttribute('aria-current', i === active ? 'true' : 'false'));
  };

  const media = document.querySelector('[data-media]');
  if (media) {
    cues.forEach(c => c.addEventListener('click', () => { media.currentTime = Number(c.dataset.t); media.play(); }));
    media.addEventListener('timeupdate', () => mark(media.currentTime));
    return;
  }

  const frame = document.querySelector('[data-youtube]');
  if (!frame) return;
  let player = null, timer = null;
  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player(frame, { events: { onStateChange: e => {
      clearInterval(timer);
      if (e.data === 1) timer = setInterval(() => mark(player.getCurrentTime()), 500);
    } } });
  };
  cues.forEach(c => c.addEventListener('click', () => {
    const t = Number(c.dataset.t);
    if (player && player.seekTo) { player.seekTo(t, true); player.playVideo(); }
    else { frame.src = frame.src.split('&start=')[0] + '&start=' + t + '&autoplay=1'; } // fallback if the API is blocked
  }));
  const s = document.createElement('script');
  s.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(s);
})();
