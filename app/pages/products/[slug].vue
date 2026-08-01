<script setup lang="ts">
import { getProduct, products } from '~/data/products'

const route = useRoute()
const config = useRuntimeConfig()
const product = getProduct(route.params.slug as string)
if (!product) throw createError({ statusCode: 404, statusMessage: '未找到该产品' })

useSeoMeta({
  title: `${product.name}｜${product.eyebrow}解决方案`,
  description: product.description,
  ogTitle: `${product.name}｜${product.eyebrow}解决方案`,
  ogDescription: product.summary,
  ogType: 'website',
  twitterCard: 'summary',
})
useHead({
  link: [{ rel: 'canonical', href: new URL(`/products/${product.slug}`, config.public.siteUrl).href }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Product', name: product.name,
    description: product.description, category: product.eyebrow,
  }) }],
})

const related = products.filter(item => item.slug !== product.slug).slice(0, 2)
</script>

<template>
  <div>
    <section class="product-hero" :style="{ '--accent': product.accent }">
      <div class="container">
        <nav class="breadcrumbs" aria-label="面包屑"><NuxtLink to="/">首页</NuxtLink><span>/</span><span>{{ product.name }}</span></nav>
        <div class="product-hero-grid">
          <div><p class="eyebrow">{{ product.eyebrow }}</p><h1>{{ product.name }}</h1><p>{{ product.description }}</p><div class="hero-actions"><a class="button" href="#contact">获取产品方案</a><a class="text-link" href="#capabilities">查看核心能力 ↓</a></div></div>
          <div class="product-metric"><strong>{{ product.metric }}</strong><span>{{ product.metricLabel }}</span><small>实际效果因企业情况而异</small></div>
        </div>
      </div>
    </section>
    <section id="capabilities" class="section">
      <div class="container detail-grid">
        <div><p class="eyebrow">核心能力</p><h2>简洁易用，覆盖关键业务</h2></div>
        <div class="feature-grid"><div v-for="(feature, index) in product.features" :key="feature"><span>0{{ index + 1 }}</span><h3>{{ feature }}</h3><p>围绕实际使用场景设计，帮助团队快速上手并持续创造价值。</p></div></div>
      </div>
    </section>
    <section class="section scenario-section"><div class="container"><div class="section-heading"><div><p class="eyebrow">适用场景</p><h2>从真实业务问题出发</h2></div></div><div class="scenario-grid"><div v-for="scenario in product.scenarios" :key="scenario"><span>✓</span><h3>{{ scenario }}</h3><p>根据企业现状灵活配置，让产品自然融入现有工作方式。</p></div></div></div></section>
    <section class="section related-section"><div class="container"><p class="eyebrow">更多产品</p><h2>探索其他解决方案</h2><div class="related-grid"><NuxtLink v-for="item in related" :key="item.slug" :to="`/products/${item.slug}`"><span>{{ item.eyebrow }}</span><h3>{{ item.name }}</h3><p>{{ item.summary }}</p><b>了解详情 →</b></NuxtLink></div></div></section>
    <section id="contact" class="section contact-section"><div class="container contact-card"><div><p class="eyebrow eyebrow-light">产品咨询</p><h2>想进一步了解{{ product.name }}？</h2><p>联系我们，获取产品介绍、适用场景与实施建议。</p></div><a class="button button-light" href="mailto:contact@example.com">获取产品方案</a></div></section>
  </div>
</template>
