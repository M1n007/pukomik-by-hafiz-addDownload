import axios from 'axios'
import config from '../config'

function getMangaIn(mangain){
    return{
        type: 'GET_MANGA_IN',
        payload: axios({
            method: 'POST',
            url: `${config.uri}/api/get_manga_in.php`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                mangain,
                key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        })
    }
}   

export{getMangaIn}