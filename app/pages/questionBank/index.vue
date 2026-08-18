<script setup lang="ts">
import { ref, onMounted } from 'vue'

const config = useRuntimeConfig()
const source = useCampaignSource()
const contactRoute = computed(() => getContactRoute(6, source.value))

// 滚动动画
const qbSection = ref<HTMLElement>()
const observerOptions = { threshold: 0.12 }

onMounted(() => {
    if (qbSection.value) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('qb-visible')
                    observer.unobserve(entry.target)
                }
            })
        }, observerOptions)
        qbSection.value.querySelectorAll('.qb-animate').forEach(el => {
            observer.observe(el as HTMLElement)
        })
    }
})
</script>

<template>
    <div ref="qbSection" class="qb-page">
        <!-- ========== Banner ========== -->
        <section class="qb-banner">
            <div class="qb-banner-bg">
                <img src="/assets/images/question_bank/banner-bg.png" alt="" class="qb-banner-bg-img" />
            </div>
            <div class="container-qb qb-banner-content">
                <h1 class="qb-banner-title">共享题库<span>中心服务系统</span></h1>
                <p class="qb-banner-subtitle">SHARED QUESTION BANK SERVICE</p>
                <p class="qb-banner-desc">无限级题库管理体系，覆盖试题录入、智能组卷、多级审核全流程。云端与离线双模式部署，为人才评定场景提供高效、安全、精准的数字化平台支撑。</p>
                <div class="qb-banner-actions">
                    <NuxtLink class="qb-btn qb-btn-primary" :to="contactRoute">
                        立即体验
                        <img src="/assets/images/question_bank/banner-btn1.png" alt="" class="qb-btn-icon" />
                    </NuxtLink>
                    <NuxtLink class="qb-btn qb-btn-ghost" :to="contactRoute">
                        <img src="/assets/images/question_bank/banner-btn2.png" alt="" class="qb-btn-icon" />
                        预约演示
                    </NuxtLink>
                </div>
            </div>
            <!-- 数据行 -->
            <div class="qb-stats-bar">
                <div class="container-qb qb-stats-content">
                    <div class="qb-stat-item qb-animate">
                        <strong>
                            <span class="qb-count-number" v-count-up="20">20</span>
                            <span class="qb-stat-suffix">+</span>
                        </strong>
                        <span>年行业服务经验</span>
                    </div>
                    <div class="qb-stat-item qb-animate">
                        <strong>
                            <span class="qb-count-number" v-count-up="64">64</span>
                            <span class="qb-stat-suffix">万</span>
                        </strong>
                        <span>企业客户信赖</span>
                    </div>
                    <div class="qb-stat-item qb-animate">
                        <strong>
                            <span class="qb-count-number" v-count-up="204">204</span>
                            <span class="qb-stat-suffix">万</span>
                        </strong>
                        <span>场考试交付</span>
                    </div>
                    <div class="qb-stat-item qb-animate">
                        <strong>
                            <span class="qb-count-number">1.3</span>
                            <span class="qb-stat-suffix">亿</span>
                        </strong>
                        <span>人次累计参考</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 题库管理中心 ========== -->
        <section class="qb-section qb-management">
            <div class="qb-management-bg">
                <img src="/assets/images/question_bank/box1-bg.png" alt="" class="qb-management-bg-img" />
            </div>
            <div class="container-qb qb-management-inner">
                <div class="qb-management-left qb-animate">
                    <h2 class="qb-management-title">题库管理中心，<span>一目了然</span></h2>
                    <p class="qb-management-desc">从题型管理到安全加密，核心能力集中呈现，让命题与组卷工作更高效、更安全。</p>
                </div>
                <div class="qb-management-right qb-animate">
                    <div class="qb-mgmt-list">
                        <div class="qb-mgmt-float qb-mgmt-float-left">
                            <img src="/assets/images/question_bank/box1-icon4.png" alt="试题加密保险箱"
                                class="qb-mgmt-float-icon" />
                            <span>试题加密保险箱</span>
                        </div>
                        <div class="qb-mgmt-float qb-mgmt-float-top">
                            <img src="/assets/images/question_bank/box1-icon5.png" alt="" class="qb-mgmt-float-icon" />
                            <span>实时数据同步</span>
                        </div>
                        <div class="qb-mgmt-header">
                            <div class="label label1"></div>
                            <div class="label label2"></div>
                            <div class="label label3"></div>
                            <div>题库管理中心</div>
                        </div>
                        <div class="qb-mgmt-lists">
                            <div class="qb-mgmt-lists-box">
                                <div class="qb-mgmt-lists-box-item">
                                    <div class="qb-mgmt-lists-box-item-title">6种</div>
                                    <div>基础题型</div>
                                </div>
                                <div class="qb-mgmt-lists-box-item">
                                    <div class="qb-mgmt-lists-box-item-title">3种</div>
                                    <div>合题模式</div>
                                </div>
                            </div>
                            <div class="qb-mgmt-item">
                                <img src="/assets/images/question_bank/box1-icon1.png" alt="" class="qb-mgmt-icon" />
                                <div class="qb-mgmt-item-text">
                                    批量导入 Word / Excel / JSON
                                </div>
                            </div>
                            <div class="qb-mgmt-item">
                                <img src="/assets/images/question_bank/box1-icon2.png" alt="" class="qb-mgmt-icon" />
                                <div class="qb-mgmt-item-text">
                                    高安全对称加密算法保护
                                </div>
                            </div>
                            <div class="qb-mgmt-item">
                                <img src="/assets/images/question_bank/box1-icon3.png" alt="" class="qb-mgmt-icon" />
                                <div class="qb-mgmt-item-text">
                                    制卷与命题动作分离，多层审核
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 四大核心模块 ========== -->
        <section class="qb-section qb-core-modules">
            <div class="container-qb">
                <div class="qb-section-header qb-animate">
                    <h2>四大核心模块，覆盖题库全生命周期</h2>
                    <p>从试题录入到组卷导出，从多级审核到查重比对，一站式满足各类考试场景的题库管理需求。</p>
                </div>
                <div class="qb-core-grid">
                    <div class="qb-core-card qb-animate">
                        <div class="qb-core-card-img">
                            <img src="/assets/images/question_bank/box2-img1.png" alt="试题管理" />
                            <span class="qb-core-card-label">试题管理</span>
                        </div>
                        <p>支持单选、多选、判断、填空、问答、录音、组合题七种题型。批量导入 Word / Excel / JSON，手动录入与 AI 智能录入并行。</p>
                    </div>
                    <div class="qb-core-card qb-animate">
                        <div class="qb-core-card-img">
                            <img src="/assets/images/question_bank/box2-img2.png" alt="考卷管理" />
                            <span class="qb-core-card-label">考卷管理</span>
                        </div>
                        <p>支持选题组卷、抽题组卷、随机组卷及综合组卷四种模式。试卷录入、导出、复制全流程管理，灵活适配不同考试场景。</p>
                    </div>
                    <div class="qb-core-card qb-animate">
                        <div class="qb-core-card-img">
                            <img src="/assets/images/question_bank/box2-img3.png" alt="审核管理" />
                            <span class="qb-core-card-label">审核管理</span>
                        </div>
                        <p>试题与考卷双重审核流程。自定义相似度阈值，审核提供预计属性值（难度、标准差、差异系数），确保成卷质量。</p>
                    </div>
                    <div class="qb-core-card qb-animate">
                        <div class="qb-core-card-img">
                            <img src="/assets/images/question_bank/box2-img4.png" alt="试题查重比对" />
                            <span class="qb-core-card-label">试题查重<br />比对</span>
                        </div>
                        <p>智能检测试题重复率，维护题库纯净度。支持跨题库比对，自动标记相似试题，辅助命题人员高效去重。</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 离线客户端 + 管理服务端 ========== -->
        <section class="qb-section qb-offline">
            <div class="qb-offline-bg">
                <img src="/assets/images/question_bank/box3-bg.png" alt="" class="qb-offline-bg-img" />
            </div>
            <div class="container-qb qb-offline-inner">
                <div class="qb-section-header qb-section-header-center qb-animate">
                    <h2>离线客户端 + 管理服务端，双端协同</h2>
                    <p>数据在离线客户端与管理服务端之间安全流转，支持断网环境下的试题录入与加密，联网后一键同步。</p>
                </div>
                <div class="qb-offline-content qb-animate">
                    <!-- 离线客户端 -->
                    <div class="qb-offline-left">
                        <h3 class="qb-offline-side-title">离线客户端</h3>
                        <div class="qb-offline-item qb-offline-item-blue">
                            <img src="/assets/images/question_bank/box3-img1.png" alt="" class="qb-offline-item-icon" />
                            <div>
                                <strong>数据操作</strong>
                                <span>离线环境下录入、编辑试题</span>
                            </div>
                        </div>
                        <div class="qb-offline-item qb-offline-item-blue">
                            <img src="/assets/images/question_bank/box3-img2.png" alt="" class="qb-offline-item-icon" />
                            <div>
                                <strong>客户端登录</strong>
                                <span>免密多端使用，支持 Win / Mac</span>
                            </div>
                        </div>
                    </div>
                    <!-- 中间箭头 -->
                    <div class="qb-offline-arrows">
                        <div class="qb-arrow-item">
                            <img src="/assets/images/question_bank/box3-img7.png" alt="" class="qb-arrow-icon" />
                            <span>数据同步</span>
                            <img src="/assets/images/question_bank/box3-img6.png" alt="" class="qb-arrow-icon" />
                        </div>
                        <div class="qb-arrow-item">
                            <div class="qb-arrow-item">
                                <img src="/assets/images/question_bank/box3-img7.png" alt="" class="qb-arrow-icon" />
                                <span>下载资料</span>
                                <img src="/assets/images/question_bank/box3-img6.png" alt="" class="qb-arrow-icon" />
                            </div>
                        </div>
                    </div>
                    <!-- 管理服务端 -->
                    <div class="qb-offline-right">
                        <h3 class="qb-offline-side-title">管理服务端</h3>
                        <div class="qb-offline-item qb-offline-item-white">
                            <img src="/assets/images/question_bank/box3-img3.png" alt="" class="qb-offline-item-icon" />
                            <div>
                                <strong>信息入库</strong>
                                <span>同步本地数据库，集中管理</span>
                            </div>
                        </div>
                        <div class="qb-offline-item qb-offline-item-white">
                            <img src="/assets/images/question_bank/box3-img4.png" alt="" class="qb-offline-item-icon" />
                            <div>
                                <strong>数据审核</strong>
                                <span>多级审核流程，确保数据质量</span>
                            </div>
                        </div>
                        <div class="qb-offline-item qb-offline-item-white">
                            <img src="/assets/images/question_bank/box3-img5.png" alt="" class="qb-offline-item-icon" />
                            <div>
                                <strong>查重比对</strong>
                                <span>智能检测重复，维护题库纯净</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 深入每个模块 ========== -->
        <section class="qb-section qb-deep-modules">
            <div class="container-qb">
                <div class="qb-section-header qb-animate">
                    <h2>深入每个模块，了解完整能力</h2>
                    <p>从权限管理到试题入库，从手动组卷到智能审核，全方位覆盖题库管理的每一个细节。</p>
                </div>

                <!-- 试题管理 -->
                <div class="qb-deep-block qb-animate">
                    <div class="qb-deep-title">
                        <img src="/assets/images/question_bank/box4-title1.png" alt="" class="qb-deep-title-icon" />
                        <h3>试题管理</h3>
                    </div>
                    <div class="qb-deep-grid">
                        <div class="qb-deep-card">
                            <div class="qb-deep-card-header">
                                <img src="/assets/images/question_bank/box4-icon1.png" alt=""
                                    class="qb-deep-card-icon" />
                                <strong>角色权限管理</strong>
                            </div>
                            <ul class="qb-deep-card-list">
                                <li>角色分系统管理：学科教师、命题教师</li>
                                <li>根据绑定课程进行数据隔离</li>
                                <li>客户端支持免登录使用</li>
                            </ul>
                        </div>
                        <div class="qb-deep-card">
                            <div class="qb-deep-card-header">
                                <img src="/assets/images/question_bank/box4-icon2.png" alt=""
                                    class="qb-deep-card-icon" />
                                <strong>试题维护</strong>
                            </div>
                            <ul class="qb-deep-card-list">
                                <li>便捷的试题检索，支持图片、音频、数学公式编辑</li>
                                <li>内置难度、区分度、差异系数等多维属性</li>
                                <li>支持试题属性自定义，可定义双层属性树</li>
                            </ul>
                        </div>
                        <div class="qb-deep-card">
                            <div class="qb-deep-card-header">
                                <img src="/assets/images/question_bank/box4-icon3.png" alt=""
                                    class="qb-deep-card-icon" />
                                <strong>试题入库</strong>
                            </div>
                            <ul class="qb-deep-card-list">
                                <li>批量导入 Word / Excel / JSON，也支持单题录入</li>
                                <li>引入试题版本概念，记录变更历程</li>
                                <li>统计使用次数，加权计算试题曝光度</li>
                            </ul>
                        </div>
                        <NuxtLink class="qb-deep-card qb-deep-card-more" :to="contactRoute">
                            <img src="/assets/images/question_bank/box4-add.png" alt=""
                                class="qb-deep-card-more-icon" />
                            <strong>更多功能</strong>
                            <div>
                                <span>试题保险箱 · 加密存储 · 离线录题</span>
                            </div>
                        </NuxtLink>
                    </div>
                </div>

                <div class="qb-deep-block-line qb-animate"></div>

                <!-- 考卷管理 -->
                <div class="qb-deep-block qb-animate">
                    <div class="qb-deep-title">
                        <img src="/assets/images/question_bank/box4-title2.png" alt="" class="qb-deep-title-icon" />
                        <h3>考卷管理</h3>
                    </div>
                    <div class="qb-deep-grid qb-deep-grid-2">
                        <div class="qb-deep-card">
                            <div class="qb-deep-card-header">
                                <img src="/assets/images/question_bank/box4-icon4.png" alt=""
                                    class="qb-deep-card-icon" />
                                <strong>手动组卷</strong>
                            </div>
                            <ul class="qb-deep-card-list">
                                <li>按设定或临时创建的试卷结构检索查询试题</li>
                                <li>依照需求勾选试题组成考卷</li>
                            </ul>
                        </div>
                        <div class="qb-deep-card">
                            <div class="qb-deep-card-header">
                                <img src="/assets/images/question_bank/box4-icon5.png" alt=""
                                    class="qb-deep-card-icon" />
                                <strong>自动组卷</strong>
                            </div>
                            <ul class="qb-deep-card-list">
                                <li>设定组卷结构与抽取规则，程序自动从合规题源组题</li>
                                <li>支持选题、抽题、随机及综合四种组卷模式</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="qb-deep-block-line qb-animate"></div>

                <!-- 审核管理 -->
                <div class="qb-deep-block qb-animate">
                    <div class="qb-deep-title">
                        <img src="/assets/images/question_bank/box4-title3.png" alt="" class="qb-deep-title-icon" />
                        <h3>审核管理</h3>
                    </div>
                    <div class="qb-deep-grid qb-deep-grid-2">
                        <div class="qb-deep-card">
                            <div class="qb-deep-card-header">
                                <img src="/assets/images/question_bank/box4-icon6.png" alt=""
                                    class="qb-deep-card-icon" />
                                <strong>试题审核</strong>
                            </div>
                            <ul class="qb-deep-card-list">
                                <li>新录试题需经过规定审核流程方可入库</li>
                                <li>自主设置相似度阈值，审核提供预计属性值</li>
                            </ul>
                        </div>
                        <div class="qb-deep-card">
                            <div class="qb-deep-card-header">
                                <img src="/assets/images/question_bank/box4-icon7.png" alt=""
                                    class="qb-deep-card-icon" />
                                <strong>考卷审核</strong>
                            </div>
                            <ul class="qb-deep-card-list">
                                <li>客户端同步至管理端，试卷进入待审列表</li>
                                <li>审核覆盖难度分布、知识点分布、区分度等维度</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ========== 为什么选择中测高科 ========== -->
        <section class="qb-section qb-why-choose">
            <div class="qb-why-choose-box">
                <div class="qb-why-bg">
                    <div class="qb-why-circle qb-why-circle-tl"></div>
                    <div class="qb-why-circle qb-why-circle-br"></div>
                </div>
                <div class="container-qb qb-why-inner">
                    <div class="qb-section-header qb-section-header-center qb-animate">
                        <h2 class="qb-why-title">为什么选择中测高科题库系统</h2>
                        <p class="qb-why-subtitle">凭借逾 20 年的行业服务经验，我们打造了"解决方案 + 数字产品 + 咨询服务"三位一体的业务模式。</p>
                    </div>
                    <div class="qb-why-cards">
                        <div class="qb-why-card qb-animate">
                            <div class="qb-why-card-top">
                                <h3>快速搭建题库</h3>
                                <img src="/assets/images/question_bank/box5-icon1.png" alt=""
                                    class="qb-why-card-icon" />
                            </div>
                            <p>AI 自动识别题目内容，快速录入试题。一键录入试题、生成试卷，大幅提高录题效率，降低建库成本。</p>
                        </div>
                        <div class="qb-why-card qb-animate">
                            <div class="qb-why-card-top">
                                <h3>高安全加密</h3>
                                <img src="/assets/images/question_bank/box5-icon2.png" alt=""
                                    class="qb-why-card-icon" />
                            </div>
                            <p>采用高安全对称加密算法，独有类型解密文件。制卷与命题动作分离、相互隔离，试卷步步审核，确保命题安全。</p>
                        </div>
                        <div class="qb-why-card qb-animate">
                            <div class="qb-why-card-top">
                                <h3>精细分类管理</h3>
                                <img src="/assets/images/question_bank/box5-icon3.png" alt=""
                                    class="qb-why-card-icon" />
                            </div>
                            <p>试题采用树状结构全面管理，无限级试题分类与标签体系。标记知识点，可用于生成能力模型，满足高效建设题库需求。</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
/* ===== 基础变量 ===== */
.qb-page {
    --qb-blue: #0F62FE;
    --qb-blue-dark: #0043CE;
    --qb-ink: #1A1A2E;
    --qb-muted: #5A6578;
    --qb-bg: #f4f7fb;
    --qb-white: #fff;
    --qb-radius: 12px;
    font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    color: var(--qb-ink);
    overflow: hidden;
}

.container-qb {
    width: min(1200px, calc(100% - 40px));
    margin: 0 auto;
}

/* ===== 滚动动画 ===== */
.qb-animate {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.qb-animate.qb-visible {
    opacity: 1;
    transform: translateY(0);
}

.qb-animate:nth-child(2) {
    transition-delay: 0.1s;
}

.qb-animate:nth-child(3) {
    transition-delay: 0.2s;
}

.qb-animate:nth-child(4) {
    transition-delay: 0.3s;
}

/* ===== 通用 Section Header ===== */
.qb-section-header {
    margin-bottom: 40px;
}

.qb-section-header-center {
    text-align: center;
}

.qb-section-header h2 {
    font-size: 32px;
    font-weight: 600;
    letter-spacing: 2px;
    margin: 0 0 16px;
    line-height: 1.25;
    text-align: center;
    color: #222;
}

.qb-section-header p {
    color: #6A6A6A;
    font-size: 18px;
    line-height: 1.72;
    margin: 0 auto;
    max-width: 630px;
    text-align: center;
}

/* ===== Banner ===== */
.qb-banner {
    position: relative;
    width: 100%;
    height: 550px;
    background: #dae9ff;
    overflow: hidden;
}

.qb-banner-bg {
    position: absolute;
    top: -77px;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 627px;
    pointer-events: none;
}

.qb-banner-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.qb-banner-content {
    position: relative;
    z-index: 2;
    padding-top: 87px;
    text-align: center;
}

.qb-banner-title {
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 700;
    color: var(--qb-ink);
    line-height: 1.3;
    margin: 0 auto 15px;
    letter-spacing: 2px;
}

.qb-banner-title span {
    color: var(--qb-blue);
}

.qb-banner-subtitle {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 4px;
    color: var(--qb-muted);
    margin: 0 0 16px;
}

.qb-banner-desc {
    font-size: 16px;
    color: var(--qb-muted);
    line-height: 1.8;
    margin: 0 auto 34px;
    max-width: 640px;
}

.qb-banner-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
}

.qb-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    border-radius: 32px;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
    line-height: 1;
}

.qb-btn-primary {
    background: var(--qb-blue);
    color: var(--qb-white);
}

.qb-btn-primary:hover {
    background: var(--qb-blue-dark);
    box-shadow: 0 6px 20px rgba(15, 98, 254, 0.4);
    transform: translateY(-2px);
}

.qb-btn-ghost {
    background: var(--qb-white);
    color: var(--qb-ink);
}

.qb-btn-ghost:hover {
    background: rgba(15, 98, 254, 0.05);
    color: var(--qb-blue);
    transform: translateY(-2px);
}

.qb-btn-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
}

/* 数据行 */
.qb-stats-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 109px;
    background: rgba(255, 255, 255, 0.6);
    z-index: 3;
}

.qb-stats-content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
}

.qb-stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
}

.qb-stat-item strong {
    font-size: 32px;
    font-weight: 600;
    color: #0F62FE;
    line-height: 1.2;
}

.qb-stat-suffix {
    font-size: 22px !important;
    font-weight: 500;
    color: #0F62FE !important;
    margin-left: 2px;
}

.qb-stat-item span {
    font-size: 14px;
    color: #6A6A6A;
    font-weight: 500;
}

.qb-count-number {
    font-size: inherit !important;
    font-weight: inherit !important;
    color: inherit !important;
}

/* ===== 题库管理中心 ===== */
.qb-management {
    position: relative;
    width: 100%;
    height: 547px;
    overflow: hidden;
}

.qb-management-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 547px;
    pointer-events: none;
}

.qb-management-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.qb-management-inner {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    height: 100%;
    padding: 60px 0;
}

.qb-management-title {
    font-size: clamp(28px, 3vw, 36px);
    font-weight: 700;
    color: #0F62FE;
    line-height: 1.4;
    margin: 0 0 15px;
}

.qb-management-title span {}

.qb-management-desc {
    font-size: 18px;
    color: #6A6A6A;
    line-height: 1.72;
    margin: 0;
    max-width: 450px;
}

.qb-management-right {
    position: relative;
}

.qb-mgmt-float {
    position: absolute;
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 11px 17px;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.08);
    background: #FFFFFF;
    border-radius: 14px 14px 14px 14px;
    border: 1px solid #DDDDDD;
    color: #222222;
    font-size: 12px;
    font-weight: 600;
}

.qb-mgmt-float-left {
    left: 0;
    transform: translateX(-50%);
    bottom: 60px;
}

.qb-mgmt-float-top {
    right: -87px;
    top: 41px;
}

.qb-mgmt-float-icon {
    width: auto;
    height: auto;
}

.qb-mgmt-list {
    display: flex;
    flex-direction: column;
    background: #F4F7FB;
    border-radius: 32px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1), 0px 2px 6px 0px rgba(0, 0, 0, 0.04), 0px 0px 0px 1px rgba(0, 0, 0, 0.02);
    position: relative;
    width: 478px;
    /* height: 339px; */
}

.qb-mgmt-header {
    display: flex;
    align-items: center;
    height: 62px;
    width: 100%;
    font-size: 14px;
    color: #929292;
    border-bottom: 1px solid #DDDDDD;
    padding: 20px 25px;
}

.qb-mgmt-header .label {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 6px;
}

.qb-mgmt-header .label1 {
    background: #C13515;
}

.qb-mgmt-header .label2 {
    background: #F59E0B;
}

.qb-mgmt-header .label3 {
    background: #22C55E;
    margin-right: 20px;
}

.qb-mgmt-lists {
    padding: 24px 25px;
}

.qb-mgmt-lists-box {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
}

.qb-mgmt-lists-box-item {
    width: 207px;
    height: 81px;
    background: #FFFFFF;
    border-radius: 14px 14px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 12px;
    color: #6A6A6A;
}

.qb-mgmt-item {
    display: flex;
    align-items: center;
    padding: 13px 17px;
    gap: 12px;
    width: 430px;
    height: 54px;
    background: #FFFFFF;
    border-radius: 8px 8px 8px 8px;
    border: 1px solid #DDDDDD;
    margin-bottom: 12px;
}

.qb-mgmt-item:nth-last-of-type(1) {
    margin-bottom: 0;
}

.qb-mgmt-lists-box-item-title {
    color: #0F62FE;
    font-size: 22px;
    font-weight: 900;
    line-height: 26px;
}

.qb-mgmt-icon {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
}

.qb-mgmt-item-text {
    font-size: 14px;
    font-weight: 500;
    color: #222222;
}

/* ===== 四大核心模块 ===== */
.qb-core-modules {
    padding: 68px 0 72px;
    background: var(--qb-white);
}

.qb-core-grid {
    display: flex;
    justify-content: space-between;
    gap: 29px;
}

.qb-core-card {
    background: var(--qb-white);
    border-radius: 14px;
    border: 1px solid #E8EEFF;
    overflow: hidden;
    transition: all 0.3s ease;
    width: 270px;
}

.qb-core-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(15, 98, 254, 0.1);
    border-color: var(--qb-blue);
}

.qb-core-card-img {
    position: relative;
    width: 100%;
    height: 99px;
    overflow: hidden;
    background: #f0f4ff;
}

.qb-core-card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.qb-core-card-label {
    position: absolute;
    left: 25px;
    top: 29px;
    font-size: 18px;
    font-weight: 600;
    color: var(--qb-blue);
    line-height: 1.4;
}

.qb-core-card:nth-last-child(1) .qb-core-card-img .qb-core-card-label {
    top: 15px;
}

.qb-core-card p {
    padding: 20px 29px 29px 25px;
    font-size: 14px;
    color: #6A6A6A;
    line-height: 1.57;
    margin: 0;
}

/* ===== 离线客户端 ===== */
.qb-offline {
    position: relative;
    width: 100%;
    height: 665px;
    overflow: hidden;
    padding: 92px 0 48px;
    background: #fff;
}

.qb-offline-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1440px;
    height: 665px;
    pointer-events: none;
}

.qb-offline-bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.qb-offline-inner {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.qb-offline-inner .qb-section-header {
    margin-bottom: 40px;
}

.qb-offline-content {
    display: grid;
    grid-template-columns: 1fr 120px 1fr;
    gap: 20px;
    align-items: start;
    flex: 1;
}

.qb-offline-side-title {
    font-size: 20px;
    font-weight: 600;
    color: #222;
    text-align: center;
    margin: 0 0 32px;
}

.qb-offline-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 21px;
    border-radius: 14px;
    margin-bottom: 24px;
    transition: all 0.3s ease;
}

.qb-offline-item:hover {
    transform: translateX(4px);
}

.qb-offline-item-blue {
    background: linear-gradient(90deg, #2370FE 0%, #849DFF 100%);
}

.qb-offline-item strong {
    font-weight: 600;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 21px;
}

.qb-offline-item span {
    font-weight: 500;
    font-size: 12px;
    color: #FFFFFF;
    line-height: 18px;
}

.qb-offline-item-blue strong,
.qb-offline-item-blue span {
    color: var(--qb-white) !important;
}

.qb-offline-item-white {
    background: var(--qb-white);
    border: 1px solid #E8EEFF;
}

.qb-offline-item-icon {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
}

.qb-offline-item div {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.qb-offline-item strong {
    font-size: 15px;
    font-weight: 600;
    color: var(--qb-ink);
}

.qb-offline-item span {
    font-size: 13px;
    color: var(--qb-muted);
}

.qb-offline-arrows {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    padding-top: 44px;
}

.qb-arrow-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
}

.qb-arrow-icon {
    width: 12px;
    height: 44px;
}

.qb-arrow-item span {
    display: block;
    background: #FFFFFF;
    border-radius: 100px 100px 100px 100px;
    border: 1px solid #DDDDDD;
    padding: 5px 13px;
    font-weight: 600;
    font-size: 12px;
    color: #0F62FE;
    line-height: 18px;
}

/* ===== 深入每个模块 ===== */
.qb-deep-modules {
    padding: 80px 0;
    background: var(--qb-white);
}

.qb-deep-block {
    margin-bottom: 49px;
}

.qb-deep-block-line {
    width: 100%;
    height: 1px;
    background: #DDDDDD;
    margin-bottom: 44px;
}

.qb-deep-block:last-child {
    margin-bottom: 0;
}

.qb-deep-title {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 18px;
}

.qb-deep-title-icon {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
}

.qb-deep-title h3 {
    font-size: 22px;
    font-weight: 600;
    color: #222;
    margin: 0;
}

.qb-deep-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.qb-deep-grid-2 {
    grid-template-columns: 1fr 1fr;
}

.qb-deep-card {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    padding: 21px 25px;
    background: #F4F7FB;
    border-radius: 14px;
    border: 1px solid #ddd;
    transition: all 0.3s ease;
}

.qb-deep-card:hover {
    box-shadow: 0 8px 24px rgba(15, 98, 254, 0.08);
    border-color: var(--qb-blue);
}

.qb-deep-card-icon {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
}

.qb-deep-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
}

.qb-deep-card strong {
    font-size: 16px;
    font-weight: 600;
    color: var(--qb-ink);
}

.qb-deep-card-list {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
}

.qb-deep-card-list li {
    font-size: 14px;
    color: #6A6A6A;
    line-height: 1.8;
    display: flex;
    align-items: center;
    gap: 8px;
}

.qb-deep-card-list li::before {
    content: '';
    display: block;
    width: 5px;
    height: 5px;
    background: #2370FE;
    border-radius: 3px;
    flex-shrink: 0;
}

.qb-deep-card-more {
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    background: #fff;
    border: 1px dashed #C8D6E5;
    gap: 0;
}

.qb-deep-card-more-icon {
    width: 36px;
    height: 36px;
    margin-bottom: 16px;
}

.qb-deep-card-more strong {
    font-size: 14px;
    color: #2370FE;
}

.qb-deep-card-more span {
    font-size: 12px;
    color: #929292;
}

/* ===== 为什么选择中测高科 ===== */
.qb-why-choose {
    position: relative;
    width: 100%;
    height: 481px;
    background: #fff;
    overflow: hidden;
}

.qb-why-choose-box {
    width: 1440px;
    height: 100%;
    position: relative;
    margin: 0 auto;
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
}

.qb-why-circle-br {
    width: 230px;
    height: 230px;
    left: -36px;
    bottom: -36px;
}

.qb-why-inner {
    position: relative;
    z-index: 3;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.qb-why-choose .qb-section-header {
    margin-bottom: 30px !important;
}

.qb-why-title {
    color: var(--qb-white) !important;
}

.qb-why-subtitle {
    color: rgba(255, 255, 255, 1) !important;
}

.qb-why-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}

.qb-why-card {
    background: var(--qb-white);
    border-radius: var(--qb-radius);
    padding: 16px 32px 32px 26px;
    transition: all 0.3s ease;
}

.qb-why-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.qb-why-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
}

.qb-why-card-top h3 {
    font-size: 20px;
    font-weight: 600;
    color: #0F62FE;
    margin: 0;
}

.qb-why-card-icon {
    width: 64px;
    height: 64px;
    flex-shrink: 0;
}

.qb-why-card p {
    font-size: 14px;
    color: #6A6A6A;
    line-height: 1.7;
    margin: 0;
}
</style>
