import { useEffect, useRef, useState } from "react";
import PolaroidFrame from "./PolaroidFrame";
import VideoPlayer from "./VideoPlayer";
import ImageGrid from "./ImageGrid";
import MusicToggle from "./MusicToggle";

const LoveLetterScroll = () => {
  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Start audio with fade in
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    audio.loop = true;
    
    const playAudio = async () => {
      try {
        await audio.play();
        setAudioStarted(true);
        
        // Fade in
        let volume = 0;
        const fadeIn = setInterval(() => {
          if (volume < 0.4) {
            volume += 0.02;
            audio.volume = Math.min(volume, 0.4);
          } else {
            clearInterval(fadeIn);
          }
        }, 100);
      } catch (e) {
        console.log("Auto-play prevented, waiting for user interaction");
      }
    };

    // Small delay to ensure smooth transition
    setTimeout(playAudio, 500);
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <div className="min-h-screen bg-love-cream">
      {/* Background Music */}
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        preload="auto"
      />

      {/* Music Toggle */}
      <MusicToggle audioRef={audioRef} />

      {/* Header */}
      <header className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="animate-on-scroll text-center">
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-love-charcoal mb-4">
            For Smita
          </h1>
          <p className="font-mono text-love-charcoal/60 text-sm md:text-base tracking-wider">
            Subject: <span className="text-love-rose">The Unhandled Exception</span>
          </p>
        </div>
      </header>

      {/* Section 1: The Initialization */}
      <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24 max-w-4xl mx-auto">
        <div className="animate-on-scroll">
          <h2 className="font-playfair text-2xl md:text-3xl lg:text-4xl text-love-charcoal mb-8">
            The Initialization
          </h2>
          <p className="font-lora text-love-charcoal/80 text-base md:text-lg lg:text-xl leading-relaxed mb-4">
            Smita, you know I spend my life trying to make things predictable. I write code to handle errors, I train models to predict outcomes, and I look for logic in everything. My world is usually black screens and green text.
          </p>
          <p className="font-lora text-love-charcoal/80 text-base md:text-lg lg:text-xl leading-relaxed">
            But then, you happened.
          </p>
          <p className="font-lora text-love-charcoal/80 text-base md:text-lg lg:text-xl leading-relaxed mt-4">
            You didn't fit into any algorithm I knew. You weren't a variable I could declare or a function I could optimize. You were a sudden, beautiful glitch in my system that completely crashed my logic—and for the first time, I didn't want to reboot.
          </p>
        </div>
        
        <div className="animate-on-scroll mt-12 flex justify-center">
          <PolaroidFrame
            src="/media/image-1.png"
            alt="Our first memory"
            rotation={-2}
          />
        </div>
      </section>

      {/* Section 2: The Runtime Chaos */}
      <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24 max-w-4xl mx-auto">
        <div className="animate-on-scroll">
          <h2 className="font-playfair text-2xl md:text-3xl lg:text-4xl text-love-charcoal mb-8">
            The Runtime Chaos
          </h2>
          <p className="font-lora text-love-charcoal/80 text-base md:text-lg lg:text-xl leading-relaxed mb-4">
            They say perfect code doesn't exist. They're right, because the best moments with you are completely unoptimized. They are messy, loud, and don't follow any documentation.
          </p>
          <p className="font-lora text-love-charcoal/80 text-base md:text-lg lg:text-xl leading-relaxed">
            Whether we are arguing over where to eat or laughing at absolutely nothing, those are the moments my CPU spikes. You bring a chaos into my life that is better than any order I could ever program.
          </p>
        </div>
        
        <div className="animate-on-scroll mt-12">
          <VideoPlayer src="/media/video-1.mp4" />
        </div>
      </section>

      {/* Section 3: The Training Data */}
      <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24 max-w-4xl mx-auto">
        <div className="animate-on-scroll">
          <h2 className="font-playfair text-2xl md:text-3xl lg:text-4xl text-love-charcoal mb-8">
            The Training Data
          </h2>
          <p className="font-lora text-love-charcoal/80 text-base md:text-lg lg:text-xl leading-relaxed mb-4">
            In a world obsessed with Artificial Intelligence, you ground me in something real. You are my dataset. Every conversation, every look, every small gesture—it all trains me to be a better version of myself.
          </p>
          <p className="font-lora text-love-charcoal/80 text-base md:text-lg lg:text-xl leading-relaxed">
            You see the bugs in me that I try to hide, and instead of judging them, you help me patch them. You make the difficult days feel like simple syntax errors—easily fixable as long as you're there to debug them with me.
          </p>
        </div>
        
        <div className="animate-on-scroll mt-12">
          <ImageGrid
            images={[
              { src: "/media/image-2.png", alt: "Memory 1" },
              { src: "/media/image-3.png", alt: "Memory 2" },
              { src: "/media/image-4.png", alt: "Memory 3" },
            ]}
          />
        </div>
      </section>

      {/* Section 4: The Infinite Loop */}
      <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24 max-w-5xl mx-auto">
        <div className="animate-on-scroll">
          <h2 className="font-playfair text-2xl md:text-3xl lg:text-4xl text-love-charcoal mb-8">
            The Infinite Loop
          </h2>
          <p className="font-lora text-love-charcoal/80 text-base md:text-lg lg:text-xl leading-relaxed mb-4">
            I'm not looking for a temporary fix or a short-term project. I am looking for Long Term Support (LTS).
          </p>
          <p className="font-lora text-love-charcoal/80 text-base md:text-lg lg:text-xl leading-relaxed">
            I want to be there for every version update of your life. Through the crashes, the lags, and the high-performance days. I promise to keep learning you, even when you're complicated, and to support you, even when the server is down.
          </p>
        </div>
        
        <div className="animate-on-scroll mt-12">
          <VideoPlayer src="/media/video-2.mp4" cinematic />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 lg:px-16 py-24 md:py-32 max-w-4xl mx-auto text-center">
        <div className="animate-on-scroll">
          <p className="font-lora text-love-charcoal text-xl md:text-2xl lg:text-3xl leading-relaxed mb-12 italic">
            "Smita, in a world full of variables, you are my only constant."
          </p>
        </div>

        <div className="animate-on-scroll mt-8 flex justify-center">
          <div className="w-48 md:w-64 rounded-lg overflow-hidden shadow-xl">
            <img
              src="/media/image-5.png"
              alt="Forever"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="animate-on-scroll mt-16 space-y-2">
          <p className="font-mono text-love-charcoal/60 text-sm">
            {">"} End of Line.
          </p>
          <p className="font-mono text-love-rose text-sm md:text-base">
            {">"} Status: Permanently Yours.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LoveLetterScroll;
