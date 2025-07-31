import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export const SignupForm = ({ onSwitchToLogin }: SignupFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Handle signup logic here
    console.log("Signup attempt:", formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Create Account</h2>
        <p className="text-muted-foreground">Join the creative revolution</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="bg-input/50 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="bg-input/50 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="bg-input/50 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className="bg-input/50 border-white/10 focus:border-primary focus:ring-1 focus:ring-primary pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="terms"
            type="checkbox"
            className="w-4 h-4 text-primary bg-input border-white/10 rounded focus:ring-primary"
            required
          />
          <Label htmlFor="terms" className="text-sm text-muted-foreground">
            I agree to the{" "}
            <button type="button" className="text-primary hover:text-primary-glow">
              Terms of Service
            </button>{" "}
            and{" "}
            <button type="button" className="text-primary hover:text-primary-glow">
              Privacy Policy
            </button>
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-ai hover:shadow-glow transition-all duration-300"
        >
          Create Account
        </Button>
      </form>

      <div className="text-center">
        <p className="text-muted-foreground">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-primary hover:text-primary-glow transition-colors font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};