<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'

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
  '/scoreAnalysis': 14,
  '/skillCert': 15,
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
  { to: '/questionBank', label: '题库共建' },
  { to: '/question', label: '题库系统' },
  { to: '/onlineTest', label: '在线笔试' },
  { to: '/computerService', label: '机考服务' },
]
const moreNav = [
  { to: '/aiInterview', label: 'AI面试' },
  { to: '/antiCheating', label: 'AI考务安全智能体' },
  { to: '/paperlessInterview', label: '无纸化面试评分' },
  { to: '/scoreAnalysis', label: '成绩分析系统' },
  { to: '/niupai', label: 'HRS牛派系统' },
  { to: '/skillCert', label: '职业技能鉴定' },
]

const moreOpen = ref(false)
// 当前路由在"更多"内时，"更多"按钮高亮
const moreActive = computed(() => moreNav.some(i => i.to === route.path))

// 点击面板外任意位置关闭下拉
const onDocClick = () => { moreOpen.value = false }
onMounted(() => { document.addEventListener('click', onDocClick) })
onBeforeUnmount(() => { document.removeEventListener('click', onDocClick) })

// ===== 移动端抽屉导航（仅移动端使用，桌面端汉堡与抽屉均 display:none，不受影响）=====
const mobileOpen = ref(false)
// 抽屉打开时锁定背景滚动
watch(mobileOpen, (open) => {
  if (typeof document === 'undefined') return
  document.documentElement.style.overflow = open ? 'hidden' : ''
})
// 路由切换后自动关闭抽屉
watch(() => route.path, () => { mobileOpen.value = false })
onBeforeUnmount(() => {
  if (typeof document !== 'undefined') document.documentElement.style.overflow = ''
})
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
          <img class="tel-icon" src="/assets/images/link-phone.png" alt="" width="24" height="24">
          <span>400-825-1513</span>
          <span class="tel-wave" aria-hidden="true"><i></i><i></i><i></i></span>
        </div>
        <NuxtLink class="button button-small" :to="contactRoute">获取方案</NuxtLink>
      </div>
      <button
        type="button"
        class="nav-burger"
        :class="{ open: mobileOpen }"
        :aria-expanded="mobileOpen"
        aria-label="打开菜单"
        @click="mobileOpen = !mobileOpen"
      >
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- 移动端抽屉导航：Teleport 到 body，规避 .site-header 的 backdrop-filter 对 fixed 定位的包含块影响 -->
    <Teleport to="body">
      <div class="nav-drawer-mask" :class="{ show: mobileOpen }" @click="mobileOpen = false"></div>
      <aside class="nav-drawer" :class="{ open: mobileOpen }" aria-label="移动端导航">
        <div class="nav-drawer-head">
          <span>导航菜单</span>
          <button type="button" class="nav-drawer-close" aria-label="关闭菜单" @click="mobileOpen = false">&times;</button>
        </div>
        <nav class="nav-drawer-list">
          <NuxtLink
            v-for="item in primaryNav"
            :key="item.to"
            :to="item.to"
            :class="{ 'nav-drawer-active': item.to === route.path }"
            @click="mobileOpen = false"
          >{{ item.label }}</NuxtLink>
          <span class="nav-drawer-label">更多</span>
          <NuxtLink
            v-for="item in moreNav"
            :key="item.to"
            :to="item.to"
            :class="{ 'nav-drawer-active': item.to === route.path }"
            @click="mobileOpen = false"
          >{{ item.label }}</NuxtLink>
        </nav>
        <div class="nav-drawer-foot">
          <a class="nav-drawer-tel" href="tel:400-825-1513">
            <img class="tel-icon" src="/assets/images/link-phone.png" alt="" width="22" height="22">
            <span>400-825-1513</span>
            <span class="tel-wave" aria-hidden="true"><i></i><i></i><i></i></span>
          </a>
          <NuxtLink class="button nav-drawer-cta" :to="contactRoute" @click="mobileOpen = false">获取方案</NuxtLink>
        </div>
      </aside>
    </Teleport>
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
.nav-actions { display: flex; align-items: center; gap: 22px; }
.nav-contact {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 17px; color: #3370FF; font-weight: 600;
  letter-spacing: .01em;
}
.nav-contact img {
  width: 24px; height: 24px;
  object-fit: contain; display: block;
}

/* ===== 电话 icon 铃声摆动 + 号码右上角音波 ===== */
.nav-contact, .nav-drawer-tel { position: relative; }

.tel-icon {
  transform-origin: 50% 50%;
  animation: tel-ring 2.1s ease-in-out infinite;
}
@keyframes tel-ring {
  0%, 52%   { transform: rotate(0); }
  56%       { transform: rotate(18deg); }
  60%       { transform: rotate(-16deg); }
  64%       { transform: rotate(13deg); }
  68%       { transform: rotate(-10deg); }
  72%       { transform: rotate(7deg); }
  76%       { transform: rotate(-4deg); }
  80%, 100% { transform: rotate(0); }
}

/* 右上角蝙蝠声波：三层同心弧（圆心落在号码右上角），波次由内向外扩散 */
.tel-wave {
  position: absolute; top: 5px; right: -2px; z-index: 1;
  width: 0; height: 0; pointer-events: none;
}
.tel-wave i {
  position: absolute; left: 0; bottom: 0;
  border: 1.5px solid #3370FF;
  border-radius: 50%;
  /* 只保留右上 1/4 圆弧，弧口朝右上向外发散 */
  border-color: #3370FF #3370FF transparent transparent;
  opacity: .5;
  animation: tel-wave 1.6s ease-out infinite;
}
.tel-wave i:nth-child(1) { width: 8px;  height: 8px;  margin: 0 0 -4px -4px;   animation-delay: 0s; }
.tel-wave i:nth-child(2) { width: 13px; height: 13px; margin: 0 0 -6.5px -6.5px; animation-delay: .25s; }
.tel-wave i:nth-child(3) { width: 18px; height: 18px; margin: 0 0 -9px -9px;   animation-delay: .5s; }
@keyframes tel-wave {
  0%   { transform: scale(.72); opacity: .18; }
  35%  { opacity: .95; }
  100% { transform: scale(1.12); opacity: .22; }
}

@media (prefers-reduced-motion: reduce) {
  .tel-icon, .tel-wave i { animation: none; }
}

/* ===== 移动端汉堡按钮 + 右侧抽屉 =====
   默认（桌面端）全部隐藏，不影响 web 端任何样式与行为 */
.nav-burger { display: none; }
.nav-drawer-mask { display: none; }
.nav-drawer { display: none; }

@media (max-width: 850px) {
  /* 隐藏横排导航与右侧操作区，改用汉堡 */
  .site-header .nav-wrap nav { display: none; }
  .nav-actions { display: none; }

  .nav-burger {
    display: inline-flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 5px; width: 44px; height: 44px; padding: 0; margin-right: -6px;
    border: 0; background: transparent; cursor: pointer;
  }
  .nav-burger span {
    display: block; width: 22px; height: 2px; border-radius: 2px;
    background: var(--ink); transition: transform .28s ease, opacity .2s ease;
  }
  .nav-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-burger.open span:nth-child(2) { opacity: 0; }
  .nav-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* 半透明遮罩（层级需高于悬浮底栏 FloatingActions 的 1000） */
  .nav-drawer-mask {
    display: block; position: fixed; inset: 0; z-index: 1060;
    background: rgba(16, 25, 21, .45);
    opacity: 0; visibility: hidden;
    transition: opacity .3s ease, visibility .3s;
  }
  .nav-drawer-mask.show { opacity: 1; visibility: visible; }

  /* 右侧滑入面板 */
  .nav-drawer {
    display: flex; flex-direction: column;
    position: fixed; top: 0; right: 0; bottom: 0; z-index: 1070;
    width: min(82vw, 340px);
    background: #f6f7f2;
    box-shadow: -12px 0 40px rgba(16, 25, 21, .18);
    transform: translateX(100%);
    transition: transform .32s cubic-bezier(.4, 0, .2, 1);
    overflow: hidden;
  }
  .nav-drawer.open { transform: translateX(0); }

  .nav-drawer-head {
    display: flex; align-items: center; justify-content: space-between;
    flex: none; padding: 18px 20px;
    border-bottom: 1px solid rgba(23, 34, 30, .08);
    font-size: 15px; font-weight: 800; color: var(--ink);
  }
  .nav-drawer-close {
    width: 32px; height: 32px; border: 0; border-radius: 8px;
    background: transparent; font-size: 26px; line-height: 1;
    color: var(--muted); cursor: pointer;
  }
  .nav-drawer-close:active { background: rgba(23, 34, 30, .06); }

  .nav-drawer-list {
    display: flex; flex-direction: column; gap: 2px;
    flex: 1; padding: 12px 12px 20px;
    overflow-y: auto; -webkit-overflow-scrolling: touch;
  }
  .nav-drawer-list a {
    padding: 13px 14px; border-radius: 10px;
    font-size: 15px; font-weight: 600; color: var(--ink);
    transition: background .15s ease, color .15s ease;
  }
  .nav-drawer-list a:active { background: rgba(14, 124, 102, .1); }
  .nav-drawer-list a.nav-drawer-active { color: var(--green); background: rgba(14, 124, 102, .08); }
  .nav-drawer-label {
    margin: 14px 14px 4px; font-size: 12px; font-weight: 700;
    letter-spacing: .1em; color: var(--muted);
  }

  .nav-drawer-foot {
    display: flex; flex-direction: column; gap: 14px; flex: none;
    padding: 16px 20px calc(20px + env(safe-area-inset-bottom));
    border-top: 1px solid rgba(23, 34, 30, .08);
  }
  .nav-drawer-tel {
    display: inline-flex; align-items: center; gap: 8px;
    /* 收缩包裹内容，保证声波锚定在号码右上角而非整行右上角 */
    align-self: flex-start;
    font-size: 17px; font-weight: 700; color: #3370FF;
  }
  .nav-drawer-tel img { width: 22px; height: 22px; object-fit: contain; display: block; }
  .nav-drawer-cta { width: 100%; }
}
</style>
