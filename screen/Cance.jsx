function CancelPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-red-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-700 mb-4">
          Payment Canceled
        </h1>
        <p className="text-lg">
          You canceled the checkout process. You can try again later.
        </p>
      </div>
    </div>
  );
}

export default CancelPage;
