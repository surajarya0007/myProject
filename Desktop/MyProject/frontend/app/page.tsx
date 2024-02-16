import About from "../components/About";
import CTA from "../components/CTA";
import Event from "../components/Event";
import Gallery from "../components/Gallery";
import HeroHeader from "../components/HeroHeader";
import Story from "../components/Story";

export default function Home() {
  return (
    <main className="pt-20">
      <HeroHeader />
      <About />
      <Story />
      <Event />
      <Gallery />
      <CTA />
    </main>
  );
}
