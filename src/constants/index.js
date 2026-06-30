const navLinks = [
  { key: "work", link: "#work" },
  { key: "experience", link: "#experience" },
  { key: "skills", link: "#skills" },
];

const heroWordIcons = [
  "/images/designs.svg",
  "/images/concepts.svg",
  "/images/ideas.svg",
  "/images/code.svg",
];

const counterItems = [
  { value: 5, suffix: "+" },
  { value: 12, suffix: "+" },
  { value: 3, suffix: "" },
  { value: 15, suffix: "+" },
];

const logoIconsList = [
  { name: "React", imgPath: "/images/logos/react.png" },
  { name: "React Native", imgPath: "/images/logos/react-native.svg" },
  { name: "TypeScript", imgPath: "/images/logos/typescript.svg" },
  { name: "Next.js", imgPath: "/images/logos/nextjs.svg" },
  { name: "Redux Toolkit", imgPath: "/images/logos/redux.svg" },
  { name: "Web3", imgPath: "/images/logos/web3-logo.svg" },
  { name: "WebGL / Three.js", imgPath: "/images/logos/three.png" },
  { name: "PixiJS", imgPath: "/images/logos/pixijs.svg" },
  { name: "GSAP", imgPath: "/images/logos/gsap.svg" },
  { name: "Node.js", imgPath: "/images/logos/node.png" },
  { name: "Git", imgPath: "/images/logos/git.svg" },
];

const projects = [
  {
    imgPath: "/images/project-1.png",
    link: "https://app.strata.markets",
    vpn: true,
    tags: ["React", "TypeScript", "Web3", "Charts"],
  },
  {
    imgPath: "/images/project-2.png",
    link: "https://strata.markets",
    vpn: true,
    tags: ["React", "GSAP", "Lottie", "GraphQL"],
  },
  {
    imgPath: "/images/project-3.png",
    link: "https://kupitkartinu.ru",
    tags: ["Next.js", "TypeScript", "GraphQL", "SSR"],
  },
  {
    imgPath: "/images/project-4.jpg",
    link: "",
    tags: ["React", "TypeScript", "RTK Query", "WebSocket"],
  },
  {
    imgPath: "/images/project-7.jpg",
    link: "",
    tags: ["PixiJS", "WebGL", "GSAP", "WebView"],
    mobile: true,
  },
  {
    imgPath: "/images/project-6.png",
    link: "https://assistant.matchflow.ru",
    tags: ["React", "React Native", "TypeScript", "Redux"],
  },
  {
    imgPath: "/images/project-5.jpg",
    link: "https://analytics.matchflow.ru/",
    tags: ["React", "Redux", "WebSocket", "Charts"],
  },
  {
    imgPath: "/images/project-8.jpg",
    link: "",
    tags: ["React Native", "Redux", "TypeScript", "Maps"],
    mobile: true,
  },
  {
    imgPath: "/images/project-9.jpg",
    tags: ["React", "GSAP", "Google API", "OAuth2"],
  },
];

const techStackIcons = [
  {
    name: "React / React Native",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Next.js",
    modelPath: "/models/next-transformed.glb",
    scale: 2.6,
    rotation: [0, 0, 0],
  },
  {
    name: "Web3",
    modelPath: "/models/web3-logo.glb",
    scale: 0.6,
    rotation: [0, 0, 0],
  },
  {
    name: "WebGL / Three.js",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "PixiJS",
    modelPath: "/models/pixijs-transformed.glb",
    scale: 5,
    rotation: [0, 0, 0],
  },
];

const expCards = [
  { imgPath: "/images/exp1.png", logoPath: "/images/logo1.png" },
  { imgPath: "/images/exp2.png", logoPath: "/images/logo2.png" },
  { imgPath: "/images/exp3.png", logoPath: "/images/logo3.png" },
];

const socialImgs = [
  {
    name: "telegram",
    imgPath: "/images/telegram.svg",
    url: "https://t.me/k_moler",
  },
  {
    name: "github",
    imgPath: "/images/github.svg",
    url: "https://github.com/Kirill354",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
    url: "https://www.linkedin.com/in/kirill-molev-75aa24342",
  },
];

export {
  heroWordIcons,
  logoIconsList,
  counterItems,
  projects,
  expCards,
  socialImgs,
  techStackIcons,
  navLinks,
};
