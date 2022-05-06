export const ratesReducer = (state = null, action ) => {

    switch (action.type) {
        case '@rates/setRates':

            return {
                ...state,
                usd: action.payload.usd,
                eur: action.payload.eur
            }
    
        default:
            return state
    }

}