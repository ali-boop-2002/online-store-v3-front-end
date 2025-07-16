import { AlertTriangle } from "lucide-react";

function Error({ message = "Something went wrong", details = null }) {
  return (
    <div className="bg-blue-100 border border-red-300 text-red-700 px-6 py-4 rounded-lg shadow-md flex items-start space-x-4 max-w-2xl mx-auto mt-8">
      <AlertTriangle size={28} className="mt-1 shrink-0 text-red-500" />
      <div>
        <h2 className="text-lg font-semibold">{message}</h2>
        {details && <p className="text-sm mt-1">{details}</p>}
      </div>
    </div>
  );
}

export default Error;
