import { Link } from "react-router-dom";
import './css/WP.css';

export default function WrongAdress() {
    return (
        <body className = "bodywp">
            <div>
                <h1>
                    404 Error.
                    <p>
                        Page that you are looking for DOES NOT EXIST!
                    </p>
                    <Link to = "/" className = "linkwp">Back to the main page</Link> 
                </h1>    
            </div>
        </body>
    )
}