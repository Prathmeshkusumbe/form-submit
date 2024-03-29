'use server'
import nodemailer from 'nodemailer';

let aEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
let aPass = process.env.NEXT_PUBLIC_ADMIN_EMAIL_PASS;

const sendHTMLEmail = async (to, emailMessage) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: aEmail,
      pass: aPass,
    },
  });

  const message = {
    from: aEmail,
    to: to,
    subject: 'Email Verification',
    text: 'Email Verification',
    html: emailMessage,
  };

  try {
    await transporter.sendMail(message);
    return {status:true, msg:'email sent successfully'};
  } catch (error) {
    return { status: false, msg: error };;
  }
};

export default sendHTMLEmail;