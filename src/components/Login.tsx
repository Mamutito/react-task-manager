import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    if (isLogin) {
      // handle login data
      console.log("Login with", data);
    } else {
      const confirmPassword = formData.get("password-confirm") as string;
      if (data.password === confirmPassword) {
        // Handle register data
        console.log("Registering with", data);
      } else {
        console.log("Passwords do not match");
      }
    }
  };
  return (
    <section className="w-full md:w-[450px]">
      <h1 className="text-white text-4xl text-center font-bold mb-10">
        {isLogin ? "Login" : "Register"}
      </h1>
      <form
        className="bg-white flex flex-col space-y-3 p-6 min-h-36 rounded-xl drop-shadow-xl transition-all"
        onSubmit={handleSubmit}
      >
        <Input type="email" name="email" placeholder="Enter email" required />
        <Input
          type="password"
          name="password"
          placeholder="Enter password"
          required
        />
        {!isLogin && (
          <Input
            type="password"
            name="password-confirm"
            placeholder="Enter again password"
            required
          />
        )}
        <Button text={isLogin ? "Login" : "Register"} />
        <Button
          type="button"
          text={isLogin ? "Register" : "Cancel"}
          onClick={() => setIsLogin((prev) => !prev)}
          secondary
        />
      </form>
    </section>
  );
};

export default Login;
