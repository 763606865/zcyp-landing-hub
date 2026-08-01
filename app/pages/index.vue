<script setup lang="ts">
import { products } from '~/data/products'

const config = useRuntimeConfig()
const canonicalUrl = new URL('/', config.public.siteUrl).href

useSeoMeta({
  title: '企业数字化产品与解决方案',
  description: '探索面向企业协作、数据分析与客户增长的数字化产品，获取适合您业务场景的产品方案。',
  ogTitle: '企业数字化产品与解决方案',
  ogDescription: '用可靠、易用的产品，帮助企业提升效率、洞察数据并持续增长。',
  ogType: 'website',
  twitterCard: 'summary',
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: '企业数字化产品',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: new URL(`/products/${product.slug}`, config.public.siteUrl).href,
        name: product.name,
      })),
    }),
  }],
})

const faqs = [
  ['如何选择适合的产品？', '您可以根据当前最需要解决的问题选择：跨团队协作、经营数据分析或客户增长。我们也建议先进行需求沟通，再确定实施范围。'],
  ['产品是否支持按需配置？', '支持。页面中的产品能力可以根据企业规模、业务流程与现有系统进行组合，具体范围以实际方案为准。'],
  ['从咨询到上线通常有哪些步骤？', '通常包括需求沟通、方案确认、配置实施、试运行和正式上线。实际周期取决于业务复杂度与数据准备情况。'],
]
</script>

<template>
  <div>
    <section class="hero">
      <div class="hero-orb hero-orb-one" />
      <div class="hero-orb hero-orb-two" />
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">让好产品创造真实价值</p>
          <h1>为企业增长，提供更有力的<span>数字化产品</span></h1>
          <p class="hero-lead">从团队协作、经营洞察到客户增长，用清晰易用的产品连接每一个关键业务环节。</p>
          <div class="hero-actions">
            <a class="button" href="#products">查看全部产品</a>
            <a class="text-link" href="#contact">获取专属方案 <span>→</span></a>
          </div>
          <div class="hero-proof" aria-label="服务特点">
            <span>灵活配置</span><span>快速落地</span><span>持续服务</span>
          </div>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <div class="visual-card visual-main">
            <div class="mini-label">BUSINESS OVERVIEW</div>
            <div class="chart-bars"><i /><i /><i /><i /><i /></div>
            <div class="metric-row"><b>+28.4%</b><span>业务增长趋势</span></div>
          </div>
          <div class="visual-card visual-float visual-float-top"><span class="status-dot" />实时数据已更新</div>
          <div class="visual-card visual-float visual-float-bottom"><b>3</b><span>一体化产品方案</span></div>
        </div>
      </div>
    </section>

    <section id="products" class="section products-section">
      <div class="container">
        <div class="section-heading">
          <div><p class="eyebrow">产品矩阵</p><h2>覆盖企业发展的关键环节</h2></div>
          <p>每一款产品都围绕真实业务场景设计，既能独立使用，也能组合成完整解决方案。</p>
        </div>
        <div class="product-grid">
          <article v-for="(product, index) in products" :key="product.slug" class="product-card" :style="{ '--accent': product.accent }">
            <div class="product-top"><span class="product-index">0{{ index + 1 }}</span><span class="product-tag">{{ product.eyebrow }}</span></div>
            <h3>{{ product.name }}</h3>
            <p>{{ product.summary }}</p>
            <ul><li v-for="feature in product.features.slice(0, 3)" :key="feature">{{ feature }}</li></ul>
            <NuxtLink class="card-link" :to="`/products/${product.slug}`" :aria-label="`了解${product.name}`">了解产品 <span>↗</span></NuxtLink>
          </article>
        </div>
      </div>
    </section>

    <section id="advantages" class="section advantage-section">
      <div class="container advantage-grid">
        <div><p class="eyebrow eyebrow-light">我们的优势</p><h2>不止提供工具，更关注业务成果</h2><p class="light-copy">从需求梳理到持续优化，我们与客户共同把产品能力转化为可感知的业务价值。</p></div>
        <div class="advantage-list">
          <div><b>01</b><h3>聚焦场景</h3><p>从具体问题出发，避免复杂功能堆叠。</p></div>
          <div><b>02</b><h3>快速实施</h3><p>清晰的交付路径，降低团队切换成本。</p></div>
          <div><b>03</b><h3>持续演进</h3><p>基于业务反馈不断优化产品体验。</p></div>
        </div>
      </div>
    </section>

    <section id="faq" class="section faq-section">
      <div class="container faq-grid">
        <div><p class="eyebrow">常见问题</p><h2>在开始之前，您可能想了解</h2></div>
        <div class="faq-list">
          <details v-for="([question, answer], index) in faqs" :key="question" :open="index === 0">
            <summary>{{ question }}<span>＋</span></summary><p>{{ answer }}</p>
          </details>
        </div>
      </div>
    </section>

    <section id="contact" class="section contact-section">
      <div class="container contact-card">
        <div><p class="eyebrow eyebrow-light">下一步</p><h2>找到适合您的产品方案</h2><p>告诉我们您正在解决的问题，获取更有针对性的产品介绍与实施建议。</p></div>
        <a class="button button-light" href="mailto:contact@example.com">立即联系我们</a>
      </div>
    </section>
  </div>
</template>
