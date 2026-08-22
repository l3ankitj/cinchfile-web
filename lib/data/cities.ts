export type DispatchHub = "Pune" | "Kolkata";

export interface CityData {
  slug: string;
  name: string;
  state: string;
  stateSlug: string;
  dispatchHub: DispatchHub;
  etaMinDays: number;
  etaMaxDays: number;
  /** Only populated for cities where we can name real, well-known institutions. */
  universities?: string[];
  /** Only populated for cities where we can name real, well-known neighborhoods. */
  localities?: string[];
  nearbyCitySlugs?: string[];
  /**
   * Hand-written intro/body — only present for flagship cities. When absent,
   * lib/cityContent.ts generates equivalent content from the fields above.
   */
  intro?: string;
  body?: string[];
}

/** Flagship cities with hand-written intro/body — highest content quality. */
export const FLAGSHIP_CITIES: CityData[] = [
  {
    slug: "pune",
    name: "Pune",
    state: "Maharashtra",
    stateSlug: "maharashtra",
    dispatchHub: "Pune",
    etaMinDays: 1,
    etaMaxDays: 3,
    universities: ["Savitribai Phule Pune University", "COEP Technological University", "Symbiosis"],
    localities: ["Kothrud", "Viman Nagar", "Hinjewadi", "Baner", "Hadapsar"],
    nearbyCitySlugs: ["mumbai"],
    intro:
      "Pune is our primary dispatch hub, which means students here typically see the shortest delivery windows on the platform — often next-day.",
    body: [
      "As the city where our main print facility is based, Pune orders skip the inter-city leg entirely. That shows up directly in delivery time: most Pune addresses see prints arrive within 1–3 business days of ordering, faster than almost anywhere else we deliver.",
      "Pune's student population spans engineering, management, and design colleges concentrated around Kothrud, Hinjewadi, and Baner, alongside a large PG and hostel population in Viman Nagar and Hadapsar. Deliveries reach all of these without needing a campus pickup point.",
      "Because prints are made locally, same-order combinations — like a spiral-bound project report plus a separate color-cover thesis copy — are easier to fulfil quickly here than on routes that require a longer transit leg.",
    ],
  },
  {
    slug: "delhi",
    name: "Delhi",
    state: "Delhi",
    stateSlug: "delhi",
    dispatchHub: "Pune",
    etaMinDays: 3,
    etaMaxDays: 7,
    universities: ["University of Delhi", "IIT Delhi", "Jawaharlal Nehru University", "Jamia Millia Islamia"],
    localities: ["Mukherjee Nagar", "North Campus", "South Delhi", "Karol Bagh", "Laxmi Nagar"],
    nearbyCitySlugs: ["mumbai", "kolkata"],
    intro:
      "Delhi's coaching hubs and university campuses generate some of the heaviest print volumes we see, and our routing here is built to keep pace despite the longer haul from the dispatch hub.",
    body: [
      "Delhi is home to one of India's largest concentrations of competitive exam aspirants, with neighbourhoods like Mukherjee Nagar built almost entirely around coaching institutes for UPSC, SSC, banking, and state-level exams. Students here move through cycles of mock tests, current affairs compilations, and revision notes on a near-weekly basis, and most of that has to be printed and bound cleanly to be usable during long study sessions. Coaching centres themselves distribute a lot of material digitally now, which shifts the printing burden onto the student rather than the institute. That's exactly the gap doorstep printing is meant to close — no PDF is much good for annotating in the margins during a mock test.",
      "Beyond the coaching belt, Delhi's university landscape is unusually dense for one city. North Campus around Delhi University, IIT Delhi, and JNU each run on their own academic calendar, but all generate a steady flow of dissertations, seminar papers, and lab reports through the year. Private colleges scattered across South Delhi and Karol Bagh add further volume, especially around semester-end when submission deadlines cluster together. With so many institutions operating in parallel, demand for reliable printing rarely has a genuine off-season.",
      "Delhi sits at the far end of our delivery network from the dispatch hub, and the estimate reflects that honestly rather than promising a turnaround we can't consistently hit. Even with the added distance, having an order delivered directly to a hostel or PG in Mukherjee Nagar or Karol Bagh saves a trip to a local shop during exam season, when queues and machine breakdowns are common complaints. For students juggling coursework and coaching schedules at the same time, that saved afternoon is often worth more than shaving a day off the delivery window.",
    ],
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    stateSlug: "maharashtra",
    dispatchHub: "Pune",
    etaMinDays: 1,
    etaMaxDays: 3,
    universities: ["IIT Bombay", "University of Mumbai", "NMIMS", "TISS"],
    localities: ["Powai", "Andheri", "Dadar", "Vile Parle", "Kandivali"],
    nearbyCitySlugs: ["pune", "bangalore"],
    intro:
      "Mumbai sits close enough to our Pune dispatch hub that orders here often move almost as fast as Pune's own, despite being a different city altogether.",
    body: [
      "Mumbai sits close enough to our Pune dispatch hub that orders here move almost as quickly as Pune's own, despite being a different city entirely. The short transit leg means routing adds very little extra time compared to cities further down the network. For a city known for its traffic and packed local trains, that head start matters more than it might elsewhere — students don't need to build in extra buffer days just to stay safe before a deadline.",
      "Mumbai's student population is spread wide across the city rather than clustered around one campus. IIT Bombay's research-heavy environment in Powai sits alongside the many colleges affiliated with the University of Mumbai scattered through the suburbs, and institutions like NMIMS and TISS add further pockets of demand in their own neighbourhoods. Layered on top of that is a large population of young working professionals living in areas like Andheri and Dadar, who need documents printed and bound for work rather than coursework. Between the two groups, demand for dependable printing runs well past the college calendar.",
      "Finding a decent print shop near a hostel or PG in a city this spread out can mean crossing town on a local train just for a spiral binding. Ordering online and having it delivered to the door in Powai, Andheri, or Vile Parle skips that entirely. It's a particularly useful trade when submission deadlines and work hours don't leave much room for a shop run in the middle of the day.",
    ],
  },
  {
    slug: "bangalore",
    name: "Bangalore",
    state: "Karnataka",
    stateSlug: "karnataka",
    dispatchHub: "Pune",
    etaMinDays: 2,
    etaMaxDays: 5,
    universities: ["Indian Institute of Science (IISc)", "Bangalore University", "RV College of Engineering", "Christ University"],
    localities: ["Koramangala", "Whitefield", "Jayanagar", "BTM Layout", "Marathahalli"],
    nearbyCitySlugs: ["chennai", "hyderabad"],
    intro:
      "Bangalore's mix of engineering colleges and a large working tech population keeps year-round demand for both academic and professional printing steady.",
    body: [
      "Bangalore is one of India's major centres for engineering education and research, anchored by institutions like the Indian Institute of Science alongside a wide spread of engineering colleges across the city. Semester-end periods bring a predictable rush of project reports, lab records, and research papers that need to be printed and bound correctly on the first attempt, since most departments don't leave room for reprints close to a deadline. Colleges like RV College of Engineering and Bangalore University add to that volume across different parts of the city rather than one concentrated campus zone.",
      "The city's tech industry adds a different kind of demand on top of the academic calendar. A large population of working professionals lives in the same neighbourhoods as students — Koramangala, Whitefield, and Marathahalli in particular — and often need documents, portfolios, or certification study material printed outside standard shop hours. That overlap between student and professional printing needs keeps demand fairly constant through the year rather than spiking only around exams.",
      "Bangalore is a longer route from our Pune hub than some of the other cities we serve, so the delivery estimate reflects that honestly instead of promising a same-city turnaround. What it offers instead is predictability — a scheduled dispatch beats hunting for a print shop that's open and not already backed up, especially in traffic-heavy pockets like BTM Layout or Whitefield during peak submission weeks. For students in outer neighbourhoods far from their own campus print counter, that predictability often matters more than shaving off a single day.",
    ],
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    stateSlug: "telangana",
    dispatchHub: "Pune",
    etaMinDays: 2,
    etaMaxDays: 4,
    universities: ["IIT Hyderabad", "University of Hyderabad", "Osmania University", "BITS Pilani Hyderabad Campus"],
    localities: ["Ameerpet", "Gachibowli", "Kukatpally", "Madhapur", "Secunderabad"],
    nearbyCitySlugs: ["bangalore", "chennai"],
    intro:
      "Hyderabad's coaching and certification culture around Ameerpet gives it a print demand pattern that looks a lot like Delhi's — just with a shorter run to our dispatch hub.",
    body: [
      "Hyderabad's engineering college density keeps academic printing in steady demand through the year. IIT Hyderabad and the University of Hyderabad sit alongside a large cluster of institutions around Gachibowli and Kukatpally, each producing their own steady stream of thesis chapters, project reports, and lab manuals. Because so many colleges are spread across the western part of the city, delivery has to reach a wide radius rather than one central campus zone.",
      "Ameerpet adds an entirely different kind of volume to the mix. It's one of the country's best-known hubs for IT certification and skills coaching, drawing students and working candidates from across the region into a tight cluster of training institutes. That concentration means a constant churn of study material, practice tests, and course notes, most of it needed on short notice rather than planned weeks in advance. It's a pattern that looks a lot like Delhi's coaching belt, just on a smaller geographic footprint.",
      "Hyderabad sits at a moderate distance from our Pune hub, which keeps its delivery window tighter than routes running further south. Doorstep delivery to hostels and PGs around Madhapur or Secunderabad also means skipping a trip to already-crowded print shops near Ameerpet during peak coaching intake periods, when walk-in queues can eat up most of an afternoon. For students balancing coursework with a certification course on the side, that saved time adds up quickly.",
    ],
  },
  {
    slug: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    stateSlug: "tamil-nadu",
    dispatchHub: "Pune",
    etaMinDays: 3,
    etaMaxDays: 6,
    universities: ["IIT Madras", "Anna University", "University of Madras", "SRM Institute of Science and Technology"],
    localities: ["Velachery", "Adyar", "T. Nagar", "Guindy", "Tambaram"],
    nearbyCitySlugs: ["bangalore", "hyderabad"],
    intro:
      "Chennai's deep engineering and research culture, anchored by IIT Madras, makes precise binding and formatting non-negotiable for a lot of what we print here.",
    body: [
      "Chennai's academic scene is built around serious technical output. IIT Madras, Anna University, and a wide network of engineering colleges including SRM Institute of Science and Technology produce a steady stream of thesis submissions, technical project reports, and research papers through the year. Many of these come with strict formatting and binding requirements set by individual departments, which makes consistency in print quality more important here than in most cities we serve.",
      "Chennai is one of the farther cities we serve from our Pune dispatch hub, so the transit leg is longer and the delivery estimate accounts for that rather than glossing over it. What that trade-off buys students is consistency — the same paper stock and binding quality whether an order lands during a quiet week or the days right before a submission deadline. It's a small thing, but it matters when a department rejects a report over binding alone.",
      "Delivery reaches student clusters across Velachery, Tambaram, and Guindy without requiring a campus pickup point. That matters in a city where getting from a hostel to a reliable print shop and back can eat up an afternoon that would be better spent finishing the report itself. For students juggling lab work, coursework, and placement preparation at the same time, cutting that errand out of the schedule is worth more than it sounds.",
    ],
  },
  {
    slug: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    stateSlug: "west-bengal",
    dispatchHub: "Kolkata",
    etaMinDays: 1,
    etaMaxDays: 3,
    universities: ["University of Calcutta", "Jadavpur University", "Indian Statistical Institute", "St. Xavier's College, Kolkata"],
    localities: ["Salt Lake", "Jadavpur", "College Street", "Park Circus", "Behala"],
    nearbyCitySlugs: ["delhi", "hyderabad"],
    intro:
      "Kolkata is our second dispatch hub, so orders placed here skip the long-distance transit leg entirely — much like Pune's own advantage.",
    body: [
      "Kolkata is our second dispatch hub, which means orders placed here skip the long-distance transit leg entirely, much like Pune's own advantage as the primary hub. That local dispatch translates directly into some of the fastest turnaround times on the platform, on par with what Pune sees rather than trailing behind it. It also means Kolkata orders aren't affected by delays further up a longer supply chain, since the print run happens in the same city as the delivery.",
      "Kolkata has a long tradition of printed academic work, and that shows in the volume we see from University of Calcutta and Jadavpur University students working through dissertations and seminar papers, alongside research-heavy output from institutes like the Indian Statistical Institute. Competitive exam aspirants preparing for WBCS and other state and central government exams add a further, steady stream of printed notes and practice material. College Street has been the city's print and book hub for generations, but its narrow lanes and packed shopfronts aren't always practical when what's needed is a clean, properly bound copy delivered on schedule rather than picked up in person.",
      "With the hub based locally, deliveries reach student neighbourhoods like Salt Lake, Jadavpur, and Park Circus quickly and reliably. That gives Kolkata students much the same doorstep convenience Pune students get, without the trade-off of a longer cross-country route eating into the timeline. For a city with as much printed academic tradition as Kolkata has, having that speed available locally is a natural fit rather than an afterthought.",
    ],
  },
];

// Long-tail city coverage, split by region into separate files so they can be
// authored independently without conflicting edits. Content for these is
// generated by lib/cityContent.ts from the factual fields alone (no
// hand-written intro/body).
import { CITIES_NORTH } from "./cities-north";
import { CITIES_SOUTH } from "./cities-south";
import { CITIES_EAST } from "./cities-east";
import { CITIES_WEST } from "./cities-west";

export const CITIES: CityData[] = [
  ...FLAGSHIP_CITIES,
  ...CITIES_NORTH,
  ...CITIES_SOUTH,
  ...CITIES_EAST,
  ...CITIES_WEST,
];

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}
