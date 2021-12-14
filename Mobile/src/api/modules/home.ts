import ApiUrl from '@/api/url';
import { post, get, upload } from '@/utils/request';

/**
 * 添加发票做 ORC 识别
 * @param params
 */

export const invoiceIdentifyORC = (params: Array<any>, success: any, fail: any) => {
  let taskArr: any = [];
  params.map((item) => {
    taskArr.push(upload(ApiUrl.addInvoice, item, true));
  });

  Promise.all(taskArr)
    .then((res) => {
      let flag = true;

      res.map((item: any) => {
        if (item.code !== 2000) {
          res = item;
          flag = false;
        }
      });

      if (flag) {
        success(res);
      } else {
        fail(res);
      }
    })
    .catch((err) => {
      err.message = '发票识别异常';
      fail(err);
    });
};

/**
 * 添加发票到票夹
 * @param params
 */
interface ConfirmAddInvoice {
  list: Array<object>;
}
export const confirmAddInvoice = async (params: ConfirmAddInvoice) => {
  const res: any = await post(ApiUrl.confirmAddInvoice, params, true);
  if (res.code == 2000) {
    res.isSuccess = true;
    return res;
  } else {
    return res;
  }
};

/**
 * 通过时间获取发票列表
 * @param params
 */
interface InvoiceListByDate {
  startTime: string;
  endTime: string;
  pageIndex: number;
  pageSize: number;
  isInvoice: number; // 0-预览的发票 1-确认上传成功的发票
  [name: string]: any;
}
export const getInvoiceList = async (params: InvoiceListByDate) => {
  const res: any = await post(ApiUrl.getInvoiceList, params, true);
  if (res.code == 2000) {
    return res.data;
  } else {
    return [];
  }
};

/**
 * 删除发票
 * @param params
 */
interface DeleteInvoice {
  [name: string]: any;
}
export const deleteInvoice = async (params: DeleteInvoice) => {
  const res: any = await get(ApiUrl.delInvoiceByGuid, params, true);
  if (res.code == 2000) {
    res.isSuccess = true;
    return res;
  } else {
    return res;
  }
};


// 获取 upaper 扫描结果
export const upaperScanning = async (applyNo) => {
  const res: any = await get(ApiUrl.upaperScanning + applyNo, {}, true);
  return res;
};