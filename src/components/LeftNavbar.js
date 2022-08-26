import React from "react";
import userIcon from "../assets/user-icon.png";
import { useDashboardStyles } from "../styles/useDashboardStyles";
import { useNavigate } from "react-router-dom";

const LeftNavbar = () => {
    const classes = useDashboardStyles();
    let navigate = useNavigate();

    const navigateTo = () => navigate('/')
    return (
        <>
            <div className={classes.leftNavbarWrapper}>
                <h3>Admin</h3>
                <button
                    onClick={() => navigateTo()}
                    className={classes.adminsBtn}>
                    <img style={{width: 20}} src={userIcon} alt="user"/>
                    Ադմիններ
                </button>
            </div>
        </>
    )
}

export default LeftNavbar;
