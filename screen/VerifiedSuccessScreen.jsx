function VerifiedSuccessScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          Email Verified!
        </h1>
        <p className="text-gray-700">
          Your email has been successfully verified. You can now log in to your
          account.
        </p>
        <a
          href="/login"
          className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}

export default VerifiedSuccessScreen;
