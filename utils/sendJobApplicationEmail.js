const { sendEmail } = require("./sendEmail");

const sendJobApplicationNotification = async ({
  name,
  email,
  phone,
  qualification,
  state,
  country,
  jobRole,
  cv,
}) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto;">
      <h2>New Job Application Received</h2>

      <p>A new candidate has applied for a job.</p>

      <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tr>
          <td><strong>Name</strong></td>
          <td>${name}</td>
        </tr>
        <tr>
          <td><strong>Email</strong></td>
          <td>${email}</td>
        </tr>
        <tr>
          <td><strong>Phone</strong></td>
          <td>${phone}</td>
        </tr>
        <tr>
          <td><strong>Qualification</strong></td>
          <td>${qualification}</td>
        </tr>
        <tr>
          <td><strong>State</strong></td>
          <td>${state}</td>
        </tr>
        <tr>
          <td><strong>Country</strong></td>
          <td>${country}</td>
        </tr>
        <tr>
          <td><strong>Applied Role</strong></td>
          <td>${jobRole}</td>
        </tr>
        ${cv
      ? `
        <tr>
          <td><strong>CV</strong></td>
          <td><a href="${cv}" target="_blank">View CV</a></td>
        </tr>`
      : ""
    }
      </table>

      <br>

      <p>Please review the application.</p>
    </div>
  `;

  const text = `
New Job Application

Name: ${name}
Email: ${email}
Phone: ${phone}
Qualification: ${qualification}
State: ${state}
Country: ${country}
Applied Role: ${jobRole}
${cv ? `CV: ${cv}` : ""}
`;

  return await sendEmail({
    to: process.env.MAILGUN_TO,
    subject: `New Job Application - ${jobRole}`,
    html,
    text,
  });
};

module.exports = { sendJobApplicationNotification };