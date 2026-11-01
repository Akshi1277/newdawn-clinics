import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Treatments } from "@/components/sections/Treatments";
import { Featured } from "@/components/sections/Featured";
import { Approach } from "@/components/sections/Approach";
import { Transformation } from "@/components/sections/Transformation";
import { Doctor } from "@/components/sections/Doctor";
import { Journey } from "@/components/sections/Journey";
import { Clinic } from "@/components/sections/Clinic";
import { Commitment } from "@/components/sections/Commitment";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Location } from "@/components/sections/Location";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Treatments />
      <Featured />
      <Approach />
      <Transformation />
      <Doctor />
      <Journey />
      <Clinic />
      <Commitment />
      <Faq />
      <Contact />
      <Location />
    </>
  );
}
