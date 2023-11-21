import React from 'react'

const LogoAndTitle = () => {
    return (
        <div className="LogoAndTitle">
            <img
                src="./src/assets/logo.png"
                alt="logo"
                className="logo"
            />
            <h1 className="title">PASSWORD GENERATOR</h1>
            <p className="subtitle">
                Create strong and secure passwords to keep your account safe
                online.
            </p>
        </div>
    )
}

export default LogoAndTitle
