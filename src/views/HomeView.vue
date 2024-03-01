<template>
	<div id="home">
		<div id="background-layer" :style="backgroundStyle" />
		<img v-if="loggedOn || 0 === loginPhase" src="logo.svg" @click="() => loggedOn || ++loginPhase" />
		<form v-else-if="1 === loginPhase">
			<input :disabled="formValues.invite.length" placeholder="Username" type="text" v-model="formValues.name" />
			or
			<input :disabled="formValues.name.length" placeholder="Invite code" type="text" v-model="formValues.invite" />
			<button type="button" @click="submit">Submit</button>
		</form>
		<form v-else-if="2 === loginPhase">
			<input placeholder="Username" type="text" v-model="formValues.name" />
			<input type="text" placeholder="Email" v-model="formValues.email" />
			<input type="password" placeholder="Password" v-model="formValues.password" />
			<button type="button" @click="register">Create account</button>
			<button type="button" @click="() => (loginPhase = 1)">Back</button>
		</form>
		<form v-else-if="3 === loginPhase">
			<input type="password" placeholder="Password" v-model="formValues.password" />
			<button type="button" @click="login">Log on</button>
			<button type="button" @click="() => (loginPhase = 1)">Back</button>
		</form>
		<ul>
			<li v-for="boardName in $store.state.boardList" :key="boardName">
				<router-link :to="{ name: 'board', params: { boardName } }"> /{{ boardName }} </router-link>
			</li>
		</ul>
	</div>
</template>

<script setup>
	import { computed, inject, ref, reactive } from "vue"
	import { useUserStore } from "@/stores/user"

	const API = inject("API")
	const loggedOn = computed(() => Boolean(user.id))
	const user = useUserStore()

	const loginPhase = ref(0)
	const formValues = reactive({
		email: "",
		invite: "",
		password: "",
		name: "",
	})

	function submit() {
		loginPhase.value = formValues.invite ? 2 : formValues.name ? 3 : 1
	}

	function register() {
		const data = [formValues.invite, formValues.name, formValues.email, formValues.password]

		if (4 > data.filter(Boolean).length) {
			return
		}

		API.auth.register(formValues)
	}

	function login() {
		const data = [formValues.name, formValues.password]

		if (2 > data.filter(Boolean).length) {
			return
		}

		API.auth.logOn(formValues)
	}

	const backgroundStyle = computed(() => {
		const bgSize = [window.screen.width, window.screen.height].map((s) => Math.round(s / 2))
		return `background-image:url(https://picsum.photos/${bgSize.join("/")})`
	})
</script>

<style scoped lang="scss">
	#home {
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #000;
	}

	#background-layer {
		background-position: center;
		background-size: cover;
		bottom: 0;
		filter: url("#sharpBlur");
		left: 0;
		opacity: 0.4;
		position: absolute;
		right: 0;
		top: 0;
	}

	img {
		background-color: #fff1;
		border-radius: 50%;
		cursor: pointer;
		height: 15rem;
		padding: 1.5rem 1rem;
		transition: padding 0.2s, background-color 0.2s;
		z-index: 1;

		&:hover {
			padding: 2.5rem 2rem;
			background-color: #fff2;
		}
	}

	ul {
		padding: 0;
		width: 90%;
		display: flex;
		justify-content: space-around;
		font-size: 2rem;
		position: fixed;
		bottom: 1rem;
		font-weight: bold;
		list-style: none;

		li {
			width: 100%;
			text-align: center;
		}
	}

	a {
		color: #a8afbc;
		display: block;
		padding: 0.25em 0;
		transition: background-color 0.2s;

		&:hover {
			background-color: #fff1;
		}
	}

	form {
		align-items: center;
		background-color: #fff2;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		height: 20rem;
		justify-content: center;
		width: 20.75rem;
		z-index: 1;

		& > input {
			border: 0;
			padding: 0.5em;
			text-align: center;
			width: 20em;
		}

		& > button {
			background-color: var(--card-secondary-color);
			padding: 0.5em 2em;
			width: 10em;
			color: var(--text-color);

			&:not(:first-of-type) {
				background-color: var(--card-color);
			}
		}
	}
</style>
