<script setup lang="ts">
import { computed } from 'vue'
import { getContactRoute, useCampaignSource } from '../composables/useCampaignSource'

// @ts-ignore
const route = useRoute()
const source = useCampaignSource()

// 获取方案页（/contact）不展示悬浮按钮，移动端由 CSS 断点隐藏
const visible = computed(() => route.path !== '/contact')

const contactRoute = computed(() => getContactRoute(undefined, source.value))

const scrollToTop = () => {
  if (typeof window === 'undefined') return
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
}
</script>

<template>
  <aside v-if="visible" class="floating-actions" aria-label="快捷操作">
    <div class="fa-panel">
      <div class="fa-item fa-wechat" tabindex="0">
        <span class="fa-icon">
          <img class="fa-icon-normal" src="/assets/images/home/wx-icon.png" alt="" width="24" height="24">
          <img class="fa-icon-act" src="/assets/images/home/wx-icon-act.png" alt="" width="24" height="24">
        </span>
        <span class="fa-label">微信咨询</span>
        <div class="fa-qrcode" role="tooltip">
          <img src="/assets/images/home/wx-qrcode.png" alt="微信咨询二维码" width="120" height="120">
          <p>微信扫码咨询</p>
        </div>
      </div>

      <div class="line"></div>

      <a class="fa-item" href="tel:400-825-1513" aria-label="电话咨询">
        <span class="fa-icon">
          <img class="fa-icon-normal" src="/assets/images/home/phone-icon.png" alt="" width="24" height="24">
          <img class="fa-icon-act" src="/assets/images/home/phone-icon-act.png" alt="" width="24" height="24">
        </span>
        <span class="fa-label">电话咨询</span>
      </a>
      
      <div class="line"></div>

      <NuxtLink class="fa-item" :to="contactRoute" aria-label="意见反馈">
        <span class="fa-icon">
          <img class="fa-icon-normal" src="/assets/images/home/opinion-icon.png" alt="" width="24" height="24">
          <img class="fa-icon-act" src="/assets/images/home/opinion-icon-act.png" alt="" width="24" height="24">
        </span>
        <span class="fa-label">意见反馈</span>
      </NuxtLink>
    </div>

    <button class="fa-item fa-to-top" type="button" aria-label="返回顶部" @click="scrollToTop">
      <span class="fa-icon">
        <img class="fa-icon-normal" src="/assets/images/home/top-icon.png" alt="" width="32" height="32">
        <img class="fa-icon-act" src="/assets/images/home/top-icon-act.png" alt="" width="32" height="32">
      </span>
    </button>
  </aside>
</template>

<style scoped>
/* ===== 右下角悬浮按钮：固定在视口，距右 21、距底 32，上下两部分间距 16 ===== */
.floating-actions {
  position: fixed;
  right: 21px;
  bottom: 32px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.fa-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64px;
  padding: 18px 5px;
  background: #fff;
  border-radius: 100px;
  box-shadow: 0px 1px 8px 0px rgba(0,0,0,0.1);
}
.line {
  width: 100%;
  height: 1px;
  background: #E0E0E0;
  margin: 16px 0 ;
}

.fa-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  text-decoration: none;
  cursor: pointer;
}

.fa-icon {
  position: relative;
  width: 24px;
  height: 24px;
}

/* 下部置顶图标为 32×32 */
.fa-to-top .fa-icon {
  width: 32px;
  height: 32px;
}

.fa-icon img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  transition: opacity .2s;
}

.fa-icon-act { opacity: 0; }

.fa-label {
  font-size: 11px;
  line-height: 1;
  color: #808080;
  transition: color .2s;
}

/* 悬浮 / 按下高亮：图标切换 -act 图、文字变蓝 */
.fa-item:hover .fa-icon-normal,
.fa-item:active .fa-icon-normal,
.fa-item:focus-visible .fa-icon-normal { opacity: 0; }

.fa-item:hover .fa-icon-act,
.fa-item:active .fa-icon-act,
.fa-item:focus-visible .fa-icon-act { opacity: 1; }

.fa-item:hover .fa-label,
.fa-item:active .fa-label,
.fa-item:focus-visible .fa-label { color: #0F62FE; }

/* 下部：置顶按钮 */
.fa-to-top {
  padding: 16px;
  background: #fff;
  border-radius: 100px;
  box-shadow: 0px 1px 8px 0px rgba(0,0,0,0.1);
}

/* ===== 微信二维码卡片：悬浮微信咨询时在左侧弹出 ===== */
.fa-qrcode {
  position: absolute;
  right: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%) translateX(6px);
  padding: 12px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, .12);
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity .2s, transform .2s, visibility .2s;
  pointer-events: none;
}

.fa-qrcode img {
  display: block;
  width: 120px;
  height: 120px;
}

.fa-qrcode p {
  margin: 8px 0 0;
  font-size: 11px;
  line-height: 1;
  color: #808080;
  white-space: nowrap;
}

.fa-wechat:hover .fa-qrcode,
.fa-wechat:focus-within .fa-qrcode {
  opacity: 1;
  visibility: visible;
  transform: translateY(-50%) translateX(0);
}

/* 移动端不展示（与全站 850px 断点一致） */
@media (max-width: 850px) {
  .floating-actions { display: none; }
}
</style>
