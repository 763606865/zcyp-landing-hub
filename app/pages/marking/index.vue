<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 导航标签
const navTabs = [
    { label: '服务介绍', target: 'service' },
    { label: '阅卷系统', target: 'system' },
    { label: '联系我们', target: 'contact' },
]
const activeNav = ref('service')

// 滚动到指定区域
const scrollToSection = (target: string) => {
    const el = document.getElementById(`marking-${target}`)
    if (el) {
        const headerOffset = 60
        const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
        window.scrollTo({ top: y, behavior: 'smooth' })
    }
}

// 滚动时更新激活导航
const handleScroll = () => {
    const sections = navTabs.map(t => document.getElementById(`marking-${t.target}`))
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
const markingSection = ref<HTMLElement>()
const observerOptions = { threshold: 0.12 }

onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    if (markingSection.value) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('marking-visible')
                    observer.unobserve(entry.target)
                }
            })
        }, observerOptions)
        markingSection.value.querySelectorAll('.marking-animate').forEach(el => {
            observer.observe(el as HTMLElement)
        })
    }
})
</script>

<template>
    <div ref="markingSection" class="marking-page">
        <!-- ========== Banner ========== -->
        <section class="marking-banner">
            <div class="marking-banner-container">
                <div class="marking-banner-bg">
                    <img src="/assets/images/marking/banner-bg.png" alt="" class="marking-banner-bg-img" />
                </div>
                <div class="marking-banner-content container-marking">
                    <span class="marking-badge">全国大赛二等奖 · 第三代阅卷系统</span>
                    <h1 class="marking-banner-title">中测阅卷服务<br /><span style="color: #1A1A2E;">AI智能阅卷云平台</span></h1>
                    <p class="marking-banner-desc">全国社会化考试AI阅卷云平台，基于垂直领域自有大模型，实现全学科、全题型智能批改，让阅卷更高效、更公正、更准确。</p>
                    <div class="marking-banner-actions">
                        <NuxtLink class="marking-banner-btn marking-banner-btn-primary" to="/contact?product=3">
                            <img src="/assets/images/marking/phone-btn.png" alt="" class="marking-btn-icon" />
                            预约演示
                        </NuxtLink>
                        <NuxtLink class="marking-banner-btn marking-banner-btn-ghost" to="/contact?product=3">
                            了解系统
                            <img src="/assets/images/marking/system-btn.png" alt="" class="marking-btn-icon" />
                        </NuxtLink>
                    </div>
                </div>
                <!-- 统计卡片 -->
                <div class="marking-stats-bar container-marking">
                    <div class="marking-stats-content">
                        <div class="marking-stat-item marking-animate">
                            <strong>28,000<span class="marking-stat-unit">余套/年</span></strong>
                            <span>年均命题阅卷全流程</span>
                        </div>
                        <div class="marking-stat-item marking-animate">
                            <strong>2,000<span class="marking-stat-unit">万+人次</span></strong>
                            <span>累计服务考生</span>
                        </div>
                        <div class="marking-stat-item marking-animate">
                            <strong>300<span class="marking-stat-unit">%</span></strong>
                            <span>效率提升</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 导航标签 ========== -->
        <nav class="marking-nav-bar">
            <div class="container-marking marking-nav-inner">
                <a v-for="tab in navTabs" :key="tab.target" class="marking-nav-tab"
                    :class="{ 'marking-nav-tab-active': activeNav === tab.target }"
                    @click.prevent="scrollToSection(tab.target)" href="javascript:void(0)">
                    <span class="marking-nav-tab-text">{{ tab.label }}</span>
                </a>
            </div>
        </nav>

        <!-- ========== 服务介绍 ========== -->
        <section id="marking-service" class="marking-section marking-service-section">
            <div class="container-marking">
                <div class="marking-section-header marking-section-header-center marking-animate">
                    <span class="marking-section-en">服务介绍</span>
                    <h2>为什么选择中测阅卷服务</h2>
                    <p class="marking-section-subtitle">
                        基于大数据处理、计算机视觉、自然语言理解与计算推理引擎，打造垂直领域AI阅卷大模型，全面覆盖客观题、简答题、论述题、作文题、翻译题等全部题型。</p>
                </div>
                <!-- 5个服务卡片 -->
                <div class="marking-service-cards marking-animate">
                    <div class="marking-service-card">
                        <img src="/assets/images/marking/service-icon1.png" alt="" class="marking-service-icon" />
                        <h3>高效性</h3>
                        <p>大幅提升工作效率与响应速度，一天阅万卷</p>
                    </div>
                    <div class="marking-service-card">
                        <img src="/assets/images/marking/service-icon2.png" alt="" class="marking-service-icon" />
                        <h3>公正性</h3>
                        <p>确保评分过程的透明与一致，消除主观偏差</p>
                    </div>
                    <div class="marking-service-card">
                        <img src="/assets/images/marking/service-icon3.png" alt="" class="marking-service-icon" />
                        <h3>准确性</h3>
                        <p>提高评分精度与一致性，AI+人工双重保障</p>
                    </div>
                    <div class="marking-service-card">
                        <img src="/assets/images/marking/service-icon4.png" alt="" class="marking-service-icon" />
                        <h3>数据分析</h3>
                        <p>提供个性化教学与精准评估，数据驱动决策</p>
                    </div>
                    <div class="marking-service-card">
                        <img src="/assets/images/marking/service-icon5.png" alt="" class="marking-service-icon" />
                        <h3>节约成本</h3>
                        <p>降低人力与物力成本，性价比远超传统模式</p>
                    </div>
                </div>
                <!-- 关于中测高科 -->
                <div class="marking-about marking-animate">
                    <img src="/assets/images/marking/bg1.png" alt="关于中测高科" class="marking-about-bg">
                    <div class="marking-about-left">
                        <h3 class="marking-about-title">关于中测高科</h3>
                        <p class="marking-about-text">
                            中测高科（北京）人才测评中心有限公司是中国人事考试安全交付领导品牌。凭借在考试测评行业深耕多年的行业积淀和海量数据积累，基于数万次考试项目的成功交付与千万次阅卷的经验积累，花费1200余万资金，集结行业内上百名资深题库研发和AI技术专家，耗时三年精心研发。
                        </p>
                        <p class="marking-about-text">
                            中测智阅云接入DeepSeek、QWQ技术迭代的3.0版本AI大模型应用于智能阅卷，通过打造"AI阅卷+人工阅卷"的新模式，降低阅卷成本、提升阅卷效率、确保阅卷的公平性、准确性和安全性。
                        </p>
                        <div class="marking-patent">
                            <img src="/assets/images/marking/service-about.png" alt="" class="marking-patent-icon" />
                            <span>一种多学科考试自动评分方法及系统发明专利</span>
                        </div>
                    </div>
                    <div class="marking-about-right">
                        <div class="marking-about-stats">
                            <div class="marking-about-stat">
                                <strong>300<span class="marking-about-stat-plus">+</span></strong>
                                <span>专职命题专家</span>
                            </div>
                            <div class="marking-about-stat">
                                <strong>285</strong>
                                <span>个专业覆盖</span>
                            </div>
                            <div class="marking-about-stat">
                                <strong>20<span class="marking-about-stat-plus">TB+</span></strong>
                                <span>题库文件大小</span>
                            </div>
                            <div class="marking-about-stat">
                                <strong>1000<span class="marking-about-stat-plus">+</span></strong>
                                <span>个细分学科</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 阅卷系统 ========== -->
        <section id="marking-system" class="marking-section marking-system-section">
            <div class="marking-section-header marking-section-header-center marking-animate">
                <span class="marking-section-en">阅卷系统</span>
                <h2>第三代AI智能阅卷系统</h2>
                <p class="marking-section-subtitle">技术核心：AI + 大数据 +
                    云计算。扫描速度是二代的4倍以上，主观题AI阅卷效率较二代系统提高5倍，成本节约三分之二。</p>
            </div>
            <!-- 系统构成概览 -->
            <div class="marking-overview marking-animate">
                <img src="/assets/images/marking/bg2.png" alt="系统构成概览" class="marking-overview-bg">
                <h3 class="marking-overview-title">系统构成概览</h3>
                <div class="marking-overview-grid">
                    <!-- 硬件构成 -->
                    <div class="marking-hardware">
                        <h4 class="marking-hardware-title">硬件构成</h4>
                        <div class="marking-hardware-items">
                            <div class="marking-hardware-item">
                                <img src="/assets/images/marking/constitute-icon1.png" alt=""
                                    class="marking-hardware-icon" />
                                <div>
                                    <strong>高性能笔记本电脑</strong>
                                    <p>保障系统流畅运行与数据处理</p>
                                </div>
                            </div>
                            <div class="marking-hardware-item">
                                <img src="/assets/images/marking/constitute-icon2.png" alt=""
                                    class="marking-hardware-icon" />
                                <div>
                                    <strong>高速扫描仪</strong>
                                    <p>130ppm/260ipm，支持A3/A4多规格</p>
                                </div>
                            </div>
                            <div class="marking-hardware-item">
                                <img src="/assets/images/marking/constitute-icon3.png" alt=""
                                    class="marking-hardware-icon" />
                                <div>
                                    <strong>高清摄像头</strong>
                                    <p>用于身份核验与实时监控</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 软件系统 -->
                    <div class="marking-software">
                        <h4 class="marking-software-title">软件系统</h4>
                        <div class="marking-software-items">
                            <div class="marking-software-item">
                                <img src="/assets/images/marking/constitute-icon4.png" alt=""
                                    class="marking-software-icon" />
                                <div>
                                    <strong>扫描识别系统</strong>
                                    <p>答题卡数字化，OCR识别准确率100%</p>
                                </div>
                            </div>
                            <div class="marking-software-item">
                                <img src="/assets/images/marking/constitute-icon5.png" alt=""
                                    class="marking-software-icon" />
                                <div>
                                    <strong>人工阅卷系统</strong>
                                    <p>支持单评及多评模式，多层质量监控</p>
                                </div>
                            </div>
                            <div class="marking-software-item">
                                <img src="/assets/images/marking/constitute-icon6.png" alt=""
                                    class="marking-software-icon" />
                                <div>
                                    <strong>AI阅卷系统</strong>
                                    <p>自有大模型智能评分，支持异常检测</p>
                                </div>
                            </div>
                            <div class="marking-software-item">
                                <img src="/assets/images/marking/constitute-icon7.png" alt=""
                                    class="marking-software-icon" />
                                <div>
                                    <strong>中控+数据分析系统</strong>
                                    <p>全流程实时处理与可视化监控</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-marking marking-system-inner">
                <!-- 四层架构设计 -->
                <div class="marking-architecture marking-animate">
                    <h3 class="marking-architecture-title">四层架构设计</h3>
                    <div class="marking-architecture-grid">
                        <div class="marking-arch-card marking-arch-card-1">
                            <h4>数据集成层</h4>
                            <p><span class="marking-highlight">高速扫描仪 + OCR技术</span>实现答题数字化，整合内外部数据源并过滤异常</p>
                        </div>
                        <div class="marking-arch-card marking-arch-card-2">
                            <h4>AI处理层</h4>
                            <p>通过自研模型并引入<span class="marking-highlight">DeepSeek
                                    AI大模型</span>等技术，使用NLP模型对主观题答案进行智能评分，支持异常检测与实时接口服务</p>
                        </div>
                        <div class="marking-arch-card marking-arch-card-3">
                            <h4>分布式架构层</h4>
                            <p>依托<span class="marking-highlight">Spark</span>实现实时处理与并行计算，通过数据汇聚、存储及独立异常检测模块保障高并发性能与系统安全
                            </p>
                        </div>
                        <div class="marking-arch-card marking-arch-card-4">
                            <h4>基础设施层</h4>
                            <p>基于<span class="marking-highlight">云计算</span>与网络优化资源调度，支持混合部署及可视化监控，实现高精度、高可靠的一体化服务</p>
                        </div>
                    </div>
                </div>
                <!-- 六大功能模块 -->
                <div class="marking-functions marking-animate">
                    <h3 class="marking-functions-title">六大功能模块，全流程智能覆盖</h3>
                    <div class="marking-functions-grid">
                        <div class="marking-func-card marking-func-card-1">
                            <h4>智能扫描识别</h4>
                            <NuxtLink class="marking-func-btn" to="/contact?product=3">立即演示</NuxtLink>
                            <p>依托高速扫描仪与自适应准确识别算法，实现边扫描、边识别、边阅卷三端联动。同步完成图像加密上传、考号OCR精准匹配、客观题智能赋分，各环节耗时压缩至传统流程的1/10。</p>
                        </div>
                        <div class="marking-func-card marking-func-card-2">
                            <h4>AI智能阅卷</h4>
                            <NuxtLink class="marking-func-btn" to="/contact?product=3">立即演示</NuxtLink>
                            <p>集成CNN、NLP、Transformer及DeepSeek大模型等技术，实现中英文文本、数学公式及图表的精准识别。主观题AI阅卷深度提升80%以上。</p>
                        </div>
                        <div class="marking-func-card marking-func-card-3">
                            <h4>人工阅卷协同</h4>
                            <NuxtLink class="marking-func-btn" to="/contact?product=3">立即演示</NuxtLink>
                            <p>支持单评、双评、三/四评并行阅卷及仲裁审核模式。双重身份验证保障数据安全，教师可一键跳转至目标试卷界面。</p>
                        </div>
                        <div class="marking-func-card marking-func-card-4">
                            <h4>异常检测预警</h4>
                            <NuxtLink class="marking-func-btn" to="/contact?product=3">立即演示</NuxtLink>
                            <p>深度融合AI技术与多模态数据分析，精准识别缺考、作弊等异常行为，形成"监测-判定-追溯-纠偏"闭环管理。</p>
                        </div>
                        <div class="marking-func-card marking-func-card-5">
                            <h4>专家复审机制</h4>
                            <NuxtLink class="marking-func-btn" to="/contact?product=3">立即演示</NuxtLink>
                            <p>AI阅卷完成后，系统自动标记异常并上报专家复核。利用视觉大模型精准评分，支持按得分点打分并判理由，差异超阈值自动触发仲裁。</p>
                        </div>
                        <div class="marking-func-card marking-func-card-6">
                            <h4>成绩分析诊断</h4>
                            <NuxtLink class="marking-func-btn" to="/contact?product=3">立即演示</NuxtLink>
                            <p>基于自研垂直领域AI大模型，自动生成考试数据分析报告，涵盖试题难度分析、个人成绩剖析等多维度，为岗位胜任力模型构建提供科学依据。</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 第三代产品 ========== -->
        <section class="marking-gen3">
            <div class="marking-gen3-bg">
                <img src="/assets/images/marking/bg3.png" alt="" class="marking-gen3-bg-img" />
            </div>
            <div class="container-marking marking-gen3-inner">
                <div class="marking-gen3-content">
                    <h2 class="marking-gen3-title">第三代产品 · 全面升级</h2>
                    <p class="marking-gen3-desc">扫描速度是二代的4倍以上，主观题AI阅卷效率较二代系统提高5倍，成本节约三分之二</p>
                </div>
                <div class="marking-gen3-rate">
                    <strong>300<span class="marking-gen3-rate-unit">%</span></strong>
                </div>
            </div>
        </section>

        <!-- ========== 联系我们 ========== -->
        <section id="marking-contact" class="marking-section marking-contact-section">
            <div class="marking-contact-bg">
                <img src="/assets/images/marking/bg4.png" alt="" class="marking-contact-bg-img" />
            </div>
            <div class="container-marking marking-contact-inner">
                <div class="marking-section-header marking-section-header-center marking-animate">
                    <span class="marking-section-en">联系我们</span>
                    <h2>开启AI智能阅卷新时代</h2>
                    <p class="marking-section-subtitle">无论您是教育机构、人事考试中心还是企业培训部门，我们都能为您提供定制化的AI阅卷解决方案。</p>
                </div>
                <div class="marking-contact-content marking-animate">
                    <div class="marking-contact-left">
                        <h3 class="marking-contact-company">中测高科（北京）人才测评中心有限公司</h3>
                        <p class="marking-contact-desc">
                            中国人事考试安全交付领导品牌，年均服务28000余套考试项目，累计服务考生超过2000万人次。我们期待与您合作，共同推动考试测评行业的智能化升级。</p>
                        <div class="marking-contact-links">
                            <div class="marking-contact-link">
                                <img src="/assets/images/marking/link-icon1.png" alt="" class="marking-link-icon" />
                                <div class="marking-link-info">
                                    <span class="marking-link-label">联系电话</span>
                                    <p>139-7094-1607</p>
                                </div>
                            </div>
                            <div class="marking-contact-link">
                                <img src="/assets/images/marking/link-icon2.png" alt="" class="marking-link-icon" />
                                <div class="marking-link-info">
                                    <span class="marking-link-label">公司地址</span>
                                    <p>北京市朝阳区朝阳门南大街10号科锐国际</p>
                                </div>
                            </div>
                            <div class="marking-contact-link">
                                <img src="/assets/images/marking/link-icon3.png" alt="" class="marking-link-icon" />
                                <div class="marking-link-info">
                                    <span class="marking-link-label">商务合作</span>
                                    <p>欢迎预约演示，获取专属解决方案</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="marking-contact-right">
                        <div class="marking-qrcode-box">
                            <img src="/assets/images/marking/code-img.png" alt="微信扫码咨询" class="marking-qrcode-img" />
                        </div>
                        <p class="marking-qrcode-text">微信扫码咨询</p>
                        <NuxtLink class="marking-contact-btn" to="/contact?product=3">
                            <img src="/assets/images/marking/phone-btn.png" alt="" class="marking-contact-btn-icon" />
                            立即咨询
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
/* ===== 基础变量 ===== */
.marking-page {
    --marking-blue: #0F62FE;
    --marking-blue-dark: #1365fe;
    --marking-blue-mid: #3671eb;
    --marking-ink: #1a1a2e;
    --marking-muted: #5A6578;
    --marking-bg: #f4f7fb;
    --marking-white: #fff;
    --marking-border: #e2e8f0;
    --marking-radius: 12px;
    font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    color: var(--marking-ink);
    overflow: hidden;
}

.container-marking {
    width: min(1200px, calc(100% - 40px));
    margin: 0 auto;
}

/* ===== 滚动动画 ===== */
.marking-animate {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.marking-animate.marking-visible {
    opacity: 1;
    transform: translateY(0);
}

.marking-animate:nth-child(2) {
    transition-delay: 0.1s;
}

.marking-animate:nth-child(3) {
    transition-delay: 0.2s;
}

.marking-animate:nth-child(4) {
    transition-delay: 0.3s;
}

.marking-animate:nth-child(5) {
    transition-delay: 0.15s;
}

.marking-animate:nth-child(6) {
    transition-delay: 0.25s;
}

/* ===== Banner ===== */
.marking-banner {
    width: 100%;
    height: 650px;
    background: linear-gradient(159deg, #FFFFFF 0%, #EEF3FA 40%, #DCE8F5 100%);
}

.marking-banner-container {
    position: relative;
    width: 1440px;
    height: 100%;
    margin: 0 auto;
}

.marking-banner-bg {
    position: absolute;
    top: 68px;
    right: 96px;
    width: 625px;
    height: 557px;
    pointer-events: none;
}

.marking-banner-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.marking-banner-content {
    position: relative;
    z-index: 2;
    padding-top: 96px;
}

.marking-badge {
    display: inline-block;
    padding: 6px 17px 6px 31px;
    border-radius: 999px;
    background: #E8F0FA;
    color: #1A5FA8;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin-bottom: 40px;
    position: relative;
}

.marking-badge::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #0F62FE;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
}

.marking-banner-title {
    font-size: clamp(36px, 4.5vw, 56px);
    font-weight: 600;
    color: #0F62FE;
    line-height: 1.2;
    letter-spacing: 2px;
    margin: 0 0 37px;
}

.marking-banner-desc {
    color: #5A6578;
    font-size: 16px;
    line-height: 1.8;
    margin: 0 0 27px;
    max-width: 480px;
}

.marking-banner-actions {
    display: flex;
    gap: 16px;
}

.marking-banner-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 16px 28px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    line-height: 1;
}

.marking-banner-btn-primary {
    background: #0F62FE;
    color: #fff;
}

.marking-banner-btn-primary:hover {
    background: #0043CE;
    box-shadow: 0 6px 20px rgba(15, 98, 254, 0.4);
    transform: translateY(-2px);
}

.marking-banner-btn-ghost {
    background: #fff;
    color: #1A1A2E;
}

.marking-banner-btn-ghost:hover {
    background: rgba(15, 98, 254, 0.05);
    color: #0F62FE;
    transform: translateY(-2px);
}

.marking-btn-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
}

/* 统计卡片 */
.marking-stats-bar {
    margin-top: 62px;
}

.marking-stats-content {
    display: flex;
    align-items: center;
    gap: 66px;
    margin: 0 auto;
    height: 100px;
}

.marking-stat-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    transition: background 0.3s ease;
    cursor: pointer;
}

.marking-stat-item strong {
    display: block;
    font-size: 36px;
    font-weight: 600;
    color: #0F62FE;
    line-height: 1.2;
}

.marking-stat-unit {
    font-size: 14px;
    font-weight: 500;
    color: #0F62FE !important;
    margin-left: 4px;
}

.marking-stat-item span {
    font-size: 13px;
    color: #8892A4;
    font-weight: 400;
}

/* ===== 导航标签 ===== */
.marking-nav-bar {
    position: sticky;
    top: 76px;
    z-index: 10;
    background: #F4F7FB;
    border-bottom: 1px solid var(--marking-border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.marking-nav-inner {
    display: flex;
    justify-content: center;
    gap: 0;
}

.marking-nav-tab {
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

.marking-nav-tab-text {
    position: relative;
}

.marking-nav-tab:hover {
    color: #0F62FE;
}

.marking-nav-tab-active {
    color: #0F62FE;
    font-weight: 600;
}

.marking-nav-tab-active .marking-nav-tab-text::after {
    content: '';
    position: absolute;
    bottom: -21px;
    left: 0;
    width: 100%;
    height: 3px;
    background: #0F62FE;
    border-radius: 2px 2px 0 0;
}

/* ===== 通用 Section ===== */
.marking-section {
    padding: 80px 0;
}

.marking-section-header {
    margin-bottom: 21px;
}

.marking-section-header-center {
    text-align: center;
}

.marking-section-en {
    display: block;
    color: #0F62FE;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.1em;
    margin-bottom: 8px;
}

.marking-section-en-light {
    color: rgba(255, 255, 255, 1);
}

.marking-section-header h2 {
    font-size: clamp(28px, 3.5vw, 40px);
    font-weight: 600;
    letter-spacing: 2px;
    margin: 0 0 11px;
    line-height: 1.25;
    color: #161616;
}

.marking-title-light {
    color: var(--marking-white) !important;
}

.marking-section-subtitle {
    color: var(--marking-muted);
    font-size: 16px;
    line-height: 1.6;
    margin: 0 auto;
    max-width: 630px;
}

.marking-subtitle-light {
    color: rgba(255, 255, 255, 0.8) !important;
}

/* ===== 服务介绍 ===== */
.marking-service-section {
    padding-top: 44px;
    padding-bottom: 37px;
    background: var(--marking-white);
}

.marking-service-cards {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 25px;
    margin-bottom: 37px;
}

.marking-service-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 29px 29px 33px;
    background: #F8FAFF;
    border-radius: var(--marking-radius);
    border: 1px solid #E8EEFF;
    transition: all 0.3s ease;
    gap: 8px;
}

.marking-service-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(15, 98, 254, 0.1);
    border-color: var(--marking-blue);
}

.marking-service-icon {
    width: 64px;
    height: 64px;
    flex-shrink: 0;
}

.marking-service-card h3 {
    font-size: 16px;
    font-weight: bold;
    color: #1A1A2E;
    margin: 0;
}

.marking-service-card p {
    font-size: 13px;
    color: #8892A4;
    line-height: 1.6;
    margin: 0;
}

/* 关于中测高科 */
.marking-about {
    display: grid;
    grid-template-columns: 480px 1fr;
    gap: 64px;
    align-items: stretch;
    background: #0F62FE;
    border-radius: 20px;
    padding: 46px 80px 46px 64px;
    overflow: hidden;
    position: relative;
}

.marking-about-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
    z-index: 1;
}

.marking-about-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 2;
}

.marking-about-title {
    font-size: 24px;
    font-weight: 600;
    color: var(--marking-white);
    margin: 0 0 16px;
}

.marking-about-text {
    color: var(--marking-white);
    font-size: 15px;
    line-height: 1.8;
    margin: 0 0 16px;
}

.marking-patent {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    background: #D6EAF8;
    border-radius: 999px;
    color: #0F62FE;
    font-size: 13px;
    font-weight: 500;
    width: fit-content;
}

.marking-patent-icon {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
}

.marking-about-right {
    display: flex;
    align-items: center;
    z-index: 2;
}

.marking-about-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 31px 16px;
    width: 100%;
}

.marking-about-stat {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 12px;
    padding: 27px 25px;
    border: 1px solid #F0F2F5;
    transition: all 0.3s ease;
    width: 232px;
}

.marking-about-stat:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
}

.marking-about-stat strong {
    display: block;
    font-size: 28px;
    font-weight: 600;
    color: var(--marking-white);
    line-height: 1.2;
}

.marking-about-stat-plus {
    font-size: 18px;
    font-weight: 500;
}

.marking-about-stat span {
    font-size: 13px;
    color: rgba(38, 38, 38, 0.6);
    font-weight: 400;
}

/* ===== 阅卷系统 ===== */
.marking-system-section {
    position: relative;
    background: #f4f7fb;
    padding: 56px 0 37px;
    overflow: hidden;
}

.marking-system-inner {
    position: relative;
    z-index: 2;
}

/* 系统构成概览 */
.marking-overview {
    background: #498bfe;
    width: 1440px;
    height: 437px;
    padding: 27px 137px 53px;
    margin: 0 auto;
    margin-bottom: 20px;
    position: relative;
}

.marking-overview-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}

.marking-overview h3 {
    position: relative;
    z-index: 2;
}

.marking-overview-title {
    font-size: 24px;
    font-weight: 600;
    color: var(--marking-white);
    margin: 0 0 17px;
}

.marking-overview-grid {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    z-index: 2;
}

.marking-overview-grid>div {
    background: #FFFFFF;
    border-radius: 12px 12px 12px 12px;
    padding: 18px 24px 27px;
}

.marking-hardware-title,
.marking-software-title {
    font-size: 18px;
    font-weight: bold;
    color: #1A1A2E;
    margin: 0 0 12px;
}

.marking-hardware-items,
.marking-software-items {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}

.marking-hardware-item,
.marking-software-item {
    display: flex;
    gap: 16px;
    width: calc(50% - 8px);
    padding: 22px 43px 13px 16px;
    background: #F4F7FB;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.marking-hardware-item:hover,
.marking-software-item:hover {
    transform: translateX(4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.marking-hardware-icon,
.marking-software-icon {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
}

.marking-hardware-item strong,
.marking-software-item strong {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #1A1A2E;
    margin-bottom: 4px;
}

.marking-hardware-item p,
.marking-software-item p {
    font-size: 14px;
    color: #5A6578;
    line-height: 1.5;
    margin: 0;
}

/* 四层架构设计 */
.marking-architecture {
    margin-bottom: 48px;
}

.marking-architecture-title {
    font-size: 24px;
    font-weight: 600;
    color: #1A1A2E;
    text-align: center;
    margin: 0 0 31px;
}

.marking-architecture-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
}

.marking-arch-card {
    border-radius: 12px;
    padding: 25px 39px 22px 24px;
    box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.marking-arch-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.marking-arch-card-1 {
    background: linear-gradient(180deg, #DDE7FB 0%, #FFFFFF 100%);
}

.marking-arch-card-2 {
    background: linear-gradient(180deg, #FDEFE9 0%, #FFFFFF 100%);
}

.marking-arch-card-3 {
    background: linear-gradient(180deg, #FDF4EA 0%, #FFFFFF 100%);
}

.marking-arch-card-4 {
    background: linear-gradient(180deg, #DFFBF6 0%, #FFFFFF 100%);
}

.marking-arch-card h4 {
    font-size: 16px;
    font-weight: bold;
    color: #1A1A2E;
    margin: 0 0 33px;
}

.marking-arch-card p {
    font-size: 14px;
    color: #5A6578;
    line-height: 1.7;
    margin: 0;
}

.marking-highlight {
    color: #0F62FE;
    font-weight: 600;
}

/* 六大功能模块 */
.marking-functions {
    margin-top: 60px;
}

.marking-functions-title {
    font-size: 24px;
    font-weight: 600;
    color: #1A1A2E;
    text-align: center;
    margin: 0 0 42px;
}

.marking-functions-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
}

.marking-func-card {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: #fff;
    background-size: 100% 134px;
    background-position: top center;
    background-repeat: no-repeat;
    padding: 31px 26px 24px;
    transition: all 0.3s ease;
}

.marking-func-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.marking-func-card-1 {
    background-image: url('/assets/images/marking/power-icon1.png');
}

.marking-func-card-2 {
    background-image: url('/assets/images/marking/power-icon2.png');
}

.marking-func-card-3 {
    background-image: url('/assets/images/marking/power-icon3.png');
}

.marking-func-card-4 {
    background-image: url('/assets/images/marking/power-icon4.png');
}

.marking-func-card-5 {
    background-image: url('/assets/images/marking/power-icon5.png');
}

.marking-func-card-6 {
    background-image: url('/assets/images/marking/power-icon6.png');
}

.marking-func-card h4 {
    font-size: 20px;
    font-weight: 600;
    color: #1A1A2E;
    margin: 0 0 18px;
}

.marking-func-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    padding: 0 17px;
    background: transparent;
    color: #0F62FE;
    font-size: 14px;
    font-weight: 500;
    border-radius: 2px;
    border: 1px solid #0F62FE;
    text-decoration: none;
    transition: all 0.3s ease;
    width: fit-content;
    margin: 0;
}

.marking-func-btn:hover {
    background: #0F62FE;
    color: #fff;
    transform: translateY(-2px);
}

.marking-func-card p {
    font-size: 16px;
    color: #000;
    line-height: 1.625;
    margin: 57px 0 0;
}

/* ===== 第三代产品 ===== */
.marking-gen3 {
    position: relative;
    width: 100%;
    background: #1365fe;
    overflow: hidden;
}

.marking-gen3-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 165px;
    pointer-events: none;
}

.marking-gen3-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.marking-gen3-inner {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 165px;
}

.marking-gen3-content {
    max-width: 800px;
}

.marking-gen3-title {
    font-size: clamp(28px, 3.5vw, 40px);
    font-weight: 600;
    color: var(--marking-white);
    margin: 0 0 12px;
    letter-spacing: 2px;
}

.marking-gen3-desc {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin: 0;
}

.marking-gen3-rate {
    text-align: right;
}

.marking-gen3-rate strong {
    font-size: 80px;
    font-weight: 600;
    color: var(--marking-white);
    line-height: 1;
}

.marking-gen3-rate-unit {
    font-size: 32px;
    font-weight: 500;
}

/* ===== 联系我们 ===== */
.marking-contact-section {
    position: relative;
    padding: 42px 0 45px;
    background: #f4f7fb;
    overflow: hidden;
}

.marking-contact-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 611px;
    pointer-events: none;
}

.marking-contact-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.marking-contact-inner {
    position: relative;
    z-index: 2;
}

.marking-contact-content {
    display: grid;
    grid-template-columns: 1fr 544px;
    gap: 50px;
    align-items: start;
}

.marking-contact-company {
    font-size: 32px;
    font-weight: 600;
    color: #1A1A2E;
    margin: 0 0 22px;
}

.marking-contact-desc {
    font-size: 15px;
    color: #5A6578;
    line-height: 1.8;
    margin: 0 0 32px;
}

.marking-contact-links {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.marking-contact-link {
    display: flex;
    align-items: flex-start;
    gap: 16px;
}

.marking-link-icon {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
}

.marking-link-info {
    display: flex;
    height: 48px;
    flex-direction: column;
    justify-content: space-between;
}

.marking-link-label {
    display: block;
    font-size: 12px;
    color: #8892A4;
    line-height: 1.6;
}

.marking-contact-link p {
    font-size: 15px;
    color: #1A1A2E;
    font-weight: 500;
    line-height: 1.6;
    margin: 0;
}

.marking-contact-right {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 20px 20px 20px 20px;
    border: 1px solid #F0F2F5;
    height: 360px;
    padding: 38px 0 33px;
}

.marking-qrcode-box {
    width: 180px;
    height: 180px;
    background: var(--marking-white);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    margin-bottom: 10px;
}

.marking-qrcode-img {
    width: 180px;
    height: 180px;
    border-radius: 20px;
}

.marking-qrcode-text {
    font-size: 12px;
    color: #8892A4;
    margin: 0 0 21px;
}

.marking-contact-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 16px 32px;
    width: 100%;
    max-width: 446px;
    background: #0F62FE;
    color: var(--marking-white);
    font-size: 16px;
    font-weight: 600;
    border-radius: 16px;
    text-decoration: none;
    transition: all 0.3s ease;
}

.marking-contact-btn:hover {
    background: #0043CE;
    box-shadow: 0 6px 20px rgba(15, 98, 254, 0.4);
    transform: translateY(-2px);
}

.marking-contact-btn-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
}

/* ===== 响应式 ===== */
@media (max-width: 1024px) {
    .marking-service-cards {
        grid-template-columns: repeat(3, 1fr);
    }

    .marking-about {
        grid-template-columns: 1fr;
    }

    .marking-about-right {
        display: none;
    }

    .marking-overview-grid {
        grid-template-columns: 1fr;
    }

    .marking-architecture-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .marking-functions-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .marking-contact-content {
        grid-template-columns: 1fr;
    }

    .marking-contact-right {
        align-items: flex-start;
    }
}

@media (max-width: 768px) {
    .marking-banner {
        height: auto;
        min-height: 500px;
        padding-bottom: 80px;
    }

    .marking-banner-content {
        padding-top: 60px;
    }

    .marking-stats-bar {
        flex-wrap: wrap;
        bottom: -60px;
    }

    .marking-stat-item {
        flex: 1 1 50%;
    }

    .marking-service-cards {
        grid-template-columns: repeat(2, 1fr);
    }

    .marking-architecture-grid {
        grid-template-columns: 1fr;
    }

    .marking-functions-grid {
        grid-template-columns: 1fr;
    }

    .marking-gen3-inner {
        flex-direction: column;
        text-align: center;
        gap: 24px;
        height: auto;
        padding: 40px 0;
    }

    .marking-gen3-rate {
        text-align: center;
    }

    .marking-section {
        padding: 60px 0;
    }
}
</style>
