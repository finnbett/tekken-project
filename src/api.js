import request from "superagent";
const TEKKENURL = 'http://tkn-api.herokuapp.com/character/'
// const CHARACTERURL = `http://tkn-api.herokuapp.com/character/${character.name}`

export function getHomePage() {
    return request.get(TEKKENURL).then(res => res.body)
    
}
