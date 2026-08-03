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

## 咨询表单

咨询页面地址为 `/contact`，支持通过查询参数自动回填和记录推广来源：

```text
/contact?product=2&source=zcyp-web
```

- `product`：`1` 招聘服务、`2` 校园招聘、`3` 人才服务、`99` 其他
- `source`：最长 100 个字符，不在表单中显示；首次访问后保存 30 天，并随咨询请求提交

表单使用 `NUXT_PUBLIC_API_BASE_URL` 作为后端 API 根地址，并自动拼接 `/cms/contact-inquiries`。例如根地址为 `https://api.example.com` 时，最终请求地址为 `https://api.example.com/cms/contact-inquiries`。变量留空时默认请求当前域名下的接口；前后端不同域名时，后端需允许推广站域名跨域访问。

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
