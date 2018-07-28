
import axios from 'axios'
import config from '../config'

function getMangaDetails(id){
    return{
        type: 'GET_MANGA_DETAILS',
        payload: axios({
            method: 'POST',
            url: `${config.uri}/api/get_manga_details.php`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                id,
                key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        })
    }
}

export {getMangaDetails}