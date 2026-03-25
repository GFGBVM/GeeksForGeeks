import Footer from "@/app/components/layout/Footer";
import { Navbar } from "@/app/components/layout/Navbar";
import MemberCard from "@/app/components/cards/Team";
import Event from "@/app/components/sections/Event";
import About from "../components/sections/About";
import Contact from "../components/sections/Contact";
import Hero from "../components/sections/Hero";
import GFGSeparator from "../components/ui/GFGSeparator";




export default function Home() {
  const members = [
    {
      name: "Prof. Prachi Shah",
      role: "Faculty Advisor",
      image: "/team/Prachi_shah.jpeg",
      linkedin: "https://www.linkedin.com/in/prachi-shah-56911158/",
    },
    {
      name: "Kavya Zinzuvadiya",
      role: "Chairperson",
      image: "/team/Kavya_Chairperson.jpg",
      instagram: "https://www.instagram.com/kavya.z25/",
      linkedin: "https://www.linkedin.com/in/kavya-zinzuvadiya-19340a2bb/",
    },
    {
      name: "Vihaa Shah",
      role: "Vice-Chairperson",
      image: "/team/Vihaa_vicechair.jpg",
      instagram: "https://www.instagram.com/viiiihaaaa/",
      linkedin: "https://www.linkedin.com/in/vihaa-shah-98b71128a",
    },
    {
      name: "Haraprasad Mahapatra",
      role: "Tech Manager",
      image: "/team/haraprasad.jpg",
      linkedin: "https://www.linkedin.com/in/haraprasad-mahapatra-549a1a280/",
      github: "https://github.com/Haraprasad-workspace",
    },
    {
      name: "Patel Arya",
      role: "Content Creator",
      image: "/team/Patel_Arya_content_creator.jpg",
      linkedin: "https://www.linkedin.com/in/arya-patel-205aa0326/",
      instagram: "https://www.instagram.com/Arya_p_16/",
    },
    {
      name: "Megh Patel",
      role: "Graphics Supervisor",
      image: "/team/Megh_Patel_Graphic_Superviser.png",
      linkedin: "https://www.linkedin.com/in/meghpatel007/",
      instagram: "https://www.instagram.com/_meghpatel_007/",
      github: "https://github.com/MeghPatel-007",
    },
    {
      name: "Prachi Patel",
      role: "Graphics Designer",
      image: "/team/Prachi.jpeg",
      linkedin: "https://www.linkedin.com/in/prachi-patel-000154325/",
      instagram: "https://www.instagram.com/pra_chiiii1602/",
    },
    {
      name: "Parv Luhar",
      role: "Event Coordinator",
      image: "/team/ParvLuhar_eventCoordinator1.jpg",
      linkedin: "https://www.linkedin.com/in/parvluhar2010/",
      instagram: "https://www.instagram.com/parv_luhar20/",
    },
    {
      name: "Jeet Vasoya",
      role: "Marketing Coordinator",
      image: "/team/Jeet_Vasoya.png",
      linkedin: "https://www.linkedin.com/in/jeet-vasoya-071397323/",
      instagram: "https://www.instagram.com/j_d_vasoya_21/",
    },
    {
      name: "Dhanvi Upadhyay",
      role: "Outreach Specialist",
      image: "/team/Dhanvi.png",
      linkedin: "https://www.linkedin.com/in/dhanvi-upadhyay-9305a736b/",
      instagram: "https://www.instagram.com/dhanvi_upadhyay/",
    },
    {
      name: "Pratibha Indravath",
      role: "Social Media Manager",
      image: "/team/Pratibha_Indravath__Social_Media_Manager.png",
      linkedin: "https://www.linkedin.com/in/pratibha-indravath-b5b51a33b/",
      instagram: "https://www.instagram.com/pratibha_indravath/",
    },
    {
      name: "Jaydevsinh Mahida",
      role: "Branch Representative Head",
      image: "/team/Jaydevsinh_Mahida_BR_HEAD.jpg",
      linkedin: "https://www.linkedin.com/in/jaydevsinh-mahida-0a93a2339/",
      instagram: "https://www.instagram.com/jaydemahida13/",
      github: "https://github.com/JaydevMahida",
    },
  ];

  return (
    <div className="font-roboto">
      
      <Hero />
      <GFGSeparator />
      {/* About */}
      <About />

      <GFGSeparator />

      {/* Events */}
      <section id = "Event" className="py-5 bg-gray-50 dark:bg-neutral-900">
        <Event />
      </section>

      <GFGSeparator />

      {/* Team */}
      <section id="Team"  className="py-5" >
        <section className="py-15 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#0F9D58] text-center mb-12">
            Our Team
            <p className="mt-1 text-center text-sm md:text-base italic text-neutral-600 dark:text-neutral-400">
      “Individually, we grow. Together, we build a stronger community.”
    </p>
          </h1>
          

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {members.map((member) => (
              <MemberCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>
      </section>

      <GFGSeparator />

      {/* Contact */}
      <Contact />
          <GFGSeparator />
      <Footer />
    </div>
  );
}
