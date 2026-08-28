<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// @ts-ignore
const source = useCampaignSource()
// @ts-ignore
const contactRoute = computed(() => getContactRoute(10, source.value))

const navTabs = [
    { label: '产品介绍', target: 'ot-product' },
    { label: '核心功能', target: 'ot-core' },
    { label: '应用场景', target: 'ot-scene' },
    { label: '数据验证', target: 'ot-data' },
]
const activeNav = ref('ot-product')

const scrollToSection = (target: string) => {
    const el = document.getElementById(target)
    if (el) {
        const headerOffset = 60
        const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
    }
}

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
    const sections = navTabs.map(t => document.getElementById(t.target))
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

const otSection = ref<HTMLElement>()
const observerOptions = { threshold: 0.12 }

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    if (otSection.value) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ot-visible')
                    observer.unobserve(entry.target)
                }
            })
        }, observerOptions)
        otSection.value.querySelectorAll('.ot-animate').forEach(el => {
            observer.observe(el as HTMLElement)
        })
    }
})

const coreFeatures = [
    {
        icon: '/assets/images/onlineTest/box3-img1.png',
        title: '多机位监考+监考大屏',
        content: '支持电脑端摄像头监控、电脑屏幕监控、手机第二机位视角监控，提供监考大厅功能，保障考试公平公正',
        tags: ['多视角监控考试状态', '监考视频备份可查', '保障考试公平公正'],
    },
    {
        icon: '/assets/images/onlineTest/box3-img2.png',
        title: '智能防作弊技术',
        content: '支持人脸识别、防切屏搜答案、题目和选项乱序、随机出题、代码查重等功能，监测考生离开屏幕、他人进入屏幕等异常行为',
        tags: ['人脸识别', '自动监测考生异常', '题目和选项乱序'],
    },
    {
        icon: '/assets/images/onlineTest/box3-img3.png',
        title: '专业题库管理',
        content: '中测在线考试系统支持多种题型，提供公有题库，支持自行批量上传题目，同时中测高科提供专业出题服务，助力客户打造科学完整的题库',
        tags: ['公有+私有题库', '涵盖各类考试题型', '批量快捷题目录入'],
    },
    {
        icon: '/assets/images/onlineTest/box3-img4.png',
        title: '数字化考试流程管理',
        content: '提供短信、邮件、AI语音电话等通知方式，确保到场率；支持项目创建及考试面试一体化流程设计与管理；支持考试数据存档与分析',
        tags: ['多种通知方式', '考试面试一体化', '数据存档与分析'],
    },
    {
        icon: '/assets/images/onlineTest/box3-img5.png',
        title: '支持数据导出和系统对接',
        content: '提供多种数据维度的考生考试报告，支持考试数据一键导出，支持考试数据通过API对接到自研或第三方招聘管理系统',
        tags: ['出具考试报告', '考试数据导出', '支持系统对接'],
    },
]

const sceneCards = [
    {
        icon: '/assets/images/onlineTest/box4-icon1.png',
        title: '大型企业校招笔试',
        content: '万人级并发支撑，候选人远程在家笔试，自动化阅卷当天出分，高效筛选人才',
    },
    {
        icon: '/assets/images/onlineTest/box4-icon2.png',
        title: '社会招聘笔试',
        content: '全流程防作弊保障公平公正，智能监考实时监测异常行为，降低90%组织成本',
    },
    {
        icon: '/assets/images/onlineTest/box4-icon3.png',
        title: '职业资格认证测评',
        content: '公安人脸核验 + 多机位监考，满足国家级认证考试的严肃性与合规要求',
    },
    {
        icon: '/assets/images/onlineTest/box4-icon4.png',
        title: '技能竞赛与选拔',
        content: '支持编程题、实操题等多题型，远程多机位监考，为行业技能人才选拔提供标准化方案',
    },
]

const testimonials = [
    {
        avatar: '李',
        name: '李部长',
        role: '某电力集团人力资源部',
        content: '2600余名考生同时在线校招笔试，从模拟测试到正式考试全程流畅。自动化阅卷当天出分，招聘效率提升了数倍，大幅缩短了人才筛选周期。',
    },
    {
        avatar: '张',
        name: '张主任',
        role: '某互联网企业招聘中心负责人',
        content: '考试星的智能防作弊体系让我们实现了真正的远程笔试，候选人无需到场，在家即可完成笔试。监考人力成本降低了近九成，招聘公平性反而更高了。',
    },
    {
        avatar: '王',
        name: '王处长',
        role: '某国企信息化管理部',
        content: '私有化部署方案让我们的人事数据完全不出内网，API接口与现有OA系统无缝对接，上线仅用两周。全流程托管服务让招聘团队可以专注核心决策。',
    },
]
</script>

<template>
    <div ref="otSection" class="ot-page">
        <!-- ========== Banner ========== -->
        <section class="ot-banner">
            <div class="ot-banner-wrapper">
                <div class="ot-banner-bg">
                    <img src="/assets/images/onlineTest/banner-bg.png" alt="" class="ot-banner-bg-img" />
                </div>
                <div class="container-ot ot-banner-content">
                    <div class="ot-banner-badge">智能在线笔试平台</div>
                    <h1 class="ot-banner-title">稳定可靠<br />的专业<span class="ot-highlight">在线考试平台</span></h1>
                    <p class="ot-banner-desc">能监考及多重防作弊体系，专业题库管理功能，数字化考试流程管理，确保在线考试公平公正、稳定安全。</p>
                    <div class="ot-banner-actions">
                        <NuxtLink class="ot-btn ot-btn-primary" :to="contactRoute">免费体验笔试系统</NuxtLink>
                        <a href="#ot-core" class="ot-btn ot-btn-outline"
                            @click.prevent="scrollToSection('ot-core')">了解核心功能</a>
                    </div>
                </div>
            </div>
            <div class="ot-data-row">
                <div class="container-ot ot-data-inner">
                    <div class="ot-data-item">
                        <strong><span class="ot-count-number" v-count-up="6000">6000</span><span
                                class="ot-count-plus">+</span></strong>
                        <span>企业客户信赖选择</span>
                    </div>
                    <div class="ot-data-divider"></div>
                    <div class="ot-data-item">
                        <strong><span class="ot-count-number" v-count-up="180000">180000</span><span
                                class="ot-count-plus">+</span></strong>
                        <span>累计服务考试人次</span>
                    </div>
                    <div class="ot-data-divider"></div>
                    <div class="ot-data-item">
                        <strong><span class="ot-count-number" v-count-up="90">90</span><span
                                class="ot-count-percent">%</span></strong>
                        <span>组织成本降低</span>
                    </div>
                    <div class="ot-data-divider"></div>
                    <div class="ot-data-item">
                        <strong><span class="ot-count-number" v-count-up="20000">20000</span><span
                                class="ot-count-plus">+</span></strong>
                        <span>考试场次成功交付</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 导航标签 ========== -->
        <!-- <nav class="ot-nav-bar">
            <div class="container-ot ot-nav-inner">
                <a v-for="tab in navTabs" :key="tab.target" class="ot-nav-tab"
                    :class="{ 'ot-nav-tab-active': activeNav === tab.target }"
                    @click.prevent="scrollToSection(tab.target)" href="javascript:void(0)">
                    {{ tab.label }}
                </a>
            </div>
        </nav> -->

        <!-- ========== 四视角区 ========== -->
        <section id="ot-product" class="ot-section ot-perspective-section">
            <div class="container-ot">
                <div class="ot-section-header ot-section-header-center ot-animate">
                    <p class="ot-section-kicker">Intelligent Discrimination</p>
                    <h2 class="ot-section-title">四视角360°智能甄辨，全方位考场监测领跑业界</h2>
                    <p class="ot-section-subtitle">中测在线考试系统支持四个视角对考生作答环境进行跟踪，360°全方位监测考生作弊行为</p>
                </div>
                <div class="ot-perspective-img-wrap ot-animate">
                    <img src="/assets/images/onlineTest/box1-img.png" alt="" class="ot-perspective-img" />
                </div>
            </div>
        </section>

        <!-- ========== 新一代区 ========== -->
        <section class="ot-section ot-newgen-section">
            <div class="container-ot ot-newgen-content ot-animate">
                <div class="ot-newgen-left">
                    <p class="ot-section-kicker ot-kicker-white1">Intelligent System</p>
                    <h2 class="ot-section-title ot-title-white">新一代智能在线考试系统</h2>
                    <p class="ot-newgen-subtitle">别看小 别小看</p>
                    <h3 class="ot-newgen-feature-title">新一代智能考试客户端双端联动让考试更安全</h3>
                    <p class="ot-newgen-desc comm-indent">
                        中测高科新一代智能考试客户端，与网页答题端智能联动，通过对考生系统环境、违规应用软件的快速检测与拦截，有效杜绝考生在考试过程中利用外设、应用程序等作弊的现象。</p>
                </div>
                <div class="ot-newgen-right">
                    <img src="/assets/images/onlineTest/box2-img.png" alt="" class="ot-newgen-img" />
                </div>
            </div>
        </section>

        <!-- ========== 核心功能区 ========== -->
        <section id="ot-core" class="ot-section ot-core-section">
            <div class="container-ot">
                <div class="ot-section-header ot-section-header-center ot-animate">
                    <p class="ot-section-kicker">CORE CAPABILITIES</p>
                    <h2 class="ot-section-title">核心功能</h2>
                    <p class="ot-section-subtitle">支持各类考试场景，助力招考方便快捷、公平公正</p>
                </div>
                <div class="ot-core-list">
                    <div v-for="(feature, idx) in coreFeatures" :key="idx" class="ot-core-item ot-animate">
                        <div class="ot-core-item-image">
                            <img :src="feature.icon" alt="" class="ot-core-item-img" />
                        </div>
                        <div class="ot-core-item-content">
                            <h3>{{ feature.title }}</h3>
                            <p class="comm-indent">{{ feature.content }}</p>
                            <div class="ot-core-tags">
                                <span v-for="(tag, tidx) in feature.tags" :key="tidx" class="ot-core-tag">{{ tag
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 覆盖各类区 ========== -->
        <section id="ot-scene" class="ot-section ot-scene-section">
            <div class="ot-scene-bg">
                <img src="/assets/images/onlineTest/bg1.png" alt="" class="ot-scene-bg-img" />
            </div>
            <div class="container-ot">
                <div class="ot-section-header ot-animate">
                    <p class="ot-section-kicker ot-kicker-white2">USE CASES</p>
                    <h2 class="ot-section-title ot-title-white">覆盖各类招聘笔试场景</h2>
                    <p class="ot-section-subtitle ot-subtitle-white">无论是万人规模校招还是社会招聘，都能提供匹配的在线笔试方案</p>
                </div>
                <div class="ot-scene-grid ot-animate">
                    <div v-for="(card, idx) in sceneCards" :key="idx" class="ot-scene-card">
                        <img :src="card.icon" alt="" class="ot-scene-card-icon" />
                        <div>
                            <h3>{{ card.title }}</h3>
                            <p>{{ card.content }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 数据验证区 ========== -->
        <section id="ot-data" class="ot-section ot-data-section">
            <div class="ot-data-bg">
                <img src="/assets/images/onlineTest/bg2.png" alt="" class="ot-data-bg-img" />
            </div>
            <div class="container-ot">
                <div class="ot-section-header ot-animate">
                    <p class="ot-section-kicker">PROVEN RESULTS</p>
                    <h2 class="ot-section-title">数据验证，招聘效率显著提升</h2>
                    <p class="ot-section-subtitle">AI技术为在线笔试带来的效率与公平性提升</p>
                </div>
                <div class="ot-charts ot-animate">
                    <div class="ot-chart-card">
                        <h4 class="ot-chart-title">招聘笔试组织效率对比</h4>
                        <div class="ot-chart-bars">
                            <div class="ot-bar-row">
                                <span class="ot-bar-label">人工监考</span>
                                <div class="ot-bar-track">
                                    <div class="ot-bar ot-bar-light" style="width: 60%"></div>
                                </div>
                                <span class="ot-bar-value">30 人/场</span>
                            </div>
                            <div class="ot-bar-row">
                                <span class="ot-bar-label">AI 监考</span>
                                <div class="ot-bar-track">
                                    <div class="ot-bar ot-bar-dark" style="width: 20%"></div>
                                </div>
                                <span class="ot-bar-value">3 人/场</span>
                            </div>
                        </div>
                        <div class="ot-chart-legend">
                            <span class="ot-legend-item"><span class="ot-legend-dot ot-legend-light"></span>传统方式</span>
                            <span class="ot-legend-item"><span class="ot-legend-dot ot-legend-dark"></span>AI 赋能后</span>
                        </div>
                    </div>
                    <div class="ot-chart-card">
                        <h4 class="ot-chart-title">简历筛选与阅卷速度提升</h4>
                        <div class="ot-chart-bars">
                            <div class="ot-bar-row">
                                <span class="ot-bar-label">人工批改</span>
                                <div class="ot-bar-track">
                                    <div class="ot-bar ot-bar-light" style="width: 30%"></div>
                                </div>
                                <span class="ot-bar-value">50 份/时</span>
                            </div>
                            <div class="ot-bar-row">
                                <span class="ot-bar-label">AI 辅助</span>
                                <div class="ot-bar-track">
                                    <div class="ot-bar ot-bar-dark" style="width: 80%"></div>
                                </div>
                                <span class="ot-bar-value">300 份/时</span>
                            </div>
                        </div>
                        <div class="ot-chart-legend">
                            <span class="ot-legend-item"><span class="ot-legend-dot ot-legend-light"></span>传统方式</span>
                            <span class="ot-legend-item"><span class="ot-legend-dot ot-legend-dark"></span>AI 赋能后</span>
                        </div>
                    </div>
                </div>
                <div class="ot-testimonials ot-animate">
                    <h4 class="ot-testimonials-title">企业客户评价</h4>
                    <div class="ot-testimonial-grid">
                        <div v-for="(item, idx) in testimonials" :key="idx" class="ot-testimonial-card">
                            <p class="ot-testimonial-content comm-indent">{{ item.content }}</p>
                            <div class="ot-testimonial-author">
                                <div class="ot-avatar">{{ item.avatar }}</div>
                                <div>
                                    <div class="ot-author-name">{{ item.name }}</div>
                                    <div class="ot-author-role">{{ item.role }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== CTA区 ========== -->
        <section class="ot-section ot-cta-section">
            <div class="container-ot ot-cta-content ot-animate">
                <h2 class="ot-cta-title">准备好升级您的招聘考试系统了吗？</h2>
                <p class="ot-cta-subtitle">7天免费试用，全功能开放，专属顾问一对一支持</p>
                <div class="ot-cta-actions">
                    <NuxtLink class="ot-btn ot-btn-white" :to="contactRoute">免费试用笔试系统</NuxtLink>
                    <NuxtLink class="ot-btn ot-btn-outline-white" :to="contactRoute">预约笔试方案演示</NuxtLink>
                </div>
                <p class="ot-cta-phone">或致电咨询：17770081545</p>
            </div>
        </section>
    </div>
</template>

<style scoped>
.comm-indent {
    text-indent: 2em;
}

/* ===== 基础变量 ===== */
.ot-page {
    --ot-blue: #0F62FE;
    --ot-blue-dark: #0043CE;
    --ot-ink: #1A1A2E;
    --ot-muted: #5A6578;
    --ot-white: #fff;
    font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    color: var(--ot-ink);
}

.container-ot {
    width: min(1200px, calc(100% - 40px));
    margin: 0 auto;
}

/* ===== 滚动动画 ===== */
.ot-animate {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.ot-animate.ot-visible {
    opacity: 1;
    transform: translateY(0);
}

.ot-animate:nth-child(2) {
    transition-delay: 0.1s;
}

.ot-animate:nth-child(3) {
    transition-delay: 0.2s;
}

.ot-animate:nth-child(4) {
    transition-delay: 0.3s;
}

/* ===== 通用 Section ===== */
.ot-section {
    width: 100%;
    position: relative;
}

.ot-section-header {
    margin-bottom: 44px;
}

.ot-section-header-center {
    text-align: center;
}

.ot-section-kicker {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 3px;
    color: var(--ot-blue);
    text-transform: uppercase;
    margin: 0 0 12px;
}

.ot-kicker-white {
    color: rgba(255, 255, 255, 0.7);
}

.ot-kicker-white1 {
    color: #01F7FB;
}

.ot-kicker-white2 {
    color: #60A5FA;
}

.ot-section-title {
    font-size: 32px;
    font-weight: 600;
    color: var(--ot-ink);
    line-height: 1.35;
    margin: 0 0 12px;
}

.ot-title-white {
    color: #fff;
}

.ot-section-subtitle {
    color: #4A5568;
    font-size: 16px;
    line-height: 1.76;
}

.ot-subtitle-white {
    color: rgba(255, 255, 255, 0.7);
}

.ot-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 19px 32px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    line-height: 1;
}

.ot-btn-primary {
    background: #0F62FE;
    color: #fff;
}

.ot-btn-primary:hover {
    background: var(--ot-blue-dark);
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(15, 98, 254, 0.4);
}

.ot-btn-outline {
    background: transparent;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.5);
}

.ot-btn-outline:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #fff;
}

.ot-btn-white {
    background: #fff;
    color: var(--ot-blue);
}

.ot-btn-white:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.ot-btn-outline-white {
    background: transparent;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.5);
}

.ot-btn-outline-white:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #fff;
}

/* ===== Banner ===== */
.ot-banner {
    width: 100%;
    height: 626px;
    background: linear-gradient(127deg, #070E1A 0%, #00296F 68.22%, #122244 97.08%);
    position: relative;
}

.ot-banner-wrapper {
    width: 1440px;
    margin: 0 auto;
    height: 100%;
    position: relative;
}

.ot-banner-bg {
    position: absolute;
    top: 77px;
    right: -75px;
    width: 937px;
    height: 396px;
    pointer-events: none;
}

.ot-banner-bg-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.ot-banner-content {
    position: absolute;
    z-index: 2;
    top: 77px;
    left: 137px;
}

.ot-banner-badge {
    display: inline-block;
    padding: 10px 17px 10px 31px;
    background: rgba(37, 99, 235, 0.12);
    border-radius: 100px;
    font-weight: 600;
    font-size: 13px;
    color: #60A5FA;
    line-height: 16px;
    border: 1px solid rgba(37, 99, 235, 0.2);
    margin-bottom: 21px;
    position: relative;
}

.ot-banner-badge::before {
    content: "";
    width: 6px;
    height: 6px;
    background: #60A5FA;
    border-radius: 50%;
    position: absolute;
    left: 17px;
    top: 50%;
    transform: translateY(-50%);
}

.ot-banner-title {
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 600;
    color: #fff;
    line-height: 1.21;
    letter-spacing: 0.1em;
    margin: 0 0 21px;
}

.ot-highlight {
    color: #0FDAFE;
}

.ot-banner-desc {
    font-weight: 400;
    font-size: 17px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 29px;
    margin: 0 0 55px;
    max-width: 432px;
}

.ot-banner-actions {
    display: flex;
    align-items: center;
    gap: 14px;
}

/* ===== 数据行 ===== */
.ot-data-row {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 124px;
    background: rgba(255, 255, 255, 0.1);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    z-index: 3;
}

.ot-data-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    gap: 90px;
}

.ot-data-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
}

.ot-data-item strong {
    font-size: 40px;
    font-weight: 600;
    color: #fff;
    line-height: 1.1;
}

.ot-data-item span {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.45);
}

.ot-data-divider {
    width: 1px;
    height: 40px;
    background: rgba(255, 255, 255, 0.15);
}

.ot-count-number {
    font-size: 36px !important;
    font-weight: inherit !important;
    color: inherit !important;
}

.ot-count-plus,
.ot-count-percent {
    font-size: 20px !important;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.45) !important;
    margin-left: 2px;
}

/* ===== 导航标签 ===== */
.ot-nav-bar {
    width: 100%;
    height: 56px;
    background: #f4f7fb;
    position: sticky;
    top: 76px;
    left: 0;
    z-index: 15;
}

.ot-nav-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 77px;
    height: 100%;
}

.ot-nav-tab {
    font-size: 16px;
    font-weight: 400;
    color: #161616;
    text-decoration: none;
    padding: 16px 0;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
    cursor: pointer;
}

.ot-nav-tab:hover {
    color: var(--ot-blue);
}

.ot-nav-tab-active {
    color: var(--ot-blue);
    border-bottom-color: var(--ot-blue);
}

/* ===== 四视角区 ===== */
.ot-perspective-section {
    padding: 132px 0 61px;
    background: #fff;
}

.ot-perspective-img-wrap {
    text-align: center;
}

.ot-perspective-img {
    max-width: 100%;
    height: auto;
}

/* ===== 新一代区 ===== */
.ot-newgen-section {
    padding: 31px 0 36px;
    background: linear-gradient(318deg, #1B1B1B 0%, #001342 100%);
    height: 619px;
}

.ot-newgen-content {
    display: flex;
    justify-content: space-between;
    gap: 60px;
}

.ot-newgen-left {
    flex: 1;
    max-width: 432px;
    margin: 21px 0 0;
}

.ot-newgen-subtitle {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    margin: 0 0 66px;
}

.ot-newgen-feature-title {
    font-weight: 600;
    font-size: 20px;
    color: #01F7FB;
    line-height: 29px;
    margin: 0 0 18px;
}

.ot-newgen-desc {
    font-weight: 400;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 24px;
    margin: 0;
}

.ot-newgen-right {
    flex-shrink: 0;
}

.ot-newgen-img {
    width: 736px;
    height: 552px;
    object-fit: contain;
}

/* ===== 核心功能区 ===== */
.ot-core-section {
    padding: 89px 0 159px;
    background: #f8fafc;
}

.ot-core-list {
    display: flex;
    flex-direction: column;
    gap: 60px;
}

.ot-core-item {
    display: flex;
    align-items: center;
    gap: 60px;
}

.ot-core-item:nth-child(even) {
    flex-direction: row-reverse;
}

.ot-core-item-image {
    flex-shrink: 0;
}

.ot-core-item-img {
    max-width: 100%;
    height: auto;
}

.ot-core-item-content {
    flex: 1;
}

.ot-core-item-content h3 {
    font-size: 24px;
    font-weight: 600;
    color: var(--ot-ink);
    margin: 0 0 16px;
}

.ot-core-item-content p {
    font-size: 15px;
    color: #4A5568;
    line-height: 1.8;
    margin: 0 0 20px;
}

.ot-core-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.ot-core-tag {
    display: inline-block;
    padding: 2px 32px;
    background: #E3EDFF;
    border-radius: 4px;
    font-size: 12px;
    color: #1A5FFF;
}

/* ===== 覆盖各类区 ===== */
.ot-scene-section {
    position: relative;
    padding: 98px 0;
    background: #0C1D3A;
    height: 647px;
    overflow: hidden;
}

.ot-scene-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 647px;
    pointer-events: none;
}

.ot-scene-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.ot-scene-section .container-ot {
    position: relative;
    z-index: 2;
}

.ot-scene-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.ot-scene-card {
    padding: 33px 50px 33px 25px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 10px 10px 10px 10px;
    border: 1px solid rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    display: flex;
    gap: 24px;
    align-items: center;
}

.ot-scene-card:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
}

.ot-scene-card-icon {
    width: 78px;
    height: 78px;
    margin-bottom: 20px;
}

.ot-scene-card h3 {
    font-weight: 600;
    font-size: 17px;
    color: #FFFFFF;
    line-height: 21px;
    margin: 0 0 13px;
}

.ot-scene-card p {
    font-weight: 600;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 22px;
    margin: 0;
}

/* ===== 数据验证区 ===== */
.ot-data-section {
    position: relative;
    padding: 96px 0;
    background: #f2f8fc;
    min-height: 896px;
    overflow: hidden;
}

.ot-data-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 896px;
    pointer-events: none;
}

.ot-data-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.ot-data-section .container-ot {
    position: relative;
    z-index: 2;
}

.ot-charts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-bottom: 48px;
}

.ot-chart-card {
    padding: 32px;
    background: #F8FAFC;
    border-radius: 10px 10px 10px 10px;
    border: 1px solid #E2E8F0;
}

.ot-chart-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--ot-ink);
    margin: 0 0 23px;
}

.ot-chart-bars {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.ot-bar-row {
    display: flex;
    align-items: center;
    gap: 16px;
}

.ot-bar-label {
    width: 70px;
    font-size: 13px;
    color: #64748B;
    flex-shrink: 0;
    text-align: right;
}

.ot-bar-track {
    flex: 1;
    height: 32px;
    background: rgba(37, 99, 235, 0.06);
    border-radius: 4px;
    overflow: hidden;
}

.ot-bar {
    height: 100%;
    border-radius: 4px;
    transition: width 1s ease;
}

.ot-bar-light {
    background: #A9CAF9;
}

.ot-bar-dark {
    background: #2563EB;
}

.ot-bar-value {
    width: 80px;
    font-size: 14px;
    font-weight: 600;
    color: var(--ot-ink);
    text-align: right;
    flex-shrink: 0;
}

.ot-chart-legend {
    display: flex;
    gap: 20px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #E2E8F0;
}

.ot-legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #64748B;
}

.ot-legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 2px;
}

.ot-legend-light {
    background: #CBD5E1;
}

.ot-legend-dark {
    background: var(--ot-blue);
}

/* ===== 企业客户评价 ===== */
.ot-testimonials {
    margin-top: 48px;
}

.ot-testimonials-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--ot-ink);
    margin: 0 0 24px;
}

.ot-testimonial-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
}

.ot-testimonial-card {
    padding: 25px;
    background: #F8FAFC;
    border-radius: 10px;
    border: 1px solid #E2E8F0;
}

.ot-testimonial-content {
    font-weight: 400;
    font-size: 14px;
    color: #161616;
    line-height: 24px;
    padding: 0 0 33px;
    border-bottom: 1px solid #E2E8F0;
    margin-bottom: 20px;
}

.ot-testimonial-author {
    display: flex;
    align-items: center;
    gap: 12px;
}

.ot-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(37, 99, 235, 0.2) 100%);
    color: #2563EB;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    flex-shrink: 0;
}

.ot-author-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--ot-ink);
}

.ot-author-role {
    font-size: 12px;
    color: #64748B;
}

/* ===== CTA区 ===== */
.ot-cta-section {
    padding: 80px 0;
    background: linear-gradient(125deg, #003399 0%, #0052D9 40%, #1677FF 100%);
    height: 460px;
    display: flex;
    align-items: center;
}

.ot-cta-content {
    text-align: center;
}

.ot-cta-title {
    font-size: 32px;
    font-weight: 600;
    color: #fff;
    margin: 0 0 16px;
}

.ot-cta-subtitle {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 32px;
}

.ot-cta-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 24px;
}

.ot-cta-phone {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
}

/* ===== 响应式 ===== */
@media (max-width: 1200px) {
    .ot-banner-wrapper {
        width: 100%;
    }

    .ot-banner-bg {
        right: -50px;
        width: 700px;
    }

    .ot-newgen-img {
        width: 500px;
        height: auto;
    }

    .ot-scene-bg,
    .ot-data-bg {
        width: 100%;
    }
}

@media (max-width: 768px) {
    .ot-banner {
        height: auto;
        min-height: 500px;
    }

    .ot-banner-content {
        left: 20px;
        right: 20px;
    }

    .ot-banner-bg {
        display: none;
    }

    .ot-data-inner {
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
    }

    .ot-data-divider {
        display: none;
    }

    .ot-nav-inner {
        gap: 20px;
        overflow-x: auto;
    }

    .ot-newgen-content {
        flex-direction: column;
    }

    .ot-newgen-img {
        width: 100%;
        height: auto;
    }

    .ot-core-item,
    .ot-core-item:nth-child(even) {
        flex-direction: column;
    }

    .ot-scene-grid,
    .ot-charts,
    .ot-testimonial-grid {
        grid-template-columns: 1fr;
    }

    .ot-cta-section {
        height: auto;
        padding: 60px 0;
    }
}
</style>
