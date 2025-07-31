import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side – Designer Image */}
      <div className="hidden md:flex w-full md:w-1/2 relative">
        <img
          src="/Layout_Img.png" // ⬅️ Place your image here
          alt="Creative Designer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30" />
      </div>

      {/* Right Side – Login Form Section */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white flex items-center justify-center p-6 relative">
        {/* Optional: Animated floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-md">
          {/* Logo + Heading */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <img
                src="/NexAI Studio.png"
                alt="NexAI Studio Logo"
                className="w-30 h-10 object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm">
              Transform your ideas with AI-powered creativity
            </p>
          </div>

          {/* Auth Form */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-xl">
            {children}
          </div>

          {/* Footer */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Empowering creators with intelligent design tools
          </p>
        </div>
      </div>
    </div>
  );
};
