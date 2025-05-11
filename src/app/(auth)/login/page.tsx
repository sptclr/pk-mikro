"use client";

// pages/login.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { withPublic } from "@/components/HOC/WithPublic";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast/ToastProvider";

// 🔐 Zod schema
const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

function LoginPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { showToast } = useToast();
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("loginCredentials");
    if (saved) {
      const parsed = JSON.parse(saved);
      setValue("email", parsed.email);
      setValue("username", parsed.username);
      setValue("password", parsed.password);
    }
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    if (data.remember) {
      localStorage.setItem(
        "loginCredentials",
        JSON.stringify({
          email: data.email,
          username: data.username,
          password: data.password,
        })
      );
    } else {
      localStorage.removeItem("loginCredentials");
    }

    const success = await login(data.username, data.email, data.password);

    // tambahkan delay jika ingin efek 'isSubmitting' terasa lebih lama
    await new Promise((resolve) => setTimeout(resolve, 3000)); // delay 1 detik

    if (success) {
      router.push("/");
      showToast("Login Berhasil!");
    } else {
      showToast("Terjadi kesalahan! Periksa kembali input anda");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="w-full bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex w-[90%] max-w-5xl">
        {/* Left Side (Form) */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-blue-500 mb-2">
            Selamat Datang Kembali
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Silahkan input email, username, dan password anda.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-pink-500 focus:ring-pink-400"
                    : "focus:ring-pink-400"
                }`}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-pink-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                {...register("username")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.username
                    ? "border-pink-500 focus:ring-pink-400"
                    : "focus:ring-pink-400"
                }`}
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-pink-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                autoComplete="on"
                type="password"
                {...register("password")}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-pink-500 focus:ring-pink-400"
                    : "focus:ring-pink-400"
                }`}
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-pink-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                {...register("remember")}
                className="mr-2"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-400 to-blue-600 text-white py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
            >
              {isSubmitting ? "loading..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Right Side (Image) */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: "url('/image-login.jpg')",
          }}
        ></div>
      </div>
    </div>
  );
}

export default withPublic(LoginPage);
