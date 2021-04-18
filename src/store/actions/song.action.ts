import {
	songTypes
} from '../types/song.types';

export const getSongs = () => {
	const data = {
	    type: songTypes.SONGS_REQUESTED,
	    payload: {} //payload is the data/object that is resolved by the promise
	};
	return data;
}

export const pushSong = (song) => {
	return {
		type: songTypes.SONG_STACK_PUSH,
		song: song
	}
}

export const popSong = () => {
	return {
		type: songTypes.SONG_STACK_POP
	}
}

export const pushHistory = (song) => {
	return {
		type: songTypes.HISTORY_STACK_PUSH,
		song: song
	}
}

export const popHistory = () => {
	return {
		type: songTypes.HISTORY_STACK_POP
	}
}
