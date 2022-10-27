import { readonly, ref } from "vue"

export function useAtBottom() {
	const atBottom = ref(false)

	window.onscroll = () => {
		const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
		atBottom.value = scrollTop + window.innerHeight === document.documentElement.offsetHeight
	}

	return readonly(atBottom)
}
