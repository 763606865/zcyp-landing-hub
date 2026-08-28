<script setup lang="ts">
import { computed } from 'vue'

// @ts-ignore
const route = useRoute()
// @ts-ignore
const source = useCampaignSource()

const routeProductMap: Record<string, number> = {
  '/hr': 1,
  '/aiproposition': 2,
  '/marking': 3,
  '/escort': 4,
  '/niupai': 5,
  '/questionBank': 6,
  '/question': 7,
  '/aiInterview': 8,
  '/computerService': 9,
  '/onlineTest': 10,
}
const contactRoute = computed(() => {
  const product = routeProductMap[route.path]
  return getContactRoute(product, source.value)
})
</script>

<template>
  <header class="site-header">
    <div class="container nav-wrap">
      <NuxtLink class="brand" to="/" aria-label="产品中心首页">
        <img src="/assets/images/hub-logo.png" alt="Logo" class="brand-logo">
      </NuxtLink>
      <nav aria-label="主导航">
        <NuxtLink to="/">首页</NuxtLink>
        <NuxtLink to="/hr">HR事务所</NuxtLink>
        <NuxtLink to="/aiproposition">命题服务</NuxtLink>
        <NuxtLink to="/marking">阅卷服务</NuxtLink>
        <NuxtLink to="/escort">保密押运</NuxtLink>
        <NuxtLink to="/niupai">牛派系统</NuxtLink>
        <NuxtLink to="/questionBank">题库中心</NuxtLink>
        <NuxtLink to="/question">题库系统</NuxtLink>
        <NuxtLink to="/aiInterview">AI面试</NuxtLink>
        <NuxtLink to="/computerService">机考服务</NuxtLink>
        <NuxtLink to="/onlineTest">在线笔试</NuxtLink>
      </nav>
      <NuxtLink class="button button-small" :to="contactRoute">获取方案</NuxtLink>
    </div>
  </header>
</template>
