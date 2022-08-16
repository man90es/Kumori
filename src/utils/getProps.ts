export default function getProps(source: object = {}, whitelist: string[] = []): object {
	return Object.fromEntries(Object.entries(source).filter(([key]) => whitelist.includes(key)))
}
