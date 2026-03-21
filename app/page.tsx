"use client";

import { Contact } from "@/components/Contact";
import { Diensten } from "@/components/Diensten";
import { Hero } from "@/components/Hero";
import { InstagramFeed } from "@/components/InstagramFeed";
import { OverOns } from "@/components/OverOns";

export default function Home() {
  return (
    <>
      <Hero />
      <main className="relative z-20 bg-[var(--bg-primary)]">
        <div className="diagonal-divider" />
        <Diensten />
        <OverOns />
        <InstagramFeed />
        <Contact />
      </main>
    </>
  );
}
