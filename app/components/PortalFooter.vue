<script setup lang="ts">
import { portalFooterContact, portalFooterGroups, portalFooterRecord } from '~/data/footer'

// 与 zcyp-web 的 PortalFooter 保持统一：站内路由用 NuxtLink 站内跳转，站外链接新窗口打开
function isExternalLink(href: string) {
  return href.startsWith('http://') || href.startsWith('https://')
}
</script>

<template>
  <footer class="portal-footer">
    <div class="portal-container portal-footer-main">
      <section v-for="group in portalFooterGroups" :key="group.title || 'more'" class="portal-footer-links">
        <h3 v-if="group.title">
          {{ group.title }}
        </h3>
        <div v-else class="portal-footer-spacer" />
        <template v-for="link in group.links" :key="link.label">
          <NuxtLink v-if="!isExternalLink(link.href)" :to="link.href">
            {{ link.label }}
          </NuxtLink>
          <a
            v-else
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
          >{{ link.label }}</a>
        </template>
      </section>

      <section class="portal-footer-qrcode">
        <h3>{{ portalFooterContact.qrTitle }}</h3>
        <img class="portal-footer-qr" :src="portalFooterContact.qrCode" :alt="`${portalFooterContact.qrTitle}二维码`">
        <div class="portal-footer-contact">
          <h3>{{ portalFooterContact.label }}</h3>
          <a v-for="phone in portalFooterContact.phones" :key="phone" :href="`tel:${phone}`">
            {{ phone }}
          </a>
          <a :href="`mailto:${portalFooterContact.email}`">
            {{ portalFooterContact.email }}
          </a>
        </div>
      </section>
    </div>

    <div class="portal-footer-record">
      <div class="portal-container">
        <span>{{ portalFooterRecord.icpNo }}</span>
        <span>{{ portalFooterRecord.publicSecurityNo }}</span>
        <span>{{ portalFooterRecord.siteName }} 版权所有</span>
        <span>{{ portalFooterRecord.humanResourceLicense }}</span>
        <span>{{ portalFooterRecord.recruitPhone }}</span>
      </div>
    </div>

    <!-- 友情链接栏（与 zcyp-web 页脚一致，数据源自 CMS friendLinks 接口；宣传页无后端数据源暂不渲染，接入后启用下方结构即可）
    <div v-if="friendLinks.length" class="portal-footer-record">
      <div class="portal-container">
        <a
          v-for="link in friendLinks"
          :key="link.id"
          :href="link.url"
          :target="link.target === 2 ? '_blank' : '_self'"
          rel="noopener noreferrer"
        >
          <img v-if="link.logo" :src="link.logo" :alt="link.name" class="portal-friend-link-logo">
          <span v-else>{{ link.name }}</span>
        </a>
      </div>
    </div>
    -->
  </footer>
</template>

<style scoped>
/* 统一页脚样式（与 zcyp-web/app/styles/main.css 的 portal-footer 样式保持一致） */
.portal-container {
  width: min(1200px, calc(100vw - 32px));
  margin-inline: auto;
}

.portal-footer {
  background: #fff;
}

.portal-footer-main {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 34px;
  padding: 38px 0 36px;
}

.portal-footer h3 {
  margin: 0 0 14px;
  color: #343943;
  font-size: 14px;
  font-weight: 800;
}

.portal-footer-links,
.portal-footer-qrcode {
  min-width: 0;
}

.portal-footer-links a,
.portal-footer-contact a {
  display: block;
  margin: 0 0 10px;
  color: #777f8b;
  font-size: 13px;
  line-height: 1.5;
  text-decoration: none;
}

.portal-footer-links a:hover,
.portal-footer-contact a:hover {
  color: #1890ff;
}

.portal-footer-contact {
  margin-top: 14px;
}

.portal-footer-contact h3 {
  margin: 0 0 10px;
}

.portal-footer-spacer {
  height: 32px;
}

.portal-footer-qr {
  display: block;
  margin: 0 auto;
  width: 86px;
  height: 86px;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #d9dde5;
  border-radius: 4px;
  object-fit: cover;
}

.portal-footer-record {
  border-top: 1px solid #edf0f4;
  padding: 13px 0 20px;
  color: #8c939d;
  font-size: 11px;
  text-align: center;
}

.portal-footer-record .portal-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px 10px;
}

.portal-footer-record a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #8c939d;
  font-size: 12px;
  text-decoration: none;
}

.portal-footer-record a:hover {
  color: #1890ff;
}

.portal-friend-link-logo {
  display: block;
  width: auto;
  max-height: 20px;
  object-fit: contain;
}

@media (max-width: 1023px) {
  .portal-container {
    width: min(100% - 24px, 760px);
  }

  .portal-footer-main {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px 24px;
    padding: 28px 0;
  }

  .portal-footer-qrcode {
    grid-column: 1 / -1;
  }

  .portal-footer-qrcode .portal-footer-contact {
    text-align: center;
  }
}
</style>
