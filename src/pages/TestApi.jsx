import { useEffect } from "react";
import api from "../api/axiosConfig";

function TestApi() {

    useEffect(() => {

        api.get("/products")
            .then((response) => {

                console.log(
                    "Products:",
                    response.data
                );

            })
            .catch((error) => {

                console.error(
                    error
                );

            });

    }, []);

    return (
        <div className="container mt-5">
            <h2>
                API Test Page
            </h2>
        </div>
    );
}

export default TestApi;