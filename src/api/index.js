import { request } from './request'
import store from '../store'
import { APIServer } from '../../config'

request.init((message) => {
	switch (message.what.request) {
		case 'boards':
			store.commit("updateBoardList", message.data)
			break
		case 'threads':
			store.commit("updateThreadList", message.data)
			break
		case 'thread':
			store.commit("updateThreadList", [message.data])
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

export function requestThread(params) {
	request.ws({request: 'thread', id: params.id})
}

export function requestPosts(params) {
	request.ws({request: 'posts', boardName: params.boardName, threadId: params.threadId, count: params.count, page: params.page})
}

export function submitPost(formData) {
	return request.http('POST', 'createPost', formData)
}

export function getCaptchaImageURI() {
	return `${APIServer}/api/captcha?image#${+new Date()}`
}

export function submitCaptcha(formData) {
	return request.http('POST', 'checkCaptcha', formData)
}