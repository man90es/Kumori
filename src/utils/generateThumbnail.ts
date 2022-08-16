export default async function generateThumbnail(file: File): Promise<string | ArrayBuffer | null> {
	return new Promise((resolve, reject) => {
		if (!file.type.match("image.*")) {
			reject()
		}

		const reader = new FileReader()

		reader.onerror = reject
		reader.onload = (event) => {
			if (!event?.target?.result) {
				return reject()
			}

			resolve(event.target.result)
		}

		reader.readAsDataURL(file)
	})
}
