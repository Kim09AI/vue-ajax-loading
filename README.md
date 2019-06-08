# vue-ajax-loading

自动给 `ajax` 请求设置 `loading` 状态，主要思路是把所有请求集中到单一实例上，通过 `proxy` 代理属性访问，把 `loading` 状态提交到 `store` 的 `state` 中


## 安装

```
$ npm install vue-ajax-loading
```

## 演示
[在线demo(打开较慢)](https://codesandbox.io/s/c8zyw)

![demo截屏][1]

## 使用

- 配置 store 的 state 及 mutations
```js
import { loadingState, loadingMutations } from 'vue-ajax-loading'

const store = new Vuex.Store({
    state: {
        ...loadingState
    },
    mutations: {
        ...loadingMutations
    }
})
```

- 把所有请求集中到一个对象上
```js
import { ajaxLoading } from 'vue-ajax-loading'
import axios from 'axios'
import store from '../store' // Vuex.Store 创建的实例

axios.defaults.baseURL = 'https://cnodejs.org/api/v1'

// 把请求集中到单一对象上，如：
const service = {
    global: {
        // 全局的请求
        getTopics() {
            return axios.get('/topics')
        },
        getTopicById(id = '5433d5e4e737cbe96dcef312') {
            return axios.get(`/topic/${id}`)
        }
    },
    modules: {
        // 有命名空间的请求，命名空间就是 topic
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
```

完成以上配置之后，通过上面 `export default` 出来的对象去发送请求，就会自动设置请求的状态，然后可以在组件内通过 `this.$store.state.loading` 或 `this.$loading` 去访问请求状态，如：
```html
<el-button type="primary" :loading="$loading.getTopics" @click="handler1">getTopics</el-button>
<el-button type="primary" :loading="$loading.delay" @click="delay">定时两秒</el-button>
<el-button type="primary" :loading="$loading.topic.getTopics" @click="handler3">topic.getTopics</el-button>
```
```js
import api from 'path/to/api'

export default {
    methods: {
        handler1() {
            api.getTopics()
        },
        handler3() {
            api.topic.getTopics()
        },
        delay() {
            api.delay()
        }
    }
}
```

## Options

### store
Vuex.Store 创建的实例

### service
包含所有请求的对象，可以配置 `global` 和 `modules` 属性

- global：全局作用域的请求，可以设置为**对象**或**数组对象**
- modules：带命名空间的请求，类型为**对象**，属性名即为命名空间

### loadingProp
挂载到 `Vue.prototype` 上的属性名，默认是 `$loading`

  [1]: ./demo.gif
