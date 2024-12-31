<script setup>
import DefaultTheme from 'vitepress/theme';
import { onMounted } from 'vue';

const { Layout } = DefaultTheme;

onMounted(() => {
  console.log('初始化、请求接口');
});

</script>

<template>
  <Layout>
    <template #nav-bar-content-after>
      <!-- <button style="margin-left:16px">登录</button> -->
    </template>
  </Layout>
</template>