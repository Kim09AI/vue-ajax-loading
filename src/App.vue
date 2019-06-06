<template>
  <div id="app">
    <div>
      <el-button type="primary" :loading="$loading.getTopics" @click="handler1">按钮一</el-button>
      <el-button type="primary" :loading="$loading.getTopicById" @click="handler2">按钮二</el-button>
      <el-button type="primary" :loading="$loading.test" @click="test">定时两秒</el-button>
    </div>
    <div style="margin-top: 10px;">
      <el-button type="primary" :loading="$loading.topic.getTopics" @click="handler3">按钮三</el-button>
      <el-button type="primary" :loading="$loading.topic.getTopicById" @click="handler4">按钮四</el-button>
    </div>
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
      test() {
        api.test()
      }
    }
  }
</script>

<style>
  #app {
    text-align: center;
  }
</style>
