import { request } from './request'
import store from '../store' 

export async function submitPost(formData) {
	let response = await request.http('POST', 'createPost', formData)
	store.commit('setTrustedPostCount', response.trustedPostCount)
	return response
}

export function getCaptchaImageURI() {
	return `${store.state.APIServer}/api/captcha?image#${+new Date()}`
}

export async function submitCaptcha(formData) {
	let response = await request.http('POST', 'checkCaptcha', formData)
	store.commit('setTrustedPostCount', response.trustedPostCount)
	return response
}

export function deletePosts(formData) {
	return request.http('POST', 'deletePosts', formData)
}
