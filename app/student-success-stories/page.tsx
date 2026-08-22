import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, BookOpen, FileText, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "What Students Print | Cinchfile",
  description: "Common ways students use Cinchfile — thesis submissions, exam prep, project reports, and more.",
};

const USE_CASES = [
  {
    icon: <GraduationCap size={22} />,
    title: "Thesis & Dissertation Submissions",
    body: "Final-year and PhD students use thesis hard binding on 100 GSM paper to meet university submission formats — with copies for supervisors, examiners, and their own library record printed in one order.",
  },
  {
    icon: <BookOpen size={22} />,
    title: "Competitive Exam Preparation",
    body: "UPSC, banking, and state PCS aspirants print bulk coaching notes and reference material with spiral binding, so pages lie flat for repeated study sessions.",
  },
  {
    icon: <FileText size={22} />,
    title: "Semester Project Reports",
    body: "Engineering and management students bind project reports with color cover pages and B&W body text, timed to submission deadlines.",
  },
  {
    icon: <Briefcase size={22} />,
    title: "Resumes & Applications",
    body: "Job and internship applicants print resumes on premium paper for interviews and campus placement drives, where a small quantity needs to look sharp.",
  },
];

export default function StudentSuccessStoriesPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-foreground mb-4">
        What Students Print
      </h1>
      <p className="text-lg text-muted mb-10">
        A few of the most common reasons students use Cinchfile.
      </p>

      <div className="space-y-5 mb-12">
        {USE_CASES.map((u) => (
          <div key={u.title} className="flex gap-4 rounded-xl border border-border bg-surface p-5">
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent-hover flex items-center justify-center shrink-0">
              {u.icon}
            </div>
            <div>
              <h2 className="font-bold text-foreground mb-1">{u.title}</h2>
              <p className="text-sm text-muted leading-relaxed">{u.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-primary text-primary-foreground px-8 py-10 text-center">
        <Link href="/upload" className="btn-accent px-10 inline-flex">
          Start Printing Now
        </Link>
      </div>
    </div>
  );
}
