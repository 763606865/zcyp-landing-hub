<script setup lang="ts">
type ProductValue = 1 | 2 | 3 | 99
type FieldName = 'name' | 'phone' | 'company_name' | 'product' | 'content'

const route = useRoute()
const config = useRuntimeConfig()
const source = useCampaignSource()
const contactApiUrl = `${config.public.apiBaseUrl.replace(/\/+$/, '')}/cms/contact-inquiries`
const products = [
  { value: 1 as ProductValue, label: '招聘服务' },
  { value: 2 as ProductValue, label: '校园招聘' },
  { value: 3 as ProductValue, label: '人才服务' },
  { value: 99 as ProductValue, label: '其他' },
]

const normalizeProduct = (value: unknown): ProductValue => {
  const raw = Array.isArray(value) ? value[0] : value
  const number = Number(raw)
  return [1, 2, 3, 99].includes(number) ? number as ProductValue : 99
}

const form = reactive({
  name: '',
  company_name: '',
  phone: '',
  product: 99 as ProductValue,
  content: '',
  consent: false,
})
const errors = reactive<Partial<Record<FieldName | 'consent' | 'form', string>>>({})
const submitting = ref(false)
const success = ref(false)
const submittedAt = ref('')

onMounted(() => {
  form.product = normalizeProduct(route.query.product)
})

watch(() => route.query.product, value => {
  form.product = normalizeProduct(value)
})

useSeoMeta({
  title: '联系我们｜获取产品方案',
  description: '提交您的业务需求，我们的产品顾问将尽快与您联系，为您提供合适的产品与服务方案。',
  robots: 'noindex,follow',
})
useHead({
  link: [{ rel: 'canonical', href: new URL('/contact', config.public.siteUrl).href }],
})

const clearErrors = () => Object.keys(errors).forEach(key => delete errors[key as keyof typeof errors])

const validate = () => {
  clearErrors()
  if (form.name.trim().length < 2) errors.name = '请输入至少 2 个字符的姓名或称呼'
  if (!/^1[3-9]\d{9}$/.test(form.phone)) errors.phone = '请输入正确的中国大陆手机号'
  if (form.company_name.trim().length > 150) errors.company_name = '公司名称不能超过 150 个字符'
  if (!products.some(item => item.value === form.product)) errors.product = '请选择咨询产品'
  const contentLength = form.content.trim().length
  if (contentLength < 10) errors.content = '请至少输入 10 个字符的咨询内容'
  if (contentLength > 5000) errors.content = '咨询内容不能超过 5000 个字符'
  if (!form.consent) errors.consent = '请先同意隐私政策'
  return !Object.keys(errors).length
}

const submit = async () => {
  if (submitting.value || !validate()) return
  submitting.value = true
  success.value = false

  try {
    const response = await $fetch<{ code: number, data?: { submitted_at?: string } }>(contactApiUrl, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: {
        name: form.name.trim(),
        phone: form.phone,
        company_name: form.company_name.trim() || null,
        source: source.value || null,
        product: form.product,
        content: form.content.trim(),
      },
    })

    if (response.code !== 200) throw new Error('提交失败')
    submittedAt.value = response.data?.submitted_at || ''
    success.value = true
    form.name = ''
    form.company_name = ''
    form.phone = ''
    form.content = ''
    form.consent = false
  } catch (error: any) {
    const status = error?.statusCode || error?.status || error?.response?.status
    const data = error?.data || error?.response?._data

    if (status === 422 && data?.errors) {
      for (const [field, messages] of Object.entries(data.errors)) {
        if (['name', 'phone', 'company_name', 'product', 'content'].includes(field)) {
          errors[field as FieldName] = Array.isArray(messages) ? String(messages[0]) : String(messages)
        }
      }
      errors.form = '请检查填写内容后重新提交'
    } else if (status === 429) {
      errors.form = '提交过于频繁，请稍后再试'
    } else {
      errors.form = '暂时无法提交，请稍后重试或直接联系我们'
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="contact-page">
    <section class="contact-showcase">
      <div class="contact-showcase-inner">
        <NuxtLink class="contact-back" to="/">← 返回产品中心</NuxtLink>
        <div class="contact-showcase-copy">
          <p class="contact-kicker">一对一产品咨询</p>
          <h1>让合适的产品，<br>更快解决业务问题</h1>
          <p>专业顾问将在收到需求后尽快联系您，为您梳理场景、介绍产品并提供针对性建议。</p>
        </div>
        <div class="contact-benefits">
          <div><span>01</span><b>专属顾问</b><small>一对一需求沟通</small></div>
          <div><span>02</span><b>场景分析</b><small>聚焦实际业务问题</small></div>
          <div><span>03</span><b>方案建议</b><small>匹配合适产品服务</small></div>
        </div>
        <div class="contact-art" aria-hidden="true">
          <div class="orbit orbit-one" /><div class="orbit orbit-two" />
          <div class="art-platform"><span>PRODUCT</span><strong>SOLUTION</strong><small>产品 · 场景 · 服务</small></div>
          <div class="art-chip chip-one">需求洞察</div><div class="art-chip chip-two">持续服务</div><div class="art-chip chip-three">快速响应</div>
        </div>
        <p class="contact-showcase-note">一次提交，开启更高效的产品沟通</p>
      </div>
    </section>

    <section class="contact-form-panel">
      <div class="contact-form-wrap">
        <p class="form-eyebrow">CONTACT US</p>
        <h2>获取产品方案</h2>
        <p class="form-intro">完善信息后，产品顾问会尽快与您联系。</p>

        <div v-if="success" class="form-success" role="status">
          <span>✓</span>
          <div><b>提交成功</b><p>我们已收到您的需求，会尽快与您联系。<small v-if="submittedAt">提交时间：{{ submittedAt }}</small></p></div>
        </div>

        <form v-else novalidate @submit.prevent="submit">
          <div class="form-field">
            <label for="contact-name">姓名 <em>*</em></label>
            <input id="contact-name" v-model="form.name" name="name" autocomplete="name" maxlength="50" placeholder="请输入您的姓名或称呼">
            <small v-if="errors.name" class="field-error">{{ errors.name }}</small>
          </div>
          <div class="form-field">
            <label for="contact-company">公司名称</label>
            <input id="contact-company" v-model="form.company_name" name="company_name" autocomplete="organization" maxlength="150" placeholder="请输入公司名称（选填）">
            <small v-if="errors.company_name" class="field-error">{{ errors.company_name }}</small>
          </div>
          <div class="form-field">
            <label for="contact-phone">手机号 <em>*</em></label>
            <input id="contact-phone" v-model.trim="form.phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel" maxlength="11" placeholder="请输入 11 位手机号">
            <small v-if="errors.phone" class="field-error">{{ errors.phone }}</small>
          </div>
          <div class="form-field">
            <label for="contact-product">咨询产品 <em>*</em></label>
            <div class="select-wrap">
              <select id="contact-product" v-model="form.product" name="product">
                <option v-for="item in products" :key="item.value" :value="item.value">{{ item.label }}</option>
              </select>
            </div>
            <small v-if="errors.product" class="field-error">{{ errors.product }}</small>
          </div>
          <div class="form-field">
            <label for="contact-content">咨询内容 <em>*</em></label>
            <textarea id="contact-content" v-model="form.content" name="content" minlength="10" maxlength="5000" rows="4" placeholder="请简单描述您的需求、业务场景或希望了解的问题（至少 10 个字符）" />
            <div class="content-count">{{ form.content.length }} / 5000</div>
            <small v-if="errors.content" class="field-error">{{ errors.content }}</small>
          </div>
          <label class="consent-row">
            <input v-model="form.consent" type="checkbox">
            <span>我已阅读并同意 <NuxtLink to="/privacy" target="_blank">《隐私政策》</NuxtLink></span>
          </label>
          <small v-if="errors.consent" class="field-error consent-error">{{ errors.consent }}</small>
          <div v-if="errors.form" class="form-error" role="alert">{{ errors.form }}</div>
          <button class="contact-submit" type="submit" :disabled="submitting">
            <span v-if="submitting" class="submit-spinner" aria-hidden="true" />
            {{ submitting ? '正在提交…' : '提交咨询' }}
          </button>
          <p class="form-safe-note">您的信息仅用于本次产品咨询，我们会妥善保护。</p>
        </form>
      </div>
    </section>
  </div>
</template>
