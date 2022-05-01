import request from "superagent";
const TEKKENURL = 'https://tkn-api.herokuapp.com/character/'


export function getHomePage() {
    return request.get(TEKKENURL).then(res => res.body)
    
}
