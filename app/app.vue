<template>
  <div class="app-root">
    <NuxtRouteAnnouncer />
    <SiteHeader />
    <main>
      <NuxtPage />
    </main>
    <!-- 旧版宣传页页脚，注释保留备用；现统一使用 zcyp-web 的 PortalFooter 页脚 -->
    <!-- <SiteFooter /> -->
    <PortalFooter />
    <FloatingActions />
  </div>
</template>
