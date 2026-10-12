// 统一页脚数据（与 zcyp-web/app/composables/portal-home-content.ts 的页脚保持一致）
// 说明：站内路由（宣传页自身页面）使用相对路径，站外站点使用完整 URL。

export interface FooterLink {
  label: string
  href: string
}

export interface FooterLinkGroup {
  title: string
  links: FooterLink[]
}

export const portalFooterGroups: FooterLinkGroup[] = [
  {
    title: '热门推荐',
    links: [
      { label: '中测易聘', href: 'https://zcyp-web.jxhrm.com' },
      { label: '中测培训', href: 'https://zcyp-classroom-web.jxhrm.com' },
      { label: '中测猎头', href: 'https://zcyp-hunter-web.jxhrm.com' },
      { label: '中测校招', href: 'https://zcyp-web.jxhrm.com/school' },
      { label: 'HR事务所', href: 'https://zcyp-web.jxhrm.com/hr' },
    ],
  },
  {
    title: '纸笔考试类产品',
    links: [
      { label: '中测命题', href: '/' },
      { label: '中测阅卷', href: '/marking' },
      { label: '制卷与押运', href: '/escort' },
      { label: '题库共建', href: '/questionBank' },
      { label: '职业技能题库建设', href: '/skillCert' },
    ],
  },
  {
    title: '测评科技生态类',
    links: [
      { label: '在线报名', href: 'https://zk.sun-hrm.com/index.php' },
      { label: '机考系统', href: '/computerService' },
      { label: '在线考试系统', href: '/onlineTest' },
      { label: '题库系统', href: '/question' },
      { label: 'AI面试系统', href: '/aiInterview' },
      { label: '无纸化面试评分（面试指挥平台）', href: '/paperlessInterview' },
    ],
  },
  {
    title: '',
    links: [
      { label: 'AI考务智能体', href: '/antiCheating' },
      { label: '心理测评工具', href: 'https://check.myjobseek.com.cn' },
      { label: '应试能力测评', href: 'https://gangwei.jxujob.com/' },
      { label: '成绩分析系统', href: '/scoreAnalysis' },
      { label: '中测高科考务科技产品', href: '/' },
    ],
  },
]

export const portalFooterContact = {
  qrTitle: '关注中测高科公众号',
  qrCode: '/assets/images/wechat-official-account-qr-code.jpg',
  label: '联系方式',
  phones: ['400-825-1513', '15870685766'],
  email: '258864649@qq.com',
} as const

// 备案信息栏（与 zcyp-web 页脚默认值保持一致，后续替换为真实备案信息）
export const portalFooterRecord = {
  icpNo: '京ICP备120xxxx925号',
  publicSecurityNo: '京公网安备 11222310502059392号',
  siteName: '中测易聘',
  humanResourceLicense: '人力资源许可证：1101051996081号',
  recruitPhone: '招聘电话：400-885-9898',
} as const
