<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";

// 导航标签
const navTabs = [
  { label: "服务介绍", target: "service" },
  { label: "阅卷系统", target: "system" },
  { label: "联系我们", target: "contact" },
];
const activeNav = ref("service");

// 滚动到指定区域
const scrollToSection = (target: string) => {
  const el = document.getElementById(`marking-${target}`);
  if (el) {
    const headerOffset = 60;
    const y =
      el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

// 滚动时更新激活导航
const handleScroll = () => {
  const sections = navTabs.map((t) =>
    document.getElementById(`marking-${t.target}`),
  );
  const scrollY = window.scrollY + 120;
  for (let i = sections.length - 1; i >= 0; i--) {
    const sec = sections[i];
    const tab = navTabs[i];
    if (sec && tab && sec.offsetTop <= scrollY) {
      activeNav.value = tab.target;
      break;
    }
  }
};

// 滚动动画
const markingSection = ref<HTMLElement>();
const observerOptions = { threshold: 0.12 };

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  if (markingSection.value) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("marking-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    markingSection.value.querySelectorAll(".marking-animate").forEach((el) => {
      observer.observe(el as HTMLElement);
    });
  }
});

// ===================== 移动端（≤1024px）专用逻辑 =====================
// web 端根节点 .marking-page 的模板 / 样式 / 脚本保持零改动；
// 以下状态与副作用仅供移动根节点 .mm-page 使用，与桌面端互不干扰。
const mmSection = ref<HTMLElement>();
const mmNavRef = ref<HTMLElement>();
const mmActiveNav = ref("service");

// 滚动时高亮当前区块，并把激活的导航 tab 自动滚入横向可视区
const mmHandleScroll = () => {
  let current = navTabs[0]?.target ?? "service";
  const y = window.scrollY + 140;
  for (let i = navTabs.length - 1; i >= 0; i--) {
    const tab = navTabs[i];
    const el = tab ? document.getElementById(`mm-${tab.target}`) : null;
    if (tab && el && el.getBoundingClientRect().top + window.scrollY <= y) {
      current = tab.target;
      break;
    }
  }
  if (mmActiveNav.value !== current) {
    mmActiveNav.value = current;
    nextTick(() => {
      const activeTab = mmNavRef.value?.querySelector(
        ".mm-nav-tab-active",
      ) as HTMLElement | null;
      activeTab?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    });
  }
};

onMounted(() => {
  window.addEventListener("scroll", mmHandleScroll, { passive: true });
  if (mmSection.value) {
    const mmObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("mm-visible");
            mmObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    mmSection.value.querySelectorAll(".mm-animate").forEach((el) => {
      mmObserver.observe(el as HTMLElement);
    });
  }
});
</script>

<template>
  <div ref="markingSection" class="marking-page">
    <!-- ========== Banner ========== -->
    <section class="marking-banner">
      <div class="marking-banner-container">
        <div class="marking-banner-bg">
          <img
            src="/assets/images/marking/banner-bg.png"
            alt=""
            class="marking-banner-bg-img"
          />
        </div>
        <div class="marking-banner-content container-marking">
          <span class="marking-badge">全国大赛二等奖 · 第三代阅卷系统</span>
          <h1 class="marking-banner-title">
            中测阅卷服务<br /><span style="color: #1a1a2e"
              >AI智能阅卷云平台</span
            >
          </h1>
          <p class="marking-banner-desc comm-indent">
            全国社会化考试AI阅卷云平台，基于垂直领域自有大模型，实现全学科、全题型智能批改，让阅卷更高效、更公正、更准确。
          </p>
          <div class="marking-banner-actions">
            <NuxtLink
              class="marking-banner-btn marking-banner-btn-primary"
              to="/contact?product=2"
            >
              <img
                src="/assets/images/marking/phone-btn.png"
                alt=""
                class="marking-btn-icon"
              />
              预约演示
            </NuxtLink>
            <a
              class="marking-banner-btn marking-banner-btn-ghost"
              href="https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/materials/system.pdf"
              target="_blank"
              rel="noopener"
            >
              资料下载
              <img
                src="/assets/images/marking/system-btn.png"
                alt=""
                class="marking-btn-icon"
              />
            </a>
          </div>
        </div>
        <!-- 统计卡片 -->
        <div class="marking-stats-bar container-marking">
          <div class="marking-stats-content">
            <div class="marking-stat-item marking-animate">
              <strong
                ><span class="marking-count-number" v-count-up="28000"
                  >28,000</span
                ><span class="marking-stat-unit">余套</span></strong
              >
              <span>十余年行业沉淀</span>
            </div>
            <div class="marking-stat-item marking-animate">
              <strong
                ><span class="marking-count-number" v-count-up="2000"
                  >2,000</span
                ><span class="marking-stat-unit">万+人次</span></strong
              >
              <span>累计服务考生</span>
            </div>
            <div class="marking-stat-item marking-animate">
              <strong
                ><span class="marking-count-number" v-count-up="300">300</span
                ><span class="marking-stat-unit">%</span></strong
              >
              <span>比第二代阅卷效率提升</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 导航标签 ========== -->
    <nav class="marking-nav-bar">
      <div class="container-marking marking-nav-inner">
        <a
          v-for="tab in navTabs"
          :key="tab.target"
          class="marking-nav-tab"
          :class="{ 'marking-nav-tab-active': activeNav === tab.target }"
          @click.prevent="scrollToSection(tab.target)"
          href="javascript:void(0)"
        >
          <span class="marking-nav-tab-text">{{ tab.label }}</span>
        </a>
      </div>
    </nav>

    <!-- ========== 服务介绍 ========== -->
    <section
      id="marking-service"
      class="marking-section marking-service-section"
    >
      <div class="container-marking">
        <div
          class="marking-section-header marking-section-header-center marking-animate"
        >
          <span class="marking-section-en">服务介绍</span>
          <h2>为什么选择中测阅卷服务</h2>
          <div class="marking-section-subtitle1">人工阅卷+AI辅助</div>
          <p class="marking-section-subtitle colorBule">
            中测阅卷服务完整移植高考、公务员考试成熟的网上阅卷业务逻辑与质量管控体系，以匿名双评仲裁、全流程保密、大数据质量监控、大规模并发处理为核心，把国家级选拔考试的阅卷标准，转化为可落地的标准化阅卷外包服务。
          </p>
        </div>
        <div class="marking-box marking-animate">
          <div class="marking-box-item">
            <img
              src="/assets/images/marking/marking-service1.png"
              alt="服务介绍"
              class="marking-service-bg"
            />
            <div class="marking-service-content">
              <div class="marking-service-content-title">
                对标国家级 “背靠背双评 + 多评仲裁” 机制，保障评分公正客观
              </div>
              <div class="marking-service-content-text comm-indent">
                复刻高考、公考主观题阅卷规则：答卷题块切割、密号匿名流转，评卷人员看不到考生信息，实行背靠背独立双评；双评分差超出阈值自动触发三评，分歧较大提交专家组长终审仲裁，完整复刻
                “双评三评仲裁”
                评卷闭环，从流程上压缩人为打分偏差，保证评分尺度统一、结果可追溯。
              </div>
            </div>
          </div>
          <div class="marking-box-item">
            <img
              src="/assets/images/marking/marking-service2.png"
              alt="服务介绍"
              class="marking-service-bg"
            />
            <div class="marking-service-content">
              <div class="marking-service-content-title">
                对标高考公考全流程保密管控，筑牢考试安全底线
              </div>
              <div class="marking-service-content-text comm-indent">
                参照国家级考试保密规范，实现试卷扫描、加密传输、评阅、成绩统计全链路安全管控。答卷以电子密号流转，原始答卷与考生信息隔离；系统操作全程留痕，数据权限分级管控，严防漏题、人情评卷、信息泄露，满足人事考试、大规模选拔考试的保密要求。
              </div>
            </div>
          </div>
          <div class="marking-box-item">
            <img
              src="/assets/images/marking/marking-service3.png"
              alt="服务介绍"
              class="marking-service-bg"
            />
            <div class="marking-service-content">
              <div class="marking-service-content-title">
                高并发分布式技术，适配大规模考试批量处理
              </div>
              <div class="marking-service-content-text comm-indent">
                借鉴高考百万级试卷处理技术架构，中测智阅云采用分布式集群，支持海量试卷同步扫描识别、题块自动切割分发，可承接公考、事业单位招考等大规模集中阅卷任务，客观题机器自动判分，主观题人工
                + AI
                辅助质检，兼顾处理速度与识别精度，误差控制水平对标国家级考试标准。
              </div>
            </div>
          </div>
          <div class="marking-box-item">
            <img
              src="/assets/images/marking/marking-service4.png"
              alt="服务介绍"
              class="marking-service-bg"
            />
            <div class="marking-service-content">
              <div class="marking-service-content-title">
                完整质量监控体系，复刻官方阅卷质检模式
              </div>
              <div class="marking-service-content-text comm-indent">
                对标高考、公考阅卷实时质量监测机制：系统实时监控每一位评卷人员打分尺度，横向比对全体评卷者评分分布、纵向跟踪单人打分波动；设置专家组抽检复核、异常答卷自动预警，AI
                辅助质检，及时识别打分偏严偏松、雷同卷等问题，全程把控阅卷质量，避免尺度漂移。
              </div>
            </div>
          </div>
          <div class="marking-box-item">
            <img
              src="/assets/images/marking/marking-service5.png"
              alt="服务介绍"
              class="marking-service-bg"
            />
            <div class="marking-service-content">
              <div class="marking-service-content-title">
                全链条一体化交付，适配人事类考试场景
              </div>
              <div class="marking-service-content-text comm-indent">
                区别于普通教育阅卷系统，兼顾公务员、事业单位招考业务特点，提供上门扫描、异地专家评卷、AI
                辅助评阅、成绩校验、多维数据分析的一站式服务。既完全对齐高考标准化网上阅卷技术范式，又适配人事选拔考试业务规则，从扫描、评阅到成绩输出闭环落地，无需多方拼凑系统，降低组织方考务管理压力。
              </div>
            </div>
          </div>
        </div>
        <!-- 关于中测高科 -->
        <!-- <div class="marking-about marking-animate">
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
                                <strong><span class="marking-count-number" v-count-up="300">300</span><span
                                        class="marking-about-stat-plus">+</span></strong>
                                <span>专职命题专家</span>
                            </div>
                            <div class="marking-about-stat">
                                <strong><span class="marking-count-number" v-count-up="285">285</span></strong>
                                <span>个专业覆盖</span>
                            </div>
                            <div class="marking-about-stat">
                                <strong><span class="marking-count-number" v-count-up="20">20</span><span
                                        class="marking-about-stat-plus">TB+</span></strong>
                                <span>题库文件大小</span>
                            </div>
                            <div class="marking-about-stat">
                                <strong><span class="marking-count-number" v-count-up="1000">1000</span><span
                                        class="marking-about-stat-plus">+</span></strong>
                                <span>个细分学科</span>
                            </div>
                        </div>
                    </div>
                </div> -->
      </div>
    </section>

    <!-- ========== 阅卷系统 ========== -->
    <section id="marking-system" class="marking-section marking-system-section">
      <div
        class="marking-section-header marking-section-header-center marking-animate"
      >
        <span class="marking-section-en">阅卷系统</span>
        <h2>中测高科阅卷系统——中测智阅云阅卷平台介绍</h2>
        <p class="marking-section-subtitle">
          技术核心：AI + 大数据 +
          基于大数据处理、计算机视觉、自然语言理解与计算推理引擎，打造垂直领域AI阅卷大模型，全面覆盖客观题、简答题、论述题、作文题、翻译题等全部题型。
        </p>
      </div>
      <!-- 5个服务卡片 -->
      <div class="marking-service-cards marking-animate">
        <div class="marking-service-card">
          <img
            src="/assets/images/marking/service-icon1.png"
            alt=""
            class="marking-service-icon"
          />
          <h3>高效性</h3>
          <p>大幅提升工作效率与响应速度，一天阅万卷</p>
        </div>
        <div class="marking-service-card">
          <img
            src="/assets/images/marking/service-icon2.png"
            alt=""
            class="marking-service-icon"
          />
          <h3>公正性</h3>
          <p>确保评分过程的透明与一致，消除主观偏差</p>
        </div>
        <div class="marking-service-card">
          <img
            src="/assets/images/marking/service-icon3.png"
            alt=""
            class="marking-service-icon"
          />
          <h3>准确性</h3>
          <p>提高评分精度与一致性，AI+人工双重保障</p>
        </div>
        <div class="marking-service-card">
          <img
            src="/assets/images/marking/service-icon4.png"
            alt=""
            class="marking-service-icon"
          />
          <h3>数据分析</h3>
          <p>提供个性化教学与精准评估，数据驱动决策</p>
        </div>
        <div class="marking-service-card">
          <img
            src="/assets/images/marking/service-icon5.png"
            alt=""
            class="marking-service-icon"
          />
          <h3>节约成本</h3>
          <p>降低人力与物力成本，性价比远超传统模式</p>
        </div>
      </div>
      <!-- 系统构成概览 -->
      <div class="marking-overview marking-animate">
        <!-- <img src="/assets/images/marking/bg2.png" alt="系统构成概览" class="marking-overview-bg"> -->
        <h3 class="marking-overview-title">系统构成概览</h3>
        <div class="marking-overview-grid">
          <!-- 硬件构成 -->
          <div class="marking-hardware">
            <h4 class="marking-hardware-title">硬件构成</h4>
            <div class="marking-hardware-items">
              <div class="marking-hardware-item">
                <img
                  src="/assets/images/marking/constitute-icon1.png"
                  alt=""
                  class="marking-hardware-icon"
                />
                <div>
                  <strong>高性能笔记本电脑</strong>
                  <p>保障系统流畅运行与数据处理</p>
                </div>
              </div>
              <div class="marking-hardware-item">
                <img
                  src="/assets/images/marking/constitute-icon2.png"
                  alt=""
                  class="marking-hardware-icon"
                />
                <div>
                  <strong>高速扫描仪</strong>
                  <p>130ppm/260ipm，支持A3/A4多规格</p>
                </div>
              </div>
              <div class="marking-hardware-item">
                <img
                  src="/assets/images/marking/constitute-icon3.png"
                  alt=""
                  class="marking-hardware-icon"
                />
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
                <img
                  src="/assets/images/marking/constitute-icon4.png"
                  alt=""
                  class="marking-software-icon"
                />
                <div>
                  <strong>扫描识别系统</strong>
                  <p>答题卡数字化，OCR识别准确率100%</p>
                </div>
              </div>
              <div class="marking-software-item">
                <img
                  src="/assets/images/marking/constitute-icon5.png"
                  alt=""
                  class="marking-software-icon"
                />
                <div>
                  <strong>人工阅卷系统</strong>
                  <p>支持单评及多评模式，多层质量监控</p>
                </div>
              </div>
              <div class="marking-software-item">
                <img
                  src="/assets/images/marking/constitute-icon6.png"
                  alt=""
                  class="marking-software-icon"
                />
                <div>
                  <strong>AI阅卷系统</strong>
                  <p>自有大模型智能评分，支持异常检测</p>
                </div>
              </div>
              <div class="marking-software-item">
                <img
                  src="/assets/images/marking/constitute-icon7.png"
                  alt=""
                  class="marking-software-icon"
                />
                <div>
                  <strong>中控+数据分析系统</strong>
                  <p>全流程实时处理与可视化监控</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="marking-advantages marking-animate">
        <img
          src="/assets/images/marking/bg5.png"
          alt="产品优势"
          class="marking-advantages-bg"
        />
        <div class="marking-advantages-content">
          <h3 class="marking-advantages-title">产品优势</h3>
          <div class="marking-advantages-title-r">荣誉资质</div>
          <p class="marking-advantages-desc">
            Al阅卷相较于传统人工阅卷，具有自身的显著优势，中测智阅云系统是AI阅卷的行业标杆和领导品牌，获得同行业广泛认可和好评。
          </p>
          <div class="marking-advantages-grid">
            <div class="marking-adv-card">
              <div class="marking-adv-card-box"></div>
              <div><span>高效性：</span>大幅提升工作效率与响应速度</div>
            </div>
            <div class="marking-adv-card">
              <div class="marking-adv-card-box"></div>
              <div><span>公正性：</span>确保评分过程的透明与一致</div>
            </div>
            <div class="marking-adv-card">
              <div class="marking-adv-card-box"></div>
              <div><span>准确性：</span>提高评分精度与一致性</div>
            </div>
            <div class="marking-adv-card">
              <div class="marking-adv-card-box"></div>
              <div><span>数据收集与分析：</span>提供个性化教学与精准评估</div>
            </div>
            <div class="marking-adv-card">
              <div class="marking-adv-card-box"></div>
              <div><span>节约成本：</span>降低人力与物力成本</div>
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
              <p class="comm-indent">
                <span class="marking-highlight">高速扫描仪 + OCR技术</span
                >实现答题数字化，整合内外部数据源并过滤异常
              </p>
            </div>
            <div class="marking-arch-card marking-arch-card-2">
              <h4>AI处理层</h4>
              <p class="comm-indent">
                通过自研模型并引入<span class="marking-highlight"
                  >DeepSeek AI大模型</span
                >等技术，使用NLP模型对主观题答案进行智能评分，支持异常检测与实时接口服务
              </p>
            </div>
            <div class="marking-arch-card marking-arch-card-3">
              <h4>分布式架构层</h4>
              <p class="comm-indent">
                依托<span class="marking-highlight">Spark</span
                >实现实时处理与并行计算，通过数据汇聚、存储及独立异常检测模块保障高并发性能与系统安全
              </p>
            </div>
            <div class="marking-arch-card marking-arch-card-4">
              <h4>基础设施层</h4>
              <p class="comm-indent">
                基于<span class="marking-highlight">云计算</span
                >与网络优化资源调度，支持混合部署及可视化监控，实现高精度、高可靠的一体化服务
              </p>
            </div>
          </div>
        </div>
        <!-- 六大功能模块 -->
        <div class="marking-functions marking-animate">
          <h3 class="marking-functions-title">六大功能模块，全流程智能覆盖</h3>
          <div class="marking-functions-grid">
            <div class="marking-func-card marking-func-card-1">
              <h4>智能扫描识别</h4>
              <p class="comm-indent">
                依托高速扫描仪与自适应准确识别算法，实现边扫描、边识别、边阅卷三端联动。同步完成图像加密上传、考号OCR精准匹配、客观题智能赋分，各环节耗时压缩至传统流程的1/10。
              </p>
            </div>
            <div class="marking-func-card marking-func-card-2">
              <h4>AI智能阅卷</h4>
              <p class="comm-indent">
                集成CNN、NLP、Transformer及DeepSeek大模型等技术，实现中英文文本、数学公式及图表的精准识别。主观题AI阅卷深度提升80%以上。
              </p>
            </div>
            <div class="marking-func-card marking-func-card-3">
              <h4>人工阅卷协同</h4>
              <p class="comm-indent">
                支持单评、双评、三/四评并行阅卷及仲裁审核模式。双重身份验证保障数据安全，教师可一键跳转至目标试卷界面。
              </p>
            </div>
            <div class="marking-func-card marking-func-card-4">
              <h4>异常检测预警</h4>
              <p class="comm-indent">
                深度融合AI技术与多模态数据分析，精准识别缺考、作弊等异常行为，形成"监测-判定-追溯-纠偏"闭环管理。
              </p>
            </div>
            <div class="marking-func-card marking-func-card-5">
              <h4>专家复审机制</h4>
              <p class="comm-indent">
                AI阅卷完成后，系统自动标记异常并上报专家复核。利用视觉大模型精准评分，支持按得分点打分并判理由，差异超阈值自动触发仲裁。
              </p>
            </div>
            <div class="marking-func-card marking-func-card-6">
              <h4>成绩分析诊断</h4>
              <NuxtLink
                class="marking-func-btn"
                to="https://score-analysis-system.jxhrm.com"
                target="_blank"
                rel="noopener noreferrer"
                >立即演示</NuxtLink
              >
              <p class="comm-indent">
                基于自研垂直领域AI大模型，自动生成考试数据分析报告，涵盖试题难度分析、个人成绩剖析等多维度，为岗位胜任力模型构建提供科学依据。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 第三代产品 ========== -->
    <section class="marking-gen3">
      <div class="marking-gen3-bg">
        <img
          src="/assets/images/marking/bg3.png"
          alt=""
          class="marking-gen3-bg-img"
        />
      </div>
      <div class="container-marking marking-gen3-inner">
        <div class="marking-gen3-content">
          <h2 class="marking-gen3-title">第三代产品 · 全面升级</h2>
          <p class="marking-gen3-desc">
            扫描速度是二代的4倍以上，主观题AI阅卷效率较二代系统提高5倍，成本节约三分之二
          </p>
        </div>
        <div class="marking-gen3-rate">
          <strong
            ><span class="marking-count-number" v-count-up="300">300</span
            ><span class="marking-gen3-rate-unit">%</span></strong
          >
        </div>
      </div>
    </section>

    <!-- ========== 联系我们 ========== -->
    <section
      id="marking-contact"
      class="marking-section marking-contact-section"
    >
      <div class="marking-contact-bg">
        <img
          src="/assets/images/marking/bg4.png"
          alt=""
          class="marking-contact-bg-img"
        />
      </div>
      <div class="container-marking marking-contact-inner">
        <div
          class="marking-section-header marking-section-header-center marking-animate"
        >
          <span class="marking-section-en">联系我们</span>
          <h2>开启AI智能阅卷新时代</h2>
          <p class="marking-section-subtitle">
            无论您是教育机构、人事考试中心还是企业培训部门，我们都能为您提供定制化的AI阅卷解决方案。
          </p>
        </div>
        <div class="marking-contact-content marking-animate">
          <div class="marking-contact-left">
            <h3 class="marking-contact-company">
              中测高科（北京）人才测评中心有限公司
            </h3>
            <p class="marking-contact-desc">
              中国人事考试安全交付领导品牌，年均服务28000余套考试项目，累计服务考生超过2000万人次。我们期待与您合作，共同推动考试测评行业的智能化升级。
            </p>
            <div class="marking-contact-links">
              <div class="marking-contact-link">
                <img
                  src="/assets/images/marking/link-icon1.png"
                  alt=""
                  class="marking-link-icon"
                />
                <div class="marking-link-info">
                  <span class="marking-link-label">联系电话</span>
                  <p>139-7094-1607</p>
                </div>
              </div>
              <div class="marking-contact-link">
                <img
                  src="/assets/images/marking/link-icon2.png"
                  alt=""
                  class="marking-link-icon"
                />
                <div class="marking-link-info">
                  <span class="marking-link-label">公司地址</span>
                  <p>北京市朝阳区朝阳门南大街10号科锐国际</p>
                </div>
              </div>
              <div class="marking-contact-link">
                <img
                  src="/assets/images/marking/link-icon3.png"
                  alt=""
                  class="marking-link-icon"
                />
                <div class="marking-link-info">
                  <span class="marking-link-label">商务合作</span>
                  <p>欢迎预约演示，获取专属解决方案</p>
                </div>
              </div>
            </div>
          </div>
          <div class="marking-contact-right">
            <div class="marking-qrcode-box">
              <img
                src="/assets/images/marking/code-img.png"
                alt="微信扫码咨询"
                class="marking-qrcode-img"
              />
            </div>
            <p class="marking-qrcode-text">微信扫码咨询</p>
            <NuxtLink class="marking-contact-btn" to="/contact?product=2">
              <img
                src="/assets/images/marking/phone-btn.png"
                alt=""
                class="marking-contact-btn-icon"
              />
              立即咨询
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- ============================================================ -->
  <!-- ========== 移动端版本（≤1024px 生效，与 web 端零耦合）========== -->
  <!-- ============================================================ -->
  <div ref="mmSection" class="mm-page">
    <!-- ========== Banner ========== -->
    <section class="mm-banner">
      <div class="mm-banner-content mm-container">
        <span class="mm-badge">全国大赛二等奖 · 第三代阅卷系统</span>
        <h1 class="mm-banner-title">
          中测阅卷服务<br /><span>AI智能阅卷云平台</span>
        </h1>
        <p class="mm-banner-desc mm-indent">
          全国社会化考试AI阅卷云平台，基于垂直领域自有大模型，实现全学科、全题型智能批改，让阅卷更高效、更公正、更准确。
        </p>
        <div class="mm-banner-actions">
          <NuxtLink class="mm-btn mm-btn-primary" to="/contact?product=2">
            <img
              src="/assets/images/marking/phone-btn.png"
              alt=""
              class="mm-btn-icon"
            />预约演示
          </NuxtLink>
          <a
            class="mm-btn mm-btn-ghost"
            href="https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/materials/system.pdf"
            target="_blank"
            rel="noopener"
          >
            资料下载<img
              src="/assets/images/marking/system-btn.png"
              alt=""
              class="mm-btn-icon"
            />
          </a>
        </div>
      </div>
      <div class="mm-banner-hero mm-container">
        <img src="/assets/images/marking/banner-bg.png" alt="" />
      </div>
      <!-- 统计数字 -->
      <div class="mm-stats mm-container">
        <div class="mm-stat-item mm-animate">
          <strong
            ><span class="mm-count" v-count-up="28000">28,000</span
            ><em>余套</em></strong
          >
          <span>十余年行业沉淀</span>
        </div>
        <div class="mm-stat-item mm-animate">
          <strong
            ><span class="mm-count" v-count-up="2000">2,000</span
            ><em>万+人次</em></strong
          >
          <span>累计服务考生</span>
        </div>
        <div class="mm-stat-item mm-animate">
          <strong
            ><span class="mm-count" v-count-up="300">300</span
            ><em>%</em></strong
          >
          <span>比第二代阅卷效率提升</span>
        </div>
      </div>
    </section>

    <!-- ========== 锚点导航（横滑 sticky + 滚动高亮） ========== -->
    <nav class="mm-nav" ref="mmNavRef">
      <a
        v-for="tab in navTabs"
        :key="tab.target"
        class="mm-nav-tab"
        :class="{ 'mm-nav-tab-active': mmActiveNav === tab.target }"
        :href="`#mm-${tab.target}`"
      >
        {{ tab.label }}
      </a>
    </nav>

    <!-- ========== 服务介绍 ========== -->
    <section id="mm-service" class="mm-section mm-service">
      <div class="mm-container">
        <div class="mm-head mm-animate">
          <span class="mm-en">服务介绍</span>
          <h2>为什么选择中测阅卷服务</h2>
          <p class="mm-sub1">人工阅卷+AI辅助</p>
          <p class="mm-sub mm-sub-blue">
            中测阅卷服务完整移植高考、公务员考试成熟的网上阅卷业务逻辑与质量管控体系，以匿名双评仲裁、全流程保密、大数据质量监控、大规模并发处理为核心，把国家级选拔考试的阅卷标准，转化为可落地的标准化阅卷外包服务。
          </p>
        </div>
        <div class="mm-service-list">
          <div class="mm-service-item mm-animate">
            <div class="mm-service-head">
              <img
                src="/assets/images/marking/marking-service1.png"
                alt=""
                class="mm-service-icon"
              />
              <h3>对标国家级 “背靠背双评 + 多评仲裁” 机制，保障评分公正客观</h3>
            </div>
            <p class="mm-indent">
              复刻高考、公考主观题阅卷规则：答卷题块切割、密号匿名流转，评卷人员看不到考生信息，实行背靠背独立双评；双评分差超出阈值自动触发三评，分歧较大提交专家组长终审仲裁，完整复刻
              “双评三评仲裁”
              评卷闭环，从流程上压缩人为打分偏差，保证评分尺度统一、结果可追溯。
            </p>
          </div>
          <div class="mm-service-item mm-animate">
            <div class="mm-service-head">
              <img
                src="/assets/images/marking/marking-service2.png"
                alt=""
                class="mm-service-icon"
              />
              <h3>对标高考公考全流程保密管控，筑牢考试安全底线</h3>
            </div>
            <p class="mm-indent">
              参照国家级考试保密规范，实现试卷扫描、加密传输、评阅、成绩统计全链路安全管控。答卷以电子密号流转，原始答卷与考生信息隔离；系统操作全程留痕，数据权限分级管控，严防漏题、人情评卷、信息泄露，满足人事考试、大规模选拔考试的保密要求。
            </p>
          </div>
          <div class="mm-service-item mm-animate">
            <div class="mm-service-head">
              <img
                src="/assets/images/marking/marking-service3.png"
                alt=""
                class="mm-service-icon"
              />
              <h3>高并发分布式技术，适配大规模考试批量处理</h3>
            </div>
            <p class="mm-indent">
              借鉴高考百万级试卷处理技术架构，中测智阅云采用分布式集群，支持海量试卷同步扫描识别、题块自动切割分发，可承接公考、事业单位招考等大规模集中阅卷任务，客观题机器自动判分，主观题人工
              + AI
              辅助质检，兼顾处理速度与识别精度，误差控制水平对标国家级考试标准。
            </p>
          </div>
          <div class="mm-service-item mm-animate">
            <div class="mm-service-head">
              <img
                src="/assets/images/marking/marking-service4.png"
                alt=""
                class="mm-service-icon"
              />
              <h3>完整质量监控体系，复刻官方阅卷质检模式</h3>
            </div>
            <p class="mm-indent">
              对标高考、公考阅卷实时质量监测机制：系统实时监控每一位评卷人员打分尺度，横向比对全体评卷者评分分布、纵向跟踪单人打分波动；设置专家组抽检复核、异常答卷自动预警，AI
              辅助质检，及时识别打分偏严偏松、雷同卷等问题，全程把控阅卷质量，避免尺度漂移。
            </p>
          </div>
          <div class="mm-service-item mm-animate">
            <div class="mm-service-head">
              <img
                src="/assets/images/marking/marking-service5.png"
                alt=""
                class="mm-service-icon"
              />
              <h3>全链条一体化交付，适配人事类考试场景</h3>
            </div>
            <p class="mm-indent">
              区别于普通教育阅卷系统，兼顾公务员、事业单位招考业务特点，提供上门扫描、异地专家评卷、AI
              辅助评阅、成绩校验、多维数据分析的一站式服务。既完全对齐高考标准化网上阅卷技术范式，又适配人事选拔考试业务规则，从扫描、评阅到成绩输出闭环落地，无需多方拼凑系统，降低组织方考务管理压力。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 阅卷系统 ========== -->
    <section id="mm-system" class="mm-section mm-system">
      <div class="mm-container">
        <div class="mm-head mm-animate">
          <span class="mm-en">阅卷系统</span>
          <h2>中测高科阅卷系统——中测智阅云阅卷平台介绍</h2>
          <p class="mm-sub">
            技术核心：AI + 大数据 +
            基于大数据处理、计算机视觉、自然语言理解与计算推理引擎，打造垂直领域AI阅卷大模型，全面覆盖客观题、简答题、论述题、作文题、翻译题等全部题型。
          </p>
        </div>
        <!-- 5个服务卡片 -->
        <div class="mm-cards5 mm-animate">
          <div class="mm-card5">
            <img src="/assets/images/marking/service-icon1.png" alt="" />
            <h3>高效性</h3>
            <p>大幅提升工作效率与响应速度，一天阅万卷</p>
          </div>
          <div class="mm-card5">
            <img src="/assets/images/marking/service-icon2.png" alt="" />
            <h3>公正性</h3>
            <p>确保评分过程的透明与一致，消除主观偏差</p>
          </div>
          <div class="mm-card5">
            <img src="/assets/images/marking/service-icon3.png" alt="" />
            <h3>准确性</h3>
            <p>提高评分精度与一致性，AI+人工双重保障</p>
          </div>
          <div class="mm-card5">
            <img src="/assets/images/marking/service-icon4.png" alt="" />
            <h3>数据分析</h3>
            <p>提供个性化教学与精准评估，数据驱动决策</p>
          </div>
          <div class="mm-card5">
            <img src="/assets/images/marking/service-icon5.png" alt="" />
            <h3>节约成本</h3>
            <p>降低人力与物力成本，性价比远超传统模式</p>
          </div>
        </div>
        <!-- 系统构成概览（蓝底面板） -->
        <div class="mm-overview mm-animate">
          <h3 class="mm-overview-title">系统构成概览</h3>
          <div class="mm-overview-block">
            <h4>硬件构成</h4>
            <div class="mm-ov-item">
              <img src="/assets/images/marking/constitute-icon1.png" alt="" />
              <div>
                <strong>高性能笔记本电脑</strong>
                <p>保障系统流畅运行与数据处理</p>
              </div>
            </div>
            <div class="mm-ov-item">
              <img src="/assets/images/marking/constitute-icon2.png" alt="" />
              <div>
                <strong>高速扫描仪</strong>
                <p>130ppm/260ipm，支持A3/A4多规格</p>
              </div>
            </div>
            <div class="mm-ov-item">
              <img src="/assets/images/marking/constitute-icon3.png" alt="" />
              <div>
                <strong>高清摄像头</strong>
                <p>用于身份核验与实时监控</p>
              </div>
            </div>
          </div>
          <div class="mm-overview-block">
            <h4>软件系统</h4>
            <div class="mm-ov-item">
              <img src="/assets/images/marking/constitute-icon4.png" alt="" />
              <div>
                <strong>扫描识别系统</strong>
                <p>答题卡数字化，OCR识别准确率100%</p>
              </div>
            </div>
            <div class="mm-ov-item">
              <img src="/assets/images/marking/constitute-icon5.png" alt="" />
              <div>
                <strong>人工阅卷系统</strong>
                <p>支持单评及多评模式，多层质量监控</p>
              </div>
            </div>
            <div class="mm-ov-item">
              <img src="/assets/images/marking/constitute-icon6.png" alt="" />
              <div>
                <strong>AI阅卷系统</strong>
                <p>自有大模型智能评分，支持异常检测</p>
              </div>
            </div>
            <div class="mm-ov-item">
              <img src="/assets/images/marking/constitute-icon7.png" alt="" />
              <div>
                <strong>中控+数据分析系统</strong>
                <p>全流程实时处理与可视化监控</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 产品优势 + 荣誉资质（bg5 装饰底图） -->
        <div class="mm-advantages mm-animate">
          <div class="mm-adv-bg">
            <img src="/assets/images/marking/bg5.png" alt="" />
          </div>
          <div class="mm-adv-inner">
            <div class="mm-adv-head">
              <h3>产品优势</h3>
              <span class="mm-adv-honor">荣誉资质</span>
            </div>
            <p class="mm-adv-desc">
              Al阅卷相较于传统人工阅卷，具有自身的显著优势，中测智阅云系统是AI阅卷的行业标杆和领导品牌，获得同行业广泛认可和好评。
            </p>
            <div class="mm-adv-list">
              <div class="mm-adv-card">
                <i></i>
                <div><span>高效性：</span>大幅提升工作效率与响应速度</div>
              </div>
              <div class="mm-adv-card">
                <i></i>
                <div><span>公正性：</span>确保评分过程的透明与一致</div>
              </div>
              <div class="mm-adv-card">
                <i></i>
                <div><span>准确性：</span>提高评分精度与一致性</div>
              </div>
              <div class="mm-adv-card">
                <i></i>
                <div><span>数据收集与分析：</span>提供个性化教学与精准评估</div>
              </div>
              <div class="mm-adv-card">
                <i></i>
                <div><span>节约成本：</span>降低人力与物力成本</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 四层架构设计 -->
        <div class="mm-arch mm-animate">
          <h3 class="mm-block-title">四层架构设计</h3>
          <div class="mm-arch-list">
            <div class="mm-arch-card mm-arch-1">
              <h4>数据集成层</h4>
              <p class="mm-indent">
                <span class="mm-hl">高速扫描仪 + OCR技术</span
                >实现答题数字化，整合内外部数据源并过滤异常
              </p>
            </div>
            <div class="mm-arch-card mm-arch-2">
              <h4>AI处理层</h4>
              <p class="mm-indent">
                通过自研模型并引入<span class="mm-hl">DeepSeek AI大模型</span
                >等技术，使用NLP模型对主观题答案进行智能评分，支持异常检测与实时接口服务
              </p>
            </div>
            <div class="mm-arch-card mm-arch-3">
              <h4>分布式架构层</h4>
              <p class="mm-indent">
                依托<span class="mm-hl">Spark</span
                >实现实时处理与并行计算，通过数据汇聚、存储及独立异常检测模块保障高并发性能与系统安全
              </p>
            </div>
            <div class="mm-arch-card mm-arch-4">
              <h4>基础设施层</h4>
              <p class="mm-indent">
                基于<span class="mm-hl">云计算</span
                >与网络优化资源调度，支持混合部署及可视化监控，实现高精度、高可靠的一体化服务
              </p>
            </div>
          </div>
        </div>
        <!-- 六大功能模块 -->
        <div class="mm-funcs mm-animate">
          <h3 class="mm-block-title">六大功能模块，全流程智能覆盖</h3>
          <div class="mm-func-list">
            <div class="mm-func-card">
              <div class="mm-func-band mm-func-band-1"></div>
              <div class="mm-func-body">
                <h4>智能扫描识别</h4>
                <p class="mm-indent">
                  依托高速扫描仪与自适应准确识别算法，实现边扫描、边识别、边阅卷三端联动。同步完成图像加密上传、考号OCR精准匹配、客观题智能赋分，各环节耗时压缩至传统流程的1/10。
                </p>
              </div>
            </div>
            <div class="mm-func-card">
              <div class="mm-func-band mm-func-band-2"></div>
              <div class="mm-func-body">
                <h4>AI智能阅卷</h4>
                <p class="mm-indent">
                  集成CNN、NLP、Transformer及DeepSeek大模型等技术，实现中英文文本、数学公式及图表的精准识别。主观题AI阅卷深度提升80%以上。
                </p>
              </div>
            </div>
            <div class="mm-func-card">
              <div class="mm-func-band mm-func-band-3"></div>
              <div class="mm-func-body">
                <h4>人工阅卷协同</h4>
                <p class="mm-indent">
                  支持单评、双评、三/四评并行阅卷及仲裁审核模式。双重身份验证保障数据安全，教师可一键跳转至目标试卷界面。
                </p>
              </div>
            </div>
            <div class="mm-func-card">
              <div class="mm-func-band mm-func-band-4"></div>
              <div class="mm-func-body">
                <h4>异常检测预警</h4>
                <p class="mm-indent">
                  深度融合AI技术与多模态数据分析，精准识别缺考、作弊等异常行为，形成“监测-判定-追溯-纠偏”闭环管理。
                </p>
              </div>
            </div>
            <div class="mm-func-card">
              <div class="mm-func-band mm-func-band-5"></div>
              <div class="mm-func-body">
                <h4>专家复审机制</h4>
                <p class="mm-indent">
                  AI阅卷完成后，系统自动标记异常并上报专家复核。利用视觉大模型精准评分，支持按得分点打分并判理由，差异超阈值自动触发仲裁。
                </p>
              </div>
            </div>
            <div class="mm-func-card">
              <div class="mm-func-band mm-func-band-6"></div>
              <div class="mm-func-body">
                <h4>成绩分析诊断</h4>
                <NuxtLink
                  class="mm-func-btn"
                  to="https://score-analysis-system.jxhrm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  >立即演示</NuxtLink
                >
                <p class="mm-indent">
                  基于自研垂直领域AI大模型，自动生成考试数据分析报告，涵盖试题难度分析、个人成绩剖析等多维度，为岗位胜任力模型构建提供科学依据。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 第三代产品（bg3） ========== -->
    <section class="mm-gen3">
      <div class="mm-gen3-bg">
        <img src="/assets/images/marking/bg3.png" alt="" />
      </div>
      <div class="mm-container mm-gen3-inner mm-animate">
        <h2>第三代产品 · 全面升级</h2>
        <p>
          扫描速度是二代的4倍以上，主观题AI阅卷效率较二代系统提高5倍，成本节约三分之二
        </p>
        <div class="mm-gen3-rate">
          <strong
            ><span class="mm-count" v-count-up="300">300</span
            ><em>%</em></strong
          >
        </div>
      </div>
    </section>

    <!-- ========== 联系我们（bg4） ========== -->
    <section id="mm-contact" class="mm-section mm-contact">
      <div class="mm-contact-bg">
        <img src="/assets/images/marking/bg4.png" alt="" />
      </div>
      <div class="mm-container mm-contact-inner">
        <div class="mm-head mm-animate">
          <span class="mm-en">联系我们</span>
          <h2>开启AI智能阅卷新时代</h2>
          <p class="mm-sub">
            无论您是教育机构、人事考试中心还是企业培训部门，我们都能为您提供定制化的AI阅卷解决方案。
          </p>
        </div>
        <div class="mm-contact-body mm-animate">
          <h3 class="mm-contact-company">
            中测高科（北京）人才测评中心有限公司
          </h3>
          <p class="mm-contact-desc">
            中国人事考试安全交付领导品牌，年均服务28000余套考试项目，累计服务考生超过2000万人次。我们期待与您合作，共同推动考试测评行业的智能化升级。
          </p>
          <div class="mm-contact-links">
            <div class="mm-contact-link">
              <img src="/assets/images/marking/link-icon1.png" alt="" />
              <div>
                <span class="mm-link-label">联系电话</span>
                <p>139-7094-1607</p>
              </div>
            </div>
            <div class="mm-contact-link">
              <img src="/assets/images/marking/link-icon2.png" alt="" />
              <div>
                <span class="mm-link-label">公司地址</span>
                <p>北京市朝阳区朝阳门南大街10号科锐国际</p>
              </div>
            </div>
            <div class="mm-contact-link">
              <img src="/assets/images/marking/link-icon3.png" alt="" />
              <div>
                <span class="mm-link-label">商务合作</span>
                <p>欢迎预约演示，获取专属解决方案</p>
              </div>
            </div>
          </div>
          <div class="mm-qrcode">
            <div class="mm-qrcode-box">
              <img
                src="/assets/images/marking/code-img.png"
                alt="微信扫码咨询"
              />
            </div>
            <p class="mm-qrcode-text">微信扫码咨询</p>
          </div>
          <NuxtLink class="mm-contact-btn" to="/contact?product=2">
            <img
              src="/assets/images/marking/phone-btn.png"
              alt=""
              class="mm-btn-icon"
            />立即咨询
          </NuxtLink>
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
.marking-page {
  --marking-blue: #0f62fe;
  --marking-blue-dark: #1365fe;
  --marking-blue-mid: #3671eb;
  --marking-ink: #1a1a2e;
  --marking-muted: #5a6578;
  --marking-bg: #f4f7fb;
  --marking-white: #fff;
  --marking-border: #e2e8f0;
  --marking-radius: 12px;
  font-family:
    Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui,
    sans-serif;
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
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
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
  background: linear-gradient(159deg, #ffffff 0%, #eef3fa 40%, #dce8f5 100%);
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
  background: #e8f0fa;
  color: #1a5fa8;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.05em;
  margin-bottom: 40px;
  position: relative;
}

.marking-badge::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #0f62fe;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 15px;
}

.marking-banner-title {
  font-size: clamp(36px, 4.5vw, 56px);
  font-weight: 600;
  color: #0f62fe;
  line-height: 1.2;
  letter-spacing: 2px;
  margin: 0 0 37px;
}

.marking-banner-desc {
  color: #5a6578;
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
  background: #0f62fe;
  color: #fff;
}

.marking-banner-btn-primary:hover {
  background: #0043ce;
  box-shadow: 0 6px 20px rgba(15, 98, 254, 0.4);
  transform: translateY(-2px);
}

.marking-banner-btn-ghost {
  background: #fff;
  color: #1a1a2e;
}

.marking-banner-btn-ghost:hover {
  background: rgba(15, 98, 254, 0.05);
  color: #0f62fe;
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
  color: #0f62fe;
  line-height: 1.2;
}

.marking-stat-unit {
  font-size: 14px;
  font-weight: 500;
  color: #0f62fe !important;
  margin-left: 4px;
}

.marking-stat-item span {
  font-size: 13px;
  color: #8892a4;
  font-weight: 400;
}

.marking-count-number {
  font-size: inherit !important;
  font-weight: inherit !important;
  color: inherit !important;
}

/* ===== 导航标签 ===== */
.marking-nav-bar {
  position: sticky;
  top: 76px;
  z-index: 10;
  background: #f4f7fb;
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
  color: #0f62fe;
}

.marking-nav-tab-active {
  color: #0f62fe;
  font-weight: 600;
}

.marking-nav-tab-active .marking-nav-tab-text::after {
  content: "";
  position: absolute;
  bottom: -21px;
  left: 0;
  width: 100%;
  height: 3px;
  background: #0f62fe;
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
  color: #0f62fe;
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
  max-width: 680px;
}

.colorBule {
  font-weight: 600;
  max-width: 900px;
  color: #0f62fe;
}

.marking-section-subtitle1 {
  font-weight: 600;
  font-size: 20px;
  color: #1a1a2e;
  line-height: 27px;
  margin-bottom: 20px;
}

.marking-subtitle-light {
  color: rgba(255, 255, 255, 0.8) !important;
}

/* ===== 服务介绍 ===== */
.marking-service-section {
  padding-top: 44px;
  padding-bottom: 77px;
  background: var(--marking-white);
}

.marking-box {
  width: 1168px;
  margin: 39px auto 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.marking-box-item {
  width: 100%;
  height: 126px;
  padding: 24px 30px 24px 23px;
  display: flex;
  gap: 13px;
  align-items: center;
  border-radius: 8px;
  background: #f3f7ff;
}

.marking-service-bg {
  width: 78px;
  height: 78px;
}

.marking-service-content-title {
  font-weight: 600;
  font-size: 20px;
  color: #1a1a2e;
  margin-bottom: 9px;
}

.marking-service-content-text {
  font-weight: 400;
  font-size: 14px;
  color: #5a5a5a;
  line-height: 23px;
}

.marking-service-cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
  margin: 0 auto 35px;
  max-width: 1200px;
}

.marking-service-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 29px 29px 33px;
  background: #fff;
  border-radius: var(--marking-radius);
  border: 1px solid #e8eeff;
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
  color: #1a1a2e;
  margin: 0;
}

.marking-service-card p {
  font-size: 13px;
  color: #8892a4;
  line-height: 1.6;
  margin: 0;
}

/* 关于中测高科 */
.marking-about {
  display: grid;
  grid-template-columns: 480px 1fr;
  gap: 64px;
  align-items: stretch;
  background: #0f62fe;
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
  background: #d6eaf8;
  border-radius: 999px;
  color: #0f62fe;
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
  border: 1px solid #f0f2f5;
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
  background: #0f62fe;
  width: 1440px;
  height: 437px;
  padding: 27px 137px 53px;
  margin: 0 auto;
  /* margin-bottom: 20px; */
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

.marking-overview-grid > div {
  background: #ffffff;
  border-radius: 12px 12px 12px 12px;
  padding: 18px 24px 27px;
}

.marking-hardware-title,
.marking-software-title {
  font-size: 18px;
  font-weight: bold;
  color: #1a1a2e;
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
  background: #f4f7fb;
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
  color: #1a1a2e;
  margin-bottom: 4px;
}

.marking-hardware-item p,
.marking-software-item p {
  font-size: 14px;
  color: #5a6578;
  line-height: 1.5;
  margin: 0;
}

/* 四层架构设计 */
.marking-architecture {
  margin-bottom: 38px;
}

.marking-architecture-title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a2e;
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
  background: linear-gradient(180deg, #dde7fb 0%, #ffffff 100%);
}

.marking-arch-card-2 {
  background: linear-gradient(180deg, #fdefe9 0%, #ffffff 100%);
}

.marking-arch-card-3 {
  background: linear-gradient(180deg, #fdf4ea 0%, #ffffff 100%);
}

.marking-arch-card-4 {
  background: linear-gradient(180deg, #dffbf6 0%, #ffffff 100%);
}

.marking-arch-card h4 {
  font-size: 16px;
  font-weight: bold;
  color: #1a1a2e;
  margin: 0 0 33px;
}

.marking-arch-card p {
  font-size: 14px;
  color: #5a6578;
  line-height: 1.7;
  margin: 0;
}

.marking-highlight {
  color: #0f62fe;
  font-weight: 600;
}

/* 六大功能模块 */
.marking-functions {
  margin-top: 38px;
}

.marking-functions-title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a2e;
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
  background-image: url("/assets/images/marking/power-icon1.png");
}

.marking-func-card-2 {
  background-image: url("/assets/images/marking/power-icon2.png");
}

.marking-func-card-3 {
  background-image: url("/assets/images/marking/power-icon3.png");
}

.marking-func-card-4 {
  background-image: url("/assets/images/marking/power-icon4.png");
}

.marking-func-card-5 {
  background-image: url("/assets/images/marking/power-icon5.png");
}

.marking-func-card-6 {
  background-image: url("/assets/images/marking/power-icon6.png");
}

.marking-func-card h4 {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 18px;
}

.marking-func-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 17px;
  background: transparent;
  color: #0f62fe;
  font-size: 14px;
  font-weight: 500;
  border-radius: 2px;
  border: 1px solid #0f62fe;
  text-decoration: none;
  transition: all 0.3s ease;
  width: fit-content;
  margin: 0;
}

.marking-func-btn:hover {
  background: #0f62fe;
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
  color: #1a1a2e;
  margin: 0 0 22px;
}

.marking-contact-desc {
  font-size: 15px;
  color: #5a6578;
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
  color: #8892a4;
  line-height: 1.6;
}

.marking-contact-link p {
  font-size: 15px;
  color: #1a1a2e;
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
  border: 1px solid #f0f2f5;
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
  color: #8892a4;
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
  background: #0f62fe;
  color: var(--marking-white);
  font-size: 16px;
  font-weight: 600;
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.marking-contact-btn:hover {
  background: #0043ce;
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

.marking-advantages {
  position: relative;
  width: 1440px;
  margin: 0 auto 44px;
  height: 529px;
}

.marking-advantages-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 1440px;
  height: 100%;
  z-index: 1;
}

.marking-advantages-content {
  position: relative;
  z-index: 2;
  padding: 44px 0 43px 131px;
  height: 100%;
}

.marking-advantages-title {
  color: #1a1a2e;
  font-size: 24px;
  line-height: 38px;
  font-weight: 600;
  margin-bottom: 8px;
}

.marking-advantages-title-r {
  position: absolute;
  top: 44px;
  right: 140px;
  font-weight: 600;
  font-size: 24px;
  color: #1a1a2e;
  line-height: 38px;
}

.marking-advantages-desc {
  font-weight: 400;
  font-size: 16px;
  color: #6d7789;
  line-height: 17px;
  margin: 0 0 17px;
  max-width: 512px;
}

.marking-advantages-grid {
  display: flex;
  gap: 16px;
  flex-direction: column;
}

.marking-adv-card {
  width: 384px;
  height: 56px;
  background: #fff;
  padding-left: 25px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: #1a1a2e;
  line-height: 26px;
  font-weight: 500;
  border-radius: 4px 4px 4px 4px;
}

.marking-adv-card span {
  font-weight: bold;
}

.marking-adv-card-box {
  width: 10px;
  height: 10px;
  background: #0f62fe;
  border-radius: 2px 2px 2px 2px;
}
/* ============================================================
   移动端版本（mm- 前缀，≤1024px 生效，web 端 DOM/CSS/script 零改动）
   · 桌面（>1024px）隐藏移动根；≤1024px 隐藏桌面根、显示移动根
   · 所有移动样式限定在 .mm-page 作用域内
   · 不给 .mm-page 设 overflow:hidden，避免破坏 .mm-nav 的 sticky
   ============================================================ */
.mm-page {
  display: none;
}

@media (max-width: 1024px) {
  .marking-page {
    display: none;
  }
  .mm-page {
    display: block;
  }
}

/* ===== 移动根变量与基础 ===== */
.mm-page {
  --mm-blue: #0f62fe;
  --mm-ink: #1a1a2e;
  --mm-muted: #5a6578;
  --mm-bg: #f4f7fb;
  --mm-white: #fff;
  --mm-border: #e2e8f0;
  font-family:
    Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui,
    sans-serif;
  color: var(--mm-ink);
  background: var(--mm-white);
}

.mm-container {
  width: min(100% - 32px, 720px);
  margin: 0 auto;
}

.mm-indent {
  text-indent: 2em;
}

/* 数字动画：后缀继承父级字号/颜色 */
.mm-count {
  font-size: inherit !important;
  font-weight: inherit !important;
  color: inherit !important;
}

.mm-page em {
  font-style: normal;
}

/* 入场动画（移动独立 observer 命中后加 .mm-visible） */
.mm-animate {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}
.mm-animate.mm-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===== Banner ===== */
.mm-banner {
  position: relative;
  padding: 32px 0 26px;
  background: linear-gradient(159deg, #ffffff 0%, #eef3fa 40%, #dce8f5 100%);
}
.mm-banner-content {
  position: relative;
  z-index: 2;
}
.mm-badge {
  position: relative;
  display: inline-block;
  padding: 6px 14px 6px 26px;
  margin-bottom: 18px;
  border-radius: 999px;
  background: #e8f0fa;
  color: #1a5fa8;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
}
.mm-badge::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #0f62fe;
}
.mm-banner-title {
  margin: 0 0 14px;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 1px;
  color: #0f62fe;
}
.mm-banner-title span {
  color: #1a1a2e;
}
.mm-banner-desc {
  margin: 0 0 22px;
  font-size: 14px;
  line-height: 1.8;
  color: #5a6578;
}
.mm-banner-actions {
  display: flex;
  gap: 12px;
}
.mm-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 16px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
}
.mm-btn-primary {
  background: #0f62fe;
  color: #fff;
}
.mm-btn-ghost {
  background: #fff;
  color: #1a1a2e;
  border: 1px solid #dce8f5;
}
.mm-btn-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
.mm-banner-hero {
  margin-top: 22px;
}
.mm-banner-hero img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 12px;
}
.mm-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 18px;
}
.mm-stat-item {
  text-align: center;
  padding: 14px 6px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
}
.mm-stat-item strong {
  display: block;
  font-size: 22px;
  font-weight: 700;
  color: #0f62fe;
  line-height: 1.2;
}
.mm-stat-item em {
  font-size: 12px;
  font-weight: 600;
  margin-left: 2px;
}
.mm-stat-item > span {
  display: block;
  margin-top: 6px;
  font-size: 11px;
  line-height: 1.4;
  color: #8892a4;
}

/* ===== 锚点导航（横滑 sticky）===== */
.mm-nav {
  position: sticky;
  top: 76px;
  z-index: 15;
  display: flex;
  gap: 4px;
  padding: 0 8px;
  background: #f4f7fb;
  border-bottom: 1px solid var(--mm-border);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.mm-nav::-webkit-scrollbar {
  display: none;
}
.mm-nav-tab {
  position: relative;
  flex: 1;
  flex-shrink: 0;
  text-align: center;
  padding: 14px 10px;
  font-size: 14px;
  font-weight: 500;
  color: #161616;
  text-decoration: none;
  white-space: nowrap;
}
.mm-nav-tab-active {
  color: #0f62fe;
  font-weight: 700;
}
.mm-nav-tab-active::after {
  content: "";
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 6px;
  height: 3px;
  border-radius: 2px 2px 0 0;
  background: #0f62fe;
}

/* ===== 通用 section / 标题 ===== */
.mm-section {
  position: relative;
  padding: 40px 0;
  scroll-margin-top: 130px;
}
.mm-head {
  text-align: center;
  margin-bottom: 24px;
}
.mm-en {
  display: block;
  margin-bottom: 6px;
  color: #0f62fe;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
}
.mm-head h2 {
  margin: 0 0 10px;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 1px;
  color: #161616;
}
.mm-sub {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: var(--mm-muted);
}
.mm-sub1 {
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
}
.mm-sub-blue {
  font-weight: 600;
  color: #0f62fe;
}
.mm-block-title {
  margin: 0 0 18px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: #1a1a2e;
}
.mm-hl {
  color: #0f62fe;
  font-weight: 600;
}

/* ===== 服务介绍 ===== */
.mm-service {
  background: #fff;
  padding-top: 32px;
}
.mm-service-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.mm-service-item {
  padding: 18px 16px;
  background: #f3f7ff;
  border-radius: 10px;
}
.mm-service-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.mm-service-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}
.mm-service-head h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  color: #1a1a2e;
}
.mm-service-item p {
  margin: 0;
  font-size: 13px;
  line-height: 1.75;
  color: #5a5a5a;
}

/* ===== 阅卷系统 ===== */
.mm-system {
  background: #f4f7fb;
}
.mm-cards5 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.mm-card5 {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding: 20px 14px;
  background: #fff;
  border: 1px solid #e8eeff;
  border-radius: 12px;
}
.mm-card5:last-child {
  grid-column: 1 / -1;
}
.mm-card5 img {
  width: 52px;
  height: 52px;
}
.mm-card5 h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #1a1a2e;
}
.mm-card5 p {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
  color: #8892a4;
}

/* 系统构成概览（蓝底面板） */
.mm-overview {
  margin-top: 28px;
  padding: 24px 18px;
  background: #0f62fe;
  border-radius: 14px;
}
.mm-overview-title {
  margin: 0 0 18px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: #fff;
}
.mm-overview-block {
  padding: 18px 16px;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 14px;
}
.mm-overview-block:last-child {
  margin-bottom: 0;
}
.mm-overview-block h4 {
  margin: 0 0 14px;
  font-size: 16px;
  font-weight: 700;
  color: #1a1a2e;
}
.mm-ov-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: #f4f7fb;
  border-radius: 8px;
  margin-bottom: 10px;
}
.mm-ov-item:last-child {
  margin-bottom: 0;
}
.mm-ov-item img {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}
.mm-ov-item strong {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
}
.mm-ov-item p {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #5a6578;
}

/* 产品优势 + 荣誉资质 */
.mm-advantages {
  margin-top: 28px;
  border-radius: 14px;
  overflow: hidden;
  background: #eaf1fe;
}
.mm-adv-bg {
  line-height: 0;
}
.mm-adv-bg img {
  display: block;
  width: 100%;
  height: auto;
}
.mm-adv-inner {
  padding: 20px 18px 24px;
}
.mm-adv-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
}
.mm-adv-head h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
}
.mm-adv-honor {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
}
.mm-adv-desc {
  margin: 0 0 16px;
  font-size: 13px;
  line-height: 1.7;
  color: #6d7789;
}
.mm-adv-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.mm-adv-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: #fff;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.5;
  color: #1a1a2e;
}
.mm-adv-card i {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  background: #0f62fe;
  border-radius: 2px;
}
.mm-adv-card span {
  font-weight: 700;
}

/* 四层架构设计 */
.mm-arch {
  margin-top: 32px;
}
.mm-arch-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.mm-arch-card {
  padding: 20px 18px;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
}
.mm-arch-1 {
  background: linear-gradient(180deg, #dde7fb 0%, #ffffff 100%);
}
.mm-arch-2 {
  background: linear-gradient(180deg, #fdefe9 0%, #ffffff 100%);
}
.mm-arch-3 {
  background: linear-gradient(180deg, #fdf4ea 0%, #ffffff 100%);
}
.mm-arch-4 {
  background: linear-gradient(180deg, #dffbf6 0%, #ffffff 100%);
}
.mm-arch-card h4 {
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 700;
  color: #1a1a2e;
}
.mm-arch-card p {
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
  color: #5a6578;
}

/* 六大功能模块 */
.mm-funcs {
  margin-top: 32px;
}
.mm-func-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.mm-func-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
}
.mm-func-band {
  height: 120px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mm-func-band-1 {
  background-image: url("/assets/images/marking/power-icon1.png");
}
.mm-func-band-2 {
  background-image: url("/assets/images/marking/power-icon2.png");
}
.mm-func-band-3 {
  background-image: url("/assets/images/marking/power-icon3.png");
}
.mm-func-band-4 {
  background-image: url("/assets/images/marking/power-icon4.png");
}
.mm-func-band-5 {
  background-image: url("/assets/images/marking/power-icon5.png");
}
.mm-func-band-6 {
  background-image: url("/assets/images/marking/power-icon6.png");
}
.mm-func-body {
  padding: 16px 18px 20px;
}
.mm-func-body h4 {
  margin: 0 0 12px;
  font-size: 17px;
  font-weight: 600;
  color: #1a1a2e;
}
.mm-func-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 16px;
  border: 1px solid #0f62fe;
  color: #0f62fe;
  font-size: 13px;
  font-weight: 500;
  border-radius: 4px;
  text-decoration: none;
}
.mm-func-body p {
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 1.7;
  color: #333;
}

/* ===== 第三代产品 ===== */
.mm-gen3 {
  position: relative;
  padding-bottom: 34px;
  background: #1365fe;
}
.mm-gen3-bg {
  line-height: 0;
}
.mm-gen3-bg img {
  display: block;
  width: 100%;
  height: auto;
}
.mm-gen3-inner {
  position: relative;
  text-align: center;
  padding-top: 26px;
}
.mm-gen3-inner h2 {
  margin: 0 0 10px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #fff;
}
.mm-gen3-inner p {
  margin: 0 0 18px;
  font-size: 14px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
}
.mm-gen3-rate strong {
  font-size: 56px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
}
.mm-gen3-rate em {
  font-size: 24px;
  font-weight: 600;
}

/* ===== 联系我们 ===== */
.mm-contact {
  background: #f4f7fb;
}
.mm-contact-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  line-height: 0;
  pointer-events: none;
}
.mm-contact-bg img {
  display: block;
  width: 100%;
  height: auto;
}
.mm-contact-inner {
  position: relative;
  z-index: 2;
}
.mm-contact-body {
  padding: 24px 20px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid #f0f2f5;
  border-radius: 16px;
}
.mm-contact-company {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  color: #1a1a2e;
}
.mm-contact-desc {
  margin: 0 0 20px;
  font-size: 13px;
  line-height: 1.8;
  color: #5a6578;
}
.mm-contact-links {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 24px;
}
.mm-contact-link {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.mm-contact-link img {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}
.mm-link-label {
  display: block;
  margin-bottom: 2px;
  font-size: 12px;
  color: #8892a4;
}
.mm-contact-link p {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: #1a1a2e;
}
.mm-qrcode {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.mm-qrcode-box {
  width: 160px;
  height: 160px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}
.mm-qrcode-box img {
  width: 160px;
  height: 160px;
  border-radius: 16px;
}
.mm-qrcode-text {
  margin: 0;
  font-size: 12px;
  color: #8892a4;
}
.mm-contact-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px 20px;
  background: #0f62fe;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
}

/* ===== 手机级微调 ===== */
@media (max-width: 560px) {
  .mm-nav {
    top: 66px;
  }
  .mm-section {
    scroll-margin-top: 120px;
  }
  .mm-banner-title {
    font-size: 26px;
  }
  .mm-head h2 {
    font-size: 21px;
  }
  .mm-gen3-rate strong {
    font-size: 48px;
  }
}

@media (max-width: 380px) {
  .mm-stat-item strong {
    font-size: 19px;
  }
  .mm-stat-item > span {
    font-size: 10px;
  }
  .mm-banner-actions {
    flex-direction: column;
  }
}
</style>
