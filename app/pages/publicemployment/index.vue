<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

// @ts-ignore
useSeoMeta({
  title: "公共就业服务｜中测高科",
  description:
    "聚才人力集团公共就业服务中心，深耕公共就业服务二十余载，以人力资源服务为核心驱动，以前沿智库研究为战略先导、AI 数智平台为技术底座，构建“人才引领产业、产业集聚人才”融合发展新格局。",
});

// ===== 线上图片资源 =====
const IMG =
  "https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/hubImages/publicemployment";

// ===== 咨询预约（与页眉「获取方案」一致，预选公共就业服务 = 19）=====
// @ts-ignore
const source = useCampaignSource();
// @ts-ignore
const contactRoute = computed(() => getContactRoute(19, source.value));

// ===== 相关资料下载（与其他模块同一目录：zcyp-classroom/materials/<名称>.pdf）=====
const materialUrl =
  "https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/materials/publicemployment.pdf";

// ===== 内容导航 =====
type NavTab = { id: string; label: string; target: string; eco?: number };
const navTabs: NavTab[] = [
  { id: "pe-about", label: "关于我们", target: "pe-about" },
  { id: "pe-adv", label: "核心优势", target: "pe-adv" },
  { id: "eco0", label: "战略生态", target: "pe-eco", eco: 0 },
  { id: "eco1", label: "三大服务", target: "pe-eco", eco: 1 },
  { id: "eco2", label: "数智中枢", target: "pe-eco", eco: 2 },
  { id: "pe-honor", label: "成果荣誉", target: "pe-honor" },
];
const activeNav = ref("pe-about");
// 生态体系 Tab：0=智库引擎 1=三大服务 2=数智中枢
const activeEco = ref(0);

const scrollToSection = (target: string) => {
  const el = document.getElementById(target);
  if (!el) return;
  const headerOffset = 132;
  const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
};

const scrollToTab = (tab: NavTab) => {
  if (tab.eco !== undefined) activeEco.value = tab.eco;
  activeNav.value = tab.id;
  scrollToSection(tab.target);
};

const selectEco = (i: number) => {
  activeEco.value = i;
  activeNav.value = "eco" + i;
};

const handleScroll = () => {
  const scrollY = window.scrollY + 140;
  const order = ["pe-about", "pe-adv", "pe-eco", "pe-honor"];
  let current = "pe-about";
  for (const s of order) {
    const sec = document.getElementById(s);
    if (sec && sec.offsetTop <= scrollY) {
      current = s === "pe-eco" ? "eco" + activeEco.value : s;
    }
  }
  activeNav.value = current;
};

// ===== Banner 底部标签 =====
const bannerTags = ["精准匹配", "赋能人才", "传递温暖", "成就梦想"];

// ===== 关于我们 =====
const stats = [
  { icon: `${IMG}/box1-icon1.png`, num: 20, unit: "余年", label: "深耕公共就业服务" },
  { icon: `${IMG}/box1-icon2.png`, num: 31, unit: "省市", label: "分子公司全国布局" },
  { icon: `${IMG}/box1-icon3.png`, num: 800, unit: "+", label: "专业从业人员" },
  { icon: `${IMG}/box1-icon4.png`, num: 10, unit: "万+", label: "客户服务经验" },
];

const introParas = [
  {
    text: "聚才人力集团公共就业服务中心，深耕公共就业服务二十余载，以人力资源服务为核心驱动，紧密对接产业发展需求，致力于构建",
    em: "“人才引领产业、产业集聚人才”",
    after: "融合发展新格局。",
  },
  {
    text: "以前沿智库研究为战略先导，AI数智平台为技术底座，人才发展、就业服务与产业协同为三大支柱，创新打造",
    em: "“政企校才”四方联动",
    after: "的公共就业服务生态体系。",
  },
  {
    text: "在“政府引导、市场运作”双轮驱动下，将服务链条深度嵌入区域产业发展，以人力资源高效配置赋能产业生态建设，助力区域高质量发展。",
  },
];

const positions = [
  { icon: `${IMG}/box1-icon5.png`, text: "区域经济发展重要助推器" },
  { icon: `${IMG}/box1-icon6.png`, text: "人才开发与就业促进双向发力" },
  { icon: `${IMG}/box1-icon7.png`, text: "创业孵化与产业对接紧密衔接" },
  { icon: `${IMG}/box1-icon8.png`, text: "政策协同与市场机制有机融合" },
];

// ===== 核心优势 =====
const advantages = [
  {
    icon: `${IMG}/box2-icon1.png`,
    title: "自有数智技术赋能",
    desc: "拥有完全自主知识产权智能化管理平台，快速部署招就培平台，实现就业市场高效运转与人岗精准对接。",
    points: [
      "招聘求职一体化平台",
      "政府监管可视化平台",
      "人才测评云系统",
      "在线实训平台、供需监测系统",
      "牛派·HRS人力资源数字资产管理平台",
    ],
    bullet: true,
  },
  {
    icon: `${IMG}/box2-icon2.png`,
    title: "标准化专业服务团队",
    desc: "全国31省市布局分子公司，自有800+专业从业人员。核心团队包含政策研究专家、就业服务专员、数据技术团队、项目管理精英。",
    points: [
      "具备丰富落地实施经验，提供标准化、规范化、专业化公共就业项目服务支撑。",
    ],
    bullet: false,
  },
  {
    icon: `${IMG}/box2-icon3.png`,
    title: "全周期一站式解决方案",
    desc: "二十余年深耕，10万+客户服务经验，超百万人次人才培训输送。完善政府项目运营体系。",
    points: [
      "覆盖政策研究、需求分析、项目落地、全流程监督考核，执行高效、合规透明、成果可量化。",
    ],
    bullet: false,
  },
];

// ===== 生态体系 =====
const ecoCards = [
  {
    title: "一套智库研究动力引擎",
    lines: [
      "全国八大研究院体系，300专职研究专家，1000兼职专家团队；80%具备博士或中高级职称。产学研用一体化网络，输出可落地人力资源解决方案，包含项目申报辅导、就业创新研究咨询。",
    ],
  },
  {
    title: "三维服务内容支撑架构",
    lines: [
      "就业服务：引·育·留·用·服全链条人才生态\n创业服务：培训赋能+平台孵化+生态营造闭环\n产业服务：产业集聚·赋能·培育·融合",
    ],
  },
  {
    title: "一个AI数智平台智慧中枢",
    lines: [
      "AI驱动全流程就业服务，简历生成、人岗匹配、AI模拟面试、智能招聘会、数据驾驶舱，线上线下一体化，提升公共就业服务数字化水平。",
    ],
  },
];

// 一套智库引擎（描述为一整段，段内换行）
const engineLead =
  "基于覆盖全国的八大研究院体系，聚才人力集团公共就业服务中心构建起横跨东西、纵贯南北的产学研用一体化研究网络，形成了强大的智库支撑能力。\n凭借“理论研究+实践应用”双轮驱动的创新模式、多学科交叉融合与大数据赋能，公共就业服务中心能够高效转化研发成果，精准服务于就业匹配、职业技能提升、区域人才生态建设等领域，持续引领行业标准升级，为政府、企业及个人提供高质量、可落地的人力资源解决方案。";

const engineSubs = [
  {
    title: "项目申报辅导",
    desc: "我们聚焦公共就业服务领域的各类国家级、省级、市级项目，提供从“项目申报、全流程规划设计、亮点提升”到“项目验收、品牌打造”的全周期咨询服务。以专业能力为支撑，协助地方人社部门争取项目资源、优化实施路径、提炼经验模式，打造具有区域辨识度的公共就业服务品牌。",
  },
  {
    title: "就业创新研究与咨询",
    desc: "依托强大的专家智库与数据中台，为各级政府提供前瞻性、战略性、实操性的就业研究与咨询服务。通过深度洞察就业趋势、精准诊断痛点问题、科学评估政策效果，提升公共就业服务的科学化、精准化水平。",
  },
];

const engineStats = [
  { num: 30, unit: "家", label: "分子公司" },
  { num: 850, unit: "+", label: "落地团队" },
  { num: 32, unit: "个", label: "省市覆盖" },
];

// 三大服务体系（每个区域固定 5 张图，与文字条目无关）
const svcImg = (start: number) =>
  Array.from({ length: 5 }, (_, k) => `${IMG}/box3-img${start + k}.png`);
const serviceGroups = [
  {
    title: "就业服务｜引·育·留·用·服",
    desc: "构建五位一体人才服务闭环，实现人才引得进、育得强、留得住、用得好、连得通",
    cls: "pe-svc-group-blue",
    imgs: svcImg(3),
    items: [
      { title: "精准引才", content: "线上云聘、直播带岗；线下专场招聘会；海外小团组引才，多渠道搭建人才招引网络。" },
      { title: "系统育才", content: "大学生生涯规划、求职实训、高级人才研修、考试命题与人才测评服务。" },
      { title: "用心留才", content: "文化留才、成长留才，城市研学、导师带教、人才诊断，增强人才归属感。" },
      { title: "科学用才", content: "城市人才品牌打造，劳务品牌规划运营，挖掘地方特色劳务经济。" },
      { title: "贴心服才", content: "人才信息化平台、定制化人才咨询，服务找人一站式人才解决方案。" },
    ],
  },
  {
    title: "创业服务｜创业成长生态闭环",
    desc: "培训赋能+平台孵化+生态营造，发挥创业带动就业倍增效应",
    cls: "pe-svc-group-purple",
    imgs: svcImg(8),
    items: [
      { title: "创业人才培养", content: "GYB/SYB/IYB/EYB阶梯式创业培训；创业模拟沙盘、沙龙辅导，全周期创业培育体系。" },
      { title: "创业平台运营", content: "创新创业孵化基地运营，空间、培训、双导师、金融、展销全要素支持初创项目。" },
      { title: "创业生态打造", content: "行业峰会论坛、创新创业赛事全链条服务，以赛引才、以赛促创、以赛兴业。" },
    ],
  },
  {
    title: "产业服务｜区域性人力资源服务生态",
    desc: "产业集聚｜产业赋能｜产业培育｜产业融合，推动人才链‑产业链双向升级",
    cls: "pe-svc-group-indigo",
    imgs: svcImg(13),
    items: [
      { title: "产业集聚", content: "人力资源产业园规划运营、跨区域劳务协作，打造产业服务载体。" },
      { title: "产业赋能", content: "公共就业平台运营，五级就业服务网点、5+2就业之家、零工市场建设运营。" },
      { title: "产业培育", content: "电商直播基地、数字经济产业园，面向新兴产业引才育才，培育新增长极。" },
      { title: "产业融合", content: "产教融合基地共建、两业融合服务，打通教育‑就业‑产业协同通道。" },
    ],
  },
];

// 数智AI中枢（核心AI能力无图标）
const aiCore = [
  { title: "自然语言生简历 & 简历诊断智写", content: "快速生成、优化求职者简历" },
  { title: "AI模拟面试", content: "全真模拟面试场景，输出评估报告与提升建议" },
  { title: "AI职业匹配、岗位智能推送", content: "多维算法，匹配精准度提升40%" },
  { title: "AI智能巡岗", content: "招聘会场景自动筛选置顶高匹配岗位" },
  { title: "数据驾驶舱成果看板", content: "完整招聘会管理、企业招聘、求职服务闭环" },
];

// 平台功能全景（四个图标属于此处）
const aiPanorama = [
  {
    icon: `${IMG}/box3-icon1.png`,
    k: "求职者侧",
    v: "报名签到、简历系统、AI测评、模拟面试、岗位推送、消息通知",
  },
  {
    icon: `${IMG}/box3-icon2.png`,
    k: "企业侧",
    v: "岗位采集、招聘后台、AI巡岗、线下面试扫码闭环",
  },
  {
    icon: `${IMG}/box3-icon3.png`,
    k: "运营管理",
    v: "招聘会全流程管理、数据统计看板、报告导出",
  },
  {
    icon: `${IMG}/box3-icon4.png`,
    k: "线下硬件配套",
    v: "AI求职服务一体机、独立AI面试舱，打造AI就业服务线下体验区",
  },
];

const aiScene =
  "AI求职一体机、AI面试舱；企业智慧用工平台；线上线下各类招聘会；地方公共就业服务平台数字化升级。";

const aiSmallImgs = [
  { src: `${IMG}/box3-img19.png`, w: 126, h: 95 },
  { src: `${IMG}/box3-img20.png`, w: 126, h: 95 },
  { src: `${IMG}/box3-img21.png`, w: 122, h: 113 },
  { src: `${IMG}/box3-img22.png`, w: 127, h: 111 },
];

// ===== 成果荣誉 =====
const coreQuals = [
  "江西省人力资源服务行业领军企业",
  "全国工商联人力资源服务业委员会委员单位",
  "AAA级信用企业、诚信服务示范机构",
  "人力资源服务许可证等多项行业资质",
  "中国人才交流协会人才测评专委会副秘书长单位",
  "劳动保障守法诚信示范单位",
];

const mediaLead =
  "人社部、省市各级领导调研指导；项目案例被央视新闻联播、人民网、地方主流媒体报道。";

const mediaPoints = [
  "劳务品牌典型案例：万载花炮人、新干箱包工匠、靖安民宿管家、庐山云雾茶人",
  "五省边区公共就业服务示范城市建设项目实践",
  "“港培生计划”、线上云聘、直播带岗多个创新服务模式落地",
  "输出大量就业研究报告、人才规划、产业调研成果",
];

// ===== 滚动入场动画 =====
const pageRef = ref<HTMLElement>();
let enterObserver: IntersectionObserver | null = null;

// 收集尚未入场的元素；面板为 out-in 过渡，新内容在旧面板淡出后才挂载，
// 因此需在 transition 的 enter 钩子中调用（watch + nextTick 跑在挂载前，会扫不到新节点）
const collectAnimate = () => {
  if (!pageRef.value || !enterObserver) return;
  pageRef.value
    .querySelectorAll<HTMLElement>(".pe-animate:not(.pe-visible)")
    .forEach((el) => enterObserver?.observe(el));
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  if (!pageRef.value) return;
  enterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("pe-visible");
          enterObserver?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  collectAnimate();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

// ===================== 移动端（≤850px）专用逻辑 =====================
// PC 端根节点 .pe-page 的模板 / 样式 / 脚本保持零改动；
// 以下状态与副作用仅供移动根节点 .pem-page 使用，与桌面端互不干扰。
const pemSection = ref<HTMLElement>();

// 移动端生态三块纵向平铺，所以导航项直接锚点到各块（而非 PC 的 Tab 切换）
const pemNavTabs = [
  { id: "pem-about", label: "关于我们", target: "pem-about" },
  { id: "pem-adv", label: "核心优势", target: "pem-adv" },
  { id: "pem-engine", label: "智库引擎", target: "pem-engine" },
  { id: "pem-service", label: "三大服务", target: "pem-service" },
  { id: "pem-aihub", label: "数智中枢", target: "pem-aihub" },
  { id: "pem-honor", label: "成果荣誉", target: "pem-honor" },
];
const pemActiveNav = ref("pem-about");

// 页眉高（>560px 为 76，≤560px 为 66，见 main.css 对 .nav-wrap 的覆盖）+ 页内导航高 41
const pemStickyOffset = () =>
  (typeof window !== "undefined" && window.innerWidth <= 560 ? 66 : 76) + 41;

// 与 CSS 断点保持一致；桌面端不需要跑移动版的滚动监听（避免无谓的布局读取）
const pemIsMobile = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 850px)").matches;

// 生态三块锦点 id，与 ecoCards 顺序一一对应
const pemPanelId = (i: number) =>
  ["pem-engine", "pem-service", "pem-aihub"][i] ?? "";

const pemScrollTo = (target: string) => {
  const el = document.getElementById(target);
  if (!el) return;
  const y =
    el.getBoundingClientRect().top + window.pageYOffset - pemStickyOffset();
  window.scrollTo({ top: y, behavior: "smooth" });
};

const pemHandleScroll = () => {
  if (!pemIsMobile()) return;
  const line = window.scrollY + pemStickyOffset() + 20;
  let current = pemNavTabs[0]?.id ?? "pem-about";
  for (const tab of pemNavTabs) {
    const sec = document.getElementById(tab.target);
    if (sec && sec.offsetTop <= line) current = tab.id;
  }
  pemActiveNav.value = current;
  // 高亮项滚入视野
  const active = pemSection.value?.querySelector<HTMLElement>(
    ".pem-nav-tab-active",
  );
  const bar = active?.parentElement;
  if (active && bar) {
    const left = active.offsetLeft - (bar.clientWidth - active.clientWidth) / 2;
    bar.scrollTo({ left, behavior: "smooth" });
  }
};

let pemObserver: IntersectionObserver | null = null;
const collectPemAnimate = () => {
  if (!pemSection.value || !pemObserver) return;
  pemSection.value
    .querySelectorAll<HTMLElement>(".pem-animate:not(.pem-visible)")
    .forEach((el) => pemObserver?.observe(el));
};

onMounted(() => {
  window.addEventListener("scroll", pemHandleScroll, { passive: true });
  if (!pemSection.value) return;
  pemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("pem-visible");
          pemObserver?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  collectPemAnimate();
  pemHandleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", pemHandleScroll);
});
</script>

<template>
  <div ref="pageRef" class="pe-page">
    <!-- ========== 1. Banner 区 ========== -->
    <section class="pe-banner">
      <img class="pe-banner-bg" :src="`${IMG}/banner-bg.png`" alt="" />
      <div class="pe-banner-strip" aria-hidden="true"></div>
      <div class="container-pe pe-banner-inner">
        <p class="pe-banner-badge pe-animate">
          <i></i>公共就业服务数字化解决方案
        </p>
        <h1 class="pe-banner-title pe-animate">公共就业服务</h1>
        <p class="pe-banner-subtitle pe-animate">
          引才的桥梁，育才的摇篮，强产的引擎
        </p>
        <p class="pe-banner-desc pe-animate">
          您身边最可信赖的公共就业服务战略伙伴
        </p>
        <div class="pe-banner-actions pe-animate">
          <a
            class="pe-btn pe-btn-primary"
            href="javascript:void(0)"
            @click.prevent="scrollToSection('pe-eco')"
            >了解服务体系</a
          >
          <a
            class="pe-btn pe-btn-outline"
            :href="materialUrl"
            target="_blank"
            rel="noopener"
            >相关资料下载</a
          >
        </div>
        <ul class="pe-banner-tags pe-animate">
          <li v-for="tag in bannerTags" :key="tag">{{ tag }}</li>
        </ul>
      </div>
    </section>

    <!-- ========== 2. 内容导航 ========== -->
    <nav class="pe-nav">
      <div class="container-pe pe-nav-inner">
        <a
          v-for="tab in navTabs"
          :key="tab.id"
          class="pe-nav-tab"
          :class="{ 'pe-nav-tab-active': activeNav === tab.id }"
          href="javascript:void(0)"
          @click.prevent="scrollToTab(tab)"
          >{{ tab.label }}</a
        >
      </div>
    </nav>

    <!-- ========== 3. 关于我们 ========== -->
    <section id="pe-about" class="pe-about">
      <div class="container-pe">
        <h2 class="pe-sec-title pe-animate">关于我们</h2>

        <div class="pe-stats pe-animate">
          <div v-for="(s, i) in stats" :key="i" class="pe-stat">
            <img :src="s.icon" alt="" width="65" height="79" />
            <div class="pe-stat-text">
              <p class="pe-stat-v">
                <span v-count-up="s.num">{{ s.num }}</span><i>{{ s.unit }}</i>
              </p>
              <p class="pe-stat-l">{{ s.label }}</p>
            </div>
          </div>
        </div>

        <div class="pe-about-body">
          <div class="pe-intro pe-animate">
            <h3 class="pe-sub-title pe-intro-title">企业简介</h3>
            <p v-for="(p, i) in introParas" :key="i" class="pe-intro-para">
              {{ p.text }}<em v-if="p.em">{{ p.em }}</em>{{ p.after }}
            </p>
          </div>
          <div class="pe-position pe-animate">
            <h3 class="pe-sub-title pe-position-title">企业定位</h3>
            <div class="pe-position-grid">
              <div v-for="(item, i) in positions" :key="i" class="pe-position-card">
                <img :src="item.icon" alt="" width="53" height="48" />
                <p>{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 4. 核心优势 ========== -->
    <section id="pe-adv" class="pe-adv">
      <img class="pe-adv-bg" :src="`${IMG}/bg1.png`" alt="" />
      <div class="container-pe pe-adv-inner">
        <div class="pe-adv-head-wrap pe-animate">
          <h2 class="pe-adv-title">核心优势</h2>
          <span class="pe-title-bar"></span>
        </div>
        <div class="pe-adv-grid">
          <article
            v-for="(item, i) in advantages"
            :key="i"
            class="pe-adv-card pe-animate"
            :style="{ transitionDelay: i * 0.1 + 's' }"
          >
            <div class="pe-adv-head">
              <img :src="item.icon" alt="" width="53" height="48" />
              <h3>{{ item.title }}</h3>
            </div>
            <p class="pe-adv-desc">{{ item.desc }}</p>
            <ul
              class="pe-adv-points"
              :class="{ 'pe-adv-points-plain': !item.bullet }"
            >
              <li v-for="pt in item.points" :key="pt">{{ pt }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- ========== 5. 战略生态（生态体系区） ========== -->
    <section id="pe-eco" class="pe-eco">
      <div class="container-pe">
        <div class="pe-eco-head pe-animate">
          <h2 class="pe-eco-main-title">131公共就业服务生态体系</h2>
          <span class="pe-title-bar"></span>
          <p class="pe-eco-sub">1套智库引擎｜3维服务体系｜1个数智中枢</p>
        </div>

        <!-- 生态 Tab（点击切换，高亮=渐变） -->
        <div class="pe-eco-cards pe-animate">
          <article
            v-for="(card, i) in ecoCards"
            :key="card.title"
            class="pe-eco-card"
            :class="{ 'pe-eco-card-special': activeEco === i }"
            @click="selectEco(i)"
          >
            <h3>{{ card.title }}</h3>
            <p v-for="line in card.lines" :key="line">{{ line }}</p>
          </article>
        </div>

        <!-- Tab 内容面板（切换时淡入）：v-if / v-else-if 链，链内相邻分支之间不得插入注释或空行 -->
        <transition name="eco-fade" mode="out-in" @enter="collectAnimate">
          <div class="pe-engine" v-if="activeEco === 0">
          <img class="pe-engine-bg" :src="`${IMG}/box3-bg1.png`" alt="" />
          <div class="pe-engine-inner">
            <h3 class="pe-block-title pe-animate">一套智库引擎</h3>
            <p class="pe-engine-lead pe-animate">{{ engineLead }}</p>
            <div class="pe-engine-card pe-animate">
              <div class="pe-engine-body">
                <div class="pe-engine-map">
                  <img
                    :src="`${IMG}/box3-img1.png`"
                    alt="智库布局地图"
                    width="567"
                    height="541"
                  />
                  <div class="pe-engine-stats">
                    <div v-for="st in engineStats" :key="st.label">
                      <p class="pe-engine-stat-v">
                        <span v-count-up="st.num">{{ st.num }}</span
                        ><i>{{ st.unit }}</i>
                      </p>
                      <p class="pe-engine-stat-l">{{ st.label }}</p>
                    </div>
                  </div>
                </div>
                <div class="pe-engine-right">
                  <div
                    class="pe-engine-sub"
                    v-for="s in engineSubs"
                    :key="s.title"
                  >
                    <h4>{{ s.title }}</h4>
                    <p>{{ s.desc }}</p>
                  </div>
                  <div class="pe-engine-show">
                    <img
                      :src="`${IMG}/box3-img2.png`"
                      alt="部分成果展示"
                      width="363"
                      height="271"
                    />
                    <span>部分成果展示</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div class="pe-services" v-else-if="activeEco === 1">
            <img class="pe-services-bg" :src="`${IMG}/box3-bg2.png`" alt="" />
          <div class="pe-services-inner">
            <h3 class="pe-block-title pe-animate">三大服务体系</h3>
            <div
              class="pe-svc-group pe-animate"
              :class="g.cls"
              v-for="g in serviceGroups"
              :key="g.title"
            >
              <div class="pe-svc-group-head">
                <h4>{{ g.title }}</h4>
                <p>{{ g.desc }}</p>
              </div>
              <div class="pe-svc-items">
                <div class="pe-svc-item" v-for="it in g.items" :key="it.title">
                  <h5>{{ it.title }}</h5>
                  <p>{{ it.content }}</p>
                </div>
              </div>
              <div class="pe-svc-imgs">
                  <img
                    v-for="src in g.imgs"
                    :key="src"
                    :src="src"
                    alt=""
                    width="200"
                    height="120"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="pe-aihub" v-else-if="activeEco === 2">
            <img class="pe-aihub-bg" :src="`${IMG}/box3-bg3.png`" alt="" />
            <div class="pe-aihub-inner">
              <h3 class="pe-block-title pe-animate">
                数智AI中枢｜AI智慧就业平台
              </h3>
              <div class="pe-ai-block pe-animate">
                <h4 class="pe-ai-block-title">核心AI能力</h4>
                <div class="pe-aihub-items">
                  <div
                    class="pe-aihub-item"
                    v-for="(item, i) in aiCore"
                    :key="i"
                  >
                    <h5>{{ item.title }}</h5>
                    <p>{{ item.content }}</p>
                  </div>
                </div>
              </div>
              <div class="pe-aihub-bottom">
                <div class="pe-ai-block pe-animate">
                  <h4 class="pe-ai-block-title">平台功能全景</h4>
                  <div class="pe-ai-pano-list">
                    <div class="pe-ai-pano" v-for="p in aiPanorama" :key="p.k">
                      <img :src="p.icon" alt="" width="48" height="48" />
                      <div class="pe-ai-pano-text">
                        <b>{{ p.k }}：</b>
                        <span>{{ p.v }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pe-ai-block pe-animate">
                  <h4 class="pe-ai-block-title pe-ai-block-title-blue">
                    落地应用场景
                  </h4>
                  <p class="pe-ai-scene">{{ aiScene }}</p>
                  <div class="pe-ai-imgs">
                    <img
                      class="pe-ai-img-big"
                      :src="`${IMG}/box3-img18.png`"
                      alt=""
                      width="249"
                      height="214"
                    />
                    <div class="pe-ai-img-smalls">
                      <img
                        v-for="s in aiSmallImgs"
                        :key="s.src"
                        :src="s.src"
                        :width="s.w"
                        :height="s.h"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </section>

    <!-- ========== 6. 成果展示区（成果荣誉） ========== -->
    <section id="pe-honor" class="pe-honor">
      <img class="pe-honor-bg" :src="`${IMG}/bg2.png`" alt="" />
      <!-- 宽屏（>1440）时背景图两侧留白带，用取色融合带消除纵向接缝 -->
      <div class="pe-honor-gutter pe-honor-gutter-l" aria-hidden="true"></div>
      <div class="pe-honor-gutter pe-honor-gutter-r" aria-hidden="true"></div>
      <!-- 图底融入区块底色 #F6F8FF -->
      <div class="pe-honor-fade" aria-hidden="true"></div>
      <div class="container-pe pe-honor-inner">
        <h2 class="pe-honor-title pe-animate">成果展示 · 荣誉资质</h2>

        <div class="pe-honor-qual pe-animate">
          <h3 class="pe-honor-sub">核心资质</h3>
          <ul class="pe-qual-list">
            <li v-for="q in coreQuals" :key="q">
              <i></i>{{ q }}
            </li>
          </ul>
        </div>

        <div class="pe-honor-media">
          <div class="pe-media-text pe-animate">
            <h3 class="pe-honor-sub pe-honor-sub-left">各界认可与媒体关注</h3>
            <p class="pe-media-lead">{{ mediaLead }}</p>
            <ul class="pe-media-list">
              <li v-for="m in mediaPoints" :key="m">{{ m }}</li>
            </ul>
          </div>
          <div class="pe-media-imgs pe-animate">
            <img
              v-for="n in 6"
              :key="n"
              :src="`${IMG}/box4-img${n}.png`"
              alt=""
              width="240"
              height="150"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 7. 合作布局区 ========== -->
    <section id="pe-coop" class="pe-coop">
      <div class="pe-coop-deco" aria-hidden="true">
        <div class="pe-coop-circle pe-coop-circle-tr"></div>
        <div class="pe-coop-circle pe-coop-circle-bl"></div>
      </div>
      <div class="container-pe pe-coop-inner pe-animate">
        <h2 class="pe-coop-title">全国战略合作布局</h2>
        <p class="pe-coop-desc">
          全国30+分子公司、办事处，八大研究院，联动各地人社、院校、产业园区开展公共就业项目合作<br />
          面向各级政府、产业园区、高校、企事业单位提供公共就业整体解决方案，欢迎洽谈合作
        </p>
        <div class="pe-coop-actions">
          <NuxtLink class="pe-coop-btn pe-coop-btn-light" :to="contactRoute">
            洽谈合作
            <img :src="`${IMG}/box5-btn1.png`" alt="" width="18" height="18" />
          </NuxtLink>
          <NuxtLink class="pe-coop-btn pe-coop-btn-ghost" :to="contactRoute">
            <img :src="`${IMG}/box5-btn2.png`" alt="" width="18" height="18" />
            电话咨询
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>

  <!-- ============================================================ -->
  <!-- ========== 移动端版本（≤850px 生效，与 PC 端零耦合）========== -->
  <!-- ============================================================ -->
  <div ref="pemSection" class="pem-page">
    <!-- ===== 1. Banner 区 ===== -->
    <section class="pem-banner">
      <img
        class="pem-banner-img"
        :src="`${IMG}/banner-bg.png`"
        alt="公共就业服务"
      />
      <div class="pem-container pem-banner-inner">
        <p class="pem-banner-badge pem-animate">
          <i></i>公共就业服务数字化解决方案
        </p>
        <h1 class="pem-banner-title pem-animate">公共就业服务</h1>
        <p class="pem-banner-subtitle pem-animate">
          引才的桥梁，育才的摇篮，强产的引擎
        </p>
        <p class="pem-banner-desc pem-animate">
          您身边最可信赖的公共就业服务战略伙伴
        </p>
        <div class="pem-banner-actions pem-animate">
          <a
            class="pem-btn pem-btn-primary"
            href="javascript:void(0)"
            @click.prevent="pemScrollTo('pem-engine')"
            >了解服务体系</a
          >
          <a
            class="pem-btn pem-btn-outline"
            :href="materialUrl"
            target="_blank"
            rel="noopener"
            >相关资料下载</a
          >
        </div>
        <ul class="pem-banner-tags pem-animate">
          <li v-for="tag in bannerTags" :key="tag">{{ tag }}</li>
        </ul>
      </div>
    </section>

    <!-- ===== 2. 页内锚点导航（单行横滑）===== -->
    <nav class="pem-nav">
      <div class="pem-nav-scroll">
        <a
          v-for="tab in pemNavTabs"
          :key="tab.id"
          class="pem-nav-tab"
          :class="{ 'pem-nav-tab-active': pemActiveNav === tab.id }"
          href="javascript:void(0)"
          @click.prevent="pemScrollTo(tab.target)"
          >{{ tab.label }}</a
        >
      </div>
    </nav>

    <!-- ===== 3. 关于我们 ===== -->
    <section id="pem-about" class="pem-about">
      <div class="pem-container">
        <h2 class="pem-sec-title pem-animate">关于我们</h2>

        <div class="pem-stats pem-animate">
          <div v-for="(s, i) in stats" :key="i" class="pem-stat">
            <img :src="s.icon" alt="" width="44" height="54" />
            <div class="pem-stat-text">
              <p class="pem-stat-v">
                <span v-count-up="s.num">{{ s.num }}</span><i>{{ s.unit }}</i>
              </p>
              <p class="pem-stat-l">{{ s.label }}</p>
            </div>
          </div>
        </div>

        <div class="pem-intro pem-animate">
          <h3 class="pem-sub-title">企业简介</h3>
          <p v-for="(p, i) in introParas" :key="i" class="pem-intro-para">
            {{ p.text }}<em v-if="p.em">{{ p.em }}</em>{{ p.after }}
          </p>
        </div>

        <div class="pem-position pem-animate">
          <h3 class="pem-sub-title pem-position-title">企业定位</h3>
          <div class="pem-position-grid">
            <div v-for="(item, i) in positions" :key="i" class="pem-position-card">
              <img :src="item.icon" alt="" width="40" height="36" />
              <p>{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== 4. 核心优势 ===== -->
    <section id="pem-adv" class="pem-adv">
      <img class="pem-adv-bg" :src="`${IMG}/bg1.png`" alt="" />
      <div class="pem-container pem-adv-inner">
        <div class="pem-adv-head pem-animate">
          <h2 class="pem-adv-title">核心优势</h2>
          <span class="pem-title-bar"></span>
        </div>
        <div class="pem-adv-list">
          <article
            v-for="(item, i) in advantages"
            :key="i"
            class="pem-adv-card pem-animate"
            :style="{ transitionDelay: i * 0.08 + 's' }"
          >
            <div class="pem-adv-card-head">
              <img :src="item.icon" alt="" width="44" height="40" />
              <h3>{{ item.title }}</h3>
            </div>
            <p class="pem-adv-desc">{{ item.desc }}</p>
            <ul
              class="pem-adv-points"
              :class="{ 'pem-adv-points-plain': !item.bullet }"
            >
              <li v-for="pt in item.points" :key="pt">{{ pt }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- ===== 5. 生态体系（移动端取消 Tab，三块纵向平铺）===== -->
    <section class="pem-eco">
      <div class="pem-container">
        <div class="pem-eco-head pem-animate">
          <h2 class="pem-eco-title">131公共就业服务生态体系</h2>
          <span class="pem-title-bar pem-title-bar-left"></span>
          <p class="pem-eco-sub">1套智库引擎｜3维服务体系｜1个数智中枢</p>
        </div>

        <!-- 5.1~5.3 三块：每项 = 概览卡 + 蓝底内容面板 -->
        <div
          v-for="(card, i) in ecoCards"
          :key="card.title"
          :id="pemPanelId(i)"
          class="pem-eco-item"
          :class="`pem-eco-item-${i}`"
        >
          <article class="pem-eco-card pem-animate">
            <h3>{{ card.title }}</h3>
            <p v-for="line in card.lines" :key="line">{{ line }}</p>
          </article>

          <div class="pem-panel pem-animate">
            <div class="pem-panel-inner">
              <h3 class="pem-panel-title">
                {{ i === 0 ? "一套智库引擎" : i === 1 ? "三大服务体系" : "数智AI中枢｜AI智慧就业平台" }}
              </h3>

              <template v-if="i === 0">
                <p class="pem-panel-lead">{{ engineLead }}</p>
                <div class="pem-panel-card">
                  <img
                    class="pem-engine-map"
                    :src="`${IMG}/box3-img1.png`"
                    alt="智库布局地图"
                    width="567"
                    height="541"
                  />
                  <div class="pem-engine-stats">
                    <div v-for="st in engineStats" :key="st.label">
                      <p class="pem-engine-stat-v">
                        <span v-count-up="st.num">{{ st.num }}</span
                        ><i>{{ st.unit }}</i>
                      </p>
                      <p class="pem-engine-stat-l">{{ st.label }}</p>
                    </div>
                  </div>
                  <div class="pem-engine-subs">
                    <div
                      v-for="s in engineSubs"
                      :key="s.title"
                      class="pem-engine-sub"
                    >
                      <h4>{{ s.title }}</h4>
                      <p>{{ s.desc }}</p>
                    </div>
                  </div>
                  <div class="pem-engine-show">
                    <img
                      :src="`${IMG}/box3-img2.png`"
                      alt="部分成果展示"
                      width="363"
                      height="271"
                    />
                    <span>部分成果展示</span>
                  </div>
                </div>
              </template>

              <template v-else-if="i === 1">
                <div
                  v-for="g in serviceGroups"
                  :key="g.title"
                  class="pem-svc-group"
                  :class="g.cls"
                >
                  <div class="pem-panel-card">
                    <h4 class="pem-svc-title">{{ g.title }}</h4>
                    <p class="pem-svc-desc">{{ g.desc }}</p>
                    <div class="pem-svc-items">
                      <div
                        v-for="it in g.items"
                        :key="it.title"
                        class="pem-svc-item"
                      >
                        <h5>{{ it.title }}</h5>
                        <p>{{ it.content }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="pem-svc-imgs">
                    <img
                      v-for="src in g.imgs"
                      :key="src"
                      :src="src"
                      alt=""
                      width="200"
                      height="120"
                    />
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="pem-panel-card pem-ai-block">
                  <h4 class="pem-ai-sub">核心AI能力</h4>
                  <div class="pem-ai-items">
                    <div
                      v-for="(item, j) in aiCore"
                      :key="j"
                      class="pem-ai-item"
                    >
                      <h5>{{ item.title }}</h5>
                      <p>{{ item.content }}</p>
                    </div>
                  </div>
                </div>
                <div class="pem-panel-card pem-ai-block">
                  <h4 class="pem-ai-sub">平台功能全景</h4>
                  <div class="pem-ai-pano-list">
                    <div v-for="p in aiPanorama" :key="p.k" class="pem-ai-pano">
                      <img :src="p.icon" alt="" width="40" height="40" />
                      <div class="pem-ai-pano-text">
                        <b>{{ p.k }}：</b>
                        <span>{{ p.v }}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pem-panel-card pem-ai-block">
                  <h4 class="pem-ai-sub pem-ai-sub-indigo">落地应用场景</h4>
                  <p class="pem-ai-scene">{{ aiScene }}</p>
                  <div class="pem-ai-imgs">
                    <img
                      class="pem-ai-big"
                      :src="`${IMG}/box3-img18.png`"
                      alt=""
                      width="249"
                      height="214"
                    />
                    <div class="pem-ai-smalls">
                      <img
                        v-for="s in aiSmallImgs"
                        :key="s.src"
                        :src="s.src"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== 6. 成果展示区 ===== -->
    <section id="pem-honor" class="pem-honor">
      <div class="pem-container">
        <h2 class="pem-sec-title pem-honor-title pem-animate">
          成果展示 · 荣誉资质
        </h2>
      </div>
      <img class="pem-honor-img" :src="`${IMG}/bg2.png`" alt="荣誉资质展示" />
      <div class="pem-container">
        <div class="pem-honor-qual pem-animate">
          <h3 class="pem-sub-title pem-sub-center">核心资质</h3>
          <ul class="pem-qual-list">
            <li v-for="q in coreQuals" :key="q">
              <i></i>{{ q }}
            </li>
          </ul>
        </div>

        <div class="pem-honor-media pem-animate">
          <h3 class="pem-sub-title">各界认可与媒体关注</h3>
          <p class="pem-media-lead">{{ mediaLead }}</p>
          <ul class="pem-media-list">
            <li v-for="m in mediaPoints" :key="m">{{ m }}</li>
          </ul>
          <div class="pem-media-imgs">
            <img
              v-for="n in 6"
              :key="n"
              :src="`${IMG}/box4-img${n}.png`"
              alt=""
              width="240"
              height="150"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ===== 7. 合作布局区 ===== -->
    <section id="pem-coop" class="pem-coop">
      <div class="pem-coop-deco" aria-hidden="true">
        <div class="pem-coop-circle pem-coop-circle-tr"></div>
        <div class="pem-coop-circle pem-coop-circle-bl"></div>
      </div>
      <div class="pem-container pem-coop-inner pem-animate">
        <h2 class="pem-coop-title">全国战略合作布局</h2>
        <p class="pem-coop-desc">
          全国30+分子公司、办事处，八大研究院，联动各地人社、院校、产业园区开展公共就业项目合作
        </p>
        <p class="pem-coop-desc">
          面向各级政府、产业园区、高校、企事业单位提供公共就业整体解决方案，欢迎洽谈合作
        </p>
        <div class="pem-coop-actions">
          <NuxtLink class="pem-coop-btn pem-coop-btn-light" :to="contactRoute">
            洽谈合作
            <img :src="`${IMG}/box5-btn1.png`" alt="" width="18" height="18" />
          </NuxtLink>
          <NuxtLink class="pem-coop-btn pem-coop-btn-ghost" :to="contactRoute">
            <img :src="`${IMG}/box5-btn2.png`" alt="" width="18" height="18" />
            电话咨询
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== 基础变量 ===== */
.pe-page {
  --pe-blue: #0f62fe;
  --pe-blue-deep: #1769e8;
  --pe-indigo: #7184ff;
  --pe-ink: #152033;
  --pe-muted: #526580;
  --pe-text: #5c5c5c;
  font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei",
    system-ui, sans-serif;
  color: var(--pe-ink);
}

.container-pe {
  width: min(1200px, calc(100% - 40px));
  margin: 0 auto;
}

/* ===== 滚动入场动画 ===== */
.pe-animate {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}
.pe-animate.pe-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===== 通用标题 ===== */
.pe-sec-title {
  margin: 0 0 46px;
  text-align: center;
  font-size: 37px;
  line-height: 52px;
  font-weight: 600;
  color: #152033;
}

.pe-sub-title {
  margin: 0 0 18px;
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
  color: #152033;
}
.pe-intro-title {
  font-size: 24px;
  color: #161a45;
}
.pe-position-title {
  font-size: 18px;
  color: #0f62fe;
}

/* ===== 通用按钮 ===== */
.pe-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 27px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}
.pe-btn-primary {
  background: var(--pe-blue-deep);
  color: #fff;
}
.pe-btn-primary:hover {
  background: #1258c7;
  box-shadow: 0 6px 20px rgba(23, 105, 232, 0.35);
  transform: translateY(-2px);
}
.pe-btn-outline {
  background: #fff;
  color: #245b9d;
  border: 1px solid #9ab9e5;
}
.pe-btn-outline:hover {
  background: var(--pe-blue-deep);
  color: #fff;
}

/* ===== 1. Banner 区（1440×530）=====
   背景用 img 标签实现：右侧贴齐视口右缘、宽 1440（设计稿尺寸），左侧透明区透出底色渐变 */
.pe-banner {
  position: relative;
  height: 530px;
  overflow: hidden;
  /* 右端取样自 banner-bg 右缘色（#F6F8FD/#F4F6FC/#EEF1F9 均值），保证图外侧与底色无缝 */
  background: linear-gradient(105deg, #eef4ff 0%, #e8effc 45%, #f4f7fd 100%);
}
.pe-banner-bg {
  position: absolute;
  top: 0;
  /* 视口≤1440 时贴右缘；更宽时贴居中 1440 画布的右边界 */
  right: max(0px, calc((100% - 1440px) / 2));
  z-index: 0;
  width: 1440px;
  height: 530px;
  object-fit: cover;
  object-position: right;
  pointer-events: none;
}
/* 图右缘融合带：左缘（贴图片右缘）纵向复刻 banner-bg 右缘取样色，横向淡出到主底色，消除宽屏右侧色差；
   视口≤1440 时图右缘即视口右缘，无外露区域，不需要融合带 */
.pe-banner-strip {
  position: absolute;
  top: 0;
  right: max(0px, calc((100% - 1440px) / 2));
  z-index: 1;
  width: 260px;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    #f6f8fd 0%,
    #f6f7fc 20%,
    #f4f6fc 50%,
    #eef1f9 70%,
    #e9eef7 90%,
    #f4f7fe 100%
  );
  /* 左缘实色贴住图片右缘，向右淡出回主底色 */
  -webkit-mask-image: linear-gradient(90deg, #000 0%, transparent 100%);
  mask-image: linear-gradient(90deg, #000 0%, transparent 100%);
}
@media (max-width: 1440px) {
  .pe-banner-strip {
    display: none;
  }
}

.pe-banner-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding-top: 40px;
}

.pe-banner-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 22px;
  padding: 8px 18px;
  width: fit-content;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 4px 14px rgba(23, 105, 232, 0.1);
  font-size: 14px;
  font-weight: 500;
  color: var(--pe-blue-deep);
}
.pe-banner-badge i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--pe-blue-deep);
}

.pe-banner-title {
  margin: 0 0 18px;
  font-size: 56px;
  line-height: 72px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #0f62fe;
}

.pe-banner-subtitle {
  margin: 0 0 14px;
  font-size: 24px;
  line-height: 36px;
  font-weight: 600;
  color: #0f172a;
}

.pe-banner-desc {
  margin: 0 0 34px;
  font-size: 20px;
  line-height: 32px;
  color: #51565d;
}

.pe-banner-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 46px;
}

.pe-banner-tags {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.pe-banner-tags li {
  padding: 8px 18px;
  border-radius: 999px;
  background: rgba(15, 98, 254, 0.1);
  font-size: 14px;
  color: #0f62fe;
}

/* ===== 2. 内容导航 ===== */
.pe-nav {
  position: sticky;
  top: 76px;
  left: 0;
  z-index: 15;
  width: 100%;
  height: 56px;
  background: #f9fafb;
}

.pe-nav-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 58px;
  height: 100%;
}

.pe-nav-tab {
  font-size: 16px;
  font-weight: 400;
  color: #161616;
  text-decoration: none;
  padding: 16px 0;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;
}
.pe-nav-tab:hover {
  color: var(--pe-blue-deep);
}
.pe-nav-tab-active {
  color: var(--pe-blue-deep);
  font-weight: 700;
  border-bottom-color: var(--pe-blue-deep);
}

/* ===== 3. 关于我们 ===== */
.pe-about {
  background: #fff;
  padding: 70px 0 86px;
}

.pe-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 83px;
  margin-bottom: 56px;
  padding: 22px 68px 18px;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 2px 40px -8px rgba(61, 74, 199, 0.08);
}

.pe-stat {
  display: flex;
  align-items: center;
  gap: 14px;
}
.pe-stat img {
  width: 65px;
  height: 79px;
  object-fit: contain;
  flex: none;
}
.pe-stat-v {
  margin: 0;
  font-size: 34px;
  line-height: 44px;
  font-weight: 700;
  color: var(--pe-blue-deep);
}
.pe-stat-v i {
  margin-left: 2px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  color: #475569;
}
.pe-stat-l {
  margin: 2px 0 0;
  font-size: 16px;
  line-height: 26px;
  color: #7a7fa3;
}

.pe-about-body {
  display: flex;
  align-items: flex-start;
  gap: 56px;
}

.pe-intro {
  flex: 0 0 54%;
}
.pe-intro-para {
  margin: 0 0 18px;
  font-size: 15px;
  line-height: 30px;
  color: var(--pe-text);
  text-align: justify;
}
.pe-intro-para em {
  font-style: normal;
  font-weight: 700;
  color: var(--pe-blue-deep);
}

.pe-position {
  flex: 1;
  /* 标题下移，与左侧“企业简介”正文首行顶部对齐 */
  padding-top: 48px;
}
.pe-position-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}
.pe-position-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border: 1px solid #edf1f6;
  border-radius: 12px;
  background: #f5f8fb;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.pe-position-card:hover {
  box-shadow: 0 8px 22px rgba(23, 105, 232, 0.1);
  transform: translateY(-2px);
}
.pe-position-card img {
  width: 53px;
  height: 48px;
  object-fit: contain;
  flex: none;
}
.pe-position-card p {
  margin: 0;
  font-size: 15px;
  line-height: 24px;
  font-weight: 500;
  color: #1d2b45;
}

/* ===== 4. 核心优势（1440×672）===== */
.pe-adv {
  position: relative;
  min-height: 672px;
  padding: 62px 0 60px;
  overflow: hidden;
  background: linear-gradient(180deg, #f3f7ff 0%, #e9f0ff 100%);
}
.pe-adv-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
  pointer-events: none;
}
.pe-adv-inner {
  position: relative;
  z-index: 1;
}

.pe-adv-head-wrap {
  text-align: center;
}
.pe-adv-title {
  margin: 0;
  font-size: 36px;
  line-height: 50px;
  font-weight: 600;
  color: #161a45;
}
.pe-title-bar {
  display: block;
  width: 56px;
  height: 5px;
  margin: 16px auto 0;
  border-radius: 999px;
  background: linear-gradient(90deg, #4a6cf7 0%, #8c5cf6 100%);
}

.pe-adv-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 34px;
  margin-top: 61px;
}

.pe-adv-card {
  padding: 29px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0px 16px 40px -8px rgba(61, 74, 199, 0.12);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease,
    translate 0.3s ease,
    box-shadow 0.3s ease;
}
.pe-adv-card:hover {
  translate: 0 -8px;
  box-shadow: 0px 22px 48px -8px rgba(61, 74, 199, 0.22);
}

.pe-adv-head {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 12px;
}
.pe-adv-head img {
  width: 53px;
  height: 48px;
  object-fit: contain;
  flex: none;
}
.pe-adv-head h3 {
  margin: 0;
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  color: #0f62fe;
}

.pe-adv-desc {
  margin: 0 0 24px;
  font-size: 18px;
  line-height: 30px;
  color: #161a45;
  text-align: justify;
}

.pe-adv-points {
  margin: 0;
  padding: 0;
  list-style: none;
}
.pe-adv-points li {
  position: relative;
  padding-left: 16px;
  font-size: 16px;
  line-height: 30px;
  color: #7a7fa3;
}
.pe-adv-points li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 15px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #7a7fa3;
}
.pe-adv-points-plain li {
  padding-left: 0;
}
.pe-adv-points-plain li::before {
  display: none;
}

/* ===== 5. 生态体系区 ===== */
/* 内容面板宽 1166 居中，头部/Tab 加 17px 内边距与其左右对齐 */
.pe-eco {
  background: #fff;
  padding: 64px 0 66px;
}
.pe-eco .container-pe {
  padding: 0 17px;
}
.pe-eco-head {
  text-align: left;
}
.pe-eco-main-title {
  margin: 0;
  font-size: 36px;
  line-height: 50px;
  font-weight: 600;
  color: #161a45;
}
.pe-eco-head .pe-title-bar {
  margin: 16px 0 0;
}
.pe-eco-sub {
  margin: 16px 0 0;
  font-size: 16px;
  color: #7a7fa3;
}

.pe-eco-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-top: 27px;
}
.pe-eco-card {
  padding: 29px 27px 35px;
  border: 1px solid #dbdbdb;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  user-select: none;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease,
    color 0.3s ease;
}
.pe-eco-card:hover {
  transform: translateY(-4px);
}
.pe-eco-card h3 {
  margin: 0 0 23px;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  color: #161a45;
}
.pe-eco-card p {
  margin: 0;
  font-size: 15px;
  line-height: 28px;
  color: #5c5c5c;
  text-align: justify;
  white-space: pre-line;
}
/* 高亮 Tab：渐变底，标题/描述均为白色 */
.pe-eco-card-special {
  border-color: transparent;
  background: linear-gradient(135deg, #0f62fe 0%, #7184ff 100%);
  box-shadow: 0px 7px 27px 22px rgba(23, 105, 232, 0.22);
}
.pe-eco-card-special h3 {
  color: #fff;
}
.pe-eco-card-special p {
  color: #fff;
}

/* 生态块通用：蓝色面板背景图 + 内容叠加 */
.pe-engine,
.pe-services,
.pe-aihub {
  position: relative;
  max-width: 1166px;
  margin: 0 auto;
  overflow: hidden;
}
.pe-engine-bg,
.pe-services-bg,
.pe-aihub-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 12px;
  z-index: 0;
  pointer-events: none;
}
.pe-engine-inner,
.pe-services-inner,
.pe-aihub-inner {
  position: relative;
  z-index: 1;
  padding: 56px 60px 60px;
}
/* 智库面板内边距按设计稿覆盖 */
.pe-engine-inner {
  padding: 27px 21px 24px;
}
.pe-block-title {
  margin: 0 0 26px;
  text-align: center;
  font-size: 28px;
  line-height: 40px;
  font-weight: 600;
  color: #fff;
}

/* 一套智库引擎 */
.pe-engine {
  min-height: 874px;
  margin-top: 32px;
}
.pe-engine .pe-block-title {
  margin: 0 0 12px;
  font-size: 28px;
  line-height: 40px;
}
.pe-engine-lead {
  margin: 0;
  font-size: 14px;
  line-height: 28px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  white-space: pre-line;
}
/* 内容区白色背景块 */
.pe-engine-card {
  margin-top: 23px;
  padding: 25px 41px 23px 22px;
  border-radius: 8px;
  background: #fcfcff;
}
.pe-engine-body {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}
.pe-engine-map {
  flex: 1;
  min-width: 0;
}
.pe-engine-map > img {
  display: block;
  width: 100%;
  height: 541px;
  object-fit: contain;
}
.pe-engine-stats {
  display: flex;
  gap: 81px;
  /* 首项距白块左缘 22 */
  margin-top: 26px;
  margin-left: 22px;
}
.pe-engine-stat-v {
  margin: 0;
  font-size: 32px;
  line-height: 42px;
  font-weight: 700;
  color: #0f62fe;
}
.pe-engine-stat-v i {
  margin-left: 2px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: #0f62fe;
}
.pe-engine-stat-l {
  /* 上提贴紧数值（行高留白造成的间距用负 margin 抵消） */
  margin: -12px 0 0;
  font-size: 14px;
  line-height: 22px;
  color: #51565d;
}
.pe-engine-right {
  flex: 0 0 400px;
}
.pe-engine-sub + .pe-engine-sub {
  margin-top: 29px;
}
.pe-engine-sub h4 {
  margin: 0;
  font-size: 16px;
  line-height: 28px;
  font-weight: 700;
  color: #161a45;
}
.pe-engine-sub p {
  margin: 4px 0 0;
  font-size: 14px;
  line-height: 28px;
  color: #4b5175;
  text-align: justify;
}
.pe-engine-show {
  margin-top: 39px;
  padding-left: 52px;
}
.pe-engine-show img {
  display: block;
  width: 363px;
  height: 271px;
  object-fit: contain;
  border-radius: 8px;
}
.pe-engine-show span {
  display: block;
  margin-top: 10px;
  font-size: 14px;
  color: #51565d;
  text-align: center;
}

/* Tab 面板切换淡入 */
.eco-fade-enter-active {
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}
.eco-fade-leave-active {
  transition: opacity 0.2s ease;
}
.eco-fade-enter-from {
  opacity: 0;
  transform: translateY(18px);
}
.eco-fade-leave-to {
  opacity: 0;
}

/* Tab 面板内容滚动入场：面板内子块依次上浮淡入（.pe-visible 由 IntersectionObserver 添加） */
.pe-engine-inner > .pe-animate:nth-child(2),
.pe-services-inner > .pe-animate:nth-child(2),
.pe-aihub-inner > .pe-animate:nth-child(2) {
  transition-delay: 0.1s;
}
.pe-engine-inner > .pe-animate:nth-child(3),
.pe-services-inner > .pe-animate:nth-child(3),
.pe-aihub-inner > .pe-animate:nth-child(3) {
  transition-delay: 0.2s;
}
.pe-services-inner > .pe-animate:nth-child(4),
.pe-aihub-inner > .pe-animate:nth-child(4) {
  transition-delay: 0.3s;
}
.pe-services-inner > .pe-animate:nth-child(5) {
  transition-delay: 0.4s;
}

/* 三大服务体系 */
.pe-services {
  min-height: 1160px;
  margin-top: 32px;
}
.pe-services-inner {
  padding: 27px 40px 24px;
}
.pe-svc-group {
  margin-top: 24px;
  padding: 11px 15px 16px;
  border-radius: 8px;
  background: #fcfcff;
}
.pe-svc-group-head {
  margin-bottom: 14px;
}
.pe-svc-group-head h4 {
  display: flex;
  align-items: center;
  margin: 0 0 8px;
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
  color: #161a45;
}
/* 区域标题前 8px 处的竖向色块 */
.pe-svc-group-head h4::before {
  content: "";
  flex: none;
  width: 2px;
  height: 20px;
  margin-right: 8px;
  border-radius: 999px;
  background: #0f62fe;
}
.pe-svc-group-head p {
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  color: #51565d;
}
/* 描述块：弹性平均分配宽度沾满整行（5/3/4 块均可） */
.pe-svc-items {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
.pe-svc-item {
  flex: 1 1 0;
  min-width: 0;
  padding: 14px 16px;
  border: 1px solid #e6ebff;
  border-radius: 6px;
  background: #f6f8ff;
  transition:
    translate 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}
.pe-svc-item:hover {
  translate: 0 -4px;
  border-color: #b9c8ff;
  box-shadow: 0px 10px 24px -6px rgba(61, 74, 199, 0.18);
}
.pe-svc-item h5 {
  margin: 0 0 6px;
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  color: #0f62fe;
}
.pe-svc-item p {
  margin: 0;
  font-size: 13px;
  line-height: 22px;
  color: #4b5175;
  text-align: justify;
}
.pe-svc-imgs {
  display: flex;
  gap: 12px;
}
.pe-svc-imgs img {
  flex: 1 1 0;
  min-width: 0;
  display: block;
  width: 100%;
  aspect-ratio: 200 / 120;
  object-fit: cover;
  transition:
    translate 0.3s ease,
    box-shadow 0.3s ease;
}
.pe-svc-imgs img:hover {
  translate: 0 -4px;
  box-shadow: 0px 10px 24px -6px rgba(23, 105, 232, 0.3);
}
/* 区域二（创业服务）：标题紫、描述块内边距 14 21 */
.pe-svc-group-purple .pe-svc-item {
  padding: 14px 21px;
}
.pe-svc-group-purple .pe-svc-item h5 {
  color: #7c5bf0;
}
/* 区域三（产业服务）：标题蓝紫、描述块内边距 14 20 */
.pe-svc-group-indigo .pe-svc-item {
  padding: 14px 20px;
}
.pe-svc-group-indigo .pe-svc-item h5 {
  color: #4e5be4;
}

/* 数智AI中枢 */
.pe-aihub {
  min-height: 648px;
  margin-top: 32px;
}
/* 面板内边距按设计稿覆盖 */
.pe-aihub-inner {
  padding: 27px 24px 24px;
}
/* 面板内的白色内容块 */
.pe-ai-block {
  padding: 20px 16px 24px;
  border-radius: 8px;
  background: #fcfcff;
}
.pe-ai-block-title {
  margin: 0 0 12px;
  font-size: 18px;
  line-height: 28px;
  font-weight: 600;
  color: #161a45;
}
/* 落地应用场景标题 */
.pe-ai-block-title-blue {
  color: #4e5be4;
}
/* 核心AI能力：五张卡平分行宽 */
.pe-aihub-items {
  display: flex;
  gap: 12px;
}
.pe-aihub-item {
  flex: 1 1 0;
  min-width: 0;
  padding: 14px 16px;
  border: 1px solid #e6ebff;
  border-radius: 6px;
  background: #f6f8ff;
  transition:
    translate 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}
.pe-aihub-item:hover {
  translate: 0 -4px;
  border-color: #b9c8ff;
  box-shadow: 0px 10px 24px -6px rgba(61, 74, 199, 0.18);
}
.pe-aihub-item h5 {
  margin: 0 0 18px;
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  color: #0f62fe;
}
.pe-aihub-item p {
  margin: 0;
  font-size: 13px;
  line-height: 22px;
  color: #4b5175;
  text-align: justify;
}
/* 下方左右两块：平台功能全景 / 落地应用场景 */
.pe-aihub-bottom {
  display: flex;
  align-items: stretch;
  gap: 16px;
  margin-top: 20px;
}
.pe-aihub-bottom > .pe-ai-block {
  flex: 1 1 0;
  min-width: 0;
}
.pe-ai-pano-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 6px;
}
.pe-ai-pano {
  display: flex;
  align-items: center;
  gap: 14px;
}
.pe-ai-pano img {
  flex: none;
  width: 48px;
  height: 48px;
  object-fit: contain;
}
.pe-ai-pano-text b {
  display: block;
  margin-bottom: 4px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: #161a45;
}
.pe-ai-pano-text span {
  display: block;
  font-size: 14px;
  line-height: 24px;
  color: #4b5175;
}
.pe-ai-scene {
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 24px;
  color: #4b5175;
  text-align: justify;
}
/* 大图距小图 6，小图之间 8 */
.pe-ai-imgs {
  display: flex;
  gap: 6px;
}
.pe-ai-img-big {
  flex: none;
  display: block;
  width: 249px;
  height: 214px;
  object-fit: cover;
}
.pe-ai-img-smalls {
  flex: 1 1 0;
  min-width: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 95fr 113fr;
  gap: 8px;
}
.pe-ai-img-smalls img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.pe-ai-imgs img {
  transition:
    translate 0.3s ease,
    box-shadow 0.3s ease;
}
.pe-ai-imgs img:hover {
  translate: 0 -4px;
  box-shadow: 0px 10px 24px -6px rgba(23, 105, 232, 0.3);
}

/* ===== 6. 成果展示区（背景图 bg2 1440×585 靠顶部）===== */
.pe-honor {
  position: relative;
  overflow: hidden;
  padding: 49px 0 68px;
  background: #f6f8ff;
}
.pe-honor-bg {
  position: absolute;
  top: 0;
  /* 视口≤1440 时贴右缘；更宽时贴居中 1440 画布的右边界 */
  right: max(0px, calc((100% - 1440px) / 2));
  z-index: 0;
  width: 1440px;
  height: 585px;
  object-fit: cover;
  object-position: top;
  pointer-events: none;
}
.pe-honor-inner {
  position: relative;
  z-index: 2;
}
/* 左右融合带：纵向复刻 bg2 左/右缘取样色（含底部透明衰减，已按与 #F6F8FF 合成后的值折算），
   横向向外淡出；宽度即 1440 画布以外的留白，视口≤1440 时自然为 0 */
.pe-honor-gutter {
  position: absolute;
  top: 0;
  z-index: 1;
  width: max(0px, calc((100% - 1440px) / 2));
  height: 585px;
  pointer-events: none;
}
.pe-honor-gutter-l {
  left: 0;
  background: linear-gradient(
    180deg,
    #acd4f4 0%,
    #bcddf8 10%,
    #a1caef 20%,
    #9ec8f0 30%,
    #a9d4f3 40%,
    #9cc9ed 50%,
    #7ab0de 60%,
    #c7dff1 70%,
    #d6eaf6 80%,
    #e9f2fc 90%,
    #f6f8ff 100%
  );
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 100%);
  mask-image: linear-gradient(90deg, transparent 0%, #000 100%);
}
.pe-honor-gutter-r {
  right: 0;
  background: linear-gradient(
    180deg,
    #88c4ea 0%,
    #87c6ea 10%,
    #b3def8 20%,
    #7dbde6 30%,
    #7fbde5 40%,
    #77b2de 50%,
    #82d0f2 60%,
    #bddded 70%,
    #cee6f4 80%,
    #e1effa 90%,
    #f6f8ff 100%
  );
  -webkit-mask-image: linear-gradient(90deg, #000 0%, transparent 100%);
  mask-image: linear-gradient(90deg, #000 0%, transparent 100%);
}
/* 图底融合：展示台以下逐淡入区块底色，避免图与 #F6F8FF 出现横带 */
.pe-honor-fade {
  position: absolute;
  top: 455px;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 130px;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(246, 248, 255, 0) 0%,
    rgba(246, 248, 255, 0.55) 55%,
    #f6f8ff 100%
  );
}
.pe-honor-title {
  margin: 0;
  font-size: 36px;
  line-height: 50px;
  font-weight: 600;
  color: #161a45;
  text-align: center;
}
/* 内容区距区块顶部 473（标题已占 49 + 50） */
.pe-honor-qual {
  margin-top: 374px;
}
.pe-honor-sub {
  margin: 0;
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
  color: #161a45;
  text-align: center;
}
.pe-honor-sub-left {
  text-align: left;
}
.pe-qual-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 24px;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
}
.pe-qual-list li {
  display: inline-flex;
  align-items: center;
  height: 33px;
  padding: 0 22px;
  border-radius: 9999px;
  background: rgba(241, 249, 255, 0.1);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  line-height: 33px;
  color: #1a5fa8;
  transition:
    translate 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;
}
.pe-qual-list li:hover {
  translate: 0 -2px;
  background: rgba(241, 249, 255, 0.22);
  box-shadow: 0px 6px 12px -2px rgba(0, 0, 0, 0.12);
}
.pe-qual-list li i {
  flex: none;
  width: 4px;
  height: 4px;
  margin-right: 8px;
  border-radius: 50%;
  background: #1a5fa8;
}
.pe-honor-media {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 28px 48px;
  margin-top: 28px;
}
.pe-media-text {
  flex: 1 1 320px;
  min-width: 0;
}
.pe-media-lead {
  margin: 16px 0 0;
  font-size: 14px;
  line-height: 28px;
  color: #4b5175;
  text-align: justify;
}
.pe-media-list {
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
}
.pe-media-list li {
  position: relative;
  padding-left: 12px;
  font-size: 14px;
  line-height: 28px;
  color: #4b5175;
  text-align: justify;
}
.pe-media-list li + li {
  margin-top: 14px;
}
.pe-media-list li::before {
  content: "";
  position: absolute;
  top: 13px;
  left: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #4b5175;
}
/* 右侧六图：240×150，左右间距 16、上下 7 */
.pe-media-imgs {
  flex: 0 1 auto;
  width: 752px;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 16px;
  row-gap: 7px;
}
.pe-media-imgs img {
  display: block;
  width: 100%;
  aspect-ratio: 240 / 150;
  object-fit: cover;
  transition:
    translate 0.3s ease,
    box-shadow 0.3s ease;
}
.pe-media-imgs img:hover {
  translate: 0 -4px;
  box-shadow: 0px 10px 24px -6px rgba(23, 105, 232, 0.3);
}

/* ===== 7. 合作布局区（整块高 318）===== */
.pe-coop {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 318px;
  overflow: hidden;
  background: linear-gradient(125deg, #003399 0%, #0052d9 40%, #1677ff 100%);
}
/* 装饰圆贴整块可见边缘（背色渐变满幅，圆跟角走而不是跟 1440 画布走） */
.pe-coop-deco {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.pe-coop-circle {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
}
.pe-coop-circle-tr {
  width: 328px;
  height: 328px;
  top: -114px;
  right: -114px;
  animation: pe-coop-float 7s ease-in-out infinite;
}
.pe-coop-circle-bl {
  width: 230px;
  height: 230px;
  bottom: -90px;
  left: -40px;
  animation: pe-coop-float 6s ease-in-out 1s infinite;
}
@keyframes pe-coop-float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(14px);
  }
}
.pe-coop-inner {
  position: relative;
  z-index: 2;
  padding: 40px 0;
  text-align: center;
}
.pe-coop-title {
  margin: 0;
  font-size: 32px;
  line-height: 44px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #fff;
}
.pe-coop-desc {
  margin: 16px 0 0;
  font-size: 16px;
  line-height: 30px;
  color: rgba(255, 255, 255, 0.9);
}
.pe-coop-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 28px;
}
.pe-coop-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 46px;
  padding: 0 28px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition:
    translate 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;
}
.pe-coop-btn img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}
.pe-coop-btn:hover {
  translate: 0 -3px;
}
.pe-coop-btn-light {
  background: #fff;
  color: #0f62fe;
  box-shadow: 0px 6px 18px -6px rgba(0, 20, 80, 0.4);
}
.pe-coop-btn-light:hover {
  box-shadow: 0px 12px 24px -6px rgba(0, 20, 80, 0.5);
}
.pe-coop-btn-ghost {
  border: 1px solid rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
}
.pe-coop-btn-ghost:hover {
  background: rgba(255, 255, 255, 0.28);
}

/* ============================================================
   移动端版本（pem- 前缀，≤850px 生效，与页眉汉堡、悬浮底栏断点一致）
   · 桌面（>850px）隐藏移动根；≤850px 隐藏 PC 根、显示移动根
   · 所有移动样式限定在 .pem-page 作用域，不改任何 PC 现有规则
   · 不给 .pem-page 设 overflow:hidden，避免破坏 .pem-nav 的 sticky
   ============================================================ */
.pem-page {
  display: none;
}

@media (max-width: 850px) {
  .pe-page {
    display: none;
  }
  .pem-page {
    display: block;
  }
}

/* ===== 移动根变量与基础 ===== */
.pem-page {
  --pem-blue: #0f62fe;
  --pem-indigo: #4e5be4;
  --pem-ink: #161a45;
  --pem-body: #4b5175;
  --pem-muted: #7a7fa3;
  font-family:
    Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui,
    sans-serif;
  color: var(--pem-ink);
}

.pem-container {
  width: calc(100% - 28px);
  margin: 0 auto;
}

.pem-page em {
  font-style: normal;
}

/* 入场动画（移动独立 observer 命中后加 .pem-visible） */
.pem-animate {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}
.pem-animate.pem-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===== 1. Banner（背景图按普通图片放顶部，高度自适应，不沿用 PC 的 530）===== */
.pem-banner {
  overflow: hidden;
  padding: 0 0 44px;
  background: linear-gradient(160deg, #eef4ff 0%, #e4edff 52%, #f4f7fd 100%);
}
/* 画布 1437×530，实测内容横向 351~1434、中心在 62.1% 处，
   所以整幅等比显示必然偏右；放大 1.26 倍并左移 28.2%（0.621×1.26-0.5）使插画居中 */
.pem-banner-img {
  display: block;
  width: 126%;
  height: auto;
  margin-left: -28.2%;
}
.pem-banner-inner {
  position: relative;
  z-index: 2;
  padding-top: 10px;
  text-align: center;
}
.pem-banner-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 16px;
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(15, 98, 254, 0.08);
  font-size: 12px;
  line-height: 18px;
  color: var(--pem-blue);
}
.pem-banner-badge i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--pem-blue);
}
.pem-banner-title {
  margin: 0 0 12px;
  font-size: 30px;
  line-height: 40px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--pem-blue);
}
.pem-banner-subtitle {
  margin: 0 0 10px;
  font-size: 16px;
  line-height: 26px;
  font-weight: 600;
  color: #0f172a;
}
.pem-banner-desc {
  margin: 0 0 22px;
  font-size: 14px;
  line-height: 24px;
  color: #51565d;
}
.pem-banner-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}
.pem-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px 22px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  text-decoration: none;
  transition:
    translate 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;
}
.pem-btn-primary {
  border: 1px solid var(--pem-blue);
  background: var(--pem-blue);
  color: #fff;
  box-shadow: 0px 10px 24px -12px rgba(15, 98, 254, 0.7);
}
.pem-btn-outline {
  border: 1px solid rgba(15, 98, 254, 0.35);
  background: rgba(255, 255, 255, 0.7);
  color: var(--pem-blue);
}
.pem-btn:active {
  translate: 0 1px;
}
.pem-banner-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
}
.pem-banner-tags li {
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(15, 98, 254, 0.1);
  font-size: 12px;
  line-height: 18px;
  color: var(--pem-blue);
}

/* ===== 2. 页内锚点导航（sticky + 单行横滑）===== */
.pem-nav {
  position: sticky;
  top: 76px;
  z-index: 15;
  width: 100%;
  background: #f9fafb;
  border-bottom: 1px solid #eaecf0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
/* 页眉在 ≤560px 时高 66px（main.css 改写了 .nav-wrap 高度），导航 top 必须跟着降，否则贴不紧 */
@media (max-width: 560px) {
  .pem-nav {
    top: 66px;
  }
}
.pem-nav-scroll {
  display: flex;
  gap: 22px;
  padding: 0 14px;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.pem-nav-scroll::-webkit-scrollbar {
  display: none;
}
.pem-nav-tab {
  position: relative;
  flex: none;
  padding: 11px 0;
  font-size: 14px;
  line-height: 18px;
  white-space: nowrap;
  color: #526580;
  text-decoration: none;
  scroll-snap-align: center;
  transition: color 0.25s ease;
}
.pem-nav-tab-active {
  font-weight: 700;
  color: var(--pem-blue);
}
.pem-nav-tab-active::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 4px;
  width: 20px;
  height: 2px;
  border-radius: 2px;
  background: var(--pem-blue);
  transform: translateX(-50%);
}

/* ===== 3. 关于我们 ===== */
.pem-about {
  padding: 40px 0 44px;
  background: #fff;
}
.pem-sec-title {
  margin: 0 0 24px;
  font-size: 24px;
  line-height: 34px;
  font-weight: 600;
  text-align: center;
  color: var(--pem-ink);
}
.pem-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 12px;
  margin-bottom: 32px;
  padding: 20px 14px;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 2px 40px -8px rgba(61, 74, 199, 0.08);
}
.pem-stat {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.pem-stat img {
  flex: none;
  width: 44px;
  height: auto;
  object-fit: contain;
}
.pem-stat-text {
  min-width: 0;
}
.pem-stat-v {
  margin: 0;
  font-size: 26px;
  line-height: 34px;
  font-weight: 700;
  color: var(--pem-blue);
}
.pem-stat-v i {
  margin-left: 2px;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  color: #475569;
}
.pem-stat-l {
  margin: -6px 0 0;
  font-size: 13px;
  line-height: 22px;
  color: var(--pem-muted);
}
.pem-sub-title {
  margin: 0 0 12px;
  font-size: 18px;
  line-height: 28px;
  font-weight: 600;
  color: var(--pem-ink);
}
.pem-intro {
  margin-bottom: 28px;
}
.pem-intro-para {
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 26px;
  color: var(--pem-body);
  text-align: justify;
}
.pem-intro-para:last-child {
  margin-bottom: 0;
}
.pem-intro-para em {
  font-weight: 600;
  color: var(--pem-blue);
}
.pem-position-title {
  color: var(--pem-blue);
}
.pem-position-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.pem-position-card {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  padding: 16px;
  border: 1px solid #edf1f6;
  border-radius: 12px;
  background: #f5f8fb;
}
.pem-position-card img {
  flex: none;
  width: 40px;
  height: auto;
  object-fit: contain;
}
.pem-position-card p {
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  color: var(--pem-ink);
}
@media (max-width: 560px) {
  .pem-position-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* ===== 4. 核心优势（bg1 为柔光底图，铺满后单列堆叠卡片）===== */
.pem-adv {
  position: relative;
  overflow: hidden;
  padding: 40px 0 44px;
  background: linear-gradient(180deg, #f3f7ff 0%, #e9f0ff 100%);
}
.pem-adv-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  pointer-events: none;
}
.pem-adv-inner {
  position: relative;
  z-index: 1;
}
.pem-adv-head {
  text-align: center;
}
.pem-adv-title {
  margin: 0;
  font-size: 24px;
  line-height: 34px;
  font-weight: 600;
  color: var(--pem-ink);
}
.pem-title-bar {
  display: block;
  width: 44px;
  height: 4px;
  margin: 12px auto 0;
  border-radius: 999px;
  background: linear-gradient(90deg, #4a6cf7 0%, #8c5cf6 100%);
}
.pem-adv-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 26px;
}
.pem-adv-card {
  padding: 18px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0px 16px 40px -12px rgba(61, 74, 199, 0.12);
}
.pem-adv-card-head {
  display: flex;
  align-items: center;
  gap: 8px;
}
.pem-adv-card-head img {
  flex: none;
  width: 44px;
  height: auto;
  object-fit: contain;
}
.pem-adv-card-head h3 {
  margin: 0;
  font-size: 17px;
  line-height: 26px;
  font-weight: 600;
  color: var(--pem-blue);
}
.pem-adv-desc {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 26px;
  color: var(--pem-ink);
  text-align: justify;
}
.pem-adv-points {
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}
.pem-adv-points li {
  position: relative;
  padding-left: 12px;
  font-size: 13px;
  line-height: 24px;
  color: var(--pem-muted);
}
.pem-adv-points li + li {
  margin-top: 2px;
}
.pem-adv-points li::before {
  content: "";
  position: absolute;
  top: 11px;
  left: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--pem-muted);
}
.pem-adv-points-plain li {
  padding-left: 0;
}
.pem-adv-points-plain li::before {
  display: none;
}

/* ===== 5. 生态体系（三块纵向平铺，蓝底面板 + 白色内容块）===== */
.pem-eco {
  padding: 40px 0 44px;
  background: #fff;
}
.pem-eco-head {
  margin-bottom: 20px;
}
.pem-eco-title {
  margin: 0;
  font-size: 22px;
  line-height: 32px;
  font-weight: 600;
  color: var(--pem-ink);
}
.pem-title-bar-left {
  margin-left: 0;
}
.pem-eco-sub {
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 22px;
  color: var(--pem-muted);
}
.pem-panel {
  position: relative;
  overflow: hidden;
  margin-top: 12px;
  border-radius: 12px;
  /* 实测 box3-bg1~3 共用同一纵向色阶（仅顶部起色微差），移动端直接用渐变 */
  background: linear-gradient(
    180deg,
    var(--pem-panel-top, #2570fe) 0%,
    #3a7efe 10%,
    #548ffe 25%,
    #7ba8fe 40%,
    #8eb4fe 50%,
    #a3c2fe 60%,
    #bfd4fe 75%,
    #dde7fe 90%,
    #eff2fe 100%
  );
}
/* 三块面板顶部起色（取自 box3-bg1/2/3 顶边取样） */
.pem-eco-item-0 {
  --pem-panel-top: #2570fe;
}
.pem-eco-item-1 {
  --pem-panel-top: #1e6cfe;
}
.pem-eco-item-2 {
  --pem-panel-top: #1f6cfe;
}
.pem-eco-item + .pem-eco-item {
  margin-top: 20px;
}
/* 概览卡：复用 PC 未高亮态样式 */
.pem-eco-card {
  padding: 18px 14px;
  border: 1px solid #dbdbdb;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 2px 40px -8px rgba(61, 74, 199, 0.08);
}
.pem-eco-card h3 {
  margin: 0 0 10px;
  font-size: 17px;
  line-height: 26px;
  font-weight: 600;
  color: var(--pem-ink);
}
.pem-eco-card p {
  margin: 0;
  font-size: 13px;
  line-height: 24px;
  color: #5c5c5c;
  text-align: justify;
  white-space: pre-line;
}
.pem-panel-inner {
  position: relative;
  z-index: 1;
  padding: 20px 12px 22px;
}
.pem-panel-title {
  margin: 0;
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
  text-align: center;
  color: #fff;
}
.pem-panel-lead {
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  white-space: pre-line;
}
/* 面板内的白色内容块（沿用 PC 的 #FCFCFF / 圆角 8） */
.pem-panel-card {
  margin-top: 16px;
  padding: 14px 12px;
  border-radius: 8px;
  background: #fcfcff;
}

/* 5.1 一套智库引擎 */
.pem-engine-map {
  display: block;
  width: 100%;
  height: auto;
}
.pem-engine-stats {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid #eaeeff;
}
.pem-engine-stat-v {
  margin: 0;
  font-size: 22px;
  line-height: 30px;
  font-weight: 700;
  color: var(--pem-blue);
}
.pem-engine-stat-v i {
  margin-left: 2px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  color: #475569;
}
.pem-engine-stat-l {
  margin: -4px 0 0;
  font-size: 12px;
  line-height: 20px;
  color: #51565d;
}
.pem-engine-subs {
  margin-top: 16px;
}
.pem-engine-sub + .pem-engine-sub {
  margin-top: 14px;
}
.pem-engine-sub h4 {
  margin: 0 0 4px;
  font-size: 15px;
  line-height: 24px;
  font-weight: 600;
  color: var(--pem-ink);
}
.pem-engine-sub p {
  margin: 0;
  font-size: 13px;
  line-height: 24px;
  color: var(--pem-body);
  text-align: justify;
}
.pem-engine-show {
  margin-top: 16px;
  text-align: center;
}
.pem-engine-show img {
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
}
.pem-engine-show span {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  line-height: 20px;
  color: #51565d;
}

/* 5.2 三大服务体系 */
.pem-svc-group {
  --pem-accent: #0f62fe;

  margin-top: 16px;
}
/* 区域主题色跟随 PC（蓝 / 紫 / 青靛） */
.pem-svc-group.pe-svc-group-purple {
  --pem-accent: #7c5bf0;
}
.pem-svc-group.pe-svc-group-indigo {
  --pem-accent: #4e5be4;
}
.pem-svc-group .pem-panel-card {
  margin-top: 0;
}
.pem-svc-title {
  display: flex;
  align-items: center;
  margin: 0 0 6px;
  font-size: 16px;
  line-height: 26px;
  font-weight: 600;
  color: var(--pem-ink);
}
.pem-svc-title::before {
  content: "";
  flex: none;
  width: 2px;
  height: 16px;
  margin-right: 8px;
  border-radius: 999px;
  background: var(--pem-accent);
}
.pem-svc-desc {
  margin: 0 0 12px;
  font-size: 12px;
  line-height: 22px;
  color: var(--pem-body);
  text-align: justify;
}
.pem-svc-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pem-svc-item {
  padding: 12px;
  border: 1px solid #e6ebff;
  border-radius: 6px;
  background: #f6f8ff;
}
.pem-svc-item h5 {
  margin: 0 0 4px;
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  color: var(--pem-accent);
}
.pem-svc-item p {
  margin: 0;
  font-size: 13px;
  line-height: 22px;
  color: var(--pem-body);
  text-align: justify;
}
/* 五图：一行两张，不滚动 */
.pem-svc-imgs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-top: 10px;
}
.pem-svc-imgs img {
  display: block;
  width: 100%;
  aspect-ratio: 200 / 120;
  object-fit: cover;
}

/* 5.3 数智AI中枢 */
.pem-ai-block + .pem-ai-block {
  margin-top: 12px;
}
.pem-ai-sub {
  margin: 0 0 12px;
  font-size: 16px;
  line-height: 26px;
  font-weight: 600;
  color: var(--pem-ink);
}
.pem-ai-sub-indigo {
  color: var(--pem-indigo);
}
.pem-ai-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pem-ai-item {
  padding: 12px;
  border: 1px solid #e6ebff;
  border-radius: 6px;
  background: #f6f8ff;
}
.pem-ai-item h5 {
  margin: 0 0 4px;
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  color: var(--pem-blue);
}
.pem-ai-item p {
  margin: 0;
  font-size: 13px;
  line-height: 22px;
  color: var(--pem-body);
  text-align: justify;
}
.pem-ai-pano-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.pem-ai-pano {
  display: flex;
  align-items: center;
  gap: 10px;
}
.pem-ai-pano img {
  flex: none;
  width: 40px;
  height: 40px;
  object-fit: contain;
}
.pem-ai-pano-text b {
  display: block;
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  color: var(--pem-ink);
}
.pem-ai-pano-text span {
  display: block;
  font-size: 13px;
  line-height: 22px;
  color: var(--pem-body);
}
.pem-ai-scene {
  margin: 0 0 12px;
  font-size: 13px;
  line-height: 24px;
  color: var(--pem-body);
  text-align: justify;
}
/* 大图与小图按 249 : 192 等比分配，保留 PC 的 6 / 8 间距关系 */
.pem-ai-imgs {
  display: grid;
  grid-template-columns: 249fr 192fr;
  gap: 6px;
}
.pem-ai-big {
  display: block;
  width: 100%;
  aspect-ratio: 249 / 214;
  object-fit: cover;
}
.pem-ai-smalls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 95fr 113fr;
  gap: 8px;
}
.pem-ai-smalls img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ============================================================
   平板区间（851~1024px）：PC 版防溢出补丁
   仅新增覆盖，不改任何现有 PC 规则；>1024px 完全不受影响
   ============================================================ */
@media (min-width: 851px) and (max-width: 1024px) {
  /* 四个数据块：收窄间距并允许换行，避免撑破容器 */
  .pe-stats {
    flex-wrap: wrap;
    gap: 24px 40px;
    padding: 22px 24px 18px;
  }
  /* 生态面板与成果区背景图随视口缩放，避免右侧被裁后展示台偏离中心 */
  .pe-engine-inner,
  .pe-services-inner,
  .pe-aihub-inner {
    padding-left: 20px;
    padding-right: 20px;
  }
  .pe-honor-bg {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
  }
  .pe-honor-gutter {
    display: none;
  }
  .pe-media-imgs {
    width: 100%;
  }
}

/* ===== 6. 成果展示区 ===== */
.pem-honor {
  padding: 36px 0 44px;
  background: #f6f8ff;
}
.pem-honor-title {
  margin-bottom: 0;
}
/* 展示台图（含四本证书与底部标签）整幅居中展示，不再用绝对定位背景 */
.pem-honor-img {
  display: block;
  width: 100%;
  height: auto;
  margin-top: 16px;
}
.pem-sub-center {
  text-align: center;
}
.pem-honor-qual {
  margin-top: 26px;
}
/* 核心资质：移动端不做胶囊，改为两列“小圆点 + 文字”列表，长名称自然换行 */
.pem-qual-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 10px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}
.pem-qual-list li {
  display: flex;
  align-items: flex-start;
  font-size: 13px;
  line-height: 22px;
  color: #1a5fa8;
}
.pem-qual-list li i {
  flex: none;
  width: 4px;
  height: 4px;
  margin: 9px 8px 0 0;
  border-radius: 50%;
  background: #1a5fa8;
}
.pem-honor-media {
  margin-top: 28px;
}
.pem-media-lead {
  margin: 0;
  font-size: 13px;
  line-height: 24px;
  color: var(--pem-body);
  text-align: justify;
}
.pem-media-list {
  margin: 12px 0 16px;
  padding: 0;
  list-style: none;
}
.pem-media-list li {
  position: relative;
  padding-left: 12px;
  font-size: 13px;
  line-height: 24px;
  color: var(--pem-body);
  text-align: justify;
}
.pem-media-list li + li {
  margin-top: 8px;
}
.pem-media-list li::before {
  content: "";
  position: absolute;
  top: 10px;
  left: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--pem-body);
}
/* 六图：一行两张 */
.pem-media-imgs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}
.pem-media-imgs img {
  display: block;
  width: 100%;
  aspect-ratio: 240 / 150;
  object-fit: cover;
}

/* ===== 7. 合作布局区（高度改为内容自适应；圆圈按 PC 几何等比缩 0.55）===== */
.pem-coop {
  position: relative;
  overflow: hidden;
  padding: 36px 0;
  background: linear-gradient(125deg, #003399 0%, #0052d9 40%, #1677ff 100%);
}
.pem-coop-deco {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.pem-coop-circle {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
}
.pem-coop-circle-tr {
  width: 180px;
  height: 180px;
  top: -63px;
  right: -63px;
  animation: pe-coop-float 7s ease-in-out infinite;
}
.pem-coop-circle-bl {
  width: 126px;
  height: 126px;
  bottom: -49px;
  left: -22px;
  animation: pe-coop-float 6s ease-in-out 1s infinite;
}
.pem-coop-inner {
  position: relative;
  z-index: 2;
  text-align: center;
}
.pem-coop-title {
  margin: 0;
  font-size: 22px;
  line-height: 32px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #fff;
}
.pem-coop-desc {
  margin: 10px 0 0;
  font-size: 13px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.9);
}
.pem-coop-desc + .pem-coop-desc {
  margin-top: 0;
}
.pem-coop-actions {
  display: flex;
  gap: 10px;
  margin-top: 22px;
}
.pem-coop-btn {
  flex: 1 1 0;
  min-width: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 44px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition:
    translate 0.25s ease,
    background 0.25s ease;
}
.pem-coop-btn img {
  flex: none;
  width: 18px;
  height: 18px;
  object-fit: contain;
}
.pem-coop-btn:active {
  translate: 0 1px;
}
.pem-coop-btn-light {
  background: #fff;
  color: var(--pem-blue);
}
.pem-coop-btn-ghost {
  border: 1px solid rgba(255, 255, 255, 0.45);
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
}
</style>
