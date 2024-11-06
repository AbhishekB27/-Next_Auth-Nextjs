interface EmailTemplateProps {
    verificationLink: string
}

import React from 'react'

export const EmailVerificationTemplate = ({ verificationLink }: EmailTemplateProps) => {
    return <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        style={{
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif',
        }}
    >
        <tbody>
            {/* Header */}
            <tr>
                <td
                    style={{
                        backgroundColor: '#007BFF',
                        color: '#ffffff',
                        padding: '20px',
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                    }}
                >
                    Verify Your Email
                </td>
            </tr>

            {/* Body */}
            <tr>
                <td style={{ padding: '30px', textAlign: 'center' }}>
                    <h2 style={{ color: '#333', margin: '0' }}>Welcome!</h2>
                    <p style={{ color: '#555', fontSize: '16px', margin: '10px 0' }}>
                        Thank you for signing up! To complete your registration, please verify your email address by clicking the
                        button below:
                    </p>
                    <a
                        href={verificationLink}
                        style={{
                            display: 'inline-block',
                            padding: '12px 30px',
                            fontSize: '18px',
                            color: '#ffffff',
                            backgroundColor: '#28a745',
                            textDecoration: 'none',
                            borderRadius: '5px',
                            marginTop: '20px',
                        }}
                    >
                        Verify Email
                    </a>
                    <p style={{ color: '#555', fontSize: '14px', marginTop: '20px' }}>
                        If you did not create an account, please ignore this email.
                    </p>
                </td>
            </tr>

            {/* Footer */}
            <tr>
                <td
                    style={{
                        backgroundColor: '#f4f4f4',
                        padding: '15px',
                        textAlign: 'center',
                        fontSize: '12px',
                        color: '#777',
                        borderBottomLeftRadius: '8px',
                        borderBottomRightRadius: '8px',
                    }}
                >
                    © {new Date().getFullYear()} Your Company. All rights reserved.
                </td>
            </tr>
        </tbody>
    </table>
}
