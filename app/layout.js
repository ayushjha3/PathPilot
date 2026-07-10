import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Career Coach",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            {/* <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Copyright @AyushRanjanJha.dev | All right reserved.</p>
              </div>
            </footer> */}

            <footer className="relative border-t border-white/10 bg-background/80 backdrop-blur-xl">

              {/* Top Divider Glow */}
              <div className="absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

              <div className="container mx-auto max-w-7xl px-6 py-8">

                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

                  <p className="text-sm text-muted-foreground text-center md:text-left">
                    Copyright ©{" "}
                    <span className="font-semibold text-violet-400">
                      AyushRanjanJha.dev
                    </span>{" "}
                    | All rights reserved.
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Built with</span>
                    <span className="text-red-500">♥</span>
                    <span>using</span>
                    <span className="font-medium text-foreground">Next.js</span>
                    <span>•</span>
                    <span className="font-medium text-foreground">Clerk</span>
                    <span>•</span>
                    <span className="font-medium text-foreground">Gemini AI</span>
                  </div>

                </div>

              </div>

            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}