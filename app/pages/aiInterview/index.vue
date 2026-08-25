<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// @ts-ignore
const source = useCampaignSource()
// @ts-ignore
const contactRoute = computed(() => getContactRoute(8, source.value))

// 导航标签
const navTabs = [
    { label: '技术能力', target: 'tech-capability' },
    { label: '产品价值', target: 'product-value' },
    { label: '用户痛点', target: 'user-pain' },
    { label: '产品流程', target: 'product-flow' },
    { label: '技术核心', target: 'tech-core' },
    { label: '产品优势', target: 'product-advantage' },
    { label: '应用场景', target: 'application-scene' },
    { label: '客户案例', target: 'customer-case' },
]
const activeNav = ref('tech-capability')

const scrollToSection = (target: string) => {
    const el = document.getElementById(`ai-${target}`)
    if (el) {
        const headerOffset = 60
        const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
    }
}

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

// 应用场景区数据（从设计图提取）
const applicationScenes = [
    {
        icon: '/assets/images/aiInterview/box4-icon20.png',
        title: '蓝领与服务业招聘',
        pain: '流动性高、招聘频繁、需当天完成入职',
        solution: '语音面试降低操作门槛，快速验证责任心与沟通能力',
        effect: '招聘周期从天级降至小时级，保障旺季运营',
        data: { value: '7天→2天', unit: '门店招聘周期' }
    },
    {
        icon: '/assets/images/aiInterview/box4-icon21.png',
        title: '大规模校园招聘',
        pain: '简历量大、面试官有限、招聘周期短',
        solution: '批量筛选快速初面，标准化评估，7x24小时灵活面试',
        effect: '初面时间大幅缩短，公平对待每一位候选人',
        data: { value: '0%', unit: '初面时间缩短' }
    },
    {
        icon: '/assets/images/aiInterview/box4-icon22.png',
        title: '技术岗位初筛',
        pain: '技术面试官时间宝贵，基础能力筛选耗时',
        solution: '自动考察编程基础与技术逻辑，结合简历验证项目真实性',
        effect: '技术面试官只需终面，效率提升显著',
        data: { value: '0%', unit: '面试官时间节省' }
    },
    {
        icon: '/assets/images/aiInterview/box4-icon23.png',
        title: '销售软技能评估',
        pain: '软技能难量化，面试官主观性强',
        solution: '情景模拟考察应变与说服力，语音情感分析评估沟通亲和力',
        effect: '多维度评分替代"感觉不错"的模糊判断',
        data: { value: '90%+', unit: '与真人面试官评价一致性' }
    },
    {
        icon: '/assets/images/aiInterview/box4-icon24.png',
        title: '远程与全球化招聘',
        pain: '跨地域跨时区，面试协调极其困难',
        solution: '候选人自助完成面试，多语言支持，统一评估标准',
        effect: '跨时区面试覆盖率全面提升',
        data: { value: '100%', unit: '跨时区面试覆盖率' }
    },
    {
        icon: '/assets/images/aiInterview/box4-icon25.png',
        title: '内部竞聘与人才盘点',
        pain: '内部候选人多，评估维度需一致，避免人情分',
        solution: '统一竞聘流程，评估管理潜力与战略思维，输出发展建议',
        effect: '衔接人才梯队建设，选拔更公正',
        data: { value: '0%', unit: '招聘成本降低' }
    },
]

// 客户案例数据
const customerCases = [
    {
        label: '餐饮连锁',
        company: '某快递',
        desc: '全国2万+家门店招聘管理上线，人机一致性89%',
        value: '90万+',
        unit: '累计面试人次'
    },
    {
        label: '智能制造',
        company: '某制造集团',
        desc: '集团八大事业部上线AI面试，统一面试标准',
        value: '上万天',
        unit: '节约工时成本'
    },
    {
        label: '零售行业',
        company: '某大型零售集团',
        desc: '全集团启用中测AI面试，覆盖门店及总部岗位',
        value: '40万+',
        unit: '累计面试人次'
    },
]
</script>

<template>
    <div ref="aiSection" class="ai-page">
        <!-- ========== Banner ========== -->
        <section class="ai-banner">
            <div class="ai-banner-box">
                <div class="ai-banner-bg">
                    <img src="/assets/images/aiInterview/banner-bg.png" alt="" class="ai-banner-bg-img" />
                </div>
                <div class="container-ai ai-banner-content">
                    <div class="banner-left-box">中测高科AI面试系统</div>
                    <h1 class="ai-banner-title">AI时代的<span class="ai-highlight">智能面试专家</span></h1>
                    <p class="ai-banner-desc comm-indent">统一用人标准，提升招聘效率。7×24全程AI自动邀约、面试、评估，帮助组织实现"组织智能化"人才战略。</p>
                    <div class="ai-banner-actions">
                        <NuxtLink class="ai-btn ai-btn-primary" :to="contactRoute">免费试用</NuxtLink>
                        <NuxtLink class="ai-btn ai-btn-outline" :to="contactRoute">预约演示</NuxtLink>
                    </div>
                    <div class="ai-banner-tags">
                        <span class="ai-tag">多轮面试</span>
                        <span class="ai-tag">智能评估</span>
                        <span class="ai-tag">实时反馈</span>
                        <span class="ai-tag">数据分析</span>
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
                    {{ tab.label }}
                </a>
            </div>
        </nav>

        <!-- ========== 技术能力区 ========== -->
        <section id="ai-tech-capability" class="ai-section ai-tech-section">
            <div class="ai-tech-bg">
                <img src="/assets/images/aiInterview/bg1.png" alt="" class="ai-tech-bg-img" />
            </div>
            <div class="container-ai">
                <div class="ai-section-header ai-section-header-center ai-animate" style="margin-bottom: 51px;">
                    <span class="ai-section-label">技术能力</span>
                    <h2>多年海量行业知识技能</h2>
                    <p class="ai-section-subtitle">专注于人力资源测评的科技型、学术型人力资源科技服务公司。</p>
                </div>
                <div class="ai-tech-content ai-animate">
                    <div class="ai-tech-left">
                        <div class="ai-tech-title">技术能力</div>
                        <p class="ai-tech-desc comm-indent">
                            中测高科依托多年积累的海量行业知识及技能图谱、海量题库及各类行业数据，利用行业领先的AI技术，将人才的仪容仪表、沟通表达、综合素质、专业技能、行业经验等500多个细分评估维度结构化量化。7*24小时自动邀约、自动面试、自动评估、AI模型精准，尤其适合大规模校招招聘、蓝领招聘、白领初级岗位招聘。
                        </p>
                        <p class="ai-tech-desc comm-indent">底层技术：<span>在DeepSeek R1模型基础上调优，基于Agent
                                Flow的主观题评测技术及4000万条指标数量及专家知识库，比通用大模型有更好的稳定性和准确度。</span></p>
                    </div>
                    <img src="/assets/images/aiInterview/box1-img.png" alt="" class="ai-tech-img" />
                </div>
                <div class="ai-tech-stats ai-animate">
                    <div class="ai-stat-item">
                        <strong><span class="ai-count-number" v-count-up="60">60</span><span
                                class="ai-count-plus">+</span></strong>
                        <span>集团客户</span>
                    </div>
                    <div class="ai-stat-item">
                        <strong><span class="ai-count-number" v-count-up="500">500</span><span
                                class="ai-count-unit">万人</span></strong>
                        <span>面试人次</span>
                    </div>
                    <div class="ai-stat-item">
                        <strong><span class="ai-count-number" v-count-up="90">90</span><span
                                class="ai-count-percent">%</span></strong>
                        <span>到面率</span>
                    </div>
                    <div class="ai-stat-item">
                        <strong><span class="ai-count-number" v-count-up="80">80</span><span
                                class="ai-count-percent">%</span></strong>
                        <span>HR效率提升</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 产品价值区 ========== -->
        <section id="ai-product-value" class="ai-section ai-value-section">
            <div class="container-ai">
                <div class="ai-section-header ai-section-header-center ai-animate">
                    <span class="ai-section-label">产品价值</span>
                    <h2>统一用人标准，打造组织智能化</h2>
                    <p class="ai-section-subtitle">中测高科AI面试7*24小时，自动自动邀约、自动宣讲、自动面试、自动答疑、自动评估。<br />全程无需人工干预，随时随地完成面试。
                    </p>
                </div>
                <div class="ai-value-grid ai-animate">
                    <div class="ai-value-card">
                        <h3>全程自动 抢人更快</h3>
                        <p class="comm-indent">7×24自动邀约、面试、评估，可同时面试数十万人，大幅缩短招聘周期</p>
                        <span class="ai-value-tag">招聘周期缩短50%</span>
                    </div>
                    <div class="ai-value-card">
                        <h3>体验好 到岗高1倍</h3>
                        <p class="comm-indent">不需约面、到场、排队，候选人扫码即可面试，显著提升雇主品牌形象</p>
                        <span class="ai-value-tag">到岗率高达90%</span>
                    </div>
                    <div class="ai-value-card">
                        <h3>HR效率提升80%</h3>
                        <p class="comm-indent">重复笔试与评判交给AI自动完成，HR专注于高价值的招聘策略工作</p>
                        <span class="ai-value-tag">释放HR核心生产力</span>
                    </div>
                    <div class="ai-value-card">
                        <h3>视频化量化人才库</h3>
                        <p class="comm-indent">积累视频化、结构化的量化人才数据，便于人才盘点与人才库激活</p>
                        <span class="ai-value-tag">数据驱动人才决策</span>
                    </div>
                    <div class="ai-value-card">
                        <h3>统一标准 控制风险</h3>
                        <p class="comm-indent">AI准确率超过95%，总思统一控制用人质量，规避用工风险</p>
                        <span class="ai-value-tag">风险降低＞50%</span>
                    </div>
                    <div class="ai-value-card">
                        <h3>大幅降低成本</h3>
                        <p class="comm-indent">面试全流程自动化，减少HR差旅、场地、人工成本，单次面试成本趋于零</p>
                        <span class="ai-value-tag">ROI显著提升</span>
                    </div>
                </div>
                <div class="ai-value-more ai-animate">
                    <NuxtLink class="ai-btn ai-btn-outline-sm" :to="contactRoute">查看更多</NuxtLink>
                </div>
                <div class="ai-value-img-wrap ai-animate">
                    <img src="/assets/images/aiInterview/box2-img.png" alt="" class="ai-value-img" />
                </div>
            </div>
        </section>

        <!-- ========== 用户痛点区 ========== -->
        <section id="ai-user-pain" class="ai-section ai-pain-section">
            <div class="ai-pain-bg">
                <img src="/assets/images/aiInterview/bg2.png" alt="" class="ai-pain-bg-img" />
            </div>
            <div class="container-ai">
                <div class="ai-section-header ai-section-header-center ai-animate">
                    <span class="ai-section-label ai-section-label1">用户痛点</span>
                    <h2>传统招聘面临的挑战</h2>
                    <p class="ai-section-subtitle ai-section-subtitle1">手动筛选简历、安排面试、评估候选人不仅耗时，还容易出现偏差，影响招聘质量和效率。</p>
                </div>
                <div class="ai-pain-icons ai-animate">
                    <div class="ai-pain-icon-item">
                        <img src="/assets/images/aiInterview/box3-icon1.png" alt="" />
                        <div>效率低下</div>
                        <span>手动筛选简历耗时数小时，安排面试更是复杂繁琐</span>
                    </div>
                    <div class="ai-pain-icon-item">
                        <img src="/assets/images/aiInterview/box3-icon2.png" alt="" />
                        <div>评估误差</div>
                        <span>人工评估易受主观因素影响，难以保证客观公正</span>
                    </div>
                    <div class="ai-pain-icon-item">
                        <img src="/assets/images/aiInterview/box3-icon3.png" alt="" />
                        <div>沟通延迟</div>
                        <span>面试安排中的沟通环节多，容易产生时间延误</span>
                    </div>
                    <div class="ai-pain-icon-item">
                        <img src="/assets/images/aiInterview/box3-icon4.png" alt="" />
                        <div>时间冲突</div>
                        <span>协调多方日程困难，面试改期频繁</span>
                    </div>
                    <div class="ai-pain-icon-item">
                        <img src="/assets/images/aiInterview/box3-icon5.png" alt="" />
                        <div>体验不佳</div>
                        <span>冗长的面试流程影响候选人体验</span>
                    </div>
                </div>
                <div class="ai-pain-compare ai-animate">
                    <div class="ai-pain-left">
                        <div class="ai-pain-left-header">
                            <img src="/assets/images/aiInterview/box3-bg1.png" alt="" class="ai-pain-header-bg" />
                            <img src="/assets/images/aiInterview/box3-icon6.png" alt="" class="ai-pain-header-icon" />
                            <span>传统面试</span>
                        </div>
                        <div class="ai-pain-list">
                            <div class="ai-pain-item">
                                <img src="/assets/images/aiInterview/box3-icon7.png" alt="" />
                                <div><span>简历筛选费时费力</span>，人才抢夺难</div>
                            </div>
                            <div class="ai-pain-list-line1"></div>
                            <div class="ai-pain-item">
                                <img src="/assets/images/aiInterview/box3-icon7.png" alt="" />
                                <div><span>沟通成本高：</span>前期反复约；候选人到面率低；到面不符要求得继续礼仪沟通</div>
                            </div>
                            <div class="ai-pain-list-line1"></div>
                            <div class="ai-pain-item">
                                <img src="/assets/images/aiInterview/box3-icon7.png" alt="" />
                                <div><span>需要重介绍岗位、回答同样的问题；</span>用人部门无法查看候选人面试记录</div>
                            </div>
                        </div>
                    </div>
                    <div class="ai-pain-vs">
                        <img src="/assets/images/aiInterview/box3-icon10.png" alt="" />
                    </div>
                    <div class="ai-pain-right">
                        <div class="ai-pain-right-header">
                            <img src="/assets/images/aiInterview/box3-bg2.png" alt="" class="ai-pain-header-bg" />
                            <img src="/assets/images/aiInterview/box3-icon8.png" alt="" class="ai-pain-header-icon" />
                            <span>中测AI面试</span>
                        </div>
                        <div class="ai-pain-list">
                            <div class="ai-pain-item">
                                <img src="/assets/images/aiInterview/box3-icon9.png" alt="" />
                                <div><span>AI面试7*24小时</span>自动筛选/宣讲/答疑/评估等</div>
                            </div>
                            <div class="ai-pain-list-line2"></div>
                            <div class="ai-pain-item">
                                <img src="/assets/images/aiInterview/box3-icon9.png" alt="" />
                                <div><span>候选人随时随地可自动面试；</span>AI多项技术分析及测评、智能决策</div>
                            </div>
                            <div class="ai-pain-list-line2"></div>
                            <div class="ai-pain-item">
                                <img src="/assets/images/aiInterview/box3-icon9.png" alt="" />
                                <div><span>全程记录，查询方便：</span>人才信息结构化、量化、视频化呈现，一目了然</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 产品流程区 ========== -->
        <section id="ai-product-flow" class="ai-section ai-flow-section">
            <div class="container-ai ai-flow-section-box">
                <div class="ai-flow-section-left ai-animate">
                    <div class="ai-flow-subtitle">产品流程</div>
                    <div class="ai-flow-title">全自动面试<br />从邀约到评估</div>
                    <div class="ai-flow-desc">自动邀约、自动宣讲、自动面试、自动答疑、自动评估，面试结束3分钟自动出具报告</div>
                    <div class="ai-flow-content">
                        <div class="ai-flow-step">
                            <img src="/assets/images/aiInterview/box4-icon1.png" alt="" />
                            <div>
                                <span><strong>面试前</strong> — 电话邀约、短信通知、邮件触达，多渠道自动触达候选人</span>
                            </div>
                        </div>
                        <div class="ai-flow-step">
                            <img src="/assets/images/aiInterview/box4-icon2.png" alt="" />
                            <div>
                                <span><strong>面试中</strong> — AI智能问答、千人千问、智能追问、多模态监测、防作弊监控</span>
                            </div>
                        </div>
                        <div class="ai-flow-step">
                            <img src="/assets/images/aiInterview/box4-icon3.png" alt="" />
                            <div>
                                <span><strong>面试后</strong> — AI自动评分、可视化报告、量化标签、人才库沉淀</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ai-flow-right ai-animate">
                    <div class="ai-dashboard-header">
                        <div class="ai-dashboard-icons">
                            <div class="ai-dashboard-icons-box">
                                <img src="/assets/images/aiInterview/box4-icon4.png" alt="自动邀约" />
                                <div>自动邀约</div>
                                <span>电话+短信+邮件</span>
                            </div>
                            <img class="arrow-img" src="/assets/images/aiInterview/box4-icon7.png" alt="" />
                            <div class="ai-dashboard-icons-box">
                                <img src="/assets/images/aiInterview/box4-icon5.png" alt="AI面试" />
                                <div>AI面试</div>
                                <span>千人千问 智能追问</span>
                            </div>
                            <img class="arrow-img" src="/assets/images/aiInterview/box4-icon7.png" alt="" />
                            <div class="ai-dashboard-icons-box">
                                <img src="/assets/images/aiInterview/box4-icon6.png" alt="自动评估" />
                                <div>自动评估</div>
                                <span>3分钟出报告</span>
                            </div>
                        </div>
                    </div>
                    <div class="ai-dashboard-box">
                        <div class="ai-dashboard-title">
                            <div>面试数据看板</div>
                            <span>实时更新</span>
                        </div>
                        <div class="ai-dashboard-charts">
                            <div class="ai-chart-item">
                                <div class="ai-chart-value"><span class="ai-count-number" v-count-up="1247">1,247</span>
                                </div>
                                <div class="ai-chart-label">今日面试</div>
                                <div class="ai-chart-bars">
                                    <div class="ai-bar" style="height: 40%;"></div>
                                    <div class="ai-bar" style="height: 60%;"></div>
                                    <div class="ai-bar" style="height: 80%;"></div>
                                    <div class="ai-bar" style="height: 50%;"></div>
                                    <div class="ai-bar" style="height: 70%;"></div>
                                </div>
                            </div>
                            <div class="ai-chart-item">
                                <div class="ai-chart-value" style="color: #00C9A7;"><span class="ai-count-number"
                                        v-count-up="92">92</span><span class="ai-chart-percent">%</span></div>
                                <div class="ai-chart-label">通过率</div>
                                <div class="ai-chart-bars">
                                    <div class="ai-bar" style="height: 62%; background: #00C9A7;"></div>
                                    <div class="ai-bar" style="height: 65%; background: #00C9A7;"></div>
                                    <div class="ai-bar" style="height: 70%; background: #00C9A7;"></div>
                                    <div class="ai-bar" style="height: 75%; background: #00C9A7;"></div>
                                    <div class="ai-bar" style="height: 82%; background: #00C9A7;"></div>
                                </div>
                            </div>
                            <div class="ai-chart-item">
                                <div class="ai-chart-value"><span class="ai-count-number" v-count-up="4.6">4.6</span>
                                </div>
                                <div class="ai-chart-label">满意度</div>
                                <div class="ai-chart-bars">
                                    <div class="ai-bar" style="height: 70%;"></div>
                                    <div class="ai-bar" style="height: 75%;"></div>
                                    <div class="ai-bar" style="height: 65%;"></div>
                                    <div class="ai-bar" style="height: 80%;"></div>
                                    <div class="ai-bar" style="height: 72%;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 技术核心区 ========== -->
        <section id="ai-tech-core" class="ai-section ai-core-section">
            <div class="container-ai">
                <div class="ai-core-content ai-animate">
                    <div class="ai-core-left">
                        <img class="ai-core-main-icon" src="/assets/images/aiInterview/box4-icon8.png" alt="" />
                        <div class="ai-core-icons">
                            <div class="ai-core-icons-box">
                                <img src="/assets/images/aiInterview/box4-icon9.png" alt="" />
                                <div>对话内容</div>
                            </div>
                            <div class="ai-core-icons-box">
                                <img src="/assets/images/aiInterview/box4-icon10.png" alt="" />
                                <div>情感情绪</div>
                            </div>
                            <div class="ai-core-icons-box">
                                <img src="/assets/images/aiInterview/box4-icon11.png" alt="" />
                                <div>外在形象</div>
                            </div>
                            <div class="ai-core-icons-box">
                                <img src="/assets/images/aiInterview/box4-icon12.png" alt="" />
                                <div>对话环境</div>
                            </div>
                        </div>
                        <div class="ai-core-icons1">
                            五维度全方位评估
                        </div>
                    </div>
                    <div class="ai-core-right" style="margin-top: 13px;">
                        <div class="ai-flow-subtitle">技术核心</div>
                        <div class="ai-flow-title" style="margin-bottom: 15px;">真正的多模态<br />智能评估</div>
                        <div class="ai-flow-desc" style="margin-bottom: 28px;">基于中测高科AI行业大模型，2亿条问答对训练，专家精标4000万条，实现五
                            维度全方位评估</div>
                        <div class="ai-core-feature">
                            <img src="/assets/images/aiInterview/box4-icon13.png" alt="" />
                            <span><strong>对话内容评估</strong> — ASR语音识别 + 语义理解，评估表达清晰度、逻辑思维</span>
                        </div>
                        <div class="ai-core-feature">
                            <img src="/assets/images/aiInterview/box4-icon14.png" alt="" />
                            <span><strong>情绪表情检测</strong> — 微表情与情绪检测，检测求职意愿、心理状态</span>
                        </div>
                        <div class="ai-core-feature">
                            <img src="/assets/images/aiInterview/box4-icon15.png" alt="" />
                            <span><strong>外在形象评估</strong> — 面试礼仪、普通话水平、英语能力等维度</span>
                        </div>
                        <div class="ai-core-feature">
                            <img src="/assets/images/aiInterview/box4-icon16.png" alt="" />
                            <span><strong>环境与风险检测</strong> — 防作弊、防切屏、多人检测、键盘声识别</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 产品优势区 ========== -->
        <section id="ai-product-advantage" class="ai-section ai-advantage-section">
            <div class="container-ai">
                <div class="ai-advantage-content ai-animate">
                    <div class="ai-advantage-left">
                        <div class="ai-flow-subtitle">产品优势</div>
                        <div class="ai-flow-title" style="margin-bottom: 30px;">更智能 · 更成熟 <br />· 更贴心</div>
                        <div class="ai-flow-desc comm-indent" style="margin-bottom: 41px;">专业团队 + 数据闭环 +
                            行业模型，为组织提供可靠、灵活、高品质的AI面试解决方案</div>
                        <div class="ai-advantage-feature">
                            <img src="/assets/images/aiInterview/box4-icon17.png" alt="" />
                            <div>

                                <span><strong>模型准</strong> — AI专家来自微软、腾讯，测评专家来自北、北师大心理系，2亿条问答对训练</span>
                            </div>
                        </div>
                        <div class="ai-advantage-feature">
                            <img src="/assets/images/aiInterview/box4-icon18.png" alt="" />
                            <div>
                                <span><strong>体验好</strong> — AI面试宽直度定制、数字人面试官、3D地图指引、AI答疑官</span>
                            </div>
                        </div>
                        <div class="ai-advantage-feature">
                            <img src="/assets/images/aiInterview/box4-icon19.png" alt="" />
                            <div>
                                <span><strong>配置灵活</strong> — AI Builder快速配置，数十个考核维度自由组合，支持API对接</span>
                            </div>
                        </div>
                    </div>
                    <div class="ai-advantage-right">
                        <div class="ai-advantage-right-box">
                            <div class="ai-progress-header">AI模型评估对方维度</div>
                            <div class="ai-progress-item">
                                <div class="ai-progress-label">
                                    逻辑思维
                                </div>
                                <div class="ai-progress-bar">
                                    <div class="ai-progress-fill" style="width: 92%;"></div>
                                </div>
                                <div><span class="ai-progress-number" v-count-up="92">92</span>%</div>
                            </div>
                            <div class="ai-progress-item">
                                <div class="ai-progress-label">
                                    表达能力
                                </div>
                                <div class="ai-progress-bar">
                                    <div class="ai-progress-fill ai-progress-fill1" style="width: 88%;"></div>
                                </div>
                                <div><span class="ai-progress-number" v-count-up="88">88</span>%</div>
                            </div>
                            <div class="ai-progress-item">
                                <div class="ai-progress-label">
                                    岗位匹配
                                </div>
                                <div class="ai-progress-bar">
                                    <div class="ai-progress-fill" style="width: 95%;"></div>
                                </div>
                                <div><span class="ai-progress-number" v-count-up="95">95</span>%</div>
                            </div>
                            <div class="ai-progress-item">
                                <div class="ai-progress-label">
                                    绩效预测
                                </div>
                                <div class="ai-progress-bar">
                                    <div class="ai-progress-fill ai-progress-fill1" style="width: 85%;"></div>
                                </div>
                                <div><span class="ai-progress-number" v-count-up="85">85</span>%</div>
                            </div>
                        </div>
                        <div class="ai-stats-row">
                            <div class="ai-stat-box">
                                <strong><span class="ai-count-number" v-count-up="2">2</span>亿+</strong>
                                <span>问答对训练数据</span>
                            </div>
                            <div class="ai-stat-box">
                                <strong style="color: #00C9A7;"><span class="ai-count-number"
                                        v-count-up="4000">4000</span>万</strong>
                                <span>专家精标数据</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 应用场景区 ========== -->
        <section id="ai-application-scene" class="ai-section ai-scene-section">
            <div class="container-ai">
                <div class="ai-flow-subtitle" style="margin-bottom: 18px;">应用场景</div>
                <div class="ai-flow-title" style="margin-bottom: 7px;">适用于各种招聘场景</div>
                <div class="ai-flow-desc" style="margin-bottom: 18px;">无论是大规模招聘还是专业岗位，AI面试官都能提供高效的解决方案。</div>
                <div class="ai-scene-grid ai-animate">
                    <div v-for="(scene, idx) in applicationScenes" :key="idx" class="ai-scene-card">
                        <div class="ai-scene-card-header">
                            <img :src="scene.icon" alt="" class="ai-scene-icon" />
                            <h3>{{ scene.title }}</h3>
                        </div>
                        <div class="ai-scene-content">
                            <div class="ai-scene-row">
                                <div class="ai-scene-row-num">1</div>
                                <span><strong>痛点：</strong>{{ scene.pain }}</span>
                            </div>
                            <div class="ai-scene-row">
                                <div class="ai-scene-row-num ai-scene-row-num2">2</div>
                                <span><strong>AI方案：</strong>{{ scene.solution }}</span>
                            </div>
                            <div class="ai-scene-row">
                                <div class="ai-scene-row-num ai-scene-row-num3">3</div>
                                <span><strong>效果：</strong>{{ scene.effect }}</span>
                            </div>
                        </div>
                        <div class="ai-scene-data">
                            <div class="ai-data-before">{{ scene.data.value }}</div>
                            <div class="ai-data-after">{{ scene.data.unit }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 客户案例区 ========== -->
        <section id="ai-customer-case" class="ai-section ai-case-section">
            <div class="container-ai">
                <div class="ai-section-header ai-section-header-center ai-animate">
                    <span class="ai-section-label">客户案例</span>
                    <h2>被众多头部企业验证的AI面试方案</h2>
                    <p class="ai-section-subtitle">已为60多家集团提供AI面试服务，覆盖交通物流、智能制造、餐饮零售、银行保险、酒旅等多个行业</p>
                </div>
                <div class="ai-case-tags ai-animate">
                    <span class="ai-case-tag">某快递公司</span>
                    <span class="ai-case-tag">某网络公司</span>
                    <span class="ai-case-tag">某大型零售企业</span>
                    <span class="ai-case-tag">某制造企业</span>
                    <span class="ai-case-tag">大型连锁酒店企业</span>
                    <span class="ai-case-tag">某知名银行</span>
                </div>
                <div class="ai-case-main ai-animate">
                    <img src="/assets/images/aiInterview/box5-img.png" alt="" class="ai-case-main-img" />
                    <div class="ai-case-info">
                        <div
                            style="display: flex; align-items: center; justify-content: space-between;margin-bottom: 12px;">
                            <div class="ai-case-industry">物流行业</div>
                            <div class="ai-case-total">累计面试人次 <strong><span class="ai-count-number"
                                        v-count-up="300">300</span>万+</strong></div>
                        </div>
                        <h3>某快递 — 全集团AI面试标杆</h3>
                        <p class="comm-indent">2020年12月正式上线，覆盖快递员、客服、理赔、仓管等岗位，AI面试标准始终如一，有效预测绩效表现，成为集团招聘数字化转型的核心工具。</p>
                        <NuxtLink class="ai-btn ai-btn-outline-sm" style="border-radius: 8px;" :to="contactRoute">了解详情
                        </NuxtLink>
                    </div>
                </div>
                <div class="ai-case-cards ai-animate">
                    <div v-for="(case_item, idx) in customerCases" :key="idx" class="ai-case-card">
                        <div class="ai-case-card-label">{{ case_item.label }}</div>
                        <div class="ai-case-card-header">{{ case_item.company }}</div>
                        <p>{{ case_item.desc }}</p>
                        <div class="ai-case-card-value">
                            <strong><span class="ai-count-number"
                                    :v-count-up="parseFloat(case_item.value.replace(/[万+]/g, ''))">{{ case_item.value
                                    }}</span></strong>
                            <span>{{ case_item.unit }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 申请免费使用区 ========== -->
        <section class="ai-cta-section">
            <div class="container-ai">
                <div class="ai-cta-content ai-animate">
                    <div class="ai-cta-content-line"></div>
                    <h2>期待与您共创共赢AI大时代</h2>
                    <p>中测高科AI面试系统 — 更智能 · 更贴心 · 更成熟</p>
                    <NuxtLink class="ai-btn ai-btn-white" :to="contactRoute">申请免费使用</NuxtLink>
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
    --ai-blue-dark: #0043CE;
    --ai-ink: #1A1A2E;
    --ai-muted: #5A6578;
    --ai-bg: #f4f7fb;
    --ai-white: #fff;
    --ai-radius: 12px;
    font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    color: var(--ai-ink);
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

/* ===== 通用 Section Header ===== */
.ai-section-header {
    margin-bottom: 44px;
}

.ai-section-header-center {
    text-align: center;
}

.ai-section-header-left {
    text-align: left;
}

.ai-section-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #0F62FE;
    font-weight: 500;
    margin-bottom: 12px;
}

.ai-section-label::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background: var(--ai-blue);
    border-radius: 50%;
}

.ai-section-label1 {
    color: #fff !important;
}

.ai-section-label1:before {
    background: #fff !important;
}

.ai-section-header h2 {
    font-size: 34px;
    font-weight: 600;
    letter-spacing: 2px;
    margin: 0 0 11px;
    line-height: 1.25;
    color: #1A1A2E;
}

.ai-section-subtitle {
    color: #666666;
    font-size: 16px;
    line-height: 1.76;
    margin: 0 auto;
    max-width: 771px;
    text-align: center;
}

.ai-section-desc {
    color: #6B7280;
    font-size: 17px;
    line-height: 1.76;
    margin: 0;
    max-width: 771px;
}

.ai-section-subtitle1 {
    color: rgba(255, 255, 255, 0.7);
}

.ai-highlight {
    color: var(--ai-blue);
    font-weight: 700;
}

/* ===== Banner ===== */
.ai-banner {
    width: 100%;
    height: 541px;
    background: linear-gradient(90deg, #E3EDFF 0%, #F3F5F9 49.34%, #F2F4FB 98.08%);
    overflow: hidden;
}

.ai-banner-box {
    position: relative;
    width: 1440px;
    margin: 0 auto;
    height: 100%;
}

.ai-banner-bg {
    position: absolute;
    top: 6px;
    right: 0;
    width: 796px;
    height: 480px;
    pointer-events: none;
}

.ai-banner-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.ai-banner-content {
    position: absolute;
    z-index: 2;
    top: 81px;
    left: 137px;
}

.banner-left-box {
    font-weight: 600;
    font-size: 13px;
    color: #1A5FFF;
    line-height: 21px;
    padding-left: 14px;
    position: relative;
    margin-bottom: 37px;
}

.banner-left-box::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #1A5FFF;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
}

.ai-banner-title {
    font-size: clamp(32px, 4vw, 44px);
    font-weight: 700;
    color: var(--ai-ink);
    line-height: 1.3;
    margin: 0 0 31px;
}

.ai-banner-desc {
    font-size: 17px;
    color: #666666;
    line-height: 1.76;
    margin: 0 0 50px;
    max-width: 464px;
}

.ai-banner-actions {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 42px;
}

.ai-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 30px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    line-height: 1;
}

.ai-btn-primary {
    background: var(--ai-blue);
    color: var(--ai-white);
}

.ai-btn-primary:hover {
    background: var(--ai-blue-dark);
    box-shadow: 0 6px 20px rgba(15, 98, 254, 0.4);
    transform: translateY(-2px);
}

.ai-btn-outline {
    background: transparent;
    color: var(--ai-blue);
    border: 1px solid var(--ai-blue);
}

.ai-btn-outline:hover {
    background: var(--ai-blue);
    color: var(--ai-white);
}

.ai-btn-outline-sm {
    background: transparent;
    color: var(--ai-blue);
    border: 1px solid var(--ai-blue);
    width: 104px;
    height: 40px;
    font-size: 13px;
    padding: 0;
    border-radius: 100px;
}

.ai-btn-outline-sm:hover {
    background: var(--ai-blue);
    color: var(--ai-white);
}

.ai-btn-white {
    background: var(--ai-white);
    color: var(--ai-blue);
    padding: 16px 32px;
    font-size: 16px;
    font-weight: 600;
}

.ai-btn-white:hover {
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

.ai-banner-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-left: 6px;
}

.ai-tag {
    padding: 7px 15px;
    background: #F9FAFB;
    border-radius: 20px;
    font-size: 12px;
    color: #9CA3AF;
    font-weight: 500;
}

/* ===== 导航标签 ===== */
.ai-nav-bar {
    width: 100%;
    height: 56px;
    background: #F9FAFB;
    position: sticky;
    top: 76px;
    left: 0;
    z-index: 15;
}

.ai-nav-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 58px;
    height: 100%;
}

.ai-nav-tab {
    font-size: 16px;
    font-weight: 400;
    color: #161616;
    text-decoration: none;
    padding: 16px 0;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
    cursor: pointer;
}

.ai-nav-tab:hover {
    color: var(--ai-blue);
}

.ai-nav-tab-active {
    color: var(--ai-blue);
    border-bottom-color: var(--ai-blue);
}

/* ===== 技术能力区 ===== */
.ai-tech-section {
    position: relative;
    width: 100%;
    height: 723px;
    padding: 49px 0 54px;
    background: #fff;
}

.ai-tech-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 723px;
    pointer-events: none;
}

.ai-tech-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.ai-tech-content {
    display: flex;
    gap: 43px;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
    position: relative;
    z-index: 2;
}

.ai-tech-left {
    max-width: 469px;
    margin-top: 22px;
}

.ai-tech-title {
    font-weight: 600;
    font-size: 17px;
    color: #1A1A2E;
    margin-bottom: 12px;
}

.ai-tech-desc {
    font-weight: 400;
    font-size: 16px;
    color: #666666;
    line-height: 26px;
    margin-bottom: 16px;
}

.ai-tech-desc span {
    color: #1A5FFF;
}

.ai-tech-img {
    width: 649px;
    height: 338px;
    flex-shrink: 0;
}

.ai-tech-stats {
    display: flex;
    gap: 16px;
    justify-content: center;
    position: relative;
    z-index: 2;
}

.ai-stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 280px;
    height: 92px;
    background: #FFFFFF;
    border-radius: 12px;
    border: 1px solid #E5E9F0;
    justify-content: center;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
}

.ai-stat-item strong {
    font-size: 30px;
    font-weight: 600;
    color: #1A5FFF;
    line-height: 1.1;
}

.ai-count-number {
    font-size: inherit !important;
    font-weight: inherit !important;
    color: inherit !important;
}

.ai-count-plus,
.ai-count-unit,
.ai-count-percent {
    font-size: 16px !important;
    font-weight: 600;
    color: var(--ai-blue) !important;
    margin-left: 2px;
}

.ai-stat-item span {
    font-size: 13px;
    color: #666;
    font-weight: 400;
}

/* ===== 产品价值区 ===== */
.ai-value-section {
    padding: 54px 0 45px;
    background: var(--ai-white);
}

.ai-value-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 19px 26px;
    margin-bottom: 16px;
}

.ai-value-card {
    padding: 24px 32px 22px 22px;
    background: var(--ai-white);
    border-radius: 12px;
    border: 1px solid #E5E9F0;
    transition: all 0.3s ease;
}

.ai-value-card:hover {
    box-shadow: 0 8px 24px rgba(15, 98, 254, 0.08);
    border-color: var(--ai-blue);
}

.ai-value-card h3 {
    font-weight: 600;
    font-size: 17px;
    color: #1A1A2E;
    line-height: 27px;
    margin: 0 0 16px;
}

.ai-value-card p {
    font-weight: 400;
    font-size: 14px;
    color: #666666;
    line-height: 22px;
    margin: 0 0 14px;
}

.ai-value-tag {
    display: inline-block;
    padding: 3px 10px;
    background: #E3EDFF;
    border-radius: 4px;
    font-weight: 600;
    font-size: 12px;
    color: #1A5FFF;
    line-height: 19px;
}

.ai-value-more {
    text-align: center;
    margin-bottom: 43px;
}

.ai-value-img-wrap {
    text-align: center;
}

.ai-value-img {
    width: 1155px;
    max-width: 100%;
    height: auto;
}

/* ===== 用户痛点区 ===== */
.ai-pain-section {
    position: relative;
    width: 100%;
    height: 1031px;
    padding: 82px 0 90px;
    overflow: hidden;
    background: linear-gradient(125deg, #003399 0%, #0052D9 40%, #1677FF 100%);
}

.ai-pain-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 1031px;
    pointer-events: none;
    z-index: 1;
}

.ai-pain-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.ai-pain-section .container-ai {
    position: relative;
    z-index: 2;
}

.ai-pain-section .ai-section-header h2 {
    color: var(--ai-white);
}

.ai-pain-icons {
    display: flex;
    justify-content: center;
    gap: 28px;
    margin-bottom: 55px;
}

.ai-pain-icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 211px;
    height: 193px;
    background: #FFFFFF;
    border-radius: 2px 2px 2px 2px;
    border: 1px solid #E5E7EB;
    padding: 0 27px;
    transition: all 0.3s ease-in-out;
}

.ai-pain-icon-item:hover {
    transform: scale(1.1);
}

.ai-pain-icon-item img {
    width: 44px;
    height: 44px;
    margin-bottom: 16px;
}

.ai-pain-icon-item div {
    font-weight: 600;
    font-size: 15px;
    color: #111827;
    line-height: 20px;
    margin-bottom: 8px;
}

.ai-pain-icon-item span {
    font-weight: 400;
    font-size: 13px;
    color: #9CA3AF;
    line-height: 20px;
    text-align: center;
}

.ai-pain-compare {
    display: flex;
    gap: 8px;
    align-items: stretch;
}

.ai-pain-left,
.ai-pain-right {
    flex: 1;
    background: var(--ai-white);
    border-radius: 16px;
    padding: 35px 44px 82px;
}

.ai-pain-left-header,
.ai-pain-right-header {
    position: relative;
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 49px;
    padding-left: 43px;
    margin-left: -44px;
    width: 262px;
    height: 65px;
}

.ai-pain-header-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 262px;
    height: 65px;
}

.ai-pain-header-icon {
    width: 44px;
    height: 44px;
    z-index: 2;
}

.ai-pain-left-header span,
.ai-pain-right-header span {
    font-size: 24px;
    font-weight: 600;
    color: #111827;
    z-index: 2;
}

.ai-pain-list {
    display: flex;
    flex-direction: column;
}

.ai-pain-list-line1 {
    width: 100%;
    height: 0;
    border: 1px dashed #1A5FFF;
    margin: 36px 0;
}

.ai-pain-list-line2 {
    width: 100%;
    height: 0;
    border: 1px dashed #FB9203;
    margin: 36px 0;
}

.ai-pain-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

.ai-pain-item img {
    width: 35px;
    height: 35px;
    flex-shrink: 0;
}

.ai-pain-item div {
    font-weight: 600;
    font-size: 16px;
    color: #111827;
    line-height: 20px;
}

.ai-pain-item span {
    color: #1A5FFF;
}

.ai-pain-right .ai-pain-list span {
    color: #FB9203;
}

.ai-pain-vs {
    display: flex;
    align-items: center;
    justify-content: center;
}

.ai-pain-vs img {
    width: 56px;
    height: 56px;
}

/* ===== 产品流程区 ===== */
.ai-flow-section {
    padding: 97px 0 54px;
    background: #f5f7fa;
}

.ai-flow-section-box {
    display: flex;
    justify-content: space-between;
    gap: 64px;
}

.ai-flow-section-left {
    margin-top: 33px;
}

.ai-flow-subtitle {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: #0F62FE;
    font-weight: 500;
    margin-bottom: 12px;
}

.ai-flow-subtitle::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background: var(--ai-blue);
    border-radius: 50%;
}

.ai-flow-title {
    font-weight: 600;
    font-size: 34px;
    color: #1A1A2E;
    line-height: 43px;
    margin-bottom: 29px;
}

.ai-flow-desc {
    font-weight: 400;
    font-size: 16px;
    color: #666666;
    line-height: 27px;
    margin-bottom: 41px;
}

.ai-flow-content {
    max-width: 518px;
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.ai-flow-step {
    display: flex;
    align-items: center;
    gap: 12px;
}

.ai-flow-step img {
    width: 28px;
    height: 28px;
}

.ai-flow-step strong {
    font-weight: 600;
    color: #1A1A2E;
}

.ai-flow-step span {
    font-size: 14px;
    color: #333;
    line-height: 1.57;
}

.ai-flow-right {
    background: linear-gradient(122deg, rgba(26, 95, 255, 0.08) 0%, rgba(26, 95, 255, 0) 50%, rgba(0, 201, 167, 0.06) 100%);
    border-radius: 16px;
    padding: 32px;
}

.ai-dashboard-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
}

.ai-dashboard-icons {
    display: flex;
    align-items: center;
}

.ai-dashboard-icons-box {
    width: 156px;
    height: 148px;
    background: #FFFFFF;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
    border-radius: 12px 12px 12px 12px;
    border: 1px solid #E5E9F0;
    padding: 16px 28px 31px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.ai-dashboard-icons img {
    width: 56px;
    height: 56px;
    margin-bottom: 2px;
}

.arrow-img {
    width: 32px !important;
    height: 10px !important;
    margin: 0 12px;
}

.ai-dashboard-icons-box div {
    font-weight: 600;
    font-size: 13px;
    color: #1A1A2E;
    line-height: 21px;
    margin-bottom: 3px;
}

.ai-dashboard-header span {
    font-weight: 400;
    font-size: 11px;
    color: #999999;
    line-height: 18px;
}

.ai-dashboard-box {
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
    border-radius: 12px 12px 12px 12px;
    border: 1px solid #E5E9F0;
    padding: 21px;
}

.ai-dashboard-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 13px;
    color: #1A1A2E;
    line-height: 21px;
    margin-bottom: 12px;
}

.ai-dashboard-title span {
    font-weight: 400;
    font-size: 11px;
    color: #999999;
    line-height: 18px;
    position: relative;
}

.ai-dashboard-title span::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -12px;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background: #00C9A7;
    border-radius: 3px 3px 3px 3px;
}

.ai-dashboard-charts {
    display: flex;
    gap: 10px;
    width: calc(100% -20px);
    margin: 0 auto;
}

.ai-chart-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #F5F7FA;
    border-radius: 8px 8px 8px 8px;
    padding: 10px;
}

.ai-chart-bars {
    display: flex;
    gap: 4px;
    align-items: flex-end;
    height: 44px;
}

.ai-bar {
    width: 21px;
    background: #1A5FFF;
    border-radius: 2px 2px 0 0;
    transition: height 0.5s ease;
    opacity: 0.6;
}

.ai-chart-value {
    font-weight: 600;
    font-size: 20px;
    color: #1A5FFF;
    line-height: 32px;
    margin-bottom: 8px;
}

.ai-chart-label {
    font-weight: 400;
    font-size: 11px;
    color: #999999;
    line-height: 18px;
}

/* ===== 技术核心区 ===== */
.ai-core-section {
    padding: 97px 0;
    background: #fff;
}

.ai-core-content {
    display: flex;
    gap: 64px;
    justify-content: space-between;
}

.ai-core-left {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 583px;
    height: 419px;
    background: linear-gradient(122deg, rgba(26, 95, 255, 0.08) 0%, rgba(26, 95, 255, 0) 50%, rgba(0, 201, 167, 0.06) 100%);
    border-radius: 16px;
    padding: 52px 32px;
}

.ai-core-main-icon {
    width: 140px;
    height: 140px;
}

.ai-core-icons {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
}

.ai-core-icons1 {
    font-weight: 600;
    font-size: 12px;
    color: #1A5FFF;
    line-height: 19px;
    padding: 6px 14px 6px 26px;
    position: relative;
    background: #E3EDFF;
    border-radius: 20px 20px 20px 20px;
    align-self: flex-start;
}

.ai-core-icons1::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 14px;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background: #1A5FFF;
    border-radius: 3px 3px 3px 3px;
}

.ai-core-icons-box {
    flex: 0 1 calc(50% - 6px);
    height: 62px;
    background: #FFFFFF;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
    border-radius: 8px 8px 8px 8px;
    border: 1px solid #E5E9F0;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    font-size: 12px;
    color: #1A1A2E;
    line-height: 19px;
    padding: 15px;
}

.ai-core-icons img {
    width: 32px;
    height: 32px;
}

.ai-core-right {
    display: flex;
    flex-direction: column;
    max-width: 600px;
}

.ai-core-feature {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    color: #333;
    line-height: 22px;
    margin-bottom: 14px;
}

.ai-core-feature img {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    margin-top: 4px;
}

.ai-core-feature strong {
    color: #1A1A2E;
    font-weight: 600;
}

/* ===== 产品优势区 ===== */
.ai-advantage-section {
    padding: 97px 0;
    background: #f5f7fa;
}

.ai-advantage-content {
    display: flex;
    gap: 51px;
    justify-content: space-between;
}

.ai-advantage-left {
    max-width: 561px;
    margin-top: 13px;
}

.ai-advantage-feature {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
}

.ai-advantage-feature img {
    width: 28px;
    height: 28px;
}

.ai-advantage-feature strong {
    font-weight: 600;
    font-size: 14px;
    color: #1A1A2E;
    line-height: 22px;
}

.ai-advantage-feature span {
    color: #333;
}

.ai-advantage-right {
    width: 583px;
    background: linear-gradient(121deg, rgba(26, 95, 255, 0.08) 0%, rgba(26, 95, 255, 0) 50%, rgba(0, 201, 167, 0.06) 100%);
    border-radius: 16px;
    padding: 32px;
}

.ai-advantage-right-box {
    background: #FFFFFF;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
    border-radius: 12px 12px 12px 12px;
    border: 1px solid #E5E9F0;
    padding: 25px;
    margin-bottom: 16px;
}

.ai-progress-header {
    font-weight: 600;
    font-size: 14px;
    color: #1A1A2E;
    line-height: 22px;
    margin-bottom: 21px;
}

.ai-progress-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
}

.ai-progress-label {
    font-weight: 600;
    font-size: 12px;
    color: #1A1A2E;
    line-height: 19px;
    margin-right: 48px;
}

.ai-progress-bar {
    width: calc(100% - 150px);
    height: 10px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 6px;
    overflow: hidden;
    margin-right: 16px;
}

.ai-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #1A5FFF 0%, #4D8AFF 100%);
    border-radius: 6px;
    transition: width 1s ease;
}

.ai-progress-fill1 {
    background: linear-gradient(90deg, #00C9A7 0%, #33D4B8 100%);
}

.ai-progress-number {
    font-weight: 600;
    font-size: 13px;
    color: #1A5FFF;
    line-height: 21px;
}

.ai-stats-row {
    display: flex;
    gap: 12px;
}

.ai-stat-box {
    flex: 1;
    height: 90px;
    background: #FFFFFF;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
    border-radius: 12px 12px 12px 12px;
    border: 1px solid #E5E9F0;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.ai-stat-box strong {
    font-weight: 600;
    font-size: 24px;
    color: #1A5FFF;
    line-height: 38px;
}

.ai-stat-box span {
    font-weight: 400;
    font-size: 11px;
    color: #999999;
    line-height: 18px;
}

/* ===== 应用场景区 ===== */
.ai-scene-section {
    padding: 47px 0 81px;
    background: var(--ai-white);
}

.ai-scene-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}

.ai-scene-card {
    padding: 30px;
    background: var(--ai-white);
    border-radius: 12px;
    border: 1px solid #E5E7EB;
    transition: all 0.3s ease;
}

.ai-scene-card:hover {
    box-shadow: 0 8px 24px rgba(15, 98, 254, 0.08);
    border-color: var(--ai-blue);
}

.ai-scene-card-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
}

.ai-scene-icon {
    width: 44px;
    height: 44px;
}

.ai-scene-card h3 {
    font-weight: 600;
    font-size: 18px;
    color: #0F172A;
    line-height: 29px;
    margin: 0;
}

.ai-scene-content {
    margin-bottom: 16px;
}

.ai-scene-row {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
}

.ai-scene-row strong {
    font-weight: 600;
    font-size: 14px;
    color: #0F172A;
    line-height: 21px;
}

.ai-scene-row span {
    font-size: 14px;
    font-weight: 400;
    color: #64748B;
}

.ai-scene-row-num {
    width: 24px;
    height: 24px;
    background: #FEF2F2;
    border-radius: 12px 12px 12px 12px;
    font-weight: 600;
    font-size: 12px;
    color: #DC2626;
    line-height: 19px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.ai-scene-row-num2 {
    background: #EFF6FF;
    color: #2563EB;
}

.ai-scene-row-num3 {
    background: #ECFDF5;
    color: #059669;
}

.ai-scene-data {
    width: 100%;
    height: 89px;
    background: #F9FAFB;
    border-radius: 8px 8px 8px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2px;
}

.ai-data-before {
    font-weight: 600;
    font-size: 28px;
    color: #111827;
    line-height: 34px;
}

.ai-data-after {
    font-weight: 400;
    font-size: 13px;
    color: #64748B;
    line-height: 21px;
}

/* ===== 客户案例区 ===== */
.ai-case-section {
    padding: 59px 0 112px;
    background: #f5f7fa;
}

.ai-case-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 35px;
    margin-bottom: 48px;
}

.ai-case-tag {
    padding: 11px 13px;
    background: var(--ai-white);
    border-radius: 8px;
    font-size: 15px;
    color: #999;
    font-weight: 500;
    border: 1px solid #E8EEFF;
    transition: all 0.3s ease;
}

.ai-case-tag:hover {
    border-color: var(--ai-blue);
    color: var(--ai-blue);
}

.ai-case-main {
    display: flex;
    gap: 40px;
    background: var(--ai-white);
    border-radius: 16px;
    padding: 30px;
    margin-bottom: 30px;
}

.ai-case-main-img {
    width: 539px;
    height: 207px;
    flex-shrink: 0;
}

.ai-case-info {
    flex: 1;
}

.ai-case-industry {
    display: inline-block;
    padding: 6px 16px;
    background: #E8EEFF;
    color: var(--ai-blue);
    font-size: 12px;
    border-radius: 4px;
    font-weight: 500;
}

.ai-case-total {
    font-size: 14px;
    color: #6A6A6A;
}

.ai-case-total strong {
    font-size: 28px;
    font-weight: 700;
    color: var(--ai-blue);
    margin-left: 8px;
}

.ai-case-info h3 {
    font-size: 24px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 12px;
}

.ai-case-info p {
    font-weight: 400;
    font-size: 15px;
    color: #666666;
    line-height: 26px;
    margin: 0 0 14px;
}

.ai-case-cards {
    display: flex;
    gap: 24px;
}

.ai-case-card {
    flex: 1;
    padding: 26px;
    background: var(--ai-white);
    border-radius: 12px;
    border: 1px solid #E5E9F0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.ai-case-card-label {
    background: #E3EDFF;
    border-radius: 4px 4px 4px 4px;
    border: 1px solid #E5E9F0;
    padding: 2px 10px;
    margin-bottom: 11px;
    font-weight: 400;
    font-size: 12px;
    color: #1A5FFF;
    line-height: 19px;
}

.ai-case-card-header {
    font-weight: 600;
    font-size: 15px;
    color: #1A1A2E;
    line-height: 24px;
    margin-bottom: 6px;
}

.ai-case-card p {
    font-weight: 400;
    font-size: 13px;
    color: #666666;
    line-height: 20px;
    margin: 0 0 9px;
}

.ai-case-card-value strong {
    display: block;
    font-weight: 600;
    font-size: 24px;
    color: #1A5FFF;
    line-height: 38px;
}

.ai-case-card-value span {
    font-weight: 400;
    font-size: 12px;
    color: #999999;
    line-height: 19px;
}

/* ===== CTA区 ===== */
.ai-cta-section {
    width: 100%;
    height: 354px;
    background: linear-gradient(106deg, #1A5FFF 0%, #0D47A1 100%);
    display: flex;
    align-items: center;
    justify-content: center;
}

.ai-cta-content {
    text-align: center;
    color: var(--ai-white);
}

.ai-cta-content-line {
    width: 48px;
    height: 3px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 2px 2px 2px 2px;
    margin: 0 auto 19px;
}

.ai-cta-content h2 {
    font-size: 36px;
    font-weight: 700;
    margin: 0 0 16px;
    letter-spacing: 2px;
}

.ai-cta-content p {
    font-size: 16px;
    margin: 0 0 32px;
    opacity: 0.9;
}
</style>