<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// @ts-ignore
useSeoMeta({
    title: '成绩分析系统｜中测高科',
    description: '中测成绩分析系统面向考试测评机构与事业单位公开招聘考务，提供科目成绩防作弊嫌疑判定与岗位成绩自动化研判一体化能力，导入成绩数据、配置规则参数，即可自动产出统计指标、预警清单与可视化分析报告。',
})

// ===== 内容导航 =====
const navTabs = [
    { label: '产品意义', target: 'sa-why' },
    { label: '核心优势', target: 'sa-adv' },
    { label: '功能特点', target: 'sa-feat' },
    { label: '分析报告', target: 'sa-report' },
    { label: '参数配置', target: 'sa-config' },
]
const activeNav = ref('sa-why')

const scrollToSection = (target: string) => {
    const el = document.getElementById(target)
    if (el) {
        const headerOffset = 132
        const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
    }
}

const handleScroll = () => {
    const scrollY = window.scrollY + 140
    for (let i = navTabs.length - 1; i >= 0; i--) {
        const tab = navTabs[i]
        if (!tab) continue
        const sec = document.getElementById(tab.target)
        if (sec && sec.offsetTop <= scrollY) {
            activeNav.value = tab.target
            break
        }
    }
}

// ===== 滚动进入动画 + 两位小数计数动效 =====
const saPage = ref<HTMLElement>()

const vCountDecimal = {
    mounted(el: HTMLElement, binding: { value: number }) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return
                io.unobserve(el)
                const end = binding.value
                const duration = 3000
                const startTime = performance.now()
                const step = (now: number) => {
                    const progress = Math.min((now - startTime) / duration, 1)
                    const eased = 1 - Math.pow(1 - progress, 3)
                    el.textContent = (eased * end).toFixed(2)
                    if (progress < 1) requestAnimationFrame(step)
                }
                requestAnimationFrame(step)
            })
        }, { threshold: 0.3 })
        io.observe(el)
    },
    unmounted(el: HTMLElement) { el.textContent = '' },
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    if (!saPage.value) return
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('sa-visible')
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0.12 })
    saPage.value.querySelectorAll('.sa-animate').forEach(el => observer.observe(el as HTMLElement))
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

// ===== Banner 数据栏 =====
const bannerStats = [
    { value: 30, decimals: 0, suffix: 's', label: '3000+ 考生全量分析耗时' },
    { value: 0.01, decimals: 2, suffix: '', label: '统计结果精确度' },
    { value: 5, decimals: 0, suffix: '%', label: '科目成绩嫌疑预警规则' },
    { value: 1, decimals: 0, suffix: '键', label: '完整分析报告导出' },
]

// ===== 产品意义 =====
const pains = [
    { title: '作弊嫌疑靠肉眼，漏判且无据可依', desc: '同一考场答案雷同、分数断层，靠人工翻阅试卷比对，效率低、标准不一，还拿不出量化证据。' },
    { title: '招考数据躺在 Excel 里，风险看不出来', desc: '岗位分差、高竞争、面试缺考、递补风险散落在各张表格，靠人脑串不起来。' },
    { title: '报告手工整理，一错就是事故', desc: '统计指标、图表、明细逐条拼装，耗时数天，稍不留神就是口径错误、数据对不上。' },
]

const flowSteps = [
    { title: '导入', desc: 'Excel 原始成绩一键上传' },
    { title: '配置', desc: '分析参数按需设定' },
    { title: '分析', desc: '全局统计 +规则预警' },
    { title: '报告', desc: '在线预览·一键导出' },
]

// ===== 核心优势 =====
const advCards = [
    { icon: '/assets/images/scoreAnalysis/box2-icon1.png', title: '秒级出报告', desc: '3000+ 考生导入 + 全量分析总耗时不超过 30 秒，完整报告与精简报告一键导出 Word，考后当天即可交付。', tag: '效率' },
    { icon: '/assets/images/scoreAnalysis/box2-icon2.png', title: '多维规则联动预警', desc: '分数断层、错题雷同、得分分布异常、能力矛盾、跨考场雷同五类规则协同研判，互为印证，减少单规则误报。', tag: '精准' },
    { icon: '/assets/images/scoreAnalysis/box2-icon3.png', title: '规则全参数可配置', desc: '断层阈值、雷同率、入围比例、面试权重、合格分数线等全部可调，适配不同考试规模与科目属性，不写死。', tag: '灵活' },
    { icon: '/assets/images/scoreAnalysis/box2-icon4.png', title: '结论可追溯 · 可复核', desc: '系统只输出「嫌疑预警」而非「作弊定论」；每条预警附带触发规则、计算数据与原始作答片段，人工复核闭环。', tag: '合规' },
]

// ===== 功能特点（两大分析场景 tab） =====
const featureTabs = [
    {
        icon: '/assets/images/scoreAnalysis/box3-tab1.png',
        name: '科目成绩分析',
        sub: '成绩防作弊嫌疑判定',
        pill: '成绩公平 · 防作弊预警',
        desc: '以「考场」与「考生」为分析对象，基于分数断层、答案雷同等规则引擎，自动输出嫌疑预警名单。系统只出线索、不轻易定性，每一条预警都附带完整证据链，交由阅卷人员复核后定论。',
        num: 5,
        numLabel: '类嫌疑判定规则 · 联动研判',
        cards: [
            { icon: '/assets/images/scoreAnalysis/box3-icon1.png', title: '分数断层判定', desc: '单考场高分聚集群体与后续名次分差超过阈值（默认10 分）即触发，剔除缺考、小考场样本不足自动跳过，避免误报。', output: '嫌疑考场 + 嫌疑考生清单' },
            { icon: '/assets/images/scoreAnalysis/box3-icon2.png', title: '客观题雷同分析', desc: '同考场两两逐题比对，错题雷同率 ≥90% 高嫌疑、70%–89% 待复核；全部答对不预警，错题高度重合才是核心指标。', output: '考生对 + 雷同率 + 重合错题清单' },
            { icon: '/assets/images/scoreAnalysis/box3-icon3.png', title: '主观题雷同分析', desc: '文字内容、答题逻辑、错误特征三维比对，满足任两条即标记疑卷；标准答案模板作答与极简作答自动排除。', output: '作答原文对比片段，人工复核确认' },
            { icon: '/assets/images/scoreAnalysis/box3-icon4.png', title: '得分分布异常', desc: '考场平均分显著偏离全样本、大量分数尾数集中（0 /5）等异常形态自动识别，标记考场整体异常。', output: '异常考场 + 分布图表' },
            { icon: '/assets/images/scoreAnalysis/box3-icon5.png', title: '能力矛盾识别', desc: '客观题低分而主观题异常偏高、或客观全对而主观近零分等「能力矛盾」试卷标记嫌疑，防范分工代答。', output: '矛盾试卷清单' },
            { icon: '/assets/images/scoreAnalysis/box3-icon6.png', title: '跨考场雷同比对', desc: '不局限本考场，支持跨全部考生比对客观与主观雷同，防范不同考场间传递答案的作弊方式。', output: '跨考场雷同预警' },
        ],
    },
    {
        icon: '/assets/images/scoreAnalysis/box3-tab2.png',
        name: '岗位成绩分析',
        sub: '事业单位公开招聘研判',
        pill: '招考决策 · 岗位数据研判',
        desc: '面向事业单位公开招聘笔试、面试原始成绩，自动完成全局统计、岗位断层、高分考生、强竞争岗位、面试缺考与递补风险研判，输出完整可导出的岗位成绩分析报告，辅助招聘考务人员开展考后数据分析与风险评估。',
        num: 7,
        numLabel: '大分析模块 · 一站式研判',
        cards: [
            { icon: '/assets/images/scoreAnalysis/box3-icon7.png', title: '数据导入与校验', desc: 'Excel 一键导入，准考证号重复、成绩非法、排名跳号等脏数据自动告警；支持「跳过错误行」或「终止导入」两种模式，成绩统一保留两位小数。', output: '' },
            { icon: '/assets/images/scoreAnalysis/box3-icon8.png', title: '全局统计分析', desc: '参考人数、笔试平均分、最高 / 最低分、缺考统计、分数段分布（<60 至 90+）一键汇总，笔试分数分布柱状图自动生成。', output: '' },
            { icon: '/assets/images/scoreAnalysis/box3-icon9.png', title: '岗位断层分析', desc: '按岗位分别计算笔试、面试、综合总分分差，自动标注碾压级断层、普通断层、无断层标签，输出断层岗位明细清单。', output: '' },
            { icon: '/assets/images/scoreAnalysis/box3-icon10.png', title: '90+ 高分考生专项', desc: '自动筛选笔试 ≥90 分考生，关联同岗位第二名成绩，自动区分「岗位断层」与「高手对决」，标记是否进入面试。', output: '' },
            { icon: '/assets/images/scoreAnalysis/box3-icon11.png', title: '强竞争岗位识别', desc: '识别笔试第 1、2 名分差 <1 分的强竞争岗位，可扩展至面试、综合成绩维度，帮助考务预判竞争激烈度。', output: '' },
            { icon: '/assets/images/scoreAnalysis/box3-icon12.png', title: '缺考与递补风险', desc: '统计面试缺考考生清单，自动标记「第一名缺考」「入围名单内缺考」等风险，输出岗位递补风险等级（高 / 中 / 低）。', output: '' },
        ],
    },
]
const activeTab = ref(0)
const currentTab = computed(() => featureTabs[activeTab.value] || featureTabs[0]!)

// ===== 分析报告 =====
const reports = [
    { img: '/assets/images/scoreAnalysis/box4-img1.png', w: 296, h: 419, caption: '科目成绩分析报告', note: '' },
    { img: '/assets/images/scoreAnalysis/box4-img2.png', w: 330, h: 341, caption: '岗位成绩分析报告', note: '' },
    { img: '/assets/images/scoreAnalysis/box4-img3.png', w: 337, h: 422, caption: '知识点成绩分析报告', note: '（注：仅中测高科自身命题任务才能提供）' },
]

// ===== 参数配置 =====
const configCards = [
    { cat: '分数断层', title: '断层分差阈值', desc: '高分聚集群体与后续名次的分差阈值，触发断层预警。', pill: '默认 10 分' },
    { cat: '雷同判定', title: '错题雷同率阈值', desc: '高嫌疑 ≥90%一般嫌疑 70-89%，客观题不足 10题不启用。', pill: '默认 90%' },
    { cat: '入围规则', title: '面试入围比例', desc: '按岗位招录人数自动计算理论入围人数。', pill: '默认 1:3' },
    { cat: '成绩合成', title: '笔试 / 面试权重', desc: '综合成绩 = 笔试权重 + 面试权重，权重和须等于100%。', pill: '例 50% + 50%' },
    { cat: '分数线', title: '合格分数线', desc: '0 表示无合格线；大于 0 时开启分数线过滤校验。', pill: '可配置' },
    { cat: '强竞争', title: '强竞争分差阈值', desc: '岗位第 1、2 名分差小于该值判定为强竞争岗位。', pill: '默认 1 分' },
]

const bottomLines = [
    '报告与原始成绩数据敏感，仅授权账号可查看与导出',
    '计算误差不超过 0.01，统计结果与原始数据可逐项核对',
    '兼容 Office 2016 及以上，导出 Word 图表图片不丢失',
    '异常数据友好展示，空数据以「—」填充，不出现 NaN 等代码字符',
]

// ===== 移动端（sam- 前缀）独立逻辑：纯新增，不改动 web 端任何逻辑 =====
// 复用上方已导入的 ref/onMounted/onUnmounted 及 navTabs 数据，不新增 import
const samSection = ref<HTMLElement>()
const samActiveNav = ref('sa-why')

const samHandleScroll = () => {
    const scrollY = window.scrollY + 140
    for (let i = navTabs.length - 1; i >= 0; i--) {
        const tab = navTabs[i]
        if (!tab) continue
        const sec = document.getElementById(`sam-${tab.target}`)
        if (sec && sec.offsetTop <= scrollY) {
            samActiveNav.value = tab.target
            break
        }
    }
}

onMounted(() => {
    window.addEventListener('scroll', samHandleScroll, { passive: true })
    if (!samSection.value) return
    const samObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('sam-visible')
                samObserver.unobserve(entry.target)
            }
        })
    }, { threshold: 0.12 })
    samSection.value.querySelectorAll('.sam-animate').forEach(el => samObserver.observe(el as HTMLElement))
})

onUnmounted(() => {
    window.removeEventListener('scroll', samHandleScroll)
})
</script>

<template>
    <div ref="saPage" class="sa-page">
        <!-- ========== Banner ========== -->
        <section class="sa-banner">
            <div class="sa-banner-stage" aria-hidden="true">
                <img src="/assets/images/scoreAnalysis/banner-bg.png" alt="" class="sa-banner-art">
            </div>
            <div class="container-sa sa-banner-inner">
                <div class="sa-banner-copy sa-animate">
                    <p class="sa-banner-eyebrow">考试测评 · 考务数据智能分析平台</p>
                    <h1>中测成绩分析系统<br>让每一份成绩<em>都经得起检验</em></h1>
                    <p class="sa-banner-desc">
                        成绩分析系统面向考试测评机构与事业单位公开招聘考务，提供<b>科目成绩防作弊嫌疑判定</b>与<b>岗位成绩自动化研判</b>一体化能力——导入成绩数据、配置规则参数，即可自动产出统计指标、预警清单与可视化分析报告。
                    </p>
                    <div class="sa-banner-actions">
                        <a class="sa-btn sa-btn-primary" href="javascript:void(0)"
                            @click.prevent="scrollToSection('sa-report')">查看分析报告演示</a>
                        <a class="sa-btn sa-btn-ghost" href="javascript:void(0)"
                            @click.prevent="scrollToSection('sa-feat')">了解功能特点</a>
                    </div>
                </div>
            </div>
            <!-- 数据栏 -->
            <div class="sa-stats-bar">
                <div class="container-sa sa-stats-inner">
                    <div v-for="(stat, i) in bannerStats" :key="i" class="sa-stat-item sa-animate">
                        <strong>
                            <span v-if="stat.decimals" v-count-decimal="stat.value">{{ stat.value.toFixed(2) }}</span>
                            <span v-else v-count-up="stat.value">{{ stat.value }}</span>
                            <i v-if="stat.suffix">{{ stat.suffix }}</i>
                        </strong>
                        <span class="sa-stat-label">{{ stat.label }}</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 内容导航 ========== -->
        <nav class="sa-nav">
            <div class="container-sa sa-nav-inner">
                <a v-for="tab in navTabs" :key="tab.target" class="sa-nav-tab"
                    :class="{ 'sa-nav-tab-active': activeNav === tab.target }" href="javascript:void(0)"
                    @click.prevent="scrollToSection(tab.target)">{{ tab.label }}</a>
            </div>
        </nav>

        <!-- ========== 产品意义 ========== -->
        <section id="sa-why" class="sa-why">
            <div class="container-sa">
                <div class="sa-section-head sa-animate">
                    <p class="sa-eyebrow">产品意义 · WHY</p>
                    <h2>考后数据分析，不该靠人工硬扛</h2>
                    <p class="sa-section-desc">
                        每一次考试结束后，成绩校验、作弊排查、岗位研判、报告整理都压在考务人员肩上。成绩分析系统把这段最耗时、最易错、最需要客观依据的环节，交给规则引擎自动完成。</p>
                </div>
                <h3 class="sa-sub-title sa-sub-red sa-animate">考务人员面临的真实困境</h3>
                <div class="sa-pain-grid sa-animate">
                    <div v-for="pain in pains" :key="pain.title" class="sa-pain-card">
                        <div class="sa-pain-head">
                            <b>{{ pain.title }}</b>
                            <img src="/assets/images/scoreAnalysis/box1-icon1.png" alt="" class="sa-pain-icon">
                        </div>
                        <p>{{ pain.desc }}</p>
                    </div>
                </div>
                <div class="sa-answer-grid">
                    <div class="sa-answer-col sa-animate">
                        <h3 class="sa-sub-title sa-sub-blue">系统的回答：让分析成为流程，而非负担</h3>
                        <div class="sa-flow-box">
                            <p>把「人盯数据」变成「规则盯数据」，把「结论靠拍脑袋」变成「每一条结论都有据可查」。</p>
                            <div class="sa-flow-steps">
                                <template v-for="(step, i) in flowSteps" :key="step.title">
                                    <div class="sa-flow-step">
                                        <b>{{ step.title }}</b>
                                        <span>{{ step.desc }}</span>
                                    </div>
                                    <img v-if="i < flowSteps.length - 1"
                                        src="/assets/images/scoreAnalysis/box1-icon2.png" alt="" class="sa-flow-arrow">
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="sa-answer-col sa-animate">
                        <h3 class="sa-sub-title sa-sub-blue">从「事后补救」到「事前预警」</h3>
                        <div class="sa-warn-box">
                            <p>成绩分析系统用规则引擎替代人工比对，把考务人员从繁琐的核对与整理中解放出来，把时间还给决策本身。</p>
                            <div class="sa-warn-card">
                                <div class="sa-warn-card-box">
                                    <img src="/assets/images/scoreAnalysis/box1-icon3.png" alt=""
                                        class="sa-warn-card-icon">
                                    <b>守住公平底线，也守住考务效率</b>
                                </div>
                                <p>作弊预警「只出线索、人工复核」，既守住公平，又不误伤；岗位研判提前暴露竞争与递补风险，让每一次招考决策都有数据支撑。</p>
                            </div>
                            <div class="sa-warn-trace">
                                <img src="/assets/images/scoreAnalysis/box1-icon4.png" alt=""
                                    class="sa-warn-trace-icon">
                                <b>可追溯、可复核</b>
                                <span>每条预警都附带触发规则、计算数据与原始作答片段</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 核心优势 ========== -->
        <section id="sa-adv" class="sa-adv">
            <div class="sa-adv-bg">
                <div class="sa-circle sa-circle-bl"></div>
                <div class="sa-circle sa-circle-tr"></div>
            </div>
            <div class="container-sa">
                <div class="sa-section-head sa-animate">
                    <p class="sa-eyebrow sa-eyebrow-light">核心优势 · ADVANTAGES</p>
                    <h2 class="sa-title-light sa-eyebrow-light">四个理由，让考务分析值得交给系统</h2>
                    <p class="sa-section-desc sa-desc-light">不止是「把表格变成图表」，而是把考后分析的每个环节做成可依赖、可审计的标准流程。</p>
                </div>
                <div class="sa-adv-grid sa-animate">
                    <div v-for="card in advCards" :key="card.title" class="sa-adv-card">
                        <img :src="card.icon" alt="" class="sa-adv-icon">
                        <b>{{ card.title }}</b>
                        <p>{{ card.desc }}</p>
                        <span class="sa-adv-tag">{{ card.tag }}</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 功能特点 ========== -->
        <section id="sa-feat" class="sa-feat">
            <div class="container-sa">
                <div class="sa-section-head sa-animate">
                    <p class="sa-eyebrow">功能特点 · FEATURES</p>
                    <h2>两大分析场景，一套系统闭环</h2>
                    <p class="sa-section-desc">科目成绩分析与岗位成绩分析共用一套数据底座与规则引擎，分别服务「成绩公平」与「招考决策」两类考务命题。</p>
                </div>
                <div class="sa-tabs sa-animate">
                    <button v-for="(tab, i) in featureTabs" :key="tab.name" type="button" class="sa-tab"
                        :class="{ 'sa-tab-active': activeTab === i }" @click="activeTab = i">
                        <img :src="tab.icon" alt="">
                        <div>
                            <b>{{ tab.name }}</b>
                            <span>{{ tab.sub }}</span>
                        </div>
                    </button>
                </div>
                <div :key="activeTab" class="sa-feat-content">
                    <div class="sa-feat-lead">
                        <span class="sa-feat-pill">{{ currentTab.pill }}</span>
                        <h3>{{ currentTab.name }}</h3>
                        <p>{{ currentTab.desc }}</p>
                        <div class="sa-feat-num">
                            <b>{{ currentTab.num }}</b>
                            <span>{{ currentTab.numLabel }}</span>
                        </div>
                    </div>
                    <div class="sa-feat-grid">
                        <div v-for="card in currentTab.cards" :key="card.title" class="sa-feat-card">
                            <img :src="card.icon" alt="" class="sa-feat-icon">
                            <b>{{ card.title }}</b>
                            <p>{{ card.desc }}</p>
                            <span v-if="card.output" class="sa-feat-output">输出：{{ card.output }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 分析报告 ========== -->
        <section id="sa-report" class="sa-report">
            <div class="container-sa">
                <div class="sa-section-head sa-animate">
                    <p class="sa-eyebrow sa-eyebrow-light">分析报告展示 · REPORT</p>
                    <h2 class="sa-title-light sa-eyebrow-light">一份报告，讲清整场考试</h2>
                    <p class="sa-section-desc sa-desc-light">在线预览完整报告效果，统计指标、可视化图表、明细表格逐项呈现，确认无误后再导出文档。</p>
                </div>
                <div class="sa-report-grid sa-animate">
                    <div v-for="report in reports" :key="report.caption" class="sa-report-col">
                        <div class="sa-report-card">
                            <div class="sa-report-head">
                                <span class="dot dot-red"></span>
                                <span class="dot dot-yellow"></span>
                                <span class="dot dot-green"></span>
                                <b>成绩分析报告 · 在线预览</b>
                            </div>
                            <div class="sa-report-body">
                                <img :src="report.img" alt=""
                                    :style="{ width: report.w + 'px', height: report.h + 'px' }">
                            </div>
                            <div class="sa-report-foot">完整报告可一键导出 Word · 完整版 / 精简版</div>
                        </div>
                        <p class="sa-report-caption">{{ report.caption }}</p>
                        <p v-if="report.note" class="sa-report-note">{{ report.note }}</p>
                    </div>
                </div>
                <div class="sa-report-tip sa-animate">报告全文较长，以上为省略图</div>
            </div>
        </section>

        <!-- ========== 参数配置 ========== -->
        <section id="sa-config" class="sa-config">
            <img src="/assets/images/scoreAnalysis/bg1.png" alt="" class="sa-config-bg">
            <div class="container-sa sa-config-inner">
                <div class="sa-section-head sa-animate">
                    <p class="sa-eyebrow">参数配置 · CONFIGURATION</p>
                    <h2>全部阈值可配置，一套系统适配所有考试</h2>
                    <p class="sa-section-desc">分析参数独立成模块，按考试规模、科目属性、题型占比灵活调整；报告附录自动写入参数快照，便于溯源。</p>
                </div>
                <div class="sa-config-grid sa-animate">
                    <div v-for="card in configCards" :key="card.title" class="sa-config-card">
                        <span class="sa-config-cat">{{ card.cat }}</span>
                        <b>{{ card.title }}</b>
                        <p>{{ card.desc }}</p>
                        <span class="sa-config-pill">{{ card.pill }}</span>
                    </div>
                </div>
                <div class="sa-bottom-line sa-animate">
                    <b>考务数据的底线，系统一并守住</b>
                    <div class="sa-bottom-grid">
                        <div v-for="text in bottomLines" :key="text" class="sa-bottom-item">
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
                                <path d="M8 1L15 3.5V8.5C15 12.6 12 16 8 17C4 16 1 12.6 1 8.5V3.5L8 1Z" stroke="#0E9F8A"
                                    stroke-width="1.4" stroke-linejoin="round" />
                            </svg>
                            {{ text }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 收尾 CTA ========== -->
        <section class="sa-cta">
            <div class="container-sa sa-cta-inner sa-animate">
                <h2>把考后分析的几天，压缩成几分钟</h2>
                <p>成绩分析系统让每一次考试都有据可查、有图可看、有报告可交付。导入成绩，点击分析，剩下的交给系统。</p>
                <div class="sa-cta-actions">
                    <a class="sa-btn sa-btn-primary" href="javascript:void(0)"
                        @click.prevent="scrollToSection('sa-report')">查看分析报告演示</a>
                    <a class="sa-btn sa-btn-ghost" href="javascript:void(0)"
                        @click.prevent="scrollToSection('sa-feat')">了解功能特点</a>
                </div>
            </div>
        </section>
    </div>

    <!-- ========== 移动端（sam- 前缀）：纯新增兄弟根，web 端零改动 ========== -->
    <div ref="samSection" class="sam-page">
        <!-- Banner -->
        <section class="sam-banner">
            <div class="sam-container sam-banner-inner">
                <div class="sam-banner-copy sam-animate">
                    <p class="sam-banner-eyebrow">考试测评 · 考务数据智能分析平台</p>
                    <h1>中测成绩分析系统<br>让每一份成绩<em>都经得起检验</em></h1>
                    <p class="sam-banner-desc">成绩分析系统面向考试测评机构与事业单位公开招聘考务，提供<b>科目成绩防作弊嫌疑判定</b>与<b>岗位成绩自动化研判</b>一体化能力——导入成绩数据、配置规则参数，即可自动产出统计指标、预警清单与可视化分析报告。</p>
                    <div class="sam-banner-actions">
                        <a class="sam-btn sam-btn-primary" href="#sam-sa-report">查看分析报告演示</a>
                        <a class="sam-btn sam-btn-ghost" href="#sam-sa-feat">了解功能特点</a>
                    </div>
                </div>
                <img src="/assets/images/scoreAnalysis/banner-bg.png" alt="" class="sam-banner-art sam-animate">
            </div>
            <!-- 数据栏 -->
            <div class="sam-stats-bar">
                <div class="sam-container sam-stats-inner">
                    <div v-for="(stat, i) in bannerStats" :key="i" class="sam-stat-item sam-animate">
                        <strong class="sam-stat-num">
                            <span v-if="stat.decimals" v-count-decimal="stat.value">{{ stat.value.toFixed(2) }}</span>
                            <span v-else v-count-up="stat.value">{{ stat.value }}</span>
                            <i v-if="stat.suffix">{{ stat.suffix }}</i>
                        </strong>
                        <span class="sam-stat-label">{{ stat.label }}</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- 内容导航 -->
        <nav class="sam-nav-bar">
            <div class="sam-nav-scroll">
                <a v-for="tab in navTabs" :key="tab.target" class="sam-nav-tab"
                    :class="{ 'sam-nav-tab-active': samActiveNav === tab.target }" :href="`#sam-${tab.target}`">
                    {{ tab.label }}
                </a>
            </div>
        </nav>

        <!-- 产品意义 -->
        <section id="sam-sa-why" class="sam-section sam-why">
            <div class="sam-container">
                <div class="sam-section-head sam-animate">
                    <p class="sam-eyebrow">产品意义 · WHY</p>
                    <h2>考后数据分析，不该靠人工硬扛</h2>
                    <p class="sam-section-desc">每一次考试结束后，成绩校验、作弊排查、岗位研判、报告整理都压在考务人员肩上。成绩分析系统把这段最耗时、最易错、最需要客观依据的环节，交给规则引擎自动完成。</p>
                </div>
                <h3 class="sam-sub-title sam-sub-red sam-animate">考务人员面临的真实困境</h3>
                <div class="sam-pain-grid">
                    <div v-for="pain in pains" :key="pain.title" class="sam-pain-card sam-animate">
                        <div class="sam-pain-head">
                            <b>{{ pain.title }}</b>
                            <img src="/assets/images/scoreAnalysis/box1-icon1.png" alt="" class="sam-pain-icon">
                        </div>
                        <p>{{ pain.desc }}</p>
                    </div>
                </div>
                <div class="sam-answer-col sam-animate">
                    <h3 class="sam-sub-title sam-sub-blue">系统的回答：让分析成为流程，而非负担</h3>
                    <div class="sam-flow-box">
                        <p>把「人盯数据」变成「规则盯数据」，把「结论靠拍脑袋」变成「每一条结论都有据可查」。</p>
                        <div class="sam-flow-steps">
                            <template v-for="(step, i) in flowSteps" :key="step.title">
                                <div class="sam-flow-step">
                                    <b>{{ step.title }}</b>
                                    <span>{{ step.desc }}</span>
                                </div>
                                <img v-if="i < flowSteps.length - 1" src="/assets/images/scoreAnalysis/box1-icon2.png"
                                    alt="" class="sam-flow-arrow">
                            </template>
                        </div>
                    </div>
                </div>
                <div class="sam-answer-col sam-animate">
                    <h3 class="sam-sub-title sam-sub-blue">从「事后补救」到「事前预警」</h3>
                    <div class="sam-warn-box">
                        <p>成绩分析系统用规则引擎替代人工比对，把考务人员从繁琐的核对与整理中解放出来，把时间还给决策本身。</p>
                        <div class="sam-warn-card">
                            <div class="sam-warn-card-box">
                                <img src="/assets/images/scoreAnalysis/box1-icon3.png" alt="" class="sam-warn-card-icon">
                                <b>守住公平底线，也守住考务效率</b>
                            </div>
                            <p>作弊预警「只出线索、人工复核」，既守住公平，又不误伤；岗位研判提前暴露竞争与递补风险，让每一次招考决策都有数据支撑。</p>
                        </div>
                        <div class="sam-warn-trace">
                            <img src="/assets/images/scoreAnalysis/box1-icon4.png" alt="" class="sam-warn-trace-icon">
                            <div>
                                <b>可追溯、可复核</b>
                                <span>每条预警都附带触发规则、计算数据与原始作答片段</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 核心优势 -->
        <section id="sam-sa-adv" class="sam-section sam-adv">
            <div class="sam-container">
                <div class="sam-section-head sam-animate">
                    <p class="sam-eyebrow sam-light">核心优势 · ADVANTAGES</p>
                    <h2 class="sam-title-light">四个理由，让考务分析值得交给系统</h2>
                    <p class="sam-section-desc sam-desc-light">不止是「把表格变成图表」，而是把考后分析的每个环节做成可依赖、可审计的标准流程。</p>
                </div>
                <div class="sam-adv-grid">
                    <div v-for="card in advCards" :key="card.title" class="sam-adv-card sam-animate">
                        <img :src="card.icon" alt="" class="sam-adv-icon">
                        <b>{{ card.title }}</b>
                        <p>{{ card.desc }}</p>
                        <span class="sam-adv-tag">{{ card.tag }}</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- 功能特点 -->
        <section id="sam-sa-feat" class="sam-section sam-feat">
            <div class="sam-container">
                <div class="sam-section-head sam-animate">
                    <p class="sam-eyebrow">功能特点 · FEATURES</p>
                    <h2>两大分析场景，一套系统闭环</h2>
                    <p class="sam-section-desc">科目成绩分析与岗位成绩分析共用一套数据底座与规则引擎，分别服务「成绩公平」与「招考决策」两类考务命题。</p>
                </div>
                <div class="sam-tabs sam-animate">
                    <button v-for="(tab, i) in featureTabs" :key="tab.name" type="button" class="sam-tab"
                        :class="{ 'sam-tab-active': activeTab === i }" @click="activeTab = i">
                        <img :src="tab.icon" alt="">
                        <div>
                            <b>{{ tab.name }}</b>
                            <span>{{ tab.sub }}</span>
                        </div>
                    </button>
                </div>
                <div :key="activeTab" class="sam-feat-content">
                    <div class="sam-feat-lead">
                        <span class="sam-feat-pill">{{ currentTab.pill }}</span>
                        <h3>{{ currentTab.name }}</h3>
                        <p>{{ currentTab.desc }}</p>
                        <div class="sam-feat-num">
                            <b>{{ currentTab.num }}</b>
                            <span>{{ currentTab.numLabel }}</span>
                        </div>
                    </div>
                    <div class="sam-feat-grid">
                        <div v-for="card in currentTab.cards" :key="card.title" class="sam-feat-card">
                            <img :src="card.icon" alt="" class="sam-feat-icon">
                            <b>{{ card.title }}</b>
                            <p>{{ card.desc }}</p>
                            <span v-if="card.output" class="sam-feat-output">输出：{{ card.output }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 分析报告 -->
        <section id="sam-sa-report" class="sam-section sam-report">
            <div class="sam-container">
                <div class="sam-section-head sam-animate">
                    <p class="sam-eyebrow sam-light">分析报告展示 · REPORT</p>
                    <h2 class="sam-title-light">一份报告，讲清整场考试</h2>
                    <p class="sam-section-desc sam-desc-light">在线预览完整报告效果，统计指标、可视化图表、明细表格逐项呈现，确认无误后再导出文档。</p>
                </div>
                <div class="sam-report-grid">
                    <div v-for="report in reports" :key="report.caption" class="sam-report-col sam-animate">
                        <div class="sam-report-card">
                            <div class="sam-report-head">
                                <span class="dot dot-red"></span>
                                <span class="dot dot-yellow"></span>
                                <span class="dot dot-green"></span>
                                <b>成绩分析报告 · 在线预览</b>
                            </div>
                            <div class="sam-report-body">
                                <img :src="report.img" alt="">
                            </div>
                            <div class="sam-report-foot">完整报告可一键导出 Word · 完整版 / 精简版</div>
                        </div>
                        <p class="sam-report-caption">{{ report.caption }}</p>
                        <p v-if="report.note" class="sam-report-note">{{ report.note }}</p>
                    </div>
                </div>
                <div class="sam-report-tip sam-animate">报告全文较长，以上为省略图</div>
            </div>
        </section>

        <!-- 参数配置 -->
        <section id="sam-sa-config" class="sam-section sam-config">
            <div class="sam-config-bg"><img src="/assets/images/scoreAnalysis/bg1.png" alt=""></div>
            <div class="sam-container sam-config-inner">
                <div class="sam-section-head sam-animate">
                    <p class="sam-eyebrow">参数配置 · CONFIGURATION</p>
                    <h2>全部阈值可配置，一套系统适配所有考试</h2>
                    <p class="sam-section-desc">分析参数独立成模块，按考试规模、科目属性、题型占比灵活调整；报告附录自动写入参数快照，便于溯源。</p>
                </div>
                <div class="sam-config-grid">
                    <div v-for="card in configCards" :key="card.title" class="sam-config-card sam-animate">
                        <span class="sam-config-cat">{{ card.cat }}</span>
                        <b>{{ card.title }}</b>
                        <p>{{ card.desc }}</p>
                        <span class="sam-config-pill">{{ card.pill }}</span>
                    </div>
                </div>
                <div class="sam-bottom-line sam-animate">
                    <b>考务数据的底线，系统一并守住</b>
                    <div class="sam-bottom-grid">
                        <div v-for="text in bottomLines" :key="text" class="sam-bottom-item">
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" aria-hidden="true">
                                <path d="M8 1L15 3.5V8.5C15 12.6 12 16 8 17C4 16 1 12.6 1 8.5V3.5L8 1Z" stroke="#0E9F8A"
                                    stroke-width="1.4" stroke-linejoin="round" />
                            </svg>
                            {{ text }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 收尾 CTA -->
        <section class="sam-cta">
            <div class="sam-container sam-cta-inner sam-animate">
                <h2>把考后分析的几天，压缩成几分钟</h2>
                <p>成绩分析系统让每一次考试都有据可查、有图可看、有报告可交付。导入成绩，点击分析，剩下的交给系统。</p>
                <div class="sam-cta-actions">
                    <a class="sam-btn sam-btn-primary" href="#sam-sa-report">查看分析报告演示</a>
                    <a class="sam-btn sam-btn-ghost" href="#sam-sa-feat">了解功能特点</a>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.sa-page {
    /* 用 clip 而非 hidden：overflow-x:hidden 会让祖先成为滚动容器，导致 .sa-nav 的 position:sticky 吸顶失效；
       clip 保留横向裁切且不破坏 sticky。实际横向溢出已由 .sa-banner/.sa-adv/.sa-config 各自 overflow:hidden 处理 */
    overflow-x: clip;
    font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    color: #1A1A2E;
}

.container-sa {
    position: relative;
    z-index: 2;
    width: min(1200px, calc(100% - 40px));
    margin: 0 auto;
}

/* 滚动进入动效 */
.sa-animate {
    opacity: 0;
    transform: translateY(26px);
    transition: opacity .7s ease, transform .7s ease;
}

.sa-visible {
    opacity: 1;
    transform: translateY(0);
}

/* 通用区块标题 */
.sa-section-head {
    text-align: center;
}

.sa-eyebrow {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: .12em;
    color: #0F62FE;
}

.sa-eyebrow-light {
    color: #fff !important;
}

.sa-section-head h2 {
    margin: 14px 0 0;
    font-size: 36px;
    font-weight: 600;
    line-height: 45px;
    color: #1A1A2E;
    letter-spacing: .02em;
}

.sa-title-light {
    color: #fff;
}

.sa-section-desc {
    margin: 16px auto 0;
    max-width: 820px;
    font-size: 16px;
    line-height: 28px;
    color: #5A6178;
}

.sa-desc-light {
    color: rgba(255, 255, 255, .65);
}

.sa-sub-title {
    margin: 44px 0 18px;
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
}

.sa-sub-red {
    color: #F04A4A;
}

.sa-sub-blue {
    color: #0F62FE;
}

/* 按钮 */
.sa-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 13px 26px;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
}

.sa-btn:hover {
    transform: translateY(-2px);
}

.sa-btn-primary {
    background: #0F62FE;
    color: #fff;
    box-shadow: 0 8px 20px rgba(15, 98, 254, .35);
}

.sa-btn-ghost {
    background: rgba(255, 255, 255, .08);
    border: 1px solid rgba(255, 255, 255, .35);
    color: #fff;
}

.sa-btn-ghost:hover {
    background: rgba(255, 255, 255, .18);
}

/* ===== Banner ===== */
.sa-banner {
    position: relative;
    height: 625px;
    overflow: hidden;
    background: radial-gradient(39.21% 39.3% at 8% 110%, rgba(0, 96, 194, 0.5) 0%, rgba(29, 78, 128, 0) 60%),
        radial-gradient(44.11% 50.53% at 82% -10%, rgba(228, 87, 46, 0.16) 0%, rgba(228, 87, 46, 0) 60%),
        linear-gradient(135deg, #031A3F 0%, #06255D 100%);
}

/* 1440 宽居中舞台，保证 banner-bg 定位与设计一致 */
.sa-banner-stage {
    position: absolute;
    top: 0;
    left: 50%;
    width: 1440px;
    height: 501px;
    margin-left: -720px;
    pointer-events: none;
    z-index: 1;
}

.sa-banner-art {
    position: absolute;
    top: 86px;
    right: 34px;
    width: 716px;
    height: 464px;
    object-fit: contain;
}

.sa-banner-inner {
    display: flex;
    align-items: center;
    height: 501px;
}

.sa-banner-copy {
    max-width: 600px;
}

.sa-banner-eyebrow {
    margin: 0;
    font-weight: bold;
    font-size: 13px;
    color: #0FDAFE;
    line-height: 22px;
    letter-spacing: 2px;
}

.sa-banner-copy h1 {
    margin: 29px 0 0;
    font-weight: 600;
    font-size: 52px;
    color: #FFFFFF;
}

.sa-banner-copy h1 em {
    font-style: normal;
    color: #0FDAFE;
}

.sa-banner-desc {
    margin: 13px 0 0;
    font-weight: 300;
    font-size: 17px;
    color: #C7D2DF;
    line-height: 29px;
}

.sa-banner-desc b {
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
}

.sa-banner-actions {
    display: flex;
    gap: 16px;
    margin-top: 36px;
}

/* 数据栏 */
.sa-stats-bar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 124px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.08);
    z-index: 3;
}

.sa-stats-inner {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    height: 100%;
}

.sa-stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.sa-stat-item+.sa-stat-item {
    border-left: 1px solid rgba(255, 255, 255, .18);
}

.sa-stat-item strong {
    display: flex;
    align-items: baseline;
    font-size: 34px;
    font-weight: 700;
    line-height: 1;
    color: #fff;
}

.sa-stat-item strong i {
    margin-left: 2px;
    font-style: normal;
    font-size: 16px;
    font-weight: 700;
    color: #25C0F0;
}

.sa-stat-label {
    font-size: 13px;
    color: rgba(255, 255, 255, .6);
}

/* ===== 内容导航 ===== */
.sa-nav {
    position: sticky;
    top: 76px;
    left: 0;
    z-index: 15;
    width: 100%;
    height: 56px;
    background: #F4F7FB;
}

.sa-nav-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 56px;
    height: 100%;
}

.sa-nav-tab {
    position: relative;
    font-size: 15px;
    font-weight: 600;
    color: #333;
    transition: color .2s ease;
}

.sa-nav-tab:hover,
.sa-nav-tab-active {
    color: #0F62FE;
}

.sa-nav-tab-active::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -12px;
    transform: translateX(-50%);
    width: 32px;
    height: 2px;
    background: #0F62FE;
}

/* ===== 产品意义 ===== */
.sa-why {
    background: #fff;
    padding: 57px 0 93px;
}

.sa-pain-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}

.sa-pain-card {
    padding: 12px 16px 28px 25px;
    border-radius: 12px;
    background: #F9F9F9;
}

.sa-pain-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.sa-pain-head b {
    font-weight: bold;
    font-size: 16px;
    color: #14263C;
    line-height: 26px;
}

.sa-pain-icon {
    width: 48px;
    height: 48px;
    object-fit: contain;
    flex: none;
}

.sa-pain-card p {
    margin: 4px 0 0;
    font-weight: 400;
    font-size: 16px;
    color: #51565D;
    line-height: 23px;
    text-align: justify;
}

.sa-answer-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: stretch;
}

.sa-answer-col {
    display: flex;
    flex-direction: column;
}

.sa-answer-col .sa-sub-title {
    flex: none;
    margin-top: 36px;
    margin-bottom: 14px;
}

.sa-flow-box,
.sa-warn-box {
    flex: 1;
    box-sizing: border-box;
    padding: 27px 22px 29px;
    background: rgba(255, 255, 255, 0);
    box-shadow: 0px 12px 32px -18px rgba(14, 42, 71, 0.28), 0px 1px 0px 0px rgba(20, 38, 60, 0.04);
    border-radius: 12px;
    border: 1px solid #9DB2E9;
}

.sa-flow-box>p,
.sa-warn-box>p {
    margin: 0;
    font-weight: 400;
    font-size: 14px;
    color: #6B7A8C;
    line-height: 23px;
}

.sa-flow-steps {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 17px;
}

.sa-flow-step {
    flex: 1;
    padding: 27px 12px 25px;
    text-align: center;
    background: #F4F7FB;
    border-radius: 8px 8px 8px 8px;
    border: 1px solid #9DB2E9;
}

.sa-flow-step b {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #0E2A47;
}

.sa-flow-step span {
    display: block;
    margin-top: 13px;
    font-size: 14px;
    line-height: 20px;
    color: #6B7A8C;
}

.sa-flow-arrow {
    width: 18px;
    height: 18px;
    object-fit: contain;
    flex: none;
}

.sa-warn-card {
    margin-top: 8px;
    padding: 11px 18px 16px;
    border-radius: 8px;
    background: #0F62FE;
}

.sa-warn-card-box {
    display: flex;
    gap: 10px;
}

.sa-warn-card-icon {
    width: 20px;
    height: 22px;
    object-fit: contain;
    flex: none;
    margin-left: 2px;
}

.sa-warn-card b {
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
}

.sa-warn-card p {
    margin: 10px 0 0;
    font-weight: 400;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 20px;
}

.sa-warn-trace {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 11px;
}

.sa-warn-trace-icon {
    width: 37px;
    height: 39px;
    object-fit: contain;
    flex: none;
}

.sa-warn-trace b {
    font-size: 15px;
    font-weight: 700;
    color: #0E2A47;
}

.sa-warn-trace span {
    font-weight: 400;
    font-size: 12px;
    color: #6B7A8C;
    line-height: 20px;
}

/* ===== 核心优势 ===== */
.sa-adv {
    position: relative;
    overflow: hidden;
    padding: 66px 0 84px;
    background: linear-gradient(149deg, #070E1A 0%, #00296F 70.28%, #122244 100%);
}

.sa-adv-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.sa-circle {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, .6);
    z-index: 2;
}

.sa-circle-bl {
    width: 183px;
    height: 183px;
    left: -96px;
    bottom: -32px;
    animation: sa-float 6s ease-in-out 1s infinite;
}

.sa-circle-tr {
    width: 360px;
    height: 360px;
    top: -111px;
    right: -120px;
    animation: sa-float 7s ease-in-out infinite;
}

@keyframes sa-float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(14px);
    }
}

.sa-adv-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    margin-top: 63px;
}

.sa-adv-card {
    display: flex;
    flex-direction: column;
    padding: 27px 16px 24px 24px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px 12px 12px 12px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    transition: transform .25s ease, background .25s ease;
}

.sa-adv-card:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, .16);
}

.sa-adv-icon {
    width: 44px;
    height: 44px;
    object-fit: contain;
}

.sa-adv-card b {
    margin-top: 15px;
    font-weight: 600;
    font-size: 20px;
    color: #FFFFFF;
    line-height: 26px;
}

.sa-adv-card p {
    margin: 9px 0 18px;
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 26px;
    text-align: justify;
}

.sa-adv-tag {
    margin-top: auto;
    align-self: flex-start;
    padding: 6px 20px;
    border: 1px solid rgba(255, 255, 255, .45);
    border-radius: 999px;
    font-size: 13px;
    color: #fff;
}

/* ===== 功能特点 ===== */
.sa-feat {
    background: #f7f8fa;
    padding: 75px 0 106px;
}

.sa-tabs {
    display: flex;
    gap: 40px;
    margin-top: 30px;
    border-bottom: 1px solid #E5E8EF;
}

.sa-tab {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 4px 14px;
    border: 0;
    background: transparent;
    cursor: pointer;
    text-align: left;
}

.sa-tab img {
    width: 42px;
    height: 42px;
    object-fit: contain;
}

.sa-tab b {
    display: block;
    font-size: 16px;
    font-weight: 700;
    color: #333;
}

.sa-tab span {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: #8C93A8;
}

.sa-tab-active b {
    color: #0F62FE;
}

.sa-tab-active::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: #0F62FE;
}

.sa-feat-content {
    display: grid;
    grid-template-columns: 243px 1fr;
    gap: 24px;
    margin-top: 18px;
    animation: sa-fade .45s ease;
}

@keyframes sa-fade {
    from {
        opacity: 0;
        transform: translateY(14px);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.sa-feat-lead {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px 23px 57px;
    border-radius: 14px;
    background: linear-gradient(145deg, #0F62FE 0%, #8488FF 100%);
    box-shadow: 0px 12px 32px -18px rgba(14, 42, 71, 0.28), 0px 1px 0px 0px rgba(20, 38, 60, 0.04);
}

.sa-feat-pill {
    align-self: flex-start;
    padding: 4px 14px;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 20px 20px 20px 20px;
    border: 1px solid #FFFFFF;
    font-size: 12px;
    color: #fff;
}

.sa-feat-lead h3 {
    margin: 22px 0 0;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
}

.sa-feat-lead>p {
    margin: 16px 0 0;
    font-size: 13px;
    line-height: 24px;
    color: rgba(255, 255, 255, .85);
    text-align: justify;
}

.sa-feat-num {
    margin-top: auto;
    padding-top: 40px;
}

.sa-feat-num b {
    font-size: 56px;
    font-weight: 700;
    line-height: 1;
    color: #fff;
}

.sa-feat-num span {
    display: block;
    margin-top: 10px;
    font-size: 12px;
    color: rgba(255, 255, 255, .75);
}

.sa-feat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
}

.sa-feat-card {
    display: flex;
    flex-direction: column;
    padding: 16px 23px 16px;
    background: #FFFFFF;
    box-shadow: 0px 1px 0px 0px rgba(20, 38, 60, 0.04);
    border-radius: 12px 12px 12px 12px;
    border: 1px solid #E0DACB;
    transition: transform .25s ease, box-shadow .25s ease;
}

.sa-feat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 28px rgba(23, 35, 61, .08);
}

.sa-feat-icon {
    width: 95px;
    height: 57px;
    object-fit: contain;
}

.sa-feat-card b {
    margin-top: 5px;
    font-size: 18px;
    color: #0E2A47;
    line-height: 26px;
    font-weight: 700;
}

.sa-feat-card p {
    margin: 9px 0 17px;
    font-weight: 400;
    font-size: 16px;
    color: #51565D;
    line-height: 23px;
    text-align: justify;
}

.sa-feat-output {
    margin-top: auto;
    padding: 8px 16px;
    background: #F8F8F8;
    border-radius: 4px 4px 4px 4px;
    font-size: 12px;
    font-weight: 600;
    color: #0F62FE;
}

/* ===== 分析报告 ===== */
.sa-report {
    padding: 66px 0 74px;
    background: linear-gradient(137deg, #070E1A 0%, #00296F 57.21%, #122244 100%);
}

.sa-report-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 26px;
    margin-top: 56px;
    align-items: start;
}

.sa-report-col {
    text-align: center;
}

.sa-report-card {
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 18px 44px rgba(3, 12, 32, .35);
}

.sa-report-head {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 14px 16px;
    background: #F0F5FC;
}

.sa-report-head .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.dot-red {
    background: #E4532F;
}

.dot-yellow {
    background: #C9A03A;
}

.dot-green {
    background: #2E9E7B;
}

.sa-report-head b {
    margin-left: 10px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: .06em;
    color: #333;
}

.sa-report-body {
    display: flex;
    justify-content: center;
    height: 462px;
    padding: 20px 0;
    box-sizing: border-box;
    background: #fff;
}

.sa-report-body img {
    object-fit: contain;
}

.sa-report-foot {
    padding: 13px 10px;
    border-top: 1px dashed #C9D8F0;
    background: #fff;
    font-size: 13px;
    font-weight: 600;
    color: #0F62FE;
}

.sa-report-caption {
    margin: 18px 0 0;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: .08em;
    color: #fff;
}

.sa-report-note {
    margin: 8px 0 0;
    font-size: 12px;
    color: rgba(255, 255, 255, .55);
}

.sa-report-tip {
    width: 480px;
    max-width: 100%;
    margin: 40px auto 0;
    text-align: center;
    padding: 11px 0;
    border-radius: 8px;
    background: rgba(255, 255, 255, .3);
    font-weight: 400;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 22px;
    letter-spacing: 2px;
}

/* ===== 参数配置 ===== */
.sa-config {
    position: relative;
    height: 1076px;
    background: #fff;
    overflow: hidden;
}

.sa-config-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1445px;
    height: 1076px;
    pointer-events: none;
}

.sa-config-inner {
    padding: 95px 0 84px;
}

.sa-config-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px 22px;
    margin-top: 48px;
}

.sa-config-card {
    padding: 24px 23px 26px;
    background: #FFFFFF;
    box-shadow: 0px 1px 0px 0px rgba(20, 38, 60, 0.04);
    border-radius: 12px 12px 12px 12px;
    border: 1px solid #E0DACB;
}

.sa-config-cat {
    font-size: 12px;
    color: #0F62FE;
    line-height: 20px;
    letter-spacing: 1px;
    font-weight: bold;
}

.sa-config-card b {
    display: block;
    margin-top: 8px;
    font-weight: 600;
    font-size: 17px;
    color: #0E2A47;
    line-height: 29px;
}

.sa-config-card p {
    margin: 18px 0 23px;
    min-height: 44px;
    font-weight: 400;
    font-size: 13px;
    color: #6B7A8C;
    line-height: 22px;
}

.sa-config-pill {
    display: inline-block;
    padding: 2px 12px;
    background: rgba(14, 42, 71, 0.06);
    border-radius: 4px 4px 4px 4px;
    font-weight: 400;
    font-size: 12px;
    color: #16406B;
    line-height: 20px;
}

.sa-bottom-line {
    position: relative;
    z-index: 2;
    width: 1166px;
    max-width: 100%;
    height: 253px;
    margin: 39px auto 0;
    padding: 43px 68px 0;
    box-sizing: border-box;
    border-radius: 8px;
    background: url('/assets/images/scoreAnalysis/bg2.png') center / cover no-repeat;
    text-align: center;
}

.sa-bottom-line b {
    font-weight: 600;
    font-size: 22px;
    color: #FFFFFF;
    line-height: 28px;
}

.sa-bottom-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px 28px;
    margin-top: 47px;
}

.sa-bottom-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 4px 27px;
    border-radius: 4px;
    background: #fff;
    font-weight: 400;
    font-size: 14px;
    color: #0E2A47;
    line-height: 24px;
    text-align: left;
}

.sa-bottom-item svg {
    flex: none;
}

/* ===== 收尾 CTA ===== */
.sa-cta {
    display: flex;
    align-items: center;
    height: 374px;
    background: radial-gradient(80.41% 42.11% at 50% 0%, rgba(228, 87, 46, 0.18) 0%, rgba(228, 87, 46, 0) 65%),
        linear-gradient(180deg, #16265E 0%, #0E1F4C 100%);
}

.sa-cta-inner {
    text-align: center;
}

.sa-cta h2 {
    margin: 0;
    font-size: 34px;
    font-weight: 700;
    color: #fff;
}

.sa-cta p {
    margin: 18px auto 0;
    max-width: 620px;
    font-size: 15px;
    line-height: 26px;
    color: rgba(255, 255, 255, .65);
}

.sa-cta-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 30px;
}

/* ===== 响应式 ===== */
@media (max-width: 1100px) {
    .sa-banner {
        height: auto;
        padding-bottom: 140px;
    }

    .sa-banner-stage {
        display: none;
    }

    .sa-banner-inner {
        height: auto;
        padding: 60px 0 0;
    }

    .sa-stats-inner {
        grid-template-columns: repeat(2, 1fr);
        height: auto;
        padding: 18px 0;
        gap: 18px;
    }

    .sa-stat-item:nth-child(3) {
        border-left: 0;
    }

    .sa-pain-grid,
    .sa-adv-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .sa-answer-grid,
    .sa-feat-content {
        grid-template-columns: 1fr;
    }

    .sa-feat-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .sa-report-grid {
        grid-template-columns: 1fr;
        justify-items: center;
    }

    .sa-config {
        height: auto;
        padding-bottom: 70px;
    }

    .sa-config-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .sa-bottom-grid {
        grid-template-columns: 1fr;
    }

    .sa-bottom-line {
        height: auto;
        padding-bottom: 30px;
    }

    .sa-cta {
        height: auto;
        padding: 70px 0;
    }
}

@media (max-width: 640px) {
    .sa-nav-inner {
        gap: 18px;
        font-size: 13px;
    }

    .sa-banner-copy h1 {
        font-size: 32px;
        line-height: 44px;
    }

    .sa-pain-grid,
    .sa-adv-grid,
    .sa-feat-grid,
    .sa-config-grid {
        grid-template-columns: 1fr;
    }

    .sa-stats-inner {
        grid-template-columns: 1fr;
    }

    .sa-stat-item+.sa-stat-item {
        border-left: 0;
    }

    .sa-section-head h2 {
        font-size: 28px;
        line-height: 38px;
    }
}

/* ============================================================ */
/* ===== 移动端（sam- 前缀）样式：纯新增，限定在 .sam-page 作用域 ===== */
/* ============================================================ */

/* 默认隐藏移动根；≤1024px 隐藏桌面根、显示移动根（web 端 >1024px 零影响） */
.sam-page {
    display: none;
    --sam-blue: #0F62FE;
    --sam-ink: #1A1A2E;
    font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    color: var(--sam-ink);
    background: #fff;
}

@media (max-width: 1024px) {
    .sa-page {
        display: none !important;
    }

    .sam-page {
        display: block;
    }
}

.sam-container {
    width: 100%;
    padding: 0 16px;
    margin: 0 auto;
    box-sizing: border-box;
}

.sam-section {
    position: relative;
    padding: 44px 0;
    scroll-margin-top: 130px;
}

@media (max-width: 560px) {
    .sam-section {
        scroll-margin-top: 118px;
    }
}

/* 入场动画（移动独立 observer：.sam-animate → .sam-visible） */
.sam-animate {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity .6s ease, transform .6s ease;
}

.sam-animate.sam-visible {
    opacity: 1;
    transform: translateY(0);
}

/* 通用区块标题 */
.sam-section-head {
    text-align: center;
    margin-bottom: 24px;
}

.sam-eyebrow {
    margin: 0;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: .12em;
    color: var(--sam-blue);
}

.sam-light {
    color: #fff !important;
}

.sam-section-head h2 {
    margin: 10px 0 0;
    font-size: 24px;
    font-weight: 600;
    line-height: 32px;
    color: var(--sam-ink);
}

.sam-title-light {
    color: #fff !important;
}

.sam-section-desc {
    margin: 12px auto 0;
    font-size: 14px;
    line-height: 24px;
    color: #5A6178;
}

.sam-desc-light {
    color: rgba(255, 255, 255, .65);
}

.sam-sub-title {
    margin: 28px 0 14px;
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
}

.sam-sub-red {
    color: #F04A4A;
}

.sam-sub-blue {
    color: var(--sam-blue);
}

/* 按钮 */
.sam-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 11px 20px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
}

.sam-btn-primary {
    background: var(--sam-blue);
    color: #fff;
    box-shadow: 0 8px 20px rgba(15, 98, 254, .35);
}

.sam-btn-ghost {
    background: rgba(255, 255, 255, .08);
    border: 1px solid rgba(255, 255, 255, .35);
    color: #fff;
}

/* ===== Banner ===== */
.sam-banner {
    position: relative;
    padding: 40px 0 0;
    background: radial-gradient(39.21% 39.3% at 8% 110%, rgba(0, 96, 194, 0.5) 0%, rgba(29, 78, 128, 0) 60%),
        radial-gradient(44.11% 50.53% at 82% -10%, rgba(228, 87, 46, 0.16) 0%, rgba(228, 87, 46, 0) 60%),
        linear-gradient(135deg, #031A3F 0%, #06255D 100%);
}

.sam-banner-inner {
    position: relative;
    z-index: 2;
}

.sam-banner-eyebrow {
    margin: 0;
    font-weight: bold;
    font-size: 12px;
    color: #0FDAFE;
    line-height: 20px;
    letter-spacing: 2px;
}

.sam-banner-copy h1 {
    margin: 16px 0 0;
    font-weight: 600;
    font-size: 30px;
    line-height: 42px;
    color: #fff;
}

.sam-banner-copy h1 em {
    font-style: normal;
    color: #0FDAFE;
}

.sam-banner-desc {
    margin: 12px 0 0;
    font-weight: 300;
    font-size: 14px;
    line-height: 24px;
    color: #C7D2DF;
}

.sam-banner-desc b {
    font-weight: 600;
    color: #fff;
}

.sam-banner-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 22px;
}

.sam-banner-art {
    display: block;
    width: 100%;
    height: auto;
    margin-top: 24px;
}

/* 数据栏 */
.sam-stats-bar {
    position: relative;
    z-index: 3;
    margin-top: 8px;
    background: rgba(255, 255, 255, .1);
    border-top: 1px solid rgba(255, 255, 255, .08);
}

.sam-stats-inner {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 0;
    padding-top: 16px;
    padding-bottom: 16px;
}

.sam-stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    text-align: center;
}

.sam-stat-num {
    display: flex;
    align-items: baseline;
    font-size: 26px;
    font-weight: 700;
    line-height: 1;
    color: #fff;
}

.sam-stat-num i {
    margin-left: 2px;
    font-style: normal;
    font-size: 14px;
    font-weight: 700;
    color: #25C0F0;
}

.sam-stat-label {
    font-size: 12px;
    color: rgba(255, 255, 255, .6);
}

/* ===== 内容导航 ===== */
.sam-nav-bar {
    position: sticky;
    top: 76px;
    z-index: 15;
    background: #F4F7FB;
    border-bottom: 1px solid #ECEFF3;
}

@media (max-width: 560px) {
    .sam-nav-bar {
        top: 66px;
    }
}

.sam-nav-scroll {
    display: flex;
    align-items: center;
    gap: 4px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding: 0 8px;
    scrollbar-width: none;
}

.sam-nav-scroll::-webkit-scrollbar {
    display: none;
}

.sam-nav-tab {
    flex: 0 0 auto;
    scroll-snap-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    text-decoration: none;
    padding: 13px 10px;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
}

.sam-nav-tab-active {
    color: var(--sam-blue);
    border-bottom-color: var(--sam-blue);
}

/* ===== 产品意义 ===== */
.sam-why {
    background: #fff;
}

.sam-pain-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
}

@media (min-width: 600px) {
    .sam-pain-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

.sam-pain-card {
    padding: 14px 16px 20px;
    border-radius: 12px;
    background: #F9F9F9;
}

.sam-pain-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.sam-pain-head b {
    font-weight: bold;
    font-size: 15px;
    color: #14263C;
    line-height: 24px;
}

.sam-pain-icon {
    width: 40px;
    height: 40px;
    object-fit: contain;
    flex: none;
}

.sam-pain-card p {
    margin: 6px 0 0;
    font-size: 14px;
    color: #51565D;
    line-height: 22px;
}

.sam-answer-col {
    margin-top: 8px;
}

.sam-flow-box,
.sam-warn-box {
    box-sizing: border-box;
    padding: 20px 16px;
    background: #fff;
    box-shadow: 0 12px 32px -18px rgba(14, 42, 71, .28);
    border-radius: 12px;
    border: 1px solid #9DB2E9;
}

.sam-flow-box>p,
.sam-warn-box>p {
    margin: 0;
    font-size: 13px;
    color: #6B7A8C;
    line-height: 22px;
}

.sam-flow-steps {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-top: 14px;
}

.sam-flow-step {
    padding: 16px 12px;
    text-align: center;
    background: #F4F7FB;
    border-radius: 8px;
    border: 1px solid #9DB2E9;
}

.sam-flow-step b {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #0E2A47;
}

.sam-flow-step span {
    display: block;
    margin-top: 8px;
    font-size: 13px;
    line-height: 19px;
    color: #6B7A8C;
}

.sam-flow-arrow {
    width: 16px;
    height: 16px;
    object-fit: contain;
    align-self: center;
    transform: rotate(90deg);
    margin: 4px 0;
}

.sam-warn-card {
    margin-top: 10px;
    padding: 12px 14px 14px;
    border-radius: 8px;
    background: var(--sam-blue);
}

.sam-warn-card-box {
    display: flex;
    align-items: center;
    gap: 8px;
}

.sam-warn-card-icon {
    width: 18px;
    height: 20px;
    object-fit: contain;
    flex: none;
}

.sam-warn-card b {
    font-size: 14px;
    font-weight: 700;
    color: #fff;
}

.sam-warn-card p {
    margin: 8px 0 0;
    font-size: 13px;
    color: rgba(255, 255, 255, .8);
    line-height: 20px;
}

.sam-warn-trace {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 12px;
}

.sam-warn-trace-icon {
    width: 34px;
    height: 36px;
    object-fit: contain;
    flex: none;
}

.sam-warn-trace b {
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: #0E2A47;
}

.sam-warn-trace span {
    display: block;
    font-size: 12px;
    color: #6B7A8C;
    line-height: 18px;
}

/* ===== 核心优势 ===== */
.sam-adv {
    background: linear-gradient(149deg, #070E1A 0%, #00296F 70.28%, #122244 100%);
}

.sam-adv-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
}

@media (min-width: 600px) {
    .sam-adv-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

.sam-adv-card {
    display: flex;
    flex-direction: column;
    padding: 20px 16px;
    background: rgba(255, 255, 255, .2);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, .12);
}

.sam-adv-icon {
    width: 40px;
    height: 40px;
    object-fit: contain;
}

.sam-adv-card b {
    margin-top: 12px;
    font-weight: 600;
    font-size: 17px;
    color: #fff;
    line-height: 24px;
}

.sam-adv-card p {
    margin: 8px 0 14px;
    font-size: 14px;
    color: #fff;
    line-height: 23px;
}

.sam-adv-tag {
    margin-top: auto;
    align-self: flex-start;
    padding: 5px 16px;
    border: 1px solid rgba(255, 255, 255, .45);
    border-radius: 999px;
    font-size: 12px;
    color: #fff;
}

/* ===== 功能特点 ===== */
.sam-feat {
    background: #f7f8fa;
}

.sam-tabs {
    display: flex;
    gap: 8px;
    margin-top: 8px;
    border-bottom: 1px solid #E5E8EF;
    overflow-x: auto;
    scrollbar-width: none;
}

.sam-tabs::-webkit-scrollbar {
    display: none;
}

.sam-tab {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 6px 12px;
    border: 0;
    background: transparent;
    cursor: pointer;
    text-align: left;
    flex: 0 0 auto;
}

.sam-tab img {
    width: 34px;
    height: 34px;
    object-fit: contain;
}

.sam-tab b {
    display: block;
    font-size: 14px;
    font-weight: 700;
    color: #333;
}

.sam-tab span {
    display: block;
    margin-top: 2px;
    font-size: 11px;
    color: #8C93A8;
}

.sam-tab-active b {
    color: var(--sam-blue);
}

.sam-tab-active::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: var(--sam-blue);
}

.sam-feat-content {
    margin-top: 16px;
    animation: sam-fade .45s ease;
}

@keyframes sam-fade {
    from {
        opacity: 0;
        transform: translateY(12px);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.sam-feat-lead {
    display: flex;
    flex-direction: column;
    padding: 20px 18px 24px;
    border-radius: 14px;
    background: linear-gradient(145deg, #0F62FE 0%, #8488FF 100%);
}

.sam-feat-pill {
    align-self: flex-start;
    padding: 3px 12px;
    background: rgba(255, 255, 255, .12);
    border-radius: 20px;
    border: 1px solid #fff;
    font-size: 11px;
    color: #fff;
}

.sam-feat-lead h3 {
    margin: 14px 0 0;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
}

.sam-feat-lead>p {
    margin: 10px 0 0;
    font-size: 13px;
    line-height: 22px;
    color: rgba(255, 255, 255, .85);
}

.sam-feat-num {
    margin-top: 16px;
}

.sam-feat-num b {
    font-size: 40px;
    font-weight: 700;
    line-height: 1;
    color: #fff;
}

.sam-feat-num span {
    display: block;
    margin-top: 6px;
    font-size: 12px;
    color: rgba(255, 255, 255, .75);
}

.sam-feat-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 14px;
}

@media (min-width: 600px) {
    .sam-feat-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

.sam-feat-card {
    display: flex;
    flex-direction: column;
    padding: 16px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #E0DACB;
}

.sam-feat-icon {
    width: 76px;
    height: 46px;
    object-fit: contain;
}

.sam-feat-card b {
    margin-top: 6px;
    font-size: 16px;
    color: #0E2A47;
    line-height: 24px;
    font-weight: 700;
}

.sam-feat-card p {
    margin: 8px 0 12px;
    font-size: 14px;
    color: #51565D;
    line-height: 22px;
}

.sam-feat-output {
    margin-top: auto;
    padding: 7px 12px;
    background: #F8F8F8;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    color: var(--sam-blue);
}

/* ===== 分析报告 ===== */
.sam-report {
    background: linear-gradient(137deg, #070E1A 0%, #00296F 57.21%, #122244 100%);
}

.sam-report-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
}

.sam-report-col {
    text-align: center;
}

.sam-report-card {
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 18px 44px rgba(3, 12, 32, .35);
}

.sam-report-head {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 12px 14px;
    background: #F0F5FC;
}

.sam-report-head .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
}

.sam-report-head .dot-red {
    background: #E4532F;
}

.sam-report-head .dot-yellow {
    background: #C9A03A;
}

.sam-report-head .dot-green {
    background: #2E9E7B;
}

.sam-report-head b {
    margin-left: 8px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .06em;
    color: #333;
}

.sam-report-body {
    display: flex;
    justify-content: center;
    padding: 14px;
    background: #fff;
}

.sam-report-body img {
    width: 100%;
    height: auto;
    object-fit: contain;
}

.sam-report-foot {
    padding: 11px 10px;
    border-top: 1px dashed #C9D8F0;
    background: #fff;
    font-size: 12px;
    font-weight: 600;
    color: var(--sam-blue);
}

.sam-report-caption {
    margin: 14px 0 0;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: .08em;
    color: #fff;
}

.sam-report-note {
    margin: 6px 0 0;
    font-size: 12px;
    color: rgba(255, 255, 255, .55);
}

.sam-report-tip {
    margin: 28px auto 0;
    max-width: 100%;
    text-align: center;
    padding: 10px 0;
    border-radius: 8px;
    background: rgba(255, 255, 255, .3);
    font-size: 14px;
    color: #fff;
    letter-spacing: 2px;
}

/* ===== 参数配置 ===== */
.sam-config {
    background: #EAF2FC;
}

.sam-config-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    pointer-events: none;
    z-index: 0;
}

.sam-config-bg img {
    display: block;
    width: 100%;
    height: auto;
}

.sam-config-inner {
    position: relative;
    z-index: 2;
}

.sam-config-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
}

@media (min-width: 600px) {
    .sam-config-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

.sam-config-card {
    padding: 18px 16px 20px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #E0DACB;
    box-shadow: 0 1px 0 0 rgba(20, 38, 60, .04);
}

.sam-config-cat {
    font-size: 12px;
    color: var(--sam-blue);
    line-height: 18px;
    letter-spacing: 1px;
    font-weight: bold;
}

.sam-config-card b {
    display: block;
    margin-top: 6px;
    font-weight: 600;
    font-size: 16px;
    color: #0E2A47;
    line-height: 24px;
}

.sam-config-card p {
    margin: 10px 0 14px;
    font-size: 13px;
    color: #6B7A8C;
    line-height: 20px;
}

.sam-config-pill {
    display: inline-block;
    padding: 2px 10px;
    background: rgba(14, 42, 71, .06);
    border-radius: 4px;
    font-size: 12px;
    color: #16406B;
    line-height: 18px;
}

.sam-bottom-line {
    margin-top: 28px;
    padding: 28px 16px 24px;
    box-sizing: border-box;
    border-radius: 8px;
    background: url('/assets/images/scoreAnalysis/bg2.png') center / cover no-repeat;
    text-align: center;
}

.sam-bottom-line b {
    font-weight: 600;
    font-size: 18px;
    color: #fff;
    line-height: 26px;
}

.sam-bottom-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-top: 20px;
}

.sam-bottom-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 14px;
    border-radius: 4px;
    background: #fff;
    font-size: 13px;
    color: #0E2A47;
    line-height: 20px;
    text-align: left;
}

.sam-bottom-item svg {
    flex: none;
}

/* ===== 收尾 CTA ===== */
.sam-cta {
    padding: 48px 0;
    background: radial-gradient(80.41% 42.11% at 50% 0%, rgba(228, 87, 46, .18) 0%, rgba(228, 87, 46, 0) 65%),
        linear-gradient(180deg, #16265E 0%, #0E1F4C 100%);
}

.sam-cta-inner {
    text-align: center;
}

.sam-cta h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    line-height: 32px;
}

.sam-cta p {
    margin: 14px auto 0;
    font-size: 14px;
    line-height: 24px;
    color: rgba(255, 255, 255, .65);
}

.sam-cta-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-top: 22px;
}
</style>
