<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

// @ts-ignore
useSeoMeta({
  title: "人事考试服务｜中测高科",
  description:
    "中测高科一站式企事业单位招考服务平台，为政府人社部门、事业单位及国有企业提供从考试报名、资格审核到成绩管理的全流程数字化解决方案，让考务工作更安全、更高效。",
});

// ===== 线上图片资源 =====
const IMG =
  "https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/hubImages/personexam";

// ===== 按钮跳转 =====
// 申请免费试用：人事考试体验系统（新窗口）
const trialUrl = "https://zk-hrm.oss-cn-hangzhou.aliyuncs.com/index.php";
// 立即咨询：获取方案页，预选“人事考试服务”= 20
// @ts-ignore
const source = useCampaignSource();
// @ts-ignore
const contactRoute = computed(() => getContactRoute(20, source.value));

// ===== 1. Banner =====
const bannerBadge = "中国人事考试安全交付领导品牌";
const bannerTitle = "一站式企事业单位招考服务平台";
const bannerDesc =
  "人事考试报名系统为政府人社部门、事业单位及国有企业提供从考试报名、资格审核到成绩管理的全流程数字化解决方案，让考务工作更安全、更高效。";

// ===== 2. 关于企事业单位招考服务平台 =====
const aboutIntro =
  "中测高科（北京）信息技术有限公司成立于2015年，专注于人事考试领域，为全国客户提供安全、高效的一站式考务服务平台。";
const aboutMgmtTitle = "全流程数字化考务管理";
const aboutMgmtParas = [
  "中测网上报名是一套完整的考试报名平台，覆盖从考试通知、在线报名、资格审核、准考证生成、考务管理到成绩查询、统计报表的全流程。系统完善的考试流程，减少出错概率和无效工作，有利于提高工作效率。",
  "平台支持多种合作模式，兼顾成本控制、灵活性、安全性和系统扩展性，适合不同规模与行业特性的客户选择。",
];
const aboutTags = ["标准化服务", "定制化开发", "私有化部署"];

const featureMain = {
  title: "稳定性和快速部署",
  desc: "企事业单位招考服务平台系统为 SaaS 平台，支持即用即付。平台软硬件及数据均由我方统一运维，保障系统可用与数据安全，客户可低成本快速上线。 系统采用集群部署与弹性伸缩架构，年服务超千场报名、百万考生，单场峰值近十万人，适配各类规模报名场景，稳定可靠。",
};
const featureCards = [
  {
    title: "数据安全性设计",
    desc: "考生信息的加密存储，确保信息的安全不泄露。",
  },
  {
    title: "报名表可自由设计",
    desc: "报名表可自由设计，报名规则可根据岗位设置，支持各种复杂的规模，可实现专业的自动审核。",
  },
  {
    title: "准考证可支持在考生打印时动态编排",
    desc: "准考证可支持在考生打印时动态编排，不打印准考证的考生将不分配考场和座位。节省考试资源。准考证动态编排支持当场考试多学科等复杂情况。",
  },
];

// ===== 产品功能轮播 =====
const funcSlides = [
  {
    no: "01",
    text: "考生注册报名、缴费、岗位取消后的改报、打印笔试准考证、面试通知单、体能测试通知单、在线退费申请、成绩查询、忘记密码找回",
  },
  {
    no: "02",
    text: "报名表可定制、多种填写类型（单行填写框、下拉选项、表格等）、上传证明材料文件、报名信息自动校验（如：根据公告和岗位要求限制报名人员的年龄、学历等...）、白名单报名（名单内人员可报名）、笔试确认、报名提交的照片可以人像判断、支持姓名身份证号码联网认证、审核结果可通过微信提醒考生。",
  },
  {
    no: "03",
    text: "发布公告通知、准考证打印前可设置弹窗提示、后台统计报名人数、可实时公开、定时公开、不公开报名人数。",
  },
  {
    no: "04",
    text: "资格审核支持单人审核和二级审核、可以分配不同的审核角色（审核员、管理员、考务员等）、支持自动审核（需设置规则）。",
  },
  {
    no: "05",
    text: "可以按岗位或者科目编排准考证、或者动态分配准考证号以节省考场数、准考证编排结束后可以直接生成座次表、桌贴、门贴；面试可以生成面试底卡供考生签字。",
  },
  {
    no: "06",
    text: "线下报名的考试也可以根据提供的考生数据导入到系统实现AI审核与在线打印笔试准考证。",
  },
];
const AUTOPLAY_MS = 4000;
const activeSlide = ref(0);
const slideCount = funcSlides.length;
const isFirstSlide = computed(() => activeSlide.value === 0);
const isLastSlide = computed(() => activeSlide.value === slideCount - 1);
let slideTimer: ReturnType<typeof setInterval> | null = null;

const goSlide = (i: number) => {
  activeSlide.value = Math.min(Math.max(i, 0), slideCount - 1);
  restartAutoplay();
};
const prevSlide = () => {
  if (isFirstSlide.value) return;
  goSlide(activeSlide.value - 1);
};
const nextSlide = () => {
  if (isLastSlide.value) return;
  goSlide(activeSlide.value + 1);
};
// 自动播放：到最后一张后回到第一张；手动操作后重新计时
const restartAutoplay = () => {
  if (slideTimer) clearInterval(slideTimer);
  slideTimer = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % slideCount;
  }, AUTOPLAY_MS);
};

// ===== 3. 为什么选择 =====
const whySub =
  "成熟的开发对接流程、完善的功能体系、全天候的售后服务，为每一次人事考试保驾护航。";
const whyCards = [
  {
    icon: `${IMG}/box2-icon1.png`,
    title: "安全合规",
    desc: "通过等保三级认证与ISO27001认证，考生数据全程加密存储，满足政府及大型机构的数据安全要求。",
  },
  {
    icon: `${IMG}/box2-icon2.png`,
    title: "高效稳定",
    desc: "系统架构支持高并发报名场景，自动化审核与智能编排减少人工干预，确保考试流程顺畅运行。",
  },
  {
    icon: `${IMG}/box2-icon3.png`,
    title: "灵活扩展",
    desc: "提供标准化、定制化、私有化部署等多种合作模式，开放接口支持与第三方系统无缝对接。",
  },
  {
    icon: `${IMG}/box2-icon4.png`,
    title: "全程服务",
    desc: "7×24小时全天候技术支持，定期巡检与客户满意度调查，快速响应的现场技术保障。",
  },
];
const whyStats = [
  { icon: `${IMG}/box2-icon5.png`, label: "等保三级认证" },
  { icon: `${IMG}/box2-icon6.png`, label: "ISO27001 认证" },
  { icon: `${IMG}/box2-icon7.png`, label: "7×24小时服务" },
];

// ===== 4. 完善的考务功能体系 =====
const capSub =
  "一套完整的报名平台，满足大部分客户与用户需求，覆盖考试全生命周期的每个环节。";
const capCards = [
  {
    icon: `${IMG}/box3-icon1.png`,
    title: "考试管理",
    desc: "同一主体可管理多场考试，配置不同条件，查看各考试数据。每一场考试都可以自定义配置，互不影响。",
  },
  {
    icon: `${IMG}/box3-icon2.png`,
    title: "数据共享",
    desc: "报名模板、笔试准考证、面试准考证、门贴、桌贴，一次创建多次使用，提高考务人员工作效率。",
  },
  {
    icon: `${IMG}/box3-icon3.png`,
    title: "多种审核方式",
    desc: "支持职位审核、信息审核、资格审核、视频审核、面试资格等多种审核方式，满足不同场景需求，灵活配置。",
  },
  {
    icon: `${IMG}/box3-icon4.png`,
    title: "准考证管理",
    desc: "自定义配置准考证模板，支持编排和打印。提供门贴、桌贴、留验单、指引单等多种打印业务。",
  },
  {
    icon: `${IMG}/box3-icon5.png`,
    title: "成绩查询",
    desc: "支持笔试成绩和面试成绩的录入、查询与导出，提供评委评分模板和面试成绩统计模板。",
  },
  {
    icon: `${IMG}/box3-icon6.png`,
    title: "统计报表与对账",
    desc: "内置对账中心模板与统计报表功能，实时掌握报名数据、缴费情况，支持多维度数据分析。",
  },
];

// ===== 5. 权威认证，值得信赖 =====
const certSub =
  "中测高科通过多项国家级安全与质量认证，为每一位考生的数据安全提供坚实保障。";
const certCards = [
  {
    title: "等保三级认证",
    desc: "通过国家信息安全等级保护三级认证，满足政府及大型企事业单位的数据安全合规要求。",
  },
  {
    title: "ISO27001 认证",
    desc: "国际信息安全管理体系认证，建立系统化的信息安全管理框架，保障数据全生命周期安全。",
  },
  {
    title: "专业技术团队",
    desc: "拥有多年人事考试系统开发经验的成熟技术团队，涵盖产品经理、前后端工程师、测试工程师等完整角色。",
  },
];

// ===== 6. 全国各城市考试案例 =====
const caseSub =
  "不同时间、地点、考试，涉及全国各地考试业务。2024年度考生报名总人数达39万人次。";
const caseStatDesc =
  "中测人事考试服务系统已覆盖全国30余个省市的人事考试业务，累计服务考生超过500万人次。从大型三甲医院招聘到事业单位招聘、风景名胜区管理处公开招聘，平台在高并发、大规模报名场景下保持稳定运行。";
const caseNote =
  "以下为近期部分典型服务案例，展示平台在不同地区、不同类型考试中的交付能力。";
const caseList = [
  {
    img: `${IMG}/box5-img1.png`,
    title: "国家发改委-事业编招聘考试",
    date: "2022-12-23",
    count: 8734,
    place: "贵州遵义",
  },
  {
    img: `${IMG}/box5-img2.png`,
    title: "内蒙古电力集团内部招聘",
    date: "2024-3-31",
    count: 17757,
    place: "内蒙古",
  },
  {
    img: `${IMG}/box5-img3.png`,
    title: "山东泰安市岱岳区引进优秀青年人才",
    date: "2024-6-7",
    count: 13170,
    place: "山东泰安",
  },
  {
    img: `${IMG}/box5-img4.png`,
    title: "海南省2023年事业单位招聘考试",
    date: "2024-1-1",
    count: 12892,
    place: "海南",
  },
];

// ===== 滚动入场动画 =====
const pageRef = ref<HTMLElement>();
let enterObserver: IntersectionObserver | null = null;

const collectAnimate = () => {
  if (!pageRef.value || !enterObserver) return;
  pageRef.value
    .querySelectorAll<HTMLElement>(".px-animate:not(.px-visible)")
    .forEach((el) => enterObserver?.observe(el));
};

onMounted(() => {
  if (pageRef.value) {
    enterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("px-visible");
            enterObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    collectAnimate();
  }
  restartAutoplay();
});

onBeforeUnmount(() => {
  if (slideTimer) clearInterval(slideTimer);
});
</script>

<template>
  <div ref="pageRef" class="px-page">
    <!-- ========== 1. Banner 区 ========== -->
    <section class="px-banner">
      <img class="px-banner-bg" :src="`${IMG}/banner-bg.png`" alt="" />
      <div class="px-container px-banner-inner">
        <p class="px-banner-badge px-animate">
          <img :src="`${IMG}/banner-icon1.png`" alt="" width="20" height="18" />
          {{ bannerBadge }}
        </p>
        <h1 class="px-banner-title px-animate">{{ bannerTitle }}</h1>
        <p class="px-banner-desc px-animate">{{ bannerDesc }}</p>
        <div class="px-banner-actions px-animate">
          <a
            class="px-btn px-btn-primary"
            :href="trialUrl"
            target="_blank"
            rel="noopener"
          >
            申请免费试用
            <img
              :src="`${IMG}/banner-icon2.png`"
              alt=""
              width="16"
              height="16"
            />
          </a>
          <NuxtLink class="px-btn px-btn-outline" :to="contactRoute">
            立即咨询详情
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ========== 2. 关于企事业单位招考服务平台 ========== -->
    <section class="px-about">
      <img class="px-about-bg" :src="`${IMG}/box1-bg.png`" alt="" />
      <!-- 宽屏（>1440）时 1440 画布以外的左右留白：用取色融合带续上底图边缘色 -->
      <div class="px-about-gutter px-about-gutter-l" aria-hidden="true"></div>
      <div class="px-about-gutter px-about-gutter-r" aria-hidden="true"></div>
      <div class="px-container px-about-inner">
        <h2 class="px-sec-title px-animate">关于企事业单位招考服务平台</h2>

        <div class="px-about-body">
          <div class="px-about-left px-animate">
            <p class="px-about-intro">{{ aboutIntro }}</p>
            <h3 class="px-sub-title">{{ aboutMgmtTitle }}</h3>
            <p v-for="(p, i) in aboutMgmtParas" :key="i" class="px-about-para">
              {{ p }}
            </p>
            <ul class="px-about-tags">
              <li v-for="t in aboutTags" :key="t">{{ t }}</li>
            </ul>
          </div>

          <div class="px-about-right px-animate">
            <h3 class="px-sub-title">产品特点</h3>
            <div class="px-feature-main">
              <h4>{{ featureMain.title }}</h4>
              <p>{{ featureMain.desc }}</p>
            </div>
            <div class="px-feature-grid">
              <div
                v-for="f in featureCards"
                :key="f.title"
                class="px-feature-card"
              >
                <h4>{{ f.title }}</h4>
                <p>{{ f.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 产品功能轮播 -->
        <div class="px-func px-animate">
          <h3 class="px-func-title">产品功能</h3>
          <div class="px-func-body">
            <div class="px-laptop">
              <img
                class="px-laptop-frame"
                :src="`${IMG}/box1-bg1.png`"
                alt=""
              />
              <img
                v-for="(s, i) in funcSlides"
                :key="s.no"
                class="px-laptop-screen"
                :class="{ 'px-laptop-screen-on': i === activeSlide }"
                :src="`${IMG}/box1-img${i + 1}.png`"
                :alt="`产品功能 ${s.no}`"
              />
            </div>

            <div class="px-func-side">
              <div class="px-func-view">
                <div
                  class="px-func-track"
                  :style="{ transform: `translateX(-${activeSlide * 100}%)` }"
                >
                  <div v-for="s in funcSlides" :key="s.no" class="px-func-card">
                    <b>{{ s.no }}</b>
                    <p>{{ s.text }}</p>
                  </div>
                </div>
              </div>

              <div class="px-func-controls">
                <ul class="px-func-dots">
                  <li
                    v-for="(s, i) in funcSlides"
                    :key="s.no"
                    :class="{ 'px-func-dot-on': i === activeSlide }"
                    @click="goSlide(i)"
                  >
                    {{ s.no }}
                  </li>
                </ul>
                <div class="px-func-arrows">
                  <button
                    type="button"
                    class="px-func-arrow"
                    :disabled="isFirstSlide"
                    @click="prevSlide"
                  >
                    <img
                      :src="`${IMG}/${isFirstSlide ? 'box1-lbtn' : 'box1-lbtn-act'}.png`"
                      alt="上一张"
                      width="32"
                      height="32"
                    />
                  </button>
                  <button
                    type="button"
                    class="px-func-arrow"
                    :disabled="isLastSlide"
                    @click="nextSlide"
                  >
                    <img
                      :src="`${IMG}/${isLastSlide ? 'box1-rbtn' : 'box1-rbtn-act'}.png`"
                      alt="下一张"
                      width="32"
                      height="32"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 3. 为什么选择企事业单位招考服务系统 ========== -->
    <section class="px-why">
      <img class="px-why-bg" :src="`${IMG}/box2-bg.png`" alt="" />
      <!-- 宽屏（>1440）时画布以外的左右留白：续上 box2-bg 左/右缘实测色 -->
      <div class="px-why-gutter px-why-gutter-l" aria-hidden="true"></div>
      <div class="px-why-gutter px-why-gutter-r" aria-hidden="true"></div>
      <div class="px-container px-why-inner">
        <h2 class="px-sec-title px-animate">
          为什么选择企事业单位招考服务系统
        </h2>
        <p class="px-sec-sub px-animate">{{ whySub }}</p>

        <div class="px-why-grid">
          <article
            v-for="(c, i) in whyCards"
            :key="c.title"
            class="px-why-card px-animate"
            :style="{ '--px-delay': i * 0.1 + 's' }"
          >
            <img :src="c.icon" :alt="c.title" width="72" height="72" />
            <h3>{{ c.title }}</h3>
            <p>{{ c.desc }}</p>
          </article>
        </div>

        <ul class="px-why-stats px-animate">
          <li v-for="s in whyStats" :key="s.label">
            <img :src="s.icon" alt="" width="18" height="18" />
            {{ s.label }}
          </li>
        </ul>
      </div>
    </section>

    <!-- ========== 4. 完善的考务功能体系 ========== -->
    <section class="px-cap">
      <div class="px-container">
        <h2 class="px-sec-title px-animate">完善的考务功能体系</h2>
        <p class="px-sec-sub px-animate">{{ capSub }}</p>

        <div class="px-cap-grid">
          <article
            v-for="(c, i) in capCards"
            :key="c.title"
            class="px-cap-card px-animate"
            :style="{ '--px-delay': (i % 3) * 0.1 + 's' }"
          >
            <img :src="c.icon" :alt="c.title" width="48" height="48" />
            <h3>{{ c.title }}</h3>
            <p>{{ c.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ========== 5. 权威认证，值得信赖 ========== -->
    <section class="px-cert">
      <img class="px-cert-bg" :src="`${IMG}/box4-bg.png`" alt="" />
      <!-- 宽屏（>1440）时画布以外的左右留白：续上 box4-bg 左/右缘实测色 -->
      <div class="px-cert-gutter px-cert-gutter-l" aria-hidden="true"></div>
      <div class="px-cert-gutter px-cert-gutter-r" aria-hidden="true"></div>
      <div class="px-container px-cert-inner">
        <h2 class="px-sec-title px-animate">权威认证，值得信赖</h2>
        <p class="px-sec-sub px-animate">{{ certSub }}</p>

        <div class="px-cert-grid">
          <article
            v-for="(c, i) in certCards"
            :key="c.title"
            class="px-cert-card px-animate"
            :style="{ '--px-delay': i * 0.1 + 's' }"
          >
            <img
              :src="`${IMG}/box4-icon.png`"
              :alt="c.title"
              width="158"
              height="100"
            />
            <h3>{{ c.title }}</h3>
            <p>{{ c.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- ========== 6. 全国各城市考试案例 ========== -->
    <section class="px-case">
      <div class="px-container">
        <h2 class="px-sec-title px-animate">全国各城市考试案例</h2>
        <p class="px-sec-sub px-animate">{{ caseSub }}</p>

        <div class="px-case-stat px-animate">
          <div class="px-case-stat-num">
            <span v-count-up="39">39</span><i>万</i>
          </div>
          <p class="px-case-stat-label">2024年度报名总人次</p>
          <p class="px-case-stat-desc">{{ caseStatDesc }}</p>
        </div>

        <p class="px-case-note px-animate">{{ caseNote }}</p>

        <div class="px-case-grid">
          <article
            v-for="(c, i) in caseList"
            :key="c.title"
            class="px-case-card px-animate"
            :style="{ '--px-delay': (i % 2) * 0.1 + 's' }"
          >
            <img :src="c.img" :alt="c.title" width="223" height="125" />
            <div class="px-case-info">
              <h3>{{ c.title }}</h3>
              <ul class="px-case-meta">
                <li>
                  <img
                    :src="`${IMG}/box5-icon1.png`"
                    alt=""
                    width="14"
                    height="14"
                  />
                  {{ c.date }}
                </li>
                <li class="px-case-count">
                  <img
                    :src="`${IMG}/box5-icon2.png`"
                    alt=""
                    width="14"
                    height="14"
                  />
                  <span v-count-up="c.count">{{ c.count }}</span
                  >人
                </li>
                <li>
                  <img
                    :src="`${IMG}/box5-icon3.png`"
                    alt=""
                    width="14"
                    height="14"
                  />
                  {{ c.place }}
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== 基础变量与容器（内容宽 1164，取自设计稿实测）===== */
.px-page {
  --px-blue: #0f62fe;
  --px-blue-deep: #1a6fb5;
  --px-ink: #1a2332;
  --px-body: #5a6b7f;
  --px-muted: #7a7fa3;
  font-family:
    Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui,
    sans-serif;
  color: var(--px-ink);
}
.px-container {
  width: min(1164px, calc(100% - 40px));
  margin: 0 auto;
}

/* ===== 滚动入场动画 ===== */
.px-animate {
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}
.px-animate.px-visible {
  opacity: 1;
  transform: translateY(0);
}
/* 入场（opacity/transform）与悬浮（translate/box-shadow/…）在同一元素上时，
   卡片自身的 transition 会整体覆盖 .px-animate 的声明（同优先级比源序），
   因此这里合并声明；错峰延迟只作用于 opacity/transform，悬浮响应保持即时 */
.px-feature-card,
.px-why-card,
.px-cap-card,
.px-cert-card,
.px-case-card {
  transition:
    opacity 0.7s ease var(--px-delay, 0s),
    transform 0.7s ease var(--px-delay, 0s),
    translate 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease,
    border-color 0.3s ease;
}

/* ===== 通用标题 ===== */
.px-sec-title {
  margin: 0;
  font-size: 36px;
  line-height: 50px;
  font-weight: 600;
  color: var(--px-ink);
}
.px-sec-sub {
  margin: 16px 0 0;
  font-size: 16px;
  line-height: 28px;
  color: var(--px-muted);
}
.px-sub-title {
  margin: 0 0 16px;
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
  color: var(--px-ink);
}

/* ===== 1. Banner 区（1440×539）===== */
.px-banner {
  position: relative;
  overflow: hidden;
  height: 539px;
  /* 底色：纵向为主（设计稿实测 TL #FCFDFE / TR #F6F8FA / BL #F3F7FB / BR #EAF2FA），
     右端加深用从 60% 才开始叠加的横向柔光层，避免画布右边界出现竖直硬边；
     横向的蓝主要由 banner-bg 自身递增的 alpha 提供 */
  background:
    linear-gradient(
      90deg,
      rgba(234, 242, 250, 0) 60%,
      rgba(234, 242, 250, 0.55) 100%
    ),
    linear-gradient(180deg, #fcfdfe 0%, #f8fafd 45%, #f3f7fb 100%);
}
.px-banner-bg {
  position: absolute;
  top: 0;
  /* 视口≤1440 时贴右缘；更宽时贴居中 1440 画布的右边界 */
  right: max(0px, calc((100% - 1440px) / 2));
  z-index: 0;
  width: 1440px;
  height: 539px;
  object-fit: cover;
  object-position: right;
  pointer-events: none;
}
.px-banner-inner {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  padding-top: 57px;
}
.px-banner-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 20px;
  padding: 11px 16px;
  border: 1px solid rgba(26, 111, 181, 0.1);
  border-radius: 100px;
  background: #e8f1fa;
  font-size: 14px;
  line-height: 22px;
  color: #1a6fb5;
}
.px-banner-badge img {
  width: 20px;
  height: 18px;
  object-fit: contain;
}
.px-banner-title {
  margin: 0;
  max-width: 440px;
  font-size: 48px;
  line-height: 64px;
  font-weight: 700;
  color: #1a2332;
}
.px-banner-desc {
  margin: 26px 0 0;
  max-width: 440px;
  font-size: 18px;
  line-height: 30px;
  color: #5a6b7f;
}
.px-banner-actions {
  display: flex;
  gap: 16px;
  margin-top: 40px;
}
.px-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 54px;
  padding: 0 28px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-decoration: none;
  transition:
    translate 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;
}
.px-btn img {
  width: 16px;
  height: 16px;
  object-fit: contain;
}
.px-btn:hover {
  translate: 0 -3px;
}
.px-btn-primary {
  background: var(--px-blue);
  color: #fff;
  box-shadow: 0px 10px 24px -10px rgba(15, 98, 254, 0.75);
}
.px-btn-outline {
  border: 1px solid #dde3ec;
  background: transparent;
  color: #1a2332;
}

/* ===== 2. 关于（整块 1147，底部背景图 box1-bg 1440×773）===== */
.px-about {
  position: relative;
  overflow: hidden;
  min-height: 1147px;
  padding: 72px 0 0;
  background: #fff;
}
.px-about-bg {
  position: absolute;
  bottom: 0;
  right: max(0px, calc((100% - 1440px) / 2));
  z-index: 0;
  width: 1440px;
  height: 773px;
  object-fit: cover;
  object-position: bottom;
  pointer-events: none;
}
.px-about-inner {
  position: relative;
  z-index: 1;
}
/* 左右融合带：宽屏时 1440 画布以外的留白。
   纵向按 box1-bg 左/右缘实测色（已折算为与白底合成后的值）复刻，
   横向用 mask 从贴图一侧向外淡出回底色，消除底图被裁切的竖直硬边 */
.px-about-gutter {
  position: absolute;
  bottom: 0;
  z-index: 0;
  width: max(0px, calc((100% - 1440px) / 2));
  height: 773px;
  pointer-events: none;
}
.px-about-gutter-l {
  left: 0;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #fefeff 15%,
    #fefefe 25%,
    #fdfdfe 50%,
    #fcfcff 75%,
    #f8f9ff 90%,
    #f5f8ff 100%
  );
  -webkit-mask-image: linear-gradient(270deg, #000 0%, transparent 100%);
  mask-image: linear-gradient(270deg, #000 0%, transparent 100%);
}
.px-about-gutter-r {
  right: 0;
  /* 图片右缘带一片蓝紫霞光（y40~75% 最深到 #D1D8FC），必须逐高度复刻 */
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #fdfdfe 15%,
    #fdfeff 25%,
    #e6ebfe 40%,
    #dde3fc 50%,
    #d6defc 60%,
    #e6eefc 75%,
    #f1f7ff 90%,
    #f5f7fd 100%
  );
  -webkit-mask-image: linear-gradient(90deg, #000 0%, transparent 100%);
  mask-image: linear-gradient(90deg, #000 0%, transparent 100%);
}
@media (max-width: 1440px) {
  .px-about-gutter {
    display: none;
  }
}
.px-about-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
  gap: 48px;
  margin-top: 24px;
}
.px-about-intro {
  margin: 0 0 9px;
  font-size: 20px;
  line-height: 34px;
  color: var(--px-body);
  text-align: justify;
}
/* 左列小标题：距上方简介 9，自身行高 51，下方 10 接正文 */
.px-about-left .px-sub-title {
  margin: 0 0 10px;
  font-size: 24px;
  line-height: 51px;
}
.px-about-para {
  margin: 0 0 16px;
  font-size: 16px;
  line-height: 29px;
  color: var(--px-body);
  text-align: justify;
}
.px-about-para:last-of-type {
  margin-bottom: 0;
}
.px-about-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 15px 0 0;
  padding: 0;
  list-style: none;
}
.px-about-tags li {
  padding: 4px 13px;
  border: 1px solid rgba(26, 111, 181, 0.08);
  border-radius: 100px;
  background: #e7efff;
  font-size: 12px;
  line-height: 20px;
  color: var(--px-blue);
}
/* 右列「产品特点」：标题下方 9 接蓝色块 */
.px-about-right > .px-sub-title {
  margin: 0 0 9px;
  font-size: 24px;
  line-height: 34px;
}
.px-feature-main {
  padding: 21px 20px 28px;
  border: 1px solid #edf1f6;
  border-radius: 12px;
  background: var(--px-blue);
  box-shadow: 0px 12px 32px -12px rgba(15, 98, 254, 0.5);
}
.px-feature-main h4 {
  margin: 0 0 15px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: #fff;
}
.px-feature-main p {
  margin: 0;
  font-size: 12px;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.92);
  text-align: justify;
}
.px-feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 13px;
  margin-top: 16px;
}
.px-feature-card {
  padding: 19px 15px;
  border: 1px solid #edf1f6;
  border-radius: 12px;
  background: #f5f8fb;
}
/* 悬浮上浮（用 translate 而非 transform，避免与入场动画的 transform 相互覆盖） */
.px-feature-card:hover {
  translate: 0 -4px;
  border-color: #c9d8ff;
  background: #fff;
  box-shadow: 0px 12px 26px -8px rgba(15, 98, 254, 0.22);
}
.px-feature-card h4 {
  margin: 0 0 8px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: var(--px-ink);
}
.px-feature-card p {
  margin: 0;
  font-size: 12px;
  line-height: 22px;
  color: var(--px-body);
  text-align: justify;
}

/* ===== 产品功能轮播（左右滑动 + 4s 自动播放）===== */
.px-func {
  margin-top: 64px;
}
.px-func-title {
  margin: 0 0 32px;
  font-size: 24px;
  line-height: 34px;
  font-weight: 600;
  color: var(--px-ink);
}
.px-func-body {
  display: flex;
  align-items: center;
  gap: 40px;
}
.px-laptop {
  position: relative;
  flex: 0 0 658px;
}
.px-laptop-frame {
  position: relative;
  z-index: 1;
  display: block;
  width: 658px;
  height: 378px;
  object-fit: contain;
  pointer-events: none;
}
/* 屏底图 517×319：距笔记本内部上方 16、左右居中，切换时淡入 + 横向滑入 */
.px-laptop-screen {
  position: absolute;
  top: 16px;
  left: 50%;
  z-index: 2;
  width: 517px;
  height: 319px;
  object-fit: cover;
  opacity: 0;
  transform: translateX(-50%) translateX(48px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
  pointer-events: none;
}
.px-laptop-screen-on {
  opacity: 1;
  transform: translateX(-50%);
}
.px-func-side {
  flex: 1 1 auto;
  min-width: 0;
}
.px-func-view {
  overflow: hidden;
}
.px-func-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.px-func-card {
  flex: 0 0 100%;
  min-height: 300px;
  padding: 28px 30px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 12px 40px -12px rgba(61, 74, 199, 0.18);
}
.px-func-card b {
  display: block;
  margin-bottom: 21px;
  font-size: 36px;
  line-height: 44px;
  font-weight: 700;
  color: var(--px-blue);
}
.px-func-card p {
  margin: 0;
  font-size: 18px;
  line-height: 27px;
  color: var(--px-body);
  text-align: justify;
}
.px-func-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}
.px-func-dots {
  display: flex;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.px-func-dots li {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f2f5fa;
  font-size: 15px;
  font-weight: 600;
  color: #a7adc4;
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease;
}
.px-func-dots li:hover {
  color: var(--px-blue);
}
/* 高亮只变序号文字颜色，圆点背景保持不变 */
.px-func-dots li.px-func-dot-on {
  color: var(--px-blue);
}
.px-func-arrows {
  display: flex;
  gap: 12px;
}
.px-func-arrow {
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  transition: transform 0.25s ease;
}
.px-func-arrow img {
  display: block;
  width: 32px;
  height: 32px;
}
.px-func-arrow:not(:disabled):hover {
  transform: scale(1.1);
}
.px-func-arrow:disabled {
  cursor: not-allowed;
}

/* ===== 3. 为什么选择（整块 674，背景 box2-bg 1440×673）===== */
.px-why {
  position: relative;
  overflow: hidden;
  min-height: 674px;
  padding: 84px 0 62px;
  /* box2-bg 为全图 alpha≈77 的柔光叠图，底色必须为纯白：
     实测边缘色都是“图 over 白”的合成值，底色一旦偏蓝就会双重叠加 */
  background: #fff;
}
.px-why .px-sec-sub {
  margin: 17px 0 0;
  font-size: 20px;
  line-height: 34px;
  color: var(--px-body);
}
.px-why-bg {
  position: absolute;
  bottom: 0;
  right: max(0px, calc((100% - 1440px) / 2));
  z-index: 0;
  width: 1440px;
  height: 673px;
  object-fit: cover;
  object-position: bottom;
  pointer-events: none;
}
.px-why-inner {
  position: relative;
  z-index: 1;
}
/* 左右融合带：逐高度复刻 box2-bg 边缘合成色（左上微暖 / 右上浅青 / 底部蓝波纹），横向向外淡出 */
.px-why-gutter {
  position: absolute;
  bottom: 0;
  z-index: 0;
  width: max(0px, calc((100% - 1440px) / 2));
  height: 673px;
  pointer-events: none;
}
.px-why-gutter-l {
  left: 0;
  background: linear-gradient(
    180deg,
    #fdf9f9 0%,
    #fefcf9 20%,
    #fefefc 45%,
    #edf6fe 60%,
    #cceefd 75%,
    #cee7fe 90%,
    #d1e5fb 100%
  );
  -webkit-mask-image: linear-gradient(270deg, #000 0%, transparent 100%);
  mask-image: linear-gradient(270deg, #000 0%, transparent 100%);
}
.px-why-gutter-r {
  right: 0;
  background: linear-gradient(
    180deg,
    #effcfe 0%,
    #f6f9fd 20%,
    #fafbfd 45%,
    #fafcfd 60%,
    #dbedff 75%,
    #c4defd 90%,
    #cde0fd 100%
  );
  -webkit-mask-image: linear-gradient(90deg, #000 0%, transparent 100%);
  mask-image: linear-gradient(90deg, #000 0%, transparent 100%);
}
@media (max-width: 1440px) {
  .px-why-gutter {
    display: none;
  }
}
.px-why-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 34px;
  margin-top: 48px;
}
.px-why-card {
  padding: 25px 26px 40px;
  border: 1px solid #edf1f6;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.7);
  text-align: center;
}
.px-why-card:hover {
  translate: 0 -6px;
  border-color: #c9d8ff;
  background: #fff;
  box-shadow: 0px 20px 40px -14px rgba(23, 105, 232, 0.26);
}
.px-why-card img {
  width: 72px;
  height: 72px;
  object-fit: contain;
}
.px-why-card h3 {
  margin: 41px 0 0;
  font-size: 20px;
  line-height: 26px;
  font-weight: 600;
  color: var(--px-blue);
}
.px-why-card p {
  margin: 11px 0 0;
  font-size: 14px;
  line-height: 24px;
  color: var(--px-body);
  text-align: center;
}
.px-why-stats {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 41px 0 0;
  padding: 0;
  list-style: none;
}
.px-why-stats li {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 9px 17px;
  border: 1px solid #edf1f6;
  border-radius: 100px;
  background: #fff;
  font-size: 14px;
  line-height: 22px;
  color: var(--px-body);
}
.px-why-stats img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

/* ===== 4. 完善的考务功能体系（白底，上下 121 / 108）===== */
.px-cap {
  padding: 121px 0 108px;
  background: #fff;
}
.px-cap .px-sec-sub {
  margin: 16px 0 0;
  font-size: 20px;
  line-height: 34px;
  color: var(--px-body);
}
.px-cap-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-top: 74px;
}
.px-cap-card {
  padding: 33px;
  border: 1px solid #edf1f6;
  border-radius: 16px;
  background: #f5f8fb;
}
.px-cap-card:hover {
  translate: 0 -6px;
  border-color: #c9d8ff;
  background: #fff;
  box-shadow: 0px 18px 40px -14px rgba(61, 74, 199, 0.22);
}
.px-cap-card img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}
.px-cap-card h3 {
  margin: 20px 0 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: var(--px-ink);
}
.px-cap-card p {
  margin: 11px 0 0;
  font-size: 14px;
  line-height: 24px;
  color: var(--px-body);
  text-align: justify;
}

/* ===== 5. 权威认证（整块 664，背景 box4-bg 1440×664）===== */
.px-cert {
  position: relative;
  overflow: hidden;
  min-height: 664px;
  padding: 92px 0 75px;
  /* 底色由设计稿反推：base = (观察色 - 图色×a) / (1-a)，box4-bg 全图 alpha≈77，
     解得底部色稳定在 #F4F8FC（横向差异很小于 6，所以不做横向渐变避免双重叠加） */
  background: #f4f8fc;
}
.px-cert .px-sec-sub {
  margin: 33px 0 0;
  font-size: 20px;
  line-height: 34px;
  color: var(--px-body);
}
.px-cert-bg {
  position: absolute;
  top: 0;
  right: max(0px, calc((100% - 1440px) / 2));
  z-index: 0;
  width: 1440px;
  height: 664px;
  object-fit: cover;
  object-position: top;
  pointer-events: none;
}
.px-cert-inner {
  position: relative;
  z-index: 1;
}
/* 左右融合带：宽屏时复刻设计稿在画布左/右边界处的最终色，横向向外淡出。
   宽度额外 +4px 压住图片边缘：box4-bg 实为 1441 宽，最右列 alpha 仅 38（#FEFFFF）、
   最左列 #FAFDFF 也比邻域亮 16，导出时带了一圈近透明白边，不遮住就会在顶部出现白色竖线 */
.px-cert-gutter {
  position: absolute;
  top: 0;
  z-index: 0;
  width: calc(max(0px, (100% - 1440px) / 2) + 4px);
  height: 664px;
  pointer-events: none;
}
.px-cert-gutter-l {
  left: 0;
  background: linear-gradient(
    180deg,
    #e2edfa 0%,
    #e6eefa 35%,
    #e8f0fa 50%,
    #eaf1fb 65%,
    #eaf1fa 80%,
    #ebf2fa 100%
  );
  -webkit-mask-image: linear-gradient(270deg, #000 0%, transparent 100%);
  mask-image: linear-gradient(270deg, #000 0%, transparent 100%);
}
.px-cert-gutter-r {
  right: 0;
  background: linear-gradient(
    180deg,
    #eaf1fa 0%,
    #eaf1fa 20%,
    #f4f8fc 35%,
    #f2f6fc 50%,
    #f5f8fc 80%,
    #f5f8fc 100%
  );
  -webkit-mask-image: linear-gradient(90deg, #000 0%, transparent 100%);
  mask-image: linear-gradient(90deg, #000 0%, transparent 100%);
}
@media (max-width: 1440px) {
  /* 此时没有画布外留白，但仍保留 4px 压边以盖掉图片自身的白边 */
  .px-cert-gutter {
    width: 4px;
  }
}
.px-cert-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 39px;
  margin-top: 33px;
}
.px-cert-card {
  padding: 41px 39px 57px;
  border: 1px solid #edf1f6;
  border-radius: 16px;
  background: #fff;
  text-align: center;
}
.px-cert-card:hover {
  translate: 0 -6px;
  border-color: #c9d8ff;
  box-shadow: 0px 22px 44px -16px rgba(23, 105, 232, 0.28);
}
.px-cert-card img {
  width: 158px;
  height: 100px;
  object-fit: contain;
}
.px-cert-card h3 {
  margin: 29px 0 0;
  font-size: 20px;
  line-height: 26px;
  font-weight: 600;
  color: var(--px-ink);
}
.px-cert-card p {
  margin: 22px 0 0;
  font-size: 14px;
  line-height: 24px;
  color: var(--px-body);
  text-align: center;
}

/* ===== 6. 全国各城市考试案例（白底，上下 77 / 91）===== */
.px-case {
  padding: 77px 0 91px;
  background: #fff;
}
.px-case .px-sec-title {
  line-height: 51px;
}
.px-case .px-sec-sub {
  margin: 33px 0 0;
  font-size: 20px;
  line-height: 34px;
  color: var(--px-body);
}
.px-case-stat {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: 8px 40px;
  align-items: center;
  margin-top: 33px;
  padding: 25px 80px 28px;
  border: 1px solid rgba(26, 111, 181, 0.06);
  border-radius: 24px;
  background: #f5f8fb;
}
.px-case-stat-num {
  grid-column: 1;
  grid-row: 1;
  margin: 0;
  text-align: center;
  font-size: 72px;
  line-height: 80px;
  font-weight: 700;
  color: var(--px-blue);
}
.px-case-stat-num i {
  margin-left: 7px;
  font-size: 31px;
  font-style: normal;
  font-weight: 600;
  color: #ff912f;
}
.px-case-stat-label {
  grid-column: 1;
  grid-row: 2;
  margin: 8px 0 0;
  text-align: center;
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  color: #1a6fb5;
}
.px-case-stat-desc {
  grid-column: 2;
  grid-row: 1 / span 2;
  margin: 0;
  font-size: 16px;
  line-height: 29px;
  color: var(--px-body);
  text-align: justify;
}
.px-case-note {
  margin: 29px 0 0;
  font-size: 16px;
  line-height: 29px;
  color: var(--px-body);
}
.px-case-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin-top: 24px;
}
.px-case-card {
  display: flex;
  align-items: stretch;
  height: 125px;
  overflow: hidden;
  border: 1px solid #edf1f6;
  border-radius: 16px;
  background: #edf1f6;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1);
}
.px-case-card:hover {
  translate: 0 -4px;
  box-shadow: 0px 12px 28px -8px rgba(61, 74, 199, 0.24);
}
/* 图片占满卡片高度，左侧圆角由卡片 overflow 裁剪 */
.px-case-card > img {
  flex: none;
  width: 223px;
  height: 100%;
  object-fit: cover;
}
.px-case-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
  padding: 32px 26px;
}
.px-case-info h3 {
  margin: 0 0 12px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: var(--px-ink);
}
.px-case-meta {
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
  line-height: 22px;
  white-space: nowrap;
  color: #8a96a6;
}
.px-case-meta li {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.px-case-meta img {
  width: 14px;
  height: 14px;
  object-fit: contain;
}
.px-case-count {
  font-weight: 600;
  color: var(--px-blue);
}
</style>
