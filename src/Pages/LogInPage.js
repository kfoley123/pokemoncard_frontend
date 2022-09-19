import React from "react";
import LogIn from "../Components/LogIn/LogIn";
import CreateUser from "../Components/CreateUser/CreateUser";

export default function LogInPage(props) {
    const { loggedInUser, updateFormData, users, setLoggedInUser } = props;
    return (
        <>
            {loggedInUser.userID < 1 && (
                <LogIn
                    updateLogInRequest={updateFormData}
                    users={users}
                    setLoggedInUser={setLoggedInUser}
                />
            )}
            <CreateUser updateUserData={updateFormData} users={users} />
        </>
    );
}
