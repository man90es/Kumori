import { createI18n } from "vue-i18n"
import en from "./en"
import ru, { ruPluralisationRules } from "./ru"

export default createI18n({
	locale: "en",
	fallbackLocale: "en",
	messages: { en, ru },
	pluralizationRules: { ru: ruPluralisationRules }
})
