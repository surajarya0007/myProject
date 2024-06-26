import About from "../components/About";
import CTA from "../components/CTA";
import Events from "../components/Events";
import Gallery from "../components/Gallery";
import HeroHeader from "../components/HeroHeader";
import Story from "../components/Story";

export default function Home() {
  return (
    <main className="pt-20">
      <HeroHeader />
      <About />
      <Story />
      <Events />
      <Gallery />
      <CTA />
    </main>
  );
}
