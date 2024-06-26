import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { FB_AuthSignIn, FB_AuthSignUp } from "../backend/queries";
import { toastWarn } from "../utils/toast";

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    const formData = new FormData(form);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    if (isLogin) {
      await FB_AuthSignIn(data, setLoading);
    } else {
      const confirmPassword = formData.get("password-confirm") as string;
      if (data.password.length >= 6) {
        if (data.password === confirmPassword) {
          await FB_AuthSignUp(data, setLoading);
        } else {
          toastWarn("Passwords do not match");
        }
      } else {
        toastWarn("Password should be at least 6 characters");
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
        <Button text={isLogin ? "Login" : "Register"} loading={loading} />
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
