import axios from 'axios'
import { ajaxLoading } from '../lib'
import store from '../store'

axios.defaults.baseURL = 'https://cnodejs.org/api/v1'

const service = {
    global: {
        getTopics() {
            return axios.get('/topics')
        },
        getTopicById(id = '5433d5e4e737cbe96dcef312') {
            return axios.get(`/topic/${id}`)
        },
        delay() {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('complete')
                    resolve()
                }, 2000)
            })
        }
    },
    modules: {
        topic: {
            getTopics() {
                return axios.get('/topics')
            },
            getTopicById(id = '5433d5e4e737cbe96dcef312') {
                return axios.get(`/topic/${id}`)
            }
        }
    }
}

export default ajaxLoading({
    store,
    service
})
