import '../styles/global.css';
import { getServerSession } from "next-auth";
import SessionProvider from "./SessionProvider/SessionProvider";
import { ModalContextProvider } from "./ModalContextProvider/ModalContextProvider";
import { Work_Sans} from 'next/font/google';
import { 
  NavBar,
  PrelineScript 
} from '@/components';

const work_sans = Work_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'SoundCrate',
  description: 'INF124 SoundCrate App',
};

export default async function RootLayout({ children }) {
    const session = await getServerSession();
  return (
    <html lang="en">
      <body className={work_sans.className}>
      <SessionProvider>
          <ModalContextProvider>
            <NavBar />
            <main className="main-container">
                {children}
            </main>
          </ModalContextProvider>
      </SessionProvider>
      </body>
      <PrelineScript />   
    </html>
  );
}