import {redirect, useRouter} from 'next/navigation';
import {useSession} from "next-auth/react";
import {useEffect} from "react";

export default function UserPage({ params }) {
  const { username } = params;
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session?.status == "authenticated"){
      router.replace("/");
    }
  }, [session, router]);

  redirect(`${username}/profile`);

  return null;
}
