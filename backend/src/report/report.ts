import rand from "../lib/rand";
import { OrderNS } from "../order/order";
export namespace ReportNS{
    export interface ReportByOrder{
        order:OrderNS.ViewOrder;
        count:number;
    }

    export interface InputReport{
        
    }
}