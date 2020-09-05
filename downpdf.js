import {request} from './index'
import requests from './index'
export  default {
    getFiles(url, prarms){
        return requests.requestGet(url , prarms)
    },
    getCompanyInfo() {
        return request({
            url: `tyhf/company`,
            method: 'get',
        })
    },
}