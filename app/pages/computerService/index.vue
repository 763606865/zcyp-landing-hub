<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// @ts-ignore
const source = useCampaignSource()
// @ts-ignore
const contactRoute = computed(() => getContactRoute(9, source.value))

const navTabs = [
    { label: '研发背景', target: 'cs-research' },
    { label: '产品介绍', target: 'cs-product' },
    { label: '核心功能', target: 'cs-core' },
    { label: '服务优势', target: 'cs-advantage' },
    { label: '数据实力', target: 'cs-data' },
    { label: '服务共享', target: 'cs-share' },
]
const activeNav = ref('cs-research')

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

const csSection = ref<HTMLElement>()
const observerOptions = { threshold: 0.12 }

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    if (csSection.value) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('cs-visible')
                    observer.unobserve(entry.target)
                }
            })
        }, observerOptions)
        csSection.value.querySelectorAll('.cs-animate').forEach(el => {
            observer.observe(el as HTMLElement)
        })
    }
})

const researchBlocks = [
    {
        title: '政策支持',
        content: '机关事业单位以及国有企业的职称评审流程中逐步规范水平能力测试，且鼓励采用标准化在线考试形式，替代传统线下笔试，以提升评审选拔的客观性与效率。这一需求导向，为职称评审工作提出了新的要求，也推动了相关配套产品的研发与应用，特别是对测试过程的规范性、可控性提出更高标准，同时也逐步将水平能力测试评审流程由系统内转向委托第三方交付。'
    },
    {
        title: '行业缺口',
        content: '市面上缺乏专门适配机关事业单位以及国有企业职称评审标准的在线测试系统，多为通用考试工具，存在考点针对性不足、无法满足"按名次筛选"核心需求等问题，更缺乏配套的全流程监控指挥功能。中测高科凭借多年机关职称测评数据经验积累，精准把握行业缺口，开发出符合新规要求的标准化在线筛选系统，并创新融入监控指挥平台，填补了行业内"测试+管理"一体化解决方案的空白'
    },
]

const researchBlocks1 =
    [
        { label: '组织效率提升需求', content: '初级、中级职称申报人员基数大，传统线下笔试存在场地安排难、监考成本高、阅卷周期长等问题，组织效率低下。在线测试结合监控指挥平台，可实时把控测试全流程，降低人工干预成本，简化组织流程，大幅提高工作效率。' },
        { label: '精准筛选需求', content: '传统职称评定筛选缺乏标准化工具，依赖人工初核，效率低且主观性强。在线测试系统搭配监控指挥平台，不仅能输出标准化成绩排名，还能对测试数据进行智能分析，为职称评审精准筛选候选人员，同时实时预警异常情况，确保评审资源合理分配。' },
        { label: '风险防控需求', content: '传统在线测试易出现考生作弊、数据泄露、流程失控等风险，缺乏有效监控手段。监控指挥平台通过实时数据推送、异常行为识别，提前规避风险，保障测试过程的公平性与安全性，解决机关事业单位对在线测试"可控性不足"的担忧。' },
    ]

const productBlocks = [
    {
        icon: '/assets/images/computerService/box2-icon1.png',
        title: '产品定位',
        content: '本产品专为全国各省、市（州）、县（区）机关事业单位以及国有企业专业技术人员水平能力测试以及技能等级考核打造，以"灵活适配 、安全稳定、服务全流程"为核心，通过本地化技术部署、多专业精准匹配与标准化服务体系，满足不同地区自主组织考试的需求，保障考试公平性、数据安全性与组织高效性，助力各地完成专业技术人员水平能力评估工作。'
    },
    {
        icon: '/assets/images/computerService/box2-icon2.png',
        title: '核心用途',
        items: [
            { title: '水平能力测试', content: '作为初级、中级职称评审的必经环节，通过在线测试获取申报人员的水平能力数据，按测试成绩确定进入后续评审的人员名单。以名次为核心筛选依据，避免评审资源浪费。' },
            { title: '全流程监控管理', content: '借助监控指挥平台，人事部门可实时掌握测试全局，从考生登录、答题进度到阅卷状态、成绩生成，每个环节的数据都实时同步至平台，异常情况自动预警。' },
        ]
    },
    {},
    {
        icon: '/assets/images/computerService/box2-icon3.png',
        title: '适配场景',
        last: true,
        subIcons: [
            '/assets/images/computerService/box2-icon3-1.png',
            '/assets/images/computerService/box2-icon3-2.png',
            '/assets/images/computerService/box2-icon3-3.png',
        ],
        items: [
            { title: '层级适配', content: '适配全国各省、地市、州自主组织的机关事业单位专业技术人员水平能力测试及技能等级考核工作，支撑不同层级的统一测评部署。' },
            { title: '专业适配', content: '涵盖综合系列初、中级，卫生系列初、中、高级，教育系列初、中、高级；针对各地多元专业分类需求，依托智能题库系统，灵活匹配不同专业的测评内容。' },
            { title: '流程适配', content: '满足各地从报名、考试到成绩管理、合规存档的全流程需求，适用于各类规模的测评活动。' },
        ]
    },
]

const coreFeatures = [
    {
        icon: '/assets/images/computerService/box3-icon1.png',
        title: '测试组织管理',
        items: [
            { label: '考生信息管理', content: '支持批量导入考生姓名、职称申报等级、专业、部门等信息，自动生成账号与初始密码，可导出分发。' },
            { label: '测试场次设置', content: '可分批次、分职称等级配置测试信息，包括开始/结束时间、答题时长、考场个性化规则等。' },
            { label: '测试通知推送', content: '自动通过短信、单位内部系统推送测试时间、登录方式、注意事项等通知。' },
        ]
    },
    {
        icon: '/assets/images/computerService/box3-icon2.png',
        title: '考生答题系统',
        items: [
            { label: '界面简洁易用', content: '答题界面仅展示题目、选项、进度条等核心内容，0无关干扰。支持字体缩放、疑问题目标记、答题进度实时保存。' },
            { label: '防作弊机制', content: '内置禁止复制粘贴、随机打乱题目与选项顺序、核心霸屏锁定屏幕等措施，杜绝切屏作弊。' },
            { label: '异常处理支持', content: '电脑运行卡顿、停电断电、网络中断时自动保存进度，恢复后可续答。' },
        ]
    },
    {
        icon: '/assets/images/computerService/box3-icon3.png',
        title: '阅卷管理',
        items: [
            { label: '自动阅卷功能', content: '测试结束后系统自动判分，无需人工干预，大幅缩短周期。结果实时同步平台。' },
            { label: '人工复核通道', content: '可筛选名次临界、异常标记等特定考生重点复核，查看答题原始记录，复核结果自动覆盖原分数并同步更新。' },
            { label: '阅卷进度监控', content: '平台实时展示自动阅卷、人工复核进度及未完成题目分布，确保按时完成。' },
        ]
    },
    {
        icon: '/assets/images/computerService/box3-icon4.png',
        title: '监控指挥',
        items: [
            { label: '实时数据可视化', content: '数据大屏实时展示考生登录率、答题进度、交卷人数、阅卷完成率、成绩排名动态等关键数据。' },
            { label: '智能异常预警', content: '自动识别超时未交卷、异常IP登录、单题答题时长异常等考生行为，及时推送预警并标记相关考生。' },
            { label: '全流程可追溯', content: '记录考生注册、答题、阅卷、成绩生成、公示各环节操作，形成完整数据链条。' },
        ]
    },
    {
        icon: '/assets/images/computerService/box3-icon5.png',
        title: '统计分析',
        items: [
            { label: '多维度分析', content: '联合监控指挥平台开展多维度统计分析，输出各职称系列平均分、最高分、最低分。' },
            { label: '知识点正确率', content: '分析不同知识点正确率，各部门成绩分布等数据，帮助人事部门了解申报人员整体能力水平。' },
            { label: '优化参考', content: '发现知识薄弱点，为优化职称评审标准和测试内容提供参考。' },
        ]
    },
    {
        icon: '/assets/images/computerService/box3-icon6.png',
        title: '成绩管理',
        items: [
            { label: '成绩自动生成', content: '自动按分数高低排序，生成包含姓名、申报职称、成绩、名次的排名表，数据实时同步平台。' },
            { label: '成绩公示管理', content: '提供标准化公示模板，可自定义公示条件。平台记录公示时间、查看人数，公示期间接收考生异议反馈并处理。' },
            { label: '成绩导出归档', content: '支持将排名表、个人成绩报告导出为Excel、PDF格式，记录导出人员、时间、内容，保障数据安全可追溯。' },
        ]
    },
]

const advantageCards = [
    {
        icon: '/assets/images/computerService/box4-icon1.png',
        title: '多专业灵活适配',
        content: '系统具备稳定的专业适配能力，依托江西省人力资源开发研究院、重庆西部人力资源开发研究院等中测高科旗下6家学术研究机构，可快速响应全国所有地区的专业分类需求，灵活配置专业类目与对应题库。无论是电工、计算机系统操作工、护理员等高频工种，还是地方特色专业类目，均能实现精准匹配与快速部署。',
        subItems: [],
    },
    {
        icon: '/assets/images/computerService/box4-icon2.png',
        title: '本地化局域网部署',
        subItems: [
            { icon: '/assets/images/computerService/box4-icon5.png', title: '专属封闭环境搭建', content: '服务商派遣专业技术团队赴考试现场，搭建本地服务器与独立局域网，所有考试电脑完全切断外部互联网连接，从物理层面杜绝外接网络作弊风险。' },
            { icon: '/assets/images/computerService/box4-icon6.png', title: '全程技术包办', content: '技术人员全权负责考前系统安装、对应专业试题精准导入、后台考务参数配置，无需用户投入技术人力，确保考前准备工作高效准确。' },
        ]
    },
    {
        icon: '/assets/images/computerService/box4-icon3.png',
        title: '全流程服务与合规存档保障',
        subItems: [
            { icon: '/assets/images/computerService/box4-icon7.png', title: '双版本成绩交付', content: '考试结束后，同步提供只读电子版成绩报表及加盖服务商公章的纸质版成绩册，纸质版满足各级机关事业单位正式档案存档的合规性要求，具备法律效力。' },
            { icon: '/assets/images/computerService/box4-icon8.png', title: '全周期技术支持', content: '从考前部署、考中突发问题响应（如设备故障、系统调试）到考后数据导出交付，技术人员可全程在场跟进，确保各地多场次、大规模考试按计划顺畅进行。' },
        ]
    },
    {
        icon: '/assets/images/computerService/box4-icon4.png',
        title: '智能高效的考试与成绩管理',
        subItems: [
            { icon: '/assets/images/computerService/box4-icon9.png', title: '考前精准分类', content: '支持按考生个人信息提前划分专业类别，系统题库与考生专业自动关联，考生登录后直接进入对应科目考试界面。' },
            { icon: '/assets/images/computerService/box4-icon10.png', title: '考后智能核算', content: '考后可根据委托方设置的条件，智能生成定制化成绩册，支持导出多种格式，方便委托方直接使用或进一步分析。' },
            { icon: '/assets/images/computerService/box4-icon11.png', title: '安全数据交付', content: '提供只读模式Excel成绩报表，防止数据篡改，保障服务商与用户双方权益；用户需编辑时，可复制数据至新建表格操作。' },
        ]
    },
    {
        icon: '/assets/images/computerService/box4-icon12.png',
        title: '稳定可靠的系统性能支撑',
        content: '系统经过多地区大规模考试验证，具备极强的稳定性与并发处理能力，可支持单场数万人次同步考试，且在断网等突发情况下保障数据不丢失。同时支持与考生数据库、身份核验系统等对接，进一步提升考务管理效率与考试严肃性。',
        subItems: [],
    },
]

const shareItems = [
    { icon: '/assets/images/computerService/box7-icon1.png', text: '北京（研发总部）：北京市朝阳区朝阳门南大街10号科锐国际' },
    { icon: '/assets/images/computerService/box7-icon2.png', text: '南昌（运营总部）：南昌市红谷滩区九龙湖绿地卢塞恩小镇7栋' },
    { icon: '/assets/images/computerService/box7-icon3.png', text: '邮箱：zhongce@zhongcegaoke.com' },
]

const branchOffices = [
    { city: '北京', phone: '13970941607', address: '北京市朝阳区朝阳门南大街10号科锐国际' },
    { city: '江苏', phone: '18070080864', email: '2407457624@qq.com', address: '江苏省南京市浦口区鲲鹏大厦A座十楼科锐国际' },
    { city: '天津', phone: '18088139892', email: '3053595705@qq.com' },
    { city: '河南', phone: '18610501296', email: '18610501296@126.com', address: '郑州市金水区红专路109号金成商务大厦7楼' },
    { city: '江西', phone: '17770081545', email: '1904556152@qq.com', address: '南昌市红谷滩区绿地卢塞恩文旅小镇7栋' },
    { city: '浙江', phone: '19157770053', email: '331289000@qq.com', address: '杭州市拱墅区中国杭州人力资源产业园北楼12层' },
]

const box5Data = [
    {
        label: '教育校园场景',
        content: [
            {
                title: '1、校内日常教学测评',
                content: '单元测验、随堂测试、课后作业、阶段月考、期中期末考试；支持客观题自动阅卷，主观题线上阅卷，快速统计班级学情，导出错题、得分率报表。'
            },
            {
                title: '2、大型校内统考',
                content: '学业水平模拟考、分班考试、专升本模拟、期末大规模统考，可局域网断网考试，防止外网作弊，适合机房集中上机。'
            },
            {
                title: '3、竞赛与选拔赛 ',
                content: '学科竞赛、科创选拔、校内评优选拔考试，自动排名，快速筛选人才。'
            }
        ]
    },
    {
        label: '人事人才 & 职业考务场景',
        content: [
            {
                title: '1、公职、事业单位、国企招考',
                content: '公开招聘笔试、人才引进考试、遴选考试，大规模考生同时在线，支持身份核验、防切屏、人脸识别监考，统一阅卷归档。'
            },
            {
                title: '2、职业资格、技能等级考试',
                content: '各类职业证书考试、技能等级认定、安全员、财会、人力资源等标准化机考；可设置随机抽题，实现一人一卷，降低泄题风险。'
            },
            {
                title: '3、人才测评 ',
                content: '入职测评、能力素质测评、心理测评，不用纸质试卷，考完即时输出测评报告。'
            }
        ]
    },
    {
        label: '企业内部场景',
        content: [
            {
                title: '1、员工入职考核',
                content: '新员工笔试，岗位知识、规章制度考核，批量筛选候选人。'
            },
            {
                title: '2、在岗培训考核',
                content: '岗位技能考试、安全生产考试、合规风控考试、制度学习结业考试，线上完成培训 + 考试闭环。'
            },
            {
                title: '3、内部竞聘、晋升考核',
                content: '内部岗位竞聘、干部选拔笔试，统一标准，成绩留痕便于人事存档。'
            }
        ]
    },
    {
        label: '特殊线下 / 线上混合场景',
        content: [
            {
                title: '1、线下机房集中机考',
                content: '考场统一电脑，局域网模式，断网运行，杜绝网络抄答案，适合高保密等级考试。'
            },
            {
                title: '2、居家远程线上考试',
                content: '考生在家电脑 / 手机作答，配合双摄像头监考、人脸识别、切屏检测、屏幕录制，实现远程防作弊，不用集中到考场。支持身份核验，确保考试公平公正。'
            },
            {
                title: '3、移动端轻量化考试',
                content: '手机平板答题，适合简单问卷、小测验、普法答题、知识竞赛。'
            }
        ]
    },
    {
        label: '社会培训机构场景',
        content: [
            {
                title: '1、培训机构模拟刷题考试',
                content: '公考、教资、财会等培训机构，学员线上模考，模拟真实考试计时，生成个人错题本。'
            },
            {
                title: '2、学员结业考核',
                content: '课程结课考试，检验学习效果，自动生成结业分数。'
            }
        ]
    },
    {
        label: '其他政务行业场景',
        content: [
            {
                title: '1、普法知识考试、党员党建知识测试',
                content: ''
            },
            {
                title: '2、行业从业人员继续教育结业考试。',
                content: ''
            },
        ]
    },
]
</script>

<template>
    <div ref="csSection" class="cs-page">
        <!-- ========== Banner ========== -->
        <section class="cs-banner">
            <div class="cs-banner-box">
                <div class="cs-banner-bg">
                    <img src="/assets/images/computerService/banner-bg.png" alt="" class="cs-banner-bg-img" />
                </div>
                <div class="container-cs cs-banner-content">
                    <div class="cs-banner-badge">中国人事考试安全交付领导品牌</div>
                    <h1 class="cs-banner-title">机关（企）事业单位<br />专业技术人员水平能力</h1>
                    <div class="cs-banner-subtitle">通用机考服务系统</div>
                    <p class="cs-banner-desc">深耕人才测评，筑牢专业服务根基</p>
                    <div class="cs-banner-actions">
                        <NuxtLink class="cs-btn cs-btn-primary1" :to="contactRoute">了解产品</NuxtLink>
                        <NuxtLink class="cs-btn cs-btn-outline" :to="contactRoute">联系我们</NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 导航标签 ========== -->
        <nav class="cs-nav-bar">
            <div class="container-cs cs-nav-inner">
                <a v-for="tab in navTabs" :key="tab.target" class="cs-nav-tab"
                    :class="{ 'cs-nav-tab-active': activeNav === tab.target }"
                    @click.prevent="scrollToSection(tab.target)" href="javascript:void(0)">
                    {{ tab.label }}
                </a>
            </div>
        </nav>

        <!-- ========== 研发背景区 ========== -->
        <section id="cs-research" class="cs-section cs-research-section">
            <div class="container-cs">
                <div class="cs-section-header cs-animate">
                    <h2 class="cs-section-title">研发背景</h2>
                </div>
                <div class="cs-research-content cs-animate">
                    <div class="cs-research-left">
                        <div v-for="(block, idx) in researchBlocks" :key="idx" class="cs-research-block">
                            <h3>{{ block.title }}</h3>
                            <p v-if="block.content" class="comm-indent">{{ block.content }}</p>
                        </div>
                    </div>
                    <img src="/assets/images/computerService/box-img1.png" alt="" class="cs-research-img" />
                </div>
                <div class="cs-research-items-title cs-animate">现实需求</div>
                <div class="cs-research-items cs-animate">
                    <div v-for="(item, iidx) in researchBlocks1" :key="iidx" class="cs-research-item">
                        <div>{{ item.label }}</div>
                        <p class="comm-indent">{{ item.content }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 产品介绍区 ========== -->
        <section id="cs-product" class="cs-section cs-product-section">
            <div class="cs-product-bg">
                <img src="/assets/images/computerService/bg1.png" alt="" class="cs-product-bg-img" />
            </div>
            <div class="container-cs">
                <div class="cs-section-header cs-animate">
                    <h2 class="cs-section-title">产品介绍</h2>
                    <div class="cs-section-subtitle">专为全国各省、市（州）、县（区）机关事业单位以及国有企业专业技术人员水平能力测试以及技能等级考核打造</div>
                </div>
                <div class="cs-product-content cs-animate">
                    <div class="cs-product-right">
                        <div v-for="(block, idx) in productBlocks" :key="idx" class="cs-product-block">
                            <img v-if="idx === 2" src="/assets/images/computerService/box-img2.png" alt=""
                                class="cs-product-img" />
                            <template v-else>
                                <div class="cs-product-block-header"
                                    :class="block.last ? 'cs-product-block-header1' : ''">
                                    <img :src="block.icon" alt="" class="cs-product-block-icon" />
                                    <h3>{{ block.title }}</h3>
                                </div>
                                <p v-if="block.content" class="comm-indent">{{ block.content }}</p>
                                <div v-if="block.items" class="cs-product-items">
                                    <div v-for="(item, iidx) in block.items" :key="iidx" class="cs-product-item"
                                        :class="block.last ? 'cs-product-item1' : ''">
                                        <div v-if="block.subIcons" class="cs-product-item-icon-wrap">
                                            <img :src="block.subIcons[iidx]" alt="" class="cs-product-item-icon" />
                                        </div>
                                        <div class="cs-product-item-content">
                                            <div class="cs-product-item-content-title">{{ item.title }}</div>
                                            <div class="comm-indent">{{ item.content }}</div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 核心功能区 ========== -->
        <section id="cs-core" class="cs-section cs-core-section">
            <div class="container-cs">
                <div class="cs-section-header cs-animate">
                    <h2 class="cs-section-title">核心功能</h2>
                    <p class="cs-section-subtitle">六大核心模块覆盖考试全流程，从组织管理到成绩归档，实现一站式智能化考务管理</p>
                </div>
                <div class="cs-core-grid cs-animate">
                    <div v-for="(feature, idx) in coreFeatures" :key="idx" class="cs-core-card">
                        <div class="cs-core-card-header">
                            <h3>{{ feature.title }}</h3>
                            <img :src="feature.icon" alt="" class="cs-core-card-icon" />
                        </div>
                        <div class="cs-core-card-items">
                            <div v-for="(item, iidx) in feature.items" :key="iidx" class="cs-core-card-item">
                                <strong>{{ item.label }}：</strong>
                                <span>{{ item.content }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 服务优势区 ========== -->
        <section id="cs-advantage" class="cs-section cs-advantage-section">
            <div class="container-cs">
                <div class="cs-section-header cs-animate">
                    <h2 class="cs-section-title cs-title-white">服务优势</h2>
                    <p class="cs-section-subtitle cs-subtitle-white">五大核心优势，为机关事业单位和国有企业提供全方位、高标准的能力测试服务</p>
                </div>
                <div class="cs-advantage-grid cs-animate">
                    <div v-for="(card, idx) in advantageCards" :key="idx" class="cs-advantage-card"
                        :class="{ 'cs-advantage-card-full': idx === 4 }">
                        <div class="cs-advantage-card-header"
                            :class="{ 'cs-advantage-card-header1': idx !== 4 && idx !== 0 }">
                            <img :src="card.icon" alt="" class="cs-advantage-card-icon" />
                            <h3>{{ card.title }}</h3>
                        </div>
                        <p v-if="card.content" class="cs-advantage-card-desc comm-indent">{{ card.content }}</p>
                        <div v-if="card.subItems && card.subItems.length" class="cs-advantage-sub-items">
                            <div v-for="(sub, sidx) in card.subItems" :key="sidx" class="cs-advantage-sub-item">
                                <img v-if="sub.icon" :src="sub.icon" alt="" class="cs-advantage-sub-icon" />
                                <div>
                                    <div class="strong">{{ sub.title }}</div>
                                    <p class="comm-indent" style="margin: 0;">{{ sub.content }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 机考系统其他应用场景 ========== -->
        <section class="cs-section cs-scene-section">
            <div class="container-cs">
                <div class="cs-section-header cs-animate">
                    <h2 class="cs-section-title">机考系统其他应用场景</h2>
                    <p class="cs-section-subtitle">机考系统就是通过电脑、平板等电子设备完成出题、组卷、答题、监考、自动判分、成绩统计全流程考试，覆盖职业考试、校园、企业、机构等多类场景。
                    </p>
                </div>
                <div class="cs-scene-grid cs-animate">
                    <div v-for="(item, i) in box5Data" :key="i" class="cs-scene-card">
                        <div class="cs-scene-card-img-wrap">
                            <img :src="`/assets/images/computerService/box5-img${i + 1}.png`" alt=""
                                class="cs-scene-card-img" />
                            <span class="cs-scene-card-label">{{ item.label }}</span>
                        </div>
                        <div class="cs-scene-card-content">
                            <template v-for="(items, j) in item.content" :key="i + j">
                                <div class="cs-scene-card-content-title">{{ items.title }}</div>
                                <p class="comm-indent">{{ items.content }}</p>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="cs-scene-bottom cs-animate">
                    <div class="cs-scene-bottom-title">核心价值总结</div>
                    <div class="cs-scene-bottom-desc">
                        · 大规模考试：减少印刷试卷、人工阅卷成本，提升效率<br />
                        · 高保密考试：随机抽题、防作弊、全程留痕可追溯<br />
                        · 线上便捷考试：打破地域限制，不用统一聚集考场
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 数据实力区 ========== -->
        <section id="cs-data" class="cs-section cs-data-section">
            <div class="cs-data-bg">
                <img src="/assets/images/computerService/bg2.png" alt="" class="cs-data-bg-img" />
            </div>
            <div class="container-cs">
                <div class="cs-section-header cs-animate">
                    <h2 class="cs-section-title">数据实力</h2>
                    <p class="cs-section-subtitle">覆盖全国的学术支撑与生产快速交付能力，以数据见证专业实力</p>
                </div>
                <div class="cs-data-top cs-animate">
                    <div class="cs-data-top-item">
                        <strong><span class="cs-count-number" v-count-up="300">300</span><span
                                class="cs-count-plus">+</span></strong>
                        <span>专家命题专家</span>
                    </div>
                    <div class="cs-data-top-item">
                        <strong><span class="cs-count-number" v-count-up="285">285</span></strong>
                        <span>个专业覆盖</span>
                    </div>
                    <div class="cs-data-top-item">
                        <strong><span class="cs-count-number" v-count-up="20">20</span><span
                                class="cs-count-tb">TB+</span></strong>
                        <span>题库文件大小</span>
                    </div>
                    <div class="cs-data-top-item">
                        <strong><span class="cs-count-number" v-count-up="1000">1000</span><span
                                class="cs-count-plus">+</span></strong>
                        <span>个细分学科</span>
                    </div>
                </div>
                <div class="cs-data-bottom cs-animate">
                    <div class="cs-data-bottom-item">
                        <img src="/assets/images/computerService/box6-icon1.png" alt="" class="cs-data-icon" />
                        <div>
                            <div class="strong"><span class="cs-count-number cs-count-number1"
                                    v-count-up="54">54</span><span class="cs-count-plus cs-count-plus1">+</span></div>
                            <span>种不同类别的用人单位</span>
                        </div>
                    </div>
                    <div class="cs-data-bottom-item">
                        <img src="/assets/images/computerService/box6-icon2.png" alt="" class="cs-data-icon" />
                        <div>
                            <div class="strong"><span class="cs-count-number cs-count-number1"
                                    v-count-up="37">37</span><span class="cs-count-percent cs-count-percent1">%+</span>
                            </div>
                            <span>服务客户数平均增长</span>
                        </div>
                    </div>
                    <div class="cs-data-bottom-item">
                        <img src="/assets/images/computerService/box6-icon3.png" alt="" class="cs-data-icon" />
                        <div>
                            <div class="strong"><span class="cs-count-number cs-count-number1"
                                    v-count-up="35">35</span><span class="cs-count-percent cs-count-percent1">%+</span>
                            </div>
                            <span>服务考生数平均增长</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 协作共享区 ========== -->
        <section id="cs-share" class="cs-section cs-share-section">
            <div class="container-cs">
                <div class="cs-section-header cs-animate">
                    <h2 class="cs-section-title cs-title-white cs-title-large">协作共享</h2>
                </div>
                <div class="cs-share-content cs-animate">
                    <div class="cs-share-left">
                        <p class="cs-share-desc comm-indent">
                            中测高科在全国32家省市设有分子公司及办事处，依托科锐国际在全球的110多个服务网点，为各地招才引智工作提供面向全国的国际化人才荐评服务。欢迎各地机关事业单位、国有企业联系我们，共同推进专业技术人员水平能力评估工作。
                        </p>
                        <div class="cs-share-items">
                            <div v-for="(item, idx) in shareItems" :key="idx" class="cs-share-item">
                                <img :src="item.icon" alt="" class="cs-share-item-icon" />
                                <span>{{ item.text }}</span>
                            </div>
                        </div>
                        <div class="cs-banner-actions">
                            <NuxtLink class="cs-btn cs-btn-primary2" :to="contactRoute">电话咨询</NuxtLink>
                            <button class="cs-btn cs-btn-outline" @click="scrollToTop">返回顶部</button>
                        </div>
                    </div>
                    <div class="cs-share-right">
                        <h3 class="cs-share-right-title">全国部分分子公司联系方式</h3>
                        <div class="cs-branch-grid">
                            <div v-for="(office, idx) in branchOffices" :key="idx" class="cs-branch-card">
                                <div class="cs-branch-city">{{ office.city }}</div>
                                <div class="cs-branch-info">
                                    <span>手机：{{ office.phone }}</span>
                                    <span v-if="office.email">邮箱：{{ office.email }}</span>
                                    <span v-if="office.address">地址：{{ office.address }}</span>
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
.comm-indent {
    text-indent: 2em;
}

/* ===== 基础变量 ===== */
.cs-page {
    --cs-blue: #0F62FE;
    --cs-blue-dark: #0043CE;
    --cs-ink: #1A1A2E;
    --cs-muted: #5A6578;
    --cs-white: #fff;
    --cs-radius: 12px;
    font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    color: var(--cs-ink);
}

.container-cs {
    width: min(1200px, calc(100% - 40px));
    margin: 0 auto;
}

/* ===== 滚动动画 ===== */
.cs-animate {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.cs-animate.cs-visible {
    opacity: 1;
    transform: translateY(0);
}

.cs-animate:nth-child(2) {
    transition-delay: 0.1s;
}

.cs-animate:nth-child(3) {
    transition-delay: 0.2s;
}

.cs-animate:nth-child(4) {
    transition-delay: 0.3s;
}

/* ===== 通用 Section ===== */
.cs-section {
    width: 100%;
    position: relative;
}

.cs-section-header {
    margin-bottom: 44px;
}

.cs-section-header-center {
    text-align: center;
}

.cs-section-title {
    font-size: 32px;
    font-weight: 600;
    color: var(--cs-blue);
    letter-spacing: 2px;
    margin: 0 0 11px;
    line-height: 1.25;
}

.cs-section-title.cs-title-white {
    color: #fff;
}

.cs-section-title.cs-title-large {
    font-size: 36px;
}

.cs-section-subtitle {
    color: #4A5568;
    font-size: 16px;
    line-height: 1.76;
}

.cs-section-subtitle.cs-subtitle-white {
    color: rgba(255, 255, 255, 0.7);
}

.cs-btn {
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
    border: 1px solid #fff;
}

.cs-btn-primary {
    background: var(--cs-blue);
    color: var(--cs-white);
}

.cs-btn-primary1 {
    background: #fff;
    color: #0F62FE;
}

.cs-btn-primary2 {
    background: #0F62FE;
    color: #fff;
    border-color: #0F62FE;
}

.cs-btn-primary2:hover {
    background: var(--cs-blue-dark);
    box-shadow: 0 6px 20px rgba(15, 98, 254, 0.4);
    color: #fff;
    transform: translateY(-2px);
    border-color: var(--cs-blue-dark);
}

.cs-btn-primary1:hover {
    background: var(--cs-blue-dark);
    box-shadow: 0 6px 20px rgba(15, 98, 254, 0.4);
    color: #fff;
    transform: translateY(-2px);
    border-color: var(--cs-blue-dark);
}

.cs-btn-primary:hover {
    background: var(--cs-blue-dark);
    box-shadow: 0 6px 20px rgba(15, 98, 254, 0.4);
    transform: translateY(-2px);
}

.cs-btn-outline {
    background: transparent;
    color: var(--cs-white);
    border: 1px solid var(--cs-white);
}

.cs-btn-outline:hover {
    background: var(--cs-white);
    color: var(--cs-blue);
}

/* ===== Banner ===== */
.cs-banner {
    width: 100%;
    height: 626px;
    background: linear-gradient(133deg, #0D2137 0%, #1A5FB4 44.31%, #2196F3 90.26%, #1A5FB4 110.78%);
    overflow: hidden;
}

.cs-banner-box {
    position: relative;
    width: 1440px;
    margin: 0 auto;
    height: 100%;
}

.cs-banner-bg {
    position: absolute;
    top: 0;
    right: 0;
    width: 1440px;
    height: 626px;
    pointer-events: none;
}

.cs-banner-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cs-banner-content {
    position: absolute;
    z-index: 2;
    top: 93px;
    left: 138px;
}

.cs-banner-badge {
    display: inline-block;
    padding: 10px 26px 10px 49px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 100px;
    font-size: 14px;
    color: #60DDF4;
    font-weight: 500;
    margin-bottom: 28px;
    position: relative;
}

.cs-banner-badge::before {
    content: "★";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 26px;
    color: #63EAFF;
}

.cs-banner-title {
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 600;
    color: #fff;
    line-height: 1.45;
    margin: 0 0 26px;
}

.cs-banner-subtitle {
    display: inline-block;
    background: rgba(255, 255, 255, 0.1);
    font-size: 28px;
    padding: 5px 24px;
    color: rgba(255, 255, 255, 1);
    font-weight: 600;
    letter-spacing: 4px;
    margin-bottom: 29px;
    border-radius: 8px 8px 8px 8px;
}

.cs-banner-desc {
    font-weight: 500;
    font-size: 20px;
    color: #FFFFFF;
    line-height: 29px;
    letter-spacing: 6px;
    margin: 0 0 50px;
}

.cs-banner-actions {
    display: flex;
    align-items: center;
    gap: 14px;
}

/* ===== 导航标签 ===== */
.cs-nav-bar {
    width: 100%;
    height: 56px;
    background: #f4f7fb;
    position: sticky;
    top: 76px;
    left: 0;
    z-index: 15;
}

.cs-nav-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 77px;
    height: 100%;
}

.cs-nav-tab {
    font-size: 16px;
    font-weight: 400;
    color: #161616;
    text-decoration: none;
    padding: 16px 0;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
    cursor: pointer;
}

.cs-nav-tab:hover {
    color: var(--cs-blue);
}

.cs-nav-tab-active {
    color: var(--cs-blue);
    border-bottom-color: var(--cs-blue);
}

.cs-section-title {
    padding-left: 16px;
    margin-bottom: 38px;
    border-left: 4px solid var(--cs-blue);
}

/* ===== 研发背景区 ===== */
.cs-research-section {
    padding: 52px 0 79px;
    background: #fff;
}

.cs-research-content {
    display: flex;
    gap: 48px;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
}

.cs-research-left {
    flex: 1;
    max-width: 544px;
}

.cs-research-block {
    margin-bottom: 42px;
}

.cs-research-block:nth-last-child(1) {
    margin-bottom: 0;
}

.cs-research-block h3 {
    font-size: 20px;
    font-weight: 600;
    color: #1D1D1D;
    margin: 0 0 19px;
}

.cs-research-block p {
    font-size: 16px;
    color: #4A5568;
    line-height: 2;
    margin: 0;
}

.cs-research-items-title {
    font-size: 20px;
    font-weight: 600;
    color: #1D1D1D;
    margin: 0 0 17px;

}

.cs-research-items {
    display: flex;
    justify-content: space-between;
    gap: 16px;
}

.cs-research-item {
    font-size: 16px;
    color: #4A5568;
    line-height: 2;
    background: #F4F7FB;
    border-radius: 12px 12px 12px 12px;
    padding: 24px 19px 36px;
}

.cs-research-item div {
    color: #0F62FE;
    font-weight: 500;
    margin-bottom: 6px;
}

.cs-research-item p {
    margin: 0;
}

.cs-research-img {
    width: 574px;
    height: 507px;
    flex-shrink: 0;
    object-fit: cover;
}

/* ===== 产品介绍区 ===== */
.cs-product-section {
    position: relative;
    padding: 55px 0 127px;
    background: #f0f4f8;
    overflow: hidden;
}

.cs-product-section .cs-section-title {
    margin-bottom: 6px;
}

.cs-product-bg {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 572px;
    pointer-events: none;
}

.cs-product-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cs-product-section .container-cs {
    position: relative;
    z-index: 2;
}

.cs-product-content {
    display: flex;
    gap: 60px;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 50px;
}

.cs-product-img {
    width: 551px;
    height: 415px;
    flex-shrink: 0;
    object-fit: cover;
    margin-top: 30px;
}

.cs-product-right {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 29px 47px;
}

.cs-product-block {
    flex: 0 0 calc(50% - 24px);
}

.cs-product-block-header {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 23px;
}

.cs-product-block-header1 {
    margin-bottom: 19px;
}

.cs-product-block-icon {
    width: 24px;
    height: 24px;
}

.cs-product-block-header h3 {
    font-weight: 600;
    font-size: 22px;
    color: #0F62FE;
    line-height: 32px;
    margin: 0;
}

.cs-product-block>p {
    font-weight: 400;
    font-size: 16px;
    color: #4A5568;
    line-height: 32px;
    margin: 0;
}

.cs-product-items {
    margin-top: 12px;
}

.cs-product-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 31px;
}

.cs-product-item:last-child,
.cs-product-item1:last-child {
    margin-bottom: 0;
}

.cs-product-item1 {
    background: #FFFFFF;
    border-radius: 8px 8px 8px 8px;
    border: 1px solid #E2E8F0;
    padding: 20px 30px 20px 26px;
    margin-bottom: 16px;
}

.cs-product-item-icon-wrap {
    flex-shrink: 0;
}

.cs-product-item-icon {
    width: 72px;
    height: 72px;
}

.cs-product-item-content {
    font-weight: 400;
    font-size: 14px;
    color: #4A5568;
    line-height: 24px;
}

.cs-product-item-content .cs-product-item-content-title {
    font-weight: 600;
    font-size: 20px;
    color: #1A2332;
    line-height: 29px;
    margin-bottom: 9px;
}

.cs-product-item1 .cs-product-item-content {
    font-weight: 400;
    font-size: 13px;
    color: #4A5568;
    line-height: 21px;
}

.cs-product-item1 .cs-product-item-content .cs-product-item-content-title {
    font-weight: 600;
    font-size: 15px;
    color: #1A2332;
    line-height: 22px;
    margin-bottom: 6px;
}

/* ===== 核心功能区 ===== */
.cs-core-section {
    padding: 71px 0 88px;
    background: #fff;
}

.cs-core-section .cs-section-title {
    margin-bottom: 14px;
}

.cs-core-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px 35px;
    margin-top: 33px;
}

.cs-core-card {
    padding: 24px 24px 37px 29px;
    background: rgba(245, 247, 250, 1);
    border-radius: 12px;
    border: 1px solid #E2E8F0;
    transition: all 0.3s ease;
}

.cs-core-card:hover {
    box-shadow: 0 8px 24px rgba(15, 98, 254, 0.08);
    border-color: var(--cs-blue);
}

.cs-core-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 33px;
}

.cs-core-card-icon {
    width: 48px;
    height: 48px;
}

.cs-core-card-header h3 {
    font-weight: 600;
    font-size: 20px;
    color: #1A2332;
    line-height: 29px;
    margin: 0;
}

.cs-core-card-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.cs-core-card-item {
    font-weight: 400;
    font-size: 14px;
    color: #4A5568;
    line-height: 20px;
    position: relative;
    padding-left: 16px;
}

.cs-core-card-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 7px;
    width: 6px;
    height: 6px;
    background: #0F62FE;
    border-radius: 3px 3px 3px 3px;
}

.cs-core-card-item strong {
    color: #1A2332;
    font-weight: 600;
}

/* ===== 服务优势区 ===== */
.cs-advantage-section {
    padding: 75px 0 90px;
    background: linear-gradient(160deg, #0D2137 0%, #1A5FB4 50%, #0D3B7A 100%);
}

.cs-advantage-section .cs-section-title {
    margin-bottom: 25px;
    border-color: #E8651A;
}

.cs-advantage-section .cs-section-subtitle {
    color: rgba(255, 255, 255, 0.7);
}

.cs-advantage-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
}

.cs-advantage-card {
    padding: 32px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
}

.cs-advantage-card:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.2);
}

.cs-advantage-card:hover .cs-advantage-card-header h3,
.cs-advantage-card:hover .cs-advantage-card-desc,
.cs-advantage-card:hover .cs-advantage-sub-item div,
.cs-advantage-card:hover .cs-advantage-sub-item .strong {
    color: #fff;
}

.cs-advantage-card-full {
    grid-column: 1 / -1;
}

.cs-advantage-card-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 18px;
}

.cs-advantage-card-header1 {
    margin-bottom: 10px;
}

.cs-advantage-card-icon {
    width: 48px;
    height: 48px;
}

.cs-advantage-card-header h3 {
    font-size: 20px;
    font-weight: 600;
    color: #1F1F1F;
    margin: 0;
}

.cs-advantage-card-desc {
    font-weight: 400;
    font-size: 14px;
    color: rgba(37, 37, 37, 0.97);
    line-height: 25px;
    margin: 0;
}

.cs-advantage-sub-items {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 7px;
}

.cs-advantage-sub-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
}

.cs-advantage-sub-icon {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    margin-top: -6px;
}

.cs-advantage-sub-item div {
    font-size: 14px;
    color: rgba(37, 37, 37, 0.97);
    line-height: 25px;
}

.cs-advantage-sub-item .strong {
    font-weight: 600;
    font-size: 15px;
    color: #1F1F1F;
    line-height: 22px;
}

/* ===== 应用场景区 ===== */
.cs-scene-section {
    padding: 75px 0 74px;
    background: #fff;
}

.cs-scene-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px 31px;
    margin-bottom: 20px;
}

.cs-scene-card {
    background: #FFFFFF;
    border-radius: 14px 14px 14px 14px;
    border: 1px solid #E2E8F0;
    overflow: hidden;
    transition: all 0.3s ease;
}

.cs-scene-card:hover {
    box-shadow: 0 8px 24px rgba(15, 98, 254, 0.08);
    border-color: var(--cs-blue);
}

.cs-scene-card-img-wrap {
    position: relative;
    width: 100%;
    height: 172px;
    overflow: hidden;
}

.cs-scene-card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cs-scene-card-label {
    position: absolute;
    left: 12px;
    top: 11px;
    background: #DBEAFE;
    border-radius: 9999px;
    padding: 3px 12px;
    color: #1E40AF;
    font-size: 12px;
    font-weight: 500;
}

.cs-scene-card-content {
    padding: 18px 24px 44px;
}

.cs-scene-card-content-title {
    font-weight: 600;
    font-size: 14px;
    color: #0F172A;
    line-height: 25px;
    margin-bottom: 9px;
}

.cs-scene-card-content p {
    font-weight: 400;
    font-size: 14px;
    color: #64748B;
    line-height: 22px;
    margin: 0 0 21px;
}

.cs-scene-card-content p:last-child {
    margin-bottom: 0;
}

.cs-scene-bottom-title {
    font-weight: 500;
    font-size: 20px;
    color: #0F172A;
    line-height: 46px;
    text-align: center;
}

.cs-scene-bottom-desc {
    font-weight: 400;
    font-size: 16px;
    color: #64748B;
    line-height: 30px;
    text-align: center;
}

/* ===== 数据实力区 ===== */
.cs-data-section {
    position: relative;
    width: 100%;
    height: 563px;
    padding: 60px 0;
    background: #ebf2fa;
    overflow: hidden;
}

.cs-data-section .cs-section-title {
    margin-bottom: 28px;
}

.cs-data-section .cs-section-header {
    margin-bottom: 33px;
}

.cs-data-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 563px;
    pointer-events: none;
}

.cs-data-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cs-data-section .container-cs {
    position: relative;
    z-index: 2;
}

.cs-data-top {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 48px;
}

.cs-data-top-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 270px;
    height: 144px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #E5E9F0;
    justify-content: center;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
}

.cs-data-top-item strong {
    font-size: 32px;
    font-weight: 600;
    color: var(--cs-blue);
    line-height: 1.1;
}

.cs-data-top-item span {
    font-size: 14px;
    color: #666;
}

.cs-count-number {
    font-size: 48px !important;
    font-weight: inherit !important;
    color: inherit !important;
}

.cs-count-number1 {
    font-size: 32px !important;
}

.cs-count-plus,
.cs-count-tb,
.cs-count-percent {
    font-size: 24px !important;
    font-weight: 600;
    color: var(--cs-blue) !important;
    margin-left: 2px;
}

.cs-count-plus1,
.cs-count-tb1,
.cs-count-percent1 {
    font-size: 18px !important;
    font-weight: 600;
    color: var(--cs-blue) !important;
    margin-left: 2px;
}

.cs-data-bottom {
    display: flex;
    justify-content: space-between;
    gap: 24px;
}

.cs-data-bottom-item {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 368px;
    height: 108px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #E5E9F0;
    padding: 0 24px;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.06);
}

.cs-data-icon {
    width: 56px;
    height: 56px;
    flex-shrink: 0;
}

.cs-data-bottom-item div {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.cs-data-bottom-item .strong {
    display: flex;
    align-items: baseline;
    flex-direction: row;
    line-height: 1;
    color: var(--cs-blue);
}

.cs-data-bottom-item div span:last-child {
    font-size: 13px;
    color: #666;
}

/* ===== 协作共享区 ===== */
.cs-share-section {
    padding: 82px 0 110px;
    background: linear-gradient(160deg, #0D2137 0%, #1A5FB4 50%, #0D3B7A 100%);
}

.cs-share-section .cs-section-header {
    margin: 0 0 26px;
}

.cs-share-section .cs-section-title {
    margin: 0;
    border-color: transparent;
    padding: 0;
    border: none;
}

.cs-share-section .cs-section-subtitle {
    color: rgba(255, 255, 255, 0.9);
}

.cs-share-content {
    display: flex;
    gap: 64px;
    justify-content: space-between;
}

.cs-share-left {
    max-width: 435px;
}

.cs-share-desc {
    font-weight: 400;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.9);
    line-height: 29px;
    margin: 0 0 30px;
}

.cs-share-items {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 33px;
}

.cs-share-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

.cs-share-item-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
}

.cs-share-item span {
    font-weight: 400;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 20px;
}

.cs-share-right {
    flex: 1;
}

.cs-share-right-title {
    font-weight: 600;
    font-size: 20px;
    color: #FFFFFF;
    line-height: 29px;
    margin: -80px 0 26px;
}

.cs-branch-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}

.cs-branch-card {
    padding: 20px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.12);
}

.cs-branch-city {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 10px;
}

.cs-branch-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.cs-branch-info span {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.6;
}
</style>
