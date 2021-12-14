let watermark: any = {};

let setWatermark = (name: string, email: string) => {
  let id = 'watermark';

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id) as any);
  }

  let can: any = document.createElement('canvas');
  can.width = 300;
  can.height = 200;

  let cans = can.getContext('2d');
  cans.rotate((-40 * Math.PI) / 180);
  cans.font = '12px "Microsoft YaHei"';
  cans.fillStyle = 'rgba(0, 0, 0, 0.1)';
  cans.textAlign = 'center';
  cans.textBaseline = 'Middle';
  cans.fillText(name, can.width / 20, can.height - 20 * 4);
  cans.fillText(email, can.width / 20, can.height - 20 * 3);
  cans.fillText('敏感信息', can.width / 20, can.height - 20 * 2);
  cans.fillText('请勿外传', can.width / 20, can.height - 20);
  cans.fillText('Confidential', can.width / 20, can.height);

  let div = document.createElement('div');
  div.id = id;
  div.style.pointerEvents = 'none';
  div.style.top = '3px';
  div.style.left = '0px';
  div.style.position = 'fixed';
  div.style.zIndex = '100000';
  div.style.width = document.documentElement.clientWidth + 'px';
  div.style.height = document.documentElement.clientHeight + 'px';
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
  document.body.appendChild(div);
  return id;
};

// 该方法只允许调用一次
watermark.set = (name: string, email: string) => {
  let id = setWatermark(name, email);
  setInterval(() => {
    if (document.getElementById(id) === null) {
      id = setWatermark(name, email);
    }
  }, 2000);
  window.onresize = () => {
    setWatermark(name, email);
  };
};

export default watermark;
