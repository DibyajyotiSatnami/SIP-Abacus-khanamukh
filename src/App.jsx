import { MotionConfig, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Playground from './components/Playground'
import FlashChallenge from './components/FlashChallenge'
import Stats from './components/Stats'
import Programme from './components/Programme'
import Puzzle from './components/Puzzle'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { CENTRE } from './data'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Playground />
        <FlashChallenge />
        <Stats />
        <Programme />
        <Puzzle />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <motion.a
        className="fab"
        href={CENTRE.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1, y: [0, -6, 0] }}
        transition={{ scale: { delay: 1.2, type: 'spring' }, y: { duration: 2, repeat: Infinity, delay: 2 } }}
      >
        💬
      </motion.a>
    </MotionConfig>
  )
}
