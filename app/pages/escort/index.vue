<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 导航标签
const navTabs = [
    { label: '服务介绍', target: 'service' },
    { label: '联系我们', target: 'contact' },
]
const activeNav = ref('service')

// 滚动到指定区域
const scrollToSection = (target: string) => {
    const el = document.getElementById(`escort-${target}`)
    if (el) {
        const headerOffset = 60
        const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
    }
}

// 滚动时更新激活导航
const handleScroll = () => {
    const sections = navTabs.map(t => document.getElementById(`escort-${t.target}`))
    const scrollY = window.scrollY + 120
    for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i]
        const tab = navTabs[i]
        if (sec && tab && sec.offsetTop <= scrollY) {
            activeNav.value = tab.target
            break
        }
    }
}

// 滚动动画
const escortSection = ref<HTMLElement>()
const observerOptions = { threshold: 0.12 }

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    if (escortSection.value) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('escort-visible')
                    observer.unobserve(entry.target)
                }
            })
        }, observerOptions)
        escortSection.value.querySelectorAll('.escort-animate').forEach(el => {
            observer.observe(el as HTMLElement)
        })
    }
})

// ===================== 移动端（≤1024px）专用逻辑 =====================
// web 端根节点 .escort-page 的模板 / 样式 / 脚本保持零改动；
// 以下状态与副作用仅供移动根节点 .esm-page 使用，与桌面端互不干扰。
const esmSection = ref<HTMLElement>()
const esmActiveNav = ref('service')

// 滚动时高亮当前区块（仅 2 个 tab，无需横滑滚入可视区）
const esmHandleScroll = () => {
    let current = navTabs[0]?.target ?? 'service'
    const y = window.scrollY + 140
    for (let i = navTabs.length - 1; i >= 0; i--) {
        const tab = navTabs[i]
        const el = tab ? document.getElementById(`esm-${tab.target}`) : null
        if (tab && el && el.getBoundingClientRect().top + window.scrollY <= y) {
            current = tab.target
            break
        }
    }
    esmActiveNav.value = current
}

onMounted(() => {
    window.addEventListener('scroll', esmHandleScroll, { passive: true })
    if (esmSection.value) {
        const esmObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('esm-visible')
                    esmObserver.unobserve(entry.target)
                }
            })
        }, { threshold: 0.1 })
        esmSection.value.querySelectorAll('.esm-animate').forEach(el => {
            esmObserver.observe(el as HTMLElement)
        })
    }
})
</script>

<template>
    <div ref="escortSection" class="escort-page">
        <!-- ========== Banner ========== -->
        <section class="escort-banner">
            <div class="escort-banner-container">
                <div class="escort-banner-bg">
                    <img src="/assets/images/escort/banner-bg.png" alt="" class="escort-banner-bg-img" />
                </div>
                <div class="escort-banner-content container-escort">
                    <span class="escort-badge">国家乙级涉密资质 · 公安部安保认证</span>
                    <h1 class="escort-banner-title">保密制卷<span style="color: #1A1A2E;">与<br />安保押运服务</span></h1>
                    <p class="escort-banner-desc comm-indent">
                        中测高科拥有国家秘密载体印制乙级资质、安保资质和信息安全认证三级等资质与企业级信息安全认证，自有安保团队，提供从试卷保密印刷、安全押运到阅卷交付的全流程服务，在全国建设有8大交付中心，覆盖全国32个省市，保障每一次考试交付的高效安全与公正。
                    </p>
                    <div class="escort-banner-actions">
                        <NuxtLink class="escort-banner-btn escort-banner-btn-primary" to="/contact?product=4">
                            <img src="/assets/images/marking/phone-btn.png" alt="" class="escort-btn-icon" />
                            预约咨询
                        </NuxtLink>
                        <NuxtLink class="escort-banner-btn escort-banner-btn-ghost" to="/contact?product=4">
                            了解服务
                            <img src="/assets/images/marking/system-btn.png" alt="" class="escort-btn-icon" />
                        </NuxtLink>
                    </div>
                </div>
                <!-- 统计卡片 -->
                <div class="escort-stats-bar container-escort">
                    <div class="escort-stats-content">
                        <div class="escort-stat-item escort-animate">
                            <strong><span class="escort-count-number" v-count-up="100">100</span><span
                                    class="escort-stat-unit">余人</span></strong>
                            <span>专职安保人员</span>
                        </div>
                        <div class="escort-stat-item escort-animate">
                            <strong><span class="escort-count-number" v-count-up="6000">6,000</span><span
                                    class="escort-stat-unit">㎡</span></strong>
                            <span>保密印刷车间</span>
                        </div>
                        <div class="escort-stat-item escort-animate">
                            <strong><span class="escort-count-number" v-count-up="8">8</span><span
                                    class="escort-stat-unit">大</span></strong>
                            <span>全国交付中心</span>
                        </div>
                        <div class="escort-stat-item escort-animate">
                            <strong><span class="escort-count-number" v-count-up="32">32</span><span
                                    class="escort-stat-unit">省市</span></strong>
                            <span>全国服务网络</span>
                        </div>
                        <div class="escort-stat-item escort-animate">
                            <strong><span class="escort-count-number" v-count-up="80">80</span><span
                                    class="escort-stat-unit">余台</span></strong>
                            <span>高速印刷设备</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 导航标签 ========== -->
        <nav class="escort-nav-bar">
            <div class="container-escort escort-nav-inner">
                <a v-for="tab in navTabs" :key="tab.target" class="escort-nav-tab"
                    :class="{ 'escort-nav-tab-active': activeNav === tab.target }"
                    @click.prevent="scrollToSection(tab.target)" href="javascript:void(0)">
                    <span class="escort-nav-tab-text">{{ tab.label }}</span>
                </a>
            </div>
        </nav>

        <!-- ========== 资质与团队 ========== -->
        <section id="escort-service" class="escort-section escort-qualify-section">
            <div class="container-escort">
                <div style="display: flex; gap: 32px;" class="escort-animate">
                    <img style="width: 56px; height: 56px;" src="/assets/images/escort/service-icon1.png" alt="资质与团队">
                    <div class="escort-section-header header1-escort">
                        <span class="escort-section-en">SECURITY PRINTING</span>
                        <h2>资质与团队<br /><span class="escort-title-sub">全年安保押运任务高标</span></h2>
                    </div>
                </div>
                <div class="escort-qualify-content escort-animate">
                    <div class="escort-qualify-left">
                        <p class="escort-qualify-text comm-indent">
                            中测高科旗下自有安保公司并具有相关的安保资质。公司现有<strong>专职安保员100余人</strong>，并全部持证上岗，参加试卷保密押运的人员全部为政治可靠、品行良好、身体健康，无精神疾病，无吸毒、酗酒、赌博等不良嗜好。运输车辆驾驶员应具有<strong>50000千米和3年以上</strong>的安全驾驶经验，无重大交通责任事故。
                        </p>
                        <p class="escort-qualify-text comm-indent">
                            根据客户要求，中测高科可以提供<strong>专车押运、警察武装押运</strong>等服务。为了保证押运过程的安全，根据具体任务数量、路线、时间、接收方、目的地等涉密信息，并严格控制涉密信息的知悉范围。
                        </p>
                        <p class="escort-qualify-text comm-indent">
                            中测高科全程通过<strong>信息化手段管控押运工作</strong>，安保人员事先不知道目的地，押运员采取随机的方式抽取，押运的保险箱密码通过系统生成，押运人员不掌握，押运人员全部需要签订《保密押运承诺书》，对押运工作承担法律责任。押运出发及回收以后，系统将通知短信告知客户，做到安保押运全过程的监控、人性化和可追溯。
                        </p>
                        <div class="escort-qualify-tags">
                            <span class="escort-qualify-tag escort-tag-orange">安保资质认证</span>
                            <span class="escort-qualify-tag escort-tag-blue">全员持证上岗</span>
                            <span class="escort-qualify-tag escort-tag-green">全程信息化管控</span>
                            <span class="escort-qualify-tag escort-tag-red">警察武装押运</span>
                        </div>
                    </div>
                    <div class="escort-qualify-right">
                        <div class="escort-license-row">
                            <img src="/assets/images/escort/book1.png" alt="安保公司备案资质" class="escort-license-img" />
                            <img src="/assets/images/escort/book2.png" alt="押运公司营业执照" class="escort-license-img" />
                        </div>
                        <div class="escort-license-captions">
                            <span>安保公司备案资质</span>
                            <span>押运公司营业执照</span>
                        </div>
                        <div class="escort-checklist">
                            <div class="escort-check-item">
                                <img src="/assets/images/escort/box-icon5.png" alt="" class="escort-check-icon" />
                                <span><strong>随机抽取押运员</strong> — 安保人员事先不知道目的地，押运员随机抽取</span>
                            </div>
                            <div class="escort-check-item">
                                <img src="/assets/images/escort/box-icon5.png" alt="" class="escort-check-icon" />
                                <span><strong>系统生成密码</strong> — 保险箱密码由系统生成，押运人员不掌握</span>
                            </div>
                            <div class="escort-check-item">
                                <img src="/assets/images/escort/box-icon5.png" alt="" class="escort-check-icon" />
                                <span><strong>押运员备案认证</strong> — 押运人员全部签订《保密押运承诺书》，经过备案对押运承担法律责任</span>
                            </div>
                            <div class="escort-check-item">
                                <img src="/assets/images/escort/box-icon5.png" alt="" class="escort-check-icon" />
                                <span><strong>全程短信及追溯</strong> — 通过"中测高科"小程序全程掌握任务进度，出发及回收后系统短信通知客户，全程可追溯</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div style="width: 100%; max-width: 1200px; height: 1px; background: #E2E8F0; margin: 0 auto;"></div>
        <!-- ========== 全国八大交付中心 ========== -->
        <section class="escort-section escort-delivery-section" style="padding-top: 39px;">
            <div class="container-escort">
                <div class="escort-animate" style="display: flex; gap: 32px;">
                    <img style="width: 56px; height: 56px;" src="/assets/images/escort/service-icon2.png"
                        alt="全国八大交付中心">
                    <div class="escort-section-header">
                        <span class="escort-section-en" style="color:#FF913D">SECURITY PRINTING</span>
                        <h2>全国八大交付中心<br /><span class="escort-title-sub">支持各类项目快速响应</span></h2>
                    </div>
                </div>
                <div class="escort-delivery-content escort-animate">
                    <div class="escort-delivery-map">
                        <img src="/assets/images/escort/map-img.png" alt="全国交付中心地图" class="escort-map-img" />
                    </div>
                    <div class="escort-delivery-centers">
                        <div class="escort-center-item escort-center-hq">
                            <img src="/assets/images/escort/map-address.png" alt="" class="escort-hq-icon" />
                            <div>
                                <strong>南昌 <span class="escort-center-label">总部基地</span></strong>
                                <p>保密印刷中心</p>
                            </div>
                        </div>
                        <div class="escort-center-item">
                            <img src="/assets/images/escort/address-icon.png" alt="" class="escort-address-icon" />
                            <div>
                                <strong>郑州 <span class="escort-center-label">华中分中心</span></strong>
                                <p>覆盖河南及周边</p>
                            </div>
                        </div>
                        <div class="escort-center-item">
                            <img src="/assets/images/escort/address-icon.png" alt="" class="escort-address-icon" />
                            <div>
                                <strong>长沙 <span class="escort-center-label">中南分中心</span></strong>
                                <p>覆盖湖南及周边</p>
                            </div>
                        </div>
                        <div class="escort-center-item">
                            <img src="/assets/images/escort/address-icon.png" alt="" class="escort-address-icon" />
                            <div>
                                <strong>成都 <span class="escort-center-label">西南分中心</span></strong>
                                <p>覆盖四川及周边</p>
                            </div>
                        </div>
                        <div class="escort-center-item">
                            <img src="/assets/images/escort/address-icon.png" alt="" class="escort-address-icon" />
                            <div>
                                <strong>新疆 <span class="escort-center-label">西北分中心</span></strong>
                                <p>覆盖西北及周边</p>
                            </div>
                        </div>
                        <div class="escort-center-item">
                            <img src="/assets/images/escort/address-icon.png" alt="" class="escort-address-icon" />
                            <div>
                                <strong>昆明 <span class="escort-center-label">云南分中心</span></strong>
                                <p>覆盖云南及周边</p>
                            </div>
                        </div>
                        <div class="escort-center-item">
                            <img src="/assets/images/escort/address-icon.png" alt="" class="escort-address-icon" />
                            <div>
                                <strong>海口 <span class="escort-center-label">海南分中心</span></strong>
                                <p>覆盖海南及周边</p>
                            </div>
                        </div>
                        <div class="escort-center-item">
                            <img src="/assets/images/escort/address-icon.png" alt="" class="escort-address-icon" />
                            <div>
                                <strong>重庆 <span class="escort-center-label">重庆分中心</span></strong>
                                <p>覆盖重庆及周边</p>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="escort-delivery-desc escort-animate comm-indent">
                    中测高科在全国32个省市设有分子公司及办事处，是国内少数具有全国"一张网"落地服务的人才测评与考试大型服务机构。以南昌为保密制卷与押运总部基地，辐射全国五大分中心，确保快速响应各类考试需求。真正做到规模化、规范化和信息化。
                </p>
            </div>
        </section>

        <!-- ========== 任务全程追踪 ========== -->
        <section class="escort-section escort-tracking-section">
            <div class="escort-tracking-bg">
                <img src="/assets/images/escort/bg1.png" alt="" class="escort-tracking-bg-img" />
            </div>
            <div class="container-escort escort-tracking-inner">
                <div class="escort-animate" style="display: flex; gap: 32px;">
                    <img style="width: 56px; height: 56px;" src="/assets/images/escort/service-icon3.png" alt="任务全程追踪">
                    <div class="escort-section-header escort-animate">
                        <span class="escort-section-en escort-section-en-light">SECURITY PRINTING</span>
                        <h2 class="escort-title-light">任务全程追踪<br />小程序全程掌握任务进度</h2>
                    </div>
                </div>
                <div class="escort-tracking-apps escort-animate">
                    <div class="escort-tracking-app">
                        <img src="/assets/images/escort/app-img1.png" alt="进入中测高科小程序" class="escort-app-img" />
                        <div class="escort-tracking-step">
                            <span class="escort-step-num">01</span>
                            <span>进入中测高科小程序</span>
                        </div>
                    </div>
                    <div class="escort-tracking-app">
                        <img src="/assets/images/escort/app-img2.png" alt="任务进度实时管控" class="escort-app-img" />
                        <div class="escort-tracking-step">
                            <span class="escort-step-num">02</span>
                            <span>任务进度实时管控</span>
                        </div>
                    </div>
                    <div class="escort-tracking-app">
                        <img src="/assets/images/escort/app-img3.png" alt="查看押运进度" class="escort-app-img" />
                        <div class="escort-tracking-step">
                            <span class="escort-step-num">03</span>
                            <span>查看押运进度</span>
                        </div>
                    </div>
                    <div class="escort-tracking-app">
                        <img src="/assets/images/escort/app-img4.png" alt="试卷加密密码" class="escort-app-img" />
                        <div class="escort-tracking-step">
                            <span class="escort-step-num">04</span>
                            <span>试卷加密密码</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 安全保密能力 ========== -->
        <section class="escort-section escort-security-section">
            <div class="container-escort">
                <div class="escort-animate" style="display: flex; gap: 32px;">
                    <img style="width: 56px; height: 56px;" src="/assets/images/escort/service-icon4.png" alt="安全保密能力">
                    <div class="escort-section-header escort-animate">
                        <span class="escort-section-en">SECURITY PRINTING</span>
                        <h2>安全保密能力<br /><span class="escort-title-sub">四资质交付能力的测评机构</span></h2>
                    </div>
                </div>
                <div class="escort-security-cards escort-animate">
                    <div class="escort-security-card">
                        <div class="escort-security-card-header">
                            <span class="escort-security-num">01</span>
                            <h4>资质完备</h4>
                        </div>
                        <p class="comm-indent">为了满足全国范围内的保密制卷要求，中测高科自建保密印刷车间，并取得了国家保密局颁发的<strong>秘密载体印刷乙级资质</strong>，在全国考试命题测评行业中，中测高科是全行业少数具有研究院、国家保密印刷乙级资质、公安部信息安全三级等保证认证和公安部门保安公司"四资质"交付能力的测评机构。
                        </p>
                    </div>
                    <div class="escort-security-card">
                        <div class="escort-security-card-header">
                            <span class="escort-security-num">02</span>
                            <h4>设备齐全</h4>
                        </div>
                        <p class="comm-indent">场地配套设施齐全完备，全城市布设<strong>360度无死角全天候高清监控系统</strong>，全程实现可视化值守管控。严格执行入闸封闭式制卷管理流程，专用安保押运车辆、GPS全套专业防伪印刷设备均落实分级安全防护举措，全流程闭环监管，全方位筑牢保密安全防线。
                        </p>
                    </div>
                    <div class="escort-security-card">
                        <div class="escort-security-card-header">
                            <span class="escort-security-num">03</span>
                            <h4>人员可靠</h4>
                        </div>
                        <p class="comm-indent">全体从业人员政治可靠、作风严谨，组建稳定专属作业团队，人员固定不临时调配。团队历经各类涉密印刷项目千锤百炼，长期深耕安全保密印刷领域，实操经验丰富，<strong>熟悉全流程保密规范，具备极强风险防控意识</strong>，可稳妥完成各类高标准涉密制卷任务。
                        </p>
                    </div>
                    <div class="escort-security-card">
                        <div class="escort-security-card-header">
                            <span class="escort-security-num">04</span>
                            <h4>机制完备</h4>
                        </div>
                        <p class="comm-indent">各项保密管理制度体系机制完备稳定，自有固定专职作业团队，内部层级管控、风险排查等内控机制完善健全。交付中心实行 <strong>24
                                小时专人在岗值班值守制度</strong>，定时开展巡逻巡检，全时段落实安全保密管控，形成闭环管理体系，有效防范各类安全泄密风险。</p>
                    </div>
                </div>
                <div class="escort-security-images escort-animate">
                    <div class="escort-security-img-item">
                        <img src="/assets/images/escort/save1.png" alt="印刷资质证书"
                            class="escort-security-img escort-security-img1" />
                        <span>印刷资质证书</span>
                    </div>
                    <div class="escort-security-img-item">
                        <img src="/assets/images/escort/save2.png" alt="专业安保团队"
                            class="escort-security-img escort-security-img2" />
                        <span>专业安保团队</span>
                    </div>
                    <div class="escort-security-img-item">
                        <img src="/assets/images/escort/save3.png" alt="押运试卷队伍"
                            class="escort-security-img escort-security-img3" />
                        <span>押运试卷队伍</span>
                    </div>
                    <div class="escort-security-img-item">
                        <img src="/assets/images/escort/save4.png" alt="试卷专车押运"
                            class="escort-security-img escort-security-img4" />
                        <span>试卷专车押运</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 联系我们 ========== -->
        <section id="escort-contact" class="escort-section escort-contact-section">
            <div class="escort-contact-bg">
                <img src="/assets/images/marking/bg4.png" alt="" class="escort-contact-bg-img" />
            </div>
            <div class="container-escort escort-contact-inner">
                <div class="escort-section-header escort-section-header-center escort-animate">
                    <span class="escort-section-en">联系我们</span>
                    <h2>开启安全交付新时代</h2>
                    <p class="escort-section-subtitle">无论您是人事考试中心、教育机构还是企业培训部门，我们都能为您提供定制化的保密制卷与安保押运解决方案。</p>
                </div>
                <div class="escort-contact-content escort-animate">
                    <div class="escort-contact-left">
                        <h3 class="escort-contact-company">中测高科（北京）人才测评中心有限公司</h3>
                        <p class="escort-contact-desc">
                            中国人事考试安全交付领导品牌，年均服务28000余套考试项目，累计服务考生超过2000万人次。拥有国家乙级涉密印刷资质与自有安保团队，期待与您合作，共同推动考试测评行业的安全升级。
                        </p>
                        <div class="escort-contact-links">
                            <div class="escort-contact-link">
                                <img src="/assets/images/marking/link-icon1.png" alt="" class="escort-link-icon" />
                                <div class="escort-link-info">
                                    <span class="escort-link-label">联系电话</span>
                                    <p>139-7094-1607</p>
                                </div>
                            </div>
                            <div class="escort-contact-link">
                                <img src="/assets/images/marking/link-icon2.png" alt="" class="escort-link-icon" />
                                <div class="escort-link-info">
                                    <span class="escort-link-label">公司地址</span>
                                    <p>北京市朝阳区朝阳门南大街10号科锐国际</p>
                                </div>
                            </div>
                            <div class="escort-contact-link">
                                <img src="/assets/images/marking/link-icon3.png" alt="" class="escort-link-icon" />
                                <div class="escort-link-info">
                                    <span class="escort-link-label">商务合作</span>
                                    <p>欢迎预约演示，获取专属解决方案</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="escort-contact-right">
                        <div class="escort-qrcode-box">
                            <img src="/assets/images/marking/code-img.png" alt="微信扫码咨询" class="escort-qrcode-img" />
                        </div>
                        <p class="escort-qrcode-text">微信扫码咨询</p>
                        <NuxtLink class="escort-contact-btn" to="/contact?product=4">
                            <img src="/assets/images/marking/phone-btn.png" alt="" class="escort-contact-btn-icon" />
                            立即咨询
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- ============================================================ -->
    <!-- ========== 移动端版本（≤1024px 生效，与 web 端零耦合）========== -->
    <!-- ============================================================ -->
    <div ref="esmSection" class="esm-page">
        <!-- ========== Banner ========== -->
        <section class="esm-banner">
            <div class="esm-banner-content esm-container">
                <span class="esm-badge">国家乙级涉密资质 · 公安部安保认证</span>
                <h1 class="esm-banner-title">保密制卷<span>与安保押运服务</span></h1>
                <p class="esm-banner-desc esm-indent">中测高科拥有国家秘密载体印制乙级资质、安保资质和信息安全认证三级等资质与企业级信息安全认证，自有安保团队，提供从试卷保密印刷、安全押运到阅卷交付的全流程服务，在全国建设有8大交付中心，覆盖全国32个省市，保障每一次考试交付的高效安全与公正。</p>
                <div class="esm-banner-actions">
                    <NuxtLink class="esm-btn esm-btn-primary" to="/contact?product=4">
                        <img src="/assets/images/marking/phone-btn.png" alt="" class="esm-btn-icon" />预约咨询
                    </NuxtLink>
                    <NuxtLink class="esm-btn esm-btn-ghost" to="/contact?product=4">
                        了解服务<img src="/assets/images/marking/system-btn.png" alt="" class="esm-btn-icon" />
                    </NuxtLink>
                </div>
            </div>
            <div class="esm-banner-hero esm-container">
                <img src="/assets/images/escort/banner-bg.png" alt="" />
            </div>
            <!-- 统计数字（5 项） -->
            <div class="esm-stats esm-container">
                <div class="esm-stat-item esm-animate">
                    <strong><span class="esm-count" v-count-up="100">100</span><em>余人</em></strong>
                    <span>专职安保人员</span>
                </div>
                <div class="esm-stat-item esm-animate">
                    <strong><span class="esm-count" v-count-up="6000">6,000</span><em>㎡</em></strong>
                    <span>保密印刷车间</span>
                </div>
                <div class="esm-stat-item esm-animate">
                    <strong><span class="esm-count" v-count-up="8">8</span><em>大</em></strong>
                    <span>全国交付中心</span>
                </div>
                <div class="esm-stat-item esm-animate">
                    <strong><span class="esm-count" v-count-up="32">32</span><em>省市</em></strong>
                    <span>全国服务网络</span>
                </div>
                <div class="esm-stat-item esm-animate">
                    <strong><span class="esm-count" v-count-up="80">80</span><em>余台</em></strong>
                    <span>高速印刷设备</span>
                </div>
            </div>
        </section>

        <!-- ========== 锚点导航（sticky + 滚动高亮，镜像 web 端 2 个 tab） ========== -->
        <nav class="esm-nav">
            <a v-for="tab in navTabs" :key="tab.target" class="esm-nav-tab"
                :class="{ 'esm-nav-tab-active': esmActiveNav === tab.target }" :href="`#esm-${tab.target}`">
                {{ tab.label }}
            </a>
        </nav>

        <!-- ========== 资质与团队 ========== -->
        <section id="esm-service" class="esm-section esm-qualify">
            <div class="esm-container">
                <div class="esm-head esm-animate">
                    <img class="esm-head-icon" src="/assets/images/escort/service-icon1.png" alt="" />
                    <span class="esm-en">SECURITY PRINTING</span>
                    <h2>资质与团队<span class="esm-h2-sub">全年安保押运任务高标</span></h2>
                </div>
                <div class="esm-qualify-text esm-animate">
                    <p class="esm-indent">中测高科旗下自有安保公司并具有相关的安保资质。公司现有<strong>专职安保员100余人</strong>，并全部持证上岗，参加试卷保密押运的人员全部为政治可靠、品行良好、身体健康，无精神疾病，无吸毒、酗酒、赌博等不良嗜好。运输车辆驾驶员应具有<strong>50000千米和3年以上</strong>的安全驾驶经验，无重大交通责任事故。</p>
                    <p class="esm-indent">根据客户要求，中测高科可以提供<strong>专车押运、警察武装押运</strong>等服务。为了保证押运过程的安全，根据具体任务数量、路线、时间、接收方、目的地等涉密信息，并严格控制涉密信息的知悉范围。</p>
                    <p class="esm-indent">中测高科全程通过<strong>信息化手段管控押运工作</strong>，安保人员事先不知道目的地，押运员采取随机的方式抽取，押运的保险箱密码通过系统生成，押运人员不掌握，押运人员全部需要签订《保密押运承诺书》，对押运工作承担法律责任。押运出发及回收以后，系统将通知短信告知客户，做到安保押运全过程的监控、人性化和可追溯。</p>
                </div>
                <div class="esm-tags esm-animate">
                    <span class="esm-tag esm-tag-orange">安保资质认证</span>
                    <span class="esm-tag esm-tag-blue">全员持证上岗</span>
                    <span class="esm-tag esm-tag-green">全程信息化管控</span>
                    <span class="esm-tag esm-tag-red">警察武装押运</span>
                </div>
                <div class="esm-license-row esm-animate">
                    <figure class="esm-license-fig">
                        <img src="/assets/images/escort/book1.png" alt="安保公司备案资质" />
                        <figcaption>安保公司备案资质</figcaption>
                    </figure>
                    <figure class="esm-license-fig">
                        <img src="/assets/images/escort/book2.png" alt="押运公司营业执照" />
                        <figcaption>押运公司营业执照</figcaption>
                    </figure>
                </div>
                <div class="esm-checklist esm-animate">
                    <div class="esm-check-item">
                        <img src="/assets/images/escort/box-icon5.png" alt="" />
                        <span><strong>随机抽取押运员</strong> — 安保人员事先不知道目的地，押运员随机抽取</span>
                    </div>
                    <div class="esm-check-item">
                        <img src="/assets/images/escort/box-icon5.png" alt="" />
                        <span><strong>系统生成密码</strong> — 保险箱密码由系统生成，押运人员不掌握</span>
                    </div>
                    <div class="esm-check-item">
                        <img src="/assets/images/escort/box-icon5.png" alt="" />
                        <span><strong>押运员备案认证</strong> — 押运人员全部签订《保密押运承诺书》，经过备案对押运承担法律责任</span>
                    </div>
                    <div class="esm-check-item">
                        <img src="/assets/images/escort/box-icon5.png" alt="" />
                        <span><strong>全程短信及追溯</strong> — 通过“中测高科”小程序全程掌握任务进度，出发及回收后系统短信通知客户，全程可追溯</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 全国八大交付中心 ========== -->
        <section class="esm-section esm-delivery">
            <div class="esm-container">
                <div class="esm-head esm-animate">
                    <img class="esm-head-icon" src="/assets/images/escort/service-icon2.png" alt="" />
                    <span class="esm-en esm-en-orange">SECURITY PRINTING</span>
                    <h2>全国八大交付中心<span class="esm-h2-sub">支持各类项目快速响应</span></h2>
                </div>
                <div class="esm-map esm-animate">
                    <img src="/assets/images/escort/map-img.png" alt="全国交付中心地图" />
                </div>
                <div class="esm-centers esm-animate">
                    <div class="esm-center esm-center-hq">
                        <img src="/assets/images/escort/map-address.png" alt="" class="esm-center-hq-icon" />
                        <div><strong>南昌 <span>总部基地</span></strong><p>保密印刷中心</p></div>
                    </div>
                    <div class="esm-center">
                        <img src="/assets/images/escort/address-icon.png" alt="" class="esm-center-icon" />
                        <div><strong>郑州 <span>华中分中心</span></strong><p>覆盖河南及周边</p></div>
                    </div>
                    <div class="esm-center">
                        <img src="/assets/images/escort/address-icon.png" alt="" class="esm-center-icon" />
                        <div><strong>长沙 <span>中南分中心</span></strong><p>覆盖湖南及周边</p></div>
                    </div>
                    <div class="esm-center">
                        <img src="/assets/images/escort/address-icon.png" alt="" class="esm-center-icon" />
                        <div><strong>成都 <span>西南分中心</span></strong><p>覆盖四川及周边</p></div>
                    </div>
                    <div class="esm-center">
                        <img src="/assets/images/escort/address-icon.png" alt="" class="esm-center-icon" />
                        <div><strong>新疆 <span>西北分中心</span></strong><p>覆盖西北及周边</p></div>
                    </div>
                    <div class="esm-center">
                        <img src="/assets/images/escort/address-icon.png" alt="" class="esm-center-icon" />
                        <div><strong>昆明 <span>云南分中心</span></strong><p>覆盖云南及周边</p></div>
                    </div>
                    <div class="esm-center">
                        <img src="/assets/images/escort/address-icon.png" alt="" class="esm-center-icon" />
                        <div><strong>海口 <span>海南分中心</span></strong><p>覆盖海南及周边</p></div>
                    </div>
                    <div class="esm-center">
                        <img src="/assets/images/escort/address-icon.png" alt="" class="esm-center-icon" />
                        <div><strong>重庆 <span>重庆分中心</span></strong><p>覆盖重庆及周边</p></div>
                    </div>
                </div>
                <p class="esm-delivery-desc esm-indent esm-animate">中测高科在全国32个省市设有分子公司及办事处，是国内少数具有全国“一张网”落地服务的人才测评与考试大型服务机构。以南昌为保密制卷与押运总部基地，辐射全国五大分中心，确保快速响应各类考试需求。真正做到规模化、规范化和信息化。</p>
            </div>
        </section>

        <!-- ========== 任务全程追踪 ========== -->
        <section class="esm-section esm-tracking">
            <div class="esm-tracking-bg"><img src="/assets/images/escort/bg1.png" alt="" /></div>
            <div class="esm-container esm-tracking-inner">
                <div class="esm-head esm-animate">
                    <img class="esm-head-icon" src="/assets/images/escort/service-icon3.png" alt="" />
                    <span class="esm-en esm-en-light">SECURITY PRINTING</span>
                    <h2 class="esm-title-light">任务全程追踪<span class="esm-h2-sub-light">小程序全程掌握任务进度</span></h2>
                </div>
                <div class="esm-apps esm-animate">
                    <div class="esm-app">
                        <img src="/assets/images/escort/app-img1.png" alt="进入中测高科小程序" />
                        <div class="esm-app-step"><span class="esm-step-num">01</span><span>进入中测高科小程序</span></div>
                    </div>
                    <div class="esm-app">
                        <img src="/assets/images/escort/app-img2.png" alt="任务进度实时管控" />
                        <div class="esm-app-step"><span class="esm-step-num">02</span><span>任务进度实时管控</span></div>
                    </div>
                    <div class="esm-app">
                        <img src="/assets/images/escort/app-img3.png" alt="查看押运进度" />
                        <div class="esm-app-step"><span class="esm-step-num">03</span><span>查看押运进度</span></div>
                    </div>
                    <div class="esm-app">
                        <img src="/assets/images/escort/app-img4.png" alt="试卷加密密码" />
                        <div class="esm-app-step"><span class="esm-step-num">04</span><span>试卷加密密码</span></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 安全保密能力 ========== -->
        <section class="esm-section esm-security">
            <div class="esm-container">
                <div class="esm-head esm-animate">
                    <img class="esm-head-icon" src="/assets/images/escort/service-icon4.png" alt="" />
                    <span class="esm-en">SECURITY PRINTING</span>
                    <h2>安全保密能力<span class="esm-h2-sub">四资质交付能力的测评机构</span></h2>
                </div>
                <div class="esm-sec-cards">
                    <div class="esm-sec-card esm-animate">
                        <div class="esm-sec-card-head"><span class="esm-sec-num">01</span><h4>资质完备</h4></div>
                        <p class="esm-indent">为了满足全国范围内的保密制卷要求，中测高科自建保密印刷车间，并取得了国家保密局颁发的<strong>秘密载体印刷乙级资质</strong>，在全国考试命题测评行业中，中测高科是全行业少数具有研究院、国家保密印刷乙级资质、公安部信息安全三级等保证认证和公安部门保安公司“四资质”交付能力的测评机构。</p>
                    </div>
                    <div class="esm-sec-card esm-animate">
                        <div class="esm-sec-card-head"><span class="esm-sec-num">02</span><h4>设备齐全</h4></div>
                        <p class="esm-indent">场地配套设施齐全完备，全城市布设<strong>360度无死角全天候高清监控系统</strong>，全程实现可视化值守管控。严格执行入闸封闭式制卷管理流程，专用安保押运车辆、GPS全套专业防伪印刷设备均落实分级安全防护举措，全流程闭环监管，全方位筑牢保密安全防线。</p>
                    </div>
                    <div class="esm-sec-card esm-animate">
                        <div class="esm-sec-card-head"><span class="esm-sec-num">03</span><h4>人员可靠</h4></div>
                        <p class="esm-indent">全体从业人员政治可靠、作风严谨，组建稳定专属作业团队，人员固定不临时调配。团队历经各类涉密印刷项目千锤百炼，长期深耕安全保密印刷领域，实操经验丰富，<strong>熟悉全流程保密规范，具备极强风险防控意识</strong>，可稳妥完成各类高标准涉密制卷任务。</p>
                    </div>
                    <div class="esm-sec-card esm-animate">
                        <div class="esm-sec-card-head"><span class="esm-sec-num">04</span><h4>机制完备</h4></div>
                        <p class="esm-indent">各项保密管理制度体系机制完备稳定，自有固定专职作业团队，内部层级管控、风险排查等内控机制完善健全。交付中心实行 <strong>24 小时专人在岗值班值守制度</strong>，定时开展巡逻巡检，全时段落实安全保密管控，形成闭环管理体系，有效防范各类安全泄密风险。</p>
                    </div>
                </div>
                <div class="esm-sec-imgs esm-animate">
                    <figure>
                        <img src="/assets/images/escort/save1.png" alt="印刷资质证书" />
                        <figcaption>印刷资质证书</figcaption>
                    </figure>
                    <figure>
                        <img src="/assets/images/escort/save2.png" alt="专业安保团队" />
                        <figcaption>专业安保团队</figcaption>
                    </figure>
                    <figure>
                        <img src="/assets/images/escort/save3.png" alt="押运试卷队伍" />
                        <figcaption>押运试卷队伍</figcaption>
                    </figure>
                    <figure>
                        <img src="/assets/images/escort/save4.png" alt="试卷专车押运" />
                        <figcaption>试卷专车押运</figcaption>
                    </figure>
                </div>
            </div>
        </section>

        <!-- ========== 联系我们 ========== -->
        <section id="esm-contact" class="esm-section esm-contact">
            <div class="esm-contact-bg"><img src="/assets/images/marking/bg4.png" alt="" /></div>
            <div class="esm-container esm-contact-inner">
                <div class="esm-head esm-animate">
                    <span class="esm-en">联系我们</span>
                    <h2>开启安全交付新时代</h2>
                    <p class="esm-sub">无论您是人事考试中心、教育机构还是企业培训部门，我们都能为您提供定制化的保密制卷与安保押运解决方案。</p>
                </div>
                <div class="esm-contact-body esm-animate">
                    <h3 class="esm-contact-company">中测高科（北京）人才测评中心有限公司</h3>
                    <p class="esm-contact-desc">中国人事考试安全交付领导品牌，年均服务28000余套考试项目，累计服务考生超过2000万人次。拥有国家乙级涉密印刷资质与自有安保团队，期待与您合作，共同推动考试测评行业的安全升级。</p>
                    <div class="esm-contact-links">
                        <div class="esm-contact-link">
                            <img src="/assets/images/marking/link-icon1.png" alt="" />
                            <div><span class="esm-link-label">联系电话</span><p>139-7094-1607</p></div>
                        </div>
                        <div class="esm-contact-link">
                            <img src="/assets/images/marking/link-icon2.png" alt="" />
                            <div><span class="esm-link-label">公司地址</span><p>北京市朝阳区朝阳门南大街10号科锐国际</p></div>
                        </div>
                        <div class="esm-contact-link">
                            <img src="/assets/images/marking/link-icon3.png" alt="" />
                            <div><span class="esm-link-label">商务合作</span><p>欢迎预约演示，获取专属解决方案</p></div>
                        </div>
                    </div>
                    <div class="esm-qrcode">
                        <div class="esm-qrcode-box"><img src="/assets/images/marking/code-img.png" alt="微信扫码咨询" /></div>
                        <p class="esm-qrcode-text">微信扫码咨询</p>
                    </div>
                    <NuxtLink class="esm-contact-btn" to="/contact?product=4">
                        <img src="/assets/images/marking/phone-btn.png" alt="" class="esm-btn-icon" />立即咨询
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.comm-indent {
    text-indent: 2em;
}
/* ===== 基础变量 ===== */
.escort-page {
    --escort-blue: #0F62FE;
    --escort-blue-dark: #1365fe;
    --escort-ink: #1a1a2e;
    --escort-muted: #5A6578;
    --escort-bg: #f4f7fb;
    --escort-white: #fff;
    --escort-border: #e2e8f0;
    --escort-radius: 12px;
    font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    color: var(--escort-ink);
    overflow: hidden;
}

.container-escort {
    width: min(1200px, calc(100% - 40px));
    margin: 0 auto;
}

/* ===== 滚动动画 ===== */
.escort-animate {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.escort-animate.escort-visible {
    opacity: 1;
    transform: translateY(0);
}

.escort-animate:nth-child(2) {
    transition-delay: 0.1s;
}

.escort-animate:nth-child(3) {
    transition-delay: 0.2s;
}

.escort-animate:nth-child(4) {
    transition-delay: 0.3s;
}

/* ===== Banner ===== */
.escort-banner {
    width: 100%;
    height: 650px;
    background: linear-gradient(159deg, #FFFFFF 0%, #EEF3FA 40%, #DCE8F5 100%);
}

.escort-banner-container {
    position: relative;
    width: 1440px;
    height: 100%;
    margin: 0 auto;
}

.escort-banner-bg {
    position: absolute;
    top: 69px;
    right: 0;
    width: 1094px;
    height: 521px;
    pointer-events: none;
}

.escort-banner-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.escort-banner-content {
    position: relative;
    z-index: 2;
    padding-top: 69px;
}

.escort-badge {
    display: inline-block;
    padding: 6px 17px 6px 31px;
    border-radius: 999px;
    background: #FDECEA;
    color: #C0392B;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin-bottom: 39px;
    position: relative;
}

.escort-badge::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #C0392B;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
}

.escort-banner-title {
    font-size: clamp(36px, 4.5vw, 56px);
    font-weight: 600;
    color: #0F62FE;
    line-height: 1.2;
    letter-spacing: 2px;
    margin: 0 0 15px;
}

.escort-banner-desc {
    color: #5A6578;
    font-size: 16px;
    line-height: 1.8;
    margin: 0 0 16px;
    max-width: 560px;
}

.escort-banner-actions {
    display: flex;
    gap: 16px;
}

.escort-banner-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 16px 28px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    line-height: 1;
}

.escort-banner-btn-primary {
    background: #0F62FE;
    color: #fff;
}

.escort-banner-btn-primary:hover {
    background: #0043CE;
    box-shadow: 0 6px 20px rgba(15, 98, 254, 0.4);
    transform: translateY(-2px);
}

.escort-banner-btn-ghost {
    background: #fff;
    color: #1A1A2E;
}

.escort-banner-btn-ghost:hover {
    background: rgba(15, 98, 254, 0.05);
    color: #0F62FE;
    transform: translateY(-2px);
}

.escort-btn-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
}

/* 统计卡片 */
.escort-stats-bar {
    margin-top: 62px;
}

.escort-stats-content {
    display: flex;
    align-items: center;
    gap: 40px;
    margin: 0 auto;
    height: 100px;
}

.escort-stat-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    transition: background 0.3s ease;
    cursor: pointer;
}

.escort-stat-item strong {
    display: block;
    font-size: 36px;
    font-weight: 600;
    color: #0F62FE;
    line-height: 1.2;
}

.escort-stat-unit {
    font-size: 14px;
    font-weight: 500;
    color: #0F62FE !important;
    margin-left: 4px;
}

.escort-stat-item span {
    font-size: 13px;
    color: #8892A4;
    font-weight: 400;
}

.escort-count-number {
    font-size: inherit !important;
    font-weight: inherit !important;
    color: inherit !important;
}

/* ===== 导航标签 ===== */
.escort-nav-bar {
    position: sticky;
    top: 76px;
    z-index: 10;
    background: #F4F7FB;
    border-bottom: 1px solid var(--escort-border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.escort-nav-inner {
    display: flex;
    justify-content: center;
    gap: 0;
}

.escort-nav-tab {
    padding: 18px 41px;
    font-size: 16px;
    font-weight: 500;
    color: #161616;
    cursor: pointer;
    transition: all 0.25s ease;
    position: relative;
    white-space: nowrap;
    text-decoration: none;
}

.escort-nav-tab-text {
    position: relative;
}

.escort-nav-tab:hover {
    color: #0F62FE;
}

.escort-nav-tab-active {
    color: #0F62FE;
    font-weight: 600;
}

.escort-nav-tab-active .escort-nav-tab-text::after {
    content: '';
    position: absolute;
    bottom: -21px;
    left: 0;
    width: 100%;
    height: 3px;
    background: #0F62FE;
    border-radius: 2px 2px 0 0;
}

/* ===== 通用 Section ===== */
.escort-section {
    padding: 80px 0;
}

.escort-section-header {
    margin-bottom: 24px;
}

.escort-section-header-center {
    text-align: center;
}

.header1-escort {
    margin-bottom: 44px;
}

.escort-section-en {
    display: block;
    color: #0F62FE;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.1em;
}

.escort-section-en-light {
    color: rgba(255, 255, 255, 1);
}

.escort-section-header h2 {
    font-size: clamp(28px, 3.5vw, 40px);
    font-weight: 600;
    letter-spacing: 2px;
    margin: 0 0 11px;
    line-height: 1.25;
    color: #1A1A2E;
}

.escort-title-sub {
    color: #0F62FE;
}

.escort-title-light {
    color: var(--escort-white) !important;
}

.escort-section-subtitle {
    color: var(--escort-muted);
    font-size: 16px;
    line-height: 1.6;
    margin: 0 auto;
    max-width: 630px;
}

/* ===== 资质与团队 ===== */
.escort-qualify-section {
    padding-top: 44px;
    padding-bottom: 37px;
    background: var(--escort-white);
}

.escort-qualify-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: start;
}

.escort-qualify-text {
    font-size: 14px;
    color: #5A6578;
    line-height: 2;
    margin: 0 0 16px;
}

.escort-qualify-text strong {
    color: #1A1A2E;
    font-weight: 600;
}

.escort-qualify-tags {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 20px;
}

.escort-qualify-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    position: relative;
    padding-left: 28px;
}

.escort-qualify-tag::before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    background-size: contain;
    background-repeat: no-repeat;
}

.escort-tag-blue {
    background: #E8F0FA;
    color: #1A5FA8;
}

.escort-tag-blue::before {
    background-image: url('/assets/images/escort/box-icon2.png');
}

.escort-tag-green {
    background: #E8F0FA;
    color: #1A5FA8;
}

.escort-tag-green::before {
    background-image: url('/assets/images/escort/box-icon3.png');
}

.escort-tag-orange {
    background: #FDECEA;
    color: #C0392B;
}

.escort-tag-orange::before {
    background-image: url('/assets/images/escort/box-icon1.png');
}

.escort-tag-red {
    background: #FDF6E3;
    color: #B8860B;
}

.escort-tag-red::before {
    background-image: url('/assets/images/escort/box-icon4.png');
}

.escort-qualify-right {
    display: flex;
    flex-direction: column;
    margin-top: -130px;
}

.escort-license-row {
    display: flex;
    gap: 20px;
    justify-content: center;
}

.escort-license-img {
    object-fit: contain;
}

.escort-license-img:first-child {
    width: 234px;
    height: 168px;
}

.escort-license-img:last-child {
    width: 258px;
    height: 172px;
}

.escort-license-captions {
    display: flex;
    gap: 20px;
    justify-content: center;
    font-size: 13px;
    color: #0F62FE;
    font-weight: bold;
    margin-bottom: 24px;
    margin-top: 12px;
}

.escort-license-captions span:first-child {
    width: 234px;
    text-align: center;
}

.escort-license-captions span:last-child {
    width: 258px;
    text-align: center;
}

.escort-checklist {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.escort-check-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 18px;
    background: #F8FAFF;
    border-radius: 10px;
    border: 1px solid #E8EEFF;
    transition: all 0.3s ease;
}

.escort-check-item:hover {
    box-shadow: 0 4px 16px rgba(15, 98, 254, 0.08);
    transform: translateX(4px);
}

.escort-check-icon {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
}

.escort-check-item span {
    font-size: 14px;
    color: #5A6578;
    line-height: 1.6;
}

.escort-check-item strong {
    color: #1A1A2E;
    font-weight: 600;
}

/* ===== 全国八大交付中心 ===== */
.escort-delivery-section {
    background: #ffffff;
    padding-top: 39px;
    padding-bottom: 77px;
}

.escort-delivery-content {
    display: grid;
    grid-template-columns: 673px 1fr;
    gap: 56px;
    align-items: center;
    margin-bottom: 6px;
}

.escort-delivery-map {
    position: relative;
}

.escort-map-img {
    width: 100%;
    max-width: 673px;
    height: auto;
}

.escort-delivery-centers {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 23px;
}

.escort-center-item {
    display: flex;
    /* align-items: center; */
    gap: 14px;
    padding: 17px 44px 20px 17px;
    background: #F4F7FB;
    transition: all 0.3s ease;
}

.escort-center-item:hover {
    box-shadow: 0 4px 16px rgba(15, 98, 254, 0.1);
    transform: translateY(-2px);
}

.escort-center-hq {
    /* background: #F0F5FF;
    border-color: #C8DAFF; */
    border-radius: 8px 8px 0 0;
    position: relative;
}

.escort-center-hq::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    border-radius: 100px 100px 0 0;
    background: #FF913D;
}

.escort-hq-icon {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
}

.escort-center-hq>div {
    margin-top: 6px;
}

.escort-address-icon {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
}

.escort-center-item strong {
    display: block;
    font-size: 16px;
    font-weight: 600;
    color: #1A1A2E;
    /* margin-bottom: 2px; */
}

.escort-center-label {
    font-size: 14px;
    font-weight: 400;
    color: #5A6578;
    margin-left: 3px;
}

.escort-center-item p {
    font-size: 14px;
    color: #5A6578;
    margin: 0;
}

.escort-delivery-desc {
    font-size: 14px;
    color: #5A6578;
    line-height: 1.8;
    max-width: 1200px;
    margin: 0 auto;
}

/* ===== 任务全程追踪 ===== */
.escort-tracking-section {
    position: relative;
    background: #fff;
    padding: 62px 0 0;
    overflow: hidden;
    height: 756px;
}

.escort-tracking-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 100%;
    pointer-events: none;
}

.escort-tracking-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.escort-tracking-inner {
    position: relative;
    z-index: 2;
}

.escort-tracking-apps {
    display: flex;
    justify-content: center;
    gap: 86px;
    margin-top: 5px;
}

.escort-tracking-app {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.escort-tracking-app:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 417px;
    left: 50%;
    width: calc(100% + 86px);
    height: 2px;
    background: rgba(255, 255, 255, 1);
    transform: translateY(-50%);
}

.escort-app-img {
    width: 210px;
    height: 400px;
    object-fit: contain;
    border-radius: 16px;
    transition: all 0.3s ease;
}

.escort-app-img:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.escort-tracking-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.escort-step-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--escort-white);
    color: #0F62FE;
    font-size: 14px;
    font-weight: 700;
    position: relative;
    z-index: 1;
}

.escort-tracking-step span:last-child {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
    white-space: nowrap;
}

/* ===== 安全保密能力 ===== */
.escort-security-section {
    background: var(--escort-white);
    padding: 56px 0 51px;
}

.escort-security-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 40px;
}

.escort-security-card {
    padding: 28px 30px;
    background: #F8FAFF;
    border-radius: var(--escort-radius);
    border: 1px solid #E8EEFF;
    transition: all 0.3s ease;
}

.escort-security-card:hover {
    box-shadow: 0 8px 24px rgba(15, 98, 254, 0.1);
    transform: translateY(-3px);
}

.escort-security-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
}

.escort-security-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: #0F62FE;
    color: var(--escort-white);
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
}

.escort-security-card h4 {
    font-size: 18px;
    font-weight: 600;
    color: #1A1A2E;
    margin: 0;
}

.escort-security-card p {
    font-size: 14px;
    color: #5A6578;
    line-height: 1.8;
    margin: 0;
}

.escort-security-card p strong {
    color: #1A1A2E;
    font-weight: 600;
}

.escort-security-images {
    display: flex;
    align-items: center;
    /* gap: 20px; */
}

.escort-security-img-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.escort-security-img {
    height: 163px;
    object-fit: contain;
    border-radius: 10px;
    transition: all 0.3s ease;
}

.escort-security-img1 {
    width: 229px;
}

.escort-security-img2 {
    width: 305px;
    margin-left: 13px;
}

.escort-security-img3 {
    width: 289px;
    margin-left: 17px;
}

.escort-security-img4 {
    width: 286px;
    margin-left: 17px;
}

.escort-security-img:hover {
    transform: translateY(-4px);
    /* box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12); */
}

.escort-security-img-item span {
    margin-top: 10px;
    font-size: 13px;
    color: #0F62FE;
    font-weight: bold;
}

/* ===== 联系我们 ===== */
.escort-contact-section {
    position: relative;
    padding: 42px 0 45px;
    background: #f4f7fb;
    overflow: hidden;
}

.escort-contact-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 611px;
    pointer-events: none;
}

.escort-contact-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.escort-contact-inner {
    position: relative;
    z-index: 2;
}

.escort-contact-content {
    display: grid;
    grid-template-columns: 1fr 544px;
    gap: 50px;
    align-items: start;
}

.escort-contact-company {
    font-size: 32px;
    font-weight: 600;
    color: #1A1A2E;
    margin: 0 0 22px;
}

.escort-contact-desc {
    font-size: 15px;
    color: #5A6578;
    line-height: 1.8;
    margin: 0 0 32px;
}

.escort-contact-links {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.escort-contact-link {
    display: flex;
    align-items: flex-start;
    gap: 16px;
}

.escort-link-icon {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
}

.escort-link-info {
    display: flex;
    height: 48px;
    flex-direction: column;
    justify-content: space-between;
}

.escort-link-label {
    display: block;
    font-size: 12px;
    color: #8892A4;
    line-height: 1.6;
}

.escort-contact-link p {
    font-size: 15px;
    color: #1A1A2E;
    font-weight: 500;
    line-height: 1.6;
    margin: 0;
}

.escort-contact-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    border: 1px solid #F0F2F5;
    height: 360px;
    padding: 38px 0 33px;
}

.escort-qrcode-box {
    width: 180px;
    height: 180px;
    background: var(--escort-white);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    margin-bottom: 10px;
}

.escort-qrcode-img {
    width: 180px;
    height: 180px;
    border-radius: 20px;
}

.escort-qrcode-text {
    font-size: 12px;
    color: #8892A4;
    margin: 0 0 21px;
}

.escort-contact-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px 32px;
    width: 100%;
    max-width: 446px;
    background: #0F62FE;
    color: var(--escort-white);
    font-size: 16px;
    font-weight: 600;
    border-radius: 16px;
    text-decoration: none;
    transition: all 0.3s ease;
}

.escort-contact-btn:hover {
    background: #0043CE;
    box-shadow: 0 6px 20px rgba(15, 98, 254, 0.4);
    transform: translateY(-2px);
}

.escort-contact-btn-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
}

/* ===== 响应式 ===== */
@media (max-width: 1024px) {
    .escort-qualify-content {
        grid-template-columns: 1fr;
    }

    .escort-delivery-content {
        grid-template-columns: 1fr;
    }

    .escort-security-cards {
        grid-template-columns: 1fr;
    }

    .escort-security-images {
        grid-template-columns: repeat(2, 1fr);
    }

    .escort-contact-content {
        grid-template-columns: 1fr;
    }

    .escort-contact-right {
        align-items: flex-start;
    }

    .escort-tracking-apps {
        flex-wrap: wrap;
    }
}

@media (max-width: 768px) {
    .escort-banner {
        height: auto;
        min-height: 500px;
        padding-bottom: 80px;
    }

    .escort-banner-content {
        padding-top: 60px;
    }

    .escort-stats-content {
        flex-wrap: wrap;
        gap: 24px;
    }

    .escort-stat-item {
        flex: 1 1 40%;
    }

    .escort-delivery-centers {
        grid-template-columns: 1fr;
    }

    .escort-security-images {
        grid-template-columns: 1fr 1fr;
    }

    .escort-section {
        padding: 60px 0;
    }
}

/* ============================================================
   移动端版本（esm- 前缀，≤1024px 生效，web 端 DOM/CSS/script 零改动）
   · 桌面（>1024px）隐藏移动根；≤1024px 隐藏桌面根、显示移动根
   · 所有移动样式限定在 .esm-page 作用域内
   · 不给 .esm-page 设 overflow:hidden，避免破坏 .esm-nav 的 sticky
   ============================================================ */
.esm-page { display: none; }

@media (max-width: 1024px) {
    .escort-page { display: none; }
    .esm-page { display: block; }
}

/* ===== 移动根变量与基础 ===== */
.esm-page {
    --esm-blue: #0F62FE;
    --esm-ink: #1A1A2E;
    --esm-muted: #5A6578;
    --esm-bg: #f4f7fb;
    --esm-white: #fff;
    --esm-border: #e2e8f0;
    font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    color: var(--esm-ink);
    background: var(--esm-white);
}
.esm-container { width: min(100% - 32px, 720px); margin: 0 auto; }
.esm-indent { text-indent: 2em; }
/* 数字动画：后缀继承父级字号/颜色 */
.esm-count { font-size: inherit !important; font-weight: inherit !important; color: inherit !important; }
.esm-page em { font-style: normal; }
/* 入场动画（移动独立 observer 命中后加 .esm-visible） */
.esm-animate { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
.esm-animate.esm-visible { opacity: 1; transform: translateY(0); }

/* ===== Banner ===== */
.esm-banner { position: relative; padding: 32px 0 26px; background: linear-gradient(159deg, #FFFFFF 0%, #EEF3FA 40%, #DCE8F5 100%); }
.esm-banner-content { position: relative; z-index: 2; }
.esm-badge {
    position: relative; display: inline-block; padding: 6px 14px 6px 26px; margin-bottom: 18px;
    border-radius: 999px; background: #FDECEA; color: #C0392B; font-size: 12px; font-weight: 600; letter-spacing: .03em;
}
.esm-badge::before { content: ''; position: absolute; top: 50%; left: 12px; transform: translateY(-50%); width: 6px; height: 6px; border-radius: 50%; background: #C0392B; }
.esm-banner-title { margin: 0 0 14px; font-size: 30px; font-weight: 700; line-height: 1.25; letter-spacing: 1px; color: #0F62FE; }
.esm-banner-title span { color: #1A1A2E; }
.esm-banner-desc { margin: 0 0 22px; font-size: 14px; line-height: 1.8; color: #5A6578; }
.esm-banner-actions { display: flex; gap: 12px; }
.esm-btn {
    flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 14px 16px; border-radius: 10px; font-size: 15px; font-weight: 600; line-height: 1; text-decoration: none;
}
.esm-btn-primary { background: #0F62FE; color: #fff; }
.esm-btn-ghost { background: #fff; color: #1A1A2E; border: 1px solid #DCE8F5; }
.esm-btn-icon { width: 16px; height: 16px; flex-shrink: 0; }
.esm-banner-hero { margin-top: 22px; }
.esm-banner-hero img { display: block; width: 100%; height: auto; border-radius: 12px; }
/* 统计数字：5 项 → flex 换行居中（首行 3、末行 2 居中） */
.esm-stats { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 18px; }
.esm-stat-item { flex: 1 1 30%; min-width: 92px; text-align: center; padding: 14px 6px; background: rgba(255, 255, 255, .6); border-radius: 10px; }
.esm-stat-item strong { display: block; font-size: 22px; font-weight: 700; color: #0F62FE; line-height: 1.2; }
.esm-stat-item em { font-size: 12px; font-weight: 600; margin-left: 2px; }
.esm-stat-item > span { display: block; margin-top: 6px; font-size: 11px; line-height: 1.4; color: #8892A4; }

/* ===== 锚点导航（sticky）===== */
.esm-nav {
    position: sticky; top: 76px; z-index: 15; display: flex; gap: 4px; padding: 0 8px;
    background: #F4F7FB; border-bottom: 1px solid var(--esm-border);
    overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none;
}
.esm-nav::-webkit-scrollbar { display: none; }
.esm-nav-tab {
    position: relative; flex: 1; flex-shrink: 0; text-align: center; padding: 14px 10px;
    font-size: 14px; font-weight: 500; color: #161616; text-decoration: none; white-space: nowrap;
}
.esm-nav-tab-active { color: #0F62FE; font-weight: 700; }
.esm-nav-tab-active::after { content: ''; position: absolute; left: 16px; right: 16px; bottom: 6px; height: 3px; border-radius: 2px 2px 0 0; background: #0F62FE; }

/* ===== 通用 section / 标题 ===== */
.esm-section { position: relative; padding: 40px 0; scroll-margin-top: 130px; }
.esm-head { text-align: center; margin-bottom: 24px; }
.esm-head-icon { width: 44px; height: 44px; margin-bottom: 10px; }
.esm-en { display: block; margin-bottom: 6px; color: #0F62FE; font-size: 12px; font-weight: 700; letter-spacing: .1em; }
.esm-en-orange { color: #FF913D; }
.esm-en-light { color: #fff; }
.esm-head h2 { margin: 0; font-size: 24px; font-weight: 700; line-height: 1.3; letter-spacing: 1px; color: #1A1A2E; }
.esm-h2-sub { display: block; margin-top: 8px; font-size: 15px; font-weight: 600; letter-spacing: 0; color: #0F62FE; }
.esm-title-light { color: #fff; }
.esm-h2-sub-light { display: block; margin-top: 8px; font-size: 15px; font-weight: 500; letter-spacing: 0; color: rgba(255, 255, 255, .9); }
.esm-sub { margin: 10px 0 0; font-size: 14px; line-height: 1.7; color: var(--esm-muted); }

/* ===== 资质与团队 ===== */
.esm-qualify { background: #fff; }
.esm-qualify-text p { margin: 0 0 14px; font-size: 14px; line-height: 1.9; color: #5A6578; }
.esm-qualify-text p:last-child { margin-bottom: 0; }
.esm-qualify-text strong { color: #1A1A2E; font-weight: 600; }
.esm-tags { display: flex; flex-wrap: wrap; gap: 10px; margin: 18px 0 22px; }
.esm-tag {
    position: relative; display: inline-flex; align-items: center; padding: 6px 14px 6px 30px;
    border-radius: 999px; font-size: 12px; font-weight: 600;
}
.esm-tag::before { content: ''; position: absolute; left: 11px; top: 50%; transform: translateY(-50%); width: 13px; height: 13px; background-size: contain; background-repeat: no-repeat; }
.esm-tag-orange { background: #FDECEA; color: #C0392B; }
.esm-tag-orange::before { background-image: url('/assets/images/escort/box-icon1.png'); }
.esm-tag-blue { background: #E8F0FA; color: #1A5FA8; }
.esm-tag-blue::before { background-image: url('/assets/images/escort/box-icon2.png'); }
.esm-tag-green { background: #E8F0FA; color: #1A5FA8; }
.esm-tag-green::before { background-image: url('/assets/images/escort/box-icon3.png'); }
.esm-tag-red { background: #FDF6E3; color: #B8860B; }
.esm-tag-red::before { background-image: url('/assets/images/escort/box-icon4.png'); }
.esm-license-row { display: flex; gap: 12px; }
.esm-license-fig { flex: 1; min-width: 0; margin: 0; text-align: center; }
.esm-license-fig img { display: block; width: 100%; height: auto; border-radius: 8px; }
.esm-license-fig figcaption { margin-top: 8px; font-size: 12px; font-weight: 700; color: #0F62FE; }
.esm-checklist { display: flex; flex-direction: column; gap: 12px; margin-top: 22px; }
.esm-check-item { display: flex; align-items: flex-start; gap: 10px; padding: 14px; background: #F8FAFF; border: 1px solid #E8EEFF; border-radius: 10px; }
.esm-check-item img { width: 26px; height: 26px; flex-shrink: 0; }
.esm-check-item span { font-size: 13px; line-height: 1.7; color: #5A6578; }
.esm-check-item strong { color: #1A1A2E; font-weight: 600; }

/* ===== 全国八大交付中心 ===== */
.esm-delivery { background: #fff; }
.esm-map { margin-bottom: 20px; line-height: 0; }
.esm-map img { display: block; width: 100%; height: auto; }
.esm-centers { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.esm-center { position: relative; display: flex; gap: 10px; padding: 14px 12px; background: #F4F7FB; border-radius: 8px; }
.esm-center-hq { overflow: hidden; }
.esm-center-hq::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; border-radius: 100px 100px 0 0; background: #FF913D; }
.esm-center-hq-icon { width: 32px; height: 32px; flex-shrink: 0; }
.esm-center-icon { width: 24px; height: 24px; flex-shrink: 0; margin-top: 2px; }
.esm-center strong { display: block; font-size: 15px; font-weight: 600; color: #1A1A2E; }
.esm-center strong span { font-size: 12px; font-weight: 400; color: #5A6578; margin-left: 2px; }
.esm-center p { margin: 4px 0 0; font-size: 12px; line-height: 1.5; color: #5A6578; }
.esm-delivery-desc { margin: 20px 0 0; font-size: 14px; line-height: 1.8; color: #5A6578; }

/* ===== 任务全程追踪 ===== */
.esm-tracking { position: relative; overflow: hidden; background: #0B2144; padding-bottom: 44px; }
.esm-tracking-bg { position: absolute; inset: 0; z-index: 0; line-height: 0; pointer-events: none; }
.esm-tracking-bg img { width: 100%; height: 100%; object-fit: cover; }
.esm-tracking-inner { position: relative; z-index: 2; }
.esm-apps {
    display: flex; gap: 14px; margin-top: 4px; padding: 4px 16px 12px;
    overflow-x: auto; -webkit-overflow-scrolling: touch; scroll-snap-type: x mandatory; scrollbar-width: none;
}
.esm-apps::-webkit-scrollbar { display: none; }
.esm-app { flex: 0 0 auto; width: 188px; scroll-snap-align: center; display: flex; flex-direction: column; align-items: center; }
.esm-app img { display: block; width: 188px; height: auto; border-radius: 14px; }
.esm-app-step { display: flex; flex-direction: column; align-items: center; gap: 6px; margin-top: 12px; }
.esm-step-num { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 50%; background: #fff; color: #0F62FE; font-size: 13px; font-weight: 700; }
.esm-app-step span:last-child { font-size: 13px; color: rgba(255, 255, 255, .92); text-align: center; }

/* ===== 安全保密能力 ===== */
.esm-security { background: #fff; }
.esm-sec-cards { display: flex; flex-direction: column; gap: 14px; }
.esm-sec-card { padding: 20px 18px; background: #F8FAFF; border: 1px solid #E8EEFF; border-radius: 12px; }
.esm-sec-card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.esm-sec-num { display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 6px; background: #0F62FE; color: #fff; font-size: 12px; font-weight: 700; flex-shrink: 0; }
.esm-sec-card h4 { margin: 0; font-size: 17px; font-weight: 600; color: #1A1A2E; }
.esm-sec-card p { margin: 0; font-size: 13px; line-height: 1.8; color: #5A6578; }
.esm-sec-card p strong { color: #1A1A2E; font-weight: 600; }
.esm-sec-imgs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-top: 24px; }
.esm-sec-imgs figure { margin: 0; min-width: 0; text-align: center; }
.esm-sec-imgs img { display: block; width: 100%; height: auto; border-radius: 10px; }
.esm-sec-imgs figcaption { margin-top: 8px; font-size: 12px; font-weight: 700; color: #0F62FE; }

/* ===== 联系我们 ===== */
.esm-contact { background: #f4f7fb; }
.esm-contact-bg { position: absolute; top: 0; left: 0; width: 100%; z-index: 0; line-height: 0; pointer-events: none; }
.esm-contact-bg img { display: block; width: 100%; height: auto; }
.esm-contact-inner { position: relative; z-index: 2; }
.esm-contact-body { padding: 24px 20px; background: rgba(255, 255, 255, .6); border: 1px solid #F0F2F5; border-radius: 16px; }
.esm-contact-company { margin: 0 0 12px; font-size: 20px; font-weight: 700; line-height: 1.4; color: #1A1A2E; }
.esm-contact-desc { margin: 0 0 20px; font-size: 13px; line-height: 1.8; color: #5A6578; }
.esm-contact-links { display: flex; flex-direction: column; gap: 14px; margin-bottom: 24px; }
.esm-contact-link { display: flex; align-items: flex-start; gap: 12px; }
.esm-contact-link img { width: 40px; height: 40px; flex-shrink: 0; }
.esm-link-label { display: block; margin-bottom: 2px; font-size: 12px; color: #8892A4; }
.esm-contact-link p { margin: 0; font-size: 14px; font-weight: 500; line-height: 1.5; color: #1A1A2E; }
.esm-qrcode { display: flex; flex-direction: column; align-items: center; margin-bottom: 20px; }
.esm-qrcode-box {
    width: 160px; height: 160px; margin-bottom: 10px; background: #fff; border-radius: 16px;
    display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 18px rgba(0, 0, 0, .08);
}
.esm-qrcode-box img { width: 160px; height: 160px; border-radius: 16px; }
.esm-qrcode-text { margin: 0; font-size: 12px; color: #8892A4; }
.esm-contact-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 14px 20px;
    background: #0F62FE; color: #fff; font-size: 15px; font-weight: 600; border-radius: 12px; text-decoration: none;
}

/* ===== 手机级微调 ===== */
@media (max-width: 560px) {
    .esm-nav { top: 66px; }
    .esm-section { scroll-margin-top: 120px; }
    .esm-banner-title { font-size: 26px; }
    .esm-head h2 { font-size: 21px; }
}

@media (max-width: 380px) {
    .esm-stat-item strong { font-size: 19px; }
    .esm-stat-item > span { font-size: 10px; }
    .esm-banner-actions { flex-direction: column; }
    .esm-centers { grid-template-columns: 1fr; }
}
</style>
