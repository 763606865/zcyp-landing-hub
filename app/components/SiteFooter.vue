<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <div class="brand brand-light"><span class="brand-mark">Z</span><span>产品中心</span></div>
        <p>为企业提供可靠、易用、可持续演进的数字化产品。</p>
      </div>
      <div class="footer-links">
        <NuxtLink to="/hr">HR事务所</NuxtLink>
        <NuxtLink to="/#products">产品方案</NuxtLink>
        <NuxtLink to="/#advantages">服务优势</NuxtLink>
        <NuxtLink to="/#faq">常见问题</NuxtLink>
      </div>
      <div>
        <p class="footer-label">联系我们</p>
        <p>请将这里替换为企业电话与邮箱</p>
      </div>
    </div>
    <div class="container copyright">© {{ new Date().getFullYear() }} 产品中心 · 保留所有权利</div>
  </footer>
</template>
