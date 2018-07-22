
import axios from 'axios'

function getMangaDetails(id){
    return{
        type: 'GET_MANGA_DETAILS',
        payload: axios({
            method: 'POST',
            url: 'http://192.168.43.142/api/get_manga_details.php',
            // url: 'http://192.168.56.1/api/get_manga_details.php',
            ers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                id,
                key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        })
    }
}

export {getMangaDetails}