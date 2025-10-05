import { useUser } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/demo/clerk")({
  component: App,
});

function App() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <User className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please sign in to view this page</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <User className="mx-auto mb-2 h-12 w-12 text-primary" />
          <CardTitle>Welcome Back!</CardTitle>
          <CardDescription>
            You are successfully authenticated with Clerk
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-center text-lg">
              Hello, <span className="font-semibold">{user.firstName}</span>!
            </p>
            <p className="text-center text-muted-foreground text-sm">
              {user.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
