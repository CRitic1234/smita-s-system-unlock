import { useState, useEffect, useRef } from "react";

interface TerminalLockScreenProps {
  onUnlock: () => void;
}

const PASSWORD = "23122003";

const bootMessages = [
  "> Initializing Heartbeat Protocol...",
  "> Loading Shared Memories...",
  "> ERROR: Encrypted Directory found.",
  "> Please enter the Decryption Key to proceed.",
];

const TerminalLockScreen = ({ onUnlock }: TerminalLockScreenProps) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [fadeToWhite, setFadeToWhite] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typewriter effect for boot sequence
  useEffect(() => {
    if (currentLineIndex >= bootMessages.length) {
      setTimeout(() => setShowInput(true), 500);
      return;
    }

    const currentMessage = bootMessages[currentLineIndex];
    
    if (currentCharIndex < currentMessage.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          if (newLines.length <= currentLineIndex) {
            newLines.push(currentMessage.slice(0, currentCharIndex + 1));
          } else {
            newLines[currentLineIndex] = currentMessage.slice(0, currentCharIndex + 1);
          }
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  // Focus input when it appears
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  // Matrix rain effect
  useEffect(() => {
    if (!showMatrix || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const chars = "01";
    let animationFrame: number;
    let startTime = Date.now();

    const draw = () => {
      const elapsed = Date.now() - startTime;
      
      // Fade to white after 2 seconds
      if (elapsed > 2000) {
        setFadeToWhite(true);
        setTimeout(() => onUnlock(), 1000);
        return;
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff00";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [showMatrix, onUnlock]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === PASSWORD) {
      setShowMatrix(true);
    } else {
      setError(true);
      setPassword("");
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-4 font-mono overflow-hidden">
      {/* Matrix Canvas */}
      {showMatrix && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 z-10 transition-opacity duration-1000 ${
            fadeToWhite ? "opacity-0" : "opacity-100"
          }`}
        />
      )}

      {/* White overlay for transition */}
      <div
        className={`absolute inset-0 bg-white z-20 transition-opacity duration-1000 pointer-events-none ${
          fadeToWhite ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Terminal content */}
      <div
        className={`w-full max-w-2xl transition-opacity duration-500 ${
          showMatrix ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Boot sequence lines */}
        <div className="space-y-2 mb-8">
          {displayedLines.map((line, index) => (
            <p
              key={index}
              className={`text-terminal-green text-sm md:text-base lg:text-lg terminal-glow ${
                line.includes("ERROR") ? "text-yellow-400" : ""
              }`}
            >
              {line}
              {index === displayedLines.length - 1 && 
               currentLineIndex < bootMessages.length && (
                <span className="animate-blink">▊</span>
              )}
            </p>
          ))}
        </div>

        {/* Password input */}
        {showInput && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-terminal-green terminal-glow text-sm md:text-base">
                {">"} Enter Key:
              </span>
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-terminal-green terminal-glow text-sm md:text-base caret-terminal-green"
                autoComplete="off"
              />
              <span className="animate-blink text-terminal-green">▊</span>
            </div>
            
            {error && (
              <p className="text-red-500 text-sm md:text-base animate-pulse">
                {">"} Access Denied. Try again.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default TerminalLockScreen;
