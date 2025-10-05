import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
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
import { api } from "@/convex/_generated/api";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/sign-in")({
  ssr: false,
  component: SignIn,
});

function SignIn() {
  const data = useQuery(api.users.list);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  console.log({ data });
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
          {data?.map((user) => (
            <div key={user.userId}>
              {user.userId} - {user.email}
            </div>
          ))}
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
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>

            <Input
              autoComplete="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              type="password"
              value={password}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              onClick={() => {
                setRememberMe(!rememberMe);
              }}
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>

          <Button
            className="w-full"
            disabled={loading}
            onClick={async () => {
              try {
                console.log("Starting sign-in request...");
                await authClient.signIn.email(
                  {
                    email,
                    password,
                  },
                  {
                    onRequest: (ctx) => {
                      console.log("Sign-in request started:", ctx);
                      setLoading(true);
                    },
                    onResponse: (ctx) => {
                      console.log("Sign-in response received:", ctx);
                      setLoading(false);
                    },
                    onError: (ctx) => {
                      console.error("Sign-in error:", ctx);
                      setLoading(false);
                    },
                  }
                );
                console.log("Sign-in completed successfully");
              } catch (error) {
                console.error("Sign-in failed:", error);
                setLoading(false);
              }
            }}
            type="submit"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <p> Login </p>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
