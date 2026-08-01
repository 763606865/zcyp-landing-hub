# 企业产品推广集合页

基于 Nuxt 构建的企业产品推广站，支持 SSG 静态输出，适合部署到对象存储、CDN、静态托管平台或传统 Web 服务器。

项目固定使用 Rollup 的官方 WASM 构建，以兼容 CentOS 7 等 glibc 版本较低的构建服务器。

## 本地开发

```bash
pnpm install
pnpm dev
```

## 修改内容

- 品牌名称、联系方式：`app/components/SiteHeader.vue`、`app/components/SiteFooter.vue`
- 首页文案：`app/pages/index.vue`
- 产品名称、介绍、能力与场景：`app/data/products.ts`
- 视觉样式：`app/assets/css/main.css`

示例产品数据及效果指标仅用于展示，上线前请替换为企业真实、可验证的信息。

## SSG 静态打包

复制环境变量模板并填写推广站正式域名：

```bash
cp .env.example .env
```

执行静态生成：

```bash
pnpm generate
```

产物输出到 `.output/public`，将该目录完整部署即可。正式域名用于生成 canonical、结构化数据、robots.txt 和 sitemap.xml。

本地预览静态产物：

```bash
npx serve .output/public
```
