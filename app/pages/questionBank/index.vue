<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// @ts-ignore
useSeoMeta({
    title: '共享题库中心服务｜中测高科',
    description: '共享题库中心面向各级人事考试机构、人才集团、企事业单位开放合作，以五大共享模式与智能化命题技术平台，赋能各级考试机构建立自有可控的命题基地。',
})

// ===== 内容导航 =====
const navTabs = [
    { label: '用户痛点', target: 'qbc-pain' },
    { label: '核心功能', target: 'qbc-mode' },
    { label: '品牌优势', target: 'qbc-brand' },
    { label: '安全保障', target: 'qbc-safe' },
    { label: '合作共建', target: 'qbc-cobuild' },
    { label: '合作流程', target: 'qbc-process' },
    { label: '服务案例', target: 'qbc-cases' },
]
const activeNav = ref('qbc-pain')

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

// ===== 模块数据 =====
const painPoints = [
    { icon: '/assets/images/question_bank1/box1-icon1.png', title: '缺专家', desc: '缺少自有命题专家团队，依赖外部临时专家，对考试大纲、测评技术理解不足，命题质量难以稳定。' },
    { icon: '/assets/images/question_bank1/box1-icon2.png', title: '难匹配', desc: '岗位调研深度不足，试题难以实现人岗精准匹配，人才选拔结果与岗位真实需求存在偏差。' },
    { icon: '/assets/images/question_bank1/box1-icon3.png', title: '高风险', desc: '入闱命题组织难度大、保密风险高，命题交付质量稳定性难以保障，一旦出事影响巨大。' },
    { icon: '/assets/images/question_bank1/box1-icon4.png', title: '迭代慢', desc: '题库更新滞后，缺少智能化命题、查重、组卷等工具支撑，业务开展事倍功半。' },
]

const modeCards = [
    { icon: '/assets/images/question_bank1/box2-icon1.png', title: '专家共享', desc: '300 余名全职命题专家 + 海量兼职专家库，按需派驻，提供命题技术指导支撑。', en: 'E⁠X⁠P⁠E⁠R⁠T⁠ ⁠S⁠H⁠A⁠R⁠I⁠N⁠G' },
    { icon: '/assets/images/question_bank1/box2-icon2.png', title: '题库共享', desc: '58 个专业大类、1000+ 细分小类、20TB 题库资源，持续迭代更新适配考试大纲。', en: 'I⁠T⁠E⁠M⁠ ⁠B⁠A⁠N⁠K⁠ ⁠S⁠H⁠A⁠R⁠I⁠N⁠G' },
    { icon: '/assets/images/question_bank1/box2-icon3.png', title: '科技共享', desc: '全套自主知识产权命题技术平台，部署、调试、人员全流程培训交付。', en: 'TECH SHARING' },
    {
        icon: '/assets/images/question_bank1/box2-icon4.png', title: '任务共担', desc: '远程加密协同"中央厨房"命题基地，安全传输，高质量完成命题任务交付。', en: 'TASK SHARING'
    },
    { icon: '/assets/images/question_bank1/box2-icon5.png', title: '机制共享', desc: '输出成熟 SOP 管理流程、保密制度、运营案例，适配本地化落地运行。', en: 'SOP SHARING' },
]

const brandCards = [
    { icon: '/assets/images/question_bank1/box3-icon1.png', title: '题库管理系统', desc: '集中存储、智能检索、多维标注、动态更新，让 20TB 资源真正好用。' },
    { icon: '/assets/images/question_bank1/box3-icon2.png', title: 'AI 命题与组卷系统', desc: 'AI 辅助命题、智能查重、难度预测、自动组卷，效率与质量双提升。' },
    { icon: '/assets/images/question_bank1/box3-icon3.png', title: '在线考试与机考系统', desc: '远程审题、模拟考试、大规模电子化考试，稳定支撑高并发场景。' },
    { icon: '/assets/images/question_bank1/box3-icon4.png', title: '阅卷与面试评分系统', desc: '协同阅卷、AI 辅助评分、面试评价全流程管理，评分客观可复核。' },
    { icon: '/assets/images/question_bank1/box3-icon5.png', title: '安全保密管理系统', desc: '权限分级、操作留痕、异常预警、全流程管控，保密无死角。' },
]

const safeCards = [
    { icon: '/assets/images/question_bank1/box4-icon1.png', title: '资质护城河', desc: '自有涉密乙级资质，信息认证安全三级等保资质，从源头满足人事考试保密要求。' },
    { icon: '/assets/images/question_bank1/box4-icon2.png', title: '多元股东背景', desc: '上市公司、国企信誉背书' },
    { icon: '/assets/images/question_bank1/box4-icon3.png', title: '出题硬实力', desc: '全国6家研究院、8大命题交付中心、2大科技研发中心；300+专业题库研发团队' },
    { icon: '/assets/images/question_bank1/box4-icon4.png', title: '质量安全双保障', desc: '年服务考生850万人次，出库任务28000套，实现0质量、0安全事故' },
]

const cobuildCards: { img: string; title: string; desc?: string; bullets?: string[] }[] = [
    {
        img: '/assets/images/question_bank1/box6-img1.png',
        title: '共建高标准保\n密命题场地',
        desc: '建设独立封闭命题工作区、专家入闱休息区；物理隔离、无死角视频监控（录像留存≥6个月）、防盗安防、密码储物柜、信号屏蔽设备，配套完善生活保障设施，满足中长期入闱命题工作条件。',
    },
    {
        img: '/assets/images/question_bank1/box6-img2.png',
        title: '共建先进命题技术\n平台与系统',
        desc: '输出全套自主知识产权智能化命题平台，覆盖题库、AI命题组卷、机考、阅卷面试评分、安全保密全链条系统，实现远程加密协同中央厨房式保密命题基地，赋能命题业务数字化、智能化。',
    },
    {
        img: '/assets/images/question_bank1/box6-img3.png',
        title: '共建基地运行与\n管理机制',
        bullets: [
            '专家遴选、培训、考核激励机制，持续提升命题专家队伍能力；',
            '标准化SOP业务流程：命制、多级审核、试测、修订、入库全流程管控；',
            '完备安全保密管理机制：保密协议、人员设备网络载体管控、保密应急处置预案。',
        ],
    },
]

const dutyPartner = [
    '提供满足保密标准的命题基地物理场地，保障电力通风等基础条件',
    '双方共同投入完成场地保密装修改造',
    '采购电脑、监控、门禁等办公安防硬件并完成安装调试',
    '协助办理基地相关地方行政审批手续',
    '负责基地物业管理、安保、设备基础维护',
    '配置少量管理人员，负责基地日常管理与业务协同组织',
]

const dutyCompany = [
    { k: '专家共享', v: '输出专家资源，按需派驻命题专家，提供技术指导' },
    { k: '题库共享', v: '开放海量题库资源，持续更新补充适配本地考试需求' },
    { k: '科技共享', v: '部署全套命题技术系统，完成实施与人员操作培训' },
    { k: '任务共担', v: '建立加密远程协同机制，保障命题任务高质量交付' },
    { k: '机制共享', v: '输出成熟管理制度SOP、项目案例，赋能基地运营' },
]

const processSteps = [
    { num: '壹', title: '对接洽谈', desc: '商务对接，明确合作范围与需求，现场考察题库与平台能力。' },
    { num: '贰', title: '方案定制', desc: '结合本地考试需求定制共享方案：题库授权范围、系统部署、专家派驻计划。' },
    { num: '叁', title: '落地运行', desc: '系统部署培训、SOP 移交、协同运营，周例会与月度推进机制保障长期运转。' },
]

const qbcData = [
    {
        label: '题库授权 + 平台部署',
        name: '某考试机构',
        content: '覆盖 30 余个职位序列的公开招聘考试，题库授权与智能平台本地化部署同步交付，智能组卷与查重全面替代人工操作。',
        desc: '命题周期显著缩短，多场次考试稳定交付'
    },
    {
        label: '共建命题基地',
        name: '某发展集团',
        content: '专家派驻 + 任务共担模式共建命题基地，SOP 管理流程与保密制度整体移交，本地团队快速形成自主命题能力。',
        desc: '当年实现本地团队独立承接命题任务'
    },
    {
        label: '定制题库 + AI 组卷',
        name: '某大型央企集团',
        content: '围绕内部人才选拔测评定制专属题库，AI 辅助命题与难度校准，支撑全国范围多场次同步考试。',
        desc: '选拔测评全流程留痕、零差错交付'
    },
]

// ===== 滚动进入动画 + 小数计数动效 =====
const qbcSection = ref<HTMLElement>()

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    if (qbcSection.value) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('qbc-visible')
                    observer.unobserve(entry.target)
                }
            })
        }, { threshold: 0.12 })
        qbcSection.value.querySelectorAll('.qbc-animate').forEach(el => observer.observe(el as HTMLElement))

        // 小数数值动效（如 1.3 亿），整数由 v-count-up 指令处理
        const decimalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return
                const el = entry.target as HTMLElement
                const endVal = parseFloat(el.dataset.decimalTarget || '0')
                const duration = 3000
                const startTime = performance.now()
                const animate = (now: number) => {
                    const progress = Math.min((now - startTime) / duration, 1)
                    const eased = 1 - Math.pow(1 - progress, 3)
                    el.textContent = (eased * endVal).toFixed(1)
                    if (progress < 1) requestAnimationFrame(animate)
                }
                requestAnimationFrame(animate)
                decimalObserver.unobserve(el)
            })
        }, { threshold: 0.3 })
        qbcSection.value.querySelectorAll('[data-decimal-target]').forEach(el => decimalObserver.observe(el as HTMLElement))
    }
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <div ref="qbcSection" class="qbc-page">
        <!-- ========== Banner ========== -->
        <section class="qbc-banner">
            <div class="qbc-banner-bg">
                <img src="/assets/images/question_bank1/banner-bg.png" alt="" />
            </div>
            <div class="container-qbc qbc-banner-content">
                <h1 class="qbc-banner-title"><span>共享题库中心</span>服务</h1>
                <p class="qbc-banner-subtitle">面向各级人事考试机构、人才集团、企事业单位开放合作</p>
                <p class="qbc-banner-desc">通过全国考试头部智库机构——中测高科赋能助力各级考试机构建立自有可控优质高校的命题基地</p>
            </div>
            <!-- 数值栏 -->
            <div class="qbc-stats-bar">
                <div class="qbc-stats-inner">
                    <div class="qbc-stat-item qbc-animate">
                        <strong><span v-count-up="10">10</span><i>余年</i></strong>
                        <span class="qbc-stat-desc">行业沉淀</span>
                    </div>
                    <div class="qbc-stat-item qbc-animate">
                        <strong><span v-count-up="64">64</span><i>万</i></strong>
                        <span class="qbc-stat-desc">企业客户信赖</span>
                    </div>
                    <div class="qbc-stat-item qbc-animate">
                        <strong><span v-count-up="204">204</span><i>万</i></strong>
                        <span class="qbc-stat-desc">场考试交付</span>
                    </div>
                    <div class="qbc-stat-item qbc-animate">
                        <strong><span data-decimal-target="1.3">1.3</span><i>亿</i></strong>
                        <span class="qbc-stat-desc">人次累计参考</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 内容导航 ========== -->
        <nav class="qbc-nav">
            <div class="container-qbc qbc-nav-inner">
                <a v-for="tab in navTabs" :key="tab.target" class="qbc-nav-tab"
                    :class="{ 'qbc-nav-tab-active': activeNav === tab.target }" href="javascript:void(0)"
                    @click.prevent="scrollToSection(tab.target)">{{ tab.label }}</a>
            </div>
        </nav>

        <!-- ========== 用户痛点 ========== -->
        <section id="qbc-pain" class="qbc-pain">
            <div class="container-qbc qbc-pain-grid">
                <div class="qbc-pain-left qbc-animate">
                    <h2 class="qbc-pain-title">为什么需要共享题库</h2>
                    <p class="qbc-pain-sub">人事考试命题的四道<br />现实难关</p>
                    <p class="qbc-pain-desc">多数考试机构并非不够专业，而是在命题资源、工具与机制上"单打独斗"。共享题库中心存在的意义，就是把这套能力变成你的底座。</p>
                    <div class="qbc-pain-card">
                        <img src="/assets/images/question_bank1/box1-img.png" alt="" />
                        <div class="qbc-pain-card-inner">
                            <p class="qbc-pain-quote">命题的事，交给专业的人；考试的主导权，始终在你手里。</p>
                            <span class="qbc-pain-quote-from">—— 共享题库中心合作理念</span>
                        </div>
                    </div>
                </div>
                <div class="qbc-pain-list">
                    <div v-for="(item, i) in painPoints" :key="item.title" class="qbc-pain-item qbc-animate"
                        :style="{ transitionDelay: i * 0.1 + 's' }">
                        <img :src="item.icon" alt="" class="qbc-pain-item-icon" />
                        <div>
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.desc }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 核心合作模式 ========== -->
        <section id="qbc-mode" class="qbc-mode">
            <div class="qbc-mode-bg">
                <img src="/assets/images/question_bank1/bg1.png" alt="" />
            </div>
            <div class="container-qbc qbc-mode-inner">
                <div class="qbc-animate">
                    <h2 class="qbc-mode-title">核心合作模式</h2>
                    <p class="qbc-mode-sub">五大共享，一套底座</p>
                    <p class="qbc-mode-desc">
                        不是简单"卖题"，而是把专家、题库、技术、任务与机制整体开放——从资源到能力，全面赋能你的命题业务。
                    </p>
                </div>
                <div class="qbc-mode-grid">
                    <div v-for="(card, i) in modeCards" :key="card.title" class="qbc-mode-card qbc-animate"
                        :style="{ transitionDelay: i * 0.08 + 's' }">
                        <img :src="card.icon" alt="" />
                        <h3>{{ card.title }}</h3>
                        <p>{{ card.desc }}</p>
                        <em>{{ card.en }}</em>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 品牌优势 ========== -->
        <section id="qbc-brand" class="qbc-brand">
            <div class="container-qbc">
                <div class="qbc-animate">
                    <h2 class="qbc-brand-title">智能化命题技术平台</h2>
                    <p class="qbc-brand-sub">一套平台，<br />贯通命题全链条</p>
                    <p class="qbc-brand-desc">自主知识产权的五大系统，覆盖从题目生产到考务交付的完整闭环，全流程留痕、可管可控。</p>
                </div>
                <div class="qbc-brand-grid">
                    <div v-for="(card, i) in brandCards" :key="card.title" class="qbc-brand-card qbc-animate"
                        :style="{ transitionDelay: i * 0.08 + 's' }">
                        <img :src="card.icon" alt="" />
                        <h3>{{ card.title }}</h3>
                        <p>{{ card.desc }}</p>
                    </div>
                </div>
                <div class="qbc-brand-foot qbc-animate">
                    <strong>交付即赋能</strong>
                    <span>—⁠—⁠ ⁠系⁠统⁠部⁠署⁠、⁠联⁠调⁠、⁠人⁠员⁠操⁠作⁠培⁠训⁠全⁠流⁠程⁠由⁠中⁠测⁠高⁠科⁠专⁠业⁠团⁠队⁠完⁠成⁠。</span>
                </div>
            </div>
        </section>

        <!-- ========== 安全保障 ========== -->
        <section id="qbc-safe" class="qbc-safe">
            <div class="qbc-safe-bg">
                <img src="/assets/images/question_bank1/bg2.png" alt="" />
            </div>
            <div class="container-qbc qbc-safe-inner">
                <div class="qbc-animate">
                    <h2 class="qbc-safe-title">安全保障</h2>
                    <p class="qbc-safe-sub">保密，是不可妥协的底线</p>
                </div>
                <div class="qbc-safe-grid">
                    <div v-for="(card, i) in safeCards" :key="card.title" class="qbc-safe-card qbc-animate"
                        :style="{ transitionDelay: i * 0.08 + 's' }">
                        <div class="qbc-safe-card-head">
                            <h3>{{ card.title }}</h3>
                            <img :src="card.icon" alt="" />
                        </div>
                        <p>{{ card.desc }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 合作共建 ========== -->
        <section id="qbc-cobuild">
            <!-- 工作协同流程图 -->
            <div class="qbc-flow">
                <!-- <h2 class="qbc-flow-title qbc-animate">共建命题基地工作协同流程图</h2> -->
                <img class="qbc-flow-img qbc-animate" src="/assets/images/question_bank1/box5-img.png"
                    alt="共建命题基地工作协同流程图" />
            </div>
            <!-- 三大共建核心内容 -->
            <div class="qbc-cobuild">
                <div class="qbc-cobuild-bg">
                    <img src="/assets/images/question_bank1/bg3.png" alt="" />
                </div>
                <div class="container-qbc qbc-cobuild-inner">
                    <h2 class="qbc-sec-title qbc-animate">共建内容</h2>
                    <p class="qbc-sec-sub qbc-animate">三大共建核心内容</p>
                    <div class="qbc-cobuild-grid">
                        <div v-for="(card, i) in cobuildCards" :key="card.title" class="qbc-cobuild-card qbc-animate"
                            :style="{ transitionDelay: i * 0.1 + 's' }">
                            <div class="qbc-cobuild-head">
                                <img :src="card.img" alt="" />
                                <h3>{{ card.title }}</h3>
                            </div>
                            <div class="qbc-cobuild-body">
                                <p v-if="card.desc">{{ card.desc }}</p>
                                <ul v-else>
                                    <li v-for="b in card.bullets" :key="b">{{ b }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 双方责任分工 -->
            <div class="qbc-duty">
                <div class="container-qbc">
                    <h2 class="qbc-sec-title qbc-animate">共建内容</h2>
                    <p class="qbc-sec-sub qbc-animate">双方责任分工</p>
                    <div class="qbc-duty-grid">
                        <div class="qbc-duty-card qbc-duty-card-partner qbc-animate">
                            <div class="qbc-duty-head">
                                <img src="/assets/images/question_bank1/box7-icon1.png" alt="" />
                                <h3>合作方（贵方）职责</h3>
                            </div>
                            <ol class="qbc-duty-list">
                                <li v-for="d in dutyPartner" :key="d">{{ d }}</li>
                            </ol>
                        </div>
                        <div class="qbc-duty-card qbc-duty-card-company qbc-animate">
                            <div class="qbc-duty-head">
                                <img src="/assets/images/question_bank1/box7-icon2.png" alt="" />
                                <h3>中测高科职责</h3>
                            </div>
                            <ol class="qbc-duty-list">
                                <li v-for="d in dutyCompany" :key="d.k"><strong>{{ d.k }}</strong><span>：{{ d.v
                                }}</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 合作流程 ========== -->
        <section id="qbc-process" class="qbc-process">
            <div class="container-qbc">
                <h2 class="qbc-sec-title qbc-animate">合作流程</h2>
                <p class="qbc-sec-sub qbc-sec-sub-mb qbc-animate">三步开启，长期同行</p>
                <div class="qbc-process-steps">
                    <template v-for="(step, i) in processSteps" :key="step.title">
                        <div class="qbc-process-step qbc-animate" :style="{ transitionDelay: i * 0.12 + 's' }">
                            <div class="qbc-process-num">{{ step.num }}
                                <img v-if="i < processSteps.length - 1" class="qbc-process-arrow"
                                    src="/assets/images/question_bank1/line.png" alt="" />
                            </div>
                            <h3>{{ step.title }}</h3>
                            <p>{{ step.desc }}</p>
                        </div>
                    </template>
                </div>
                <p class="qbc-process-note qbc-animate">以<strong>5 年为期的长期陪伴</strong>—— 期满前 1
                    个月双方评估协商，可续签或有序交接 · 全程签署保密协议，权责清晰</p>
            </div>
        </section>

        <!-- ========== 服务案例（内容后期补充） ========== -->
        <section id="qbc-cases" class="qbc-cases">
            <div class="qb-why-choose-box">
                <div class="qb-why-bg">
                    <div class="qb-why-circle qb-why-circle-tl"></div>
                    <div class="qb-why-circle qb-why-circle-br"></div>
                </div>
                <div class="qb-why-header qbc-animate">合作实践</div>
                <div class="qb-why-subTitle qbc-animate">他⁠们⁠已⁠经⁠在⁠用⁠共⁠享⁠题⁠库⁠</div>
                <div class="qb-why-desc qbc-animate">从省级考试机构到人才集团、央企集团，共享题库中心以不同模式支撑各类命题业务落地。</div>
                <div class="qb-why-box">
                    <div class="qb-why-card qbc-animate" v-for="(card, i) in qbcData" :key="i"
                        :style="{ transitionDelay: i * 0.12 + 's' }">
                        <div class="qb-why-card-label">{{ card.label }}</div>
                        <div class="qb-why-card-title">{{ card.name }}</div>
                        <div class="qb-why-card-desc">{{ card.content }}</div>
                        <div class="qb-why-card-more">{{ card.desc }}</div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
/* ===== 基础 ===== */
.qbc-page {
    font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    color: #161616;
}

.container-qbc {
    width: min(1200px, calc(100% - 40px));
    margin: 0 auto;
}

/* 滚动进入动画 */
.qbc-animate {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.qbc-animate.qbc-visible {
    opacity: 1;
    transform: translateY(0);
}

/* 居中区块标题 */
.qbc-sec-title {
    font-weight: 600;
    font-size: 36px;
    color: #0F62FE;
    line-height: 50px;
    letter-spacing: 2px;
    text-align: center;
    margin: 0 0 14px;
}

.qbc-sec-sub {
    font-weight: 600;
    font-size: 24px;
    color: #16324F;
    line-height: 50px;
    text-align: center;
    margin: 0 0 28px;
}

.qbc-sec-sub-mb {
    margin-bottom: 62px;
}

/* ===== Banner ===== */
.qbc-banner {
    position: relative;
    width: 100%;
    height: 540px;
    background: #dae9ff;
    overflow: hidden;
}

.qbc-banner-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 605px;
    margin-top: -65px;
    pointer-events: none;
}

.qbc-banner-bg img {
    width: 100%;
    height: 100%;
}

.qbc-banner-content {
    position: relative;
    z-index: 2;
    padding-top: 112px;
    text-align: center;
}

.qbc-banner-title {
    font-weight: 600;
    font-size: 48px;
    color: #1677FF;
    line-height: 48px;
    margin: 0 auto 23px;
}

.qbc-banner-title span {
    color: #222222;
}

.qbc-banner-subtitle {
    font-weight: 400;
    font-size: 14px;
    color: #929292;
    line-height: 27px;
    letter-spacing: 2px;
    margin: 0 0 16px;
}

.qbc-banner-desc {
    font-weight: 400;
    font-size: 18px;
    color: #6A6A6A;
    line-height: 31px;
    max-width: 620px;
    margin: 0 auto;
}

/* 数值栏 */
.qbc-stats-bar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 117px;
    background: rgba(255, 255, 255, 0.6);
    padding: 29px 0 25px;
    z-index: 3;
}

.qbc-stats-inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 213px;
}

.qbc-stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
}

.qbc-stat-item strong {
    display: flex;
    align-items: baseline;
    font-size: 32px;
    font-weight: 700;
    color: #0F62FE;
    line-height: 1;
}

.qbc-stat-item strong i {
    font-style: normal;
    font-size: 16px;
    font-weight: 400;
    margin-left: 2px;
}

.qbc-stat-desc {
    font-size: 14px;
    color: #6A6A6A;
}

/* ===== 内容导航 ===== */
.qbc-nav {
    position: sticky;
    top: 76px;
    left: 0;
    z-index: 15;
    width: 100%;
    height: 56px;
    background: #F4F7FB;
}

.qbc-nav-inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 64px;
}

.qbc-nav-tab {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 16px;
    font-weight: 400;
    color: #161616;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.25s ease;
}

.qbc-nav-tab::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: #0F62FE;
    opacity: 0;
    transition: opacity 0.25s ease;
}

.qbc-nav-tab:hover,
.qbc-nav-tab-active {
    color: #0F62FE;
}

.qbc-nav-tab-active::after {
    opacity: 1;
}

/* ===== 用户痛点 ===== */
.qbc-pain {
    background: #fff;
    padding: 71px 0 90px;
}

.qbc-pain-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 74px;
    align-items: start;
}

.qbc-pain-title {
    font-weight: 500;
    font-size: 36px;
    color: #0F62FE;
    line-height: 50px;
    margin: 0 0 25px;
}

.qbc-pain-sub {
    font-weight: 500;
    font-size: 24px;
    color: #222222;
    line-height: 34px;
    margin: 0 0 19px;
}

.qbc-pain-desc {
    font-weight: 400;
    font-size: 16px;
    color: #4E657F;
    line-height: 29px;
    margin: 0 0 17px;
}

.qbc-pain-card {
    position: relative;
    width: 448px;
    height: 167px;
    border-radius: 12px;
    overflow: hidden;
    margin-left: -12px;
}

.qbc-pain-card>img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}

.qbc-pain-card-inner {
    position: relative;
    z-index: 2;
    padding: 44px 50px;
}

.qbc-pain-card-inner::before {
    content: '';
    position: absolute;
    left: 36px;
    top: 32px;
    width: 12px;
    height: 24px;
    border-left: 2px solid #fff;
    border-top: 2px solid #fff;
}

.qbc-pain-quote {
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    line-height: 1.75;
    max-width: 300px;
    margin: 0 0 12px;
}

.qbc-pain-quote-from {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.85);
}

.qbc-pain-item {
    display: flex;
    gap: 27px;
    padding: 12px 0;
    border-bottom: 1px dashed #E8ECF2;
}

.qbc-pain-item:first-child {
    padding-top: 4px;
}

.qbc-pain-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.qbc-pain-item-icon {
    width: 72px;
    height: 72px;
    flex-shrink: 0;
}

.qbc-pain-item h3 {
    font-weight: 500;
    font-size: 17px;
    color: #0F62FE;
    line-height: 28px;
    margin: 0 0 6px;
}

.qbc-pain-item p {
    font-weight: 400;
    font-size: 14px;
    color: #4E657F;
    line-height: 25px;
    margin: 0;
}

/* ===== 核心合作模式 ===== */
.qbc-mode {
    position: relative;
    height: 610px;
    background: #fff;
    overflow: hidden;
    padding: 59px 0 87px;
}

.qbc-mode-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1450px;
    height: 610px;
    pointer-events: none;
}

.qbc-mode-bg img {
    width: 100%;
    height: 100%;
}

.qbc-mode-inner {
    position: relative;
    z-index: 2;
}

.qbc-mode-title {
    font-weight: 600;
    font-size: 36px;
    color: #0F62FE;
    line-height: 50px;
    margin: 0 0 16px;
}

.qbc-mode-sub {
    font-weight: 600;
    font-size: 24px;
    color: #222222;
    line-height: 34px;
    margin: 0 0 8px;
}

.qbc-mode-desc {
    font-weight: 400;
    font-size: 16px;
    color: #4E657F;
    line-height: 29px;
    max-width: 640px;
    margin: 0 0 42px;
}

.qbc-mode-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 11px;
}

.qbc-mode-card {
    background: #FFFFFF;
    border-radius: 12px 12px 12px 12px;
    border: 1px solid #DCE9F5;
    padding: 30px 17px 29px 23px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.qbc-mode-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(15, 98, 254, 0.1);
}

.qbc-mode-card>img {
    width: 42px;
    height: 42px;
}

.qbc-mode-card h3 {
    font-weight: 500;
    font-size: 17px;
    color: #0F62FE;
    line-height: 28px;
    margin: 18px 0 10px;
}

.qbc-mode-card p {
    font-weight: 400;
    font-size: 14px;
    color: #4E657F;
    line-height: 23px;
    margin: 0 0 13px;
}

.qbc-mode-card em {
    font-weight: 500;
    font-size: 12px;
    color: rgba(15, 98, 254, 0.9);
    line-height: 19px;
}

/* ===== 品牌优势 ===== */
.qbc-brand {
    background: #fafafa;
    padding: 86px 0 76px;
}

.qbc-brand-title {
    font-weight: 600;
    font-size: 36px;
    color: #0F62FE;
    line-height: 21px;
    letter-spacing: 1px;
    margin: 0 0 26px;
}

.qbc-brand-sub {
    font-weight: 600;
    font-size: 24px;
    color: #222222;
    line-height: 34px;
    margin: 0 0 9px;
}

.qbc-brand-desc {
    font-weight: 400;
    font-size: 16px;
    color: #4E657F;
    line-height: 29px;
    margin: 0 0 39px;
}

.qbc-brand-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 9px;
}

.qbc-brand-card {
    background: #FFFFFF;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px 4px 4px 4px;
    padding: 15px 24px 23px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.qbc-brand-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(15, 98, 254, 0.1);
}

.qbc-brand-card>img {
    width: 75px;
    height: 75px;
}

.qbc-brand-card h3 {
    font-weight: 500;
    font-size: 16px;
    color: #16324F;
    line-height: 22px;
    margin: 11px 0 10px;
}

.qbc-brand-card p {
    font-weight: 400;
    font-size: 14px;
    color: #4E657F;
    line-height: 21px;
    margin: 0;
}

.qbc-brand-foot {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-top: 29px;
}

.qbc-brand-foot strong {
    font-size: 18px;
    font-weight: 600;
    color: #0F62FE;
}

.qbc-brand-foot-line {
    width: 44px;
    height: 1px;
    background: #9AA4B2;
}

.qbc-brand-foot>span:last-child {
    font-weight: 500;
    font-size: 18px;
    color: #8CA3BB;
    line-height: 25px;
}

/* ===== 安全保障 ===== */
.qbc-safe {
    position: relative;
    height: 538px;
    background: #fafafa;
    overflow: hidden;
    padding: 39px 0 52px;
}

.qbc-safe-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1484px;
    height: 538px;
    pointer-events: none;
}

.qbc-safe-bg img {
    width: 100%;
    height: 100%;
}

.qbc-safe-inner {
    position: relative;
    z-index: 2;
}

.qbc-safe-title {
    font-weight: 600;
    font-size: 36px;
    color: #0F62FE;
    line-height: 50px;
    letter-spacing: 2px;
    margin: 0 0 0;
}

.qbc-safe-sub {
    font-weight: 600;
    font-size: 24px;
    color: #16324F;
    line-height: 50px;
    margin: 0 0 11px;
}

.qbc-safe-grid {
    display: grid;
    grid-template-columns: repeat(2, 236px);
    gap: 18px 17px;
}

.qbc-safe-card {
    background: rgba(255, 255, 255, 0.6);
    border-radius: 12px;
    padding: 14px 18px 23px 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.qbc-safe-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 26px rgba(31, 69, 138, 0.1);
}

.qbc-safe-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.qbc-safe-card-head h3 {
    font-weight: 500;
    font-size: 16px;
    color: #16324F;
    line-height: 26px;
    margin: 0;
}

.qbc-safe-card-head img {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
}

.qbc-safe-card p {
    font-weight: 400;
    font-size: 14px;
    color: #4E657F;
    line-height: 23px;
    margin: 6px 0 0;
}

/* ===== 合作共建：流程图 ===== */
.qbc-flow {
    background: #f3f9fe;
    padding: 29px 0 29px;
    text-align: center;
}

.qbc-flow-title {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 20px;
    font-size: 28px;
    font-weight: 700;
    color: #161616;
    margin: 0;
}

.qbc-flow-title::before,
.qbc-flow-title::after {
    content: '';
    width: 6px;
    height: 6px;
    background: #0F62FE;
    transform: rotate(45deg);
}

.qbc-flow-title::before {
    box-shadow: -14px 0 0 rgba(15, 98, 254, 0.45), -26px 0 0 rgba(15, 98, 254, 0.2);
}

.qbc-flow-title::after {
    box-shadow: 14px 0 0 rgba(15, 98, 254, 0.45), 26px 0 0 rgba(15, 98, 254, 0.2);
}

.qbc-flow-img {
    display: block;
    width: 1080px;
    height: 623px;
    max-width: calc(100% - 40px);
    margin: 29px auto 0;
}

/* ===== 合作共建：三大核心内容 ===== */
.qbc-cobuild {
    position: relative;
    background: #fff;
    overflow: hidden;
    padding: 38px 0 89px;
}

.qbc-cobuild-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 571px;
    pointer-events: none;
}

.qbc-cobuild-bg img {
    width: 100%;
    height: 100%;
}

.qbc-cobuild-inner {
    position: relative;
    z-index: 2;
}

.qbc-cobuild-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}

.qbc-cobuild-card {
    background: #fff;
    border: 1px solid #EDF1F7;
    border-radius: 20px 20px 12px 12px;
    box-shadow: 0 6px 24px rgba(31, 69, 138, 0.08);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.qbc-cobuild-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 36px rgba(31, 69, 138, 0.14);
}

.qbc-cobuild-head {
    position: relative;
    height: 127px;
}

.qbc-cobuild-head>img {
    display: block;
    width: 100%;
    height: 127px;
}

.qbc-cobuild-head h3 {
    position: absolute;
    left: 26px;
    top: 37px;
    width: 54%;
    font-weight: 600;
    font-size: 18px;
    color: #0F62FE;
    line-height: 25px;
    margin: 0;
    white-space: pre-line;
}

.qbc-cobuild-body {
    padding: 19px 25px 16px;
}

.qbc-cobuild-body p {
    font-weight: 400;
    font-size: 14px;
    color: #4E657F;
    line-height: 28px;
    margin: 0;
}

.qbc-cobuild-body ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.qbc-cobuild-body li {
    position: relative;
    padding-left: 12px;
    font-size: 13px;
    color: #6A6A6A;
    line-height: 1.9;
}

.qbc-cobuild-body li:last-child {
    margin-bottom: 0;
}

.qbc-cobuild-body li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #6A6A6A;
}

/* ===== 合作共建：双方责任分工 ===== */
.qbc-duty {
    background: #fff;
    padding: 53px 0 43px;
}

.qbc-duty-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 27px;
}

.qbc-duty-card {
    border-radius: 14px 14px 14px 14px;
    border: 1px solid #DDDDDD;
    padding: 28px 25px 39px;
}

.qbc-duty-card-partner {
    background: #FFFCF8;
}

.qbc-duty-card-company {
    background: #F4F7FB;
    ;
}

.qbc-duty-head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
}

.qbc-duty-head img {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
}

.qbc-duty-head h3 {
    font-weight: 600;
    font-size: 18px;
    color: #222222;
    line-height: 21px;
    margin: 0;
}

.qbc-duty-list {
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: duty;
}

.qbc-duty-list li {
    counter-increment: duty;
    position: relative;
    padding-left: 26px;
    font-weight: 400;
    font-size: 16px;
    color: #6A6A6A;
    line-height: 34px;
}

.qbc-duty-list li::before {
    content: counter(duty) '.';
    position: absolute;
    left: 0;
    color: #4A4A4A;
}

.qbc-duty-list strong {
    font-weight: 700;
    color: #0F62FE;
}

.qbc-duty-list span {
    color: #4A4A4A;
}

/* ===== 合作流程 ===== */
.qbc-process {
    background: #f4f7fb;
    padding: 50px 0;
}

.qbc-process-steps {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 72px;
}

.qbc-process-step {
    width: 320px;
    text-align: center;
}

.qbc-process-num {
    width: 54px;
    height: 54px;
    margin: 0 auto;
    border-radius: 50%;
    background: #0F62FE;
    font-weight: 400;
    font-size: 20px;
    color: #FFFFFF;
    line-height: 33px;
    display: grid;
    place-items: center;
    box-shadow: 0 6px 16px rgba(15, 98, 254, 0.3);
    position: relative;
}

.qbc-process-step h3 {
    font-size: 18px;
    font-weight: 700;
    color: #16324F;
    margin: 22px 0 10px;
}

.qbc-process-step p {
    font-weight: 400;
    font-size: 14px;
    color: #4E657F;
    line-height: 25px;
    max-width: 330px;
    margin: 0 auto;
}

.qbc-process-arrow {
    width: 297px;
    height: 6px;
    position: absolute;
    top: 25px;
    left: 71px;
}

.qbc-process-note {
    margin: 46px 0 0;
    font-weight: 400;
    font-size: 16px;
    color: #16324F;
    line-height: 22px;
    text-align: center;
}

.qbc-process-note strong {
    font-weight: 700;
    color: #0F62FE;
}

/* ===== 服务案例（占位，内容后期补充） ===== */
.qbc-cases {
    position: relative;
    width: 100%;
    height: 588px;
    background: #fff;
    overflow: hidden;
}

.qb-why-choose-box {
    width: 1440px;
    height: 100%;
    position: relative;
    margin: 0 auto;
    padding: 62px 140px 115px;
    background: linear-gradient(125deg, #003399 0%, #0052D9 40%, #1677FF 100%);
}

.qb-why-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.qb-why-circle {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 1);
    z-index: 2;
}

.qb-why-circle-tl {
    width: 328px;
    height: 328px;
    top: -114px;
    right: -114px;
    animation: qbc-float 7s ease-in-out infinite;
}

.qb-why-circle-br {
    width: 230px;
    height: 230px;
    left: -36px;
    bottom: -36px;
    animation: qbc-float 6s ease-in-out 1s infinite;
}

@keyframes qbc-float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(14px);
    }
}

.qb-why-header {
    font-weight: 600;
    font-size: 36px;
    color: #FFFFFF;
    letter-spacing: 2px;
}

.qb-why-subTitle {
    font-weight: 600;
    font-size: 24px;
    color: #FFFFFF;
    line-height: 34px;
    margin: 12px 0 8px;
}

.qb-why-desc {
    font-weight: 400;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.9);
    line-height: 29px;
    margin: 0px 0 22px;
}

.qb-why-box {
    display: flex;
    gap: 30px;
    justify-content: center;
}

.qb-why-card {
    background: #FFFFFF;
    border-radius: 12px 12px 12px 12px;
    border: 1px solid #DCE9F5;
    padding: 32px 27px;
    transition: opacity 0.7s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.qb-why-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(0, 21, 68, 0.35);
}

.qb-why-card-label {
    background: #EAF4FC;
    border-radius: 20px 20px 20px 20px;
    font-weight: 400;
    font-size: 12px;
    color: #0F62FE;
    line-height: 19px;
    text-align: center;
    padding: 4px 12px;
    margin: 0 0 16px;
    display: inline-block;
}

.qb-why-card-title {
    font-weight: 500;
    font-size: 17px;
    color: #16324F;
    line-height: 27px;
    margin: 0px 0 10px;
}

.qb-why-card-desc {
    font-weight: 400;
    font-size: 14px;
    color: #4E657F;
    line-height: 24px;
    margin: 0px 0 16px;
    padding-bottom: 14px;
    border-bottom: 1px solid #DCE9F5;
}

.qb-why-card-more {
    font-weight: 600;
    font-size: 13px;
    color: #0F62FE;
    line-height: 21px;
}

/* ===== 响应式 ===== */
@media (max-width: 1100px) {
    .qbc-stats-inner {
        gap: 60px;
    }

    .qbc-nav-inner {
        gap: 28px;
        overflow-x: auto;
    }

    .qbc-pain-grid {
        grid-template-columns: 1fr;
        gap: 50px;
    }

    .qbc-mode-grid,
    .qbc-brand-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .qbc-mode {
        height: auto;
        padding-bottom: 70px;
    }

    .qbc-safe {
        height: auto;
        padding-bottom: 60px;
    }

    .qbc-cobuild-grid,
    .qbc-duty-grid {
        grid-template-columns: 1fr;
    }

    .qbc-process-steps {
        flex-direction: column;
        align-items: center;
        gap: 40px;
    }

    .qbc-process-arrow {
        display: none;
    }
}
</style>
