// ============================================================
// Illango Dentistry — All clinic data as typed constants
// ============================================================

// ---------- Types ----------
export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  experience: string;
  bio: string;
  image: string;
  social: { linkedin?: string; twitter?: string };
}

export interface Service {
  id: string;
  title: string;
  category: "general" | "cosmetic" | "surgical";
  icon: string; // lucide icon name
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  priceHint: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  mapEmbedUrl: string;
  hours: { day: string; time: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  rating: number;
  text: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// ---------- Doctors ----------
export const doctors: Doctor[] = [
  {
    id: "dr-illango",
    name: "Dr. Illango",
    title: "Principal Dentist & Orthodontist",
    specialty: "Orthodontics & Implant Dentistry",
    experience: "25+ years",
    bio: "Dr. Illango has been caring for patients for over 25 years, bringing vast experience in all procedures of dentistry. He focuses on enhancing each patient's smile and optimizing their oral health with personalized treatment plans.",
    image: "/images/doctor-illango.png",
    social: { linkedin: "#" },
  },
  {
    id: "dr-janaki",
    name: "Dr. Janaki Illango",
    title: "Associate Dentist",
    specialty: "General & Cosmetic Dentistry",
    experience: "15+ years",
    bio: "Dr. Janaki Illango specializes in cosmetic dentistry and restorative procedures, helping patients achieve their dream smiles with the latest techniques and technologies.",
    image: "/images/doctor-janaki.png",
    social: { linkedin: "#" },
  },
  {
    id: "dr-dangi",
    name: "Dr. Uday Dangi",
    title: "Associate Dentist",
    specialty: "Oral Surgery & Implants",
    experience: "12+ years",
    bio: "Dr. Uday Dangi brings extensive experience in oral surgery, including wisdom teeth extractions and dental implant procedures, ensuring comfortable and safe treatments.",
    image: "/images/doctor-illango.png",
    social: { linkedin: "#" },
  },
  {
    id: "dr-hamed",
    name: "Dr. Jannati Hamed",
    title: "Associate Dentist",
    specialty: "Pediatric & Family Dentistry",
    experience: "10+ years",
    bio: "Dr. Jannati Hamed is passionate about family dentistry, providing gentle and comprehensive dental care for patients of all ages, from children to seniors.",
    image: "/images/doctor-janaki.png",
    social: { linkedin: "#" },
  },
  {
    id: "dr-reza",
    name: "Dr. Mirlohi Ali Reza",
    title: "Visiting Specialist",
    specialty: "Periodontics & Gum Treatment",
    experience: "18+ years",
    bio: "Dr. Ali Reza is a visiting specialist at our Scarborough office, providing expert periodontal treatments and gum disease management.",
    image: "/images/doctor-illango.png",
    social: { linkedin: "#" },
  },
  {
    id: "dr-patel",
    name: "Dr. Mayanakkumar Patel",
    title: "Associate Dentist",
    specialty: "Endodontics & Root Canals",
    experience: "8+ years",
    bio: "Dr. Patel specializes in endodontic treatments, including complex root canal procedures, using state-of-the-art technology for precise and painless care.",
    image: "/images/doctor-illango.png",
    social: { linkedin: "#" },
  },
];

// ---------- Services ----------
export const services: Service[] = [
  {
    id: "orthodontics",
    title: "Orthodontics",
    category: "cosmetic",
    icon: "SmilePlus",
    shortDescription:
      "Braces and aligners for children and adults to create perfectly aligned smiles.",
    fullDescription:
      "Our orthodontic treatments include traditional braces, clear aligners, and retainers for patients of all ages. Dr. Illango's 25+ years of experience ensures optimal results with personalized treatment plans tailored to each patient's unique dental structure.",
    benefits: [
      "Custom treatment plans",
      "Options for children & adults",
      "Clear aligner alternatives",
      "Regular progress monitoring",
    ],
    priceHint: "From $2,500",
  },
  {
    id: "wisdom-teeth",
    title: "Wisdom Teeth Surgery",
    category: "surgical",
    icon: "Syringe",
    shortDescription:
      "Safe and comfortable wisdom teeth removal, including surgery under sedation.",
    fullDescription:
      "We offer expert wisdom teeth extraction with options for local anesthesia or sedation (sleep dentistry) at our Scarborough office. Our experienced oral surgeons ensure minimal discomfort and quick recovery.",
    benefits: [
      "Sedation options available",
      "Experienced oral surgeons",
      "Quick recovery protocols",
      "Post-surgery care guidance",
    ],
    priceHint: "From $300/tooth",
  },
  {
    id: "implants",
    title: "Dental Implants",
    category: "surgical",
    icon: "Puzzle",
    shortDescription:
      "Start-to-finish implant dentistry for permanent tooth replacement solutions.",
    fullDescription:
      "Our comprehensive implant dentistry program covers the entire process from initial consultation to final restoration. Dental implants provide a permanent, natural-looking replacement for missing teeth that function just like your original teeth.",
    benefits: [
      "Permanent tooth replacement",
      "Natural look & feel",
      "Start-to-finish care",
      "Long-lasting results",
    ],
    priceHint: "From $3,000",
  },
  {
    id: "root-canals",
    title: "Root Canals",
    category: "general",
    icon: "Activity",
    shortDescription:
      "Painless root canal therapy to save damaged or infected teeth.",
    fullDescription:
      "Modern root canal treatment is virtually painless. Our endodontic specialists use advanced technology to remove infected tissue, clean the canal, and seal it to prevent future infection while preserving your natural tooth.",
    benefits: [
      "Virtually painless procedure",
      "Saves natural teeth",
      "Advanced technology",
      "Same-day treatment available",
    ],
    priceHint: "From $800",
  },
  {
    id: "crown-bridge",
    title: "Crown & Bridgework",
    category: "cosmetic",
    icon: "Crown",
    shortDescription:
      "Custom-crafted crowns and bridges to restore damaged or missing teeth.",
    fullDescription:
      "We create custom crowns and bridges using the finest materials to restore your teeth's natural appearance and function. Our digital impression technology ensures a perfect fit every time.",
    benefits: [
      "Custom-crafted for perfect fit",
      "Natural appearance",
      "Durable materials",
      "Digital impressions",
    ],
    priceHint: "From $1,200",
  },
  {
    id: "restoration",
    title: "Restoration",
    category: "general",
    icon: "Sparkles",
    shortDescription:
      "Comprehensive restorative dentistry including fillings, bonding, and more.",
    fullDescription:
      "Our restoration services include composite fillings, dental bonding, inlays, onlays, and full mouth rehabilitation. We focus on preserving as much natural tooth structure as possible while restoring function and aesthetics.",
    benefits: [
      "Tooth-colored fillings",
      "Preserves natural teeth",
      "Multiple options available",
      "Long-lasting results",
    ],
    priceHint: "From $200",
  },
];

// ---------- Locations ----------
export const locations: Location[] = [
  {
    id: "scarborough",
    name: "Scarborough",
    address: "3852 Finch Avenue East, Unit 204 & 303, Scarborough, ON M1T 3T9",
    phone: "416-292-7004",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.5!2d-79.2998!3d43.8009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d1dc7b781c6b%3A0x0f0b4053b063aaa5!2s3852+Finch+Ave+E%2C+Scarborough%2C+ON+M1T+3T9!5e0!3m2!1sen!2sca!4v1",
    hours: [
      { day: "Monday", time: "9:00 AM – 7:00 PM" },
      { day: "Tuesday", time: "9:00 AM – 7:00 PM" },
      { day: "Wednesday", time: "9:00 AM – 7:00 PM" },
      { day: "Thursday", time: "9:00 AM – 7:00 PM" },
      { day: "Friday", time: "9:00 AM – 7:00 PM" },
      { day: "Saturday", time: "9:00 AM – 7:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
  },
  {
    id: "markham",
    name: "Markham",
    address: "9500 Markham Road, Unit 107, Markham, ON L6E 0N6",
    phone: "905-472-7223",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.3!2d-79.2633!3d43.8722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d6c1f8b2d2d7%3A0x0!2s9500+Markham+Rd%2C+Markham%2C+ON+L6E+0N6!5e0!3m2!1sen!2sca!4v1",
    hours: [
      { day: "Monday", time: "10:00 AM – 7:00 PM" },
      { day: "Tuesday", time: "10:00 AM – 6:00 PM" },
      { day: "Wednesday", time: "Closed" },
      { day: "Thursday", time: "10:00 AM – 6:00 PM" },
      { day: "Friday", time: "10:00 AM – 6:00 PM" },
      { day: "Saturday", time: "10:00 AM – 5:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
  },
  {
    id: "brampton",
    name: "Brampton",
    address: "7920 Hurontario Street, Brampton, ON L6Y 0P7",
    phone: "905-457-1700",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.5!2d-79.7314!3d43.6646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3fd00022f188%3A0x045b39347b8759e4!2s7920+Hurontario+St%2C+Brampton%2C+ON+L6Y+0P7!5e0!3m2!1sen!2sca!4v1",
    hours: [
      { day: "Monday", time: "10:00 AM – 7:00 PM" },
      { day: "Tuesday", time: "10:00 AM – 7:00 PM" },
      { day: "Wednesday", time: "10:00 AM – 7:00 PM" },
      { day: "Thursday", time: "10:00 AM – 7:00 PM" },
      { day: "Friday", time: "10:00 AM – 7:00 PM" },
      { day: "Saturday", time: "10:00 AM – 7:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
  },
];

// ---------- Testimonials ----------
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah M.",
    treatment: "Orthodontics",
    rating: 5,
    text: "Dr. Illango transformed my smile! After years of being self-conscious, I finally have the confidence to smile freely. The entire team was incredibly supportive throughout my orthodontic journey.",
    image: "/images/happy-patient.png",
  },
  {
    id: "t2",
    name: "Raj P.",
    treatment: "Dental Implants",
    rating: 5,
    text: "I was terrified of getting implants, but Dr. Dangi made the entire process painless and comfortable. My new teeth look and feel completely natural. Highly recommend!",
    image: "/images/happy-patient.png",
  },
  {
    id: "t3",
    name: "Michelle L.",
    treatment: "Root Canal",
    rating: 5,
    text: "I can't believe how painless my root canal was! The team at Illango Dentistry uses amazing technology. I was in and out in under an hour. Thank you for saving my tooth!",
    image: "/images/happy-patient.png",
  },
  {
    id: "t4",
    name: "David K.",
    treatment: "Wisdom Teeth",
    rating: 5,
    text: "Had all four wisdom teeth removed under sedation. Woke up and it was done! Recovery was smooth thanks to the detailed aftercare instructions. Best dental experience ever.",
    image: "/images/happy-patient.png",
  },
  {
    id: "t5",
    name: "Priya N.",
    treatment: "Crown & Bridge",
    rating: 5,
    text: "The crown work Dr. Janaki did is flawless — you can't tell which teeth are natural and which are crowns. The digital impressions were so much better than the old goop method!",
    image: "/images/happy-patient.png",
  },
  {
    id: "t6",
    name: "James W.",
    treatment: "General Checkup",
    rating: 5,
    text: "Been coming here for 10+ years. The clinic is always spotless, the staff is friendly, and they genuinely care about your dental health. Wouldn't go anywhere else!",
    image: "/images/happy-patient.png",
  },
];

// ---------- Blog Posts ----------
export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "5 Tips for Maintaining Healthy Teeth Between Visits",
    excerpt:
      "Learn the essential daily habits that keep your teeth and gums healthy, from proper brushing techniques to the best foods for dental health.",
    category: "Dental Care",
    readTime: "4 min read",
    icon: "Heart",
  },
  {
    id: "b2",
    title: "What to Expect During Your First Orthodontic Consultation",
    excerpt:
      "Thinking about braces or aligners? Here's everything you need to know about your first visit, from X-rays to treatment planning.",
    category: "Orthodontics",
    readTime: "5 min read",
    icon: "Stethoscope",
  },
  {
    id: "b3",
    title: "Dental Implants vs. Bridges: Which Is Right for You?",
    excerpt:
      "Compare the pros, cons, and costs of dental implants versus traditional bridges to make the best decision for your smile.",
    category: "Procedures",
    readTime: "6 min read",
    icon: "Scale",
  },
];

// ---------- FAQs ----------
export const faqs: FAQ[] = [
  {
    question: "Do you accept insurance?",
    answer:
      "Yes, we accept most major dental insurance plans. We also offer direct billing to make the process as seamless as possible. Please contact our office to verify your coverage.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Please bring your valid photo ID, dental insurance card, a list of current medications, and any recent dental X-rays. You can also fill out our patient forms online before your visit.",
  },
  {
    question: "Do you offer emergency dental services?",
    answer:
      "Yes, we accommodate dental emergencies during our regular business hours. If you're experiencing severe pain, swelling, or trauma, please call us immediately and we'll fit you in as soon as possible.",
  },
  {
    question: "Is sedation available for dental procedures?",
    answer:
      "Yes, we offer sedation dentistry (sleep dentistry) at our Scarborough office for procedures like wisdom teeth removal. This ensures a completely comfortable and anxiety-free experience.",
  },
  {
    question: "How often should I visit the dentist?",
    answer:
      "We recommend visiting every 6 months for regular check-ups and cleanings. However, if you have specific dental concerns or conditions, your dentist may recommend more frequent visits.",
  },
  {
    question: "What payment options do you offer?",
    answer:
      "We accept cash, debit, Visa, MasterCard, and most dental insurance plans. We also offer flexible payment plans for major procedures to make dental care accessible for everyone.",
  },
];

// ---------- Service Categories ----------
export const serviceCategories = [
  { id: "all", label: "All Services" },
  { id: "general", label: "General" },
  { id: "cosmetic", label: "Cosmetic" },
  { id: "surgical", label: "Surgical" },
] as const;

// ---------- Stats ----------
export const stats = [
  { label: "Years Experience", value: 25, suffix: "+" },
  { label: "Happy Patients", value: 50000, suffix: "+" },
  { label: "Clinic Locations", value: 3, suffix: "" },
  { label: "Dental Specialists", value: 6, suffix: "" },
] as const;

// ---------- Chatbot Responses ----------
export const chatbotResponses: Record<string, string> = {
  greeting:
    "Hello! 👋 Welcome to Illango Dentistry. I can help you with booking appointments, finding our locations, learning about our services, or answering common dental questions. How can I help you today?",
  appointment:
    "I'd love to help you book an appointment! You can:\n\n1. Use the booking form on our website (scroll down to 'Book Appointment')\n2. Call us directly:\n   • Scarborough: 416-292-7004\n   • Markham: 905-472-7223\n   • Brampton: 905-457-1700\n\nWhat location works best for you?",
  services:
    "We offer a wide range of dental services:\n\n🦷 Orthodontics (children & adults)\n🔧 Wisdom Teeth Surgery\n🏗️ Dental Implants (start to finish)\n🔬 Root Canals\n👑 Crown & Bridgework\n✨ Restoration\n\nWould you like to know more about any of these?",
  locations:
    "We have 3 convenient locations:\n\n📍 Scarborough: 3852 Finch Ave E\n📍 Markham: 9500 Markham Rd\n📍 Brampton: 7920 Hurontario St\n\nAll locations are open Mon-Sat with evening hours!",
  insurance:
    "Yes! We accept most major dental insurance plans and offer direct billing. We also accept cash, debit, Visa, and MasterCard. Contact us to verify your specific coverage.",
  emergency:
    "For dental emergencies during business hours, please call us immediately:\n\n🚨 Scarborough: 416-292-7004\n🚨 Markham: 905-472-7223\n🚨 Brampton: 905-457-1700\n\nWe'll fit you in as soon as possible!",
  hours:
    "Our office hours:\n\n🏢 Scarborough: Mon-Sat 9AM-7PM\n🏢 Markham: Mon-Sat (varies), Wed closed\n🏢 Brampton: Mon-Sat 10AM-7PM\n\nAll locations are closed on Sundays.",
  default:
    "I'm not sure I understand. Here are some things I can help with:\n\n• Book an appointment\n• Our services\n• Office locations & hours\n• Insurance & payment\n• Emergency dental care\n\nPlease try one of these topics or call us directly!",
};
