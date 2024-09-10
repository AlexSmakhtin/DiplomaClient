const serverUrl = "https://fadventure.fun/api/"
export const serverSignalRUrl = "https://fadventure.fun/chathub"
const serverControllers = {
    user: "user/",
    game: "game/"
}

export const serverUrls = {
    signIn: serverUrl + serverControllers.user + "sign_in",
    signUp: serverUrl + serverControllers.user + "sign_up",
    gameThemes: serverUrl + serverControllers.game + "game_themes",
    createNewGame: serverUrl + serverControllers.game + "new_game",
    getGame: serverUrl + serverControllers.game + "get_by_id",
    generateAvatar: serverUrl + serverControllers.game + "generate_avatar",
    avatar: serverUrl + serverControllers.game + "avatar",
    deleteGame: serverUrl + serverControllers.game + "delete",
    voiceOver: serverUrl + serverControllers.game + "voiceover",
    history: serverUrl + serverControllers.user + "history",
    removeAvatar: serverUrl + serverControllers.game + "avatar/remove",
    historyPagesCount: serverUrl + serverControllers.user + "history_pages_count",
    ping: serverUrl + serverControllers.user + "ping",
    generateImage: serverUrl + serverControllers.game + "generate_image",
    getUser: serverUrl + "user",
    updateUser: serverUrl + serverControllers.user + "update",
    changePassword: serverUrl + serverControllers.user + "change_password",
    confirmEmail: serverUrl + serverControllers.user + "confirm_email",
    retryConfirmEmail: serverUrl + serverControllers.user + "retry_confirm_email"
}