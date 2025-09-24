import MainNavigation from "./main-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-[13rem] mx-auto">
        <MainNavigation />
        {children}
    </div>
  )
}