import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Compass } from "@/components/sections/Compass";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Principles } from "@/components/sections/Principles";
import { Signals } from "@/components/sections/Signals";
import { Stack } from "@/components/sections/Stack";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <Hero />
      <Compass />
      <About />
      <Experience />
      <Work />
      <Principles />
      <Stack />
      <Signals />
      <Contact />
      <Footer />
    </>
  );
}
