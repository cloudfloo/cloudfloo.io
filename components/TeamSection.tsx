'use client';

import TeamCard from './TeamCard';
import { team } from '@/data/team';

export default function TeamSection() {
  return (
    <section id="team" className="py-16 bg-black/30">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          Our <span className="text-neon">team</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {team.map(person => (
            <TeamCard key={person.slug} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
