// These styles apply to every route in the application
import '../src/styles/globals.scss'

import Header from '@components/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-6xl mx-auto px-4 lg:px-10">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
