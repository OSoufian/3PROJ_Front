
export default function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1)
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl">
        <div className="i-carbon-warning inline-block" />
      </div>
      <h1 className="text-3xl mt-4">Not Found</h1>
      <button className="btn mt-8" onClick={handleGoBack}>
        Go Back
      </button>
    </div>
  );
}