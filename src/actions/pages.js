import axios from 'axios'

function getPages(id){
    return {
        type: 'GET_PAGES',
        payload: axios({
            method: 'POST',
            // url: 'http://192.168.43.142/api/get_pages.php',
            url: 'http://192.168.56.1/api/get_pages.php',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                id,
                key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        })
    }
}

export {getPages}