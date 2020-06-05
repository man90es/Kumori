import { request } from './request'
import store from '../store'

request.init((message) => {
	switch (message.what.request) {
		case 'boards':
			store.commit("updateBoardsList", message.data)
			break
	}
})

export function requestBoards() {
	request.ws({request: 'boards'})
}