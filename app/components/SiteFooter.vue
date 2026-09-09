<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <a class="brand brand-light" href="https://zcyp-web.jxhrm.com" target="_blank" rel="noopener noreferrer" aria-label="中测易聘"><img src="/assets/images/hub-logo1.png" alt="Logo" class="brand-logo"></a>
        <p>为企业提供可靠、易用、可持续演进的数字化产品。</p>
      </div>
      <div class="footer-links">
        <NuxtLink to="/">命题服务</NuxtLink>
        <!-- <NuxtLink to="/hr">HR事务所</NuxtLink> -->
        <!-- <NuxtLink to="/aiproposition">命题服务</NuxtLink> -->
        <NuxtLink to="/marking">阅卷服务</NuxtLink>
        <NuxtLink to="/escort">制卷与押运</NuxtLink>
        <NuxtLink to="/niupai">牛派系统</NuxtLink>
        <NuxtLink to="/questionBank">共享题库中心</NuxtLink>
        <NuxtLink to="/question">题库系统</NuxtLink>
        <NuxtLink to="/aiInterview">AI面试</NuxtLink>
        <NuxtLink to="/computerService">机考服务</NuxtLink>
        <NuxtLink to="/onlineTest">在线笔试</NuxtLink>
        <NuxtLink to="/antiCheating">AI考务安全智能体</NuxtLink>
        <NuxtLink to="/paperlessInterview">无纸化面试评分</NuxtLink>
      </div>
      <div>
        <p class="footer-label">联系我们</p>
        <p>请将这里替换为企业电话与邮箱</p>
      </div>
    </div>
    <div class="container copyright">© {{ new Date().getFullYear() }} 产品中心 · 保留所有权利</div>
  </footer>
</template>
