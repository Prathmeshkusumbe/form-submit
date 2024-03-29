'use server'
import twilio from 'twilio';

const accountSid = process.env.NEXT_PUBLIC_ACC_SID;
const authToken = process.env.NEXT_PUBLIC_AUTH;
const client = twilio(accountSid, authToken);

export default async function handler(msg, to) {

  try {
    await client.messages.create({
      body: msg,
      to: to,
      from: '+12562729445',
    });
    return { status: true, msg: 'SMS sent successfully.'};
  } catch (error) {
    return { status: false, msg: error };
  }

}