import HeroSection from '@/components/sections/hero-section';
import CampInfoSection from '@/components/sections/camp-info-section';
import AboutUsSection from '@/components/sections/about-us-section';
import SignUpSection from '@/components/sections/sign-up-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection id="hero" />
      <CampInfoSection id="camp-info" />
      <AboutUsSection id="about-us" />
      <SignUpSection id="sign-up" />
    </div>
  );
}
