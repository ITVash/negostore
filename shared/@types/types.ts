export enum UserRole {
	ADMIN,
	BOOKKEEPER,
	USER,
	GUEST,
}
export enum StoreName {
	NEGOCIANT,
	NOVIKOV,
}
export enum Status {
	START,
	END,
}
export enum Unit {
	PIECE,
	PACKAGING,
	COUPLE,
}
export interface ITelegramUser {
	id: number
	first_name: string
	last_name: string
	username: string
	language_code?: string
	photo_url?: string | null
}
export interface IThemeParams {
	link_color: string
	button_color: string
	button_text_color: string
	secondary_bg_color: string
	hint_color: string
	bg_color: string
	text_color: string
	header_bg_color: string
}
export interface IWebApp {
	initData: string
	initDataUnsafe: {
		query_id: string
		user: ITelegramUser
		auth_date: string
		hash: string
	}
	version: string
	platform: string
	colorScheme: string
	themeParams: {
		link_color: string
		button_color: string
		button_text_color: string
		secondary_bg_color: string
		hint_color: string
		bg_color: string
		text_color: string
		header_bg_color: string
	}
	isExpanded: boolean
	viewportHeight: number
	viewportStableHeight: number
	isClosingConfirmationEnabled: boolean
	headerColor: string
	backgroundColor: string
	BackButton: {
		isVisible: boolean
	}
	onEvent: (eventTypes: string, eventHandler: () => void) => void
	offEvent: (eventTypes: string, eventHandler: () => void) => void
	MainButton: {
		text: string
		color: string
		textColor: string
		isVisible: boolean
		isProgressVisible: boolean
		isActive: boolean
	}
	HapticFeedback: any
}
