import { redirect } from "next/navigation";

type LoginPageProps = {
  searchParams?: Promise<{
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) ?? {};
  const nextRoute = typeof params.next === "string" ? params.next : "/dashboard";

  redirect(`/?auth=login&next=${encodeURIComponent(nextRoute)}`);
}
