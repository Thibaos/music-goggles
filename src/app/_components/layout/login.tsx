import { Button, Link } from "@nextui-org/react";
import { getServerAuthSession } from "~/server/auth";

export async function Login() {
  const session = await getServerAuthSession();

  return (
    <Button as={Link} href={session ? "/api/auth/signout" : "/api/auth/signin"}>
      {session ? "Sign out" : "Sign in"}
    </Button>
  );
}
