export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  excerpt: string;
  body: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "paper-types-guide",
    title: "Paper GSM Guide: Which Weight Should You Print On?",
    description:
      "A quick guide to choosing between 65, 75, 85, and 100 GSM paper for notes, assignments, and thesis submissions.",
    publishedAt: "2026-02-10",
    category: "Study Guides",
    excerpt:
      "GSM measures paper weight, and it's the single biggest factor in how your printed document looks and feels. Here's how to pick the right one.",
    body: [
      "GSM stands for grams per square meter — the higher the number, the thicker and heavier the sheet. Standard office paper sits around 75-80 GSM; anything above 100 GSM starts to feel closer to cardstock.",
      "For everyday notes and draft assignments, 65 GSM Eco is the most economical choice and perfectly readable for personal reference. It's thin enough that show-through can be visible with dense text on both sides, so it's best paired with single-sided printing if that matters to you.",
      "75 GSM Standard is the safest default for anything you're submitting — assignments, project reports, coaching notes. It's opaque enough to avoid bleed-through even with duplex printing and color diagrams, and it's what most university submission guidelines implicitly assume when they don't specify a weight.",
      "85 GSM Plus adds a noticeably more premium feel, useful for cover pages or documents you want to visually stand out, like a portfolio or a report going to an external reviewer.",
      "100 GSM Premium is thesis-grade — the standard weight for final dissertation and thesis submissions, especially when paired with hard binding. If your university specifies a minimum weight for the final copy, it's almost always in this range.",
    ],
  },
  {
    slug: "binding-types-guide",
    title: "Binding Types Explained: Staple to Thesis Hard Binding",
    description:
      "A breakdown of staple, spiral, soft, hard, and thesis hard binding — what each looks like, how durable it is, and which one fits your document.",
    publishedAt: "2026-01-15",
    category: "Study Guides",
    excerpt:
      "Binding changes how a document feels and how long it lasts — here's how to pick between staple, spiral, soft, hard, and thesis hard binding.",
    body: [
      "Binding isn't just about holding pages together — it changes how a document feels, how long it survives regular handling, and how formal it reads to whoever's evaluating it. Cinchfile offers five options: staple, spiral, soft binding, hard binding, and thesis hard binding, and each sits at a different point on the cost-versus-durability-versus-formality scale. Picking the right one mostly comes down to three questions: how many times will this document be opened and closed, does it need to lie flat while you're working from it, and how official does it need to look.",
      "Staple binding is exactly what it sounds like — one or two staples through the corner or spine edge — and it's the option Cinchfile doesn't charge extra for, since it's really just an extension of the print job rather than a separate binding process. It works well for short documents under roughly 20-30 pages that will mostly be read once or twice, like a homework submission or a printed form, but it won't survive being flipped through daily and the pages don't sit flat when open. Spiral binding solves both of those problems: a plastic or wire coil runs through punched holes down the spine, letting the document open completely flat and rotate a full 360 degrees, which is genuinely useful if you're going to be referring back to it while typing, presenting, or working through problems. It also handles a much higher page count without the spine cracking. At ₹40 per copy, it's a small add-on for how much more durable and usable the document becomes.",
      "Soft binding glues the pages to a flexible card cover, giving you something closer to a paperback book — a cleaner, more finished look than spiral without the rigidity of hard binding. It doesn't open perfectly flat, since the glued spine has some resistance, but it holds up well to normal handling and looks noticeably more polished when you're submitting something you want to look deliberate rather than just printed. At ₹60 per copy, it sits in the middle of Cinchfile's binding lineup and is a common choice for minor project reports or documents that need to look a step above a spiral-bound draft.",
      "Hard binding uses a rigid board cover wrapped in cloth or leatherette, similar to a textbook, and it's built to survive years of storage and handling without the corners fraying or the spine loosening. It's the standard choice for final year major projects and reports that are likely to sit on a shelf rather than get carried around, and at ₹100 per copy it costs noticeably more than soft binding but buys real long-term durability. Thesis hard binding goes a step further still, typically finished with gold or foil lettering on the spine and cover for the title and author name, matching the presentation expected of a dissertation copy that will be archived in a university library. At ₹350 per copy it's the most expensive option on Cinchfile, reflecting the extra materials and finishing work, and it's worth reserving for the final submission copy rather than drafts.",
      "As a rough rule: staple for a quick one-off submission, spiral for anything you'll reference repeatedly while working or presenting, soft binding for a slightly more formal look on a budget, hard binding for a final year project that needs to last, and thesis hard binding for the one official copy of a dissertation or thesis that your university will keep. If your department has a written formatting guideline, it's worth checking before you order — some explicitly require a specific binding type for the final submission copy, and getting that wrong can mean reprinting.",
    ],
  },
  {
    slug: "cmyk-vs-rgb-printing",
    title: "CMYK vs RGB: Why Your Colors Look Different on Paper",
    description:
      "Why bright colors on your screen can print duller, and how to design color diagrams and posters that survive the shift from RGB to CMYK.",
    publishedAt: "2026-01-22",
    category: "Study Guides",
    excerpt:
      "Screens build color with light, printers build it with ink — and that difference is why your vivid on-screen diagram can print looking flat.",
    body: [
      "Every screen you've ever looked at builds color out of red, green, and blue light — turn all three fully on and you get white, turn them all off and you get black. This is the RGB model, and it's additive: colors get brighter as you add more light. Printers work the opposite way, using cyan, magenta, yellow, and black ink layered on white paper — the CMYK model. Ink is subtractive: it absorbs light rather than emitting it, so combining more colors makes a patch darker, not brighter. That fundamental difference is why a diagram or poster that looks vivid and glowing on your laptop screen can come out noticeably flatter once it's printed.",
      "The practical issue is that RGB screens can display a wider range of colors than CMYK printing can physically reproduce — especially very bright, saturated, or neon shades like electric blue, fluorescent green, or deep magenta. When a file with those colors gets sent to print, the software has to substitute the closest color CMYK ink can actually produce, which is almost always somewhat duller and shifted in hue. This isn't a printing error or a quality problem with the paper — it's a hard physical limit on what ink on paper can do compared to light on a screen, and it affects every printer, not just one machine or one shop.",
      "This matters most for anything with color you're relying on to look a specific way: charts and graphs from Excel or Google Sheets, diagrams pulled from a presentation, or a poster designed in Canva or PowerPoint. All of these tools default to RGB because they're built for screens, and the conversion to CMYK only happens at print time — often without you seeing a preview of the shift beforehand. Bar charts with bright, similar-looking colors are a common casualty: two shades that were clearly distinct on-screen can end up looking much closer together once converted, especially in dimmer or matte printing.",
      "A few practical habits help. Avoid relying on very bright or neon colors to distinguish important elements in a chart or diagram — use patterns, labels, or darker, more saturated-but-not-neon tones instead, since those survive the CMYK conversion much better. If a document's color accuracy genuinely matters — a design portfolio, a poster for a competition — it's worth ordering a single test copy before committing to a full batch, since it's much cheaper to catch a color shift on one page than after twenty. And if the color distinction isn't actually essential to understanding the content, printing in black and white is often the safer and cheaper choice anyway, since it sidesteps the conversion question entirely.",
    ],
  },
  {
    slug: "project-report-binding",
    title: "Preparing and Binding Your Semester Project Report",
    description:
      "A practical guide to structuring, formatting, and binding a semester-end project report, from cover page conventions to choosing spiral vs soft binding.",
    publishedAt: "2026-01-28",
    category: "Thesis & Projects",
    excerpt:
      "From cover page format to spiral vs soft binding, here's how to get a semester project report print-ready without last-minute reprints.",
    body: [
      "Most semester-end project reports follow a fairly predictable structure: a cover page, followed by a certificate page (often signed by your guide or HOD), an acknowledgement, a table of contents, the main body organized into chapters or sections, and finally references or appendices. Getting this order right before you print — rather than after — saves you from having to redo pages once they're already bound, especially with binding types that aren't easy to open back up.",
      "The cover page is usually the most format-sensitive part: college or institute name, project title, your name and roll number, department, semester, and guide's name are the common fields, sometimes alongside a college logo. Requirements vary a lot by department, so it's worth checking your specific guide's format sheet rather than assuming a generic template will pass — some departments are strict about font, spacing, or exact wording like 'Submitted in partial fulfilment of...'. Printing a single draft copy first to check the layout before committing to a full bound set is generally worth the extra few rupees.",
      "On paper weight, 75 GSM Standard covers most project report submissions without issue — it's opaque enough to avoid show-through even with diagrams and duplex printing. If you want the cover page or section dividers to feel a bit more substantial, stepping up to 85 GSM Plus just for those pages while keeping 75 GSM for the body is a common way to get a slightly more polished feel without paying premium weight pricing across the whole document.",
      "For binding, spiral and soft binding are the two realistic options for most project reports. Spiral opens completely flat, which is genuinely useful during a viva when an examiner is flipping back and forth between sections while asking questions, and it handles a thick report without the spine giving out. Soft binding gives a more finished, book-like appearance that some students prefer for the copy they're formally submitting, though it doesn't lie fully flat and is a little more expensive. Some departments specify one or the other for the final submission copy, so it's worth checking before you order rather than after.",
      "A useful workflow: print and check a single unbound draft first for page order, formatting, and any color diagrams; only bind once you're confident the file itself is final, since a bound copy is harder to correct. If your viva requires handing over a loose or unbound copy in addition to the bound one, get that sorted in the same order so you're not printing twice.",
    ],
  },
  {
    slug: "ignou-notes-printing",
    title: "A Printing Guide for IGNOU Students: Study Material and Notes",
    description:
      "Practical tips for IGNOU distance-education students on printing block/unit study material and reference notes economically.",
    publishedAt: "2026-02-03",
    category: "Thesis & Projects",
    excerpt:
      "IGNOU study material is long, PDF-heavy, and meant to be marked up — here's how to print it in a way that's actually usable and affordable.",
    body: [
      "IGNOU (Indira Gandhi National Open University) runs one of the largest distance and open learning programmes in the country, and a lot of its coursework still revolves around printed material — study guides broken into blocks and units, assignment questions, and reference readings, most of which students receive or download as PDFs. Reading dense, multi-unit study material on a screen for hours is tiring for a lot of people, and printing it out — with room to underline, margin-note, and flip back a few pages mid-thought — is often just a more workable way to actually study it.",
      "Since assignment formats and submission requirements differ across IGNOU's many programmes, it's worth checking your own programme guide for the current rules on how assignments need to be submitted rather than assuming one standard applies everywhere. What Cinchfile is useful for either way is printing the material you're studying from and working with — the block/unit PDFs, reference notes, and any previous years' solved assignments you're using to understand a question format — so you have a working paper copy to write from rather than switching between a screen and a notebook.",
      "Because IGNOU study material tends to run long — a single course can span several blocks with a few hundred pages combined — spiral binding is generally the more practical choice over soft or hard binding for this kind of use. It opens flat, survives being carried between study sessions, and doesn't add much cost relative to the printing itself. For paper, 65 GSM Eco or 75 GSM Standard is usually enough, since these are working study copies rather than formal submissions, and keeping the weight down also keeps a multi-block set from becoming unreasonably heavy or expensive to print.",
      "Printing in black and white on double-sided pages is the most economical way to handle the volume, and it's rarely a problem since IGNOU study material is mostly text with occasional diagrams that read fine in grayscale. Worth noting: this is simply a printing service that happens to be convenient for IGNOU learners preparing their own study material — it isn't affiliated with, endorsed by, or run in partnership with the university, and the study content itself still needs to come from your own official sources.",
    ],
  },
  {
    slug: "du-readings-printing",
    title: "Printing DU Course Readings: A Practical Guide",
    description:
      "Tips for Delhi University students on printing reading-list PDFs and course compilations, from paper weight to binding choice.",
    publishedAt: "2026-02-08",
    category: "Thesis & Projects",
    excerpt:
      "DU's reading-heavy courses mean printing compiled PDFs every semester — here's how to do it without ending up with an unreadable, unwieldy stack.",
    body: [
      "Delhi University's undergraduate and postgraduate courses — especially across the humanities and social sciences like political science, history, English, and sociology — are well known for assigning extensive reading lists rather than relying on a single textbook. Course readings usually arrive as a mix of scanned book chapters, journal articles, and compiled PDFs shared within a class, often before the semester properly starts, and a lot of students prefer to print the full set upfront so they can annotate and carry it to seminars rather than reading everything off a laptop.",
      "These compiled reading PDFs are rarely uniform — pages come from different sources, so orientation, scan quality, and font size can vary within the same document, and margins are sometimes cut off close to the text. It's worth skimming through a reading list PDF before printing to check that nothing is cut off or rotated the wrong way, since fixing that after a large batch is printed is more annoying than catching it beforehand. Double-sided black and white printing is the practical default for this kind of material, since reading lists for even one course can run over a hundred pages, and most students are working across three or four courses in a semester.",
      "For binding, it depends on how long you're keeping the set around: a single week's readings for a seminar are usually fine stapled together, while a full semester's compiled reading list — the kind that goes in your bag most days — holds up much better spiral bound, since it survives repeated flipping and doesn't fall apart at the spine the way a stapled stack does past a certain thickness.",
      "On paper, 65 GSM Eco or 75 GSM Standard both work well for reading material you're going to underline and mark up rather than preserve — there's little reason to pay for a heavier, more premium weight on something that's meant to be a working copy, not an archive copy. And to be clear: this is a printing option that happens to be useful for DU students handling their own coursework, not a service affiliated with or run by Delhi University.",
    ],
  },
  {
    slug: "state-pcs-notes-printing",
    title: "Printing State PCS Exam Notes and Coaching Material",
    description:
      "A guide for State PCS (UPPCS, MPPSC, BPSC, and similar) aspirants on printing revision notes and coaching material economically in bulk.",
    publishedAt: "2026-02-14",
    category: "Competitive Exams",
    excerpt:
      "State PCS prep means months of accumulating notes and reprinting them for revision — here's how to keep that process organized and affordable.",
    body: [
      "State PCS exams — UPPCS, MPPSC, BPSC, and their equivalents in other states — follow a broadly similar pattern of a prelims stage, a mains stage, and often an interview, but each one layers state-specific history, geography, and current affairs on top of the general studies syllabus most aspirants are already familiar with from other exams. Preparing for one seriously usually means accumulating a large and growing pile of material over many months: coaching class handouts, downloaded PDFs of static GK compilations, monthly current affairs magazines, and printed test series.",
      "A lot of this material gets used more than once — static GK and history notes in particular get revised repeatedly as the exam date approaches, sometimes reprinted fresh for each revision cycle rather than reused from months earlier because pages get worn out or heavily marked up. For that kind of repeated, working material, economical printing makes more sense than premium paper: 65 GSM Eco or 75 GSM Standard in black and white keeps the cost down significantly when you're printing the same subject notes two or three times over a preparation cycle.",
      "Binding choice depends on how the material gets used. Subject-wise compiled notes that you'll be flipping through constantly during revision hold up better with spiral binding, since it opens flat and survives daily handling over months. Smaller, one-off material like a weekly mock test or a single current affairs digest is usually fine just stapled, since it doesn't need to survive repeated use the way core revision notes do.",
      "Organizing print jobs by subject and by stage — separate booklets for prelims-focused static GK versus mains-focused answer-writing material, for instance — tends to work better than one giant combined printout, mostly because it makes it possible to carry just what you need for a specific study session, whether that's a coaching class, a library session, or revision during a commute.",
    ],
  },
  {
    slug: "ca-cfa-gate-study-material-print",
    title: "Printing Study Material for CA, CFA, and GATE Aspirants",
    description:
      "What CA, CFA, and GATE candidates should know about printing their exam-specific study modules, curriculum books, and formula sheets.",
    publishedAt: "2026-02-19",
    category: "Competitive Exams",
    excerpt:
      "CA, CFA, and GATE each come with a distinct kind of study material — here's how to print each one in a way that survives months of prep.",
    body: [
      "CA, CFA, and GATE are three very different exams — Chartered Accountancy (regulated by ICAI) is a multi-level Indian professional qualification, CFA (Chartered Financial Analyst) is an international investment and finance credential, and GATE (Graduate Aptitude Test in Engineering) is the entrance exam that decides admission to M.Tech programmes and eligibility for PSU recruitment — but aspirants across all three end up printing large volumes of study material, just for different reasons.",
      "CA students typically work from ICAI's own study modules and practice manuals, which run long — often several hundred pages per subject across the Foundation, Intermediate, and Final levels — alongside handwritten or typed notes from coaching classes. Given the sheer page count involved across multiple subjects, keeping print costs manageable matters, and 65 or 75 GSM paper in black and white with double-sided printing is generally the practical choice for this volume of material.",
      "CFA candidates usually study from either the official curriculum books or condensed notes from prep providers, alongside large practice question banks used for timed problem sets closer to the exam. Because a lot of CFA study time involves working through problems with the notes open beside you, spiral binding is a natural fit — it stays flat on a desk and survives the kind of constant back-and-forth flipping that curriculum-heavy study involves.",
      "GATE preparation leans heavily on formula sheets, subject-wise short notes, and previous years' question papers, since the exam itself is numerical and problem-solving heavy rather than descriptive. Many GATE aspirants find it useful to print the last ten to fifteen years of question papers as one working set, alongside compact, subject-separated spiral-bound booklets of formulas and short notes that are easy to grab individually rather than carrying one large combined file.",
      "Across all three, a useful distinction is between material you'll read once — first-pass coaching notes, for instance — and material you'll return to dozens of times through the preparation cycle, like core formula sheets or a final revision compilation. It's worth spending a little more on binding and paper quality for the second category, since that's the material that actually needs to survive months of handling.",
    ],
  },
  {
    slug: "reduce-pdf-file-size-before-uploading",
    title: "How to Reduce PDF File Size Before Uploading for Printing",
    description:
      "A practical guide to shrinking scanned and image-heavy PDFs before uploading, without sacrificing the print quality you're paying for.",
    publishedAt: "2026-02-21",
    category: "Print Prep",
    excerpt:
      "Compressing a PDF the wrong way can save you upload time and ruin the print — here's how to shrink file size without losing legibility.",
    body: [
      "Large PDFs almost always come from one of a few sources: a document scanned at a needlessly high resolution, a file with several full-resolution photos embedded in it, or a scan saved with no compression applied at all. None of this is a problem for viewing on a screen, but a genuinely oversized file is slower to upload, slower for anyone downstream to open, and often carries far more resolution than a printer can actually use — most of that extra file size is invisible once the page is printed.",
      "The safest way to shrink a PDF is to use a proper 'reduce file size' or 'optimize' export option in whatever tool created it — Word, Google Docs, Adobe Acrobat, and most scanning apps all have one — rather than re-scanning at a lower setting and hoping for the best. For text documents, scanning or exporting at around 200-300 dpi is generally enough; going well beyond that adds file size without adding anything visible on the printed page, since paper simply can't resolve detail much finer than that at normal reading distance.",
      "Compression can also go too far in the other direction. Aggressive compression on a scanned page introduces visible artifacts around text edges and can blur fine details in a way that's often not obvious on a small screen preview but becomes obvious the moment it's printed at full A4 size — paper is less forgiving of compression softness than a backlit screen is. This is especially risky for scanned handwritten notes, where small, faint pencil strokes can blur into illegibility if the file is squeezed too hard.",
      "A couple of habits help avoid both extremes. If the source is genuinely black-and-white text, scan or save it in grayscale rather than color — color scans are substantially larger and compress worse for the same visual result. And where possible, generate the PDF directly from the original document (exporting straight from Word or Google Docs to PDF) rather than printing it out and re-scanning it, since a direct export is almost always smaller and sharper than a scanned copy of a printed page.",
      "Before uploading, it's worth zooming into a couple of dense text pages at 100-150% in your PDF viewer. If the text already looks soft or blurry on screen at that zoom level, it will look worse on paper — better to fix the source file at that point than to compress an already-blurry scan further.",
    ],
  },
  {
    slug: "preparing-a-pdf-for-duplex-printing",
    title: "Preparing a PDF for Duplex (Double-Sided) Printing",
    description:
      "Page order, blank-page, and orientation pitfalls to check before ordering double-sided printing, so section starts land where you expect.",
    publishedAt: "2026-02-25",
    category: "Print Prep",
    excerpt:
      "Double-sided printing looks simple until one stray blank page shifts every page after it to the wrong side of the sheet.",
    body: [
      "Duplex, or double-sided, printing puts two pages on opposite sides of the same physical sheet, which means every page's position relative to the sheet depends on everything that came before it in the file. If a chapter, section, or cover page is meant to always start on a fresh sheet (the front, right-hand side), it needs an even number of pages before it — otherwise it lands on the back of the previous sheet instead, which looks like a mistake even though nothing was technically missing from the file.",
      "This most often goes wrong when a document is assembled from pieces — a cover page merged with a main body, or a main report merged with an appendix — where each piece was created and page-numbered independently. Once combined, the running page count no longer lines up the way it did in each piece on its own, and a section that was meant to open on the front of a sheet can quietly shift to the back. Checking the total page count, and specifically whether it's odd or even at each point a new section should start fresh, catches this before it's printed rather than after.",
      "Orientation is the other common trip-up. Most duplex printing flips pages along the long edge, which is the correct default for a standard portrait document, but a document with occasional landscape pages — a wide table or a rotated diagram — can end up upside down on the back of the sheet relative to the portrait pages around it. Where possible, keep an entire document in one consistent orientation, or pull genuinely landscape-heavy sections out as their own single-sided print job rather than mixing orientations within one duplex file.",
      "A quick way to check before ordering is to view the PDF in a two-page or 'facing pages' spread mode, if your reader supports it, and confirm that section starts and cover pages land where you expect relative to a left/right spread. If something's landing on the wrong side, the fix is almost always inserting or removing a single blank page just before that section, not reformatting the whole document.",
      "It's worth the extra check, because double-sided printing is also where the real savings are — printing double-sided roughly halves the number of physical sheets used for the same content, which lowers both the page cost and the shipping weight of the final order. That's only a genuine saving if the page order was right in the first place; a reprint to fix a shifted section costs more than the two minutes it takes to check beforehand.",
    ],
  },
  {
    slug: "margins-and-page-setup-for-binding",
    title: "How Margins and Page Setup Affect Binding",
    description:
      "Why spiral and hard-bound documents need extra inner margin, and how to set up margins so binding doesn't cut into your text.",
    publishedAt: "2026-02-28",
    category: "Print Prep",
    excerpt:
      "A binding punch or glued spine takes a bite out of the page nearest it — here's how much margin to leave so it doesn't take your text with it.",
    body: [
      "Spiral binding punches a row of holes a short distance from the spine edge through the whole stack of sheets, and soft or hard binding glues that same edge into a cover. Both physically claim a strip of the page closest to the spine. If your margin on that edge is set the same as the others — say, a uniform one-inch margin all around — text, tables, or figures placed close to that edge can end up punched through or swallowed into the crease where the cover meets the pages.",
      "For a document that's only going to be stapled, standard one-inch margins on all sides are generally fine, since a staple sits in the corner or along the very edge rather than cutting a strip out of the page. For spiral, soft, or hard binding, it's worth adding extra margin specifically on the binding edge — often an additional half inch to a full inch beyond your other margins — with thicker documents and deeper spiral coils needing a bit more room than a thin one.",
      "Double-sided documents complicate this slightly, since the 'inner' edge alternates sides through the document if it's laid out as a proper book (odd pages binding on the left, even pages on the right, or vice versa). Where your word processor supports it, using 'mirror margins' or 'inside/outside' margin settings instead of fixed left/right margins keeps the extra gutter space on the correct side automatically, rather than only protecting one side of the document.",
      "The content most at risk is anything deliberately placed close to the edge — a full-width table, a diagram pushed to the margin, or a page number sitting right at the binding edge. It's worth reviewing a print preview specifically along the spine side before ordering a spiral, soft, or hard bound document, since this is a much cheaper problem to catch on screen than after a hundred-page report has already been bound.",
      "The effect scales with page count and binding type: a ten-page stapled handout has essentially no gutter issue to worry about, but a two-hundred-page spiral-bound dissertation draft can genuinely lose readable text at the spine if the margins weren't set with binding in mind from the start.",
    ],
  },
  {
    slug: "font-size-and-line-spacing-for-printed-documents",
    title: "Choosing Font Size and Line Spacing for Printed Academic Documents",
    description:
      "How font size and line spacing trade off against page count and readability in printed assignments, reports, and theses.",
    publishedAt: "2026-03-03",
    category: "Study Guides",
    excerpt:
      "A smaller font saves pages, but the readability cost shows up the moment someone actually has to read your printed document closely.",
    body: [
      "Font size and line spacing are two of the few formatting choices that directly change how many pages a document runs to, which makes them tempting to shrink when a report or assignment is running long. Before optimizing for page count, though, it's worth checking whether your department or institution actually specifies a font, size, and spacing for the document — many thesis and project report guidelines are explicit about this (commonly something like 12pt with 1.5 or double spacing), and getting that wrong after a document is finalized and bound is a far more expensive fix than a few extra printed pages would have been.",
      "Where there isn't a fixed requirement, readability is the real constraint to design around. Body text below about 10-11pt starts to strain the eye on paper, especially for someone reading several documents back to back, like an examiner or a coaching mentor marking a stack of submissions. Line spacing matters just as much if the document is meant to be annotated — a viva examiner or a reviewer writing margin comments needs more breathing room between lines than a document meant only to be read straight through, so 1.5 line spacing is a reasonable default for anything that expects handwritten feedback.",
      "Font choice plays a smaller but real role too. Serif fonts like Times New Roman or Garamond are the traditional choice for long, printed body text, since the serifs give the eye a little more to track along a line at smaller sizes; sans-serif fonts like Arial or Calibri read cleanly at headings or larger sizes but can feel more cramped in dense paragraphs at 11-12pt. Whichever you pick, keeping it consistent through the whole document matters more than the specific choice — a font that changes partway through is one of the more obvious signs of a document stitched together from separate pieces.",
      "It's also worth being deliberate about spacing before finalizing a document you're printing in bulk or in multiple copies, since the underlying page-count math is roughly linear: the standard baseline of around 500 words per A4 page assumes something close to single spacing at a normal body size, and moving to double spacing can push a fixed word count into roughly twice as many physical pages, each one billed at the per-page print rate and multiplied across every copy ordered.",
      "As a general default, 11-12pt body text with somewhere between 1.15 and 1.5 line spacing is a legible middle ground for most academic documents unless a specific format sheet says otherwise. Checking the actual guideline before finalizing formatting is always worth the few minutes it takes, since reformatting a document after it's already printed and bound is the expensive version of this problem.",
    ],
  },
  {
    slug: "how-to-tell-paper-gsm-weight-by-feel",
    title: "What GSM Actually Measures — and How to Check Paper Weight on Arrival",
    description:
      "A hands-on companion to our GSM guide: what the number really measures, and simple ways to check paper weight and quality once your order arrives.",
    publishedAt: "2026-03-06",
    category: "Study Guides",
    excerpt:
      "GSM is a precise number on a spec sheet, but almost everyone ends up judging paper the same way — by feel. Here's what you're actually sensing.",
    body: [
      "GSM — grams per square meter — is literally a weight measurement: a one-square-meter sheet of the paper is weighed, and that weight in grams is the GSM number. It's not a direct measurement of thickness or stiffness, though the three are closely related for ordinary printer paper, which is why people naturally reach for touch and feel rather than a scale when judging paper in hand. This is a companion piece to our guide on choosing a GSM weight — this one's about verifying what arrived rather than picking what to order.",
      "Two simple checks translate the GSM number into something you can actually sense. Holding a sheet up to a light source and comparing it against a sheet of a different known weight shows the difference in translucency directly — lighter paper like 65 GSM lets noticeably more light through and shows more text-through from the reverse side, while 100 GSM blocks nearly all of it. A light flick or gentle bend at a corner is the other quick test: lower GSM paper feels floppier with less spring-back, while 85-100 GSM has a noticeably firmer resistance when bent.",
      "On a delivered order, it's worth fanning through the pages to confirm the whole stack feels uniform rather than mixed, and — for a double-sided document — holding a printed sheet up to light to check that text from the other side isn't legible through it at the weight you ordered, since that's really an opacity check but one that tracks GSM closely in practice. If the stack as a whole feels noticeably thinner or heavier than expected for the ordered weight, that's usually visible just from handling the full set rather than any single sheet.",
      "It's worth noting that GSM alone doesn't fully determine how a sheet feels — the specific paper stock and any coating matter too, so two different 75 GSM papers from different mills can feel subtly different from each other. That's rarely worth worrying about for a normal assignment or notes printout, but if a specific project genuinely needs to visually match an earlier batch, ordering one test copy before a larger reprint is the safer way to confirm the match rather than assuming.",
      "If paper on arrival genuinely feels off from what was ordered — clearly thinner, heavier, or less opaque than the checks above would suggest — it's worth reaching out through /contact with the order details rather than guessing at what happened.",
    ],
  },
  {
    slug: "printing-photos-and-image-heavy-pages",
    title: "A Guide to Printing Photos and Image-Heavy Pages Well",
    description:
      "Resolution requirements, common photo-printing mistakes, and when to size up in paper weight for image-heavy documents.",
    publishedAt: "2026-03-10",
    category: "Print Prep",
    excerpt:
      "A photo that looks sharp on a retina screen can print pixelated on paper — here's the resolution math and paper choices that keep it crisp.",
    body: [
      "Printers need meaningfully more pixel density than screens to look sharp at normal viewing distance. The common target for photos is around 300 dpi (dots per inch) at the final printed size, well above the roughly 72-150 ppi most screens display comfortably. In practical terms, a photo that looks perfectly fine as a small image on a phone screen may only have a few hundred pixels in each direction — nowhere near enough to fill even a half-page at 300 dpi — so stretching a low-resolution image up to fill more space on a printed page is the single most common cause of blurry, pixelated prints.",
      "This usually traces back to where the image came from. Photos pulled from WhatsApp are automatically recompressed and downsized in transit, images grabbed from a website are often optimized small for fast page loading, and a screenshot of a photo is always lower quality than the original file. Scaling a small image up inside Word or PowerPoint to fill a bigger space doesn't add real detail either — it just stretches the existing pixels further apart, which is visible immediately once printed at full size.",
      "Paper choice matters for image-heavy pages too. Standard 75 GSM handles diagrams and moderate images without issue, but for pages that are genuinely photo-heavy — a photography portfolio, a poster with large printed photographs — stepping up to 85 or 100 GSM helps in two ways: the heavier stock has a smoother surface that renders color gradients and tonal transitions more evenly, and it resists ink show-through better on double-sided pages, since photo pages typically carry far more ink coverage than plain text.",
      "Before ordering, it's worth zooming into the actual photo at its printed size in the PDF — not just glancing at a thumbnail — since a soft or blurry image at 100% zoom on screen will look at least as soft on paper. It's also worth checking that any color photos aren't using the kind of oversaturated, neon-leaning colors that shift noticeably in the RGB-to-CMYK conversion discussed elsewhere, since skin tones and smooth gradients are exactly where that shift is most visible.",
      "Photos are one of the few places where it's genuinely worth treating a few pages differently from the rest of an otherwise economical, black-and-white document — a higher GSM, color printing, and sometimes single-sided printing just for the image pages, even within a document that's mostly plain text.",
    ],
  },
  {
    slug: "organizing-a-multi-file-print-order",
    title: "How to Organize a Multi-File Print Order Without Mixing Up Settings",
    description:
      "Practical tips for keeping print settings consistent and files clearly labeled when uploading several documents in a single order.",
    publishedAt: "2026-03-13",
    category: "Print Prep",
    excerpt:
      "Uploading ten separate files in one order is convenient right up until the settings get mixed up between them.",
    body: [
      "It's common to place one order that bundles several genuinely different documents — a semester's worth of subject notes, an assignment, and a project report, say — rather than one combined file, especially when they come from different sources or need entirely different binding. Each file in an order like this is its own line item with its own paper, binding, sides, and copy count, which is useful, but it also means a setting chosen for one file doesn't automatically carry over to the next one — it's easy to assume it does and only notice the gap at checkout, or worse, after delivery.",
      "Naming files descriptively before uploading — 'Physics_Notes_Unit3.pdf' rather than 'Scan001.pdf' or 'Untitled.pdf' — makes it much easier to tell at a glance which settings belong to which document once they're all listed together in an order summary, particularly when the files genuinely need different treatment, like five sets of notes going out spiral bound alongside one final report going out hard bound.",
      "For files that are meant to match exactly — five subject notes all printed identically, for instance — it's worth double-checking each one individually rather than assuming a single setting was applied consistently across all of them, since a file quietly left on a default setting is easy to miss in a longer list. Scanning down the paper and binding choices for every line item in the order summary, not just glancing at the total price, is the check that actually catches this.",
      "If several of the files need to be immediately distinguishable once they're all printed and stacked together — say, ten separate contributors' sections of a shared project — it helps to give each one something visually distinct, like its own cover page, rather than relying on remembering the order they were uploaded in once everything looks like a similar stack of paper.",
      "The more files in a single order, the more a final proofing pass before paying is worth the extra couple of minutes — catching a wrong GSM or binding choice on file six of ten before checkout costs nothing, while catching the same mistake after delivery means placing the order again.",
    ],
  },
  {
    slug: "printing-for-job-and-internship-applications",
    title: "How to Make Your Printed Job Application Stand Out",
    description:
      "An editorial guide to printing resumes, cover letters, and portfolios that read as deliberate and professional rather than last-minute.",
    publishedAt: "2026-03-17",
    category: "Study Guides",
    excerpt:
      "A printed resume gets judged the moment it's picked up, before anyone reads a word of it — here's how to get the physical impression right.",
    body: [
      "Printed applications still matter in a lot of contexts — campus placement drives, walk-in interviews, portfolio reviews, networking events — and in those moments, the physical copy someone hands over is often the first impression a recruiter or panel forms, ahead of anything written on the page. Paper weight and finish do real, if subtle, work here alongside the content itself.",
      "For a resume or cover letter, 85-100 GSM paper reads as noticeably more deliberate than a page printed on standard 75 GSM office paper, without needing to go any heavier than that — a resume doesn't need thesis-grade card stock, just something that feels sturdy and considered when picked up and held. If you're bringing a resume alongside a cover letter or a portfolio of work samples, printing the whole set on the same paper in the same order keeps it feeling like one deliberate package rather than a few mismatched printouts assembled at the last minute.",
      "It's worth proofreading the actual printed copy, not just the on-screen version, since formatting issues — a table that wraps oddly, a margin tighter than intended, a font substitution that shifted line breaks — sometimes only become visible once the document is printed at real A4 size rather than viewed on a laptop screen. For a panel interview or a walk-in drive, bringing a few more copies than you expect to need is a small precaution against the avoidable awkwardness of running short mid-interview.",
      "None of this substitutes for strong content — a beautifully printed resume with weak substance is still a weak resume — but for the specific moments where a physical copy is what's actually in front of an interviewer, the extra attention to paper quality and consistency is a small, low-cost way to make sure the printed copy doesn't undersell the work that went into writing it.",
    ],
  },
  {
    slug: "color-modes-and-print-preview-checklist",
    title: "Understanding Color Modes and Print Previews Before You Order",
    description:
      "A practical checklist for catching color and formatting issues in your PDF before paying for a print run you'll want to redo.",
    publishedAt: "2026-03-20",
    category: "Print Prep",
    excerpt:
      "Most avoidable print mistakes are catchable in a couple of minutes of checking a preview — here's what's actually worth looking for.",
    body: [
      "Most printing disappointments aren't fixed by better printing — they're avoided by better checking beforehand. A short, deliberate look through the actual PDF before placing an order catches more problems than any single setting choice does, and it's worth treating as a standard last step rather than an optional one, especially for anything being ordered in more than a couple of copies.",
      "The first thing worth confirming is that the chosen print type actually matches what the content needs, page by page. A document set to black-and-white with one or two pages meant to show a color-coded chart or highlighted diagram will print those specific pages in flat grayscale, and a distinction that depended on color — different categories in a chart, for instance — can become unreadable once it's flattened.",
      "The second is paging all the way through the document, not just skimming the first and last pages, checking that nothing is unexpectedly rotated, cropped at the edge, or scaled oddly relative to the rest of the file. This is most common in documents assembled from multiple sources — scanned pages mixed with typed ones, or slides exported from a presentation — where one source's page size or orientation doesn't quite match the rest.",
      "The third is checking text legibility at the PDF's true 100% zoom rather than a 'fit to window' view, since fitting the page to your screen can make small text look more legible than it will once it's actually printed at A4 size. If body text or footnotes are already hard to read at true 100% zoom on a laptop, they'll be at least as hard to read on the printed page.",
      "It's worth running through all three checks before finalizing any order, and doing it without fail before a bulk order sends the same file out across many copies — a five-minute check against a hundred-copy reprint isn't a close call.",
    ],
  },
  {
    slug: "economical-printing-guide-for-students",
    title: "A Guide to Economical Printing Choices for Students on a Budget",
    description:
      "Where 65 GSM paper, double-sided printing, and black-and-white choices actually save money for students, and where cutting cost backfires.",
    publishedAt: "2026-03-24",
    category: "Study Guides",
    excerpt:
      "Not every economy is a good one — here's where trimming print cost genuinely makes sense on a student budget, and where it backfires.",
    body: [
      "Printing regularly across a semester — notes, readings, practice sets — adds up to real cumulative cost, and a handful of consistent choices make far more difference to that total than agonizing over any single order. It's worth thinking in terms of a semester's printing habits rather than optimizing one print job at a time.",
      "65 GSM eco paper carries the lowest per-page rate on the platform and is genuinely fine for working notes and drafts you'll mark up and eventually replace next revision cycle. The trade-offs are that it's black-and-white only — color isn't offered at this weight — and it's thin enough that some show-through is normal on double-sided pages. That's a reasonable trade for a personal study copy; it's a worse trade for anything being submitted or kept long-term.",
      "Switching from single- to double-sided printing is probably the single biggest lever available, since it roughly halves the number of physical sheets used for the same content — which lowers both the per-page cost and the total shipping weight, since shipping here is priced by weight bracket. Defaulting to double-sided for anything that isn't specifically meant to be written on the back, or submitted under a guideline that requires single-sided pages, is close to a free saving.",
      "Color is the other lever, and it costs meaningfully more per page than black-and-white at every paper weight it's offered on. It's genuinely worth it only when color is doing real communicative work — a labeled diagram, a chart distinguishing categories — not simply because part of a document happens to have color in it. Most PDF viewers and word processors can print a specific page range separately, so it's usually possible to keep one figure in color without paying the color rate across an entire multi-page document.",
      "The most economical approach over a semester is rarely one big decision — it's several small, consistent ones: eco paper for working drafts, standard weight reserved for what's actually submitted, double-sided by default, and color used only where it's earning its cost. Treating every order as a single cheap-or-nice toggle misses most of the actual savings available.",
    ],
  },
  {
    slug: "what-to-do-if-your-print-order-arrives-with-a-defect",
    title: "What to Do If a Printed Order Arrives With a Defect",
    description:
      "How to inspect a print order on arrival, what's reasonable to flag as an issue, and how to report it so it gets resolved quickly.",
    publishedAt: "2026-03-27",
    category: "Print Prep",
    excerpt:
      "Most print issues are far easier to sort out in the first few minutes after delivery than after the order's been put away.",
    body: [
      "It's worth opening and checking a delivered print order soon after it arrives rather than setting it aside for later. Issues like missing pages, an incorrect binding, or inconsistent print quality are much easier to describe and resolve close to delivery, before the order's been separated, marked up, or partially used for whatever it was printed for.",
      "A quick inspection is worth doing methodically: flip through and confirm the page count matches what was ordered, with nothing missing or duplicated; check that the binding matches what was selected and holds together properly with no loose pages; look across the whole document for consistent print quality rather than sharp on some pages and faint or streaky on others, which can point to an issue partway through the run; and confirm the paper feels like the weight that was ordered throughout the stack, not just on the first few sheets.",
      "Some variation is normal and not really a defect — very minor differences in paper whiteness between batches, or tiny alignment differences on double-sided pages, fall into that category. What's genuinely worth flagging is anything that affects usability or clearly doesn't match the order: missing or duplicate pages, the wrong paper weight or binding entirely, print quality bad enough to affect legibility, or physical damage from shipping.",
      "The most effective way to raise an issue is through /contact, with the order number and a clear, specific description of what's wrong — a photo helps a lot here. A precise report ('pages 12 through 15 are noticeably faded compared to the rest') gets resolved faster than a general complaint, since it's immediately clear what needs to be checked.",
      "It's worth keeping expectations general rather than expecting a fixed, pre-defined remedy for every situation — the practical approach is to report clearly and promptly through that contact channel, and the right resolution gets worked out based on what actually happened with that specific order.",
    ],
  },
  {
    slug: "printing-lab-manuals-and-practical-record-books",
    title: "A Guide to Printing Lab Manuals and Practical Record Books",
    description:
      "Why spiral binding suits engineering and science lab records, and how to keep a semester-long practical book durable and complete.",
    publishedAt: "2026-03-31",
    category: "Thesis & Projects",
    excerpt:
      "A lab record has to survive an entire semester of being carried, written in mid-experiment, and signed off week after week — loose sheets don't.",
    body: [
      "Engineering and science students typically keep a running lab manual or practical record book across a whole semester or academic year — aim, procedure, observations, readings, and results for each experiment, often signed off by a faculty member or lab assistant week by week — rather than a document written once and submitted at the end.",
      "Spiral binding suits this use case particularly well. The record needs to lie fully flat while a student is actively writing in it mid-experiment, often on a crowded lab bench with limited space, which loose sheets or a stapled booklet don't manage nearly as well. Spiral also holds up to being opened and closed dozens of times across a semester without the spine loosening, unlike a stapled stack that tends to give out with repeated use.",
      "Loose, unbound sheets are the most common way lab work actually gets lost — a single sheet slipped out of a folder or left behind in a lab is far harder to recover than a page in a bound record, and most departments expect a continuous, dated record rather than a reconstructed one after the fact. Binding the record at the start of a semester, even with most pages still blank, avoids this risk entirely rather than trying to bind everything together only once it's complete.",
      "A practical setup is to print a consistent template across every page — headers for experiment number, date, aim, and a signature line — and bind the full expected set at the start of term based on how many experiments the syllabus specifies, rather than repeatedly reprinting and rebinding as the semester goes on.",
      "75 GSM standard paper is generally sufficient for a lab record's mix of text, tables, and simple diagrams, and holds up fine to a semester of regular handling. There's rarely a reason to go heavier here — these are working documents used constantly through the term rather than formally archived the way a finished thesis is.",
    ],
  },
  {
    slug: "seminar-and-conference-paper-printing-guide",
    title: "A Guide to Seminar and Conference Paper Printing for Researchers",
    description:
      "How soft binding for a submission copy differs from poster printing, and what researchers should check before ordering either.",
    publishedAt: "2026-04-03",
    category: "Thesis & Projects",
    excerpt:
      "A submission copy of a paper and a poster for the same conference need almost opposite print treatments — here's the distinction.",
    body: [
      "Researchers preparing for a seminar or conference often need two very different kinds of printed output for the same event: a manuscript or paper, meant to be read start to finish and annotated by a reviewer or committee, and a poster, meant to be read from several feet away in a room full of other posters. The print requirements for each are close to opposite, and it's worth treating them as separate jobs rather than assuming one set of settings covers both.",
      "For the manuscript itself, soft binding is a common middle ground for a seminar paper or conference submission copy — more finished and professional-looking than a stapled draft, without the cost or permanence of hard binding, which is appropriate for a document representing finished work rather than a once-in-a-degree archival copy. 75-85 GSM handles the usual mix of body text, citations, and the occasional figure or table without needing premium weight.",
      "A poster is a fundamentally different print job. Content needs to read clearly from a few feet away rather than close reading distance, so font sizes and figure resolution requirements scale up substantially compared to a manuscript page, and color is usually doing genuine communicative work — highlighting sections, distinguishing data series — rather than being optional. Any photographs or detailed charts on a poster need to start from high-resolution source images well before scaling up to poster size, since the same resolution math that applies to any image-heavy page only gets less forgiving at a larger physical size.",
      "It's worth checking what output format a conference or venue actually expects before ordering — some accept a single large-format sheet, others expect content tiled across multiple standard sheets — rather than assuming standard A4 printing and binding options apply the same way to a poster as they do to a paper.",
      "For the written paper itself, the same general principle from other academic submissions applies: check the venue's or department's formatting guideline for margins, page size, and expected binding before finalizing the file, since conference and journal submission requirements vary just as much as university thesis requirements do.",
    ],
  },
  {
    slug: "page-count-estimation-handwritten-vs-typed",
    title: "Understanding Page Count Estimation for Handwritten vs Typed Documents",
    description:
      "The reasoning behind word-per-page assumptions used to estimate print page counts, and why handwritten or scanned documents work differently.",
    publishedAt: "2026-04-07",
    category: "Print Prep",
    excerpt:
      "Estimating page count before you print comes down to two very different kinds of math, depending on whether the document is typed or handwritten.",
    body: [
      "Estimating how many printed pages a document will run to is really two different problems depending on the source. A typed document's page count is a function of word count, font size, and line spacing, and has to be estimated before the final file exists. A handwritten or scanned document's page count is already fixed the moment it's written or scanned — every photographed or scanned sheet is already exactly one printed page, with no estimation involved beyond counting the sheets themselves.",
      "For typed documents, a commonly used baseline is roughly 500 words per A4 page at a standard body size (around 11-12pt) and close to single line spacing. That figure comes from ordinary page geometry — something like 40-45 lines fitting on a page at that font size with standard margins, and roughly 10-12 words per line for average English word length — multiplied out to a words-per-page estimate. It's necessarily an approximation, since actual word density shifts with font choice, line spacing, and how much of a document is dense paragraph text versus headings, bullet points, and whitespace.",
      "The estimate breaks down furthest at the edges: a document that's mostly bullet points, headings, or code blocks fits noticeably fewer words per page than the baseline assumes, so a 5,000-word outline or set of slide notes can run to more physical pages than the flat word-count math predicts. Dense academic prose with few breaks, on the other hand, can run close to or even under the estimate.",
      "For handwritten or scanned material, the only real estimation task is making sure every sheet meant to be included is actually captured — a common miscount is forgetting that a sheet written on both sides is two pages, not one, once it's scanned or photographed. Counting the physical stack directly is more reliable here than any formula.",
      "The practical takeaway is to treat a word-count-based estimate as a reasonable planning number for budgeting a typed print job, not an exact prediction. For anything where an exact page count actually matters — hitting a page limit for a submission, for instance — export the finished, formatted document to PDF and check the real page count directly rather than relying on the word-count approximation.",
    ],
  },
  {
    slug: "printing-group-project-reports-with-multiple-contributors",
    title: "A Guide to Printing Group Project Reports With Multiple Contributors",
    description:
      "How to consolidate sections written by different group members into one consistently formatted, print-ready PDF before ordering.",
    publishedAt: "2026-04-10",
    category: "Thesis & Projects",
    excerpt:
      "A group report written by four people in four separate documents rarely looks like one document until someone deliberately makes it one.",
    body: [
      "Group project reports are usually assembled from sections written independently by different members, often in different word processors with different default fonts, heading styles, and page numbering. Simply pasting or merging those sections together tends to make the seams obvious immediately — a heading style that changes partway through, page numbers that reset or skip, margins that shift between sections.",
      "The cleanest fix is agreeing on one shared template — font, heading styles, margins, page size — before anyone starts writing their section. When that didn't happen, the practical remedy is having one person reformat every section into a single master document using consistent styles, rather than each contributor exporting their own section to PDF and merging the PDFs directly, since merging PDFs preserves each section's original formatting rather than fixing it.",
      "Once everything is consolidated into one document, regenerate the table of contents and page numbers from that final combined file rather than trusting numbers carried over from an earlier draft — a table of contents built before consolidation reliably points to the wrong pages once earlier sections change length.",
      "It's worth checking that figures, tables, and citations from different contributors follow one consistent style — the same numbering format and caption style across sections, and one consolidated reference list rather than each section carrying its own — since mismatched figure numbering or duplicate references are some of the more visible signs of a rushed group report.",
      "Building in time for one person to review the fully consolidated PDF start to finish before it goes to print is worth it: that read-through catches formatting seams that no individual contributor would notice from reviewing only their own section, and printing cost is the same either way — catching an inconsistency before ordering is free, and catching it after a bound copy is not.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
