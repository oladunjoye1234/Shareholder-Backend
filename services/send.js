const transporter = require('./transporter');

const sendReportEmail = async (to, reportTitle, reportDescription, fileUrl) => {
    const subject = `New Report: ${reportTitle}`;
    const emailOptions = {
        from: `"Shareholder Reports" <${process.env.APP_EMAIL}>`,
        to:email,
        subject: "${subject}",
        html: `
            <h1>${reportTitle}</h1>
            <p>${reportDescription}</p>
            <p><a href="${fileUrl}">Download Report</a></p>
        `
    };
        transporter.sendMail(emailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent successfully to ${to}:', info.response);
            }
        });

    };

module.exports = {
    sendReportEmail
}