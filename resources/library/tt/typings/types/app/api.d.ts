import { TrivialPageInstance } from "./page"
interface Fields {
  /** 指定样式名列表，返回节点对应样式名的当前值 */
  computedStyle?: string[]
  /** 是否返回节点对应的 Context 对象 */
  context?: boolean
  /** 是否返回节点 dataset */
  dataset?: boolean
  /** 是否返回节点 id */
  id?: boolean
  /** 是否返回节点 mark */
  mark?: boolean
  /** 是否返回节点对应的 Node 实例 */
  node?: boolean
  /** 指定属性名列表，返回节点对应属性名的当前属性值（只能获得组件文档中标注的常规属性值，id class style 和事件绑定的属性值不可获取） */
  properties?: string[]
  /** 是否返回节点布局位置（`left` `right` `top` `bottom`） */
  rect?: boolean
  /** 否 是否返回节点的 `scrollLeft` `scrollTop`，节点必须是 `scroll-view` 或者 `viewport` */
  scrollOffset?: boolean
  /** 是否返回节点尺寸（`width` `height`） */
  size?: boolean
}

/** 回调函数 */
type FieldsCallback = (
  /** 节点的相关信息 */
  res: Record<string, any>
) => void

export interface BoundingClientRectCallbackResult {
  /** 节点的下边界坐标 */
  bottom: number
  /** 节点的 dataset */
  dataset: Record<string, any>
  /** 节点的高度 */
  height: number
  /** 节点的 ID */
  id: string
  /** 节点的左边界坐标 */
  left: number
  /** 节点的右边界坐标 */
  right: number
  /** 节点的上边界坐标 */
  top: number
  /** 节点的宽度 */
  width: number
}

/** 回调函数，在执行 `SelectorQuery.exec` 方法后，节点信息会在 `callback` 中返回。 */
type BoundingClientRectCallback = (
  result: BoundingClientRectCallbackResult
) => void

interface NodeCallbackResult {
  /** 节点对应的 Node 实例 */
  node: Record<string, any>
}

/** 回调函数，在执行 `SelectorQuery.exec` 方法后，返回节点信息。 */
type NodeCallback = (result: NodeCallbackResult) => void

interface ScrollOffsetCallbackResult {
  /** 节点的 dataset */
  dataset: Record<string, any>
  /** 节点的 ID */
  id: string
  /** 节点的水平滚动位置 */
  scrollLeft: number
  /** 节点的竖直滚动位置 */
  scrollTop: number
}
/** 回调函数，在执行 `SelectorQuery.exec` 方法后，节点信息会在 `callback` 中返回。 */
type ScrollOffsetCallback = (result: ScrollOffsetCallbackResult) => void
/** 目标边界 */
interface BoundingClientRectResult {
  /** 下边界 */
  bottom: number
  /** 高度 */
  height: number
  /** 左边界 */
  left: number
  /** 右边界 */
  right: number
  /** 上边界 */
  top: number
  /** 宽度 */
  width: number
}
export interface IntersectionObserverObserveCallbackResult {
  /** 目标边界 */
  boundingClientRect: BoundingClientRectResult
  /** 相交比例 */
  intersectionRatio: number
  /** 相交区域的边界 */
  intersectionRect: IntersectionRectResult
  /** 参照区域的边界 */
  relativeRect: RelativeRectResult
  /** 相交检测时的时间戳 */
  time: number
}
/** 相交区域的边界 */
interface IntersectionRectResult {
  /** 下边界 */
  bottom: number
  /** 高度 */
  height: number
  /** 左边界 */
  left: number
  /** 右边界 */
  right: number
  /** 上边界 */
  top: number
  /** 宽度 */
  width: number
}
/** 参照区域的边界 */
interface RelativeRectResult {
  /** 下边界 */
  bottom: number
  /** 左边界 */
  left: number
  /** 右边界 */
  right: number
  /** 上边界 */
  top: number
}
/** 监听相交状态变化的回调函数 */
type IntersectionObserverObserveCallback = (
  result: IntersectionObserverObserveCallbackResult
) => void

/** 用来扩展（或收缩）参照节点布局区域的边界 */
interface Margins {
  /** 节点布局区域的下边界 */
  bottom?: number
  /** 节点布局区域的左边界 */
  left?: number
  /** 节点布局区域的右边界 */
  right?: number
  /** 节点布局区域的上边界 */
  top?: number
}
interface NodesRef {
  /**
   * 添加节点的布局位置的查询请求。相对于显示区域，以像素为单位。其功能类似于 DOM 的 `getBoundingClientRect`。返回 `NodesRef` 对应的 `SelectorQuery`。
   */
  boundingClientRect: (
    /** 回调函数，在执行 `SelectorQuery.exec` 方法后，节点信息会在 `callback` 中返回。 */
    callback?: BoundingClientRectCallback
  ) => SelectorQuery
  /**
   * 获取节点的相关信息。需要获取的字段在fields中指定。返回值是 `nodesRef` 对应的 `selectorQuery`
   *
   * **注意**
   * computedStyle 的优先级高于 size，当同时在 computedStyle 里指定了 width/height 和传入了 size: true，则优先返回 computedStyle 获取到的 width/height。
   */
  fields: (
    fields: Fields,
    /** 回调函数 */
    callback?: FieldsCallback
  ) => SelectorQuery
  /**
   * 获取 Node 节点实例。目前支持 Canvas 的获取。
   */
  node: (
    /** 回调函数，在执行 `SelectorQuery.exec` 方法后，返回节点信息。 */
    callback?: NodeCallback
  ) => SelectorQuery
  /**
   * 添加节点的滚动位置查询请求。以像素为单位。节点必须是 `scroll-view` 或者 `viewport`，返回 `NodesRef` 对应的 `SelectorQuery`。
   *
   */
  scrollOffset: (
    /** 回调函数，在执行 `SelectorQuery.exec` 方法后，节点信息会在 `callback` 中返回。 */
    callback?: ScrollOffsetCallback
  ) => SelectorQuery
}

export interface SelectorQuery {
  /**
   * 执行所有的请求。请求结果按请求次序构成数组，在callback的第一个参数中返回。
   */
  exec: (
    /** 回调函数 */
    callback?: (...args: any[]) => any
  ) => NodesRef
  /**
   * ### 在当前页面下选择第一个匹配选择器 `selector` 的节点。
   * 返回一个 `NodesRef` 对象实例，可以用于获取节点信息。
   *
   * **selector 语法**
   *
   * selector类似于 CSS 的选择器，但仅支持下列语法。
   *
   * - ID选择器：#the-id
   * - class选择器（可以连续指定多个）：.a-class.another-class
   * - 子元素选择器：.the-parent > .the-child
   * - 后代选择器：.the-ancestor .the-descendant
   * - 跨自定义组件的后代选择器：.the-ancestor >>> .the-descendant
   * - 多选择器的并集：#a-node, .some-other-nodes */
  select: (
    /** 选择器 */
    selector: string
  ) => NodesRef
  /**
   *
   * ### 在当前页面下选择匹配选择器 selector 的所有节点。
   *
   * **selector 语法**
   *
   * selector类似于 CSS 的选择器，但仅支持下列语法。
   *
   * - id 选择器：#the-id
   * - class 选择器（可以连续指定多个）：.a-class.another-class
   * - 子元素选择器：.the-parent > .the-child
   * - 后代选择器：.the-ancestor .the-descendant
   * - 跨自定义组件的后代选择器：.the-ancestor >>> .the-descendant
   * - 多选择器的并集：#a-node, .some-other-nodes */
  selectAll: (
    /** 选择器 */
    selector: string
  ) => NodesRef
  /** 选择显示区域。可用于获取显示区域的尺寸、滚动位置等信息。*/
  selectViewport: () => NodesRef
  /**
   * 将选择器的选取范围更改为自定义组件 `component` 内。（初始时，选择器仅选取页面范围的节点，不会选取任何自定义组件中的节点）。
   */
  in: (
    /** 自定义组件实例 */
    // TODO: 需要加上 componentInstance
    component: TrivialPageInstance
  ) => SelectorQuery
}

/** 选项 */
export interface CreateIntersectionObserverOption {
  /** 初始的相交比例，如果调用时检测到的相交比例与这个值不相等且达到阈值，则会触发一次监听器的回调函数。 */
  initialRatio?: number
  /** 是否同时观测多个目标节点（而非一个），如果设为 true ，observe 的 targetSelector 将选中多个节点（注意：同时选中过多节点将影响渲染性能）*/
  observeAll?: boolean
  /** 一个数值数组，包含所有阈值。*/
  thresholds?: number[]
}

export interface IntersectionObserver {
  /** 停止监听。回调函数将不再触发 */
  disconnect: () => void
  /** 指定目标节点并开始监听相交状态变化情况 */
  observe: (
    /** 选择器 */
    targetSelector: string,
    /** 监听相交状态变化的回调函数 */
    callback: IntersectionObserverObserveCallback
  ) => void
  /** 使用选择器指定一个节点，作为参照区域之一。 */
  relativeTo: (
    /** 选择器 */
    selector: string,
    /** 用来扩展（或收缩）参照节点布局区域的边界 */
    margins?: Margins
  ) => IntersectionObserver
  /** 指定页面显示区域作为参照区域之一 */
  relativeToViewport: (
    /** 用来扩展（或收缩）参照节点布局区域的边界 */
    margins?: Margins
  ) => IntersectionObserver
}

/**
 * ### 返回一个 SelectorQuery 的实例
 * 该实例上有 select、 selectViewport 等方法用于选择页面节点或显示区域。
 *
 * 该 API 需要在 DOM 加载成功后使用，可参考以下几种使用场景：
 * 进入页面时获取节点对象实例，在 Page.onReady 中使用
 * 通过 setData 切换组件状态后获取节点实例，在 setData 回调中使用
 */
export const createSelectorQuery: () => SelectorQuery

/**
 * ### 创建并返回一个 IntersectionObserver 对象实例。
 *
 * 在页面或自定义组件中，也可以使用 this.createIntersectionObserver([options])来代替。
 *
 * 本方法创建并返回一个 IntersectionObserver 对象实例，使用方法类似于浏览器中的 Intersection Observer API。
 * 在小程序页面或自定义组件中，也可以使用 this.createIntersectionObserver([options]) 来代替。
 */
export const createIntersectionObserver: (
  options?: CreateIntersectionObserverOption
) => IntersectionObserver

export {
  offNetworkStatusChange,
  onNetworkStatusChange,
} from "./api/network-status"
export { createInterstitialAd } from "./api/create-interstitial-ad"
export * from "./api/toast"
export * from "./api/modal"
export * from "./api/storage"
export * from "./api/env"
export * from "./api/clipboard"
export * from "./api/scan-code"
export * from "./api/exit-mini-program"
export * from "./api/get-image-info"
export * from "./api/keyboard"
export * from "./api/create-interstitial-ad"
export * from "./api/upload-file"
export * from "./api/video-context"
export * from "./api/update-manager"
export * from "./api/accelerometer"
export * from "./api/compass"
export * from "./api/modal"
export * from "./api/toast"
export * from "./api/vibrate"
export * from "./api/report-analytics"
export * from "./api/setting"
export * from "./api/login"
export * from "./api/get-user-info"
export { getUserProfile } from "./api/get-user-profile"
export * from "./api/fs"
export * from "./api/set-keep-screen-on"
export * from "./api/loading"
export * from "./api/share"
export * from "./api/check-session"
export * from "./api/location"
export * from "./api/make-phone-call"
export * from "./api/navigator"
export * from "./api/app-lifecycle"
export * from "./api/storage"
export * from "./api/env"
export * from "./api/clipboard"
export * from "./api/scan-code"
export * from "./api/exit-mini-program"
export * from "./api/get-image-info"
export * from "./api/get-env-info-sync"
export * from "./api/upload-file"
export * from "./api/video-context"
export * from "./api/update-manager"
export * from "./api/accelerometer"
export * from "./api/navigate-to-video-view"
export * from "./api/open-aweme-user-profile"
export * from "./api/check-follow-state"
export * from "./api/favorite"
export * from "./api/interaction-bar"
export * from "./api/capture-screen"
export * from "./api/wifi-list"
export * from "./api/preview-image"
export * from "./api/memory-warning"
export * from "./api/get-launch-options-sync"
export * from "./api/connect-socket"
export * from "./api/save-image-to-photos-album"
export * from "./api/authorize"
export * from "./api/get-menu-button-layout"
export * from "./api/navigation-bar"
export * from "./api/tab-bar"
export * from "./api/get-recorder-manager"
export * from "./api/pay"
export * from "./api/download-file"
export * from "./api/create-animation"
export * from "./api/choose-address"
export * from "./api/array-buffer-to-base64"
export * from "./api/base64-to-array-buffer"
export * from "./api/inner-audio"
export * from "./api/background-audio"
export * from "./api/can-i-use"
export * from "./api/page-scroll-to"
export * from "./api/compress-image"
export * from "./api/get-ext-config"
export * from "./api/pull-down-refresh"
export * from "./api/follow-official-account"
export * from "./api/map"
export * from "./api/request-subscribe-message"
export * from "./api/performance"
export * from "./api/get-connected-wifi"
export * from "./api/can-i-put-stuff-over-component"
export * from "./api/create-live-player-context"
export * from "./api/create-offscreen-canvas"
export * from "./api/on-window-resize"
export * from "./api/off-window-resize"
export * from "./api/webcanvas"
export * from "./api/follow-aweme-user"
export * from "./api/request"
export * from "./api/media"
export * from "./api/system-info"
/**
 * 直播小程序相关内容
 */
export * from "../shared/api/live/get-room-info"
export * from "../shared/api/live/get-user-info.live"
export * from "../shared/api/live/is-following-anchor"
export * from "../shared/api/live/get-self-comment-count-during-plugin-running"
export * from "../shared/api/live/subscribe-audiences-follow-action"
export * from "../shared/api/live/unsubscribe-audiences-follow-action"
export * from "../shared/api/live/on-receive-audiences-follow-action"
export * from "../shared/api/live/subscribe-specified-content-comment"
export * from "../shared/api/live/unsubscribe-all-specified-content-comment"
export * from "../shared/api/live/subscribe-specified-user-comment"
export * from "../shared//api/live/unsubscribe-all-specified-user-comment"
export * from "../shared/api/live/on-receive-specified-comment"

export * from "./api/screen-brightness"
export * from "./api/unhandled-rejection"
