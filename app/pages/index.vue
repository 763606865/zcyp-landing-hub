<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

// 导航标签
const navTabs = [
    { label: '品牌优势', target: 'brand' },
    { label: '网点覆盖', target: 'network' },
    { label: '学术力量', target: 'academic' },
    { label: '题库资源', target: 'question' },
    { label: '核心优势', target: 'advantage' },
    { label: '联系我们', target: 'contact' },
]
const activeNav = ref('brand')

// 滚动到指定区域
const scrollToSection = (target: string) => {
    const el = document.getElementById(`ai-${target}`)
    if (el) {
        const headerOffset = 60
        const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
    }
}

// 滚动时更新激活导航
const handleScroll = () => {
    const sections = navTabs.map(t => document.getElementById(`ai-${t.target}`))
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
const aiSection = ref<HTMLElement>()
const observerOptions = { threshold: 0.12 }

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    if (aiSection.value) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ai-visible')
                    observer.unobserve(entry.target)
                }
            })
        }, observerOptions)
        aiSection.value.querySelectorAll('.ai-animate').forEach(el => {
            observer.observe(el as HTMLElement)
        })
    }
})

// ===================== 移动端（≤1024px）专用逻辑 =====================
// web 端根节点 .ai-page 的模板 / 样式 / 脚本保持零改动；
// 以下状态与副作用仅供移动根节点 .aim-page 使用，与桌面端互不干扰。
const aimSection = ref<HTMLElement>()
const aimNavRef = ref<HTMLElement>()
const aimActiveNav = ref('brand')

// 滚动时高亮当前区块，并把激活的导航 tab 自动滚入横向可视区
const aimHandleScroll = () => {
    let current = navTabs[0]?.target ?? 'brand'
    const y = window.scrollY + 140
    for (let i = navTabs.length - 1; i >= 0; i--) {
        const tab = navTabs[i]
        const el = tab ? document.getElementById(`aim-${tab.target}`) : null
        if (tab && el && el.getBoundingClientRect().top + window.scrollY <= y) {
            current = tab.target
            break
        }
    }
    if (aimActiveNav.value !== current) {
        aimActiveNav.value = current
        nextTick(() => {
            const activeTab = aimNavRef.value?.querySelector('.aim-nav-tab-active') as HTMLElement | null
            activeTab?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
        })
    }
}

onMounted(() => {
    window.addEventListener('scroll', aimHandleScroll, { passive: true })
    if (aimSection.value) {
        const aimObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aim-visible')
                    aimObserver.unobserve(entry.target)
                }
            })
        }, { threshold: 0.1 })
        aimSection.value.querySelectorAll('.aim-animate').forEach(el => {
            aimObserver.observe(el as HTMLElement)
        })
    }
})
</script>

<template>
    <div ref="aiSection" class="ai-page">
        <!-- ========== Banner ========== -->
        <section class="ai-banner">
            <div class="ai-banner-bg">
                <img src="/assets/images/ai_proposition/banner-bg.png" alt="" class="ai-banner-bg-img" />
            </div>
            <div class="ai-banner-content container-ai">
                <span class="ai-badge">中国人事考试安全交付领导品牌</span>
                <h1 class="ai-banner-title">中测高科<span>命题服务</span></h1>
                <p class="ai-banner-desc comm-indent">全国考试命题服务市场占有率、客户满意度遥遥领先的行业<br />头部机构！</p>
                <div class="ai-banner-actions">
                    <NuxtLink class="ai-banner-btn ai-banner-btn-primary" to="/contact?product=2">
                        联系咨询
                    </NuxtLink>
                    <NuxtLink class="ai-banner-btn ai-banner-btn-ghost" to="/contact?product=2">了解更多</NuxtLink>
                </div>
            </div>
            <!-- 统计卡片 -->
            <div class="ai-stats-bar container-ai">
                <div class="ai-stats-content">
                    <div class="ai-stat-item ai-animate">
                        <img src="/assets/images/ai_proposition/banner-icon1.png" alt="" class="ai-stat-icon" />
                        <div>
                            <strong><span class="ai-count-number" v-count-up="28000">28000</span><span class="ai-stat-plus">+</span></strong>
                            <span>年均出库套数</span>
                        </div>
                    </div>
                    <div class="ai-stat-item ai-animate">
                        <img src="/assets/images/ai_proposition/banner-icon2.png" alt="" class="ai-stat-icon" />
                        <div>
                            <strong><span class="ai-count-number" v-count-up="18000">18000</span><span class="ai-stat-plus">+</span></strong>
                            <span>年均笔试套数</span>
                        </div>
                    </div>
                    <div class="ai-stat-item ai-animate">
                        <img src="/assets/images/ai_proposition/banner-icon3.png" alt="" class="ai-stat-icon" />
                        <div>
                            <strong><span class="ai-count-number" v-count-up="9000">9000</span><span class="ai-stat-plus">+</span></strong>
                            <span>年均面试套数</span>
                        </div>
                    </div>
                    <div class="ai-stat-item ai-animate">
                        <img src="/assets/images/ai_proposition/banner-icon4.png" alt="" class="ai-stat-icon" />
                        <div>
                            <strong><span class="ai-count-number" v-count-up="1000">1000</span><span class="ai-stat-plus">+</span></strong>
                            <span>年均其他</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 导航标签 ========== -->
        <nav class="ai-nav-bar">
            <div class="container-ai ai-nav-inner">
                <a v-for="tab in navTabs" :key="tab.target" class="ai-nav-tab"
                    :class="{ 'ai-nav-tab-active': activeNav === tab.target }"
                    @click.prevent="scrollToSection(tab.target)" href="javascript:void(0)">
                    <span class="ai-nav-tab-text">{{ tab.label }}</span>
                </a>
            </div>
        </nav>

        <!-- ========== 品牌优势 ========== -->
        <section id="ai-brand" class="ai-section ai-brand-section">
            <div class="container-ai">
                <div class="ai-section-header ai-section-header-center ai-animate">
                    <span class="ai-section-en">BRAND ADVANTAGE</span>
                    <h2>品牌优势</h2>
                    <p class="ai-section-subtitle">国企、上市公司背景，专注人力资源测评的科技型、学术型服务品牌</p>
                </div>
                <!-- 4个统计卡片 -->
                <div class="ai-brand-stats ai-animate">
                    <div class="ai-brand-stat-card">
                        <img src="/assets/images/ai_proposition/brand-icon1.png" alt="" class="ai-brand-stat-icon" />
                        <div class="box">
                            <div class="ai-brand-stat-num"><span class="ai-count-number" v-count-up="10">10</span><span class="ai-brand-stat-unit">余年</span></div>
                            <div class="ai-brand-stat-desc">行业沉淀</div>
                        </div>

                    </div>
                    <div class="ai-brand-stat-card">
                        <img src="/assets/images/ai_proposition/brand-icon2.png" alt="" class="ai-brand-stat-icon" />
                        <div class="box">
                            <div class="ai-brand-stat-num"><span class="ai-count-number" v-count-up="5000">5000</span><span class="ai-brand-stat-unit">家/年</span></div>
                            <div class="ai-brand-stat-desc">年服务客户数量</div>
                        </div>
                    </div>
                    <div class="ai-brand-stat-card">
                        <img src="/assets/images/ai_proposition/brand-icon3.png" alt="" class="ai-brand-stat-icon" />
                        <div class="box">
                            <div class="ai-brand-stat-num"><span class="ai-count-number" v-count-up="800">800</span><span class="ai-brand-stat-unit">万人次</span></div>
                            <div class="ai-brand-stat-desc">年均服务考生</div>
                        </div>
                    </div>
                    <div class="ai-brand-stat-card">
                        <img src="/assets/images/ai_proposition/brand-icon4.png" alt="" class="ai-brand-stat-icon" />
                        <div class="box">
                            <div class="ai-brand-stat-num"><span class="ai-count-number" v-count-up="3500">3500</span><span class="ai-brand-stat-unit">万人次</span></div>
                            <div class="ai-brand-stat-desc">近五年累计服务考生</div>
                        </div>
                    </div>
                </div>
                <!-- 文字 + 图片 -->
                <div class="ai-brand-content ai-animate">
                    <div class="ai-brand-left">
                        <p class="ai-brand-text comm-indent">
                            中测高科由江西聚才人力资源集团、重庆人才大市场集团、武汉人才集团、科锐国际(300662)等多方于2019年共同投资成立，是一家专注于人力资源测评的科技型、学术型人力资源外包服务公司，是我国组织人事考试和人才测评的第三方服务品牌。
                        </p>
                        <p class="ai-brand-text comm-indent">
                            中测高科在北京、江西、长沙、重庆、成都、海口、包头、怀化等全国各地成立了人力资源开发研究机构（研究院）、人事考试专家命题服务中心，专为组织人社部门"招才引智"，为机关事业单位、国有企业招聘考试提供人才测评、人事考试命题、考务技术支持。
                        </p>
                        <p class="ai-brand-qual-title">资质认证</p>
                        <div class="ai-brand-qual-tags">
                            <span class="ai-qual-tag"><img src="/assets/images/ai_proposition/brand-qual-icon.png"
                                    alt="" /> 国家科技部高新技术企业认证</span>
                            <span class="ai-qual-tag"><img src="/assets/images/ai_proposition/brand-qual-icon.png"
                                    alt="" /> 公安部国家信息安全等级保护三级认证</span>
                            <span class="ai-qual-tag"><img src="/assets/images/ai_proposition/brand-qual-icon.png"
                                    alt="" /> 软件企业认证</span>
                            <span class="ai-qual-tag"><img src="/assets/images/ai_proposition/brand-qual-icon.png"
                                    alt="" /> ISO9001质量管理体系认证</span>
                            <span class="ai-qual-tag"><img src="/assets/images/ai_proposition/brand-qual-icon.png"
                                    alt="" /> 涉密印刷许可证</span>
                            <span class="ai-qual-tag"><img src="/assets/images/ai_proposition/brand-qual-icon.png"
                                    alt="" /> 国家乙级保密资质认证</span>
                        </div>
                    </div>
                    <div class="ai-brand-right">
                        <img src="/assets/images/ai_proposition/brand-img.png" alt="品牌优势" class="ai-brand-img" />
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 服务网点 ========== -->
        <section id="ai-network" class="ai-section ai-network-section">
            <div class="container-ai">
                <div class="ai-section-header ai-section-header-center ai-animate">
                    <span class="ai-section-en">NETWORK COVERAGE</span>
                    <h2>服务网点</h2>
                    <p class="ai-section-subtitle">考试测评行业全国头部品牌，全国"一张网"落地服务体系</p>
                </div>
                <div class="ai-network-content ai-animate">
                    <div class="ai-network-map">
                        <img src="/assets/images/ai_proposition/service-map.png" alt="服务网点地图" class="ai-map-img" />
                    </div>
                    <div class="ai-network-data">
                        <div class="ai-network-data-card">
                            <strong><span class="ai-count-number" v-count-up="30">30</span><span class="ai-data-unit">家</span></strong>
                            <span>分子公司</span>
                        </div>
                        <div class="ai-network-data-card">
                            <strong><span class="ai-count-number" v-count-up="850">850</span><span class="ai-data-unit">+</span></strong>
                            <span>落地团队</span>
                        </div>
                        <div class="ai-network-data-card">
                            <strong><span class="ai-count-number" v-count-up="32">32</span><span class="ai-data-unit">个</span></strong>
                            <span>省市覆盖</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 学术力量 ========== -->
        <section id="ai-academic" class="ai-section ai-academic-section">
            <div class="ai-academic-bg">
                <img src="/assets/images/ai_proposition/bg1.png" alt="" class="ai-academic-bg-img" />
            </div>
            <div class="container-ai ai-academic-inner">
                <div class="ai-section-header ai-section-header-center ai-animate">
                    <span class="ai-section-en ai-section-en-light">ACADEMIC STRENGTH</span>
                    <h2 class="ai-title-light">学术力量</h2>
                    <p class="ai-section-subtitle ai-subtitle-light">覆盖全国的学术队伍，多智能体协同命题，人工命题经验模型化</p>
                </div>
                <!-- 全国研究院布局 -->
                <div class="ai-academic-block ai-animate">
                    <h3 class="ai-block-title">全国研究院布局</h3>
                    <p class="ai-block-desc">先后创办多家学术机构，集合全国各地学术资源，服务全国社会化考试和人才选拔工作</p>
                    <div class="ai-institute-grid">
                        <div class="ai-institute-card">
                            <img src="/assets/images/ai_proposition/address-icon.png" alt=""
                                class="ai-institute-icon" />
                            <span>江西省人力资源开发研究院</span>
                        </div>
                        <div class="ai-institute-card">
                            <img src="/assets/images/ai_proposition/address-icon.png" alt=""
                                class="ai-institute-icon" />
                            <span>重庆西部人力资源开发研究院</span>
                        </div>
                        <div class="ai-institute-card">
                            <img src="/assets/images/ai_proposition/address-icon.png" alt=""
                                class="ai-institute-icon" />
                            <span>包头现代人力资源开发研究院</span>
                        </div>
                        <div class="ai-institute-card">
                            <img src="/assets/images/ai_proposition/address-icon.png" alt=""
                                class="ai-institute-icon" />
                            <span>湖南省人力资源研究中心</span>
                        </div>
                        <div class="ai-institute-card">
                            <img src="/assets/images/ai_proposition/address-icon.png" alt=""
                                class="ai-institute-icon" />
                            <span>湖南聚才人力资源开发研究院</span>
                        </div>
                        <div class="ai-institute-card">
                            <img src="/assets/images/ai_proposition/address-icon.png" alt=""
                                class="ai-institute-icon" />
                            <span>怀化市聚汇人力资源研究院</span>
                        </div>
                    </div>
                </div>
                <!-- 专家团队实力 -->
                <div class="ai-academic-block ai-animate">
                    <h3 class="ai-block-title">专家团队实力</h3>
                    <div class="ai-expert-stats">
                        <div class="ai-expert-stat">
                            <strong><span class="ai-count-number" v-count-up="300">300</span><span class="ai-expert-unit">+</span></strong>
                            <span>全职研究员</span>
                        </div>
                        <div class="ai-expert-stat">
                            <strong><span class="ai-count-number" v-count-up="160">160</span><span class="ai-expert-unit">+</span></strong>
                            <span>南昌专职队伍</span>
                        </div>
                        <div class="ai-expert-stat">
                            <strong><span class="ai-count-number" v-count-up="6">6</span><span class="ai-expert-unit">人</span></strong>
                            <span>博士学历</span>
                        </div>
                        <div class="ai-expert-stat">
                            <strong><span class="ai-count-number" v-count-up="88">88</span><span class="ai-expert-unit">人</span></strong>
                            <span>硕士学历</span>
                        </div>
                        <div class="ai-expert-stat">
                            <strong><span class="ai-count-number" v-count-up="24">24</span><span class="ai-expert-unit">人</span></strong>
                            <span>高级职称</span>
                        </div>
                        <div class="ai-expert-stat">
                            <strong><span class="ai-count-number" v-count-up="65">65</span><span class="ai-expert-unit">%</span></strong>
                            <span>入职3年以上占比</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 题库资源 ========== -->
        <section id="ai-question" class="ai-section ai-question-section">
            <div class="ai-question-bg">
                <img src="/assets/images/ai_proposition/bg2.png" alt="" class="ai-question-bg-img" />
            </div>
            <div class="container-ai ai-question-inner">
                <div class="ai-section-header ai-section-header-center ai-animate">
                    <span class="ai-section-en">QUESTION BANK</span>
                    <h2>题库资源</h2>
                    <p class="ai-section-subtitle">庞大的题库资源体系，覆盖285个专业、20TB+试题文件、1000+细分学科</p>
                </div>
                <!-- 4个数据卡片 -->
                <div class="ai-question-stats ai-animate">
                    <div class="ai-question-stat-card">
                        <strong><span class="ai-count-number" v-count-up="285">285</span><span class="ai-qstat-unit">项</span></strong>
                        <span>专业覆盖</span>
                    </div>
                    <div class="ai-question-stat-card">
                        <strong><span class="ai-count-number" v-count-up="20">20</span><span class="ai-qstat-unit">TB+</span></strong>
                        <span>题库文件大小</span>
                    </div>
                    <div class="ai-question-stat-card">
                        <strong><span class="ai-count-number" v-count-up="1000">1000</span><span class="ai-qstat-unit">项</span></strong>
                        <span>细分学科</span>
                    </div>
                    <div class="ai-question-stat-card">
                        <strong><span class="ai-count-number" v-count-up="54">54</span><span class="ai-qstat-unit">+</span></strong>
                        <span>类用人单位</span>
                    </div>
                </div>
                <!-- 增长率 -->
                <div class="ai-growth-stats ai-animate">
                    <div class="ai-growth-card">
                        <img src="/assets/images/ai_proposition/growth-rate.png" alt="" class="ai-growth-icon" />
                        <div>
                            <strong><span class="ai-count-number" v-count-up="37">37</span><span class="ai-growth-unit">%+</span></strong>
                            <span>服务客户数年平均增长</span>
                        </div>
                    </div>
                    <div class="ai-growth-card">
                        <img src="/assets/images/ai_proposition/growth-rate.png" alt="" class="ai-growth-icon" />
                        <div>
                            <strong><span class="ai-count-number" v-count-up="35">35</span><span class="ai-growth-unit">%+</span></strong>
                            <span>服务考生数年平均增长</span>
                        </div>
                    </div>
                </div>
                <!-- 描述 -->
                <div class="ai-question-desc ai-animate">
                    <h4>规范化、标准化题库与冷门学科命题技术突破</h4>
                    <p>尤其是我们对有国家统一考试大纲的规范化、标准化、社会统招考试命题做到了极致，同时攻克了盲文、小语种、民间戏曲等偏门、冷门学科的考试命题与人才测评技术。</p>
                </div>
            </div>
        </section>

        <!-- ========== 核心优势 ========== -->
        <section id="ai-advantage" class="ai-section ai-advantage-section">
            <div class="container-ai">
                <div class="ai-section-header ai-section-header-center ai-animate">
                    <span class="ai-section-en">CORE ADVANTAGES</span>
                    <h2>核心优势</h2>
                    <p class="ai-section-subtitle">高效率、高质量、高安全保密，三位一体的考试交付体系</p>
                </div>
                <!-- 高效率 -->
                <div class="ai-adv-card ai-animate">
                    <div class="ai-adv-header">
                        <img src="/assets/images/ai_proposition/advantage-icon1.png" alt="" class="ai-adv-icon" />
                        <div>
                            <h3>高效率</h3>
                            <p>人机协同，全天候应急交付</p>
                        </div>
                    </div>
                    <div class="ai-adv-header-line"></div>
                    <div class="ai-adv-items">
                        <div class="ai-adv-item">
                            <span class="ai-adv-item-num">01</span>
                            <div>
                                <strong>庞大的题库资源</strong>
                                <p>20TB的题库文件，上千个科目分类，数万的知识点点分布，为高效交付提供坚实基础。</p>
                            </div>
                        </div>
                        <div class="ai-adv-item">
                            <span class="ai-adv-item-num">02</span>
                            <div>
                                <strong>人机协同高效交付</strong>
                                <p>AI命题、AI查重、AI组卷、AI成绩分析与试卷评价，全流程智能化赋能。</p>
                            </div>
                        </div>
                        <div class="ai-adv-item">
                            <span class="ai-adv-item-num">03</span>
                            <div>
                                <strong>流水作业效率高</strong>
                                <p>命题与组卷分离，专业化分工协作，大幅提升交付效率。</p>
                            </div>
                        </div>
                        <div class="ai-adv-item">
                            <span class="ai-adv-item-num">04</span>
                            <div>
                                <strong>全天候应急交付</strong>
                                <p>7×24小时值班制度，确保紧急任务快速响应、准时交付。</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 高质量 -->
                <div class="ai-adv-card ai-animate">
                    <div class="ai-adv-header">
                        <img src="/assets/images/ai_proposition/advantage-icon2.png" alt="" class="ai-adv-icon" />
                        <div>
                            <h3>高质量</h3>
                            <p>专家团队把关，全流程质量管控</p>
                        </div>
                    </div>
                    <div class="ai-adv-header-line"></div>
                    <div class="ai-adv-items">
                        <div class="ai-adv-item">
                            <span class="ai-adv-item-num">01</span>
                            <div>
                                <strong>试题质量严格管控</strong>
                                <p>命题 → 一审 → 二审 → 专家把关 → 质检 → 试考 → 印刷审核 → AI分析查重，八道关确保试题质量。</p>
                            </div>
                        </div>
                        <div class="ai-adv-item">
                            <span class="ai-adv-item-num">02</span>
                            <div>
                                <strong>专业细化分类</strong>
                                <p>专业的人做专业的事，根据命题老师的专业与特长分配任务杜绝非专业人员命题，流水化作业保障每个环节精益求精。</p>
                            </div>
                        </div>
                        <div class="ai-adv-item">
                            <span class="ai-adv-item-num">03</span>
                            <div>
                                <strong>分类交付能力</strong>
                                <p>根据难度、层次、岗位调研等进行定制化交付，满足不同客户需求。</p>
                            </div>
                        </div>
                        <div class="ai-adv-item">
                            <span class="ai-adv-item-num">04</span>
                            <div>
                                <strong>专家团队300+</strong>
                                <p>全职300+研究员，博士6人，硕士88人，高级职称24人，保障学术交付品质。</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 高安全保密 -->
                <div class="ai-adv-card ai-animate">
                    <div class="ai-adv-header">
                        <img src="/assets/images/ai_proposition/advantage-icon3.png" alt="" class="ai-adv-icon" />
                        <div>
                            <h3>高安全保密</h3>
                            <p>同行业唯一自有涉密印刷资质+自有安保团队</p>
                        </div>
                    </div>
                    <div class="ai-adv-header-line"></div>
                    <div class="ai-adv-items">
                        <div class="ai-adv-item">
                            <span class="ai-adv-item-num">01</span>
                            <div>
                                <strong>涉密印刷资质+安保团队</strong>
                                <p>自有涉密乙级资质+公安部门安保认证备案。</p>
                            </div>
                        </div>
                        <div class="ai-adv-item">
                            <span class="ai-adv-item-num">02</span>
                            <div>
                                <strong>入闱式命题</strong>
                                <p>360度无死角监控+三道安检措施，确保命题过程安全可控。</p>
                            </div>
                        </div>
                        <div class="ai-adv-item">
                            <span class="ai-adv-item-num">03</span>
                            <div>
                                <strong>内控复核机制</strong>
                                <p>阅卷→双评 → 命题组卷分离 → 试题双审 → 客观题组卷双控 → 主观题阅卷双审 → AI纠错。</p>
                            </div>
                        </div>
                        <div class="ai-adv-item">
                            <span class="ai-adv-item-num">04</span>
                            <div>
                                <strong>技术保密措施</strong>
                                <p>三级等保+信息安全认证+保密专网命题+加密传输+上网行为监管，全方位技术保障。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 联系我们 ========== -->
        <section id="ai-contact" class="ai-section ai-contact-section">
            <!-- 上半部分：联系方式 -->
            <div class="ai-contact-bg">
                <img src="/assets/images/ai_proposition/bg3.png" alt="" class="ai-contact-bg-img" />
            </div>
            <div class="container-ai ai-contact-inner">
                <div class="ai-section-header ai-section-header-center ai-animate">
                    <span class="ai-section-en">CONTACT US</span>
                    <h2>联系我们</h2>
                    <p class="ai-section-subtitle">全国各分子公司联系方式，欢迎垂询合作</p>
                </div>
                <!-- 总部联系方式 -->
                <div class="ai-contact-hq ai-animate">
                    <h3 class="ai-contact-hq-title">总部联系方式</h3>
                    <div class="ai-contact-hq-grid">
                        <div class="ai-hq-item">
                            <strong>聚才总部</strong>
                            <p><span class="ai-hq-label">北京</span></p>
                            <p>电话：139-7094-1607</p>
                            <p>地址：北京市朝阳区朝阳门南大街10号科锐国际</p>
                        </div>
                        <div class="ai-hq-item">
                            <strong>运营总部</strong>
                            <p><span class="ai-hq-label">南昌</span></p>
                            <p>电话：159-8226-2694</p>
                            <p>地址：南昌市红谷滩区九龙湖绿地卢塞恩小镇7栋</p>
                        </div>
                        <div class="ai-hq-item">
                            <strong>公司全称</strong>
                            <p><span class="ai-hq-label">中测高科（北京）人才测评中心有限公司</span></p>
                        </div>
                    </div>
                </div>
                <!-- 各区域联系方式 -->
                <div class="ai-contact-regions ai-animate">
                    <div class="ai-region-grid">
                        <div class="ai-region-card">
                            <strong>安徽</strong>
                            <p>173-5519-3960</p>
                            <p class="desc">安徽省合肥市包河区九华山路世纪阳光大厦4楼</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>天津</strong>
                            <p>180-8813-9892</p>
                            <p class="desc">邮箱：3053595705@qq.com</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>云南</strong>
                            <p>181-9073-4837</p>
                            <p class="desc">云南省昆明市五华区人民中路48号5楼506</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>包头</strong>
                            <p>150-4470-7575</p>
                            <p class="desc">内蒙古包头市九原区稀土大街人和大厦四楼412</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>河北</strong>
                            <p>155-3367-6686</p>
                            <p class="desc">石家庄市高新区裕华东路453号创新大厦A座6楼603室</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>河南</strong>
                            <p>186-1050-1296</p>
                            <p class="desc">郑州市金水区红专路109号金成商务大厦7楼</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>贵州</strong>
                            <p>182-7524-4122</p>
                            <p class="desc">贵州省贵阳市观山湖区贵阳国际人才城3楼中测高科贵州分公司</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>江西</strong>
                            <p>153-4791-4736</p>
                            <p class="desc">江西省南昌市红谷滩新区卢塞恩小镇7栋</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>永州</strong>
                            <p>186-1050-2291</p>
                            <p class="desc">湖南省永州市经济技术开发区管理委员会 一楼办公大楼</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>甘肃（宁夏、青海）</strong>
                            <p>199-0944-6154</p>
                            <p class="desc">甘肃省兰州市城关区雁南路18号创新大厦B区1016室</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>广西</strong>
                            <p>186-1050-1713</p>
                            <p class="desc">广西南宁市青秀区金洲路25号太平洋世纪广场A座1701号</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>山东</strong>
                            <p>187-0259-6019</p>
                            <p class="desc">济南人力资源服务产业园燕山园区济南市历下区解放路22号燕山大厦602室</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>山西</strong>
                            <p>175-3515-0676</p>
                            <p class="desc">太原市迎泽区建设南路太原人力资源产业园4楼</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>新疆</strong>
                            <p>199-3805-0886</p>
                            <p class="desc">新疆维吾尔自治区乌鲁木齐市新市区三工街道兵团第十二师人才大厦411</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>黑龙江</strong>
                            <p>186-1050-1510</p>
                            <p class="desc">黑龙江省哈尔滨市南岗区大成街188</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>海南</strong>
                            <p>150-0896-5891</p>
                            <p class="desc">海南省海口市龙华区龙昆北路华银大厦688室</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>福建</strong>
                            <p>181-0605-7998</p>
                            <p class="desc">福州市仓山区鸿博创业园B509</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>湖南</strong>
                            <p>159-7429-5041</p>
                            <p class="desc">长沙市雨花区金海路128号长沙国际研创中心A2栋1001</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>陕西</strong>
                            <p>180-6685-1081</p>
                            <p class="desc">陕西省西安市雁塔区团结南路11号中晶科技广场A栋8楼</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>吉林</strong>
                            <p>176-0029-6373</p>
                            <p class="desc">吉林省长春市朝阳区卫星路远创国际</p>
                        </div>
                        <div class="ai-region-card">
                            <strong>辽宁</strong>
                            <p>186-1050-8248</p>
                            <p class="desc">辽宁省沈阳市沈河区青年北大街16号沈阳市人才市场</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 下半部分：疑问区 -->
            <div class="ai-contact-qa">
                <div class="container-ai ai-qa-inner">
                    <div class="ai-qa-content">
                        <h3>对AI命题系统还有疑问？立即留言为你解答疑惑</h3>
                        <p>给我们留言，我们将会为您解答所有问题。</p>
                        <div class="ai-qa-btns">
                            <NuxtLink class="ai-btn ai-btn-white" to="/contact?product=2">申请体验</NuxtLink>
                            <NuxtLink class="ai-btn ai-btn-white-outline" to="/contact?product=2">在线留言</NuxtLink>
                        </div>
                    </div>
                    <img src="/assets/images/ai_proposition/custom-service-icon.png" alt="人工客服" class="ai-qa-service" />
                </div>
            </div>
        </section>
    </div>

    <!-- ============================================================ -->
    <!-- ========== 移动端版本（≤1024px 生效，与 web 端零耦合）========== -->
    <!-- ============================================================ -->
    <div ref="aimSection" class="aim-page">
        <!-- ========== Banner ========== -->
        <section class="aim-banner">
            <div class="aim-banner-bg">
                <img src="/assets/images/ai_proposition/banner-bg.png" alt="" />
            </div>
            <div class="aim-banner-content aim-container">
                <span class="aim-badge">中国人事考试安全交付领导品牌</span>
                <h1 class="aim-banner-title">中测高科<span>命题服务</span></h1>
                <p class="aim-banner-desc">全国考试命题服务市场占有率、客户满意度遥遥领先的行业头部机构！</p>
                <div class="aim-banner-actions">
                    <NuxtLink class="aim-btn-primary" to="/contact?product=2">联系咨询</NuxtLink>
                    <NuxtLink class="aim-btn-ghost" to="/contact?product=2">了解更多</NuxtLink>
                </div>
            </div>
            <!-- 2×2 统计卡（毛玻璃，常规流不再绝对定位） -->
            <div class="aim-stats aim-container">
                <div class="aim-stat-card aim-animate">
                    <img src="/assets/images/ai_proposition/banner-icon1.png" alt="" />
                    <div>
                        <strong><span class="aim-count" v-count-up="28000">28000</span>+</strong>
                        <span>年均出库套数</span>
                    </div>
                </div>
                <div class="aim-stat-card aim-animate">
                    <img src="/assets/images/ai_proposition/banner-icon2.png" alt="" />
                    <div>
                        <strong><span class="aim-count" v-count-up="18000">18000</span>+</strong>
                        <span>年均笔试套数</span>
                    </div>
                </div>
                <div class="aim-stat-card aim-animate">
                    <img src="/assets/images/ai_proposition/banner-icon3.png" alt="" />
                    <div>
                        <strong><span class="aim-count" v-count-up="9000">9000</span>+</strong>
                        <span>年均面试套数</span>
                    </div>
                </div>
                <div class="aim-stat-card aim-animate">
                    <img src="/assets/images/ai_proposition/banner-icon4.png" alt="" />
                    <div>
                        <strong><span class="aim-count" v-count-up="1000">1000</span>+</strong>
                        <span>年均其他</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 锚点导航（横滑 sticky + 滚动高亮） ========== -->
        <nav class="aim-nav" ref="aimNavRef">
            <a v-for="tab in navTabs" :key="tab.target" class="aim-nav-tab"
                :class="{ 'aim-nav-tab-active': aimActiveNav === tab.target }" :href="`#aim-${tab.target}`">
                {{ tab.label }}
            </a>
        </nav>

        <!-- ========== 品牌优势 ========== -->
        <section id="aim-brand" class="aim-section aim-brand">
            <div class="aim-container">
                <div class="aim-head aim-animate">
                    <span class="aim-en">BRAND ADVANTAGE</span>
                    <h2>品牌优势</h2>
                    <p>国企、上市公司背景，专注人力资源测评的科技型、学术型服务品牌</p>
                </div>
                <div class="aim-brand-stats aim-animate">
                    <div class="aim-brand-stat">
                        <img src="/assets/images/ai_proposition/brand-icon1.png" alt="" />
                        <div class="aim-brand-stat-num"><span class="aim-count" v-count-up="10">10</span><em>余年</em></div>
                        <div class="aim-brand-stat-desc">行业沉淀</div>
                    </div>
                    <div class="aim-brand-stat">
                        <img src="/assets/images/ai_proposition/brand-icon2.png" alt="" />
                        <div class="aim-brand-stat-num"><span class="aim-count" v-count-up="5000">5000</span><em>家/年</em></div>
                        <div class="aim-brand-stat-desc">年服务客户数量</div>
                    </div>
                    <div class="aim-brand-stat">
                        <img src="/assets/images/ai_proposition/brand-icon3.png" alt="" />
                        <div class="aim-brand-stat-num"><span class="aim-count" v-count-up="800">800</span><em>万人次</em></div>
                        <div class="aim-brand-stat-desc">年均服务考生</div>
                    </div>
                    <div class="aim-brand-stat">
                        <img src="/assets/images/ai_proposition/brand-icon4.png" alt="" />
                        <div class="aim-brand-stat-num"><span class="aim-count" v-count-up="3500">3500</span><em>万人次</em></div>
                        <div class="aim-brand-stat-desc">近五年累计服务考生</div>
                    </div>
                </div>
                <div class="aim-brand-body aim-animate">
                    <p class="aim-indent">中测高科由江西聚才人力资源集团、重庆人才大市场集团、武汉人才集团、科锐国际(300662)等多方于2019年共同投资成立，是一家专注于人力资源测评的科技型、学术型人力资源外包服务公司，是我国组织人事考试和人才测评的第三方服务品牌。</p>
                    <p class="aim-indent">中测高科在北京、江西、长沙、重庆、成都、海口、包头、怀化等全国各地成立了人力资源开发研究机构（研究院）、人事考试专家命题服务中心，专为组织人社部门"招才引智"，为机关事业单位、国有企业招聘考试提供人才测评、人事考试命题、考务技术支持。</p>
                    <img class="aim-brand-img" src="/assets/images/ai_proposition/brand-img.png" alt="品牌优势" />
                    <p class="aim-qual-title">资质认证</p>
                    <div class="aim-qual-tags">
                        <span class="aim-qual-tag"><img src="/assets/images/ai_proposition/brand-qual-icon.png" alt="" />国家科技部高新技术企业认证</span>
                        <span class="aim-qual-tag"><img src="/assets/images/ai_proposition/brand-qual-icon.png" alt="" />公安部国家信息安全等级保护三级认证</span>
                        <span class="aim-qual-tag"><img src="/assets/images/ai_proposition/brand-qual-icon.png" alt="" />软件企业认证</span>
                        <span class="aim-qual-tag"><img src="/assets/images/ai_proposition/brand-qual-icon.png" alt="" />ISO9001质量管理体系认证</span>
                        <span class="aim-qual-tag"><img src="/assets/images/ai_proposition/brand-qual-icon.png" alt="" />涉密印刷许可证</span>
                        <span class="aim-qual-tag"><img src="/assets/images/ai_proposition/brand-qual-icon.png" alt="" />国家乙级保密资质认证</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 服务网点 ========== -->
        <section id="aim-network" class="aim-section aim-network">
            <div class="aim-container">
                <div class="aim-head aim-animate">
                    <span class="aim-en">NETWORK COVERAGE</span>
                    <h2>服务网点</h2>
                    <p>考试测评行业全国头部品牌，全国"一张网"落地服务体系</p>
                </div>
                <div class="aim-network-map aim-animate">
                    <img src="/assets/images/ai_proposition/service-map.png" alt="服务网点地图" />
                </div>
                <div class="aim-network-data aim-animate">
                    <div class="aim-data-card">
                        <strong><span class="aim-count" v-count-up="30">30</span><em>家</em></strong>
                        <span>分子公司</span>
                    </div>
                    <div class="aim-data-card">
                        <strong><span class="aim-count" v-count-up="850">850</span><em>+</em></strong>
                        <span>落地团队</span>
                    </div>
                    <div class="aim-data-card">
                        <strong><span class="aim-count" v-count-up="32">32</span><em>个</em></strong>
                        <span>省市覆盖</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 学术力量 ========== -->
        <section id="aim-academic" class="aim-section aim-academic">
            <div class="aim-sec-bg"><img src="/assets/images/ai_proposition/bg1.png" alt="" /></div>
            <div class="aim-container aim-academic-inner">
                <div class="aim-head aim-animate">
                    <span class="aim-en aim-en-light">ACADEMIC STRENGTH</span>
                    <h2 class="aim-h2-light">学术力量</h2>
                    <p class="aim-sub-light">覆盖全国的学术队伍，多智能体协同命题，人工命题经验模型化</p>
                </div>
                <div class="aim-block aim-animate">
                    <h3 class="aim-block-title">全国研究院布局</h3>
                    <p class="aim-block-desc">先后创办多家学术机构，集合全国各地学术资源，服务全国社会化考试和人才选拔工作</p>
                    <div class="aim-institute-list">
                        <div class="aim-institute-card"><img src="/assets/images/ai_proposition/address-icon.png" alt="" /><span>江西省人力资源开发研究院</span></div>
                        <div class="aim-institute-card"><img src="/assets/images/ai_proposition/address-icon.png" alt="" /><span>重庆西部人力资源开发研究院</span></div>
                        <div class="aim-institute-card"><img src="/assets/images/ai_proposition/address-icon.png" alt="" /><span>包头现代人力资源开发研究院</span></div>
                        <div class="aim-institute-card"><img src="/assets/images/ai_proposition/address-icon.png" alt="" /><span>湖南省人力资源研究中心</span></div>
                        <div class="aim-institute-card"><img src="/assets/images/ai_proposition/address-icon.png" alt="" /><span>湖南聚才人力资源开发研究院</span></div>
                        <div class="aim-institute-card"><img src="/assets/images/ai_proposition/address-icon.png" alt="" /><span>怀化市聚汇人力资源研究院</span></div>
                    </div>
                </div>
                <div class="aim-block aim-animate">
                    <h3 class="aim-block-title">专家团队实力</h3>
                    <div class="aim-expert-stats">
                        <div class="aim-expert-stat"><strong><span class="aim-count" v-count-up="300">300</span><em>+</em></strong><span>全职研究员</span></div>
                        <div class="aim-expert-stat"><strong><span class="aim-count" v-count-up="160">160</span><em>+</em></strong><span>南昌专职队伍</span></div>
                        <div class="aim-expert-stat"><strong><span class="aim-count" v-count-up="6">6</span><em>人</em></strong><span>博士学历</span></div>
                        <div class="aim-expert-stat"><strong><span class="aim-count" v-count-up="88">88</span><em>人</em></strong><span>硕士学历</span></div>
                        <div class="aim-expert-stat"><strong><span class="aim-count" v-count-up="24">24</span><em>人</em></strong><span>高级职称</span></div>
                        <div class="aim-expert-stat"><strong><span class="aim-count" v-count-up="65">65</span><em>%</em></strong><span>入职3年以上占比</span></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 题库资源 ========== -->
        <section id="aim-question" class="aim-section aim-question">
            <div class="aim-sec-bg"><img src="/assets/images/ai_proposition/bg2.png" alt="" /></div>
            <div class="aim-container aim-question-inner">
                <div class="aim-head aim-animate">
                    <span class="aim-en">QUESTION BANK</span>
                    <h2>题库资源</h2>
                    <p>庞大的题库资源体系，覆盖285个专业、20TB+试题文件、1000+细分学科</p>
                </div>
                <div class="aim-question-stats aim-animate">
                    <div class="aim-qstat-card"><strong><span class="aim-count" v-count-up="285">285</span><em>项</em></strong><span>专业覆盖</span></div>
                    <div class="aim-qstat-card"><strong><span class="aim-count" v-count-up="20">20</span><em>TB+</em></strong><span>题库文件大小</span></div>
                    <div class="aim-qstat-card"><strong><span class="aim-count" v-count-up="1000">1000</span><em>项</em></strong><span>细分学科</span></div>
                    <div class="aim-qstat-card"><strong><span class="aim-count" v-count-up="54">54</span><em>+</em></strong><span>类用人单位</span></div>
                </div>
                <div class="aim-growth aim-animate">
                    <div class="aim-growth-card">
                        <img src="/assets/images/ai_proposition/growth-rate.png" alt="" />
                        <div>
                            <strong><span class="aim-count" v-count-up="37">37</span><em>%+</em></strong>
                            <span>服务客户数年平均增长</span>
                        </div>
                    </div>
                    <div class="aim-growth-card">
                        <img src="/assets/images/ai_proposition/growth-rate.png" alt="" />
                        <div>
                            <strong><span class="aim-count" v-count-up="35">35</span><em>%+</em></strong>
                            <span>服务考生数年平均增长</span>
                        </div>
                    </div>
                </div>
                <div class="aim-question-desc aim-animate">
                    <h4>规范化、标准化题库与冷门学科命题技术突破</h4>
                    <p>尤其是我们对有国家统一考试大纲的规范化、标准化、社会统招考试命题做到了极致，同时攻克了盲文、小语种、民间戏曲等偏门、冷门学科的考试命题与人才测评技术。</p>
                </div>
            </div>
        </section>

        <!-- ========== 核心优势 ========== -->
        <section id="aim-advantage" class="aim-section aim-advantage">
            <div class="aim-container">
                <div class="aim-head aim-animate">
                    <span class="aim-en">CORE ADVANTAGES</span>
                    <h2>核心优势</h2>
                    <p>高效率、高质量、高安全保密，三位一体的考试交付体系</p>
                </div>
                <div class="aim-adv-card aim-animate">
                    <div class="aim-adv-head">
                        <img src="/assets/images/ai_proposition/advantage-icon1.png" alt="" />
                        <div><h3>高效率</h3><p>人机协同，全天候应急交付</p></div>
                    </div>
                    <div class="aim-adv-line"></div>
                    <div class="aim-adv-items">
                        <div class="aim-adv-item"><span class="aim-adv-num">01</span><div><strong>庞大的题库资源</strong><p>20TB的题库文件，上千个科目分类，数万的知识点点分布，为高效交付提供坚实基础。</p></div></div>
                        <div class="aim-adv-item"><span class="aim-adv-num">02</span><div><strong>人机协同高效交付</strong><p>AI命题、AI查重、AI组卷、AI成绩分析与试卷评价，全流程智能化赋能。</p></div></div>
                        <div class="aim-adv-item"><span class="aim-adv-num">03</span><div><strong>流水作业效率高</strong><p>命题与组卷分离，专业化分工协作，大幅提升交付效率。</p></div></div>
                        <div class="aim-adv-item"><span class="aim-adv-num">04</span><div><strong>全天候应急交付</strong><p>7×24小时值班制度，确保紧急任务快速响应、准时交付。</p></div></div>
                    </div>
                </div>
                <div class="aim-adv-card aim-animate">
                    <div class="aim-adv-head">
                        <img src="/assets/images/ai_proposition/advantage-icon2.png" alt="" />
                        <div><h3>高质量</h3><p>专家团队把关，全流程质量管控</p></div>
                    </div>
                    <div class="aim-adv-line"></div>
                    <div class="aim-adv-items">
                        <div class="aim-adv-item"><span class="aim-adv-num">01</span><div><strong>试题质量严格管控</strong><p>命题 → 一审 → 二审 → 专家把关 → 质检 → 试考 → 印刷审核 → AI分析查重，八道关确保试题质量。</p></div></div>
                        <div class="aim-adv-item"><span class="aim-adv-num">02</span><div><strong>专业细化分类</strong><p>专业的人做专业的事，根据命题老师的专业与特长分配任务杜绝非专业人员命题，流水化作业保障每个环节精益求精。</p></div></div>
                        <div class="aim-adv-item"><span class="aim-adv-num">03</span><div><strong>分类交付能力</strong><p>根据难度、层次、岗位调研等进行定制化交付，满足不同客户需求。</p></div></div>
                        <div class="aim-adv-item"><span class="aim-adv-num">04</span><div><strong>专家团队300+</strong><p>全职300+研究员，博士6人，硕士88人，高级职称24人，保障学术交付品质。</p></div></div>
                    </div>
                </div>
                <div class="aim-adv-card aim-animate">
                    <div class="aim-adv-head">
                        <img src="/assets/images/ai_proposition/advantage-icon3.png" alt="" />
                        <div><h3>高安全保密</h3><p>同行业唯一自有涉密印刷资质+自有安保团队</p></div>
                    </div>
                    <div class="aim-adv-line"></div>
                    <div class="aim-adv-items">
                        <div class="aim-adv-item"><span class="aim-adv-num">01</span><div><strong>涉密印刷资质+安保团队</strong><p>自有涉密乙级资质+公安部门安保认证备案。</p></div></div>
                        <div class="aim-adv-item"><span class="aim-adv-num">02</span><div><strong>入闱式命题</strong><p>360度无死角监控+三道安检措施，确保命题过程安全可控。</p></div></div>
                        <div class="aim-adv-item"><span class="aim-adv-num">03</span><div><strong>内控复核机制</strong><p>阅卷→双评 → 命题组卷分离 → 试题双审 → 客观题组卷双控 → 主观题阅卷双审 → AI纠错。</p></div></div>
                        <div class="aim-adv-item"><span class="aim-adv-num">04</span><div><strong>技术保密措施</strong><p>三级等保+信息安全认证+保密专网命题+加密传输+上网行为监管，全方位技术保障。</p></div></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 联系我们 ========== -->
        <section id="aim-contact" class="aim-section aim-contact">
            <div class="aim-sec-bg"><img src="/assets/images/ai_proposition/bg3.png" alt="" /></div>
            <div class="aim-container aim-contact-inner">
                <div class="aim-head aim-animate">
                    <span class="aim-en">CONTACT US</span>
                    <h2>联系我们</h2>
                    <p>全国各分子公司联系方式，欢迎垂询合作</p>
                </div>
                <div class="aim-hq aim-animate">
                    <h3 class="aim-hq-title">总部联系方式</h3>
                    <div class="aim-hq-item">
                        <strong>聚才总部</strong>
                        <p><span class="aim-hq-label">北京</span></p>
                        <p>电话：<a href="tel:13970941607">139-7094-1607</a></p>
                        <p>地址：北京市朝阳区朝阳门南大街10号科锐国际</p>
                    </div>
                    <div class="aim-hq-item">
                        <strong>运营总部</strong>
                        <p><span class="aim-hq-label">南昌</span></p>
                        <p>电话：<a href="tel:15982262694">159-8226-2694</a></p>
                        <p>地址：南昌市红谷滩区九龙湖绿地卢塞恩小镇7栋</p>
                    </div>
                    <div class="aim-hq-item">
                        <strong>公司全称</strong>
                        <p><span class="aim-hq-label">中测高科（北京）人才测评中心有限公司</span></p>
                    </div>
                </div>
                <div class="aim-region-grid aim-animate">
                    <div class="aim-region-card"><strong>安徽</strong><a href="tel:17355193960">173-5519-3960</a><p class="aim-region-desc">安徽省合肥市包河区九华山路世纪阳光大厦4楼</p></div>
                    <div class="aim-region-card"><strong>天津</strong><a href="tel:18088139892">180-8813-9892</a><p class="aim-region-desc">邮箱：<a href="mailto:3053595705@qq.com">3053595705@qq.com</a></p></div>
                    <div class="aim-region-card"><strong>云南</strong><a href="tel:18190734837">181-9073-4837</a><p class="aim-region-desc">云南省昆明市五华区人民中路48号5楼506</p></div>
                    <div class="aim-region-card"><strong>包头</strong><a href="tel:15044707575">150-4470-7575</a><p class="aim-region-desc">内蒙古包头市九原区稀土大街人和大厦四楼412</p></div>
                    <div class="aim-region-card"><strong>河北</strong><a href="tel:15533676686">155-3367-6686</a><p class="aim-region-desc">石家庄市高新区裕华东路453号创新大厦A座6楼603室</p></div>
                    <div class="aim-region-card"><strong>河南</strong><a href="tel:18610501296">186-1050-1296</a><p class="aim-region-desc">郑州市金水区红专路109号金成商务大厦7楼</p></div>
                    <div class="aim-region-card"><strong>贵州</strong><a href="tel:18275244122">182-7524-4122</a><p class="aim-region-desc">贵州省贵阳市观山湖区贵阳国际人才城3楼中测高科贵州分公司</p></div>
                    <div class="aim-region-card"><strong>江西</strong><a href="tel:15347914736">153-4791-4736</a><p class="aim-region-desc">江西省南昌市红谷滩新区卢塞恩小镇7栋</p></div>
                    <div class="aim-region-card"><strong>永州</strong><a href="tel:18610502291">186-1050-2291</a><p class="aim-region-desc">湖南省永州市经济技术开发区管理委员会 一楼办公大楼</p></div>
                    <div class="aim-region-card"><strong>甘肃（宁夏、青海）</strong><a href="tel:19909446154">199-0944-6154</a><p class="aim-region-desc">甘肃省兰州市城关区雁南路18号创新大厦B区1016室</p></div>
                    <div class="aim-region-card"><strong>广西</strong><a href="tel:18610501713">186-1050-1713</a><p class="aim-region-desc">广西南宁市青秀区金洲路25号太平洋世纪广场A座1701号</p></div>
                    <div class="aim-region-card"><strong>山东</strong><a href="tel:18702596019">187-0259-6019</a><p class="aim-region-desc">济南人力资源服务产业园燕山园区济南市历下区解放路22号燕山大厦602室</p></div>
                    <div class="aim-region-card"><strong>山西</strong><a href="tel:17535150676">175-3515-0676</a><p class="aim-region-desc">太原市迎泽区建设南路太原人力资源产业园4楼</p></div>
                    <div class="aim-region-card"><strong>新疆</strong><a href="tel:19938050886">199-3805-0886</a><p class="aim-region-desc">新疆维吾尔自治区乌鲁木齐市新市区三工街道兵团第十二师人才大厦411</p></div>
                    <div class="aim-region-card"><strong>黑龙江</strong><a href="tel:18610501510">186-1050-1510</a><p class="aim-region-desc">黑龙江省哈尔滨市南岗区大成街188</p></div>
                    <div class="aim-region-card"><strong>海南</strong><a href="tel:15008965891">150-0896-5891</a><p class="aim-region-desc">海南省海口市龙华区龙昆北路华银大厦688室</p></div>
                    <div class="aim-region-card"><strong>福建</strong><a href="tel:18106057998">181-0605-7998</a><p class="aim-region-desc">福州市仓山区鸿博创业园B509</p></div>
                    <div class="aim-region-card"><strong>湖南</strong><a href="tel:15974295041">159-7429-5041</a><p class="aim-region-desc">长沙市雨花区金海路128号长沙国际研创中心A2栋1001</p></div>
                    <div class="aim-region-card"><strong>陕西</strong><a href="tel:18066851081">180-6685-1081</a><p class="aim-region-desc">陕西省西安市雁塔区团结南路11号中晶科技广场A栋8楼</p></div>
                    <div class="aim-region-card"><strong>吉林</strong><a href="tel:17600296373">176-0029-6373</a><p class="aim-region-desc">吉林省长春市朝阳区卫星路远创国际</p></div>
                    <div class="aim-region-card"><strong>辽宁</strong><a href="tel:18610508248">186-1050-8248</a><p class="aim-region-desc">辽宁省沈阳市沈河区青年北大街16号沈阳市人才市场</p></div>
                </div>
            </div>
            <!-- 底部疑问区 -->
            <div class="aim-qa">
                <div class="aim-container aim-qa-inner">
                    <h3>对AI命题系统还有疑问？立即留言为你解答疑惑</h3>
                    <p>给我们留言，我们将会为您解答所有问题。</p>
                    <div class="aim-qa-btns">
                        <NuxtLink class="aim-qa-btn aim-qa-btn-white" to="/contact?product=2">申请体验</NuxtLink>
                        <NuxtLink class="aim-qa-btn aim-qa-btn-outline" to="/contact?product=2">在线留言</NuxtLink>
                    </div>
                    <img class="aim-qa-service" src="/assets/images/ai_proposition/custom-service-icon.png" alt="人工客服" />
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
.ai-page {
    --ai-blue: #0F62FE;
    --ai-blue-dark: #0A1628;
    --ai-blue-mid: #0E2C64;
    --ai-ink: #1a1a2e;
    --ai-muted: #64748B;
    --ai-bg: #f8fafc;
    --ai-white: #fff;
    --ai-border: #e2e8f0;
    --ai-radius: 12px;
    font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    color: var(--ai-ink);
    overflow: hidden;
}

.container-ai {
    width: min(1200px, calc(100% - 40px));
    margin: 0 auto;
}

/* ===== 滚动动画 ===== */
.ai-animate {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.ai-animate.ai-visible {
    opacity: 1;
    transform: translateY(0);
}

.ai-animate:nth-child(2) {
    transition-delay: 0.1s;
}

.ai-animate:nth-child(3) {
    transition-delay: 0.2s;
}

.ai-animate:nth-child(4) {
    transition-delay: 0.3s;
}

.ai-animate:nth-child(5) {
    transition-delay: 0.15s;
}

.ai-animate:nth-child(6) {
    transition-delay: 0.25s;
}

/* ===== Banner ===== */
.ai-banner {
    position: relative;
    width: 100%;
    height: 572px;
    background: linear-gradient(113deg, #0A1628 0%, #0E2C64 35.58%, #1B3A6B 70%, #1E4D8C 100%);
}

.ai-banner-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 572px;
    pointer-events: none;
}

.ai-banner-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.ai-banner-content {
    position: relative;
    z-index: 2;
    padding-top: 87px;
}

.ai-badge {
    display: inline-block;
    padding: 6px 17px 6px 31px;
    border-radius: 999px;
    background: rgba(15, 98, 254, 0.15);
    color: #A8C8FF;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.05em;
    margin-bottom: 24px;
    border: 1px solid rgba(15, 98, 254, 0.25);
    position: relative;
}

.ai-badge::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #0FFEFA;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
}

.ai-banner-title {
    font-size: clamp(36px, 4.5vw, 56px);
    font-weight: 520;
    color: var(--ai-white);
    line-height: 1.2;
    letter-spacing: 2px;
    margin: 0 0 15px;
}

.ai-banner-title span {
    color: #0FFEFA;
}

.ai-banner-desc {
    color: rgba(255, 255, 255, 1);
    font-size: 16px;
    line-height: 1.7;
    margin: 0 0 74px;
}

.ai-banner-actions {
    display: flex;
    gap: 16px;
}

.ai-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
}

.ai-banner-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    border-radius: 4px;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    line-height: 1;
}

.ai-banner-btn-primary {
    background: #0F62FE;
    color: #fff;
}

.ai-banner-btn-primary::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('/assets/images/ai_proposition/banner-phone.png') no-repeat center / contain;
    flex-shrink: 0;
}

.ai-banner-btn-primary:hover {
    background: #0043CE;
    box-shadow: 0 6px 20px rgba(15, 98, 254, 0.4);
    transform: translateY(-2px);
}

.ai-banner-btn-ghost {
    background: transparent;
    color: #fff;
    border: 1.5px solid rgba(255, 255, 255, 0.3);
}

.ai-banner-btn-ghost:hover {
    opacity: 0.6;
    transform: translateY(-2px);
}

/* 统计卡片 */
.ai-stats-bar {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
    box-shadow: 0px 5px 12px 0px rgba(0, 0, 0, 0.15);
    width: 100%;
}

.ai-stats-content {
    display: flex;
    width: min(1200px, calc(100% - 40px));
    height: 100px;
    margin: 0 auto;
}

.ai-stat-item {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    /* padding: 20px 32px; */
    transition: background 0.3s ease;
    cursor: pointer;
}

.ai-stat-item:hover {
    /* background: rgba(255, 255, 255, 0.5); */
}

.ai-stat-icon {
    width: 56px;
    height: 56px;
    flex-shrink: 0;
}

.ai-stat-item strong {
    display: block;
    font-size: 32px;
    font-weight: 600;
    color: #fff;
    line-height: 1.1875;
}

.ai-stat-plus {
    font-size: 20px;
    font-weight: 700;
}

.ai-stat-item>div>span {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 400;
}

.ai-count-number {
    font-size: inherit !important;
    font-weight: inherit !important;
    color: inherit !important;
}

/* ===== 导航标签 ===== */
.ai-nav-bar {
    position: sticky;
    top: 76px;
    z-index: 10;
    background: #EDF5FF;
    border-bottom: 1px solid var(--ai-border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.ai-nav-inner {
    display: flex;
    justify-content: center;
    gap: 0;
}

.ai-nav-tab {
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

.ai-nav-tab-text {
    position: relative;
}

.ai-nav-tab:hover {
    color: #0F62FE;
}

.ai-nav-tab-active {
    color: #0F62FE;
    font-weight: 600;
}

.ai-nav-tab-active .ai-nav-tab-text::after {
    content: '';
    position: absolute;
    bottom: -18px;
    left: 0;
    width: 100%;
    height: 3px;
    background: #0F62FE;
    border-radius: 2px 2px 0 0;
}

/* ===== 通用 Section ===== */
.ai-section {
    padding: 80px 0;
}

.ai-section-header {
    margin-bottom: 35px;
}

.ai-section-header-center {
    text-align: center;
}

.ai-section-en {
    display: block;
    color: #0F62FE;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.15em;
    margin-bottom: 8px;
}

.ai-section-en-light {
    color: rgba(255, 255, 255, 1);
}

.ai-section-header h2 {
    font-size: clamp(28px, 3.5vw, 40px);
    font-weight: 600;
    letter-spacing: 2px;
    margin: 0 0 12px;
    line-height: 1.25;
    color: #161616;
}

.ai-title-light {
    color: var(--ai-white) !important;
}

.ai-section-subtitle {
    color: var(--ai-muted);
    font-size: 16px;
    line-height: 1.6;
    margin: 0;
}

.ai-subtitle-light {
    color: rgba(255, 255, 255, 0.75) !important;
}

/* ===== 品牌优势 ===== */
.ai-brand-section {
    padding-top: 36px;
    padding-bottom: 38px;
    background: var(--ai-white);
}

.ai-brand-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 45px;
}

.ai-brand-stat-card {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 30px 24px;
    background: #F8FAFF;
    border-radius: var(--ai-radius);
    border: 1px solid #E8EEFF;
    transition: all 0.3s ease;
}

.ai-brand-stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(15, 98, 254, 0.1);
    border-color: var(--ai-blue);
}

.ai-brand-stat-icon {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
}

.ai-brand-stat-num {
    font-size: 28px;
    font-weight: 600;
    color: #0F62FE;
    line-height: 1.2;
}

.ai-brand-stat-unit {
    font-size: 14px;
    font-weight: 400;
    color: #8D8D8D;
    margin-left: 2px;
}

.ai-brand-stat-desc {
    font-size: 14px;
    color: #111827;
    /* margin-top: 2px; */
}

.ai-brand-content {
    display: grid;
    grid-template-columns: 1fr 618px;
    gap: 48px;
    align-items: start;
}

.ai-brand-text {
    color: #525252;
    font-size: 15px;
    line-height: 1.8;
    margin: 0 0 23px;
}

.ai-brand-qual-title {
    font-size: 15px;
    font-weight: 600;
    color: #161616;
    margin: 0 0 6px;
}

.ai-brand-qual-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.ai-qual-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 17px;
    border-radius: 999px;
    background: #EDF5FF;
    color: #0043CE;
    font-size: 13px;
    font-weight: 500;
    border: 1px solid #D0E2FF;
    transition: all 0.25s ease;
}

.ai-qual-tag:hover {
    background: var(--ai-blue);
    color: var(--ai-white);
}

.ai-qual-tag img {
    width: 14px;
    height: 14px;
}

.ai-brand-img {
    width: 100%;
    /* border-radius: var(--ai-radius); */
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
}

/* ===== 服务网点 ===== */
.ai-network-section {
    padding: 47px 0 43px;
    background: var(--ai-bg);
}

.ai-network-content {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 114px;
    align-items: center;
}

.ai-map-img {
    width: 100%;
    max-width: 604px;
    height: auto;
}

.ai-network-data {
    display: flex;
    flex-direction: column;
    gap: 53px;
}

.ai-network-data-card {
    background: var(--ai-white);
    border-radius: var(--ai-radius);
    padding: 24px 25px;
    border: 1px solid var(--ai-border);
    text-align: center;
    transition: all 0.3s ease;
}

.ai-network-data-card:hover {
    transform: translateX(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    border-color: var(--ai-blue);
}

.ai-network-data-card strong {
    display: block;
    font-size: 40px;
    font-weight: 600;
    color: #0F62FE;
    line-height: 1.1;
}

.ai-data-unit {
    font-size: 20px;
    font-weight: 500;
    color: #0F62FE !important;
}

.ai-network-data-card span {
    font-size: 14px;
    color: #6F6F6F;
    font-weight: 400;
}

/* ===== 学术力量 ===== */
.ai-academic-section {
    position: relative;
    background: var(--ai-blue);
    padding: 39px 0 91px;
    overflow: hidden;
}

.ai-academic-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 713px;
    pointer-events: none;
}

.ai-academic-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.ai-academic-inner {
    position: relative;
    z-index: 2;
}

.ai-block-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--ai-white);
    margin: 0 0 8px;
}

.ai-block-desc {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 24px;
}

.ai-institute-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 24px;
}

.ai-institute-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 18px 24px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 10px;
    transition: all 0.3s ease;
}

.ai-institute-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.ai-institute-icon {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
}

.ai-institute-card span {
    font-size: 14px;
    font-weight: 600;
    color: var(--ai-blue);
}

.ai-expert-stats {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px;
}

.ai-expert-stat {
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 20px 16px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.15);
    transition: all 0.3s ease;
}

.ai-expert-stat:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
}

.ai-expert-stat:hover strong,
.ai-expert-stat:hover .ai-expert-unit {
    color: #fff !important;
}

.ai-expert-stat strong {
    display: block;
    font-size: 28px;
    font-weight: 600;
    color: #0F62FE;
    line-height: 1.2;
}

.ai-expert-unit {
    font-size: 14px;
    font-weight: 600;
    color: #0F62FE !important;
}

.ai-expert-stat span {
    font-size: 12px;
    color: #111827;
    font-weight: 500;
}

/* ===== 题库资源 ===== */
.ai-question-section {
    position: relative;
    background: #f4f7fa;
    padding: 52px 0 45px;
    overflow: hidden;
}

.ai-question-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 676px;
    pointer-events: none;
}

.ai-question-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.ai-question-inner {
    position: relative;
    z-index: 2;
}

.ai-question-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-bottom: 32px;
}

.ai-question-stat-card {
    background: var(--ai-white);
    border-radius: var(--ai-radius);
    padding: 28px 24px;
    text-align: center;
    border: 1px solid var(--ai-border);
    transition: all 0.3s ease;
}

.ai-question-stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
    border-color: var(--ai-blue);
}

.ai-question-stat-card strong {
    display: block;
    font-size: 36px;
    font-weight: 600;
    color: #0F62FE;
    line-height: 1.2;
}

.ai-qstat-unit {
    font-size: 16px;
    font-weight: 600;
    color: #4C9DFF !important;
}

.ai-question-stat-card span {
    font-size: 14px;
    color: var(--ai-muted);
    font-weight: 500;
}

.ai-growth-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 32px;
}

.ai-growth-card {
    display: flex;
    align-items: center;
    gap: 24px;
    background: var(--ai-white);
    border-radius: var(--ai-radius);
    padding: 24px 28px;
    border: 1px solid var(--ai-border);
    transition: all 0.3s ease;
}

.ai-growth-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.ai-growth-icon {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
}

.ai-growth-card strong {
    display: block;
    font-size: 28px;
    font-weight: 600;
    color: #198038;
    line-height: 1.2;
}

.ai-growth-unit {
    font-size: 14px;
    font-weight: 600;
    color: #198038 !important;
}

.ai-growth-card span {
    font-size: 13px;
    color: #6F6F6F;
    font-weight: 400;
}

.ai-question-desc {
    background: var(--ai-white);
    border-radius: var(--ai-radius);
    padding: 28px 32px;
    border: 1px solid var(--ai-border);
}

.ai-question-desc h4 {
    font-size: 16px;
    font-weight: 600;
    color: #161616;
    margin: 0 0 8px;
}

.ai-question-desc p {
    font-size: 14px;
    color: #6F6F6F;
    line-height: 1.7;
    margin: 0;
}

/* ===== 核心优势 ===== */
.ai-advantage-section {
    padding: 55px 0 48px;
    background: var(--ai-white);
}

.ai-adv-card {
    background: var(--ai-white);
    border-radius: 16px;
    padding: 36px 40px;
    border: 1px solid var(--ai-border);
    margin-bottom: 24px;
    transition: all 0.3s ease;
}

.ai-adv-card:nth-last-child(1) {
    margin-bottom: 0;
}

.ai-adv-card:hover {
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.06);
}

.ai-adv-header {
    display: flex;
    align-items: center;
    gap: 16px;
}

.ai-adv-header-line {
    width: 100%;
    height: 1px;
    background: #F0F0F0;
    margin: 17px 0 24px;
}

.ai-adv-icon {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
}

.ai-adv-header h3 {
    font-size: 20px;
    font-weight: 600;
    color: #161616;
    margin: 0;
}

.ai-adv-header p {
    font-size: 13px;
    color: #6F6F6F;
    margin: 0;
}

.ai-adv-items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.ai-adv-item {
    display: flex;
    gap: 16px;
    padding: 20px;
    background: #F8FAFF;
    border-radius: 10px;
    border: 1px solid #EEF2FF;
    transition: all 0.3s ease;
}

.ai-adv-item:hover {
    border-color: var(--ai-blue);
    box-shadow: 0 4px 16px rgba(15, 98, 254, 0.08);
}

.ai-adv-item-num {
    font-size: 13px;
    font-weight: 700;
    color: var(--ai-blue);
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15, 98, 254, 0.08);
    border-radius: 6px;
}

.ai-adv-item strong {
    display: block;
    font-size: 15px;
    font-weight: 700;
    color: var(--ai-ink);
    margin-bottom: 6px;
}

.ai-adv-item p {
    font-size: 13px;
    color: var(--ai-muted);
    line-height: 1.6;
    margin: 0;
}

/* ===== 联系我们 ===== */
.ai-contact-section {
    position: relative;
    padding: 63px 0 0;
    background: #f5f8fa;
}

.ai-contact-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 1036px;
    pointer-events: none;
}

.ai-contact-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.ai-contact-inner {
    position: relative;
    z-index: 2;
    padding: 0 0 66px;
    /* margin-top: -63px; */
}

.ai-contact-hq {
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid #F0F0F0;
    border-radius: 8px 8px 8px 8px;
    padding: 24px 33px 20px;
}

.ai-contact-hq-title {
    font-size: 18px;
    font-weight: 600;
    color: #161616;
    margin: 0 0 12px;
}

.ai-contact-hq-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
}

.ai-hq-item strong {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #0F62FE;
    margin-bottom: 4px;
}

.ai-hq-item p {
    font-size: 13px;
    color: #6F6F6F;
    line-height: 1.6;
    margin: 0 0 4px;
}

.ai-hq-label {
    font-weight: 600;
    font-size: 15px;
    color: #161616;
}

.ai-region-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 7px;
}

.ai-region-card {
    background: rgba(255, 255, 255, 1);
    backdrop-filter: blur(8px);
    border-radius: 4px;
    padding: 17px;
    border: 1px solid #F0F0F0;
    transition: all 0.3s ease;
}

.ai-region-card:hover {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
}

.ai-region-card strong {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #161616;
    margin-bottom: 4px;
}

.ai-region-card p {
    font-size: 12px;
    color: #0F62FE;
    line-height: 1.58;
    margin: 0 0 2px;
}

.ai-region-card .desc {
    font-size: 11px;
    color: #8D8D8D;
    line-height: 1.36;
}

/* 疑问区 */
.ai-contact-qa {
    z-index: 3;
    margin-top: -32px;
    background: linear-gradient(91deg, #106DF5 0%, #3D85ED 64.12%, #106DF5 100%);
    height: 190px;
    display: flex;
    align-items: center;
}

.ai-qa-inner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1200px;
    height: 100%;
    margin: 0 auto;
}

.ai-qa-content h3 {
    font-size: 24px;
    font-weight: 500;
    color: #fff;
    margin: 0 0 28px;
}

.ai-qa-content p {
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
    margin: 0 0 13px;
}

.ai-qa-btns {
    display: flex;
    gap: 17px;
}

.ai-btn {
    background: rgba(255, 255, 255, 0.9);
    color: #055AE1;
    padding: 7px 27px;
    font-size: 15px;
    border-radius: 30px 30px 30px 30px;
    line-height: 1;
}

.ai-btn-white:hover {
    background: #F0F4FF;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.ai-btn-white-outline {
    background: transparent;
    color: var(--ai-white);
    border: 1.5px solid rgba(255, 255, 255, 0.5);
    padding: 10px 24px;
    font-size: 14px;
}

.ai-btn-white-outline:hover {
    border-color: var(--ai-white);
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
}

.ai-qa-service {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 188px;
    height: 234px;
}

/* ===== 响应式 ===== */
@media (max-width: 1024px) {
    .ai-brand-content {
        grid-template-columns: 1fr;
    }

    .ai-brand-right {
        display: none;
    }

    .ai-brand-stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .ai-network-content {
        grid-template-columns: 1fr;
    }

    .ai-institute-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .ai-expert-stats {
        grid-template-columns: repeat(3, 1fr);
    }

    .ai-question-stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .ai-adv-items {
        grid-template-columns: 1fr;
    }

    .ai-contact-hq-grid {
        grid-template-columns: 1fr;
    }

    .ai-region-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .ai-banner {
        height: auto;
        min-height: 450px;
        padding-bottom: 80px;
    }

    .ai-banner-content {
        padding-top: 50px;
    }

    .ai-stats-bar {
        flex-wrap: wrap;
        bottom: -60px;
    }

    .ai-stat-item {
        flex: 1 1 50%;
    }

    .ai-brand-stats {
        grid-template-columns: 1fr;
    }

    .ai-institute-grid {
        grid-template-columns: 1fr;
    }

    .ai-expert-stats {
        grid-template-columns: repeat(2, 1fr);
    }

    .ai-question-stats {
        grid-template-columns: 1fr;
    }

    .ai-growth-stats {
        grid-template-columns: 1fr;
    }

    .ai-region-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .ai-qa-inner {
        flex-direction: column;
        text-align: center;
        gap: 16px;
    }

    .ai-contact-qa {
        height: auto;
        padding: 32px 0;
    }

    .ai-service-img {
        width: 120px;
        height: auto;
    }

    .ai-section {
        padding: 60px 0;
    }

    .ai-brand-section {
        padding-top: 80px;
    }
}

/* ============================================================
   移动端版本样式（≤1024px 生效）
   · web 根 .ai-page 与以上全部桌面样式零改动
   · 桌面（>1024px）隐藏移动根；≤1024px 隐藏桌面根、显示移动根
   · 所有移动样式限定在 .aim-page 作用域内，class 前缀 aim-
   · 不给 .aim-page 设 overflow:hidden，避免破坏 .aim-nav 的 sticky
   ============================================================ */
.aim-page { display: none; }

@media (max-width: 1024px) {
    .ai-page { display: none; }
    .aim-page { display: block; }
}

/* ===== 移动根变量与基础 ===== */
.aim-page {
    --aim-blue: #0F62FE;
    --aim-ink: #161616;
    --aim-muted: #6F6F6F;
    --aim-bg: #f4f7fa;
    --aim-white: #fff;
    --aim-border: #e2e8f0;
    --aim-radius: 12px;
    font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    color: var(--aim-ink);
    background: var(--aim-white);
}

.aim-container {
    width: min(100% - 32px, 720px);
    margin: 0 auto;
}

/* 入场动画（移动独立 observer 命中后加 .aim-visible） */
.aim-animate {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity .6s ease, transform .6s ease;
}

.aim-animate.aim-visible {
    opacity: 1;
    transform: translateY(0);
}

/* 数字动画：后缀继承父级字号/颜色 */
.aim-count {
    font-size: inherit !important;
    font-weight: inherit !important;
    color: inherit !important;
}

.aim-section em {
    font-style: normal;
}

/* ===== Banner ===== */
.aim-banner {
    position: relative;
    padding: 40px 0 0;
    background: linear-gradient(113deg, #0A1628 0%, #0E2C64 35.58%, #1B3A6B 70%, #1E4D8C 100%);
    overflow: hidden;
}

.aim-banner-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 0;
    pointer-events: none;
}

.aim-banner-bg img {
    display: block;
    width: 100%;
    height: auto;
}

.aim-banner-content {
    position: relative;
    z-index: 2;
}

.aim-badge {
    position: relative;
    display: inline-block;
    padding: 6px 14px 6px 26px;
    margin-bottom: 18px;
    border-radius: 999px;
    background: rgba(15, 98, 254, .18);
    border: 1px solid rgba(15, 98, 254, .3);
    color: #A8C8FF;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .03em;
}

.aim-badge::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #0FFEFA;
}

.aim-banner-title {
    margin: 0 0 12px;
    font-size: 34px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: 1px;
    color: #fff;
}

.aim-banner-title span { color: #0FFEFA; }

.aim-banner-desc {
    margin: 0 0 24px;
    font-size: 14px;
    line-height: 1.7;
    color: rgba(255, 255, 255, .92);
}

.aim-banner-actions {
    display: flex;
    gap: 12px;
    margin-bottom: 28px;
}

.aim-btn-primary,
.aim-btn-ghost {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 13px 20px;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
}

.aim-btn-primary {
    background: #0F62FE;
    color: #fff;
}

.aim-btn-primary::before {
    content: '';
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    background: url('/assets/images/ai_proposition/banner-phone.png') no-repeat center / contain;
}

.aim-btn-ghost {
    background: transparent;
    color: #fff;
    border: 1.5px solid rgba(255, 255, 255, .35);
}

/* Banner 底部 2×2 毛玻璃统计卡 */
.aim-stats {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding-bottom: 24px;
}

.aim-stat-card {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px;
    border-radius: 10px;
    background: rgba(255, 255, 255, .12);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, .16);
}

.aim-stat-card img {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
}

.aim-stat-card strong {
    display: block;
    font-size: 22px;
    font-weight: 700;
    line-height: 1.15;
    color: #fff;
}

.aim-stat-card>div>span {
    font-size: 12px;
    color: rgba(255, 255, 255, .6);
}

/* ===== 锚点导航（横滑 sticky）===== */
.aim-nav {
    position: sticky;
    top: 76px;
    z-index: 15;
    display: flex;
    gap: 4px;
    padding: 0 12px;
    background: #EDF5FF;
    border-bottom: 1px solid var(--aim-border);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
}

.aim-nav::-webkit-scrollbar { display: none; }

.aim-nav-tab {
    position: relative;
    flex-shrink: 0;
    padding: 14px 16px;
    font-size: 14px;
    font-weight: 500;
    color: #161616;
    text-decoration: none;
    white-space: nowrap;
}

.aim-nav-tab-active {
    color: #0F62FE;
    font-weight: 700;
}

.aim-nav-tab-active::after {
    content: '';
    position: absolute;
    left: 16px;
    right: 16px;
    bottom: 6px;
    height: 3px;
    border-radius: 2px 2px 0 0;
    background: #0F62FE;
}

/* ===== 通用 section / 标题 ===== */
.aim-section {
    position: relative;
    padding: 44px 0;
    scroll-margin-top: 130px;
}

.aim-sec-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 0;
    pointer-events: none;
}

.aim-sec-bg img {
    display: block;
    width: 100%;
    height: auto;
}

.aim-head {
    text-align: center;
    margin-bottom: 26px;
}

.aim-en {
    display: block;
    margin-bottom: 6px;
    color: #0F62FE;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .12em;
}

.aim-en-light { color: #fff; }

.aim-head h2 {
    margin: 0 0 10px;
    font-size: 26px;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: 1px;
    color: #161616;
}

.aim-h2-light { color: #fff !important; }

.aim-head p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: var(--aim-muted);
}

.aim-sub-light { color: rgba(255, 255, 255, .78) !important; }

.aim-academic-inner,
.aim-question-inner,
.aim-contact-inner {
    position: relative;
    z-index: 2;
}

/* ===== 品牌优势 ===== */
.aim-brand { background: var(--aim-white); }

.aim-brand-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 24px;
}

.aim-brand-stat {
    padding: 18px 16px;
    text-align: center;
    background: #F8FAFF;
    border: 1px solid #E8EEFF;
    border-radius: var(--aim-radius);
}

.aim-brand-stat img {
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
}

.aim-brand-stat-num {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
    color: #0F62FE;
}

.aim-brand-stat-num em {
    margin-left: 2px;
    font-size: 13px;
    font-weight: 400;
    color: #8D8D8D;
}

.aim-brand-stat-desc {
    margin-top: 2px;
    font-size: 13px;
    color: #111827;
}

.aim-indent {
    margin: 0 0 16px;
    text-indent: 2em;
    font-size: 14px;
    line-height: 1.8;
    color: #525252;
}

.aim-brand-img {
    display: block;
    width: 100%;
    height: auto;
    margin: 4px 0 20px;
    border-radius: var(--aim-radius);
}

.aim-qual-title {
    margin: 0 0 10px;
    font-size: 15px;
    font-weight: 700;
    color: #161616;
}

.aim-qual-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.aim-qual-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 999px;
    background: #EDF5FF;
    border: 1px solid #D0E2FF;
    color: #0043CE;
    font-size: 12px;
    font-weight: 500;
}

.aim-qual-tag img { width: 14px; height: 14px; }

/* ===== 服务网点 ===== */
.aim-network { background: var(--aim-bg); }

.aim-network-map img {
    display: block;
    width: 100%;
    height: auto;
}

.aim-network-data {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 20px;
}

.aim-data-card {
    padding: 16px 8px;
    text-align: center;
    background: var(--aim-white);
    border: 1px solid var(--aim-border);
    border-radius: var(--aim-radius);
}

.aim-data-card strong {
    display: block;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.1;
    color: #0F62FE;
}

.aim-data-card strong em {
    font-size: 14px;
    font-weight: 500;
}

.aim-data-card>span {
    font-size: 12px;
    color: #6F6F6F;
}

/* ===== 学术力量 ===== */
.aim-academic {
    background: var(--aim-blue);
    padding-bottom: 48px;
}

.aim-block { margin-bottom: 28px; }

.aim-block:last-child { margin-bottom: 0; }

.aim-block-title {
    margin: 0 0 8px;
    font-size: 17px;
    font-weight: 700;
    color: #fff;
}

.aim-block-desc {
    margin: 0 0 16px;
    font-size: 13px;
    line-height: 1.6;
    color: rgba(255, 255, 255, .72);
}

.aim-institute-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.aim-institute-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: rgba(255, 255, 255, .96);
    border-radius: 10px;
}

.aim-institute-card img {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
}

.aim-institute-card span {
    font-size: 14px;
    font-weight: 600;
    color: var(--aim-blue);
}

.aim-expert-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

.aim-expert-stat {
    padding: 16px 8px;
    text-align: center;
    background: #fff;
    border-radius: 8px;
}

.aim-expert-stat strong {
    display: block;
    font-size: 22px;
    font-weight: 700;
    line-height: 1.2;
    color: #0F62FE;
}

.aim-expert-stat strong em {
    font-size: 13px;
    font-weight: 600;
}

.aim-expert-stat>span {
    font-size: 11px;
    font-weight: 500;
    color: #111827;
}

/* ===== 题库资源 ===== */
.aim-question { background: #f4f7fa; }

.aim-question-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 16px;
}

.aim-qstat-card {
    padding: 20px 12px;
    text-align: center;
    background: var(--aim-white);
    border: 1px solid var(--aim-border);
    border-radius: var(--aim-radius);
}

.aim-qstat-card strong {
    display: block;
    font-size: 28px;
    font-weight: 700;
    line-height: 1.2;
    color: #0F62FE;
}

.aim-qstat-card strong em {
    font-size: 15px;
    font-weight: 600;
    color: #4C9DFF;
}

.aim-qstat-card>span {
    font-size: 13px;
    font-weight: 500;
    color: var(--aim-muted);
}

.aim-growth {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 16px;
}

.aim-growth-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 20px;
    background: var(--aim-white);
    border: 1px solid var(--aim-border);
    border-radius: var(--aim-radius);
}

.aim-growth-card img {
    width: 42px;
    height: 42px;
    flex-shrink: 0;
}

.aim-growth-card strong {
    display: block;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
    color: #198038;
}

.aim-growth-card strong em {
    font-size: 14px;
    font-weight: 600;
}

.aim-growth-card>div>span {
    font-size: 13px;
    color: #6F6F6F;
}

.aim-question-desc {
    padding: 20px;
    background: var(--aim-white);
    border: 1px solid var(--aim-border);
    border-radius: var(--aim-radius);
}

.aim-question-desc h4 {
    margin: 0 0 8px;
    font-size: 15px;
    font-weight: 700;
    color: #161616;
}

.aim-question-desc p {
    margin: 0;
    font-size: 13px;
    line-height: 1.7;
    color: #6F6F6F;
}

/* ===== 核心优势 ===== */
.aim-advantage { background: var(--aim-white); }

.aim-adv-card {
    padding: 22px 18px;
    margin-bottom: 16px;
    background: var(--aim-white);
    border: 1px solid var(--aim-border);
    border-radius: 14px;
}

.aim-adv-card:last-child { margin-bottom: 0; }

.aim-adv-head {
    display: flex;
    align-items: center;
    gap: 12px;
}

.aim-adv-head img {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
}

.aim-adv-head h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #161616;
}

.aim-adv-head p {
    margin: 2px 0 0;
    font-size: 12px;
    color: #6F6F6F;
}

.aim-adv-line {
    height: 1px;
    margin: 16px 0 18px;
    background: #F0F0F0;
}

.aim-adv-items {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.aim-adv-item {
    display: flex;
    gap: 12px;
    padding: 16px;
    background: #F8FAFF;
    border: 1px solid #EEF2FF;
    border-radius: 10px;
}

.aim-adv-num {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 6px;
    background: rgba(15, 98, 254, .08);
    font-size: 12px;
    font-weight: 700;
    color: var(--aim-blue);
}

.aim-adv-item strong {
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 700;
    color: #1a1a2e;
}

.aim-adv-item p {
    margin: 0;
    font-size: 12px;
    line-height: 1.6;
    color: var(--aim-muted);
}

/* ===== 联系我们 ===== */
.aim-contact {
    background: #f5f8fa;
    padding-bottom: 0;
}

.aim-hq {
    padding: 18px;
    margin-bottom: 16px;
    background: rgba(255, 255, 255, .75);
    border: 1px solid #F0F0F0;
    border-radius: 10px;
}

.aim-hq-title {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 700;
    color: #161616;
}

.aim-hq-item {
    padding: 12px 0;
    border-top: 1px dashed #E5E5E5;
}

.aim-hq-item:first-of-type {
    padding-top: 0;
    border-top: none;
}

.aim-hq-item strong {
    display: block;
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: 700;
    color: #0F62FE;
}

.aim-hq-item p {
    margin: 0 0 3px;
    font-size: 13px;
    line-height: 1.6;
    color: #6F6F6F;
}

.aim-hq-item a {
    color: #0F62FE;
    font-weight: 600;
    text-decoration: none;
}

.aim-hq-label {
    font-size: 14px;
    font-weight: 600;
    color: #161616;
}

.aim-region-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding-bottom: 28px;
}

.aim-region-card {
    padding: 14px;
    background: #fff;
    border: 1px solid #F0F0F0;
    border-radius: 8px;
}

.aim-region-card strong {
    display: block;
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 700;
    color: #161616;
}

.aim-region-card>a {
    display: block;
    margin-bottom: 4px;
    font-size: 13px;
    font-weight: 600;
    color: #0F62FE;
    text-decoration: none;
}

.aim-region-desc {
    margin: 0;
    font-size: 11px;
    line-height: 1.45;
    color: #8D8D8D;
}

.aim-region-desc a {
    color: #0F62FE;
    text-decoration: none;
    word-break: break-all;
}

/* ===== 底部疑问区 ===== */
.aim-qa {
    position: relative;
    z-index: 2;
    padding: 32px 0 36px;
    text-align: center;
    background: linear-gradient(91deg, #106DF5 0%, #3D85ED 64.12%, #106DF5 100%);
}

.aim-qa h3 {
    margin: 0 0 12px;
    font-size: 19px;
    font-weight: 600;
    line-height: 1.4;
    color: #fff;
}

.aim-qa p {
    margin: 0 0 20px;
    font-size: 14px;
    color: rgba(255, 255, 255, .92);
}

.aim-qa-btns {
    display: flex;
    gap: 12px;
    justify-content: center;
}

.aim-qa-btn {
    flex: 1;
    max-width: 160px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 20px;
    border-radius: 30px;
    font-size: 15px;
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
}

.aim-qa-btn-white {
    background: rgba(255, 255, 255, .94);
    color: #055AE1;
}

.aim-qa-btn-outline {
    background: transparent;
    color: #fff;
    border: 1.5px solid rgba(255, 255, 255, .55);
}

.aim-qa-service {
    display: block;
    width: 120px;
    height: auto;
    margin: 24px auto 0;
}

/* ===== 手机级微调 ===== */
@media (max-width: 560px) {
    .aim-nav { top: 66px; }
    .aim-section { scroll-margin-top: 120px; }
}

@media (max-width: 480px) {
    .aim-banner-title { font-size: 30px; }
    .aim-head h2 { font-size: 23px; }
    .aim-banner-actions { flex-direction: column; }
}
</style>
