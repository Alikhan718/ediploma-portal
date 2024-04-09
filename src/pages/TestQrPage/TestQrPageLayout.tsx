import React from 'react';
import QRCode from "react-qr-code";

export const TestQrPageLayout: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem', alignItems: 'center' }}>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "50%", width: "15%", padding: '1rem' }}
                value={`mobileSign:https://testapp.ediploma.kz`}
            />
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "50%", width: "15%", padding: '1rem' }}
                value={`mobileSign:https://app.ediploma.kz`}
            />
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "50%", width: "15%", padding: '1rem' }}
                value={`mobileSign:https://ediploma.kz`}
            />
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "50%", width: "15%", padding: '1rem' }}
                value={`mobileSign:https://api.ediploma.kz`}
            />
        </div>
    )
};