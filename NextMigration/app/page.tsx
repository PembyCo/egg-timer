import React from 'react';
import Header from "../components/Header";
import EggTimer from "../components/EggTimer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex flex-col items-center p-4">
      <Header />
      <EggTimer />
    </main>
  );
} 