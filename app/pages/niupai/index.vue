<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// ===== 导航标签 =====
const navTabs = [
    { label: '产品概述', target: 'overview' },
    { label: '优势亮点', target: 'advantages' },
    { label: '核心功能', target: 'features' },
    { label: '资质证书', target: 'certificates' },
    { label: '服务案例', target: 'cases' },
]
const activeNav = ref('overview')

const scrollToSection = (target: string) => {
    const el = document.getElementById(`niupai-${target}`)
    if (el) {
        const headerOffset = 120
        const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
    }
}

const handleScroll = () => {
    const sections = navTabs.map(t => document.getElementById(`niupai-${t.target}`))
    const scrollY = window.scrollY + 160
    for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i]
        const tab = navTabs[i]
        if (sec && tab && sec.offsetTop <= scrollY) {
            activeNav.value = tab.target
            break
        }
    }
}

// ===== 核心功能 Tab =====
const featureTabs = [
    { label: '财务管理', icon: 'box3-icon1' },
    { label: '人事模块', icon: 'box3-icon5' },
    { label: '采购管理', icon: 'box3-icon9' },
    { label: '合规管理', icon: 'box3-icon13' },
]
const activeFeatureTab = ref(0)
const activeFeature = computed(() => featureData[activeFeatureTab.value]!)

const featureData = [
    {
        title: '财务管理',
        desc: '以"项目"为中心，串联立项、预算、合同、收付款，成本摊销全链条贯通，聚合各项目/各部门的财务数据，生成关键经营指标仪表盘。',
        items: [
            { icon: 'box3-icon1', title: '经营指标看板', desc: '总营收、毛利率、现金流，一屏了然' },
            { icon: 'box3-icon2', title: '预算执行管理', desc: '从预算申请到执行对比，实时掌控预算执行率' },
            { icon: 'box3-icon3', title: '借支与还款跟踪', desc: '实时追踪借支状态，自动关联还款计划' },
            { icon: 'box3-icon4', title: '多团队业绩汇总', desc: '按部门/项目，清晰对比，产品/团队成本与营收' },
        ],
        bg: 'box3-bg1',
    },
    {
        title: '人事模块',
        desc: '可视化的企业"行政轨"与"关系轨"，线上贯穿员工的"选用育留"全生命周期，集成差旅、考勤、排班、周报等场景，提升日常管理效率。',
        items: [
            { icon: 'box3-icon5', title: '基础人事信息', desc: '员工档案、组织架构、合同管理一站式维护' },
            { icon: 'box3-icon6', title: '考勤打卡与统计', desc: '多维度考勤规则设置，自动生成统计报表' },
            { icon: 'box3-icon7', title: '请假申请与审批', desc: '线上提交流程审批，多级审批流自动流转' },
            { icon: 'box3-icon8', title: '绩效目标与考核', desc: 'OKR/KPI目标设定，进度跟踪与绩效评估闭环' },
        ],
        bg: 'box3-bg2',
    },
    {
        title: '采购管理',
        desc: '资产全生命周期管控，从采购申请线上审批到批量生成采购订单。公司统一资产记录资产状态与流转历史，实现"物"的精细化管理。',
        items: [
            { icon: 'box3-icon9', title: '采购申请与比价', desc: '线上发起采购需求，多家供应商比价择优' },
            { icon: 'box3-icon10', title: '资产入库与领用', desc: '资产统一入库，员工线上申领，系统自动记录责任人' },
            { icon: 'box3-icon11', title: '维修与报废', desc: '资产状态工单管理，报废流程全程可追溯' },
            { icon: 'box3-icon12', title: '资产盘点与报表', desc: '一键生成盘点任务，自动生成资产统计报表' },
        ],
        bg: 'box3-bg3',
    },
    {
        title: '合规管理',
        desc: '系统内置风控规则引擎，可自动检测并预警预算超额、发票重复、发票不合规、消费异常等风险，将风险拦截在支付前，确保企业运营合规可控。',
        items: [
            { icon: 'box3-icon13', title: '异常支出预警与拦截', desc: '自动检测超额报销、发票重复、关联交易风险' },
            { icon: 'box3-icon14', title: '材料采购与合同归档', desc: '采购材料、合同文件统一归档，全程可查' },
            { icon: 'box3-icon15', title: '费用审核与监控', desc: '设定费用审批流，实时监控各环节费用支出情况' },
            { icon: 'box3-icon16', title: '项目成本与分析', desc: '按项目归集成本，对比预算偏差并生成分析报告' },
        ],
        bg: 'box3-bg4',
    },
]

// ===== 滚动动画 =====
const niupaiSection = ref<HTMLElement>()
const observerOptions = { threshold: 0.12 }

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    if (niupaiSection.value) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('niupai-visible')
                    observer.unobserve(entry.target)
                }
            })
        }, observerOptions)
        niupaiSection.value.querySelectorAll('.niupai-animate').forEach(el => {
            observer.observe(el as HTMLElement)
        })
    }
})
</script>

<template>
    <div ref="niupaiSection" class="niupai-page">
        <!-- ========== 模块一：Banner ========== -->
        <section class="niupai-banner">
            <div class="niupai-banner-container">
                <div class="niupai-banner-bg">
                    <img src="/assets/images/niupai/banner-bg.png" alt="" class="niupai-banner-bg-img" />
                </div>
                <div class="niupai-banner-content container-niupai">
                    <span class="niupai-badge">解决方案 · 数字产品 · 咨询服务</span>
                    <h1 class="niupai-banner-title"><span class="title1">牛派</span> · 中小企业协同办公<br /><span>管理云平台</span>
                    </h1>
                    <p class="niupai-banner-desc">打通"人、财、物、费"全链路数据，以统一数字化平台实现运营
                        效率与业务质量的双重提升。凭借20余年行业服务经验，为企业
                        数字化高速成长保驾护航。
                    </p>
                    <div class="niupai-banner-actions">
                        <NuxtLink class="niupai-banner-btn niupai-banner-btn-primary" to="/contact?product=5">
                            免费申请体验
                            <img src="/assets/images/niupai/banner-icon1.png" alt="" class="niupai-banner-side-icon" />
                        </NuxtLink>
                        <NuxtLink class="niupai-banner-btn niupai-banner-btn-ghost" to="/contact?product=5">
                            <img src="/assets/images/niupai/banner-icon2.png" alt="" class="niupai-banner-side-icon" />
                            了解产品详情
                        </NuxtLink>
                    </div>
                </div>
                <!-- 统计卡片 -->
                <div class="niupai-stats-bar container-niupai">
                    <div class="niupai-stats-content">
                        <div class="niupai-stat-item niupai-animate">
                            <strong><span class="niupai-count-number" v-count-up="20">20</span><span
                                    class="niupai-stat-unit">+</span></strong>
                            <span>年行业服务经验</span>
                        </div>
                        <div class="niupai-stat-item niupai-animate">
                            <strong><span class="niupai-count-number" v-count-up="4">4</span></strong>
                            <span>大核心管理模块</span>
                        </div>
                        <div class="niupai-stat-item niupai-animate">
                            <strong><span class="niupai-count-number" v-count-up="100">100</span><span
                                    class="niupai-stat-unit">%</span></strong>
                            <span>业务数据互联互通</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 导航标签栏 ========== -->
        <nav class="niupai-nav-bar">
            <div class="container-niupai niupai-nav-inner">
                <a v-for="tab in navTabs" :key="tab.target" class="niupai-nav-tab"
                    :class="{ 'niupai-nav-tab-active': activeNav === tab.target }"
                    @click.prevent="scrollToSection(tab.target)" href="javascript:void(0)">
                    <span class="niupai-nav-tab-text">{{ tab.label }}</span>
                </a>
            </div>
        </nav>

        <!-- ========== 模块二：产品概述 ========== -->
        <section id="niupai-overview" class="niupai-section niupai-overview-section">
            <div class="container-niupai">
                <div class="niupai-overview-grid niupai-animate">
                    <!-- 左列：标题描述 + 行业痛点 -->
                    <div class="niupai-overview-left">
                        <div class="niupai-overview-header">
                            <span class="niupai-section-en">产品与服务简介</span>
                            <h2>一站式全场景<br />数字化解决方案</h2>
                            <p class="niupai-overview-desc">
                                牛派面向各类企业提供一站式全场景数字化解决方案，涉及行政、财务、项目、客户、营销、资产、合规、业务管理等多元模块，精准满足企业当前核心需求，前瞻性地把握行业未来发展趋势。
                            </p>
                        </div>
                        <div class="niupai-pain-points">
                            <h3 class="niupai-pain-title">
                                <img src="/assets/images/niupai/box1-icon1.png" alt="" class="niupai-pain-icon" />
                                行业痛点
                            </h3>
                            <ul class="niupai-pain-list">
                                <li><img src="/assets/images/niupai/box1-icon2.png" alt=""
                                        class="niupai-pain-dot" />传统手工模式导致效率低下、成本高企</li>
                                <li><img src="/assets/images/niupai/box1-icon2.png" alt=""
                                        class="niupai-pain-dot" />缺乏数字化体系，风险管控难以落地</li>
                                <li><img src="/assets/images/niupai/box1-icon2.png" alt=""
                                        class="niupai-pain-dot" />各系统信息孤岛，跨部门协同困难</li>
                                <li><img src="/assets/images/niupai/box1-icon2.png" alt=""
                                        class="niupai-pain-dot" />数字化转型缺乏统一平台与数据闭环</li>
                            </ul>
                        </div>
                    </div>
                    <!-- 右列：一体化平台头条 + 8个功能图标 -->
                    <div class="niupai-overview-right">
                        <div class="niupai-platform">
                            <div class="niupai-platform-header">
                                <img src="/assets/images/niupai/box1-icon3.png" alt="" class="niupai-platform-icon" />
                                <img src="/assets/images/niupai/box1-bg.png" alt="" class="niupai-platform-bg" />
                                <div>
                                    <h3>牛派一体化平台</h3>
                                    <p>覆盖企业核心业务全场景</p>
                                </div>
                            </div>
                        </div>
                        <div class="niupai-feature-icons">
                            <div class="niupai-feature-icon-item">
                                <img src="/assets/images/niupai/box1-icon4.png" alt=""
                                    class="niupai-feature-icon-img" />
                                <span>行政管理</span>
                                <small>流程·审批·考勤</small>
                            </div>
                            <div class="niupai-feature-icon-item">
                                <img src="/assets/images/niupai/box1-icon5.png" alt=""
                                    class="niupai-feature-icon-img" />
                                <span>财务管理</span>
                                <small>预算·报销·核算</small>
                            </div>
                            <div class="niupai-feature-icon-item">
                                <img src="/assets/images/niupai/box1-icon6.png" alt=""
                                    class="niupai-feature-icon-img" />
                                <span>项目管理</span>
                                <small>进度·资源·交付</small>
                            </div>
                            <div class="niupai-feature-icon-item">
                                <img src="/assets/images/niupai/box1-icon7.png" alt=""
                                    class="niupai-feature-icon-img" />
                                <span>客户管理</span>
                                <small>线索·跟进·转化</small>
                            </div>
                            <div class="niupai-feature-icon-item">
                                <img src="/assets/images/niupai/box1-icon8.png" alt=""
                                    class="niupai-feature-icon-img" />
                                <span>营销管理</span>
                                <small>渠道·活动·分析</small>
                            </div>
                            <div class="niupai-feature-icon-item">
                                <img src="/assets/images/niupai/box1-icon9.png" alt=""
                                    class="niupai-feature-icon-img" />
                                <span>资产管理</span>
                                <small>采购·台账·盘点</small>
                            </div>
                            <div class="niupai-feature-icon-item">
                                <img src="/assets/images/niupai/box1-icon10.png" alt=""
                                    class="niupai-feature-icon-img" />
                                <span>合规管理</span>
                                <small>风控·审计·预警</small>
                            </div>
                            <div class="niupai-feature-icon-item">
                                <img src="/assets/images/niupai/box1-icon11.png" alt=""
                                    class="niupai-feature-icon-img" />
                                <span>业务管理</span>
                                <small>运营·协同·决策</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 模块三：优势亮点 ========== -->
        <section id="niupai-advantages" class="niupai-section niupai-advantages-section">
            <div class="niupai-advantages-bg">
                <img src="/assets/images/niupai/box2-bg.png" alt="" class="niupai-advantages-bg-img" />
            </div>
            <div class="container-niupai niupai-advantages-inner">
                <div class="niupai-section-header-center niupai-animate">
                    <span class="niupai-section-en">优势亮点</span>
                    <h2>为什么选择牛派</h2>
                </div>
                <div class="niupai-adv-cards niupai-animate">
                    <div class="niupai-adv-card">
                        <div class="niupai-adv-card-box">
                            <img src="/assets/images/niupai/box2-icon1.png" alt="" class="niupai-adv-icon" />
                            <h3>敏捷部署</h3>
                        </div>
                        <div class="niupai-adv-card-line"></div>
                        <p>SaaS云，私有云部署，因客户需求而定，敏捷快速响应，最短时间完成系统上线。</p>
                    </div>
                    <div class="niupai-adv-card">
                        <div class="niupai-adv-card-box">
                            <img src="/assets/images/niupai/box2-icon2.png" alt="" class="niupai-adv-icon" />
                            <h3>无缝连接</h3>
                        </div>
                        <div class="niupai-adv-card-line"></div>
                        <p>与ERP、WMS、OA等关键系统无缝集成，打破系统间信息壁垒，实现数据自由流转。</p>
                    </div>
                    <div class="niupai-adv-card">
                        <div class="niupai-adv-card-box">
                            <img src="/assets/images/niupai/box2-icon3.png" alt="" class="niupai-adv-icon" />
                            <h3>弹性组合</h3>
                        </div>
                        <div class="niupai-adv-card-line"></div>
                        <p>功能模块自由选择、灵活搭配，实现应用可伸缩、可延展，适配不同规模企业需求。</p>
                    </div>
                    <div class="niupai-adv-card">
                        <div class="niupai-adv-card-box">
                            <img src="/assets/images/niupai/box2-icon4.png" alt="" class="niupai-adv-icon" />
                            <h3>极致体验</h3>
                        </div>
                        <div class="niupai-adv-card-line"></div>
                        <p>智能化分析、移动端操作，权限分明，提供直观界面与实时数据更新，让管理化繁为简。</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 模块四：核心功能 ========== -->
        <section id="niupai-features" class="niupai-section niupai-features-section">
            <div class="container-niupai">
                <div class="niupai-section-header-center niupai-animate">
                    <span class="niupai-section-en">核心功能</span>
                    <h2>四大核心模块，覆盖全管理场景</h2>
                </div>

                <!-- Tab 切换 -->
                <div class="niupai-feature-tabs niupai-animate">
                    <button v-for="(tab, index) in featureTabs" :key="index" class="niupai-feature-tab-btn"
                        :class="{ 'niupai-feature-tab-active': activeFeatureTab === index }"
                        @click="activeFeatureTab = index">
                        {{ tab.label }}
                    </button>
                </div>

                <!-- Tab 内容 -->
                <div class="niupai-feature-content niupai-animate">
                    <div class="niupai-feature-panel" :key="activeFeatureTab">
                        <div class="niupai-feature-left">
                            <h3 class="niupai-feature-title">{{ activeFeature.title }}</h3>
                            <p class="niupai-feature-desc">{{ activeFeature.desc }}</p>
                            <div class="niupai-feature-items">
                                <div v-for="(item, iIndex) in activeFeature.items" :key="iIndex"
                                    class="niupai-feature-item">
                                    <img :src="`/assets/images/niupai/${item.icon}.png`" alt=""
                                        class="niupai-feature-item-icon" />
                                    <div class="niupai-feature-item-text">
                                        <strong>{{ item.title }}</strong>
                                        <span>{{ item.desc }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="niupai-feature-right">
                            <img :src="`/assets/images/niupai/${activeFeature.bg}.png`" alt=""
                                class="niupai-feature-case-img" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 模块五：资质证书 ========== -->
        <section id="niupai-certificates" class="niupai-section niupai-certificates-section">
            <div class="niupai-certificates-bg">
                <img src="/assets/images/niupai/box4-bg1.png" alt="" class="niupai-certificates-bg-img" />
            </div>
            <div class="container-niupai niupai-certificates-inner">
                <div class="niupai-section-header-center niupai-animate">
                    <span class="niupai-section-en niupai-section-en-light">资质证书</span>
                    <h2 class="niupai-title-light">权威资质，值得信赖</h2>
                    <p class="niupai-section-subtitle niupai-subtitle-light">
                        中测高科（北京）人才测评中心有限公司是国内考试服务机构中极少数具有研究院<br />命制资质、国家保密局乙级资质、公安部信息安全三级等保证等权威资质的单位。</p>
                </div>
                <div class="niupai-cert-cards niupai-animate">
                    <div class="niupai-cert-card">
                        <h3>国家涉密资质（乙级）</h3>
                        <p>国家保密局颁发的国家涉密资质（乙级），具备涉密信息系统集成与保密印刷能力，为人事考试数据安全提供国家保障。</p>
                    </div>
                    <div class="niupai-cert-card">
                        <h3>信息安全三级等保</h3>
                        <p>公安部信息系统安全三级等保备案资质，通过严格的安全测评，确保平台在数据存储、传输、访问控制等方面达到国家标准。</p>
                    </div>
                    <div class="niupai-cert-card">
                        <h3>多项软件著作权</h3>
                        <p>拥有AI阅卷系统、AI命题组卷系统、AI质检系统等多项软件著作权，为业务系统建立一套生产、信息安全三级等保体系护航。</p>
                    </div>
                </div>
                <div class="niupai-cert-badges niupai-animate">
                    <div class="niupai-cert-badge">
                        <img src="/assets/images/niupai/box4-icon1.png" alt="" class="niupai-cert-badge-icon" />
                        <span>专业命题研究院</span>
                    </div>
                    <div class="niupai-cert-badge">
                        <img src="/assets/images/niupai/box4-icon1.png" alt="" class="niupai-cert-badge-icon" />
                        <span>保密印刷资质</span>
                    </div>
                    <div class="niupai-cert-badge">
                        <img src="/assets/images/niupai/box4-icon1.png" alt="" class="niupai-cert-badge-icon" />
                        <span>信息安全等级认证</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 模块六：服务案例 ========== -->
        <section id="niupai-cases" class="niupai-section niupai-cases-section">
            <div class="container-niupai">
                <div class="niupai-section-header-center niupai-animate">
                    <span class="niupai-section-en">服务案例</span>
                    <h2>他们的数字化转型，由牛派驱动</h2>
                </div>

                <!-- 案例卡片 -->
                <div class="niupai-case-cards niupai-animate">
                    <div class="niupai-case-card">
                        <div class="niupai-case-card-img-wrap">
                            <img src="/assets/images/niupai/box5-bg1.png" alt="" class="niupai-case-card-img" />
                            <span class="niupai-case-label case-label1">人力资源</span>
                        </div>
                        <div class="niupai-case-card-body">
                            <h3>某省级人力资源服务集团</h3>
                            <p>该集团旗下辖多家分子公司，涵盖各类人群服务数据分析、培训管理优化，通过牛派平台实现集团统一数字化管理，项目成本与营收数据实时汇总，效益效率大幅提升。</p>
                            <div class="line1"></div>
                            <div class="niupai-case-stats">
                                <div><strong>60%</strong><span>管理效率提升</span></div>
                                <div><strong>3x</strong><span>报表生成速度</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="niupai-case-card">
                        <div class="niupai-case-card-img-wrap">
                            <img src="/assets/images/niupai/box5-bg2.png" alt="" class="niupai-case-card-img" />
                            <span class="niupai-case-label">人事考试</span>
                        </div>
                        <div class="niupai-case-card-body">
                            <h3>某大型人事考试机构</h3>
                            <p>承担全国性人事考试组织工作，对命题安全、阅卷效率等要求极为严苛。牛派AI智能阅卷与成绩分析系统帮助其实现阅卷效率与数据精准度的双重突破。</p>
                            <div class="line1"></div>
                            <div class="niupai-case-stats">
                                <div><strong>80%</strong><span>阅卷效率提升</span></div>
                                <div><strong>100%</strong><span>数据安全合规</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="niupai-case-card">
                        <div class="niupai-case-card-img-wrap">
                            <img src="/assets/images/niupai/box5-bg3.png" alt="" class="niupai-case-card-img" />
                        </div>
                        <div class="niupai-case-card-body">
                            <h3>某科技园区运营管理平台</h3>
                            <p>园区内企业众多，运营管理涉及资产管理、费用分摊、合同管理等复杂场景。牛派为其搭建统一的数字化运营平台，实现园区资源的高效调配与透明管理。</p>
                            <div class="line1"></div>
                            <div class="niupai-case-stats">
                                <div><strong>45%</strong><span>运营成本降低</span></div>
                                <div><strong>200+</strong><span>入驻企业管理</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 合作伙伴 -->
                <div class="niupai-partners niupai-animate">
                    <h3 class="niupai-partners-title">合作伙伴</h3>
                    <div class="niupai-partners-grid">
                        <div v-for="i in 28" :key="i" class="niupai-partner-logo"
                            :class="{ 'niupai-partner-logo-last': i === 28 }">
                            <img :src="`/assets/images/niupai/box5-icon${i}.png`" alt=""
                                class="niupai-partner-logo-img" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
/* ===== 基础变量 ===== */
.niupai-page {
    --niupai-blue: #1b3a7e;
    --niupai-blue-light: #4e89fb;
    --niupai-ink: #1a1a2e;
    --niupai-muted: #5A6578;
    --niupai-bg: #f4f7fb;
    --niupai-white: #fff;
    --niupai-border: #e2e8f0;
    --niupai-radius: 12px;
    font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    color: var(--niupai-ink);
    overflow: hidden;
}

.container-niupai {
    width: min(1200px, calc(100% - 40px));
    margin: 0 auto;
}

/* ===== 滚动动画 ===== */
.niupai-animate {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.niupai-animate.niupai-visible {
    opacity: 1;
    transform: translateY(0);
}

.niupai-animate:nth-child(2) {
    transition-delay: 0.1s;
}

.niupai-animate:nth-child(3) {
    transition-delay: 0.2s;
}

.niupai-animate:nth-child(4) {
    transition-delay: 0.3s;
}

/* ===== 模块一：Banner ===== */
.niupai-banner {
    width: 100%;
    background: #1b3a7e;
    overflow: hidden;
}

.niupai-banner-container {
    position: relative;
    width: 1440px;
    max-width: 100%;
    margin: 0 auto;
    min-height: 674px;
}

.niupai-banner-bg {
    position: absolute;
    top: 30px;
    right: -41px;
    width: 1120px;
    height: 674px;
    pointer-events: none;
    z-index: 1;
}

.niupai-banner-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.niupai-banner-content {
    position: relative;
    z-index: 2;
    padding-top: 77px;
    padding-bottom: 94px;
}

.niupai-badge {
    display: inline-block;
    padding: 6px 17px 6px 31px;
    border-radius: 999px;
    background: transparent;
    color: rgba(255, 255, 255, 0.9);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin-bottom: 24px;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.15);
}

.niupai-badge::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #22C55E;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
}

.niupai-banner-title {
    font-size: clamp(36px, 4.5vw, 52px);
    font-weight: 700;
    color: var(--niupai-white);
    line-height: 1.25;
    letter-spacing: 2px;
    margin: 0 0 23px;
}

.niupai-banner-title span {
    color: #4e89fb;
}

.niupai-banner-title .title1 {
    color: #00FFFB;
}

.niupai-banner-desc {
    color: rgba(255, 255, 255, 0.75);
    font-size: 16px;
    line-height: 1.8;
    margin: 0 0 41px;
    max-width: 520px;
}

.niupai-banner-actions {
    display: flex;
    align-items: center;
    gap: 12px;
}

.niupai-banner-side-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
}

.niupai-banner-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    line-height: 1;
}

.niupai-banner-btn-primary {
    background: #4e89fb;
    color: var(--niupai-white);
}

.niupai-banner-btn-primary:hover {
    background: #3a75e8;
    box-shadow: 0 6px 20px rgba(78, 137, 251, 0.4);
    transform: translateY(-2px);
}

.niupai-banner-btn-ghost {
    background: transparent;
    color: var(--niupai-white);
    border: 1px solid rgba(255, 255, 255, 0.25);
}

.niupai-banner-btn-ghost:hover {
    background: rgba(255, 255, 255, 0.18);
    transform: translateY(-2px);
}

/* 统计卡片 */
.niupai-stats-bar {
    position: relative;
    z-index: 2;
    padding-bottom: 71px;
}

.niupai-stats-content {
    display: flex;
    align-items: center;
    gap: 66px;
}

.niupai-stat-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
}

.niupai-stat-item strong {
    display: block;
    font-size: 32px;
    font-weight: 700;
    color: var(--niupai-white);
    line-height: 1.2;
}

.niupai-stat-unit {
    font-size: 32px !important;
    font-weight: 500;
    color: var(--niupai-white) !important;
    margin-left: 2px;
}

.niupai-stat-item span {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 400;
}

.niupai-count-number {
    font-size: inherit !important;
    font-weight: inherit !important;
    color: inherit !important;
}

/* ===== 导航标签栏 ===== */
.niupai-nav-bar {
    position: sticky;
    top: 76px;
    z-index: 10;
    background: var(--niupai-white);
    border-bottom: 1px solid var(--niupai-border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.niupai-nav-inner {
    display: flex;
    justify-content: center;
    gap: 0;
}

.niupai-nav-tab {
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

.niupai-nav-tab-text {
    position: relative;
}

.niupai-nav-tab:hover {
    color: var(--niupai-blue-light);
}

.niupai-nav-tab-active {
    color: var(--niupai-blue-light);
    font-weight: 600;
}

.niupai-nav-tab-active .niupai-nav-tab-text::after {
    content: '';
    position: absolute;
    bottom: -21px;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--niupai-blue-light);
    border-radius: 2px 2px 0 0;
}

/* ===== 通用 Section ===== */
.niupai-section {
    padding: 80px 0;
}

.niupai-section-header-center {
    text-align: center;
    margin-bottom: 48px;
}

.niupai-section-en {
    display: block;
    color: #64748B;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
}

.niupai-section-en-light {
    color: rgba(255, 255, 255, 0.7);
}

.niupai-section-header-center h2 {
    font-size: clamp(28px, 3.5vw, 40px);
    font-weight: 700;
    letter-spacing: 2px;
    margin: 0 0 16px;
    line-height: 1.3;
    color: var(--niupai-ink);
}

.niupai-title-light {
    color: var(--niupai-white) !important;
}

.niupai-section-subtitle {
    color: var(--niupai-muted);
    font-size: 16px;
    line-height: 1.7;
    margin: 0 auto;
    max-width: 680px;
}

.niupai-subtitle-light {
    color: rgba(255, 255, 255, 0.7) !important;
}

/* ===== 模块二：产品概述 ===== */
.niupai-overview-section {
    background: var(--niupai-white);
    padding: 96px 0;
}

.niupai-overview-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 99px;
    align-items: start;
}

/* 左列 */
.niupai-overview-left {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.niupai-overview-header .niupai-section-en {
    text-align: left;
    color: #64748B;
    font-size: 13px;
}

.niupai-overview-header h2 {
    font-size: clamp(28px, 3.5vw, 36px);
    font-weight: 600;
    color: var(--niupai-ink);
    line-height: 1.3;
    margin: 8px 0 15px;
    text-align: left;
}

.niupai-overview-desc {
    font-size: 18px;
    color: #64748B;
    line-height: 1.67;
    margin: 0;
    text-align: left;
}

/* 行业痛点 */
.niupai-pain-points {
    background: #FFF5F5;
    border-radius: 14px;
    padding: 24px;
}

.niupai-pain-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #991B1B;
    margin: 0 0 16px;
}

.niupai-pain-icon {
    width: 16px;
    height: 16px;
}

.niupai-pain-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.niupai-pain-list li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #64748B;
    line-height: 1.5;
}

.niupai-pain-dot {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
}

/* 右列 */
.niupai-overview-right {
    display: flex;
    flex-direction: column;
    gap: 26px;
    margin-top: 40px;
}

/* 一体化平台 */
.niupai-platform {
    background: #1961f2;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
}

.niupai-platform-header {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    position: relative;
    width: 624px;
    height: 79px;
    z-index: 2;
}

.niupai-platform-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}

.niupai-platform-icon {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
}

.niupai-platform-header h3 {
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    margin: 0;
    position: relative;
    z-index: 1;
}

.niupai-platform-header p {
    font-size: 12px;
    color: rgba(255, 255, 255, 1);
    margin: 0;
    position: relative;
    z-index: 1;
}

/* 8个功能图标 */
.niupai-feature-icons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 26px 8px;
}

.niupai-feature-icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px 0;
    background: #F4F7FB;
    border-radius: 8px;
    border: 1px solid #E2E8F0;
    transition: all 0.3s ease;
    width: 150px;
    height: 160px;
}

.niupai-feature-icon-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(78, 137, 251, 0.12);
    border-color: var(--niupai-blue-light);
}

.niupai-feature-icon-img {
    width: 52px;
    height: 64px;
    margin-bottom: 13px;
    flex-shrink: 0;
}

.niupai-feature-icon-item span {
    font-size: 13px;
    font-weight: 600;
    color: #0F172A;
    margin-bottom: 6px;
    line-height: 1.61;
}

.niupai-feature-icon-item small {
    font-size: 11px;
    color: #64748B;
}

/* ===== 模块三：优势亮点 ===== */
.niupai-advantages-section {
    position: relative;
    background: #e3edf7;
    overflow: hidden;
    padding: 46px 0 70px;
    background: #fff;
    /* width: 1440px;
    margin: 0 auto; */
}

.niupai-advantages-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 474px;
    pointer-events: none;
    z-index: 1;
}

.niupai-advantages-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.niupai-advantages-inner {
    position: relative;
    z-index: 2;
}

.niupai-advantages-inner .niupai-section-en {
    font-size: 13px;
    color: #64748B;
    margin-bottom: 17px;
}

.niupai-advantages-inner h2 {
    font-size: 36px;
    color: #0F62FE;
    margin-bottom: 55px;
}

.niupai-adv-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
}

.niupai-adv-card {
    background: #0F62FE;
    border-radius: 14px;
    padding: 32px 15px 32px 25px;
    transition: all 0.3s ease;
    width: 270px;
    height: 218px;
    border: 1px solid #C0C0D0;
}

.niupai-adv-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(78, 137, 251, 0.3);
}

.niupai-adv-card-box {
    display: flex;
    gap: 15px;
    align-items: center;
    margin-bottom: 23px;
}

.niupai-adv-icon {
    width: 44px;
    height: 44px;
}

.niupai-adv-card h3 {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    margin: 0;
}

.niupai-adv-card-line {
    width: 100%;
    height: 1px;
    background: #fff;
    margin-bottom: 13px;
}

.niupai-adv-card p {
    font-size: 15px;
    color: rgba(255, 255, 255, 1);
    line-height: 1.46;
    margin: 0;
}

/* ===== 模块四：核心功能 ===== */
.niupai-features-section {
    background: var(--niupai-white);
    padding: 64px 0 90px;
}

.niupai-features-section .niupai-section-header-center {
    margin-bottom: 31px;
}

.niupai-feature-tabs {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 48px;
}

.niupai-feature-tab-btn {
    padding: 10px 28px;
    border-radius: 999px;
    border: 1px solid var(--niupai-border);
    background: var(--niupai-white);
    color: var(--niupai-ink);
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.niupai-feature-tab-btn:hover {
    border-color: var(--niupai-blue-light);
    color: var(--niupai-blue-light);
}

.niupai-feature-tab-active {
    background: var(--niupai-blue-light);
    color: var(--niupai-white);
    border-color: var(--niupai-blue-light);
}

.niupai-feature-tab-active:hover {
    color: #fff;
}

.niupai-feature-panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 79px;
    align-items: start;
}

.niupai-feature-title {
    font-size: 36px;
    font-weight: 600;
    color: #0F172A;
    margin: 0 0 18px;
}

.niupai-feature-desc {
    font-size: 16px;
    color: #64748B;
    line-height: 1.625;
    margin: 0 0 20px;
    max-width: 448px;
}

.niupai-feature-items {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.niupai-feature-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #F4F7FB;
    border-radius: 4px;
    transition: all 0.3s ease;
    width: 388px;
    height: 72px;
}

.niupai-feature-item:hover {
    background: #eef2ff;
    transform: translateX(4px);
}

.niupai-feature-item-icon {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
}

.niupai-feature-item-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.niupai-feature-item-text strong {
    font-size: 14px;
    font-weight: 600;
    color: #0F172A;
}

.niupai-feature-item-text span {
    font-size: 12px;
    color: #64748B;
    line-height: 1.5;
}

.niupai-feature-case-img {
    width: 639px;
    height: 431px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    margin-top: 80px;
}

/* ===== 模块五：资质证书 ===== */
.niupai-certificates-section {
    position: relative;
    overflow: hidden;
    padding: 47px 0 88px;
    background: #fff;
}

.niupai-certificates-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: #121e34;
    width: 1440px;
    height: 668px;
    pointer-events: none;
    z-index: 1;
}

.niupai-certificates-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.niupai-certificates-inner {
    position: relative;
    z-index: 2;
}

.niupai-cert-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 40px;
}

.niupai-cert-card {
    background: var(--niupai-white);
    border-radius: 12px;
    padding: 32px 28px;
    transition: all 0.3s ease;
}

.niupai-cert-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.niupai-cert-card h3 {
    font-size: 18px;
    font-weight: 700;
    color: var(--niupai-blue-light);
    margin: 0 0 12px;
}

.niupai-cert-card p {
    font-size: 14px;
    color: var(--niupai-muted);
    line-height: 1.7;
    margin: 0;
}

.niupai-cert-badges {
    display: flex;
    justify-content: center;
    gap: 32px;
}

.niupai-cert-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 24px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.niupai-cert-badge-icon {
    width: 16px;
    height: 16px;
}

.niupai-cert-badge span {
    font-size: 13px;
    color: #0F172A;
    font-weight: 500;
}

/* ===== 模块六：服务案例 ===== */
.niupai-cases-section {
    background: var(--niupai-white);
    padding: 50px 0 58px;
}

.niupai-case-cards {
    display: flex;
    gap: 24px;
    justify-content: space-between;
    margin-bottom: 22px;
}

.niupai-case-card {
    background: var(--niupai-white);
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid var(--niupai-border);
    transition: all 0.3s ease;
}

.niupai-case-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.niupai-case-card-img-wrap {
    position: relative;
    height: 113px;
}

.niupai-case-card-img {
    width: 100%;
    height: 113px;
}

.niupai-case-label {
    position: absolute;
    top: 11px;
    left: 12px;
    padding: 2px 12px;
    background: #DBEAFE;
    color: #1E40AF;
    font-size: 12px;
    font-weight: 600;
    border-radius: 999px;
}

.case-label1 {
    color: #92400E;
    background: #FEF3C7;
}

.niupai-case-card-body {
    padding: 8px 32px 16px 25px;
}

.line1 {
    width: 100%;
    height: 1px;
    background: #E2E8F0;
}

.niupai-case-card-body h3 {
    font-size: 18px;
    font-weight: 700;
    color: var(--niupai-ink);
    margin: 0 0 12px;
}

.niupai-case-card-body p {
    font-size: 14px;
    color: var(--niupai-muted);
    line-height: 1.7;
    margin: 0 0 16px;
}

.niupai-case-stats {
    display: flex;
    gap: 32px;
    margin-top: 9px;
}

.niupai-case-stats div {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.niupai-case-stats strong {
    font-size: 24px;
    font-weight: 700;
    color: var(--niupai-blue-light);
}

.niupai-case-stats span {
    font-size: 12px;
    color: var(--niupai-muted);
}

/* 合作伙伴 */
.niupai-partners {
    text-align: center;
}

.niupai-partners-title {
    font-size: 22px;
    font-weight: 600;
    color: #0F172A;
    margin: 0 0 13px;
}

.niupai-partners-grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 12px 11px;
}

.niupai-partner-logo {
    background: var(--niupai-white);
    border: 1px solid var(--niupai-border);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.niupai-partner-logo:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

.niupai-partner-logo-img {
    width: 106px;
    height: 75px;
    object-fit: contain;
}

.niupai-partner-logo-last {
    grid-column: span 3;
}

.niupai-partner-logo-last .niupai-partner-logo-img {
    width: 340px;
    height: 75px;
}

/* ===== 响应式 ===== */
@media (max-width: 1024px) {
    .niupai-overview-grid {
        grid-template-columns: 1fr;
    }

    .niupai-feature-icons {
        grid-template-columns: repeat(2, 1fr);
    }

    .niupai-adv-cards {
        grid-template-columns: repeat(2, 1fr);
    }

    .niupai-feature-panel {
        grid-template-columns: 1fr;
    }

    .niupai-cert-cards {
        grid-template-columns: 1fr;
    }

    .niupai-case-cards {
        grid-template-columns: 1fr;
    }

    .niupai-partners-grid {
        grid-template-columns: repeat(5, 1fr);
    }

    .niupai-partner-logo-last {
        grid-column: span 1;
    }

    .niupai-partner-logo-last .niupai-partner-logo-img {
        width: 106px;
    }
}

@media (max-width: 768px) {
    .niupai-banner-container {
        min-height: auto;
    }

    .niupai-banner-bg {
        width: 100%;
        height: 300px;
        opacity: 0.3;
    }

    .niupai-stats-content {
        flex-wrap: wrap;
        gap: 24px;
    }

    .niupai-feature-icons {
        grid-template-columns: repeat(2, 1fr);
    }

    .niupai-adv-cards {
        grid-template-columns: 1fr;
    }

    .niupai-feature-tabs {
        flex-wrap: wrap;
    }

    .niupai-cert-badges {
        flex-direction: column;
        align-items: center;
    }

    .niupai-partners-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
