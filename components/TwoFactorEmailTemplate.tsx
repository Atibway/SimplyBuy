import React from 'react';

interface TwoFactorEmailTemplateProps {
  token: string;
}

const TwoFactorEmailTemplate: React.FC<TwoFactorEmailTemplateProps> = ({ token }) => {
  return (
    <div className=" py-8 px-4 sm:px-6 lg:px-8 container shadow-2xl">
      <div className="max-w-lg mx-auto  bg-pink-300 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 text-center">Two-Factor Authentication (2FA)</h1>
          <p className="mt-4 text-gray-600 text-center">
            Your security is important to us. Please use the code below to complete your login.
          </p>

          <div className="mt-6 flex justify-center">
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 inline-block">
              <span className="text-xl font-mono text-gray-900 tracking-wide">{token}</span>
            </div>
          </div>

          <p className="mt-6 text-gray-600 text-center">
            This code is valid for the next <span className="font-semibold">5 mins</span>. If you did not request this code, please ignore this email.
          </p>

          <div className="mt-8 text-center">
            <a
              href="#"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-500 transition"
            >
              Login to Your Account
            </a>
          </div>
        </div>

        <div className="bg-gray-50 p-4 sm:p-6 text-gray-500 text-center">
          <p>If you have any issues, feel free to <a href="#" className="text-blue-600 underline">contact support</a>.</p>
          <p className="mt-2">Thank you for using Acme!</p>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorEmailTemplate;
