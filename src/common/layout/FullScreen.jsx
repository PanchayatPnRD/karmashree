import React from 'react'

function FullScreen(props) {
    return (
        <div style={{
            minHeight: '100vh',
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {props.children}
        </div>
    )
}

export default FullScreen