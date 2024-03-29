import sendHTMLEmail from "@/email/email";
import handler from "@/twillo/twillo";


export default function checkLogin(e, p){
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
  console.log(secret);
  if(e == 'testuser' && p=='testpass'){
    const data = { firstName:'testfirstname', lastName:'testLastName', username: 'testuser', email: 'test@test.com' }
    const authtoken = jwt.sign(data, secret);

    return {status:true, email:'test@test.com', username:'testUser', authtoken};
  }
  else{
    return {status:false}
  }
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function validatePhoneNumber(contact) {
  var regex = /^[0-9]{10}$/; // Regular expression to match 10-digit phone numbers

  if (!regex.test(contact)) {
    return false;
  }
  return true;
}

function generateOtp(length){

  const chars = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += chars[Math.floor(Math.random() * chars.length)];
  }
  return otp;

}

export async function checkValidation(e){

  let fullName = e.target['full-name'].value;
  let email = e.target['email'].value;
  let contact = e.target.contact.value
  let age = e.target.age.value;
  let gender = e.target['gender'].value
  let address = e.target['address'].value
  let currentAcademicLevel = e.target['current-academic-level'].value
  let university = e.target['university'].value
  let intendedFieldOfStudy = e.target['intended-field-of-study'].value
  let desiredStudyDestination = e.target['desired-study-destination'].value
  let enrollment_year = e.target['enrollment_year'].value
  let englishProoficiency = e.target['english-proficiency'].value
  let concerns = e.target['any-specific-questions-or-concerns'].value

  if (fullName == '') {
    return { status: false, msg: 'please enter your full Name' };
  }
  if (email == '') {
    return {status:false, msg:'please enter your email.'};
  }

  let res = validateEmail(email);
  if (!res) return { status: false, msg: 'please enter  valid email' };

  if (contact == '') {
    return { status: false, msg: 'please enter your contact number.' };
  }

  res = validatePhoneNumber(contact);
  if (!res) return { status: false, msg: 'please enter valid contact number.' };

  if (age == '') {
    return { status: false, msg: 'please enter your age.' };
  }

  if (age < 18 || age > 60) {
    return { status: false, msg: 'please valid age.' };
  }

  if (gender == '') {
    return { status: false, msg: 'please select your gender.' };
  }
  if (address == '') {
    return { status: false, msg: 'please enter address.' };
  }
  if (currentAcademicLevel == '') {
    return { status: false, msg: 'please enter your Academic level.' };
  }
  if (university == '') {
    //return { status: false, msg: 'please enter your email.' };
  }
  if (intendedFieldOfStudy == '') {
    return { status: false, msg: 'please enter your Intended Field Of Study.' };
  }
  if (desiredStudyDestination == '') {
    return { status: false, msg: 'please enter your Desired Study Destination.' };
  }
  if (enrollment_year == '') {
    return { status: false, msg: 'please enter your Enrollment Year.' };
  }
  if (englishProoficiency == '') {
    return { status: false, msg: 'please select your English Prooficiency.' };
  }
  if (concerns == '') {
    //return { status: false, msg: 'please enter your email.' };
  }

  const otp = generateOtp(4);

  res = await handler(otp, '+918446713319');
  if(!res.status){
    return { status: false, msg: res.msg };
  }

  const mailTemp = emailVerificationHtml(otp);

  res = await sendHTMLEmail(email, mailTemp, otp);
  if (!res.status) {
    return { status: false, msg: res.msg };
  }

  const csvContent = `fullName,Email,contact,age,gender,address,currentAcademicLevel,university,intendedFieldOfStudy,desiredStudyDestination,enrollment_year,englishProoficiency,concerns\n${fullName},${email},${contact},${age},${gender},${address},${currentAcademicLevel},${university},${intendedFieldOfStudy},${desiredStudyDestination},${enrollment_year},${englishProoficiency},${concerns}`;
  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  // Create a link element to trigger the download
  const csvUrl = URL.createObjectURL(blob);

  return {status:true, otp, csvUrl }
}

function emailVerificationHtml(code){
   return `<p>Thank you for signing up!</p>
        <p>Please use the following verification code to verify your email:</p>
        <p><strong>${code}</strong></p>`
}

export function checkValidationForUpdate(firstName, lastName){

  if (firstName == '') {
    return { status: false, msg: 'please enter your first Name' };
  }
  return { status: true }
}