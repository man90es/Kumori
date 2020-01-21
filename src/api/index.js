const request = require('./request')

module.exports = {
	readBoards: (category, callback) => {
		request.readBoards(category)
		document.addEventListener('readBoards', (event) => callback(event.detail))
	},

	readThreads: (category, board, callback) => {
		request.readThreads(category, board)
		document.addEventListener('readThreads', (event) => callback(event.detail))
	}
}
