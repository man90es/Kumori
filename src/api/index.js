import { request } from './request'
import store from '../store' 

export function submitPost(formData) {
	return request.http('POST', 'createPost', formData).then((response) => {
		store.commit('setTrustedPostCount', response.trustedPostCount)
		return response
	})
}

export function getCaptchaImageURI() {
	return `${store.state.APIServer}/api/captcha?image#${+new Date()}`
}

export function submitCaptcha(formData) {
	return request.http('POST', 'checkCaptcha', formData).then((response) => {
		store.commit('setTrustedPostCount', response.trustedPostCount)
		return response
	})
}

export function deletePosts(formData) {
	return request.http('POST', 'deletePosts', formData)
}
