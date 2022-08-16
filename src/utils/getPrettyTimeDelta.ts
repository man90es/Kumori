function shouldPluralise(n: number): boolean {
	return "1" !== n.toString().at(-1)
}

export default function getPrettyTimeDelta(date: Date): string {
	const delta = Number(new Date()) - Number(date)

	if (delta < 6048e5) {
		if (delta < 4e4) {
			return "Just now"
		}

		const minutes = Math.round(delta / 6e4)
		if (minutes < 50) {
			return minutes + (shouldPluralise(minutes) ? " minutes ago" : " minute ago")
		}

		const hours = Math.round(delta / 3.6e6)
		if (hours < 20) {
			return hours + (shouldPluralise(hours) ? " hours ago" : " hour ago")
		}

		const days = Math.round(delta / 8.64e7)
		if (1 === days) {
			return "Yesterday"
		}

		return days + (shouldPluralise(days) ? " days ago" : " day ago")
	} else {
		return date.toLocaleDateString("en-GB", {
			day: "numeric",
			month: "long",
			year: "numeric",
		})
	}
}
