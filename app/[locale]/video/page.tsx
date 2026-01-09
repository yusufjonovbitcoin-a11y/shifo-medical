import { Video } from '@/components/Video';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

export default function VideoPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="relative bg-gradient-to-br from-emerald-500 via-teal-600 to-green-700 overflow-hidden">
        <Header />
      </div>
      <Video />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
