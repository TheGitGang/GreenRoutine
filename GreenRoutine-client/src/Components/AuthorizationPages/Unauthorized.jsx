import { Card, CardTitle, CardBody } from "reactstrap"

const Unauthorized = () => {
    return (
        <Card className="lightgrey-card">
            <CardTitle className="display-6">
                Unauthorized
            </CardTitle>
            <CardBody>
                You do not have permission to view this page.
            </CardBody>
        </Card>
    )
}

export default Unauthorized;