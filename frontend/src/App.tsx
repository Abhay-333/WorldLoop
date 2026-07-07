import LoginPage from "./features/auth/login/LoginPage"
import RegisterPage from "./features/auth/register/RegisterPage"
export function App() {
  return (
    <div className="flex max-h-screen">
      {/* <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div> */}

      <LoginPage></LoginPage>
      <RegisterPage></RegisterPage>
    </div>
  )
}

export default App
