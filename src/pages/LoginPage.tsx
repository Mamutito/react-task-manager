import Login from "../components/Login";

const LoginPage: React.FC = () => {
  return (
    <main className="h-screen flex items-center justify-center p-10">
      <Login />
      <div className="w-full h-full opacity-70 -z-10 absolute bg-gradient-to-r  from-myBlue to-myPink" />
      <div className="bg-pattern w-full h-full -z-20 absolute" />
    </main>
  );
};

export default LoginPage;
