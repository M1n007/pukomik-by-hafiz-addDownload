import axios from 'axios'
import config from '../config'

function searchManga(search){
    return {
        type: 'SEARCH_MANGA',
        payload: axios({
            method: 'POST',
            url: `${config.uri}/api/get_mangas_where.php`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                where: search,
                key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        })
    }
}

export {searchManga}