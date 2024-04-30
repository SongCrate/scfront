import '../styles/global.css';
import { Work_Sans} from 'next/font/google';
import { NavBar } from '@/components';

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
        <main class="main-container">
          {children}
        </main>
      </body>
    </html>
  );
}