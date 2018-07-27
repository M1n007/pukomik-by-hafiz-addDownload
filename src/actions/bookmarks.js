import axios from 'axios'

function getMangaIn(mangain){
    return{
        type: 'GET_MANGA_IN',
        payload: axios({
            method: 'POST',
            // url: 'http://192.168.43.142/api/get_manga_in.php',
            // url: 'http://192.168.56.1/api/get_manga_in.php',
            url: 'http://149.28.146.211/api/get_manga_in.php',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                mangain,
                key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        })
    }
}   

export{getMangaIn}