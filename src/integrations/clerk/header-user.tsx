import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export default function HeaderUser() {
  return (
    <>
      <SignedIn>
        <UserButton showName />
      </SignedIn>
      <SignedOut>
        <Button asChild>
          <Link to="/login">Login</Link>
        </Button>
      </SignedOut>
    </>
  );
}
