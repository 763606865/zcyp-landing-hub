<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'

// 内容中心 Tab 筛选
const contentTab = ref('全部')
const contentTabs = ['全部', '趋势报告', '实操指南', '政策解读', '工具模板']

// 下划线位置
const tabLineLeft = ref(0)
const updateTabLine = () => {
    nextTick(() => {
        const tabsEl = document.querySelector('.hr-content-tabs')
        const activeTab = tabsEl?.querySelector('.hr-content-tab-active') as HTMLElement
        if (activeTab && tabsEl) {
            tabLineLeft.value = activeTab.offsetLeft
        }
    })
}

watch(contentTab, () => {
    updateTabLine()
    // 切换 tab 后重新观察文章列表的动画元素
    nextTick(() => {
        const articlesEl = document.querySelector('.hr-articles')
        if (articlesEl) {
            articlesEl.querySelectorAll('.hr-animate').forEach(el => {
                el.classList.add('hr-visible')
            })
        }
    })
})

onMounted(() => {
    updateTabLine()
})

const articles = [
    {
        category: '趋势报告',
        title: '2026 年中国 HR SaaS 市场趋势报告：AI 重塑人力资源管理',
        desc: 'AI 技术正在从招聘筛选、绩效评估到员工体验全方位改变 HR 工作方式。本报告基于 500+ 企业调研数据，深度解析六大核心趋势。',
        date: '2026-07-18',
        readTime: '阅读约 12 分钟',
        img: '/assets/images/hr/content-img1.png',
    },
    {
        category: '实操指南',
        title: '小微企业薪酬体系搭建指南：从 0 到 1 的完整手册',
        desc: '50 人以下团队如何设计有竞争力又可控成本的薪酬结构？本文提供 3 套可直接套用的薪酬模型，附赠 Excel 计算模板。',
        date: '2026-07-10',
        readTime: '阅读约 8 分钟',
        img: '/assets/images/hr/content-img2.png',
    },
    {
        category: '政策解读',
        title: '2026 年劳动法新规解读：企业用工合规必知的 5 项变化',
        desc: '灵活用工、远程办公、数据隐私——新规在多个维度调整了企业用工合规要求。HR 需要立即行动的 5 个关键变化。',
        date: '2026-07-05',
        readTime: '阅读约 6 分钟',
        img: '/assets/images/hr/content-img3.png',
    },
]

const resources = [
    { name: '入职 Checklist 模板', type: 'Word 文档', icon: '/assets/images/hr/doc-icon.png', size: '2.3k' },
    { name: '薪酬测算工具', type: 'Excel 表格', icon: '/assets/images/hr/excel-icon.png', size: '1.8k' },
    { name: '劳动法合规自查手册', type: 'PDF 文档', icon: '/assets/images/hr/pdf-icon.png', size: '3.1k' },
    { name: 'OKR 设定向导工具', type: '在线工具', icon: '/assets/images/hr/ai-icon.png', size: '956' },
]

const filteredArticles = computed(() => {
    if (contentTab.value === '全部') return articles
    return articles.filter(a => a.category === contentTab.value)
})

// 滚动动画
const observerOptions = { threshold: 0.15 }
const animateOnScroll = (el: HTMLElement) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('hr-visible')
                observer.unobserve(entry.target)
            }
        })
    }, observerOptions)
    observer.observe(el)
}

const hrSection = ref<HTMLElement>()
onMounted(() => {
    if (hrSection.value) {
        hrSection.value.querySelectorAll('.hr-animate').forEach(el => {
            animateOnScroll(el as HTMLElement)
        })
    }
})
</script>

<template>
    <div ref="hrSection" class="hr-page">
        <!-- ========== Banner ========== -->
        <section class="hr-banner">
            <div class="hr-banner-bg">
                <img src="/assets/images/hr/banner-bg-icon.png" alt="" class="hr-banner-bg-img" />
            </div>
            <div class="hr-banner-content container-hr">
                <span class="hr-badge">HR 行业一站式赋能平台</span>
                <h1 class="hr-banner-title">连接每一位<span class="hr-text-green">HR</span><br />的力量</h1>
                <p class="hr-banner-desc">
                    我们为HR从业者提供体系化学习进阶与职业发展平台，同时为<br />
                    缺少HR职能的小微企业提供专业的HR解决方案，让每一个组织<br />
                    都拥有专业的人力资源支撑。
                </p>
                <div class="hr-banner-actions">
                    <NuxtLink class="hr-btn hr-btn-primary" to="/contact">成为会员 <span>→</span></NuxtLink>
                    <NuxtLink class="hr-btn hr-btn-outline" to="/contact">企业方案 <span>→</span></NuxtLink>
                </div>
            </div>
            <!-- 统计卡片 -->
            <div class="hr-stats-bar container-hr">
                <div class="hr-stat-item hr-animate">
                    <img src="/assets/images/hr/banner-icon1.png" alt="" class="hr-stat-icon" />
                    <div>
                        <strong>12,000+</strong>
                        <span>认证HR会员</span>
                    </div>
                </div>
                <div class="hr-stat-item hr-animate">
                    <img src="/assets/images/hr/banner-icon2.png" alt="" class="hr-stat-icon" />
                    <div>
                        <strong>500+</strong>
                        <span>服务企业</span>
                    </div>
                </div>
                <div class="hr-stat-item hr-animate">
                    <img src="/assets/images/hr/banner-icon3.png" alt="" class="hr-stat-icon" />
                    <div>
                        <strong>98%</strong>
                        <span>客户满意度</span>
                    </div>
                </div>
                <div class="hr-stat-item hr-animate">
                    <img src="/assets/images/hr/banner-icon4.png" alt="" class="hr-stat-icon" />
                    <div>
                        <strong>200+</strong>
                        <span>行业合作伙伴</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 关于我们 ========== -->
        <section class="hr-section hr-about">
            <div class="container-hr hr-animate">
                <div class="hr-section-header hr-section-header-center">
                    <h2>关于我们</h2>
                    <p class="hr-section-subtitle">深耕江西人力沃土二十载专业传承</p>
                </div>
                <div class="hr-about-grid">
                    <div class="hr-about-left">
                        <p class="hr-about-text">
                            猎才HR事务所隶属于南昌猎才企业管理咨询有限公司，创始团队深耕江西人力沃土二十载，成功运营江西人才人事网、江西猎头网、职业资格培训、中高级人才招聘会、总裁助理、人事考试测评、饿了么、自媒体运营等业务。累计服务企业
                            20,000+ 家，涵盖各行各业，长期作为上市公司、国有企业、民营企业 HR
                            固定合作伙伴。在当前市场环境下，以人力资源服务为纽带，为企业优化人力成本，为企业用工合规保驾护航，同时为求职人员梳理科学、适配的职业发展路径。团队将全力打造猎才HR事务所品牌，立足多元服务生态，致力搭建集工具
                            + 订阅 + 数据 + 认证 + 人才撮合于一体的全链路人力资源服务体系。
                        </p>
                        <div class="hr-about-items">
                            <div class="hr-about-item">
                                <img src="/assets/images/hr/about-icon1.png" alt="" class="hr-about-item-icon" />
                                <div>
                                    <strong>使命</strong>
                                    <span>赋能HR专家成长，让专业的人力资源服务触达每一个组织</span>
                                </div>
                            </div>
                            <div class="hr-about-item">
                                <img src="/assets/images/hr/about-icon2.png" alt="" class="hr-about-item-icon" />
                                <div>
                                    <strong>愿景</strong>
                                    <span>成为中国最具影响力的 HR 赋能平台，服务百万 HR 从业者与十万家企业</span>
                                </div>
                            </div>
                            <div class="hr-about-item">
                                <img src="/assets/images/hr/about-icon3.png" alt="" class="hr-about-item-icon" />
                                <div>
                                    <strong>价值观</strong>
                                    <span>专业主义 · 客户第一 · 开放共赢 · 持续进化</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hr-about-right">
                        <img src="/assets/images/hr/about-bg-icon.png" alt="关于我们" class="hr-about-img" />
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 面向企业 ========== -->
        <section class="hr-section hr-enterprise">
            <div class="container-hr hr-animate">
                <div class="hr-section-header hr-section-header-center">
                    <span class="hr-section-tag">面向企业</span>
                    <h2>为小微企业提供<br />专业HR职能支持</h2>
                    <p class="hr-section-desc">
                        没有专职HR团队？没关系。我们为企业提供模块化的人力资源解决方案，从招聘<br /> 到薪酬、从合规到文化，让专业的人做专业的事。
                    </p>
                </div>
                <div class="hr-enterprise-grid">
                    <div class="hr-ent-card hr-animate">
                        <div class="hr-ent-card-header">
                            <img src="/assets/images/hr/enterprise-icon1.png" alt="" class="hr-ent-icon" />
                            <h3>快速招聘服务</h3>
                        </div>
                        <p>从岗位需求分析到候选人筛选、面试安排、offer谈判，全流程专业化HR代劳。平均招聘周期缩短40%，人岗匹配准确率提升至 92%。</p>
                        <div class="hr-ent-tags">
                            <span>JD 撰写</span><span>简历筛选</span><span>面试评估</span><span>背景调查</span>
                        </div>
                    </div>
                    <div class="hr-ent-card hr-animate">
                        <div class="hr-ent-card-header">
                            <img src="/assets/images/hr/enterprise-icon2.png" alt="" class="hr-ent-icon" />
                            <h3>薪酬合规管理</h3>
                        </div>
                        <p>薪酬结构设计、社保公积金代缴、劳动合同管理、劳动法合规审查。确保企业在用工合规层面无后顾之忧，避免劳动争议风险。</p>
                        <div class="hr-ent-tags">
                            <span>薪酬设计</span><span>社保代缴</span><span>合同管理</span><span>合规审查</span>
                        </div>
                    </div>
                    <div class="hr-ent-card hr-animate">
                        <div class="hr-ent-card-header">
                            <img src="/assets/images/hr/enterprise-icon3.png" alt="" class="hr-ent-icon" />
                            <h3>绩效体系搭建</h3>
                        </div>
                        <p>根据企业发展阶段定制绩效考核方案，从 KPI 到 OKR，从考核指标设计到绩效面谈辅导，帮助企业建立科学有效的绩效管理体系。</p>
                        <div class="hr-ent-tags">
                            <span>KPI/OKR</span><span>考核设计</span><span>绩效面谈</span><span>激励方案</span>
                        </div>
                    </div>
                    <div class="hr-ent-card hr-animate">
                        <div class="hr-ent-card-header">
                            <img src="/assets/images/hr/enterprise-icon4.png" alt="" class="hr-ent-icon" />
                            <h3>组织文化顾问</h3>
                        </div>
                        <p>企业文化诊断、员工满意度调研、团建活动策划、入职培训体系设计。帮助小微企业打造有凝聚力的团队文化，降低核心人才流失率。</p>
                        <div class="hr-ent-tags">
                            <span>文化诊断</span><span>满意度调研</span><span>团建策划</span><span>入职培训</span>
                        </div>
                    </div>
                    <div class="hr-ent-card hr-animate">
                        <div class="hr-ent-card-header">
                            <img src="/assets/images/hr/enterprise-icon5.png" alt="" class="hr-ent-icon" />
                            <h3>办公软件定制</h3>
                        </div>
                        <p>根据企业实际管理流程，定制开发 OA、CRM、人事管理等办公软件。打通数据孤岛，提升管理效率，让数字化工具真正服务于业务。</p>
                        <div class="hr-ent-tags">
                            <span>OA系统</span><span>CRM定制</span><span>流程自动化</span><span>数据打通</span>
                        </div>
                    </div>
                    <div class="hr-ent-card hr-animate">
                        <div class="hr-ent-card-header">
                            <img src="/assets/images/hr/enterprise-icon6.png" alt="" class="hr-ent-icon" />
                            <h3>AI+ 应用深度开发</h3>
                        </div>
                        <p>将 AI 技术深度融入企业 HR 场景，智能简历解析、AI 面试助手、员工画像分析、智能排班等，帮助企业降本增效，迈入智能化人力资源管理时代。</p>
                        <div class="hr-ent-tags">
                            <span>智能简历解析</span><span>AI面试</span><span>员工画像</span><span>智能排班</span>
                        </div>
                    </div>
                    <div class="hr-ent-card hr-animate">
                        <div class="hr-ent-card-header">
                            <img src="/assets/images/hr/enterprise-icon7.png" alt="" class="hr-ent-icon" />
                            <h3>招考笔面试系统</h3>
                        </div>
                        <p>提供完整的招考笔面试解决方案，从题库建设、在线笔试、面试评分到录用决策，全流程数字化管理，确保招聘过程公平、高效、可追溯。</p>
                        <div class="hr-ent-tags">
                            <span>题库建设</span><span>在线笔试</span><span>面试评分</span><span>录用决策</span>
                        </div>
                    </div>
                    <div class="hr-ent-card hr-animate">
                        <div class="hr-ent-card-header">
                            <img src="/assets/images/hr/enterprise-icon8.png" alt="" class="hr-ent-icon" />
                            <h3>人事考试测评</h3>
                        </div>
                        <p>专业的人事考试与人才测评服务，涵盖职业能力测试、性格测评、岗位适配度评估等，为企业选人用人提供科学、客观的测评数据支撑。</p>
                        <div class="hr-ent-tags">
                            <span>能力测试</span><span>性格测评</span><span>岗位适配</span><span>人才评估</span>
                        </div>
                    </div>
                    <div class="hr-ent-card hr-animate">
                        <div class="hr-ent-card-header">
                            <img src="/assets/images/hr/enterprise-icon9.png" alt="" class="hr-ent-icon" />
                            <h3>更多服务 尽情期待</h3>
                        </div>
                        <p>HR事务所更多模块化、人力资源解决方案正在开发中，尽情期待...</p>
                        <div class="hr-ent-tags">
                            <span>……</span>
                        </div>
                    </div>
                </div>
                <!-- <div class="hr-ent-more">
          <p class="hr-ent-more-title">更多HR解决方案，请联系我们</p>
          <a class="hr-ent-consult-btn" href="#">立即咨询</a>
        </div> -->
            </div>
        </section>

        <!-- ========== 从招聘到管理，我们全程为您赋能 ========== -->
        <section class="hr-section hr-cases">
            <div class="container-hr hr-animate">
                <div class="hr-section-header">
                    <span class="hr-section-tag">成功案例</span>
                    <h2>用结果说话</h2>
                    <p class="hr-section-desc">
                        从初创团队到中大型企业，我们帮助不同阶段的组织解决HR难题。以下是部分真实案例。
                    </p>
                </div>
                <!-- 案例分类标签 -->
                <div class="hr-case-tabs">
                    <span class="hr-case-tab hr-case-tab-active">全部案例</span>
                    <span class="hr-case-tab">互联网/科技</span>
                    <span class="hr-case-tab">制造业</span>
                    <span class="hr-case-tab">消费品</span>
                    <span class="hr-case-tab">专业服务</span>
                    <span class="hr-case-tab">招聘服务</span>
                    <span class="hr-case-tab">薪酬合规</span>
                </div>
                <!-- 案例卡片 -->
                <div class="hr-case-cards">
                    <div class="hr-case-card hr-animate">
                        <div class="hr-case-img-wrap">
                            <img src="/assets/images/hr/case-bg1.png" alt="" class="hr-case-img" />
                            <span class="hr-case-label">互联网/科技</span>
                        </div>
                        <div class="hr-case-body">
                            <h3>某 SaaS 企业从 0 到 1 搭建HR体系</h3>
                            <p>杭州 · 50-100人 · 企业服务</p>
                            <div class="hr-case-metrics">
                                <div><strong>60%</strong><span>招聘效率提升</span></div>
                                <div><strong>25%</strong><span>人力成本降低</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="hr-case-card hr-animate">
                        <div class="hr-case-img-wrap">
                            <img src="/assets/images/hr/case-bg2.png" alt="" class="hr-case-img" />
                            <span class="hr-case-label">制造业</span>
                        </div>
                        <div class="hr-case-body">
                            <h3>传统制造企业薪酬合规改造</h3>
                            <p>东莞 · 200-500人 · 精密制造</p>
                            <div class="hr-case-metrics">
                                <div><strong>100%</strong><span>合规达标率</span></div>
                                <div><strong>80%</strong><span>纠纷减少</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="hr-case-card hr-animate">
                        <div class="hr-case-img-wrap">
                            <img src="/assets/images/hr/case-bg3.png" alt="" class="hr-case-img" />
                            <span class="hr-case-label">消费品</span>
                        </div>
                        <div class="hr-case-body">
                            <h3>新消费品牌绩效体系从 KPI 到 OKR 转型</h3>
                            <p>上海 · 100-200人 · 新消费</p>
                            <div class="hr-case-metrics">
                                <div><strong>35%</strong><span>目标达成率提升</span></div>
                                <div><strong>90%</strong><span>员工满意度</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 用户证言 -->
                <div class="hr-testimonials">
                    <div class="hr-testimonial hr-animate">
                        <p class="hr-testimonial-text">
                            "加入HR平台专业会员半年，我系统完成了薪酬设计、劳动法、组织发展三个模块的学习，顺利通过了认证考试。更难得的是社群里的同行交流，让我少走了很多弯路。"
                        </p>
                        <div class="hr-testimonial-author">
                            <div class="hr-testimonial-avatar hr-avatar-green">陈</div>
                            <div>
                                <strong>陈思远</strong>
                                <span>某科技公司 HRBP · 专业会员</span>
                            </div>
                        </div>
                    </div>
                    <div class="hr-testimonial hr-animate">
                        <p class="hr-testimonial-text">
                            "我们是一家 30 人的创业公司，之前完全没有HR，通过HR平台的企业方案，从招聘到合同到社保，全部有人专业处理。创始人终于可以把精力放回产品上了。"
                        </p>
                        <div class="hr-testimonial-author">
                            <div class="hr-testimonial-avatar hr-avatar-blue">林</div>
                            <div>
                                <strong>林浩宇</strong>
                                <span>某 AI 初创公司 CEO · 企业客户</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 平台 Logo ========== -->
        <section class="hr-section hr-partners">
            <div class="container-hr hr-animate">
                <div class="hr-section-header hr-section-header-center">
                    <h2>他们都在使用HR事务所平台</h2>
                    <p class="hr-section-desc">汇聚产业资源，共推行业进步，赋能平台发展</p>
                </div>
                <div class="hr-partners-grid">
                    <div v-for="i in 18" :key="i" class="hr-partner-logo hr-animate">
                        <img :src="`/assets/images/hr/platform-icon${i}.png`" :alt="`合作伙伴${i}`" />
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 内容中心 ========== -->
        <section class="hr-section hr-content-center">
            <div class="container-hr hr-animate">
                <div class="hr-section-header">
                    <span class="hr-section-tag">内容中心</span>
                    <div>
                        <h2>行业洞察与实用资源</h2>
                        <p class="hr-section-desc" style="margin-top:12px">
                            持续输出HR领域的前沿观点与实操工具，帮助你在日常工作中提效降本。
                        </p>
                    </div>
                </div>
                <!-- Tab 标签页 -->
                <div class="hr-content-tabs">
                    <span v-for="tab in contentTabs" :key="tab" class="hr-content-tab"
                        :class="{ 'hr-content-tab-active': contentTab === tab }" @click="contentTab = tab">{{ tab
                        }}</span>
                    <div class="hr-content-tab-line" :style="{ left: tabLineLeft + 'px' }"></div>
                </div>
                <div class="hr-content-grid">
                    <!-- 文章列表 -->
                    <div class="hr-articles">
                        <div v-for="(article, idx) in filteredArticles" :key="idx" class="hr-article-item hr-animate">
                            <img :src="article.img" :alt="article.title" class="hr-article-img" />
                            <div class="hr-article-body">
                                <span class="hr-article-category">{{ article.category }}</span>
                                <h3>{{ article.title }}</h3>
                                <p>{{ article.desc }}</p>
                                <span class="hr-article-meta">{{ article.date }} · {{ article.readTime }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 资源下载 -->
                    <div class="hr-resources">
                        <h3>免费资源下载</h3>
                        <div class="hr-resource-list">
                            <div v-for="(res, idx) in resources" :key="idx" class="hr-resource-item hr-animate" @click="navigateTo('/contact')">
                                <img :src="res.icon" :alt="res.name" class="hr-resource-icon" />
                                <div class="hr-resource-info">
                                    <strong>{{ res.name }}</strong>
                                    <span>{{ res.type }}</span>
                                </div>
                                <span class="hr-resource-size">{{ res.size }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 联系我们 ========== -->
        <!-- <section class="hr-section hr-contact">
            <div class="hr-contact-inner container-hr hr-animate">
                <div class="hr-contact-header">
                    <h2 class="hr-contact-title">联系我们</h2>
                    <p class="hr-contact-subtitle">留下您的疑问，我们将会为您解答所有问题。</p>
                </div>
                <div class="hr-contact-grid">
                    <div class="hr-contact-form">
                        <div class="hr-form-row">
                            <div class="hr-form-field">
                                <label>您的姓名</label>
                                <input type="text" placeholder="请输入" />
                            </div>
                            <div class="hr-form-field">
                                <label>您的电话</label>
                                <input type="tel" placeholder="请输入" />
                            </div>
                        </div>
                        <div class="hr-form-field">
                            <label>请输入留言</label>
                            <textarea rows="4" placeholder="请输入留言"></textarea>
                        </div>
                        <button class="hr-btn hr-btn-primary hr-submit-btn">提交留言 <span>→</span></button>
                    </div>
                    <div class="hr-contact-map">
                        <img src="/assets/images/hr/map-img.png" alt="地图" class="hr-map-img" />
                        <p class="hr-map-address">南昌红谷滩区绿地中心I期-A座13</p>
                    </div>
                </div>
            </div>
        </section> -->
    </div>
</template>

<style scoped>
/* ===== 基础变量 ===== */
.hr-page {
    --hr-green: #00C853;
    --hr-green-light: #14a88a;
    --hr-dark: #0a1628;
    --hr-ink: #1a1a2e;
    --hr-muted: #475569;
    --hr-bg: #f8f9fa;
    --hr-white: #fff;
    --hr-border: #e5e7eb;
    --hr-radius: 16px;
    font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    color: var(--hr-ink);
    overflow: hidden;
}

.container-hr {
    width: min(1200px, calc(100% - 40px));
    margin: 0 auto;
}

/* ===== 滚动动画 ===== */
.hr-animate {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.hr-animate.hr-visible {
    opacity: 1;
    transform: translateY(0);
}

.hr-animate:nth-child(2) {
    transition-delay: 0.1s;
}

.hr-animate:nth-child(3) {
    transition-delay: 0.2s;
}

.hr-animate:nth-child(4) {
    transition-delay: 0.3s;
}

.hr-animate:nth-child(5) {
    transition-delay: 0.15s;
}

.hr-animate:nth-child(6) {
    transition-delay: 0.25s;
}

/* ===== Banner ===== */
.hr-banner {
    position: relative;
    width: 100%;
    height: 618px;
    background: linear-gradient(118deg, #064E3B 0%, #0F172A 50%, #020617 100%);
    /* overflow: hidden; */
}

.hr-banner-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 618px;
    pointer-events: none;
}

.hr-banner-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.hr-banner-content {
    position: relative;
    z-index: 2;
    padding-top: 82px;
}

.hr-badge {
    display: inline-block;
    padding: 6px 17px 6px 31px;
    border-radius: 999px;
    background: rgba(16, 185, 129, 0.12);
    color: #00C853;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.05em;
    margin-bottom: 32px;
    border: 1px solid rgba(16, 185, 129, 0.2);
    position: relative;
}

.hr-badge::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #34D399;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 17px;
}

.hr-banner-title {
    font-size: clamp(40px, 5vw, 64px);
    font-weight: 800;
    color: var(--hr-white);
    line-height: 1.2;
    letter-spacing: 2px;
    margin: 0 0 24px;
}

.hr-text-green {
    color: #34d399;
}

.hr-banner-desc {
    color: #CBD5E1;
    font-size: 20px;
    line-height: 1.8;
    margin: 0 0 40px;
    max-width: 560px;
}

.hr-banner-actions {
    display: flex;
    gap: 16px;
}

.hr-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
}

.hr-btn-primary {
    background: #00C853;
    color: var(--hr-white);
}

.hr-btn-primary:hover {
    background: var(--hr-green-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(14, 124, 102, 0.35);
}

.hr-btn-outline {
    background: transparent;
    color: #00C853;
    border: 1.5px solid rgba(255, 255, 255, 0.3);
}

.hr-btn-outline:hover {
    border-color: var(--hr-white);
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
}

/* 统计卡片 */
.hr-stats-bar {
    position: absolute;
    bottom: -55px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    display: flex;
    gap: 0;
    width: min(1200px, calc(100% - 40px));
    background: rgba(255, 255, 255, 0.8);
    border-radius: 6px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.96);
}

.hr-stat-item {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 24px 44px;
    /* border-right: 1px solid var(--hr-border); */
    transition: background 0.3s ease;
}

.hr-stat-item:last-child {
    border-right: none;
}

.hr-stat-item:hover {
    background: #f0fdf4;
}

.hr-stat-icon {
    width: 64px;
    height: 64px;
    flex-shrink: 0;
}

.hr-stat-item strong {
    display: block;
    font-size: 30px;
    font-weight: 800;
    color: #0F172A;
    line-height: 1.2;
}

.hr-stat-item span {
    font-size: 14px;
    color: #1A1A2E;
    font-weight: 500;
}

/* ===== 通用 Section ===== */
.hr-section {
    padding: 100px 0;
}

.hr-section-header {
    margin-bottom: 31px;
    /* text-align: center; */
}

.hr-section-header-center {
    text-align: center;
}

.hr-section-header h2 {
    font-size: clamp(30px, 3.5vw, 42px);
    /* font-weight: 700; */
    letter-spacing: 2px;
    margin: 0;
    line-height: 1.25;
    color: #0F172A;
}

.hr-section-subtitle {
    color: #161616;
    font-size: 18px;
    margin-top: 8px;
}

.hr-section-tag {
    display: inline-block;
    color: var(--hr-green);
    font-size: 16px;
    font-weight: 600;
    line-height: 2;
    margin-bottom: 12px;
}

.hr-section-desc {
    color: var(--hr-muted);
    font-size: 18px;
    line-height: 1.67;
    margin-top: 16px;
}

/* ===== 关于我们 ===== */
.hr-about {
    padding-top: 108px;
    background: #F1F3F4;
    padding-bottom: 74px;
}

.hr-about-grid {
    display: grid;
    grid-template-columns: 1fr 517px;
    gap: 60px;
    align-items: start;
}

.hr-about-text {
    color: #555770;
    font-size: 18px;
    line-height: 1.67;
    margin: 0 0 33px;
}

.hr-about-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.hr-about-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
}

.hr-about-item-icon {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
}

.hr-about-item strong {
    display: block;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.5;
}

.hr-about-item span {
    color: #555770;
    font-size: 14px;
    line-height: 1.35;
    font-weight: 400;
}

.hr-about-img {
    width: 100%;
    border-radius: var(--hr-radius);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
}

/* ===== 面向企业 ===== */
.hr-enterprise {
    background: var(--hr-bg);
    padding-top: 46px;
    padding-bottom: 66px;
}

.hr-enterprise-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}

.hr-ent-card {
    background: var(--hr-white);
    border-radius: 20px;
    padding: 25px 16px 25px 33px;
    border: 1px solid #E2E8F0;
    transition: all 0.35s ease;
}

.hr-ent-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
    border-color: var(--hr-green);
}

.hr-ent-card-header {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 12px;
}

.hr-ent-icon {
    width: 47px;
    height: 48px;
    flex-shrink: 0;
}

.hr-ent-card h3 {
    font-size: 20px;
    font-weight: 600;
    color: #0F172A;
    margin: 0;
}

.hr-ent-card p {
    color: #475569;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.65;
    margin: 0 0 13px;
    min-height: 4.95em;
    /* 保证至少三行高度，防止内容过少导致下方标签上移 */
}

.hr-ent-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.hr-ent-tags span {
    padding: 4px 13px;
    border-radius: 100px;
    background: #F1F5F9;
    color: #475569;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
}

.hr-ent-more {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 48px;
}

.hr-ent-more-title {
    font-size: 32px;
    font-weight: 700;
    line-height: 48px;
    letter-spacing: 2px;
    color: #0F172A;
    margin: 0;
}

.hr-ent-consult-btn {
    display: inline-block;
    padding: 12px 32px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    background: #00C853;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
}

.hr-ent-consult-btn:hover {
    background: var(--hr-green-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(14, 124, 102, 0.35);
}

/* ===== 成功案例 ===== */
.hr-cases {
    padding: 61px 0 41px;
}

.hr-case-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 33px;
}

.hr-case-tab {
    padding: 8px 20px;
    border-radius: 999px;
    background: var(--hr-white);
    border: 1px solid var(--hr-border);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: #475569;
    transition: all 0.25s ease;
}

.hr-case-tab:hover,
.hr-case-tab-active {
    background: var(--hr-green);
    color: var(--hr-white);
    border-color: var(--hr-green);
}

.hr-case-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 26px;
    margin-bottom: 24px;
}

.hr-case-card {
    background: var(--hr-white);
    border-radius: var(--hr-radius);
    overflow: hidden;
    border: 1px solid var(--hr-border);
    transition: all 0.35s ease;
}

.hr-case-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
}

.hr-case-img-wrap {
    position: relative;
    height: 180px;
    overflow: hidden;
}

.hr-case-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.hr-case-card:hover .hr-case-img {
    transform: scale(1.05);
}

.hr-case-label {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 4px 12px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.9);
    color: #0F172A;
    font-size: 12px;
    font-weight: 600;
}

.hr-case-body {
    padding: 24px;
}

.hr-case-body h3 {
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 8px;
    line-height: 1.4;
}

.hr-case-body>p {
    color: #64748B;
    font-size: 14px;
    margin: 0 0 16px;
}

.hr-case-metrics {
    display: flex;
    gap: 64px;
}

.hr-case-metrics div {
    display: flex;
    flex-direction: column;
}

.hr-case-metrics strong {
    font-size: 24px;
    font-weight: bold;
    color: var(--hr-green);
    line-height: 1.2;
}

.hr-case-metrics span {
    font-size: 12px;
    color: #64748B;
}

/* 用户证言 */
.hr-testimonials {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.hr-testimonial {
    background: var(--hr-white);
    border-radius: var(--hr-radius);
    padding: 32px;
    border: 1px solid var(--hr-border);
    transition: all 0.3s ease;
}

.hr-testimonial:hover {
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.06);
}

.hr-testimonial-text {
    color: #4b5563;
    font-size: 16px;
    line-height: 1.625;
    margin: 0 0 24px;
    font-style: italic;
}

.hr-testimonial-author {
    display: flex;
    align-items: center;
    gap: 12px;
}

.hr-testimonial-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: var(--hr-white);
    font-weight: 700;
    font-size: 16px;
    flex-shrink: 0;
    background: linear-gradient(125deg, #00C853 0%, #0D9488 100%);
}

/* .hr-avatar-green {
    background: var(--hr-green);
}

.hr-avatar-blue {
    background: #3b82f6;
} */
.hr-testimonial-author div:nth-child(2) {
    display: flex;
    flex-direction: column;
}

.hr-testimonial-author strong {
    display: block;
    font-size: 14px;
    color: #0F172A;
}

.hr-testimonial-author span {
    font-size: 12px;
    color: #64748B;
}

/* ===== 平台 Logo ===== */
.hr-partners {
    /* background: var(--hr-bg); */
    padding: 0 0 44px;
}

.hr-partners h2 {
    font-size: 22px;
    color: #222222;
    font-weight: bold;
    margin-bottom: 13px;
    letter-spacing: 0;
}

.hr-partners p {
    font-size: 16px;
    color: #979797;
    letter-spacing: 2px;
    margin: 0 0 32px;
}

.hr-partners .hr-section-header {
    margin: 0;
}

.hr-partners-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px 12px;
}

.hr-partner-logo {
    background: var(--hr-white);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--hr-border);
    transition: all 0.3s ease;
    height: 65px;
}

.hr-partner-logo:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
    transform: translateY(-3px);
}

.hr-partner-logo img {
    width: 100%;
    height: 100%;
}

/* ===== 内容中心 ===== */
.hr-content-center {
    background: #fff;
    padding-top: 52px;
    padding-bottom: 48px;
}

.hr-content-center .hr-section-header {
    margin-bottom: 24px;
}

.hr-content-tabs {
    display: flex;
    align-items: center;
    gap: 36px;
    /* margin-bottom: 36px; */
    border-bottom: 1px solid var(--hr-border);
    position: relative;
    padding-bottom: 0;
}

.hr-content-tab {
    padding: 12px 0;
    font-size: 15px;
    font-weight: 500;
    color: #666;
    cursor: pointer;
    transition: color 0.25s ease;
    position: relative;
    white-space: nowrap;
}

.hr-content-tab:hover {
    color: var(--hr-green);
}

.hr-content-tab-active {
    color: var(--hr-green);
    font-weight: 600;
}

.hr-content-tab-line {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 48px;
    height: 2px;
    background: var(--hr-green);
    transition: left 0.3s ease;
}

.hr-content-grid {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 40px;
}

.hr-article-item {
    display: flex;
    gap: 24px;
    padding: 24px 0;
    border-bottom: 1px solid var(--hr-border);
    transition: all 0.3s ease;
}
.hr-article-item:nth-last-child(1) {
    border-bottom: none;
    padding-bottom: 0;
}

.hr-article-item:hover {
    background: #f9fafb;
    /* margin: 0 -16px; */
    /* padding: 24px 16px; */
    /* border-radius: 12px; */
}

.hr-article-img {
    width: 200px;
    height: 140px;
    border-radius: 12px;
    object-fit: cover;
    flex-shrink: 0;
}

.hr-article-body {
    flex: 1;
    min-width: 0;
}

.hr-article-category {
    display: inline-block;
    /* padding: 3px 10px; */
    border-radius: 999px;
    /* background: rgba(14, 124, 102, 0.08); */
    color: var(--hr-green);
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 7px;
}

.hr-article-body h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 7px;
    line-height: 1.28;
    color: #0F172A;
}

.hr-article-body p {
    color: #475569;
    font-size: 14px;
    line-height: 1.64;
    margin: 0 0 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.hr-article-meta {
    font-size: 12px;
    color: #64748B;
}

/* 资源下载 */
.hr-resources h3 {
    font-size: 18px;
    font-weight: 700;
    margin: 22px 0 8px;
}

.hr-resource-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.hr-resource-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 17px;
    border-radius: 8px;
    border: 1px solid var(--hr-border);
    background: var(--hr-white);
    transition: all 0.3s ease;
    cursor: pointer;
}

.hr-resource-item:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
    transform: translateX(4px);
    border-color: var(--hr-green);
}

.hr-resource-icon {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
}

.hr-resource-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
}

.hr-resource-info strong {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
    color: #0F172A;
    line-height: 1.28;
}

.hr-resource-info span {
    font-size: 12px;
    color: #64748B;
}

.hr-resource-size {
    font-size: 12px;
    color: #64748B;
    flex-shrink: 0;
}

/* ===== 联系我们 ===== */
.hr-contact {
    padding: 0;
    background-color: #0d3d35;
    background-image: radial-gradient(171.27% 76.7% at 70% 70%, rgba(13, 148, 136, 0.3) 0%, rgba(13, 148, 136, 0) 40%), radial-gradient(167.43% 74.98% at 30% 40%, rgba(16, 185, 129, 0.4) 0%, rgba(16, 185, 129, 0) 50%);
}

.hr-contact-inner {
    width: min(1200px, 100%);
    padding: 44px 0 49px;
}

.hr-contact-header {
    text-align: center;
}

.hr-contact-title {
    font-size: 36px;
    color: #fff;
    font-weight: 600;
    line-height: 1.14;
    margin: 0;
}

.hr-contact-subtitle {
    margin-top: 11px;
    font-size: 16px;
    color: #fff;
    line-height: 1.31;
}

.hr-contact-grid {
    display: grid;
    grid-template-columns: 1fr 649px;
    gap: 48px;
    align-items: center;
    margin-top: 48px;
}

.hr-contact-form {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    border-radius: var(--hr-radius);
    padding: 40px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.hr-form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    /* margin-bottom: 20px; */
}

.hr-form-field {
    margin-bottom: 20px;
}

.hr-form-field label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #fff;
}

.hr-form-field input,
.hr-form-field textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 10px;
    font-size: 14px;
    font-family: inherit;
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
    transition: all 0.25s ease;
    outline: none;
}

.hr-form-field input:focus,
.hr-form-field textarea:focus {
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

.hr-form-field input::placeholder,
.hr-form-field textarea::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

.hr-form-field textarea {
    resize: none;
    min-height: 120px;
}

.hr-submit-btn {
    width: 100%;
    justify-content: center;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
}

.hr-contact-map {
    display: flex;
    flex-direction: column;
}

.hr-map-img {
    width: 649px;
    height: 235px;
    border-radius: var(--hr-radius);
    object-fit: cover;
    display: block;
}

.hr-map-address {
    margin-top: 13px;
    font-size: 14px;
    color: #fff;
}

/* ===== 响应式 ===== */
@media (max-width: 1024px) {
    .hr-about-grid {
        grid-template-columns: 1fr;
    }

    .hr-about-right {
        display: none;
    }

    .hr-enterprise-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .hr-case-cards {
        grid-template-columns: repeat(2, 1fr);
    }

    .hr-partners-grid {
        grid-template-columns: repeat(4, 1fr);
    }

    .hr-content-grid {
        grid-template-columns: 1fr;
    }

    .hr-contact-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .hr-banner {
        height: auto;
        min-height: 500px;
        padding-bottom: 80px;
    }

    .hr-banner-content {
        padding-top: 60px;
    }

    .hr-stats-bar {
        flex-wrap: wrap;
        bottom: -60px;
    }

    .hr-stat-item {
        flex: 1 1 50%;
        border-bottom: 1px solid var(--hr-border);
    }

    .hr-enterprise-grid {
        grid-template-columns: 1fr;
    }

    .hr-case-cards {
        grid-template-columns: 1fr;
    }

    .hr-testimonials {
        grid-template-columns: 1fr;
    }

    .hr-partners-grid {
        grid-template-columns: repeat(3, 1fr);
    }

    .hr-form-row {
        grid-template-columns: 1fr;
    }

    .hr-article-item {
        flex-direction: column;
    }

    .hr-article-img {
        width: 100%;
        height: 180px;
    }

    .hr-section {
        padding: 60px 0;
    }

    .hr-about {
        padding-top: 100px;
    }
}
</style>
