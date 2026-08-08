<script setup lang="ts">
const source = useCampaignSource()
const contactRoute = computed(() => getContactRoute(undefined, source.value))
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
        <NuxtLink to="/aiproposition">AI命题</NuxtLink>
      </nav>
      <NuxtLink class="button button-small" :to="contactRoute">获取方案</NuxtLink>
    </div>
  </header>
</template>
