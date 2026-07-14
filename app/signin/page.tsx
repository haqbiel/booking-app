import { Metadata } from "next"
import { LoginGoogleButton } from "@/components/login-button"

export const metadata: Metadata = {
  title: "Sign In",
}

const SignInPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect_url?: string }>;
}) => {
  const params = (await searchParams)?.redirect_url;
  let redirectUrl;
  if (!params) {
    redirectUrl = "/";
  } else {
    redirectUrl = `/${params}`;
  }
  return (
    <div className="min-h-screen flex items-center bg-surface-1">
      <div className="bg-canvas w-96 mx-auto rounded-md shadow-elevated p-8">
        <h1 className="text-4xl font-bold mb-1 text-primary">Sign In</h1>
        <p className="font-medium mb-5 text-ink-muted">Sign In to your account</p>
        <div className="py-4 text-center">
          <LoginGoogleButton redirectUrl={redirectUrl} />
        </div>
      </div>
    </div>
  )
}

export default SignInPage