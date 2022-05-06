import bwipjs from "bwip-js";
import * as printJS from "print-js";

const API_ENDPOINT = {

};

class ShareService {
  constructor() {
    if (ShareService._instance) {
      return ShareService._instance;
    }
    ShareService._instance = this;
  }


  print = (id) => {
    printJS({
      printable: id,
      type: 'html',
      targetStyles: ['*'],
      style: `@page {
          size: A5;
          margin: 0;
                  },
               @media print {
                  .medPrintId{
                    margin: 0;
                    border: initial;
                    border-radius: initial;
                    width: initial;
                    min-height: initial;
                    box-shadow: initial;
                    background: initial;
                    page-break-after: always;
                  }`,
      header: null,
      footer: null,
    });
  };
  printhorizontal = (id) => {
    printJS({
      printable: id,
      type: 'html',
      targetStyles: ['*'],
      style: `@page {
          size: Letter landscape;
        }`,
      header: null,
      footer: null,
    });
  }
  printBarCode = (id) => {
    printJS({
      printable: id,
      type: 'html',
      scanStyles: false,
      targetStyles: ['*'],
      style: `@page { size: landscape;}`,
      header: null,
      footer: null,
    });
  };
  createBarcode(step_id) {
    try {
      const canvas = bwipjs.toCanvas("canvas_id", {
        bcid: "code128",
        text: step_id,
        scale: 5,
        // height: 8,
        includetext: true,
        textxalign: "center"
      });
      return canvas;
    } catch (error) {
      throw error;
    }
  };

  createEtccode(step_id, id) {
    try {
      const canvas = bwipjs.toCanvas(id, {
        bcid: "code128",
        text: step_id,
        scale: 1,
        height: 8,
        includetext: true,
        textxalign: "center",
      });
      return canvas;
    } catch (error) {
      throw error;
    }
  };
  createOtccode(step_id, id) {
    try {
      const canvas = bwipjs.toCanvas(id, {
        bcid: "code128",
        text: step_id,
        scale: 1,
        height: 8,
        includetext: true,
        textxalign: "center",
      });
      return canvas;
    } catch (error) {
      throw error;
    }
  };
  createCusCode(customerCode) {
    try {
      const canvas = bwipjs.toCanvas("canvasCustomer", {
        bcid: "code128",
        text: customerCode,
        scale: 1,
        height: 8,
        includetext: true,
        textxalign: "center",
      });
      return canvas;
    } catch (error) {
      throw error;
    }
  };
}
const instance = new ShareService();

export default instance;
