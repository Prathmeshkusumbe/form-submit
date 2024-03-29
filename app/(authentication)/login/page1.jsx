"use client";
import { setIsAuth } from '@/components/auth/store';
import { getSiteCookie, setSiteCookie } from '@/helper/general_helper';
import checkLogin from '@/helper/login/checkLogin';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

function Login() {

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();



  const handleLogin = (e)=>{
    e.preventDefault();

    setError('');
    setSuccessMsg('');
    let email = e.target.email.value;
    let password = e.target.password.value;
    console.log('email', email)
    if(email==''){
      console.log('email',email)
      setError('please enter your email or username');
      return;
    }
    if (password == '') {
      setError('please enter your password');
      return;
    }
    if (password.length < 8) {
      setError('password should be min of 8 characters');
    }
    const res = checkLogin(email, password);
    if(res.status){
      console.log(res);
      setSuccessMsg('logged in successfully');
      dispatch(setIsAuth(true));
      setSiteCookie("authtoken", res.authtoken);

      router.push("/");
      //window.location = '/'
    }else{
      setError('username or passoword incorrect');
    }
  }
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='rounded shadow bg-white text-black w-[350px] max-w-[100%] pl-4 pr-4 pt-6 pb-3'>
        <div>
          <form onSubmit={handleLogin}>
            <h1 className='text-center  text-xl pb-3'>Login</h1>
            {error ? <div className='-mt-2 text-center text-rose-600'>{error}</div> : ''}
            {successMsg ? <div className='text-center text-green-500'>{successMsg}</div> : ''}
            <div className='pt-2'>
              <label className='block text-sm pb-1'>Email/Username</label>
              <input className='pl-2 outline-0 w-full border border-slate-700 rounded' name='email' placeholder='email/username' />
            </div>
            <div className='pt-3'>
              <label className='block text-sm pb-1'>Password</label>
              <input type='password' className='pl-2 outline-0 w-full border border-slate-700 rounded' name='password' placeholder='password' />
            </div>
            <div className='pt-5 pb-4 flex'>
              <button className='py-1 px-3 border rounded border-slate-500'>Submit</button>

            </div>
            <div className='pl-2'>need to create an account <Link href='/register'>Register</Link></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login