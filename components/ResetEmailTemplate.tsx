import * as React from "react";

interface EmailTemplateProps {
    confirmLink: string;
  }

  export const ResetPasswordEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    confirmLink,
  }) => (
    <div className="bg-gray-100 p-4">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Reset Your Password
          </h1>
          <p className="text-gray-700 mb-6">
            Click the button below to confirm your email address and complete your password Resetting.
          </p>
          <div className="text-center">
            <a
              href={confirmLink}
              className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Confirm Email
            </a>
          </div>
          <p className="text-gray-500 mt-4">
            If you did not request this email, you can safely ignore it.
          </p>
        </div>
      </div>
    </div>
  );

