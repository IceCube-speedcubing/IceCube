import React from 'react';

const VerifyEmailPage = () => {
  const email = 'example@email.com'; // Replace with the actual email address
  const authKey = 'abc123'; // Replace with the actual auth key

  const verificationEmailContent = `
  <div>

    <h1>IceCube email verification</h1>
    <h3><p>Someone has tried to use your email ${email} to get an IceCube account.
    <br>If it was you, hit the verify link below. If it wasn't, ignore this email.</p></h3>
    <hr>
    <a href="http://localhost:8080/api/user/verify/${authKey}">Verify email</a>

    </div>
  `;

  return (
    <div>
      <h1>Verification Email</h1>
      <div dangerouslySetInnerHTML={{ __html: verificationEmailContent }} />
    </div>
  );
};

const test = () => {
    return (
        <>
        

    <h1 className='text-[#00406C] font-bold w-screen items-center justify-center pb-2'>IceCube email verification</h1>
    <h3><p>Someone has tried to use your email  to get an IceCube account.
    <br />If it was you, hit the verify link below. If it wasn&apos;t, ignore this email.</p></h3>
    <hr />
    <button className="border-0 bg-[#00406C] text-white font-bold py-2 px-4 rounded-full hover:bg-[#002d4a] pt-2">
    <a href="/">Verify email</a>
    </button>


       
        </>
    )
}

export default test;
