import LoginCard from "@/components/auth/LoginCard";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background text-on-background">
      <div className="absolute inset-0 nebula-bg" />

      <LoginCard />
    </div>
  );
}