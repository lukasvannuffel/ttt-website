"use client";

import { Contact } from "@/components/Contact";
import { Diensten } from "@/components/Diensten";
import { Hero } from "@/components/Hero";
import { OverOns } from "@/components/OverOns";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="diagonal-divider" />
      <Diensten />
      <OverOns />
      <Contact />
    </>
  );
}
