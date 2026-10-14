import type { FunctionDirective } from 'vue'

/**
 * 全局自定义指令类型声明（app/plugins/directives.ts 中通过 vueApp.directive 注册）
 * 仅供模板类型检查使用，无运行时代码。
 */
type CountUpDirective = FunctionDirective<HTMLElement, number>

declare module 'vue' {
  interface GlobalDirectives {
    vCountUp: CountUpDirective
  }
}

declare module '@vue/runtime-core' {
  interface GlobalDirectives {
    vCountUp: CountUpDirective
  }
}
