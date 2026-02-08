import { useState } from "react";
import TerminalLockScreen from "@/components/TerminalLockScreen";
import LoveLetterScroll from "@/components/LoveLetterScroll";
import useScrollAnimation from "@/hooks/useScrollAnimation";

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Initialize scroll animations when unlocked
  useScrollAnimation();

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  if (!isUnlocked) {
    return <TerminalLockScreen onUnlock={handleUnlock} />;
  }

  return <LoveLetterScroll />;
};

export default Index;
