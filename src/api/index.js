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
			if (message.what.threadId != undefined) {
				store.commit("updatePostList", {data: message.data, what: message.what})
			} else {
				store.commit("updateFeed", {data: message.data, what: message.what})
			}
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

export async function submitPost(formData) {
	let response = await request.http('POST', 'createPost', formData)
	store.commit('setTrustedPostCount', response.trustedPostCount)
	return response
}

export function getCaptchaImageURI() {
	return `${APIServer}/api/captcha?image#${+new Date()}`
}

export async function submitCaptcha(formData) {
	let response = await request.http('POST', 'checkCaptcha', formData)
	store.commit('setTrustedPostCount', response.trustedPostCount)
	return response
}