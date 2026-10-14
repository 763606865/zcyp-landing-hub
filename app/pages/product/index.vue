<template>
  <div class="pd-page">
    <!-- ========== 1. Banner 区 ========== -->
    <section class="pd-banner">
      <div class="pd-stage">
        <div class="pd-banner-main">
          <div class="pd-banner-tag pd-animate"><i></i>考务科技 · 安防检测</div>
          <h1 class="pd-animate">中测高科考务硬件科技产品</h1>
          <p class="pd-banner-desc pd-animate">覆盖考试考务全场景的安防检测设备体系：手持式金属探测器、手机信号屏蔽器、隐形耳机探测仪、智慧手机探测门、WIFI/无人机屏蔽仪、人脸核验终端，全系产品均通过主管部门检验及国标认证。</p>
          <NuxtLink class="pd-banner-btn pd-animate" :to="contactRoute">咨询产品采购</NuxtLink>
        </div>
      </div>
      <div class="pd-banner-bar">
        <div class="pd-banner-bar-inner">
          <div class="pd-stat pd-animate" v-for="(s, i) in heroStats" :key="i">
            <div class="pd-stat-v">
              <span v-if="s.value !== undefined" v-count-up="s.value">{{ s.value }}</span>
              <span v-else>{{ s.text }}</span><i v-if="s.suffix">{{ s.suffix }}</i>
            </div>
            <div class="pd-stat-l">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 2. 手持式金属探测器系列 ========== -->
    <section class="pd-s2">
      <div class="pd-container">
        <header class="pd-sec-head pd-animate">
          <p class="pd-en">HANDHELD METAL DETECTORS</p>
          <h2>手持式金属探测器系列</h2>
          <p class="pd-lead">高灵敏手持探测设备，可探测隐藏在人体上的所有种类金属物体，声光/振动双报警，适应静音与嘈杂环境，广泛服务于各种考试等安检场景。</p>
        </header>
        <div class="pd-cards">
          <article class="pd-card pd-animate" v-for="(card, i) in detectorCards" :key="i">
            <div class="pd-card-l">
              <h3>{{ card.title }}</h3>
              <img :src="card.img" :alt="card.title" />
            </div>
            <div class="pd-card-r">
              <p class="pd-card-intro">{{ card.intro }}</p>
              <ul class="pd-dots pd-dots-30" :class="{'pd-dots-30-list': i === 1}">
                <li v-for="(b, bi) in card.bullets" :key="bi">{{ b }}</li>
              </ul>
              <div class="pd-spec-box"  :class="{'pd-spec-box-list': i === 1}">
                <div class="pd-spec-title">技术规格</div>
                <p class="pd-spec-line" v-for="(line, li) in card.spec" :key="li">
                  <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ========== 3. 无线信号屏蔽器系列 ========== -->
    <section class="pd-s3">
      <div class="pd-container">
        <header class="pd-sec-head pd-animate">
          <p class="pd-en">SIGNAL JAMMERS</p>
          <h2>无线信号屏蔽器系列</h2>
          <p class="pd-lead">覆盖 2G/3G/4G/5G + WIFI + 蓝牙全频段的信号管控设备，从桌面式、壁挂式到信令级智能管控，满足考场、会议室、涉密场所的不同屏蔽需求。</p>
        </header>

        <!-- 数据区域1：信令屏蔽器（box2bg） -->
        <div class="pd-jam1 pd-animate">
          <img class="pd-jam1-bg" :src="`${IMG}/box2bg.png`" alt="" />
          <div class="pd-jam1-body">
            <div class="pd-jam1-title">
              <h3>{{ jam1.title }}</h3>
              <span class="pd-pill">{{ jam1.tag }}</span>
            </div>
            <p class="pd-jam1-desc">{{ jam1.desc }}</p>
            <ul class="pd-dots pd-dots-26 pd-on-dark">
              <li v-for="(b, bi) in jam1.bullets" :key="bi">{{ b }}</li>
            </ul>
            <div class="pd-jam1-spec">
              <div class="pd-spec-title pd-spec-title-dark">{{ jam1.specTitle }}</div>
              <p class="pd-spec-line pd-spec-line-dark" v-for="(line, li) in jam1.spec" :key="li">
                <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
              </p>
            </div>
          </div>
        </div>

        <!-- 数据区域2：一型/二型屏蔽器卡片 -->
        <div class="pd-jam2">
          <article class="pd-jam2-card pd-animate" v-for="(card, i) in jam2Cards" :key="i">
            <img class="pd-jam2-img" :src="card.img" :alt="card.title" />
            <div class="pd-jam2-body">
              <h3>{{ card.title }}</h3>
              <p class="pd-jam2-desc">{{ card.desc }}</p>
              <div class="pd-metrics">
                <div class="pd-metric" v-for="(m, mi) in card.metrics" :key="mi">
                  <div class="pd-metric-v">{{ m.v }}</div>
                  <div class="pd-metric-l">{{ m.l }}</div>
                </div>
              </div>
              <div class="pd-jam2-list">
                <div class="pd-spec-title">{{ card.listTitle }}</div>
                <p class="pd-spec-line" v-for="(line, li) in card.list" :key="li">
                  <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
                </p>
              </div>
              <p class="pd-note">{{ card.note }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ========== 4. 中测高科 WIFI / 无人机屏蔽仪 ========== -->
    <section class="pd-s4">
      <div class="pd-stage">
        <div class="pd-s4-body">
          <h3 class="pd-prod-title pd-animate">{{ wifi.title }}</h3>
          <p class="pd-s4-desc pd-animate">{{ wifi.desc }}</p>
          <ul class="pd-dots pd-dots-26 pd-animate">
            <li v-for="(b, bi) in wifi.bullets" :key="bi">{{ b }}</li>
          </ul>
          <div class="pd-param-row pd-animate">
            <div class="pd-param" v-for="(p, pi) in wifi.params" :key="pi">
              <div class="pd-param-v">{{ p.v }}</div>
              <div class="pd-param-l">{{ p.l }}</div>
            </div>
          </div>
          <p class="pd-s4-note pd-animate">{{ wifi.note }}</p>
        </div>
      </div>
    </section>

    <!-- ========== 5. 反高科技作弊手段类 ========== -->
    <section class="pd-s5">
      <div class="pd-stage">
        <header class="pd-sec-head pd-abs-head pd-animate">
          <p class="pd-en">WIRELESS EARPHONE DETECTOR</p>
          <h2>反高科技作弊手段类</h2>
        </header>
        <div class="pd-side-body pd-animate">
          <h3 class="pd-prod-title">{{ ear.title }}</h3>
          <p class="pd-side-desc">{{ ear.desc }}</p>
          <ul class="pd-dots pd-dots-26">
            <li v-for="(b, bi) in ear.bullets" :key="bi">{{ b }}</li>
          </ul>
          <div class="pd-side-spec">
            <div class="pd-spec-title">{{ ear.specTitle }}</div>
            <p class="pd-spec-line" v-for="(line, li) in ear.spec" :key="li">
              <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
            </p>
          </div>
          <div class="pd-tags">
            <span class="pd-tag" v-for="(t, ti) in ear.tags" :key="ti">{{ t }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 6. 中测高科手持手机探测器 ========== -->
    <section class="pd-s6">
      <div class="pd-stage">
        <div class="pd-side-body pd-s6-body pd-animate">
          <h3 class="pd-prod-title">{{ phone.title }}</h3>
          <p class="pd-side-desc">{{ phone.desc }}</p>
          <ul class="pd-dots pd-dots-26">
            <li v-for="(b, bi) in phone.bullets" :key="bi">{{ b }}</li>
          </ul>
          <div class="pd-side-spec">
            <div class="pd-spec-title">{{ phone.specTitle }}</div>
            <p class="pd-spec-line" v-for="(line, li) in phone.spec" :key="li">
              <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
            </p>
          </div>
          <div class="pd-tags">
            <span class="pd-tag" v-for="(t, ti) in phone.tags" :key="ti">{{ t }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 7. 中测高科一型电子仪器探测门 ========== -->
    <section class="pd-s7">
      <div class="pd-stage">
        <div class="pd-s7-body">
          <h3 class="pd-prod-title pd-on-dark-text pd-animate">{{ gate.title }}</h3>
          <p class="pd-s7-desc pd-animate">{{ gate.desc }}</p>
          <div class="pd-s7-grid pd-animate">
            <div class="pd-s7-block" v-for="(b, bi) in gate.blocks" :key="bi">
              <div class="pd-s7-block-t">{{ b.t }}</div>
              <div class="pd-s7-block-d">{{ b.d }}</div>
            </div>
          </div>
          <div class="pd-s7-params pd-animate">
            <div class="pd-s7-block-t">{{ gate.paramsTitle }}</div>
            <p class="pd-s7-param-line" v-for="(line, li) in gate.params" :key="li">
              <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 8. 中测高科非线性节点探测器 ========== -->
    <section class="pd-s8">
      <div class="pd-stage">
        <div class="pd-s8-body">
          <h3 class="pd-prod-title pd-on-dark-text pd-animate">{{ node.title }}</h3>
          <ul class="pd-dots pd-dots-26 pd-on-dark pd-animate">
            <li v-for="(b, bi) in node.bullets" :key="bi">{{ b }}</li>
          </ul>
          <div class="pd-param-row pd-param-row-dark pd-animate">
            <div class="pd-param" v-for="(p, pi) in node.params" :key="pi">
              <div class="pd-param-v">{{ p.v }}</div>
              <div class="pd-param-l">{{ p.l }}</div>
            </div>
          </div>
          <p class="pd-s8-note pd-animate">{{ node.note }}</p>
        </div>
      </div>
    </section>

    <!-- ========== 9. 身份核验类 ========== -->
    <section class="pd-s9">
      <div class="pd-stage">
        <header class="pd-sec-head pd-abs-head pd-head-light pd-animate">
          <p class="pd-en pd-en-light">FACE VERIFICATION TERMINAL</p>
          <h2>身份核验类</h2>
        </header>
        <div class="pd-face-card pd-animate">
          <h3 class="pd-prod-title pd-on-dark-text">{{ face.title }}</h3>
          <p class="pd-face-desc">{{ face.desc }}</p>
          <div class="pd-face-box">
            <div class="pd-spec-title">{{ face.configTitle }}</div>
            <p class="pd-spec-line" v-for="(line, li) in face.config" :key="li">
              <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
            </p>
          </div>
          <div class="pd-face-box pd-face-box-gap">
            <div class="pd-spec-title">{{ face.perfTitle }}</div>
            <p class="pd-spec-line" v-for="(line, li) in face.perf" :key="li">
              <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
            </p>
          </div>
          <div class="pd-face-grid">
            <div class="pd-face-box pd-face-cell" v-for="(b, bi) in face.blocks" :key="bi">
              <div class="pd-spec-title">{{ b.t }}</div>
              <p class="pd-spec-line">{{ b.d }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== 10. 面试考场设备 ========== -->
    <section class="pd-s10">
      <div class="pd-stage">
        <header class="pd-sec-head pd-abs-head pd-head-light pd-animate">
          <p class="pd-en pd-en-light">DUAL-SCREEN DESKTOP DISPLAYS</p>
          <h2>面试考场设备</h2>
        </header>
        <div class="pd-s10-cols pd-container">
          <div class="pd-s10-col pd-animate" :class="{ 'pd-s10-col-right': d.right }" v-for="(d, di) in displays" :key="di">
            <h3 class="pd-prod-title pd-on-dark-text">{{ d.title }}</h3>
            <p class="pd-s10-desc">{{ d.desc }}</p>
            <ul class="pd-dots pd-dots-26 pd-on-dark">
              <li v-for="(b, bi) in d.bullets" :key="bi">{{ b }}</li>
            </ul>
            <div class="pd-s10-spec">
              <div class="pd-s10-spec-title">技术规格</div>
              <p class="pd-s10-spec-line" v-for="(line, li) in d.spec" :key="li">
                <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
              </p>
              <img class="pd-s10-spec-img" :src="d.img" :alt="d.title"
                :style="{ width: d.imgW + 'px', height: d.imgH + 'px' }" />
            </div>
          </div>
        </div>
        <div class="pd-s10-tags pd-animate">
          <span class="pd-tag pd-tag-dark" v-for="(t, ti) in displayTags" :key="ti">{{ t }}</span>
        </div>
      </div>
    </section>

    <!-- ========== 11. 产品汇总表 ========== -->
    <section class="pd-s11">
      <div class="pd-container">
        <header class="pd-sec-head pd-animate">
          <p class="pd-en">PRODUCT SUMMARY</p>
          <h2>产品汇总表</h2>
          <p class="pd-lead">5大系列、十三款产品的功能与场景一览，快速匹配您的安防检测需求。</p>
        </header>
        <div class="pd-table-wrap pd-animate">
          <table class="pd-table">
            <thead>
              <tr>
                <th>产品类别</th>
                <th>核心功能</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, ri) in summaryTable" :key="ri">
                <td class="pd-td-name">{{ row[0] }}</td>
                <td>{{ row[1] }}</td>
                <td>{{ row[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>

  <!-- ============================================================
       移动端版本（pm- 前缀，≤1024px 生效，PC 端 DOM/CSS/script 零改动）
       · 桌面（>1024px）隐藏移动根；≤1024px 隐藏桌面根、显示移动根
       · 所有移动样式限定在 .pm-page 作用域内，数据数组直接复用
       · 不给 .pm-page 设 overflow:hidden，避免破坏 sticky 导航
       ============================================================ -->
  <div class="pm-page">
    <!-- 1. Banner -->
    <section class="pm-banner">
      <div class="pm-container">
        <div class="pm-banner-tag pm-animate"><i></i>考务科技 · 安防检测</div>
        <h1 class="pm-banner-title pm-animate">中测高科考务硬件科技产品</h1>
        <p class="pm-banner-desc pm-animate">覆盖考试考务全场景的安防检测设备体系：手持式金属探测器、手机信号屏蔽器、隐形耳机探测仪、智慧手机探测门、WIFI/无人机屏蔽仪、人脸核验终端，全系产品均通过主管部门检验及国标认证。</p>
        <NuxtLink class="pm-btn pm-animate" :to="contactRoute">咨询产品采购</NuxtLink>
      </div>
      <!-- 产品全家福主视觉：裁掉图左侧空白与上下空边 -->
      <div class="pm-banner-photo">
        <img :src="`${IMG}/bannerbg.png`" alt="" />
      </div>
      <div class="pm-container">
        <div class="pm-stats">
          <div class="pm-stat pm-animate" v-for="(s, i) in heroStats" :key="i">
            <div class="pm-stat-v">
              <span v-if="s.value !== undefined" v-count-up="s.value">{{ s.value }}</span>
              <span v-else>{{ s.text }}</span><i v-if="s.suffix">{{ s.suffix }}</i>
            </div>
            <div class="pm-stat-l">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>
    <!-- 2. 手持式金属探测器系列 -->
    <section class="pm-section">
      <div class="pm-container">
        <header class="pm-sec-head pm-animate">
          <p class="pm-en">HANDHELD METAL DETECTORS</p>
          <h2>手持式金属探测器系列</h2>
          <p class="pm-lead">高灵敏手持探测设备，可探测隐藏在人体上的所有种类金属物体，声光/振动双报警，适应静音与嘈杂环境，广泛服务于各种考试等安检场景。</p>
        </header>
        <article class="pm-card pm-animate" v-for="(card, i) in detectorCards" :key="i">
          <h3 class="pm-prod-title">{{ card.title }}</h3>
          <img class="pm-card-img" :src="card.img" :alt="card.title" />
          <p class="pm-desc">{{ card.intro }}</p>
          <ul class="pm-dots">
            <li v-for="(b, bi) in card.bullets" :key="bi">{{ b }}</li>
          </ul>
          <div class="pm-spec-box">
            <div class="pm-spec-title">技术规格</div>
            <p class="pm-spec-line" v-for="(line, li) in card.spec" :key="li">
              <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
            </p>
          </div>
        </article>
      </div>
    </section>
    <!-- 3. 无线信号屏蔽器系列 -->
    <section class="pm-section pm-section-grey">
      <div class="pm-container">
        <header class="pm-sec-head pm-animate">
          <p class="pm-en">SIGNAL JAMMERS</p>
          <h2>无线信号屏蔽器系列</h2>
          <p class="pm-lead">覆盖 2G/3G/4G/5G + WIFI + 蓝牙全频段的信号管控设备，从桌面式、壁挂式到信令级智能管控，满足考场、会议室、涉密场所的不同屏蔽需求。</p>
        </header>
        <img class="pm-showcase pm-animate" :src="`${IMG}/box2bg.png`" alt="信令手机信号屏蔽器" />
        <div class="pm-dark-card pm-animate">
          <div class="pm-card-head">
            <h3 class="pm-prod-title">{{ jam1.title }}</h3>
            <span class="pm-pill">{{ jam1.tag }}</span>
          </div>
          <p class="pm-desc">{{ jam1.desc }}</p>
          <ul class="pm-dots pm-dots-dark">
            <li v-for="(b, bi) in jam1.bullets" :key="bi">{{ b }}</li>
          </ul>
          <div class="pm-spec-box pm-spec-box-dark">
            <div class="pm-spec-title">{{ jam1.specTitle }}</div>
            <p class="pm-spec-line" v-for="(line, li) in jam1.spec" :key="li">
              <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
            </p>
          </div>
        </div>
        <article class="pm-card pm-animate" v-for="(card, i) in jam2Cards" :key="i">
          <h3 class="pm-prod-title">{{ card.title }}</h3>
          <img class="pm-card-img" :src="card.img" :alt="card.title" />
          <p class="pm-desc">{{ card.desc }}</p>
          <div class="pm-metrics">
            <div class="pm-metric" v-for="(m, mi) in card.metrics" :key="mi">
              <div class="pm-metric-v">{{ m.v }}</div>
              <div class="pm-metric-l">{{ m.l }}</div>
            </div>
          </div>
          <div class="pm-spec-box">
            <div class="pm-spec-title">{{ card.listTitle }}</div>
            <p class="pm-spec-line" v-for="(line, li) in card.list" :key="li">
              <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
            </p>
          </div>
          <p class="pm-note">{{ card.note }}</p>
        </article>
      </div>
    </section>
    <!-- 4. WIFI / 无人机屏蔽仪 -->
    <section class="pm-section">
      <div class="pm-container">
        <img class="pm-showcase pm-animate" :src="`${IMG}/box3bg.png`" alt="WIFI / 无人机屏蔽仪" />
        <h3 class="pm-prod-title pm-animate">{{ wifi.title }}</h3>
        <p class="pm-desc pm-animate">{{ wifi.desc }}</p>
        <ul class="pm-dots pm-animate">
          <li v-for="(b, bi) in wifi.bullets" :key="bi">{{ b }}</li>
        </ul>
        <div class="pm-params pm-animate">
          <div class="pm-param" v-for="(p, pi) in wifi.params" :key="pi">
            <div class="pm-param-v">{{ p.v }}</div>
            <div class="pm-param-l">{{ p.l }}</div>
          </div>
        </div>
        <p class="pm-note pm-animate">{{ wifi.note }}</p>
      </div>
    </section>

    <!-- 5. 反高科技作弊手段类 -->
    <section class="pm-section pm-section-grey">
      <div class="pm-container">
        <header class="pm-sec-head pm-animate">
          <p class="pm-en">WIRELESS EARPHONE DETECTOR</p>
          <h2>反高科技作弊手段类</h2>
        </header>
        <img class="pm-showcase pm-animate" :src="`${IMG}/box4bg.png`" :alt="ear.title" />
        <h3 class="pm-prod-title pm-animate">{{ ear.title }}</h3>
        <p class="pm-desc pm-animate">{{ ear.desc }}</p>
        <ul class="pm-dots pm-animate">
          <li v-for="(b, bi) in ear.bullets" :key="bi">{{ b }}</li>
        </ul>
        <div class="pm-spec-box pm-animate">
          <div class="pm-spec-title">{{ ear.specTitle }}</div>
          <p class="pm-spec-line" v-for="(line, li) in ear.spec" :key="li">
            <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
          </p>
        </div>
        <div class="pm-tags">
          <span class="pm-tag" v-for="(t, ti) in ear.tags" :key="ti">{{ t }}</span>
        </div>
      </div>
    </section>
    <!-- 6. 手持手机探测器 -->
    <section class="pm-section">
      <div class="pm-container">
        <img class="pm-showcase pm-animate" :src="`${IMG}/box5bg.png`" :alt="phone.title" />
        <h3 class="pm-prod-title pm-animate">{{ phone.title }}</h3>
        <p class="pm-desc pm-animate">{{ phone.desc }}</p>
        <ul class="pm-dots pm-animate">
          <li v-for="(b, bi) in phone.bullets" :key="bi">{{ b }}</li>
        </ul>
        <div class="pm-spec-box pm-animate">
          <div class="pm-spec-title">{{ phone.specTitle }}</div>
          <p class="pm-spec-line" v-for="(line, li) in phone.spec" :key="li">
            <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
          </p>
        </div>
        <div class="pm-tags">
          <span class="pm-tag" v-for="(t, ti) in phone.tags" :key="ti">{{ t }}</span>
        </div>
      </div>
    </section>

    <!-- 7. 一型电子仪器探测门 -->
    <section class="pm-section pm-section-grey">
      <div class="pm-container">
        <img class="pm-showcase pm-animate" :src="`${IMG}/box6bg.png`" :alt="gate.title" />
        <h3 class="pm-prod-title pm-animate">{{ gate.title }}</h3>
        <p class="pm-desc pm-animate">{{ gate.desc }}</p>
        <div class="pm-blocks pm-animate">
          <div class="pm-block" v-for="(b, bi) in gate.blocks" :key="bi">
            <div class="pm-block-t">{{ b.t }}</div>
            <div class="pm-block-d">{{ b.d }}</div>
          </div>
        </div>
        <div class="pm-spec-box pm-animate">
          <div class="pm-spec-title">{{ gate.paramsTitle }}</div>
          <p class="pm-spec-line" v-for="(line, li) in gate.params" :key="li">
            <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
          </p>
        </div>
      </div>
    </section>
    <!-- 8. 非线性节点探测器 -->
    <section class="pm-section">
      <div class="pm-container">
        <img class="pm-showcase pm-animate" :src="`${IMG}/box7bg.png`" :alt="node.title" />
        <h3 class="pm-prod-title pm-animate">{{ node.title }}</h3>
        <ul class="pm-dots pm-animate">
          <li v-for="(b, bi) in node.bullets" :key="bi">{{ b }}</li>
        </ul>
        <div class="pm-params pm-animate">
          <div class="pm-param" v-for="(p, pi) in node.params" :key="pi">
            <div class="pm-param-v">{{ p.v }}</div>
            <div class="pm-param-l">{{ p.l }}</div>
          </div>
        </div>
        <p class="pm-note pm-animate">{{ node.note }}</p>
      </div>
    </section>

    <!-- 9. 身份核验类 -->
    <section class="pm-section pm-section-grey">
      <div class="pm-container">
        <header class="pm-sec-head pm-animate">
          <p class="pm-en">FACE VERIFICATION TERMINAL</p>
          <h2>身份核验类</h2>
        </header>
        <!-- 标题/描述叠放在图底部（不裁图），补住图下方留白 -->
        <div class="pm-hero pm-animate">
          <img :src="`${IMG}/box8bg.png`" :alt="face.title" />
          <div class="pm-hero-copy">
            <h3 class="pm-prod-title">{{ face.title }}</h3>
            <p class="pm-desc">{{ face.desc }}</p>
          </div>
        </div>
        <div class="pm-spec-box pm-animate">
          <div class="pm-spec-title">{{ face.configTitle }}</div>
          <p class="pm-spec-line" v-for="(line, li) in face.config" :key="li">
            <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
          </p>
        </div>
        <div class="pm-spec-box pm-animate">
          <div class="pm-spec-title">{{ face.perfTitle }}</div>
          <p class="pm-spec-line" v-for="(line, li) in face.perf" :key="li">
            <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
          </p>
        </div>
        <!-- 数据项改一行两个紧凑卡片 -->
        <div class="pm-blocks pm-blocks-tight">
          <div class="pm-block pm-animate" v-for="(b, bi) in face.blocks" :key="bi">
            <div class="pm-block-t">{{ b.t }}</div>
            <div class="pm-block-d">{{ b.d }}</div>
          </div>
        </div>
      </div>
    </section>
    <!-- 10. 面试考场设备 -->
    <section class="pm-section">
      <div class="pm-container">
        <header class="pm-sec-head pm-animate">
          <p class="pm-en">DUAL-SCREEN DESKTOP DISPLAYS</p>
          <h2>面试考场设备</h2>
        </header>
        <!-- 只展示图上半部分（产品画面），裁掉下方留白 -->
        <div class="pm-crop pm-crop-s10 pm-animate">
          <img :src="`${IMG}/box9bg.png`" alt="面试考场设备" />
        </div>
        <article class="pm-card pm-animate" v-for="(d, di) in displays" :key="di">
          <h3 class="pm-prod-title">{{ d.title }}</h3>
          <p class="pm-desc">{{ d.desc }}</p>
          <ul class="pm-dots">
            <li v-for="(b, bi) in d.bullets" :key="bi">{{ b }}</li>
          </ul>
          <div class="pm-spec-box">
            <div class="pm-spec-title">技术规格</div>
            <p class="pm-spec-line" v-for="(line, li) in d.spec" :key="li">
              <template v-for="(seg, si) in line" :key="si"><em v-if="si">｜</em>{{ seg }}</template>
            </p>
            <img class="pm-spec-img" :src="d.img" :alt="d.title" />
          </div>
        </article>
        <div class="pm-tags">
          <span class="pm-tag" v-for="(t, ti) in displayTags" :key="ti">{{ t }}</span>
        </div>
      </div>
    </section>

    <!-- 11. 产品汇总表 -->
    <section class="pm-section pm-section-blue">
      <div class="pm-container">
        <header class="pm-sec-head pm-animate">
          <p class="pm-en">PRODUCT SUMMARY</p>
          <h2>产品汇总表</h2>
          <p class="pm-lead">5大系列、十三款产品的功能与场景一览，快速匹配您的安防检测需求。</p>
        </header>
        <div class="pm-table-wrap pm-animate">
          <table class="pm-table">
            <thead>
              <tr>
                <th>产品类别</th>
                <th>核心功能</th>
                <th>适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, ri) in summaryTable" :key="ri">
                <td class="pm-td-name">{{ row[0] }}</td>
                <td>{{ row[1] }}</td>
                <td>{{ row[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="pm-table-tip">左右滑动查看完整表格</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { getContactRoute, useCampaignSource } from '../../composables/useCampaignSource'

const IMG = 'https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/hubImages/product'

const source = useCampaignSource()
const contactRoute = computed(() => getContactRoute(17, source.value))

useSeoMeta({
  title: '中测产品｜中测高科考务硬件科技产品',
  description: '中测高科考务硬件科技产品：手持式金属探测器、手机信号屏蔽器、WIFI/无人机屏蔽仪、隐形耳机探测仪、手持手机探测器、电子仪器探测门、非线性节点探测器、人脸核验终端、面试考场双屏显示器等安防检测设备。',
})

// 滚动入场动画
let observer: IntersectionObserver | null = null
onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('pd-visible')
        observer?.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })
  document.querySelectorAll('.pd-animate').forEach((el) => observer?.observe(el))
})
onBeforeUnmount(() => observer?.disconnect())

// Banner 数值行
const heroStats = [
  { value: 5, suffix: '大', label: '产品系列' },
  { value: 13, suffix: '款', label: '核心在售产品' },
  { text: 'GB12899', label: '符合国家标准' },
  { value: 3, suffix: '项', label: '主管部门/CE/ROHS 认证' },
]

// 2. 手持式金属探测器系列
const detectorCards = [
  {
    title: '中测高科手持一型金属探测器',
    img: `${IMG}/box1-img1.png`,
    intro: '经典手持式金属探测器，操作无方向性、使用简单方便，性能稳定、无需调整。',
    bullets: [
      '高、低两档灵敏度选择，低灵敏度可排除小金属物干扰',
      '声光、振动切换开关；开机、关机声音提示；电池用完自动连续告警 ',
      '电池降至 7V 左右探测距离不变，用电省，可连续工作 40 小时以上',
      '有外接充电插孔，支持 9V 镍氢电池循环使用',
    ],
    spec: [
      ['工作频率 22KHz', '功率 最大270mW', '待机电流 <5mA', '工作电压 DC 7～12V'],
      ['工作温度 -10℃～+65℃', '净重 360g', '尺寸 410×85×45mm'],
    ],
  },
  {
    title: '中测高科手持二型金属探测器',
    img: `${IMG}/box1-img2.png`,
    intro: '高灵敏型多功能手持式金属探测器，专为安防设计，可探测隐藏在人体上的所有种类金属物体。',
    bullets: [
      '探测面积大、扫描速度快、灵敏度高，支持接近/掠过双方式探测',
      'ABS 工程塑料一次铸成，抗击能力强、工艺精细、重量轻',
      '声光/振动报警，适应静音或嘈杂环境',
      '灵敏度外调旋钮，无需螺丝刀即可手动调节；一键三用开关，元器件寿命达 10 万次',
    ],
    spec: [
      ['工作频率 25KHz', '净重 <350g（含电池）', '外观尺寸 410×85×45mm'],
      ['防护等级 IP31', '工作温度 -40～+60℃', '电源 9V 干电池/镍氢电池'],
      ['辐射磁感应强度 ≤6μT', '符合 GB12899-2018，通过公安部检验及 CE、ROHS 认证'],
    ],
  },
]

// 3. 无线信号屏蔽器系列
const jam1 = {
  title: '中测高科信令手机信号屏蔽器',
  tag: '信令级旗舰',
  desc: '信令级专业手机信号管控设备，集智能信号屏蔽与监控管理于一体，只干扰 TDD 基站下行、不干扰上行，绿色低扰、杜绝影响周边公共通信。',
  bullets: [
    '全制式全频段：700～5000MHz 全部手机通信频段，兼容移动/联通/电信/广电四大运营商，阻断2G/3G/4G/5G 语音、数据、短信业务，覆盖 WIFI 2.4G/5.2G/5.8G',
    '智能一体化管理：设备状态实时监测、远程控制、策略配置',
    '自适应即插即用：无需参数设置，支持多机协同',
    '安全稳定合规：低功率运行、电磁辐射远低于国标，工业级设计长时间连续工作',
  ],
  specTitle: '技术参数',
  spec: [
    ['网络制式 电信/联通/移动/广电 2G~5G，WLAN 2.4G/5.2G/5.8G'],
    ['屏蔽最大输出功率 WLAN 30±2dBm，其它系统 ≥33dBm'],
    ['干扰能力 RSRP≤-75dBm 时屏蔽范围 ≥6米', '内置定向天线　｜　功耗 ≤200W'],
    ['外观尺寸 410×265×80mm', '供电 AC220V±20% 50±5Hz', '净重 6.5Kg', '功能系统通道可控制'],
  ],
}

const jam2Cards = [
  {
    title: '中测高科一型手机信号屏蔽器',
    img: `${IMG}/box2-img1.png`,
    desc: '手机信号屏蔽器，即放即用，适合教室、考场、会议室的小范围信号管控。',
    metrics: [
      { v: '全频段', l: '2G~5G+WIFI+蓝牙' },
      { v: '5-8米', l: '隔离半径' },
      { v: '1.2KG', l: '整机重量' },
      { v: '3年', l: '整机质保' },
    ],
    listTitle: '产品清单与规格',
    list: [
      ['尺寸 32x23x6cm'],
      ['包含：屏蔽器主机、5V12A 桌面式电源、信号天线、说明书保修卡'],
    ],
    note: '注：屏蔽效果与当地手机信号强度有关，基站附近使用效果会变差。',
  },
  {
    title: '中测高科二型手机信号屏蔽器',
    img: `${IMG}/box2-img2.png`,
    desc: '内置天线，覆盖范围更广，适合大教室、大考场部署。',
    metrics: [
      { v: '12通道', l: '内置天线' },
      { v: '10-15米', l: '覆盖半径' },
      { v: '5W/通道', l: '发射功率' },
      { v: '3KG', l: '整机重量' },
    ],
    listTitle: '产品清单与规格',
    list: [
      ['尺寸 37x26x8cm', '质保 3年'],
      ['包含：屏蔽器主机、电源、内置信号天线、说明书保修卡'],
    ],
    note: '注：屏蔽效果与当地手机信号强度有关，基站附近使用效果会变差。',
  },
]

// 4. WIFI / 无人机屏蔽仪
const wifi = {
  title: '中测高科 WIFI / 无人机屏蔽仪',
  desc: '集网络监测与干扰屏蔽于一体，自动检测并对符合 IEEE802.11 协议的现场无线网络通信信号实施屏蔽防护，用于禁止无线上网的重要涉密场所。',
  bullets: [
    '网络监测与干扰屏蔽相结合的技术方案，自动检测 2.4GHz、5.1GHz、5.8GHz 无线网络全频段通信信号',
    '对符合 IEEE802.11 协议的现场无线网络通信信号实施屏蔽防护',
    '主要用于对禁止无线上网的重要涉密场所进行技术安全检测与防护',
    '随机天线为 2.4G/5.8G 双频天线，SMA 接头可通用互换，无需逐一对应',
  ],
  params: [
    { v: '2.4-5.8GHz', l: '工作频率' },
    { v: '≥8米', l: '屏蔽半径' },
    { v: '≤5s', l: '发现时间' },
    { v: '≥85dBuv', l: '干扰强度' },
    { v: '15W', l: 'AC220V供电' },
  ],
  note: '装箱说明：主机一台、电源一个、双频天线三根（便携放置型）。适用场景：政府、军队、公安、外交和保密科研等涉密场所——会议室、研发设计室、财务室、策划、指挥和监控等。',
}

// 5. 反高科技作弊手段类（隐形耳机探测仪）
const ear = {
  title: '中测高科隐形耳机探测仪',
  desc: '被动式无线隐形耳机探测设备，不干扰任何通讯设施、不影响考生健康，可准确探测包括反屏蔽、反探测耳机在内的各种类型无线隐形耳机。',
  bullets: [
    '方向感强，快速准确进行方位确定，可精确定位作弊考生',
    '可直接监听无线隐形耳机通话内容，支持外接录音取证',
    'LED 数码显示信号强度，超高灵敏度并具增益放大功能',
    '低功耗，超长时间工作',
  ],
  specTitle: '技术指标',
  spec: [
    ['探测范围 60—120㎡', '探测频率 60—18000Hz'],
    ['灵敏度 3db', '辨别角度 ≤±12°'],
    ['信号指示 LED 数码管显示', '信号数量 20个'],
    ['DC7.5V（5节AA电池）', '净重 300g'],
    ['环境温度 -20～+55℃', '相对湿度 35～85%'],
    ['机身尺寸 80×220×40mm'],
  ],
  tags: ['考场', '会议室', '涉密场所'],
}

// 6. 手持手机探测器
const phone = {
  title: '中测高科手持手机探测器',
  desc: '手机探测器可对手机进行探测并给予告警提示，手机无论开关机、拔出电池、移出 SIM 卡都可以探测出来。设备分为高灵敏与标准两档探测模式，默认建议使用标准模式，高灵敏模式在增加探测距离时使用。',
  bullets: [
    '只认磁性设备：可排除首饰、纽扣、拉链、硬币、打火机、香烟盒、钥匙、手表等日常金属的报警，仅对含磁物品报警，误报排查效率远高于金属探测器',
    '双档灵敏度：高灵敏 / 标准两档可选，标准模式用于日常检测，高灵敏模式增加探测距离，适合考前打击电子耳机等场景',
    '隐蔽设备可测：手机开关机、拔出电池、移出 SIM 卡均可探测，杜绝一切规避手段',
    '声振双提示：支持声音 / 震动两种告警方式，适应不同安静程度的使用环境',
    '便携耐用：9V 电池供电，整机 410 克、480×80×35mm，握持舒适、随取随用',
  ],
  specTitle: '技术规格',
  spec: [
    ['探测提示 声音 / 震动', '可探测距离 3CM', '可探测频率 13KHz'],
    ['电池 9V 电池', '产品尺寸 480×80×35mm', '产品重量 410 克'],
    ['可探测物品 手机、电子耳机、录音笔、含磁性物品、微磁铁金属'],
    ['不报警物品 有色金属纽扣、拉链、硬币、钥匙、香烟盒、打火机、金银首饰、不锈钢产品、手表等'],
  ],
  tags: ['工厂安防', '部队公检法', '学校考场', '招标交易中心', '监狱', '会议室'],
}

// 7. 一型电子仪器探测门
const gate = {
  title: '中测高科一型电子仪器探测门',
  desc: '一款可以针对手机、笔记本电脑、数码相机、摄像机等电子设备进行检测的专业安检门，可在手机待机、关机、开机、移除电池、SIM等状态下检测出人员是否携带手机等电子产品。滤除钥匙、腰带扣、金属扣子、拉链等金属物品不报警。',
  blocks: [
    { t: '多区位报警', d: '左右各 8 个探测区位，警示手机位置' },
    { t: '10.1寸触摸屏', d: '参数可设密码保护，6核1.8GHz高性能芯片' },
    { t: '信号图形化', d: '探测信号波形展示，状态一目了然' },
    { t: '自动校准', d: '根据场地自动校准，屏蔽环境干扰' },
    { t: '人数统计', d: '主界面自动显示通过人数与报警人数' },
    { t: '网络联动', d: '预留接口，可与电脑/安检平台/翼闸联动' },
    { t: '声光报警', d: '语音报警 + 灯条闪光双重提示' },
    { t: '安全保护', d: '对心脏起搏器佩戴者、孕妇、磁性介质无害' },
  ],
  paramsTitle: '主要技术参数',
  params: [
    ['8个独立探测区位', '整体灵敏度 0-255级', '频段 1～12个', '功耗 <20W'],
    ['通过速率 0.4～1.2m/s'],
    ['内部通道尺寸 2000×720mm', '整体外部尺寸 2200(H)×600(W)×720(D)mm', '净重 80KG'],
    ['工作电压 AC110V/240V 50/60Hz', '工作环境温度 -20℃～+45℃'],
  ],
}

// 8. 非线性节点探测器
const node = {
  title: '中测高科非线性节点探测器',
  bullets: [
    '定位精度高：采用 2400MHz 射频探测技术，具备高精度定位能力',
    '半导体识别能力强：内置支持二次、三次谐波检测的频谱仪，快速有效识别含半导体器件和设备',
    '高灵敏度：内置高增益天线，检测距离大，对 SIM 卡类设备灵敏度高，秘录、手机类通讯设备可快速检出',
    '误报率低：内置无损探测算法大幅提升检测能力，误报率极低',
    '安全可靠：设备特性满足电磁辐射要求，对人体绝对安全',
    '操作灵活：支持发射功率自动 / 手动模式可选，便于人工操作',
    '人机交互友好：OLED 可视化图形界面，生动显示功率发射级别与二三次谐波图形',
    '高性价比：全球最具性价比，节约开支且性能优良',
  ],
  params: [
    { v: '2400MHz', l: '探测频率' },
    { v: '二/三次谐波', l: '频谱分析' },
    { v: '高增益天线', l: '探测灵敏度' },
    { v: 'OLED', l: '可视化界面' },
  ],
  note: '适用场景：政府保密单位、大型活动安保检查、商业组织保密检查、教育行业防作弊检查、个人住所与酒店房间隐私保护检查。',
}

// 9. 身份核验类
const face = {
  title: '中测高科人脸核验终端',
  desc: 'TSR-RS2人脸核验设备（双屏人证识别一体机）是一款集身份证读取、人像抓拍、人证比对于一体的智能身份核验终端。基于Android操作系统，采用双屏显示配置，配备200万像素单目摄像头与二代身份证识读模块，适用于考场身份核验、入场签到等考务场景。',
  configTitle: '核心配置',
  config: [
    ['操作系统 Android 7.1.2', 'CPU 瑞芯微RK3288 四核1.6GHz', '内存 2GB DDR3', '存储 32GB', '显示屏 10.1″ 1280×800', '背屏 7″ 1280×800'],
    ['触摸屏 10点电容', '摄像头 200万像素 CMOS', '二代证模块 公安部GA450', '网络 WiFi+以太网', '尺寸 281×164×302mm', '重量 2.1kg'],
  ],
  perfTitle: '关键性能',
  perf: [
    ['人脸识别率 ≥99%', '指纹识别率 ≥99.9%', '无故障点击寿命 单点≥100万次', '平均无故障时间 ≥10000小时', '读卡 感应<5cm 速度<1秒'],
  ],
  blocks: [
    { t: '证件识读', d: '读取身份证文字、图片信息' },
    { t: '人脸抓拍', d: '现场人脸抓拍，检测与特征提取' },
    { t: '联网核验（选配）', d: '公安部CTID网络可信身份核验' },
    { t: '人证比对', d: '身份证头像与现场抓拍人脸比对' },
    { t: '指纹比对（选配）', d: '身份证指纹与现场指纹比对' },
    { t: '凭条打印（选配）', d: '比对结果报表按模板打印' },
    { t: '平台上传（选配）', d: '终端数据上传到平台管理' },
    { t: '黑名单', d: '添加黑名单人员，禁止刷卡验证' },
    { t: '白名单', d: '仅白名单人员可验证' },
  ],
}

// 10. 面试考场设备
const displays = [
  {
    title: '21.5寸桌面式双面同显显示器',
    desc: '客户定制款 21.5 英寸桌面式双面同显显示器，前后双屏同步显示结构，超薄超轻、外观简洁美观，搭载高清 16:9 液晶显示面板。',
    bullets: [
      '双面同步显示：前后双屏画面实时同步输出，满足窗口、柜台双向展示需求',
      '超高对比度画质：高亮度、高对比度搭配，画面层次感大幅提升',
      '极速响应无拖尾：8ms 极速响应，彻底消除拖尾、残影、卡顿',
      '自动残影消除：内置智能残影消除算法，保护屏幕、延长液晶屏寿命',
      '低功耗长效稳定：内置低功耗电源方案，可长时间稳定运行',
    ],
    spec: [
      ['屏幕尺寸 21.5 英寸', '分辨率 1920×1080', '显示比例 16:9'],
      ['有效显示区域 476.64×268.11mm', '屏幕亮度 350cd/m²', '背光 LED'],
      ['像素间距 0.08275 × 0.24825mm', '可视角度 178°', '响应时间 8ms'],
      ['视频输入 HDMI', '供电 内置电源', '整机功耗 <60W'],
      ['使用寿命 ≥60000 小时'],
    ],
    img: `${IMG}/box9-img2.png`,
    imgW: 466,
    imgH: 200,
  },
  {
    title: '14寸桌面式双面同显显示器',
    desc: '14 英寸桌面式双面同显定制显示器，采用双屏同步显示架构，整机超薄超轻、外观简约精致，搭载高清 IPS 广视角液晶面板。',
    bullets: [
      '双面同步显示：前后双屏画面完全同步输出，画面一致无偏差',
      '高清细腻画质：8bit 16.7M 真彩显示，色彩过渡自然细腻',
      '极速响应无拖尾：8ms 高速响应，动态画面流畅不卡顿',
      '智能残影消除：内置自动残影修复算法，预防烧屏残影，延长屏幕寿命',
      '400cd/m² 高亮度搭配高对比度，明暗细节丰富，层次感更强',
    ],
    spec: [
      ['屏幕尺寸 14 英寸', '分辨率 1920×1080 (FHD)', '显示比例 16:9'],
      ['有效显示尺寸 309.3×174mm', '屏幕亮度 400cd/m²', '背光 LED'],
      ['显示色彩 16.7M 真彩', '可视角度 178°', '响应时间 8ms'],
      ['视频输入 HDMI', '供电 适配器', '整机功耗 <12W'],
      ['使用寿命 ≥60000 小时'],
    ],
    img: `${IMG}/box9-img1.png`,
    imgW: 361,
    imgH: 207,
    right: true,
  },
]
const displayTags = ['桌面办公展示', '政务窗口', '柜台双面显示', '小型商用宣传', '会议桌面交互', '定制化终端显示']

// 11. 产品汇总表（内容按设计稿逐字转录）
const summaryTable: string[][] = [
  ['一型手持金属探测器', '经典手持探测，双灵敏度', '机场、海关、监狱、学校等'],
  ['二型手持金属探测器', '高灵敏探测所有金属物体', '机场、车站、公安、贵金属检测'],
  ['一型手机信号屏蔽器', '桌面式，5-8米覆盖', '教室、考场、会议室'],
  ['二型手机信号屏蔽器', '壁挂式、10-15米覆盖', '教室、考场、会议室'],
  ['信令手机信号屏蔽器', '信令级，精准屏蔽不扰民', '考场、涉密场所、监狱、公共安全'],
  ['WIFI/无人机屏蔽仪', '被动式探测隐形耳机', '考场、会议室、涉密场所'],
  ['无线耳机探测仪', 'AI 智能识别手机，排除日常金属', '学校考场、电子厂、公检法、监狱'],
  ['手持手机探测器', '2.4G/5.1G/5.8G 全频段屏蔽', '政府、军队、公安、涉密科研场所'],
  ['电子仪器探测门', '双屏人证识别，身份证读取+人证比对', '考场身份核验、入场签到、涉密核验'],
  ['非线性节点探测器', '前后双屏同步同显，14 英寸 FHD', '桌面办公、政务窗口、柜台双面显示'],
  ['人脸核验设备', '前后双屏同步同显，21.5 英寸', '政务窗口、银行柜台、营业厅双向公示'],
  ['21.5寸双面同显显示器', '2400MHz 射频探测，识别半导体器件', '保密单位、大型活动安保、教育防作弊'],
  ['14寸双面同显显示器', '只对含磁物品报警，排除日常金属干扰', '工厂、公检法、学校考场、招标中心、监狱'],
]
// ===================== 移动端（≤1024px）专用逻辑 =====================
// PC 端根节点 .pd-page 的模板 / 样式 / 脚本零改动；
// 以下仅供移动根节点 .pm-page 使用，数据数组与 v-count-up 指令直接复用。
// 与 PC observer 同一写法：直接用 document 查询，不新增任何 import。
onMounted(() => {
  const pmRoot = document.querySelector('.pm-page')
  if (!pmRoot) return
  const pmObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('pm-visible')
        pmObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })
  pmRoot.querySelectorAll('.pm-animate').forEach((el) => pmObserver.observe(el as HTMLElement))
})
</script>

<style scoped>
/* ===== 基础变量与通用 ===== */
.pd-page {
  min-width: 1440px;
  font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  color: #0B2A5B;
}

.pd-stage {
  position: relative;
  width: 1440px;
  height: 100%;
  margin: 0 auto;
}

.pd-container {
  width: 1166px;
  margin: 0 auto;
}

/* ===== 滚动入场动画 ===== */
.pd-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.pd-animate.pd-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===== 通用标题区（字母/标题/描述） ===== */
.pd-sec-head .pd-en {
  margin: 0;
  font-size: 12px;
  line-height: 19px;
  font-weight: 600;
  letter-spacing: 1.5px;
  color: #0F62FE;
}

.pd-sec-head h2 {
  margin: 4px 0 0;
  font-size: 36px;
  line-height: 58px;
  font-weight: 600;
  color: #0B2A5B;
}

.pd-sec-head .pd-lead {
  margin: 9px 0 0;
  font-size: 15px;
  line-height: 28px;
  color: #4E5D75;
}

.pd-abs-head {
  position: absolute;
  left: 137px;
  top: 52px;
}

.pd-head-light h2,
.pd-on-dark-text {
  color: #fff !important;
}

.pd-en-light {
  color: #fff !important;
}

.pd-prod-title {
  margin: 0;
  font-size: 28px;
  line-height: 30px;
  font-weight: 600;
  color: #0B2A5B;
}

/* ===== 带点列表 ===== */
.pd-dots {
  margin: 0;
  padding: 0;
  list-style: none;
}

.pd-dots li {
  position: relative;
  padding-left: 14px;
  font-size: 14px;
  color: #4E5D75;
}

.pd-dots li::before {
  content: "";
  position: absolute;
  left: 2px;
  top: 11px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #4E5D75;
}

.pd-dots-26 li {
  line-height: 26px;
}
.pd-dots-30{
    margin-top: 30px !important;
}

.pd-dots-30 li {
  line-height: 30px;
}

.pd-dots-30 li::before {
  top: 13px;
}
.pd-on-dark {
  color: #FAFAFA !important;
}

.pd-on-dark li {
  color: #fff;
}

.pd-on-dark li::before {
  background: #fff;
}

/* ===== 规格区通用 ===== */
.pd-spec-title {
  font-size: 13px;
  line-height: 19px;
  font-weight: 700;
  color: #0F62FE;
}

.pd-spec-line {
  margin: 0;
  font-size: 14px;
  line-height: 30px;
  color: #4E5D75;
}

.pd-spec-line em {
  margin: 0 10px;
  font-style: normal;
  color: #C9D3E4;
}

.pd-spec-box {
  max-width: 672px;
  margin-top: 38px;
  padding: 16px 19px;
  background: #FAFAFA;
  border-radius: 12px;
  box-sizing: border-box;
}

.pd-dots-30-list{
    margin-top: 12px !important;
}
.pd-spec-box-list{
    margin-top: 8px !important;
}

.pd-note {
  margin: 13px 0 0;
  font-size: 12px;
  line-height: 18px;
  color: #7E7E7E;
}

/* ===== 1. Banner 区 ===== */
.pd-banner {
  --edge-l: #08021D;
  --edge-r: linear-gradient(to bottom, #09010D, #0A040F 19%, #0C0F27 34%, #0A1932 50%, #0A030E 65%, #0A0613);
  position: relative;
  height: 662px;
  /* 背景图固定 1440 居中，两侧由取样自图片边缘的补色条过渡，避免适配时出现色差 */
  background:
    url("https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/hubImages/product/bannerbg.png") center top / 1440px 662px no-repeat,
    #08021D;
}

.pd-banner-main {
  position: absolute;
  left: 135px;
  top: 96px;
  width: 560px;
}

.pd-banner-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 38px;
  padding: 0 19px;
  border: 1px solid #0F62FE;
  border-radius: 999px;
  background: #E3EDFF;
  color: #0F62FE;
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
}

.pd-banner-tag i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0F62FE;
}

.pd-banner-main h1 {
  margin: 20px 0 0;
  font-size: 44px;
  line-height: 81px;
  font-weight: 500;
  color: #fff;
  letter-spacing: 0.05em;
}

.pd-banner-desc {
  max-width: 528px;
  margin: 5px 0 0;
  font-size: 15px;
  line-height: 28px;
  color: #EBEBEB;
}

.pd-banner-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 57px;
  margin-top: 29px;
  padding: 0 40px;
  background: #fff;
  border-radius: 12px;
  color: #0F62FE;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.pd-banner-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
}

.pd-banner-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 96px;
  background: rgba(255, 255, 255, 0.6);
}

.pd-banner-bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 210px;
  width: 1166px;
  height: 96px;
  margin: 0 auto;
  padding: 0 73px;
  box-sizing: border-box;
}

.pd-stat-v {
  font-size: 28px;
  line-height: 41px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
}

.pd-stat-v i {
  font-style: normal;
}

.pd-stat-l {
  margin-top: 4px;
  font-size: 13px;
  line-height: 19px;
  color: #F0F0F0;
  white-space: nowrap;
}

/* ===== 2. 手持式金属探测器系列 ===== */
.pd-s2 {
  padding: 73px 0 57px;
  background: #FAFAFA;
}

.pd-cards {
  margin-top: 22px;
}

.pd-card {
  display: flex;
  gap: 28px;
  padding: 22px 22px 28px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.pd-card + .pd-card {
  margin-top: 15px;
}

.pd-card-l {
  flex: none;
  width: 392px;
}

.pd-card-l h3 {
  margin: 0;
  font-size: 28px;
  line-height: 40px;
  font-weight: 600;
  color: #0B2A5B;
}

.pd-card-l img {
  display: block;
  width: 392px;
  height: 273px;
  margin-top: 22px;
  object-fit: cover;
  border-radius: 2px;
}

.pd-card-r {
  flex: 1;
  min-width: 0;
  margin-top: 10px;
}

.pd-card-intro {
  max-width: 560px;
  margin: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  color: #0F62FE;
}

.pd-card-r .pd-dots {
  margin-top: 16px;
}

/* ===== 3. 无线信号屏蔽器系列 ===== */
.pd-s3 {
  padding: 73px 0 57px;
  background: #fff;
}

.pd-jam1 {
  position: relative;
  height: 542px;
  margin-top: 28px;
}

.pd-jam1-bg {
  position: absolute;
  left: -36px;
  top: 0;
  width: 1166px;
  height: 542px;
}

.pd-jam1-body {
  position: absolute;
  right: 36px;
  top: 0;
  width: 729px;
  height: 542px;
  padding: 36px 36px 29px;
  box-sizing: border-box;
}

.pd-jam1-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pd-jam1-title h3 {
  margin: 0;
  font-size: 28px;
  line-height: 38px;
  font-weight: 600;
  color: #fff;
}

.pd-pill {
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  background: #0F62FE;
  border-radius: 999px;
  color: #fff;
  font-size: 12px;
}

.pd-jam1-desc {
  margin: 16px 0 0;
  font-size: 14px;
  line-height: 26px;
  color: #fff;
}

.pd-jam1-body .pd-dots {
  margin-top: 16px;
}

.pd-jam1-spec {
  margin-top: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  box-sizing: border-box;
}

.pd-spec-title-dark {
  color: #0A0D18;
}

.pd-spec-line-dark {
  color: rgba(8, 8, 8, 0.8);
}

.pd-spec-line-dark em {
  color: rgba(8, 8, 8, 0.35);
}

.pd-jam2 {
  display: flex;
  gap: 26px;
  margin-top: 62px;
}

.pd-jam2-card {
  flex: 1;
  min-width: 0;
  background: #fff;
  border: 1px solid #D6E3FA;
  border-radius: 12px;
  overflow: hidden;
}

.pd-jam2-img {
  display: block;
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.pd-jam2-body {
  padding: 26px 24px;
}

.pd-jam2-body h3 {
  margin: 0;
  font-size: 28px;
  line-height: 30px;
  font-weight: 600;
  color: #0B2A5B;
}

.pd-jam2-desc {
  margin: 16px 0 0;
  font-size: 14px;
  line-height: 20px;
  color: #4E5D75;
}

.pd-metrics {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-top: 16px;
  padding: 16px 19px;
  background: #FAFAFA;
  border-radius: 12px;
  box-sizing: border-box;
}

.pd-metric {
  flex: none;
}

.pd-metric-v {
  font-size: 16px;
  line-height: 25px;
  font-weight: 700;
  color: #0F62FE;
}

.pd-metric-l {
  margin-top: 6px;
  font-size: 12px;
  line-height: 16px;
  color: #4E5D75;
}

.pd-jam2-list {
  margin-top: 14px;
  padding: 16px 7px;
  background: #FAFAFA;
  border-radius: 12px;
  box-sizing: border-box;
}

.pd-jam2-list .pd-spec-title {
  padding: 0 12px;
}

.pd-jam2-list .pd-spec-line {
  margin-top: 7px;
  padding: 0 12px;
  line-height: 24px;
}

/* ===== 参数行（WIFI/无人机、非线性节点） ===== */
.pd-param-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  margin-top: 14px;
  padding: 0 30px;
  background: #fff;
  border-radius: 12px;
  box-sizing: border-box;
}

.pd-param-v {
  font-size: 17px;
  line-height: 25px;
  font-weight: 700;
  color: #0F62FE;
  white-space: nowrap;
}

.pd-param-l {
  margin-top: 2px;
  font-size: 12px;
  line-height: 18px;
  color: #4E5D75;
  white-space: nowrap;
}

.pd-param-row-dark {
  width: 696px;
  height: auto;
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.3);
}

.pd-param-row-dark .pd-param-v {
  font-size: 15px;
  line-height: 22px;
  color: #fff;
}

.pd-param-row-dark .pd-param-l {
  margin-top: 6px;
  font-size: 14px;
  line-height: 18px;
  color: #fff;
}

/* ===== 宽屏适配：1440 背景图两侧补色条 =====
   取样自背景图左右边缘的逐点颜色，用竖向渐变贴合，超宽屏时两侧与图无色差 ===== */
.pd-banner,
.pd-s4,
.pd-s5,
.pd-s6,
.pd-s7,
.pd-s8,
.pd-s9,
.pd-s10 {
  position: relative;
  isolation: isolate;
}

:is(.pd-banner, .pd-s4, .pd-s5, .pd-s6, .pd-s7, .pd-s8, .pd-s9, .pd-s10)::before,
:is(.pd-banner, .pd-s4, .pd-s5, .pd-s6, .pd-s7, .pd-s8, .pd-s9, .pd-s10)::after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  width: calc((100% - 1440px) / 2);
  pointer-events: none;
}

:is(.pd-banner, .pd-s4, .pd-s5, .pd-s6, .pd-s7, .pd-s8, .pd-s9, .pd-s10)::before {
  left: 0;
  background: var(--edge-l);
}

:is(.pd-banner, .pd-s4, .pd-s5, .pd-s6, .pd-s7, .pd-s8, .pd-s9, .pd-s10)::after {
  right: 0;
  background: var(--edge-r);
}

/* ===== 4. WIFI / 无人机屏蔽仪 ===== */
.pd-s4 {
  --edge-l: #F3F7FF;
  --edge-r: linear-gradient(to bottom, #6D7AA4, #7E90B0 12.5%, #939FC4 25%, #A9B6D5 37.5%, #BECBE0 50%, #D8DFEC 62.5%, #E7EAF5 75%, #A8B3D0 87.5%, #7E8DB3);
  height: 638px;
  background: #F3F7FF url("https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/hubImages/product/box3bg.png") center top / 1440px 638px no-repeat;
}

.pd-s4-body {
  position: absolute;
  left: 137px;
  top: 87px;
  width: 660px;
}

.pd-s4-desc {
  max-width: 530px;
  margin: 17px 0 0;
  font-size: 15px;
  line-height: 28px;
  color: #4E5D75;
}

.pd-s4-body .pd-dots {
  margin-top: 17px;
}

.pd-s4-note {
  max-width: 560px;
  margin: 33px 0 0;
  font-size: 12px;
  line-height: 18px;
  color: #4E5D75;
}

/* ===== 5/6. 右侧内容区（隐形耳机探测仪、手持手机探测器） ===== */
.pd-s5 {
  --edge-l: linear-gradient(to bottom, #D5D6DE, #D9DBDF 8%, #D6D8DE 22%, #D4D7DD 50%, #D9DBDF 58%, #C6C9CB 66%, #E3E4E8 71%, #E4E4E8 79%, #BBBCBF 83%, #B6B5B9 87%, #E3E5E8 91%, #E4E6EB);
  --edge-r: linear-gradient(to bottom, #EBEDEF, #E8EAEE 8%, #E6E9EE 25%, #E5E7EB 40%, #E3E6EA 58%, #E2E5EB 66%, #E1E4E8 75%, #E3E6EA 87%, #E6EAEE);
  height: 806px;
  background: #D5D8DE url("https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/hubImages/product/box4bg.png") center top / 1440px 806px no-repeat;
}

.pd-s6 {
  --edge-l: linear-gradient(to bottom, #EDF4FC, #EEF6FC 12.5%, #EFF6FC 25%, #F1F8FE 37.5%, #F0F6FC 50%, #E5EBF3 62.5%, #E3E9F1 75%, #E4E9F1 87.5%, #DEE4EC);
  --edge-r: linear-gradient(to bottom, #ECF3FC, #E9F0FA 12.5%, #E9F0FA 25%, #EBF2FB 37.5%, #ECF2FC 50%, #EBF1FB 62.5%, #E9EFF9 75%, #EBF1FB 87.5%, #E4EBF5);
  height: 741px;
  background: #F0F6FD url("https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/hubImages/product/box5bg.png") center top / 1440px 741px no-repeat;
}

.pd-side-body {
  position: absolute;
  left: 840px;
  top: 160px;
  width: 463px;
}

.pd-s6-body {
  top: 54px;
  width: 600px !important;
  right: 137px;
  left: auto;
}

.pd-side-desc {
  max-width: 458px;
  margin: 22px 0 0;
  font-size: 14px;
  line-height: 26px;
  color: #4E5D75;
}

.pd-side-body .pd-dots {
  margin-top: 14px;
}

.pd-side-spec {
  margin-top: 14px;
  padding: 14px 15px 21px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  box-sizing: border-box;
}

.pd-side-spec .pd-spec-line {
  margin-top: 6px;
}

.pd-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.pd-tag {
  display: inline-flex;
  align-items: center;
  height: 31px;
  padding: 0 14px;
  background: #E3EDFF;
  border-radius: 999px;
  color: #0F62FE;
  font-size: 12px;
  font-weight: 500;
}

.pd-tag-dark {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

/* ===== 7. 一型电子仪器探测门 ===== */
.pd-s7 {
  --edge-l: linear-gradient(to bottom, #00000B, #010915 7%, #030D1C 15%, #061324 22%, #09192B 29%, #0B1E31 36%, #102437 44%, #173040 53%, #11161C 61%, #05090C 69%, #151F25 76%, #485B75 84%, #415269 92%, #0F122B);
  --edge-r: linear-gradient(to bottom, #051532, #1D345D 7%, #132447 15%, #28406A 22%, #294169 29%, #2D4672 36%, #3E5985 44%, #5D79A8 53%, #7A98C2 61%, #ADC5E4 69%, #536A8F 76%, #576989 84%, #0E1830 92%, #101531);
  height: 859px;
  background: #193345 url("https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/hubImages/product/box6bg.png") center top / 1440px 859px no-repeat;
}

.pd-s7-body {
  position: absolute;
  left: 137px;
  top: 77px;
  width: 700px;
}

.pd-s7-desc {
  max-width: 680px;
  margin: 19px 0 0;
  font-size: 14px;
  line-height: 26px;
  color: #C9D9F5;
}

.pd-s7-grid {
  display: grid;
  grid-template-columns: repeat(2, 340px);
  gap: 12px 16px;
  margin-top: 14px;
}

.pd-s7-block {
  width: 340px;
  height: 78px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  box-sizing: border-box;
}

.pd-s7-block-t {
  font-size: 15px;
  line-height: 22px;
  font-weight: 700;
  color: #fff;
}

.pd-s7-block-d {
  margin-top: 6px;
  font-size: 14px;
  line-height: 18px;
  color: #fff;
}

.pd-s7-params {
  width: 696px;
  margin-top: 17px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  box-sizing: border-box;
}

.pd-s7-param-line {
  margin: 6px 0 0;
  font-size: 14px;
  line-height: 24px;
  color: #fff;
}

.pd-s7-param-line em {
  margin: 0 10px;
  font-style: normal;
  color: rgba(255, 255, 255, 0.4);
}

/* ===== 8. 非线性节点探测器 ===== */
.pd-s8 {
  --edge-l: linear-gradient(to bottom, #12161C, #090B1D 12.5%, #050516 25%, #040312 37.5%, #01020F 50%, #00010E 62.5%, #01000F 75%, #010001 87.5%, #000000);
  --edge-r: linear-gradient(to bottom, #101930, #0E122E 12.5%, #0C112B 25%, #0A0F27 37.5%, #090C21 50%, #070A1F 62.5%, #070C1E 75%, #111024 87.5%, #040311);
  height: 656px;
  background: #020310 url("https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/hubImages/product/box7bg.png") center top / 1440px 656px no-repeat;
}

.pd-s8-body {
  position: absolute;
  left: 137px;
  top: 106px;
  width: 700px;
}

.pd-s8-body .pd-dots {
  margin-top: 14px;
}

.pd-s8-note {
  max-width: 660px;
  margin: 14px 0 0;
  font-size: 12px;
  line-height: 18px;
  color: rgba(250, 250, 250, 0.8);
}

/* ===== 9. 身份核验类 ===== */
.pd-s9 {
  --edge-l: linear-gradient(to bottom, #545F8D, #6E7EA9 12%, #8293C0 20%, #94A8D3 30%, #7383B0 35%, #50587E 41%, #2E2F4C 49%, #201D33 57.5%, #1F1D32 66%, #1D1C30 74%, #161524 83%, #151424 91%, #16151F);
  --edge-r: linear-gradient(to bottom, #606E9A, #7B8AB2 12%, #8B9ECA 20%, #A3B6DC 30%, #8597C2 35%, #535D85 41%, #2D2C46 49%, #1F2037 57.5%, #202036 66%, #1A192B 74%, #171627 83%, #131320 91%, #15131D);
  height: 1370px;
  background: #1D1C31 url("https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/hubImages/product/box8bg.png") center top / 1440px 1370px no-repeat;
}

.pd-s9 .pd-abs-head {
  top: 51px;
}

.pd-face-card {
  position: absolute;
  left: 137px;
  top: 572px;
  width: 1166px;
  padding: 36px 45px 50px;
  background: rgba(243, 247, 255, 0.6);
  border: 1px solid #D6E3FA;
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(28, 79, 217, 0.06);
  box-sizing: border-box;
}

.pd-face-desc {
  margin: 19px 0 0;
  font-size: 14px;
  line-height: 26px;
  color: #fff;
}

.pd-face-box {
  margin-top: 15px;
  padding: 22px;
  background: #fff;
  border-radius: 12px;
  box-sizing: border-box;
}

.pd-face-box .pd-spec-title {
  font-weight: 500;
}

.pd-face-box .pd-spec-line {
  margin-top: 8px;
  line-height: 24px;
}

.pd-face-box-gap {
  margin-top: 16px;
}

.pd-face-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px 22px;
  margin-top: 32px;
}

.pd-face-cell {
  margin-top: 0;
}

/* ===== 10. 面试考场设备 ===== */
.pd-s10 {
  --edge-l: linear-gradient(to bottom, #040154, #080863 6%, #080267 12%, #0B1484 23%, #0B0E71 34%, #04083C 45%, #010B26 56%, #010B26 77%, #050F29);
  --edge-r: linear-gradient(to bottom, #151E79, #233498 6%, #2338A0 11%, #374EB8 12.2%, #2339A3 14%, #385BD2 23%, #2B3FA9 34%, #0A1446 45%, #010B25 56%, #010B26 77%, #050F29);
  height: 1433px;
  background: #080D40 url("https://newpr-develop.oss-cn-hangzhou.aliyuncs.com/zcyp-classroom/hubImages/product/box9bg.png") center top / 1440px 1433px no-repeat;
}

.pd-s10 .pd-abs-head {
  top: 64px;
}

.pd-s10 .pd-stage {
  padding-top: 601px;
  box-sizing: border-box;
}

.pd-s10-cols {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.pd-s10-col {
  width: 520px;
}

.pd-s10-col-right {
  text-align: right;
}

.pd-s10-desc {
  max-width: 520px;
  margin: 34px 0 0;
  font-size: 14px;
  line-height: 24px;
  color: #fff;
}

.pd-s10-col-right .pd-s10-desc {
  margin-left: auto;
}

.pd-s10-col .pd-dots {
  margin-top: 14px;
}

.pd-s10-col-right .pd-dots li {
  padding-left: 0;
  padding-right: 0;
}

/* 打点的点跟在文本左侧（• 文本作为整体靠右），而不是甩到行尾 */
.pd-s10-col-right .pd-dots li::before {
  position: static;
  display: inline-block;
  left: auto;
  right: auto;
  width: 4px;
  height: 4px;
  margin-right: 10px;
  vertical-align: middle;
}

.pd-s10-spec {
  width: 515px;
  margin-top: 25px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  box-sizing: border-box;
  text-align: left;
}

.pd-s10-col-right .pd-s10-spec {
  margin-left: auto;
  text-align: right;
}

.pd-s10-spec-title {
  font-size: 13px;
  line-height: 19px;
  font-weight: 600;
  color: #fff;
}

.pd-s10-spec-line {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 24px;
  color: #FBFBFB;
}

.pd-s10-spec-line em {
  margin: 0 10px;
  font-style: normal;
  color: rgba(255, 255, 255, 0.4);
}

.pd-s10-spec-img {
  display: block;
  margin-top: 21px;
  object-fit: contain;
}

.pd-s10-col-right .pd-s10-spec-img {
  margin-left: auto;
}

.pd-s10-tags {
  display: flex;
  justify-content: center;
  gap: 11px;
  margin-top: 43px;
}

/* ===== 11. 产品汇总表 ===== */
.pd-s11 {
  padding: 86px 0 77px;
  background: #F0F5FF;
}

.pd-table-wrap {
  margin-top: 53px;
  background: #fff;
  border: 1px solid #D6E3FA;
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(28, 79, 217, 0.06);
  overflow: hidden;
}

.pd-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.pd-table th {
  height: 52px;
  padding: 0 24px;
  background: #fff;
  border-bottom: 1px solid #D6E3FA;
  font-size: 14px;
  font-weight: 700;
  color: #0F62FE;
  text-align: left;
}

.pd-table td {
  height: 56px;
  padding: 0 24px;
  border-bottom: 1px solid #E7EEFB;
  font-size: 13px;
  font-weight: 400;
  color: #4E5D75;
}

.pd-table th:nth-child(1),
.pd-table td:nth-child(1) {
  width: 340px;
}

.pd-table th:nth-child(2),
.pd-table td:nth-child(2) {
  width: 370px;
}

.pd-table tbody tr:nth-child(even) {
  background: #F3F7FF;
}

.pd-table tbody tr:last-child td {
  border-bottom: none;
}

.pd-td-name {
  font-weight: 500;
  color: #0B2A5B;
}
/* ============================================================
   移动端版本（pm- 前缀，≤1024px 生效，PC 端 DOM/CSS/script 零改动）
   · 桌面（>1024px）隐藏移动根；≤1024px 隐藏桌面根、显示移动根
   · 所有移动样式限定在 .pm-page 作用域内
   · 不给 .pm-page 设 overflow:hidden，避免破坏 sticky 导航
   ============================================================ */
.pm-page {
  display: none;
}

@media (max-width: 1024px) {
  .pd-page {
    display: none;
  }

  .pm-page {
    display: block;
  }
}

.pm-page {
  --pm-blue: #0F62FE;
  --pm-ink: #0B2A5B;
  --pm-muted: #4E5D75;
  font-family: Inter, "SF Pro Display", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  color: var(--pm-ink);
  background: #fff;
}

.pm-container {
  width: calc(100% - 32px);
  margin: 0 auto;
}

/* 入场动画（移动独立 observer：.pm-animate → .pm-visible） */
.pm-animate {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.pm-animate.pm-visible {
  opacity: 1;
  transform: none;
}

/* ===== 1. Banner ===== */
/* banner：文字在深色底上置顶，产品全家福（裁切后）作主视觉，数值卡殿后 */
.pm-banner {
  padding: 44px 0 30px;
  background: #090413;
  color: #fff;
}

/* 裁掉图左侧空白区与上下空边，只留产品全家福 */
.pm-banner-photo {
  position: relative;
  width: 100%;
  height: 0;
  margin-top: 24px;
  padding-bottom: 56%;
  overflow: hidden;
}

.pm-banner-photo img {
  position: absolute;
  top: -6%;
  left: -65%;
  width: 165%;
  height: auto;
}

.pm-banner-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px;
  background: rgba(15, 98, 254, 0.18);
  border: 1px solid rgba(15, 98, 254, 0.6);
  border-radius: 999px;
  font-size: 12px;
  color: #9CC0FF;
}

.pm-banner-tag i {
  width: 6px;
  height: 6px;
  background: #0F62FE;
  border-radius: 50%;
}

.pm-banner-title {
  margin: 16px 0 0;
  font-size: 26px;
  line-height: 38px;
  font-weight: 700;
  color: #fff;
}

.pm-banner-desc {
  margin: 12px 0 0;
  font-size: 14px;
  line-height: 24px;
  color: rgba(255, 255, 255, 0.78);
}

.pm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 11px 28px;
  background: #0F62FE;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
}

.pm-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 26px;
}

/* 数值卡白底蓝字，深色背景上清晰可读 */
.pm-stat {
  padding: 14px;
  background: #fff;
  border-radius: 12px;
}

.pm-stat-v {
  font-size: 24px;
  line-height: 30px;
  font-weight: 700;
  color: var(--pm-blue);
}

.pm-stat-v i {
  margin-left: 2px;
  font-style: normal;
  font-size: 13px;
  color: var(--pm-ink);
}

.pm-stat-l {
  margin-top: 4px;
  font-size: 12px;
  line-height: 18px;
  color: var(--pm-muted);
}

/* ===== 区块通用 ===== */
.pm-section {
  padding: 40px 0;
}

.pm-section-grey {
  background: #F5F8FF;
}

.pm-section-blue {
  background: #F0F5FF;
}

.pm-en {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--pm-blue);
}

.pm-sec-head h2 {
  margin: 0;
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  color: var(--pm-ink);
}

.pm-lead {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 24px;
  color: var(--pm-muted);
}

.pm-showcase {
  display: block;
  width: 100%;
  height: auto;
  margin-top: 22px;
  border-radius: 14px;
}

.pm-prod-title {
  margin: 22px 0 0;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  color: var(--pm-ink);
}

.pm-desc {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 24px;
  color: var(--pm-muted);
}

/* 打点列表 */
.pm-dots {
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
}

.pm-dots li {
  position: relative;
  padding-left: 14px;
  margin-top: 8px;
  font-size: 14px;
  line-height: 24px;
  color: var(--pm-muted);
}

.pm-dots li::before {
  content: "";
  position: absolute;
  left: 2px;
  top: 10px;
  width: 4px;
  height: 4px;
  background: var(--pm-blue);
  border-radius: 50%;
}

.pm-dots-dark li {
  color: rgba(255, 255, 255, 0.85);
}

.pm-dots-dark li::before {
  background: #fff;
}

/* 规格块 */
.pm-spec-box {
  margin-top: 16px;
  padding: 14px;
  background: #EAF1FF;
  border-radius: 12px;
}

.pm-spec-title {
  font-size: 13px;
  line-height: 19px;
  font-weight: 700;
  color: var(--pm-blue);
}

.pm-spec-line {
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 22px;
  color: var(--pm-muted);
}

.pm-spec-line em {
  margin: 0 6px;
  font-style: normal;
  color: #C9D3E4;
}

.pm-note {
  margin: 12px 0 0;
  font-size: 12px;
  line-height: 18px;
  color: #8A94A6;
}

/* 卡片（探测器/屏蔽器/显示器） */
.pm-card {
  margin-top: 20px;
  padding: 18px 16px 20px;
  background: #fff;
  border: 1px solid #E4EBF7;
  border-radius: 14px;
}

.pm-card .pm-prod-title {
  margin-top: 0;
}

.pm-card-img {
  display: block;
  width: 100%;
  height: auto;
  margin-top: 12px;
  border-radius: 10px;
}

/* 指标 / 参数（2x2） */
.pm-metrics,
.pm-params {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 14px;
}

.pm-metric,
.pm-param {
  padding: 12px 14px;
  background: #F5F8FF;
  border-radius: 10px;
}

.pm-metric-v,
.pm-param-v {
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  color: var(--pm-blue);
}

.pm-metric-l,
.pm-param-l {
  margin-top: 2px;
  font-size: 12px;
  line-height: 18px;
  color: var(--pm-muted);
}

/* 奇数个参数时末项占整行 */
.pm-params .pm-param:last-child:nth-child(odd) {
  grid-column: 1 / -1;
}

/* 深色卡（信令级屏蔽器） */
.pm-dark-card {
  margin-top: 18px;
  padding: 20px 16px;
  background: #101B3D;
  border-radius: 16px;
  color: #fff;
}

.pm-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.pm-dark-card .pm-prod-title {
  margin: 0;
  color: #fff;
}

.pm-dark-card .pm-desc {
  color: rgba(255, 255, 255, 0.8);
}

.pm-pill {
  flex: none;
  padding: 4px 10px;
  background: rgba(15, 98, 254, 0.25);
  border: 1px solid rgba(122, 162, 255, 0.5);
  border-radius: 999px;
  font-size: 12px;
  color: #A9C4FF;
}

.pm-spec-box-dark {
  background: rgba(255, 255, 255, 0.08);
}

.pm-spec-box-dark .pm-spec-title {
  color: #7AB0FF;
}

.pm-spec-box-dark .pm-spec-line {
  color: rgba(255, 255, 255, 0.8);
}

.pm-spec-box-dark .pm-spec-line em {
  color: rgba(255, 255, 255, 0.35);
}

/* 功能块（探测门 2 列 / 身份核验单列） */
.pm-blocks {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 16px;
}

/* 功能块：白色实体卡片（在灰底区块上可见） */
.pm-block {
  padding: 12px 14px;
  background: #fff;
  border: 1px solid #E4EBF7;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(28, 79, 217, 0.06);
}

.pm-block-t {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: var(--pm-ink);
}

.pm-block-d {
  margin-top: 4px;
  font-size: 12px;
  line-height: 18px;
  color: var(--pm-muted);
}

/* 标签 */
.pm-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.pm-tag {
  padding: 6px 14px;
  background: #EAF1FF;
  border-radius: 999px;
  font-size: 12px;
  color: var(--pm-blue);
}

/* 规格块内产品图 */
.pm-spec-img {
  display: block;
  width: 100%;
  height: auto;
  margin-top: 12px;
  border-radius: 10px;
}

/* 11. 产品汇总表（横向滚动） */
.pm-table-wrap {
  margin-top: 18px;
  background: #fff;
  border: 1px solid #D6E3FA;
  border-radius: 12px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.pm-table {
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
}

.pm-table th {
  padding: 12px 14px;
  background: #fff;
  border-bottom: 1px solid #D6E3FA;
  font-size: 13px;
  font-weight: 700;
  color: var(--pm-blue);
  text-align: left;
  white-space: nowrap;
}

.pm-table td {
  padding: 12px 14px;
  border-bottom: 1px solid #E7EEFB;
  font-size: 12px;
  line-height: 20px;
  color: var(--pm-muted);
}

.pm-table tr:nth-child(even) td {
  background: #F3F7FF;
}

.pm-td-name {
  font-weight: 600;
  color: var(--pm-ink);
  white-space: nowrap;
}

.pm-table-tip {
  margin: 10px 0 0;
  font-size: 12px;
  color: #98A2B3;
  text-align: center;
}

/* 图上叠放标题/描述（身份核验类）：不裁图，用底部渐变压暗补住留白 */
.pm-hero {
  position: relative;
  margin-top: 22px;
  border-radius: 14px;
  overflow: hidden;
}

.pm-hero img {
  display: block;
  width: 100%;
  height: auto;
}

.pm-hero-copy {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 44px 14px 16px;
  background: linear-gradient(180deg, rgba(9, 4, 19, 0) 0%, rgba(9, 4, 19, 0.72) 30%, rgba(9, 4, 19, 0.92) 100%);
}

.pm-hero-copy .pm-prod-title {
  margin: 0;
  color: #fff;
}

.pm-hero-copy .pm-desc {
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.85);
}

/* 大图裁切展示：只保留图上半部分的产品画面（考场设备类） */
.pm-crop {
  position: relative;
  height: 0;
  margin-top: 22px;
  padding-bottom: 54%;
  border-radius: 14px;
  overflow: hidden;
}

.pm-crop img {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: auto;
}

/* 紧凑功能块（身份核验类，一行两个） */
.pm-blocks-tight {
  gap: 8px;
}

.pm-blocks-tight .pm-block {
  padding: 10px 12px;
}

.pm-blocks-tight .pm-block-t {
  font-size: 13px;
  line-height: 18px;
}

.pm-blocks-tight .pm-block-d {
  margin-top: 2px;
  font-size: 11px;
  line-height: 16px;
}

/* 手机级微调（≤560px） */
@media (max-width: 560px) {
  .pm-banner-title {
    font-size: 22px;
    line-height: 32px;
  }

  .pm-sec-head h2 {
    font-size: 21px;
    line-height: 29px;
  }

  .pm-stat-v {
    font-size: 21px;
    line-height: 27px;
  }
}
</style>
