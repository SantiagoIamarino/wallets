
export const userReducer = (state = null, action) => {
    switch (action.type) {
        case '@user/setUser':
            return {
                ...state, 
                _id: action.payload._id,
                username: action.payload.username,
                wallets: (action.payload.wallets) ? action.payload.wallets : []
            }

        case '@user/resetUser':
            return null
    
        default:
            return state
    }
}