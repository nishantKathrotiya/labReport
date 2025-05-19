const getIssueEmailTemplate = (formData) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Lab Issue Alert</title>
        <style>
            body {
                font-family: 'Helvetica Neue', Arial, sans-serif;
                background-color: #f5f7fa;
                margin: 0;
                padding: 30px;
                color: #333;
            }

            .email-container {
                max-width: 620px;
                background-color: #ffffff;
                margin: auto;
                border-radius: 12px;
                padding: 40px;
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
            }

            .header {
                text-align: center;
                padding-bottom: 25px;
                border-bottom: 1px solid #eee;
            }

            .header h1 {
                font-size: 24px;
                color: #007bff;
                margin: 0;
            }

            .content {
                padding-top: 30px;
            }

            .content p {
                font-size: 15px;
                margin: 10px 0;
            }

            .issue-box {
                background-color: #f9fafb;
                border: 1px solid #e3e6ea;
                border-radius: 10px;
                padding: 20px;
                margin: 25px 0;
            }

            .issue-box table {
                width: 100%;
                font-size: 14px;
                border-collapse: collapse;
            }

            .issue-box td {
                padding: 10px 5px;
                vertical-align: top;
            }

            .issue-box td:first-child {
                font-weight: 600;
                color: #555;
                width: 150px;
            }

            .button {
                display: inline-block;
                margin-top: 30px;
                padding: 12px 25px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 6px;
                font-size: 14px;
            }

            .footer {
                text-align: center;
                margin-top: 40px;
                font-size: 12px;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>🔧 Lab Issue Notification</h1>
            </div>
            <div class="content">
                <p>Hello Technician,</p>
                <p>An issue has been reported in the lab system. Here are the details:</p>

                <div class="issue-box">
                    <table>
                        <tr>
                            <td>🧪 Lab Number:</td>
                            <td>${formData.labno}</td>
                        </tr>
                        <tr>
                            <td>📅 Date:</td>
                            <td>${formData.date}</td>
                        </tr>
                        <tr>
                            <td>⏰ Time:</td>
                            <td>${formData.fromTime} – ${formData.toTime}</td>
                        </tr>
                        <tr>
                            <td>⚠️ Problem:</td>
                            <td>${formData.problemName}</td>
                        </tr>
                        <tr>
                            <td>📝 Description:</td>
                            <td>${formData.problem || 'No description provided'}</td>
                        </tr>
                        <tr>
                            <td>👤 Reported By:</td>
                            <td>${formData.personName} (ID: ${formData.personID})</td>
                        </tr>
                    </table>
                </div>


                <p style="margin-top: 40px;">Best regards,<br>Lab Report System</p>
            </div>

            <div class="footer">
                <p>This is an automated message. Please do not reply.</p>
                <p>© ${new Date().getFullYear()} Lab Report System</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = { getIssueEmailTemplate };
