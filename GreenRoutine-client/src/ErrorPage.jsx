import { useRouteError } from "react-router-dom";
import Navigation from './Components/Navigation';
import { Card } from 'reactstrap';
import './App.css'
import './ErrorPage.css'

const ErrorPage = (props) => {
    const error = useRouteError();
    console.error(error);
    return (
        <div className="app-layout">
            <Navigation name={props.name} />
            <div id="error-page" className="pt-5">
                <Card class='centered-card'>
                    <h1 className="error-header">Oops!</h1>
                    <p className="error-header">Sorry, an unexpected error has occurred.</p>
                    <p className="error-header">
                        <i>{error.statusText || error.message}</i>
                    </p>
                </Card>

            </div>
        </div>
    );
}

export default ErrorPage;