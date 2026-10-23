<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

// @ts-ignore
const source = useCampaignSource();
// @ts-ignore
const contactRoute = computed(() => getContactRoute(6, source.value));

const navTabs = [
  { label: "产品介绍", target: "ot-product" },
  { label: "核心功能", target: "ot-core" },
  { label: "应用场景", target: "ot-scene" },
  { label: "数据验证", target: "ot-data" },
];
const activeNav = ref("ot-product");

const scrollToSection = (target: string) => {
  const el = document.getElementById(target);
  if (el) {
    const headerOffset = 60;
    const y =
      el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleScroll = () => {
  const sections = navTabs.map((t) => document.getElementById(t.target));
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

const otSection = ref<HTMLElement>();
const observerOptions = { threshold: 0.12 };

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  if (otSection.value) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("ot-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    otSection.value.querySelectorAll(".ot-animate").forEach((el) => {
      observer.observe(el as HTMLElement);
    });
  }
});

const coreFeatures = [
  {
    icon: "/assets/images/onlineTest/box3-img1.png",
    title: "多机位监考+监考大屏",
    content:
      "支持电脑端摄像头监控、电脑屏幕监控、手机第二机位视角监控，提供监考大厅功能，保障考试公平公正",
    tags: ["多视角监控考试状态", "监考视频备份可查", "保障考试公平公正"],
  },
  {
    icon: "/assets/images/onlineTest/box3-img2.png",
    title: "智能防作弊技术",
    content:
      "支持人脸识别、防切屏搜答案、题目和选项乱序、随机出题、代码查重等功能，监测考生离开屏幕、他人进入屏幕等异常行为",
    tags: ["人脸识别", "自动监测考生异常", "题目和选项乱序"],
  },
  {
    icon: "/assets/images/onlineTest/box3-img3.png",
    title: "专业题库管理",
    content:
      "中测在线考试系统支持多种题型，提供公有题库，支持自行批量上传题目，同时中测高科提供专业出题服务，助力客户打造科学完整的题库",
    tags: ["公有+私有题库", "涵盖各类考试题型", "批量快捷题目录入"],
  },
  {
    icon: "/assets/images/onlineTest/box3-img4.png",
    title: "数字化考试流程管理",
    content:
      "提供短信、邮件、AI语音电话等通知方式，确保到场率；支持项目创建及考试面试一体化流程设计与管理；支持考试数据存档与分析",
    tags: ["多种通知方式", "考试面试一体化", "数据存档与分析"],
  },
  {
    icon: "/assets/images/onlineTest/box3-img5.png",
    title: "支持数据导出和系统对接",
    content:
      "提供多种数据维度的考生考试报告，支持考试数据一键导出，支持考试数据通过API对接到自研或第三方招聘管理系统",
    tags: ["出具考试报告", "考试数据导出", "支持系统对接"],
  },
];

const sceneCards = [
  {
    icon: "/assets/images/onlineTest/box4-icon1.png",
    title: "大型企业校招笔试",
    content:
      "万人级并发支撑，候选人远程在家笔试，自动化阅卷当天出分，高效筛选人才",
  },
  {
    icon: "/assets/images/onlineTest/box4-icon2.png",
    title: "社会招聘笔试",
    content:
      "全流程防作弊保障公平公正，智能监考实时监测异常行为，降低90%组织成本",
  },
  {
    icon: "/assets/images/onlineTest/box4-icon3.png",
    title: "职业资格认证测评",
    content: "公安人脸核验 + 多机位监考，满足国家级认证考试的严肃性与合规要求",
  },
  {
    icon: "/assets/images/onlineTest/box4-icon4.png",
    title: "技能竞赛与选拔",
    content:
      "支持编程题、实操题等多题型，远程多机位监考，为行业技能人才选拔提供标准化方案",
  },
];

const testimonials = [
  {
    avatar: "李",
    name: "李部长",
    role: "某电力集团人力资源部",
    content:
      "2600余名考生同时在线校招笔试，从模拟测试到正式考试全程流畅。自动化阅卷当天出分，招聘效率提升了数倍，大幅缩短了人才筛选周期。",
  },
  {
    avatar: "张",
    name: "张主任",
    role: "某互联网企业招聘中心负责人",
    content:
      "考试星的智能防作弊体系让我们实现了真正的远程笔试，候选人无需到场，在家即可完成笔试。监考人力成本降低了近九成，招聘公平性反而更高了。",
  },
  {
    avatar: "王",
    name: "王处长",
    role: "某国企信息化管理部",
    content:
      "私有化部署方案让我们的人事数据完全不出内网，API接口与现有OA系统无缝对接，上线仅用两周。全流程托管服务让招聘团队可以专注核心决策。",
  },
];

// ===================== 移动端（≤1024px）专用逻辑 =====================
// web 端根节点 .ot-page 的模板 / 样式 / 脚本保持零改动；
// 以下状态与副作用仅供移动根节点 .otm-page 使用，与桌面端互不干扰。
// 复用已导入的 ref / onMounted，不新增任何 import。
const otmSection = ref<HTMLElement>();

onMounted(() => {
  if (!otmSection.value) return;
  const otmObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("otm-visible");
          otmObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  otmSection.value.querySelectorAll(".otm-animate").forEach((el) => {
    otmObserver.observe(el as HTMLElement);
  });
});
</script>

<template>
  <div ref="otSection" class="ot-page">
    <!-- ========== Banner ========== -->
    <section class="ot-banner">
      <div class="ot-banner-wrapper">
        <div class="ot-banner-bg">
          <img
            src="/assets/images/onlineTest/banner-bg.png"
            alt=""
            class="ot-banner-bg-img"
          />
        </div>
        <div class="container-ot ot-banner-content">
          <div class="ot-banner-badge">智能在线笔试平台</div>
          <h1 class="ot-banner-title">
            稳定可靠<br />的专业<span class="ot-highlight">在线考试平台</span>
          </h1>
          <p class="ot-banner-desc">
            能监考及多重防作弊体系，专业题库管理功能，数字化考试流程管理，确保在线考试公平公正、稳定安全。
          </p>
          <div class="ot-banner-actions">
            <NuxtLink class="ot-btn ot-btn-primary" :to="contactRoute"
              >预约咨询</NuxtLink
            >
            <!-- TODO: 立即体验点击事件待定 -->
            <button type="button" class="ot-btn ot-btn-outline">
              立即体验
            </button>
            <a
              class="ot-btn ot-btn-outline"
              href="https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/materials/onlinetest.pdf"
              target="_blank"
              rel="noopener"
              >资料下载</a
            >
          </div>
        </div>
      </div>
      <div class="ot-data-row">
        <div class="container-ot ot-data-inner">
          <div class="ot-data-item">
            <strong
              ><span class="ot-count-number" v-count-up="6000">6000</span
              ><span class="ot-count-plus">+</span></strong
            >
            <span>企业客户信赖选择</span>
          </div>
          <div class="ot-data-divider"></div>
          <div class="ot-data-item">
            <strong
              ><span class="ot-count-number" v-count-up="180000">180000</span
              ><span class="ot-count-plus">+</span></strong
            >
            <span>累计服务考试人次</span>
          </div>
          <div class="ot-data-divider"></div>
          <div class="ot-data-item">
            <strong
              ><span class="ot-count-number" v-count-up="90">90</span
              ><span class="ot-count-percent">%</span></strong
            >
            <span>组织成本降低</span>
          </div>
          <div class="ot-data-divider"></div>
          <div class="ot-data-item">
            <strong
              ><span class="ot-count-number" v-count-up="20000">20000</span
              ><span class="ot-count-plus">+</span></strong
            >
            <span>考试场次成功交付</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 导航标签 ========== -->
    <!-- <nav class="ot-nav-bar">
            <div class="container-ot ot-nav-inner">
                <a v-for="tab in navTabs" :key="tab.target" class="ot-nav-tab"
                    :class="{ 'ot-nav-tab-active': activeNav === tab.target }"
                    @click.prevent="scrollToSection(tab.target)" href="javascript:void(0)">
                    {{ tab.label }}
                </a>
            </div>
        </nav> -->

    <!-- ========== 四视角区 ========== -->
    <section id="ot-product" class="ot-section ot-perspective-section">
      <div class="container-ot">
        <div class="ot-section-header ot-section-header-center ot-animate">
          <p class="ot-section-kicker">Intelligent Discrimination</p>
          <h2 class="ot-section-title">
            四视角360°智能甄辨，全方位考场监测领跑业界
          </h2>
          <p class="ot-section-subtitle">
            中测在线考试系统支持四个视角对考生作答环境进行跟踪，360°全方位监测考生作弊行为
          </p>
        </div>
        <div class="ot-perspective-img-wrap ot-animate">
          <img
            src="/assets/images/onlineTest/box1-img.png"
            alt=""
            class="ot-perspective-img"
          />
        </div>
      </div>
    </section>

    <!-- ========== 新一代区 ========== -->
    <section class="ot-section ot-newgen-section">
      <div class="container-ot ot-newgen-content ot-animate">
        <div class="ot-newgen-left">
          <p class="ot-section-kicker ot-kicker-white1">Intelligent System</p>
          <h2 class="ot-section-title ot-title-white">
            新一代智能在线考试系统
          </h2>
          <p class="ot-newgen-subtitle">别看小 别小看</p>
          <h3 class="ot-newgen-feature-title">
            新一代智能考试客户端双端联动让考试更安全
          </h3>
          <p class="ot-newgen-desc comm-indent">
            中测高科新一代智能考试客户端，与网页答题端智能联动，通过对考生系统环境、违规应用软件的快速检测与拦截，有效杜绝考生在考试过程中利用外设、应用程序等作弊的现象。
          </p>
        </div>
        <div class="ot-newgen-right">
          <img
            src="/assets/images/onlineTest/box2-img.png"
            alt=""
            class="ot-newgen-img"
          />
        </div>
      </div>
    </section>

    <!-- ========== 核心功能区 ========== -->
    <section id="ot-core" class="ot-section ot-core-section">
      <div class="container-ot">
        <div class="ot-section-header ot-section-header-center ot-animate">
          <p class="ot-section-kicker">CORE CAPABILITIES</p>
          <h2 class="ot-section-title">核心功能</h2>
          <p class="ot-section-subtitle">
            支持各类考试场景，助力招考方便快捷、公平公正
          </p>
        </div>
        <div class="ot-core-list">
          <div
            v-for="(feature, idx) in coreFeatures"
            :key="idx"
            class="ot-core-item ot-animate"
          >
            <div class="ot-core-item-image">
              <img :src="feature.icon" alt="" class="ot-core-item-img" />
            </div>
            <div class="ot-core-item-content">
              <h3>{{ feature.title }}</h3>
              <p class="comm-indent">{{ feature.content }}</p>
              <div class="ot-core-tags">
                <span
                  v-for="(tag, tidx) in feature.tags"
                  :key="tidx"
                  class="ot-core-tag"
                  >{{ tag }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 覆盖各类区 ========== -->
    <section id="ot-scene" class="ot-section ot-scene-section">
      <div class="ot-scene-bg">
        <img
          src="/assets/images/onlineTest/bg1.png"
          alt=""
          class="ot-scene-bg-img"
        />
      </div>
      <div class="container-ot">
        <div class="ot-section-header ot-animate">
          <p class="ot-section-kicker ot-kicker-white2">USE CASES</p>
          <h2 class="ot-section-title ot-title-white">覆盖各类招聘笔试场景</h2>
          <p class="ot-section-subtitle ot-subtitle-white">
            无论是万人规模校招还是社会招聘，都能提供匹配的在线笔试方案
          </p>
        </div>
        <div class="ot-scene-grid ot-animate">
          <div
            v-for="(card, idx) in sceneCards"
            :key="idx"
            class="ot-scene-card"
          >
            <img :src="card.icon" alt="" class="ot-scene-card-icon" />
            <div>
              <h3>{{ card.title }}</h3>
              <p>{{ card.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 数据验证区 ========== -->
    <section id="ot-data" class="ot-section ot-data-section">
      <div class="ot-data-bg">
        <img
          src="/assets/images/onlineTest/bg2.png"
          alt=""
          class="ot-data-bg-img"
        />
      </div>
      <div class="container-ot">
        <div class="ot-section-header ot-animate">
          <p class="ot-section-kicker">PROVEN RESULTS</p>
          <h2 class="ot-section-title">数据验证，招聘效率显著提升</h2>
          <p class="ot-section-subtitle">
            AI技术为在线笔试带来的效率与公平性提升
          </p>
        </div>
        <div class="ot-charts ot-animate">
          <div class="ot-chart-card">
            <h4 class="ot-chart-title">招聘笔试组织效率对比</h4>
            <div class="ot-chart-bars">
              <div class="ot-bar-row">
                <span class="ot-bar-label">人工监考</span>
                <div class="ot-bar-track">
                  <div class="ot-bar ot-bar-light" style="width: 60%"></div>
                </div>
                <span class="ot-bar-value">30 人/场</span>
              </div>
              <div class="ot-bar-row">
                <span class="ot-bar-label">AI 监考</span>
                <div class="ot-bar-track">
                  <div class="ot-bar ot-bar-dark" style="width: 20%"></div>
                </div>
                <span class="ot-bar-value">3 人/场</span>
              </div>
            </div>
            <div class="ot-chart-legend">
              <span class="ot-legend-item"
                ><span class="ot-legend-dot ot-legend-light"></span
                >传统方式</span
              >
              <span class="ot-legend-item"
                ><span class="ot-legend-dot ot-legend-dark"></span>AI
                赋能后</span
              >
            </div>
          </div>
          <div class="ot-chart-card">
            <h4 class="ot-chart-title">简历筛选与阅卷速度提升</h4>
            <div class="ot-chart-bars">
              <div class="ot-bar-row">
                <span class="ot-bar-label">人工批改</span>
                <div class="ot-bar-track">
                  <div class="ot-bar ot-bar-light" style="width: 30%"></div>
                </div>
                <span class="ot-bar-value">50 份/时</span>
              </div>
              <div class="ot-bar-row">
                <span class="ot-bar-label">AI 辅助</span>
                <div class="ot-bar-track">
                  <div class="ot-bar ot-bar-dark" style="width: 80%"></div>
                </div>
                <span class="ot-bar-value">300 份/时</span>
              </div>
            </div>
            <div class="ot-chart-legend">
              <span class="ot-legend-item"
                ><span class="ot-legend-dot ot-legend-light"></span
                >传统方式</span
              >
              <span class="ot-legend-item"
                ><span class="ot-legend-dot ot-legend-dark"></span>AI
                赋能后</span
              >
            </div>
          </div>
        </div>
        <div class="ot-testimonials ot-animate">
          <h4 class="ot-testimonials-title">企业客户评价</h4>
          <div class="ot-testimonial-grid">
            <div
              v-for="(item, idx) in testimonials"
              :key="idx"
              class="ot-testimonial-card"
            >
              <p class="ot-testimonial-content comm-indent">
                {{ item.content }}
              </p>
              <div class="ot-testimonial-author">
                <div class="ot-avatar">{{ item.avatar }}</div>
                <div>
                  <div class="ot-author-name">{{ item.name }}</div>
                  <div class="ot-author-role">{{ item.role }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== CTA区 ========== -->
    <section class="ot-section ot-cta-section">
      <div class="container-ot ot-cta-content ot-animate">
        <h2 class="ot-cta-title">准备好升级您的招聘考试系统了吗？</h2>
        <p class="ot-cta-subtitle">
          7天免费试用，全功能开放，专属顾问一对一支持
        </p>
        <div class="ot-cta-actions">
          <NuxtLink class="ot-btn ot-btn-white" :to="contactRoute"
            >预约咨询</NuxtLink
          >
          <!-- TODO: 立即体验点击事件待定 -->
          <button type="button" class="ot-btn ot-btn-outline-white">
            立即体验
          </button>
          <a
            class="ot-btn ot-btn-outline-white"
            href="https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/materials/onlinetest.pdf"
            target="_blank"
            rel="noopener"
            >资料下载</a
          >
        </div>
        <p class="ot-cta-phone">或致电咨询：17770081545</p>
      </div>
    </section>
  </div>

  <!-- ============================================================
         移动端版本（otm- 前缀，≤1024px 生效，web 端 DOM/CSS/script 零改动）
         · 桌面（>1024px）隐藏移动根；≤1024px 隐藏桌面根、显示移动根
         · 复用 web 端 coreFeatures / sceneCards / testimonials 数据与图片、配色
         · 不加 sticky 导航栏；Banner 按钮用原生锚点 href=#otm-core 平滑滚动
         ============================================================ -->
  <div ref="otmSection" class="otm-page">
    <!-- ========== Banner ========== -->
    <section class="otm-banner">
      <div class="otm-banner-bg">
        <img src="/assets/images/onlineTest/banner-bg.png" alt="" />
      </div>
      <div class="otm-banner-content">
        <div class="otm-banner-badge">智能在线笔试平台</div>
        <h1 class="otm-banner-title">
          稳定可靠<br />的专业<span class="otm-highlight">在线考试平台</span>
        </h1>
        <p class="otm-banner-desc">
          能监考及多重防作弊体系，专业题库管理功能，数字化考试流程管理，确保在线考试公平公正、稳定安全。
        </p>
        <div class="otm-banner-actions">
          <NuxtLink class="otm-btn otm-btn-primary" :to="contactRoute"
            >预约咨询</NuxtLink
          >
          <!-- TODO: 立即体验点击事件待定 -->
          <button type="button" class="otm-btn otm-btn-outline">
            立即体验
          </button>
          <a
            class="otm-btn otm-btn-outline"
            href="https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/materials/onlinetest.pdf"
            target="_blank"
            rel="noopener"
            >资料下载</a
          >
        </div>
      </div>
      <div class="otm-data-row">
        <div class="otm-data-item">
          <strong
            ><span class="otm-count-num" v-count-up="6000">6000</span
            ><span class="otm-count-plus">+</span></strong
          >
          <span>企业客户信赖选择</span>
        </div>
        <div class="otm-data-item">
          <strong
            ><span class="otm-count-num" v-count-up="180000">180000</span
            ><span class="otm-count-plus">+</span></strong
          >
          <span>累计服务考试人次</span>
        </div>
        <div class="otm-data-item">
          <strong
            ><span class="otm-count-num" v-count-up="90">90</span
            ><span class="otm-count-percent">%</span></strong
          >
          <span>组织成本降低</span>
        </div>
        <div class="otm-data-item">
          <strong
            ><span class="otm-count-num" v-count-up="20000">20000</span
            ><span class="otm-count-plus">+</span></strong
          >
          <span>考试场次成功交付</span>
        </div>
      </div>
    </section>

    <!-- ========== 四视角区 ========== -->
    <section id="otm-product" class="otm-section otm-perspective">
      <div class="otm-container">
        <div class="otm-head otm-animate">
          <p class="otm-kicker">Intelligent Discrimination</p>
          <h2 class="otm-title">四视角360°智能甄辨，全方位考场监测领跑业界</h2>
          <p class="otm-subtitle">
            中测在线考试系统支持四个视角对考生作答环境进行跟踪，360°全方位监测考生作弊行为
          </p>
        </div>
        <div class="otm-perspective-img otm-animate">
          <img src="/assets/images/onlineTest/box1-img.png" alt="" />
        </div>
      </div>
    </section>

    <!-- ========== 新一代区 ========== -->
    <section class="otm-section otm-newgen">
      <div class="otm-container otm-animate">
        <p class="otm-kicker otm-kicker-cyan">Intelligent System</p>
        <h2 class="otm-title otm-title-white">新一代智能在线考试系统</h2>
        <p class="otm-newgen-subtitle">别看小 别小看</p>
        <h3 class="otm-newgen-feature-title">
          新一代智能考试客户端双端联动让考试更安全
        </h3>
        <p class="otm-newgen-desc otm-indent">
          中测高科新一代智能考试客户端，与网页答题端智能联动，通过对考生系统环境、违规应用软件的快速检测与拦截，有效杜绝考生在考试过程中利用外设、应用程序等作弊的现象。
        </p>
        <div class="otm-newgen-img">
          <img src="/assets/images/onlineTest/box2-img.png" alt="" />
        </div>
      </div>
    </section>

    <!-- ========== 核心功能区 ========== -->
    <section id="otm-core" class="otm-section otm-core">
      <div class="otm-container">
        <div class="otm-head otm-animate">
          <p class="otm-kicker">CORE CAPABILITIES</p>
          <h2 class="otm-title">核心功能</h2>
          <p class="otm-subtitle">
            支持各类考试场景，助力招考方便快捷、公平公正
          </p>
        </div>
        <div class="otm-core-list">
          <div
            v-for="(feature, idx) in coreFeatures"
            :key="idx"
            class="otm-core-item otm-animate"
          >
            <div class="otm-core-img">
              <img :src="feature.icon" alt="" />
            </div>
            <div class="otm-core-content">
              <h3>{{ feature.title }}</h3>
              <p class="otm-indent">{{ feature.content }}</p>
              <div class="otm-core-tags">
                <span
                  v-for="(tag, tidx) in feature.tags"
                  :key="tidx"
                  class="otm-core-tag"
                  >{{ tag }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 覆盖场景区 ========== -->
    <section id="otm-scene" class="otm-section otm-scene">
      <div class="otm-scene-bg">
        <img src="/assets/images/onlineTest/bg1.png" alt="" />
      </div>
      <div class="otm-container">
        <div class="otm-head otm-animate">
          <p class="otm-kicker otm-kicker-blue">USE CASES</p>
          <h2 class="otm-title otm-title-white">覆盖各类招聘笔试场景</h2>
          <p class="otm-subtitle otm-subtitle-white">
            无论是万人规模校招还是社会招聘，都能提供匹配的在线笔试方案
          </p>
        </div>
        <div class="otm-scene-grid otm-animate">
          <div
            v-for="(card, idx) in sceneCards"
            :key="idx"
            class="otm-scene-card"
          >
            <img :src="card.icon" alt="" class="otm-scene-icon" />
            <div>
              <h3>{{ card.title }}</h3>
              <p>{{ card.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 数据验证区 ========== -->
    <section id="otm-data" class="otm-section otm-data">
      <div class="otm-data-bg">
        <img src="/assets/images/onlineTest/bg2.png" alt="" />
      </div>
      <div class="otm-container">
        <div class="otm-head otm-animate">
          <p class="otm-kicker">PROVEN RESULTS</p>
          <h2 class="otm-title">数据验证，招聘效率显著提升</h2>
          <p class="otm-subtitle">AI技术为在线笔试带来的效率与公平性提升</p>
        </div>
        <div class="otm-charts otm-animate">
          <div class="otm-chart-card">
            <h4 class="otm-chart-title">招聘笔试组织效率对比</h4>
            <div class="otm-chart-bars">
              <div class="otm-bar-row">
                <span class="otm-bar-label">人工监考</span>
                <div class="otm-bar-track">
                  <div class="otm-bar otm-bar-light" style="width: 60%"></div>
                </div>
                <span class="otm-bar-value">30 人/场</span>
              </div>
              <div class="otm-bar-row">
                <span class="otm-bar-label">AI 监考</span>
                <div class="otm-bar-track">
                  <div class="otm-bar otm-bar-dark" style="width: 20%"></div>
                </div>
                <span class="otm-bar-value">3 人/场</span>
              </div>
            </div>
            <div class="otm-chart-legend">
              <span class="otm-legend-item"
                ><span class="otm-legend-dot otm-legend-light"></span
                >传统方式</span
              >
              <span class="otm-legend-item"
                ><span class="otm-legend-dot otm-legend-dark"></span>AI
                赋能后</span
              >
            </div>
          </div>
          <div class="otm-chart-card">
            <h4 class="otm-chart-title">简历筛选与阅卷速度提升</h4>
            <div class="otm-chart-bars">
              <div class="otm-bar-row">
                <span class="otm-bar-label">人工批改</span>
                <div class="otm-bar-track">
                  <div class="otm-bar otm-bar-light" style="width: 30%"></div>
                </div>
                <span class="otm-bar-value">50 份/时</span>
              </div>
              <div class="otm-bar-row">
                <span class="otm-bar-label">AI 辅助</span>
                <div class="otm-bar-track">
                  <div class="otm-bar otm-bar-dark" style="width: 80%"></div>
                </div>
                <span class="otm-bar-value">300 份/时</span>
              </div>
            </div>
            <div class="otm-chart-legend">
              <span class="otm-legend-item"
                ><span class="otm-legend-dot otm-legend-light"></span
                >传统方式</span
              >
              <span class="otm-legend-item"
                ><span class="otm-legend-dot otm-legend-dark"></span>AI
                赋能后</span
              >
            </div>
          </div>
        </div>
        <div class="otm-testimonials otm-animate">
          <h4 class="otm-testimonials-title">企业客户评价</h4>
          <div class="otm-testimonial-grid">
            <div
              v-for="(item, idx) in testimonials"
              :key="idx"
              class="otm-testimonial-card"
            >
              <p class="otm-testimonial-content otm-indent">
                {{ item.content }}
              </p>
              <div class="otm-testimonial-author">
                <div class="otm-avatar">{{ item.avatar }}</div>
                <div>
                  <div class="otm-author-name">{{ item.name }}</div>
                  <div class="otm-author-role">{{ item.role }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== CTA区 ========== -->
    <section class="otm-section otm-cta">
      <div class="otm-container otm-cta-content otm-animate">
        <h2 class="otm-cta-title">准备好升级您的招聘考试系统了吗？</h2>
        <p class="otm-cta-subtitle">
          7天免费试用，全功能开放，专属顾问一对一支持
        </p>
        <div class="otm-cta-actions">
          <NuxtLink class="otm-btn otm-btn-white" :to="contactRoute"
            >预约咨询</NuxtLink
          >
          <!-- TODO: 立即体验点击事件待定 -->
          <button type="button" class="otm-btn otm-btn-outline-white">
            立即体验
          </button>
          <a
            class="otm-btn otm-btn-outline-white"
            href="https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/materials/onlinetest.pdf"
            target="_blank"
            rel="noopener"
            >资料下载</a
          >
        </div>
        <p class="otm-cta-phone">或致电咨询：17770081545</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.comm-indent {
  text-indent: 2em;
}

/* ===== 基础变量 ===== */
.ot-page {
  --ot-blue: #0f62fe;
  --ot-blue-dark: #0043ce;
  --ot-ink: #1a1a2e;
  --ot-muted: #5a6578;
  --ot-white: #fff;
  font-family:
    Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui,
    sans-serif;
  color: var(--ot-ink);
}

.container-ot {
  width: min(1200px, calc(100% - 40px));
  margin: 0 auto;
}

/* ===== 滚动动画 ===== */
.ot-animate {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}

.ot-animate.ot-visible {
  opacity: 1;
  transform: translateY(0);
}

.ot-animate:nth-child(2) {
  transition-delay: 0.1s;
}

.ot-animate:nth-child(3) {
  transition-delay: 0.2s;
}

.ot-animate:nth-child(4) {
  transition-delay: 0.3s;
}

/* ===== 通用 Section ===== */
.ot-section {
  width: 100%;
  position: relative;
}

.ot-section-header {
  margin-bottom: 44px;
}

.ot-section-header-center {
  text-align: center;
}

.ot-section-kicker {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 3px;
  color: var(--ot-blue);
  text-transform: uppercase;
  margin: 0 0 12px;
}

.ot-kicker-white {
  color: rgba(255, 255, 255, 0.7);
}

.ot-kicker-white1 {
  color: #01f7fb;
}

.ot-kicker-white2 {
  color: #60a5fa;
}

.ot-section-title {
  font-size: 32px;
  font-weight: 600;
  color: var(--ot-ink);
  line-height: 1.35;
  margin: 0 0 12px;
}

.ot-title-white {
  color: #fff;
}

.ot-section-subtitle {
  color: #4a5568;
  font-size: 16px;
  line-height: 1.76;
}

.ot-subtitle-white {
  color: rgba(255, 255, 255, 0.7);
}

.ot-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 19px 32px;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  line-height: 1;
}

.ot-btn-primary {
  background: #0f62fe;
  color: #fff;
}

.ot-btn-primary:hover {
  background: var(--ot-blue-dark);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(15, 98, 254, 0.4);
}

.ot-btn-outline {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.ot-btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #fff;
}

.ot-btn-white {
  background: #fff;
  color: var(--ot-blue);
}

.ot-btn-white:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.ot-btn-outline-white {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.ot-btn-outline-white:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #fff;
}

/* ===== Banner ===== */
.ot-banner {
  width: 100%;
  height: 626px;
  background: linear-gradient(
    127deg,
    #070e1a 0%,
    #00296f 68.22%,
    #122244 97.08%
  );
  position: relative;
}

.ot-banner-wrapper {
  width: 1440px;
  margin: 0 auto;
  height: 100%;
  position: relative;
}

.ot-banner-bg {
  position: absolute;
  top: 77px;
  right: -75px;
  width: 937px;
  height: 396px;
  pointer-events: none;
}

.ot-banner-bg-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.ot-banner-content {
  position: absolute;
  z-index: 2;
  top: 77px;
  left: 137px;
}

.ot-banner-badge {
  display: inline-block;
  padding: 10px 17px 10px 31px;
  background: rgba(37, 99, 235, 0.12);
  border-radius: 100px;
  font-weight: 600;
  font-size: 13px;
  color: #60a5fa;
  line-height: 16px;
  border: 1px solid rgba(37, 99, 235, 0.2);
  margin-bottom: 21px;
  position: relative;
}

.ot-banner-badge::before {
  content: "";
  width: 6px;
  height: 6px;
  background: #60a5fa;
  border-radius: 50%;
  position: absolute;
  left: 17px;
  top: 50%;
  transform: translateY(-50%);
}

.ot-banner-title {
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 600;
  color: #fff;
  line-height: 1.21;
  letter-spacing: 0.1em;
  margin: 0 0 21px;
}

.ot-highlight {
  color: #0fdafe;
}

.ot-banner-desc {
  font-weight: 400;
  font-size: 17px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 29px;
  margin: 0 0 55px;
  max-width: 432px;
}

.ot-banner-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

/* ===== 数据行 ===== */
.ot-data-row {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 124px;
  background: rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 3;
}

.ot-data-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: 90px;
}

.ot-data-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.ot-data-item strong {
  font-size: 40px;
  font-weight: 600;
  color: #fff;
  line-height: 1.1;
}

.ot-data-item span {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
}

.ot-data-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.15);
}

.ot-count-number {
  font-size: 36px !important;
  font-weight: inherit !important;
  color: inherit !important;
}

.ot-count-plus,
.ot-count-percent {
  font-size: 20px !important;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.45) !important;
  margin-left: 2px;
}

/* ===== 导航标签 ===== */
.ot-nav-bar {
  width: 100%;
  height: 56px;
  background: #f4f7fb;
  position: sticky;
  top: 76px;
  left: 0;
  z-index: 15;
}

.ot-nav-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 77px;
  height: 100%;
}

.ot-nav-tab {
  font-size: 16px;
  font-weight: 400;
  color: #161616;
  text-decoration: none;
  padding: 16px 0;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
}

.ot-nav-tab:hover {
  color: var(--ot-blue);
}

.ot-nav-tab-active {
  color: var(--ot-blue);
  border-bottom-color: var(--ot-blue);
}

/* ===== 四视角区 ===== */
.ot-perspective-section {
  padding: 132px 0 61px;
  background: #fff;
}

.ot-perspective-img-wrap {
  text-align: center;
}

.ot-perspective-img {
  max-width: 100%;
  height: auto;
}

/* ===== 新一代区 ===== */
.ot-newgen-section {
  padding: 31px 0 36px;
  background: linear-gradient(318deg, #1b1b1b 0%, #001342 100%);
  height: 619px;
}

.ot-newgen-content {
  display: flex;
  justify-content: space-between;
  gap: 60px;
}

.ot-newgen-left {
  flex: 1;
  max-width: 432px;
  margin: 21px 0 0;
}

.ot-newgen-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 66px;
}

.ot-newgen-feature-title {
  font-weight: 600;
  font-size: 20px;
  color: #01f7fb;
  line-height: 29px;
  margin: 0 0 18px;
}

.ot-newgen-desc {
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 24px;
  margin: 0;
}

.ot-newgen-right {
  flex-shrink: 0;
}

.ot-newgen-img {
  width: 736px;
  height: 552px;
  object-fit: contain;
}

/* ===== 核心功能区 ===== */
.ot-core-section {
  padding: 89px 0 159px;
  background: #f8fafc;
}

.ot-core-list {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.ot-core-item {
  display: flex;
  align-items: center;
  gap: 60px;
}

.ot-core-item:nth-child(even) {
  flex-direction: row-reverse;
}

.ot-core-item-image {
  flex-shrink: 0;
}

.ot-core-item-img {
  max-width: 100%;
  height: auto;
}

.ot-core-item-content {
  flex: 1;
}

.ot-core-item-content h3 {
  font-size: 24px;
  font-weight: 600;
  color: var(--ot-ink);
  margin: 0 0 16px;
}

.ot-core-item-content p {
  font-size: 15px;
  color: #4a5568;
  line-height: 1.8;
  margin: 0 0 20px;
}

.ot-core-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.ot-core-tag {
  display: inline-block;
  padding: 2px 32px;
  background: #e3edff;
  border-radius: 4px;
  font-size: 12px;
  color: #1a5fff;
}

/* ===== 覆盖各类区 ===== */
.ot-scene-section {
  position: relative;
  padding: 98px 0;
  background: #0c1d3a;
  height: 647px;
  overflow: hidden;
}

.ot-scene-bg {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1440px;
  height: 647px;
  pointer-events: none;
}

.ot-scene-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ot-scene-section .container-ot {
  position: relative;
  z-index: 2;
}

.ot-scene-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.ot-scene-card {
  padding: 33px 50px 33px 25px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px 10px 10px 10px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  gap: 24px;
  align-items: center;
}

.ot-scene-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.ot-scene-card-icon {
  width: 78px;
  height: 78px;
  margin-bottom: 20px;
}

.ot-scene-card h3 {
  font-weight: 600;
  font-size: 17px;
  color: #ffffff;
  line-height: 21px;
  margin: 0 0 13px;
}

.ot-scene-card p {
  font-weight: 600;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 22px;
  margin: 0;
}

/* ===== 数据验证区 ===== */
.ot-data-section {
  position: relative;
  padding: 96px 0;
  background: #f2f8fc;
  min-height: 896px;
  overflow: hidden;
}

.ot-data-bg {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1440px;
  height: 896px;
  pointer-events: none;
}

.ot-data-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ot-data-section .container-ot {
  position: relative;
  z-index: 2;
}

.ot-charts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

.ot-chart-card {
  padding: 32px;
  background: #f8fafc;
  border-radius: 10px 10px 10px 10px;
  border: 1px solid #e2e8f0;
}

.ot-chart-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--ot-ink);
  margin: 0 0 23px;
}

.ot-chart-bars {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ot-bar-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.ot-bar-label {
  width: 70px;
  font-size: 13px;
  color: #64748b;
  flex-shrink: 0;
  text-align: right;
}

.ot-bar-track {
  flex: 1;
  height: 32px;
  background: rgba(37, 99, 235, 0.06);
  border-radius: 4px;
  overflow: hidden;
}

.ot-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 1s ease;
}

.ot-bar-light {
  background: #a9caf9;
}

.ot-bar-dark {
  background: #2563eb;
}

.ot-bar-value {
  width: 80px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ot-ink);
  text-align: right;
  flex-shrink: 0;
}

.ot-chart-legend {
  display: flex;
  gap: 20px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

.ot-legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #64748b;
}

.ot-legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.ot-legend-light {
  background: #cbd5e1;
}

.ot-legend-dark {
  background: var(--ot-blue);
}

/* ===== 企业客户评价 ===== */
.ot-testimonials {
  margin-top: 48px;
}

.ot-testimonials-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--ot-ink);
  margin: 0 0 24px;
}

.ot-testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.ot-testimonial-card {
  padding: 25px;
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}

.ot-testimonial-content {
  font-weight: 400;
  font-size: 14px;
  color: #161616;
  line-height: 24px;
  padding: 0 0 33px;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.ot-testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ot-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(37, 99, 235, 0.12) 0%,
    rgba(37, 99, 235, 0.2) 100%
  );
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}

.ot-author-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--ot-ink);
}

.ot-author-role {
  font-size: 12px;
  color: #64748b;
}

/* ===== CTA区 ===== */
.ot-cta-section {
  padding: 80px 0;
  background: linear-gradient(125deg, #003399 0%, #0052d9 40%, #1677ff 100%);
  height: 460px;
  display: flex;
  align-items: center;
}

.ot-cta-content {
  text-align: center;
}

.ot-cta-title {
  font-size: 32px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 16px;
}

.ot-cta-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 32px;
}

.ot-cta-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
}

.ot-cta-phone {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* ===== 响应式 ===== */
@media (max-width: 1200px) {
  .ot-banner-wrapper {
    width: 100%;
  }

  .ot-banner-bg {
    right: -50px;
    width: 700px;
  }

  .ot-newgen-img {
    width: 500px;
    height: auto;
  }

  .ot-scene-bg,
  .ot-data-bg {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .ot-banner {
    height: auto;
    min-height: 500px;
  }

  .ot-banner-content {
    left: 20px;
    right: 20px;
  }

  .ot-banner-bg {
    display: none;
  }

  .ot-data-inner {
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  .ot-data-divider {
    display: none;
  }

  .ot-nav-inner {
    gap: 20px;
    overflow-x: auto;
  }

  .ot-newgen-content {
    flex-direction: column;
  }

  .ot-newgen-img {
    width: 100%;
    height: auto;
  }

  .ot-core-item,
  .ot-core-item:nth-child(even) {
    flex-direction: column;
  }

  .ot-scene-grid,
  .ot-charts,
  .ot-testimonial-grid {
    grid-template-columns: 1fr;
  }

  .ot-cta-section {
    height: auto;
    padding: 60px 0;
  }
}

/* ============================================================
   移动端版本样式（otm- 前缀，≤1024px 生效）
   · 桌面（>1024px）隐藏移动根；≤1024px 隐藏桌面根、显示移动根
   · web 端 .ot-page 的样式与媒体查询保持零改动（以下均为纯新增）
   · 所有移动样式限定在 .otm-page 作用域内
   · 不给 .otm-page 设 overflow，避免破坏内部定位与平滑滚动
   ============================================================ */
.otm-page {
  display: none;
}

@media (max-width: 1024px) {
  .ot-page {
    display: none;
  }
  .otm-page {
    display: block;
  }
}

/* ===== 移动根变量与基础 ===== */
.otm-page {
  --otm-blue: #0f62fe;
  --otm-blue-dark: #0043ce;
  --otm-ink: #1a1a2e;
  --otm-white: #fff;
  font-family:
    Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui,
    sans-serif;
  color: var(--otm-ink);
  width: 100%;
}

.otm-container {
  width: min(100% - 32px, 640px);
  margin: 0 auto;
}

.otm-indent {
  text-indent: 2em;
}

/* ===== 入场动画 ===== */
.otm-animate {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.otm-animate.otm-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===== 通用 Section ===== */
.otm-section {
  position: relative;
  width: 100%;
  padding: 44px 0;
}

.otm-head {
  text-align: center;
  margin-bottom: 26px;
}

.otm-kicker {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  color: var(--otm-blue);
  text-transform: uppercase;
  margin: 0 0 10px;
}

.otm-kicker-cyan {
  color: #01f7fb;
}
.otm-kicker-blue {
  color: #60a5fa;
}

.otm-title {
  font-size: 22px;
  font-weight: 600;
  color: var(--otm-ink);
  line-height: 1.4;
  margin: 0 0 10px;
}

.otm-title-white {
  color: #fff;
}

.otm-subtitle {
  font-size: 14px;
  color: #4a5568;
  line-height: 1.7;
  margin: 0;
}

.otm-subtitle-white {
  color: rgba(255, 255, 255, 0.7);
}

/* ===== 按钮 ===== */
.otm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 24px;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  line-height: 1;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.otm-btn-primary {
  background: #0f62fe;
  color: #fff;
}
.otm-btn-outline {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.5);
}
.otm-btn-white {
  background: #fff;
  color: var(--otm-blue);
}
.otm-btn-outline-white {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

/* ===== Banner ===== */
.otm-banner {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(
    127deg,
    #070e1a 0%,
    #00296f 68.22%,
    #122244 97.08%
  );
  padding-top: 40px;
}

.otm-banner-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  opacity: 0.25;
  pointer-events: none;
}

.otm-banner-bg img {
  display: block;
  width: 100%;
  height: auto;
}

.otm-banner-content {
  position: relative;
  z-index: 2;
  width: min(100% - 40px, 640px);
  margin: 0 auto;
  padding-bottom: 34px;
}

.otm-banner-badge {
  display: inline-block;
  position: relative;
  padding: 8px 14px 8px 26px;
  background: rgba(37, 99, 235, 0.12);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  color: #60a5fa;
  line-height: 16px;
  margin-bottom: 18px;
}

.otm-banner-badge::before {
  content: "";
  width: 6px;
  height: 6px;
  background: #60a5fa;
  border-radius: 50%;
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
}

.otm-banner-title {
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  line-height: 1.3;
  letter-spacing: 0.04em;
  margin: 0 0 16px;
}

.otm-highlight {
  color: #0fdafe;
}

.otm-banner-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin: 0 0 24px;
}

.otm-banner-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.otm-banner-actions .otm-btn {
  width: 100%;
}

/* ===== 数据行（4 项 2×2）===== */
.otm-data-row {
  position: relative;
  z-index: 2;
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.otm-data-item {
  float: left;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 8px;
  box-sizing: border-box;
}

.otm-data-row::after {
  content: "";
  display: block;
  clear: both;
}

.otm-data-item strong {
  font-size: 26px;
  font-weight: 600;
  color: #fff;
  line-height: 1.1;
}

.otm-data-item > span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
}

.otm-count-num {
  font-size: 24px !important;
  font-weight: inherit !important;
  color: inherit !important;
}

.otm-count-plus,
.otm-count-percent {
  font-size: 14px !important;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.45) !important;
  margin-left: 2px;
}

/* ===== 四视角区 ===== */
.otm-perspective {
  background: #fff;
}

.otm-perspective-img {
  text-align: center;
}

.otm-perspective-img img {
  display: block;
  width: 100%;
  height: auto;
}

/* ===== 新一代区 ===== */
.otm-newgen {
  background: linear-gradient(318deg, #1b1b1b 0%, #001342 100%);
}

.otm-newgen-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 22px;
}

.otm-newgen-feature-title {
  font-size: 17px;
  font-weight: 600;
  color: #01f7fb;
  line-height: 1.5;
  margin: 0 0 12px;
}

.otm-newgen-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  margin: 0 0 24px;
}

.otm-newgen-img img {
  display: block;
  width: 100%;
  height: auto;
}

/* ===== 核心功能区 ===== */
.otm-core {
  background: #f8fafc;
}

.otm-core-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.otm-core-item {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.otm-core-img img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.otm-core-content h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--otm-ink);
  margin: 0 0 10px;
}

.otm-core-content p {
  font-size: 14px;
  color: #4a5568;
  line-height: 1.75;
  margin: 0 0 14px;
}

.otm-core-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.otm-core-tag {
  display: inline-block;
  padding: 4px 14px;
  background: #e3edff;
  border-radius: 4px;
  font-size: 12px;
  color: #1a5fff;
}

/* ===== 覆盖场景区 ===== */
.otm-scene {
  background: #0c1d3a;
  overflow: hidden;
}

.otm-scene-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.otm-scene-bg img {
  display: block;
  width: 100%;
  height: auto;
}

.otm-scene .otm-container {
  position: relative;
  z-index: 2;
}

.otm-scene-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.otm-scene-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  backdrop-filter: blur(10px);
}

.otm-scene-icon {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}

.otm-scene-card h3 {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  line-height: 1.4;
  margin: 0 0 8px;
}

.otm-scene-card p {
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
}

/* ===== 数据验证区 ===== */
.otm-data {
  background: #f2f8fc;
  overflow: hidden;
}

.otm-data-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.otm-data-bg img {
  display: block;
  width: 100%;
  height: auto;
}

.otm-data .otm-container {
  position: relative;
  z-index: 2;
}

.otm-charts {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 28px;
}

.otm-chart-card {
  padding: 20px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
}

.otm-chart-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--otm-ink);
  margin: 0 0 18px;
}

.otm-chart-bars {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.otm-bar-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.otm-bar-label {
  width: 56px;
  font-size: 12px;
  color: #64748b;
  flex-shrink: 0;
  text-align: right;
}

.otm-bar-track {
  flex: 1;
  height: 26px;
  background: rgba(37, 99, 235, 0.06);
  border-radius: 4px;
  overflow: hidden;
}

.otm-bar {
  height: 100%;
  border-radius: 4px;
}

.otm-bar-light {
  background: #a9caf9;
}
.otm-bar-dark {
  background: #2563eb;
}

.otm-bar-value {
  width: 62px;
  font-size: 12px;
  font-weight: 600;
  color: var(--otm-ink);
  text-align: right;
  flex-shrink: 0;
}

.otm-chart-legend {
  display: flex;
  gap: 16px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid #e2e8f0;
}

.otm-legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #64748b;
}

.otm-legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
}

.otm-legend-light {
  background: #cbd5e1;
}
.otm-legend-dark {
  background: var(--otm-blue);
}

/* ===== 企业客户评价 ===== */
.otm-testimonials {
  margin-top: 28px;
}

.otm-testimonials-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--otm-ink);
  margin: 0 0 18px;
}

.otm-testimonial-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.otm-testimonial-card {
  padding: 20px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
}

.otm-testimonial-content {
  font-size: 13px;
  color: #161616;
  line-height: 1.7;
  padding-bottom: 18px;
  border-bottom: 1px solid #e2e8f0;
  margin: 0 0 16px;
}

.otm-testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.otm-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(37, 99, 235, 0.12) 0%,
    rgba(37, 99, 235, 0.2) 100%
  );
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}

.otm-author-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--otm-ink);
}

.otm-author-role {
  font-size: 12px;
  color: #64748b;
}

/* ===== CTA区 ===== */
.otm-cta {
  background: linear-gradient(125deg, #003399 0%, #0052d9 40%, #1677ff 100%);
  padding: 48px 0;
}

.otm-cta-content {
  text-align: center;
}

.otm-cta-title {
  font-size: 22px;
  font-weight: 600;
  color: #fff;
  line-height: 1.4;
  margin: 0 0 12px;
}

.otm-cta-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 24px;
}

.otm-cta-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 18px;
}

.otm-cta-actions .otm-btn {
  width: 100%;
}

.otm-cta-phone {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
}

/* ===== 锚点偏移（避开 sticky 头部）===== */
#otm-core {
  scroll-margin-top: 90px;
}

/* ===== 大屏手机 / 平板（移动根内）优化 ===== */
@media (min-width: 600px) {
  .otm-scene-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .otm-charts {
    grid-template-columns: repeat(2, 1fr);
  }
  .otm-testimonial-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .otm-banner-actions {
    flex-direction: row;
  }
  .otm-banner-actions .otm-btn {
    width: auto;
    flex: 1;
  }
  .otm-cta-actions {
    flex-direction: row;
    justify-content: center;
  }
  .otm-cta-actions .otm-btn {
    width: auto;
  }
}

@media (min-width: 900px) {
  .otm-testimonial-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* ===== ≤560px 微调 ===== */
@media (max-width: 560px) {
  #otm-core {
    scroll-margin-top: 80px;
  }
  .otm-banner-title {
    font-size: 24px;
  }
  .otm-title {
    font-size: 20px;
  }
  .otm-section {
    padding: 38px 0;
  }
}
</style>
