<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// @ts-ignore
const source = useCampaignSource()
// @ts-ignore
const contactRoute = computed(() => getContactRoute(13, source.value))

// @ts-ignore
useSeoMeta({
    title: '无纸化面试评分管理系统（面试指挥系统）｜中测高科',
    description: '中测高科无纸化面试评分管理系统（面试指挥系统），一站式智能面试管理平台，覆盖人脸识别核验、多重智能抽签、灵活评分体系、实时监控大屏与多角色协同，专为公务员招录、事业单位招聘、企业面试设计。',
})

// ===== 滚动进入动效 =====
const piPage = ref<HTMLElement>()
onMounted(() => {
    if (!piPage.value) return
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('pi-visible')
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0.12 })
    piPage.value.querySelectorAll('.pi-animate').forEach(el => observer.observe(el as HTMLElement))
})

// ===== 小数数值动效（v-count-up 仅支持整数） =====
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
                    el.textContent = (eased * end).toFixed(1)
                    if (progress < 1) requestAnimationFrame(step)
                }
                requestAnimationFrame(step)
            })
        }, { threshold: 0.3 })
        io.observe(el)
    },
    unmounted(el: HTMLElement) { el.textContent = '' },
}

// ===== 产品介绍 =====
const introCards = [
    {
        icon: '/assets/images/paperlessInterview/box1-icon1.png',
        title: ['提升工作效率', '简化考务流程'],
        text: '相较于传统纸质评分模式，无纸化面试评分系统彻底摒弃了打印、装订、分发、回收、整理评分表等繁琐人工流程，大幅减少考务人力投入。同时系统支持实时打分、自动汇总、即时统计排名，无需人工手动核算、反复对账，有效缩短成绩统计与公示周期。此外，可实现多考场、多评委同步线上作业，后台实时监控考场进度，极大提升整体面试组织工作的运转效率，适配大规模、集中化人才面试选拔场景。',
    },
    {
        icon: '/assets/images/paperlessInterview/box1-icon2.png',
        title: ['杜绝人为误差', '提高评分准确性'],
        text: '传统人工计分、统分模式极易出现抄写错误、计算失误、分数统计遗漏等问题。无纸化系统依托标准化程序算法，自动完成分数核算、加权计分、剔除高低分等操作，全程机器运算、零人工干预，从根源杜绝人工算分误差。同时系统打分格式、评分区间标准化，避免手写潦草、涂改模糊、分数填写不规范等问题，确保每一项评分数据清晰、准确，最终面试成绩真实无误',
    },
    {
        icon: '/assets/images/paperlessInterview/box1-icon3.png',
        title: ['强化监督机制', '保障面试公平公正'],
        text: '相较于传统纸质评分模式，无纸化面试评分系统彻底摒弃了打印、装订、分发、回收、整理评分表等繁琐人工流程，大幅减少考务人力投入。同时系统支持实时打分、自动汇总、即时统计排名，无需人工手动核算、反复对账，有效缩短成绩统计与公示周期。此外，可实现多考场、多评委同步线上作业，后台实时监控考场进度，极大提升整体面试组织工作的运转效率，适配大规模、集中化人才面试选拔场景。',
    },
    {
        icon: '/assets/images/paperlessInterview/box1-icon4.png',
        title: ['规范考评行为', '统一面试标准'],
        text: '系统内置标准化评分维度、固定评分区间和考评规则，统一所有评委的打分标准，杜绝传统面试中评委打分尺度不一、随意打分、极端打分等不规范行为。针对偏离合理区间的异常分数，系统可自动预警提醒，约束评委主观随意性。同时通过分级权限管理，明确评委、管理员、监督人员的操作权限，规范各岗位考务工作流程，让整个面试考评工作标准化、制度化、规范化。',
    },
]

const introBoxes = [
    {
        num: '01',
        title: '技术领先可靠，安全稳定、数据备份有保障',
        text: '中测高科无纸化面试评分系统为自主研发、拥有多项软件著作权与核心知识产权的专业化考评系统，依托成熟稳定的底层架构与大数据处理技术搭建，技术体系行业领先。系统经过多年市场迭代与海量真实招考场景实战打磨，运行机制成熟、容错性强，可支撑高并发、多考场、大规模集中面试，全程运行平稳、卡顿率低、无闪退宕机问题，适配各类高规格、高严肃性的公职及国企招聘考评工作。同时搭载多重安全防护机制与多终端、多节点自动备份策略，支持数据定时自动备份、手动增量备份与异地容灾备份，数据加密存储、防篡改、防丢失，所有考评数据长期留存、完整可查，彻底解决传统考评数据散落、损毁、遗失等问题，从技术层面筑牢系统安全与数据可靠底线。',
    },
    {
        num: '02',
        title: '适配场景全面，兼容性强、市场认可度高',
        text: '系统具备极强的场景兼容性与功能适配性，不局限于单一面试模式，可全面覆盖主流公开招聘考评形式，完整适配结构化面试、半结构化面试、结构化小组面试、无领导小组面试等各类面试场景，可根据不同考评模式灵活配置评分模板、打分规则、计时机制与流程节点，适配不同单位、不同岗位的差异化招聘需求。系统历经多年市场落地应用，服务各类机关、事业单位、国企招聘考评工作，经过长期实战检验，产品成熟度、稳定性、实用性均得到市场与行业的广泛认可，适配各类规模化、常态化、规范化的人才选拔面试工作。',
    },
    {
        num: '03',
        title: '全程可溯可查，支持考官行为分析与反向考核',
        text: '系统搭建全流程闭环溯源监管体系，实现面试评分全过程留痕、可追溯、可倒查，考生打分记录、评委操作记录、成绩生成与修改记录、考场操作日志全部实时存档、永久留存，每一项考评数据、每一步操作行为均可精准溯源、反向倒查，满足纪检督查、事后复核、申诉核查等合规要求。同时具备专业的考官行为智能分析能力，可通过大数据比对，自动分析评委打分松紧度、分数离散度、极端分频次、打分一致性等核心指标，智能识别打分偏差较大、考评尺度不统一的考官行为，形成考官考评数据分析报告，实现对考官履职行为的智能化监管与反向考核，有效规范考官履职行为，保障考评工作客观公正。',
    },
    {
        num: '04',
        title: '智能数据看板，实时掌控考场全局动态',
        text: '系统搭载可视化智能数据管控看板，以数字化、可视化形式实时呈现全考场运行动态，考务管理人员可一键总览各考场面试进度、评委打分状态、考生候考情况、成绩生成进度、异常预警信息等核心数据。看板数据实时更新、动态同步，能够精准反馈考场运行状态，及时捕捉考场卡顿、打分超时、异常评分等各类问题，助力管理人员实时统筹调度、高效处置突发情况，实现面试考场精细化、智能化、可视化管控，大幅提升整体考务组织管控能力与面试运转规范性。',
    },
]

// ===== 产品优势亮点 =====
const advCards = [
    { icon: '/assets/images/paperlessInterview/box2-icon1.png', title: '人脸识别精准核验', text: '高精度人脸识别技术，0.22秒快速核验，准确率高达99.7%，杜绝替考作弊' },
    { icon: '/assets/images/paperlessInterview/box2-icon2.png', title: '全流程高效电子化', text: '从签到到评分全程无纸化运行，整体工作效率提升30% 以上' },
    { icon: '/assets/images/paperlessInterview/box2-icon3.png', title: '七重随机阳光考务', text: '创新七重随机抽签机制，全流程透明可追溯，保障考试公平公正' },
    { icon: '/assets/images/paperlessInterview/box2-icon4.png', title: '智能评分异常预警', text: '自定义评分要素与权重，异常分数实时预警，有效防范评分偏差' },
    { icon: '/assets/images/paperlessInterview/box2-icon5.png', title: '数据可视化决策支撑', text: '实时大屏监控增加考场动态、考官评分预警及评分结果分析' },
]

// ===== 五个核心能力 =====
const cores = [
    {
        icon: '/assets/images/paperlessInterview/box3-icon1.png',
        title: '全流程电子化',
        img: '/assets/images/paperlessInterview/box3-img1.png',
        imgLeft: false,
        text: '系统实现全流程电子化操作，从考生人脸识别签到、智能抽签分配，到考官电子评分、自动生成电子签字表和成绩单，全程无纸化运行，使整体工作效率提升50% 以上。通过自动化数据处理，有效避免人工统计环节的疏漏和错误，确保成绩汇总的准确性和可靠性。电子签名和数字化存档功能进一步简化考务流程，实现面试资料的可追溯管理。',
    },
    {
        icon: '/assets/images/paperlessInterview/box3-icon2.png',
        title: '多重智能抽签',
        img: '/assets/images/paperlessInterview/box3-img2.png',
        imgLeft: true,
        text: '系统创新性采用七重随机分配机制，通过智能化算法实现全自动抽签，确保考试全流程的绝对公平性。依次对考生考场、面试轮次序号、考官抽签、记分员抽签、计时员抽签、候考室管理抽签、监督员抽签七个关键环节进行随机化分配，形成严密的防作弊体系，从技术层面保障"阳光考务"。',
    },
    {
        icon: '/assets/images/paperlessInterview/box3-icon3.png',
        title: '灵活评分体系',
        img: '',
        imgLeft: false,
        text: '系统提供高度灵活的评分体系定制功能，允许主考单位根据岗位需求自定义评分要素（如表达能力、专业素养、应变能力等）及其权重占比，通过百分比精确配置实现差异化评分标准。当出现偏离平均分的异常分数时，系统实时触发预警机制，强制要求考官填写原因说明，并由主考官审核确认，有效防范评分偏差。',
    },
    {
        icon: '/assets/images/paperlessInterview/box3-icon4.png',
        title: '实时监控大屏',
        img: '/assets/images/paperlessInterview/box3-img3.png',
        imgLeft: true,
        text: '系统配备智能监考指挥平台，通过数字化大屏实时展示各考场面试进度、缺考率等核心指标，帮助考务中心实现全局可视化管控。采用智能算法动态分析考场数据，自动生成多维统计图表，直观呈现各环节运行状态。通过数据驱动的决策支持，将考场资源利用率提升30% 以上，同时显著降低考务协调的人工成本。',
    },
    {
        icon: '/assets/images/paperlessInterview/box3-icon5.png',
        title: '多角色协同',
        img: '/assets/images/paperlessInterview/box3-img4.png',
        imgLeft: false,
        text: '系统创新打造多角色协同工作平台，通过考务终端集群实现考官、记分员、计时员、候考室管理员等岗位的实时数据联动。采用分布式架构设计，各终端自动同步考生状态、评分进度、时间控制等关键信息，形成"评分-计时-叫号"的闭环管理。特别设计了三级应急工作模式确保面试流程不中断，既保持了传统面试的严谨性，又融入了智能化的便捷优势。',
    },
]

const scoreBars = [
    { label: '表达能力', value: 25, width: '85%', orange: false },
    { label: '专业素养', value: 20, width: '68%', orange: false },
    { label: '应变能力', value: 20, width: '68%', orange: true },
    { label: '逻辑思维', value: 15, width: '51%', orange: false },
    { label: '语言表达', value: 20, width: '68%', orange: false },
]

// ===== 七大系统模块 =====
const modules = [
    { icon: '/assets/images/paperlessInterview/box4-icon1.png', title: '考试配置中心', text: '支持多考点同时配置，包含考场容量、设备信息等关键参数。自定义评分要素与权重，支持百分比精确配置。内置标准化评分备注模板，支持批量导入考生和考官信息，可保存常用配置实现"一键复用"。' },
    { icon: '/assets/images/paperlessInterview/box4-icon2.png', title: '智能抽签系统', text: '采用七重随机机制，全面保障考试流程的公平性与公正性。涵盖考生考场分配、面试轮次序号、考官/监督员/记分员/计时员/候考室管理员抽签。' },
    { icon: '/assets/images/paperlessInterview/box4-icon3.png', title: '考生管理', text: '高精度人脸识别技术，3秒快速核验，准确率高达99.7%。支持缺考标记、信息纠错，考生可在线申请修改身份证/姓名等关键信息。' },
    { icon: '/assets/images/paperlessInterview/box4-icon4.png', title: '面试过程管理', text: '考官端实时提交评分，异常分数自动预警。支持结构化面试自动倒计时和无领导小组讨论发言计时，多终端协同实现高效联动。' },
    { icon: '/assets/images/paperlessInterview/box4-icon5.png', title: '结果查询统计', text: '实时监控所有考场面试人次情况，自动生成考生成绩报表及岗位排名表，支持直接打印或导出文件，确保考试结果输出的高效性与准性。' },
    { icon: '/assets/images/paperlessInterview/box4-icon6.png', title: '数据可视化', text: '通过动态图表和大屏展示，实时展示各考场考试进度、考生平均用时及缺考率等关键指标，将复杂的考试数据转化为易于理解的图形示。' },
    { icon: '/assets/images/paperlessInterview/box4-icon7.png', title: '系统管理', text: '完善的权限与数据管理功能，预置8类常用角色权限模板，支持一 键快速配置。提供字典管理功能，确保全平台数据规范性和一致性。' },
]

// ===== 资质证书（底部对齐基准，纵向偏移/横向叠放按设计图） =====
const certs = [
    { img: '/assets/images/paperlessInterview/box5-img1.png', w: 201, h: 251, ml: 0, ty: 0, z: 1 },
    { img: '/assets/images/paperlessInterview/box5-img2.png', w: 209, h: 295, ml: -14, ty: 7, z: 2 },
    { img: '/assets/images/paperlessInterview/box5-img3.png', w: 237, h: 343, ml: -8, ty: 17, z: 3 },
    { img: '/assets/images/paperlessInterview/box5-img4.png', w: 185, h: 261, ml: -7, ty: -2, z: 2 },
    { img: '/assets/images/paperlessInterview/box5-img5.png', w: 183, h: 230, ml: 9, ty: -9, z: 1 },
]

// ===== 服务案例 =====
interface CaseStat { n?: number; d?: number; static?: string; suffix?: string; label: string }
interface CaseItem { img: string; tag: string; title: string; text: string; green: boolean; stats: CaseStat[] }
const cases: CaseItem[] = [
    {
        img: '/assets/images/paperlessInterview/box6-img1.png',
        tag: '政府机关',
        title: '公务员面试',
        text: '适用于各级公务员招录面试场景，确保考试流程公平、公正、透明，提升招考公信力。',
        green: false,
        stats: [
            { n: 28, suffix: '省市', label: '覆盖范围' },
            { n: 1000, suffix: '+', label: '场次/年' },
        ],
    },
    {
        img: '/assets/images/paperlessInterview/box6-img2.png',
        tag: '事业单位',
        title: '事业单位招聘',
        text: '面向事业单位公开招考，提供从考试配置到成绩统计的全流程数字化管理解决方案。',
        green: false,
        stats: [
            { n: 500, suffix: '+', label: '合作单位' },
            { d: 99.7, suffix: '%', label: '准确率' },
        ],
    },
    {
        img: '/assets/images/paperlessInterview/box6-img3.png',
        tag: '企业招聘',
        title: '企业校招/社招',
        text: '适用于企业校园招聘和社会招聘，支持大规模面试场景的高效组织与规范管理。',
        green: false,
        stats: [
            { n: 50, suffix: '万+', label: '考生/年' },
            { n: 50, suffix: '%', label: '效率提升' },
        ],
    },
    {
        img: '/assets/images/paperlessInterview/box6-img4.png',
        tag: '资格认证',
        title: '资格证书考试',
        text: '面向各类职业资格认证考试，提供标准化、规范化的面试评分管理与数据归档服务。',
        green: true,
        stats: [
            { n: 3500, suffix: '万+', label: '累计服务' },
            { static: '零事故', label: '安全记录' },
        ],
    },
]

// ===================== 移动端（≤1024px）专用逻辑 =====================
// web 端根节点 .pi-page 的模板 / 样式 / 脚本保持零改动；
// 以下状态与副作用仅供移动根节点 .pim-page 使用，与桌面端互不干扰。
// 复用已导入的 ref / onMounted，不新增任何 import；
// 数据数组（introCards/introBoxes/advCards/cores/scoreBars/modules/certs/cases）与 vCountDecimal 指令直接复用。
const pimPage = ref<HTMLElement>()

onMounted(() => {
    if (!pimPage.value) return
    const pimObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('pim-visible')
                pimObserver.unobserve(entry.target)
            }
        })
    }, { threshold: 0.12 })
    pimPage.value.querySelectorAll('.pim-animate').forEach(el => {
        pimObserver.observe(el as HTMLElement)
    })
})
</script>

<template>
    <div ref="piPage" class="pi-page">
        <!-- Banner -->
        <section class="pi-banner">
            <div class="container pi-banner-inner">
                <div class="pi-banner-copy pi-animate">
                    <h1>无纸化面试<br>评分管理系统<small>（面试指挥系统）</small></h1>
                    <p class="pi-banner-sub">一站式智能面试管理平台</p>
                    <p class="pi-banner-desc">智能化、高效化、规范化的面试管理解决方案，专为公务员招录、事业单位招聘、企业面试设计的全流程数字化管理系统。</p>
                    <div class="pi-banner-actions">
                        <NuxtLink class="pi-btn pi-btn-primary" :to="contactRoute">
                            <img src="/assets/images/paperlessInterview/btn-l.png" alt="" class="pi-btn-icon">申请体验
                        </NuxtLink>
                        <NuxtLink class="pi-btn pi-btn-ghost" :to="contactRoute">
                            <img src="/assets/images/paperlessInterview/btn-r.png" alt="" class="pi-btn-icon">预约演示
                        </NuxtLink>
                    </div>
                </div>
                <div class="pi-video-wrap pi-animate">
                    <img src="/assets/images/paperlessInterview/video-bg.png" alt="" class="pi-video-bg">
                    <video class="pi-video"
                        src="https://1319357645.vod-qcloud.com/2c0a6b8evodcq1319357645/bf04365b5001834818841015544/zMaKIUkyDfEA.mp4"
                        controls autoplay preload="metadata" playsinline muted />
                </div>
            </div>
            <svg class="pi-banner-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,66 C220,96 430,16 720,36 C1000,55 1240,24 1440,46 L1440,90 L0,90 Z" fill="#ffffff" />
            </svg>
        </section>

        <!-- 产品介绍 -->
        <section class="pi-section pi-intro">
            <div class="container">
                <div class="pi-section-head pi-animate">
                    <h2>产品介绍</h2>
                    <p>介绍无纸化面试评分管理系统的优点</p>
                    <span class="pi-divider" />
                </div>
                <h3 class="pi-sub-title pi-sub-orange pi-animate">为什么要使用无纸化面试评分系统?</h3>
                <div class="pi-intro-grid pi-animate">
                    <div v-for="(card, i) in introCards" :key="i" class="pi-intro-card">
                        <div class="pi-intro-card-head">
                            <div class="pi-intro-title">
                                <span v-for="(line, li) in card.title" :key="li">{{ line }}</span>
                            </div>
                            <img :src="card.icon" alt="" class="pi-intro-icon">
                        </div>
                        <p>{{ card.text }}</p>
                    </div>
                </div>
                <h3 class="pi-sub-title pi-sub-blue pi-animate">中测高科无纸化面试评分系统（面试指挥系统）介绍</h3>
                <div class="pi-intro-boxes pi-animate">
                    <div v-for="box in introBoxes" :key="box.num" class="pi-intro-box">
                        <div class="pi-intro-box-head"><b>{{ box.title }}</b><span>{{ box.num }}</span></div>
                        <p>{{ box.text }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 产品优势亮点 -->
        <section class="pi-adv">
            <img src="/assets/images/paperlessInterview/bg1.png" alt="" class="pi-adv-bg">
            <div class="container pi-adv-inner">
                <div class="pi-section-head pi-animate">
                    <h2>产品优势亮点</h2>
                    <p>针对传统面试痛点，提供全方位的数字化解决方案</p>
                    <span class="pi-divider" />
                </div>
                <div class="pi-adv-grid pi-animate">
                    <div v-for="(card, i) in advCards" :key="i" class="pi-adv-card">
                        <img :src="card.icon" alt="" class="pi-adv-icon">
                        <b>{{ card.title }}</b>
                        <p>{{ card.text }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 五个核心能力 -->
        <section class="pi-section pi-core">
            <div class="container">
                <div v-for="(core, i) in cores" :key="i" class="pi-core-row pi-animate"
                    :class="{ 'pi-core-rev': core.imgLeft }">
                    <div class="pi-core-text">
                        <span class="pi-core-pill"><img :src="core.icon" alt="">核心能力</span>
                        <h3>{{ core.title }}</h3>
                        <p>{{ core.text }}</p>
                    </div>
                    <div class="pi-core-visual">
                        <img v-if="core.img" :src="core.img" alt="" class="pi-core-img">
                        <div v-else class="pi-score-card">
                            <div class="pi-score-head"><b>评分要素配置</b><span>自定义</span></div>
                            <div v-for="bar in scoreBars" :key="bar.label" class="pi-score-row">
                                <div class="pi-score-line">
                                    <span>{{ bar.label }}</span>
                                    <b :class="{ orange: bar.orange }">{{ bar.value }}%</b>
                                </div>
                                <div class="pi-score-track"><i :class="{ orange: bar.orange }"
                                        :style="{ width: bar.width }" /></div>
                            </div>
                            <div class="pi-score-warn">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M8 1.5L15 14H1L8 1.5Z" stroke="#FF8800" stroke-width="1.4"
                                        stroke-linejoin="round" />
                                    <path d="M8 6.2V9.6" stroke="#FF8800" stroke-width="1.4" stroke-linecap="round" />
                                    <circle cx="8" cy="11.6" r="0.8" fill="#FF8800" />
                                </svg>
                                异常分数预警已开启：偏离阈值 ±15%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 七大系统模块 -->
        <section class="pi-section pi-modules">
            <div class="container">
                <div class="pi-section-head pi-animate">
                    <h2>七大系统模块</h2>
                    <p>覆盖面试管理全生命周期的一站式解决方案</p>
                    <span class="pi-divider" />
                </div>
                <div class="pi-modules-grid pi-modules-grid-3 pi-animate">
                    <div v-for="(item, i) in modules.slice(0, 3)" :key="i" class="pi-module-card">
                        <div class="pi-module-head">
                            <img :src="item.icon" alt="" class="pi-module-icon">
                            <b>{{ item.title }}</b>
                        </div>
                        <p>{{ item.text }}</p>
                    </div>
                </div>
                <div class="pi-modules-grid pi-modules-grid-4 pi-animate">
                    <div v-for="(item, i) in modules.slice(3)" :key="i" class="pi-module-card">
                        <div class="pi-module-head">
                            <img :src="item.icon" alt="" class="pi-module-icon">
                            <b>{{ item.title }}</b>
                        </div>
                        <p>{{ item.text }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 资质证书 -->
        <section class="pi-cert">
            <div class="container">
                <div class="pi-section-head pi-animate">
                    <h2>资质证书</h2>
                    <p>权威认证背书，值得信赖的第三方测评服务品牌</p>
                    <span class="pi-divider" />
                </div>
                <div class="pi-cert-row pi-animate">
                    <img v-for="(cert, i) in certs" :key="i" :src="cert.img" alt="" class="pi-cert-img" :style="{
                        width: cert.w + 'px',
                        height: cert.h + 'px',
                        marginLeft: cert.ml + 'px',
                        transform: `translateY(${cert.ty}px)`,
                        zIndex: cert.z,
                    }">
                </div>
            </div>
        </section>

        <!-- 服务案例 -->
        <section class="pi-section pi-cases">
            <div class="container">
                <div class="pi-section-head pi-animate">
                    <h2>服务案例</h2>
                    <p>覆盖各类人才选拔场景，助力组织实现面试环节的数字化升级</p>
                    <span class="pi-divider" />
                </div>
                <div class="pi-cases-grid pi-animate">
                    <div v-for="(item, i) in cases" :key="i" class="pi-case-card">
                        <img :src="item.img" alt="" class="pi-case-img">
                        <div class="pi-case-body">
                            <span class="pi-case-tag">{{ item.tag }}</span>
                            <h4>{{ item.title }}</h4>
                            <p>{{ item.text }}</p>
                            <div class="pi-case-stats">
                                <div v-for="(stat, si) in item.stats" :key="si" class="pi-case-stat">
                                    <b>
                                        <span v-if="stat.n" v-count-up="stat.n"
                                            :class="{ 'pi-case-tag-green': item.green }">{{ stat.n
                                            }}</span>
                                        <span v-else-if="stat.d" v-count-decimal="stat.d"
                                            :class="{ 'pi-case-tag-green': item.green }">{{ stat.d }}</span>
                                        <span v-else :class="{ 'pi-case-tag-green': item.green }">{{ stat.static
                                            }}</span>
                                        <i v-if="stat.suffix" :class="{ 'pi-case-tag-green': item.green }">{{
                                            stat.suffix }}</i>
                                    </b>
                                    <small>{{ stat.label }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- ============================================================
         移动端版本（pim- 前缀，≤1024px 显示）
         · web 端 .pi-page 的 DOM / CSS / script 零改动，以下均为纯新增
         · 复用 web 端全部数据数组、文案、图片与配色，仅重排布局
         ============================================================ -->
    <div ref="pimPage" class="pim-page">
        <!-- Banner -->
        <section class="pim-banner">
            <div class="pim-container pim-banner-inner">
                <div class="pim-banner-copy pim-animate">
                    <h1>无纸化面试<br>评分管理系统<small>（面试指挥系统）</small></h1>
                    <p class="pim-banner-sub">一站式智能面试管理平台</p>
                    <p class="pim-banner-desc">智能化、高效化、规范化的面试管理解决方案，专为公务员招录、事业单位招聘、企业面试设计的全流程数字化管理系统。</p>
                    <div class="pim-banner-actions">
                        <NuxtLink class="pim-btn pim-btn-primary" :to="contactRoute">
                            <img src="/assets/images/paperlessInterview/btn-l.png" alt="" class="pim-btn-icon">申请体验
                        </NuxtLink>
                        <NuxtLink class="pim-btn pim-btn-ghost" :to="contactRoute">
                            <img src="/assets/images/paperlessInterview/btn-r.png" alt="" class="pim-btn-icon">预约演示
                        </NuxtLink>
                    </div>
                </div>
                <div class="pim-video-wrap pim-animate">
                    <img src="/assets/images/paperlessInterview/video-bg.png" alt="" class="pim-video-bg">
                    <video class="pim-video"
                        src="https://1319357645.vod-qcloud.com/2c0a6b8evodcq1319357645/bf04365b5001834818841015544/zMaKIUkyDfEA.mp4"
                        controls autoplay preload="metadata" playsinline muted />
                </div>
            </div>
            <svg class="pim-banner-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0,66 C220,96 430,16 720,36 C1000,55 1240,24 1440,46 L1440,90 L0,90 Z" fill="#ffffff" />
            </svg>
        </section>

        <!-- 产品介绍 -->
        <section class="pim-section pim-intro">
            <div class="pim-container">
                <div class="pim-section-head pim-animate">
                    <h2>产品介绍</h2>
                    <p>介绍无纸化面试评分管理系统的优点</p>
                    <span class="pim-divider" />
                </div>
                <h3 class="pim-sub-title pim-sub-orange pim-animate">为什么要使用无纸化面试评分系统?</h3>
                <div class="pim-intro-grid pim-animate">
                    <div v-for="(card, i) in introCards" :key="i" class="pim-intro-card">
                        <div class="pim-intro-card-head">
                            <div class="pim-intro-title">
                                <span v-for="(line, li) in card.title" :key="li">{{ line }}</span>
                            </div>
                            <img :src="card.icon" alt="" class="pim-intro-icon">
                        </div>
                        <p>{{ card.text }}</p>
                    </div>
                </div>
                <h3 class="pim-sub-title pim-sub-blue pim-animate">中测高科无纸化面试评分系统（面试指挥系统）介绍</h3>
                <div class="pim-intro-boxes pim-animate">
                    <div v-for="box in introBoxes" :key="box.num" class="pim-intro-box">
                        <div class="pim-intro-box-head"><b>{{ box.title }}</b><span>{{ box.num }}</span></div>
                        <p>{{ box.text }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 产品优势亮点 -->
        <section class="pim-adv">
            <img src="/assets/images/paperlessInterview/bg1.png" alt="" class="pim-adv-bg">
            <div class="pim-container pim-adv-inner">
                <div class="pim-section-head pim-animate">
                    <h2>产品优势亮点</h2>
                    <p>针对传统面试痛点，提供全方位的数字化解决方案</p>
                    <span class="pim-divider" />
                </div>
                <div class="pim-adv-grid pim-animate">
                    <div v-for="(card, i) in advCards" :key="i" class="pim-adv-card">
                        <img :src="card.icon" alt="" class="pim-adv-icon">
                        <b>{{ card.title }}</b>
                        <p>{{ card.text }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 五个核心能力 -->
        <section class="pim-section pim-core">
            <div class="pim-container">
                <div v-for="(core, i) in cores" :key="i" class="pim-core-row pim-animate">
                    <div class="pim-core-text">
                        <span class="pim-core-pill"><img :src="core.icon" alt="">核心能力</span>
                        <h3>{{ core.title }}</h3>
                        <p>{{ core.text }}</p>
                    </div>
                    <div class="pim-core-visual">
                        <img v-if="core.img" :src="core.img" alt="" class="pim-core-img">
                        <div v-else class="pim-score-card">
                            <div class="pim-score-head"><b>评分要素配置</b><span>自定义</span></div>
                            <div v-for="bar in scoreBars" :key="bar.label" class="pim-score-row">
                                <div class="pim-score-line">
                                    <span>{{ bar.label }}</span>
                                    <b :class="{ orange: bar.orange }">{{ bar.value }}%</b>
                                </div>
                                <div class="pim-score-track"><i :class="{ orange: bar.orange }"
                                        :style="{ width: bar.width }" /></div>
                            </div>
                            <div class="pim-score-warn">
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                    <path d="M8 1.5L15 14H1L8 1.5Z" stroke="#FF8800" stroke-width="1.4"
                                        stroke-linejoin="round" />
                                    <path d="M8 6.2V9.6" stroke="#FF8800" stroke-width="1.4" stroke-linecap="round" />
                                    <circle cx="8" cy="11.6" r="0.8" fill="#FF8800" />
                                </svg>
                                异常分数预警已开启：偏离阈值 ±15%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 七大系统模块 -->
        <section class="pim-section pim-modules">
            <div class="pim-container">
                <div class="pim-section-head pim-animate">
                    <h2>七大系统模块</h2>
                    <p>覆盖面试管理全生命周期的一站式解决方案</p>
                    <span class="pim-divider" />
                </div>
                <div class="pim-modules-grid pim-animate">
                    <div v-for="(item, i) in modules" :key="i" class="pim-module-card">
                        <div class="pim-module-head">
                            <img :src="item.icon" alt="" class="pim-module-icon">
                            <b>{{ item.title }}</b>
                        </div>
                        <p>{{ item.text }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 资质证书（横向滑动相册） -->
        <section class="pim-cert">
            <img src="/assets/images/paperlessInterview/bg2.png" alt="" class="pim-cert-bg">
            <div class="pim-container">
                <div class="pim-section-head pim-animate">
                    <h2>资质证书</h2>
                    <p>权威认证背书，值得信赖的第三方测评服务品牌</p>
                    <span class="pim-divider" />
                </div>
            </div>
            <div class="pim-cert-scroll pim-animate">
                <div v-for="(cert, i) in certs" :key="i" class="pim-cert-item">
                    <img :src="cert.img" alt="">
                </div>
            </div>
            <p class="pim-cert-hint">← 左右滑动查看更多证书 →</p>
        </section>

        <!-- 服务案例 -->
        <section class="pim-section pim-cases">
            <div class="pim-container">
                <div class="pim-section-head pim-animate">
                    <h2>服务案例</h2>
                    <p>覆盖各类人才选拔场景，助力组织实现面试环节的数字化升级</p>
                    <span class="pim-divider" />
                </div>
                <div class="pim-cases-grid pim-animate">
                    <div v-for="(item, i) in cases" :key="i" class="pim-case-card">
                        <img :src="item.img" alt="" class="pim-case-img">
                        <div class="pim-case-body">
                            <span class="pim-case-tag">{{ item.tag }}</span>
                            <h4>{{ item.title }}</h4>
                            <p>{{ item.text }}</p>
                            <div class="pim-case-stats">
                                <div v-for="(stat, si) in item.stats" :key="si" class="pim-case-stat">
                                    <b>
                                        <span v-if="stat.n" v-count-up="stat.n"
                                            :class="{ 'pim-case-green': item.green }">{{ stat.n }}</span>
                                        <span v-else-if="stat.d" v-count-decimal="stat.d"
                                            :class="{ 'pim-case-green': item.green }">{{ stat.d }}</span>
                                        <span v-else :class="{ 'pim-case-green': item.green }">{{ stat.static }}</span>
                                        <i v-if="stat.suffix" :class="{ 'pim-case-green': item.green }">{{
                                            stat.suffix }}</i>
                                    </b>
                                    <small>{{ stat.label }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.pi-page {
    overflow-x: hidden;
}

/* 滚动进入动效 */
.pi-animate {
    opacity: 0;
    transform: translateY(26px);
    transition: opacity .7s ease, transform .7s ease;
}

.pi-visible {
    opacity: 1;
    transform: translateY(0);
}

/* 通用区块标题 */
.pi-section-head {
    text-align: center;
}

.pi-section-head h2 {
    font-weight: 600;
    font-size: 36px;
    color: #1A1A2E;
    line-height: 45px;
    letter-spacing: .02em;
    margin: 0;
}

.pi-section-head p {
    margin-top: 12px;
    font-weight: 400;
    font-size: 18px;
    color: #5A6178;
    line-height: 31px;
}

.pi-divider {
    position: relative;
    display: block;
    width: 44px;
    height: 4px;
    margin: 24px auto 0;
    border-radius: 2px;
    background: #216efe;
}

.pi-divider::after {
    content: '';
    position: absolute;
    right: -10px;
    top: 0;
    width: 6px;
    height: 4px;
    border-radius: 2px;
    background: #ff8800;
}

.pi-sub-title {
    margin: 40px 0 14px;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    line-height: 45px;
}

.pi-sub-orange {
    color: #ff6b00;
}

.pi-sub-blue {
    color: #216efe;
    margin-top: 56px;
}

/* ===== Banner ===== */
.pi-banner {
    position: relative;
    height: 641px;
    background: linear-gradient(114deg, #1A5CFF 0%, #0052D9 50%, #003C9E 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1.67%, rgba(255, 255, 255, 0) 1.67%), linear-gradient(180deg, rgba(255, 255, 255, 0.03) 1.67%, rgba(255, 255, 255, 0) 1.67%);
}

.pi-banner-inner {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding-bottom: 60px;
}

.pi-banner-copy h1 {
    font-size: 52px;
    line-height: 1.22;
    font-weight: 600;
    color: #fff;
    letter-spacing: .01em;
}

.pi-banner-copy h1 small {
    font-size: 32px;
    font-weight: 600;
}

.pi-banner-sub {
    margin-top: 22px;
    font-size: 22px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
}

.pi-banner-desc {
    margin-top: 16px;
    max-width: 480px;
    font-weight: 400;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.65);
    line-height: 27px;
}

.pi-banner-actions {
    display: flex;
    gap: 16px;
    margin-top: 40px;
}

.pi-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 700;
    transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
}

.pi-btn:hover {
    transform: translateY(-2px);
}

.pi-btn-icon {
    width: 18px;
    height: 18px;
    object-fit: contain;
}

.pi-btn-primary {
    background: linear-gradient(90deg, #ff9a2e 0%, #fe8102 100%);
    color: #fff;
    box-shadow: 0 8px 20px rgba(254, 129, 2, .35);
}

.pi-btn-ghost {
    background: rgba(255, 255, 255, .12);
    border: 1px solid rgba(255, 255, 255, .38);
    color: #fff;
}

.pi-btn-ghost:hover {
    background: rgba(255, 255, 255, .2);
}

.pi-video-wrap {
    width: 587px;
    height: 362px;
    padding: 38px 40px 36px;
    position: relative;
}

.pi-video-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}

.pi-video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
    background: #0b1e46;
    position: relative;
    z-index: 2;
}

.pi-banner-wave {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    width: 100%;
    height: 90px;
}

/* ===== 产品介绍 ===== */
.pi-section {
    padding: 66px 0 82px;
}

.pi-intro {
    background: #fff;
}

.pi-intro-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 18px;
}

.pi-intro-card {
    padding: 33px 25px 25px 24px;
    border-radius: 12px;
    background: #F4F7FB;
}

.pi-intro-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.pi-intro-title {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.55;
    color: #17233d;
}

.pi-intro-icon {
    width: 56px;
    height: 56px;
    object-fit: contain;
    flex: none;
}

.pi-intro-card p {
    margin-top: 21px;
    font-weight: 400;
    font-size: 16px;
    color: #5A6178;
    line-height: 28px;
    text-align: justify;
}

.pi-intro-boxes {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 18px;
}

.pi-intro-box {
    padding: 28px 31px 17px 28px;
    background: #FFFFFF;
    border-radius: 12px 12px 12px 12px;
    border: 1px solid #0F62FE;
}

.pi-intro-box-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.pi-intro-box-head b {
    font-weight: 600;
    font-size: 18px;
    color: #1A1A2E;
}

.pi-intro-box-head span {
    font-weight: 600;
    font-size: 24px;
    color: #0F62FE;
    line-height: 40px;
}

.pi-intro-box p {
    margin-top: 8px;
    font-weight: 400;
    font-size: 16px;
    color: #5A6178;
    line-height: 26px;
    text-align: justify;
}

/* ===== 产品优势亮点 ===== */
.pi-adv {
    height: 636px;
    background: #fff;
    display: flex;
    align-items: center;
    position: relative;
}

.pi-adv-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1440px;
    height: 636px;
    transform: translate(-50%, -50%);
    object-fit: cover;
}

.pi-adv-inner {
    max-width: 1200px;
}

.pi-adv-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 31px;
    margin-top: 64px;
}

.pi-adv-card {
    padding: 27px 20px 29px;
    background: #FFFFFF;
    border-radius: 12px 12px 12px 12px;
    border: 1px solid #E8ECF4;
    box-shadow: 0 8px 24px rgba(23, 35, 61, .06);
    text-align: center;
    transition: transform .25s ease, box-shadow .25s ease;
}

.pi-adv-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 32px rgba(23, 35, 61, .1);
}

.pi-adv-icon {
    width: 82px;
    height: 70px;
    object-fit: contain;
}

.pi-adv-card b {
    margin-top: 8px;
    display: block;
    font-weight: 600;
    font-size: 15px;
    color: #1A1A2E;
    line-height: 24px;
}

.pi-adv-card p {
    margin-top: 8px;
    font-weight: 400;
    font-size: 13px;
    color: #8C93A8;
    line-height: 22px;
    text-align: center;
}

/* ===== 五个核心能力 ===== */
.pi-core {
    background: #f5f7fa;
    padding: 32px 0 40px;
}

.pi-core-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 140px;
    align-items: center;
    padding: 26px 0;
}

.pi-core-rev .pi-core-text {
    order: 2;
}

.pi-core-rev .pi-core-visual {
    order: 1;
}

.pi-core-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 14px;
    border-radius: 6px;
    background: rgba(26, 92, 255, 0.08);
    font-weight: 600;
    font-size: 13px;
    color: #1A5CFF;
    line-height: 21px;
}

.pi-core-pill img {
    width: 14px;
    height: 14px;
    object-fit: contain;
}

.pi-core-text h3 {
    margin: 20px 0 16px;
    font-weight: 600;
    font-size: 28px;
    color: #1A1A2E;
    line-height: 45px;
}

.pi-core-text p {
    font-weight: 400;
    font-size: 16px;
    color: #5A6178;
    line-height: 29px;
    text-align: justify;
}

.pi-core-visual {
    display: flex;
    justify-content: center;
}

.pi-core-img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 16px 40px rgba(23, 35, 61, .1);
}

/* 灵活评分体系-自绘卡片 */
.pi-score-card {
    width: 520px;
    max-width: 100%;
    padding: 24px 26px 22px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 16px 40px rgba(23, 35, 61, .08);
}

.pi-score-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.pi-score-head b {
    font-size: 15px;
    color: #17233d;
}

.pi-score-head span {
    padding: 3px 12px;
    border-radius: 6px;
    background: #e8f1ff;
    color: #216efe;
    font-size: 12px;
    font-weight: 600;
}

.pi-score-row {
    margin-top: 16px;
}

.pi-score-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    color: #3c4657;
}

.pi-score-line b {
    color: #216efe;
    font-weight: 700;
}

.pi-score-line b.orange {
    color: #ff8800;
}

.pi-score-track {
    margin-top: 8px;
    height: 8px;
    border-radius: 4px;
    background: #eef1f6;
    overflow: hidden;
}

.pi-score-track i {
    display: block;
    height: 100%;
    border-radius: 4px;
    background: #1677ff;
}

.pi-score-track i.orange {
    background: #ff8800;
}

.pi-score-warn {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
    padding: 10px 14px;
    border-radius: 8px;
    background: #fff7e8;
    color: #ff8800;
    font-size: 12px;
    font-weight: 600;
}

/* ===== 七大系统模块 ===== */
.pi-modules {
    background: #f5f7fa;
    padding-top: 40px;
}

.pi-modules-grid {
    display: grid;
    gap: 20px;
}

.pi-modules-grid-3 {
    grid-template-columns: repeat(4, 1fr);
    margin-top: 33px;
}

/* 第一行首张卡片占两列，与下排四列对齐 */
.pi-modules-grid-3 .pi-module-card:first-child {
    grid-column: span 2;
}

.pi-modules-grid-4 {
    grid-template-columns: repeat(4, 1fr);
    margin-top: 20px;
}

.pi-module-card {
    padding: 29px 27px 35px;
    background: #FFFFFF;
    border-radius: 12px 12px 12px 12px;
    border: 1px solid #E8ECF4;
    transition: transform .25s ease, box-shadow .25s ease;
}

.pi-module-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(23, 35, 61, .08);
}

.pi-module-head {
    display: flex;
    align-items: center;
    gap: 14px;
}

.pi-module-icon {
    width: 52px;
    height: 52px;
    object-fit: contain;
}

.pi-module-head b {
    font-weight: 600;
    font-size: 17px;
    color: #1A1A2E;
    line-height: 27px;
}

.pi-module-card p {
    margin-top: 18px;
    font-weight: 400;
    font-size: 14px;
    color: #5A6178;
    line-height: 24px;
    text-align: justify;
}

/* ===== 资质证书 ===== */
.pi-cert {
    height: 704px;
    background: #fff url('/assets/images/paperlessInterview/bg2.png') center / cover no-repeat;
    padding-top: 72px;
    overflow: hidden;
}

.pi-cert-row {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-top: 44px;
}

.pi-cert-img {
    position: relative;
    flex: none;
    object-fit: cover;
    box-shadow: 0 10px 26px rgba(23, 35, 61, .12);
    background: #fff;
}

/* ===== 服务案例 ===== */
.pi-cases {
    background: #fff;
}

.pi-cases-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 26px;
    margin-top: 24px;
}

.pi-case-card {
    border-radius: 12px 12px 12px 12px;
    border: 1px solid #E8ECF4;
    overflow: hidden;
    background: #fff;
    transition: transform .25s ease, box-shadow .25s ease;
}

.pi-case-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 32px rgba(23, 35, 61, .1);
}

.pi-case-img {
    display: block;
    width: 100%;
    height: 180px;
    object-fit: cover;
}

.pi-case-body {
    padding: 26px 26px 26px 24px;
}

.pi-case-tag {
    display: inline-block;
    padding: 3px 12px;
    border-radius: 4px;
    background: rgba(26, 92, 255, 0.08);
    font-weight: 600;
    font-size: 12px;
    color: #1A5CFF;
    line-height: 19px;
}

.pi-case-tag-green {
    color: #16A34A;
}

.pi-case-body h4 {
    margin: 8px 0 7px;
    font-weight: 600;
    font-size: 18px;
    color: #1A1A2E;
    line-height: 29px;
}

.pi-case-body p {
    font-weight: 400;
    font-size: 14px;
    color: #5A6178;
    line-height: 22px;
    min-height: 68px;
    text-align: justify;
}

.pi-case-stats {
    display: flex;
    gap: 28px;
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid #eef1f5;
}

.pi-case-stat b {
    display: flex;
    align-items: baseline;
    font-size: 19px;
    font-weight: 800;
    color: #216efe;
}

.pi-case-stat b i {
    font-style: normal;
    font-size: 13px;
    font-weight: 700;
    margin-left: 1px;
}

.pi-case-card.green .pi-case-stat b {
    color: #00a854;
}

.pi-case-stat small {
    display: block;
    margin-top: 4px;
    font-size: 11px;
    color: #9aa3b0;
}

/* ===== 响应式 ===== */
@media (max-width: 1100px) {
    .pi-banner {
        height: auto;
        padding: 60px 0 110px;
    }

    .pi-banner-inner {
        flex-direction: column;
        align-items: flex-start;
        gap: 40px;
        padding-bottom: 0;
    }

    .pi-video-wrap {
        width: 100%;
        max-width: 587px;
    }

    .pi-intro-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .pi-adv {
        height: auto;
        padding: 70px 0;
    }

    .pi-adv-grid {
        grid-template-columns: repeat(3, 1fr);
    }

    .pi-core-row {
        grid-template-columns: 1fr;
        gap: 36px;
    }

    .pi-core-rev .pi-core-text {
        order: 1;
    }

    .pi-core-rev .pi-core-visual {
        order: 2;
    }

    .pi-modules-grid-3,
    .pi-modules-grid-4 {
        grid-template-columns: repeat(2, 1fr);
    }

    .pi-cases-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .pi-cert {
        height: auto;
        padding-bottom: 90px;
    }

    .pi-cert-row {
        flex-wrap: wrap;
        gap: 16px;
    }

    .pi-cert-img {
        margin-left: 0 !important;
        transform: none !important;
    }
}

@media (max-width: 640px) {

    .pi-intro-grid,
    .pi-intro-boxes,
    .pi-adv-grid,
    .pi-modules-grid-3,
    .pi-modules-grid-4,
    .pi-cases-grid {
        grid-template-columns: 1fr;
    }

    .pi-modules-grid-3 .pi-module-card:first-child {
        grid-column: auto;
    }

    .pi-banner-copy h1 {
        font-size: 32px;
    }
}

/* ============================================================
   移动端版本样式（pim- 前缀，≤1024px 生效）
   · 桌面（>1024px）隐藏移动根；≤1024px 隐藏桌面根、显示移动根
   · web 端 .pi-page 的样式与媒体查询保持零改动（以下均为纯新增）
   · 所有移动样式限定在 .pim-page 作用域内
   · 不给 .pim-page 设 overflow，避免破坏内部定位与平滑滚动
   ============================================================ */
.pim-page {
    display: none;
}

@media (max-width: 1024px) {
    .pi-page {
        display: none;
    }

    .pim-page {
        display: block;
    }
}

/* ===== 移动根基础 ===== */
.pim-page {
    --pim-blue: #216efe;
    --pim-ink: #1A1A2E;
    --pim-muted: #5A6178;
    background: #fff;
}

.pim-container {
    width: calc(100% - 32px);
    margin: 0 auto;
}

/* 滚动进入动效（移动独立 observer 驱动） */
.pim-animate {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity .6s ease, transform .6s ease;
}

.pim-animate.pim-visible {
    opacity: 1;
    transform: translateY(0);
}

/* 通用区块标题 */
.pim-section-head {
    text-align: center;
}

.pim-section-head h2 {
    font-weight: 600;
    font-size: 24px;
    color: var(--pim-ink);
    line-height: 34px;
    margin: 0;
}

.pim-section-head p {
    margin-top: 8px;
    font-weight: 400;
    font-size: 14px;
    color: var(--pim-muted);
    line-height: 23px;
}

.pim-divider {
    position: relative;
    display: block;
    width: 36px;
    height: 4px;
    margin: 16px auto 0;
    border-radius: 2px;
    background: var(--pim-blue);
}

.pim-divider::after {
    content: '';
    position: absolute;
    right: -9px;
    top: 0;
    width: 5px;
    height: 4px;
    border-radius: 2px;
    background: #ff8800;
}

.pim-sub-title {
    margin: 30px 0 12px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    line-height: 30px;
}

.pim-sub-orange {
    color: #ff6b00;
}

.pim-sub-blue {
    color: var(--pim-blue);
    margin-top: 38px;
}

.pim-section {
    padding: 44px 0 52px;
}

/* ===== Banner ===== */
.pim-banner {
    position: relative;
    background: linear-gradient(114deg, #1A5CFF 0%, #0052D9 50%, #003C9E 100%);
    padding: 40px 0 84px;
}

.pim-banner-inner {
    position: relative;
    z-index: 2;
}

.pim-banner-copy h1 {
    font-size: 28px;
    line-height: 1.3;
    font-weight: 600;
    color: #fff;
    margin: 0;
}

.pim-banner-copy h1 small {
    font-size: 18px;
    font-weight: 600;
}

.pim-banner-sub {
    margin-top: 14px;
    font-size: 17px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
}

.pim-banner-desc {
    margin-top: 10px;
    font-weight: 400;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.65);
    line-height: 23px;
}

.pim-banner-actions {
    display: flex;
    gap: 12px;
    margin-top: 26px;
}

.pim-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 11px 20px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 700;
}

.pim-btn-icon {
    width: 16px;
    height: 16px;
    object-fit: contain;
}

.pim-btn-primary {
    background: linear-gradient(90deg, #ff9a2e 0%, #fe8102 100%);
    color: #fff;
    box-shadow: 0 6px 16px rgba(254, 129, 2, .35);
}

.pim-btn-ghost {
    background: rgba(255, 255, 255, .12);
    border: 1px solid rgba(255, 255, 255, .38);
    color: #fff;
}

/* 视频框：保留装饰边框，按 web 端 587×362 内边距比例等比全宽缩放 */
.pim-video-wrap {
    position: relative;
    margin-top: 30px;
    width: 100%;
    aspect-ratio: 587 / 362;
    padding: 6.47% 6.81% 6.13%;
}

.pim-video-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}

.pim-video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
    background: #0b1e46;
    position: relative;
    z-index: 2;
}

.pim-banner-wave {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    width: 100%;
    height: 44px;
}

/* ===== 产品介绍 ===== */
.pim-intro {
    background: #fff;
}

.pim-intro-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
}

.pim-intro-card {
    padding: 22px 18px 20px;
    border-radius: 12px;
    background: #F4F7FB;
}

.pim-intro-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.pim-intro-title {
    display: flex;
    flex-direction: column;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.55;
    color: #17233d;
}

.pim-intro-icon {
    width: 44px;
    height: 44px;
    object-fit: contain;
    flex: none;
}

.pim-intro-card p {
    margin-top: 14px;
    font-weight: 400;
    font-size: 13px;
    color: var(--pim-muted);
    line-height: 24px;
    text-align: justify;
}

.pim-intro-boxes {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
}

.pim-intro-box {
    padding: 20px 18px 16px;
    background: #FFFFFF;
    border-radius: 12px;
    border: 1px solid #0F62FE;
}

.pim-intro-box-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.pim-intro-box-head b {
    font-weight: 600;
    font-size: 15px;
    line-height: 24px;
    color: var(--pim-ink);
}

.pim-intro-box-head span {
    font-weight: 600;
    font-size: 20px;
    color: #0F62FE;
    line-height: 30px;
    flex: none;
}

.pim-intro-box p {
    margin-top: 8px;
    font-weight: 400;
    font-size: 13px;
    color: var(--pim-muted);
    line-height: 23px;
    text-align: justify;
}

/* ===== 产品优势亮点 =====
   web 端 bg1.png 为 1440×636 固定高居中裁剪；
   移动端去固定高，改背景色兜底 + 图 width:100% 顶部对齐 */
.pim-adv {
    position: relative;
    background: #fff;
    padding: 44px 0 52px;
    overflow: hidden;
}

.pim-adv-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    display: block;
    pointer-events: none;
}

.pim-adv-inner {
    position: relative;
    z-index: 2;
}

.pim-adv-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
    margin-top: 30px;
}

.pim-adv-card {
    padding: 22px 18px 24px;
    background: #FFFFFF;
    border-radius: 12px;
    border: 1px solid #E8ECF4;
    box-shadow: 0 8px 24px rgba(23, 35, 61, .06);
    text-align: center;
}

.pim-adv-icon {
    width: 64px;
    height: 55px;
    object-fit: contain;
}

.pim-adv-card b {
    margin-top: 8px;
    display: block;
    font-weight: 600;
    font-size: 15px;
    color: var(--pim-ink);
    line-height: 24px;
}

.pim-adv-card p {
    margin-top: 6px;
    font-weight: 400;
    font-size: 13px;
    color: #8C93A8;
    line-height: 22px;
    text-align: center;
}

/* ===== 五个核心能力 ===== */
.pim-core {
    background: #f5f7fa;
    padding: 34px 0 40px;
}

.pim-core-row {
    padding: 22px 0;
}

.pim-core-row+.pim-core-row {
    border-top: 1px solid #e8ecf4;
}

.pim-core-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 6px;
    background: rgba(26, 92, 255, 0.08);
    font-weight: 600;
    font-size: 12px;
    color: #1A5CFF;
    line-height: 20px;
}

.pim-core-pill img {
    width: 13px;
    height: 13px;
    object-fit: contain;
}

.pim-core-text h3 {
    margin: 14px 0 10px;
    font-weight: 600;
    font-size: 20px;
    color: var(--pim-ink);
    line-height: 30px;
}

.pim-core-text p {
    font-weight: 400;
    font-size: 13px;
    color: var(--pim-muted);
    line-height: 24px;
    text-align: justify;
}

.pim-core-visual {
    display: flex;
    justify-content: center;
    margin-top: 18px;
}

.pim-core-img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 10px;
    box-shadow: 0 12px 30px rgba(23, 35, 61, .1);
}

/* 灵活评分体系-自绘卡片（web 端 520px 固定宽 → 全宽） */
.pim-score-card {
    width: 100%;
    padding: 18px 16px 16px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 12px 30px rgba(23, 35, 61, .08);
}

.pim-score-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.pim-score-head b {
    font-size: 14px;
    color: #17233d;
}

.pim-score-head span {
    padding: 3px 10px;
    border-radius: 6px;
    background: #e8f1ff;
    color: var(--pim-blue);
    font-size: 11px;
    font-weight: 600;
}

.pim-score-row {
    margin-top: 13px;
}

.pim-score-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: #3c4657;
}

.pim-score-line b {
    color: var(--pim-blue);
    font-weight: 700;
}

.pim-score-line b.orange {
    color: #ff8800;
}

.pim-score-track {
    margin-top: 6px;
    height: 7px;
    border-radius: 4px;
    background: #eef1f6;
    overflow: hidden;
}

.pim-score-track i {
    display: block;
    height: 100%;
    border-radius: 4px;
    background: #1677ff;
}

.pim-score-track i.orange {
    background: #ff8800;
}

.pim-score-warn {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-top: 16px;
    padding: 9px 12px;
    border-radius: 8px;
    background: #fff7e8;
    color: #ff8800;
    font-size: 11px;
    font-weight: 600;
}

/* ===== 七大系统模块 ===== */
.pim-modules {
    background: #f5f7fa;
    padding-top: 30px;
}

.pim-modules-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
    margin-top: 26px;
}

.pim-module-card {
    padding: 22px 18px 24px;
    background: #FFFFFF;
    border-radius: 12px;
    border: 1px solid #E8ECF4;
}

.pim-module-head {
    display: flex;
    align-items: center;
    gap: 12px;
}

.pim-module-icon {
    width: 42px;
    height: 42px;
    object-fit: contain;
    flex: none;
}

.pim-module-head b {
    font-weight: 600;
    font-size: 16px;
    color: var(--pim-ink);
    line-height: 25px;
}

.pim-module-card p {
    margin-top: 12px;
    font-weight: 400;
    font-size: 13px;
    color: var(--pim-muted);
    line-height: 23px;
    text-align: justify;
}

/* ===== 资质证书（横向滑动相册） =====
   web 端为固定尺寸叠放构图；移动端改 scroll-snap 横滑，保留卡片阴影 */
.pim-cert {
    position: relative;
    background: #fff;
    padding: 48px 0 40px;
    overflow: hidden;
}

.pim-cert-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    display: block;
    pointer-events: none;
}

.pim-cert .pim-container {
    position: relative;
    z-index: 2;
}

.pim-cert-scroll {
    position: relative;
    z-index: 2;
    display: flex;
    gap: 14px;
    margin-top: 30px;
    padding: 8px 16px 20px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
}

.pim-cert-scroll::-webkit-scrollbar {
    display: none;
}

.pim-cert-item {
    flex: 0 0 62%;
    scroll-snap-align: center;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 10px 26px rgba(23, 35, 61, .14);
    overflow: hidden;
}

.pim-cert-item img {
    display: block;
    width: 100%;
    height: auto;
}

.pim-cert-hint {
    position: relative;
    z-index: 2;
    margin-top: 2px;
    text-align: center;
    font-size: 12px;
    color: #9aa3b0;
}

/* ===== 服务案例 ===== */
.pim-cases {
    background: #fff;
}

.pim-cases-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;
    margin-top: 24px;
}

.pim-case-card {
    border-radius: 12px;
    border: 1px solid #E8ECF4;
    overflow: hidden;
    background: #fff;
}

.pim-case-img {
    display: block;
    width: 100%;
    height: auto;
}

.pim-case-body {
    padding: 18px 18px 20px;
}

.pim-case-tag {
    display: inline-block;
    padding: 3px 12px;
    border-radius: 4px;
    background: rgba(26, 92, 255, 0.08);
    font-weight: 600;
    font-size: 12px;
    color: #1A5CFF;
    line-height: 19px;
}

.pim-case-body h4 {
    margin: 8px 0 6px;
    font-weight: 600;
    font-size: 17px;
    color: var(--pim-ink);
    line-height: 27px;
}

.pim-case-body p {
    font-weight: 400;
    font-size: 13px;
    color: var(--pim-muted);
    line-height: 22px;
    text-align: justify;
}

.pim-case-stats {
    display: flex;
    gap: 28px;
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid #eef1f5;
}

.pim-case-stat b {
    display: flex;
    align-items: baseline;
    font-size: 19px;
    font-weight: 800;
    color: var(--pim-blue);
}

/* 数字动画元素：字号/字重/颜色显式继承，规避 v-count-up 后缀样式继承陷阱 */
.pim-case-stat b span {
    font-size: inherit !important;
    font-weight: inherit !important;
    color: inherit !important;
}

.pim-case-stat b i {
    font-style: normal;
    font-size: 13px;
    font-weight: 700;
    margin-left: 1px;
}

.pim-case-green {
    color: #16A34A;
}

.pim-case-stat small {
    display: block;
    margin-top: 4px;
    font-size: 11px;
    color: #9aa3b0;
}

/* ===== 移动端内部响应式：≥600px 卡片转 2 列 ===== */
@media (min-width: 600px) {

    .pim-intro-grid,
    .pim-intro-boxes,
    .pim-adv-grid,
    .pim-modules-grid,
    .pim-cases-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
