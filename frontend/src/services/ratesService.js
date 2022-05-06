export const validateRates = (rates) => {
    const values = Object.values(rates)
    const keys = Object.keys(rates)
    let errorMessage = ''

    for (const [index, value] of values.entries()) {
        if(!value) {
            errorMessage = `${keys[index]} rate is empty`
            break
        }

        if(isNaN(value) || value <= 0) {
            errorMessage = `${keys[index]} rate is not a valid value`
            break
        }
    }

    if(errorMessage) {
        return {
            ok: false,
            message: errorMessage
        }
    }

    return {
        ok: true
    }

}

export const setRatesOnStorage = (rates) => {

    localStorage.setItem('rates', JSON.stringify(rates))

}

export const getRatesFromStorage = (rates) => {

    return JSON.parse(localStorage.getItem('rates'))
    
}