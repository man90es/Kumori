export default {
	ok: "Да",
	cancel: "Отмена",

	settingsModal: {
		animations: "Анимации",
		compactBoardMenu: "Компактное меню досок",
		header: "Настройки",
		language: "Язык интерфейса",
		lightTheme: "Светлая тема",
		repliesOnBoardPage: "Ответов на странице доски",
	},

	searchModal: {
		header: "Поиск",
		query: "Запрос",
		boardName: "Название доски",
		threadNumber: "Номер треда",
		after: "После",
		before: "До",
	},

	formModal: {
		threadHeader: "Новый тред на доске /{boardName}",
		postHeader: "Ответ в тред #{threadNumber} на доске /{boardName}",
	},

	captchaModal: {
		header: "Проверка",
		code: "Капча",
	},

	deletePostModal: {
		header: "Удалить {count} выбранный пост? | Удалить {count} выбранных поста? | Удалить {count} выбранных постов?",
		warning1: "Удаление не удастся, если у Вас недостаточно прав.",
		warning2: "Удаление главного поста удаляет весь тред.",
	},

	unsafeLinkModal: {
		header: "Вы точно хотите перейти по ссылке?",
		warning: "Она может быть небезопасна.",
	},

	pageHeader: {
		bookmarksTitle: "Закладки",
		bookmarksDescription: "Посты отмеченные звездочкой",
		boardTitle: "/{boardName}/ — {boardTitle}",
		feedTitle: "Лента /{boardName}/ — {boardTitle}",
		boardDescription: "{boardDescription}",
	},

	post: {
		recently: "только что",
		yesterday: "вчера",
		minutesAgo: "{count} минуту назад | {count} минуты назад | {count} минут назад",
		hoursAgo: "{count} час назад | {count} часа назад | {count} часов назад",
		daysAgo: "{count} день назад | {count} дня назад | {count} дней назад",
		omittedCount: "Пропущено постов: {count}",
	},

	postMenu: {
		show: "Показать",
		hide: "Скрыть",
		unbookmark: "Убрать из закладок",
		bookmark: "Добавить в закладки",
		undelete: "Не удалять",
		delete: "Удалить",
	},
}

export function ruPluralisationRules(choice, choicesLength) {
	if (1 === choicesLength) return 0

	let t = choice % 100
	if (choice > 19) t %= 10

	switch (t) {
		case 1:
			return 0
		case 2:
		case 3:
		case 4:
			return 1
		default:
			return 2
	}
}
