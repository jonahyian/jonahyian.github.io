import React from 'react';
import { User, Phone, Mail, MapPin, Download, Briefcase, Cpu, GraduationCap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CV_DATA } from '@/data/cvData';
import { UI_TEXT } from '@/data/siteData';

export default function ResumePage({ lang }) {
  const t = UI_TEXT[lang];

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header Profile */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-800/80 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-100">{CV_DATA.name}</h1>
          <p className="text-amber-400 font-mono text-sm mt-1">{CV_DATA.title}</p>
          <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400 mt-3">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-zinc-500" /> {CV_DATA.location}</span>
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-zinc-500" /> {CV_DATA.phone}</span>
            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-zinc-500" /> {CV_DATA.email}</span>
          </div>
        </div>
        <a href="/Jonah_Yen_CV.pdf" download="Jonah_Yen_CV.pdf">
          <Button variant="outline" className="rounded-full gap-2 border-zinc-700 hover:border-amber-500/60 hover:text-amber-400">
            <Download className="w-4 h-4" /> {t.downloadCv}
          </Button>
        </a>
      </div>

      {/* Summary */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2 border-b border-zinc-800/60 pb-2">
          <User className="w-5 h-5 text-amber-400" /> Summary
        </h2>
        <p className="text-zinc-300 text-sm leading-relaxed">
          {lang === 'en' ? CV_DATA.summaryEn : CV_DATA.summaryZh}
        </p>
      </div>

      {/* Experience */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2 border-b border-zinc-800/60 pb-2">
          <Briefcase className="w-5 h-5 text-amber-400" /> Experience
        </h2>

        <div className="space-y-8 border-l border-zinc-800/80 pl-6 ml-2">
          {CV_DATA.experiences.map((exp, idx) => (
            <div key={idx} className="relative space-y-3">
              <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-zinc-950" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-zinc-100">
                    {lang === 'en' ? exp.roleEn : exp.roleZh}
                  </h3>
                  <span className="text-amber-400/90 text-sm font-medium">{exp.company}</span>
                </div>
                <div className="text-xs font-mono text-zinc-500 mt-1 sm:mt-0">
                  <span>{exp.period}</span> | <span>{exp.location}</span>
                </div>
              </div>

              <ul className="space-y-2 text-zinc-300 text-xs sm:text-sm leading-relaxed list-disc list-inside">
                {(lang === 'en' ? exp.bulletsEn : exp.bulletsZh).map((bullet, i) => (
                  <li key={i} className="text-zinc-300">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2 border-b border-zinc-800/60 pb-2">
          <Cpu className="w-5 h-5 text-amber-400" /> Technical Skills
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 text-xs font-mono">
          <Card className="p-4 space-y-2">
            <span className="text-amber-400 font-semibold">AI Agents & LLMs</span>
            <p className="text-zinc-300 font-sans text-xs">{CV_DATA.skills.ai}</p>
          </Card>
          <Card className="p-4 space-y-2">
            <span className="text-amber-400 font-semibold">Multi-modal & Vision</span>
            <p className="text-zinc-300 font-sans text-xs">{CV_DATA.skills.vision}</p>
          </Card>
          <Card className="p-4 space-y-2">
            <span className="text-amber-400 font-semibold">LLMOps & Cloud</span>
            <p className="text-zinc-300 font-sans text-xs">{CV_DATA.skills.cloud}</p>
          </Card>
          <Card className="p-4 space-y-2">
            <span className="text-amber-400 font-semibold">Data & Search</span>
            <p className="text-zinc-300 font-sans text-xs">{CV_DATA.skills.data}</p>
          </Card>
        </div>
      </div>

      {/* Education */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2 border-b border-zinc-800/60 pb-2">
          <GraduationCap className="w-5 h-5 text-amber-400" /> Education
        </h2>

        <div className="space-y-6">
          {CV_DATA.education.map((edu, idx) => (
            <Card key={idx} className="p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-zinc-100">
                    {lang === 'en' ? edu.schoolEn : edu.schoolZh}
                  </h3>
                  <span className="text-amber-400 text-xs font-mono">
                    {lang === 'en' ? edu.degreeEn : edu.degreeZh}
                  </span>
                </div>
                <span className="text-xs font-mono text-zinc-500 mt-1 sm:mt-0">{edu.period}</span>
              </div>

              <ul className="space-y-1.5 text-xs text-zinc-400 list-disc list-inside">
                {(lang === 'en' ? edu.detailsEn : edu.detailsZh).map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
