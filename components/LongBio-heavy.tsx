'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Award, BookOpen, Globe, Heart, ExternalLink } from 'lucide-react';
import { TeamMember } from '@/data/team';
import { useLanguage } from '@/contexts/LanguageContext';

interface LongBioProps {
  person: TeamMember;
}

export default function LongBio({ person }: LongBioProps) {
  const { t } = useLanguage();

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header Card */}
            <Card className="glass border-gray-700 overflow-hidden mb-8">
              <CardHeader className="pb-0">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <motion.div
                    className="relative w-64 h-64 mx-auto lg:mx-0 flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover rounded-xl"
                      sizes="(max-width: 768px) 100vw, 256px"
                      priority
                    />
                  </motion.div>
                  
                  <div className="flex-1 text-center lg:text-left">
                    <CardTitle className="text-4xl lg:text-5xl text-white mb-3">{person.name}</CardTitle>
                    <p className="text-2xl lg:text-3xl text-neon font-semibold mb-6">{person.title}</p>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center lg:text-left">
                        <div className="text-2xl font-bold text-neon">{person.achievements.length}+</div>
                        <div className="text-sm text-gray-400">{t('team.member.keyAchievements')}</div>
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-2xl font-bold text-neon">{person.experience.length}</div>
                        <div className="text-sm text-gray-400">{t('team.member.companies')}</div>
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="text-2xl font-bold text-neon">{person.technologies.primary.length + person.technologies.secondary.length}+</div>
                        <div className="text-sm text-gray-400">{t('team.member.technologies')}</div>
                      </div>
                    </div>
                    
                    {/* Social Links */}
                    <div className="flex items-center gap-4 justify-center lg:justify-start">
                      {person.linkedin && (
                        <motion.a
                          href={person.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-neon/20 transition-colors duration-300 group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-neon transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">LinkedIn</span>
                          <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-neon transition-colors duration-300" />
                        </motion.a>
                      )}
                      
                      {person.github && (
                        <motion.a
                          href={person.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-neon/20 transition-colors duration-300 group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-neon transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">GitHub</span>
                          <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-neon transition-colors duration-300" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Full Bio */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="glass border-gray-700">
                    <CardHeader>
                      <CardTitle id="about-member" className="text-2xl text-white flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-neon" />
                        {t('team.member.about')} {person.name.split(' ')[0]}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-gray-300 leading-relaxed space-y-4">
                        {person.fullBio.split('\n\n').map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Experience */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card className="glass border-gray-700">
                    <CardHeader>
                      <CardTitle id="professional-experience" className="text-2xl text-white flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-neon" />
                        {t('team.member.professionalExperience')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {person.experience.map((exp, index) => (
                          <div key={index} className="relative pl-6 border-l-2 border-neon/30 last:border-l-0">
                            <div className="absolute -left-2 top-0 w-4 h-4 bg-neon rounded-full"></div>
                            <div className="mb-2">
                              <h4 className="text-lg font-semibold text-white">{exp.role}</h4>
                              <p className="text-neon font-medium">{exp.company}</p>
                              <p className="text-sm text-gray-400">{exp.duration}</p>
                            </div>
                            <ul className="space-y-1">
                              {exp.highlights.map((highlight, hIndex) => (
                                <li key={hIndex} className="text-sm text-gray-300 flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-neon rounded-full mt-2 flex-shrink-0"></div>
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Key Achievements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Card className="glass border-gray-700">
                    <CardHeader>
                      <CardTitle id="key-achievements-member" className="text-2xl text-white flex items-center gap-2">
                        <Award className="w-6 h-6 text-neon" />
                        {t('team.member.keyAchievements')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {person.achievements.map((achievement, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start gap-3 p-4 glass rounded-lg border border-gray-700 hover:border-neon/50 transition-colors duration-300"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.7 }}
                          >
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-300 text-sm">{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Expertise */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="glass border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">{t('team.member.coreExpertise')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {person.expertise.map((skill, index) => (
                          <Badge
                            key={index}
                            className="bg-gradient-neon/10 text-neon border border-neon/20 hover:bg-gradient-neon/20 transition-colors duration-300"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card className="glass border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg text-white">{t('team.member.technologies')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">{t('team.member.primary')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {person.technologies.primary.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-neon/20 text-neon text-xs rounded-full border border-neon/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">{t('team.member.secondary')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {person.technologies.secondary.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Education */}
                {person.education && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Card className="glass border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-lg text-white">{t('team.member.education')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {person.education.map((edu, index) => (
                            <div key={index} className="border-l-2 border-neon/30 pl-4">
                              <h4 className="text-sm font-semibold text-white">{edu.degree}</h4>
                              <p className="text-sm text-gray-300">{edu.institution}</p>
                              {edu.year && <p className="text-xs text-gray-400">{edu.year}</p>}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Languages */}
                {person.languages && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Card className="glass border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                          <Globe className="w-5 h-5 text-neon" />
                          {t('team.member.languages')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {person.languages.map((language, index) => (
                            <div key={index} className="text-sm text-gray-300">
                              {language}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Interests */}
                {person.interests && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <Card className="glass border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                          <Heart className="w-5 h-5 text-neon" />
                          {t('team.member.interests')}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {person.interests.map((interest, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              className="text-center pt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="glass border-gray-700">
                <CardContent className="p-8">
                  <h3 id="working-with-team" className="text-2xl font-bold text-white mb-4">
                    {t('team.member.workingWithTeam').replace('{name}', person.name.split(' ')[0])}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {t('team.member.workingDescription')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-gradient-neon text-white hover:scale-105 transition-transform duration-200 btn-accessible">
                      {t('team.cta.startProject')}
                    </Button>
                    <Button variant="outline" className="border-neon text-neon hover:bg-neon/10 btn-accessible">
                      {t('team.member.scheduleConsultation')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}