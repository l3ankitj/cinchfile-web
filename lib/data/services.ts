export interface ServiceData {
  slug: string;
  name: string;
  shortDescription: string;
  priceNote: string;
  intro: string;
  body: string[];
  bulletPoints: string[];
}

export const SERVICES: ServiceData[] = [
  {
    slug: "thesis-printing",
    name: "Thesis Printing & Binding",
    shortDescription: "Thesis-grade paper with hard binding and gold embossing options.",
    priceNote: "from ₹100/copy",
    intro:
      "Final-year and PhD thesis submissions get thesis-grade 100 GSM paper, hard binding, and a cover format that meets standard university submission guidelines.",
    body: [
      "A thesis is usually the one document in a degree where paper weight and binding quality actually get inspected — university submission guidelines frequently specify a minimum GSM and a bound (not stapled) cover. 100 GSM Premium paper and thesis hard binding are built specifically for this, with gold embossing available for the cover text.",
      "Multiple copies for supervisors, examiners, and your own library copy can go in a single order, each configured identically, so you only go through checkout once.",
    ],
    bulletPoints: [
      "100 GSM archival-grade paper",
      "Thesis hard binding with gold embossing",
      "Multiple copies in one order",
      "Meets standard university submission formats",
    ],
  },
  {
    slug: "spiral-binding-online",
    name: "Spiral Binding Online",
    shortDescription: "Fast, affordable binding for notes, assignments, and reports.",
    priceNote: "₹40/copy",
    intro:
      "Spiral binding is the fastest and most affordable way to bind notes, assignments, and project reports that don't need a formal hardcover.",
    body: [
      "Spiral binding keeps pages lying flat when opened, which makes it a practical choice for reference material and coaching notes you'll flip through repeatedly. It's also the quickest binding option to produce, since there's no drying or pressing step involved.",
      "Available on any paper weight and either B&W or color printing, so a spiral-bound set of notes with color diagrams costs the same combined checkout as printing them separately.",
    ],
    bulletPoints: [
      "Flat-lying, durable binding",
      "Works with any paper weight",
      "Fastest turnaround of all binding types",
      "Good for notes, manuals, and reports",
    ],
  },
  {
    slug: "hard-binding-online",
    name: "Hard Binding Online",
    shortDescription: "Durable hardcover binding for final reports, portfolios, and submissions.",
    priceNote: "₹100/copy",
    intro:
      "Hard binding gives final reports, project submissions, and portfolios a rigid, professional cover that holds up to repeated handling.",
    body: [
      "Hard binding wraps a document in a rigid, laminated cover that keeps corners and edges from curling or fraying, which is why it's the standard choice for final-year project reports, internship completion reports, and MBA case study submissions. Unlike thesis binding, there's no requirement for embossed lettering or a specific cover format — it's simply a sturdy, presentable finish for any document that needs to look complete rather than academic. Placement portfolios, board meeting documents, and client-facing proposals also use hard binding when a spiral or staple finish would look unfinished.",
      "Ordering hard binding online means the same PDF can be printed on any paper weight, in black & white or color, and bound the same way across every copy in the order — useful when a report needs to go to a guide, an external examiner, and a personal file simultaneously. Because binding is configured per item at checkout, there's no need to visit a print shop and describe the finish in person; the cover style is locked in exactly as selected before the order ships.",
    ],
    bulletPoints: [
      "Rigid, laminated hardcover",
      "Suited to reports and portfolios",
      "Any paper or print type",
      "Same finish across every copy",
    ],
  },
  {
    slug: "soft-binding-online",
    name: "Soft Binding Online",
    shortDescription: "Flexible cover binding for assignments, proposals, and submission copies.",
    priceNote: "₹60/copy",
    intro:
      "Soft binding gives a document a clean, finished cover without the stiffness or added weight of a hardcover.",
    body: [
      "Soft binding uses a flexible, glued cover rather than a rigid board, giving a document a tidy, bound look without the bulk or cost of a hard cover. It suits assignments, internal proposals, and submission copies that need to look complete without going as far as formal hardcover binding. Because it lies flatter and lighter than hard binding, it's also easier to carry in a folder or file alongside other paperwork.",
      "Soft binding pairs with any of the available paper weights and print types, so a document with color diagrams or scanned appendices can be bound the same way as plain text pages, all in a single checkout. It's a common middle-ground choice for students and professionals who want something more finished than a staple or spiral but don't need the durability of a hard cover.",
    ],
    bulletPoints: [
      "Flexible, glued cover",
      "Lighter than hard binding",
      "Works with any paper weight",
      "Good middle-ground finish",
    ],
  },
  {
    slug: "coaching-institute-notes-printing",
    name: "Coaching & Institute Notes Printing",
    shortDescription: "Bulk printing for coaching centers, exam-prep notes, and study material.",
    priceNote: "from ₹0.35/page",
    intro:
      "Coaching institutes preparing students for UPSC, JEE, NEET, banking, and other competitive exams can print an entire batch's notes in one order.",
    body: [
      "Coaching institutes routinely need the same notes printed and distributed across an entire batch — often converted from handwritten pages or slide decks into a print-ready PDF. Bulk notes printing is built for exactly this: one PDF, printed in the quantity a batch needs, on whichever paper weight and binding suits how often the notes will be flipped through. Spiral or staple binding is common here since students refer back to these notes repeatedly through a course.",
      "Ordering online removes the back-and-forth of dropping off notes at a local shop, confirming quantities, and collecting them later — an institute can upload the material once, set the copy count for the batch, and have the finished sets delivered directly. This also keeps every student's copy identical, since the same file and settings apply across the whole order rather than being reprinted separately each time.",
    ],
    bulletPoints: [
      "Bulk batch quantities",
      "Works with handwritten scans",
      "Spiral or staple binding options",
      "One order for the whole batch",
    ],
  },
  {
    slug: "pdf-printing-service-online",
    name: "PDF Printing Service",
    shortDescription: "Upload any PDF and get it printed and delivered to your door.",
    priceNote: "from ₹0.35/page",
    intro:
      "Any PDF — an assignment, a form, a report — can be printed and shipped without visiting a print shop in person.",
    body: [
      "At its simplest, this is the core of what Cinchfile does: upload a PDF, choose the paper, print type, sides, and binding, and have the printed copies shipped to your address. It covers everything from a single-page form to a hundred-page report, with no minimum order size or need to visit a shop in person. Any PDF that's ready to print — assignments, applications, tickets, contracts — can go through the same flow.",
      "Because pricing is calculated directly from the page count, paper weight, and print type selected, the cost is visible before checkout rather than being quoted after the fact. This makes it a straightforward option any time a document exists as a PDF and a physical, printed copy is needed without the effort of finding and visiting a print shop.",
    ],
    bulletPoints: [
      "Any PDF, any length",
      "No minimum order size",
      "Upfront, calculated pricing",
      "Printed and shipped to you",
    ],
  },
  {
    slug: "bulk-printing-online",
    name: "Bulk Printing Online",
    shortDescription: "Large-quantity print orders for classrooms, events, and institutions.",
    priceNote: "from ₹0.35/page",
    intro:
      "Bulk printing puts a large number of identical copies through a single order, with one consistent paper, print type, and binding across all of them.",
    body: [
      "Bulk printing is for orders where quantity is the point — multiple copies of the same document for a classroom, event, training session, or office distribution. Instead of printing one copy and re-running the job repeatedly, the full quantity is set once at checkout, with the same paper, print type, and binding applied consistently across every copy in the batch. This keeps larger orders simple to configure even when the copy count runs into the dozens or more.",
      "Ordering in bulk online also avoids the logistics of collecting a large stack of printed material in person — the finished order ships as one shipment to a single address, which matters when the copies are headed to an event or office rather than an individual. Per-page rates already reflect the paper and print type chosen, so the total cost scales predictably as the copy count goes up.",
    ],
    bulletPoints: [
      "Large-quantity print orders",
      "Consistent finish across copies",
      "Delivered as one shipment",
      "Predictable per-page pricing",
    ],
  },
  {
    slug: "online-document-printing",
    name: "Online Document Printing",
    shortDescription: "Print reports, forms, and manuals online with doorstep delivery.",
    priceNote: "from ₹0.35/page",
    intro:
      "Any document — a report, a form, a manual — can be printed on the paper and binding that suits it and delivered wherever it's needed.",
    body: [
      "Not every document fits neatly into a single category — reports, forms, manuals, circulars, and reference material all just need to be printed accurately and delivered reliably. Online document printing covers this general case: any PDF document, printed on the paper and binding that suits its purpose, without needing a specialized service built around one document type. It's the option to reach for when a document doesn't need thesis binding or resume paper, just a clean, correct printout.",
      "The same upload-and-configure flow applies regardless of what the document is — a multi-page manual can be spiral bound for reference use, while a one-off form can go out unbound on standard paper, all through the same checkout. Ordering online also means the printed document arrives at the address it's needed, rather than requiring someone to collect it from a shop.",
    ],
    bulletPoints: [
      "Any document type",
      "Configurable paper and binding",
      "Suited to reports, forms, manuals",
      "Delivered to your address",
    ],
  },
  {
    slug: "resume-printing",
    name: "Resume Printing",
    shortDescription: "Premium paper printing for resumes and job application copies.",
    priceNote: "from ₹1.50/page",
    intro:
      "Resume printing uses heavier, premium paper so a handful of copies feel deliberate rather than pulled off a home printer.",
    body: [
      "A resume only needs a handful of copies, but paper quality matters disproportionately for a document meant to make a strong first impression in an interview or on a hiring manager's desk. Resume printing uses 85–100 GSM paper, noticeably heavier and more substantial than standard printer paper, so the copies feel deliberate rather than pulled off a home printer. It's built for the small quantities a resume actually needs, without the overhead of a larger print order.",
      "Students applying for internships and placements, and professionals preparing for interviews, use this when a digital resume needs a physical counterpart to hand over in person. Ordering online means the same PDF used for online applications can be printed on premium paper and delivered before an interview, without needing to track down heavier paper stock separately.",
    ],
    bulletPoints: [
      "85–100 GSM premium paper",
      "Small quantities, no minimum",
      "Suited to interviews and applications",
      "Same PDF as your digital resume",
    ],
  },
  {
    slug: "online-xerox",
    name: "Online Xerox / Photocopy",
    shortDescription: "Skip the local photocopy shop — upload a PDF and get copies delivered.",
    priceNote: "from ₹0.35/page",
    intro:
      "Online xerox replaces a trip to a local photocopy shop with an upload-and-checkout flow that delivers the copies instead.",
    body: [
      "Getting a document photocopied usually means finding a shop nearby, waiting while it's copied, and paying per page in cash — a routine errand that online xerox replaces with an upload-and-checkout flow. Any PDF can be printed in the quantity needed, on the same standard paper a local photocopy shop would use, making this a straightforward option for ID copies, forms, applications, and any document that just needs to be duplicated. It also works when the original document only exists as a scan or PDF rather than a physical page in hand.",
      "Because the whole process happens online, there's no need to be near a shop or visit during its open hours — the PDF can be uploaded and the copies ordered at any time, then delivered wherever they're needed. This suits both one-off copies and slightly larger batches, with the same per-page rate applying regardless of quantity.",
    ],
    bulletPoints: [
      "Standard black & white copies",
      "No shop visit required",
      "Works from scans or PDFs",
      "Order any time, any quantity",
    ],
  },
  {
    slug: "hindi-printing-service",
    name: "Hindi Printing Service",
    shortDescription: "Print Hindi and regional-language PDFs at the same standard rates.",
    priceNote: "from ₹0.35/page",
    intro:
      "Hindi and other regional-language documents print exactly as they appear in the PDF, at the same rates as English documents.",
    body: [
      "Printing works the same way regardless of the language inside the PDF — Hindi and other regional-language documents, whether typed or scanned notes, print exactly as they appear in the file, with no special handling or surcharge. This covers coaching material in Hindi, regional-language forms, handwritten notes scanned into a PDF, and any document where the content isn't in English. As long as the text is already rendered correctly in the PDF, the printed output matches it precisely.",
      "This matters for students and institutes working primarily in Hindi or another regional language, who shouldn't have to hunt for a print service that explicitly supports non-English documents. The same paper weights, print types, and binding options apply, so a Hindi coaching notes set can be spiral bound the same way an English one would be, at the same rates.",
    ],
    bulletPoints: [
      "Hindi and regional-language PDFs",
      "No language surcharge",
      "Same paper and binding options",
      "Standard rates apply",
    ],
  },
  {
    slug: "printout-near-me",
    name: "Printout Near Me",
    shortDescription: "No print shop nearby? We deliver printouts to your doorstep, pan-India.",
    priceNote: "from ₹0.35/page",
    intro:
      "Searching for a print shop nearby isn't necessary when a printout can be ordered online and delivered to your doorstep instead.",
    body: [
      "Searching for a print shop nearby usually means checking whether it's open and hoping it has the right paper on hand — an errand that doorstep delivery removes entirely. Instead of finding a shop, the PDF is uploaded, the paper, print type, and binding are chosen online, and the finished printout is delivered to wherever it's needed, anywhere the shipping network reaches. There's no nearby shop required because the print job comes to you instead.",
      "This suits anyone who searched for a print shop out of convenience rather than necessity — the document still gets printed and delivered, just without the trip. It works the same way whether the destination is a hostel room, a home address, or an office, since delivery isn't limited to wherever a local shop happens to be located.",
    ],
    bulletPoints: [
      "Delivered to your doorstep",
      "No nearby shop needed",
      "Pan-India shipping coverage",
      "Same simple upload flow",
    ],
  },
  {
    slug: "wiro-binding-online",
    name: "Wiro Binding Online",
    shortDescription: "Double-loop wire binding for a clean, book-like finish that opens fully flat.",
    priceNote: "₹40/copy",
    intro:
      "Wiro binding (also called double-loop wire binding) is offered here as our spiral binding option — the same flat-opening, durable finish under a more specific name.",
    body: [
      "\"Wiro\" refers to the double-loop wire coil threaded through punched holes down the spine, a slightly more polished-looking cousin of standard plastic spiral binding with the same practical benefit: pages open completely flat and rotate a full 360 degrees. It's a common request for portfolios, manuals, and calendars where a book-like wire finish is preferred over a plastic coil.",
      "On Cinchfile, this is fulfilled through the same spiral binding option at checkout — the mechanism and durability are functionally equivalent for everyday notes, reports, and reference documents, priced at the same ₹40 per copy.",
    ],
    bulletPoints: [
      "Double-loop wire finish",
      "Opens fully flat",
      "Same price as spiral binding",
      "Good for portfolios and manuals",
    ],
  },
  {
    slug: "comb-binding-online",
    name: "Comb Binding Online",
    shortDescription: "Plastic comb spine binding — an inexpensive, book-like alternative to spiral.",
    priceNote: "₹40/copy",
    intro:
      "Comb binding uses a plastic comb spine instead of a coil, and is offered here through our spiral binding option at checkout.",
    body: [
      "Comb binding threads a plastic comb-shaped spine through rectangular punched holes rather than round ones, giving a slightly more book-like appearance than a round spiral coil while still allowing pages to open flat. It's a common choice for reports and manuals that need to look a bit more finished without the cost of hard binding.",
      "Functionally, it serves the same purpose as spiral binding for day-to-day use, so it's fulfilled through that same option at checkout, at the same ₹40 per copy rate.",
    ],
    bulletPoints: [
      "Plastic comb spine",
      "Book-like appearance",
      "Same price as spiral binding",
      "Pages open flat",
    ],
  },
  {
    slug: "saddle-stitch-binding-online",
    name: "Saddle Stitch Binding Online",
    shortDescription: "Folded-and-stapled booklet binding for short documents and programs.",
    priceNote: "₹0/copy",
    intro:
      "Saddle stitch binding — folding pages in the middle and stapling along the spine, like a magazine — is fulfilled here through our staple binding option.",
    body: [
      "Saddle stitching folds a short document in half and staples it along the fold, producing a booklet-style finish common for event programs, short manuals, and brochures under roughly 40 pages. It's the standard finish for anything meant to read like a small magazine rather than a flat-stapled stack of pages.",
      "On Cinchfile, this is fulfilled through the staple binding option, which is offered at no extra charge — the same underlying mechanism, just described by its more specific print-industry name.",
    ],
    bulletPoints: [
      "Folded, magazine-style finish",
      "Best for shorter documents",
      "No extra binding charge",
      "Good for programs and brochures",
    ],
  },
  {
    slug: "cheap-color-printouts",
    name: "Cheap Color Printouts",
    shortDescription: "Affordable color printing on 75 GSM paper, priced per page with no minimum.",
    priceNote: "from ₹1/page",
    intro:
      "Color printing starts at ₹1/page on 75 GSM paper — a fraction of what most local shops charge per color page.",
    body: [
      "Local shops often price color printing per page on the spot, and rates vary widely depending on the shop and how busy it is. A published, fixed rate card means the same ₹1/page for standard 75 GSM color printing whether the order is five pages or five hundred, with higher-GSM color options available for anything needing a heavier paper stock.",
      "This is the same color printing used across every other service on the platform — there's no separate \"budget\" product, just the standard published rate applied consistently.",
    ],
    bulletPoints: [
      "From ₹1 per color page",
      "No minimum order",
      "Same rate regardless of quantity",
      "Multiple paper weights available",
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
