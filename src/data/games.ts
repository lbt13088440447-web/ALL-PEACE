import { Wind, Waves, Sparkles } from "lucide-react";

export interface Game {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any; 
}

export const GAMES: Game[] = [
  {
    id: "vibration",
    title: "4-7-8 触觉呼吸",
    subtitle: "Tactile Breathing",
    description: "通过震动反馈引导 4-7-8 呼吸循环，在指尖感受节奏。",
    icon: Waves,
  },
  {
    id: "vision",
    title: "历历在目",
    subtitle: "Visionary Glimpse",
    description: "眨眼互动一睁眼一闭眼快速粉碎忘却，两秒以上默念铭记",
    icon: Sparkles,
  },
  {
    id: "audio",
    title: "共鸣音场",
    subtitle: "Resonant Soundscape",
    description: "混合不同的环境白噪音，创建属于你自己的正念冥想音乐。",
    icon: Wind,
  }
];
