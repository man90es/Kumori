export function useDrag(dragElement, dragHandle = dragElement) {
	let position = [null, null]
	let cursorPosition = [null, null]

	function mouseDownHandler(event) {
		if (position.includes(null)) {
			const computedStyle = getComputedStyle(dragElement.value)

			position = [
				parseInt(computedStyle.getPropertyValue("left")) || 0,
				parseInt(computedStyle.getPropertyValue("top")) || 0,
			]
		}

		cursorPosition = [ event.clientX, event.clientY ]
		document.addEventListener("mousemove", dragHandler)
		document.addEventListener("mouseup", mouseUpHandler)
	}

	function mouseUpHandler(event) {
		document.removeEventListener("mousemove", dragHandler)
		document.removeEventListener("mouseup", mouseUpHandler)
	}

	function dragHandler(event) {
		position = [
			position[0] + event.clientX - cursorPosition[0],
			position[1] + event.clientY - cursorPosition[1],
		]

		const computedStyle = getComputedStyle(dragElement.value)
		const transform = [
			position[0] - parseInt(computedStyle.getPropertyValue("left")),
			position[1] - parseInt(computedStyle.getPropertyValue("top")),
		]
		dragElement.value.style.transform = `translate(${transform[0]}px, ${transform[1]}px)`

		cursorPosition = [ event.clientX, event.clientY ]
	}

	dragHandle.value.addEventListener("mousedown", mouseDownHandler)

	return {
		reset: () => {
			position = [null, null]
			cursorPosition = [null, null]
			delete dragElement.value.style.transform
		}
	}
}
