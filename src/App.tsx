import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// Loader component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-pink-100 bg-opacity-50" style={{
    backgroundImage: "url('https://raw.githubusercontent.com/josegomez-dev/theo/main/baby.jpeg')",
    backgroundSize: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }}>
    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
)

// Confetti component
const Confetti = ({ index }: { index: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-sm"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0],
      x: Math.random() * 200 - 100,
      y: Math.random() * -200 - 50,
      rotate: Math.random() * 360,
    }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      backgroundColor: ['#FF69B4', '#FFB6C1', '#FFA07A', '#98FB98', '#87CEFA', '#DDA0DD'][index % 6],
    }}
  />
)

// Typewriter component
const Typewriter = ({ text, delay = 100 }: { text: string; delay?: number }) => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex])
        setCurrentIndex(prevIndex => prevIndex + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, delay, text])

  return <span>{currentText}</span>
}

// Main App component
export default function Component() {
  const [isLoading, setIsLoading] = useState(true)
  const [month, setMonth] = useState(0)
  const [taps, setTaps] = useState(0)
  const [confetti, setConfetti] = useState<number[]>([])
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  const babyImages = [
    'https://raw.githubusercontent.com/josegomez-dev/theo/main/img/months/1.jpg',
    'https://raw.githubusercontent.com/josegomez-dev/theo/main/img/months/2.jpeg',
    'https://raw.githubusercontent.com/josegomez-dev/theo/main/img/months/3.jpg',
    'https://raw.githubusercontent.com/josegomez-dev/theo/main/baby.jpeg',
    'https://raw.githubusercontent.com/josegomez-dev/theo/main/baby.jpeg',
    'https://raw.githubusercontent.com/josegomez-dev/theo/main/baby.jpeg',
    'https://raw.githubusercontent.com/josegomez-dev/theo/main/baby.jpeg',
    'https://raw.githubusercontent.com/josegomez-dev/theo/main/baby.jpeg',
    'https://raw.githubusercontent.com/josegomez-dev/theo/main/baby.jpeg',
    'https://raw.githubusercontent.com/josegomez-dev/theo/main/baby.jpeg',
    'https://raw.githubusercontent.com/josegomez-dev/theo/main/baby.jpeg',
    'https://raw.githubusercontent.com/josegomez-dev/theo/main/baby.jpeg',
  ]

  const babySounds = [
    'https://rr3---sn-aigl6nzk.googlevideo.com/videoplayback?expire=1727220698&ei=evfyZpvBEZuNqfkPm86Y8QI&ip=103.93.33.180&id=o-AIfWoT0kNdRaFx98lna-yhF4EBk7aGDgk6dpHd0DhMUx&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AXLXGFRc9-fCq-BJCDHW5QBCJjAScBXg7ptyjb320CKxXqEptmfVHfZ9m8whtZaooX1PeaVQLqFde9oC&spc=54MbxSk2OkcYrjzjA7TOQbcfAlWXgGRvhNKAydw-ryGCvnDpNEj6&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=KsySJkjvvdgkvjXQJMfSmyEQ&rqh=1&gir=yes&clen=26175&dur=1.941&lmt=1682380947639575&keepalive=yes&c=WEB_CREATOR&sefc=1&txp=5318224&n=JjeuHvGjZ-yOrA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAKnX7FA05xcfdIcc2GhX_1WqCXhaZRPfniC35_Trxox4AiAI0Y85zLh1HqamcFATnothb_opcdSc9yI9AAO88wQJDA%3D%3D&rm=sn-n0hhpujvh-q5jd7k,sn-npodk7l&rrc=79,104&fexp=24350517,24350557,24350561&req_id=be96dd94c281a3ee&redirect_counter=2&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=I-&mip=201.200.1.93&mm=30&mn=sn-aigl6nzk&ms=nxu&mt=1727197898&mv=D&mvi=3&pl=0&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=ABPmVW0wRgIhANMflQYmpLFXULxg9rLMadKp-aex9xja6bcQRmGvHljIAiEA4WFcRNHNmWMiu6h4fmc0an-xKZ1B5DBY-bZ7zYYZSIw%3D',
  ]

  useEffect(() => {
    const loadAssets = async () => {
      const imagePromises = babyImages.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = src
          img.onload = resolve
          img.onerror = reject
        })
      })

      const soundPromises = babySounds.map(src => {
        return new Promise((resolve, reject) => {
          const audio = new Audio()
          audio.src = src
          audio.oncanplaythrough = resolve
          audio.onerror = reject
        })
      })

      try {
        await Promise.all([...imagePromises, ...soundPromises])
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to load assets:', error)
        setIsLoading(false) // Proceed even if some assets fail to load
      }
    }

    loadAssets()
  }, [])

  useEffect(() => {
    if (taps >= 3) {
      setMonth((prevMonth) => (prevMonth + 1) % 12)
      setTaps(0)
      setConfetti([])
    }
  }, [taps])

  useEffect(() => {
    // Initialize audio
    //const newAudio = new Audio(babySounds[month])
    const newAudio = new Audio(babySounds[0])
    setAudio(newAudio)

    return () => {
      // Cleanup audio on unmount or when month changes
      if (newAudio) {
        newAudio.pause()
        newAudio.currentTime = 0
      }
    }
  }, [month])

  const handleTap = () => {
    setTaps((prevTaps) => prevTaps + 1)
    setConfetti((prevConfetti) => [...prevConfetti, ...Array(3).fill(0).map(() => Date.now() + Math.random())])
    if (audio) {
      audio.currentTime = 0.8 // Reset audio to start
      audio.play().catch(e => console.error("Error playing audio:", e))
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 font-serif">
        <Typewriter text="Theo's First Year" delay={150} />
      </h1>
      <div className="relative w-full max-w-sm aspect-square">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-full h-full bg-pink-200 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: taps / 3 }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={month}
              src={babyImages[month]}
              alt={`Theo at ${month + 1} month${month !== 0 ? 's' : ''}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              onClick={handleTap}
            />
          </AnimatePresence>
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AnimatePresence>
            {confetti.map((id, index) => (
              <Confetti key={id} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-8 text-xl font-semibold text-gray-700">
        {month + 1} month{month !== 0 ? 's' : ''} old
      </p>
      <p className="mt-2 text-sm text-gray-600">
        Tap the image {3 - taps} more time{taps !== 9 ? 's' : ''} to see the next month!
      </p>
    </div>
  )
}
