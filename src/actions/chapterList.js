import axios from 'axios'
import config from '../config'

function getChapterList(id){
    return {
        type: 'GET_CHAPTER_LIST',
        payload: axios({
            method: 'POST',
            url: `${config.uri}/api/get_chapters.php`,
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