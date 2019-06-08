<template>
  <div id="app">
    <div>
      <el-button type="primary" :loading="$loading.getTopics" @click="handler1">getTopics</el-button>
      <el-button type="primary" :loading="$loading.getTopicById" @click="handler2">getTopicById</el-button>
      <el-button type="primary" :loading="$loading.delay" @click="delay">定时两秒</el-button>
    </div>
    <div style="margin-top: 10px;">
      <el-button type="primary" :loading="$loading.topic.getTopics" @click="handler3">topic.getTopics</el-button>
      <el-button type="primary" :loading="$loading.topic.getTopicById" @click="handler4">topic.getTopicById</el-button>
    </div>
    <div class="text" v-html="loadingComputed"></div>
  </div>
</template>

<script>
  import api from './api'

  export default {
    name: 'App',
    methods: {
      handler1() {
        api.getTopics()
      },
      handler2() {
        api.getTopicById()
      },
      handler3() {
        api.topic.getTopics()
      },
      handler4() {
        api.topic.getTopicById()
      },
      delay() {
        api.delay()
      }
    },
    computed: {
      loadingComputed() {
        return JSON.stringify(this.$store.state.loading).replace(/("[^"]+":true)/g, '<span class="light">$1</span>')
      }
    }
  }
</script>

<style>
  #app {
    text-align: center;
  }

  .text {
    font-size: 18px;
  }

  .light {
    color: red;
  }
</style>
