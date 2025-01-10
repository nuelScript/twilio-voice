import { PasswordInput } from "@/components/ui/password-input";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface PasswordInputWithStrengthProps {
  onChange: (value: string) => void;
  [key: string]: unknown;
}

export const PasswordInputWithStrength: React.FC<
  PasswordInputWithStrengthProps
> = ({ onChange, ...props }) => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);

  const calculateStrength = (value: string) => {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Za-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[!@#$%^&*(),.?":{}|_<>]/.test(value)) score++;
    return (score / 4) * 100;
  };

  useEffect(() => {
    setStrength(calculateStrength(password));
    onChange(password);
  }, [password, onChange]);

  const getStrengthColor = () => {
    if (strength < 25) return "bg-red-500";
    if (strength < 50) return "bg-orange-500";
    if (strength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-2">
      <PasswordInput {...props} onChange={(e) => setPassword(e.target.value)} />
      <Progress
        value={strength}
        className={`h-1 w-full ${getStrengthColor()}`}
      />
      <div className="text-xs text-gray-500">
        Password strength:{" "}
        {strength < 25
          ? "Weak"
          : strength < 50
          ? "Fair"
          : strength < 75
          ? "Good"
          : "Strong"}
      </div>
    </div>
  );
};
