import request from "superagent";
import { DisplayHomePage } from "./DisplayHomePage";
const TEKKENURL = 'http://tkn-api.herokuapp.com/character/'
// const CHARACTERURL = `http://tkn-api.herokuapp.com/character/${character.name}`

export function getHomePage() {
    return request.get(TEKKENURL).then(res => res.body)
    
}

// export function getCharacterData() {
//     return request.get(CHARACTERURL).then(res => res.body)
// }