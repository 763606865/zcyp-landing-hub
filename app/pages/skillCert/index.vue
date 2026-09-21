<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// @ts-ignore
const source = useCampaignSource()
// @ts-ignore
const contactRoute = computed(() => getContactRoute(15, source.value))

const navTabs = [
    { label: '题库定义与建设要求', target: 'definition' },
    { label: '题库核心优势', target: 'core' },
    { label: '交付优势', target: 'advantages' },
    { label: '建设流程', target: 'process' },
    { label: '服务案例', target: 'cases' },
]
const activeNav = ref('definition')

const scrollToSection = (target: string) => {
    const el = document.getElementById(`sc-${target}`)
    if (el) {
        const headerOffset = 60
        const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
    }
}

const handleScroll = () => {
    const sections = navTabs.map(t => document.getElementById(`sc-${t.target}`))
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

const scSection = ref<HTMLElement>()
const observerOptions = { threshold: 0.12 }

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    if (scSection.value) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('sc-visible')
                    observer.unobserve(entry.target)
                }
            })
        }, observerOptions)
        scSection.value.querySelectorAll('.sc-animate').forEach(el => {
            observer.observe(el as HTMLElement)
        })
    }
})

// ===== 数据 =====
const definitionData = {
    title: '职业技能题库建设定义与建设要求',
    leftTitle: '什么是职业技能题库建设',
    leftContent1: '职业技能题库建设，是以',
    leftContent2: '国家职业标准',
    leftContent3: '为根本依据，依托鉴定要素细目表，通过标准化命题、审核、试测、修订流程，构建包含理论知识试题、操作技能试题的试题资源库；用于职业技能等级认定、职业技能鉴定考核，实现对技能人才知识水平、实操能力客观、公平、标准化评价，支撑“考、培、用”一体化，是技能人才评价工作的基础工程。',
    rightItems: [
        {
            icon: '/assets/images/skillCert/box1-icon1.png',
            title: '基础依据要求',
            items: [
                '严格对标人社部颁布的国家职业标准、《技能人才评价命题技术规程》',
                '以鉴定要素细目表作为命题直接内容参照物',
                '完整覆盖职业素养、理论知识、操作技能、工作业绩评价维度',
                '难度配比遵循易∶中∶难 = 3∶5∶2的通用规范。',
            ],
        },
        {
            icon: '/assets/images/skillCert/box1-icon2.png',
            title: '试题编制质量要求',
            items: [
                '内容准确无误，符合现行法规、技术规范，专业术语规范无歧义',
                '贴合岗位真实工作场景，突出任务情境化',
                '试题相互独立，杜绝重题、漏题，多维标签管理',
                '经过试测验证难度、区分度，不合格试题修订或淘汰',
            ],
        },
        {
            icon: '/assets/images/skillCert/box1-icon3.png',
            title: '管理与安全保障要求',
            items: [
                '命题专家签署保密协议，试题全流程分级保密管控',
                '全过程留痕，命题、试卷、评分记录归档，电子档案不少于5年',
                '定期复审，跟随政策、技术迭代动态更新题库资源',
            ],
        },
        {
            icon: '/assets/images/skillCert/box1-icon4.png',
            title: '理论·实操联动建设要求',
            items: [
                '理论知识点和实操考核内容相互对应，做到知行统一',
                '理论、实操难度匹配，适配各技能等级能力定位',
                '高等级（技师、高级技师）设置综合方案设计、成果评审类试题',
            ],
        },
    ],
}

const coreData = {
    subtitle: '严格对标国家职业标准，理论+实操题库联动开发，实现考培用一体化的技术支撑。',
    leftCard: {
        title: '理论知识题库',
        desc: '考核从业人员基础与相关知识，覆盖单选、多选、判断、填空、问答、论述、计算等全部题型。低级鉴定以客观题为主，技师/高级技师侧重主观综合题。',
        items: [
            '依据鉴定要素细目表作为命题直接依据',
            '难度配比：易:中:难≈3:5:2',
            '多维度标签管理：鉴定范围、鉴定点、题型、难度、认知层次、适用等级',
            '试测校验、参数分析，定期复审动态更新',
        ],
    },
    rightCard: {
        title: '操作技能题库',
        desc: '职业技能鉴定核心环节，考核真实工作场景任务完成能力，包含实际操作、书面作答、口头回答、仿真模拟多种考核模式，支持过程评分+结果评分。',
        items: [
            '完整试题要素：任务名称、描述、设备材料、考核时限、安全规范、细化评分标准',
            '设置关键一票否决项，重大安全隐患直接判定不合格',
            '考核环境贴近生产实际，全过程录像留痕可复核追溯',
            '量化评分指标，降低考评员主观偏差，双考评员独立打分',
        ],
    },
    bottomItems: [
        { icon: '/assets/images/skillCert/box2-icon1.png', title: '内容关联', desc: '理论知识点与实操考核紧密对应，实现“知”与“行”统一。' },
        { icon: '/assets/images/skillCert/box2-icon2.png', title: '难度匹配', desc: '理论与实操难度合理匹配，综合反映对应技能等级能力标准。' },
        { icon: '/assets/images/skillCert/box2-icon3.png', title: '综合应用', desc: '技师、高级技师可采用“方案设计+实操验证”综合考核模式，评价技术攻关创新能力。' },
    ],
}

const advantagesData = [
    {
        title: '优势一',
        subtitle: '题库质量高',
        desc: '源于高层次专家资源与严谨内部学术质量把 控机制',
        items: [
            '“院校专家+企业一线专家”双元命题专家库',
            '高级工及以上命题专家需具备技师/高级职称 +5年以上行业经验',
            '完整内部质量机制：策划‑蓝图‑编写‑初审‑复审‑交叉互审‑终审‑试测‑修订',
            '对标国家职业标准，试题经过试测校验难度、区分度指标',
        ],
    },
    {
        title: '优势二',
        subtitle: '项目交付经验丰富',
        desc: '大量落地项目沉淀，覆盖多元客户类型与工种',
        items: [
            '服务人社评价机构、国企、职业院校、行业协会多类主体',
            '覆盖机械、电工、服务、信息技术、汽车维修等多行业工种',
            '支持从初级工到高级技师全等级题库开发',
            '熟悉备案评审要求，输出成果满足监管验收标准',
        ],
    },
    {
        title: '优势三',
        subtitle: '项目交付经验丰富',
        desc: '依托团队与存量资源，高效完成题库建设',
        items: [
            '专职命题团队+庞大外部专家池，快速匹配各行业命题专家',
            '大量历史题库资源储备，可复用、迭代改编，缩短命题周期',
            '标准化命题模板、审核流程、AI辅助命题查重工具',
            '全流程项目管理，按节点交付全套细目表、试题、答案、评分标准',
        ],
    },
]

const processSteps = [
    { icon: '/assets/images/skillCert/box4-icon1.png', title: '前期策划', desc: '解析职业标准，编制命题说明' },
    { icon: '/assets/images/skillCert/box4-icon2.png', title: '蓝图设计', desc: '考评蓝图，确定权重、时长、方式' },
    { icon: '/assets/images/skillCert/box4-icon3.png', title: '试题编写', desc: '专家独立命题，统一格式规范' },
    { icon: '/assets/images/skillCert/box4-icon4.png', title: '多轮审核', desc: '初审、复审、交叉互审、终审' },
    { icon: '/assets/images/skillCert/box4-icon5.png', title: '试测验证', desc: '样本试测，质量分析修订完善' },
    { icon: '/assets/images/skillCert/box4-icon6.png', title: '评审交付', desc: '全套试题、细目表答案、评分标准交付' },
]

const caseData = {
    partnerTypes: [
        { icon: '/assets/images/skillCert/box5-icon1.png', label: '人社部门及下属评价机构' },
        { icon: '/assets/images/skillCert/box5-icon1.png', label: '央企、国有大中型企业' },
        { icon: '/assets/images/skillCert/box5-icon1.png', label: '技工院校、职业院校' },
        { icon: '/assets/images/skillCert/box5-icon1.png', label: '行业协会、第三方评价' },
    ],
    tableTitle: '覆盖主流工种与可开发等级',
    tableRows: [
        { category: '机械制造类', jobs: '车工、铣工、钳工、焊工、模具工 ...', levels: '五级—一级（初级工-高级技师）' },
        { category: '电工电气类', jobs: '电工、低压电工、高压电工、电气设备安装工 ...', levels: '五级—一级（初级工-高级技师）' },
        { category: '现代服务类', jobs: '保育师、育婴员、养老护理员、中式烹调师、中式面点师 ...', levels: '五级—一级（初级工-技师）' },
        { category: '信息技术类', jobs: '计算机维修工、物联网安装调试员、人工智能训练师 ...', levels: '五级—一级（初级工-高级技师）' },
        { category: '交通与汽车类', jobs: '汽车维修工、机动车检测工 ...', levels: '五级—一级（初级工-高级技师）' },
        { category: '建筑建材类', jobs: '砌筑工、混凝土工、钢筋工 ...', levels: '五级—一级（初级工-技师）' },
        { category: '......', jobs: '...', levels: '...' },
    ],
    coverageNote: '中测高科所掌握的工种达所有工种的95%以上',
    cases: [
        {
            label: '某省人社第三方评价机构',
            title: '多工种题库开发',
            desc: '需求：机械、电工、养老护理等 8 个工种，全等级理论 + 实操全套题库。',
            items: [
                '输出细目表、理论试题库、实操试题及完整评分标准',
                '多轮专家交叉审核，通过专家评审备案',
                '快速交付，支持线上考试系统直接导入使用',
            ],
        },
        {
            label: '某国有制造集团',
            title: '企业自主评价题库',
            desc: '需求：车工、焊工、电气设备安装工，适配企业岗位特色，初级工‑高级技师全等级。',
            items: [
                '企业一线专家+院校专家联合命题',
                '结合企业生产工艺定制实操任务、否决项',
                '交付题库资源+动态更新维护服务',
            ],
        },
        {
            label: '省级技工院校',
            title: '服务类工种题库项目',
            desc: '需求：保育师、育婴员、中式烹调师，适配院校教学与等级认定一体化。',
            items: [
                '兼顾教学培训与鉴定考核双重用途',
                '配套完整细目表、参考答案、评分细则',
                '批量试题快速交付，缩短项目周期',
            ],
        },
    ],
}

// ===== 移动端 =====
const scmSection = ref<HTMLElement>()
const scmActiveNav = ref('definition')

const scmHandleScroll = () => {
    const sections = navTabs.map(t => document.getElementById(`scm-${t.target}`))
    const scrollY = window.scrollY + 140
    for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i]
        const tab = navTabs[i]
        if (sec && tab && sec.offsetTop <= scrollY) {
            scmActiveNav.value = tab.target
            break
        }
    }
}

onMounted(() => {
    window.addEventListener('scroll', scmHandleScroll, { passive: true })
    if (scmSection.value) {
        const scmObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scm-visible')
                    scmObserver.unobserve(entry.target)
                }
            })
        }, { threshold: 0.12 })
        scmSection.value.querySelectorAll('.scm-animate').forEach(el => {
            scmObserver.observe(el as HTMLElement)
        })
    }
})
</script>

<template>
    <div ref="scSection" class="sc-page">
        <!-- ========== Banner ========== -->
        <section class="sc-banner">
            <div class="sc-banner-box">
                <div class="sc-banner-bg">
                    <img src="/assets/images/skillCert/banner-bg.png" alt="" class="sc-banner-bg-img" />
                </div>
                <div class="container-sc sc-banner-content">
                    <div class="sc-banner-eyebrow">以题库立标准 · 以鉴定证技能</div>
                    <h1 class="sc-banner-title">职业技能鉴定<br />题库建设服务</h1>
                    <p class="sc-banner-desc">
                        中测高科——专注人力资源测评科技服务，依托高层次专家团队和专职学术力量与AI智慧考试平台，为主管单位、国企、技工院校、社会评价机构提供标准化职业技能题库全套解决方案。</p>
                    <div class="sc-banner-actions">
                        <NuxtLink class="sc-btn sc-btn-primary" :to="contactRoute">
                            <img src="/assets/images/skillCert/banner-btn.png" alt="" class="sc-btn-icon" />
                            资料下载
                        </NuxtLink>
                        <NuxtLink class="sc-btn sc-btn-outline" :to="contactRoute">商务对接</NuxtLink>
                    </div>
                </div>
                <div class="sc-banner-visual">
                    <img src="/assets/images/skillCert/banner-img.png" alt="" class="sc-banner-img" />
                </div>
            </div>
        </section>

        <!-- ========== 导航标签 ========== -->
        <nav class="sc-nav-bar">
            <div class="container-sc sc-nav-inner">
                <a v-for="tab in navTabs" :key="tab.target" class="sc-nav-tab"
                    :class="{ 'sc-nav-tab-active': activeNav === tab.target }"
                    @click.prevent="scrollToSection(tab.target)" href="javascript:void(0)">
                    {{ tab.label }}
                </a>
            </div>
        </nav>

        <!-- ========== 定义与建设要求区 ========== -->
        <section id="sc-definition" class="sc-section sc-definition-section">
            <div class="sc-definition-bg">
                <img src="/assets/images/skillCert/bg1.png" alt="" class="sc-definition-bg-img" />
            </div>
            <div class="container-sc">
                <div class="sc-section-header sc-section-header-center sc-animate">
                    <h2>{{ definitionData.title }}</h2>
                    <div class="sc-title-bar"></div>
                </div>
                <div class="sc-definition-content sc-animate">
                    <div class="sc-definition-left">
                        <img src="/assets/images/skillCert/box-bg.png" alt="" class="sc-definition-left-img" />
                        <div class="sc-def-left-card">
                            <h3>{{ definitionData.leftTitle }}</h3>
                            <p>
                                {{ definitionData.leftContent1 }}
                                <span style="color: #0F62FE;">{{ definitionData.leftContent2 }}</span>
                                {{ definitionData.leftContent3 }}
                            </p>
                        </div>
                    </div>
                    <div class="sc-definition-right">
                        <div v-for="(item, idx) in definitionData.rightItems" :key="idx" class="sc-def-right-card">
                            <div class="sc-def-card-header">
                                <img :src="item.icon" alt="" class="sc-def-card-icon" />
                                <h4>{{ item.title }}</h4>
                            </div>
                            <ul class="sc-def-card-list">
                                <li v-for="(li, liIdx) in item.items" :key="liIdx">{{ li }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 核心能力区 ========== -->
        <section id="sc-core" class="sc-section sc-core-section">
            <div class="container-sc">
                <div class="sc-section-header sc-section-header-center sc-animate">
                    <h2>题库建设核心能力</h2>
                    <div class="sc-title-bar"></div>
                    <p class="sc-section-subtitle">{{ coreData.subtitle }}</p>
                </div>
                <div class="sc-core-cards sc-animate">
                    <div class="sc-core-card sc-core-card-left">
                        <div class="sc-core-card-header">
                            <img src="/assets/images/skillCert/box2-bg.png" alt="" class="sc-core-header-bg" />
                            <h3>{{ coreData.leftCard.title }}</h3>
                            <p>{{ coreData.leftCard.desc }}</p>
                        </div>
                        <ul class="sc-core-list">
                            <li v-for="(item, idx) in coreData.leftCard.items" :key="idx">
                                <img src="/assets/images/skillCert/box2-iconl.png" alt="" class="sc-list-icon" />
                                <span>{{ item }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="sc-core-card sc-core-card-right">
                        <div class="sc-core-card-header">
                            <img src="/assets/images/skillCert/box2-bg.png" alt="" class="sc-core-header-bg" />
                            <h3>{{ coreData.rightCard.title }}</h3>
                            <p>{{ coreData.rightCard.desc }}</p>
                        </div>
                        <ul class="sc-core-list">
                            <li v-for="(item, idx) in coreData.rightCard.items" :key="idx">
                                <img src="/assets/images/skillCert/box2-iconr.png" alt="" class="sc-list-icon" />
                                <span>{{ item }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="sc-core-bottom sc-animate">
                    <h3 class="sc-core-bottom-title">理论题库 &amp; 实操题库联动设计</h3>
                    <div class="sc-core-bottom-cards">
                        <div v-for="(item, idx) in coreData.bottomItems" :key="idx" class="sc-core-bottom-card">
                            <div class="sc-bottom-card-header">
                                <img :src="item.icon" alt="" class="sc-bottom-card-icon" />
                                <h4>{{ item.title }}</h4>
                            </div>
                            <p>{{ item.desc }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 交付优势区 ========== -->
        <section id="sc-advantages" class="sc-section sc-advantages-section">
            <div class="sc-advantages-bg">
                <img src="/assets/images/skillCert/bg2.png" alt="" class="sc-advantages-bg-img" />
            </div>
            <div class="container-sc">
                <div class="sc-section-header sc-section-header-center sc-animate">
                    <h2>我们的题库交付优势</h2>
                    <div class="sc-title-bar"></div>
                </div>
                <div class="sc-advantages-cards sc-animate">
                    <div v-for="(item, idx) in advantagesData" :key="idx" class="sc-advantage-card">
                        <div class="sc-advantage-header">
                            <img src="/assets/images/skillCert/box3-bg.png" alt="" class="sc-advantage-header-bg" />
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.subtitle }}</p>
                            <p class="sc-advantage-desc">{{ item.desc }}</p>
                        </div>
                        <div class="sc-advantage-body">
                            <ul class="sc-advantage-list">
                                <li v-for="(li, liIdx) in item.items" :key="liIdx">{{ li }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 全流程区 ========== -->
        <section id="sc-process" class="sc-section sc-process-section">
            <div class="sc-process-bg-left">
                <img src="/assets/images/skillCert/box4-bg1.png" alt="" />
            </div>
            <div class="sc-process-bg-right">
                <img src="/assets/images/skillCert/box4-bg2.png" alt="" />
            </div>
            <div class="container-sc">
                <div class="sc-section-header sc-section-header-center sc-animate">
                    <h2 class="sc-process-title">题库建设全流程</h2>
                    <div class="sc-title-bar sc-title-bar-light"></div>
                </div>
                <div class="sc-process-steps sc-animate">
                    <template v-for="(step, idx) in processSteps" :key="idx">
                        <div class="sc-process-step">
                            <img :src="step.icon" alt="" class="sc-process-icon" />
                            <div class="sc-process-step-text">
                                <span class="sc-process-step-title">{{ step.title }}</span>
                                <span class="sc-process-step-desc">{{ step.desc }}</span>
                            </div>
                        </div>
                        <img v-if="idx < processSteps.length - 1" src="/assets/images/skillCert/box4-line.png" alt=""
                            class="sc-process-arrow" />
                    </template>
                </div>
            </div>
        </section>

        <!-- ========== 交付案例区 ========== -->
        <section id="sc-cases" class="sc-section sc-cases-section">
            <div class="sc-cases-bg">
                <img src="/assets/images/skillCert/bg3.png" alt="" class="sc-cases-bg-img" />
            </div>
            <div class="container-sc">
                <div class="sc-section-header sc-section-header-center sc-animate">
                    <h2>项目交付案例</h2>
                    <div class="sc-title-bar"></div>
                    <p class="sc-section-subtitle">服务人社评价机构、央企国企、技工院校、行业协会，覆盖多工种、全技能等级题库开发项目。</p>
                </div>

                <div class="sc-case-partners sc-animate">
                    <span class="sc-case-partner-label">合作单位类型：</span>
                    <div class="sc-case-partner-tags">
                        <span v-for="(p, idx) in caseData.partnerTypes" :key="idx" class="sc-partner-tag">
                            <img :src="p.icon" alt="" />
                            {{ p.label }}
                        </span>
                    </div>
                </div>

                <div class="sc-case-table-wrap sc-animate">
                    <h3 class="sc-case-table-title">{{ caseData.tableTitle }}</h3>
                    <div class="sc-case-table-inner">
                        <div class="sc-case-table-header">
                            <div class="sc-table-col sc-table-col-cat">工种大类</div>
                            <img src="/assets/images/skillCert/box5-line1.png" alt="" class="sc-table-arrow1" />
                            <div class="sc-table-col sc-table-col-job">典型工作名称</div>
                            <img src="/assets/images/skillCert/box5-line2.png" alt="" class="sc-table-arrow2" />
                            <div class="sc-table-col sc-table-col-level">可开发等级</div>
                        </div>
                        <div class="sc-case-table-body">
                            <div v-for="(row, idx) in caseData.tableRows" :key="idx" class="sc-table-row">
                                <div class="sc-table-col sc-table-col-cat">{{ row.category }}</div>
                                <div class="sc-table-col sc-table-col-job sc-table-col-job-multiline">{{ row.jobs }}
                                </div>
                                <div class="sc-table-col sc-table-col-level sc-table-col-level-multiline">
                                    {{ row.levels }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sc-case-coverage sc-animate">
                        <img src="/assets/images/skillCert/box5-icon2.png" alt="" />
                        <span>中测高科所掌握的工种达所有工种的<strong>95%</strong>以上</span>
                    </div>
                </div>

                <div class="sc-case-cards sc-animate">
                    <div v-for="(c, idx) in caseData.cases" :key="idx" class="sc-case-card">
                        <div class="sc-case-card-header">
                            <img :src="['/assets/images/skillCert/box5-img1.png', '/assets/images/skillCert/box5-img2.png', '/assets/images/skillCert/box5-img3.png'][idx]"
                                alt="" class="sc-case-card-bg" />
                            <span class="sc-case-card-label">{{ c.label }}</span>
                        </div>
                        <div class="sc-case-card-body">
                            <h4>{{ c.title }}</h4>
                            <p>{{ c.desc }}</p>
                            <ul>
                                <li v-for="(li, liIdx) in c.items" :key="liIdx">{{ li }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- ===== 移动端版本（scm- 前缀） ===== -->
    <div ref="scmSection" class="scm-page">
        <section class="scm-banner">
            <div class="scm-container scm-banner-content">
                <div class="scm-banner-eyebrow">以题库立标准 · 以鉴定证技能</div>
                <h1 class="scm-banner-title">职业技能鉴定<br />题库建设服务</h1>
                <p class="scm-banner-desc">
                    中测高科——专注人力资源测评科技服务，依托高层次专家团队和专职学术力量与AI智慧考试平台，为主管单位、国企、技工院校、社会评价机构提供标准化职业技能题库全套解决方案。</p>
                <div class="scm-banner-actions">
                    <NuxtLink class="scm-btn scm-btn-primary" :to="contactRoute">
                        <img src="/assets/images/skillCert/banner-btn.png" alt="" class="scm-btn-icon" />资料下载
                    </NuxtLink>
                    <NuxtLink class="scm-btn scm-btn-outline" :to="contactRoute">商务对接</NuxtLink>
                </div>
            </div>
            <div class="scm-container scm-banner-visual">
                <img src="/assets/images/skillCert/banner-img.png" alt="" />
            </div>
        </section>

        <nav class="scm-nav-bar">
            <div class="scm-nav-scroll">
                <a v-for="tab in navTabs" :key="tab.target" class="scm-nav-tab"
                    :class="{ 'scm-nav-tab-active': scmActiveNav === tab.target }" :href="`#scm-${tab.target}`">{{
                        tab.label }}</a>
            </div>
        </nav>

        <section id="scm-definition" class="scm-section scm-definition-section">
            <div class="scm-definition-bg"><img src="/assets/images/skillCert/bg1.png" alt="" /></div>
            <div class="scm-container">
                <div class="scm-section-header scm-animate">
                    <h2>{{ definitionData.title }}</h2>
                    <div class="scm-title-bar"></div>
                </div>
                <div class="scm-def-left-card scm-animate">
                    <h3>{{ definitionData.leftTitle }}</h3>
                    <p>
                        {{ definitionData.leftContent1 }}
                        <span style="color: #0F62FE;">{{ definitionData.leftContent2 }}</span>
                        {{ definitionData.leftContent3 }}
                    </p>
                </div>
                <div class="scm-def-right-grid">
                    <div v-for="(item, idx) in definitionData.rightItems" :key="idx"
                        class="scm-def-right-card scm-animate">
                        <div class="scm-def-card-header"><img :src="item.icon" alt="" class="scm-def-card-icon" />
                            <h4>{{ item.title }}</h4>
                        </div>
                        <ul class="scm-def-card-list">
                            <li v-for="(li, liIdx) in item.items" :key="liIdx">{{ li }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section id="scm-core" class="scm-section scm-core-section">
            <div class="scm-container">
                <div class="scm-section-header scm-section-header-center scm-animate">
                    <h2>题库建设核心能力</h2>
                    <div class="scm-title-bar"></div>
                    <p class="scm-section-subtitle">{{ coreData.subtitle }}</p>
                </div>
                <div class="scm-core-card scm-animate">
                    <div class="scm-core-card-header"><img src="/assets/images/skillCert/box2-bg.png" alt=""
                            class="scm-core-header-bg" />
                        <h3>{{ coreData.leftCard.title }}</h3>
                        <p>{{ coreData.leftCard.desc }}</p>
                    </div>
                    <ul class="scm-core-list">
                        <li v-for="(item, idx) in coreData.leftCard.items" :key="idx"><img
                                src="/assets/images/skillCert/box2-iconl.png" alt="" class="scm-list-icon" /><span>{{
                                    item }}</span></li>
                    </ul>
                </div>
                <div class="scm-core-card scm-animate">
                    <div class="scm-core-card-header"><img src="/assets/images/skillCert/box2-bg.png" alt=""
                            class="scm-core-header-bg" />
                        <h3>{{ coreData.rightCard.title }}</h3>
                        <p>{{ coreData.rightCard.desc }}</p>
                    </div>
                    <ul class="scm-core-list">
                        <li v-for="(item, idx) in coreData.rightCard.items" :key="idx"><img
                                src="/assets/images/skillCert/box2-iconr.png" alt="" class="scm-list-icon" /><span>{{
                                    item }}</span></li>
                    </ul>
                </div>
                <div class="scm-core-bottom scm-animate">
                    <h3 class="scm-core-bottom-title">理论题库 &amp; 实操题库联动设计</h3>
                    <div class="scm-core-bottom-cards">
                        <div v-for="(item, idx) in coreData.bottomItems" :key="idx" class="scm-core-bottom-card">
                            <div class="scm-bottom-card-header">
                                <img :src="item.icon" alt="" class="scm-bottom-card-icon" />
                                <h4>{{ item.title }}</h4>
                            </div>
                            <p>{{ item.desc }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="scm-advantages" class="scm-section scm-advantages-section">
            <div class="scm-advantages-bg"><img src="/assets/images/skillCert/bg2.png" alt="" /></div>
            <div class="scm-container">
                <div class="scm-section-header scm-section-header-center scm-animate">
                    <h2>我们的题库交付优势</h2>
                    <div class="scm-title-bar"></div>
                </div>
                <div class="scm-advantages-list">
                    <div v-for="(item, idx) in advantagesData" :key="idx" class="scm-advantage-card scm-animate">
                        <div class="scm-advantage-header"><img src="/assets/images/skillCert/box3-bg.png" alt=""
                                class="scm-advantage-header-bg" />
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.subtitle }}</p>
                            <p class="scm-advantage-desc">{{ item.desc }}</p>
                        </div>
                        <div class="scm-advantage-body">
                            <ul class="scm-advantage-list">
                                <li v-for="(li, liIdx) in item.items" :key="liIdx">{{ li }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="scm-process" class="scm-section scm-process-section">
            <div class="scm-process-bg-left"><img src="/assets/images/skillCert/box4-bg1.png" alt="" /></div>
            <div class="scm-process-bg-right"><img src="/assets/images/skillCert/box4-bg2.png" alt="" /></div>
            <div class="scm-container">
                <div class="scm-section-header scm-section-header-center scm-animate">
                    <h2 class="scm-process-title">题库建设全流程</h2>
                    <div class="scm-title-bar scm-title-bar-light"></div>
                </div>
                <div class="scm-process-steps">
                    <div v-for="(step, idx) in processSteps" :key="idx" class="scm-process-step scm-animate">
                        <img :src="step.icon" alt="" class="scm-process-icon" />
                        <div class="scm-process-step-text"><span class="scm-process-step-title">{{ step.title
                        }}</span><span class="scm-process-step-desc">{{ step.desc }}</span></div>
                        <img v-if="idx < processSteps.length - 1" src="/assets/images/skillCert/box4-line.png" alt=""
                            class="scm-process-arrow" />
                    </div>
                </div>
            </div>
        </section>

        <section id="scm-cases" class="scm-section scm-cases-section">
            <div class="scm-cases-bg"><img src="/assets/images/skillCert/bg3.png" alt="" /></div>
            <div class="scm-container">
                <div class="scm-section-header scm-section-header-center scm-animate">
                    <h2>项目交付案例</h2>
                    <div class="scm-title-bar"></div>
                    <p class="scm-section-subtitle">服务人社评价机构、央企国企、技工院校、行业协会，覆盖多工种、全技能等级题库开发项目。</p>
                </div>
                <div class="scm-case-partners scm-animate">
                    <span class="scm-case-partner-label">合作单位类型：</span>
                    <div class="scm-case-partner-tags"><span v-for="(p, idx) in caseData.partnerTypes" :key="idx"
                            class="scm-partner-tag"><img :src="p.icon" alt="" />{{ p.label }}</span></div>
                </div>
                <div class="scm-case-table-wrap scm-animate">
                    <h3 class="scm-case-table-title">{{ caseData.tableTitle }}</h3>
                    <div class="scm-case-table-inner">
                        <div v-for="(row, idx) in caseData.tableRows" :key="idx" class="scm-table-card">
                            <div class="scm-table-card-cat">{{ row.category }}</div>
                            <div class="scm-table-card-row">
                                <span class="scm-table-card-label">典型工作</span>
                                <span class="scm-table-card-value">{{ row.jobs }}</span>
                            </div>
                            <div class="scm-table-card-row">
                                <span class="scm-table-card-label">可开发等级</span>
                                <span class="scm-table-card-value">{{ row.levels }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="scm-case-coverage scm-animate"><img src="/assets/images/skillCert/box5-icon2.png"
                            alt="" /><span>中测高科所掌握的工种达所有工种的<strong>95%</strong>以上</span></div>
                </div>
                <div class="scm-case-cards">
                    <div v-for="(c, idx) in caseData.cases" :key="idx" class="scm-case-card scm-animate">
                        <div class="scm-case-card-header"><img
                                :src="['/assets/images/skillCert/box5-img1.png', '/assets/images/skillCert/box5-img2.png', '/assets/images/skillCert/box5-img3.png'][idx]"
                                alt="" class="scm-case-card-bg" /><span class="scm-case-card-label">{{ c.label }}</span>
                        </div>
                        <div class="scm-case-card-body">
                            <h4>{{ c.title }}</h4>
                            <p>{{ c.desc }}</p>
                            <ul>
                                <li v-for="(li, liIdx) in c.items" :key="liIdx">{{ li }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    </div>
</template>

<style scoped>
/* ===== 基础变量 ===== */
.sc-page {
    --sc-blue: #1769E8;
    --sc-blue2: #0F62FE;
    --sc-ink: #152033;
    --sc-muted: #526580;
    --sc-text: #5C5C5C;
    --sc-bg: #f4f7fd;
    font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    color: var(--sc-ink);
}

.container-sc {
    width: min(1200px, calc(100% - 40px));
    margin: 0 auto;
}

/* ===== 滚动动画 ===== */
.sc-animate {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.sc-animate.sc-visible {
    opacity: 1;
    transform: translateY(0);
}

.sc-animate:nth-child(2) {
    transition-delay: 0.1s;
}

.sc-animate:nth-child(3) {
    transition-delay: 0.2s;
}

.sc-animate:nth-child(4) {
    transition-delay: 0.3s;
}

/* ===== 通用标题 ===== */
.sc-section-header {
    margin-bottom: 44px;
}

.sc-section-header-center {
    text-align: center;
}

.sc-section-header h2 {
    font-size: 37px;
    font-weight: 600;
    color: #152033;
    line-height: 52px;
    margin: 0 0 12px;
}

.sc-title-bar {
    width: 36px;
    height: 3px;
    background: linear-gradient(90deg, #1769E8 0%, #20C7E8 100%);
    margin: 0 auto 16px;
    border-radius: 2px;
}

.sc-section-subtitle {
    color: #666;
    font-size: 16px;
    line-height: 1.76;
    margin: 16px auto 0;
    max-width: 700px;
}

/* ===== Banner ===== */
.sc-banner {
    width: 100%;
    height: 514px;
    background: linear-gradient(112deg, #F4F7FD 0%, #EDF4FF 47%, #F7F3FF 100%);
    overflow: hidden;
}

.sc-banner-box {
    position: relative;
    width: 1440px;
    margin: 0 auto;
    height: 100%;
}

.sc-banner-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    width: 1369px;
    height: 514px;
    pointer-events: none;
}

.sc-banner-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.sc-banner-content {
    position: absolute;
    z-index: 2;
    top: 61px;
    left: 50%;
    transform: translate(-50%);
}

.sc-banner-eyebrow {
    font-size: 20px;
    color: #1769E8;
    line-height: 37px;
    font-weight: 500;
    margin-bottom: 6px;
}

.sc-banner-title {
    font-size: 56px;
    font-weight: 700;
    color: #14233B;
    line-height: 76px;
    letter-spacing: 0.1em;
    margin: 0 0 7px;
}

.sc-banner-desc {
    font-size: 18px;
    color: #526580;
    line-height: 33px;
    margin: 0 0 25px;
    max-width: 560px;
}

.sc-banner-actions {
    display: flex;
    align-items: center;
    gap: 16px;
}

.sc-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 52px;
    padding: 12px 28px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    line-height: 1;
}

.sc-btn-icon {
    width: 24px;
    height: 24px;
}

.sc-btn-primary {
    background: var(--sc-blue);
    color: #fff;
}

.sc-btn-primary:hover {
    background: #1258c7;
    box-shadow: 0 6px 20px rgba(23, 105, 232, 0.35);
    transform: translateY(-2px);
}

.sc-btn-outline {
    background: #fff;
    color: #245B9D;
    border: 1px solid #9AB9E5;
}

.sc-btn-outline:hover {
    background: var(--sc-blue);
    color: #fff;
}

.sc-btn-white {
    background: #fff;
    color: var(--sc-blue);
    padding: 16px 36px;
    font-size: 16px;
    font-weight: 600;
}

.sc-btn-white:hover {
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

.sc-banner-visual {
    position: absolute;
    top: 24px;
    right: 151px;
    z-index: 2;
}

.sc-banner-img {
    width: 486px;
    height: 441px;
    object-fit: contain;
}

/* ===== 导航标签 ===== */
.sc-nav-bar {
    width: 100%;
    height: 56px;
    background: #F9FAFB;
    position: sticky;
    top: 76px;
    left: 0;
    z-index: 15;
}

.sc-nav-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 58px;
    height: 100%;
}

.sc-nav-tab {
    font-size: 16px;
    font-weight: 400;
    color: #161616;
    text-decoration: none;
    padding: 16px 0;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
    cursor: pointer;
}

.sc-nav-tab:hover {
    color: var(--sc-blue);
}

.sc-nav-tab-active {
    color: var(--sc-blue);
    border-bottom-color: var(--sc-blue);
}

/* ===== 定义与建设要求区 ===== */
.sc-definition-section {
    position: relative;
    width: 100%;
    background: #f4f7fd;
    padding: 63px 0 85px;
    overflow: hidden;
}

.sc-definition-bg {
    position: absolute;
    top: 136px;
    left: 50%;
    transform: translateX(-50%);
    width: 1488px;
    height: 593px;
    pointer-events: none;
}

.sc-definition-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.sc-definition-section .container-sc {
    position: relative;
    z-index: 2;
}

.sc-definition-content {
    display: flex;
    align-items: flex-start;
    margin-top: -7px;
    background: #fff;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1), 0px 9px 38px 0px rgba(0, 0, 0, 0.07);
    border-radius: 12px;
}

.sc-definition-left {
    flex: 0 0 378px;
    position: relative;
}

.sc-definition-left-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: 1;
    border-radius: 12px 0 0 12px;
}

.sc-def-left-card {
    width: 378px;
    min-height: 477px;
    border-radius: 12px 0 0 12px;
    padding: 32px;
    box-sizing: border-box;
    position: relative;
    z-index: 2;
}

.sc-def-left-card h3 {
    font-size: 20px;
    font-weight: 600;
    color: #152033;
    line-height: 28px;
    margin: 0 0 23px;
}

.sc-def-left-card p {
    font-size: 14px;
    line-height: 23px;
    color: #5C5C5C;
    margin: 0;
}

.sc-def-left-card p span {
    color: #0F62FE;
}

.sc-definition-right {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.sc-def-right-card {
    background: #fff;
    padding: 21px 29px 21px 21px;
    min-height: 220px;
}

.sc-def-right-card:nth-of-type(1) {
    border-right: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
}

.sc-def-right-card:nth-of-type(2) {
    border-bottom: 1px solid #DBDBDB;
    border-radius: 0 12px 0 0;
}

.sc-def-right-card:nth-of-type(3) {
    border-right: 1px solid #DBDBDB;
}

.sc-def-right-card:nth-of-type(4) {
    border-radius: 0 0 12px 0;
}

.sc-def-card-header {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 9px;
}

.sc-def-card-icon {
    width: 57px;
    height: 48px;
    object-fit: contain;
}

.sc-def-card-header h4 {
    font-size: 16px;
    font-weight: 600;
    color: #393939;
    margin: 0;
}

.sc-def-card-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sc-def-card-list li {
    font-size: 14px;
    color: rgba(74, 74, 74, 0.9);
    line-height: 22px;
    margin-bottom: 6px;
    padding-left: 14px;
    position: relative;
}

.sc-def-card-list li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #1769E8;
}

/* ===== 核心能力区 ===== */
.sc-core-section {
    padding: 51px 0 64px;
    background: #fff;
}

.sc-core-cards {
    display: flex;
    gap: 52px;
    margin-bottom: 50px;
}

.sc-core-card {
    flex: 1;
    background: #fff;
    border-radius: 20px;
    border: 1px solid #E7EDF6;
    box-shadow: 0px 10px 34px 0px rgba(43, 76, 125, 0.07);
    overflow: hidden;
}

.sc-core-card-header {
    position: relative;
    border-radius: 12px;
    margin: 13px 13px 0;
    padding: 22px;
    height: 149px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.sc-core-header-bg {
    position: absolute;
    inset: 0;
    width: 531px;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
}

.sc-core-card-header h3 {
    position: relative;
    z-index: 2;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    margin: 0 0 12px;
}

.sc-core-card-header p {
    position: relative;
    z-index: 2;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
    line-height: 22px;
    margin: 0;
    max-width: 331px;
}

.sc-core-list {
    list-style: none;
    padding: 21px 13px 30px;
    margin: 0;
}

.sc-core-list li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 11px;
    margin-bottom: 24px;
    font-size: 14px;
    color: #505050;
    line-height: 20px;
}

.sc-core-list li:nth-last-child(1) {
    margin-bottom: 0;
}

.sc-list-icon {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    margin-top: 2px;
}

.sc-core-bottom {
    margin-top: 0;
}

.sc-core-bottom-title {
    font-size: 20px;
    font-weight: 700;
    color: #24324A;
    margin: 0 0 21px;
}

.sc-core-bottom-cards {
    display: flex;
    gap: 32px;
}

.sc-core-bottom-card {
    flex: 1;
    background: linear-gradient(135deg, #1769E8 0%, #3288F5 100%);
    box-shadow: 0px 7px 18px 0px rgba(23, 105, 232, 0.22);
    border-radius: 6px;
    padding: 20px 24px;
}

.sc-bottom-card-header {
    display: flex;
    align-items: center;
    gap: 4px;
}

.sc-bottom-card-icon {
    width: 32px;
    height: 32px;
    margin-bottom: 10px;
}

.sc-core-bottom-card h4 {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    margin: 0 0 8px;
}

.sc-core-bottom-card p {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.85);
    line-height: 20px;
    margin: 0;
}

/* ===== 交付优势区 ===== */
.sc-advantages-section {
    position: relative;
    width: 100%;
    height: 636px;
    padding: 62px 0 80px;
    overflow: hidden;
    background: #fff;
}

.sc-advantages-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 636px;
    pointer-events: none;
}

.sc-advantages-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.sc-advantages-section .container-sc {
    position: relative;
    z-index: 2;
}

.sc-advantages-cards {
    display: flex;
    gap: 19px;
}

.sc-advantage-card {
    flex: 1;
    background: #fff;
    border-radius: 6px;
    border: 1px solid #E7EDF6;
    box-shadow: 0px 10px 34px 0px rgba(43, 76, 125, 0.07);
    overflow: hidden;
}

.sc-advantage-header {
    position: relative;
    border-radius: 6px 6px 0 0;
    padding: 16px 25px;
    min-height: 120px;
    display: flex;
    flex-direction: column;
}

.sc-advantage-header-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px 6px 0 0;
}

.sc-advantage-header h3 {
    position: relative;
    z-index: 2;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    margin: 0;
    line-height: 25px;
}

.sc-advantage-header p {
    position: relative;
    z-index: 2;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    line-height: 25px;
    margin: 0 0 14px;
}

.sc-advantage-body {
    padding: 25px 23px 18px;
}

.sc-advantage-desc {
    font-size: 14px !important;
    line-height: 20px !important;
    font-weight: normal !important;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 !important;
}

.sc-advantage-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sc-advantage-list li {
    font-size: 14px;
    color: #505050;
    line-height: 20px;
    margin-bottom: 20px;
    padding-left: 14px;
    position: relative;
}

.sc-advantage-list li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #505050;
}

/* ===== 全流程区 ===== */
.sc-process-section {
    position: relative;
    width: 100%;
    height: 360px;
    background: linear-gradient(125deg, #003399 0%, #0052D9 40%, #0050C0 100%);
    padding: 53px 0 62px;
    overflow: hidden;
    display: flex;
    align-items: center;
}

.sc-process-bg-left {
    position: absolute;
    bottom: 0;
    left: -15px;
    width: 189px;
    height: 121px;
    pointer-events: none;
}

.sc-process-bg-left img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.sc-process-bg-right {
    position: absolute;
    top: 0;
    right: -66px;
    width: 189px;
    height: 121px;
    pointer-events: none;
}

.sc-process-bg-right img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.sc-process-section .container-sc {
    position: relative;
    z-index: 2;
    width: 100%;
}

.sc-process-title {
    color: #fff !important;
}

.sc-title-bar-light {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 100%) !important;
}

.sc-process-steps {
    display: flex;
    justify-content: center;
    gap: 0;
}

.sc-process-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: -5px;
}

.sc-process-icon {
    width: 72px;
    height: 72px;
    margin-bottom: 8px;
}

.sc-process-step-text {
    text-align: center;
    max-width: 105px;
}

.sc-process-step-title {
    display: block;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    margin-bottom: 3px;
}

.sc-process-step-desc {
    display: block;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 18px;
}

.sc-process-arrow {
    width: 32px;
    height: 9px;
    margin: 50px 50px 0;
}

/* ===== 交付案例区 ===== */
.sc-cases-section {
    position: relative;
    width: 100%;
    min-height: 1203px;
    background: linear-gradient(180deg, #F3F7FF 0%, #EAF4FF 100%);
    padding: 56px 0 52px;
    overflow: hidden;
}

.sc-cases-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1615px;
    height: 1203px;
    pointer-events: none;
}

.sc-cases-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.sc-cases-section .container-sc {
    position: relative;
    z-index: 2;
}

.sc-case-partners {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 22px;
    flex-wrap: wrap;
}

.sc-case-partner-label {
    font-size: 14px;
    color: #152033;
    font-weight: 500;
}

.sc-case-partner-tags {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
}

.sc-partner-tag {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 13px 25px;
    background: rgba(26, 92, 255, 0.08);
    border: 1px solid #E8ECF1;
    border-radius: 50px;
    font-size: 13px;
    color: #152033;
    font-weight: 500;
}

.sc-partner-tag img {
    width: 20px;
    height: 20px;
}

.sc-case-table-wrap {
    background: #fff;
    border-radius: 12px;
    padding: 25px 24px 27px;
    margin-bottom: 28px;
}

.sc-case-table-title {
    font-size: 18px;
    font-weight: 600;
    color: #0F172A;
    line-height: 23px;
    margin: 0 0 17px;
}

.sc-case-table-inner {
    background: #f9fafe;
    border-radius: 6px;
    padding: 22px 38px 8px;
}

.sc-case-table-header {
    display: grid;
    grid-template-columns: auto 226px auto 454px 1fr;
    align-items: center;
    padding-bottom: 13px;
}

.sc-table-col {
    font-size: 16px;
    font-weight: 500;
    color: #0F62FE;
}

.sc-table-col-cat {
    /* grid column 1 */
}

.sc-table-arrow1 {
    width: 120px;
    height: 9px;
    margin: 0 53px;
    /* grid column 2: 53+120+53 = 226px */
}

.sc-table-arrow2 {
    width: 360px;
    height: 9px;
    margin: 0 41px 0 53px;
    /* grid column 4: 53+360+41 = 454px */
}

.sc-case-table-body {
    margin-top: 0;
}

.sc-table-row {
    display: grid;
    grid-template-columns: auto 226px auto 454px 1fr;
    align-items: center;
    padding: 8px 0;
}

.sc-table-row .sc-table-col-cat {
    grid-column: 1 / 3;
    /* col + arrow1 */
}

.sc-table-row .sc-table-col-job {
    grid-column: 3 / 5;
    /* col + arrow2 */
}

.sc-table-col-job-multiline {
    padding-left: 65px;
}

.sc-table-row .sc-table-col-level {
    grid-column: 5 / 6;
    /* remaining */
}

.sc-table-col-level-multiline {
    padding-left: 165px;
}

.sc-table-row:last-child {
    border-bottom: none;
}

.sc-table-row .sc-table-col {
    font-size: 14px;
    font-weight: 500;
    color: #24324A;
}

.sc-case-coverage {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
}

.sc-case-coverage img {
    width: 32px;
    height: 32px;
}

.sc-case-coverage span {
    font-size: 16px;
    color: #65738B;
}

.sc-case-coverage strong {
    font-size: 20px;
    color: #0F62FE;
    font-weight: 600;
}

.sc-case-cards {
    display: flex;
    gap: 17px;
}

.sc-case-card {
    flex: 1;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid #E2E8F0;
    border-radius: 16px;
    overflow: hidden;
}

.sc-case-card-header {
    position: relative;
    height: 115px;
}

.sc-case-card-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px 16px 0 0;
}

.sc-case-card-label {
    position: absolute;
    top: 16px;
    left: 16px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 100px;
    padding: 4px 12px 4px 12px;
    font-size: 12px;
    font-weight: 600;
    color: #0F172A;
}

.sc-case-card-body {
    padding: 20px 24px 29px;
}

.sc-case-card-body h4 {
    font-size: 18px;
    font-weight: 700;
    color: #0F172A;
    line-height: 23px;
    margin: 0 0 7px;
}

.sc-case-card-body p {
    font-size: 14px;
    color: #64748B;
    line-height: 21px;
    margin: 0 0 15px;
}

.sc-case-card-body ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sc-case-card-body li {
    font-size: 14px;
    color: #505050;
    line-height: 22px;
    margin-bottom: 22px;
    padding-left: 14px;
    position: relative;
}

.sc-case-card-body li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #505050;
}

/* ===== CTA区 ===== */
.sc-cta-section {
    padding: 70px 0;
    background: linear-gradient(135deg, #1769E8 0%, #3288F5 100%);
}

.sc-cta-content {
    text-align: center;
    position: relative;
}

.sc-cta-line {
    width: 60px;
    height: 3px;
    background: rgba(255, 255, 255, 0.5);
    margin: 0 auto 20px;
    border-radius: 2px;
}

.sc-cta-content h2 {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 12px;
}

.sc-cta-content p {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 30px;
}

/* ===== 移动端：默认隐藏 ===== */
.scm-page {
    display: none;
}

@media (max-width: 1024px) {
    .sc-page {
        display: none;
    }

    .scm-page {
        display: block;
    }
}

/* ===== 移动端样式 ===== */
.scm-page {
    --scm-blue: #1769E8;
    --scm-ink: #152033;
    font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    color: var(--scm-ink);
    overflow-x: clip;
}

.scm-container {
    width: min(100% - 32px, 750px);
    margin: 0 auto;
}

/* 移动端滚动动画 */
.scm-animate {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.scm-animate.scm-visible {
    opacity: 1;
    transform: translateY(0);
}

/* 移动端通用标题 */
.scm-section-header {
    margin-bottom: 28px;
}

.scm-section-header-center {
    text-align: center;
}

.scm-section-header h2 {
    font-size: 24px;
    font-weight: 600;
    color: #152033;
    line-height: 34px;
    margin: 0 0 10px;
}

.scm-title-bar {
    width: 36px;
    height: 3px;
    background: linear-gradient(90deg, #1769E8 0%, #20C7E8 100%);
    margin: 0 auto 12px;
    border-radius: 2px;
}

.scm-title-bar-light {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 100%) !important;
}

.scm-section-subtitle {
    color: #666;
    font-size: 14px;
    line-height: 1.6;
    margin: 12px auto 0;
    max-width: 100%;
}

/* 移动端 Banner */
.scm-banner {
    width: 100%;
    background: linear-gradient(112deg, #F4F7FD 0%, #EDF4FF 47%, #F7F3FF 100%);
    padding: 32px 0 24px;
}

.scm-banner-content {
    margin-bottom: 20px;
}

.scm-banner-eyebrow {
    font-size: 15px;
    color: #1769E8;
    line-height: 24px;
    font-weight: 500;
    margin-bottom: 8px;
}

.scm-banner-title {
    font-size: 28px;
    font-weight: 700;
    color: #14233B;
    line-height: 38px;
    margin: 0 0 12px;
}

.scm-banner-desc {
    font-size: 14px;
    color: #526580;
    line-height: 24px;
    margin: 0 0 20px;
}

.scm-banner-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.scm-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
    border: none;
    line-height: 1;
}

.scm-btn-icon {
    width: 20px;
    height: 20px;
}

.scm-btn-primary {
    background: var(--scm-blue);
    color: #fff;
}

.scm-btn-outline {
    background: transparent;
    color: var(--scm-blue);
    border: 1px solid var(--scm-blue);
}

.scm-btn-white {
    background: #fff;
    color: var(--scm-blue);
    padding: 14px 28px;
    font-size: 15px;
    font-weight: 600;
}

.scm-banner-visual {
    text-align: center;
}

.scm-banner-visual img {
    width: 80%;
    max-width: 360px;
    height: auto;
}

/* 移动端导航 */
.scm-nav-bar {
    width: 100%;
    background: #F4F7FB;
    position: sticky;
    top: 66px;
    left: 0;
    z-index: 15;
    border-bottom: 1px solid #ECEFF3;
}

@media (max-width: 560px) {
    .scm-nav-bar {
        top: 56px;
    }
}

.scm-nav-scroll {
    display: flex;
    align-items: center;
    gap: 4px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding: 0 8px;
    scrollbar-width: none;
}

.scm-nav-scroll::-webkit-scrollbar {
    display: none;
}

.scm-nav-tab {
    flex: 0 0 auto;
    scroll-snap-align: center;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    text-decoration: none;
    padding: 13px 10px;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
    transition: color 0.2s ease;
}

.scm-nav-tab-active {
    color: var(--scm-blue);
    border-bottom-color: var(--scm-blue);
}

/* 移动端 Section */
.scm-section {
    padding: 40px 0;
    position: relative;
}

/* 移动端定义区 */
.scm-definition-section {
    background: #f4f7fd;
    padding: 40px 0;
}

.scm-definition-bg {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 750px;
    pointer-events: none;
    opacity: 0.3;
}

.scm-definition-bg img {
    width: 100%;
    height: auto;
}

.scm-def-left-card {
    background: url('/assets/images/skillCert/box-bg.png') no-repeat center/cover;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 20px;
}

.scm-def-left-card h3 {
    font-size: 18px;
    font-weight: 600;
    color: #152033;
    line-height: 26px;
    margin: 0 0 16px;
}

.scm-def-left-card p {
    font-size: 13px;
    line-height: 22px;
    color: #5C5C5C;
    margin: 0;
}

.scm-def-right-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;
}

.scm-def-right-card {
    background: #fff;
    border-radius: 12px;
    padding: 18px 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.scm-def-card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
}

.scm-def-card-icon {
    width: 40px;
    height: 34px;
    object-fit: contain;
}

.scm-def-card-header h4 {
    font-size: 15px;
    font-weight: 600;
    color: #393939;
    margin: 0;
}

.scm-def-card-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.scm-def-card-list li {
    font-size: 13px;
    color: rgba(74, 74, 74, 0.9);
    line-height: 20px;
    margin-bottom: 5px;
    padding-left: 12px;
    position: relative;
}

.scm-def-card-list li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #1769E8;
}

/* 移动端核心能力区 */
.scm-core-section {
    background: #fff;
}

.scm-core-card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #E7EDF6;
    box-shadow: 0px 10px 34px 0px rgba(43, 76, 125, 0.07);
    overflow: hidden;
    margin-bottom: 20px;
}

.scm-core-card-header {
    position: relative;
    border-radius: 12px;
    margin: 10px 10px 0;
    padding: 18px;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.scm-core-header-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
}

.scm-core-card-header h3 {
    position: relative;
    z-index: 2;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
    margin: 0 0 8px;
}

.scm-core-card-header p {
    position: relative;
    z-index: 2;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.9);
    line-height: 20px;
    margin: 0;
    max-width: 90%;
}

.scm-core-list {
    list-style: none;
    padding: 16px 10px 24px;
    margin: 0;
}

.scm-core-list li {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 8px;
    margin-bottom: 18px;
    font-size: 13px;
    color: #505050;
    line-height: 20px;
}

.scm-list-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-top: 2px;
}

.scm-core-bottom {
    margin-top: 10px;
}

.scm-core-bottom-title {
    font-size: 18px;
    font-weight: 700;
    color: #24324A;
    margin: 0 0 16px;
}

.scm-core-bottom-cards {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.scm-core-bottom-card {
    background: linear-gradient(135deg, #1769E8 0%, #3288F5 100%);
    box-shadow: 0px 7px 18px 0px rgba(23, 105, 232, 0.22);
    border-radius: 6px;
    padding: 16px 20px;
}

.scm-bottom-card-header {
    display: flex;
    align-items: center;
    gap: 4px;
}

.scm-bottom-card-icon {
    width: 28px;
    height: 28px;
    margin-bottom: 0;
}

.scm-core-bottom-card h4 {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    margin: 0 0 6px;
}

.scm-core-bottom-card p {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.85);
    line-height: 18px;
    margin: 0;
}

/* 移动端交付优势区 */
.scm-advantages-section {
    background: #f4f7fd;
}

.scm-advantages-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 750px;
    pointer-events: none;
    opacity: 0.2;
}

.scm-advantages-bg img {
    width: 100%;
    height: auto;
}

.scm-advantages-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.scm-advantage-card {
    background: #fff;
    border-radius: 6px;
    border: 1px solid #E7EDF6;
    box-shadow: 0px 10px 34px 0px rgba(43, 76, 125, 0.07);
    overflow: hidden;
}

.scm-advantage-header {
    position: relative;
    background: url('/assets/images/skillCert/box3-bg.png') no-repeat center/cover;
    border-radius: 6px 6px 0 0;
    padding: 14px 20px;
    min-height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

.scm-advantage-header-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px 6px 0 0;
}

.scm-advantage-header h3 {
    position: relative;
    z-index: 2;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    margin: 0;
}

.scm-advantage-header p {
    position: relative;
    z-index: 2;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    line-height: 22px;
    margin: 2px 0 0;
}

.scm-advantage-body {
    padding: 18px 16px 14px;
}

.scm-advantage-desc {
    font-size: 13px !important;
    line-height: 20px !important;
    font-weight: normal !important;
    color: rgba(255, 255, 255, 0.8);
    margin: 2px 0 0 !important;
}

.scm-advantage-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.scm-advantage-list li {
    font-size: 13px;
    color: #505050;
    line-height: 20px;
    margin-bottom: 14px;
    padding-left: 12px;
    position: relative;
}

.scm-advantage-list li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #1769E8;
}

/* 移动端全流程区 */
.scm-process-section {
    background: linear-gradient(125deg, #003399 0%, #0052D9 40%, #0050C0 100%);
}

.scm-process-bg-left {
    position: absolute;
    bottom: 0;
    left: -10px;
    width: 120px;
    pointer-events: none;
}

.scm-process-bg-left img {
    width: 100%;
    height: auto;
}

.scm-process-bg-right {
    position: absolute;
    top: 0;
    right: -30px;
    width: 120px;
    pointer-events: none;
}

.scm-process-bg-right img {
    width: 100%;
    height: auto;
}

.scm-process-title {
    color: #fff !important;
}

.scm-process-steps {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.scm-process-step {
    display: flex;
    align-items: center;
    gap: 14px;
}

.scm-process-icon {
    width: 56px;
    height: 56px;
    flex-shrink: 0;
}

.scm-process-step-text {
    flex: 1;
}

.scm-process-step-title {
    display: block;
    font-size: 15px;
    font-weight: 500;
    color: #fff;
    margin-bottom: 2px;
}

.scm-process-step-desc {
    display: block;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 18px;
}

.scm-process-arrow {
    display: none;
}

/* 移动端交付案例区 */
.scm-cases-section {
    background: #e9f1fc;
}

.scm-cases-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 750px;
    pointer-events: none;
    opacity: 0.3;
}

.scm-cases-bg img {
    width: 100%;
    height: auto;
}

.scm-case-partners {
    margin-bottom: 16px;
}

.scm-case-partner-label {
    display: block;
    font-size: 13px;
    color: #152033;
    font-weight: 500;
    margin-bottom: 10px;
}

.scm-case-partner-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.scm-partner-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    background: rgba(26, 92, 255, 0.08);
    border: 1px solid #E8ECF1;
    border-radius: 50px;
    font-size: 12px;
    color: #152033;
    font-weight: 500;
}

.scm-partner-tag img {
    width: 16px;
    height: 16px;
}

.scm-case-table-wrap {
    background: #fff;
    border-radius: 12px;
    padding: 20px 16px;
    margin-bottom: 20px;
}

.scm-case-table-title {
    font-size: 16px;
    font-weight: 600;
    color: #0F172A;
    line-height: 22px;
    margin: 0 0 14px;
}

.scm-case-table-inner {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.scm-table-card {
    background: #F8FAFC;
    border-radius: 8px;
    padding: 14px 16px;
    border: 1px solid #EDF0F5;
}

.scm-table-card-cat {
    font-size: 15px;
    font-weight: 600;
    color: #0F172A;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid #EDF0F5;
}

.scm-table-card-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 5px;
}

.scm-table-card-row:last-child {
    margin-bottom: 0;
}

.scm-table-card-label {
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 500;
    color: #0F62FE;
    line-height: 20px;
}

.scm-table-card-value {
    font-size: 13px;
    color: #38475A;
    line-height: 20px;
}

.scm-case-coverage {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
}

.scm-case-coverage img {
    width: 28px;
    height: 28px;
}

.scm-case-coverage span {
    font-size: 14px;
    color: #65738B;
}

.scm-case-coverage strong {
    font-size: 18px;
    color: #0F62FE;
    font-weight: 600;
}

.scm-case-cards {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.scm-case-card {
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid #E2E8F0;
    border-radius: 16px;
    overflow: hidden;
}

.scm-case-card-header {
    position: relative;
    height: 100px;
}

.scm-case-card-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px 16px 0 0;
}

.scm-case-card-label {
    position: absolute;
    top: 12px;
    left: 12px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 100px;
    padding: 3px 10px;
    font-size: 11px;
    font-weight: 600;
    color: #0F172A;
}

.scm-case-card-body {
    padding: 16px 18px 22px;
}

.scm-case-card-body h4 {
    font-size: 16px;
    font-weight: 700;
    color: #0F172A;
    line-height: 22px;
    margin: 0 0 6px;
}

.scm-case-card-body p {
    font-size: 13px;
    color: #64748B;
    line-height: 20px;
    margin: 0 0 12px;
}

.scm-case-card-body ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.scm-case-card-body li {
    font-size: 13px;
    color: #505050;
    line-height: 20px;
    margin-bottom: 16px;
    padding-left: 12px;
    position: relative;
}

.scm-case-card-body li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #1769E8;
}


</style>
