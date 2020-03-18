import request from './request'

export function sync(type) {
	return request({request: 'sync', type})
}

export function getBoards() {
	return request({request: 'boards'})
}

export function getThreads(boardName, count, page) {
	return request({request: 'threads', boardName, count, page})
}


