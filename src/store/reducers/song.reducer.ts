import { songTypes } from '../types';
import { updateObject } from '../../shared/utility';
import ReactPlayer from 'react-player';

const initialState = {
  song: null,
  songStack: [],
  historyStack: [],
};

const getSongsSuccess = (state, action) => {
  let songStack = [];
  if (Array.isArray(action.songs) && action.songs.length) {
    for (let i = action.songs.length - 1; i >=0; i--) {
      if (action.songs[i].platform === "youtube") {
        if (ReactPlayer.canPlay('https://www.youtube.com/watch?v=' + action.songs[i].youtubeId)) {
          songStack.push(action.songs[i]);
        }
      }
    }
  }
  return updateObject( state, {
      songStack: songStack
  } );
}

const getSongsFailure = (state, action) => {
  return updateObject( state, {
      songStack: []
  } );
}

const pushSong = (state, action) => {
  let songStack = state.songStack.concat(action.song);
  return updateObject( state, {
      songStack: songStack
  } );
}

const popSong = (state, action) => {
  let song = state.songStack.pop();
  return updateObject( state, {
      songStack: state.songStack,
      song: song
  } );
}

const pushHistory = (state, action) => {
  let historyStack = state.historyStack.concat(action.song);
  return updateObject( state, {
      historyStack: historyStack
  } );
}

const popHistory = (state, action) => {
  let song = state.historyStack.pop();
  return updateObject( state, {
      historyStack: state.historyStack,
      song: song
  } );
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
      case songTypes.GET_SONGS_SUCCESS: return getSongsSuccess(state, action);
      case songTypes.GET_SONGS_FAILURE: return getSongsFailure(state, action);
      case songTypes.SONG_STACK_PUSHED: return pushSong(state, action);
      case songTypes.SONG_STACK_POPPED: return popSong(state, action);
      case songTypes.HISTORY_STACK_PUSHED: return pushHistory(state, action);
      case songTypes.HISTORY_STACK_POPPED: return popHistory(state, action);
      default: return state;
    }
};

export default reducer;