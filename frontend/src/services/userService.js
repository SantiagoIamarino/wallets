import axios from "axios"
import { configs } from "../config/vars"


export const getUserFromStorage = () => {

    if( localStorage.getItem('user') ) {

        return JSON.parse(localStorage.getItem('user'))

    }

    return null

}

export const setUserInStorge = ( userData ) => {

    localStorage.setItem('user', JSON.stringify(userData))

}

export const removeUserFromStorage = () => {
    localStorage.removeItem('user')
}

export const login = async (username) => {

    let user = await findUser(username)

    if(!user) {
        user = await createUser(username)
    }

    return Promise.resolve(user)

}

export const findUser = async (username) => {

    let url = `${ configs.serverUrl }/users/${username}`;
    
    const res = await axios.get(url)
    
    if(res.status !== 200) {
        return new Error('Unexpected error')
    }

    return res.data

}

export const createUser = async (username) => {

    const userData = {
        username,
        wallets: []
    }

    let url = `${ configs.serverUrl }/users`;

    try {
        
        const res = await axios.post(url, userData)

        const user = res.data

        return user

    } catch (error) {
        throw new Error(error)
    }
    

}

export const updateUser = async (userData) => {

    let url = `${configs.serverUrl}/users/${userData._id}`
    const res = await axios.put(url, userData)

    if(res.status === 200) {
        return Promise.resolve(res.data)
    }

}