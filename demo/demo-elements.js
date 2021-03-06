import '@polymer/polymer/polymer-legacy.js';
import '../google-youtube.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="demo-element">
  <template id="page-template">
    <style>
      div {
        margin-bottom: 1em;
      }
    </style>
    <h1><code>&lt;google-youtube&gt;</code> Demo</h1>
    <h3>Full API Demo</h3>
    <google-youtube
        id="googleYouTube"
        playsupported="{{playSupported}}"
        video-id="mN7IAaRdi_k"
        state="{{state}}"
        currenttime="{{currentTime}}"
        currenttimeformatted="{{currentTimeFormatted}}"
        duration="{{duration}}"
        durationformatted="{{durationFormatted}}"
        fractionloaded="{{fractionLoaded}}"
        volume="{{volume}}"
        playbackrate="{{playbackRate}}"
        playbackquality="{{playbackQuality}}"
        on-google-youtube-state-change="handleStateChange"
        on-google-youtube-error="handleYouTubeError">
    </google-youtube>

    <div>
      <p>
        Playback Progress:
        <span>{{currentTimeFormatted}}</span>
        /
        <span>{{durationFormatted}}</span>
        <progress max="1" value="{{computeProgress(currentTime, duration)}}"></progress>
      </p>
      <p>Volume: <span>{{volume}}</span></p>
      <p>Playback Rate: <span>{{playbackRate}}</span></p>
      <p>Playback Quality: <span>{{playbackQuality}}</span></p>
    </div>

    <div>
      <button
          id="play-video"
          disabled="{{computePlayDisabled(state, playSupported)}}"
          on-click="handlePlayVideo">
        Play
      </button>
      <button
          id="pause-video"
          disabled="{{computePauseDisabled(state)}}"
          on-click="handlePauseVideo">
        Pause
      </button>
    </div>

    <div>
      <label for="videoId">Video ID:</label>
      <input id="videoId" value="M7lc1UVf-VE">
      <button id="cue-video" on-click="handleCueVideo">Cue</button>
    </div>

    <div>
      <p>Player Events:</p>
      <ol>
        <template is="dom-repeat" items="{{events}}">
          <li>State change: <span>{{item.data}}</span></li>
        </template>
      </ol>
    </div>

    <h3>Custom Thumbnail Demo</h3>
    <google-youtube
        video-id="yRbOSdAe_JU"
        width="853px"
        height="480px"
        thumbnail="//www.polymer-project.org/images/logos/p-logo.svg">
    </google-youtube>

    <h3>Playlist Demo</h3>
    <google-youtube
        list="PLNYkxOF6rcICc687SxHQRuo9TVNOJelSZ"
        list-type="playlist"
        width="640px"
        height="480px">
    </google-youtube>
  </template>
  
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
  is: 'demo-element',
  properties: {
    playSupported: Boolean,
    state: Number,
    currentTime: Number,
    currentTimeFormatted: String,
    duration: Number,
    durationFormatted: String,
    fractionLoaded: Number,
    volume: Number,
    playbackRate: Number,
    playbackQuality: String,
    events: {
      type: Array,
      value: []
    }
  },
  computeProgress: function(currentTime, duration) {
    if (currentTime === undefined || duration === undefined) {
      return 0;
    }

    return currentTime / duration;
  },
  computePlayDisabled: function(state, playSupported) {
    return state == 1 || state == 3 || !playSupported;
  },
  computePauseDisabled: function(state) {
    return state != 1 && state != 3;
  },
  handleStateChange: function(ev) {
    this.events.push({data: ev.detail.data});
  },
  handleYouTubeError: function(ev) {
    console.error('YouTube playback error', ev.detail);
  },
  handlePlayVideo: function(ev) {
    this.$.googleYouTube.play();
  },
  handlePauseVideo: function(ev) {
    this.$.googleYouTube.pause();
  },
  handleCueVideo: function(ev) {
    this.$.googleYouTube.videoId = this.$.videoId.value;
  }
});
