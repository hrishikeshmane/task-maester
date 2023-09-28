import { PrimeReactProvider } from "primereact/api"

import { SiteHeader } from "@/components/site-header"
// import "primereact/resources/themes/lara-light-indigo/theme.css"
// theme
// import "primereact/resources/primereact.css"
// // core css
import "primeicons/primeicons.css"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* <PrimeReactProvider> */}
      <SiteHeader />
      <main>{children}</main>
      {/* </PrimeReactProvider> */}
    </>
  )
}
