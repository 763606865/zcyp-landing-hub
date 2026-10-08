export interface Product {
  slug: string
  eyebrow: string
  name: string
  summary: string
  description: string
  accent: string
  features: string[]
  scenarios: string[]
  metric: string
  metricLabel: string
  contactProduct: 1 | 2 | 3 | 4 | 99
}

export const products: Product[] = [
  {
    slug: 'enterprise-platform',
    eyebrow: '企业效率',
    name: '企业协作平台',
    summary: '让团队、流程与业务数据在一个工作台中高效协同。',
    description: '面向成长型组织的一体化协作解决方案，帮助团队减少重复沟通、规范业务流程，并实时掌握项目进展。',
    accent: '#ff6b35',
    features: ['统一工作入口', '灵活流程配置', '实时数据看板', '多端安全访问'],
    scenarios: ['跨部门项目协作', '销售过程管理', '内部审批流转'],
    metric: '30%',
    metricLabel: '示例：流程效率提升',
    contactProduct: 1,
  },
  {
    slug: 'data-insight',
    eyebrow: '数据智能',
    name: '经营分析系统',
    summary: '把分散数据转化为清晰、及时、可行动的经营洞察。',
    description: '连接企业核心数据源，用直观的指标与趋势呈现业务状态，让管理者更快发现问题并做出判断。',
    accent: '#ff9f00',
    features: ['多源数据接入', '核心指标管理', '自助分析看板', '异常趋势提醒'],
    scenarios: ['管理驾驶舱', '渠道效果分析', '业务目标追踪'],
    metric: '1站式',
    metricLabel: '示例：经营数据总览',
    contactProduct: 2,
  },
  {
    slug: 'customer-growth',
    eyebrow: '客户增长',
    name: '智能营销工具',
    summary: '覆盖获客、培育与转化，让每一次触达更有价值。',
    description: '围绕客户全生命周期构建精细化运营能力，用自动化触达和效果归因持续优化推广投入。',
    accent: '#4056a1',
    features: ['客户线索沉淀', '自动化运营', '多渠道触达', '转化效果归因'],
    scenarios: ['广告线索承接', '私域客户运营', '老客复购激活'],
    metric: '全链路',
    metricLabel: '示例：客户旅程覆盖',
    contactProduct: 3,
  },
  {
    slug: 'escort',
    eyebrow: '安全交付',
    name: '保密制卷与安保押运',
    summary: '从试卷保密印刷、安全押运到阅卷交付的全流程安保服务。',
    description: '中测高科拥有国家秘密载体印制乙级资质、安保资质和信息安全认证，自有安保团队，在全国建设有8大交付中心，覆盖全国32个省市，保障每一次考试交付的高效安全与公正。',
    accent: '#0F62FE',
    features: ['国家乙级涉密资质', '八大交付中心', '全程信息化管控', '警察武装押运'],
    scenarios: ['人事考试安全交付', '试卷保密印刷押运', '阅卷全流程安保'],
    metric: '32省市',
    metricLabel: '全国服务网络覆盖',
    contactProduct: 4,
  },
]

export const getProduct = (slug: string) => products.find(product => product.slug === slug)
