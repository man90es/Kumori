export default function firstFromStringArrayOrString(arg: string | string[] | undefined) {
	return Array.isArray(arg) ? arg[0] : arg
}
