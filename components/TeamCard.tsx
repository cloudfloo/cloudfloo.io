'use client';

import LanguageAwareLink from '@/components/LanguageAwareLink';
import { placeholders, DEFAULT_BLUR } from "@/data/placeholders";
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Linkedin } from 'lucide-react';
import { TeamMember } from '@/data/team';
import { useLanguage } from '@/contexts/LanguageContext';

interface TeamCardProps {
  person: TeamMember;
}

export default function TeamCard({ person }: TeamCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="glass border-gray-700 hover:border-neon/50 transition-all duration-500 group cursor-pointer overflow-hidden h-full rounded-2xl shadow-md">
        <CardHeader className="p-4">
          <LanguageAwareLink href={`/team/${person.slug}`} className="block">
            <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
              >
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={placeholders[person.image] ?? DEFAULT_BLUR}
                />
              </motion.div>
              
              {/* Overlay on hover */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium flex items-center gap-2">
                    {t('team.member.viewFullProfile')}
                    <ExternalLink className="w-3 h-3" />
                  </p>
                </div>
              </motion.div>
            </div>
          </LanguageAwareLink>
          
          <CardTitle className="text-xl text-white group-hover:text-neon transition-colors duration-300">
            {person.name}
          </CardTitle>
          <p className="text-neon font-medium text-sm">
            {t(`team.members.${person.slug}.title`) || person.title}
          </p>
        </CardHeader>
        
        <CardContent className="p-4 pt-0 space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            {t(`team.members.${person.slug}.shortBio`) || person.shortBio}
          </p>
          
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white">{t('team.member.expertise')}:</h4>
            <div className="flex flex-wrap gap-1">
              {person.expertise.slice(0, 3).map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs bg-gradient-neon/10 text-neon border-neon/20"
                >
                  {skill}
                </Badge>
              ))}
              {person.expertise.length > 3 && (
                <Badge 
                  variant="outline" 
                  className="text-xs bg-gray-700/50 text-gray-300 border-gray-600"
                >
                  +{person.expertise.length - 3}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <div className="flex items-center gap-2">
              {person.linkedin && (
                <motion.a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn ${person.name}`}
                  className="w-8 h-8 glass rounded-full flex items-center justify-center hover:bg-neon/20 transition-colors duration-300 group/social"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin className="w-4 h-4 text-gray-400 group-hover/social:text-neon transition-colors duration-300" />
                </motion.a>
              )}
              
              {person.github && (
                <motion.a
                  href={person.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub ${person.name}`}
                  className="w-8 h-8 glass rounded-full flex items-center justify-center hover:bg-neon/20 transition-colors duration-300 group/social"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4 text-gray-400 group-hover/social:text-neon transition-colors duration-300" />
                </motion.a>
              )}
            </div>
            
            <LanguageAwareLink href={`/team/${person.slug}`}>
              <motion.button
                className="text-xs text-gray-400 hover:text-neon transition-colors duration-300 flex items-center gap-1"
                whileHover={{ x: 2 }}
                onClick={(e) => e.stopPropagation()}
              >
                {t('team.member.viewProfile')}
                <ExternalLink className="w-3 h-3" />
              </motion.button>
            </LanguageAwareLink>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}