/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { Mail, Instagram, MessageCircle, Play, Image as ImageIcon, ChevronRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const skills = [
  { name: 'CorelDraw 2021 & 2012', category: 'Vector & Layout Design', icon: <div className="flex gap-2"><img src="https://coreldraw.fileion.com/storage/software/logos/2025/02/coreldraw-logo-fileioncom.webp" alt="CorelDraw 2021" className="w-8 h-8 rounded" /><img src="https://vectorseek.com/wp-content/uploads/2023/09/CorelDraw-12-Logo-Vector.svg-.png" alt="CorelDraw 12" className="w-8 h-8 object-contain drop-shadow-md bg-white rounded-full p-0.5" onError={(e) => { e.currentTarget.src = 'https://cdn.simpleicons.org/coreldraw/white'; }} /></div> },
  { name: 'Photoshop CC & 7.0', category: 'Image Manipulation', icon: <div className="flex gap-2"><img src="https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" alt="Photoshop CC" className="w-8 h-8 rounded" /><img src="https://adobe-photoshop-70.fileion.com/storage/software/logos/2025/05/photoshop-70-logo.png" alt="Photoshop 7.0" className="w-8 h-8 drop-shadow-md" onError={(e) => { e.currentTarget.src = 'https://cdn.simpleicons.org/adobephotoshop/white'; }} /></div> },
  { name: 'CapCut / Premiere', category: 'Motion Graphics & Video', icon: <div className="flex gap-2"><img src="https://vectorseek.com/wp-content/uploads/2023/07/capcut-logo-transparent.png" alt="CapCut" className="w-8 h-8 rounded-full" onError={(e) => { e.currentTarget.src = 'https://cdn.simpleicons.org/capcut/white'; }} /><img src="https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg" alt="Premiere" className="w-8 h-8 rounded" onError={(e) => { e.currentTarget.src = 'https://cdn.simpleicons.org/adobepremierepro/white'; }} /></div> },
  { name: 'Canva', category: 'Quick Creative Design', icon: <img src="https://logodownload.org/wp-content/uploads/2020/11/canva-logo-000.png" alt="Canva" className="w-8 h-8 rounded" onError={(e) => { e.currentTarget.src = 'https://cdn.simpleicons.org/canva/white'; }} /> },
];

const NeonSlideshow = ({ media, description, title, category, hideText = false }: { media: { type: 'image' | 'video', url: string }[], description: string, title: string, category: string, hideText?: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % media.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [media.length]);

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-surface-light">
      {/* Image Side */}
      <div className={`w-full ${hideText ? 'md:w-full h-full' : 'md:w-1/2 h-[50%] md:h-full'} relative bg-black/60 overflow-hidden group/neon`}>
        {media.map((item, i) => (
          item.type === 'video' ? (
            <video
              key={i}
              src={item.url}
              autoPlay
              loop
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out group-hover/neon:scale-105 ${i === currentIndex ? 'opacity-100' : 'opacity-0 z-[-1]'}`}
            />
          ) : (
            <img 
              key={i} 
              src={item.url} 
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-out group-hover/neon:scale-105 ${i === currentIndex ? 'opacity-100' : 'opacity-0 z-[-1]'}`} 
              alt=""
            />
          )
        ))}
      </div>
      {/* Description Side */}
      {!hideText && (
        <div className="w-full md:w-1/2 h-[50%] md:h-full flex flex-col justify-end p-6 md:p-8 relative bg-gradient-to-br from-surface-light to-primary border-l border-white/5">
          <div className="flex flex-col h-full justify-between z-10">
            <div className="mb-4 mt-2">
              <p className="text-gray-300 text-sm md:text-[15px] font-sans leading-relaxed border-l-2 border-accent pl-4 italic bg-black/20 p-4 rounded-r-lg shadow-sm">
                "{description}"
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-accent mb-2 tracking-widest uppercase">{category}</p>
              <h3 className="font-display font-bold text-2xl text-white">{title}</h3>
            </div>
          </div>
          <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm pointer-events-none z-20">
            <ChevronRight className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

const MixedMediaSequence = ({ media }: { media: { type: 'image' | 'video', url: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  useEffect(() => {
    const currentItem = media[currentIndex];
    
    if (currentItem?.type === 'image') {
      const timer = setTimeout(() => {
        handleNext();
      }, 3000);
      return () => clearTimeout(timer);
    } else if (currentItem?.type === 'video') {
      const videoEl = videoRefs.current[currentIndex];
      if (videoEl) {
        videoEl.currentTime = 0;
        videoEl.play().catch(() => {});
      }
    }
  }, [currentIndex, media]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-black/60 group-hover:scale-105 transition-transform duration-700">
      {media.map((item, i) => (
        item.type === 'video' ? (
          <video
            key={i}
            ref={(el) => (videoRefs.current[i] = el)}
            src={item.url}
            muted
            playsInline
            onEnded={handleNext}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          />
        ) : (
          <img
            key={i}
            src={item.url}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            alt=""
          />
        )
      ))}
    </div>
  );
};

const portfolioItems = [
  { 
    id: 1, 
    title: 'Neon Sign Designs', 
    category: 'Neon Art & Production', 
    type: 'neon-slideshow', 
    media: [
      { type: 'image', url: 'https://www.signcustomiser.com/blog/uploads/aesthetic-neon-signs-1.jpg' },
      { type: 'image', url: 'https://www.signcustomiser.com/blog/uploads/aesthetic-neon-signs-3.jpg' },
      { type: 'image', url: 'https://www.signcustomiser.com/blog/uploads/aesthetic-neon-signs-4.jpg' },
      { type: 'image', url: 'https://www.signcustomiser.com/blog/uploads/aesthetic-neon-signs-5.jpg' },
      { type: 'image', url: 'https://www.signcustomiser.com/blog/uploads/aesthetic-neon-signs-6.jpg' },
      { type: 'image', url: 'https://www.signcustomiser.com/blog/uploads/aesthetic-neon-signs-7.jpg' },
      { type: 'image', url: 'https://www.signcustomiser.com/blog/uploads/aesthetic-neon-signs-8.jpeg' },
      { type: 'image', url: 'https://www.signcustomiser.com/blog/uploads/aesthetic-neon-signs-9.jpg' },
      { type: 'video', url: 'https://videos.pexels.com/video-files/33812576/14351112_3840_2160_60fps.mp4' }
    ],
    description: "As a Graphic Designer, I have extensive experience crafting striking neon signs and mastering neon aesthetics.",
    src: ''
  },
  { 
    id: 2, 
    title: 'Color Grading & Edits', 
    category: 'Video Editing', 
    type: 'mixed-media-sequence', 
    media: [
      { type: 'video', url: 'https://videos.pexels.com/video-files/7610993/7610993-hd_1080_1920_30fps.mp4' },
      { type: 'video', url: 'https://videos.pexels.com/video-files/4352291/4352291-hd_1080_1920_25fps.mp4' },
      { type: 'video', url: 'https://videos.pexels.com/video-files/3973315/3973315-uhd_3840_2160_25fps.mp4' },
      { type: 'video', url: 'https://videos.pexels.com/video-files/5084783/5084783-hd_1920_1080_24fps.mp4' }
    ],
    src: '' 
  },
  { 
    id: 3, 
    title: 'Brand Identity & Layouts', 
    category: 'Vector Design', 
    type: 'mixed-media-sequence', 
    media: [
      { type: 'image', url: 'https://images.pexels.com/photos/7661590/pexels-photo-7661590.jpeg' },
      { type: 'image', url: 'https://i.pinimg.com/originals/9e/1d/33/9e1d3331097dd99dda3a094090e4b458.jpg' },
      { type: 'image', url: 'https://i.pinimg.com/originals/2a/13/8b/2a138bea3123557c43506df474c9349e.jpg' },
      { type: 'image', url: 'https://i.pinimg.com/736x/ff/49/5d/ff495d2bda39ed6c452a11cfbf322bee.jpg' },
      { type: 'image', url: 'https://i.pinimg.com/originals/c7/0c/6c/c70c6cd64075353ba0c9ba3a7fe70858.jpg' }
    ],
    src: '' 
  },
  { 
    id: 4, 
    title: 'Social Media Flyers', 
    category: 'Digital Marketing', 
    type: 'neon-slideshow', 
    media: [
      { type: 'image', url: 'https://i.pinimg.com/originals/ab/78/80/ab788088f8c38ad5eab960e7a797f0f8.jpg' },
      { type: 'image', url: 'https://i.pinimg.com/originals/f3/99/cd/f399cd137684b471bdc3e300038b9e4c.jpg' },
      { type: 'image', url: 'https://i.pinimg.com/originals/a0/0a/39/a00a3996dd716284d5cae1eacb0761f4.jpg' },
      { type: 'image', url: 'https://i.pinimg.com/originals/6a/77/6d/6a776d07f5ea6d79d51b90c656fb055b.jpg' },
      { type: 'image', url: 'https://i.pinimg.com/originals/a5/4d/dd/a54dddf92ea22a46b6f5f60d42fa73a5.jpg' },
      { type: 'image', url: 'https://i.pinimg.com/736x/dc/89/43/dc8943b4d700a53f3379cf88b7b94b09.jpg' },
      { type: 'image', url: 'https://i.pinimg.com/originals/05/3f/46/053f4642d59715917f33648a10158f72.jpg' }
    ],
    description: "Turning ordinary posts into high-end visual assets. We craft bespoke graphics that tell your story and capture the audience instantly.",
    src: ''
  },
  { 
    id: 5, 
    title: 'Product Retouching', 
    category: 'Image Manipulation', 
    type: 'neon-slideshow', 
    media: [
      { type: 'image', url: 'https://i.pinimg.com/736x/77/a0/c8/77a0c8e9bc5d98037cea86a174275342.jpg' },
      { type: 'image', url: 'https://i.pinimg.com/originals/34/6a/a1/346aa115f3d55b015d5ea7b01fd14083.jpg' },
      { type: 'image', url: 'https://i.pinimg.com/736x/43/29/f2/4329f222abb7488b76ac66b37c8c0243.jpg' },
      { type: 'image', url: 'https://i.pinimg.com/originals/2c/b3/a9/2cb3a99cb218ea02ff0efb4a6e8e70c1.jpg' },
      { type: 'image', url: 'https://i.pinimg.com/736x/8c/14/c3/8c14c362a449315d8133f0ed852585d5.jpg' },
      { type: 'image', url: 'https://i.pinimg.com/736x/fd/71/d3/fd71d33329dca191246451688e18df4f.jpg' },
      { type: 'image', url: 'https://i.pinimg.com/originals/59/26/f2/5926f2fe75b34995bfbcea096acc0022.jpg' }
    ],
    description: "Turning ordinary posts into high-end visual assets. We craft bespoke graphics that tell your story and capture the audience instantly.",
    hideText: true,
    src: ''
  },
  { id: 6, title: 'Cinematic Reel', category: 'Video Editing', type: 'video', src: 'https://www.pexels.com/download/video/35820856/' },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [emailCopied, setEmailCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-primary text-text-main font-sans selection:bg-accent selection:text-white bg-noise relative">
      
      {/* Navigation */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-2xl tracking-tighter text-white">
              MUX<span className="text-accent">.</span>
            </span>
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-mono text-gray-400 hover:text-white transition-colors">
                // {link.name}
              </a>
            ))}
            <a href="#contact" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-mono text-sm border border-white/10 hover:border-accent hover:text-accent transition-all">
              HIRE ME
            </a>
          </nav>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-display font-bold text-white hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Scroll-Bound Logo */}
      <div className="fixed right-2 md:right-8 top-0 bottom-0 w-px bg-white/5 z-40">
        <motion.div 
          style={{ top: yRange }}
          className="absolute left-1/2 -translate-x-1/2 pt-20"
        >
          <div className="rotate-90 origin-center whitespace-nowrap">
            <span className="font-display font-bold text-2xl md:text-4xl tracking-tighter text-white/10 select-none">
              MUX<span className="text-red-600/20">.</span>
            </span>
          </div>
        </motion.div>
      </div>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 px-6 lg:px-12 overflow-hidden">
          {/* Background Image Layer with Color Filter and Position Adjustment */}
          <div 
            className="absolute inset-0 z-0 bg-cover" 
            style={{ 
              backgroundImage: 'url("https://i.pinimg.com/originals/08/19/3f/08193f8d62c52d62a433ecf4bea372b2.jpg")',
              backgroundPosition: 'center 15%',
              filter: 'hue-rotate(245deg) brightness(0.55) contrast(1.1) saturate(1.4)',
              transform: 'scale(1.1) translateY(80px)'
            }}
          ></div>
          {/* Background Overlay for Image */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/30 to-primary z-0"></div>
          {/* Background Ambient Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-start gap-6"
            >
              <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 text-accent font-mono text-xs tracking-wider">
                AVAILABLE FOR FREELANCE
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight">
                Turning <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Bold Visions</span><br/>
                Into Visual <span className="text-accent text-glow font-style-italic">Masterpieces.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 font-sans max-w-lg mt-4">
                MUX Creative. High-end graphic design and motion editing...
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <a href="#contact" className="group relative px-8 py-4 bg-accent text-white font-mono text-sm font-bold tracking-wider overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <span className="relative flex items-center gap-2">
                    HIRE ME <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a href="#portfolio" className="px-8 py-4 bg-transparent border border-white/20 hover:border-white/50 text-white font-mono text-sm tracking-wider transition-colors flex items-center gap-2">
                  VIEW WORK
                </a>
              </div>
            </motion.div>

            {/* Abstract Graphic Element for Hero */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex justify-center items-center relative mt-12 lg:mt-0"
            >
              <div className="w-full aspect-square relative border border-white/5 bg-surface-light/30 backdrop-blur-sm p-4 flex flex-col justify-between">
                <div className="flex justify-between w-full text-white/20 font-mono text-xs">
                  <span>+</span>
                  <span>+</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border border-accent/30 rounded-full flex items-center justify-center relative animate-[spin_20s_linear_infinite]">
                    <div className="w-48 h-48 border border-white/10 rounded-full"></div>
                    <div className="absolute top-0 w-2 h-2 bg-accent rounded-full glow-accent"></div>
                    <div className="absolute bottom-0 w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute font-display text-4xl font-bold tracking-widest text-white/10">MUX</div>
                </div>
                <div className="flex justify-between w-full text-white/20 font-mono text-xs">
                  <span>+</span>
                  <span>+</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 lg:px-12 border-t border-white/5 bg-primary relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            {/* Profile Picture with Neon Shade Effect */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-5/12"
            >
              <div className="relative aspect-[3/4] max-w-md mx-auto group">
                {/* Abstract Neon Frames */}
                <div className="absolute inset-0 border border-accent/30 translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
                <div className="absolute inset-0 border border-blue-500/30 -translate-x-2 -translate-y-2 group-hover:-translate-x-4 group-hover:-translate-y-4 transition-transform duration-500"></div>
                
                {/* Image Container with strong neon tint overlays to simulate the "shades" effect */}
                <div className="relative w-full h-full bg-[#110c0c] overflow-hidden z-10 group-hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] transition-shadow duration-500">
                  {/* The Image itself - adjusted positioning to show more chest (object-[center_30%]), removed heavy grayscale to make it clear */}
                  <img src="https://lh3.googleusercontent.com/d/1jAiTmuS6E7ALfzxkvW44Hh2UhWZ8F9f-" alt="Muhammad Usama" className="w-full h-full object-cover object-[center_30%] contrast-[1.1] brightness-[0.95] group-hover:scale-105 transition-transform duration-700" />
                  
                  {/* Dual Lighting Effects - Subtle on the edges to not ruin the face */}
                  {/* Left Cyan Light */}
                  <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-cyan-500/20 to-transparent mix-blend-overlay z-20 pointer-events-none group-hover:opacity-80 transition-opacity"></div>
                  {/* Right Pink/Red Light */}
                  <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-accent/30 to-transparent mix-blend-overlay z-20 pointer-events-none group-hover:opacity-80 transition-opacity"></div>
                  
                  {/* Bottom Vignette to ground the image */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface to-transparent z-20 pointer-events-none"></div>
                </div>
              </div>
            </motion.div>

            {/* Resume Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-7/12 flex flex-col gap-8"
            >
              <div>
                <h2 className="text-sm font-mono text-accent mb-2 uppercase tracking-widest">About Me</h2>
                <h3 className="text-4xl md:text-5xl font-display font-bold">Muhammad Usama</h3>
                <p className="text-xl text-gray-300 font-mono mt-2">Graphic Designer</p>
              </div>

              <div className="text-gray-400 leading-relaxed font-sans max-w-2xl text-lg border-l-2 border-white/10 pl-6">
                "Passionate and versatile Graphic Designer with a strong track record of creating impactful visuals across multiple industries. Experienced in delivering high-quality logos, branding, marketing materials, and digital graphics. Dedicated to turning creative ideas into strategic designs that elevate brands and engage audiences."
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-4">
                <div>
                  <h4 className="font-display text-white text-xl mb-4 flex items-center gap-2">
                    <span className="text-accent">+</span> Education
                  </h4>
                  <ul className="space-y-4">
                    <li className="bg-surface-light/50 p-4 border border-white/5">
                      <p className="text-accent font-mono text-xs mb-1">GRADUATED 2025</p>
                      <p className="text-white font-bold">Associate Degree in Science (ADS)</p>
                      <p className="text-gray-400 text-sm mt-1">Govt. Islamia Science College</p>
                    </li>
                    <li className="bg-surface-light/50 p-4 border border-white/5">
                      <p className="text-accent font-mono text-xs mb-1">2020 - 2021</p>
                      <p className="text-white font-bold">Higher Secondary School</p>
                      <p className="text-gray-400 text-sm mt-1">Govt. Islamia Science College</p>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-display text-white text-xl mb-4 flex items-center gap-2">
                    <span className="text-accent">+</span> Experience
                  </h4>
                  <ul className="space-y-4">
                    <li className="bg-surface-light/50 p-4 border border-white/5">
                      <p className="text-white font-bold text-sm">End-to-End Design & Printing</p>
                      <p className="text-gray-400 text-xs mt-2 leading-relaxed">Expert in creating high-quality designs and managing complete printing processes (offset, digital, large-format).</p>
                    </li>
                    <li className="bg-surface-light/50 p-4 border border-white/5">
                      <p className="text-white font-bold text-sm">Client Dealing & Sales</p>
                      <p className="text-gray-400 text-xs mt-2 leading-relaxed">15 years of proven experience handling clients, understanding requirements, and driving sales.</p>
                    </li>
                  </ul>
                </div>
              </div>

            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6 lg:px-12 border-t border-white/5 bg-surface relative overflow-hidden">
          {/* Background Image Layer with Duotone Red Filter */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none" 
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop")',
              filter: 'grayscale(1) brightness(0.15) sepia(1) hue-rotate(-50deg) saturate(4)',
              opacity: 0.3
            }}
          ></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold">The Arsenal.</h2>
                <p className="text-gray-400 mt-4 max-w-xl">
                  Multi-software expertise delivering pixel-perfect layouts, surreal manipulations, and dynamic motion graphics.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="group p-6 border bg-surface-light hover:border-accent/50 transition-colors relative overflow-hidden border-8 border-double border-[#520000] rounded-[14px]"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-[100px] -z-10 group-hover:bg-accent/20 transition-colors"></div>
                  <div className="text-accent mb-6 group-hover:scale-110 transition-transform origin-left">
                    {skill.icon}
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2 border-double border-b-4 border-[#ff0000] pb-1 inline-block">
                    {skill.name}
                  </h3>
                  <p className="font-mono text-sm text-gray-500 uppercase tracking-wider">{skill.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-24 px-6 lg:px-12 bg-primary">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Selected Works.</h2>
              <p className="text-gray-400 max-w-xl">A glimpse into the digital canvases and motion timelines.</p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:auto-rows-[250px] md:auto-rows-[300px] gap-4 md:gap-6">
              {portfolioItems.map((item, i) => {
                // Create a varied grid layout
                const isLarge = i === 0 || i === 3;
                return (
                  <div 
                    key={item.id} 
                    className={`group relative overflow-hidden border border-white/10 bg-surface-light min-h-[300px] sm:min-h-0 ${isLarge ? 'sm:col-span-2' : 'sm:col-span-1'} hover:border-white/30 transition-all`}
                  >
                    {/* Media Content */}
                    <div className="absolute inset-0 bg-surface z-0">
                      {item.type === 'neon-slideshow' ? (
                         <NeonSlideshow 
                           media={item.media || []} 
                           description={item.description || ''} 
                           title={item.title} 
                           category={item.category} 
                           hideText={item.hideText}
                         />
                      ) : item.type === 'mixed-media-sequence' ? (
                         <MixedMediaSequence media={item.media || []} />
                      ) : item.type === 'image' ? (
                         <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700">
                           <img src={item.src} alt={item.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                           <div className="absolute inset-0 flex flex-col items-center justify-center -z-10">
                              <ImageIcon className="w-8 h-8 text-white/20 mb-2" />
                              <span className="text-gray-500 font-mono text-xs text-center px-4">Upload image to <br/>`public{item.src}`</span>
                           </div>
                         </div>
                      ) : (
                        <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700">
                          <video src={item.src} autoPlay loop muted playsInline className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                          <div className="absolute inset-0 flex flex-col items-center justify-center -z-10">
                              <Play className="w-8 h-8 text-white/20 mb-2" />
                              <span className="text-gray-500 font-mono text-xs text-center px-4">Upload video to <br/>`public{item.src}`</span>
                           </div>
                        </div>
                      )}
                    </div>

                    {(item.type !== 'neon-slideshow' || item.hideText) && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none"></div>
                        
                        <div className="absolute bottom-0 left-0 p-6 z-20 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform pointer-events-none">
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="font-mono text-xs text-accent mb-2 tracking-widest uppercase">{item.category}</p>
                              <h3 className="font-display font-bold text-2xl">{item.title}</h3>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                              <ChevronRight className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-12 text-center">
              <a href="#" className="inline-flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1">
                VIEW ALL PROJECTS <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer / Contact Section */}
      <footer id="contact" className="border-t border-white/10 bg-[#1a0000] py-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/5 rounded-[100%] blur-[120px] pointer-events-none"></div>
        
        {/* Background Watermark */}
        <div className="absolute -bottom-32 -right-32 pointer-events-none select-none overflow-hidden">
          <div className="font-display font-bold text-[25rem] md:text-[45rem] leading-none text-black/20 rotate-[-15deg] tracking-tighter">
            MUX<span className="text-red-900/10">.</span>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
          
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Let's Create.</h2>
            <p className="text-gray-400 max-w-md mb-8">
              Ready to elevate your brand's visual identity? Reach out to start a conversation about your next big project.
            </p>
            <div className="font-display font-bold text-xl tracking-tighter text-white">
              MUX<span className="text-accent">.</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto">
            <a 
              href="https://wa.me/923703352148" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border border-white/10 bg-black hover:border-accent hover:bg-accent/5 transition-all min-w-[300px] group"
            >
              <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <img src="https://cdn.simpleicons.org/whatsapp/FF0000" alt="WhatsApp" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">WhatsApp</p>
                <p className="font-display text-lg">03703352148</p>
              </div>
            </a>

            <button 
              onClick={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText('uafaq883@gmail.com');
                setEmailCopied(true);
                setTimeout(() => setEmailCopied(false), 2000);
              }}
              className="flex items-center gap-4 p-4 border border-white/10 bg-black hover:border-accent hover:bg-accent/5 transition-all min-w-[300px] group relative text-left"
            >
              <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Email</p>
                <p className="font-display text-lg">uafaq883@gmail.com</p>
              </div>
              {emailCopied && (
                <div className="absolute top-0 right-0 mt-2 mr-2 bg-accent text-white text-[10px] px-2 py-1 rounded font-mono animate-bounce">
                  COPIED!
                </div>
              )}
            </button>

            <a 
              href="https://www.instagram.com/muhammadusama.geo?igsh=YTZyYW1rNG01NWdk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border border-white/10 bg-black hover:border-accent hover:bg-accent/5 transition-all min-w-[300px] group"
            >
              <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Instagram</p>
                <p className="font-display text-lg">muhammadusama.geo</p>
              </div>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-600">
          <p>© {new Date().getFullYear()} MUX Creative. All rights reserved.</p>
          <p>Designed for Impact.</p>
        </div>
      </footer>
    </div>
  );
}
