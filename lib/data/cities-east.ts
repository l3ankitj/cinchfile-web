import type { CityData } from "./cities";

export const CITIES_EAST: CityData[] = [
  // --- West Bengal (Kolkata itself is a flagship city, not repeated here) ---
  { slug: "siliguri", name: "Siliguri", state: "West Bengal", stateSlug: "west-bengal", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 5, universities: ["University of North Bengal", "Siliguri Institute of Technology"] },
  { slug: "durgapur", name: "Durgapur", state: "West Bengal", stateSlug: "west-bengal", dispatchHub: "Kolkata", etaMinDays: 1, etaMaxDays: 4 },
  { slug: "asansol", name: "Asansol", state: "West Bengal", stateSlug: "west-bengal", dispatchHub: "Kolkata", etaMinDays: 1, etaMaxDays: 4 },
  { slug: "howrah", name: "Howrah", state: "West Bengal", stateSlug: "west-bengal", dispatchHub: "Kolkata", etaMinDays: 1, etaMaxDays: 3 },
  { slug: "kharagpur", name: "Kharagpur", state: "West Bengal", stateSlug: "west-bengal", dispatchHub: "Kolkata", etaMinDays: 1, etaMaxDays: 4 },
  { slug: "bardhaman", name: "Bardhaman", state: "West Bengal", stateSlug: "west-bengal", dispatchHub: "Kolkata", etaMinDays: 1, etaMaxDays: 4 },
  { slug: "malda", name: "Malda", state: "West Bengal", stateSlug: "west-bengal", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 4 },
  { slug: "baharampur", name: "Baharampur", state: "West Bengal", stateSlug: "west-bengal", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 4 },
  { slug: "krishnanagar", name: "Krishnanagar", state: "West Bengal", stateSlug: "west-bengal", dispatchHub: "Kolkata", etaMinDays: 1, etaMaxDays: 4 },
  { slug: "darjeeling", name: "Darjeeling", state: "West Bengal", stateSlug: "west-bengal", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 6 },
  { slug: "kalimpong", name: "Kalimpong", state: "West Bengal", stateSlug: "west-bengal", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 6 },
  { slug: "jalpaiguri", name: "Jalpaiguri", state: "West Bengal", stateSlug: "west-bengal", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 5 },
  { slug: "cooch-behar", name: "Cooch Behar", state: "West Bengal", stateSlug: "west-bengal", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 5 },
  { slug: "bankura", name: "Bankura", state: "West Bengal", stateSlug: "west-bengal", dispatchHub: "Kolkata", etaMinDays: 1, etaMaxDays: 4 },
  { slug: "purulia", name: "Purulia", state: "West Bengal", stateSlug: "west-bengal", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 4 },

  // --- Odisha ---
  { slug: "bhubaneswar", name: "Bhubaneswar", state: "Odisha", stateSlug: "odisha", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 5, universities: ["IIT Bhubaneswar", "KIIT University", "Utkal University"] },
  { slug: "cuttack", name: "Cuttack", state: "Odisha", stateSlug: "odisha", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 5, universities: ["Ravenshaw University", "SCB Medical College"] },
  { slug: "rourkela", name: "Rourkela", state: "Odisha", stateSlug: "odisha", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 6 },
  { slug: "sambalpur", name: "Sambalpur", state: "Odisha", stateSlug: "odisha", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 6 },
  { slug: "berhampur", name: "Berhampur", state: "Odisha", stateSlug: "odisha", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 5 },
  { slug: "puri", name: "Puri", state: "Odisha", stateSlug: "odisha", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 5 },
  { slug: "balasore", name: "Balasore", state: "Odisha", stateSlug: "odisha", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 4 },
  { slug: "bhadrak", name: "Bhadrak", state: "Odisha", stateSlug: "odisha", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 4 },
  { slug: "angul", name: "Angul", state: "Odisha", stateSlug: "odisha", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 5 },
  { slug: "jharsuguda", name: "Jharsuguda", state: "Odisha", stateSlug: "odisha", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 6 },
  { slug: "koraput", name: "Koraput", state: "Odisha", stateSlug: "odisha", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 6 },
  { slug: "baripada", name: "Baripada", state: "Odisha", stateSlug: "odisha", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 4 },

  // --- Bihar ---
  { slug: "patna", name: "Patna", state: "Bihar", stateSlug: "bihar", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 5, universities: ["Patna University", "IIT Patna", "NIT Patna"] },
  { slug: "gaya", name: "Gaya", state: "Bihar", stateSlug: "bihar", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 5 },
  { slug: "bhagalpur", name: "Bhagalpur", state: "Bihar", stateSlug: "bihar", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 4 },
  { slug: "muzaffarpur", name: "Muzaffarpur", state: "Bihar", stateSlug: "bihar", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 5 },
  { slug: "darbhanga", name: "Darbhanga", state: "Bihar", stateSlug: "bihar", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 6 },
  { slug: "purnia", name: "Purnia", state: "Bihar", stateSlug: "bihar", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 5 },
  { slug: "arrah", name: "Arrah", state: "Bihar", stateSlug: "bihar", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 5 },
  { slug: "begusarai", name: "Begusarai", state: "Bihar", stateSlug: "bihar", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 5 },
  { slug: "chhapra", name: "Chhapra", state: "Bihar", stateSlug: "bihar", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 5 },
  { slug: "katihar", name: "Katihar", state: "Bihar", stateSlug: "bihar", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 5 },
  { slug: "munger", name: "Munger", state: "Bihar", stateSlug: "bihar", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 5 },
  { slug: "bihar-sharif", name: "Bihar Sharif", state: "Bihar", stateSlug: "bihar", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 5 },

  // --- Jharkhand ---
  { slug: "ranchi", name: "Ranchi", state: "Jharkhand", stateSlug: "jharkhand", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 4, universities: ["Birla Institute of Technology, Mesra", "Ranchi University"] },
  { slug: "jamshedpur", name: "Jamshedpur", state: "Jharkhand", stateSlug: "jharkhand", dispatchHub: "Kolkata", etaMinDays: 1, etaMaxDays: 4 },
  { slug: "dhanbad", name: "Dhanbad", state: "Jharkhand", stateSlug: "jharkhand", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 4 },
  { slug: "bokaro", name: "Bokaro", state: "Jharkhand", stateSlug: "jharkhand", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 4 },
  { slug: "deoghar", name: "Deoghar", state: "Jharkhand", stateSlug: "jharkhand", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 4 },
  { slug: "hazaribagh", name: "Hazaribagh", state: "Jharkhand", stateSlug: "jharkhand", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 5 },
  { slug: "giridih", name: "Giridih", state: "Jharkhand", stateSlug: "jharkhand", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 5 },
  { slug: "dumka", name: "Dumka", state: "Jharkhand", stateSlug: "jharkhand", dispatchHub: "Kolkata", etaMinDays: 2, etaMaxDays: 4 },

  // --- Assam ---
  { slug: "guwahati", name: "Guwahati", state: "Assam", stateSlug: "assam", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 6, universities: ["IIT Guwahati", "Gauhati University", "Cotton University"] },
  { slug: "dibrugarh", name: "Dibrugarh", state: "Assam", stateSlug: "assam", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7, universities: ["Dibrugarh University", "Assam Medical College"] },
  { slug: "silchar", name: "Silchar", state: "Assam", stateSlug: "assam", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7 },
  { slug: "jorhat", name: "Jorhat", state: "Assam", stateSlug: "assam", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 7 },
  { slug: "tezpur", name: "Tezpur", state: "Assam", stateSlug: "assam", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 6 },
  { slug: "nagaon", name: "Nagaon", state: "Assam", stateSlug: "assam", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 6 },
  { slug: "tinsukia", name: "Tinsukia", state: "Assam", stateSlug: "assam", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7 },
  { slug: "sivasagar", name: "Sivasagar", state: "Assam", stateSlug: "assam", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7 },
  { slug: "karimganj", name: "Karimganj", state: "Assam", stateSlug: "assam", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7 },
  { slug: "dhubri", name: "Dhubri", state: "Assam", stateSlug: "assam", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 6 },

  // --- Arunachal Pradesh ---
  { slug: "itanagar", name: "Itanagar", state: "Arunachal Pradesh", stateSlug: "arunachal-pradesh", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7 },
  { slug: "naharlagun", name: "Naharlagun", state: "Arunachal Pradesh", stateSlug: "arunachal-pradesh", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7 },
  { slug: "pasighat", name: "Pasighat", state: "Arunachal Pradesh", stateSlug: "arunachal-pradesh", dispatchHub: "Kolkata", etaMinDays: 5, etaMaxDays: 8 },
  { slug: "tawang", name: "Tawang", state: "Arunachal Pradesh", stateSlug: "arunachal-pradesh", dispatchHub: "Kolkata", etaMinDays: 5, etaMaxDays: 8 },
  { slug: "ziro", name: "Ziro", state: "Arunachal Pradesh", stateSlug: "arunachal-pradesh", dispatchHub: "Kolkata", etaMinDays: 5, etaMaxDays: 8 },

  // --- Manipur ---
  { slug: "imphal", name: "Imphal", state: "Manipur", stateSlug: "manipur", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7 },
  { slug: "thoubal", name: "Thoubal", state: "Manipur", stateSlug: "manipur", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7 },
  { slug: "churachandpur", name: "Churachandpur", state: "Manipur", stateSlug: "manipur", dispatchHub: "Kolkata", etaMinDays: 5, etaMaxDays: 8 },

  // --- Meghalaya ---
  { slug: "shillong", name: "Shillong", state: "Meghalaya", stateSlug: "meghalaya", dispatchHub: "Kolkata", etaMinDays: 3, etaMaxDays: 6, universities: ["North Eastern Hill University (NEHU)", "IIM Shillong"] },
  { slug: "tura", name: "Tura", state: "Meghalaya", stateSlug: "meghalaya", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7 },
  { slug: "jowai", name: "Jowai", state: "Meghalaya", stateSlug: "meghalaya", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7 },

  // --- Mizoram ---
  { slug: "aizawl", name: "Aizawl", state: "Mizoram", stateSlug: "mizoram", dispatchHub: "Kolkata", etaMinDays: 5, etaMaxDays: 8 },
  { slug: "lunglei", name: "Lunglei", state: "Mizoram", stateSlug: "mizoram", dispatchHub: "Kolkata", etaMinDays: 5, etaMaxDays: 8 },

  // --- Nagaland ---
  { slug: "kohima", name: "Kohima", state: "Nagaland", stateSlug: "nagaland", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7 },
  { slug: "dimapur", name: "Dimapur", state: "Nagaland", stateSlug: "nagaland", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7 },
  { slug: "mokokchung", name: "Mokokchung", state: "Nagaland", stateSlug: "nagaland", dispatchHub: "Kolkata", etaMinDays: 5, etaMaxDays: 8 },

  // --- Sikkim ---
  { slug: "gangtok", name: "Gangtok", state: "Sikkim", stateSlug: "sikkim", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7 },
  { slug: "namchi", name: "Namchi", state: "Sikkim", stateSlug: "sikkim", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7 },
  { slug: "gyalshing", name: "Gyalshing", state: "Sikkim", stateSlug: "sikkim", dispatchHub: "Kolkata", etaMinDays: 5, etaMaxDays: 8 },

  // --- Tripura ---
  { slug: "agartala", name: "Agartala", state: "Tripura", stateSlug: "tripura", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7 },
  { slug: "udaipur-tripura", name: "Udaipur", state: "Tripura", stateSlug: "tripura", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7 },
  { slug: "dharmanagar", name: "Dharmanagar", state: "Tripura", stateSlug: "tripura", dispatchHub: "Kolkata", etaMinDays: 5, etaMaxDays: 8 },
  { slug: "kailashahar", name: "Kailashahar", state: "Tripura", stateSlug: "tripura", dispatchHub: "Kolkata", etaMinDays: 5, etaMaxDays: 8 },

  // --- Andaman and Nicobar Islands ---
  { slug: "port-blair", name: "Port Blair", state: "Andaman and Nicobar Islands", stateSlug: "andaman-and-nicobar-islands", dispatchHub: "Kolkata", etaMinDays: 4, etaMaxDays: 7 },
  { slug: "diglipur", name: "Diglipur", state: "Andaman and Nicobar Islands", stateSlug: "andaman-and-nicobar-islands", dispatchHub: "Kolkata", etaMinDays: 5, etaMaxDays: 8 },
  { slug: "havelock-island", name: "Havelock Island", state: "Andaman and Nicobar Islands", stateSlug: "andaman-and-nicobar-islands", dispatchHub: "Kolkata", etaMinDays: 5, etaMaxDays: 8 },
];
