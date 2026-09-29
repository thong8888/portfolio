import StatusBar from "@/components/StatusBar";
import Hero from "@/components/Hero";
import Identity from "@/components/Identity";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Career from "@/components/Career";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ToastHost from "@/components/ToastHost";
import RevealScanner from "@/components/RevealScanner";

export default function Home() {
  return (
    <>
      <RevealScanner />
      <StatusBar />
      <Hero />
      <main className="container">
        <Identity />
        <Skills />
        <Certifications />
        <Career />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ToastHost />
    </>
  );
}