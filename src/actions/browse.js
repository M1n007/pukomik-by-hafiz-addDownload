import axios from 'axios'

function getMangas(start, rows){
    return {
        type: 'GET_MANGAS',
        payload: axios({
            method: 'POST',
            // url: 'http://192.168.43.142/api/get_mangas.php',
            // url: 'http://192.168.56.1/api/get_mangas.php',
            url: 'http://149.28.146.211/api/get_mangas.php',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
              start,
              rows,
              key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        })
    }
}

function searchManga(search){
    return {
        type: 'SEARCH_MANGA',
        payload: axios({
            method: 'POST',
            // url: 'http://192.168.43.142/api/get_mangas_where.php',
            url: 'http://149.28.146.211/api/get_mangas_where.php',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                where: search,
                key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        })
    }
}

export {getMangas,searchManga}