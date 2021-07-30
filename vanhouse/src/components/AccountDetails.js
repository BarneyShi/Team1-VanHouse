import React, {useEffect, useState} from "react";
import "../styles/login.css"

function AccountDetails() {
    const [user, setUser] = useState(null);
    const loadAccountDetails = () => {
        fetch(`/login-router/account`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then((response) => {
            response.json()
                .then((resJSON => {
                    console.log(resJSON);
                    setUser({
                        userId: resJSON.userId,
                        email: resJSON.email,
                        firstName: resJSON.firstName,
                        lastName: resJSON.lastName,
                        admin: resJSON.admin
                    });
                }));
        }).catch(() => {
            setUser(null);
        });
    }

    useEffect(() => {
        loadAccountDetails();
    }, []);

    if (user === null) {
        return (
            <div>
                <br/>
                <br/>
                <h2 className="account-details-page-message">
                    Please login to see this page!
                </h2>
            </div>
        )
    }

    return (
        <div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h4>*** PAGE UNDER CONSTRUCTION ***</h4>
        </div>
    )
}

AccountDetails.propTypes = {};

export default AccountDetails