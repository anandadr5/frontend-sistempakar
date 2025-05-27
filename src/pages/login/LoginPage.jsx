import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Input from "@/components/user/input";
import Button from "@/components/user/button";
import Label from "@/components/user/label";
import FullScreenLoader from "@/components/loading";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validasi input kosong
    if (!email || !password) {
      toast.error("Masukkan email dan kata sandi terlebih dahulu.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const isValidLogin = email === "admin@admin" && password === "admin123";
      setIsLoading(false);

      if (isValidLogin) {
        localStorage.setItem("isLoggedIn", "true");
        toast.success("Login berhasil!");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        toast.error("Email atau kata sandi salah.");
        setEmail("");
        setPassword("");
      }
    }, 1000);
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-[#d6eadf]">
      <section className="flex flex-col items-center w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl sm:text-[50px] font-bold text-[#01796f] text-center mb-8">
          Selamat Datang!
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full sm:w-[440px]"
        >
          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email Anda"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Kata Sandi</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan kata sandi Anda"
            />
          </div>

          {/* Button */}
          <div className="flex justify-center mt-4">
            <Button type="submit" id="masuk" className="w-full">
              Masuk
            </Button>
          </div>
        </form>
      </section>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
      />

      {/* Fullscreen Loader */}
      {isLoading && <FullScreenLoader />}
    </main>
  );
};

export default LoginPage;
