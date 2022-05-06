import { LinearProgress } from "@mui/material";
import { Row } from "reactstrap";
export const Loading = () => {
    return (
        <>  
            <Row>
                <LinearProgress color="primary" />
            </Row>
            <Row>
                <LinearProgress color="secondary" />
            </Row>
            <Row>
                <LinearProgress color="success" />
            </Row>
            <Row>
                <LinearProgress color="inherit" />
            </Row>
            <Row>
                <LinearProgress color="warning" />
            </Row>
            <Row>
                <LinearProgress color="error" />
            </Row>
        </>
    )
}