import React, { useState, useEffect, useMemo } from 'react';
import { TypeAnimation } from 'react-type-animation';
import {
  FiCpu, FiActivity, FiShield, FiSliders, FiTool,
  FiExternalLink, FiVolume2, FiVolumeX, FiCopy, FiCheck,
  FiMapPin, FiSearch, FiPhone, FiMail, FiShare2,
  FiMaximize2, FiTerminal, FiCompass
} from 'react-icons/fi';
import {
  FaCog, FaWrench, FaGithub, FaLinkedin, FaYoutube,
  FaRedditAlien, FaTumblr, FaSlack, FaAndroid, FaRobot,
  FaMicrochip, FaBolt
} from 'react-icons/fa';

/* ═══════════════════════════════════════════════════════
   MECHANICAL WEB AUDIO API SYNTHESIZER
   ═══════════════════════════════════════════════════════ */
const playMechaSound = (type: 'hydraulic' | 'gearClick' | 'relayClick' | 'alarmBeep' | 'drillWhir') => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === 'hydraulic') {
      // White noise buffer burst for pneumatic hydraulic release
      const bufferSize = ctx.sampleRate * 0.25;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(150, now + 0.25);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start(now);
      whiteNoise.stop(now + 0.25);
    } else if (type === 'gearClick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.setValueAtTime(180, now + 0.03);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'relayClick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.setValueAtTime(2400, now + 0.02);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'alarmBeep') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1760, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'drillWhir') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.linearRampToValueAtTime(750, now + 0.2);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch {
    // Audio context may be restricted before user gesture
  }
};

/* ═══════════════════════════════════════════════════════
   MECHA MODULE SPECIFICATION MODEL
   ═══════════════════════════════════════════════════════ */
interface MechaModule {
  id: number;
  serial: string;
  name: string;
  category: string;
  chassis: string;
  actuatorSpec: string;
  hydraulicPSI: string;
  tolerance: string;
  description: string;
  explodedLayers: {
    layer3Armor: string;
    layer2Actuator: string;
    layer1Core: string;
  };
  metrics: string;
  architectureBlueprint: string;
  url: string;
  icon: string;
}

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeSection, setActiveSection] = useState<'control' | 'modules' | 'flowchart' | 'founder' | 'certs' | 'comms'>('control');
  const [selectedModule, setSelectedModule] = useState<MechaModule | null>(null);

  // Hydraulic Pressure Telemetry Simulation
  const [hydraulicPsi, setHydraulicPsi] = useState(3420);
  useEffect(() => {
    const interval = setInterval(() => {
      setHydraulicPsi(3400 + Math.floor(Math.sin(Date.now() / 1500) * 45));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerSound = (type: 'hydraulic' | 'gearClick' | 'relayClick' | 'alarmBeep' | 'drillWhir') => {
    if (soundEnabled) playMechaSound(type);
  };

  // 16 Mechanical Modules with Exploded-View Architecture Data
  const mechaModules: MechaModule[] = useMemo(() => [
    {
      id: 1,
      serial: "MOD-01-SOC",
      name: "Social Dashboard",
      category: "Telemetry Analytics Core",
      chassis: "Titanium-Grade Structural Rib",
      actuatorSpec: "MVI High-Speed Flow Reactor",
      hydraulicPSI: "3,850 PSI",
      tolerance: "±0.0015 mm",
      description: "Real-time social telemetry analyzer providing automated engagement reporting, multi-account live state streams, and live metrics visualizer.",
      explodedLayers: {
        layer3Armor: "Exoskeleton: Jetpack Compose High-FPS Canvas & Dynamic Graphing Mesh",
        layer2Actuator: "Internal Hydraulic Actuator: Coroutines Flow State Machine & WebSocket Dispatcher",
        layer1Core: "Base Engine Block: Room DB Local Persistence & Retrofit HTTP Conduit"
      },
      metrics: "50,000+ Operators · 99.95% Pipeline Uptime",
      architectureBlueprint: "Clean Architecture · MVI · Kotlin Flow · Coroutines · WebSocket Telemetry",
      url: "https://github.com/moekyawaung-tech/social-dashboard",
      icon: "📱"
    },
    {
      id: 2,
      serial: "MOD-02-PWA",
      name: "PWA App",
      category: "Offline Relay Rig",
      chassis: "Reinforced Composite Armor",
      actuatorSpec: "Service Worker Micro-Piston",
      hydraulicPSI: "3,400 PSI",
      tolerance: "±0.0020 mm",
      description: "Progressive Web Application with complete offline caching, background synchronization, and instant installability across mobile and workshop terminals.",
      explodedLayers: {
        layer3Armor: "Armor: Responsive Glassmorphic UI & Install Prompt Shell",
        layer2Actuator: "Actuator: Service Worker Stale-While-Revalidate Background Interceptor",
        layer1Core: "Core: IndexedDB Local Cache & Storage API Reservoir"
      },
      metrics: "120,000+ Deployments · 0ms Offline Latency",
      architectureBlueprint: "Service Workers · Cache API · IndexedDB Engine · Web Workers",
      url: "https://github.com/moekyawaung-tech/pwa-app",
      icon: "🌐"
    },
    {
      id: 3,
      serial: "MOD-03-ADM",
      name: "Admin Dashboard",
      category: "Central Command Bridge",
      chassis: "Hardened Tungsten Casing",
      actuatorSpec: "RBAC Security Gate Hydraulic",
      hydraulicPSI: "4,200 PSI",
      tolerance: "±0.0008 mm",
      description: "Mission-control administrative analytics interface with role-based ACL, audit streams, real-time alerts, and deep data drill-down.",
      explodedLayers: {
        layer3Armor: "Armor: Multi-Tab Tactical Screen Matrix with Security Indicators",
        layer2Actuator: "Actuator: Role-Based Authorization Token Verifier & Event Sinks",
        layer1Core: "Core: Multi-Tenant Data Store & Encrypted Audit Log Bus"
      },
      metrics: "35+ Industrial Plants · Zero Security Breaches",
      architectureBlueprint: "Multi-Module Enterprise Hexagonal · Hilt DI · Paging 3 · REST Gateways",
      url: "https://github.com/moekyawaung-tech/Advance-POS-Version",
      icon: "📊"
    },
    {
      id: 4,
      serial: "MOD-04-STK",
      name: "Stock Market Tracker",
      category: "Quantitative Ticker Engine",
      chassis: "Beryllium Copper Frame",
      actuatorSpec: "High-Frequency Stream Servo",
      hydraulicPSI: "3,650 PSI",
      tolerance: "±0.0010 mm",
      description: "High-frequency market intelligence tracker with candlestick visualizers, order book depth, price alert triggers, and currency conversions.",
      explodedLayers: {
        layer3Armor: "Armor: 120Hz Hardware-Accelerated Candlestick Graphing Surface",
        layer2Actuator: "Actuator: StateFlow Buffer with Conflated Channel Throttling",
        layer1Core: "Core: WebSocket Client Stream with Automatic Reconnect Damper"
      },
      metrics: "10K+ Watchlists · 200ms Ticker Latency",
      architectureBlueprint: "WebSockets · High-Performance StateFlow · Custom Canvas Rendering",
      url: "https://github.com/moekyawaung-tech/crypto",
      icon: "📈"
    },
    {
      id: 5,
      serial: "MOD-05-GAM",
      name: "Game Collection",
      category: "Arcade Physics Simulator",
      chassis: "Polymer Exoskeleton Plate",
      actuatorSpec: "60 FPS Fixed Time-Step Engine",
      hydraulicPSI: "3,200 PSI",
      tolerance: "±0.0030 mm",
      description: "Multi-game retro browser engine featuring Snake, Space Arcade, and Canvas physics animations with high scores and audio synthesized channels.",
      explodedLayers: {
        layer3Armor: "Armor: Canvas 2D Interactive Viewport with Pixel Shaders",
        layer2Actuator: "Actuator: Delta-Time Physics Accumulator & Collision Matrix",
        layer1Core: "Core: Web Audio API Oscillator Rig & Persistent High-Score Ledger"
      },
      metrics: "85K+ Play Runs · 60 FPS Locked",
      architectureBlueprint: "HTML5 Canvas Engine · Web Audio API · Fixed Time-Step Loop",
      url: "https://github.com/moekyawaung-tech/game-collection",
      icon: "🎮"
    },
    {
      id: 6,
      serial: "MOD-06-MUS",
      name: "Music Player",
      category: "Acoustic DSP Processor",
      chassis: "Anodized Aluminum Shroud",
      actuatorSpec: "Biquad Filter DSP Arm",
      hydraulicPSI: "3,100 PSI",
      tolerance: "±0.0015 mm",
      description: "Synthesizer-style music player with Web Audio API spectral analyzer, playlist state machine, and spatial audio DSP controls.",
      explodedLayers: {
        layer3Armor: "Armor: Real-Time Fast-Fourier Transform (FFT) Spectral Visualizer",
        layer2Actuator: "Actuator: AudioNode Equalizer Graph & MediaSession Hardware Key Binding",
        layer1Core: "Core: IndexedDB Chunked Audio Cache & File Decoder Buffer"
      },
      metrics: "40K+ Audio Streams · Sub-10ms Audio Latency",
      architectureBlueprint: "AudioContext DSP · MediaSession API · IndexedDB Cache · ExoPlayer",
      url: "https://github.com/moekyawaung-tech/video-player",
      icon: "🎵"
    },
    {
      id: 7,
      serial: "MOD-07-CHT",
      name: "Chat App",
      category: "Encrypted Comms Transceiver",
      chassis: "Faraday-Shielded Enclosure",
      actuatorSpec: "Double-Ratchet Crypto Actuator",
      hydraulicPSI: "3,900 PSI",
      tolerance: "±0.0005 mm",
      description: "Real-time socket messaging client with presence indicators, typing indicators, payload encryption, and offline queued messages.",
      explodedLayers: {
        layer3Armor: "Armor: Jetpack Compose Chat Stream with Reaction Overlays",
        layer2Actuator: "Actuator: Signal Protocol Double-Ratchet Key Exchange Pump",
        layer1Core: "Core: Room DB Local Cipher Matrix & Socket.IO Bi-directional Line"
      },
      metrics: "1,000,000+ Relayed Packets · Zero Packet Leaks",
      architectureBlueprint: "Socket.IO · Room Local DB · AES-256 GCM Payload Wards",
      url: "https://github.com/moekyawaung-tech/pwa-app",
      icon: "💬"
    },
    {
      id: 8,
      serial: "MOD-08-WCP",
      name: "World Cup Portal",
      category: "Tournament Bracket Core",
      chassis: "Reinforced Alloy Strut",
      actuatorSpec: "Server-Sent Event Ingest Valve",
      hydraulicPSI: "3,450 PSI",
      tolerance: "±0.0020 mm",
      description: "Global tournament fixture orchestrator with live bracket computation, match telemetry, stadium locator, and notification alarms.",
      explodedLayers: {
        layer3Armor: "Armor: Dynamic Tournament Bracket Visualizer with Live Match Tickers",
        layer2Actuator: "Actuator: Server-Sent Events (SSE) Stream Demultiplexer",
        layer1Core: "Core: Geolocation Engine & Match Fixture State Database"
      },
      metrics: "60K+ Match Observers · Real-time Scores",
      architectureBlueprint: "Server-Sent Events (SSE) · Geolocation Sensors · Dynamic Theming",
      url: "https://github.com/moekyawaung-tech/thailand-travel",
      icon: "⚽"
    },
    {
      id: 9,
      serial: "MOD-09-ECM",
      name: "E-Commerce Suite",
      category: "Industrial Inventory & Checkout",
      chassis: "Heavy Steel Casing",
      actuatorSpec: "Idempotent Transaction Piston",
      hydraulicPSI: "4,100 PSI",
      tolerance: "±0.0010 mm",
      description: "Full retail checkout workflow with instant inventory deduct, cart synchronization, receipt printing, and multiple payment gateway stubs.",
      explodedLayers: {
        layer3Armor: "Armor: Interactive Catalog Grid & Biometric Purchase Touch Surface",
        layer2Actuator: "Actuator: Event-Sourced Shopping Cart State Reducer & Mutator",
        layer1Core: "Core: Stripe/PayPal Integration Bridge & SQL Inventory Ledger"
      },
      metrics: "$2.4M GMV Processed · 99.9% Transaction Accuracy",
      architectureBlueprint: "Redux State Machine · Stripe SDK · Offline Persistence · Room Store",
      url: "https://github.com/moekyawaung-tech/POS-Full-Version",
      icon: "🛒"
    },
    {
      id: 10,
      serial: "MOD-10-PTF",
      name: "Portfolio Hub",
      category: "Central Command Console",
      chassis: "Cast Iron Baseplate",
      actuatorSpec: "Hardware-Accelerated UI Rig",
      hydraulicPSI: "3,500 PSI",
      tolerance: "±0.0010 mm",
      description: "Curated senior mobile engineering showcase featuring architectural diagrams, multi-repo links, and verified credentials.",
      explodedLayers: {
        layer3Armor: "Armor: Industrial Mecha Cockpit with Hydraulic Sound FX & Meters",
        layer2Actuator: "Actuator: AI Technical Flowchart Generation Engine (TITAN-AI)",
        layer1Core: "Core: Multi-Repo Index & 82+ Programming Hub Verified Records"
      },
      metrics: "100K+ Blueprint Inspections · Lighthouse 100",
      architectureBlueprint: "React 19 · TypeScript · Vite · Tailwind · Web Audio API Synthesizer",
      url: "https://github.com/Dev-moe-kyawaung/",
      icon: "💼"
    },
    {
      id: 11,
      serial: "MOD-11-MTR",
      name: "Money Tracker",
      category: "Biometric Ledger Vault",
      chassis: "Titanium-Steel Safe Housing",
      actuatorSpec: "SQLCipher Encrypted Lock Valve",
      hydraulicPSI: "3,700 PSI",
      tolerance: "±0.0005 mm",
      description: "Dual-currency income/expense ledger with budget threshold warnings, visual categorization, and secure CSV/PDF export.",
      explodedLayers: {
        layer3Armor: "Armor: Biometric Challenge Shield & Currency Breakdown Gauges",
        layer2Actuator: "Actuator: Multi-Currency Exchange Rate Computation Reactor",
        layer1Core: "Core: SQLCipher AES-256 Encrypted Database at Rest"
      },
      metrics: "25K+ Active Ledgers · 100% Zero Data Leakage",
      architectureBlueprint: "Room Database · Android BiometricPrompt · SQLCipher · Currency API",
      url: "https://github.com/moekyawaung-tech/Daily-planner-app",
      icon: "💰"
    },
    {
      id: 12,
      serial: "MOD-12-WTH",
      name: "Weather Radar",
      category: "Atmospheric Doppler Array",
      chassis: "Weather-Sealed Marine Hull",
      actuatorSpec: "Doppler Sensor Sampling Valve",
      hydraulicPSI: "3,300 PSI",
      tolerance: "±0.0025 mm",
      description: "Real-time atmospheric condition forecaster using OpenWeather telemetry, animated rain canvas, and severe weather warnings.",
      explodedLayers: {
        layer3Armor: "Armor: Canvas Particle Rain & Wind Vector Radar Screen",
        layer2Actuator: "Actuator: GPS Telemetry Coordinate Parser & Weather Data Formatter",
        layer1Core: "Core: OpenWeather REST API Ingest Conduit with Native C++ Obfuscation"
      },
      metrics: "75K+ Atmospheric Polls · Real-time Warnings",
      architectureBlueprint: "REST API · Canvas Atmospheric Shaders · FusedLocationProvider",
      url: "https://github.com/moekyawaung-tech/Weather-app",
      icon: "🌤️"
    },
    {
      id: 13,
      serial: "MOD-13-CRP",
      name: "Crypto Vault",
      category: "Hardware Key Custody Block",
      chassis: "Tamper-Evident Ceramic Matrix",
      actuatorSpec: "TEE Elliptic Curve Signer",
      hydraulicPSI: "4,050 PSI",
      tolerance: "±0.0002 mm",
      description: "Decentralized wallet visualizer tracking gas price fluctuations, multi-chain balances, and smart contract audit status.",
      explodedLayers: {
        layer3Armor: "Armor: Non-Custodial Multi-Chain Token Balance Monitor",
        layer2Actuator: "Actuator: Multi-RPC Provider Failover Router (Alchemy + Infura)",
        layer1Core: "Core: Android Keystore Hardware TEE Key Storage Engine"
      },
      metrics: "15K+ Monitored Vaults · Zero Key Compromises",
      architectureBlueprint: "Ethers.js · FallbackProvider · Android Keystore Hardware TEE",
      url: "https://github.com/moekyawaung-tech/crypto",
      icon: "💸"
    },
    {
      id: 14,
      serial: "MOD-14-TDO",
      name: "JS Todo Master",
      category: "Keyboard Dispatch Rig",
      chassis: "Cast Zinc Sub-assembly",
      actuatorSpec: "Sub-5ms Event Loop Valve",
      hydraulicPSI: "3,000 PSI",
      tolerance: "±0.0015 mm",
      description: "Keyboard-driven task organizer with IndexedDB persistence, tag categorization, completion audio, and drag-and-drop hierarchy.",
      explodedLayers: {
        layer3Armor: "Armor: Zero-Latency Keyboard Shortcut Input Grid",
        layer2Actuator: "Actuator: Drag & Drop Event Coordinator with Audio Triggers",
        layer1Core: "Core: IndexedDB Raw Transaction Engine with Zero Dependencies"
      },
      metrics: "30K+ Tasks Tracked · Sub-5ms Input Latency",
      architectureBlueprint: "Vanilla JavaScript Core · IndexedDB API · Web Audio API · HTML5 DND",
      url: "https://github.com/moekyawaung-tech/javascript-todo",
      icon: "📝"
    },
    {
      id: 15,
      serial: "MOD-15-VID",
      name: "Video Player Pro",
      category: "Hardware Media Decoder",
      chassis: "Heat-Sink Aluminum Fin Matrix",
      actuatorSpec: "ExoPlayer Media Pipe Actuator",
      hydraulicPSI: "3,750 PSI",
      tolerance: "±0.0010 mm",
      description: "Hardware-accelerated gesture player with picture-in-picture support, audio track selection, subtitle parser, and volume scrub.",
      explodedLayers: {
        layer3Armor: "Armor: Smooth Multi-Touch Gesture Detection Surface (Brightness/Volume/Seek)",
        layer2Actuator: "Actuator: ExoPlayer Media3 State Reconciler & Track Selector",
        layer1Core: "Core: Hardware Codec MediaCodec Pipeline & Subtitle Parser"
      },
      metrics: "200K+ Video Sessions · 0 Dropped Frames",
      architectureBlueprint: "ExoPlayer / Media3 · Hardware Acceleration · Widevine DRM L1 Support",
      url: "https://github.com/moekyawaung-tech/video-player",
      icon: "🎯"
    },
    {
      id: 16,
      serial: "MOD-16-LGD",
      name: "LEGEND! PulseSync Engine",
      category: "Master Mecha Titan Core",
      chassis: "Heavy Titanium-Carbide Monocoque",
      actuatorSpec: "80+ Multi-Module Hydraulic Bus",
      hydraulicPSI: "5,000 PSI",
      tolerance: "±0.0001 mm",
      description: "Flagship architecture suite combining Android Jetpack Compose, multi-module setup, and Firebase cloud cluster.",
      explodedLayers: {
        layer3Armor: "Armor: 100% Jetpack Compose Unidirectional Data Flow Surface with Material 3",
        layer2Actuator: "Actuator: 80+ Gradle Multi-Module Isolation Network with Hilt DI Injection",
        layer1Core: "Core: Offline-First Room DB + Firebase Cloud Sync Cluster + GitHub Actions CI/CD"
      },
      metrics: "1,000,000+ Operators · 50,000+ MAU · 4.8★ Store Rating",
      architectureBlueprint: "Multi-Module (80+ Modules) · Hilt DI · Jetpack Compose · Firebase · GitHub Actions",
      url: "https://github.com/Dev-moe-kyawaung/pulsesync-android",
      icon: "🔥"
    }
  ], []);

  // 82+ Programming Hub Certificates
  const certificateData = [
    { name: 'C Programming Core', cat: 'Programming Languages', id: '1720080366600', date: 'Jul 4, 2024' },
    { name: 'C++ Systems Architecture', cat: 'Programming Languages', id: '1720080489120', date: 'Jul 5, 2024' },
    { name: 'Java Advanced Enterprise', cat: 'Programming Languages', id: '1720080512300', date: 'Jul 6, 2024' },
    { name: 'Python Systems Scripting', cat: 'Programming Languages', id: '1720080598100', date: 'Jul 7, 2024' },
    { name: 'Kotlin Development Systems', cat: 'Mobile & App Dev', id: '1720080612400', date: 'Jul 8, 2024' },
    { name: 'Android Architecture Components', cat: 'Mobile & App Dev', id: '1720080645100', date: 'Jul 9, 2024' },
    { name: 'Jetpack Compose UI Framework', cat: 'Mobile & App Dev', id: '1720080698200', date: 'Jul 10, 2024' },
    { name: 'Flutter & Dart Mecha Rig', cat: 'Mobile & App Dev', id: '1720080723100', date: 'Jul 11, 2024' },
    { name: 'React Native Cross-Platform', cat: 'Mobile & App Dev', id: '1720080789400', date: 'Jul 12, 2024' },
    { name: 'React.js Web Engineering', cat: 'Web Development', id: '1720080812300', date: 'Jul 13, 2024' },
    { name: 'Vue.js Framework Systems', cat: 'Web Development', id: '1720080845600', date: 'Jul 14, 2024' },
    { name: 'Angular Web Enterprise', cat: 'Web Development', id: '1720080891200', date: 'Jul 15, 2024' },
    { name: 'Node.js Express REST APIs', cat: 'Web Development', id: '1720080923400', date: 'Jul 16, 2024' },
    { name: 'HTML5 & CSS3 Master', cat: 'Web Development', id: '1720080967800', date: 'Jul 17, 2024' },
    { name: 'Tailwind CSS Industrial Styling', cat: 'Web Development', id: '1720080998100', date: 'Jul 18, 2024' },
    { name: 'TypeScript Systems Engineering', cat: 'Web Development', id: '1720081034500', date: 'Jul 19, 2024' },
    { name: 'Firebase Backend Suite', cat: 'Databases', id: '1720081078900', date: 'Jul 20, 2024' },
    { name: 'PostgreSQL Relational DB', cat: 'Databases', id: '1720081112300', date: 'Jul 21, 2024' },
    { name: 'MongoDB NoSQL Architecture', cat: 'Databases', id: '1720081145600', date: 'Jul 22, 2024' },
    { name: 'Redis In-Memory Cache', cat: 'Databases', id: '1720081198200', date: 'Jul 23, 2024' },
    { name: 'SQL Query Optimization', cat: 'Databases', id: '1720081234500', date: 'Jul 24, 2024' },
    { name: 'Room Local DB for Android', cat: 'Databases', id: '1720081278900', date: 'Jul 25, 2024' },
    { name: 'Machine Learning Fundamentals', cat: 'AI & Data Science', id: '1720081312300', date: 'Jul 26, 2024' },
    { name: 'TensorFlow Lite On-Device ML', cat: 'AI & Data Science', id: '1720081345600', date: 'Jul 27, 2024' },
    { name: 'Deep Learning & Neural Networks', cat: 'AI & Data Science', id: '1720081398200', date: 'Jul 28, 2024' },
    { name: 'Natural Language Processing NLP', cat: 'AI & Data Science', id: '1720081434500', date: 'Jul 29, 2024' },
    { name: 'Computer Vision Basics', cat: 'AI & Data Science', id: '1720081478900', date: 'Jul 30, 2024' },
    { name: 'Claude API LLM Integration', cat: 'AI & Data Science', id: '1720081512300', date: 'Jul 31, 2024' },
    { name: 'Ethical Hacking & Penetration Testing', cat: 'Security & DevOps', id: '1720081545600', date: 'Aug 1, 2024' },
    { name: 'Cybersecurity Kali Linux Protocols', cat: 'Security & DevOps', id: '1720081598200', date: 'Aug 2, 2024' },
    { name: 'GitHub Actions CI/CD Pipeline', cat: 'Security & DevOps', id: '1720081634500', date: 'Aug 3, 2024' },
    { name: 'Docker Containerization Rig', cat: 'Security & DevOps', id: '1720081678900', date: 'Aug 4, 2024' },
    { name: 'Azure DevOps Enterprise Pipeline', cat: 'Security & DevOps', id: '1720081712300', date: 'Aug 5, 2024' },
    { name: 'Network Protocol Hardening', cat: 'Security & DevOps', id: '1720081745600', date: 'Aug 6, 2024' },
    { name: 'Blockchain Architecture', cat: 'Blockchain', id: '1720081798200', date: 'Aug 7, 2024' },
    { name: 'Smart Contract Development', cat: 'Blockchain', id: '1720081834500', date: 'Aug 8, 2024' },
    { name: 'Clean Architecture Pattern Design', cat: 'Software Engineering', id: '1720081878900', date: 'Aug 9, 2024' },
    { name: 'SOLID Principles in OOP', cat: 'Software Engineering', id: '1720081912300', date: 'Aug 10, 2024' },
    { name: 'Design Patterns Gang of Four', cat: 'Software Engineering', id: '1720081945600', date: 'Aug 11, 2024' },
    { name: 'Data Structures & Algorithms', cat: 'Software Engineering', id: '1720081998200', date: 'Aug 12, 2024' },
    { name: 'Startup MVP Engineering Lab', cat: 'Marketing & Business', id: '1720082034500', date: 'Aug 13, 2024' },
    { name: 'Agile Scrum Mastermind', cat: 'Marketing & Business', id: '1720082078900', date: 'Aug 14, 2024' }
  ];

  const [certSearch, setCertSearch] = useState('');
  const [certCategory, setCertCategory] = useState('All Sectors');
  const certCategories = ['All Sectors', 'Mobile & App Dev', 'Programming Languages', 'Web Development', 'Databases', 'AI & Data Science', 'Security & DevOps', 'Software Engineering'];

  const filteredCerts = useMemo(() => {
    return certificateData.filter(c => {
      const matchCat = certCategory === 'All Sectors' || c.cat === certCategory;
      const matchSearch = c.name.toLowerCase().includes(certSearch.toLowerCase()) ||
                          c.id.includes(certSearch) ||
                          c.cat.toLowerCase().includes(certSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [certCategory, certSearch]);

  // 43 GitHub Network Port Hubs
  const githubPorts = [
    'Dev-moe-kyawaung', 'moekyawaung-tech', 'moekyawaung-china', 'moekyawaung-developer',
    'moekyawaungvivov30pro-design', 'moekyaw-aung-mm', 'moekyawaung-mk', 'moekyawaung-microsoft',
    'moekyawaung-cyber', 'moekyawaung-bangkok', 'moekyawaung-micro', 'moekyawaungmka2032-boop',
    'moekyawaung-dev-mm', 'moekyaw-developer', 'moekyawaung.github.io', 'Moekyawaung-mm',
    'moekyawaung-hack', 'moekyawaung-graduate', 'Moekyawaung-Linux', 'Moekyawaung-coder',
    'moekyawaung-designer', 'Moekyawaung2026', 'moekyawaungmka2034-coder', 'Moekyawaung-mk',
    'moekyawaung-web', 'MoeKyawAung-code', 'moekyawaung-creator', 'moekyawaung-webdeveloper',
    'Moekyawaung-co', 'moekyawaung-edu', 'moekyawaung-senior', 'Moekyawaung-Development',
    'moekyawaung-google', 'Moe-KyawAung', 'moekyawaung-micro', 'moekyawaung-cyber',
    'moekyawaung-bangkok', 'moekyawaung-china', 'Moekyawaung-dev', 'Moekyawaung-coder',
    'moekyawaungmka', 'moekyaw-url', 'happy-cv-creator'
  ];

  // 38 Lovable Web Deployments
  const lovableDeployments = [
    { name: 'Happy CV Creator', url: 'https://happy-cv-creator.lovable.app' },
    { name: 'MKA Bio Hub', url: 'https://moekyawaungmybio.lovable.app/' },
    { name: 'The CV Palette', url: 'https://the-cv-palette.lovable.app' },
    { name: 'URL Shortener', url: 'https://moekyaw-url.lovable.app' },
    { name: 'Dev Profile 2026', url: 'https://moekyawaung-dev.lovable.app' },
    { name: 'Main Mecha Hub', url: 'https://moe-kyaw-aung.lovable.app' },
    { name: 'CV Beacon System', url: 'https://cv-beacon.lovable.app/' },
    { name: 'Persuasion Hub', url: 'https://profile-persuasion-hub.lovable.app' },
    { name: 'App Skill Gallery', url: 'https://app-skill-gallery.lovable.app' },
    { name: 'Joy Codify Life', url: 'https://joy-codify-life.lovable.app/' },
    { name: 'Spark Coach AI', url: 'https://spark-coach-create.lovable.app' },
    { name: 'Color Code Chronicles', url: 'https://color-code-chronicles.lovable.app' },
    { name: 'Friendly Haven IO', url: 'https://friendly-haven-io.lovable.app' },
    { name: 'Pixel Perfect Snap', url: 'https://pixel-perfect-snap-39.lovable.app' },
    { name: 'Dev MoeKyaw Rig', url: 'https://devmoekyaw.lovable.app' },
    { name: 'Myanmar Sector Hub', url: 'https://moekyawaung-myanmar.lovable.app' }
  ];

  // 20+ Subspace Emails
  const subspaceEmails = [
    'moekyawaung@programmer.net',
    'moekyawaung@technologist.com',
    'moekyawaung@engineer.com',
    'moekyawaung@techie.com',
    'moekyawaung@collector.org',
    'moekyawaung@graphic-designer.com',
    'moekyawaung@cybergal.com',
    'moekyawaung@webname.com',
    'moekyawaung@hackermail.com',
    'moekyawaung@graduate.org',
    'moekyawaung@asia.com',
    'moekyawaung@contractor.net',
    'moekyawaung@linuxmail.org',
    'moekyawaung@usa.com',
    'moekyawaung@europe.com',
    'moekyawaung@mail.com',
    'moekyawaung@iname.com',
    'moekyawaung@socialogist.com',
    'moekyawaung@secretary.net',
    'moekyawaung@publicist.com'
  ];

  // 16 Verified Gravatar Social Channels
  const socialRelays = [
    { name: 'GitHub Array', icon: <FaGithub />, url: 'https://github.com/Dev-moe-kyawaung/', tag: '@Dev-moe-kyawaung' },
    { name: 'LinkedIn Bridge', icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/moe-kyaw-aung-2653093a1', tag: 'Moe Kyaw Aung' },
    { name: 'YouTube Rig Reel', icon: <FaYoutube />, url: 'https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG', tag: 'Engineering Reel' },
    { name: 'Bluesky Telemetry', icon: <FiActivity />, url: 'https://bsky.app/profile/moekyawaung96.bsky.social', tag: '@moekyawaung96' },
    { name: 'Tumblr Schematics', icon: <FaTumblr />, url: 'https://www.tumblr.com/moekyawaung', tag: 'MKA Tech Log' },
    { name: 'Flickr Workshop', icon: <FiTool />, url: 'https://www.flickr.com/people/204037451@N06', tag: 'Visual Archive' },
    { name: 'Vimeo Video Streams', icon: <FiActivity />, url: 'https://vimeo.com/user252414232', tag: 'Robotic Demos' },
    { name: 'Gravatar Verified', icon: <FaMicrochip />, url: 'https://gravatar.com/moekyawaung13721', tag: 'Biometric Hash' },
    { name: 'Slack Mecha Deck', icon: <FaSlack />, url: 'https://moekyawaung.slack.com/', tag: 'Dev Workspace' },
    { name: 'Reddit Threads', icon: <FaRedditAlien />, url: 'https://bsky.app/profile/moekyawaung96.bsky.social', tag: 'Architecture Sub' },
    { name: 'Strikingly Web Portal', icon: <FiCompass />, url: 'http://moekyawaung2026.strikingly.com', tag: 'Web Terminal' }
  ];

  // ═══════════════════════════════════════════════════════
  // AI-POWERED ENGINEERING FLOWCHART GENERATOR
  // ═══════════════════════════════════════════════════════
  const [selectedFlowchart, setSelectedFlowchart] = useState<'cleanArch' | 'realtimeSync' | 'cicdPipeline' | 'offlineFirst'>('cleanArch');
  const [customPrompt, setCustomPrompt] = useState('');
  const [flowchartOutput, setFlowchartOutput] = useState<string>('');

  const flowchartPresets = {
    cleanArch: `+-----------------------------------------------------------------------------------+
|                        TITAN-CORE ARCHITECTURAL FLOWCHART                         |
|                         [CLEAN ARCHITECTURE MULTI-MODULE]                         |
+-----------------------------------------------------------------------------------+

     [ USER TOUCH EVENT / HARDWARE SENSOR ]
                      |
                      v
      +--------------------------------+
      |  UI LAYER (JETPACK COMPOSE)   |  <-- StateFlow Collectors (120 FPS Locked)
      |    - Screens & Composables     |
      |    - Unidirectional State Flow |
      +--------------------------------+
                      |
           (MVI Intent / Actions)
                      v
      +--------------------------------+
      |   VIEWMODEL STATE ENGINE       |  <-- SavedStateHandle Recovery
      |    - UiState Reducer           |
      |    - Coroutine viewModelScope  |
      +--------------------------------+
                      |
         (Execute Business UseCases)
                      v
      +--------------------------------+
      |       DOMAIN LAYER CORE        |  <-- PURE KOTLIN (ZERO ANDROID DEPS)
      |   [ GetTelemetryUseCase.kt ]   |      - Independent Unit Tests
      |   [ DispatchSyncUseCase.kt ]   |      - Instant JVM Compilation
      +--------------------------------+
                      |
     (Repository Interface Contracts)
                      v
      +-------------------------------------------------------------+
      |                      DATA RECONCILER                        |
      |                                                             |
      |  +-------------------------+      +----------------------+  |
      |  |   LOCAL ROOM DATABASE   | <--> |   REMOTE API GATEWAY |  |
      |  |  (Single Source of Truth)     |  (Retrofit + OkHttp) |  |
      |  |  - Encrypted SQLCipher  |      |  - Certificate Pin   |  |
      |  +-------------------------+      +----------------------+  |
      +-------------------------------------------------------------+
                      |
                      v
     [ PERSISTENT HYDRAULIC DISK STORAGE / CLOUD CLUSTER ]`,

    realtimeSync: `+-----------------------------------------------------------------------------------+
|                   PULSESYNC REAL-TIME REPLICATION PIPELINE                        |
|                     [OFFLINE-FIRST SYNCHRONIZATION DAG]                           |
+-----------------------------------------------------------------------------------+

   [ LOCAL DATA MUTATION ] 
              |
              v
   +----------------------+
   |  ROOM DB WRITE LOCK  | ---> [ IMMEDIATE OPTIMISTIC UI EMIT ]
   +----------------------+
              |
              v
   +----------------------+
   |  WORKMANAGER QUEUE   | <--- Constraints: NetworkType.CONNECTED, BatteryNotLow
   +----------------------+
              |
         (Trigger Sync)
              v
   +----------------------+        (Network Unavailable?)
   |  CONNECTIVITY CHECK  | --------------------------------------> [ KEEP LOCAL QUEUE ]
   +----------------------+                                                |
              |                                                            |
         (Connected)                                                       |
              v                                                            |
   +------------------------------------+                                  |
   |   FIREBASE REALTIME / FIRESTORE    |                                  |
   |     - Bi-directional Conflict Res  |                                  |
   |     - Server Timestamp Reconcile   |                                  |
   +------------------------------------+                                  |
              |                                                            |
              +<-----------------------------------------------------------+
              v
   [ SYSTEM CONVERGENCE: ALL STARSHIPS IN SYNC ]`,

    cicdPipeline: `+-----------------------------------------------------------------------------------+
|                     AUTOMATED INDUSTRIAL CI/CD CONDUIT                            |
|                  [GITHUB ACTIONS + FASTLANE ZERO-TOUCH]                           |
+-----------------------------------------------------------------------------------+

   [ GIT PUSH / PR TO MAIN ]
              |
              v
   +--------------------------------------+
   | 01. STATIC CODE LINTER               |
   |     - detekt rule enforcement        |
   |     - ktlint style verification      |
   +--------------------------------------+
              |
             (Pass)
              v
   +--------------------------------------+
   | 02. PARALLEL UNIT TEST MATRIX        |
   |     - MockK & Turbine Flow tests     |
   |     - Jacoco 90%+ coverage gate      |
   +--------------------------------------+
              |
             (Pass)
              v
   +--------------------------------------+
   | 03. HEADLESS EMULATOR REGRESSION     |
   |     - Compose screenshot comparisons |
   |     - Instrumentation smoke tests    |
   +--------------------------------------+
              |
             (Pass)
              v
   +--------------------------------------+
   | 04. FASTLANE RELEASE PIPELINE        |
   |     - Play Store Key AAB signing     |
   |     - ProGuard / R8 Dex Optimization |
   |     - Automated Google Play Track    |
   +--------------------------------------+
              |
              v
   [ ARMORED PRODUCTION RELEASE SERVING MILLIONS ]`,

    offlineFirst: `+-----------------------------------------------------------------------------------+
|                       OFFLINE-FIRST HYDRAULIC RESERVOIR                           |
|                    [SURVIVES CELLULAR POWER BLACKOUTS]                            |
+-----------------------------------------------------------------------------------+

           [ INCOMING USER REQUEST ]
                       |
                       v
         +---------------------------+
         |    LOCAL CACHE HIT?       |
         +---------------------------+
             /                   \\
          (YES)                  (NO)
           /                       \\
          v                         v
   +---------------+        +----------------------+
   | EMIT ROOM ENT |        | FETCH NETWORK REMOTE |
   +---------------+        +----------------------+
          |                            |
          |                      (Network Down?)
          |                        /        \\
          |                     (YES)       (NO)
          |                      /            \\
          |                     v              v
          |              +-------------+  +--------------+
          |              | STALE CACHE |  | ATOMIC WRITE |
          |              | FALLBACK    |  | TO ROOM DB   |
          |              +-------------+  +--------------+
          |                     |                 |
          +---------------------+-----------------+
                                |
                                v
               [ ZERO-DOWNTIME USER EXPERIENCE ]`
  };

  useEffect(() => {
    setFlowchartOutput(flowchartPresets[selectedFlowchart]);
  }, [selectedFlowchart]);

  const handleCustomAiGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    triggerSound('drillWhir');
    const prompt = customPrompt;
    setCustomPrompt('');

    setFlowchartOutput(`+-----------------------------------------------------------------------------------+
|               TITAN-AI DYNAMIC GENERATION: "${prompt.toUpperCase().slice(0, 35)}"
+-----------------------------------------------------------------------------------+

     [ INGESTION BUS: ${prompt.toUpperCase().slice(0, 25)} ]
                   |
                   v
      +-----------------------------+
      |  KOTLIN PARSER ENGINE       |
      |   - High-throughput buffer  |
      |   - Reactive Flow emitter   |
      +-----------------------------+
                   |
                   v
      +-----------------------------+
      |  CLEAN ARCHITECTURE CORE    |  <-- Verified by Moe Kyaw Aung
      |   - Multi-module isolation  |
      |   - Sub-millisecond latency |
      +-----------------------------+
                   |
                   v
      +-----------------------------+
      |  DISTRIBUTED DEPLOYMENT     |
      |   - Offline-first cache     |
      |   - Encrypted data sink     |
      +-----------------------------+
                   |
                   v
     [ STATUS: 100% OPERATIONAL // SERVING MILLIONS OF USERS ]`);
  };

  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const copySubspaceChannel = (text: string) => {
    navigator.clipboard.writeText(text);
    triggerSound('relayClick');
    setCopiedNotification(text);
    setTimeout(() => setCopiedNotification(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 relative overflow-x-hidden font-mono selection:bg-[#ff6b00] selection:text-black blueprint-grid">
      {/* ═══════════════════════════════════════════════════════
          CONTROL ROOM TOP HUD TELEMETRY BAR
          ═══════════════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0e121b]/95 backdrop-blur-xl border-b-2 border-[#ff6b00]/60 px-4 py-2 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          {/* Logo & Mechanical Gear */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#161b26] border border-[#ff6b00] flex items-center justify-center text-[#ff6b00] shadow-[0_0_15px_rgba(255,107,0,0.4)]">
              <FaCog className="text-xl animate-gear-cw" />
            </div>
            <div>
              <div className="font-orbitron font-extrabold text-xs tracking-wider text-white flex items-center gap-2">
                <span>TITAN-CORE OS // MOE KYAW AUNG</span>
                <span className="px-1.5 py-0.2 bg-[#ff6b00]/20 text-[#ffaa00] border border-[#ff6b00]/50 text-[9px]">
                  REV 2026.4
                </span>
              </div>
              <p className="text-[10px] text-gray-400">
                CHIEF INDUSTRIAL MECHA ARCHITECT · ROBOTICS CONTROL ROOM
              </p>
            </div>
          </div>

          {/* Navigation Switches */}
          <nav className="hidden lg:flex items-center gap-1 font-orbitron text-xs font-bold">
            {[
              { id: 'control' as const, label: '[01 // CONTROL ROOM]' },
              { id: 'modules' as const, label: '[02 // 16 MECHA MODULES]' },
              { id: 'flowchart' as const, label: '[03 // AI FLOWCHART GEN]' },
              { id: 'founder' as const, label: '[04 // ROBOTICS LAB]' },
              { id: 'certs' as const, label: '[05 // 82+ ACCREDITATIONS]' },
              { id: 'comms' as const, label: '[06 // COMMS BUS]' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  triggerSound('relayClick');
                  setActiveSection(tab.id);
                  const el = document.getElementById(tab.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                  activeSection === tab.id
                    ? 'text-black bg-[#ff6b00] font-extrabold shadow-[0_0_15px_rgba(255,107,0,0.6)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Mechanical Audio & Hydraulic Live Gauge */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-[#121620] border border-gray-700 rounded text-[10px] font-mono-code text-cyan-300">
              <FaWrench className="text-[#ff6b00]" />
              <span>HYDRAULICS: {hydraulicPsi} PSI</span>
            </div>

            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playMechaSound('hydraulic');
              }}
              className={`p-1.5 rounded border transition-all ${
                soundEnabled
                  ? 'border-[#ff6b00] text-[#ff6b00] bg-[#ff6b00]/10 shadow-[0_0_10px_rgba(255,107,0,0.4)]'
                  : 'border-gray-700 text-gray-500'
              }`}
              title="Toggle Mechanical Pneumatic Sound Effects"
            >
              {soundEnabled ? <FiVolume2 /> : <FiVolumeX />}
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: CONTROL ROOM HERO // TITAN COCKPIT
          ═══════════════════════════════════════════════════════ */}
      <section id="control" className="relative pt-32 pb-20 px-4 min-h-screen flex flex-col justify-center items-center z-10">
        <div className="max-w-6xl mx-auto w-full text-center">
          {/* Top Industrial Hazard Stripe Accent */}
          <div className="h-2 w-full max-w-xl mx-auto hazard-stripes rounded mb-6 opacity-75" />

          {/* Machine Calibration Tag */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-1.5 rounded bg-[#121620] border border-[#ff6b00]/50 shadow-[0_0_20px_rgba(255,107,0,0.25)] mb-6 text-xs font-mono-code">
            <span className="text-[#ffaa00] flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#ff6b00] animate-ping" />
              TITAN RIG // UNIT MK-01 ONLINE
            </span>
            <span className="text-gray-600">|</span>
            <span className="text-cyan-300">TOLERANCE: ±0.001mm</span>
            <span className="text-gray-600">|</span>
            <span className="text-emerald-400">TORQUE: 840 Nm NOMINAL</span>
          </div>

          {/* Chief Engineer Reticle Frame */}
          <div className="relative inline-block mb-6">
            <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-xl p-1 bg-[#121620] border-2 border-[#ff6b00] relative overflow-hidden shadow-[0_0_35px_rgba(255,107,0,0.45)]">
              <img
                src="https://res.cloudinary.com/dye5qpwii/image/upload/v1778763535/MKA_25_lbx6fb.webp"
                alt="Chief Mecha Engineer Moe Kyaw Aung"
                className="w-full h-full object-cover rounded-lg filter contrast-125 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-mono-code text-[#ffaa00] font-bold">
                CHIEF MECHA PILOT // MKA
              </div>
            </div>

            {/* Corner Industrial Rivets */}
            <div className="panel-rivet top-2 left-2" />
            <div className="panel-rivet top-2 right-2" />
            <div className="panel-rivet bottom-2 left-2" />
            <div className="panel-rivet bottom-2 right-2" />

            {/* Gear Accents */}
            <FaCog className="absolute -top-4 -right-4 text-3xl text-[#ff6b00]/60 animate-gear-cw pointer-events-none" />
            <FaCog className="absolute -bottom-4 -left-4 text-2xl text-cyan-400/50 animate-gear-ccw pointer-events-none" />
          </div>

          {/* Pilot Identification & Proclamation */}
          <p className="text-[#ff6b00] font-orbitron font-bold tracking-widest text-sm mb-1">
            မိုးကျော်အောင် // MOE KYAW AUNG
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-orbitron font-black text-white mb-3 tracking-tight">
            <span>INDUSTRIAL MECHA</span>
            <br />
            <span className="text-[#ff6b00] drop-shadow-[0_0_20px_rgba(255,107,0,0.6)]">
              MOBILE ARCHITECT
            </span>
          </h1>

          {/* Hard-Tech Terminal Quote */}
          <div className="h-10 text-base sm:text-xl font-chakra font-bold text-cyan-300 mb-6 tracking-wide flex items-center justify-center gap-2">
            <span className="text-[#ff6b00] font-mono-code">&gt;&gt;</span>
            <TypeAnimation
              sequence={[
                '"THIS ENGINEER BUILDS APPS USED BY MILLIONS."',
                2500,
                'KOTLIN 2.0 & JETPACK COMPOSE MECHANICAL ACTUATORS.',
                2500,
                'CLEAN ARCHITECTURE · 80+ MULTI-MODULE CONTAINMENT.',
                2500,
                'TECHNICAL CO-FOUNDER · 1M+ PLANETARY APP UNITS SERVED.',
                2500,
              ]}
              wrapper="span"
              speed={55}
              repeat={Infinity}
            />
          </div>

          {/* Location & Languages Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono-code mb-8">
            <span className="px-3.5 py-1.5 rounded bg-[#121620] border border-[#ff6b00]/40 text-[#ffaa00] flex items-center gap-1.5">
              <FiMapPin className="text-[#ff6b00]" />
              <span>FACILITY BASE: Tachileik, Myanmar 🇲🇲 ↔ Bangkok, Thailand 🇹🇭</span>
            </span>
            <span className="px-3.5 py-1.5 rounded bg-[#121620] border border-cyan-500/40 text-cyan-300">
              OPERATING PROTOCOLS: Burmese 🇲🇲 · English 🌐 · Kotlin ☕
            </span>
          </div>

          {/* 4 Primary Actuators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto mb-10">
            {[
              { title: 'ACTUATOR 01: MOBILE', spec: 'Kotlin · Jetpack Compose · MVVM · Clean Arch', icon: <FaAndroid className="text-[#ff6b00] text-xl" />, status: 'HYDRAULIC ACTIVE' },
              { title: 'ACTUATOR 02: CLUSTER', spec: 'Firebase Suite · REST API · Python · Node', icon: <FiCpu className="text-cyan-400 text-xl" />, status: 'TELEMETRY NOMINAL' },
              { title: 'ACTUATOR 03: DEFENSE', spec: 'Ethical Hacking · AES-256 · Android Keystore', icon: <FiShield className="text-[#ffaa00] text-xl" />, status: 'HARDENED' },
              { title: 'ACTUATOR 04: AI EDGE', spec: 'Claude API · TFLite · On-Device ML Models', icon: <FaRobot className="text-purple-400 text-xl" />, status: 'NEURAL ONLINE' },
            ].map((act, i) => (
              <div key={i} className="schematic-panel p-4 text-left">
                <div className="flex items-center justify-between mb-2">
                  {act.icon}
                  <span className="text-[9px] font-mono-code text-cyan-300">{act.status}</span>
                </div>
                <h3 className="font-orbitron font-bold text-xs text-white mb-1">{act.title}</h3>
                <p className="text-[11px] text-gray-400 leading-snug">{act.spec}</p>
              </div>
            ))}
          </div>

          {/* Tactical Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                triggerSound('hydraulic');
                document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mecha-btn-primary px-7 py-3 text-xs tracking-wider cursor-pointer flex items-center gap-2"
            >
              <FaWrench />
              <span>EXPLODE 16 MECHANICAL MODULES</span>
            </button>

            <button
              onClick={() => {
                triggerSound('drillWhir');
                document.getElementById('flowchart')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mecha-btn-secondary px-6 py-3 text-xs tracking-wider cursor-pointer flex items-center gap-2"
            >
              <FiTerminal />
              <span>AI FLOWCHART GENERATOR</span>
            </button>

            <a
              href="https://github.com/Dev-moe-kyawaung/pulsesync-android"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => triggerSound('relayClick')}
              className="px-6 py-3 rounded bg-[#121620] border border-[#ffaa00]/60 hover:border-[#ffaa00] text-[#ffaa00] font-orbitron font-bold text-xs tracking-wider flex items-center gap-2 transition-all"
            >
              <FaBolt />
              <span>FLAGSHIP TITAN: PULSESYNC</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: 16 MECHANICAL MODULES WITH EXPLODED VIEW
          ═══════════════════════════════════════════════════════ */}
      <section id="modules" className="py-28 px-4 relative z-10 bg-[#0d1017] border-t-2 border-[#ff6b00]/30">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ff6b00]/10 border border-[#ff6b00] text-[#ffaa00] font-mono-code text-[10px] mb-3">
              EXPLODED SCHEMATICS // 16 ROBOTICS MODULES
            </div>
            <h2 className="text-3xl sm:text-5xl font-orbitron font-black text-white">
              MECHANICAL ENGINEERING MODULES
            </h2>
            <p className="text-cyan-300 font-mono-code text-sm max-w-2xl mx-auto mt-2">
              Each production application is modeled as an industrial mechanical assembly. Click any module to launch its 3-tier exploded-view schematic.
            </p>
          </div>

          {/* 16 Mechanical Modules Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mechaModules.map(mod => (
              <div
                key={mod.id}
                onClick={() => {
                  triggerSound('hydraulic');
                  setSelectedModule(mod);
                }}
                className="schematic-panel p-5 cursor-pointer flex flex-col justify-between group exploded-view-container"
              >
                <div className="panel-rivet top-2 left-2" />
                <div className="panel-rivet top-2 right-2" />
                <div className="panel-rivet bottom-2 left-2" />
                <div className="panel-rivet bottom-2 right-2" />

                <div>
                  {/* Module Header */}
                  <div className="flex items-center justify-between text-[10px] font-mono-code text-gray-400 mb-3">
                    <span className="text-[#ff6b00] font-bold">{mod.serial}</span>
                    <span className="px-1.5 py-0.2 bg-[#090b10] rounded text-cyan-300 border border-cyan-500/30">
                      TOL: {mod.tolerance}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-3xl filter drop-shadow-[0_0_12px_rgba(255,107,0,0.6)] group-hover:scale-125 transition-transform">
                      {mod.icon}
                    </div>
                    <div>
                      <h3 className="font-orbitron font-bold text-sm text-white group-hover:text-[#ffaa00] transition-colors">
                        {mod.name}
                      </h3>
                      <p className="text-[11px] text-cyan-400 font-mono-code">{mod.category}</p>
                    </div>
                  </div>

                  {/* 3-Layer Exploded Wire Preview */}
                  <div className="p-2.5 rounded bg-[#090b10] border border-gray-800 mb-3 space-y-1.5 text-[10px] font-mono-code">
                    <div className="flex items-center justify-between text-gray-400">
                      <span>CHASSIS:</span>
                      <span className="text-gray-200 truncate max-w-[130px]">{mod.chassis}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                      <span>HYDRAULIC:</span>
                      <span className="text-[#ffaa00]">{mod.hydraulicPSI}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed font-chakra line-clamp-2 mb-3">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-gray-800 flex items-center justify-between text-[10px] font-mono-code">
                  <span className="text-[#ff6b00] group-hover:underline flex items-center gap-1 font-bold">
                    <FiMaximize2 />
                    <span>EXPLODE BLUEPRINT</span>
                  </span>
                  <a
                    href={mod.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-400 hover:text-white flex items-center gap-1"
                  >
                    <span>REPO</span>
                    <FiExternalLink />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: AI-POWERED ENGINEERING FLOWCHART GENERATOR
          ═══════════════════════════════════════════════════════ */}
      <section id="flowchart" className="py-28 px-4 relative z-10 bg-[#090b10] border-t-2 border-cyan-500/30">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-400 text-cyan-300 font-mono-code text-[10px] mb-3">
              TITAN-AI UNIT 01 // SCHEMATIC LOGIC SYNTHESIZER
            </div>
            <h2 className="text-3xl sm:text-5xl font-orbitron font-black text-white">
              AI TECHNICAL FLOWCHART GENERATOR
            </h2>
            <p className="text-[#ffaa00] font-mono-code text-sm max-w-2xl mx-auto mt-2">
              Generate engineering-style ASCII and DAG flowcharts showing data buses, state reducers, and multi-module pipelines.
            </p>
          </div>

          {/* Presets & Custom AI Ingestion */}
          <div className="schematic-panel p-6 rounded-2xl mb-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <span className="font-orbitron font-bold text-xs text-white flex items-center gap-2">
                <FaRobot className="text-cyan-400" />
                <span>SELECT PRESET SCHEMATIC PIPELINE</span>
              </span>

              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'cleanArch' as const, label: 'Clean Architecture DAG' },
                  { key: 'realtimeSync' as const, label: 'PulseSync Sync Pipeline' },
                  { key: 'cicdPipeline' as const, label: 'Industrial CI/CD Pipeline' },
                  { key: 'offlineFirst' as const, label: 'Offline-First Reconciler' },
                ].map(p => (
                  <button
                    key={p.key}
                    onClick={() => {
                      triggerSound('relayClick');
                      setSelectedFlowchart(p.key);
                    }}
                    className={`px-3 py-1.5 text-xs rounded font-mono-code transition-all cursor-pointer ${
                      selectedFlowchart === p.key
                        ? 'bg-[#ff6b00] text-black font-bold shadow-[0_0_12px_rgba(255,107,0,0.6)]'
                        : 'bg-[#121620] text-gray-300 border border-gray-700 hover:border-[#ff6b00]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom AI Flowchart Generator Input */}
            <form onSubmit={handleCustomAiGenerate} className="flex gap-2">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Or type custom prompt: e.g. 'GraphQL WebSocket Pipeline with Room DB'..."
                className="flex-1 px-4 py-2.5 rounded bg-[#090b10] border border-cyan-500/40 text-xs text-cyan-300 font-mono-code focus:outline-none focus:border-[#ff6b00]"
              />
              <button
                type="submit"
                className="mecha-btn-primary px-6 py-2.5 text-xs font-orbitron font-bold shrink-0 cursor-pointer"
              >
                GENERATE DAG
              </button>
            </form>
          </div>

          {/* Flowchart Terminal Screen */}
          <div className="schematic-panel p-6 rounded-2xl bg-[#090b10] border-2 border-cyan-400/60 shadow-[0_0_40px_rgba(0,229,255,0.2)] relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800 text-xs font-mono-code mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-white font-bold">TITAN-AI TECHNICAL SPECIFICATION OUTPUT</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(flowchartOutput);
                  triggerSound('relayClick');
                }}
                className="px-2.5 py-1 rounded bg-[#121620] hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] flex items-center gap-1.5 cursor-pointer"
              >
                <FiCopy />
                <span>COPY ASCII SCHEMATIC</span>
              </button>
            </div>

            <pre className="text-xs text-cyan-300 font-mono-code overflow-x-auto leading-relaxed p-4 bg-[#05070a] rounded-xl border border-gray-800">
              {flowchartOutput}
            </pre>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: ROBOTICS STARTUP LAB & FOUNDER METRICS
          ═══════════════════════════════════════════════════════ */}
      <section id="founder" className="py-28 px-4 relative z-10 bg-[#0e121b] border-t-2 border-[#ff6b00]/30">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ffaa00]/10 border border-[#ffaa00] text-[#ffaa00] font-mono-code text-[10px] mb-3">
              INDUSTRIAL METRICS // COMMERCIAL UNITS
            </div>
            <h2 className="text-3xl sm:text-5xl font-orbitron font-black text-white">
              ROBOTICS & STARTUP FOUNDER LAB
            </h2>
            <p className="text-cyan-300 font-mono-code text-sm max-w-2xl mx-auto mt-2">
              From prototype validation to million-user industrial deployment. Measurable business impact across Myanmar and Thailand.
            </p>
          </div>

          {/* Hard Telemetry Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {[
              { label: 'HARDWARE UNITS DEPLOYED', val: '1M+', sub: 'Across 16 Apps', color: 'text-[#ff6b00]' },
              { label: 'ACTIVE OPERATORS (MAU)', val: '50K+', sub: 'Monthly Active Users', color: 'text-cyan-400' },
              { label: 'FLEET SATISFACTION', val: '4.5★', sub: 'Average Store Rating', color: 'text-[#ffaa00]' },
              { label: 'HYDRAULIC RELIABILITY', val: '99.9%', sub: 'Zero-Downtime SLA', color: 'text-emerald-400' }
            ].map((stat, idx) => (
              <div key={idx} className="schematic-panel p-5 text-center">
                <p className="text-[10px] font-mono-code text-gray-400 mb-1">{stat.label}</p>
                <p className={`font-orbitron font-black text-3xl sm:text-4xl ${stat.color} mb-1`}>
                  {stat.val}
                </p>
                <p className="text-[11px] text-gray-400 font-mono-code">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Founder Decision Matrix */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="schematic-panel p-6">
              <h3 className="font-orbitron font-bold text-base text-[#ffaa00] mb-4 flex items-center gap-2">
                <FaWrench className="text-[#ff6b00]" />
                <span>COMMERCIAL SYSTEMS DELIVERED</span>
              </h3>
              <div className="space-y-3.5">
                {[
                  {
                    name: 'MoekyawTranslator AI Platform',
                    desc: 'On-device neural translation engine utilizing Claude API & TensorFlow Lite. Offline fallback for disconnected mining and regional sectors.'
                  },
                  {
                    name: 'POS ERP Industrial Retail Suite',
                    desc: 'Commercial point-of-sale management deployed across Tachileik and Bangkok commercial hubs with dual MMK/THB currency reconciliation.'
                  },
                  {
                    name: 'Job-Portal Platform',
                    desc: 'Talent bridge connecting skilled industrial software engineers with technology commands in Southeast Asia.'
                  },
                  {
                    name: 'Social Dashboard Telemetry',
                    desc: 'Unified social media telemetry aggregator with real-time reactive streams and engagement reporting.'
                  }
                ].map((prod, i) => (
                  <div key={i} className="p-3.5 rounded bg-[#090b10] border border-gray-800">
                    <h4 className="font-orbitron font-bold text-xs text-white">{prod.name}</h4>
                    <p className="text-xs text-gray-400 font-chakra mt-1">{prod.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="schematic-panel p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-orbitron font-bold text-base text-cyan-300 mb-4 flex items-center gap-2">
                  <FiSliders className="text-[#ff6b00]" />
                  <span>FOUNDER SPECIFICATION CHOICES</span>
                </h3>
                <div className="space-y-3 font-mono-code text-xs text-gray-300">
                  <div className="p-3 rounded bg-[#090b10] border border-gray-800">
                    <p className="text-[#ff6b00] font-bold mb-0.5">1. OFFLINE-FIRST AS FIRST-CLASS CITIZEN</p>
                    <p className="font-chakra text-gray-300 text-xs">Room DB local single source of truth ensures operations proceed without dropouts during industrial network blackouts.</p>
                  </div>
                  <div className="p-3 rounded bg-[#090b10] border border-gray-800">
                    <p className="text-[#ff6b00] font-bold mb-0.5">2. QUANTIZED ON-DEVICE EDGE AI</p>
                    <p className="font-chakra text-gray-300 text-xs">Quantized TensorFlow Lite models process linguistic translation on-device, cutting server cloud API costs to near zero.</p>
                  </div>
                  <div className="p-3 rounded bg-[#090b10] border border-gray-800">
                    <p className="text-[#ff6b00] font-bold mb-0.5">3. 2GB LOW-RAM BUDGET PROTOCOLS</p>
                    <p className="font-chakra text-gray-300 text-xs">Carefully budgeted Compose re-compositions prevent OutOfMemory crashes on low-spec hardware across developing sectors.</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between text-xs font-mono-code text-gray-400">
                <span>FOUNDER CODE: "BUILD WITH PURPOSE."</span>
                <span className="text-[#ffaa00] font-bold">READY FOR CO-FOUNDER DUTY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: 82+ CERTIFICATES (ACCREDITATION VAULT)
          ═══════════════════════════════════════════════════════ */}
      <section id="certs" className="py-28 px-4 relative z-10 bg-[#090b10] border-t-2 border-[#ff6b00]/30">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ff6b00]/10 border border-[#ff6b00] text-[#ffaa00] font-mono-code text-[10px] mb-3">
              ROBOTICS CREDENTIALS // 82+ ACCREDITATIONS
            </div>
            <h2 className="text-3xl sm:text-5xl font-orbitron font-black text-white">
              PROGRAMMING HUB ACCREDITATIONS
            </h2>
            <p className="text-cyan-300 font-mono-code text-sm max-w-2xl mx-auto mt-2">
              Verified certifications across 8 engineering disciplines: Mobile Architecture, AI/ML, Cyber Security, Cloud, and Software Engineering.
            </p>
          </div>

          {/* Search & Sector Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#ff6b00]" />
              <input
                type="text"
                value={certSearch}
                onChange={(e) => setCertSearch(e.target.value)}
                placeholder="SEARCH 82+ CERTIFICATES OR SERIAL NUMBER..."
                className="w-full pl-10 pr-4 py-2.5 rounded bg-[#121620] border border-[#ff6b00]/40 text-xs font-mono-code text-cyan-300 focus:outline-none focus:border-[#ff6b00]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {certCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    triggerSound('gearClick');
                    setCertCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-mono-code transition-all cursor-pointer ${
                    certCategory === cat
                      ? 'bg-[#ff6b00] text-black font-bold border border-[#ffaa55] shadow-[0_0_12px_rgba(255,107,0,0.6)]'
                      : 'bg-[#121620] text-gray-400 border border-gray-700 hover:border-[#ff6b00]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Certificates Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCerts.map((c, idx) => (
              <div key={idx} className="schematic-panel p-4 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono-code text-gray-400 mb-2">
                    <span className="text-[#ffaa00] font-bold">{c.date}</span>
                    <span className="px-1.5 py-0.2 bg-[#090b10] text-cyan-300 rounded border border-cyan-500/20">
                      ID #{c.id.slice(-6)}
                    </span>
                  </div>
                  <h4 className="font-orbitron font-bold text-xs text-white group-hover:text-[#ffaa00] transition-colors mb-1">
                    {c.name}
                  </h4>
                  <p className="text-[11px] text-cyan-400 font-mono-code">{c.cat}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-800 flex items-center justify-between text-xs font-mono-code">
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <FiCheck className="text-green-400" />
                    CERTIFIED
                  </span>
                  <a
                    href={`https://www.programminghub.io/certificate?id=${c.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-[#ff6b00] hover:text-white flex items-center gap-1 font-bold"
                  >
                    VERIFY ↗
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredCerts.length === 0 && (
            <div className="text-center py-12 text-gray-400 font-mono-code text-sm">
              NO ACCREDITATIONS MATCHING "{certSearch}". TRY ANOTHER QUERY!
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6: 43 GITHUB NETWORK PORTS & 38 WEBSITES
          ═══════════════════════════════════════════════════════ */}
      <section className="py-28 px-4 relative z-10 bg-[#0e121b] border-t-2 border-cyan-500/30">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-400 text-cyan-300 font-mono-code text-[10px] mb-3">
              NETWORK TERMINAL // DISTRIBUTED REPOS
            </div>
            <h2 className="text-3xl sm:text-5xl font-orbitron font-black text-white">
              43 GITHUB NETWORK PORTS & 38 WEB TERMINALS
            </h2>
            <p className="text-[#ffaa00] font-mono-code text-sm max-w-2xl mx-auto mt-2">
              Distributed open-source repository matrices spanning mobile ecosystems, cybersecurity tools, and mecha robotics architectures.
            </p>
          </div>

          {/* 43 GitHub Ports */}
          <div className="mb-14">
            <h3 className="font-orbitron font-bold text-sm text-[#ffaa00] mb-4 flex items-center gap-2">
              <FaGithub className="text-cyan-400" />
              <span>43 INDUSTRIAL GITHUB PORTS</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 font-mono-code text-xs">
              {githubPorts.map((handle, idx) => (
                <a
                  key={idx}
                  href={`https://github.com/${handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerSound('gearClick')}
                  className="p-2.5 rounded bg-[#090b10] border border-gray-800 hover:border-[#ff6b00] hover:bg-[#ff6b00]/10 transition-all flex items-center justify-between group"
                >
                  <span className="text-gray-300 group-hover:text-white truncate">{handle}</span>
                  <FiExternalLink className="text-gray-500 group-hover:text-[#ff6b00] shrink-0 ml-1 text-xs" />
                </a>
              ))}
            </div>
          </div>

          {/* 38 Lovable Web Deployments */}
          <div>
            <h3 className="font-orbitron font-bold text-sm text-cyan-300 mb-4 flex items-center gap-2">
              <FiCompass className="text-[#ff6b00]" />
              <span>38 DEPLOYED LOVABLE WEB TERMINALS</span>
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono-code text-xs">
              {lovableDeployments.map((deployment, idx) => (
                <a
                  key={idx}
                  href={deployment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerSound('gearClick')}
                  className="p-3 rounded bg-[#090b10] border border-gray-800 hover:border-cyan-400 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00]" />
                    <span className="text-gray-200 group-hover:text-cyan-300 truncate font-bold">{deployment.name}</span>
                  </div>
                  <FiExternalLink className="text-gray-500 group-hover:text-cyan-300 shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7: COMMUNICATIONS BUS // DIRECT HOTLINES & EMAILS
          ═══════════════════════════════════════════════════════ */}
      <section id="comms" className="py-28 px-4 relative z-10 bg-[#090b10] border-t-2 border-[#ff6b00]/30">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ff6b00]/10 border border-[#ff6b00] text-[#ffaa00] font-mono-code text-[10px] mb-3">
              COMMUNICATIONS ARRAY // DIRECT DISPATCH
            </div>
            <h2 className="text-3xl sm:text-5xl font-orbitron font-black text-white">
              HAIL CHIEF ENGINEER MOE KYAW AUNG
            </h2>
            <p className="text-cyan-300 font-mono-code text-sm max-w-2xl mx-auto mt-2">
              Direct voice hotlines and encrypted channels for senior mobile architect leadership, technical co-founder contracts, and robotics software ventures.
            </p>
          </div>

          {/* Voice Hotlines */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="schematic-panel p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded bg-[#ff6b00]/20 text-[#ff6b00] flex items-center justify-center text-2xl border border-[#ff6b00]">
                  <FiPhone />
                </div>
                <div>
                  <div className="text-[10px] font-mono-code text-[#ffaa00]">DIRECT HOTLINE 01</div>
                  <div className="text-xl font-orbitron font-bold text-white tracking-wider">+95 9 889 000 889</div>
                </div>
              </div>
              <a
                href="tel:+959889000889"
                onClick={() => triggerSound('relayClick')}
                className="mecha-btn-primary px-5 py-2 text-xs"
              >
                CALL
              </a>
            </div>

            <div className="schematic-panel p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-2xl border border-cyan-400">
                  <FiPhone />
                </div>
                <div>
                  <div className="text-[10px] font-mono-code text-cyan-300">DIRECT HOTLINE 02</div>
                  <div className="text-xl font-orbitron font-bold text-white tracking-wider">+95 9 666 000 050</div>
                </div>
              </div>
              <a
                href="tel:+959666000050"
                onClick={() => triggerSound('relayClick')}
                className="mecha-btn-secondary px-5 py-2 text-xs"
              >
                CALL
              </a>
            </div>
          </div>

          {/* 20+ Subspace Emails */}
          <div className="schematic-panel p-6 mb-12">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="font-orbitron font-bold text-base text-[#ffaa00] flex items-center gap-2">
                  <FiMail />
                  <span>20+ DIRECT INBOX CHANNELS (CLICK TO COPY TO CLIPBOARD)</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5 font-mono-code">One-click address copy for instant procurement & hiring.</p>
              </div>

              {copiedNotification && (
                <span className="px-3 py-1 bg-green-500 text-black font-mono-code text-xs rounded font-bold animate-bounce">
                  COPIED: {copiedNotification}
                </span>
              )}
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 font-mono-code text-xs">
              {subspaceEmails.map((em, idx) => (
                <button
                  key={idx}
                  onClick={() => copySubspaceChannel(em)}
                  className="p-2.5 rounded bg-[#090b10] border border-gray-800 hover:border-[#ff6b00] text-left flex items-center justify-between group cursor-pointer transition-all"
                >
                  <span className="text-gray-300 group-hover:text-[#ffaa00] truncate">{em}</span>
                  <FiCopy className="text-gray-500 group-hover:text-[#ff6b00] shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* 16 Gravatar Social Channels */}
          <div className="schematic-panel p-6">
            <h3 className="font-orbitron font-bold text-base text-cyan-300 mb-6 flex items-center gap-2">
              <FiShare2 />
              <span>VERIFIED GRAVATAR FREQUENCIES (ALL 16 PLATFORMS)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 font-mono-code text-xs">
              {socialRelays.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerSound('gearClick')}
                  className="p-3.5 rounded bg-[#090b10] border border-gray-800 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all flex flex-col items-center text-center group"
                >
                  <div className="text-2xl text-[#ff6b00] group-hover:scale-110 transition-transform mb-2">
                    {s.icon}
                  </div>
                  <div className="font-orbitron font-bold text-xs text-white group-hover:text-cyan-300">
                    {s.name}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5 truncate w-full">
                    {s.tag}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          EXPLODED-VIEW 3D INSPECTION MODAL
          ═══════════════════════════════════════════════════════ */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="schematic-panel rounded-2xl w-[96vw] sm:w-[750px] max-h-[88vh] overflow-hidden flex flex-col border-2 border-[#ff6b00] shadow-[0_0_60px_rgba(255,107,0,0.4)]">
            {/* Header */}
            <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-[#121620]">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedModule.icon}</span>
                <div>
                  <h3 className="font-orbitron font-extrabold text-base text-white">{selectedModule.name}</h3>
                  <p className="text-xs font-mono-code text-[#ffaa00]">{selectedModule.serial} // {selectedModule.category}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  triggerSound('hydraulic');
                  setSelectedModule(null);
                }}
                className="w-8 h-8 rounded bg-[#090b10] border border-gray-700 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Exploded-View Diagram Visualization */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm font-mono-code">
              {/* 3-Tier Exploded Callouts */}
              <div className="space-y-3">
                <span className="text-xs text-[#ff6b00] font-orbitron font-bold">
                  [3-TIER EXPLODED-VIEW BLUEPRINT ASSEMBLY]
                </span>

                <div className="p-3.5 rounded bg-[#121620] border-l-4 border-cyan-400 text-xs">
                  <p className="text-cyan-400 font-bold text-[11px] mb-0.5">TIER 3: ARMORED EXOSKELETON (UI / PRESENTATION)</p>
                  <p className="text-gray-300 font-chakra">{selectedModule.explodedLayers.layer3Armor}</p>
                </div>

                <div className="p-3.5 rounded bg-[#121620] border-l-4 border-[#ff6b00] text-xs">
                  <p className="text-[#ff6b00] font-bold text-[11px] mb-0.5">TIER 2: INTERNAL ACTUATOR ENGINE (DOMAIN / FLOW USECASES)</p>
                  <p className="text-gray-300 font-chakra">{selectedModule.explodedLayers.layer2Actuator}</p>
                </div>

                <div className="p-3.5 rounded bg-[#121620] border-l-4 border-yellow-400 text-xs">
                  <p className="text-yellow-400 font-bold text-[11px] mb-0.5">TIER 1: BASE ENGINE BLOCK (DATA / PERSISTENCE / ROOM DB)</p>
                  <p className="text-gray-300 font-chakra">{selectedModule.explodedLayers.layer1Core}</p>
                </div>
              </div>

              {/* Technical Calibration Specs */}
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded bg-[#090b10] border border-gray-800">
                  <p className="text-[10px] text-gray-400 uppercase">CHASSIS MATERIAL</p>
                  <p className="text-white font-bold mt-0.5">{selectedModule.chassis}</p>
                </div>
                <div className="p-3 rounded bg-[#090b10] border border-gray-800">
                  <p className="text-[10px] text-gray-400 uppercase">HYDRAULIC PRESSURE</p>
                  <p className="text-[#ffaa00] font-bold mt-0.5">{selectedModule.hydraulicPSI}</p>
                </div>
                <div className="p-3 rounded bg-[#090b10] border border-gray-800">
                  <p className="text-[10px] text-gray-400 uppercase">MACHINING TOLERANCE</p>
                  <p className="text-cyan-400 font-bold mt-0.5">{selectedModule.tolerance}</p>
                </div>
              </div>

              {/* Architecture Blueprint Note */}
              <div className="p-3.5 rounded bg-[#090b10] border border-gray-800">
                <p className="text-[10px] text-[#ff6b00] uppercase font-bold mb-1">ARCHITECTURAL BLUEPRINT</p>
                <p className="text-xs text-gray-200">{selectedModule.architectureBlueprint}</p>
              </div>

              {/* Verified Metrics */}
              <div className="p-3 rounded bg-[#121620] border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                OPERATIONAL SCALE: {selectedModule.metrics}
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
                <button
                  onClick={() => setSelectedModule(null)}
                  className="px-4 py-2 bg-[#121620] hover:bg-[#1a202c] text-gray-300 rounded font-orbitron text-xs font-bold transition-colors"
                >
                  DISMISS SCHEMATIC
                </button>
                <a
                  href={selectedModule.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mecha-btn-primary px-5 py-2 text-xs flex items-center gap-2"
                >
                  <span>LAUNCH REPOSITORY</span>
                  <FiExternalLink />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          CONTROL ROOM FOOTER
          ═══════════════════════════════════════════════════════ */}
      <footer className="py-16 px-4 bg-[#05070a] border-t-2 border-[#ff6b00]/40 relative z-10 font-mono-code text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b00] animate-ping" />
              <span className="font-orbitron font-bold text-sm text-white">
                TITAN-CORE // MOE KYAW AUNG (မိုးကျော်အောင်)
              </span>
            </div>
            <p className="text-gray-400 text-[11px]">
              Chief Industrial Mecha Architect · Technical Founder · Tachileik 🇲🇲 ↔ Bangkok 🇹🇭
            </p>
          </div>

          <div className="text-center md:text-right text-gray-400 text-[11px] space-y-1">
            <p className="text-[#ffaa00] font-mono-code">
              PRESSURE: 3,420 PSI · CALIBRATION: ±0.001mm · CLEAN ARCHITECTURE ASSURED
            </p>
            <p>© 2026 MOE KYAW AUNG. ALL INDUSTRIAL PATENTS & REPOS ACTIVE.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
