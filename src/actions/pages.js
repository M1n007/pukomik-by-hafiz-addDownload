import axios from 'axios'
import config from '../config'

function getPages(id){
    return {
        type: 'GET_PAGES',
        payload: axios({
            method: 'POST',
            url: `${config.uri}/api/get_pages.php`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                id,
                key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        })
    }
}

export {getPages}