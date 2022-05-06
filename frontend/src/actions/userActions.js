export const setUser = (userData) => {
    return {
        type: '@user/setUser',
        payload: userData
    }
}

export const resetUser = () => {
    return {
        type: '@user/resetUser'
    }
}