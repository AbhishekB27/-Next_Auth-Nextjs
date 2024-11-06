import React from 'react'

interface EmailTemplateProps {
    resetLink: string
}

export const ResetPasswordTemplate = ({ resetLink }: EmailTemplateProps) => {
    return (
        <table
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
                            backgroundColor: '#dc3545',
                            color: '#ffffff',
                            padding: '20px',
                            textAlign: 'center',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                        }}
                    >
                        Reset Your Password
                    </td>
                </tr>

                {/* Body */}
                <tr>
                    <td style={{ padding: '30px', textAlign: 'center' }}>
                        <h2 style={{ color: '#333', margin: '0' }}>Hello!</h2>
                        <p style={{ color: '#555', fontSize: '16px', margin: '10px 0' }}>
                            We received a request to reset your password. To reset your password, click the button below:
                        </p>
                        <a
                            href={resetLink}
                            style={{
                                display: 'inline-block',
                                padding: '12px 30px',
                                fontSize: '18px',
                                color: '#ffffff',
                                backgroundColor: '#007BFF',
                                textDecoration: 'none',
                                borderRadius: '5px',
                                marginTop: '20px',
                            }}
                        >
                            Reset Password
                        </a>
                        <p style={{ color: '#555', fontSize: '14px', marginTop: '20px' }}>
                            If you did not request a password reset, please ignore this email.
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
    )
}
