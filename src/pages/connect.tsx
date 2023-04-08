import { LoginOrRegister } from '@/components/Auth';

function Connect() {
  return (
    <div className="container flex justify-center items-center mt-30 bg-var(--bg-color) text-var(--text-color) gap-8">
      <div className={`card w-96 rounded-md shadow-lg p-4 bg-var(--card-bg-color) shadow-var(--card-shadow-color)`}>
        <LoginOrRegister />
      </div>
      
    </div>
  );
}

export default Connect;
