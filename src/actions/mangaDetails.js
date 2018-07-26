
import axios from 'axios'

function getMangaDetails(id){
    return{
        type: 'GET_MANGA_DETAILS',
        payload: axios({
            method: 'POST',
            // url: 'http://192.168.43.142/api/get_manga_details.php',
            url: 'http://149.28.146.211/api/get_manga_details.php',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                id,
                key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        })
    }
}

export {getMangaDetails}