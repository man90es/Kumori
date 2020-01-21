module.exports = {
	readBoards: (data0) => {
		let data1 = {boards: []}

		Object.keys(data0).forEach((key) => {
			let obj = data0[key]
			obj.id = key
			obj.defaultSubject = obj.defaultUsername
			delete obj.defaultUsername

			data1.boards.push(obj)
		})

		return data1
	},
	readThreads: (data0) => {
		delete data0.lastPostNumber
		delete data0.pageCount

		return data0
	}
}