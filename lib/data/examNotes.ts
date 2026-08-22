export interface ExamNotesData {
  slug: string;
  examName: string;
  intro: string;
  body: string[];
}

export const EXAM_NOTES: ExamNotesData[] = [
  {
    slug: "upsc-notes-printing",
    examName: "UPSC Civil Services",
    intro:
      "Bulk printing for UPSC aspirants — current affairs compilations, optional subject notes, and full-length test series bound for daily revision.",
    body: [
      "UPSC preparation runs on volume: static subject notes, monthly current affairs compilations, answer-writing practice sheets, and mock test papers accumulate fast over a one to two year preparation cycle. Spiral binding is the most common choice here since it survives daily flipping without the spine cracking, and pages lie flat for annotating during revision.",
      "Bulk notes printing is priced per page regardless of quantity, so a full year's worth of compiled material costs the same per page as a single test paper — useful for aspirants converting handwritten or scanned notes into a clean, consistent printed set.",
    ],
  },
  {
    slug: "ssc-cgl-notes-printing",
    examName: "SSC CGL",
    intro:
      "Printing for SSC CGL and other staff selection commission exam prep — quantitative aptitude, reasoning, and general awareness notes.",
    body: [
      "SSC exam preparation typically involves a mix of coaching-provided material and self-compiled practice sets across quantitative aptitude, reasoning, English, and general awareness. Spiral or staple binding keeps subject-wise notes organized without the cost of a full hardcover.",
      "Printing in bulk works well for study groups preparing together, where the same compiled notes get distributed across several aspirants in one order.",
    ],
  },
  {
    slug: "banking-exam-notes-printing",
    examName: "Banking (IBPS/SBI)",
    intro:
      "Notes printing for IBPS PO/Clerk, SBI PO, and other banking exam preparation — reasoning, quant, and banking awareness material.",
    body: [
      "Banking exam prep tends to be fast-paced with multiple exams across a single admission cycle, which means notes need to be printed and revised on a tight timeline. Bulk printing with spiral binding suits daily-practice material that gets referenced repeatedly in the weeks before an exam.",
      "The same checkout covers mixed print settings — B&W for text-heavy reasoning practice and color for any charts or data interpretation sections — in one combined order.",
    ],
  },
  {
    slug: "neet-notes-printing",
    examName: "NEET UG",
    intro:
      "Printing for NEET UG aspirants — physics, chemistry, and biology notes, formula sheets, and practice question banks.",
    body: [
      "NEET preparation notes are often dense with diagrams — biology labeled figures, chemistry mechanisms, physics derivations — which makes color printing worth considering for specific sections even if the bulk of the notes stay B&W.",
      "Spiral binding is common here since these notes get revisited constantly through a one to two year preparation window, and flat-opening pages make it easier to study side-by-side with a textbook.",
    ],
  },
  {
    slug: "neet-pg-notes-printing",
    examName: "NEET PG",
    intro:
      "Printing for NEET PG and other postgraduate medical entrance preparation — subject-wise notes and previous year question compilations.",
    body: [
      "NEET PG preparation typically draws on multiple standard reference sources condensed into personal or coaching-provided notes, often compiled close to exam windows on a tight schedule. Printing these in bulk with consistent binding keeps a large volume of material organized by subject.",
      "100 GSM paper is a common choice for notes that will be handled heavily over weeks of revision, since it holds up better to repeated use than lighter paper.",
    ],
  },
  {
    slug: "jee-notes-printing",
    examName: "JEE Main & Advanced",
    intro:
      "Printing for JEE Main and Advanced preparation — physics, chemistry, and mathematics notes, formula booklets, and mock test papers.",
    body: [
      "JEE preparation notes often include worked problems and diagrams that benefit from clean, high-opacity paper to keep handwritten annotations legible. Spiral binding is a common choice for formula booklets and quick-reference material used throughout the preparation cycle.",
      "Bulk mock test printing is also common ahead of exam windows, with the same per-page rate applying whether it's five test papers or fifty.",
    ],
  },
  {
    slug: "gate-notes-printing",
    examName: "GATE",
    intro:
      "Printing for GATE aspirants — subject-wise numerical practice, formula sheets, and previous year question compilations.",
    body: [
      "GATE preparation is numerically dense, and printed notes with worked examples tend to be easier to study from than scrolling through a PDF, especially for the kind of step-by-step problem solving GATE requires.",
      "Bulk printing across multiple subject papers in one order keeps a full preparation set consistent in paper and binding, useful when compiling notes across an entire engineering discipline's syllabus.",
    ],
  },
  {
    slug: "cat-notes-printing",
    examName: "CAT (MBA Entrance)",
    intro:
      "Printing for CAT and other MBA entrance exam preparation — quant, verbal ability, and data interpretation practice sets.",
    body: [
      "CAT preparation notes often mix data interpretation charts with text-heavy verbal ability sections, which is a natural fit for a single order with color printing reserved for chart-heavy pages and B&W for the rest.",
      "Mock test series printed in bulk ahead of exam day are a common use case, with consistent binding across the full set making review sessions easier to organize.",
    ],
  },
  {
    slug: "clat-notes-printing",
    examName: "CLAT (Law Entrance)",
    intro:
      "Printing for CLAT and other law entrance exam preparation — legal reasoning, current affairs, and comprehension practice material.",
    body: [
      "CLAT preparation leans heavily on current affairs and legal reasoning practice, both of which are typically compiled from multiple sources into a single running notes document that grows over months of preparation.",
      "Spiral binding suits this kind of continuously-updated material well, since printing an updated version periodically is straightforward and inexpensive at the per-page rate.",
    ],
  },
  {
    slug: "railway-exam-notes-printing",
    examName: "Railways (RRB)",
    intro:
      "Printing for RRB NTPC, Group D, and other railway recruitment exam preparation — general knowledge, arithmetic, and reasoning notes.",
    body: [
      "Railway recruitment exams draw a very large aspirant pool, and coaching institutes preparing batches for these exams often need identical notes printed and distributed at scale — a natural fit for bulk printing with one consistent binding across the batch.",
      "General awareness sections benefit from clear, high-opacity paper for dense text, while staple or spiral binding keeps costs down for material that's often revised close to the exam date.",
    ],
  },
  {
    slug: "defence-exam-notes-printing",
    examName: "Defence (NDA/CDS)",
    intro:
      "Printing for NDA, CDS, and other defence services exam preparation — general knowledge, mathematics, and English practice material.",
    body: [
      "NDA and CDS preparation covers a broad general knowledge syllabus alongside mathematics and English sections, often compiled into subject-wise notes over a structured coaching timeline.",
      "Spiral or staple binding keeps this material organized by subject and easy to carry between study sessions, at the same transparent per-page rate as any other order.",
    ],
  },
  {
    slug: "ctet-notes-printing",
    examName: "CTET & Teaching Exams",
    intro:
      "Printing for CTET, state TET, and other teaching eligibility exam preparation — child development, pedagogy, and subject-specific notes.",
    body: [
      "Teaching eligibility exam preparation covers pedagogy and child development alongside subject-specific content, usually compiled from coaching material into a combined notes set for revision.",
      "Bulk printing suits coaching centers distributing identical notes to an entire batch, with the same paper and binding applied consistently across every copy.",
    ],
  },
  {
    slug: "judiciary-exam-notes-printing",
    examName: "Judiciary (PCS-J)",
    intro:
      "Printing for judicial services exam preparation — bare acts, case law compilations, and state-specific PCS-J notes.",
    body: [
      "Judiciary exam preparation often involves printing bare acts and case law compilations that need to be referenced repeatedly and annotated over months of study — a good fit for hard or soft binding rather than loose pages.",
      "Multiple identical copies for study groups can go in a single order, since binding and paper settings apply the same way regardless of copy count.",
    ],
  },
  {
    slug: "gre-gmat-notes-printing",
    examName: "GRE, GMAT & IELTS",
    intro:
      "Printing for GRE, GMAT, and IELTS preparation — vocabulary lists, practice sets, and full-length mock tests for study-abroad applicants.",
    body: [
      "Study-abroad test preparation often involves printed vocabulary lists and practice sets that get reviewed daily over a shorter, more intensive preparation window than domestic competitive exams.",
      "Full-length mock tests are commonly printed close to the test date, with consistent B&W printing keeping costs low for practice material that's used once or twice and then set aside.",
    ],
  },
  {
    slug: "ugc-net-notes-printing",
    examName: "UGC NET",
    intro:
      "Printing for UGC NET preparation — teaching aptitude, research methodology, and subject-specific notes for aspiring assistant professors.",
    body: [
      "UGC NET preparation covers a common paper on teaching and research aptitude alongside a subject-specific paper, often requiring two separate sets of notes printed and organized independently.",
      "Spiral binding is a practical choice for both, since NET aspirants frequently revise the same material across multiple exam cycles.",
    ],
  },
  {
    slug: "cuet-notes-printing",
    examName: "CUET",
    intro:
      "Printing for CUET (Common University Entrance Test) preparation — domain subject notes and general test practice material for undergraduate admissions.",
    body: [
      "CUET preparation spans general test sections and domain-specific subject papers, which often means printing multiple distinct notes sets in one go ahead of the exam window.",
      "Staple or spiral binding suits this shorter, more intensive preparation cycle, with the same rate card applying regardless of how many subjects are being prepared.",
    ],
  },
  {
    slug: "afcat-notes-printing",
    examName: "AFCAT (Air Force)",
    intro:
      "Printing for AFCAT and other Air Force entrance exam preparation — general awareness, reasoning, and military aptitude notes.",
    body: [
      "AFCAT preparation covers general awareness and verbal ability alongside military aptitude sections, typically compiled into a combined notes set over a shorter preparation timeline than civil services exams.",
      "Spiral binding keeps this compact notes set durable through repeated revision in the weeks before the exam.",
    ],
  },
  {
    slug: "ca-cs-cma-notes-printing",
    examName: "CA, CS & CMA",
    intro:
      "Printing for Chartered Accountancy, Company Secretary, and Cost Management Accountancy students — ICAI/ICSI study modules and practice manuals.",
    body: [
      "CA, CS, and CMA study material is typically issued as large institute-published modules, and students commonly supplement these with their own condensed notes and practice manuals through each level of the course.",
      "Hard or soft binding suits these longer reference documents well, since they get referenced across an entire attempt cycle rather than a single sitting.",
    ],
  },
  {
    slug: "police-si-notes-printing",
    examName: "Police & SI Recruitment",
    intro:
      "Printing for police constable, sub-inspector, and other state police recruitment exam preparation — general knowledge and reasoning notes.",
    body: [
      "State police recruitment exams draw large aspirant pools similar to railway recruitment, and coaching centers preparing batches for these exams often need identical notes printed at scale for distribution.",
      "Staple or spiral binding keeps costs low for general knowledge and reasoning material that's revised intensively over a shorter preparation window.",
    ],
  },
];

export function getExamNotesBySlug(slug: string): ExamNotesData | undefined {
  return EXAM_NOTES.find((e) => e.slug === slug);
}
