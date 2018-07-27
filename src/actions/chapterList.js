import axios from 'axios'

function getChapterList(id){
    return {
        type: 'GET_CHAPTER_LIST',
        payload: axios({
            method: 'POST',
            // url: 'http://192.168.56.1/api/get_chapters.php',
            // url: 'http://192.168.43.142/api/get_chapters.php',
            url: 'http://149.28.146.211/api/get_chapters.php',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {
                id,
                start: 0,
                rows: 9999,
                key: 'da3a9900-5c2e-4ee1-a660-94929dddf08e'
            }
        })
    }
}

export {getChapterList}