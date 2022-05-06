import { useEffect, useState } from "react";
import { Row, Input, Label, Col } from "reactstrap";
import { BarChart } from "../../Shared/Components/Chart/Chart"
import ReportService from "./Shared/ReportServices";
import { Loading } from "../../Shared/Components/Loading/Loading";

export const ViewReport = () => {
    const [report, setReport] = useState(null);
    const [option, setOption] = useState("amount")
    const [isLoading, setIsLoading] = useState(true);
    // const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        ReportService.reportByAmount().then(
            res => {
                const report = res.data;
                setReport(report);
                setIsLoading(false);
            }).catch(err => console.log(err));
    }, [option])

    const handleReportOption = (ev) => {
        setOption(ev.target.value);
    }
    return (
        <>
            {isLoading ? <>
                <Loading />
            </> :
                <>
                    <Row>
                        <Col xs={{ size: "2", offset: "10" }} >
                            <Label>Thống kê theo:  </Label>
                        </Col>

                        <Col xs={{ size: "2", offset: "10" }}>
                            <Input
                                name="chart_id"
                                onChange={(el) => handleReportOption(el)}
                                type='select'>
                                <option value='amount'>Số lượng đặt phòng</option>
                                <option value='total'>Doanh thu</option>
                            </Input>
                        </Col>
                    </Row>
                    <Row style={{height: '700px'}}>
                        <BarChart data={report} type={option} />
                    </Row>
                </>}
        </>
    )
}