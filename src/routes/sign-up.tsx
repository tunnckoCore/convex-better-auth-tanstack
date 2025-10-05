import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/sign-up")({
  ssr: false,
  component: SignUp,
});

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="m@example.com"
              required
              type="email"
              value={email}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              autoComplete="new-password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              type="password"
              value={password}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              autoComplete="new-password"
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="confirm password"
              type="password"
              value={confirmPassword}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="terms"
              onClick={() => {
                setAgreeToTerms(!agreeToTerms);
              }}
            />
            <Label htmlFor="terms">I agree to the Terms of Service</Label>
          </div>

          <Button
            className="w-full"
            disabled={loading || !agreeToTerms || password !== confirmPassword}
            onClick={async () => {
              try {
                console.log("Starting sign-up request...");
                await authClient.signUp.email(
                  {
                    email,
                    password,
                    name: email.split("@")[0],
                  },
                  {
                    onRequest: (ctx) => {
                      console.log("Sign-up request started:", ctx);
                      setLoading(true);
                    },
                    onResponse: (ctx) => {
                      console.log("Sign-up response received:", ctx);
                      setLoading(false);
                    },
                    onError: (ctx) => {
                      console.error("Sign-up error:", ctx);
                      setLoading(false);
                    },
                  }
                );
                console.log("Sign-up completed successfully");
              } catch (error) {
                console.error("Sign-up failed:", error);
                setLoading(false);
              }
            }}
            type="submit"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <p> Create Account </p>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
