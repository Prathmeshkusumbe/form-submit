'use client'
import { checkValidation } from '@/login/checkLogin';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Register() {

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [formProcess, setFormProcess] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [csvData, setCsvData] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormProcess(true);
    setError('');
    setSuccessMsg('');

    if(formProcess){
      console.log('in process');
      return;
    }

    const res = await checkValidation(e);
    if (res.status) {
      //setSuccessMsg('Register successfull.');
      setOtpSent(res.otp);
      setCsvData(res.csvUrl)
      //router.push('/login');
    } else {
      setError(res.msg);
    }
    setFormProcess(false);
  }

  function handleOtpSubmit(e){
    e.preventDefault();
    setSuccessMsg('');
    setError('');
    const otpInput = e.target.otp.value;
    if(otpInput == otpSent){
      setSuccessMsg('otp verified.');
      setOtpVerified(true)
    }
    else{
      setError('Incorrect otp please try again');
    }
  }

  return (
    <div className='w-full min-h-full pt-[80px] pb-2 flex items-center justify-center'>
      <div className='rounded shadow bg-white text-black w-[650px] max-w-[100%] pl-4 pr-4 pt-6 pb-3'>
        {!otpVerified ?<div>
          {!otpSent ?
          <form onSubmit={handleLogin}>
            <h1 className='text-center  text-xl pb-3'>Register</h1>
            {error ? <div className='-mt-2 text-center text-rose-600'>{error}</div> : ''}
            {successMsg ? <div className='text-center text-green-500'>{successMsg}</div> : ''}
            <div className='flex flex-wrap'>
              <div className='pt-2 basis-1/2 px-2'>
                <label className='block text-sm pb-1'>Full Name</label>
                <input className='pl-2 outline-0 w-full border border-slate-700 rounded' name='full-name' placeholder='Full Name' />
              </div>
              <div className='pt-2 basis-1/2 px-2'>
                <label className='block text-sm pb-1'>Email</label>
                <input type='email' className='pl-2 outline-0 w-full border border-slate-700 rounded' name='email' placeholder='Email' />
              </div>
              <div className='pt-2 basis-1/2 px-2'>
                <label className='block text-sm pb-1'>Phone No</label>
                <input type="tel" className='pl-2 outline-0 w-full border border-slate-700 rounded' name='contact' placeholder='contact number' required />
              </div>
              <div className='pt-3 basis-1/2 px-2'>
                <label className='block text-sm pb-1'>Age</label>
                <input type='number' className='pl-2 outline-0 w-full border border-slate-700 rounded' name='age' placeholder='Age' />
              </div>
              <div className='pt-3 basis-1/2 px-2'>
                <label className='block text-sm pb-1'>Gender</label>
                <select type='password' className='pl-2 outline-0 w-full border border-slate-700 rounded' name='gender'>
                  <option value=''>Select option</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='not-specify'>Not specify</option>
                </select>
              </div>
              <div className='pt-3 basis-1/2 px-2'>
                <label className='block text-sm pb-1'>Address</label>
                <textarea className='pl-2 outline-0 w-full border border-slate-700 rounded' name='address' placeholder='address' />
              </div>
              <div className='pt-3 basis-1/2 px-2'>
                <label className='block text-sm pb-1'>Current Academic Level</label>
                <select className='pl-2 outline-0 w-full border border-slate-700 rounded' name='current-academic-level'>
                  <option value=''>Select option</option>
                  <option value='high-school-student'>High School Student</option>
                  <option value='undergraduate'>Undergraduate</option>
                  <option value='graduate'>Graduate</option>
                </select>
              </div>
              <div className='pt-3 basis-1/2 px-2'>
                <label className='block text-sm pb-1'>Name of Current School/University</label>
                <input className='pl-2 outline-0 w-full border border-slate-700 rounded' name='university' placeholder='University' />
              </div>
              <div className='pt-3 basis-1/2 px-2'>
                <label className='block text-sm pb-1'>Intended Field of Study</label>
                <input className='pl-2 outline-0 w-full border border-slate-700 rounded' name='intended-field-of-study' placeholder='Intended Field of Study' />
              </div>
              <div className='pt-3 basis-1/2 px-2'>
                <label className='block text-sm pb-1'>Desired Study Destination</label>
                <input className='pl-2 outline-0 w-full border border-slate-700 rounded' name='desired-study-destination' placeholder='Desired Study Destination' />
              </div>
              <div className='pt-3 basis-1/2 px-2'>
                <label className='block text-sm pb-1'>Expected Year of Enrollment</label>
                <input type="number" id="enrollment_year" name="enrollment_year" min="2022" max="2030" step="1" placeholder="YYYY"  />
              </div>
              <div className='pt-3 basis-1/2 px-2'>
                <label className='block text-sm pb-1'>English proficiency</label>
                <select type='password' className='pl-2 outline-0 w-full border border-slate-700 rounded' name='english-proficiency'>
                  <option value=''>Select option</option>
                  <option value='beginner'>Beginner</option>
                  <option value='intermediate'>Intermediate</option>
                  <option value='proficeient'>Proficeient</option>
                </select>
              </div>
              <div className='pt-3 basis-1/2 px-2'>
                <label className='block text-sm pb-1'>Any Specific Questions or Concerns</label>
                <input className='pl-2 outline-0 w-full border border-slate-700 rounded' name='any-specific-questions-or-concerns' placeholder='Any Specific Questions or Concerns' />
              </div>
            </div>
            <div className='pt-5 pb-4 flex'>
              <button className='py-1 px-3 border rounded border-slate-500'>{!formProcess ? 'Submit' : "Processing"}</button>
            </div>
          </form>
          :
          <form onSubmit={handleOtpSubmit}>
            <div><h1 className='text-center text-lg pb-2'>An otp has been sent to your email and phone no. please enter that otp bellow to verify your details.</h1></div>
            {error ? <div className='-mt-2 text-center text-rose-600'>{error}</div> : ''}
            {successMsg ? <div className='text-center text-green-500'>{successMsg}</div> : ''}
            <div>
              <div className='pt-2 '>
                <label className='block text-sm pb-1'>OTP</label>
                <input type='number' className='pl-2 outline-0 w-full border border-slate-700 rounded' name='otp' placeholder='Otp' autoComplete="off" />
              </div>
            </div>
            <div className='pt-5 '>
              <button className='py-1 px-3 border rounded border-slate-500'>Submit</button>
            </div>
          </form>}

        </div>
        :
        <div>
          <div><h1 className='text-center text-lg pb-2'>Otp verified successfully. All the information is submitted successfully please click bellow button download the information in csv format</h1></div>
            <div className='text-center pt-2 pb-3'><a href={csvData}><button className='py-1 px-3 border rounded border-slate-500'>download</button></a></div>
        </div>}
      </div>
    </div>
  )
}

export default Register