import { isAxiosError } from "axios";
import { Navigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  let message = "Something went wrong";
  if (isAxiosError<{ errors: { message: string }[] }>(error)) {
    if (error.response?.status === 401) {
      return <Navigate to={"/sigin"} />;
    }
    message = error.response?.data.errors?.[0]?.message ?? message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto px-4">
        <h3 className="text-3xl text-red-600 mb-4">Oops!</h3>
        <p className="text-lg mb-2">Sorry, an unexpected error has occurred.</p>
        <p className="text-lg mb-4 italic">{message}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
