import MainLayout from "../layouts/MainLayout";
import Hero from "../components/hero/Hero";
import About from "../components/about/About";
import Events from "../components/events/Events";
import Team from "../components/team/Team";
import Contact from "../components/contact/Contact";
import { SECTION_IDS } from "../utils/constants";

/**
 * Home Page Component
 *
 * Clean root composition for the single-page experience.
 * Section animation, states, and logic are encapsulated in their respective components.
 */
const Home = () => {
  return (
    <MainLayout>
      <main id="main-content" className="relative w-full overflow-hidden">
        <section id={SECTION_IDS.HOME}>
          <Hero />
        </section>

        <section id={SECTION_IDS.ABOUT}>
          <About />
        </section>

        <section id={SECTION_IDS.EVENTS}>
          <Events />
        </section>

        <section id={SECTION_IDS.TEAM}>
          <Team />
        </section>

        <section id={SECTION_IDS.CONTACT}>
          <Contact />
        </section>
      </main>

    </MainLayout>
  );
};

export default Home;