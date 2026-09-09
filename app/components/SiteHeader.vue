<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

// @ts-ignore
const route = useRoute()
// @ts-ignore
const source = useCampaignSource()

const routeProductMap: Record<string, number> = {
  // '/hr': 1,
  '/aiproposition': 2,
  '/marking': 3,
  '/escort': 4,
  '/niupai': 5,
  '/questionBank': 6,
  '/question': 7,
  '/aiInterview': 8,
  '/computerService': 9,
  '/onlineTest': 10,
  '/antiCheating': 11,
  '/paperlessInterview': 13,
}
const contactRoute = computed(() => {
  const product = routeProductMap[route.path]
  return getContactRoute(product, source.value)
})

// 前 5 项直接展示，后 5 项折叠到"更多"下拉
const primaryNav = [
  { to: '/', label: '命题服务' },
  { to: '/marking', label: '阅卷服务' },
  { to: '/escort', label: '制卷与押运' },
  { to: '/niupai', label: '牛派系统' },
  { to: '/questionBank', label: '共享题库中心' },
  { to: '/question', label: '题库系统' },
  { to: '/aiInterview', label: 'AI面试' },
]
const moreNav = [
  { to: '/computerService', label: '机考服务' },
  { to: '/onlineTest', label: '在线笔试' },
  { to: '/antiCheating', label: 'AI考务安全智能体' },
  { to: '/paperlessInterview', label: '无纸化面试评分' },
]

const moreOpen = ref(false)
// 当前路由在"更多"内时，"更多"按钮高亮
const moreActive = computed(() => moreNav.some(i => i.to === route.path))

// 点击面板外任意位置关闭下拉
const onDocClick = () => { moreOpen.value = false }
onMounted(() => { document.addEventListener('click', onDocClick) })
onBeforeUnmount(() => { document.removeEventListener('click', onDocClick) })
</script>

<template>
  <header class="site-header">
    <div class="container nav-wrap">
      <a class="brand" href="https://zcyp-web.jxhrm.com" target="_blank" rel="noopener noreferrer" aria-label="中测易聘">
        <img src="/assets/images/hub-logo.png" alt="Logo" class="brand-logo">
      </a>
      <nav aria-label="主导航">
        <NuxtLink v-for="item in primaryNav" :key="item.to" :to="item.to">{{ item.label }}</NuxtLink>
        <div
          class="nav-more"
          :class="{ open: moreOpen }"
          @mouseenter="moreOpen = true"
          @mouseleave="moreOpen = false"
          @click.stop
        >
          <button
            type="button"
            class="nav-more-trigger"
            :class="{ active: moreActive }"
            :aria-expanded="moreOpen"
            aria-haspopup="true"
            @click="moreOpen = !moreOpen"
          >
            <span>更多</span>
            <svg class="nav-more-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <div class="nav-more-panel" role="menu">
            <NuxtLink
              v-for="item in moreNav"
              :key="item.to"
              :to="item.to"
              role="menuitem"
              @click="moreOpen = false"
            >{{ item.label }}</NuxtLink>
          </div>
        </div>
      </nav>
      <div class="nav-actions">
        <div class="nav-contact" aria-label="客服电话">
          <img src="/assets/images/link-phone.png" alt="" width="24" height="24">
          <span>400-825-1513</span>
        </div>
        <NuxtLink class="button button-small" :to="contactRoute">获取方案</NuxtLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* nav 内部对齐 & "更多"下拉 */
.site-header nav { align-items: center; }
.nav-more { position: relative; display: inline-flex; align-items: center; }
.nav-more-trigger {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 0; border: 0; background: transparent;
  color: inherit; font: inherit; line-height: 1;
  cursor: pointer;
}
.nav-more-trigger:hover,
.nav-more-trigger.active { color: var(--green); }
.nav-more-arrow { transition: transform .18s ease; }
.nav-more.open .nav-more-arrow { transform: rotate(180deg); }

.nav-more-panel {
  position: absolute; top: calc(100% + 8px); left: 0;
  min-width: 180px; padding: 8px;
  background: #fff; border-radius: 12px;
  box-shadow: 0 12px 30px rgba(23, 34, 30, .12);
  opacity: 0; visibility: hidden;
  transform: translateY(-4px);
  transition: opacity .18s ease, transform .18s ease, visibility .18s;
  z-index: 30;
}
.nav-more.open .nav-more-panel {
  opacity: 1; visibility: visible;
  transform: translateY(0);
}
/* 透明桥接层，避免鼠标从触发器移到面板经过 8px 间隙时误触 mouseleave */
.nav-more-panel::before {
  content: ''; position: absolute;
  top: -10px; left: 0; right: 0; height: 10px;
}
.nav-more-panel a {
  display: block; padding: 10px 14px;
  border-radius: 8px; color: var(--ink);
  font-size: 14px; font-weight: 600;
  white-space: nowrap;
  transition: background .15s ease, color .15s ease;
}
.nav-more-panel a:hover {
  background: rgba(23, 34, 30, .05);
  color: var(--green);
}

/* 右侧联系方式 + 获取方案 */
.nav-actions { display: flex; align-items: center; gap: 18px; }
.nav-contact {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 17px; color: #3370FF; font-weight: 600;
  letter-spacing: .01em;
}
.nav-contact img {
  width: 24px; height: 24px;
  object-fit: contain; display: block;
}

/* 响应式：≤850px 时覆盖全局 .nav-wrap nav{display:none}，保留 5+"更多"结构 */
@media (max-width: 850px) {
  .site-header .nav-wrap nav { display: flex; gap: 12px; font-size: 13px; }
  .nav-actions { gap: 12px; }
}
@media (max-width: 560px) {
  .site-header .nav-wrap nav { gap: 8px; font-size: 12px; }
  .nav-more-panel { min-width: 160px; }
}
</style>
