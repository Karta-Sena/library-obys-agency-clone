export type CreditRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const creditsPatternRects: CreditRect[] = [
  { x: 427.805, y: 0, width: 169.103, height: 34.7688 },
  { x: 427.5, y: 45.041, width: 200.711, height: 35.559 },
  { x: 427.805, y: 90.873, width: 169.103, height: 34.7688 },
  { x: 427.805, y: 180.955, width: 169.103, height: 35.559 },
  { x: 427.5, y: 135.914, width: 200.711, height: 35.559 },
  { x: 214, y: 0.0293, width: 168.313, height: 34.7688 },
  { x: 214, y: 45.041, width: 200.711, height: 35.559 },
  { x: 214, y: 90.873, width: 200.711, height: 34.7688 },
  { x: 214, y: 180.984, width: 168.313, height: 35.559 },
  { x: 214, y: 135.914, width: 200.711, height: 35.559 },
  { x: 33.1875, y: 0.0293, width: 135.915, height: 34.7688 },
  { x: 0, y: 45.041, width: 200.711, height: 35.559 },
  { x: 0.1172, y: 90.873, width: 200.711, height: 34.7688 },
  { x: 33.1875, y: 180.984, width: 135.915, height: 35.559 },
  { x: 0, y: 135.914, width: 200.711, height: 35.559 },
];

export type CreditGroup = {
  title: string;
  items: string[];
};

export const creditGroups: CreditGroup[] = [
  {
    title: "Creative Direction",
    items: ["Obys Agency", "Design Education Series"],
  },
  {
    title: "Rebuild",
    items: ["Next.js App Router", "TypeScript + Structured Data"],
  },
  {
    title: "Motion Stack",
    items: ["GSAP-ready architecture", "Framer/Lenis integration path"],
  },
  {
    title: "Visual System",
    items: ["Monochrome editorial baseline", "Texture and contrast discipline"],
  },
];
