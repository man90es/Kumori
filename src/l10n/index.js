import { createI18n } from "vue-i18n"
import en from "./en"
import ru, { ruPluralisationRules } from "./ru"

export default (locale) => {
	return createI18n({
		locale,
		fallbackLocale: "en",
		messages: { en, ru },
		pluralizationRules: { ru: ruPluralisationRules },
		silentTranslationWarn: true,
		silentFallbackWarn: true,
	})
}
