// SchemeWise shared dataset — schemes, camps, eligibility engine
// Demo camps are labelled as sample data. Schemes use publicly available official information.

export interface EligibilityRules {
  minAge?: number;
  maxAge?: number;
  gender?: "female" | "male";
  incomeLimit?: number;
  occupations?: string[];
  familySizeMax?: number;
  states?: string[];
  otherCriteria?: string;
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  stateCoverage: string;
  targetGroups: string[];
  benefitType: string;
  eligibilityRules: EligibilityRules;
  requiredDocuments: string[];
  applicationSteps: string[];
  officialUrl: string;
  officialSource: string;
  lastUpdated: string;
  incomeNote?: string;
}

export const incomeRanges = [
  { value: "below-50000", label: "Below ₹50,000 a year" },
  { value: "50000-100000", label: "₹50,000 – ₹1,00,000" },
  { value: "100000-200000", label: "₹1,00,000 – ₹2,00,000" },
  { value: "200000-300000", label: "₹2,00,000 – ₹3,00,000" },
  { value: "300000-500000", label: "₹3,00,000 – ₹5,00,000" },
  { value: "above-500000", label: "Above ₹5,00,000" },
];

export const incomeMax: Record<string, number> = {
  "below-50000": 50000,
  "50000-100000": 100000,
  "100000-200000": 200000,
  "200000-300000": 300000,
  "300000-500000": 500000,
  "above-500000": Infinity,
};

export const occupations = [
  { value: "student", label: "Student" },
  { value: "farmer", label: "Farmer / agricultural work" },
  { value: "daily-wage", label: "Daily-wage / informal work" },
  { value: "salaried", label: "Salaried (private)" },
  { value: "government", label: "Government employee / pensioner" },
  { value: "self-employed", label: "Self-employed" },
  { value: "homemaker", label: "Homemaker" },
  { value: "unemployed", label: "Unemployed" },
  { value: "other", label: "Other" },
];

export const states = [
  "Andhra Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
  "Odisha","Punjab","Rajasthan","Tamil Nadu","Telangana","Uttar Pradesh","Uttarakhand",
  "West Bengal","Other / Union Territory",
];

export const schemes: Scheme[] = [
  {
    id: "pmjay",
    name: "Ayushman Bharat PM-JAY",
    description:
      "India's largest health insurance scheme. Covers free treatment up to ₹5 lakh per family per year at empanelled public and private hospitals.",
    benefits: [
      "Cashless treatment up to ₹5 lakh per family per year",
      "Covers 1,900+ medical procedures, including surgery and hospitalisation",
      "No cap on family size, age or gender",
      "Valid at all empanelled hospitals across India",
    ],
    stateCoverage: "All India",
    targetGroups: ["Low-income families identified under SECC", "Families without existing health cover"],
    benefitType: "Health Insurance",
    eligibilityRules: {
      minAge: 0,
      incomeLimit: 300000,
      otherCriteria:
        "Priority goes to families listed in the SECC deprivation database or covered by state-specific criteria. Income is an indicator — actual coverage depends on the official beneficiary list.",
    },
    requiredDocuments: [
      "Aadhaar card",
      "Ration card (used to check the SECC beneficiary list)",
      "Mobile number for OTP verification",
    ],
    applicationSteps: [
      "Check whether your family name appears on the official PM-JAY 'Am I Eligible?' portal.",
      "If listed, visit a nearby Ayushman card creation centre (often at empanelled hospitals or Common Service Centres).",
      "Verify identity with Aadhaar and collect your Ayushman card.",
      "Use the card at any empanelled hospital for cashless treatment.",
    ],
    officialUrl: "https://pmjay.gov.in",
    officialSource: "National Health Authority, Government of India",
    lastUpdated: "November 2024",
    incomeNote:
      "Income is only an indicator. Final coverage is decided by the official SECC beneficiary list, not by SchemeWise.",
  },
  {
    id: "jsy",
    name: "Janani Suraksha Yojana (JSY)",
    description:
      "A safe-motherhood scheme that promotes institutional delivery by giving cash assistance to pregnant women who deliver in a public health facility.",
    benefits: [
      "Cash assistance for institutional delivery in a government facility",
      "Free delivery and caesarean sections at public hospitals",
      "Referral transport support in case of emergency",
    ],
    stateCoverage: "All India (assistance amounts vary by state)",
    targetGroups: ["Pregnant women", "Women from low-income households"],
    benefitType: "Maternal & Child Health",
    eligibilityRules: {
      minAge: 18,
      gender: "female",
      incomeLimit: 300000,
      otherCriteria: "Applies to pregnant women who deliver in a public health facility. Higher assistance in low-performing states.",
    },
    requiredDocuments: [
      "Aadhaar card",
      "MCP (Mother and Child Protection) card",
      "Bank account details for cash transfer",
    ],
    applicationSteps: [
      "Register the pregnancy at the nearest Anganwadi centre or public health facility.",
      "Plan the delivery at a government hospital or PHC/CHC.",
      "The cash assistance is credited after delivery, usually through the hospital or directly to the bank account.",
    ],
    officialUrl: "https://nhm.gov.in",
    officialSource: "National Health Mission, Ministry of Health & Family Welfare",
    lastUpdated: "November 2024",
  },
  {
    id: "pmmvy",
    name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    description:
      "A maternity benefit programme that provides a cash incentive to pregnant women and lactating mothers for the first living child.",
    benefits: [
      "₹5,000 cash benefit for the first living child",
      "Paid in instalments linked to pregnancy registration, antenatal check-ups and registration of the child's birth",
    ],
    stateCoverage: "All India",
    targetGroups: ["Pregnant women aged 19+", "Lactating mothers with their first living child"],
    benefitType: "Maternal & Child Health",
    eligibilityRules: {
      minAge: 19,
      gender: "female",
      otherCriteria: "Applies to the first living child. The woman should not be employed by the central or state government.",
    },
    requiredDocuments: [
      "Aadhaar card",
      "Bank account linked to Aadhaar",
      "MCP card / pregnancy registration proof",
      "Child birth certificate (for later instalments)",
    ],
    applicationSteps: [
      "Fill Form 1-A on the official PMMVY portal or through the Anganwadi centre within 150 days of LMP.",
      "Attach Aadhaar, bank details and MCP card.",
      "Track the claim on the PMMVY portal; instalments are credited to the linked bank account.",
    ],
    officialUrl: "https://pmmvy.wcd.gov.in",
    officialSource: "Ministry of Women & Child Development",
    lastUpdated: "November 2024",
  },
  {
    id: "rbsk",
    name: "Rashtriya Bal Swasthya Karyakram (RBSK)",
    description:
      "A child health screening programme under the National Health Mission. Children from birth to 18 years are screened for the '4 Ds' — defects, deficiencies, diseases and developmental delays.",
    benefits: [
      "Free health screening at Anganwadi centres and government schools",
      "Early detection of birth defects, deficiencies, diseases and developmental delays",
      "Free referral and follow-up treatment at district hospitals",
    ],
    stateCoverage: "All India",
    targetGroups: ["Children aged 0–6 (Anganwadi)", "School children aged 6–18"],
    benefitType: "Free Screening",
    eligibilityRules: {
      maxAge: 18,
      otherCriteria: "Screening happens through schools and Anganwadi centres. No income condition applies.",
    },
    requiredDocuments: [],
    applicationSteps: [
      "No separate application is needed — screening teams visit schools and Anganwadi centres on schedule.",
      "If your child is not in school or Anganwadi, contact the local Anganwadi worker or PHC to be included.",
      "Children needing care are referred to the nearest District Early Intervention Centre (DEIC).",
    ],
    officialUrl: "https://nhm.gov.in",
    officialSource: "National Health Mission, Ministry of Health & Family Welfare",
    lastUpdated: "November 2024",
  },
  {
    id: "pmdialysis",
    name: "Pradhan Mantri National Dialysis Programme",
    description:
      "Provides free dialysis services to Below Poverty Line (BPL) kidney patients at district hospitals under public-private partnership.",
    benefits: [
      "Free haemodialysis sessions at district hospitals",
      "Consumables, medicines and dialysis staff covered",
      "Reduces the need to travel to large cities for treatment",
    ],
    stateCoverage: "All India (available at participating district hospitals)",
    targetGroups: ["BPL kidney patients requiring dialysis"],
    benefitType: "Medicine Assistance",
    eligibilityRules: {
      incomeLimit: 100000,
      otherCriteria: "For patients diagnosed with kidney failure requiring maintenance dialysis, with a BPL certificate.",
    },
    requiredDocuments: [
      "BPL certificate / ration card",
      "Doctor's prescription or medical report confirming dialysis need",
      "Aadhaar card",
    ],
    applicationSteps: [
      "Get a referral or prescription from a government hospital nephrologist.",
      "Visit the dialysis unit at your district hospital with the BPL certificate.",
      "The hospital registers the patient and schedules dialysis sessions.",
    ],
    officialUrl: "https://nhm.gov.in",
    officialSource: "National Health Mission, Ministry of Health & Family Welfare",
    lastUpdated: "November 2024",
  },
  {
    id: "pmposhan",
    name: "PM POSHAN (Mid-Day Meal)",
    description:
      "Provides one hot cooked mid-day meal to children studying in government and government-aided schools, improving nutrition and school attendance.",
    benefits: [
      "One nutritious hot meal every school day",
      "Supplementary nutrition for pre-primary children in schools",
      "Supports attendance and concentration in class",
    ],
    stateCoverage: "All India",
    targetGroups: ["Students of classes 1–8 in government / aided schools", "Pre-primary children in such schools"],
    benefitType: "Nutrition",
    eligibilityRules: {
      minAge: 3,
      maxAge: 16,
      occupations: ["student"],
      otherCriteria: "Applies to children enrolled in government or government-aided schools. Provided automatically at school.",
    },
    requiredDocuments: [],
    applicationSteps: [
      "No application is required — meals are provided at school.",
      "If your child is enrolled and not receiving the meal, contact the school headmaster.",
    ],
    officialUrl: "https://pmposhan.education.gov.in",
    officialSource: "Ministry of Education",
    lastUpdated: "November 2024",
  },
  {
    id: "cghs",
    name: "Central Government Health Scheme (CGHS)",
    description:
      "Comprehensive healthcare for central government employees and pensioners through wellness centres and empanelled hospitals.",
    benefits: [
      "Outpatient care, medicines and specialist consultations at CGHS wellness centres",
      "Cashless hospitalisation at empanelled private hospitals",
      "Cover for dependent family members",
    ],
    stateCoverage: "Selected cities across India",
    targetGroups: ["Central government employees", "Central government pensioners and their dependents"],
    benefitType: "Health Insurance",
    eligibilityRules: {
      occupations: ["government"],
      otherCriteria: "Only for serving or retired central government employees living in CGHS-covered cities.",
    },
    requiredDocuments: [
      "Service or pension identity proof",
      "Government ID (Aadhaar)",
      "Family member details for dependent cards",
    ],
    applicationSteps: [
      "Apply for a CGHS card through the department (for employees) or the CGHS portal (for pensioners).",
      "Choose a wellness centre near your residence.",
      "Use the CGHS card at wellness centres and empanelled hospitals.",
    ],
    officialUrl: "https://cghs.gov.in",
    officialSource: "Ministry of Health & Family Welfare",
    lastUpdated: "November 2024",
  },
  {
    id: "nphce",
    name: "National Programme for Health Care of the Elderly (NPHCE)",
    description:
      "Dedicated, accessible and affordable healthcare services for people aged 60 and above, including geriatric OPD and day-care at district hospitals.",
    benefits: [
      "Geriatric OPD services at district hospitals",
      "Physiotherapy and day-care for the elderly",
      "Priority and dedicated facilities at public hospitals",
    ],
    stateCoverage: "All India (phased rollout)",
    targetGroups: ["Senior citizens aged 60+", "Caregivers of elderly patients"],
    benefitType: "Elderly Care",
    eligibilityRules: {
      minAge: 60,
      otherCriteria: "No income condition. Available at hospitals implementing NPHCE.",
    },
    requiredDocuments: ["Proof of age (Aadhaar, voter ID or similar)"],
    applicationSteps: [
      "Visit the geriatric OPD or helpdesk at your district hospital.",
      "Register with proof of age and receive a consultation.",
      "Follow the treatment or physiotherapy plan advised by the doctor.",
    ],
    officialUrl: "https://mohfw.gov.in",
    officialSource: "Ministry of Health & Family Welfare",
    lastUpdated: "November 2024",
  },
];

export interface Camp {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  district: string;
  services: string[];
  organiser: string;
  contact: string;
  registrationUrl: string | null;
}

export const campServices = [
  "General health screening","Blood pressure screening","Diabetes screening",
  "Eye screening","Dental screening","Vaccination","Women's health screening",
];

// Demo camps — dates are generated relative to today so the sample data always
// shows a mix of upcoming and completed camps. Clearly labelled as sample data.
const day = (n: number) => new Date(Date.now() + n * 86400000).toISOString().slice(0, 10);

export const camps: Camp[] = [
  {
    id: "camp-1",
    name: "Community Health Screening Day",
    date: day(5),
    time: "9:00 AM – 3:00 PM",
    location: "Corporation Community Hall, Anna Nagar",
    district: "Chennai",
    services: ["General health screening", "Blood pressure screening", "Diabetes screening"],
    organiser: "District Health Society (sample data)",
    contact: "Available on the notice board of the venue",
    registrationUrl: null,
  },
  {
    id: "camp-2",
    name: "Women's Wellness Camp",
    date: day(9),
    time: "10:00 AM – 2:00 PM",
    location: "Government Higher Secondary School, Gandhipuram",
    district: "Coimbatore",
    services: ["Women's health screening", "General health screening", "Dental screening"],
    organiser: "Urban Primary Health Centre (sample data)",
    contact: "Contact the local UPHC office",
    registrationUrl: null,
  },
  {
    id: "camp-3",
    name: "Child Immunisation & Eye Screening Drive",
    date: day(14),
    time: "9:30 AM – 1:30 PM",
    location: "Taluk Hospital Campus",
    district: "Madurai",
    services: ["Vaccination", "Eye screening"],
    organiser: "Block Medical Office (sample data)",
    contact: "Contact the taluk hospital helpdesk",
    registrationUrl: null,
  },
  {
    id: "camp-4",
    name: "Senior Citizen Health Check-up Camp",
    date: day(21),
    time: "8:00 AM – 12:00 PM",
    location: "Mahatma Gandhi Government College Grounds",
    district: "Tiruchirappalli",
    services: ["General health screening", "Blood pressure screening", "Diabetes screening", "Eye screening"],
    organiser: "NPHCE Unit, District Hospital (sample data)",
    contact: "Contact the district hospital geriatric OPD",
    registrationUrl: null,
  },
  {
    id: "camp-5",
    name: "Free Dental & Diabetes Screening Camp",
    date: day(-4),
    time: "9:00 AM – 2:00 PM",
    location: "Community Health Centre",
    district: "Chennai",
    services: ["Dental screening", "Diabetes screening"],
    organiser: "District Health Society (sample data)",
    contact: "—",
    registrationUrl: null,
  },
];

export function isUpcoming(camp: Camp) {
  return camp.date >= new Date().toISOString().slice(0, 10);
}

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });
}

export interface Answers {
  age: number;
  gender: string;
  state: string;
  income: string;
  occupation: string;
  familySize: number;
}

export interface MatchResult {
  scheme: Scheme;
  reasons: string[];
}

export function matchSchemes(a: Answers): { matches: MatchResult[] } {
  const matches: MatchResult[] = [];
  for (const s of schemes) {
    const r = s.eligibilityRules;
    const reasons: string[] = [];
    let ok = true;
    if (r.minAge != null) {
      if (a.age < r.minAge) ok = false;
      else reasons.push(`Age ${a.age} meets the minimum age of ${r.minAge} for this scheme.`);
    }
    if (r.maxAge != null) {
      if (a.age > r.maxAge) ok = false;
      else reasons.push(`Age ${a.age} is within the scheme's age range (up to ${r.maxAge}).`);
    }
    if (r.gender) {
      if (a.gender !== r.gender) ok = false;
      else reasons.push(r.gender === "female" ? "The scheme is for women, which matches your answer." : "The scheme is for men, which matches your answer.");
    }
    if (r.incomeLimit != null) {
      const max = incomeMax[a.income] ?? Infinity;
      if (max > r.incomeLimit) ok = false;
      else reasons.push("Your household income range is within the scheme's income limit.");
    }
    if (r.occupations) {
      if (!r.occupations.includes(a.occupation)) ok = false;
      else reasons.push("Your occupation matches the group this scheme serves.");
    }
    if (r.familySizeMax != null) {
      if (a.familySize > r.familySizeMax) ok = false;
      else reasons.push(`Your family size (${a.familySize}) is within the limit of ${r.familySizeMax}.`);
    }
    if (r.states) {
      if (!r.states.includes(a.state)) ok = false;
      else reasons.push(`${a.state} is covered by this scheme.`);
    }
    if (ok) matches.push({ scheme: s, reasons });
  }
  return { matches };
}
