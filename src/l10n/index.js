import { createI18n } from "vue-i18n"
import en from "./en"
import ru, { ruPluralisationRules } from "./ru"

export default createI18n({
	locale: process.env.VUE_APP_LOCALE || "en",
	fallbackLocale: "en",
	messages: { en, ru },
	pluralizationRules: { ru: ruPluralisationRules },
	silentTranslationWarn: true,
	silentFallbackWarn: true,
})
