import '../styles/global.css';
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={work_sans.className}>
        <NavBar />
        <main className="main-container">
          {children}
        </main>
      </body>
      <PrelineScript />
    </html>
  );
}