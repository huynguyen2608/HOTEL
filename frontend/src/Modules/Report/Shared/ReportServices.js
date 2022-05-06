
import { Http } from "../../../Helper/http";

const API_ENDPOINT = {
   REPORTBYAMOUNT: "/order/report/by_amount?interval="
};

class ReportServices {
    constructor() {
        if (ReportServices._instance) {
            return ReportServices._instance;
        }
        ReportServices._instance = this;
    }
  
    reportByAmount(interval = "week") {
        return Http.get(API_ENDPOINT.REPORTBYAMOUNT + interval);
    }
}

const ReportService = new ReportServices();

export default ReportService;
