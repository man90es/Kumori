import { request } from './request'
import store from '../store'

request.init((message) => {
	switch (message.what.request) {
		case 'boards':
			store.commit("updateBoardList", message.data)
			break
		case 'threads':
			store.commit("updateThreadList", message.data)
			break
		case 'posts':
			store.commit("updatePostList", message.data)
			break
	}
})

export function requestBoards() {
	request.ws({request: 'boards'})
}

export function requestThreads(params) {
	request.ws({request: 'threads', boardName: params.boardName, count: params.count, page: params.page})
}

export function requestPosts(params) {
	request.ws({request: 'posts', boardName: params.boardName, threadId: params.threadId, count: params.count, page: params.page})
}