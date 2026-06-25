import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Ornament, SectionTitle } from "@/components/Ornament";
import { Reveal } from "@/components/Reveal";
import { ScrollTop, StickyNavShadow } from "@/components/ScrollTop";
import { CATEGORIES, MENU_ITEMS, COMBO_ITEMS, type MenuItem } from "@/data/menu";
import { submitEnquiry } from "@/lib/api/enquiry.functions";
import { getSanityClient, urlFor } from "@/lib/sanity";
import {
  X,
  Send,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Phone,
  Mail,
  User,
  Building,
  MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chowrasta Edinburgh — Authentic Hyderabadi Dum Biryani" },
      {
        name: "description",
        content:
          "Chowrasta brings authentic Hyderabadi street food and royal Dum Biryani to Edinburgh. Slow-cooked tradition, fresh spices, warm hospitality.",
      },
      { property: "og:title", content: "Chowrasta Edinburgh — Where Spice Meets Flavour" },
      {
        property: "og:description",
        content: "Authentic Hyderabadi Dum Biryani in the heart of Edinburgh.",
      },
      { property: "og:image", content: "/images/hero/hero-biryani.jpg" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Great+Vibes&family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,700;1,400&display=swap",
      },
    ],
  }),
  loader: async () => {
    try {
      const client = getSanityClient();
      const [hero, features, story, menuItems] = await Promise.all([
        client.fetch(`*[_type == "hero"][0]`),
        client.fetch(`*[_type == "feature"] | order(order asc)`),
        client.fetch(`*[_type == "story"][0]`),
        client.fetch(`*[_type == "menuItem"]`),
      ]);
      return { hero, features, story, menuItems };
    } catch (e) {
      console.error("Failed to load data from Sanity:", e);
      return { hero: null, features: null, story: null, menuItems: null };
    }
  },
  component: Home,
});

const ORDER_PLATFORMS = [
  {
    name: "Uber Eats",
    href: "https://www.ubereats.com/store/chowrasta/fZnbr7ViSjy8pzTnn0mmZg",
    logoSrc: "/images/logo/uber-eats.svg",
    logoAlt: "Uber Eats logo",
    iconBackground: "#06C167",
    textClassName: "text-neutral-950",
    accentClassName: "text-[#06C167]",
    hoverClassName: "hover:border-[#06C167]/55 hover:bg-[#06C167]/5",
  },
  {
    name: "JUST EAT",
    href: "https://www.just-eat.co.uk/restaurants-chowrasta-edinburgh/menu",
    logoSrc: "/images/logo/just-eat.svg",
    logoAlt: "Just Eat logo",
    iconBackground: "#FF8000",
    textClassName: "text-[#FF8000]",
    hoverClassName: "hover:border-[#FF8000]/55 hover:bg-[#FF8000]/5",
  },
  {
    name: "Deliveroo",
    href: "https://deliveroo.co.uk/menu/edinburgh/slateford-and-gorgie/chowrasta",
    logoSrc: "/images/logo/deliveroo.svg",
    logoAlt: "Deliveroo logo",
    iconBackground: "#00CCBC",
    textClassName: "text-[#00CCBC]",
    hoverClassName: "hover:border-[#00CCBC]/55 hover:bg-[#00CCBC]/5",
  },
] as const;

function PlatformBrand({
  platform,
  compact = false,
  light = false,
}: {
  platform: (typeof ORDER_PLATFORMS)[number];
  compact?: boolean;
  light?: boolean;
}) {
  const textSizeClassName = compact ? "text-[0.65rem] tracking-[0.18em]" : "text-sm md:text-base tracking-[0.15em]";
  const iconWrapperClassName = compact ? "h-7 w-7 rounded-md" : "h-8 w-8 rounded-lg";
  const iconClassName = compact ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className="flex items-center justify-center gap-3">
      <span
        className={`flex shrink-0 items-center justify-center shadow-sm ${iconWrapperClassName}`}
        style={{ backgroundColor: platform.iconBackground }}
      >
        <img
          src={platform.logoSrc}
          alt={platform.logoAlt}
          className={`${iconClassName} invert brightness-0`}
        />
      </span>
      <span
        className={`font-display font-medium uppercase ${textSizeClassName} ${
          light ? "text-cream" : "text-heritage-deep"
        }`}
      >
        {platform.name}
      </span>
    </div>
  );
}

function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const sanityData = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <StickyNavShadow />
      <Nav
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />
      <Hero data={sanityData?.hero} />
      <Marquee data={sanityData?.features} />
      <Story data={sanityData?.story} />
      <MenuSection onSelectItem={setSelectedItem} data={sanityData?.menuItems} />
      <CombosSection />
      <PicklesSection />
      <DeliveryPlatforms />
      <OwnDelivery />
      <SpiceBand />
      <Catering />
      <Gallery />
      <Location />
      <Footer />
      <ScrollTop />
      <WhatsAppFloat />
      <LightboxModal selectedItem={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}

function Nav({
  isMobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
}: {
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
}) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      data-sticky-nav
      className="sticky top-0 z-30 bg-cream/85 backdrop-blur border-b border-gold/30"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo size="sm" />
        <nav className="hidden md:flex items-center gap-6 text-sm tracking-[0.15em] uppercase font-sans text-heritage-deep">
          <a href="#home" className="link-underline hover:text-spice transition-colors">
            Home
          </a>
          <a href="#story" className="link-underline hover:text-spice transition-colors">
            Our Story
          </a>
          <a href="#menu" className="link-underline hover:text-spice transition-colors">
            Menu
          </a>
          <a href="#pickles" className="link-underline hover:text-spice transition-colors">
            Pickles
          </a>
          <a href="#catering" className="link-underline hover:text-spice transition-colors">
            Catering
          </a>
          <a href="#gallery" className="link-underline hover:text-spice transition-colors">
            Gallery
          </a>
          <a
            href="#location"
            className="link-underline hover:text-spice transition-colors font-semibold"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#menu"
            className="btn-heritage hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-heritage text-cream text-xs tracking-[0.25em] uppercase font-sans font-semibold"
          >
            View Menu
          </a>

          {/* Mobile Hamburger Icon */}
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative z-40 text-heritage-deep cursor-pointer focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"}`}
            />
            <span
              className={`w-6 h-0.5 bg-current transition-all duration-300 my-1 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"}`}
            />
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-full left-0 right-0 bg-cream/95 backdrop-blur-md border-b border-gold/30 shadow-xl z-20 flex flex-col items-center py-6 gap-5 text-sm tracking-[0.2em] uppercase font-sans text-heritage-deep overflow-hidden"
            >
              <a
                href="#home"
                onClick={onCloseMobileMenu}
                className="hover:text-spice transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#story"
                onClick={onCloseMobileMenu}
                className="hover:text-spice transition-colors font-medium"
              >
                Our Story
              </a>
              <a
                href="#menu"
                onClick={onCloseMobileMenu}
                className="hover:text-spice transition-colors font-medium"
              >
                Menu
              </a>
              <a
                href="#pickles"
                onClick={onCloseMobileMenu}
                className="hover:text-spice transition-colors font-medium"
              >
                Pickles
              </a>
              <a
                href="#catering"
                onClick={onCloseMobileMenu}
                className="hover:text-spice transition-colors font-medium"
              >
                Catering
              </a>
              <a
                href="#gallery"
                onClick={onCloseMobileMenu}
                className="hover:text-spice transition-colors font-medium"
              >
                Gallery
              </a>
              <a
                href="#location"
                onClick={onCloseMobileMenu}
                className="hover:text-spice transition-colors font-bold text-gold"
              >
                Contact
              </a>
              <a
                href="#menu"
                onClick={onCloseMobileMenu}
                className="btn-heritage inline-flex items-center gap-2 px-5 py-2.5 bg-heritage text-cream text-xs font-semibold"
              >
                View Menu
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function Hero({ data }: { data: any }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  const eyebrow = data?.eyebrow || "Authentic Hyderabadi";
  const title = data?.title || "Dum Biryani";
  const subtitle = data?.subtitle || "Where spice meets\nflavor.";
  const description = data?.description || "From Hyderabad's lively crossroads to the heart of Edinburgh, we serve slow-cooked dum biryani with the depth, warmth, and royal character it has carried for generations.";
  const ctaPrimaryText = data?.ctaPrimaryText || "View Menu";
  const bgImgSrc = data?.backgroundImage ? urlFor(data.backgroundImage).url() : "/images/hero/hero-biryani.jpg";

  return (
    <section id="home" className="relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `url(/images/sections/charminar.jpg)`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left bottom",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <Logo size="sm" showText={false} className="mb-4 opacity-90" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/45 bg-gold/5 text-gold text-[0.65rem] tracking-[0.15em] uppercase font-sans mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
              10% Student Discount Available
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-xs tracking-[0.4em] text-spice uppercase font-sans mb-4">
              {eyebrow}
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <h1 className="font-display text-5xl md:text-7xl text-heritage-deep leading-[1.05]">
              {title}
            </h1>
          </motion.div>
          <motion.div variants={itemVariants}>
            {subtitle.split("\n").map((line: string, index: number) => (
              <p key={index} className="font-script text-spice text-4xl md:text-5xl mt-2 first:mt-4 leading-none">
                {line}
              </p>
            ))}
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="mt-8 text-lg text-muted-foreground max-w-md italic leading-relaxed font-serif">
              {description}
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <div className="mt-10">
              <a
                href="#menu"
                className="btn-heritage inline-flex items-center gap-3 px-7 py-3.5 bg-heritage text-cream text-xs tracking-[0.3em] uppercase font-sans font-semibold group"
              >
                {ctaPrimaryText}{" "}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: yParallax }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Floating Spice Element 1 */}
          <motion.img
            src="/images/sections/spices.jpg"
            alt=""
            aria-hidden
            className="absolute -top-12 -left-12 w-32 h-32 object-cover opacity-20 blur-[2px] rounded-full mix-blend-multiply z-0 pointer-events-none"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Floating Spice Element 2 */}
          <motion.img
            src="/images/sections/spice-market.jpg"
            alt=""
            aria-hidden
            className="absolute -bottom-8 -right-8 w-24 h-24 object-cover opacity-15 blur-[1px] rounded-full mix-blend-multiply z-0 pointer-events-none"
            animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="relative">
            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-gold/95 text-heritage-deep flex flex-col items-center justify-center text-center shadow-xl border-4 border-cream z-10 animate-float">
              <span className="font-display text-[0.6rem] tracking-[0.2em]">SCOTLAND'S</span>
              <span className="font-display text-[0.6rem] tracking-[0.2em]">MOST LOVED</span>
              <span className="font-serif italic text-sm mt-1">Dum Biryani</span>
            </div>
            <div className="relative aspect-square animate-float">
              <div className="absolute inset-0 rounded-full bg-heritage/15 blur-3xl animate-slow-spin" />
              <img
                src={bgImgSrc}
                alt="Hyderabadi Chicken Dum Biryani in copper handi"
                width={1024}
                height={1024}
                className="relative rounded-sm shadow-2xl object-cover w-full h-full z-10"
              />
              <div className="absolute -bottom-4 -left-4 right-12 h-1 bg-gold z-0" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee({ data }: { data: any[] | null }) {
  const items = data && data.length > 0 ? data.map(item => ({
    title: item.title,
    desc: item.description
  })) : [
    { title: "Authentic Recipe", desc: "Traditional Hyderabadi recipes passed down with love" },
    { title: "Fresh Ingredients", desc: "Premium spices sourced and freshly ground daily" },
    { title: "Made Daily", desc: "Every biryani is dum-cooked fresh for each service" },
    { title: "Halal & Hygienic", desc: "100% Halal, prepared with utmost care and hygiene" },
  ];

  // Duplicate items once to create a seamless looping marquee
  const marqueeItems = [...items, ...items];

  return (
    <section className="bg-heritage-deep text-cream py-8 overflow-hidden relative border-y border-gold/10">
      {/* Soft gradient fades on the edges for a premium look */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-heritage-deep via-heritage-deep/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-heritage-deep via-heritage-deep/80 to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee">
        {marqueeItems.map((it, i) => (
          <div
            key={`${it.title}-${i}`}
            className="flex items-center gap-5 px-8 md:px-12 border-r border-gold/20 w-[290px] md:w-[360px] shrink-0"
          >
            <div className="w-8 h-8 text-gold shrink-0 transition-transform duration-500 hover:rotate-[18deg] hover:scale-110">
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <path
                  d="M20 4 L24 14 L34 16 L26 22 L28 32 L20 27 L12 32 L14 22 L6 16 L16 14 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
              </svg>
            </div>
            <div>
              <p className="font-display text-xs tracking-[0.25em] text-gold mb-1 uppercase font-bold">
                {it.title}
              </p>
              <p className="text-[0.8rem] text-cream/70 leading-snug">
                {it.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


function ImageWithFallback({
  src,
  fallbackSrc,
  alt,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"img"> & {
  fallbackSrc?: string;
}) {
  const sources = useMemo(
    () =>
      [src, fallbackSrc].filter((value, index, array): value is string => {
        return Boolean(value) && array.indexOf(value) === index;
      }),
    [fallbackSrc, src],
  );

  const [sourceIndex, setSourceIndex] = useState(0);

  useEffect(() => {
    setSourceIndex(0);
  }, [src, fallbackSrc]);

  if (!sources[sourceIndex]) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-heritage-deep to-heritage p-6 text-center select-none ${className}`}
        style={{ minHeight: "100%" }}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

        {/* Central visual indicator */}
        <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center text-gold mb-3 bg-heritage-deep/60">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253"
            />
          </svg>
        </div>

        <span className="font-display text-[0.65rem] tracking-[0.25em] text-gold uppercase mb-1">
          CHOWRASTA
        </span>
        <span className="font-serif italic text-xs text-cream/70 line-clamp-2 px-2">{alt}</span>

        {/* Soft Gold Line Accent */}
        <div className="absolute bottom-3 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-gold/45 to-transparent" />
      </div>
    );
  }

  return (
    <img
      src={sources[sourceIndex]}
      onError={() => setSourceIndex((current) => current + 1)}
      alt={alt}
      className={className}
      loading="lazy"
      {...props}
    />
  );
}

function ComboImageMosaic({ images, alt }: { images: string[]; alt: string }) {
  const uniqueImages = images.filter((image, index, array) => array.indexOf(image) === index);

  if (uniqueImages.length >= 3) {
    return (
      <div className="grid h-full w-full grid-cols-[1.15fr_0.85fr] gap-1 bg-cream-dark/20 p-1">
        <div className="overflow-hidden rounded-[2px]">
          <ImageWithFallback
            src={uniqueImages[0]}
            alt={alt}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="grid gap-1">
          {uniqueImages.slice(1, 3).map((image, index) => (
            <div key={`${alt}-${index}`} className="overflow-hidden rounded-[2px]">
              <ImageWithFallback src={image} alt={alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (uniqueImages.length === 2) {
    return (
      <div className="grid h-full w-full grid-cols-2 gap-1 bg-cream-dark/20 p-1">
        {uniqueImages.map((image, index) => (
          <div key={`${alt}-${index}`} className="overflow-hidden rounded-[2px]">
            <ImageWithFallback src={image} alt={alt} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <ImageWithFallback src={uniqueImages[0]} alt={alt} className="h-full w-full object-cover" />
  );
}

function Story({ data }: { data: any }) {
  const eyebrow = data?.eyebrow || "Our Story";
  const title = data?.title || "From Old Hyderabad \n to Edinburgh";
  const paragraphs = data?.paragraphs && data.paragraphs.length > 0 ? data.paragraphs : [
    "Chowrasta means crossroads, and for us it is where memory, spice, and place come together on one table.",
    "Our story starts in Old Hyderabad, in streets filled with roasted masala, fresh chai, and biryani resting under dum. We bring that same spirit to Edinburgh, where Indian comfort food meets a new city, new people, and new stories.",
    "We cook slowly, marinate deeply, and build every masala for richness rather than shortcuts. Each plate is made to feel warm, generous, and worth sharing.",
    "At Chowrasta, every meal is made to be savoured, shared, and remembered."
  ];

  const mainImgSrc = data?.mainImage ? urlFor(data.mainImage).url() : "/images/sections/spice-market.jpg";
  const secondaryImgSrc = data?.secondaryImage ? urlFor(data.secondaryImage).url() : "/images/sections/charminar.jpg";

  return (
    <section id="story" className="py-24 relative bg-cream-dark/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <Reveal y={28}>
          <div className="relative img-zoom">
            <img
              src={mainImgSrc}
              alt="Vintage Hyderabad spice market"
              width={1280}
              height={800}
              loading="lazy"
              className="w-full object-cover gold-border"
            />
            <img
              src={secondaryImgSrc}
              alt="Charminar line art"
              width={400}
              height={500}
              loading="lazy"
              className="hidden md:block absolute -bottom-10 -right-6 w-44 opacity-[0.12] animate-float"
            />
          </div>
        </Reveal>
        <div>
          <Reveal delay={100}>
            <p className="text-xs tracking-[0.4em] text-spice uppercase font-sans mb-4">
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <h2 className="font-display text-4xl md:text-5xl text-heritage-deep leading-tight">
              {title.split("\n").map((part: string, idx: number) => {
                if (idx === 0) return <span key={idx}>{part}<br /></span>;
                return <span key={idx} className="font-serif italic text-spice">{part}</span>;
              })}
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <Ornament className="my-6 justify-start" />
          </Reveal>
          <Reveal delay={400}>
            <div className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed font-serif">
              {paragraphs.map((p: string, idx: number) => {
                const isLast = idx === paragraphs.length - 1;
                return (
                  <p key={idx} className={isLast ? "font-medium text-heritage-deep italic" : ""}>
                    {p}
                  </p>
                );
              })}
            </div>
          </Reveal>
          <Reveal delay={550}>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              <Pillar n="100%" label="Halal Kitchen" />
              <Pillar n="24h" label="Marinated" />
              <Pillar n="Slow" label="Dum Cooked" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Pillar({ n, label }: { n: string; label: string }) {
  return (
    <div className="text-center border border-gold/40 py-4 bg-cream transition-all duration-500 hover:bg-gold/15 hover:border-gold hover:-translate-y-1">
      <p className="font-display text-2xl text-heritage-deep">{n}</p>
      <p className="text-[0.65rem] tracking-[0.3em] uppercase font-sans text-spice mt-1">{label}</p>
    </div>
  );
}

function MenuSection({ onSelectItem, data }: { onSelectItem: (item: MenuItem) => void; data: any[] | null }) {
  const [activeCategory, setActiveCategory] = useState("Biryani’s");

  const items = data && data.length > 0 ? data.map((item: any) => ({
    id: item._id,
    name: item.name,
    price: item.price,
    category: item.category,
    description: item.description,
    image: item.image ? urlFor(item.image).url() : "/images/menu/starters/chicken-65.jpg",
    tag: item.tags && item.tags.length > 0 ? item.tags[0] : undefined,
  })) : MENU_ITEMS;

  const filteredItems = items.filter(
    (item) => item.category.toLowerCase() === activeCategory.toLowerCase(),
  );

  const getBadgeStyles = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "spicy":
        return "bg-spice text-cream border border-spice";
      case "popular":
        return "bg-gold text-heritage-deep border border-gold font-bold";
      case "dum special":
        return "bg-heritage text-gold border border-gold font-bold";
      case "student favourite":
        return "bg-cream-dark/95 text-heritage-deep border border-gold/40 font-medium";
      default:
        return "bg-heritage/90 text-cream";
    }
  };

  return (
    <section id="menu" className="py-24 relative bg-cream-dark/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12">
          {/* Logo in Menu Section top area */}
          <div className="mb-6 flex justify-center">
            <Logo size="lg" showText={false} />
          </div>

          {/* Student Discount Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/45 bg-gold/10 text-gold text-xs tracking-[0.15em] uppercase font-sans mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
            10% Student Discount
          </div>

          <SectionTitle
            eyebrow="Explore Our Menu"
            title="Our Culinary Offerings"
            subtitle="Authentic Hyderabadi street food, slow-cooked dum biryanis, and traditional desserts prepared freshly everyday."
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16 max-w-4xl mx-auto">
          {CATEGORIES.map((cat) => {
            const isActive = cat.toLowerCase() === activeCategory.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-sm text-xs tracking-[0.2em] uppercase font-sans transition-all duration-300 border ${
                  isActive
                    ? "bg-heritage text-cream border-heritage shadow-lg shadow-heritage/10 shadow-sm"
                    : "bg-cream text-heritage-deep border-gold/30 hover:border-gold hover:bg-gold/5 cursor-pointer"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredItems.map((item, i) => (
            <Reveal key={item.id} delay={(i % 2) * 80} y={24}>
              <article
                onClick={() => onSelectItem(item)}
                className="heritage-card group h-40 md:h-48 flex flex-row overflow-hidden cursor-pointer"
              >
                <div className="img-zoom relative w-1/3 sm:w-[35%] md:w-2/5 h-full shrink-0">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Custom Tag */}
                  {item.tag && (
                    <span
                      className={`absolute top-2.5 left-2.5 text-[0.55rem] md:text-[0.6rem] tracking-[0.25em] md:tracking-[0.3em] uppercase px-2 py-0.5 md:py-1 font-sans shadow-md z-10 ${getBadgeStyles(item.tag)}`}
                    >
                      {item.tag}
                    </span>
                  )}
                  {/* Category Tag */}
                  <span className="absolute bottom-2.5 right-2.5 bg-heritage/90 backdrop-blur-sm text-gold text-[0.5rem] md:text-[0.55rem] tracking-[0.15em] md:tracking-[0.2em] uppercase px-2 py-0.5 md:py-1 font-sans shadow-sm border border-gold/20 z-10">
                    {item.category}
                  </span>
                </div>

                <div className="p-4 md:p-5 flex-1 flex flex-col justify-between overflow-hidden">
                  <div className="overflow-hidden">
                    <div className="flex items-baseline justify-between gap-3 mb-1.5 md:mb-2">
                      <h3 className="font-serif text-base md:text-lg text-heritage-deep leading-tight group-hover:text-spice transition-colors duration-300 truncate">
                        {item.name}
                      </h3>
                      <span className="font-display text-gold text-sm md:text-base font-semibold shrink-0">
                        £{item.price}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground italic leading-snug line-clamp-2 md:line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-gold/10 pt-2 shrink-0">
                    <span className="text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] uppercase text-spice font-sans font-semibold group-hover:text-gold transition-colors duration-300">
                      View details
                    </span>
                    <span className="text-gold transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300 text-xs md:text-sm">
                      →
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CombosSection() {
  return (
    <section className="py-24 bg-cream-dark/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <SectionTitle
          eyebrow="Featured Combos"
          title="Hyderabad Dum Biryani Combos"
          subtitle="Gather around the table and share our curated meal combinations, combining the best of Hyderabadi spice and flavour."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-12">
          {COMBO_ITEMS.map((combo, i) => (
            <Reveal key={combo.name} delay={i * 100} y={28}>
              <article className="heritage-card group h-full flex flex-col overflow-hidden border-gold/50 bg-cream">
                <div className="img-zoom relative aspect-square w-full">
                  <ComboImageMosaic images={combo.imageParts ?? [combo.image]} alt={combo.name} />
                  <span className="absolute top-3 left-3 bg-gold text-heritage-deep text-[0.6rem] tracking-[0.3em] uppercase px-3 py-1 font-sans font-bold shadow-md z-10">
                    COMBO
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between text-center">
                  <div>
                    <h3 className="font-serif text-base text-heritage-deep leading-tight mb-2 group-hover:text-spice transition-colors duration-300">
                      {combo.name}
                    </h3>
                    <p className="text-xs text-muted-foreground italic leading-snug mb-4">
                      {combo.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gold/20 flex flex-col items-center gap-1.5">
                    <span className="font-display text-gold text-lg font-bold">£{combo.price}</span>
                    <span className="text-[0.65rem] tracking-[0.25em] uppercase text-spice font-sans font-semibold group-hover:text-gold transition-colors duration-300">
                      Ask at Counter
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PicklesSection() {
  const pickleCards = [
    { title: "Any Veg Pickle", price: "£5.49", note: "Authentic homemade veg pickle" },
    { title: "Any Non-Veg Pickle", price: "£6.99", note: "Bold, rich, homemade non-veg pickle" },
    { title: "Pack Size", price: "250g", note: "Freshly packed for easy takeaway" },
  ];

  return (
    <section id="pickles" className="py-24 bg-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <SectionTitle
          eyebrow="New to Edinburgh"
          title="Authentic Homemade Pickles"
          subtitle="We are introducing authentic homemade veg and non-veg pickles to Edinburgh, packed with the bold, familiar flavours of home."
        />

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 mt-12 items-start">
          <Reveal y={24}>
            <div className="heritage-card text-cream p-8 md:p-10 h-full relative overflow-hidden bg-black">
              <img
                src="/images/sections/pickles-hero.jpg"
                alt="Authentic Andhra Pickles"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-60 saturate-[1.3] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-heritage-deep/95 via-heritage-deep/45 to-transparent" />
              <div className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <p className="text-xs tracking-[0.35em] uppercase font-sans text-gold mb-4">
                  Homemade Taste
                </p>
                <h3 className="font-display text-3xl md:text-4xl leading-tight">
                  Crafted to bring
                  <span className="block font-serif italic text-gold mt-2">
                    true Andhra flavour
                  </span>
                </h3>
                <p className="mt-6 text-lg text-cream/90 font-serif leading-relaxed">
                  Alongside our biryanis, we are now bringing authentic homemade pickles to
                  Edinburgh. Each jar is made for people who miss the bold kick, warmth, and comfort
                  of real homemade achaar.
                </p>
                <div className="mt-8 rounded-sm border border-gold/30 bg-black/40 px-5 py-4 backdrop-blur-xs">
                  <p className="text-[0.65rem] tracking-[0.3em] uppercase font-sans text-gold">
                    Speciality Item
                  </p>
                  <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="font-serif text-xl text-cream font-medium">
                        Munaga Aku Karam Podi
                      </p>
                      <p className="text-sm text-cream/80">Drumstick Leaves Spice Powder</p>
                    </div>
                    <p className="font-display text-3xl text-gold font-bold">£4.99</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5">
            {pickleCards.map((item, i) => (
              <Reveal key={item.title} delay={i * 110} y={22}>
                <div className="heritage-card bg-cream-dark/30 p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-serif text-2xl text-heritage-deep leading-tight">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground italic">{item.note}</p>
                    </div>
                    <p className="font-display text-3xl text-gold shrink-0">{item.price}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={360} y={22}>
              <div className="border border-gold/35 bg-gold/10 px-6 py-5">
                <p className="text-xs tracking-[0.35em] uppercase font-sans text-spice">
                  Follow for Updates
                </p>
                <p className="mt-3 font-serif text-lg text-heritage-deep">
                  Ask in-store or message us on Instagram for the latest pickle varieties and fresh
                  availability.
                </p>
                <a
                  href="https://www.instagram.com/chowrasta_edi?igsh=MW5kdWZmM2phcDdzZg%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 mt-4 text-sm tracking-[0.22em] uppercase font-sans text-heritage-deep hover:text-spice transition-colors"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-cream">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
                    </svg>
                  </span>
                  Follow @chowrasta_edi
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeliveryPlatforms() {
  return (
    <section className="py-16 bg-cream-dark/20 border-y border-gold/20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl text-heritage-deep tracking-[0.15em] mb-8">
            AVAILABLE TO ORDER ON
          </h2>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-6">
          {ORDER_PLATFORMS.map((platform, i) => (
            <Reveal key={platform.name} delay={i * 100} y={15}>
              <a
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Order Chowrasta on ${platform.name}`}
                className={`group px-8 py-4 bg-cream border border-gold/30 rounded-sm inline-flex items-center justify-center transition-all duration-300 shadow-sm hover:-translate-y-1 hover:shadow-md ${platform.hoverClassName}`}
              >
                <PlatformBrand platform={platform} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function OwnDelivery() {
  return (
    <section className="py-20 bg-heritage-deep text-cream relative overflow-hidden border-b border-gold/20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <Reveal>
          <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-3">
            Direct Delivery
          </p>
        </Reveal>
        
        <Reveal delay={100}>
          <h2 className="font-display text-3xl md:text-4xl text-cream tracking-wide mb-4">
            “We do our own deliveries.”
          </h2>
        </Reveal>
        
        <Reveal delay={200}>
          <Ornament className="my-6 justify-center" />
        </Reveal>
        
        <Reveal delay={300}>
          <p className="text-sm md:text-base text-cream/80 italic leading-relaxed max-w-lg mx-auto mb-10 font-serif">
            Call us directly or send a message on WhatsApp. Enjoy our freshly prepared biryanis and authentic Hyderabadi street food delivered hot and fresh straight to your doorstep.
          </p>
        </Reveal>

        <Reveal delay={400} y={15}>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
            <a
              href="https://wa.me/447769237464?text=Hi%2C%20I'd%20like%20to%20place%20an%20order%20for%20delivery."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#25d366] hover:bg-[#20ba5a] text-white text-xs font-semibold tracking-[0.25em] uppercase font-sans rounded-sm transition-all duration-300 shadow-lg shadow-black/10 inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4.5 h-4.5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.023-5.102-2.884-6.964-1.861-1.862-4.331-2.887-6.965-2.889-5.442 0-9.87 4.42-9.873 9.865-.001 1.716.452 3.39 1.312 4.869l-.993 3.629 3.715-.975zm11.233-5.706c-.302-.15-1.785-.882-2.062-.983-.277-.101-.48-.15-.68.15-.2.3-.777.983-.952 1.185-.176.202-.351.226-.653.076-.301-.15-1.274-.47-2.426-1.5-1.056-.94-1.597-2.083-1.802-2.436-.205-.353-.022-.544.15-.717.155-.154.349-.41.523-.615.174-.205.232-.353.349-.588.117-.235.059-.441-.03-.591-.088-.15-.68-1.638-.931-2.246-.245-.59-.494-.51-.68-.52-.176-.008-.378-.01-.58-.01-.2 0-.526.075-.801.378-.275.301-1.05 1.027-1.05 2.506 0 1.479 1.074 2.912 1.224 3.112.15.2 2.115 3.23 5.124 4.532.715.31 1.273.495 1.708.633.718.228 1.37.196 1.887.118.577-.087 1.785-.73 2.037-1.435.252-.705.252-1.31.176-1.436-.076-.12-.277-.221-.579-.371z" />
              </svg>
              WhatsApp Us
            </a>
            
            <a
              href="tel:+447769237464"
              className="w-full sm:w-auto px-8 py-3.5 bg-gold hover:bg-gold-soft text-heritage-deep text-xs font-semibold tracking-[0.25em] uppercase font-sans rounded-sm transition-all duration-300 shadow-lg shadow-black/10 inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Phone className="w-4.5 h-4.5" />
              Call Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SpiceBand() {
  return (
    <section className="relative h-64 overflow-hidden">
      <img
        src="/images/sections/spices.jpg"
        alt="Whole Indian spices"
        width={1280}
        height={600}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover scale-110 will-change-transform"
      />
      <div className="absolute inset-0 bg-heritage-deep/85" />
      <div className="relative h-full flex items-center justify-center text-center px-6">
        <Reveal>
          <div>
            <p className="font-script text-gold text-3xl md:text-4xl">A pinch of tradition,</p>
            <p className="font-display text-cream text-2xl md:text-3xl tracking-[0.2em] mt-2">
              A LIFETIME OF FLAVOUR
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Catering() {
  return (
    <section id="catering" className="py-24 bg-heritage-deep text-cream relative overflow-hidden">
      <img
        src="/images/sections/charminar.jpg"
        alt=""
        aria-hidden
        width={400}
        height={500}
        loading="lazy"
        className="absolute -left-10 bottom-0 w-72 opacity-[0.06] invert"
      />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center relative">
        <div>
          <Reveal>
            <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-4">
              Catering Services
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              <motion.span
                initial={{ color: "#fef3c7" }}
                whileInView={{ color: "#d4af37" }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                className="inline-block"
              >
                Catering
              </motion.span>{" "}
              for Every Occasion
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <Ornament className="my-6 justify-start" />
          </Reveal>
          <Reveal delay={300}>
            <p className="text-lg text-cream/80 italic leading-relaxed max-w-lg">
              We do catering service for all occasions including birthdays, corporate events,
              weddings, social events, holiday parties and more.
            </p>
          </Reveal>

          {/* Event Chips */}
          <Reveal delay={350} y={15}>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Birthdays",
                "Corporate Events",
                "Weddings",
                "Social Events",
                "Holiday Parties",
                "Family Gatherings",
              ].map((event) => (
                <span
                  key={event}
                  className="px-3.5 py-1.5 border border-gold/40 bg-gold/5 text-gold text-[0.65rem] tracking-widest uppercase font-sans hover:bg-gold/15 transition-all duration-300"
                >
                  {event}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="mt-8 space-y-4 font-serif text-cream/90 text-base">
            <Reveal delay={400} y={12}>
              <div className="flex items-start gap-3">
                <span className="text-gold">✦</span>
                <div>
                  <strong className="font-sans text-xs tracking-wider uppercase text-gold block mb-1">
                    Our Location
                  </strong>
                  346 Gorgie Road, EH11 2QU
                </div>
              </div>
            </Reveal>
            <Reveal delay={500} y={12}>
              <div className="flex items-start gap-3">
                <span className="text-gold">✦</span>
                <div>
                  <strong className="font-sans text-xs tracking-wider uppercase text-gold block mb-1">
                    Contact Phone
                  </strong>
                  <a href="tel:+447769237464" className="hover:text-gold transition-colors">
                    +44 7769 237464
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={600} y={12}>
              <div className="flex items-start gap-3">
                <span className="text-gold">✦</span>
                <div>
                  <strong className="font-sans text-xs tracking-wider uppercase text-gold block mb-1">
                    Mobile & WhatsApp
                  </strong>
                  <a
                    href="https://wa.me/447769237464"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold transition-colors"
                  >
                    +44 7769 237464
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={750}>
            <a
              href="https://wa.me/447769237464?text=Hi%2C%20I'd%20like%20to%20enquire%20about%20catering%20services%20for%20an%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-heritage inline-flex items-center gap-3 mt-10 px-8 py-3.5 bg-gold text-heritage-deep text-xs tracking-[0.3em] uppercase font-sans hover:bg-gold-soft cursor-pointer font-semibold"
            >
              Plan Your Catering
            </a>
          </Reveal>
        </div>
        <Reveal y={32} delay={100}>
          <div className="relative img-zoom">
            <img
              src="/images/sections/catering.jpg"
              alt="Catering buffet spread"
              width={1280}
              height={900}
              loading="lazy"
              className="w-full object-cover gold-border"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [
    "/images/gallery/gallery-biryani-1.jpg",
    "/images/gallery/gallery-starter-1.jpg",
    "/images/gallery/gallery-curry-1.jpg",
    "/images/gallery/gallery-dessert-1.jpg",
    "/images/gallery/gallery-biryani-2.jpg",
    "/images/gallery/gallery-kebab-1.jpg",
    "/images/gallery/gallery-starter-2.jpg",
    "/images/gallery/gallery-traditional-1.jpg",
  ];
  return (
    <section id="gallery" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="Gallery"
          title="A Glimpse of Chowrasta"
          subtitle="Moments from our kitchen, our table, our family."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {imgs.map((src, i) => (
            <Reveal
              key={i}
              delay={i * 80}
              y={20}
              className={`img-zoom group relative ${i === 0 || i === 5 ? "md:row-span-2 md:col-span-2" : ""}`}
            >
              <ImageWithFallback
                src={src}
                alt={`Chowrasta gallery ${i + 1}`}
                className="w-full h-full object-cover aspect-square"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-heritage-deep/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    enquiryType: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (formData.phone.trim().length < 6)
      newErrors.phone = "Please enter a valid phone number";

    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";

    if (!formData.enquiryType) newErrors.enquiryType = "Please select an enquiry type";

    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await submitEnquiry({ data: formData });
      if (response && response.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          businessName: "",
          enquiryType: "",
          message: "",
        });
      } else {
        throw new Error("Failed to submit enquiry. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please check your network and try again.";
      setErrorMessage(msg);
    }
  };

  return (
    <section id="location" className="py-24 bg-cream-dark/40 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <SectionTitle
          eyebrow="Visit & Contact Us"
          title="Find Chowrasta in Edinburgh"
          subtitle="Pull up a chair. The chai is already on."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {[
              {
                t: "Address",
                l1: "346 Gorgie Road",
                l2: "Edinburgh, EH11 2QU",
                icon: <Building className="w-5 h-5 text-gold" />,
              },
              {
                t: "Hours",
                l1: "Monday – Sunday",
                l2: "11:00 AM – 11:00 PM",
                icon: <span className="text-gold text-lg">🕒</span>,
              },
              {
                t: "Contact Info",
                l1: "+44 7769 237464",
                l2: "service@chowrastaedi.com",
                icon: <Mail className="w-5 h-5 text-gold" />,
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 100} y={20}>
                <div className="heritage-card p-6 bg-cream flex items-start gap-4 h-full">
                  <div className="p-3 bg-heritage/5 border border-gold/30 rounded-sm shrink-0">
                    {c.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-[0.65rem] tracking-[0.3em] text-spice uppercase font-sans font-bold mb-1.5">
                      {c.t}
                    </p>
                    {c.t === "Contact Info" ? (
                      <div className="flex flex-col gap-1.5 mt-0.5">
                        <div className="flex items-center">
                          <a
                            href="tel:+447769237464"
                            className="font-serif text-lg text-heritage-deep font-semibold leading-tight hover:text-gold transition-colors inline-flex items-center gap-1.5"
                          >
                            <Phone className="w-4 h-4 text-gold shrink-0" />
                            +44 7769 237464
                          </a>
                        </div>
                        <div className="flex items-center">
                          <a
                            href="https://wa.me/447769237464"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-sans text-xs font-semibold text-[#25d366] hover:text-[#20ba5a] transition-colors inline-flex items-center gap-1.5"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="w-4 h-4 fill-current shrink-0"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.023-5.102-2.884-6.964-1.861-1.862-4.331-2.887-6.965-2.889-5.442 0-9.87 4.42-9.873 9.865-.001 1.716.452 3.39 1.312 4.869l-.993 3.629 3.715-.975zm11.233-5.706c-.302-.15-1.785-.882-2.062-.983-.277-.101-.48-.15-.68.15-.2.3-.777.983-.952 1.185-.176.202-.351.226-.653.076-.301-.15-1.274-.47-2.426-1.5-1.056-.94-1.597-2.083-1.802-2.436-.205-.353-.022-.544.15-.717.155-.154.349-.41.523-.615.174-.205.232-.353.349-.588.117-.235.059-.441-.03-.591-.088-.15-.68-1.638-.931-2.246-.245-.59-.494-.51-.68-.52-.176-.008-.378-.01-.58-.01-.2 0-.526.075-.801.378-.275.301-1.05 1.027-1.05 2.506 0 1.479 1.074 2.912 1.224 3.112.15.2 2.115 3.23 5.124 4.532.715.31 1.273.495 1.708.633.718.228 1.37.196 1.887.118.577-.087 1.785-.73 2.037-1.435.252-.705.252-1.31.176-1.436-.076-.12-.277-.221-.579-.371z" />
                            </svg>
                            WhatsApp Chat
                          </a>
                        </div>
                        <div className="flex items-center font-serif text-sm md:text-base text-muted-foreground flex-col items-start gap-1.5">
                          <a
                            href="mailto:service@chowrastaedi.com"
                            className="hover:text-gold transition-colors inline-flex items-center gap-1.5"
                          >
                            <Mail className="w-4 h-4 text-gold shrink-0" />
                            service@chowrastaedi.com
                          </a>
                          <a
                            href="mailto:chowrastaedi07@gmail.com"
                            className="hover:text-gold transition-colors inline-flex items-center gap-1.5"
                          >
                            <Mail className="w-4 h-4 text-gold shrink-0" />
                            chowrastaedi07@gmail.com
                          </a>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="font-serif text-lg text-heritage-deep font-semibold leading-tight">
                          {c.l1}
                        </p>
                        <p className="font-serif text-base text-muted-foreground mt-0.5">{c.l2}</p>
                      </>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={300} y={20}>
              <div className="p-6 border border-gold/30 rounded-sm bg-heritage text-cream relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:12px_12px]" />
                <h4 className="font-display text-lg text-gold mb-2">Corporate & Catering</h4>
                <p className="text-sm text-cream/80 leading-relaxed font-serif italic">
                  We offer premium Hyderabadi catering services, private party hosting, and office
                  lunches. Fill out our business enquiry form, and our event coordination team will
                  get in touch with custom solutions.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7">
            <Reveal delay={150} y={20}>
              <div className="heritage-card bg-cream p-8 md:p-10 border-gold/45 shadow-xl relative overflow-hidden">
                <h3 className="font-display text-xl text-heritage-deep mb-1">
                  Business Enquiry & Contact Form
                </h3>
                <p className="text-xs tracking-wider text-gold uppercase font-sans mb-8">
                  For catering, event bookings, bulk orders, and enquiries
                </p>

                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle2 className="w-16 h-16 text-[#25D366] mx-auto mb-4" />
                    <h4 className="font-display text-lg text-heritage-deep mb-2">Message Sent!</h4>
                    <p className="font-sans text-sm text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
                      Your enquiry has been successfully delivered. Our business team will review
                      your message and reach out to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="btn-heritage px-6 py-2.5 bg-heritage text-cream text-xs font-semibold tracking-widest uppercase font-sans cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {status === "error" && (
                      <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex gap-3 items-start rounded-r-md">
                        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold">Submission failed:</span> {errorMessage}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-widest text-heritage-deep font-sans font-semibold">
                          Your Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-2 bg-cream-dark/15 border rounded-sm text-sm text-heritage-deep focus:border-gold focus:outline-none transition-all duration-300 font-sans ${errors.name ? "border-red-500 focus:border-red-500" : "border-gold/30"}`}
                            placeholder="e.g. John Doe"
                          />
                        </div>
                        {errors.name && (
                          <p className="text-[0.7rem] text-red-500 font-sans">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-widest text-heritage-deep font-sans font-semibold">
                          Business Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-2 bg-cream-dark/15 border rounded-sm text-sm text-heritage-deep focus:border-gold focus:outline-none transition-all duration-300 font-sans ${errors.email ? "border-red-500 focus:border-red-500" : "border-gold/30"}`}
                            placeholder="e.g. name@company.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-[0.7rem] text-red-500 font-sans">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-widest text-heritage-deep font-sans font-semibold">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-2 bg-cream-dark/15 border rounded-sm text-sm text-heritage-deep focus:border-gold focus:outline-none transition-all duration-300 font-sans ${errors.phone ? "border-red-500 focus:border-red-500" : "border-gold/30"}`}
                            placeholder="e.g. 07123 456789"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-[0.7rem] text-red-500 font-sans">{errors.phone}</p>
                        )}
                      </div>

                      {/* Business Name */}
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-widest text-heritage-deep font-sans font-semibold">
                          Company / Business Name
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
                          <input
                            type="text"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-2 bg-cream-dark/15 border rounded-sm text-sm text-heritage-deep focus:border-gold focus:outline-none transition-all duration-300 font-sans ${errors.businessName ? "border-red-500 focus:border-red-500" : "border-gold/30"}`}
                            placeholder="e.g. Acme Corp"
                          />
                        </div>
                        {errors.businessName && (
                          <p className="text-[0.7rem] text-red-500 font-sans">
                            {errors.businessName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Enquiry Type */}
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-widest text-heritage-deep font-sans font-semibold">
                        Enquiry Type
                      </label>
                      <div className="relative">
                        <select
                          name="enquiryType"
                          value={formData.enquiryType}
                          onChange={handleChange}
                          className={`w-full pl-4 pr-10 py-2 bg-cream border rounded-sm text-sm text-heritage-deep focus:border-gold focus:outline-none transition-all duration-300 font-sans appearance-none ${errors.enquiryType ? "border-red-500 focus:border-red-500" : "border-gold/30"}`}
                        >
                          <option value="">-- Select an option --</option>
                          <option value="Catering Service">
                            Catering Service (Office / Private)
                          </option>
                          <option value="Corporate Events">Corporate Event Booking</option>
                          <option value="Bulk Orders">Bulk / Regular Business Orders</option>
                          <option value="Partnerships & Collaborations">
                            Partnership & Collaborations
                          </option>
                          <option value="Feedback & Suggestions">Feedback & Suggestions</option>
                          <option value="Other Business Inquiries">Other Business Inquiry</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gold">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                      {errors.enquiryType && (
                        <p className="text-[0.7rem] text-red-500 font-sans">{errors.enquiryType}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-widest text-heritage-deep font-sans font-semibold">
                        Your Message
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-gold" />
                        <textarea
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-2.5 bg-cream-dark/15 border rounded-sm text-sm text-heritage-deep focus:border-gold focus:outline-none transition-all duration-300 font-sans resize-none ${errors.message ? "border-red-500 focus:border-red-500" : "border-gold/30"}`}
                          placeholder="Details about your catering needs, group size, dates or other requirements..."
                        />
                      </div>
                      {errors.message && (
                        <p className="text-[0.7rem] text-red-500 font-sans">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="btn-heritage w-full py-3 bg-heritage text-cream text-xs font-semibold tracking-[0.25em] uppercase font-sans flex items-center justify-center gap-2 cursor-pointer mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-gold" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-gold" />
                          <span>Submit Enquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-heritage-deep text-cream pt-16 pb-8 relative overflow-hidden">
      <img
        src="/images/sections/charminar.jpg"
        alt=""
        aria-hidden
        width={400}
        height={500}
        loading="lazy"
        className="absolute right-0 bottom-0 w-80 opacity-[0.06] invert"
      />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 relative">
        <div>
          <Logo light size="sm" />
          <p className="font-script text-gold text-2xl mt-4">Where spice meets flavor</p>
          <p className="text-sm text-cream/70 mt-3 leading-relaxed">
            Serving authentic Hyderabadi Dum Biryani and traditional street food in the heart of
            Edinburgh.
          </p>
          <a
            href="https://www.instagram.com/chowrasta_edi?igsh=MW5kdWZmM2phcDdzZg%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-5 text-sm tracking-[0.2em] uppercase font-sans text-gold hover:text-gold-soft transition-colors"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/35">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </span>
            Follow us on Instagram
          </a>
        </div>
        <div>
          <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-4">Quick Links</p>
          <ul className="space-y-2 font-serif text-cream/80">
            <li>
              <a href="#home" className="hover:text-gold">
                Home
              </a>
            </li>
            <li>
              <a href="#story" className="hover:text-gold">
                Our Story
              </a>
            </li>
            <li>
              <a href="#menu" className="hover:text-gold">
                Menu
              </a>
            </li>
            <li>
              <a href="#pickles" className="hover:text-gold">
                Pickles
              </a>
            </li>
            <li>
              <a href="#catering" className="hover:text-gold">
                Catering
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-gold">
                Gallery
              </a>
            </li>
            <li>
              <a href="#location" className="hover:text-gold">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-4">Contact</p>
          <p className="font-serif text-cream/80">
            346 Gorgie Road,
            <br />
            Edinburgh, EH11 2QU
          </p>
          <p className="font-serif text-cream/80 mt-2">
            <a href="tel:+447769237464" className="hover:text-gold transition-colors">
              +44 7769 237464
            </a>
          </p>
          <p className="font-serif text-cream/80">
            <a href="mailto:service@chowrastaedi.com" className="hover:text-gold transition-colors">
              service@chowrastaedi.com
            </a>
          </p>
          <p className="font-serif text-cream/80">
            <a href="mailto:chowrastaedi07@gmail.com" className="hover:text-gold transition-colors">
              chowrastaedi07@gmail.com
            </a>
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-4">
            Order Online
          </p>
          <p className="font-serif text-cream/80 mb-3">Available on your favourite platforms.</p>
          <div className="flex flex-wrap gap-2 font-display text-[0.65rem] tracking-[0.18em] uppercase">
            <a
              href="https://www.ubereats.com/store/chowrasta/fZnbr7ViSjy8pzTnn0mmZg"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 border border-gold/40 text-gold hover:bg-gold/5 transition-colors duration-300 rounded-sm"
            >
              Uber Eats
            </a>
            <a
              href="https://www.just-eat.co.uk/restaurants-chowrasta-edinburgh/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 border border-gold/40 text-gold hover:bg-gold/5 transition-colors duration-300 rounded-sm"
            >
              Just Eat
            </a>
            <a
              href="https://deliveroo.co.uk/menu/edinburgh/slateford-and-gorgie/chowrasta"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 border border-gold/40 text-gold hover:bg-gold/5 transition-colors duration-300 rounded-sm"
            >
              Deliveroo
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-gold/20 text-center text-xs tracking-[0.3em] uppercase text-cream/50 font-sans relative">
        © {new Date().getFullYear()} Chowrasta Edinburgh — Made with love & saffron
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/447769237464?text=Hi%2C%20I'd%20like%20to%20enquire%20about%20your%20menu%20and%20catering."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-22 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group"
      aria-label="Chat with us on WhatsApp"
    >
      <span className="absolute right-16 bg-cream border border-gold/45 text-heritage-deep text-[0.7rem] tracking-wider uppercase font-sans font-semibold py-2 px-4 rounded shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat with us
      </span>
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.023-5.102-2.884-6.964-1.861-1.862-4.331-2.887-6.965-2.889-5.442 0-9.87 4.42-9.873 9.865-.001 1.716.452 3.39 1.312 4.869l-.993 3.629 3.715-.975zm11.233-5.706c-.302-.15-1.785-.882-2.062-.983-.277-.101-.48-.15-.68.15-.2.3-.777.983-.952 1.185-.176.202-.351.226-.653.076-.301-.15-1.274-.47-2.426-1.5-1.056-.94-1.597-2.083-1.802-2.436-.205-.353-.022-.544.15-.717.155-.154.349-.41.523-.615.174-.205.232-.353.349-.588.117-.235.059-.441-.03-.591-.088-.15-.68-1.638-.931-2.246-.245-.59-.494-.51-.68-.52-.176-.008-.378-.01-.58-.01-.2 0-.526.075-.801.378-.275.301-1.05 1.027-1.05 2.506 0 1.479 1.074 2.912 1.224 3.112.15.2 2.115 3.23 5.124 4.532.715.31 1.273.495 1.708.633.718.228 1.37.196 1.887.118.577-.087 1.785-.73 2.037-1.435.252-.705.252-1.31.176-1.436-.076-.12-.277-.221-.579-.371z" />
      </svg>
    </a>
  );
}

interface LightboxModalProps {
  selectedItem: MenuItem | null;
  onClose: () => void;
}

function LightboxModal({ selectedItem, onClose }: LightboxModalProps) {
  const getBadgeStyles = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "spicy":
        return "bg-spice text-cream border border-spice";
      case "popular":
        return "bg-gold text-heritage-deep border border-gold font-bold";
      case "dum special":
        return "bg-heritage text-gold border border-gold font-bold";
      case "student favourite":
        return "bg-cream-dark/95 text-heritage-deep border border-gold/40 font-medium";
      default:
        return "bg-heritage/90 text-cream";
    }
  };

  const handleWhatsAppEnquiry = () => {
    if (!selectedItem) return;
    const text = encodeURIComponent(
      `Hi, I'm interested in ordering the "${selectedItem.name}" (£${selectedItem.price}) from your menu. Can you please confirm its availability?`,
    );
    window.open(`https://wa.me/447769237464?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {selectedItem && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          {/* Backdrop with fade-in and backdrop-blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal box with scale-up and fade-in */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-3xl bg-cream border border-gold/45 rounded-sm shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[85vh] md:max-h-[500px]"
          >
            {/* Close button with large hit area (at least 44px x 44px) */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-30 p-2 text-cream md:text-heritage-deep hover:text-spice bg-black/40 md:bg-cream/80 hover:bg-gold/10 border border-cream/20 md:border-gold/20 rounded-full transition-all duration-300 w-11 h-11 flex items-center justify-center cursor-pointer shadow-md"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Food Image */}
            <div className="relative w-full md:w-1/2 h-52 sm:h-64 md:h-full shrink-0 overflow-hidden bg-black">
              <ImageWithFallback
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
              />
              {selectedItem.tag && (
                <span
                  className={`absolute top-4 left-4 text-[0.6rem] tracking-[0.3em] uppercase px-3 py-1 font-sans shadow-md z-10 ${getBadgeStyles(selectedItem.tag)}`}
                >
                  {selectedItem.tag}
                </span>
              )}
              <span className="absolute bottom-4 left-4 bg-heritage/90 backdrop-blur-xs text-gold text-[0.55rem] tracking-[0.2em] uppercase px-2.5 py-1 font-sans shadow-sm border border-gold/20 z-10">
                {selectedItem.category}
              </span>
            </div>

            {/* Right Column: Details */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between overflow-y-auto bg-cream">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-serif text-2xl md:text-3xl text-heritage-deep leading-tight">
                    {selectedItem.name}
                  </h3>
                  <span className="font-display text-gold text-xl md:text-2xl font-bold shrink-0 mt-0.5">
                    £{selectedItem.price}
                  </span>
                </div>

                {/* Divider */}
                <div className="w-12 h-[2px] bg-gold mb-6" />

                <p className="font-serif text-sm md:text-base text-muted-foreground italic leading-relaxed mb-6">
                  {selectedItem.description}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-gold/20">
                <button
                  onClick={handleWhatsAppEnquiry}
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-5 rounded-sm text-xs tracking-[0.2em] uppercase font-sans font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.023-5.102-2.884-6.964-1.861-1.862-4.331-2.887-6.965-2.889-5.442 0-9.87 4.42-9.873 9.865-.001 1.716.452 3.39 1.312 4.869l-.993 3.629 3.715-.975zm11.233-5.706c-.302-.15-1.785-.882-2.062-.983-.277-.101-.48-.15-.68.15-.2.3-.777.983-.952 1.185-.176.202-.351.226-.653.076-.301-.15-1.274-.47-2.426-1.5-1.056-.94-1.597-2.083-1.802-2.436-.205-.353-.022-.544.15-.717.155-.154.349-.41.523-.615.174-.205.232-.353.349-.588.117-.235.059-.441-.03-.591-.088-.15-.68-1.638-.931-2.246-.245-.59-.494-.51-.68-.52-.176-.008-.378-.01-.58-.01-.2 0-.526.075-.801.378-.275.301-1.05 1.027-1.05 2.506 0 1.479 1.074 2.912 1.224 3.112.15.2 2.115 3.23 5.124 4.532.715.31 1.273.495 1.708.633.718.228 1.37.196 1.887.118.577-.087 1.785-.73 2.037-1.435.252-.705.252-1.31.176-1.436-.076-.12-.277-.221-.579-.371z" />
                  </svg>
                  Enquire on WhatsApp
                </button>
                <a
                  href="#location"
                  onClick={(e) => {
                    onClose();
                    const locationSection = document.getElementById("location");
                    if (locationSection) {
                      e.preventDefault();
                      locationSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full border border-gold hover:bg-gold/10 text-heritage-deep py-3 px-5 rounded-sm text-xs tracking-[0.2em] uppercase font-sans font-bold flex items-center justify-center transition-all duration-300 cursor-pointer text-center"
                >
                  Business / Catering Enquiry
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
