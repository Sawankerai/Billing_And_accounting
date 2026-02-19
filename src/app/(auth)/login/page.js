"use client";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const login = () => {
    localStorage.setItem("token", "true");
    router.push("/dashboard");
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <button onClick={login}>Login</button>
    </div>
  );
}   