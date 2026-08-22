export interface StateData {
  slug: string;
  name: string;
  majorCities: string[];
  /** Hand-written — only present for flagship states. Falls back to lib/stateContent.ts when absent. */
  intro?: string;
  body?: string[];
}

export const STATES: StateData[] = [
  {
    slug: "maharashtra",
    name: "Maharashtra",
    majorCities: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    intro:
      "Doorstep printing for students across Maharashtra, dispatched from our Pune hub with some of the shortest delivery windows on the platform.",
    body: [
      "Maharashtra is home to a dense cluster of engineering colleges, medical institutes, and coaching centers, and our Pune dispatch hub sits right in the middle of that demand. Orders from Mumbai, Pune, Nashik, and Nagpur typically move faster than routes served from our other hub, simply because of the shorter last-mile distance.",
      "Whether it's a semester-end project report bound for submission or a full thesis destined for a university library copy, the same per-page rate card and paper options apply no matter which city in the state you're ordering from.",
      "Students in smaller towns across the state are covered too — if your pincode isn't listed as a named city, use the calculator to confirm your delivery estimate before ordering.",
    ],
  },
  {
    slug: "gujarat",
    name: "Gujarat",
    majorCities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    intro:
      "Print orders from anywhere in Gujarat are routed through our nearest dispatch hub, with transparent pricing and doorstep delivery.",
    body: [
      "Gujarat's engineering and management institutes generate a steady stream of project reports, case studies, and thesis submissions every semester. Ordering online means one checkout for mixed print settings — B&W for the body, color for cover pages and diagrams — instead of negotiating each separately at a local shop.",
      "Delivery timing depends on your exact pincode; cities closer to our dispatch hubs generally see faster turnaround than more remote addresses, and the exact estimate is always shown before you pay.",
    ],
  },
  {
    slug: "madhya-pradesh",
    name: "Madhya Pradesh",
    majorCities: ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
    intro:
      "Wholesale printing rates and doorstep delivery for students across Madhya Pradesh's engineering, medical, and coaching hubs.",
    body: [
      "From competitive exam coaching notes in Indore to engineering project reports in Bhopal, students across Madhya Pradesh use Cinchfile to skip the local photocopy queue and get consistent, professional print quality delivered directly to their hostel or home address.",
      "All four paper weights and every binding option are available regardless of city — the rate card doesn't change based on location, only the delivery timeline does.",
    ],
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    majorCities: ["Jaipur", "Kota", "Udaipur", "Jodhpur"],
    intro:
      "From Kota's coaching institutes to Jaipur's universities, print your notes and assignments online with delivery across Rajasthan.",
    body: [
      "Kota's competitive exam coaching ecosystem alone generates enormous demand for printed study material — bulk notes, test series, and reference material that benefit from wholesale per-page pricing rather than one-off local printing.",
      "Students in Jaipur, Udaipur, and Jodhpur use the same checkout flow for thesis printing, project reports, and semester assignments, with binding options that meet standard university submission formats.",
    ],
  },
  {
    slug: "uttar-pradesh",
    name: "Uttar Pradesh",
    majorCities: ["Lucknow", "Kanpur", "Noida", "Allahabad"],
    intro:
      "Doorstep document printing for India's most populous state, covering university towns and coaching hubs alike.",
    body: [
      "Uttar Pradesh's universities and competitive exam coaching centers — from Lucknow to Noida to Allahabad — are covered by the same transparent per-page rate card as every other state, with delivery timelines shown by pincode at checkout.",
      "Bulk orders for coaching institutes and print runs for individual students both go through the same streamlined upload-and-configure flow, with volume-based savings applied automatically as page counts grow.",
    ],
  },
  // Remaining states and union territories — content generated via lib/stateContent.ts
  { slug: "andhra-pradesh", name: "Andhra Pradesh", majorCities: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"] },
  { slug: "arunachal-pradesh", name: "Arunachal Pradesh", majorCities: ["Itanagar", "Naharlagun", "Pasighat"] },
  { slug: "assam", name: "Assam", majorCities: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"] },
  { slug: "bihar", name: "Bihar", majorCities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"] },
  { slug: "chhattisgarh", name: "Chhattisgarh", majorCities: ["Raipur", "Bhilai", "Bilaspur", "Durg"] },
  { slug: "goa", name: "Goa", majorCities: ["Panaji", "Margao", "Vasco da Gama"] },
  { slug: "haryana", name: "Haryana", majorCities: ["Gurugram", "Faridabad", "Panipat", "Ambala"] },
  { slug: "himachal-pradesh", name: "Himachal Pradesh", majorCities: ["Shimla", "Manali", "Dharamshala", "Solan"] },
  { slug: "jharkhand", name: "Jharkhand", majorCities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"] },
  { slug: "karnataka", name: "Karnataka", majorCities: ["Bangalore", "Mysuru", "Mangaluru", "Hubballi"] },
  { slug: "kerala", name: "Kerala", majorCities: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"] },
  { slug: "manipur", name: "Manipur", majorCities: ["Imphal"] },
  { slug: "meghalaya", name: "Meghalaya", majorCities: ["Shillong"] },
  { slug: "mizoram", name: "Mizoram", majorCities: ["Aizawl"] },
  { slug: "nagaland", name: "Nagaland", majorCities: ["Kohima", "Dimapur"] },
  { slug: "odisha", name: "Odisha", majorCities: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur"] },
  { slug: "punjab", name: "Punjab", majorCities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"] },
  { slug: "sikkim", name: "Sikkim", majorCities: ["Gangtok"] },
  { slug: "tamil-nadu", name: "Tamil Nadu", majorCities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"] },
  { slug: "telangana", name: "Telangana", majorCities: ["Hyderabad", "Warangal", "Nizamabad"] },
  { slug: "tripura", name: "Tripura", majorCities: ["Agartala"] },
  { slug: "uttarakhand", name: "Uttarakhand", majorCities: ["Dehradun", "Haridwar", "Rishikesh", "Nainital"] },
  { slug: "west-bengal", name: "West Bengal", majorCities: ["Kolkata", "Siliguri", "Durgapur", "Asansol"] },
  // Union Territories
  { slug: "andaman-and-nicobar-islands", name: "Andaman and Nicobar Islands", majorCities: ["Port Blair"] },
  { slug: "chandigarh", name: "Chandigarh", majorCities: ["Chandigarh"] },
  { slug: "dadra-and-nagar-haveli-and-daman-and-diu", name: "Dadra and Nagar Haveli and Daman and Diu", majorCities: ["Silvassa", "Daman"] },
  { slug: "delhi", name: "Delhi", majorCities: ["New Delhi", "Dwarka", "Rohini"] },
  { slug: "jammu-and-kashmir", name: "Jammu and Kashmir", majorCities: ["Srinagar", "Jammu"] },
  { slug: "ladakh", name: "Ladakh", majorCities: ["Leh", "Kargil"] },
  { slug: "lakshadweep", name: "Lakshadweep", majorCities: ["Kavaratti"] },
  { slug: "puducherry", name: "Puducherry", majorCities: ["Puducherry", "Karaikal"] },
];

export function getStateBySlug(slug: string): StateData | undefined {
  return STATES.find((s) => s.slug === slug);
}
