// ===== ALLIANCE HOSPITAL DATA =====

const DOCTORS = [
  // Cardiology
  { id: 1,  name: "Dr. Abebe Girma",       specialty: "Cardiologist",               dept: "Cardiology",    qual: "MD, FACC",               exp: "18 years",  icon: "👨‍⚕️" },
  { id: 2,  name: "Dr. Selamawit Tadesse", specialty: "Interventional Cardiologist",dept: "Cardiology",    qual: "MD, PhD",                exp: "14 years",  icon: "👩‍⚕️" },
  { id: 3,  name: "Dr. Yonas Bekele",      specialty: "Cardiac Surgeon",            dept: "Cardiology",    qual: "MBBS, MCh",              exp: "20 years",  icon: "👨‍⚕️" },

  // Neurology
  { id: 4,  name: "Dr. Tigist Haile",      specialty: "Neurologist",                dept: "Neurology",     qual: "MD, DM (Neurology)",     exp: "12 years",  icon: "👩‍⚕️" },
  { id: 5,  name: "Dr. Dawit Solomon",     specialty: "Neurosurgeon",               dept: "Neurology",     qual: "MBBS, MS (Neuro)",       exp: "16 years",  icon: "👨‍⚕️" },

  // Orthopedics
  { id: 6,  name: "Dr. Henok Mulugeta",    specialty: "Orthopedic Surgeon",         dept: "Orthopedics",   qual: "MBBS, MS (Ortho)",       exp: "15 years",  icon: "👨‍⚕️" },
  { id: 7,  name: "Dr. Mekdes Alemu",      specialty: "Spine Specialist",           dept: "Orthopedics",   qual: "MD, Fellowship (Spine)", exp: "10 years",  icon: "👩‍⚕️" },

  // Pediatrics
  { id: 8,  name: "Dr. Rahel Tesfaye",     specialty: "Pediatrician",               dept: "Pediatrics",    qual: "MD, DCH",                exp: "13 years",  icon: "👩‍⚕️" },
  { id: 9,  name: "Dr. Tesfaye Worku",     specialty: "Neonatologist",              dept: "Pediatrics",    qual: "MD, DNB (Pediatrics)",   exp: "11 years",  icon: "👨‍⚕️" },

  // Oncology
  { id: 10, name: "Dr. Frehiwot Mekonnen", specialty: "Medical Oncologist",         dept: "Oncology",      qual: "MD, DM (Oncology)",      exp: "17 years",  icon: "👩‍⚕️" },
  { id: 11, name: "Dr. Kirubel Zenebe",    specialty: "Radiation Oncologist",       dept: "Oncology",      qual: "MD, DNB (Radio)",        exp: "12 years",  icon: "👨‍⚕️" },

  // Gastroenterology
  { id: 12, name: "Dr. Hana Tadesse",      specialty: "Gastroenterologist",         dept: "Gastroenterology", qual: "MD, DM (Gastro)",    exp: "9 years",   icon: "👩‍⚕️" },
  { id: 13, name: "Dr. Biniam Kifle",      specialty: "Hepatologist",               dept: "Gastroenterology", qual: "MD, Fellowship",     exp: "14 years",  icon: "👨‍⚕️" },

  // Pulmonology
  { id: 14, name: "Dr. Aster Zewdie",      specialty: "Pulmonologist",              dept: "Pulmonology",   qual: "MD, DM (Pulmo)",         exp: "11 years",  icon: "👩‍⚕️" },
  { id: 15, name: "Dr. Mikael Gebre",      specialty: "Respiratory Therapist",      dept: "Pulmonology",   qual: "MD, FCCP",               exp: "8 years",   icon: "👨‍⚕️" },

  // Obstetrics & Gynecology
  { id: 16, name: "Dr. Birtukan Hailu",    specialty: "Obstetrician-Gynecologist",  dept: "OB/GYN",        qual: "MD, MRCOG",              exp: "16 years",  icon: "👩‍⚕️" },
  { id: 17, name: "Dr. Liya Mengistu",     specialty: "Fertility Specialist",       dept: "OB/GYN",        qual: "MD, DGO",                exp: "10 years",  icon: "👩‍⚕️" },

  // Ophthalmology
  { id: 18, name: "Dr. Samuel Woldemariam",specialty: "Ophthalmologist",            dept: "Ophthalmology", qual: "MBBS, DO, DNB",          exp: "13 years",  icon: "👨‍⚕️" },

  // ENT
  { id: 19, name: "Dr. Nebat Assefa",      specialty: "ENT Specialist",             dept: "ENT",           qual: "MD, MS (ENT)",           exp: "11 years",  icon: "👩‍⚕️" },
  { id: 20, name: "Dr. Yohannes Bekele",   specialty: "Otolaryngologist",           dept: "ENT",           qual: "MD, FRCS",               exp: "15 years",  icon: "👨‍⚕️" },

  // Dermatology
  { id: 21, name: "Dr. Meron Girma",       specialty: "Dermatologist",              dept: "Dermatology",   qual: "MD, DVD",                exp: "9 years",   icon: "👩‍⚕️" },

  // Endocrinology
  { id: 22, name: "Dr. Amanuel Tefera",    specialty: "Endocrinologist",            dept: "Endocrinology", qual: "MD, DM (Endo)",          exp: "12 years",  icon: "👨‍⚕️" },
  { id: 23, name: "Dr. Tsehay Solomon",    specialty: "Diabetologist",              dept: "Endocrinology", qual: "MD, Fellowship (Diab)",  exp: "10 years",  icon: "👩‍⚕️" },

  // Nephrology
  { id: 24, name: "Dr. Mebratu Lema",      specialty: "Nephrologist",               dept: "Nephrology",    qual: "MD, DM (Nephro)",        exp: "13 years",  icon: "👨‍⚕️" },

  // Urology
  { id: 25, name: "Dr. Bereket Assefa",    specialty: "Urologist",                  dept: "Urology",       qual: "MBBS, MS (Urology)",     exp: "11 years",  icon: "👨‍⚕️" },

  // Psychiatry
  { id: 26, name: "Dr. Tigist Alemneh",    specialty: "Psychiatrist",               dept: "Psychiatry",    qual: "MD, DPM",                exp: "14 years",  icon: "👩‍⚕️" },
  { id: 27, name: "Dr. Elias Teshome",     specialty: "Child Psychiatrist",         dept: "Psychiatry",    qual: "MD, Fellowship",         exp: "8 years",   icon: "👨‍⚕️" },

  // Rheumatology
  { id: 28, name: "Dr. Hiwot Desta",       specialty: "Rheumatologist",             dept: "Rheumatology",  qual: "MD, DM (Rheum)",         exp: "10 years",  icon: "👩‍⚕️" },

  // General Surgery
  { id: 29, name: "Dr. Fitsum Haile",      specialty: "General Surgeon",            dept: "General Surgery",qual: "MBBS, MS (Surgery)",    exp: "19 years",  icon: "👨‍⚕️" },
  { id: 30, name: "Dr. Selam Kassa",       specialty: "Laparoscopic Surgeon",       dept: "General Surgery",qual: "MD, Fellowship (Lap)",   exp: "12 years",  icon: "👩‍⚕️" },

  // Emergency Medicine
  { id: 31, name: "Dr. Mulugeta Wube",     specialty: "Emergency Physician",        dept: "Emergency",     qual: "MD, FCEM",               exp: "10 years",  icon: "👨‍⚕️" },
  { id: 32, name: "Dr. Azeb Belachew",     specialty: "Trauma Specialist",          dept: "Emergency",     qual: "MD, ATLS Instructor",    exp: "9 years",   icon: "👩‍⚕️" },

  // Anesthesiology
  { id: 33, name: "Dr. Teshome Girma",     specialty: "Anesthesiologist",           dept: "Anesthesiology",qual: "MD, DA",                 exp: "15 years",  icon: "👨‍⚕️" },

  // Radiology
  { id: 34, name: "Dr. Wubet Mengesha",    specialty: "Radiologist",                dept: "Radiology",     qual: "MD, DNB (Radiology)",    exp: "12 years",  icon: "👨‍⚕️" },
  { id: 35, name: "Dr. Yeshi Tadesse",     specialty: "Interventional Radiologist", dept: "Radiology",     qual: "MD, EBIR",               exp: "10 years",  icon: "👩‍⚕️" },

  // Dental
  { id: 36, name: "Dr. Girma Wolde",       specialty: "Oral & Maxillofacial Surgeon",dept: "Dental",       qual: "BDS, MDS",               exp: "14 years",  icon: "👨‍⚕️" },
  { id: 37, name: "Dr. Almaz Bekele",      specialty: "Orthodontist",               dept: "Dental",        qual: "BDS, MDS (Ortho)",       exp: "9 years",   icon: "👩‍⚕️" },

  // Physiotherapy
  { id: 38, name: "Dr. Kebede Eshetu",     specialty: "Physiotherapist",            dept: "Rehabilitation",qual: "BPT, MPT",               exp: "11 years",  icon: "👨‍⚕️" },

  // Hematology
  { id: 39, name: "Dr. Betelehem Yimer",   specialty: "Hematologist",               dept: "Hematology",    qual: "MD, DM (Hematology)",    exp: "12 years",  icon: "👩‍⚕️" },

  // Infectious Disease
  { id: 40, name: "Dr. Abel Gebremedhin",  specialty: "Infectious Disease Specialist",dept: "Internal Medicine",qual: "MD, Fellowship (ID)", exp: "13 years", icon: "👨‍⚕️" },

  // Additional specialists
  { id: 41, name: "Dr. Fikirte Asefa",     specialty: "Plastic & Reconstructive Surgeon",dept: "Surgery", qual: "MBBS, MCh (Plastic)",   exp: "10 years",  icon: "👩‍⚕️" },
  { id: 42, name: "Dr. Natnael Solomon",   specialty: "Vascular Surgeon",           dept: "Surgery",       qual: "MBBS, MS (Vascular)",    exp: "14 years",  icon: "👨‍⚕️" },
];

const DEPARTMENTS = [
  { id: "cardiology",       name: "Cardiology",         icon: "🫀", desc: "Comprehensive heart care including diagnostics, interventional procedures, and cardiac surgery.", doctors: 3 },
  { id: "neurology",        name: "Neurology",          icon: "🧠", desc: "Expert assessment and treatment of neurological disorders, stroke, epilepsy, and brain surgery.", doctors: 2 },
  { id: "orthopedics",      name: "Orthopedics",        icon: "🦴", desc: "Joint replacement, sports injuries, spine surgery, and comprehensive musculoskeletal care.", doctors: 2 },
  { id: "pediatrics",       name: "Pediatrics",         icon: "👶", desc: "Specialised care for newborns, infants, children, and adolescents including NICU services.", doctors: 2 },
  { id: "oncology",         name: "Oncology",           icon: "🔬", desc: "Advanced cancer care including medical oncology, radiation therapy, and supportive care.", doctors: 2 },
  { id: "obgyn",            name: "Obstetrics & Gynecology", icon: "🤱", desc: "Complete women's health services from prenatal care to complex gynecological surgery.", doctors: 2 },
  { id: "gastroenterology", name: "Gastroenterology",   icon: "🏥", desc: "Diagnosis and treatment of digestive system disorders, liver disease, and endoscopy.", doctors: 2 },
  { id: "pulmonology",      name: "Pulmonology",        icon: "🫁", desc: "Treatment of respiratory conditions including asthma, COPD, and pulmonary fibrosis.", doctors: 2 },
  { id: "ophthalmology",    name: "Ophthalmology",      icon: "👁️", desc: "Eye care services including cataract surgery, retinal procedures, and glaucoma management.", doctors: 1 },
  { id: "ent",              name: "ENT",                icon: "👂", desc: "Treatment of ear, nose, and throat conditions including hearing loss and sinus surgery.", doctors: 2 },
  { id: "dermatology",      name: "Dermatology",        icon: "🧴", desc: "Medical and cosmetic dermatology covering skin conditions, acne, psoriasis, and more.", doctors: 1 },
  { id: "endocrinology",    name: "Endocrinology",      icon: "⚗️", desc: "Management of hormonal disorders including diabetes, thyroid, and metabolic conditions.", doctors: 2 },
  { id: "emergency",        name: "Emergency Medicine", icon: "🚨", desc: "24/7 emergency care with rapid-response trauma teams and critical care support.", doctors: 2 },
  { id: "radiology",        name: "Radiology",          icon: "🩻", desc: "Advanced imaging including MRI, CT scan, X-ray, ultrasound, and interventional radiology.", doctors: 2 },
  { id: "dental",           name: "Dental & Oral",      icon: "🦷", desc: "Complete dental services from routine checkups and orthodontics to oral surgery.", doctors: 2 },
];

// Department color palette (gradient pairs)
const DEPT_COLORS = {
  "Cardiology":       ["#c0392b","#922b21"],
  "Neurology":        ["#2471a3","#1a5276"],
  "Orthopedics":      ["#1e8449","#145a32"],
  "Pediatrics":       ["#d68910","#b7770d"],
  "Oncology":         ["#7d3c98","#6c3483"],
  "OB/GYN":           ["#cb4335","#a93226"],
  "Gastroenterology": ["#117864","#0e6655"],
  "Pulmonology":      ["#2e86c1","#1a5276"],
  "Ophthalmology":    ["#117a65","#0e6655"],
  "ENT":              ["#d35400","#ba4a00"],
  "Dermatology":      ["#e67e22","#ca6f1e"],
  "Endocrinology":    ["#1abc9c","#17a589"],
  "Nephrology":       ["#2980b9","#2471a3"],
  "Urology":          ["#27ae60","#1e8449"],
  "Psychiatry":       ["#8e44ad","#7d3c98"],
  "Rheumatology":     ["#c0392b","#a93226"],
  "General Surgery":  ["#2c3e50","#1a252f"],
  "Emergency":        ["#e74c3c","#cb4335"],
  "Anesthesiology":   ["#34495e","#2c3e50"],
  "Radiology":        ["#16a085","#138d75"],
  "Dental":           ["#2980b9","#1c6ea4"],
  "Rehabilitation":   ["#27ae60","#219653"],
  "Hematology":       ["#c0392b","#96281b"],
  "Internal Medicine":["#2c3e50","#1c2833"],
  "Surgery":          ["#2c3e50","#273746"],
};

function deptGradient(dept) {
  const c = DEPT_COLORS[dept] || ["#0057a8","#003f7a"];
  return `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
}

function getInitials(name) {
  return name.replace(/^(Dr\.|Mr\.|Ms\.|Sr\.|Pharm\.)?\s*/,'').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
}

// ===== PHARMACY STAFF =====
const PHARMACISTS = [
  { name: "Pharm. Eyerusalem Haile",  title: "Chief Pharmacist",        qual: "BPharm, MSc Clinical Pharmacy",      exp: "14 years", gender: "f" },
  { name: "Pharm. Kibrom Tesfaye",    title: "Clinical Pharmacist",      qual: "BPharm, Cert. Oncology Pharmacy",    exp: "9 years",  gender: "m" },
  { name: "Pharm. Mekdes Wolde",      title: "Inpatient Pharmacist",     qual: "BPharm, MSc Pharmacotherapy",        exp: "7 years",  gender: "f" },
  { name: "Pharm. Natnael Girma",     title: "Outpatient Pharmacist",    qual: "BPharm, Dipl. Hospital Pharmacy",    exp: "5 years",  gender: "m" },
  { name: "Pharm. Selam Desta",       title: "Clinical Drug Counsellor", qual: "BPharm, Cert. Patient Counselling",  exp: "6 years",  gender: "f" },
  { name: "Pharm. Biniam Mengesha",   title: "Compounding Pharmacist",   qual: "BPharm, Cert. Sterile Compounding",  exp: "8 years",  gender: "m" },
];

// ===== LABORATORY STAFF =====
const LAB_STAFF = [
  { name: "Mr. Bereket Alemu",    title: "Chief Laboratory Scientist",     qual: "BSc MLT, MSc Clinical Biochemistry", exp: "16 years", gender: "m" },
  { name: "Ms. Tigist Bekele",    title: "Haematology Specialist",          qual: "BSc MLT, Cert. Haematology",         exp: "11 years", gender: "f" },
  { name: "Mr. Dawit Mengistu",   title: "Microbiology Technologist",       qual: "BSc Microbiology, MSc Bacteriology", exp: "9 years",  gender: "m" },
  { name: "Ms. Hana Tesfaye",     title: "Histopathology Technician",       qual: "BSc MLT, FIBMS",                     exp: "8 years",  gender: "f" },
  { name: "Mr. Yohannes Kassa",   title: "Biochemistry Analyst",            qual: "BSc Clinical Chemistry",             exp: "6 years",  gender: "m" },
  { name: "Ms. Selam Girma",      title: "Immunology Technologist",         qual: "BSc MLT, Cert. Immunology",          exp: "7 years",  gender: "f" },
  { name: "Mr. Abel Teferi",      title: "Blood Bank Supervisor",           qual: "BSc MLT, Cert. Transfusion Medicine", exp: "10 years", gender: "m" },
  { name: "Ms. Meron Hailu",      title: "Cytology & Pathology Technician", qual: "BSc MLT, Dipl. Cytopathology",       exp: "9 years",  gender: "f" },
];

// ===== MEDICAL EQUIPMENT =====
const EQUIPMENT = [
  {
    id: "xray",
    name: "Digital X-Ray",
    tagline: "Fast · Precise · Low-Dose",
    icon: "🩻",
    color1: "#1e3a5f", color2: "#4a90d9",
    description: "Our flat-panel digital radiography system delivers instant, high-resolution images with up to 70% less radiation than conventional film X-ray. Images are available within seconds for rapid clinical decision-making.",
    features: ["Instant digital images", "70% lower radiation vs. film", "AI-assisted anomaly detection", "Full-body & targeted views", "Same-day radiology report"],
    uses: ["Chest infections & pneumonia", "Bone fractures & dislocations", "Spinal alignment assessment", "Pre-operative screening", "Foreign body detection"],
    stat: "< 30 sec", statLabel: "Image Ready",
  },
  {
    id: "ultrasound",
    name: "Ultrasound Imaging",
    tagline: "Real-Time · Safe · Versatile",
    icon: "📡",
    color1: "#0d4f3c", color2: "#00a878",
    description: "High-definition ultrasound for abdominal, pelvic, obstetric, vascular, and musculoskeletal imaging. Portable units enable point-of-care scanning at the bedside in ICU and emergency settings.",
    features: ["4D obstetric imaging", "Doppler blood-flow studies", "Bedside & portable units", "Ultrasound-guided procedures", "Completely radiation-free"],
    uses: ["Pregnancy monitoring (4D)", "Abdominal organ assessment", "Cardiac echo studies", "Vascular & DVT screening", "Guided biopsies & drains"],
    stat: "100%", statLabel: "Radiation-Free",
  },
  {
    id: "endoscopy",
    name: "Endoscopy Suite",
    tagline: "See Inside · Treat Precisely",
    icon: "🔭",
    color1: "#3d1a6e", color2: "#9b59b6",
    description: "State-of-the-art HD video endoscopy covering the full gastrointestinal tract. Our purpose-built suite handles both diagnostic and therapeutic procedures under conscious sedation for patient comfort.",
    features: ["HD video gastroscopy", "Colonoscopy & sigmoidoscopy", "ERCP & biliary procedures", "Polypectomy & biopsy", "Capsule endoscopy"],
    uses: ["Stomach ulcer diagnosis", "Colon cancer screening", "GERD & reflux evaluation", "GI bleeding investigation", "Foreign body removal"],
    stat: "HD", statLabel: "Video Quality",
  },
  {
    id: "ct",
    name: "128-Slice CT Scanner",
    tagline: "Sub-Second · High-Detail · 3D",
    icon: "⭕",
    color1: "#5a2d00", color2: "#e67e22",
    description: "Our 128-slice multi-detector CT scanner captures extraordinary anatomical detail in sub-second scan times. Advanced post-processing software enables full 3D reconstruction, virtual endoscopy, and cardiac CT angiography.",
    features: ["128-slice multi-detector", "Cardiac CT angiography", "Low-dose radiation protocols", "3D & virtual reconstruction", "24/7 emergency access"],
    uses: ["Stroke & traumatic brain injury", "Pulmonary embolism", "Abdominal & chest trauma", "Cancer staging & follow-up", "Coronary artery assessment"],
    stat: "128", statLabel: "Slice Detector",
  },
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "Understanding Heart Disease: Prevention Starts Today",
    excerpt: "Cardiovascular disease remains the world's leading cause of death, but most cases are preventable. Our cardiology team shares the essential lifestyle changes and screenings everyone should know.",
    category: "Cardiology",
    author: "Dr. Abebe Girma",
    date: "June 5, 2026",
    readTime: "6 min read",
    icon: "🫀",
    content: `
      <p>Heart disease is responsible for more deaths globally than any other condition — yet the vast majority of cases are preventable with the right knowledge and habits. At Alliance Hospital, our cardiology department sees patients every day who wish they had taken action sooner. This article is for anyone who wants to protect their heart before problems begin.</p>

      <h2>Know Your Numbers</h2>
      <p>The most important step in cardiovascular prevention is knowing your baseline health metrics. Regular monitoring of these values allows you and your doctor to catch problems early:</p>
      <ul>
        <li><strong>Blood pressure</strong> – Ideal is below 120/80 mmHg. Hypertension often has no symptoms.</li>
        <li><strong>Cholesterol</strong> – High LDL ("bad") cholesterol silently builds plaque in arteries.</li>
        <li><strong>Blood glucose</strong> – Diabetes dramatically increases heart disease risk.</li>
        <li><strong>BMI &amp; waist circumference</strong> – Excess abdominal fat is a major risk factor.</li>
      </ul>

      <h2>The Lifestyle Factors That Matter Most</h2>
      <p>Large-scale studies consistently show that five lifestyle choices account for the vast majority of preventable heart disease:</p>
      <ol>
        <li><strong>Quit smoking</strong> – Within one year of quitting, heart disease risk halves.</li>
        <li><strong>Exercise regularly</strong> – 150 minutes of moderate activity per week is the target.</li>
        <li><strong>Eat a heart-healthy diet</strong> – Emphasise vegetables, whole grains, legumes, and lean protein. Limit saturated fat, added sugar, and processed foods.</li>
        <li><strong>Maintain a healthy weight</strong> – Even a 5–10% weight loss in overweight individuals meaningfully reduces cardiac risk.</li>
        <li><strong>Manage stress</strong> – Chronic stress elevates cortisol and blood pressure. Mindfulness, sleep, and social connection all help.</li>
      </ol>

      <div class="callout"><p>Did you know? Studies show that people who adopt all five healthy habits by age 50 can expect to live more than 10 years longer than those who adopt none.</p></div>

      <h2>When to See a Cardiologist</h2>
      <p>Many patients come to us only when symptoms are severe. We encourage earlier visits if you have:</p>
      <ul>
        <li>A family history of heart disease or sudden cardiac death</li>
        <li>High blood pressure, cholesterol, or diabetes</li>
        <li>A history of smoking</li>
        <li>Age 40+ with no recent cardiac screening</li>
      </ul>
      <p>Our cardiology team at Alliance Hospital offers comprehensive cardiac risk assessments, stress tests, echocardiography, and interventional procedures — all under one roof. Book a consultation today and take the first step toward a healthier heart.</p>
    `
  },
  {
    id: 2,
    title: "Managing Diabetes: A Comprehensive Guide for Patients",
    excerpt: "Diabetes affects millions of Ethiopians, yet with the right management strategy it can be controlled effectively. Our endocrinology team outlines a practical daily roadmap for people living with diabetes.",
    category: "Endocrinology",
    author: "Dr. Amanuel Tefera",
    date: "May 28, 2026",
    readTime: "8 min read",
    icon: "⚗️",
    content: `
      <p>Diabetes is one of the fastest-growing chronic conditions in sub-Saharan Africa. In Ethiopia alone, the prevalence of type 2 diabetes has risen sharply over the past decade, driven by urbanisation, dietary changes, and reduced physical activity. At Alliance Hospital, our endocrinology and diabetes team works with patients every day to develop personalised management plans that enable a full, active life.</p>

      <h2>Understanding Your Type of Diabetes</h2>
      <p>Before building a management plan, it is critical to understand which type of diabetes you have:</p>
      <ul>
        <li><strong>Type 1 Diabetes</strong> – An autoimmune condition where the pancreas produces little or no insulin. Requires lifelong insulin therapy.</li>
        <li><strong>Type 2 Diabetes</strong> – The body becomes resistant to insulin and/or doesn't produce enough. Often managed with lifestyle changes and oral medications, though insulin may be needed over time.</li>
        <li><strong>Gestational Diabetes</strong> – Develops during pregnancy and usually resolves afterward, but increases lifetime type 2 diabetes risk.</li>
      </ul>

      <h2>The Pillars of Diabetes Management</h2>
      <h3>1. Blood Sugar Monitoring</h3>
      <p>Regular home monitoring using a glucometer gives you real-time feedback on how food, exercise, stress, and medication affect your blood sugar. Aim for:</p>
      <ul>
        <li>Fasting blood glucose: 80–130 mg/dL</li>
        <li>2 hours after meals: below 180 mg/dL</li>
        <li>HbA1c (3-month average): below 7% for most adults</li>
      </ul>

      <h3>2. Nutrition</h3>
      <p>No single "diabetes diet" works for everyone, but consistent principles apply: control carbohydrate portions, prioritise high-fibre vegetables and legumes, choose whole grains over refined carbs, and limit sugary drinks. Ethiopian traditional foods like injera with vegetable wots can be part of a healthy diabetes diet — portion size and balance are key.</p>

      <h3>3. Physical Activity</h3>
      <p>Exercise improves insulin sensitivity and lowers blood sugar. Aim for 30 minutes of moderate activity (brisk walking, cycling, swimming) on most days. Resistance training twice a week adds further metabolic benefits.</p>

      <h3>4. Medication Adherence</h3>
      <p>Never skip or adjust medications without consulting your doctor. Many patients discontinue medications when they feel well — but diabetes management is continuous, not symptomatic.</p>

      <div class="callout"><p>Important: Low blood sugar (hypoglycemia) can be dangerous. Always carry a fast-acting sugar source (glucose tablets, fruit juice) if you are on insulin or sulfonylureas.</p></div>

      <h2>Preventing Long-Term Complications</h2>
      <p>Uncontrolled diabetes damages blood vessels and nerves throughout the body, leading to serious complications. Annual screenings are essential:</p>
      <ul>
        <li>Eye exam (diabetic retinopathy)</li>
        <li>Kidney function tests (diabetic nephropathy)</li>
        <li>Foot exam (neuropathy, poor circulation)</li>
        <li>Dental check (increased infection risk)</li>
        <li>Cardiovascular risk assessment</li>
      </ul>
      <p>Our endocrinology team at Alliance Hospital provides comprehensive diabetes care including dietitian consultations, medication management, and all necessary complication screenings in one place.</p>
    `
  },
  {
    id: 3,
    title: "Childhood Vaccines: Protecting the Next Generation",
    excerpt: "Vaccination remains one of medicine's greatest success stories. Our pediatrics team explains the recommended vaccination schedule and why staying on track is more important than ever.",
    category: "Pediatrics",
    author: "Dr. Rahel Tesfaye",
    date: "May 15, 2026",
    readTime: "5 min read",
    icon: "👶",
    content: `
      <p>Immunisation has saved more lives than almost any other medical intervention in history. Diseases that once killed or disabled millions of children — polio, measles, diphtheria — are now rare or eliminated in much of the world, entirely because of vaccines. Yet complacency and misinformation are allowing some of these diseases to return. As pediatricians, we feel a responsibility to help parents make informed, evidence-based decisions.</p>

      <h2>Why the Schedule Matters</h2>
      <p>The recommended vaccination schedule is designed by scientists and paediatricians based on decades of safety data and immunological research. Vaccines are given at specific ages because:</p>
      <ul>
        <li>Infants are most vulnerable to certain diseases during the first months of life</li>
        <li>The immune system responds most effectively at specific developmental stages</li>
        <li>Some vaccines require multiple doses to build full immunity</li>
        <li>Delaying vaccines leaves children unprotected during their most vulnerable window</li>
      </ul>

      <h2>Core Vaccines in the First Two Years</h2>
      <p>The Ethiopian Expanded Programme on Immunisation (EPI) schedule — aligned with WHO recommendations — includes protection against:</p>
      <ul>
        <li>Tuberculosis (BCG at birth)</li>
        <li>Hepatitis B (birth dose + series)</li>
        <li>Polio (OPV &amp; IPV)</li>
        <li>Diphtheria, Tetanus &amp; Pertussis (DTP/Pentavalent)</li>
        <li>Haemophilus influenzae type b (Hib)</li>
        <li>Pneumococcal disease (PCV)</li>
        <li>Rotavirus (diarrhoea)</li>
        <li>Measles &amp; Rubella</li>
      </ul>

      <div class="callout"><p>Vaccines are rigorously tested for safety before approval and continue to be monitored after rollout. The risks from vaccine-preventable diseases far exceed any risks from vaccination.</p></div>

      <h2>Addressing Common Concerns</h2>
      <p><strong>"My child seems too small/sick for a vaccine"</strong> — Minor illnesses like a cold are generally not a reason to delay. Your paediatrician will advise if a delay is genuinely warranted.</p>
      <p><strong>"Natural immunity is better"</strong> — Natural infection can indeed build strong immunity — but at the cost of the disease itself, which can be severe or fatal. Vaccines offer immunity without that risk.</p>
      <p><strong>"Multiple vaccines at once overwhelm the immune system"</strong> — This is not supported by science. A baby's immune system handles thousands of antigens every day; combination vaccines are safe and effective.</p>

      <h2>Don't Forget School-Age &amp; Adolescent Vaccines</h2>
      <p>Immunisation continues beyond infancy. Booster doses, influenza vaccines, and adolescent-specific vaccines (HPV, meningococcal) are important for long-term protection. Our pediatrics team at Alliance Hospital maintains complete immunisation records and will always remind you when your child is due for their next vaccine.</p>
    `
  },
  {
    id: 4,
    title: "Understanding Mental Health: Breaking the Stigma",
    excerpt: "Mental health conditions are as real and treatable as physical illnesses. Our psychiatry team discusses common disorders, warning signs, and how to seek help in a culture that often discourages it.",
    category: "Psychiatry",
    author: "Dr. Tigist Alemneh",
    date: "May 3, 2026",
    readTime: "7 min read",
    icon: "🧠",
    content: `
      <p>One in four people globally will experience a mental health condition at some point in their lives. Yet in Ethiopia — as in many African countries — mental illness carries enormous stigma that prevents the vast majority of those affected from seeking help. As mental health professionals, we want to help change that.</p>

      <h2>Mental Health Is Physical Health</h2>
      <p>The brain is an organ, just like the heart or kidneys. When it is not functioning optimally due to chemical imbalances, trauma, stress, or genetic factors, we call it a mental health condition. These conditions are not weakness, moral failures, or spiritual problems — they are medical conditions that respond to appropriate treatment.</p>

      <h2>Common Conditions We Treat</h2>
      <ul>
        <li><strong>Depression</strong> – Persistent sadness, loss of interest, fatigue, poor sleep, and difficulty concentrating. Highly treatable with therapy and/or medication.</li>
        <li><strong>Anxiety disorders</strong> – Excessive, persistent worry that interferes with daily life. Includes generalised anxiety, panic disorder, and phobias.</li>
        <li><strong>Post-Traumatic Stress Disorder (PTSD)</strong> – Flashbacks, nightmares, and severe anxiety following traumatic events.</li>
        <li><strong>Schizophrenia</strong> – A serious condition involving distorted thinking and perception. Requires long-term specialist care but patients can live fulfilling lives with treatment.</li>
        <li><strong>Bipolar disorder</strong> – Alternating episodes of depression and mania. Managed effectively with mood stabilisers and therapy.</li>
      </ul>

      <h2>Warning Signs to Watch For</h2>
      <p>In yourself or someone you care about, watch for:</p>
      <ul>
        <li>Prolonged sadness or irritability lasting more than two weeks</li>
        <li>Withdrawing from family, friends, and activities once enjoyed</li>
        <li>Significant changes in appetite or sleep</li>
        <li>Difficulty functioning at work, school, or home</li>
        <li>Thoughts of self-harm or suicide — seek immediate help if this occurs</li>
        <li>Unusual beliefs, hearing voices, or paranoia</li>
      </ul>

      <div class="callout"><p>If you or someone you know is experiencing thoughts of suicide, please seek help immediately. Call our emergency line or visit Alliance Hospital's emergency department — you are not alone.</p></div>

      <h2>Getting Help at Alliance Hospital</h2>
      <p>Our psychiatry department provides confidential, compassionate, non-judgmental care. We offer individual therapy, psychiatric assessment and medication management, family counselling, and crisis intervention. The first step is always the hardest — but it is also the most important.</p>
    `
  },
  {
    id: 5,
    title: "Back Pain: When to Worry and When to Wait",
    excerpt: "Back pain affects 8 in 10 people at some point in life. Our orthopaedic specialists explain which symptoms need urgent attention and how most back pain can be effectively managed.",
    category: "Orthopedics",
    author: "Dr. Henok Mulugeta",
    date: "April 20, 2026",
    readTime: "6 min read",
    icon: "🦴",
    content: `
      <p>Back pain is one of the most common reasons people visit a doctor worldwide. In the vast majority of cases, it is not a sign of serious disease — but knowing when back pain warrants urgent medical attention is crucial. As orthopaedic surgeons, we see both extremes: patients who come too late with serious pathology, and those who are worried about benign muscle strain. This guide aims to help you tell the difference.</p>

      <h2>The Good News: Most Back Pain Gets Better</h2>
      <p>About 90% of acute back pain — pain that comes on suddenly — improves within 6–12 weeks without specific treatment. Often called "non-specific low back pain," it usually results from muscle strain, minor ligament sprains, or poor posture. Treatment focuses on staying as active as tolerable, using heat/ice, and taking anti-inflammatory medications if needed.</p>

      <h2>Red Flags That Require Urgent Assessment</h2>
      <p>Certain symptoms alongside back pain are "red flags" that may indicate a more serious underlying condition:</p>
      <ul>
        <li><strong>Bowel or bladder dysfunction</strong> – Sudden incontinence or inability to urinate. This is a medical emergency — seek care immediately.</li>
        <li><strong>Weakness in both legs</strong> – Particularly if progressive. May indicate spinal cord compression.</li>
        <li><strong>Saddle anaesthesia</strong> – Numbness in the inner thighs, groin, or genital area.</li>
        <li><strong>Fever with back pain</strong> – May suggest spinal infection.</li>
        <li><strong>Pain following trauma</strong> – Falls, road accidents, or other injuries need assessment for fracture.</li>
        <li><strong>Unexplained weight loss with back pain</strong> – Can be associated with cancer.</li>
        <li><strong>Pain worse at rest or at night</strong> – Unlike mechanical back pain, this pattern can suggest inflammatory or malignant causes.</li>
        <li><strong>Age under 18 or over 55 with first episode of back pain</strong></li>
      </ul>

      <div class="callout"><p>If you experience bowel/bladder problems alongside back pain, go to the emergency department immediately. This is cauda equina syndrome — a surgical emergency.</p></div>

      <h2>Effective Non-Surgical Treatments</h2>
      <p>Surgery is rarely the first line of treatment for back pain. Evidence-based options include:</p>
      <ul>
        <li>Physiotherapy — targeted exercise and manual therapy</li>
        <li>Anti-inflammatory medications (NSAIDs)</li>
        <li>Epidural steroid injections for nerve root pain</li>
        <li>Cognitive Behavioural Therapy (CBT) for chronic pain</li>
        <li>Weight management and posture education</li>
      </ul>

      <h2>When Surgery Is Needed</h2>
      <p>Surgery is considered when there is a structural cause (herniated disc, spinal stenosis, spondylolisthesis) that has not responded to conservative treatment after 6–12 weeks, or when neurological symptoms are progressive. Our orthopaedic and spine team at Alliance Hospital will guide you through all options with an individualised approach.</p>
    `
  },
  {
    id: 6,
    title: "Cancer Screening: What You Should Be Getting and When",
    excerpt: "Early detection saves lives. Our oncology team outlines the key cancer screening guidelines that every adult should follow, and explains which tests are appropriate at different ages.",
    category: "Oncology",
    author: "Dr. Frehiwot Mekonnen",
    date: "April 8, 2026",
    readTime: "7 min read",
    icon: "🔬",
    content: `
      <p>Cancer is the second leading cause of death globally. Yet many of the most common cancers — cervical, breast, colorectal, and skin cancer among them — can be caught at an early, highly treatable stage through routine screening. The challenge is that screening is only effective if people actually do it. This article explains what to get, when, and why.</p>

      <h2>Why Screening Works</h2>
      <p>Cancer screening means looking for cancer before symptoms develop. Most cancers are far more treatable — often curable — when caught early. For example:</p>
      <ul>
        <li>Localised colorectal cancer has a 90% 5-year survival rate; when spread to distant organs, it falls to 14%.</li>
        <li>Cervical cancer detected at pre-cancer stage can be cured with simple office procedures.</li>
        <li>Breast cancer caught at stage 1 has near-100% 5-year survival; at stage 4, around 28%.</li>
      </ul>

      <h2>Key Screening Guidelines by Cancer Type</h2>

      <h3>Cervical Cancer (Women)</h3>
      <p>Pap smear starting at age 21, every 3 years. From age 30, a combined Pap + HPV test every 5 years is preferred. Continue until age 65 if tests have been normal. HPV vaccination (ages 9–26) dramatically reduces risk.</p>

      <h3>Breast Cancer (Women)</h3>
      <p>Mammography every 1–2 years starting at age 40–50 (discuss timing with your doctor based on family history and personal risk). Women with BRCA gene mutations or strong family history should begin earlier with enhanced screening.</p>

      <h3>Colorectal Cancer (Men &amp; Women)</h3>
      <p>Colonoscopy every 10 years starting at age 45 (earlier if family history of colorectal cancer or polyps). Stool-based tests (FOBT/FIT) can be done annually as an alternative.</p>

      <h3>Prostate Cancer (Men)</h3>
      <p>PSA blood test from age 50 (age 40–45 for high-risk individuals, including those with a family history). Discuss benefits and limitations with your doctor before testing.</p>

      <h3>Lung Cancer (Smokers)</h3>
      <p>Low-dose CT scan annually for adults aged 50–80 who currently smoke or have quit within the past 15 years with a 20 pack-year history.</p>

      <div class="callout"><p>Screening tests are not perfect — they can have false positives and false negatives. The goal is to shift the odds significantly in your favour, not to achieve certainty. A positive screening result is not a diagnosis; it means further testing is needed.</p></div>

      <h2>Starting the Conversation</h2>
      <p>Many people are uncomfortable discussing cancer risk. At Alliance Hospital, our oncology team offers a comfortable, non-judgmental environment to assess your personal risk factors, create a personalised screening schedule, and guide you through any follow-up testing. Don't wait for symptoms — book your cancer risk assessment today.</p>
    `
  },
];
