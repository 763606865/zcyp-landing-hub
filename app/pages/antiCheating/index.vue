<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

// @ts-ignore
const source = useCampaignSource();
// @ts-ignore
const contactRoute = computed(() => getContactRoute(9, source.value));

// ===== 相关资料下载（与其他模块同一目录：zcyp-classroom/materials/<名称>.pdf）=====
const materialUrl =
  "https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/materials/antiCheating.pdf";

// @ts-ignore
useSeoMeta({
  title: "AI考务安全智能体｜中测高科",
  description:
    "中测高科AI考务安全智能体，面向标准化考试场景的智能化全流程考务管控系统，融合人工智能与视频分析技术，实现从考务组织到结果溯源的全链路闭环管理。",
});

// 导航标签
const navTabs = [
  { label: "产品概述", target: "overview" },
  { label: "核心功能", target: "feature" },
  { label: "数据管控", target: "data" },
  { label: "平台价值", target: "value" },
];
const activeNav = ref("overview");

const scrollToSection = (target: string) => {
  const el = document.getElementById(`ac-${target}`);
  if (el) {
    const headerOffset = 60;
    const y =
      el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const handleScroll = () => {
  const sections = navTabs.map((t) =>
    document.getElementById(`ac-${t.target}`),
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
const acSection = ref<HTMLElement>();

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  if (acSection.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ac-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    acSection.value.querySelectorAll(".ac-animate").forEach((el) => {
      observer.observe(el as HTMLElement);
    });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

// 产品概述卡片
const overviewCards = [
  {
    icon: "/assets/images/antiCheating/box1-icon1.png",
    title: "核心技术驱动",
    desc: "融合人工智能、视频智能分析、无线电探测及红外感知等前沿技术，构建全方位、高精度的智能感知与防控底座。",
  },
  {
    icon: "/assets/images/antiCheating/box1-icon2.png",
    title: "全流程闭环管控",
    desc: "覆盖考务组织、智能监考、作弊防控、考场监控及指挥调度全环节，实现从考前筹备到考后归档的一体化管理。",
  },
  {
    icon: "/assets/images/antiCheating/box1-icon3.png",
    title: "直击行业痛点",
    desc: "有效破解人工监管效率低、新型高科技作弊手段隐蔽难防、流程不规范、异常处置滞后及溯源追责无依据等难题。",
  },
  {
    icon: "/assets/images/antiCheating/box1-icon4.png",
    title: "筑牢公平防线",
    desc: "全面提升考试组织管理的规范化、智能化与精细化水平，切实维护考试公平公正，保障各类考试安全有序开展。",
  },
];

// 多维度AI智能防作弊
const antiCheatBlocks = [
  {
    headIcon: "/assets/images/antiCheating/box2-icon1.png",
    title: "考场视频AI实时分析",
    intro:
      "基于深度学习的行为识别模型，精准捕捉考场内的微小异常，为标准化考试提供智能化、自动化的监考解决方案。",
    reverse: false,
    img: "/assets/images/antiCheating/box2-img1.png",
    imgW: 536,
    imgH: 348,
    imgMt: 85,
    quote1: "考场端页面展示",
    quote:
      "通过技术手段实现考务工作的智能化升级，不仅提升了考场监管的效率与准确性，更从根本上维护了考试的严肃性与公平性。",
    items: [
      {
        icon: "/assets/images/antiCheating/box2-icon4.png",
        title: "自动抓拍取证",
        desc: '智能识别异常行为并即刻抓拍，自动保存高清画面作为证据，实现违规行为的"零遗漏"记录。',
      },
      {
        icon: "/assets/images/antiCheating/box2-icon5.png",
        title: "实时弹窗预警",
        desc: "异常行为秒级推送至考务管理中心，弹窗醒目提示，助力监考人员快速响应与现场处置。",
      },
      {
        icon: "/assets/images/antiCheating/box2-icon6.png",
        title: "全程留存记录",
        desc: "监控录像与AI分析日志云端加密存储，数据不可篡改，支持事后一键调阅、追溯与合规复盘。",
      },
      {
        icon: "/assets/images/antiCheating/box2-icon7.png",
        title: "弥补人工短板",
        desc: "突破人力监控的视野盲区与生理疲劳限制，实现7×24小时不间断、无死角的智能守护。",
      },
    ],
  },
  {
    headIcon: "/assets/images/antiCheating/box2-icon2.png",
    title: "无线电信号智能侦测干预",
    intro:
      "搭载高精度无线电探测模块，具备全频段实时扫描能力，可精准识别并定位考场内各类隐形无线电作弊信号。",
    reverse: true,
    img: "/assets/images/antiCheating/box2-img2.png",
    imgW: 478,
    imgH: 475,
    imgMt: 100,
    quote: "",
    items: [
      {
        icon: "/assets/images/antiCheating/box2-icon8.png",
        title: "全域信号筛查",
        desc: "自动扫描全频段信号，智能识别异常通信特征，快速筛查潜在作弊信号源。",
      },
      {
        icon: "/assets/images/antiCheating/box2-icon9.png",
        title: "实时精准定位",
        desc: "基于场强分析与定向追踪技术，快速锁定信号发射位置，实现作弊源头精准溯源。",
      },
      {
        icon: "/assets/images/antiCheating/box2-icon10.png",
        title: "主动干扰阻断",
        desc: "智能匹配作弊频段，自动发射干扰信号，实时切断非法通信链路。",
      },
    ],
  },
  {
    headIcon: "/assets/images/antiCheating/box2-icon3.png",
    title: "红外热成像AI精准识别",
    intro:
      "针对AI眼镜、微型摄像设备等新型无感作弊手段，采用红外热成像感知与AI智能分析双重技术，精准捕捉电子设备热源特征。",
    reverse: false,
    img: "/assets/images/antiCheating/box2-img3.png",
    imgW: 536,
    imgH: 315,
    imgMt: 160,
    quote1: "热成像识别功能展示",
    quote: "",
    items: [
      {
        icon: "/assets/images/antiCheating/box2-icon11.png",
        title: "专项防控",
        desc: "针对新型智能化作弊手段，定制化研发防控方案，精准打击隐蔽式违规行为。",
      },
      {
        icon: "/assets/images/antiCheating/box2-icon12.png",
        title: "精准捕捉",
        desc: "敏锐捕捉电子设备运行时的微弱热源与电磁信号特征，无遗漏无死角。",
      },
      {
        icon: "/assets/images/antiCheating/box2-icon13.png",
        title: "技术升级",
        desc: '补齐传统监考的技术短板，实现从"人防"到"智能技防"的跨越升级。',
      },
    ],
  },
];

// 全流程考务智能化管控
const controlTabs = [
  {
    name: "考生身份核验",
    sub: "双重考生身份核验，杜绝替考代考",
    desc: '构建"考点入口+考场内部"的双重核验闭环，依托高精度人脸识别技术与证件信息交叉比对，实现从考生入场到就座的全流程身份确认。',
    points: [
      {
        title: "双重关卡把关",
        desc: '考点入口初次核验，考场内二次复核，形成"入场-就座"的双重安全屏障。',
      },
      {
        title: "多维智能核验",
        desc: "融合活体人脸识别、身份证芯片读取与数据库比对，多维度交叉验证。",
      },
      {
        title: "维护考试公平",
        desc: "从源头阻断替考、代考及错场风险，维护考试的严肃性与权威性。",
      },
    ],
    img: "/assets/images/antiCheating/box3-img1.png",
    imgW: 520,
    imgH: 314,
  },
  {
    name: "作弊设备排查",
    sub: "考前作弊设备全面排查",
    desc: "配备专业级间谍设备探测器，对考生随身物品及考场环境进行全覆盖、无死角的扫描排查，精准识别各类微型隐形耳机、信号发射器等作弊器材。",
    points: [
      {
        title: "专用探测设备",
        desc: "高灵敏度专业探测器，精准捕捉微弱信号与金属特征。",
      },
      {
        title: "全方位无死角",
        desc: "覆盖考生随身物品及考场各角落，地毯式扫描排查。",
      },
      {
        title: "筑牢安全防线",
        desc: "提前清除潜在风险，维护考试的严肃性与权威性。",
      },
    ],
    img: "/assets/images/antiCheating/box3-img2.png",
    imgW: 507,
    imgH: 333,
  },
  {
    name: "监考智能抽签",
    sub: "监考人员智能抽签分配",
    desc: "支持批量导入监考人员信息，可根据考试规模、考场类型等需求自定义抽签规则，涵盖男女搭配、师资结构配比、考场均衡分配等个性化设置。",
    points: [
      {
        title: "规则自定义",
        desc: "灵活配置抽签参数，适配不同考试场景的个性化需求。",
      },
      {
        title: "自动分配",
        desc: "系统自动完成监考分工抽签，高效便捷，减少人工操作。",
      },
      {
        title: "公开透明",
        desc: "全程随机公正，抽签过程可追溯，结果实时公示。",
      },
    ],
    img: "/assets/images/antiCheating/box3-img3.png",
    imgW: 519,
    imgH: 343,
  },
  {
    name: "试卷收发监管",
    sub: "试卷收发全程留痕监管",
    desc: "通过数字化手段将试卷流转的每一步纳入监管，对试卷发放、考生签字确认、清点回收等关键环节实施全流程视频录制与AI智能辅助。",
    points: [
      {
        title: "全程留痕，轨迹可查",
        desc: "灵活配置抽签参数，适配不同考试场景的个性化需求。",
      },
      {
        title: "AI辅助，精准高效",
        desc: "高清视频录制并存档，建立完整的责任追溯链条。",
      },
      {
        title: "闭环安全管控",
        desc: "智能加密押运终端，GPS定位与电子锁控技术，实时监控运输轨迹。",
      },
    ],
    img: "/assets/images/antiCheating/box3-img4.png",
    imgW: 520,
    imgH: 338,
  },
  {
    name: "异常联动调度",
    sub: "考场异常实时联动调度",
    desc: "搭建考场与考务办的实时通信通道，实现考试过程中考生违规、设备故障、突发状况等各类异常的实时上传与同步预警。",
    points: [
      {
        title: "实时通信，无缝衔接",
        desc: "监考老师与考务办直连互通，信息传递零延迟。",
      },
      {
        title: "智能预警，快速响应",
        desc: "考务指挥中心实时掌控全场动态，远程指导规范处置。",
      },
      {
        title: "闭环处置，杜绝隐患",
        desc: "规范异常处置流程，实现问题快速响应与闭环管理。",
      },
    ],
    img: "/assets/images/antiCheating/box3-img5.png",
    imgW: 547,
    imgH: 335,
  },
];
const activeTab = ref(0);
const activeControlTab = computed(
  () => controlTabs[activeTab.value] || controlTabs[0]!,
);

// 数据管控 - 全域数据可视化管控
const dataFeatures = [
  {
    icon: "/assets/images/antiCheating/box3-icon1.png",
    title: "实时动态监测",
    desc: "实时采集考场动态数据，毫秒级同步，全链路可视化呈现，考试异常情况即时触发智能预警。",
  },
  {
    icon: "/assets/images/antiCheating/box3-icon2.png",
    title: "智能态势分析",
    desc: "基于大数据算法深度挖掘，自动生成多维度分析报表，精准洞察考试运行态势，辅助考务决策高效化。",
  },
  {
    icon: "/assets/images/antiCheating/box3-icon3.png",
    title: "全域协同管控",
    desc: "打破多端数据壁垒，实现考点、考场、考务全场景联动，构建一体化智能管理体系，提升统筹效率。",
  },
];

const dashboards = [
  {
    title: "考点级实时管控看板",
    desc: "在各考点考务办公室部署信息与视频看板，实时汇聚全考场监控画面、异常预警记录、考生入场核验、缺考统计及设备运行状态等核心数据，构建全景式数字化考场监管中枢。",
    reverse: false,
    img: "/assets/images/antiCheating/box3-img6.png",
    imgW: 540,
    imgH: 306,
    points: [
      {
        icon: "/assets/images/antiCheating/box3-icon4.png",
        title: "全域态势 一站式掌握",
        desc: "打破信息壁垒，考务人员可实时掌握本考点所有考场动态，整合监控、预警、人员等多维数据，实现高效统筹与全局掌控。",
      },
      {
        icon: "/assets/images/antiCheating/box3-icon5.png",
        title: "智能预警 精准把控",
        desc: "实时同步考试进度与考场状态，智能识别并预警异常情况，帮助管理人员快速响应处置，确保考试流程规范、平稳有序。",
      },
    ],
  },
  {
    title: "区域级全域统筹看板",
    desc: "统筹辖区内所有考点的实时考试动态，实现全域考场状态、作弊预警、异常事件、考生到场情况的集中可视化监管，支持上级主管部门统一指挥、宏观调度与资源协调。",
    reverse: true,
    img: "/assets/images/antiCheating/box3-img7.png",
    imgW: 540,
    imgH: 318,
    points: [
      {
        icon: "/assets/images/antiCheating/box3-icon6.png",
        title: "全域统筹调度",
        desc: '打破考点间信息孤岛，支持上级主管部门对辖区内所有考点进行统一指挥、宏观调度与资源协调，实现考试管理"一盘棋"。',
      },
      {
        icon: "/assets/images/antiCheating/box3-icon7.png",
        title: "集中可视化监管",
        desc: "汇聚各考点实时数据，通过大屏直观呈现考场秩序、设备状态及异常预警，实现风险隐患早发现、早处置，提升应急响应效率。",
      },
    ],
  },
];

// 全程数据留存溯源追责
const tracePoints = [
  {
    title: "完整数据档案",
    desc: "汇聚全过程记录，形成完整、加密的考试数据档案，确保信息真实、完整、可查。",
  },
  {
    title: "核查溯源",
    desc: "支持事后信息核查与问题溯源，快速定位异常节点，清晰界定相关责任归属。",
  },
  {
    title: "权威追责依据",
    desc: "为考试监管考核、违规行为追责提供合法、权威、完整的数据支撑与事实凭证。",
  },
  {
    title: "夯实管理责任",
    desc: "完善考试管理责任体系，强化责任落实与闭环管理，保障考试流程规范有序。",
  },
];

// 平台价值
const valueCards = [
  {
    icon: "/assets/images/antiCheating/box4-icon1.png",
    title: "考务管理标准化",
    desc: "重构考务管理流程，规避人工操作漏洞，实现从报名、编排到归档的全流程标准化，大幅提升考务效率与准确性。",
  },
  {
    icon: "/assets/images/antiCheating/box4-icon2.png",
    title: "监考防控智能化",
    desc: "利用AI视觉识别技术，精准识别替考、夹带、隔空传题等违规行为，实时预警并留存证据，破解新型作弊监管难点。",
  },
  {
    icon: "/assets/images/antiCheating/box4-icon3.png",
    title: "指挥调度可视化",
    desc: "全域考场状态实时汇聚，可视化大屏直观呈现，实现跨区域、多层级的统一指挥与快速调度，确保突发状况即时响应。",
  },
  {
    icon: "/assets/images/antiCheating/box4-icon4.png",
    title: "数据溯源规范化",
    desc: "建立全链路数据留痕机制，确保考试过程可追溯、可核查，为监管考核、违规追责及效果评估提供权威的数据支撑。",
  },
];

// 部分功能展示
const showcasePairs = [
  [
    { src: "/assets/images/antiCheating/box4-img10.png", w: 500, h: 242 },
    { src: "/assets/images/antiCheating/box4-img11.png", w: 656, h: 244 },
  ],
  [
    { src: "/assets/images/antiCheating/box4-img12.png", w: 573, h: 284 },
    { src: "/assets/images/antiCheating/box4-img13.png", w: 571, h: 278 },
  ],
  [
    { src: "/assets/images/antiCheating/box4-img14.png", w: 577, h: 234 },
    { src: "/assets/images/antiCheating/box4-img15.png", w: 575, h: 251 },
  ],
];

// ===== 移动端（acm- 前缀）独立逻辑：纯新增，不改动 web 端任何逻辑 =====
// 复用上方已导入的 ref/onMounted 及 navTabs 数据，不新增 import
const acmSection = ref<HTMLElement>();
const acmActiveNav = ref("overview");

const acmHandleScroll = () => {
  const sections = navTabs.map((t) =>
    document.getElementById(`acm-${t.target}`),
  );
  const scrollY = window.scrollY + 140;
  for (let i = sections.length - 1; i >= 0; i--) {
    const sec = sections[i];
    const tab = navTabs[i];
    if (sec && tab && sec.offsetTop <= scrollY) {
      acmActiveNav.value = tab.target;
      break;
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", acmHandleScroll, { passive: true });
  if (acmSection.value) {
    const acmObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("acm-visible");
            acmObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    acmSection.value.querySelectorAll(".acm-animate").forEach((el) => {
      acmObserver.observe(el as HTMLElement);
    });
  }
});
</script>

<template>
  <div ref="acSection" class="ac-page">
    <!-- ========== Banner ========== -->
    <section class="ac-banner">
      <div class="ac-banner-box">
        <div class="ac-banner-bg">
          <img
            src="/assets/images/antiCheating/banner-bg.png"
            alt=""
            class="ac-banner-bg-img"
          />
        </div>
        <div class="ac-banner-content">
          <div class="ac-banner-badge">
            AI智能监测 · 全流程闭环管理 · 数据安全合规
          </div>
          <div class="ac-banner-brand">中测高科</div>
          <h1 class="ac-banner-title">AI考务安全智能体</h1>
          <p class="ac-banner-desc">
            面向标准化考试场景的智能化全流程考务管控系统，融合人工智能与视频分析技术，实现从考务组织到结果溯源的全链路闭环管理，重塑考试监管新模式。
          </p>
          <div class="ac-banner-actions">
            <NuxtLink class="ac-btn ac-btn-primary" :to="contactRoute"
              >预约咨询
              <img src="/assets/images/antiCheating/btn-l.png" alt="" />
            </NuxtLink>
            <a
              class="ac-btn ac-btn-outline"
              :href="materialUrl"
              target="_blank"
              rel="noopener"
              >资料下载
              <img src="/assets/images/antiCheating/btn-r.png" alt="" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 导航标签 ========== -->
    <nav class="ac-nav-bar">
      <div class="container-ac ac-nav-inner">
        <a
          v-for="tab in navTabs"
          :key="tab.target"
          class="ac-nav-tab"
          :class="{ 'ac-nav-tab-active': activeNav === tab.target }"
          @click.prevent="scrollToSection(tab.target)"
          href="javascript:void(0)"
        >
          {{ tab.label }}
        </a>
      </div>
    </nav>

    <!-- ========== 产品概述区 ========== -->
    <section id="ac-overview" class="ac-overview-section">
      <div class="ac-overview-bg">
        <img src="/assets/images/antiCheating/bg1.png" alt="" />
      </div>
      <div class="container-ac">
        <div class="ac-section-header ac-animate">
          <h2>智能化全流程考务管控系统</h2>
          <p class="ac-section-subtitle">
            中测高科AI考务智能体是面向各类标准化考试场景打造的智能化、全流程考务管控系统，通过前沿技术赋能，实现从考务组织到结果溯源的全链路闭环管理，重塑考试监管新模式。
          </p>
        </div>
        <div class="ac-overview-cards ac-animate">
          <div
            v-for="(card, idx) in overviewCards"
            :key="idx"
            class="ac-overview-card"
          >
            <img :src="card.icon" alt="" />
            <h3>{{ card.title }}</h3>
            <p>{{ card.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 核心功能 - 多维度AI智能防作弊 ========== -->
    <section id="ac-feature" class="ac-feature-section">
      <div class="container-ac">
        <div class="ac-section-header ac-animate">
          <!-- <span class="ac-section-label">核心功能</span> -->
          <h2>多维度AI智能防作弊</h2>
          <p class="ac-section-subtitle">
            构建全方位、无死角的智能风控体系，为线下考试与公平竞赛筑牢坚实的数字安全防线。
          </p>
        </div>
        <div class="ac-feat-box ac-animate">
          <div class="ac-feat-box-item">
            <div class="ac-feat-box-item-header">
              <img src="/assets/images/antiCheating/box2-icon1.png" alt="" />
              <h3>实时动态监测</h3>
            </div>
            <div class="ac-feat-box-item-desc comm-indent">
              基于毫秒级数据采集技术，各个考场进行无死角监控，全面分析异常行为和作弊行为。全面分析
              无线电信号特征，全面分析红外热成像异常情
              况，全面排查高科技作弊设备。
            </div>
          </div>
          <div class="ac-feat-box-item">
            <div class="ac-feat-box-item-header">
              <img src="/assets/images/antiCheating/box2-icon2.png" alt="" />
              <h3>行为特征建模</h3>
            </div>
            <div class="ac-feat-box-item-desc comm-indent">
              构建各类行为和信号特征，通过深度学习算法分析考生行为、无线信号特征，热成像异常情况等
              进行建模分析，精准识别潜在风险。
            </div>
          </div>
          <div class="ac-feat-box-item">
            <div class="ac-feat-box-item-header">
              <img src="/assets/images/antiCheating/box2-icon3.png" alt="" />
              <h3>智能风险阻断</h3>
            </div>
            <div class="ac-feat-box-item-desc comm-indent">
              实时评估风险等级，自动触发分级预警机制，对高危作弊行为进行即时拦截与阻断或报警，保障
              考场环境绝对安全。
            </div>
          </div>
        </div>
        <div
          v-for="(block, bIdx) in antiCheatBlocks"
          :key="bIdx"
          class="ac-feat-block ac-animate"
        >
          <div
            class="ac-feat-body"
            :class="{ 'ac-feat-body-reverse': block.reverse }"
          >
            <div class="ac-feat-left">
              <div class="ac-feat-head">
                <!-- <img :src="block.headIcon" alt="" /> -->
                <h3>{{ block.title }}</h3>
              </div>
              <p class="ac-feat-intro">{{ block.intro }}</p>
              <div
                v-for="(item, iIdx) in block.items"
                :key="iIdx"
                class="ac-feat-item"
              >
                <img :src="item.icon" alt="" />
                <div>
                  <strong>{{ item.title }}</strong>
                  <span>{{ item.desc }}</span>
                </div>
              </div>
            </div>
            <div class="ac-feat-right">
              <img
                :src="block.img"
                alt=""
                class="ac-feat-img"
                :style="{
                  width: block.imgW + 'px',
                  height: block.imgH + 'px',
                  marginTop: block.imgMt + 'px',
                }"
              />
              <p
                v-if="block.quote1"
                class="ac-feat-quote1"
                :style="bIdx === 2 ? 'margin-bottom: 0' : ''"
              >
                {{ block.quote1 }}
              </p>
              <p v-if="block.quote" class="ac-feat-quote comm-indent">
                {{ block.quote }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 核心功能 - 全流程考务智能化管控 ========== -->
    <section class="ac-control-section">
      <div class="container-ac">
        <div class="ac-section-header ac-animate">
          <h2>全流程考务智能化管控</h2>
          <p class="ac-section-subtitle">
            覆盖从考生入场到异常处置的每一个关键环节，以技术保障考试全流程的安全与规范。
          </p>
        </div>
        <div class="ac-tab-bar ac-animate">
          <div
            v-for="(tab, idx) in controlTabs"
            :key="idx"
            class="ac-tab-item"
            :class="{ 'ac-tab-item-active': activeTab === idx }"
            @click="activeTab = idx"
          >
            {{ tab.name }}
          </div>
        </div>
        <div :key="activeTab" class="ac-tab-content">
          <div class="ac-tab-left">
            <h3>{{ activeControlTab.sub }}</h3>
            <p v-if="activeControlTab.desc" class="ac-tab-desc">
              {{ activeControlTab.desc }}
            </p>
            <div
              v-for="(point, pIdx) in activeControlTab.points"
              :key="pIdx"
              class="ac-tab-point"
            >
              <!-- <div class="ac-tab-point-num">{{ pIdx + 1 }}</div> -->
              <div class="ac-tab-point-text">
                <div class="ac-tab-point-title">{{ point.title }}</div>
                <div class="ac-tab-point-desc">{{ point.desc }}</div>
              </div>
            </div>
          </div>
          <img
            :src="activeControlTab.img"
            alt=""
            class="ac-tab-img"
            :style="{
              width: activeControlTab.imgW + 'px',
              height: activeControlTab.imgH + 'px',
            }"
          />
        </div>
      </div>
    </section>

    <!-- ========== 数据管控区 ========== -->
    <section id="ac-data" class="ac-data-section">
      <div class="ac-data-bg">
        <img src="/assets/images/antiCheating/bg2.png" alt="" />
      </div>
      <div class="container-ac">
        <div class="ac-section-header ac-animate">
          <!-- <span class="ac-section-label ac-section-label-white">数据管控</span> -->
          <h2>全域数据可视化管控</h2>
          <p class="ac-section-subtitle ac-section-subtitle-white">
            实时采集考场动态数据，毫秒级同步，全链路可视化呈现，构建一体化智能管理体系。
          </p>
        </div>
        <div class="ac-data-features ac-animate">
          <div
            v-for="(feat, idx) in dataFeatures"
            :key="idx"
            class="ac-data-feature"
          >
            <div class="ac-data-feature-header">
              <div>{{ feat.title }}</div>
              <img :src="feat.icon" alt="" />
            </div>
            <div class="ac-data-feature-desc comm-indent">
              {{ feat.desc }}
            </div>
          </div>
        </div>
        <div
          v-for="(board, bIdx) in dashboards"
          :key="bIdx"
          class="ac-dash-block ac-animate"
          :class="{ 'ac-dash-block-reverse': board.reverse }"
        >
          <div class="ac-dash-info">
            <h3>{{ board.title }}</h3>
            <p class="ac-dash-desc">{{ board.desc }}</p>
            <div
              v-for="(point, pIdx) in board.points"
              :key="pIdx"
              class="ac-dash-point"
            >
              <img :src="point.icon" alt="" />
              <div>
                <div class="ac-dash-point-title">{{ point.title }}</div>
                <div class="ac-dash-point-desc comm-indent">
                  {{ point.desc }}
                </div>
              </div>
            </div>
          </div>
          <img
            :src="board.img"
            alt=""
            class="ac-dash-img"
            :style="{ width: board.imgW + 'px', height: board.imgH + 'px' }"
          />
        </div>
      </div>
    </section>

    <!-- ========== 全程数据留存溯源追责 ========== -->
    <section class="ac-trace-section">
      <div class="container-ac">
        <div class="ac-trace-section-title ac-animate">
          全程数据留存溯源追责
        </div>
        <div class="ac-trace-section-desc ac-animate">
          对考试全过程视频、操作记录、异常数据及处置记录进行实时存储与加密备份，构建不可篡改的数字档案。
        </div>
        <div class="ac-trace-block ac-animate">
          <div class="ac-trace-left">
            <div class="ac-trace-grid">
              <div
                v-for="(point, idx) in tracePoints"
                :key="idx"
                class="ac-trace-card"
              >
                <h4>{{ point.title }}</h4>
                <p>{{ point.desc }}</p>
              </div>
            </div>
          </div>
          <img
            src="/assets/images/antiCheating/box3-img8.png"
            alt=""
            class="ac-trace-img"
          />
        </div>
      </div>
    </section>

    <!-- ========== 平台价值总结区 ========== -->
    <section id="ac-value" class="ac-value-section">
      <div class="container-ac">
        <div class="ac-section-header ac-animate">
          <h2>平台价值总结</h2>
          <p class="ac-section-subtitle">
            以AI技术为核心驱动力，打通考前、考中、考后全流程管控壁垒，构建智能化、标准化的现代化考试管理体系。
          </p>
        </div>
        <div class="ac-value-grid ac-animate">
          <div
            v-for="(card, idx) in valueCards"
            :key="idx"
            class="ac-value-card"
          >
            <img :src="card.icon" alt="" />
            <h3>{{ card.title }}</h3>
            <p>{{ card.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 部分功能展示 ========== -->
    <section class="ac-showcase-section">
      <div class="container-ac">
        <div class="ac-section-header ac-animate">
          <h2>部分功能展示</h2>
        </div>
        <div class="ac-showcase-grid ac-animate">
          <img
            v-for="n in 9"
            :key="n"
            :src="`/assets/images/antiCheating/box4-img${n}.png`"
            alt=""
            class="ac-showcase-img"
          />
        </div>
        <div
          v-for="(row, rIdx) in showcasePairs"
          :key="rIdx"
          class="ac-showcase-row ac-animate"
        >
          <img
            v-for="(img, iIdx) in row"
            :key="iIdx"
            :src="img.src"
            alt=""
            :style="{ width: img.w + 'px', height: img.h + 'px' }"
          />
        </div>
      </div>
    </section>

    <!-- ========== 底部CTA区 ========== -->
    <section class="ac-cta-section">
      <div class="container-ac">
        <div class="ac-cta-content ac-animate">
          <h2>科技赋能考务 共筑公平防线</h2>
          <p>
            全方位提升考试管理的智能化与规范化水平，为各类考试的公平公正、安全有序开展提供坚实可靠的技术保障。
          </p>
          <NuxtLink class="ac-btn ac-btn-primary1" :to="contactRoute"
            >预约产品演示
            <img src="/assets/images/antiCheating/btn-b.png" alt="" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>

  <!-- ========== 移动端（acm- 前缀）：纯新增兄弟根，web 端零改动 ========== -->
  <div ref="acmSection" class="acm-page">
    <!-- Banner -->
    <section class="acm-banner">
      <div class="acm-banner-bg">
        <img src="/assets/images/antiCheating/banner-bg.png" alt="" />
      </div>
      <div class="acm-banner-content">
        <div class="acm-banner-badge">
          AI智能监测 · 全流程闭环管理 · 数据安全合规
        </div>
        <div class="acm-banner-brand">中测高科</div>
        <h1 class="acm-banner-title">AI考务安全智能体</h1>
        <p class="acm-banner-desc">
          面向标准化考试场景的智能化全流程考务管控系统，融合人工智能与视频分析技术，实现从考务组织到结果溯源的全链路闭环管理，重塑考试监管新模式。
        </p>
        <div class="acm-banner-actions">
          <NuxtLink class="acm-btn acm-btn-primary" :to="contactRoute"
            >预约咨询
            <img src="/assets/images/antiCheating/btn-l.png" alt="" />
          </NuxtLink>
          <a
            class="acm-btn acm-btn-outline"
            :href="materialUrl"
            target="_blank"
            rel="noopener"
            >资料下载
            <img src="/assets/images/antiCheating/btn-r.png" alt="" />
          </a>
        </div>
      </div>
    </section>

    <!-- 导航栏 -->
    <nav class="acm-nav-bar">
      <div class="acm-nav-scroll">
        <a
          v-for="tab in navTabs"
          :key="tab.target"
          class="acm-nav-tab"
          :class="{ 'acm-nav-tab-active': acmActiveNav === tab.target }"
          :href="`#acm-${tab.target}`"
        >
          {{ tab.label }}
        </a>
      </div>
    </nav>

    <!-- 产品概述 -->
    <section id="acm-overview" class="acm-section acm-overview-section">
      <div class="acm-overview-bg">
        <img src="/assets/images/antiCheating/bg1.png" alt="" />
      </div>
      <div class="acm-container">
        <div class="acm-section-header acm-animate">
          <h2>智能化全流程考务管控系统</h2>
          <p class="acm-section-subtitle">
            中测高科AI考务智能体是面向各类标准化考试场景打造的智能化、全流程考务管控系统，通过前沿技术赋能，实现从考务组织到结果溯源的全链路闭环管理，重塑考试监管新模式。
          </p>
        </div>
        <div class="acm-overview-cards">
          <div
            v-for="(card, idx) in overviewCards"
            :key="idx"
            class="acm-overview-card acm-animate"
          >
            <img :src="card.icon" alt="" />
            <h3>{{ card.title }}</h3>
            <p>{{ card.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心功能 - 多维度AI智能防作弊 -->
    <section id="acm-feature" class="acm-section acm-feature-section">
      <div class="acm-container">
        <div class="acm-section-header acm-animate">
          <h2>多维度AI智能防作弊</h2>
          <p class="acm-section-subtitle">
            构建全方位、无死角的智能风控体系，为线下考试与公平竞赛筑牢坚实的数字安全防线。
          </p>
        </div>
        <div class="acm-feat-box">
          <div class="acm-feat-box-item acm-animate">
            <div class="acm-feat-box-item-header">
              <img src="/assets/images/antiCheating/box2-icon1.png" alt="" />
              <h3>实时动态监测</h3>
            </div>
            <div class="acm-feat-box-item-desc">
              基于毫秒级数据采集技术，各个考场进行无死角监控，全面分析异常行为和作弊行为。全面分析无线电信号特征，全面分析红外热成像异常情况，全面排查高科技作弊设备。
            </div>
          </div>
          <div class="acm-feat-box-item acm-animate">
            <div class="acm-feat-box-item-header">
              <img src="/assets/images/antiCheating/box2-icon2.png" alt="" />
              <h3>行为特征建模</h3>
            </div>
            <div class="acm-feat-box-item-desc">
              构建各类行为和信号特征，通过深度学习算法分析考生行为、无线信号特征，热成像异常情况进行建模分析，精准识别潜在风险。
            </div>
          </div>
          <div class="acm-feat-box-item acm-animate">
            <div class="acm-feat-box-item-header">
              <img src="/assets/images/antiCheating/box2-icon3.png" alt="" />
              <h3>智能风险阻断</h3>
            </div>
            <div class="acm-feat-box-item-desc">
              实时评估风险等级，自动触发分级预警机制，对高危作弊行为进行即时拦截与阻断或报警，保障考场环境绝对安全。
            </div>
          </div>
        </div>
        <div
          v-for="(block, bIdx) in antiCheatBlocks"
          :key="bIdx"
          class="acm-feat-block acm-animate"
        >
          <div class="acm-feat-head">
            <h3>{{ block.title }}</h3>
          </div>
          <p class="acm-feat-intro">{{ block.intro }}</p>
          <div class="acm-feat-img-wrap">
            <img :src="block.img" alt="" class="acm-feat-img" />
          </div>
          <p v-if="block.quote1" class="acm-feat-quote1">{{ block.quote1 }}</p>
          <p v-if="block.quote" class="acm-feat-quote">{{ block.quote }}</p>
          <div
            v-for="(item, iIdx) in block.items"
            :key="iIdx"
            class="acm-feat-item"
          >
            <img :src="item.icon" alt="" />
            <div>
              <strong>{{ item.title }}</strong>
              <span>{{ item.desc }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心功能 - 全流程考务智能化管控（5 tab 切换，复用共享 activeTab） -->
    <section class="acm-section acm-control-section">
      <div class="acm-container">
        <div class="acm-section-header acm-animate">
          <h2>全流程考务智能化管控</h2>
          <p class="acm-section-subtitle">
            覆盖从考生入场到异常处置的每一个关键环节，以技术保障考试全流程的安全与规范。
          </p>
        </div>
        <div class="acm-tab-bar acm-animate">
          <div class="acm-tab-scroll">
            <div
              v-for="(tab, idx) in controlTabs"
              :key="idx"
              class="acm-tab-item"
              :class="{ 'acm-tab-item-active': activeTab === idx }"
              @click="activeTab = idx"
            >
              {{ tab.name }}
            </div>
          </div>
        </div>
        <div :key="activeTab" class="acm-tab-content">
          <div class="acm-tab-left">
            <h3>{{ activeControlTab.sub }}</h3>
            <p v-if="activeControlTab.desc" class="acm-tab-desc">
              {{ activeControlTab.desc }}
            </p>
            <div
              v-for="(point, pIdx) in activeControlTab.points"
              :key="pIdx"
              class="acm-tab-point"
            >
              <div class="acm-tab-point-text">
                <div class="acm-tab-point-title">{{ point.title }}</div>
                <div class="acm-tab-point-desc">{{ point.desc }}</div>
              </div>
            </div>
          </div>
          <img :src="activeControlTab.img" alt="" class="acm-tab-img" />
        </div>
      </div>
    </section>

    <!-- 数据管控区 -->
    <section id="acm-data" class="acm-section acm-data-section">
      <div class="acm-data-bg">
        <img src="/assets/images/antiCheating/bg2.png" alt="" />
      </div>
      <div class="acm-container">
        <div class="acm-section-header acm-animate">
          <h2>全域数据可视化管控</h2>
          <p class="acm-section-subtitle acm-section-subtitle-white">
            实时采集考场动态数据，毫秒级同步，全链路可视化呈现，构建一体化智能管理体系。
          </p>
        </div>
        <div class="acm-data-features">
          <div
            v-for="(feat, idx) in dataFeatures"
            :key="idx"
            class="acm-data-feature acm-animate"
          >
            <div class="acm-data-feature-header">
              <div>{{ feat.title }}</div>
              <img :src="feat.icon" alt="" />
            </div>
            <div class="acm-data-feature-desc">{{ feat.desc }}</div>
          </div>
        </div>
        <div
          v-for="(board, bIdx) in dashboards"
          :key="bIdx"
          class="acm-dash-block acm-animate"
        >
          <div class="acm-dash-info">
            <h3>{{ board.title }}</h3>
            <p class="acm-dash-desc">{{ board.desc }}</p>
            <div
              v-for="(point, pIdx) in board.points"
              :key="pIdx"
              class="acm-dash-point"
            >
              <img :src="point.icon" alt="" />
              <div>
                <div class="acm-dash-point-title">{{ point.title }}</div>
                <div class="acm-dash-point-desc">{{ point.desc }}</div>
              </div>
            </div>
          </div>
          <img :src="board.img" alt="" class="acm-dash-img" />
        </div>
      </div>
    </section>

    <!-- 全程数据留存溯源追责 -->
    <section class="acm-section acm-trace-section">
      <div class="acm-container">
        <div class="acm-trace-title acm-animate">全程数据留存溯源追责</div>
        <div class="acm-trace-desc acm-animate">
          对考试全过程视频、操作记录、异常数据及处置记录进行实时存储与加密备份，构建不可篡改的数字档案。
        </div>
        <div class="acm-trace-grid">
          <div
            v-for="(point, idx) in tracePoints"
            :key="idx"
            class="acm-trace-card acm-animate"
          >
            <h4>{{ point.title }}</h4>
            <p>{{ point.desc }}</p>
          </div>
        </div>
        <img
          src="/assets/images/antiCheating/box3-img8.png"
          alt=""
          class="acm-trace-img acm-animate"
        />
      </div>
    </section>

    <!-- 平台价值总结区 -->
    <section id="acm-value" class="acm-section acm-value-section">
      <div class="acm-container">
        <div class="acm-section-header acm-animate">
          <h2>平台价值总结</h2>
          <p class="acm-section-subtitle">
            以AI技术为核心驱动力，打通考前、考中、考后全流程管控壁垒，构建智能化、标准化的现代化考试管理体系。
          </p>
        </div>
        <div class="acm-value-grid">
          <div
            v-for="(card, idx) in valueCards"
            :key="idx"
            class="acm-value-card acm-animate"
          >
            <img :src="card.icon" alt="" />
            <h3>{{ card.title }}</h3>
            <p>{{ card.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 部分功能展示（9 图横滑相册 + 3 对图单列堆叠） -->
    <section class="acm-section acm-showcase-section">
      <div class="acm-container">
        <div class="acm-section-header acm-animate">
          <h2>部分功能展示</h2>
        </div>
      </div>
      <div class="acm-showcase-scroll acm-animate">
        <img
          v-for="n in 9"
          :key="n"
          :src="`/assets/images/antiCheating/box4-img${n}.png`"
          alt=""
          class="acm-showcase-img"
        />
      </div>
      <div class="acm-container">
        <div class="acm-showcase-pairs acm-animate">
          <template v-for="(row, rIdx) in showcasePairs" :key="rIdx">
            <img
              v-for="(img, iIdx) in row"
              :key="iIdx"
              :src="img.src"
              alt=""
              class="acm-showcase-pair-img"
            />
          </template>
        </div>
      </div>
    </section>

    <!-- 底部CTA区 -->
    <section class="acm-cta-section">
      <div class="acm-container">
        <div class="acm-cta-content acm-animate">
          <h2>科技赋能考务 共筑公平防线</h2>
          <p>
            全方位提升考试管理的智能化与规范化水平，为各类考试的公平公正、安全有序开展提供坚实可靠的技术保障。
          </p>
          <NuxtLink class="acm-btn acm-btn-primary1" :to="contactRoute"
            >预约产品演示
            <img src="/assets/images/antiCheating/btn-b.png" alt="" />
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
.ac-page {
  --ac-blue: #0f62fe;
  --ac-blue-dark: #0043ce;
  --ac-ink: #1a1a2e;
  font-family:
    Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui,
    sans-serif;
  color: var(--ac-ink);
}

.container-ac {
  width: min(1200px, calc(100% - 40px));
  margin: 0 auto;
}

/* ===== 滚动动画 ===== */
.ac-animate {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}

.ac-animate.ac-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===== 通用 Section Header ===== */
.ac-section-header {
  text-align: center;
  margin-bottom: 44px;
}

.ac-section-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #0f62fe;
  font-weight: 500;
  margin-bottom: 12px;
}

.ac-section-label::before {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  background: var(--ac-blue);
  border-radius: 50%;
}

.ac-section-label-white {
  color: #fff;
}

.ac-section-label-white::before {
  background: #fff;
}

.ac-section-header h2 {
  font-weight: 600;
  font-size: 33px;
  color: #0f172a;
  line-height: 45px;
  margin: 0 0 16px;
}

.ac-section-subtitle {
  font-weight: 400;
  font-size: 18px;
  color: #475569;
  line-height: 33px;
  max-width: 930px;
  margin: 0 auto;
}

.ac-section-subtitle-white {
  color: rgba(255, 255, 255, 0.7);
}

/* ===== Banner ===== */
.ac-banner {
  width: 100%;
  height: 570px;
  background: #f8f8f8;
  overflow: hidden;
}

.ac-banner-box {
  position: relative;
  width: 1440px;
  margin: 0 auto;
  height: 100%;
}

.ac-banner-bg {
  position: absolute;
  top: -70px;
  left: 0;
  width: 1440px;
  height: 640px;
  pointer-events: none;
}

.ac-banner-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ac-banner-content {
  position: absolute;
  z-index: 2;
  top: 76px;
  left: 137px;
  max-width: 560px;
}

.ac-banner-badge {
  display: inline-block;
  padding: 8px 17px 8px 26px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 100px;
  border: 1px solid rgba(37, 99, 235, 0.2);
  font-size: 12px;
  color: #1a5fff;
  font-weight: 500;
  margin-bottom: 20px;
  position: relative;
}

.ac-banner-badge::before {
  content: "";
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2563eb;
}

.ac-banner-brand {
  font-weight: 600;
  font-size: 67px;
  color: #0f172a;
  line-height: 80px;
  margin-bottom: 12px;
}

.ac-banner-title {
  font-weight: 600;
  font-size: 67px;
  color: #005aff;
  line-height: 80px;
  margin: 0 0 11px;
}

.ac-banner-desc {
  font-weight: 400;
  font-size: 20px;
  color: #475569;
  line-height: 32px;
  margin: 0 0 20px;
  max-width: 480px;
}

.ac-banner-actions {
  display: flex;
  align-items: center;
  gap: 36px;
}

.ac-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px 32px;
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

.ac-btn img {
  width: 16px;
  height: 16px;
}

.ac-btn-primary {
  background: var(--ac-blue);
  color: #fff;
}

.ac-btn-primary:hover {
  background: var(--ac-blue-dark);
  box-shadow: 0 6px 20px rgba(15, 98, 254, 0.4);
  transform: translateY(-2px);
}

.ac-btn-primary1 {
  background: #fff;
  color: #0f62fe;
}

.ac-btn-primary1:hover {
  box-shadow: 0 6px 20px rgba(15, 98, 254, 0.4);
  transform: translateY(-2px);
}

.ac-btn-outline {
  background: rgba(255, 255, 255, 0.6);
  color: var(--ac-blue);
  border: 1px solid var(--ac-blue);
}

.ac-btn-outline:hover {
  background: var(--ac-blue);
  color: #fff;
}

/* ===== 导航标签 ===== */
.ac-nav-bar {
  width: 100%;
  height: 56px;
  background: #f8f8f8;
  position: sticky;
  top: 76px;
  z-index: 15;
}

.ac-nav-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  height: 100%;
}

.ac-nav-tab {
  font-size: 16px;
  font-weight: 400;
  color: #161616;
  text-decoration: none;
  padding: 16px 0;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
}

.ac-nav-tab:hover {
  color: var(--ac-blue);
}

.ac-nav-tab-active {
  color: var(--ac-blue);
  border-bottom-color: var(--ac-blue);
}

/* ===== 产品概述区 ===== */
.ac-overview-section {
  position: relative;
  width: 100%;
  height: 612px;
  padding: 90px 0 77px;
  background: #fff;
  overflow: hidden;
}

.ac-overview-bg {
  position: absolute;
  top: -37px;
  left: 50%;
  transform: translateX(-50%);
  width: 1440px;
  height: 649px;
  pointer-events: none;
}

.ac-overview-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ac-overview-section .container-ac {
  position: relative;
  z-index: 2;
}

.ac-overview-section .ac-section-header {
  margin-bottom: 40px;
}

.ac-overview-cards {
  display: flex;
  gap: 25px;
}

.ac-overview-card {
  flex: 1;
  padding: 16px 25px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e9f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.ac-overview-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(15, 98, 254, 0.1);
  border-color: var(--ac-blue);
}

.ac-overview-card img {
  width: 86px;
  height: 86px;
  margin: 0 auto 12px;
  display: block;
}

.ac-overview-card h3 {
  font-weight: 500;
  font-size: 20px;
  color: #0f172a;
  margin: 0 0 11px;
  text-align: center;
}

.ac-overview-card p {
  font-weight: 400;
  font-size: 14px;
  color: #475569;
  line-height: 23px;
  text-align: center;
  margin: 0;
}

/* ===== 核心功能 - 多维度AI智能防作弊 ===== */
.ac-feature-section {
  padding: 68px 0 98px;
  background: #fff;
}

.ac-feat-box {
  display: flex;
  justify-content: space-between;
  gap: 25px;
  margin-bottom: 63px;
}

.ac-feat-box-item {
  flex: 1;
  padding: 30px 28px 18px;
  background: #ffffff;
  border-radius: 12px 12px 12px 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.ac-feat-box-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(15, 98, 254, 0.1);
  border-color: var(--ac-blue);
}

.ac-feat-box-item-header {
  display: flex;
  gap: 11px;
  align-items: center;
  font-weight: 500;
  font-size: 20px;
  color: #0f172a;
  margin-bottom: 19px;
}

.ac-feat-box-item-header img {
  width: 28px;
  height: 28px;
}

.ac-feat-box-item-header h3 {
  margin: 0;
}

.ac-feat-box-item-desc {
  font-weight: 400;
  font-size: 14px;
  color: #475569;
  line-height: 24px;
}

.ac-feat-block {
  margin-bottom: 101px;
}

.ac-feat-block:last-child {
  margin-bottom: 0;
}

.ac-feat-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.ac-feat-head img {
  width: 28px;
  height: 28px;
}

.ac-feat-head h3 {
  font-weight: 600;
  font-size: 24px;
  color: #1a1a2e;
  margin: 0;
}

.ac-feat-body {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  align-items: flex-start;
}

.ac-feat-body-reverse {
  flex-direction: row-reverse;
}

.ac-feat-left {
  flex: 1;
  max-width: 580px;
}

.ac-feat-intro {
  font-weight: 400;
  font-size: 16px;
  color: #475569;
  line-height: 27px;
  margin: 0 0 49px;
}

.ac-feat-item {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
  padding: 21px 30px 25px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px 12px 12px 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.ac-feat-item:last-child {
  margin-bottom: 0;
}

.ac-feat-item img {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
}

.ac-feat-item strong {
  display: block;
  font-weight: 600;
  font-size: 16px;
  color: #0f172a;
  line-height: 26px;
  margin-bottom: 6px;
}

.ac-feat-item span {
  font-weight: 400;
  font-size: 14px;
  color: #475569;
  line-height: 23px;
}

.ac-feat-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.ac-feat-quote1 {
  font-weight: 500;
  font-size: 16px;
  color: #0f62fe;
  line-height: 25px;
  margin: 30px auto 67px;
}

.ac-feat-quote {
  font-weight: 400;
  font-size: 14px;
  color: #475569;
  line-height: 25px;
  /* font-style: italic; */
  margin: 0;
  max-width: 536px;
}

/* ===== 核心功能 - 全流程考务智能化管控 ===== */
.ac-control-section {
  padding: 63px 0 48px;
  background: #f7faff;
}

.ac-tab-bar {
  display: flex;
  justify-content: space-between;
  gap: 9px;
  margin-bottom: 32px;
  padding: 5px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px 12px 12px 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.ac-tab-item {
  width: 225px;
  height: 44px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 14px;
  color: #475569;
  line-height: 44px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.ac-tab-item:hover {
  color: #fff;
  background: #0f62fe;
}

.ac-tab-item-active {
  color: #fff;
  background: #0f62fe;
}

.ac-tab-content {
  display: flex;
  justify-content: space-between;
  gap: 81px;
  align-items: flex-end;
  animation: ac-fade 0.4s ease;
}

@keyframes ac-fade {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ac-tab-left {
  flex: 1;
  max-width: 564px;
}

.ac-tab-left h3 {
  font-weight: 600;
  font-size: 18px;
  color: #0f172a;
  line-height: 30px;
  margin: 0 0 17px;
}

.ac-tab-desc {
  font-weight: 400;
  font-size: 14px;
  color: #475569;
  line-height: 24px;
  margin: 0 0 24px;
}

.ac-tab-point {
  display: flex;
  gap: 12px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 6px 6px 6px 6px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 15px 23px 20px;
  margin-bottom: 14px;
}

.ac-tab-point:last-child {
  margin-bottom: 0;
}

.ac-tab-point-num {
  width: 24px;
  height: 24px;
  background: #e3edff;
  border-radius: 50%;
  font-weight: 600;
  font-size: 12px;
  color: var(--ac-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.ac-tab-point-text .ac-tab-point-title {
  font-weight: 600;
  font-size: 16px;
  color: #0f172a;
  line-height: 23px;
  margin-bottom: 8px;
}

.ac-tab-point-text .ac-tab-point-desc {
  font-weight: 400;
  font-size: 14px;
  color: #475569;
  line-height: 15px;
}

.ac-tab-img {
  flex-shrink: 0;
}

/* ===== 数据管控区 ===== */
.ac-data-section {
  position: relative;
  width: 100%;
  height: 1342px;
  padding: 65px 0 104px;
  background: #0e1032;
  overflow: hidden;
}

.ac-data-bg {
  position: absolute;
  top: 263px;
  left: 50%;
  transform: translateX(-50%);
  width: 1440px;
  height: 810px;
  pointer-events: none;
  z-index: 1;
}

.ac-data-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ac-data-section .container-ac {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
}

.ac-data-section .ac-section-header {
  margin-bottom: 49px;
}

.ac-data-section .ac-section-header h2 {
  color: #fff;
}

.ac-data-features {
  display: flex;
  gap: 22px;
  margin-bottom: 66px;
}

.ac-data-feature {
  flex: 1;
  padding: 18px 24px 27px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px 12px 12px 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.ac-data-feature:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(255, 255, 255, 0.28);
}

.ac-data-feature-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: 20px;
  color: #ffffff;
  margin: 0 0 31px;
}

.ac-data-feature img {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.ac-data-feature-desc {
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  line-height: 24px;
}

.ac-dash-block {
  display: flex;
  justify-content: space-between;
  gap: 66px;
  align-items: flex-end;
  margin-bottom: 106px;
}

.ac-dash-block:last-child {
  margin-bottom: 0;
}

.ac-dash-block-reverse {
  flex-direction: row-reverse;
}

.ac-dash-info {
  flex: 1;
}

.ac-dash-info h3 {
  font-weight: 600;
  font-size: 20px;
  color: #f1f5f9;
  line-height: 25px;
  margin: 0 0 18px;
}

.ac-dash-desc {
  font-weight: 400;
  font-size: 16px;
  color: #e4e4e4;
  line-height: 23px;
  margin: 0 0 16px;
}

.ac-dash-point {
  display: flex;
  gap: 24px;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 14px 14px 14px 14px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 16px 27px 16px 24px;
  margin-bottom: 16px;
}

.ac-dash-point:last-child {
  margin-bottom: 0;
}

.ac-dash-point img {
  width: 44px;
  height: 45px;
  flex-shrink: 0;
}

.ac-dash-point .ac-dash-point-title {
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  line-height: 23px;
  margin-bottom: 8px;
}

.ac-dash-point .ac-dash-point-desc {
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.ac-dash-img {
  flex-shrink: 0;
  border-radius: 8px;
}

/* ===== 全程数据留存溯源追责 ===== */
.ac-trace-section {
  padding: 106px 0 103px;
  background: #fff;
}

.ac-trace-section-title {
  font-weight: 600;
  font-size: 33px;
  color: #0f172a;
  line-height: 45px;
}

.ac-trace-section-desc {
  font-weight: 400;
  font-size: 16px;
  color: #475569;
  line-height: 27px;
  margin: 0 0 37px;
  max-width: 637px;
}

.ac-trace-block {
  display: flex;
  justify-content: space-between;
  gap: 82px;
}

.ac-trace-left {
  flex: 1;
}

.ac-trace-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 28px;
}

.ac-trace-card {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px 12px 12px 12px;
  border: 2px solid rgba(0, 0, 0, 0.06);
  padding: 25px 39px 9px 30px;
  transition: all 0.3s ease;
}

.ac-trace-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(15, 98, 254, 0.12);
  border-color: var(--ac-blue);
}

.ac-trace-card h4 {
  font-weight: 600;
  font-size: 14px;
  color: #0f172a;
  line-height: 25px;
  margin: 0 0 2px;
}

.ac-trace-card p {
  font-weight: 400;
  font-size: 14px;
  color: #475569;
  line-height: 23px;
  margin: 0;
}

.ac-trace-img {
  width: 564px;
  height: 511px;
  flex-shrink: 0;
}

/* ===== 平台价值总结区 ===== */
.ac-value-section {
  padding: 0 0 91px;
  background: #fff;
}

.ac-value-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

.ac-value-card {
  padding: 32px 24px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e9f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.ac-value-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(15, 98, 254, 0.1);
  border-color: var(--ac-blue);
}

.ac-value-card img {
  width: 82px;
  height: 82px;
  margin: 0 auto 18px;
  display: block;
}

.ac-value-card h3 {
  font-weight: 600;
  font-size: 17px;
  color: #1a1a2e;
  margin: 0 0 10px;
  text-align: center;
}

.ac-value-card p {
  font-weight: 400;
  font-size: 13px;
  color: #666666;
  line-height: 22px;
  margin: 0;
  text-align: center;
}

/* ===== 部分功能展示 ===== */
.ac-showcase-section {
  padding: 61px 0 73px;
  background: #f7faff;
}

.ac-showcase-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 34px 28px;
}

.ac-showcase-img {
  width: 362px;
  height: 235px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.ac-showcase-img:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(15, 98, 254, 0.12);
}

.ac-showcase-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.ac-showcase-row:last-child {
  margin-bottom: 0;
}

.ac-showcase-row img {
  flex-shrink: 0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.ac-showcase-row img:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(15, 98, 254, 0.12);
}

/* ===== 底部CTA区 ===== */
.ac-cta-section {
  width: 100%;
  height: 302px;
  padding: 76px 0 54px;
  background: linear-gradient(106deg, #1a5fff 0%, #0d47a1 100%);
}

.ac-cta-content {
  text-align: center;
  color: #fff;
}

.ac-cta-content h2 {
  font-weight: 600;
  font-size: 34px;
  color: #ffffff;
  line-height: 54px;
  margin: 0 0 12px;
}

.ac-cta-content p {
  font-weight: 400;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 26px;
  margin-bottom: 25px;
}

/* ============================================================ */
/* ===== 移动端（acm- 前缀）样式：纯新增，限定在 .acm-page 作用域 ===== */
/* ============================================================ */

/* 默认隐藏移动根；≤ 1024px 隐藏桌面根、显示移动根（web 端 >1024px 零影响） */
.acm-page {
  display: none;
  --acm-blue: #0f62fe;
  --acm-blue-dark: #0043ce;
  --acm-ink: #1a1a2e;
  font-family:
    Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui,
    sans-serif;
  color: var(--acm-ink);
}

@media (max-width: 1024px) {
  .ac-page {
    display: none !important;
  }

  .acm-page {
    display: block;
  }
}

.acm-container {
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;
}

.acm-section {
  position: relative;
  padding: 44px 0;
  scroll-margin-top: 130px;
}

@media (max-width: 560px) {
  .acm-section {
    scroll-margin-top: 118px;
  }
}

/* 入场动画（移动独立 observer：.acm-animate → .acm-visible） */
.acm-animate {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.acm-animate.acm-visible {
  opacity: 1;
  transform: translateY(0);
}

/* 通用 Section Header */
.acm-section-header {
  text-align: center;
  margin-bottom: 28px;
}

.acm-section-header h2 {
  font-weight: 600;
  font-size: 24px;
  color: #0f172a;
  line-height: 1.35;
  margin: 0 0 12px;
}

.acm-section-subtitle {
  font-weight: 400;
  font-size: 14px;
  color: #475569;
  line-height: 24px;
  margin: 0 auto;
}

.acm-section-subtitle-white {
  color: rgba(255, 255, 255, 0.7);
}

/* ===== 通用按钮 ===== */
.acm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 22px;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  line-height: 1;
  border: none;
}

.acm-btn img {
  width: 16px;
  height: 16px;
}

.acm-btn-primary {
  background: var(--acm-blue);
  color: #fff;
}

.acm-btn-outline {
  background: rgba(255, 255, 255, 0.6);
  color: var(--acm-blue);
  border: 1px solid var(--acm-blue);
}

.acm-btn-primary1 {
  background: #fff;
  color: var(--acm-blue);
}

/* ===== Banner ===== */
.acm-banner {
  position: relative;
  width: 100%;
  background: #f8f8f8;
  overflow: hidden;
  padding: 40px 0 44px;
}

.acm-banner-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 0;
}

.acm-banner-bg img {
  width: 100%;
  height: auto;
  display: block;
}

.acm-banner-content {
  position: relative;
  z-index: 2;
  padding: 0 20px;
}

.acm-banner-badge {
  display: inline-block;
  padding: 6px 14px 6px 22px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 100px;
  border: 1px solid rgba(37, 99, 235, 0.2);
  font-size: 11px;
  color: #1a5fff;
  font-weight: 500;
  margin-bottom: 16px;
  position: relative;
}

.acm-banner-badge::before {
  content: "";
  position: absolute;
  left: 9px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2563eb;
}

.acm-banner-brand {
  font-weight: 600;
  font-size: 34px;
  color: #0f172a;
  line-height: 1.25;
  margin-bottom: 6px;
}

.acm-banner-title {
  font-weight: 600;
  font-size: 34px;
  color: #005aff;
  line-height: 1.25;
  margin: 0 0 12px;
}

.acm-banner-desc {
  font-weight: 400;
  font-size: 14px;
  color: #475569;
  line-height: 24px;
  margin: 0 0 20px;
}

.acm-banner-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* ===== 导航栏 ===== */
.acm-nav-bar {
  position: sticky;
  top: 76px;
  z-index: 15;
  background: #f8f8f8;
  border-bottom: 1px solid #eceff3;
}

@media (max-width: 560px) {
  .acm-nav-bar {
    top: 66px;
  }
}

.acm-nav-scroll {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 0 12px;
  scrollbar-width: none;
}

.acm-nav-scroll::-webkit-scrollbar {
  display: none;
}

.acm-nav-tab {
  flex: 0 0 auto;
  scroll-snap-align: center;
  font-size: 14px;
  color: #161616;
  text-decoration: none;
  padding: 14px 12px;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
}

.acm-nav-tab-active {
  color: var(--acm-blue);
  border-bottom-color: var(--acm-blue);
  font-weight: 500;
}

/* ===== 产品概述区 ===== */
.acm-overview-section {
  background: #fff;
  overflow: hidden;
}

.acm-overview-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 0;
}

.acm-overview-bg img {
  width: 100%;
  height: auto;
  display: block;
}

.acm-overview-section .acm-container {
  position: relative;
  z-index: 2;
}

.acm-overview-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

@media (min-width: 600px) {
  .acm-overview-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

.acm-overview-card {
  padding: 18px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e9f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.acm-overview-card img {
  width: 64px;
  height: 64px;
  margin: 0 auto 12px;
  display: block;
}

.acm-overview-card h3 {
  font-weight: 500;
  font-size: 17px;
  color: #0f172a;
  margin: 0 0 8px;
  text-align: center;
}

.acm-overview-card p {
  font-weight: 400;
  font-size: 13px;
  color: #475569;
  line-height: 22px;
  text-align: center;
  margin: 0;
}

/* ===== 核心功能 - 多维度AI智能防作弊 ===== */
.acm-feature-section {
  background: #fff;
}

.acm-feat-box {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  margin-bottom: 32px;
}

.acm-feat-box-item {
  padding: 20px 18px 16px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.acm-feat-box-item-header {
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 500;
  font-size: 17px;
  color: #0f172a;
  margin-bottom: 12px;
}

.acm-feat-box-item-header img {
  width: 26px;
  height: 26px;
}

.acm-feat-box-item-header h3 {
  margin: 0;
}

.acm-feat-box-item-desc {
  font-weight: 400;
  font-size: 13px;
  color: #475569;
  line-height: 23px;
  text-indent: 2em;
}

.acm-feat-block {
  margin-bottom: 36px;
}

.acm-feat-block:last-child {
  margin-bottom: 0;
}

.acm-feat-head {
  margin-bottom: 12px;
}

.acm-feat-head h3 {
  font-weight: 600;
  font-size: 20px;
  color: #1a1a2e;
  margin: 0;
}

.acm-feat-intro {
  font-weight: 400;
  font-size: 14px;
  color: #475569;
  line-height: 25px;
  margin: 0 0 18px;
}

.acm-feat-img-wrap {
  margin: 0 0 12px;
}

.acm-feat-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

.acm-feat-quote1 {
  font-weight: 500;
  font-size: 14px;
  color: #0f62fe;
  line-height: 22px;
  margin: 0 0 12px;
  text-align: center;
}

.acm-feat-quote {
  font-weight: 400;
  font-size: 13px;
  color: #475569;
  line-height: 23px;
  margin: 0 0 16px;
  text-indent: 2em;
}

.acm-feat-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.acm-feat-item:last-child {
  margin-bottom: 0;
}

.acm-feat-item img {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
}

.acm-feat-item strong {
  display: block;
  font-weight: 600;
  font-size: 15px;
  color: #0f172a;
  line-height: 24px;
  margin-bottom: 4px;
}

.acm-feat-item span {
  font-weight: 400;
  font-size: 13px;
  color: #475569;
  line-height: 22px;
}

/* ===== 核心功能 - 全流程考务智能化管控（5 tab） ===== */
.acm-control-section {
  background: #f7faff;
}

.acm-tab-bar {
  margin-bottom: 24px;
  padding: 5px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.acm-tab-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.acm-tab-scroll::-webkit-scrollbar {
  display: none;
}

.acm-tab-item {
  flex: 0 0 auto;
  scroll-snap-align: start;
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 14px;
  color: #475569;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s ease;
}

.acm-tab-item-active {
  color: #fff;
  background: #0f62fe;
}

.acm-tab-content {
  animation: acm-fade 0.4s ease;
}

@keyframes acm-fade {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.acm-tab-left h3 {
  font-weight: 600;
  font-size: 17px;
  color: #0f172a;
  line-height: 28px;
  margin: 0 0 14px;
}

.acm-tab-desc {
  font-weight: 400;
  font-size: 14px;
  color: #475569;
  line-height: 24px;
  margin: 0 0 18px;
}

.acm-tab-point {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 14px 16px;
  margin-bottom: 12px;
}

.acm-tab-point:last-child {
  margin-bottom: 0;
}

.acm-tab-point-title {
  font-weight: 600;
  font-size: 15px;
  color: #0f172a;
  line-height: 23px;
  margin-bottom: 6px;
}

.acm-tab-point-desc {
  font-weight: 400;
  font-size: 13px;
  color: #475569;
  line-height: 22px;
}

.acm-tab-img {
  width: 100%;
  height: auto;
  display: block;
  margin-top: 20px;
  border-radius: 8px;
}

/* ===== 数据管控区（深色） ===== */
.acm-data-section {
  background: #0e1032;
  overflow: hidden;
}

.acm-data-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  z-index: 0;
}

.acm-data-bg img {
  width: 100%;
  height: auto;
  display: block;
}

.acm-data-section .acm-container {
  position: relative;
  z-index: 2;
}

.acm-data-section .acm-section-header h2 {
  color: #fff;
}

.acm-data-features {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  margin-bottom: 32px;
}

.acm-data-feature {
  padding: 18px 18px 22px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.acm-data-feature-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  font-size: 18px;
  color: #ffffff;
  margin: 0 0 16px;
}

.acm-data-feature-header img {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.acm-data-feature-desc {
  font-weight: 400;
  font-size: 13px;
  color: #ffffff;
  line-height: 23px;
  text-indent: 2em;
}

.acm-dash-block {
  margin-bottom: 36px;
}

.acm-dash-block:last-child {
  margin-bottom: 0;
}

.acm-dash-info h3 {
  font-weight: 600;
  font-size: 19px;
  color: #f1f5f9;
  line-height: 26px;
  margin: 0 0 12px;
}

.acm-dash-desc {
  font-weight: 400;
  font-size: 14px;
  color: #e4e4e4;
  line-height: 24px;
  margin: 0 0 16px;
}

.acm-dash-point {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 14px 16px;
  margin-bottom: 12px;
}

.acm-dash-point:last-child {
  margin-bottom: 0;
}

.acm-dash-point img {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
}

.acm-dash-point-title {
  font-weight: 600;
  font-size: 15px;
  color: #ffffff;
  line-height: 23px;
  margin-bottom: 6px;
}

.acm-dash-point-desc {
  font-weight: 400;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 22px;
  text-indent: 2em;
}

.acm-dash-img {
  width: 100%;
  height: auto;
  display: block;
  margin-top: 18px;
  border-radius: 8px;
}

/* ===== 全程数据留存溯源追责 ===== */
.acm-trace-section {
  background: #fff;
}

.acm-trace-title {
  font-weight: 600;
  font-size: 24px;
  color: #0f172a;
  line-height: 1.35;
  margin-bottom: 12px;
}

.acm-trace-desc {
  font-weight: 400;
  font-size: 14px;
  color: #475569;
  line-height: 24px;
  margin: 0 0 24px;
}

.acm-trace-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  margin-bottom: 24px;
}

@media (min-width: 600px) {
  .acm-trace-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.acm-trace-card {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  border: 2px solid rgba(0, 0, 0, 0.06);
  padding: 18px 18px 12px;
}

.acm-trace-card h4 {
  font-weight: 600;
  font-size: 15px;
  color: #0f172a;
  line-height: 24px;
  margin: 0 0 4px;
}

.acm-trace-card p {
  font-weight: 400;
  font-size: 13px;
  color: #475569;
  line-height: 22px;
  margin: 0;
}

.acm-trace-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

/* ===== 平台价值总结区 ===== */
.acm-value-section {
  background: #fff;
}

.acm-value-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

@media (min-width: 600px) {
  .acm-value-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.acm-value-card {
  padding: 24px 18px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e9f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.acm-value-card img {
  width: 64px;
  height: 64px;
  margin: 0 auto 14px;
  display: block;
}

.acm-value-card h3 {
  font-weight: 600;
  font-size: 16px;
  color: #1a1a2e;
  margin: 0 0 8px;
  text-align: center;
}

.acm-value-card p {
  font-weight: 400;
  font-size: 13px;
  color: #666666;
  line-height: 22px;
  margin: 0;
  text-align: center;
}

/* ===== 部分功能展示（9图横滑相册 + 3对图单列） ===== */
.acm-showcase-section {
  background: #f7faff;
}

.acm-showcase-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 4px 16px 16px;
  margin-bottom: 20px;
}

.acm-showcase-scroll::-webkit-scrollbar {
  display: none;
}

.acm-showcase-img {
  flex: 0 0 85%;
  scroll-snap-align: center;
  height: auto;
  border-radius: 8px;
}

.acm-showcase-pairs {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.acm-showcase-pair-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

/* ===== 底部CTA区 ===== */
.acm-cta-section {
  width: 100%;
  padding: 48px 0 44px;
  background: linear-gradient(106deg, #1a5fff 0%, #0d47a1 100%);
}

.acm-cta-content {
  text-align: center;
  color: #fff;
}

.acm-cta-content h2 {
  font-weight: 600;
  font-size: 24px;
  color: #ffffff;
  line-height: 1.4;
  margin: 0 0 12px;
}

.acm-cta-content p {
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 24px;
  margin: 0 0 22px;
}
</style>
