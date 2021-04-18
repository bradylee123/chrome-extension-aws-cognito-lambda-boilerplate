import * as React from "react";
import * as actions from "../store/actions/index";
import { connect } from 'react-redux';
import PlayController from './components/playController';
import ReactPlayer from 'react-player';

const player = props => {

	const [playing, setPlaying] = React.useState(false);
	const playerEl = React.useRef(null);
	const [secondsPlayed, setSecondsPlayed] = React.useState(0);
	const [earned, setEarned] = React.useState(false);

	const handleButtonClick = () => {
		props.onGetSongs();
	}

	const handleNext = () => {
		if (Array.isArray(props.songStack) && props.songStack.length) {
			if (props.songStack.length > 0) {
				if (props.song !== null) {
					props.onPushHistory(props.song);
				}
				props.onPopSong();
			}
		}
	}

	const handlePrevious = () => {
		if (Array.isArray(props.historyStack) && props.historyStack.length) {
			if (props.historyStack.length > 0) {
				if (props.song !== null) {
					props.onPushSong(props.song);
				}
				props.onPopHistory();
			}
		}
	}

	const handlePlay = () => {
		let currentSecondsPlayed = playerEl.current.getCurrentTime();
		setPlaying(true);
		setSecondsPlayed(currentSecondsPlayed);
	}

	const handlePause = () => {
		setPlaying(false);
	}

	const handleProgress = (event) => {
		if (!earned && event.playedSeconds > secondsPlayed + 10) {
			setEarned(true);
		}
	}

	const handleSongError = () => {
		if (props.songStack.size() > 0) {
			let songToPlay = props.songStack[props.songStack.length - 1];
			props.onPopSong();
		}
	}

	React.useEffect(() => {
		if (Array.isArray(props.songStack) && props.songStack.length) {	
			if (props.songStack.length > 0 && props.song === null) {
				props.onPopSong();
			}
		}
	}, [props.songStack]);

    return (

        <div>
        	{(props.song) &&
        		<div className='player-wrapper'>
	        	<ReactPlayer 
	        		ref={playerEl}
	        		url={'https://www.youtube.com/watch?v=' + props.song.youtubeId} 
	        		playing={playing} 
	        		className='react-player'
	        		width="200" 
	        		height="400"
	        		progressInterval={5000}
	        		onPlay={handlePlay}
	        		onPause={handlePause}
	        		onProgress={(event) => handleProgress(event)}
	        		onError={handleSongError}
	        		onEnded={handleNext} />
	        	</div>
	        }
        	<button onClick={handleButtonClick} />
        	<PlayController
        		next={handleNext}
        		previous={handlePrevious}
        		playing={playing}
        		playSong={setPlaying} />
        </div>
    )

}

const mapStateToProps = state => {
  return {
  	song: state.song.song,
    songStack: state.song.songStack,
    historyStack: state.song.historyStack
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetSongs: () => dispatch(actions.getSongs()),
    onPushSong: (song) => dispatch(actions.pushSong(song)),
    onPopSong: () => dispatch(actions.popSong()),
    onPushHistory: (song) => dispatch(actions.pushHistory(song)),
    onPopHistory: () => dispatch(actions.popHistory()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(player);