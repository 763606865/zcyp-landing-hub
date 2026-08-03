<script setup lang="ts">
const source = useCampaignSource()
const contactRoute = computed(() => getContactRoute(undefined, source.value))
</script>

<template>
  <header class="site-header">
    <div class="container nav-wrap">
      <NuxtLink class="brand" to="/" aria-label="产品中心首页">
        <span class="brand-mark">Z</span>
        <span>产品中心</span>
      </NuxtLink>
      <nav aria-label="主导航">
        <NuxtLink to="/#products">产品</NuxtLink>
        <NuxtLink to="/#advantages">优势</NuxtLink>
        <NuxtLink to="/#faq">常见问题</NuxtLink>
      </nav>
      <NuxtLink class="button button-small" :to="contactRoute">获取方案</NuxtLink>
    </div>
  </header>
</template>
