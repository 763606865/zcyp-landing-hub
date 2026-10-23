<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import {
  getContactRoute,
  useCampaignSource,
} from "../../composables/useCampaignSource";

const source = useCampaignSource();
const contactRoute = computed(() => getContactRoute(5, source.value));

// 导航标签
const navTabs = [
  { label: "产品概述", target: "overview" },
  { label: "优势亮点", target: "architecture" },
  { label: "核心功能", target: "features" },
  { label: "服务案例", target: "cases" },
];
const activeNav = ref("overview");

const scrollToSection = (target: string) => {
  const el = document.getElementById(`q-${target}`);
  if (el) {
    const headerOffset = 60;
    const y =
      el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const handleScroll = () => {
  const sections = navTabs.map((t) => document.getElementById(`q-${t.target}`));
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
const qSection = ref<HTMLElement>();
const observerOptions = { threshold: 0.12 };

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  if (qSection.value) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("q-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    qSection.value.querySelectorAll(".q-animate").forEach((el) => {
      observer.observe(el as HTMLElement);
    });
  }
});

// 架构数据
const archLayers = [
  {
    label: "用户端",
    borderColor: "#3A8FCB",
    bgColor: "#3A8FCB",
    contentBg: "#EAF4FA",
    contentBorder: "#ABD1EB",
    items: ["HR系统", "企业HR", "行业专家 / 面试官"],
    width: 222,
    gap: 24,
  },
  {
    label: "应用层",
    borderColor: "#8F58A0",
    bgColor: "#8F58A0",
    contentBg: "#F4EDF5",
    contentBorder: "#D2BAD9",
    items: ["岗位测评", "题库管理", "智能组卷", "审核机考"],
    width: 176,
    gap: 21,
  },
  {
    label: "服务层",
    borderColor: "#26B395",
    bgColor: "#26B395",
    contentBg: "#E6F4F1",
    contentBorder: "#A3D7CD",
    items: ["任务服务", "题库服务", "AI服务", "权限服务", "文件服务"],
    width: 132,
    gap: 12,
  },
  {
    label: "AI能力",
    borderColor: "#DD7B27",
    bgColor: "#DD7B27",
    contentBg: "#FDF2E8",
    contentBorder: "#F1C8A6",
    items: ["Prompt模板", "大模型调用", "JSON结构化", "Token审计"],
    width: 174,
    gap: 22,
  },
  {
    label: "数据层",
    borderColor: "#4DB56D",
    bgColor: "#4DB56D",
    contentBg: "#E6F4F1",
    contentBorder: "#ABD8BC",
    items: ["岗位库", "面试要素", "题库", "试卷", "任务", "AI会话"],
    width: 115,
    gap: 12,
  },
  {
    label: "基础设施",
    borderColor: "#35485D",
    bgColor: "#35485D",
    contentBg: "#EAEBED",
    contentBorder: "#AEB5BE",
    items: ["MySQL", "Redis", "对象存储(OSS)", "ELK 日志", "权限/网关"],
    width: 138,
    gap: 17,
  },
];

// 产品概述卡片
const overviewCards = [
  {
    num: "01",
    title: "实现试题资源集中管控，沉淀优质考试资产",
    desc: "将分散的试题统一归集到 Word、Excel、JSON 等标准化格式，对试题进行结构化入库管理，按题型、难度、知识点、地区等维度打标签分类，统一存储维护，形成机构可长期复用的核心题库资产。",
  },
  {
    num: "02",
    title: "赋能高效命题组卷，提升命题工作质量与效率",
    desc: "改变传统人工命题方式，通过系统智能组卷、AI 辅助命题，支持按岗位、难度、知识点等维度自动抽题组卷，大幅缩短命题周期，降低人工成本，同时保障试题质量与组卷科学性。",
  },
  {
    num: "03",
    title: "支撑多模式考试落地，简化考务组织流程",
    desc: "平台支持线上机考、线下纸笔考试、面试等多种考试形式，提供从报名、准考证生成、考场编排、考试实施到成绩发布的完整考务流程，降低考务组织复杂度，提升考试运营效率。",
  },
  {
    num: "04",
    title: "标准化阅卷评分，保障成绩准确可靠",
    desc: "客观题系统自动判分，主观题支持多人背靠背阅卷、分差阈值控制、仲裁机制等标准化阅卷流程，确保评分公平公正，成绩数据准确可靠，为人才选拔提供科学依据。",
  },
  {
    num: "05",
    title: "开展多维考试数据分析，反向优化命题与人才评价",
    desc: "对考试数据进行多维度统计分析，包括试题难度、区分度、知识点掌握率等，为命题质量评估提供数据支撑，同时生成考生能力画像，为人才评价和培养提供决策参考。",
  },
  {
    num: "06",
    title: "强化全链路安全管控，操作全程可追溯",
    desc: "实行分级权限管理，对试题加密、试卷加密、答案加密等多重安全防护，所有操作留痕可追溯，关键行为实时预警，满足人事考试、企业招聘等高安全场景的保密要求。",
  },
  {
    num: "07",
    title: "适配多元考核场景，拓展测评业务能力",
    desc: "全面覆盖公务员招考、事业单位招聘、国企招聘、技能鉴定、职称评审、行业认证等多种考试类型，支持单选、多选、判断、填空、问答、录音、组合题等多种题型，灵活适配不同行业、不同规模的考核测评需求，提升整体测评工作的标准化水平。",
  },
];

// 服务案例行业标签
const caseTags = [
  "事业单位招考",
  "教育系统招录考试",
  "医疗卫生系统招录",
  "高新区 / 开发区招聘",
  "行业协会继续教育",
  "国有企业招聘考试",
  "民营企业人才测评",
];

// ===================== 移动端（≤1024px）专用逻辑 =====================
// web 端根节点 .q-page 的模板 / 样式 / 脚本保持零改动；
// 以下状态与副作用仅供移动根节点 .qm-page 使用，与桌面端互不干扰。
const qmSection = ref<HTMLElement>();
const qmActiveNav = ref("overview");
const qmNavTabs = navTabs; // 复用同一组锚点标签（overview/architecture/features/cases）

// 滚动时高亮当前区块（原生锚点 + scroll-margin-top，不依赖 scrollToSection）
const qmHandleScroll = () => {
  const scrollY = window.scrollY + 120;
  let current = qmNavTabs[0]!.target;
  for (let i = qmNavTabs.length - 1; i >= 0; i--) {
    const tab = qmNavTabs[i];
    if (!tab) continue;
    const el = document.getElementById(`qm-${tab.target}`);
    if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
      current = tab.target;
      break;
    }
  }
  qmActiveNav.value = current;
};

onMounted(() => {
  window.addEventListener("scroll", qmHandleScroll, { passive: true });
  if (qmSection.value) {
    // 入场动画（移动独立 observer 命中后加 .qm-visible，不复用桌面 .q-animate）
    const qmObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("qm-visible");
            qmObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    qmSection.value
      .querySelectorAll(".qm-animate")
      .forEach((el) => qmObserver.observe(el as HTMLElement));
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", qmHandleScroll);
});
</script>

<template>
  <div ref="qSection" class="q-page">
    <!-- ========== Banner ========== -->
    <section class="q-banner">
      <div class="q-banner-box">
        <div class="q-banner-bg">
          <img
            src="/assets/images/question/banner-bg.png"
            alt=""
            class="q-banner-bg-img"
          />
        </div>
        <div class="container-q q-banner-content">
          <h1 class="q-banner-title">
            智能题库系统<br /><span>全流程数字化</span>题库平台
          </h1>
          <p class="q-banner-desc comm-indent">
            以AI大模型为底座，覆盖「命题 → 审题 → 组卷 → 阅卷 → 审核 →
            管理」全链路，让题库建设从劳动密集型转向智能驱动型。
          </p>
          <div class="q-banner-actions">
            <a
              class="q-btn q-btn-primary"
              href="http://qb.zhongkerencai.com:30003"
              target="_blank"
              rel="noopener noreferrer"
            >
              立即体验
              <img
                src="/assets/images/question_bank/banner-btn1.png"
                alt=""
                class="q-btn-icon"
              />
            </a>
            <NuxtLink class="q-btn q-btn-link" :to="contactRoute"
              >咨询预约</NuxtLink
            >
          </div>
          <!-- 数值区域 -->
          <div class="q-banner-stats">
            <div class="q-stat-item q-animate">
              <strong
                ><span class="q-count-number" v-count-up="10000"
                  >10,000</span
                ></strong
              >
              <span>累计服务考试场次</span>
            </div>
            <div class="q-stat-item q-animate">
              <strong
                ><span class="q-count-number" v-count-up="50">50</span
                ><span class="q-count-number-unit">+</span></strong
              >
              <span>全国服务网点</span>
            </div>
            <div class="q-stat-item q-animate">
              <strong
                ><span class="q-count-number" v-count-up="6">6</span></strong
              >
              <span>命题研发中心</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- ========== 导航标签 ========== -->
    <nav class="q-nav-bar">
      <div class="container-q q-nav-inner">
        <a
          v-for="tab in navTabs"
          :key="tab.target"
          class="q-nav-tab"
          :class="{ 'q-nav-tab-active': activeNav === tab.target }"
          @click.prevent="scrollToSection(tab.target)"
          href="javascript:void(0)"
        >
          {{ tab.label }}
        </a>
      </div>
    </nav>

    <!-- ========== 产品概述 ========== -->
    <section id="q-overview" class="q-section q-overview-section">
      <div class="q-overview-bg">
        <img
          src="/assets/images/question/example-bg1.png"
          alt=""
          class="q-overview-bg-img"
        />
      </div>
      <div class="container-q">
        <div class="q-section-header q-section-header-center q-animate">
          <h2>智能题库系统</h2>
          <p class="q-section-desc">
            智能题库系统作为全流程数字化命题管理平台，打通<span
              class="q-highlight"
              >试题入库</span
            >、<span class="q-highlight">题库维护</span>、<span
              class="q-highlight"
              >命题组卷</span
            >、<span class="q-highlight">考试实施</span>、<span
              class="q-highlight"
              >阅卷评分</span
            >、<span class="q-highlight">数据分析</span>、<span
              class="q-highlight"
              >安全管控</span
            >全业务链条，实现命题工作标准化、数字化、规范化。核心作用如下：
          </p>
        </div>
        <div class="q-overview-grid">
          <div
            v-for="(card, idx) in overviewCards"
            :key="idx"
            class="q-overview-card q-animate"
            :class="{ 'q-overview-card-full': idx === 6 }"
          >
            <div class="q-overview-card-box">
              <div class="q-overview-card-num">{{ card.num }}</div>
              <div class="q-overview-card-body">
                <h3>{{ card.title }}</h3>
              </div>
            </div>
            <div class="q-overview-card-desc comm-indent">{{ card.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 优势亮点 - 产品架构 ========== -->
    <section id="q-architecture" class="q-section q-arch-section">
      <div class="container-q">
        <div class="q-section-header q-section-header-center q-animate">
          <span class="q-section-label">产品架构</span>
          <h2>六层架构，支撑全流程智能命题</h2>
          <p class="q-section-subtitle">
            业务层覆盖命题全链路，服务层提供核心能力引擎，基础设施层保障稳定运行
          </p>
        </div>
        <div class="q-arch-card q-animate">
          <h3 class="q-arch-card-title">智能题库系统 · 产品架构全景</h3>
          <p class="q-arch-card-desc">
            覆盖"导题 → 命题 → 选题 → 组卷 → 审核 →
            管理"全链路，以AI大模型为底座，让题库建设从劳动密集型转向智能驱动型。
          </p>
          <div class="q-arch-divider"></div>
          <div class="q-arch-layers">
            <div
              v-for="(layer, idx) in archLayers"
              :key="idx"
              class="q-arch-layer"
              :style="{ borderColor: layer.borderColor }"
            >
              <div
                class="q-arch-layer-label"
                :style="{ background: layer.bgColor }"
              >
                {{ layer.label }}
              </div>
              <div
                class="q-arch-layer-content"
                :style="{ gap: layer.gap + 'px' }"
              >
                <div
                  v-for="(item, iidx) in layer.items"
                  :key="iidx"
                  class="q-arch-layer-item"
                  :style="{
                    background: layer.contentBg,
                    borderColor: layer.contentBorder,
                    width: layer.width + 'px',
                  }"
                >
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="q-arch-footer-text q-animate">
          系统采用分层解耦架构，业务层聚焦命题流程闭环，服务层以微服务方式提供可复用能力，基础设施层确保高可用与数据安全。三层协同，支撑大规模并发命题场景下的稳定运行与灵活扩展。
        </p>
      </div>
    </section>

    <!-- ========== 核心功能 - 六大模块 ========== -->
    <section id="q-features" class="q-section q-features-section">
      <div class="container-q">
        <div class="q-section-header q-section-header-center q-animate">
          <span class="q-section-label">核心功能</span>
          <h2>六大功能模块，覆盖命题全场景</h2>
          <p class="q-section-subtitle">
            每个环节都经过精心设计，让命题工作更高效、更规范、更安全
          </p>
        </div>

        <!-- 模块一 -->
        <div class="q-feature-block1-comm-title q-animate">
          1、导入即识别 · 一键入库
        </div>
        <div class="q-feature-block1 q-animate">
          <div class="q-feature-block1-left">
            <div class="q-feature-block1-left-item">
              <div class="q-feature-title">功能1-双模式导入</div>
              <div class="q-feature-content comm-indent">
                支持直接编辑和文件导入两种方式：文件导入支持Word、Excel等多种格式上传至AI自动识别题型、题干、选项、答案，并完成结构化对应。
              </div>
            </div>
            <div class="q-feature-block1-left-item">
              <div class="q-feature-title">功能2-双模式导入</div>
              <div class="q-feature-content comm-indent">
                系统自动将试题处理成题库所需的标准格式，格式规范可在系统内查看。
              </div>
            </div>
            <div class="q-feature-block1-left-item">
              <div class="q-feature-title">功能3-二次校验与属性标定</div>
              <div class="q-feature-content comm-indent">
                进入下一步前进行二次检查认；设置试题归属的岗位、难度、地区、年份等信息；点击"校验重复"，系统与题库已有试题进行毫秒级比对，重复项自动标红。
              </div>
            </div>
            <div class="q-feature-block1-left-item">
              <div class="q-feature-title">功能4-提交与审核</div>
              <div class="q-feature-content comm-indent">
                确认无误后提交，进入本次导入任务的审核流程；支持将试题导出进行线下确认与留痕。
              </div>
            </div>
          </div>
          <img
            src="/assets/images/question/example1.png"
            alt="双模式导入"
            class="q-feature-img1"
          />
        </div>

        <!-- 模块二 -->
        <div class="q-feature-block2 q-animate">
          <img
            src="/assets/images/question/example2.png"
            alt="自定义模板"
            class="q-feature-img2"
          />
          <div class="q-feature-block2-right">
            <div class="q-feature-block2-right-title">
              2、自定义模板 · 一键生成命题卡
            </div>
            <div class="q-feature-block2-right-desc q-feature-content">
              无需手动排版，AI自动生成标准化试题<br />支持按岗位模板生成知识点提示，辅助命题人快速出题。
            </div>
            <div class="q-steps-flow">
              <div class="q-step-row">
                <div class="q-step-item">
                  <div class="q-step-item-box">
                    <img
                      src="/assets/images/question/example-icon1.png"
                      alt=""
                      class="q-step-icon"
                    />
                    <div class="q-step-item-box-title">选择岗位</div>
                  </div>
                  <div class="q-step-item-box-desc">
                    确定本次命题 对应的岗位类别
                  </div>
                </div>
                <img
                  src="/assets/images/question/arrow-r.png"
                  alt=""
                  class="q-arrow-icon"
                />
                <div class="q-step-item">
                  <div class="q-step-item-box">
                    <img
                      src="/assets/images/question/example-icon2.png"
                      alt=""
                      class="q-step-icon"
                    />
                    <div class="q-step-item-box-title">设置模板</div>
                  </div>
                  <div class="q-step-item-box-desc">
                    自定义本次试题模版 各题型配置所需数量
                  </div>
                </div>
                <img
                  src="/assets/images/question/arrow-r.png"
                  alt=""
                  class="q-arrow-icon"
                />
                <div class="q-step-item">
                  <div class="q-step-item-box">
                    <img
                      src="/assets/images/question/example-icon3.png"
                      alt=""
                      class="q-step-icon"
                    />
                    <div class="q-step-item-box-title">一键生成</div>
                  </div>
                  <div class="q-step-item-box-desc">
                    点击生成，系统自动生成对应的空白题目位置
                  </div>
                </div>
              </div>
              <div class="q-step-row">
                <img
                  src="/assets/images/question/arrow-d.png"
                  alt=""
                  class="q-arrow-down"
                />
              </div>
              <div class="q-step-row">
                <div class="q-step-item">
                  <div class="q-step-item-box">
                    <img
                      src="/assets/images/question/example-icon4.png"
                      alt=""
                      class="q-step-icon"
                    />
                    <div class="q-step-item-box-title">在线编辑</div>
                  </div>
                  <div class="q-step-item-box-desc">
                    在对应位置进行题目、选项、答案的编辑录入
                  </div>
                </div>
                <img
                  src="/assets/images/question/arrow-l.png"
                  alt=""
                  class="q-arrow-icon"
                />
                <div class="q-step-item">
                  <div class="q-step-item-box">
                    <img
                      src="/assets/images/question/example-icon5.png"
                      alt=""
                      class="q-step-icon"
                    />
                    <div class="q-step-item-box-title">提交审核</div>
                  </div>
                  <div class="q-step-item-box-desc">
                    编辑完成后，直接提交进入审核环节
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 模块三 -->
        <div class="q-feature-block3-comm-title q-animate">
          3、精准筛选 · 发现即修正
        </div>
        <div class="q-feature-block3 q-animate">
          <div>
            <div class="q-feature-block3-title q-feature-title">
              功能5-岗位选题
            </div>
            <div class="q-feature-content q-feature-block3-content comm-indent">
              点击"岗位选题"进入选题页面，根据岗位筛选对应的题目。支持按题型、难度、地区、年份等多维度二次筛选，选中题目可一键加入试题篮，备选。
            </div>
            <img
              src="/assets/images/question/example3.png"
              alt="岗位选题"
              class="q-feature-img3-1"
            />
          </div>
          <div>
            <div class="q-feature-block3-title q-feature-title">
              功能6-人工纠错
            </div>
            <div class="q-feature-content q-feature-block3-content comm-indent">
              在选题过程中发现题目错误，支持人工纠错，即时修正，点击"详情"可查看该题目的完整信息（题干、答案、解析、属性标签及使用记录）。
            </div>
            <img
              src="/assets/images/question/example4.png"
              alt="人工纠错"
              class="q-feature-img3-2"
            />
          </div>
          <div>
            <div class="q-feature-block3-title q-feature-title">
              功能7-试题篮管理
            </div>
            <div class="q-feature-content q-feature-block3-content comm-indent">
              选中的题目统一汇入试题篮，支持批量移除或一键清空，灵活调整。
            </div>
            <img
              src="/assets/images/question/example5.png"
              alt="试题篮管理"
              class="q-feature-img3-3"
            />
          </div>
        </div>

        <!-- 模块四 -->
        <div class="q-feature-block4-comm-title q-animate">
          4、灵活组卷 · 智能随机 · 安全保护
        </div>
        <div class="q-feature-block4 q-animate">
          <div>
            <div class="q-feature-block4-title q-feature-title">智能组卷</div>
            <div class="q-feature-content">
              1.选择试题对应的岗位；<br />
              2.选择模版（题型+题量），系统从题库中随机取对应数量的试题；<br />
              3.确认无误后加入试题篮，进入组卷中心。
            </div>
            <img
              src="/assets/images/question/example6.png"
              alt="智能组卷"
              class="q-feature-img4-1"
            />
          </div>
          <div>
            <div class="q-feature-block4-title q-feature-title">组卷中心</div>
            <div class="q-feature-content">
              分数设置：快速设置每题分数，自动统计总分；<br />
              试卷保护期：设置保护时间，期间其他人在选题界面不可见该试卷内容；<br />
              试卷模版：支持A3/A4纸型选择。<br />
              封面选择：从模版库中选择试卷封面<br />
              题目乱序：按需求打乱题目顺序，防止作弊<br />
              确认无误后提交试卷
            </div>
            <img
              src="/assets/images/question/example7.png"
              alt="组卷中心"
              class="q-feature-img4-2"
            />
          </div>
        </div>

        <!-- 模块五 -->
        <div class="q-feature-block5 q-animate">
          <div class="q-feature-block5-item">
            <div style="margin-right: 54px">
              <div class="q-feature-block5-comm-title q-animate">
                5、双轨题库 · 科学管控
              </div>
              <div class="q-feature-block5-title1 q-feature-title">
                动静态双轨题库
              </div>
              <div class="q-feature-content" style="width: 508px">
                动态原创池：存放新命且未被使用的试题，保障首创性；<br />
                静态复用池：存放历次使用过的试题，并展示每道题的历史使用次数；
              </div>
            </div>
            <img
              src="/assets/images/question/example8.png"
              alt="动静态双轨题库"
              class="q-feature-img5-1"
            />
          </div>
          <div class="q-feature-block5-item">
            <img
              src="/assets/images/question/example9.png"
              alt="试卷管理"
              class="q-feature-img5-2"
            />
            <div style="margin-left: 147px">
              <div class="q-feature-block5-title2 q-feature-title">
                试卷管理
              </div>
              <div class="q-feature-content">
                通过率设置：自定义试卷合格分数线；<br />
                曝光地区：设置试卷的曝光地区策略；<br />
                保护题库：组卷中心设置了保护期的试卷自动进入保护题库
              </div>
            </div>
          </div>
        </div>

        <!-- 模块六 -->
        <div class="q-feature-block6 q-animate">
          <div class="q-feature-block6-item">
            <img
              src="/assets/images/question/example10.png"
              alt="流程自定义"
              class="q-feature-img6-1"
            />
            <div class="q-feature-block6-right">
              <div class="q-feature-block6-right-title">
                6、流程自定义 · 权限精细化
              </div>
              <div class="q-feature-block6-title q-feature-title">
                自定义审核流程
              </div>
              <div class="q-feature-content">
                1.审核流程可根据企业实际情况自定义配置（如初审→复审→终审）<br />
                2.每一步支持一键导出纸质校对稿，方便线下用笔圈改、签名留痕所<br />
                有修改意见及时间戳自动回传系统，审批状态实时同步 若某一步被打<br />
                回，系统自动回溯到对应责任人并生成待办提醒
              </div>
            </div>
          </div>
          <div class="q-feature-block6-item">
            <div class="q-feature-block6-right">
              <div class="q-feature-block6-title q-feature-title">
                岗位要素与权限管理
              </div>
              <div class="q-feature-content">
                岗位与面试要素导入：下载模版填写后上传即可批量添加；<br />
                用户管理：对用户进行新增、禁用、删除等操作；<br />
                角色权限：按部门与角色精细化分配系统操作权限；<br />
                系统设置：支持修改下载文件密码、自定义上传组卷中心封面模版
              </div>
            </div>
            <img
              src="/assets/images/question/example11.png"
              alt="岗位要素与权限管理"
              class="q-feature-img6-2"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 服务案例 ========== -->
    <section id="q-cases" class="q-section q-cases-section">
      <div class="q-cases-bg">
        <img
          src="/assets/images/question/example-bg2.png"
          alt=""
          class="q-cases-bg-img"
        />
      </div>
      <div class="container-q">
        <div class="q-section-header q-section-header-center q-animate">
          <span class="q-section-label">服务案例</span>
          <h2>覆盖多行业、多场景的考试命题服务</h2>
          <p class="q-section-subtitle">
            截至目前，已为国内众多政府机关、事业单位、国有企业提供了上万场次的考试命题服务
          </p>
        </div>
        <div class="q-cases-stats q-animate">
          <div class="q-cases-stat-item">
            <strong
              ><span class="q-count-number" v-count-up="9975">9,975</span
              ><span class="q-stat-plus">+</span></strong
            >
            <span>累计考试命题服务场次</span>
          </div>
          <div class="q-cases-stat-item">
            <strong
              ><span class="q-count-number" v-count-up="29">29</span
              ><span class="q-stat-plus">+</span></strong
            >
            <span>服务省份与地区</span>
          </div>
          <div class="q-cases-stat-item">
            <strong
              ><span class="q-count-number" v-count-up="6">6</span></strong
            >
            <span>核心服务行业领域</span>
          </div>
        </div>
        <div class="q-cases-tags q-animate">
          <span v-for="tag in caseTags" :key="tag" class="q-case-tag">{{
            tag
          }}</span>
        </div>
      </div>
    </section>
  </div>

  <!-- ===================== 移动端根节点（qm- 前缀，≤1024px 生效，web 端零改动） ===================== -->
  <div ref="qmSection" class="qm-page">
    <!-- Banner -->
    <section class="qm-banner">
      <div class="qm-banner-bg">
        <img src="/assets/images/question/banner-bg.png" alt="" />
      </div>
      <div class="qm-container qm-banner-content">
        <h1 class="qm-banner-title">
          智能题库系统<br /><span>全流程数字化</span>题库平台
        </h1>
        <p class="qm-banner-desc qm-indent">
          以AI大模型为底座，覆盖「命题 → 审题 → 组卷 → 阅卷 → 审核 →
          管理」全链路，让题库建设从劳动密集型转向智能驱动型。
        </p>
        <div class="qm-banner-actions">
          <a
            class="qm-btn qm-btn-primary"
            href="http://qb.zhongkerencai.com:30003"
            target="_blank"
            rel="noopener noreferrer"
          >
            立即体验
            <img
              src="/assets/images/question_bank/banner-btn1.png"
              alt=""
              class="qm-btn-icon"
            />
          </a>
          <NuxtLink class="qm-btn qm-btn-link" :to="contactRoute"
            >咨询预约</NuxtLink
          >
        </div>
        <div class="qm-banner-stats">
          <div class="qm-stat-item qm-animate">
            <strong
              ><span class="qm-count-number" v-count-up="10000"
                >10,000</span
              ></strong
            >
            <span>累计服务考试场次</span>
          </div>
          <div class="qm-stat-item qm-animate">
            <strong
              ><span class="qm-count-number" v-count-up="50">50</span
              ><i>+</i></strong
            >
            <span>全国服务网点</span>
          </div>
          <div class="qm-stat-item qm-animate">
            <strong
              ><span class="qm-count-number" v-count-up="6">6</span></strong
            >
            <span>命题研发中心</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 导航标签 -->
    <nav class="qm-nav">
      <div class="qm-nav-scroll">
        <a
          v-for="tab in qmNavTabs"
          :key="tab.target"
          class="qm-nav-tab"
          :class="{ 'qm-nav-tab-active': qmActiveNav === tab.target }"
          :href="`#qm-${tab.target}`"
        >
          {{ tab.label }}
        </a>
      </div>
    </nav>

    <!-- 产品概述 -->
    <section id="qm-overview" class="qm-section qm-overview">
      <div class="qm-overview-bg">
        <img src="/assets/images/question/example-bg1.png" alt="" />
      </div>
      <div class="qm-container">
        <div class="qm-sec-head qm-animate">
          <h2 class="qm-sec-title">智能题库系统</h2>
          <p class="qm-sec-desc">
            智能题库系统作为全流程数字化命题管理平台，打通<span
              class="qm-highlight"
              >试题入库</span
            >、<span class="qm-highlight">题库维护</span>、<span
              class="qm-highlight"
              >命题组卷</span
            >、<span class="qm-highlight">考试实施</span>、<span
              class="qm-highlight"
              >阅卷评分</span
            >、<span class="qm-highlight">数据分析</span>、<span
              class="qm-highlight"
              >安全管控</span
            >全业务链条，实现命题工作标准化、数字化、规范化。核心作用如下：
          </p>
        </div>
        <div class="qm-overview-grid">
          <div
            v-for="(card, idx) in overviewCards"
            :key="idx"
            class="qm-overview-card qm-animate"
          >
            <div class="qm-overview-card-box">
              <div class="qm-overview-card-num">{{ card.num }}</div>
              <h3>{{ card.title }}</h3>
            </div>
            <div class="qm-overview-card-desc qm-indent">{{ card.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 优势亮点 - 产品架构 -->
    <section id="qm-architecture" class="qm-section qm-arch">
      <div class="qm-container">
        <div class="qm-sec-head qm-animate">
          <span class="qm-sec-label">产品架构</span>
          <h2 class="qm-sec-title">六层架构，支撑全流程智能命题</h2>
          <p class="qm-sec-desc">
            业务层覆盖命题全链路，服务层提供核心能力引擎，基础设施层保障稳定运行
          </p>
        </div>
        <div class="qm-arch-card qm-animate">
          <h3 class="qm-arch-card-title">智能题库系统 · 产品架构全景</h3>
          <p class="qm-arch-card-desc">
            覆盖“导题 → 命题 → 选题 → 组卷 → 审核 →
            管理”全链路，以AI大模型为底座，让题库建设从劳动密集型转向智能驱动型。
          </p>
          <div class="qm-arch-divider"></div>
          <div class="qm-arch-layers">
            <div
              v-for="(layer, idx) in archLayers"
              :key="idx"
              class="qm-arch-layer"
              :style="{ borderColor: layer.borderColor }"
            >
              <div
                class="qm-arch-layer-label"
                :style="{ background: layer.bgColor }"
              >
                {{ layer.label }}
              </div>
              <div class="qm-arch-layer-content">
                <div
                  v-for="(item, iidx) in layer.items"
                  :key="iidx"
                  class="qm-arch-layer-item"
                  :style="{
                    background: layer.contentBg,
                    borderColor: layer.contentBorder,
                  }"
                >
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <p class="qm-arch-footer qm-animate">
          系统采用分层解耦架构，业务层聚焦命题流程闭环，服务层以微服务方式提供可复用能力，基础设施层确保高可用与数据安全。三层协同，支撑大规模并发命题场景下的稳定运行与灵活扩展。
        </p>
      </div>
    </section>

    <!-- 核心功能 - 六大模块 -->
    <section id="qm-features" class="qm-section qm-features">
      <div class="qm-container">
        <div class="qm-sec-head qm-animate">
          <span class="qm-sec-label">核心功能</span>
          <h2 class="qm-sec-title">六大功能模块，覆盖命题全场景</h2>
          <p class="qm-sec-desc">
            每个环节都经过精心设计，让命题工作更高效、更规范、更安全
          </p>
        </div>

        <!-- 模块一 -->
        <div class="qm-feat-block qm-animate">
          <div class="qm-feat-comm-title">1、导入即识别 · 一键入库</div>
          <div class="qm-feat-item">
            <div class="qm-feat-title">功能1-双模式导入</div>
            <div class="qm-feat-content qm-indent">
              支持直接编辑和文件导入两种方式：文件导入支持Word、Excel等多种格式上传至AI自动识别题型、题干、选项、答案，并完成结构化对应。
            </div>
          </div>
          <div class="qm-feat-item">
            <div class="qm-feat-title">功能2-双模式导入</div>
            <div class="qm-feat-content qm-indent">
              系统自动将试题处理成题库所需的标准格式，格式规范可在系统内查看。
            </div>
          </div>
          <div class="qm-feat-item">
            <div class="qm-feat-title">功能3-二次校验与属性标定</div>
            <div class="qm-feat-content qm-indent">
              进入下一步前进行二次检查认；设置试题归属的岗位、难度、地区、年份等信息；点击“校验重复”，系统与题库已有试题进行毫秒级比对，重复项自动标红。
            </div>
          </div>
          <div class="qm-feat-item">
            <div class="qm-feat-title">功能4-提交与审核</div>
            <div class="qm-feat-content qm-indent">
              确认无误后提交，进入本次导入任务的审核流程；支持将试题导出进行线下确认与留痕。
            </div>
          </div>
          <img
            src="/assets/images/question/example1.png"
            alt="双模式导入"
            class="qm-feat-img"
          />
        </div>

        <!-- 模块二 -->
        <div class="qm-feat-block qm-animate">
          <div class="qm-feat-comm-title">2、自定义模板 · 一键生成命题卡</div>
          <img
            src="/assets/images/question/example2.png"
            alt="自定义模板"
            class="qm-feat-img"
          />
          <div class="qm-feat-content qm-feat-content-gap">
            无需手动排版，AI自动生成标准化试题；支持按岗位模板生成知识点提示，辅助命题人快速出题。
          </div>
          <div class="qm-steps">
            <div class="qm-step">
              <div class="qm-step-box">
                <img
                  src="/assets/images/question/example-icon1.png"
                  alt=""
                  class="qm-step-icon"
                />
                <div class="qm-step-title">选择岗位</div>
              </div>
              <div class="qm-step-desc">确定本次命题对应的岗位类别</div>
            </div>
            <img
              src="/assets/images/question/arrow-d.png"
              alt=""
              class="qm-step-arrow"
            />
            <div class="qm-step">
              <div class="qm-step-box">
                <img
                  src="/assets/images/question/example-icon2.png"
                  alt=""
                  class="qm-step-icon"
                />
                <div class="qm-step-title">设置模板</div>
              </div>
              <div class="qm-step-desc">
                自定义本次试题模版 各题型配置所需数量
              </div>
            </div>
            <img
              src="/assets/images/question/arrow-d.png"
              alt=""
              class="qm-step-arrow"
            />
            <div class="qm-step">
              <div class="qm-step-box">
                <img
                  src="/assets/images/question/example-icon3.png"
                  alt=""
                  class="qm-step-icon"
                />
                <div class="qm-step-title">一键生成</div>
              </div>
              <div class="qm-step-desc">
                点击生成，系统自动生成对应的空白题目位置
              </div>
            </div>
            <img
              src="/assets/images/question/arrow-d.png"
              alt=""
              class="qm-step-arrow"
            />
            <div class="qm-step">
              <div class="qm-step-box">
                <img
                  src="/assets/images/question/example-icon4.png"
                  alt=""
                  class="qm-step-icon"
                />
                <div class="qm-step-title">在线编辑</div>
              </div>
              <div class="qm-step-desc">
                在对应位置进行题目、选项、答案的编辑录入
              </div>
            </div>
            <img
              src="/assets/images/question/arrow-d.png"
              alt=""
              class="qm-step-arrow"
            />
            <div class="qm-step">
              <div class="qm-step-box">
                <img
                  src="/assets/images/question/example-icon5.png"
                  alt=""
                  class="qm-step-icon"
                />
                <div class="qm-step-title">提交审核</div>
              </div>
              <div class="qm-step-desc">编辑完成后，直接提交进入审核环节</div>
            </div>
          </div>
        </div>

        <!-- 模块三 -->
        <div class="qm-feat-block qm-animate">
          <div class="qm-feat-comm-title">3、精准筛选 · 发现即修正</div>
          <div class="qm-feat-item">
            <div class="qm-feat-title">功能5-岗位选题</div>
            <div class="qm-feat-content qm-indent">
              点击“岗位选题”进入选题页面，根据岗位筛选对应的题目。支持按题型、难度、地区、年份等多维度二次筛选，选中题目可一键加入试题篮，备选。
            </div>
            <img
              src="/assets/images/question/example3.png"
              alt="岗位选题"
              class="qm-feat-img"
            />
          </div>
          <div class="qm-feat-item">
            <div class="qm-feat-title">功能6-人工纠错</div>
            <div class="qm-feat-content qm-indent">
              在选题过程中发现题目错误，支持人工纠错，即时修正，点击“详情”可查看该题目的完整信息（题干、答案、解析、属性标签及使用记录）。
            </div>
            <img
              src="/assets/images/question/example4.png"
              alt="人工纠错"
              class="qm-feat-img"
            />
          </div>
          <div class="qm-feat-item">
            <div class="qm-feat-title">功能7-试题篮管理</div>
            <div class="qm-feat-content qm-indent">
              选中的题目统一汇入试题篮，支持批量移除或一键清空，灵活调整。
            </div>
            <img
              src="/assets/images/question/example5.png"
              alt="试题篮管理"
              class="qm-feat-img"
            />
          </div>
        </div>

        <!-- 模块四 -->
        <div class="qm-feat-block qm-animate">
          <div class="qm-feat-comm-title">
            4、灵活组卷 · 智能随机 · 安全保护
          </div>
          <div class="qm-feat-item">
            <div class="qm-feat-title">智能组卷</div>
            <div class="qm-feat-content">
              1.选择试题对应的岗位；<br />2.选择模版（题型+题量），系统从题库中随机取对应数量的试题；<br />3.确认无误后加入试题篮，进入组卷中心。
            </div>
            <img
              src="/assets/images/question/example6.png"
              alt="智能组卷"
              class="qm-feat-img"
            />
          </div>
          <div class="qm-feat-item">
            <div class="qm-feat-title">组卷中心</div>
            <div class="qm-feat-content">
              分数设置：快速设置每题分数，自动统计总分；<br />试卷保护期：设置保护时间，期间其他人在选题界面不可见该试卷内容；<br />试卷模版：支持A3/A4纸型选择。<br />封面选择：从模版库中选择试卷封面<br />题目乱序：按需求打乱题目顺序，防止作弊<br />确认无误后提交试卷
            </div>
            <img
              src="/assets/images/question/example7.png"
              alt="组卷中心"
              class="qm-feat-img"
            />
          </div>
        </div>

        <!-- 模块五 -->
        <div class="qm-feat-block qm-animate">
          <div class="qm-feat-comm-title">5、双轨题库 · 科学管控</div>
          <div class="qm-feat-item">
            <div class="qm-feat-title">动静态双轨题库</div>
            <div class="qm-feat-content">
              动态原创池：存放新命且未被使用的试题，保障首创性；<br />静态复用池：存放历次使用过的试题，并展示每道题的历史使用次数；
            </div>
            <img
              src="/assets/images/question/example8.png"
              alt="动静态双轨题库"
              class="qm-feat-img"
            />
          </div>
          <div class="qm-feat-item">
            <div class="qm-feat-title">试卷管理</div>
            <div class="qm-feat-content">
              通过率设置：自定义试卷合格分数线；<br />曝光地区：设置试卷的曝光地区策略；<br />保护题库：组卷中心设置了保护期的试卷自动进入保护题库
            </div>
            <img
              src="/assets/images/question/example9.png"
              alt="试卷管理"
              class="qm-feat-img"
            />
          </div>
        </div>

        <!-- 模块六 -->
        <div class="qm-feat-block qm-animate">
          <div class="qm-feat-comm-title">6、流程自定义 · 权限精细化</div>
          <div class="qm-feat-item">
            <div class="qm-feat-title">自定义审核流程</div>
            <div class="qm-feat-content">
              1.审核流程可根据企业实际情况自定义配置（如初审→复审→终审）<br />2.每一步支持一键导出纸质校对稿，方便线下用笔圈改、签名留痕，所有修改意见及时间戳自动回传系统，审批状态实时同步；若某一步被打回，系统自动回溯到对应责任人并生成待办提醒
            </div>
            <img
              src="/assets/images/question/example10.png"
              alt="流程自定义"
              class="qm-feat-img"
            />
          </div>
          <div class="qm-feat-item">
            <div class="qm-feat-title">岗位要素与权限管理</div>
            <div class="qm-feat-content">
              岗位与面试要素导入：下载模版填写后上传即可批量添加；<br />用户管理：对用户进行新增、禁用、删除等操作；<br />角色权限：按部门与角色精细化分配系统操作权限；<br />系统设置：支持修改下载文件密码、自定义上传组卷中心封面模版
            </div>
            <img
              src="/assets/images/question/example11.png"
              alt="岗位要素与权限管理"
              class="qm-feat-img"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 服务案例 -->
    <section id="qm-cases" class="qm-section qm-cases">
      <div class="qm-cases-bg">
        <img src="/assets/images/question/example-bg2.png" alt="" />
      </div>
      <div class="qm-container">
        <div class="qm-sec-head qm-animate">
          <span class="qm-sec-label">服务案例</span>
          <h2 class="qm-sec-title">覆盖多行业、多场景的考试命题服务</h2>
          <p class="qm-sec-desc">
            截至目前，已为国内众多政府机关、事业单位、国有企业提供了上万场次的考试命题服务
          </p>
        </div>
        <div class="qm-cases-stats qm-animate">
          <div class="qm-cases-stat">
            <strong
              ><span class="qm-count-number" v-count-up="9975">9,975</span
              ><i>+</i></strong
            >
            <span>累计考试命题服务场次</span>
          </div>
          <div class="qm-cases-stat">
            <strong
              ><span class="qm-count-number" v-count-up="29">29</span
              ><i>+</i></strong
            >
            <span>服务省份与地区</span>
          </div>
          <div class="qm-cases-stat">
            <strong
              ><span class="qm-count-number" v-count-up="6">6</span></strong
            >
            <span>核心服务行业领域</span>
          </div>
        </div>
        <div class="qm-cases-tags qm-animate">
          <span v-for="tag in caseTags" :key="tag" class="qm-case-tag">{{
            tag
          }}</span>
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
.q-page {
  --q-blue: #0f62fe;
  --q-blue-dark: #0043ce;
  --q-ink: #1a1a2e;
  --q-muted: #5a6578;
  --q-bg: #f4f7fb;
  --q-white: #fff;
  --q-radius: 12px;
  font-family:
    Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui,
    sans-serif;
  color: var(--q-ink);
}

.container-q {
  width: min(1200px, calc(100% - 40px));
  margin: 0 auto;
}

/* ===== 滚动动画 ===== */
.q-animate {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}

.q-animate.q-visible {
  opacity: 1;
  transform: translateY(0);
}

.q-animate:nth-child(2) {
  transition-delay: 0.1s;
}

.q-animate:nth-child(3) {
  transition-delay: 0.2s;
}

.q-animate:nth-child(4) {
  transition-delay: 0.3s;
}

/* ===== 通用 Section Header ===== */
.q-section-header {
  margin-bottom: 44px;
}

.q-section-header-center {
  text-align: center;
}

.q-section-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #0f62fe;
  font-weight: 500;
  margin-bottom: 16px;
}

.q-section-label::before {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  background: var(--q-blue);
  border-radius: 50%;
}

.q-section-header h2 {
  font-size: 36px;
  font-weight: 600;
  letter-spacing: 2px;
  margin: 0 0 16px;
  line-height: 1.25;
  text-align: center;
  color: #111827;
}

.q-section-desc {
  color: #6b7280;
  font-size: 17px;
  line-height: 1.76;
  margin: 0 auto;
  max-width: 771px;
  text-align: center;
}

.q-section-subtitle {
  color: #6b7280;
  font-size: 17px;
  line-height: 1.76;
  margin: 0 auto;
  max-width: 771px;
  text-align: center;
}

.q-highlight {
  color: #0f62fe;
  font-weight: 500;
}

/* ===== Banner ===== */
.q-banner {
  width: 100%;
  height: 691px;
  background: #ecf1f9;
  overflow: hidden;
}

.q-banner-box {
  position: relative;
  width: 1440px;
  margin: 0 auto;
  height: 100%;
}

.q-banner-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 1292px;
  height: 691px;
  pointer-events: none;
}

.q-banner-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.q-banner-content {
  position: relative;
  z-index: 2;
  padding-top: 102px;
}

.q-banner-title {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  color: var(--q-ink);
  line-height: 1.3;
  margin: 0 0 21px;
  letter-spacing: 2px;
}

.q-banner-title span {
  color: var(--q-blue);
}

.q-banner-desc {
  font-size: 16px;
  color: var(--q-muted);
  line-height: 1.8;
  margin: 0 0 32px;
  max-width: 495px;
}

.q-banner-actions {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 30px;
}

.q-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 32px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  line-height: 1;
}

.q-btn-primary {
  background: var(--q-blue);
  color: var(--q-white);
}

.q-btn-primary:hover {
  background: var(--q-blue-dark);
  box-shadow: 0 6px 20px rgba(15, 98, 254, 0.4);
  transform: translateY(-2px);
}

.q-btn-link {
  background: none;
  color: #0f62fe;
  padding: 14px 0;
}

.q-btn-link:hover {
  color: var(--q-blue);
}

.q-btn-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.q-banner-stats {
  display: flex;
  gap: 60px;
}

.q-stat-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.q-count-number-unit {
  font-size: 14px;
  color: #0f62fe !important;
}

.q-stat-item strong {
  font-size: 32px;
  font-weight: 600;
  color: var(--q-blue);
  line-height: 1.2;
}

.q-stat-item span {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.q-count-number {
  font-size: inherit !important;
  font-weight: inherit !important;
  color: inherit !important;
}

.q-stat-plus {
  font-size: 22px !important;
  font-weight: 500;
  color: var(--q-blue) !important;
  margin-left: 2px;
}

/* ===== 导航标签 ===== */
.q-nav-bar {
  width: 100%;
  height: 56px;
  background: #f4f7fb;
  position: sticky;
  top: 76px;
  left: 0;
  z-index: 15;
  margin-top: -56px;
}

@media (max-width: 560px) {
  .q-nav-bar {
    top: 66px;
  }
}

.q-nav-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 93px;
  height: 100%;
}

.q-nav-tab {
  font-size: 16px;
  font-weight: 400;
  color: #161616;
  text-decoration: none;
  padding: 16px 0;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
}

.q-nav-tab:hover {
  color: var(--q-blue);
}

.q-nav-tab-active {
  color: var(--q-blue);
  border-bottom-color: var(--q-blue);
}

/* ===== 产品概述 ===== */
.q-overview-section {
  position: relative;
  width: 100%;
  padding: 69px 0 100px;
  background: var(--q-white);
  overflow: hidden;
}

.q-overview-bg {
  position: absolute;
  top: 325px;
  left: 50%;
  transform: translateX(-50%);
  width: 1440px;
  height: 811px;
  pointer-events: none;
}

.q-overview-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.q-overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 17px 22px;
  position: relative;
  z-index: 2;
}

.q-overview-card {
  padding: 19px 34px 14px 29px;
  background: var(--q-white);
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.q-overview-card:hover {
  box-shadow: 0 8px 24px rgba(15, 98, 254, 0.08);
  border-color: var(--q-blue);
}

.q-overview-card-full {
  grid-column: 1 / -1;
}

.q-overview-card-box {
  display: flex;
  gap: 9px;
  align-items: center;
  margin-bottom: 15px;
}

.q-overview-card-num {
  width: 28px;
  height: 28px;
  background: #0f62fe;
  color: var(--q-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  flex-shrink: 0;
}

.q-overview-card-body h3 {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.q-overview-card-desc {
  font-size: 14px;
  color: #5a6178;
  line-height: 28px;
  margin: 0;
}

/* ===== 产品架构 ===== */
.q-arch-section {
  padding: 54px 0 45px;
  background: #fbfcfd;
}

.q-arch-card {
  width: 1165px;
  max-width: 100%;
  margin: 0 auto;
  background: #ffffff;
  box-shadow:
    0px 4px 8px 0px rgba(0, 0, 0, 0.04),
    0px 12px 32px 0px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  padding: 22px 37px 51px;
}

.q-arch-card-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 17px;
  text-align: center;
}

.q-arch-card-desc {
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  margin: 0 0 8px;
  line-height: 1.6;
}

.q-arch-divider {
  width: 100%;
  height: 1px;
  background: #e5e7eb;
  margin-bottom: 32px;
}

.q-arch-layers {
  width: 1038px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid #045b96;
  padding: 27px 29px;
  background: #f8fafb;
  border-radius: 16px;
}

.q-arch-layer {
  display: flex;
  align-items: stretch;
  border: 1px solid;
  border-radius: 4px;
  overflow: hidden;
  height: 47px;
  padding: 12px;
  background: #fff;
}

.q-arch-layer-label {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  width: 72.5px;
  margin-right: 31px;
}

.q-arch-layer-content {
  display: flex;
  align-items: center;
  height: 22px;
  flex-wrap: wrap;
  flex: 1;
}

.q-arch-layer-item {
  height: 100%;
  border: 1px solid;
  border-radius: 6px;
  font-size: 10px;
  color: #2b3d4f;
  white-space: nowrap;
  text-align: center;
}

.q-arch-footer-text {
  text-align: center;
  max-width: 672px;
  margin: 36px auto 0;
  font-size: 14px;
  color: #6a6a6a;
  line-height: 1.8;
}

/* ===== 核心功能 ===== */
.q-features-section {
  padding: 59px 0 112px;
  background: #fafbfc;
}

.q-feature-title {
  font-weight: 600;
  font-size: 18px;
  color: #000000;
  line-height: 27px;
  margin-bottom: 9px;
}

.q-feature-content {
  color: #5a6178;
  line-height: 29px;
  font-size: 16px;
}

.q-feature-block1 {
  display: flex;
  gap: 49px;
  justify-content: space-between;
  margin-bottom: 67px;
}

.q-feature-block1-left {
  display: flex;
  gap: 21px 47px;
  flex-wrap: wrap;
}

.q-feature-block1-left-item {
  width: 229px;
}

.q-feature-img1 {
  width: 622px;
  height: 350px;
}

.q-feature-block2 {
  display: flex;
  gap: 26px;
  justify-content: space-between;
  margin-bottom: 87px;
}

.q-feature-img2 {
  width: 559px;
  height: 284px;
  margin-top: 122px;
}

.q-feature-block2-right-title {
  text-align: right;
  font-weight: 600;
  font-size: 28px;
  color: #1a1a2e;
  line-height: 45px;
  margin-bottom: 5px;
}

.q-feature-block1-comm-title {
  font-weight: 600;
  font-size: 28px;
  color: #1a1a2e;
  line-height: 45px;
  margin-bottom: 18px;
  margin-top: 74px;
}

.q-feature-block3-comm-title {
  font-weight: 600;
  font-size: 28px;
  color: #1a1a2e;
  line-height: 45px;
  margin-bottom: 27px;
  text-align: center;
}

.q-feature-block4-comm-title {
  font-weight: 600;
  font-size: 28px;
  color: #1a1a2e;
  line-height: 45px;
  text-align: center;
  margin-bottom: 24px;
}

.q-feature-block5-comm-title {
  font-weight: 600;
  font-size: 28px;
  color: #1a1a2e;
  line-height: 1;
  text-align: left;
}

.q-feature-block2-right-desc {
  text-align: right;
  margin-bottom: 49px;
}

.q-steps-flow {
}

.q-step-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1px;
}

.q-step-item {
  padding: 11px 5px 15px 11px;
  background: #f4f7fb;
  width: 180px;
}

.q-step-item-box {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 6px;
}

.q-step-item-box-title {
  font-weight: 500;
  font-size: 16px;
  color: #0f62fe;
}

.q-step-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.q-step-item-box-desc {
  font-weight: 400;
  font-size: 14px;
  color: #5a6178;
  padding-left: 3px;
}

.q-arrow-icon {
  width: 20px;
  height: 31px;
  flex-shrink: 0;
}

.q-arrow-down {
  width: 31px;
  height: 20px;
  margin: 2px 75px 1px 0;
}

.q-feature-block3 {
  display: flex;
  gap: 66px;
  justify-content: space-between;
  margin-bottom: 96px;
}

.q-feature-block3-title {
  margin-bottom: 9px;
}

.q-feature-block3-content {
  width: 370px;
}

.q-feature-img3-1 {
  width: 337px;
  height: 350px;
  margin-top: 29px;
}

.q-feature-img3-2 {
  width: 286px;
  height: 342px;
  margin-top: 29px;
  margin-left: 28px;
}

.q-feature-img3-3 {
  width: 299px;
  height: 341px;
  margin-top: 45px;
  margin-left: 21px;
}

.q-feature-block4 {
  display: flex;
  gap: 164px;
  justify-content: space-between;
  margin-bottom: 109px;
}

.q-feature-block4-title {
  margin-bottom: 9px;
}

.q-feature-img4-1 {
  width: 374px;
  height: 320px;
  margin-top: 65px;
}

.q-feature-img4-2 {
  width: 299px;
  height: 294px;
  margin-top: 29px;
  margin-left: 74px;
}

.q-feature-block5 {
  display: flex;
  gap: 62px;
  flex-direction: column;
  margin-bottom: 100px;
}

.q-feature-block5-item {
  display: flex;
}

.q-feature-block5-title1 {
  margin-bottom: 1px;
  margin-top: 66px;
}

.q-feature-block5-title2 {
  margin-bottom: 1px;
  margin-top: 84px;
}

.q-feature-img5-1 {
  width: 535px;
  height: 185px;
  margin-top: 12px;
}

.q-feature-img5-2 {
  width: 484px;
  height: 323px;
}

.q-feature-block6 {
  display: flex;
  flex-direction: column;
  gap: 52px;
}

.q-feature-img6-1 {
  width: 553px;
  height: 156px;
  margin-top: 168px;
}

.q-feature-img6-2 {
  width: 524px;
  height: 227px;
  margin-top: 60px;
}

.q-feature-block6-item {
  display: flex;
  justify-content: space-between;
}

.q-feature-block6-right-title {
  text-align: right;
  font-weight: 600;
  font-size: 28px;
  color: #1a1a2e;
  line-height: 45px;
  margin-bottom: 38px;
}

.q-feature-block6-title {
  margin-bottom: 15px;
}

/* ===== 服务案例 ===== */
.q-cases-section {
  position: relative;
  width: 100%;
  height: 684px;
  padding: 82px 0 90px;
  overflow: hidden;
  background: #fff;
}

.q-cases-bg {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1440px;
  height: 684px;
  pointer-events: none;
}

.q-cases-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.q-cases-section .container-q {
  position: relative;
  z-index: 2;
}

.q-cases-stats {
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-bottom: 40px;
}

.q-cases-stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 357px;
  height: 167px;
  background: #ffffff;
  border-radius: 12px 12px 12px 12px;
  border: 1px solid #e5e7eb;
}

.q-cases-stat-item strong {
  font-size: 40px;
  font-weight: 700;
  color: var(--q-blue);
  line-height: 1.2;
}

.q-cases-stat-item span {
  font-size: 14px;
  color: #6a6a6a;
  font-weight: 500;
}

.q-cases-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  width: 1120px;
}

.q-case-tag {
  padding: 10px 24px;
  background: var(--q-white);
  border-radius: 8px;
  font-size: 15px;
  color: #111827;
  font-weight: 500;
  border: 1px solid #e8eeff;
  transition: all 0.3s ease;
}

.q-case-tag:hover {
  border-color: var(--q-blue);
  color: var(--q-blue);
}

/* ============================================================
   移动端版本（qm- 前缀，≤1024px 生效，web 端 DOM/CSS/script 零改动）
   · 桌面（>1024px）隐藏移动根；≤1024px 隐藏桌面根、显示移动根
   · 所有移动样式限定在 .qm-page 作用域内
   · 不给 .qm-page 设 overflow:hidden，避免破坏 .qm-nav 的 sticky
   ============================================================ */
.qm-page {
  display: none;
}

@media (max-width: 1024px) {
  .q-page {
    display: none;
  }
  .qm-page {
    display: block;
  }
}

/* ===== 移动根变量与基础 ===== */
.qm-page {
  --qm-blue: #0f62fe;
  --qm-blue-dark: #0043ce;
  --qm-ink: #1a1a2e;
  --qm-muted: #5a6578;
  font-family:
    Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui,
    sans-serif;
  color: var(--qm-ink);
}

.qm-container {
  width: calc(100% - 32px);
  margin: 0 auto;
}
.qm-indent {
  text-indent: 2em;
}
.qm-highlight {
  color: var(--qm-blue);
  font-weight: 500;
}

/* 入场动画（移动独立 observer 命中后加 .qm-visible） */
.qm-animate {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}
.qm-animate.qm-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 通用 section / 标题 */
.qm-section {
  position: relative;
  scroll-margin-top: 130px;
}
.qm-sec-head {
  text-align: center;
  margin-bottom: 26px;
}
.qm-sec-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  color: var(--qm-blue);
  font-weight: 500;
  margin-bottom: 12px;
}
.qm-sec-label::before {
  content: "";
  width: 7px;
  height: 7px;
  background: var(--qm-blue);
  border-radius: 50%;
}
.qm-sec-title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  line-height: 1.35;
  margin: 0 0 12px;
}
.qm-sec-desc {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.75;
  margin: 0;
}
.qm-count-number {
  font-size: inherit !important;
  font-weight: inherit !important;
  color: inherit !important;
}

/* ===== Banner ===== */
.qm-banner {
  position: relative;
  background: #ecf1f9;
  overflow: hidden;
}
.qm-banner-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}
.qm-banner-bg img {
  display: block;
  width: 100%;
  height: auto;
}
.qm-banner-content {
  position: relative;
  z-index: 2;
  padding: 44px 0 32px;
}
.qm-banner-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--qm-ink);
  line-height: 1.35;
  margin: 0 0 14px;
  letter-spacing: 1px;
}
.qm-banner-title span {
  color: var(--qm-blue);
}
.qm-banner-desc {
  font-size: 14px;
  color: var(--qm-muted);
  line-height: 1.8;
  margin: 0 0 22px;
}
.qm-banner-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  margin-bottom: 26px;
}
.qm-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  line-height: 1;
}
.qm-btn-primary {
  background: var(--qm-blue);
  color: #fff;
}
.qm-btn-link {
  color: var(--qm-blue);
  padding: 12px 0;
}
.qm-btn-icon {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}
.qm-banner-stats {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
}
.qm-stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.qm-stat-item strong {
  display: flex;
  align-items: baseline;
  font-size: 26px;
  font-weight: 700;
  color: var(--qm-blue);
  line-height: 1.1;
}
.qm-stat-item strong i {
  font-style: normal;
  font-size: 14px;
  font-weight: 500;
  margin-left: 2px;
}
.qm-stat-item span {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

/* ===== 导航 ===== */
.qm-nav {
  position: sticky;
  top: 76px;
  z-index: 15;
  width: 100%;
  background: #f4f7fb;
  border-bottom: 1px solid #e8ecf2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
.qm-nav-scroll {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.qm-nav-scroll::-webkit-scrollbar {
  display: none;
}
.qm-nav-tab {
  flex: 1 0 auto;
  scroll-snap-align: center;
  text-align: center;
  padding: 14px 18px;
  font-size: 14px;
  font-weight: 500;
  color: #161616;
  text-decoration: none;
  white-space: nowrap;
  position: relative;
  transition: color 0.25s ease;
}
.qm-nav-tab-active {
  color: var(--qm-blue);
  font-weight: 600;
}
.qm-nav-tab-active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 3px;
  background: var(--qm-blue);
  border-radius: 2px 2px 0 0;
}

/* ===== 产品概述 ===== */
.qm-overview {
  background: #fff;
  padding: 40px 0;
  overflow: hidden;
}
.qm-overview-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  opacity: 0.5;
}
.qm-overview-bg img {
  display: block;
  width: 100%;
  height: auto;
}
.qm-overview .qm-container {
  position: relative;
  z-index: 2;
}
.qm-overview-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.qm-overview-card {
  padding: 18px 18px 16px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}
.qm-overview-card-box {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.qm-overview-card-num {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  background: var(--qm-blue);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.qm-overview-card h3 {
  font-size: 17px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.4;
}
.qm-overview-card-desc {
  font-size: 13px;
  color: #5a6178;
  line-height: 1.9;
  margin: 0;
}

/* ===== 产品架构 ===== */
.qm-arch {
  background: #fbfcfd;
  padding: 40px 0;
}
.qm-arch-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  padding: 20px 16px 24px;
}
.qm-arch-card-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  text-align: center;
  margin: 0 0 10px;
}
.qm-arch-card-desc {
  font-size: 13px;
  color: #6b7280;
  text-align: center;
  line-height: 1.7;
  margin: 0 0 16px;
}
.qm-arch-divider {
  height: 1px;
  background: #e5e7eb;
  margin-bottom: 18px;
}
.qm-arch-layers {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #045b96;
  border-radius: 12px;
  padding: 14px;
  background: #f8fafb;
}
.qm-arch-layer {
  border: 1px solid;
  border-radius: 8px;
  padding: 10px;
  background: #fff;
}
.qm-arch-layer-label {
  display: inline-block;
  color: #fff;
  font-size: 12px;
  padding: 3px 12px;
  border-radius: 4px;
  margin-bottom: 10px;
}
.qm-arch-layer-content {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.qm-arch-layer-item {
  border: 1px solid;
  border-radius: 6px;
  font-size: 12px;
  color: #2b3d4f;
  padding: 5px 10px;
}
.qm-arch-footer {
  text-align: center;
  font-size: 13px;
  color: #6a6a6a;
  line-height: 1.8;
  margin: 20px 0 0;
}

/* ===== 核心功能 ===== */
.qm-features {
  background: #fafbfc;
  padding: 40px 0;
}
.qm-feat-block {
  margin-bottom: 34px;
}
.qm-feat-block:last-child {
  margin-bottom: 0;
}
.qm-feat-comm-title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a2e;
  line-height: 1.5;
  margin: 0 0 16px;
  text-align: center;
}
.qm-feat-item {
  margin-bottom: 22px;
}
.qm-feat-item:last-child {
  margin-bottom: 0;
}
.qm-feat-title {
  font-size: 16px;
  font-weight: 600;
  color: #000;
  line-height: 1.6;
  margin: 0 0 8px;
}
.qm-feat-content {
  font-size: 14px;
  color: #5a6178;
  line-height: 1.9;
  margin: 0;
}
.qm-feat-content-gap {
  margin: 14px 0 18px;
}
.qm-feat-img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 14px;
}

/* 步骤流（竖向单列） */
.qm-steps {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.qm-step {
  background: #f4f7fb;
  border-radius: 10px;
  padding: 12px 14px;
}
.qm-step-box {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.qm-step-icon {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
}
.qm-step-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--qm-blue);
}
.qm-step-desc {
  font-size: 13px;
  color: #5a6178;
  line-height: 1.6;
  padding-left: 2px;
}
.qm-step-arrow {
  display: block;
  width: 20px;
  height: 14px;
  margin: 4px auto;
  object-fit: contain;
}

/* ===== 服务案例 ===== */
.qm-cases {
  background: #fff;
  padding: 40px 0;
  overflow: hidden;
}
.qm-cases-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}
.qm-cases-bg img {
  display: block;
  width: 100%;
  height: auto;
}
.qm-cases .qm-container {
  position: relative;
  z-index: 2;
}
.qm-cases-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}
.qm-cases-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 22px 16px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}
.qm-cases-stat strong {
  display: flex;
  align-items: baseline;
  font-size: 32px;
  font-weight: 700;
  color: var(--qm-blue);
  line-height: 1;
}
.qm-cases-stat strong i {
  font-style: normal;
  font-size: 20px;
  font-weight: 500;
  margin-left: 2px;
}
.qm-cases-stat span {
  font-size: 13px;
  color: #6a6a6a;
  font-weight: 500;
}
.qm-cases-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
.qm-case-tag {
  padding: 9px 16px;
  background: #fff;
  border: 1px solid #e8eeff;
  border-radius: 8px;
  font-size: 13px;
  color: #111827;
  font-weight: 500;
}

@media (max-width: 560px) {
  .qm-nav {
    top: 66px;
  }
  .qm-section {
    scroll-margin-top: 120px;
  }
}
</style>
