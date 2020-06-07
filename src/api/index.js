import { request } from './request'
import store from '../store'

request.init((message) => {
	switch (message.what.request) {
		case 'boards':
			store.commit("updateBoardList", {data: message.data})
			break
		case 'threads':
			store.commit("updateThreadList", {boardName: message.what.boardName, data: message.data})
			break
	}
})

export function requestBoards() {
	request.ws({request: 'boards'})
}

export function requestThreads(params) {
	request.ws({request: 'threads', boardName: params.boardName, count: params.count, page: params.page})
}