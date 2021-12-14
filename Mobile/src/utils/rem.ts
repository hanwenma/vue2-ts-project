/**
 * @params window window对象
 * @params designWidth 设计图文档宽度
 * @describe 可伸缩布局 rem计算方式： 设计稿尺寸 px / 100 = 实际rem 例: 100 px = 1 rem
 */
const remHandle = (window: any, designWidth: number) => {
  const winDom = window.document,
    docEle = winDom.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  /* 重置font-size的大小 */
  const recalcFontSize = (function refreshRem() {
    const clientWidth = docEle.getBoundingClientRect().width;
    /* 8.55：小于320px不再缩小，11.2：大于420px不再放大 */
    docEle.style.fontSize = Math.max(Math.min(20 * (clientWidth / designWidth), 11.2), 8.55) * 5 + 'px';
    return refreshRem;
  })();
  /* 添加倍屏标识，安卓为1 */
  docEle.setAttribute('data-dpr', window.navigator.appVersion.match(/iphone/gi) ? window.devicePixelRatio : 1);
  if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
    /* 添加IOS标识 */
    winDom.documentElement.classList.add('ios');
    if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8) {
      /*  IOS8以上给html添加hairline样式，以便特殊处理 */
      winDom.documentElement.classList.add('hairline');
    }
  }
  if (!winDom.addEventListener) return;
  window.addEventListener(resizeEvt, recalcFontSize, false);
  winDom.addEventListener('DOMContentLoaded', recalcFontSize, false);
};

export default remHandle;
