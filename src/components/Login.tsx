import Button from "./Button";
import Input from "./Input";

const Login: React.FC = () => {
  return (
    <section className="w-full md:w-[450px]">
      <h1 className="text-white text-4xl text-center font-bold mb-10">Login</h1>
      <div className="bg-white flex flex-col space-y-3 p-6 min-h-36 rounded-xl drop-shadow-xl">
        <Input type="email" name="email" placeholder="Enter email" />
        <Input type="password" name="password" placeholder="Enter password" />
        <Button text="Login" />
        <Button text="Register" loading secondary />
      </div>
    </section>
  );
};

export default Login;
