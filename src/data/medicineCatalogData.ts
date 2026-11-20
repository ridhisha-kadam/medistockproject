// Comprehensive Predefined Medicine Catalog
// 200+ Verified Generic Medicines Across 40 Therapeutic Categories (NLEM 2022 / WHO ATC / IP Standards)
import { Medicine, TherapeuticCategory } from '../types/database';

export const THERAPEUTIC_CATEGORIES: TherapeuticCategory[] = [
  {
    "id": "cat-1",
    "name": "Blood Pressure (BP) and Hypertension",
    "icon": "Activity",
    "desc": "Antihypertensives, ACE inhibitors, ARBs, CCBs, and diuretics."
  },
  {
    "id": "cat-2",
    "name": "Diabetes and Blood Sugar",
    "icon": "Droplets",
    "desc": "Oral hypoglycemics, biguanides, SGLT2 inhibitors, and human insulins."
  },
  {
    "id": "cat-3",
    "name": "Heart Diseases",
    "icon": "Heart",
    "desc": "Statins, lipid-lowering agents, inotropes, beta-blockers, and antianginals."
  },
  {
    "id": "cat-4",
    "name": "Heart Attack and Cardiovascular Emergencies",
    "icon": "HeartPulse",
    "desc": "Antiplatelets, nitrates, thrombolytics, and anticoagulants."
  },
  {
    "id": "cat-5",
    "name": "Fever",
    "icon": "Thermometer",
    "desc": "Centrally and peripherally acting antipyretics and analgesics."
  },
  {
    "id": "cat-6",
    "name": "Pain Relief",
    "icon": "Zap",
    "desc": "NSAIDs, analgesics, and antispasmodics for acute and chronic pain."
  },
  {
    "id": "cat-7",
    "name": "Cold and Cough",
    "icon": "Wind",
    "desc": "Decongestants, mucolytics, expectorants, and antitussives."
  },
  {
    "id": "cat-8",
    "name": "Asthma and COPD",
    "icon": "Lungs",
    "desc": "Bronchodilators, inhaled corticosteroids, and leukotriene receptor antagonists."
  },
  {
    "id": "cat-9",
    "name": "Respiratory Diseases",
    "icon": "Stethoscope",
    "desc": "Respiratory mucolytics, methylxanthines, and combination anti-inflammatory inhalers."
  },
  {
    "id": "cat-10",
    "name": "Thyroid Disorders",
    "icon": "ShieldAlert",
    "desc": "Levothyroxine, thionamides, and thyroid crisis interventions."
  },
  {
    "id": "cat-11",
    "name": "Gastric Problems and Acidity",
    "icon": "Flame",
    "desc": "Proton pump inhibitors, H2 blockers, and antacids for acid peptic disease."
  },
  {
    "id": "cat-12",
    "name": "Digestive Disorders",
    "icon": "Utensils",
    "desc": "Prokinetics, antiemetics, antidiarrheals, and oral rehydration solutions."
  },
  {
    "id": "cat-13",
    "name": "Kidney Diseases",
    "icon": "Filter",
    "desc": "Loop diuretics, urinary alkalinizers, phosphate binders, and ketoanalogues."
  },
  {
    "id": "cat-14",
    "name": "Liver Diseases",
    "icon": "Shield",
    "desc": "Bile acids, ornithine aspartate, lactitol, and silymarin."
  },
  {
    "id": "cat-15",
    "name": "Neurological Disorders",
    "icon": "Brain",
    "desc": "Dopaminergic combinations, cholinesterase inhibitors, and antispastics."
  },
  {
    "id": "cat-16",
    "name": "Epilepsy and Seizures",
    "icon": "ZapOff",
    "desc": "Broad and narrow-spectrum antiepileptic medicines."
  },
  {
    "id": "cat-17",
    "name": "Mental Health",
    "icon": "Smile",
    "desc": "Antipsychotics, mood stabilizers, and psychiatric therapeutics."
  },
  {
    "id": "cat-18",
    "name": "Anxiety and Depression",
    "icon": "Moon",
    "desc": "Selective serotonin reuptake inhibitors and anxiolytics."
  },
  {
    "id": "cat-19",
    "name": "Bone and Joint Diseases",
    "icon": "Bone",
    "desc": "Chondroprotectives, glucosamine, and collagen supplements."
  },
  {
    "id": "cat-20",
    "name": "Arthritis and Rheumatology",
    "icon": "Crosshair",
    "desc": "DMARDs, xanthine oxidase inhibitors, and anti-gout therapies."
  },
  {
    "id": "cat-21",
    "name": "Skin Diseases",
    "icon": "Sun",
    "desc": "Topical corticosteroids, antibacterials, soothing lotions, and scabicides."
  },
  {
    "id": "cat-22",
    "name": "Eye Diseases",
    "icon": "Eye",
    "desc": "Ophthalmic lubricants, fluoroquinolones, and anti-glaucoma solutions."
  },
  {
    "id": "cat-23",
    "name": "Ear, Nose and Throat Diseases",
    "icon": "Ear",
    "desc": "Nasal decongestants, ceruminolytics, antiseptic gargles, and otic drops."
  },
  {
    "id": "cat-24",
    "name": "Bacterial Infections",
    "icon": "ShieldCheck",
    "desc": "Broad-spectrum antibiotics and beta-lactamase inhibitor combinations."
  },
  {
    "id": "cat-25",
    "name": "Antifungal Medicines",
    "icon": "Sparkles",
    "desc": "Azoles, allylamines, and polyenes for fungal infections."
  },
  {
    "id": "cat-26",
    "name": "Antiviral Medicines",
    "icon": "ShieldAlert",
    "desc": "Nucleoside analogs, neuraminidase inhibitors, and antivirals."
  },
  {
    "id": "cat-27",
    "name": "Tuberculosis",
    "icon": "FileText",
    "desc": "First-line anti-tubercular antibiotics and fixed-dose combinations."
  },
  {
    "id": "cat-28",
    "name": "Cancer and Oncology",
    "icon": "Target",
    "desc": "Hormonal modulators, kinase inhibitors, and cytotoxic therapies."
  },
  {
    "id": "cat-29",
    "name": "Anaemia and Blood Disorders",
    "icon": "Droplet",
    "desc": "Iron complexes, folic acid, vitamin B12, and hemostatics."
  },
  {
    "id": "cat-30",
    "name": "Vitamin Deficiencies",
    "icon": "Award",
    "desc": "Cholecalciferol D3, ascorbic acid C, therapeutic B-complex, and retinol."
  },
  {
    "id": "cat-31",
    "name": "Nutritional Supplements",
    "icon": "Coffee",
    "desc": "Calcium carbonate, zinc, omega-3 fatty acids, and multiminerals."
  },
  {
    "id": "cat-32",
    "name": "Women's Health",
    "icon": "HeartHandshake",
    "desc": "Progestogens, selective contraceptives, and cervical ripening agents."
  },
  {
    "id": "cat-33",
    "name": "Men's Health",
    "icon": "User",
    "desc": "Alpha-1A blockers, 5-alpha reductase inhibitors, and PDE-5 inhibitors."
  },
  {
    "id": "cat-34",
    "name": "Pregnancy-related Medicines",
    "icon": "Baby",
    "desc": "Tocolytics, natural micronized progesterone, and prenatal antiemetics."
  },
  {
    "id": "cat-35",
    "name": "Child Health and Paediatrics",
    "icon": "Smile",
    "desc": "Paediatric oral drops, weight-appropriate syrups, and dispersibles."
  },
  {
    "id": "cat-36",
    "name": "Allergy and Immunology",
    "icon": "AlertCircle",
    "desc": "Second-generation antihistamines and systemic glucocorticoids."
  },
  {
    "id": "cat-37",
    "name": "Urinary Tract Disorders",
    "icon": "CheckCircle",
    "desc": "Urinary antiseptics, alkalinizers, and antispasmodics."
  },
  {
    "id": "cat-38",
    "name": "Bone Health and Osteoporosis",
    "icon": "Shield",
    "desc": "Bisphosphonates, parathyroid hormone analogs, and active calcitriol."
  },
  {
    "id": "cat-39",
    "name": "Emergency and Critical Care",
    "icon": "AlertTriangle",
    "desc": "Sympathomimetic inotropes, emergency anticholinergics, and antidote agents."
  },
  {
    "id": "cat-40",
    "name": "General Medicines",
    "icon": "Package",
    "desc": "Broad-spectrum antihelminthics, topical povidone, and hydration fluids."
  }
];

export const PREDEFINED_MEDICINES: Medicine[] = [
  {
    "id": "med-cat-0001",
    "display_name": "Amlodipine",
    "generic_name": "Amlodipine",
    "active_ingredient": "Amlodipine Besylate",
    "composition": "Amlodipine Besylate equivalent to Amlodipine 2.5 mg",
    "category": "Blood Pressure (BP) and Hypertension",
    "strength_form": "2.5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Long-acting calcium channel blocker for hypertension and angina.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C08CA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00001",
        "medicine_id": "med-cat-0001",
        "strength": "2.5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Amlodipine Besylate equivalent to Amlodipine 2.5 mg",
        "reference_source": "NLEM 2022 (C08CA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00002",
        "medicine_id": "med-cat-0001",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Amlodipine Besylate equivalent to Amlodipine 5 mg",
        "reference_source": "NLEM 2022 (C08CA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00003",
        "medicine_id": "med-cat-0001",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Amlodipine Besylate equivalent to Amlodipine 10 mg",
        "reference_source": "NLEM 2022 (C08CA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0002",
    "display_name": "Telmisartan",
    "generic_name": "Telmisartan",
    "active_ingredient": "Telmisartan",
    "composition": "Telmisartan 20 mg",
    "category": "Blood Pressure (BP) and Hypertension",
    "strength_form": "20 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Angiotensin II receptor blocker for essential hypertension.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C09CA07), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00004",
        "medicine_id": "med-cat-0002",
        "strength": "20 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Telmisartan 20 mg",
        "reference_source": "NLEM 2022 (C09CA07), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00005",
        "medicine_id": "med-cat-0002",
        "strength": "40 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Telmisartan 40 mg",
        "reference_source": "NLEM 2022 (C09CA07), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00006",
        "medicine_id": "med-cat-0002",
        "strength": "80 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Telmisartan 80 mg",
        "reference_source": "NLEM 2022 (C09CA07), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0003",
    "display_name": "Losartan",
    "generic_name": "Losartan",
    "active_ingredient": "Losartan Potassium",
    "composition": "Losartan Potassium 25 mg",
    "category": "Blood Pressure (BP) and Hypertension",
    "strength_form": "25 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Angiotensin receptor blocker for hypertension and diabetic nephropathy.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C09CA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00007",
        "medicine_id": "med-cat-0003",
        "strength": "25 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Losartan Potassium 25 mg",
        "reference_source": "NLEM 2022 (C09CA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00008",
        "medicine_id": "med-cat-0003",
        "strength": "50 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Losartan Potassium 50 mg",
        "reference_source": "NLEM 2022 (C09CA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00009",
        "medicine_id": "med-cat-0003",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Losartan Potassium 100 mg",
        "reference_source": "NLEM 2022 (C09CA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0004",
    "display_name": "Enalapril",
    "generic_name": "Enalapril",
    "active_ingredient": "Enalapril Maleate",
    "composition": "Enalapril Maleate 2.5 mg",
    "category": "Blood Pressure (BP) and Hypertension",
    "strength_form": "2.5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "ACE inhibitor for hypertension and heart failure.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C09AA02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00010",
        "medicine_id": "med-cat-0004",
        "strength": "2.5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Enalapril Maleate 2.5 mg",
        "reference_source": "NLEM 2022 (C09AA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00011",
        "medicine_id": "med-cat-0004",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Enalapril Maleate 5 mg",
        "reference_source": "NLEM 2022 (C09AA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00012",
        "medicine_id": "med-cat-0004",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Enalapril Maleate 10 mg",
        "reference_source": "NLEM 2022 (C09AA02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0005",
    "display_name": "Atenolol",
    "generic_name": "Atenolol",
    "active_ingredient": "Atenolol",
    "composition": "Atenolol 25 mg",
    "category": "Blood Pressure (BP) and Hypertension",
    "strength_form": "25 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Cardioselective beta-1 blocker for hypertension and arrhythmias.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C07AB03), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00013",
        "medicine_id": "med-cat-0005",
        "strength": "25 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Atenolol 25 mg",
        "reference_source": "NLEM 2022 (C07AB03), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00014",
        "medicine_id": "med-cat-0005",
        "strength": "50 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Atenolol 50 mg",
        "reference_source": "NLEM 2022 (C07AB03), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00015",
        "medicine_id": "med-cat-0005",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Atenolol 100 mg",
        "reference_source": "NLEM 2022 (C07AB03), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0006",
    "display_name": "Hydrochlorothiazide",
    "generic_name": "Hydrochlorothiazide",
    "active_ingredient": "Hydrochlorothiazide",
    "composition": "Hydrochlorothiazide 12.5 mg",
    "category": "Blood Pressure (BP) and Hypertension",
    "strength_form": "12.5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Thiazide diuretic reducing vascular resistance in essential hypertension.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C03AA03), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00016",
        "medicine_id": "med-cat-0006",
        "strength": "12.5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Hydrochlorothiazide 12.5 mg",
        "reference_source": "NLEM 2022 (C03AA03), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00017",
        "medicine_id": "med-cat-0006",
        "strength": "25 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Hydrochlorothiazide 25 mg",
        "reference_source": "NLEM 2022 (C03AA03), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0007",
    "display_name": "Telmisartan + Amlodipine",
    "generic_name": "Telmisartan + Amlodipine",
    "active_ingredient": "Telmisartan and Amlodipine Besylate",
    "composition": "Telmisartan 40 mg + Amlodipine 5 mg",
    "category": "Blood Pressure (BP) and Hypertension",
    "strength_form": "40 mg + 5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Fixed-dose combination of ARB and CCB for dual blood pressure control.",
    "combination_ingredients": "Telmisartan 40 mg + Amlodipine 5 mg",
    "reference_source": "CDSCO Approved FDC, WHO ATC C09DB04",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00018",
        "medicine_id": "med-cat-0007",
        "strength": "40 mg + 5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Telmisartan 40 mg + Amlodipine 5 mg",
        "reference_source": "CDSCO Approved FDC, WHO ATC C09DB04",
        "is_prescription_required": true
      },
      {
        "id": "var-00019",
        "medicine_id": "med-cat-0007",
        "strength": "80 mg + 5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Telmisartan 80 mg + Amlodipine 5 mg",
        "reference_source": "CDSCO Approved FDC, WHO ATC C09DB04",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0008",
    "display_name": "Metformin",
    "generic_name": "Metformin",
    "active_ingredient": "Metformin Hydrochloride",
    "composition": "Metformin Hydrochloride 500 mg",
    "category": "Diabetes and Blood Sugar",
    "strength_form": "500 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Biguanide antihyperglycemic reducing hepatic glucose production.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A10BA02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00020",
        "medicine_id": "med-cat-0008",
        "strength": "500 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Metformin Hydrochloride 500 mg",
        "reference_source": "NLEM 2022 (A10BA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00021",
        "medicine_id": "med-cat-0008",
        "strength": "850 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Metformin Hydrochloride 850 mg",
        "reference_source": "NLEM 2022 (A10BA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00022",
        "medicine_id": "med-cat-0008",
        "strength": "1000 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Metformin Hydrochloride 1000 mg",
        "reference_source": "NLEM 2022 (A10BA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00023",
        "medicine_id": "med-cat-0008",
        "strength": "500 mg SR",
        "dosage_form": "Sustained Release Tablet",
        "route": "Oral",
        "composition": "Metformin Hydrochloride 500 mg Sustained Release",
        "reference_source": "NLEM 2022 (A10BA02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0009",
    "display_name": "Glimepiride",
    "generic_name": "Glimepiride",
    "active_ingredient": "Glimepiride",
    "composition": "Glimepiride 1 mg",
    "category": "Diabetes and Blood Sugar",
    "strength_form": "1 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Third-generation sulfonylurea stimulating pancreatic insulin release.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A10BB12), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00024",
        "medicine_id": "med-cat-0009",
        "strength": "1 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Glimepiride 1 mg",
        "reference_source": "NLEM 2022 (A10BB12), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00025",
        "medicine_id": "med-cat-0009",
        "strength": "2 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Glimepiride 2 mg",
        "reference_source": "NLEM 2022 (A10BB12), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00026",
        "medicine_id": "med-cat-0009",
        "strength": "3 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Glimepiride 3 mg",
        "reference_source": "NLEM 2022 (A10BB12), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00027",
        "medicine_id": "med-cat-0009",
        "strength": "4 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Glimepiride 4 mg",
        "reference_source": "NLEM 2022 (A10BB12), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0010",
    "display_name": "Gliclazide",
    "generic_name": "Gliclazide",
    "active_ingredient": "Gliclazide",
    "composition": "Gliclazide 40 mg",
    "category": "Diabetes and Blood Sugar",
    "strength_form": "40 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Sulfonylurea with selective pancreatic action for type 2 diabetes.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A10BB09), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00028",
        "medicine_id": "med-cat-0010",
        "strength": "40 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Gliclazide 40 mg",
        "reference_source": "NLEM 2022 (A10BB09), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00029",
        "medicine_id": "med-cat-0010",
        "strength": "80 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Gliclazide 80 mg",
        "reference_source": "NLEM 2022 (A10BB09), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00030",
        "medicine_id": "med-cat-0010",
        "strength": "60 mg MR",
        "dosage_form": "Modified Release Tablet",
        "route": "Oral",
        "composition": "Gliclazide 60 mg Modified Release",
        "reference_source": "NLEM 2022 (A10BB09), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0011",
    "display_name": "Dapagliflozin",
    "generic_name": "Dapagliflozin",
    "active_ingredient": "Dapagliflozin Propanediol",
    "composition": "Dapagliflozin 5 mg",
    "category": "Diabetes and Blood Sugar",
    "strength_form": "5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Selective SGLT2 inhibitor promoting urinary glucose excretion.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A10BK01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00031",
        "medicine_id": "med-cat-0011",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Dapagliflozin 5 mg",
        "reference_source": "NLEM 2022 (A10BK01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00032",
        "medicine_id": "med-cat-0011",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Dapagliflozin 10 mg",
        "reference_source": "NLEM 2022 (A10BK01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0012",
    "display_name": "Vildagliptin",
    "generic_name": "Vildagliptin",
    "active_ingredient": "Vildagliptin",
    "composition": "Vildagliptin 50 mg",
    "category": "Diabetes and Blood Sugar",
    "strength_form": "50 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Dipeptidyl peptidase-4 (DPP-4) inhibitor enhancing incretin levels.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC A10BH02, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00033",
        "medicine_id": "med-cat-0012",
        "strength": "50 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Vildagliptin 50 mg",
        "reference_source": "WHO ATC A10BH02, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0013",
    "display_name": "Human Insulin Regular",
    "generic_name": "Human Insulin Regular",
    "active_ingredient": "Recombinant Human Regular Insulin",
    "composition": "Soluble Human Regular Insulin 40 IU per mL (10 mL)",
    "category": "Diabetes and Blood Sugar",
    "strength_form": "40 IU/mL Injection Vial",
    "dosage_form": "Injection",
    "route": "Subcutaneous / IV",
    "description": "Short-acting recombinant human insulin for glycemic management.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A10AB01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00034",
        "medicine_id": "med-cat-0013",
        "strength": "40 IU/mL",
        "dosage_form": "Injection Vial",
        "route": "Subcutaneous / IV",
        "composition": "Soluble Human Regular Insulin 40 IU per mL (10 mL)",
        "reference_source": "NLEM 2022 (A10AB01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00035",
        "medicine_id": "med-cat-0013",
        "strength": "100 IU/mL",
        "dosage_form": "Cartridge Injection",
        "route": "Subcutaneous",
        "composition": "Soluble Human Regular Insulin 100 IU per mL (3 mL)",
        "reference_source": "NLEM 2022 (A10AB01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0014",
    "display_name": "Metformin + Glimepiride",
    "generic_name": "Metformin + Glimepiride",
    "active_ingredient": "Metformin Hydrochloride and Glimepiride",
    "composition": "Metformin Hydrochloride 500 mg + Glimepiride 1 mg",
    "category": "Diabetes and Blood Sugar",
    "strength_form": "500 mg + 1 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Dual oral hypoglycemic fixed-dose combination.",
    "combination_ingredients": "Metformin 500 mg + Glimepiride 1 mg / 2 mg",
    "reference_source": "CDSCO Approved FDC, WHO ATC A10BD02",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00036",
        "medicine_id": "med-cat-0014",
        "strength": "500 mg + 1 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Metformin Hydrochloride 500 mg + Glimepiride 1 mg",
        "reference_source": "CDSCO Approved FDC, WHO ATC A10BD02",
        "is_prescription_required": true
      },
      {
        "id": "var-00037",
        "medicine_id": "med-cat-0014",
        "strength": "500 mg + 2 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Metformin Hydrochloride 500 mg + Glimepiride 2 mg",
        "reference_source": "CDSCO Approved FDC, WHO ATC A10BD02",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0015",
    "display_name": "Atorvastatin",
    "generic_name": "Atorvastatin",
    "active_ingredient": "Atorvastatin Calcium Trihydrate",
    "composition": "Atorvastatin Calcium equivalent to Atorvastatin 10 mg",
    "category": "Heart Diseases",
    "strength_form": "10 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "HMG-CoA reductase inhibitor for dyslipidemia and cardiovascular prevention.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C10AA05), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00038",
        "medicine_id": "med-cat-0015",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Atorvastatin Calcium equivalent to Atorvastatin 10 mg",
        "reference_source": "NLEM 2022 (C10AA05), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00039",
        "medicine_id": "med-cat-0015",
        "strength": "20 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Atorvastatin Calcium equivalent to Atorvastatin 20 mg",
        "reference_source": "NLEM 2022 (C10AA05), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00040",
        "medicine_id": "med-cat-0015",
        "strength": "40 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Atorvastatin Calcium equivalent to Atorvastatin 40 mg",
        "reference_source": "NLEM 2022 (C10AA05), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00041",
        "medicine_id": "med-cat-0015",
        "strength": "80 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Atorvastatin Calcium equivalent to Atorvastatin 80 mg",
        "reference_source": "NLEM 2022 (C10AA05), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0016",
    "display_name": "Rosuvastatin",
    "generic_name": "Rosuvastatin",
    "active_ingredient": "Rosuvastatin Calcium",
    "composition": "Rosuvastatin Calcium 5 mg",
    "category": "Heart Diseases",
    "strength_form": "5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "High-intensity statin reducing LDL cholesterol and cardiovascular morbidity.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C10AA07), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00042",
        "medicine_id": "med-cat-0016",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Rosuvastatin Calcium 5 mg",
        "reference_source": "NLEM 2022 (C10AA07), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00043",
        "medicine_id": "med-cat-0016",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Rosuvastatin Calcium 10 mg",
        "reference_source": "NLEM 2022 (C10AA07), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00044",
        "medicine_id": "med-cat-0016",
        "strength": "20 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Rosuvastatin Calcium 20 mg",
        "reference_source": "NLEM 2022 (C10AA07), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0017",
    "display_name": "Digoxin",
    "generic_name": "Digoxin",
    "active_ingredient": "Digoxin",
    "composition": "Digoxin 0.25 mg",
    "category": "Heart Diseases",
    "strength_form": "0.25 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Cardiac glycoside for systolic heart failure and ventricular control in AF.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C01AA05), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00045",
        "medicine_id": "med-cat-0017",
        "strength": "0.25 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Digoxin 0.25 mg",
        "reference_source": "NLEM 2022 (C01AA05), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00046",
        "medicine_id": "med-cat-0017",
        "strength": "0.5 mg/2 mL",
        "dosage_form": "Injection",
        "route": "Intravenous",
        "composition": "Digoxin 0.25 mg per mL",
        "reference_source": "NLEM 2022 (C01AA05), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0018",
    "display_name": "Spironolactone",
    "generic_name": "Spironolactone",
    "active_ingredient": "Spironolactone",
    "composition": "Spironolactone 25 mg",
    "category": "Heart Diseases",
    "strength_form": "25 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Aldosterone receptor antagonist for chronic heart failure and edema.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C03DA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00047",
        "medicine_id": "med-cat-0018",
        "strength": "25 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Spironolactone 25 mg",
        "reference_source": "NLEM 2022 (C03DA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00048",
        "medicine_id": "med-cat-0018",
        "strength": "50 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Spironolactone 50 mg",
        "reference_source": "NLEM 2022 (C03DA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00049",
        "medicine_id": "med-cat-0018",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Spironolactone 100 mg",
        "reference_source": "NLEM 2022 (C03DA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0019",
    "display_name": "Carvedilol",
    "generic_name": "Carvedilol",
    "active_ingredient": "Carvedilol",
    "composition": "Carvedilol 3.125 mg",
    "category": "Heart Diseases",
    "strength_form": "3.125 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Nonselective beta and alpha-1 blocker for heart failure with reduced ejection fraction.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C07AG02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00050",
        "medicine_id": "med-cat-0019",
        "strength": "3.125 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Carvedilol 3.125 mg",
        "reference_source": "NLEM 2022 (C07AG02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00051",
        "medicine_id": "med-cat-0019",
        "strength": "6.25 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Carvedilol 6.25 mg",
        "reference_source": "NLEM 2022 (C07AG02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00052",
        "medicine_id": "med-cat-0019",
        "strength": "12.5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Carvedilol 12.5 mg",
        "reference_source": "NLEM 2022 (C07AG02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00053",
        "medicine_id": "med-cat-0019",
        "strength": "25 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Carvedilol 25 mg",
        "reference_source": "NLEM 2022 (C07AG02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0020",
    "display_name": "Isosorbide Mononitrate",
    "generic_name": "Isosorbide Mononitrate",
    "active_ingredient": "Isosorbide-5-Mononitrate",
    "composition": "Isosorbide Mononitrate 20 mg",
    "category": "Heart Diseases",
    "strength_form": "20 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Nitrate vasodilator for prophylactic therapy in chronic stable angina.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C01DA14), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00054",
        "medicine_id": "med-cat-0020",
        "strength": "20 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Isosorbide Mononitrate 20 mg",
        "reference_source": "NLEM 2022 (C01DA14), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00055",
        "medicine_id": "med-cat-0020",
        "strength": "30 mg SR",
        "dosage_form": "Sustained Release Tablet",
        "route": "Oral",
        "composition": "Isosorbide Mononitrate 30 mg SR",
        "reference_source": "NLEM 2022 (C01DA14), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00056",
        "medicine_id": "med-cat-0020",
        "strength": "60 mg SR",
        "dosage_form": "Sustained Release Tablet",
        "route": "Oral",
        "composition": "Isosorbide Mononitrate 60 mg SR",
        "reference_source": "NLEM 2022 (C01DA14), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0021",
    "display_name": "Aspirin",
    "generic_name": "Aspirin",
    "active_ingredient": "Acetylsalicylic Acid",
    "composition": "Aspirin (Enteric Coated) 75 mg",
    "category": "Heart Attack and Cardiovascular Emergencies",
    "strength_form": "75 mg Gastro-resistant Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Antiplatelet agent suppressing thromboxane A2 synthesis in acute coronary syndrome.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (B01AC06), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00057",
        "medicine_id": "med-cat-0021",
        "strength": "75 mg",
        "dosage_form": "Gastro-resistant Tablet",
        "route": "Oral",
        "composition": "Aspirin (Enteric Coated) 75 mg",
        "reference_source": "NLEM 2022 (B01AC06), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00058",
        "medicine_id": "med-cat-0021",
        "strength": "150 mg",
        "dosage_form": "Gastro-resistant Tablet",
        "route": "Oral",
        "composition": "Aspirin (Enteric Coated) 150 mg",
        "reference_source": "NLEM 2022 (B01AC06), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00059",
        "medicine_id": "med-cat-0021",
        "strength": "325 mg",
        "dosage_form": "Soluble / Chewable Tablet",
        "route": "Oral",
        "composition": "Aspirin (Chewable) 325 mg",
        "reference_source": "NLEM 2022 (B01AC06), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0022",
    "display_name": "Clopidogrel",
    "generic_name": "Clopidogrel",
    "active_ingredient": "Clopidogrel Bisulfate",
    "composition": "Clopidogrel Bisulfate 75 mg",
    "category": "Heart Attack and Cardiovascular Emergencies",
    "strength_form": "75 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Thienopyridine P2Y12 platelet inhibitor in acute coronary syndrome and post-PCI.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (B01AC04), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00060",
        "medicine_id": "med-cat-0022",
        "strength": "75 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Clopidogrel Bisulfate 75 mg",
        "reference_source": "NLEM 2022 (B01AC04), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00061",
        "medicine_id": "med-cat-0022",
        "strength": "300 mg",
        "dosage_form": "Loading Dose Tablet",
        "route": "Oral",
        "composition": "Clopidogrel Bisulfate 300 mg",
        "reference_source": "NLEM 2022 (B01AC04), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0023",
    "display_name": "Nitroglycerin",
    "generic_name": "Nitroglycerin",
    "active_ingredient": "Glyceryl Trinitrate",
    "composition": "Glyceryl Trinitrate 0.5 mg",
    "category": "Heart Attack and Cardiovascular Emergencies",
    "strength_form": "0.5 mg Sublingual Tablet",
    "dosage_form": "Sublingual Tablet",
    "route": "Sublingual / IV",
    "description": "Direct vascular smooth muscle relaxant for acute anginal attacks and acute pulmonary edema.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C01DA02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00062",
        "medicine_id": "med-cat-0023",
        "strength": "0.5 mg",
        "dosage_form": "Sublingual Tablet",
        "route": "Sublingual",
        "composition": "Glyceryl Trinitrate 0.5 mg",
        "reference_source": "NLEM 2022 (C01DA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00063",
        "medicine_id": "med-cat-0023",
        "strength": "5 mg/mL",
        "dosage_form": "IV Infusion Ampoule",
        "route": "Intravenous",
        "composition": "Glyceryl Trinitrate 5 mg per mL",
        "reference_source": "NLEM 2022 (C01DA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00064",
        "medicine_id": "med-cat-0023",
        "strength": "2.6 mg CR",
        "dosage_form": "Controlled Release Tablet",
        "route": "Oral",
        "composition": "Glyceryl Trinitrate 2.6 mg Controlled Release",
        "reference_source": "NLEM 2022 (C01DA02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0024",
    "display_name": "Streptokinase",
    "generic_name": "Streptokinase",
    "active_ingredient": "Streptokinase",
    "composition": "Purified Streptokinase 750,000 IU",
    "category": "Heart Attack and Cardiovascular Emergencies",
    "strength_form": "750,000 IU Powder for Injection",
    "dosage_form": "Injection",
    "route": "Intravenous",
    "description": "Fibrinolytic enzyme for emergency thrombolysis in acute STEMI myocardial infarction.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (B01AD01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00065",
        "medicine_id": "med-cat-0024",
        "strength": "750,000 IU",
        "dosage_form": "Powder for Injection",
        "route": "Intravenous",
        "composition": "Purified Streptokinase 750,000 IU",
        "reference_source": "NLEM 2022 (B01AD01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00066",
        "medicine_id": "med-cat-0024",
        "strength": "1,500,000 IU",
        "dosage_form": "Powder for Injection",
        "route": "Intravenous",
        "composition": "Purified Streptokinase 1,500,000 IU",
        "reference_source": "NLEM 2022 (B01AD01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0025",
    "display_name": "Heparin Sodium",
    "generic_name": "Heparin Sodium",
    "active_ingredient": "Heparin Sodium",
    "composition": "Heparin Sodium 1000 IU per mL (5 mL)",
    "category": "Heart Attack and Cardiovascular Emergencies",
    "strength_form": "1000 IU/mL Injection Vial",
    "dosage_form": "Injection",
    "route": "Intravenous / Subcutaneous",
    "description": "Anticoagulant activating antithrombin III to prevent fibrin clot formation.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (B01AB01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00067",
        "medicine_id": "med-cat-0025",
        "strength": "1000 IU/mL",
        "dosage_form": "Injection Vial",
        "route": "IV / SC",
        "composition": "Heparin Sodium 1000 IU per mL (5 mL)",
        "reference_source": "NLEM 2022 (B01AB01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00068",
        "medicine_id": "med-cat-0025",
        "strength": "5000 IU/mL",
        "dosage_form": "Injection Vial",
        "route": "IV / SC",
        "composition": "Heparin Sodium 5000 IU per mL (5 mL)",
        "reference_source": "NLEM 2022 (B01AB01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0026",
    "display_name": "Alteplase",
    "generic_name": "Alteplase",
    "active_ingredient": "Recombinant Human Tissue Plasminogen Activator",
    "composition": "Recombinant rt-PA 50 mg with sterile diluent",
    "category": "Heart Attack and Cardiovascular Emergencies",
    "strength_form": "50 mg Powder for Injection",
    "dosage_form": "Injection",
    "route": "Intravenous",
    "description": "Recombinant rt-PA indicated for emergency reperfusion in acute ischemic stroke within 4.5h.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (B01AD02), WHO ATC",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00069",
        "medicine_id": "med-cat-0026",
        "strength": "50 mg",
        "dosage_form": "Powder for Injection",
        "route": "Intravenous",
        "composition": "Recombinant rt-PA 50 mg with sterile diluent",
        "reference_source": "NLEM 2022 (B01AD02), WHO ATC",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0027",
    "display_name": "Paracetamol",
    "generic_name": "Paracetamol",
    "active_ingredient": "Paracetamol",
    "composition": "Paracetamol 500 mg",
    "category": "Fever",
    "strength_form": "500 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Centrally acting analgesic and antipyretic for pyrexia and somatic discomfort.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N02BE01), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00070",
        "medicine_id": "med-cat-0027",
        "strength": "500 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Paracetamol 500 mg",
        "reference_source": "NLEM 2022 (N02BE01), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00071",
        "medicine_id": "med-cat-0027",
        "strength": "650 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Paracetamol 650 mg",
        "reference_source": "NLEM 2022 (N02BE01), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00072",
        "medicine_id": "med-cat-0027",
        "strength": "120 mg/5 mL",
        "dosage_form": "Oral Suspension",
        "route": "Oral",
        "composition": "Paracetamol 120 mg per 5 mL",
        "reference_source": "NLEM 2022 (N02BE01), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00073",
        "medicine_id": "med-cat-0027",
        "strength": "250 mg/5 mL",
        "dosage_form": "Oral Suspension",
        "route": "Oral",
        "composition": "Paracetamol 250 mg per 5 mL",
        "reference_source": "NLEM 2022 (N02BE01), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00074",
        "medicine_id": "med-cat-0027",
        "strength": "1000 mg/100 mL",
        "dosage_form": "IV Infusion",
        "route": "Intravenous",
        "composition": "Paracetamol 10 mg/mL (1000 mg per 100 mL IV bottle)",
        "reference_source": "NLEM 2022 (N02BE01), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0028",
    "display_name": "Mefenamic Acid",
    "generic_name": "Mefenamic Acid",
    "active_ingredient": "Mefenamic Acid",
    "composition": "Mefenamic Acid 250 mg",
    "category": "Fever",
    "strength_form": "250 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "NSAID for persistent high fever and associated inflammatory pain.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (M01AG01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00075",
        "medicine_id": "med-cat-0028",
        "strength": "250 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Mefenamic Acid 250 mg",
        "reference_source": "NLEM 2022 (M01AG01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00076",
        "medicine_id": "med-cat-0028",
        "strength": "500 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Mefenamic Acid 500 mg",
        "reference_source": "NLEM 2022 (M01AG01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00077",
        "medicine_id": "med-cat-0028",
        "strength": "100 mg/5 mL",
        "dosage_form": "Oral Suspension",
        "route": "Oral",
        "composition": "Mefenamic Acid 100 mg per 5 mL",
        "reference_source": "NLEM 2022 (M01AG01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0029",
    "display_name": "Paracetamol + Ibuprofen",
    "generic_name": "Paracetamol + Ibuprofen",
    "active_ingredient": "Paracetamol and Ibuprofen",
    "composition": "Paracetamol 325 mg + Ibuprofen 400 mg",
    "category": "Fever",
    "strength_form": "325 mg + 400 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Dual antipyretic and analgesic combination for synergistic temperature control.",
    "combination_ingredients": "Paracetamol 325 mg + Ibuprofen 400 mg",
    "reference_source": "CDSCO Approved FDC, WHO ATC M01AE51",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00078",
        "medicine_id": "med-cat-0029",
        "strength": "325 mg + 400 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Paracetamol 325 mg + Ibuprofen 400 mg",
        "reference_source": "CDSCO Approved FDC, WHO ATC M01AE51",
        "is_prescription_required": false
      },
      {
        "id": "var-00079",
        "medicine_id": "med-cat-0029",
        "strength": "162.5 mg + 100 mg/5 mL",
        "dosage_form": "Oral Suspension",
        "route": "Oral",
        "composition": "Paracetamol 162.5 mg + Ibuprofen 100 mg per 5 mL",
        "reference_source": "CDSCO Approved FDC, WHO ATC M01AE51",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0030",
    "display_name": "Indomethacin",
    "generic_name": "Indomethacin",
    "active_ingredient": "Indomethacin",
    "composition": "Indomethacin 25 mg",
    "category": "Fever",
    "strength_form": "25 mg Capsule",
    "dosage_form": "Capsule",
    "route": "Oral / Rectal",
    "description": "Potent non-steroidal anti-inflammatory for resistant neoplastic and refractory fever.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (M01AB01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00080",
        "medicine_id": "med-cat-0030",
        "strength": "25 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Indomethacin 25 mg",
        "reference_source": "NLEM 2022 (M01AB01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00081",
        "medicine_id": "med-cat-0030",
        "strength": "50 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Indomethacin 50 mg",
        "reference_source": "NLEM 2022 (M01AB01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00082",
        "medicine_id": "med-cat-0030",
        "strength": "100 mg",
        "dosage_form": "Suppository",
        "route": "Rectal",
        "composition": "Indomethacin 100 mg",
        "reference_source": "NLEM 2022 (M01AB01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0031",
    "display_name": "Pheniramine Maleate",
    "generic_name": "Pheniramine Maleate",
    "active_ingredient": "Pheniramine Maleate",
    "composition": "Pheniramine Maleate 25 mg",
    "category": "Fever",
    "strength_form": "25 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / Parenteral",
    "description": "First-generation antihistamine adjunct for serum sickness and febrile transfusion reactions.",
    "combination_ingredients": null,
    "reference_source": "IP 2022 (R06AB05)",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00083",
        "medicine_id": "med-cat-0031",
        "strength": "25 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Pheniramine Maleate 25 mg",
        "reference_source": "IP 2022 (R06AB05)",
        "is_prescription_required": true
      },
      {
        "id": "var-00084",
        "medicine_id": "med-cat-0031",
        "strength": "22.75 mg/mL",
        "dosage_form": "Injection",
        "route": "IM / IV",
        "composition": "Pheniramine Maleate 22.75 mg per mL",
        "reference_source": "IP 2022 (R06AB05)",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0032",
    "display_name": "Ibuprofen",
    "generic_name": "Ibuprofen",
    "active_ingredient": "Ibuprofen",
    "composition": "Ibuprofen 200 mg",
    "category": "Pain Relief",
    "strength_form": "200 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Propionic acid derivative NSAID for musculoskeletal pain and dysmenorrhea.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (M01AE01), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00085",
        "medicine_id": "med-cat-0032",
        "strength": "200 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Ibuprofen 200 mg",
        "reference_source": "NLEM 2022 (M01AE01), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00086",
        "medicine_id": "med-cat-0032",
        "strength": "400 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Ibuprofen 400 mg",
        "reference_source": "NLEM 2022 (M01AE01), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00087",
        "medicine_id": "med-cat-0032",
        "strength": "600 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Ibuprofen 600 mg",
        "reference_source": "NLEM 2022 (M01AE01), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00088",
        "medicine_id": "med-cat-0032",
        "strength": "100 mg/5 mL",
        "dosage_form": "Oral Suspension",
        "route": "Oral",
        "composition": "Ibuprofen 100 mg per 5 mL",
        "reference_source": "NLEM 2022 (M01AE01), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0033",
    "display_name": "Diclofenac Sodium",
    "generic_name": "Diclofenac Sodium",
    "active_ingredient": "Diclofenac Sodium",
    "composition": "Diclofenac Sodium 50 mg",
    "category": "Pain Relief",
    "strength_form": "50 mg Gastro-resistant Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IM / Topical",
    "description": "NSAID for acute trauma, post-operative somatic pain, and inflammatory arthropathies.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (M01AB05), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00089",
        "medicine_id": "med-cat-0033",
        "strength": "50 mg",
        "dosage_form": "Gastro-resistant Tablet",
        "route": "Oral",
        "composition": "Diclofenac Sodium 50 mg",
        "reference_source": "NLEM 2022 (M01AB05), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00090",
        "medicine_id": "med-cat-0033",
        "strength": "75 mg/3 mL",
        "dosage_form": "Injection",
        "route": "Intramuscular",
        "composition": "Diclofenac Sodium 75 mg per 3 mL",
        "reference_source": "NLEM 2022 (M01AB05), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00091",
        "medicine_id": "med-cat-0033",
        "strength": "1% w/w",
        "dosage_form": "Topical Gel",
        "route": "Topical",
        "composition": "Diclofenac Diethylamine eq. to Diclofenac Sodium 1% w/w",
        "reference_source": "NLEM 2022 (M01AB05), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0034",
    "display_name": "Tramadol",
    "generic_name": "Tramadol",
    "active_ingredient": "Tramadol Hydrochloride",
    "composition": "Tramadol Hydrochloride 50 mg",
    "category": "Pain Relief",
    "strength_form": "50 mg Capsule",
    "dosage_form": "Capsule",
    "route": "Oral / IV",
    "description": "Centrally acting synthetic analgesic for moderate to severe somatic pain.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N02AX02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00092",
        "medicine_id": "med-cat-0034",
        "strength": "50 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Tramadol Hydrochloride 50 mg",
        "reference_source": "NLEM 2022 (N02AX02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00093",
        "medicine_id": "med-cat-0034",
        "strength": "50 mg/mL",
        "dosage_form": "Injection",
        "route": "IV / IM",
        "composition": "Tramadol Hydrochloride 50 mg per mL",
        "reference_source": "NLEM 2022 (N02AX02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0035",
    "display_name": "Aceclofenac",
    "generic_name": "Aceclofenac",
    "active_ingredient": "Aceclofenac",
    "composition": "Aceclofenac 100 mg",
    "category": "Pain Relief",
    "strength_form": "100 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "NSAID with superior gastric tolerability for osteoarthritis and lumbago.",
    "combination_ingredients": null,
    "reference_source": "IP 2022, WHO ATC M01AB16",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00094",
        "medicine_id": "med-cat-0035",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Aceclofenac 100 mg",
        "reference_source": "IP 2022, WHO ATC M01AB16",
        "is_prescription_required": true
      },
      {
        "id": "var-00095",
        "medicine_id": "med-cat-0035",
        "strength": "200 mg SR",
        "dosage_form": "Sustained Release Tablet",
        "route": "Oral",
        "composition": "Aceclofenac 200 mg SR",
        "reference_source": "IP 2022, WHO ATC M01AB16",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0036",
    "display_name": "Naproxen",
    "generic_name": "Naproxen",
    "active_ingredient": "Naproxen",
    "composition": "Naproxen 250 mg",
    "category": "Pain Relief",
    "strength_form": "250 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Long-acting propionic acid NSAID with favorable cardiovascular profile for migraine and arthritis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (M01AE02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00096",
        "medicine_id": "med-cat-0036",
        "strength": "250 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Naproxen 250 mg",
        "reference_source": "NLEM 2022 (M01AE02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00097",
        "medicine_id": "med-cat-0036",
        "strength": "500 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Naproxen 500 mg",
        "reference_source": "NLEM 2022 (M01AE02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0037",
    "display_name": "Aceclofenac + Paracetamol",
    "generic_name": "Aceclofenac + Paracetamol",
    "active_ingredient": "Aceclofenac and Paracetamol",
    "composition": "Aceclofenac 100 mg + Paracetamol 325 mg",
    "category": "Pain Relief",
    "strength_form": "100 mg + 325 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Synergistic fixed-dose analgesic combination for acute musculoskeletal swelling and pain.",
    "combination_ingredients": "Aceclofenac 100 mg + Paracetamol 325 mg",
    "reference_source": "CDSCO Approved FDC, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00098",
        "medicine_id": "med-cat-0037",
        "strength": "100 mg + 325 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Aceclofenac 100 mg + Paracetamol 325 mg",
        "reference_source": "CDSCO Approved FDC, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0038",
    "display_name": "Levocetirizine",
    "generic_name": "Levocetirizine",
    "active_ingredient": "Levocetirizine Dihydrochloride",
    "composition": "Levocetirizine Dihydrochloride 5 mg",
    "category": "Cold and Cough",
    "strength_form": "5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Non-sedating antihistamine for seasonal allergic rhinitis, sneezing, and rhinorrhea.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (R06AE09), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00099",
        "medicine_id": "med-cat-0038",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Levocetirizine Dihydrochloride 5 mg",
        "reference_source": "NLEM 2022 (R06AE09), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00100",
        "medicine_id": "med-cat-0038",
        "strength": "2.5 mg/5 mL",
        "dosage_form": "Syrup",
        "route": "Oral",
        "composition": "Levocetirizine Dihydrochloride 2.5 mg per 5 mL",
        "reference_source": "NLEM 2022 (R06AE09), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0039",
    "display_name": "Dextromethorphan",
    "generic_name": "Dextromethorphan",
    "active_ingredient": "Dextromethorphan Hydrobromide",
    "composition": "Dextromethorphan Hydrobromide 10 mg per 5 mL",
    "category": "Cold and Cough",
    "strength_form": "10 mg/5 mL Syrup",
    "dosage_form": "Syrup",
    "route": "Oral",
    "description": "Non-opioid antitussive elevating the cough threshold in the medullary cough center.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (R05DA09), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00101",
        "medicine_id": "med-cat-0039",
        "strength": "10 mg/5 mL",
        "dosage_form": "Syrup",
        "route": "Oral",
        "composition": "Dextromethorphan Hydrobromide 10 mg per 5 mL",
        "reference_source": "NLEM 2022 (R05DA09), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00102",
        "medicine_id": "med-cat-0039",
        "strength": "13.5 mg",
        "dosage_form": "Lozenge",
        "route": "Oral",
        "composition": "Dextromethorphan Hydrobromide 13.5 mg",
        "reference_source": "NLEM 2022 (R05DA09), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0040",
    "display_name": "Ambroxol",
    "generic_name": "Ambroxol",
    "active_ingredient": "Ambroxol Hydrochloride",
    "composition": "Ambroxol Hydrochloride 30 mg",
    "category": "Cold and Cough",
    "strength_form": "30 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Mucolytic expectorant stimulating pulmonary surfactant synthesis and clearing phlegm.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC R05CB06, IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00103",
        "medicine_id": "med-cat-0040",
        "strength": "30 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Ambroxol Hydrochloride 30 mg",
        "reference_source": "WHO ATC R05CB06, IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00104",
        "medicine_id": "med-cat-0040",
        "strength": "15 mg/5 mL",
        "dosage_form": "Syrup",
        "route": "Oral",
        "composition": "Ambroxol Hydrochloride 15 mg per 5 mL",
        "reference_source": "WHO ATC R05CB06, IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0041",
    "display_name": "Guaifenesin",
    "generic_name": "Guaifenesin",
    "active_ingredient": "Guaifenesin",
    "composition": "Guaifenesin 100 mg per 5 mL",
    "category": "Cold and Cough",
    "strength_form": "100 mg/5 mL Syrup",
    "dosage_form": "Syrup",
    "route": "Oral",
    "description": "Expectorant increasing respiratory tract fluid volume to lubricate and expel mucus.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (R05CA03), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00105",
        "medicine_id": "med-cat-0041",
        "strength": "100 mg/5 mL",
        "dosage_form": "Syrup",
        "route": "Oral",
        "composition": "Guaifenesin 100 mg per 5 mL",
        "reference_source": "NLEM 2022 (R05CA03), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00106",
        "medicine_id": "med-cat-0041",
        "strength": "200 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Guaifenesin 200 mg",
        "reference_source": "NLEM 2022 (R05CA03), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0042",
    "display_name": "Phenylephrine",
    "generic_name": "Phenylephrine",
    "active_ingredient": "Phenylephrine Hydrochloride",
    "composition": "Phenylephrine Hydrochloride 10 mg",
    "category": "Cold and Cough",
    "strength_form": "10 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Alpha-1 adrenergic nasal decongestant relieving sinus pressure and stuffy nose.",
    "combination_ingredients": null,
    "reference_source": "IP 2022, WHO ATC R01BA03",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00107",
        "medicine_id": "med-cat-0042",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Phenylephrine Hydrochloride 10 mg",
        "reference_source": "IP 2022, WHO ATC R01BA03",
        "is_prescription_required": false
      },
      {
        "id": "var-00108",
        "medicine_id": "med-cat-0042",
        "strength": "5 mg/5 mL",
        "dosage_form": "Oral Drops",
        "route": "Oral",
        "composition": "Phenylephrine Hydrochloride 5 mg per 5 mL",
        "reference_source": "IP 2022, WHO ATC R01BA03",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0043",
    "display_name": "Montelukast + Levocetirizine",
    "generic_name": "Montelukast + Levocetirizine",
    "active_ingredient": "Montelukast Sodium and Levocetirizine Dihydrochloride",
    "composition": "Montelukast Sodium 10 mg + Levocetirizine Dihydrochloride 5 mg",
    "category": "Cold and Cough",
    "strength_form": "10 mg + 5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Dual anti-leukotriene and antihistamine formulation for severe allergic rhinitis.",
    "combination_ingredients": "Montelukast 10 mg + Levocetirizine 5 mg",
    "reference_source": "CDSCO Approved FDC, WHO ATC R03DC53",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00109",
        "medicine_id": "med-cat-0043",
        "strength": "10 mg + 5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Montelukast Sodium 10 mg + Levocetirizine Dihydrochloride 5 mg",
        "reference_source": "CDSCO Approved FDC, WHO ATC R03DC53",
        "is_prescription_required": true
      },
      {
        "id": "var-00110",
        "medicine_id": "med-cat-0043",
        "strength": "4 mg + 2.5 mg",
        "dosage_form": "Dispersible Tablet",
        "route": "Oral",
        "composition": "Montelukast Sodium 4 mg + Levocetirizine Dihydrochloride 2.5 mg",
        "reference_source": "CDSCO Approved FDC, WHO ATC R03DC53",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0044",
    "display_name": "Salbutamol",
    "generic_name": "Salbutamol",
    "active_ingredient": "Salbutamol Sulfate",
    "composition": "Salbutamol Sulfate 100 mcg per metered dose (200 doses)",
    "category": "Asthma and COPD",
    "strength_form": "100 mcg/puff Metered Dose Inhaler",
    "dosage_form": "Inhaler",
    "route": "Inhalation / Oral",
    "description": "Short-acting beta-2 agonist (SABA) for rapid bronchospasm relief in acute asthma.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (R03AC02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00111",
        "medicine_id": "med-cat-0044",
        "strength": "100 mcg/puff",
        "dosage_form": "Metered Dose Inhaler",
        "route": "Inhalation",
        "composition": "Salbutamol Sulfate 100 mcg per metered dose (200 doses)",
        "reference_source": "NLEM 2022 (R03AC02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00112",
        "medicine_id": "med-cat-0044",
        "strength": "2 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Salbutamol Sulfate equivalent to Salbutamol 2 mg",
        "reference_source": "NLEM 2022 (R03AC02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00113",
        "medicine_id": "med-cat-0044",
        "strength": "4 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Salbutamol Sulfate equivalent to Salbutamol 4 mg",
        "reference_source": "NLEM 2022 (R03AC02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00114",
        "medicine_id": "med-cat-0044",
        "strength": "2.5 mg/2.5 mL",
        "dosage_form": "Respules for Nebulization",
        "route": "Inhalation",
        "composition": "Salbutamol 2.5 mg per 2.5 mL respule",
        "reference_source": "NLEM 2022 (R03AC02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0045",
    "display_name": "Budesonide",
    "generic_name": "Budesonide",
    "active_ingredient": "Budesonide",
    "composition": "Budesonide 100 mcg per dose",
    "category": "Asthma and COPD",
    "strength_form": "100 mcg/dose Metered Dose Inhaler",
    "dosage_form": "Inhaler",
    "route": "Inhalation",
    "description": "Inhaled corticosteroid with high topical glucocorticoid anti-inflammatory activity.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (R03BA02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00115",
        "medicine_id": "med-cat-0045",
        "strength": "100 mcg/dose",
        "dosage_form": "Metered Dose Inhaler",
        "route": "Inhalation",
        "composition": "Budesonide 100 mcg per dose",
        "reference_source": "NLEM 2022 (R03BA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00116",
        "medicine_id": "med-cat-0045",
        "strength": "200 mcg/dose",
        "dosage_form": "Dry Powder Inhaler",
        "route": "Inhalation",
        "composition": "Budesonide 200 mcg per dose",
        "reference_source": "NLEM 2022 (R03BA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00117",
        "medicine_id": "med-cat-0045",
        "strength": "0.5 mg/2 mL",
        "dosage_form": "Respules for Nebulization",
        "route": "Inhalation",
        "composition": "Budesonide 0.5 mg per 2 mL",
        "reference_source": "NLEM 2022 (R03BA02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0046",
    "display_name": "Ipratropium Bromide",
    "generic_name": "Ipratropium Bromide",
    "active_ingredient": "Ipratropium Bromide Monohydrate",
    "composition": "Ipratropium Bromide 20 mcg per puff",
    "category": "Asthma and COPD",
    "strength_form": "20 mcg/puff Metered Dose Inhaler",
    "dosage_form": "Inhaler",
    "route": "Inhalation",
    "description": "Short-acting muscarinic antagonist bronchodilator for COPD bronchospasm.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (R03BB01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00118",
        "medicine_id": "med-cat-0046",
        "strength": "20 mcg/puff",
        "dosage_form": "Metered Dose Inhaler",
        "route": "Inhalation",
        "composition": "Ipratropium Bromide 20 mcg per puff",
        "reference_source": "NLEM 2022 (R03BB01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00119",
        "medicine_id": "med-cat-0046",
        "strength": "250 mcg/mL",
        "dosage_form": "Respules for Nebulization",
        "route": "Inhalation",
        "composition": "Ipratropium Bromide 250 mcg per mL (2 mL)",
        "reference_source": "NLEM 2022 (R03BB01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0047",
    "display_name": "Formoterol + Budesonide",
    "generic_name": "Formoterol + Budesonide",
    "active_ingredient": "Formoterol Fumarate Dihydrate and Budesonide",
    "composition": "Formoterol Fumarate 6 mcg + Budesonide 200 mcg",
    "category": "Asthma and COPD",
    "strength_form": "6 mcg + 200 mcg Dry Powder Inhaler",
    "dosage_form": "Inhaler",
    "route": "Inhalation",
    "description": "LABA plus ICS combination for maintenance and reliever therapy in persistent asthma.",
    "combination_ingredients": "Formoterol Fumarate 6 mcg + Budesonide 200 mcg / 400 mcg",
    "reference_source": "NLEM 2022 (R03AK07), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00120",
        "medicine_id": "med-cat-0047",
        "strength": "6 mcg + 200 mcg",
        "dosage_form": "Dry Powder Inhaler",
        "route": "Inhalation",
        "composition": "Formoterol Fumarate 6 mcg + Budesonide 200 mcg",
        "reference_source": "NLEM 2022 (R03AK07), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00121",
        "medicine_id": "med-cat-0047",
        "strength": "6 mcg + 400 mcg",
        "dosage_form": "Dry Powder Inhaler",
        "route": "Inhalation",
        "composition": "Formoterol Fumarate 6 mcg + Budesonide 400 mcg",
        "reference_source": "NLEM 2022 (R03AK07), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0048",
    "display_name": "Theophylline",
    "generic_name": "Theophylline",
    "active_ingredient": "Theophylline Hydrate",
    "composition": "Theophylline 100 mg",
    "category": "Asthma and COPD",
    "strength_form": "100 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Methylxanthine bronchodilator for reversible airway obstruction in chronic asthma and COPD.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (R03DA04), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00122",
        "medicine_id": "med-cat-0048",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Theophylline 100 mg",
        "reference_source": "NLEM 2022 (R03DA04), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00123",
        "medicine_id": "med-cat-0048",
        "strength": "300 mg SR",
        "dosage_form": "Sustained Release Tablet",
        "route": "Oral",
        "composition": "Theophylline 300 mg SR",
        "reference_source": "NLEM 2022 (R03DA04), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0049",
    "display_name": "Montelukast",
    "generic_name": "Montelukast",
    "active_ingredient": "Montelukast Sodium",
    "composition": "Montelukast Sodium 4 mg",
    "category": "Asthma and COPD",
    "strength_form": "4 mg Chewable Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "CysLT1 leukotriene receptor antagonist for prophylaxis of exercise-induced asthma.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (R03DC03), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00124",
        "medicine_id": "med-cat-0049",
        "strength": "4 mg",
        "dosage_form": "Chewable Tablet",
        "route": "Oral",
        "composition": "Montelukast Sodium 4 mg",
        "reference_source": "NLEM 2022 (R03DC03), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00125",
        "medicine_id": "med-cat-0049",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Montelukast Sodium 10 mg",
        "reference_source": "NLEM 2022 (R03DC03), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0050",
    "display_name": "N-Acetylcysteine",
    "generic_name": "N-Acetylcysteine",
    "active_ingredient": "Acetylcysteine",
    "composition": "Acetylcysteine 600 mg",
    "category": "Respiratory Diseases",
    "strength_form": "600 mg Effervescent Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Mucolytic cleaving disulfide bonds in thick mucus, and glutathione precursor.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (R05CB01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00126",
        "medicine_id": "med-cat-0050",
        "strength": "600 mg",
        "dosage_form": "Effervescent Tablet",
        "route": "Oral",
        "composition": "Acetylcysteine 600 mg",
        "reference_source": "NLEM 2022 (R05CB01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00127",
        "medicine_id": "med-cat-0050",
        "strength": "200 mg/mL",
        "dosage_form": "Injection",
        "route": "Intravenous",
        "composition": "Acetylcysteine 200 mg per mL (5 mL)",
        "reference_source": "NLEM 2022 (R05CB01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0051",
    "display_name": "Doxofylline",
    "generic_name": "Doxofylline",
    "active_ingredient": "Doxofylline",
    "composition": "Doxofylline 400 mg",
    "category": "Respiratory Diseases",
    "strength_form": "400 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Xanthine derivative with lower cardiac and neurotoxic side-effects for COPD.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC R03DA11, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00128",
        "medicine_id": "med-cat-0051",
        "strength": "400 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Doxofylline 400 mg",
        "reference_source": "WHO ATC R03DA11, IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00129",
        "medicine_id": "med-cat-0051",
        "strength": "100 mg/5 mL",
        "dosage_form": "Syrup",
        "route": "Oral",
        "composition": "Doxofylline 100 mg per 5 mL",
        "reference_source": "WHO ATC R03DA11, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0052",
    "display_name": "Beclomethasone",
    "generic_name": "Beclomethasone",
    "active_ingredient": "Beclomethasone Dipropionate",
    "composition": "Beclomethasone Dipropionate 50 mcg per puff",
    "category": "Respiratory Diseases",
    "strength_form": "50 mcg/puff Metered Dose Inhaler",
    "dosage_form": "Inhaler",
    "route": "Inhalation / Nasal",
    "description": "Glucocorticoid reducing inflammatory mucosal swelling and bronchial hyperreactivity.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (R03BA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00130",
        "medicine_id": "med-cat-0052",
        "strength": "50 mcg/puff",
        "dosage_form": "Metered Dose Inhaler",
        "route": "Inhalation",
        "composition": "Beclomethasone Dipropionate 50 mcg per puff",
        "reference_source": "NLEM 2022 (R03BA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00131",
        "medicine_id": "med-cat-0052",
        "strength": "100 mcg/puff",
        "dosage_form": "Metered Dose Inhaler",
        "route": "Inhalation",
        "composition": "Beclomethasone Dipropionate 100 mcg per puff",
        "reference_source": "NLEM 2022 (R03BA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00132",
        "medicine_id": "med-cat-0052",
        "strength": "50 mcg/spray",
        "dosage_form": "Nasal Spray",
        "route": "Nasal",
        "composition": "Beclomethasone Dipropionate 50 mcg per metered spray",
        "reference_source": "NLEM 2022 (R03BA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0053",
    "display_name": "Tiotropium",
    "generic_name": "Tiotropium",
    "active_ingredient": "Tiotropium Bromide Monohydrate",
    "composition": "Tiotropium Bromide 18 mcg",
    "category": "Respiratory Diseases",
    "strength_form": "18 mcg Rotacaps with Inhaler",
    "dosage_form": "Inhaler",
    "route": "Inhalation",
    "description": "Long-acting muscarinic antagonist (LAMA) bronchodilator for 24h COPD therapy.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (R03BB04), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00133",
        "medicine_id": "med-cat-0053",
        "strength": "18 mcg",
        "dosage_form": "Rotacaps with Inhaler",
        "route": "Inhalation",
        "composition": "Tiotropium Bromide 18 mcg",
        "reference_source": "NLEM 2022 (R03BB04), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00134",
        "medicine_id": "med-cat-0053",
        "strength": "9 mcg/puff",
        "dosage_form": "Respimat Inhaler",
        "route": "Inhalation",
        "composition": "Tiotropium Bromide 9 mcg per puff",
        "reference_source": "NLEM 2022 (R03BB04), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0054",
    "display_name": "Salmeterol + Fluticasone",
    "generic_name": "Salmeterol + Fluticasone",
    "active_ingredient": "Salmeterol Xinafoate and Fluticasone Propionate",
    "composition": "Salmeterol 50 mcg + Fluticasone Propionate 100 mcg",
    "category": "Respiratory Diseases",
    "strength_form": "50 mcg + 100 mcg Dry Powder Inhaler",
    "dosage_form": "Inhaler",
    "route": "Inhalation",
    "description": "LABA and fluorinated steroid for maintenance in severe airway obstruction.",
    "combination_ingredients": "Salmeterol 50 mcg + Fluticasone Propionate 250 mcg",
    "reference_source": "NLEM 2022 (R03AK06), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00135",
        "medicine_id": "med-cat-0054",
        "strength": "50 mcg + 100 mcg",
        "dosage_form": "Dry Powder Inhaler",
        "route": "Inhalation",
        "composition": "Salmeterol 50 mcg + Fluticasone Propionate 100 mcg",
        "reference_source": "NLEM 2022 (R03AK06), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00136",
        "medicine_id": "med-cat-0054",
        "strength": "50 mcg + 250 mcg",
        "dosage_form": "Dry Powder Inhaler",
        "route": "Inhalation",
        "composition": "Salmeterol 50 mcg + Fluticasone Propionate 250 mcg",
        "reference_source": "NLEM 2022 (R03AK06), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0055",
    "display_name": "Levothyroxine Sodium",
    "generic_name": "Levothyroxine Sodium",
    "active_ingredient": "Levothyroxine Sodium",
    "composition": "Levothyroxine Sodium 25 mcg",
    "category": "Thyroid Disorders",
    "strength_form": "25 mcg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Synthetic T4 hormone replacement for primary and secondary hypothyroidism.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (H03AA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00137",
        "medicine_id": "med-cat-0055",
        "strength": "25 mcg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Levothyroxine Sodium 25 mcg",
        "reference_source": "NLEM 2022 (H03AA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00138",
        "medicine_id": "med-cat-0055",
        "strength": "50 mcg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Levothyroxine Sodium 50 mcg",
        "reference_source": "NLEM 2022 (H03AA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00139",
        "medicine_id": "med-cat-0055",
        "strength": "75 mcg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Levothyroxine Sodium 75 mcg",
        "reference_source": "NLEM 2022 (H03AA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00140",
        "medicine_id": "med-cat-0055",
        "strength": "88 mcg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Levothyroxine Sodium 88 mcg",
        "reference_source": "NLEM 2022 (H03AA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00141",
        "medicine_id": "med-cat-0055",
        "strength": "100 mcg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Levothyroxine Sodium 100 mcg",
        "reference_source": "NLEM 2022 (H03AA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00142",
        "medicine_id": "med-cat-0055",
        "strength": "125 mcg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Levothyroxine Sodium 125 mcg",
        "reference_source": "NLEM 2022 (H03AA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0056",
    "display_name": "Carbimazole",
    "generic_name": "Carbimazole",
    "active_ingredient": "Carbimazole",
    "composition": "Carbimazole 5 mg",
    "category": "Thyroid Disorders",
    "strength_form": "5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Thionamide antithyroid agent inhibiting thyroid peroxidase in hyperthyroidism.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (H03BB01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00143",
        "medicine_id": "med-cat-0056",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Carbimazole 5 mg",
        "reference_source": "NLEM 2022 (H03BB01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00144",
        "medicine_id": "med-cat-0056",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Carbimazole 10 mg",
        "reference_source": "NLEM 2022 (H03BB01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00145",
        "medicine_id": "med-cat-0056",
        "strength": "20 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Carbimazole 20 mg",
        "reference_source": "NLEM 2022 (H03BB01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0057",
    "display_name": "Propylthiouracil",
    "generic_name": "Propylthiouracil",
    "active_ingredient": "Propylthiouracil",
    "composition": "Propylthiouracil 50 mg",
    "category": "Thyroid Disorders",
    "strength_form": "50 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Antithyroid agent inhibiting synthesis and peripheral deiodination in thyroid crisis.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC H03BA02, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00146",
        "medicine_id": "med-cat-0057",
        "strength": "50 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Propylthiouracil 50 mg",
        "reference_source": "WHO ATC H03BA02, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0058",
    "display_name": "Lugols Iodine Solution",
    "generic_name": "Lugols Iodine Solution",
    "active_ingredient": "Aqueous Iodine with Potassium Iodide",
    "composition": "Iodine 5% w/v with Potassium Iodide 10% w/v",
    "category": "Thyroid Disorders",
    "strength_form": "5% w/v Oral Solution Drops",
    "dosage_form": "Oral Solution",
    "route": "Oral",
    "description": "Inorganic iodine solution causing temporary thyroid hormone inhibition in thyroid storm.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (H03CA), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00147",
        "medicine_id": "med-cat-0058",
        "strength": "5% w/v",
        "dosage_form": "Oral Solution Drops",
        "route": "Oral",
        "composition": "Iodine 5% w/v with Potassium Iodide 10% w/v",
        "reference_source": "NLEM 2022 (H03CA), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0059",
    "display_name": "Liothyronine Sodium",
    "generic_name": "Liothyronine Sodium",
    "active_ingredient": "Liothyronine Sodium",
    "composition": "Liothyronine Sodium 25 mcg",
    "category": "Thyroid Disorders",
    "strength_form": "25 mcg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Synthetic triiodothyronine (T3) for rapid hormone replacement in severe myxedema coma.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC H03AA02, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00148",
        "medicine_id": "med-cat-0059",
        "strength": "25 mcg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Liothyronine Sodium 25 mcg",
        "reference_source": "WHO ATC H03AA02, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0060",
    "display_name": "Pantoprazole",
    "generic_name": "Pantoprazole",
    "active_ingredient": "Pantoprazole Sodium",
    "composition": "Pantoprazole Sodium equivalent to Pantoprazole 20 mg",
    "category": "Gastric Problems and Acidity",
    "strength_form": "20 mg Gastro-resistant Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Irreversible proton pump inhibitor (H+/K+-ATPase) for GERD and peptic ulcer healing.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A02BC02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00149",
        "medicine_id": "med-cat-0060",
        "strength": "20 mg",
        "dosage_form": "Gastro-resistant Tablet",
        "route": "Oral",
        "composition": "Pantoprazole Sodium equivalent to Pantoprazole 20 mg",
        "reference_source": "NLEM 2022 (A02BC02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00150",
        "medicine_id": "med-cat-0060",
        "strength": "40 mg",
        "dosage_form": "Gastro-resistant Tablet",
        "route": "Oral",
        "composition": "Pantoprazole Sodium equivalent to Pantoprazole 40 mg",
        "reference_source": "NLEM 2022 (A02BC02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00151",
        "medicine_id": "med-cat-0060",
        "strength": "40 mg",
        "dosage_form": "Powder for Injection",
        "route": "Intravenous",
        "composition": "Pantoprazole Sodium 40 mg for IV injection",
        "reference_source": "NLEM 2022 (A02BC02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0061",
    "display_name": "Omeprazole",
    "generic_name": "Omeprazole",
    "active_ingredient": "Omeprazole",
    "composition": "Omeprazole 20 mg enteric coated pellets",
    "category": "Gastric Problems and Acidity",
    "strength_form": "20 mg Gastro-resistant Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Proton pump inhibitor suppressing gastric acid secretion in active duodenal ulcer.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A02BC01), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00152",
        "medicine_id": "med-cat-0061",
        "strength": "20 mg",
        "dosage_form": "Gastro-resistant Capsule",
        "route": "Oral",
        "composition": "Omeprazole 20 mg enteric coated pellets",
        "reference_source": "NLEM 2022 (A02BC01), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00153",
        "medicine_id": "med-cat-0061",
        "strength": "40 mg",
        "dosage_form": "Gastro-resistant Capsule",
        "route": "Oral",
        "composition": "Omeprazole 40 mg enteric coated pellets",
        "reference_source": "NLEM 2022 (A02BC01), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0062",
    "display_name": "Rabeprazole",
    "generic_name": "Rabeprazole",
    "active_ingredient": "Rabeprazole Sodium",
    "composition": "Rabeprazole Sodium 20 mg",
    "category": "Gastric Problems and Acidity",
    "strength_form": "20 mg Gastro-resistant Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Rapidly acting PPI offering faster acid suppression in erosive esophagitis.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC A02BC04, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00154",
        "medicine_id": "med-cat-0062",
        "strength": "20 mg",
        "dosage_form": "Gastro-resistant Tablet",
        "route": "Oral",
        "composition": "Rabeprazole Sodium 20 mg",
        "reference_source": "WHO ATC A02BC04, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0063",
    "display_name": "Famotidine",
    "generic_name": "Famotidine",
    "active_ingredient": "Famotidine",
    "composition": "Famotidine 20 mg",
    "category": "Gastric Problems and Acidity",
    "strength_form": "20 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Competitive H2-receptor antagonist reducing basal and nocturnal gastric secretion.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A02BA03), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00155",
        "medicine_id": "med-cat-0063",
        "strength": "20 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Famotidine 20 mg",
        "reference_source": "NLEM 2022 (A02BA03), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00156",
        "medicine_id": "med-cat-0063",
        "strength": "40 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Famotidine 40 mg",
        "reference_source": "NLEM 2022 (A02BA03), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0064",
    "display_name": "Aluminium Hydroxide + Magnesium Hydroxide",
    "generic_name": "Aluminium Hydroxide + Magnesium Hydroxide",
    "active_ingredient": "Aluminium Hydroxide and Magnesium Hydroxide",
    "composition": "Dried Aluminium Hydroxide Gel 300 mg + Magnesium Hydroxide 150 mg per 5 mL",
    "category": "Gastric Problems and Acidity",
    "strength_form": "300 mg + 150 mg/5 mL Oral Suspension",
    "dosage_form": "Oral Suspension",
    "route": "Oral",
    "description": "Balanced nonsystemic antacid neutralizing hydrochloric acid with minimal bowel habit changes.",
    "combination_ingredients": "Aluminium Hydroxide 300 mg + Magnesium Hydroxide 150 mg / 5 mL",
    "reference_source": "NLEM 2022 (A02AD01), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00157",
        "medicine_id": "med-cat-0064",
        "strength": "300 mg + 150 mg/5 mL",
        "dosage_form": "Oral Suspension",
        "route": "Oral",
        "composition": "Dried Aluminium Hydroxide Gel 300 mg + Magnesium Hydroxide 150 mg per 5 mL",
        "reference_source": "NLEM 2022 (A02AD01), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0065",
    "display_name": "Pantoprazole + Domperidone",
    "generic_name": "Pantoprazole + Domperidone",
    "active_ingredient": "Pantoprazole Sodium and Domperidone",
    "composition": "Pantoprazole 40 mg Gastro-resistant + Domperidone 30 mg Sustained Release",
    "category": "Gastric Problems and Acidity",
    "strength_form": "40 mg + 30 mg SR Sustained Release Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Proton pump inhibitor combined with prokinetic agent for reflux with dyspepsia.",
    "combination_ingredients": "Pantoprazole 40 mg + Domperidone 30 mg SR",
    "reference_source": "CDSCO Approved FDC, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00158",
        "medicine_id": "med-cat-0065",
        "strength": "40 mg + 30 mg SR",
        "dosage_form": "Sustained Release Capsule",
        "route": "Oral",
        "composition": "Pantoprazole 40 mg Gastro-resistant + Domperidone 30 mg Sustained Release",
        "reference_source": "CDSCO Approved FDC, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0066",
    "display_name": "Domperidone",
    "generic_name": "Domperidone",
    "active_ingredient": "Domperidone",
    "composition": "Domperidone 10 mg",
    "category": "Digestive Disorders",
    "strength_form": "10 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Peripheral dopamine D2 receptor antagonist promoting upper gastrointestinal motility.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A03FA03), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00159",
        "medicine_id": "med-cat-0066",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Domperidone 10 mg",
        "reference_source": "NLEM 2022 (A03FA03), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00160",
        "medicine_id": "med-cat-0066",
        "strength": "1 mg/mL",
        "dosage_form": "Oral Suspension",
        "route": "Oral",
        "composition": "Domperidone 1 mg per mL",
        "reference_source": "NLEM 2022 (A03FA03), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0067",
    "display_name": "Ondansetron",
    "generic_name": "Ondansetron",
    "active_ingredient": "Ondansetron Hydrochloride Dihydrate",
    "composition": "Ondansetron Hydrochloride eq. to Ondansetron 4 mg",
    "category": "Digestive Disorders",
    "strength_form": "4 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Selective 5-HT3 receptor antagonist for acute post-operative and chemotherapy emesis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A04AA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00161",
        "medicine_id": "med-cat-0067",
        "strength": "4 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Ondansetron Hydrochloride eq. to Ondansetron 4 mg",
        "reference_source": "NLEM 2022 (A04AA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00162",
        "medicine_id": "med-cat-0067",
        "strength": "8 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Ondansetron Hydrochloride eq. to Ondansetron 8 mg",
        "reference_source": "NLEM 2022 (A04AA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00163",
        "medicine_id": "med-cat-0067",
        "strength": "2 mg/mL",
        "dosage_form": "Injection",
        "route": "IV / IM",
        "composition": "Ondansetron 2 mg per mL (2 mL / 4 mL)",
        "reference_source": "NLEM 2022 (A04AA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00164",
        "medicine_id": "med-cat-0067",
        "strength": "2 mg/5 mL",
        "dosage_form": "Syrup",
        "route": "Oral",
        "composition": "Ondansetron 2 mg per 5 mL",
        "reference_source": "NLEM 2022 (A04AA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0068",
    "display_name": "Metoclopramide",
    "generic_name": "Metoclopramide",
    "active_ingredient": "Metoclopramide Hydrochloride",
    "composition": "Metoclopramide Hydrochloride 10 mg",
    "category": "Digestive Disorders",
    "strength_form": "10 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Central and peripheral dopamine antagonist accelerating gastric emptying and intestinal transit.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A03FA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00165",
        "medicine_id": "med-cat-0068",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Metoclopramide Hydrochloride 10 mg",
        "reference_source": "NLEM 2022 (A03FA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00166",
        "medicine_id": "med-cat-0068",
        "strength": "5 mg/mL",
        "dosage_form": "Injection",
        "route": "IV / IM",
        "composition": "Metoclopramide Hydrochloride 5 mg per mL (2 mL)",
        "reference_source": "NLEM 2022 (A03FA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0069",
    "display_name": "Loperamide",
    "generic_name": "Loperamide",
    "active_ingredient": "Loperamide Hydrochloride",
    "composition": "Loperamide Hydrochloride 2 mg",
    "category": "Digestive Disorders",
    "strength_form": "2 mg Capsule / Tablet",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Peripheral mu-opioid receptor agonist slowing gastrointestinal motility in acute non-infectious diarrhea.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A07DA03), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00167",
        "medicine_id": "med-cat-0069",
        "strength": "2 mg",
        "dosage_form": "Capsule / Tablet",
        "route": "Oral",
        "composition": "Loperamide Hydrochloride 2 mg",
        "reference_source": "NLEM 2022 (A07DA03), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0070",
    "display_name": "Oral Rehydration Salts",
    "generic_name": "Oral Rehydration Salts",
    "active_ingredient": "Sodium Chloride, Potassium Chloride, Sodium Citrate, and Dextrose",
    "composition": "WHO Reduced Osmolarity ORS formula: 20.5 g powder for 1 Litre of clean drinking water",
    "category": "Digestive Disorders",
    "strength_form": "20.5 g/L Sachet Powder for Oral Solution",
    "dosage_form": "Oral Powder",
    "route": "Oral",
    "description": "WHO formulation electrolyte-glucose replacement solution for dehydration in acute diarrhea.",
    "combination_ingredients": "NaCl 2.6g + KCl 1.5g + Sodium Citrate 2.9g + Dextrose 13.5g",
    "reference_source": "NLEM 2022 (A07CA), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00168",
        "medicine_id": "med-cat-0070",
        "strength": "20.5 g/L Sachet",
        "dosage_form": "Powder for Oral Solution",
        "route": "Oral",
        "composition": "WHO Reduced Osmolarity ORS formula: 20.5 g powder for 1 Litre of clean drinking water",
        "reference_source": "NLEM 2022 (A07CA), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0071",
    "display_name": "Dicyclomine",
    "generic_name": "Dicyclomine",
    "active_ingredient": "Dicyclomine Hydrochloride",
    "composition": "Dicyclomine Hydrochloride 10 mg",
    "category": "Digestive Disorders",
    "strength_form": "10 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IM",
    "description": "Antispasmodic antimuscarinic agent relieving smooth muscle spasm in functional bowel syndrome.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A03AA07), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00169",
        "medicine_id": "med-cat-0071",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Dicyclomine Hydrochloride 10 mg",
        "reference_source": "NLEM 2022 (A03AA07), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00170",
        "medicine_id": "med-cat-0071",
        "strength": "20 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Dicyclomine Hydrochloride 20 mg",
        "reference_source": "NLEM 2022 (A03AA07), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00171",
        "medicine_id": "med-cat-0071",
        "strength": "10 mg/mL",
        "dosage_form": "Injection",
        "route": "Intramuscular",
        "composition": "Dicyclomine Hydrochloride 10 mg per mL (2 mL)",
        "reference_source": "NLEM 2022 (A03AA07), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0072",
    "display_name": "Lactulose",
    "generic_name": "Lactulose",
    "active_ingredient": "Lactulose",
    "composition": "Lactulose 10 g per 15 mL (100 mL / 200 mL bottle)",
    "category": "Digestive Disorders",
    "strength_form": "10 g/15 mL Oral Solution / Syrup",
    "dosage_form": "Oral Solution",
    "route": "Oral",
    "description": "Synthetic disaccharide osmotic laxative reducing blood ammonia in hepatic encephalopathy.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A06AD11), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00172",
        "medicine_id": "med-cat-0072",
        "strength": "10 g/15 mL",
        "dosage_form": "Oral Solution / Syrup",
        "route": "Oral",
        "composition": "Lactulose 10 g per 15 mL (100 mL / 200 mL bottle)",
        "reference_source": "NLEM 2022 (A06AD11), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0073",
    "display_name": "Furosemide",
    "generic_name": "Furosemide",
    "active_ingredient": "Furosemide",
    "composition": "Furosemide 20 mg",
    "category": "Kidney Diseases",
    "strength_form": "20 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "High-ceiling loop diuretic inhibiting Na+/K+/2Cl- symporter in the thick ascending limb of Henle.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C03CA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00173",
        "medicine_id": "med-cat-0073",
        "strength": "20 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Furosemide 20 mg",
        "reference_source": "NLEM 2022 (C03CA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00174",
        "medicine_id": "med-cat-0073",
        "strength": "40 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Furosemide 40 mg",
        "reference_source": "NLEM 2022 (C03CA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00175",
        "medicine_id": "med-cat-0073",
        "strength": "10 mg/mL",
        "dosage_form": "Injection",
        "route": "Intravenous / IM",
        "composition": "Furosemide 10 mg per mL (2 mL / 4 mL)",
        "reference_source": "NLEM 2022 (C03CA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0074",
    "display_name": "Torsemide",
    "generic_name": "Torsemide",
    "active_ingredient": "Torsemide",
    "composition": "Torsemide 10 mg",
    "category": "Kidney Diseases",
    "strength_form": "10 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Pyridine-sulfonylurea loop diuretic with long duration and antialdosterone effect in renal edema.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC C03CA04, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00176",
        "medicine_id": "med-cat-0074",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Torsemide 10 mg",
        "reference_source": "WHO ATC C03CA04, IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00177",
        "medicine_id": "med-cat-0074",
        "strength": "20 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Torsemide 20 mg",
        "reference_source": "WHO ATC C03CA04, IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00178",
        "medicine_id": "med-cat-0074",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Torsemide 100 mg",
        "reference_source": "WHO ATC C03CA04, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0075",
    "display_name": "Sodium Bicarbonate",
    "generic_name": "Sodium Bicarbonate",
    "active_ingredient": "Sodium Bicarbonate",
    "composition": "Sodium Bicarbonate 500 mg",
    "category": "Kidney Diseases",
    "strength_form": "500 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Systemic alkalizing agent for management of chronic metabolic acidosis in chronic kidney disease.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (B05CB04), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00179",
        "medicine_id": "med-cat-0075",
        "strength": "500 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Sodium Bicarbonate 500 mg",
        "reference_source": "NLEM 2022 (B05CB04), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00180",
        "medicine_id": "med-cat-0075",
        "strength": "8.4% w/v",
        "dosage_form": "IV Infusion",
        "route": "Intravenous",
        "composition": "Sodium Bicarbonate 8.4% w/v (1 mmol/mL, 100 mL)",
        "reference_source": "NLEM 2022 (B05CB04), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0076",
    "display_name": "Sevelamer Carbonate",
    "generic_name": "Sevelamer Carbonate",
    "active_ingredient": "Sevelamer Carbonate",
    "composition": "Sevelamer Carbonate 400 mg",
    "category": "Kidney Diseases",
    "strength_form": "400 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Non-absorbed polymeric phosphate binder for hyperphosphatemia in adult CKD patients on dialysis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (V03AE02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00181",
        "medicine_id": "med-cat-0076",
        "strength": "400 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Sevelamer Carbonate 400 mg",
        "reference_source": "NLEM 2022 (V03AE02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00182",
        "medicine_id": "med-cat-0076",
        "strength": "800 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Sevelamer Carbonate 800 mg",
        "reference_source": "NLEM 2022 (V03AE02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0077",
    "display_name": "Calcium Acetate",
    "generic_name": "Calcium Acetate",
    "active_ingredient": "Calcium Acetate",
    "composition": "Calcium Acetate 667 mg (providing 169 mg elemental calcium)",
    "category": "Kidney Diseases",
    "strength_form": "667 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Phosphate binder forming insoluble calcium phosphate precipitate in the gut in end-stage renal disease.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC A12AA12, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00183",
        "medicine_id": "med-cat-0077",
        "strength": "667 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Calcium Acetate 667 mg (providing 169 mg elemental calcium)",
        "reference_source": "WHO ATC A12AA12, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0078",
    "display_name": "Alpha Ketoanalogue",
    "generic_name": "Alpha Ketoanalogue",
    "active_ingredient": "Alpha-Ketoanalogues of Essential Amino Acids",
    "composition": "Calcium salts of keto-isoleucine, keto-leucine, keto-phenylalanine, keto-valine and hydroxy-methionine (600 mg)",
    "category": "Kidney Diseases",
    "strength_form": "600 mg Film-coated Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Essential keto amino acid analogues for prevention of protein malnourishment in progressive CKD.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC V06DE, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00184",
        "medicine_id": "med-cat-0078",
        "strength": "600 mg",
        "dosage_form": "Film-coated Tablet",
        "route": "Oral",
        "composition": "Calcium salts of keto-isoleucine, keto-leucine, keto-phenylalanine, keto-valine and hydroxy-methionine (600 mg)",
        "reference_source": "WHO ATC V06DE, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0079",
    "display_name": "Ursodeoxycholic Acid",
    "generic_name": "Ursodeoxycholic Acid",
    "active_ingredient": "Ursodiol / UDCA",
    "composition": "Ursodeoxycholic Acid 150 mg",
    "category": "Liver Diseases",
    "strength_form": "150 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Naturally occurring hydrophilic bile acid replacing cytotoxic bile acids in cholestatic liver diseases.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A05AA02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00185",
        "medicine_id": "med-cat-0079",
        "strength": "150 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Ursodeoxycholic Acid 150 mg",
        "reference_source": "NLEM 2022 (A05AA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00186",
        "medicine_id": "med-cat-0079",
        "strength": "300 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Ursodeoxycholic Acid 300 mg",
        "reference_source": "NLEM 2022 (A05AA02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0080",
    "display_name": "Silymarin",
    "generic_name": "Silymarin",
    "active_ingredient": "Purified Milk Thistle Extract (Silymarin)",
    "composition": "Silymarin 70 mg",
    "category": "Liver Diseases",
    "strength_form": "70 mg Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Flavonolignan complex with antioxidant and cell membrane stabilizing effects in toxic hepatitis.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC A05BA03, IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00187",
        "medicine_id": "med-cat-0080",
        "strength": "70 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Silymarin 70 mg",
        "reference_source": "WHO ATC A05BA03, IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00188",
        "medicine_id": "med-cat-0080",
        "strength": "140 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Silymarin 140 mg",
        "reference_source": "WHO ATC A05BA03, IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0081",
    "display_name": "L-Ornithine L-Aspartate",
    "generic_name": "L-Ornithine L-Aspartate",
    "active_ingredient": "L-Ornithine L-Aspartate",
    "composition": "L-Ornithine L-Aspartate 5 g per sachet",
    "category": "Liver Diseases",
    "strength_form": "5 g Sachet Granules for Oral Solution",
    "dosage_form": "Sachet",
    "route": "Oral / IV",
    "description": "Amino acid formulation stimulating hepatic urea and glutamine synthesis in hyperammonemia.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC A05BA, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00189",
        "medicine_id": "med-cat-0081",
        "strength": "5 g Sachet",
        "dosage_form": "Granules for Oral Solution",
        "route": "Oral",
        "composition": "L-Ornithine L-Aspartate 5 g per sachet",
        "reference_source": "WHO ATC A05BA, IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00190",
        "medicine_id": "med-cat-0081",
        "strength": "5 g/10 mL",
        "dosage_form": "IV Infusion Ampoule",
        "route": "Intravenous",
        "composition": "L-Ornithine L-Aspartate 5 g per 10 mL ampoule",
        "reference_source": "WHO ATC A05BA, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0082",
    "display_name": "Lactitol Monohydrate",
    "generic_name": "Lactitol Monohydrate",
    "active_ingredient": "Lactitol Monohydrate",
    "composition": "Lactitol Monohydrate 10 g per 15 mL",
    "category": "Liver Diseases",
    "strength_form": "10 g/15 mL Oral Syrup",
    "dosage_form": "Syrup",
    "route": "Oral",
    "description": "Disaccharide analog reducing colonic transit time and trapping ammonia ions in chronic liver failure.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC A06AD12, IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00191",
        "medicine_id": "med-cat-0082",
        "strength": "10 g/15 mL",
        "dosage_form": "Oral Syrup",
        "route": "Oral",
        "composition": "Lactitol Monohydrate 10 g per 15 mL",
        "reference_source": "WHO ATC A06AD12, IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00192",
        "medicine_id": "med-cat-0082",
        "strength": "10 g Sachet",
        "dosage_form": "Powder",
        "route": "Oral",
        "composition": "Lactitol Monohydrate 10 g per sachet",
        "reference_source": "WHO ATC A06AD12, IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0083",
    "display_name": "S-Adenosyl L-Methionine",
    "generic_name": "S-Adenosyl L-Methionine",
    "active_ingredient": "Ademetionine 1,4-Butanedisulfonate",
    "composition": "Ademetionine 200 mg",
    "category": "Liver Diseases",
    "strength_form": "200 mg Gastro-resistant Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Essential physiological methyl donor restoring glutathione synthesis in intrahepatic cholestasis.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC A16AA02, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00193",
        "medicine_id": "med-cat-0083",
        "strength": "200 mg",
        "dosage_form": "Gastro-resistant Tablet",
        "route": "Oral",
        "composition": "Ademetionine 200 mg",
        "reference_source": "WHO ATC A16AA02, IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00194",
        "medicine_id": "med-cat-0083",
        "strength": "400 mg",
        "dosage_form": "Gastro-resistant Tablet",
        "route": "Oral",
        "composition": "Ademetionine 400 mg",
        "reference_source": "WHO ATC A16AA02, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0084",
    "display_name": "Levodopa + Carbidopa",
    "generic_name": "Levodopa + Carbidopa",
    "active_ingredient": "Levodopa and Carbidopa Monohydrate",
    "composition": "Levodopa 100 mg + Carbidopa 10 mg",
    "category": "Neurological Disorders",
    "strength_form": "100 mg + 10 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Dopamine precursor combined with peripheral decarboxylase inhibitor for Parkinson's disease.",
    "combination_ingredients": "Levodopa 100 mg + Carbidopa 10 mg / Levodopa 250 mg + Carbidopa 25 mg",
    "reference_source": "NLEM 2022 (N04BA02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00195",
        "medicine_id": "med-cat-0084",
        "strength": "100 mg + 10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Levodopa 100 mg + Carbidopa 10 mg",
        "reference_source": "NLEM 2022 (N04BA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00196",
        "medicine_id": "med-cat-0084",
        "strength": "250 mg + 25 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Levodopa 250 mg + Carbidopa 25 mg",
        "reference_source": "NLEM 2022 (N04BA02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0085",
    "display_name": "Donepezil",
    "generic_name": "Donepezil",
    "active_ingredient": "Donepezil Hydrochloride",
    "composition": "Donepezil Hydrochloride 5 mg",
    "category": "Neurological Disorders",
    "strength_form": "5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Reversible acetylcholinesterase inhibitor for symptomatic treatment of mild-to-moderate Alzheimer's dementia.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N06DA02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00197",
        "medicine_id": "med-cat-0085",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Donepezil Hydrochloride 5 mg",
        "reference_source": "NLEM 2022 (N06DA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00198",
        "medicine_id": "med-cat-0085",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Donepezil Hydrochloride 10 mg",
        "reference_source": "NLEM 2022 (N06DA02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0086",
    "display_name": "Memantine",
    "generic_name": "Memantine",
    "active_ingredient": "Memantine Hydrochloride",
    "composition": "Memantine Hydrochloride 5 mg",
    "category": "Neurological Disorders",
    "strength_form": "5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Moderate-affinity uncompetitive NMDA receptor antagonist for moderate to severe Alzheimer disease.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N06DX01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00199",
        "medicine_id": "med-cat-0086",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Memantine Hydrochloride 5 mg",
        "reference_source": "NLEM 2022 (N06DX01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00200",
        "medicine_id": "med-cat-0086",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Memantine Hydrochloride 10 mg",
        "reference_source": "NLEM 2022 (N06DX01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0087",
    "display_name": "Trihexyphenidyl",
    "generic_name": "Trihexyphenidyl",
    "active_ingredient": "Trihexyphenidyl Hydrochloride",
    "composition": "Trihexyphenidyl Hydrochloride 2 mg",
    "category": "Neurological Disorders",
    "strength_form": "2 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Centrally acting antimuscarinic agent for drug-induced extrapyramidal symptoms and parkinsonian tremor.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N04AA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00201",
        "medicine_id": "med-cat-0087",
        "strength": "2 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Trihexyphenidyl Hydrochloride 2 mg",
        "reference_source": "NLEM 2022 (N04AA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0088",
    "display_name": "Baclofen",
    "generic_name": "Baclofen",
    "active_ingredient": "Baclofen",
    "composition": "Baclofen 10 mg",
    "category": "Neurological Disorders",
    "strength_form": "10 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "GABA-B receptor agonist muscle relaxant for severe chronic spasticity of spinal cord origin.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (M03BX01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00202",
        "medicine_id": "med-cat-0088",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Baclofen 10 mg",
        "reference_source": "NLEM 2022 (M03BX01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00203",
        "medicine_id": "med-cat-0088",
        "strength": "20 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Baclofen 20 mg",
        "reference_source": "NLEM 2022 (M03BX01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0089",
    "display_name": "Piracetam",
    "generic_name": "Piracetam",
    "active_ingredient": "Piracetam",
    "composition": "Piracetam 400 mg",
    "category": "Neurological Disorders",
    "strength_form": "400 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "GABA derivative nootropic agent used as an adjunct in cortical myoclonus and cognitive impairment.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC N06BX03, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00204",
        "medicine_id": "med-cat-0089",
        "strength": "400 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Piracetam 400 mg",
        "reference_source": "WHO ATC N06BX03, IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00205",
        "medicine_id": "med-cat-0089",
        "strength": "800 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Piracetam 800 mg",
        "reference_source": "WHO ATC N06BX03, IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00206",
        "medicine_id": "med-cat-0089",
        "strength": "200 mg/mL",
        "dosage_form": "Injection",
        "route": "Intravenous",
        "composition": "Piracetam 200 mg per mL (15 mL / 60 mL)",
        "reference_source": "WHO ATC N06BX03, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0090",
    "display_name": "Sodium Valproate",
    "generic_name": "Sodium Valproate",
    "active_ingredient": "Sodium Valproate / Valproic Acid",
    "composition": "Sodium Valproate 200 mg",
    "category": "Epilepsy and Seizures",
    "strength_form": "200 mg Gastro-resistant Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Broad-spectrum antiepileptic drug for generalized tonic-clonic, absence, and myoclonic seizures.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N03AG01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00207",
        "medicine_id": "med-cat-0090",
        "strength": "200 mg",
        "dosage_form": "Gastro-resistant Tablet",
        "route": "Oral",
        "composition": "Sodium Valproate 200 mg",
        "reference_source": "NLEM 2022 (N03AG01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00208",
        "medicine_id": "med-cat-0090",
        "strength": "300 mg",
        "dosage_form": "Controlled Release Tablet",
        "route": "Oral",
        "composition": "Sodium Valproate 300 mg CR",
        "reference_source": "NLEM 2022 (N03AG01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00209",
        "medicine_id": "med-cat-0090",
        "strength": "500 mg",
        "dosage_form": "Controlled Release Tablet",
        "route": "Oral",
        "composition": "Sodium Valproate 500 mg CR",
        "reference_source": "NLEM 2022 (N03AG01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00210",
        "medicine_id": "med-cat-0090",
        "strength": "200 mg/5 mL",
        "dosage_form": "Oral Syrup",
        "route": "Oral",
        "composition": "Sodium Valproate 200 mg per 5 mL",
        "reference_source": "NLEM 2022 (N03AG01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0091",
    "display_name": "Levetiracetam",
    "generic_name": "Levetiracetam",
    "active_ingredient": "Levetiracetam",
    "composition": "Levetiracetam 250 mg",
    "category": "Epilepsy and Seizures",
    "strength_form": "250 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Synaptic vesicle protein SV2A ligand for monotherapy and adjunctive therapy in partial onset seizures.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N03AX14), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00211",
        "medicine_id": "med-cat-0091",
        "strength": "250 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Levetiracetam 250 mg",
        "reference_source": "NLEM 2022 (N03AX14), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00212",
        "medicine_id": "med-cat-0091",
        "strength": "500 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Levetiracetam 500 mg",
        "reference_source": "NLEM 2022 (N03AX14), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00213",
        "medicine_id": "med-cat-0091",
        "strength": "750 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Levetiracetam 750 mg",
        "reference_source": "NLEM 2022 (N03AX14), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00214",
        "medicine_id": "med-cat-0091",
        "strength": "1000 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Levetiracetam 1000 mg",
        "reference_source": "NLEM 2022 (N03AX14), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00215",
        "medicine_id": "med-cat-0091",
        "strength": "100 mg/mL",
        "dosage_form": "Oral Solution",
        "route": "Oral",
        "composition": "Levetiracetam 100 mg per mL (100 mL)",
        "reference_source": "NLEM 2022 (N03AX14), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0092",
    "display_name": "Carbamazepine",
    "generic_name": "Carbamazepine",
    "active_ingredient": "Carbamazepine",
    "composition": "Carbamazepine 100 mg",
    "category": "Epilepsy and Seizures",
    "strength_form": "100 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Voltage-gated sodium channel blocker for focal seizures and first-line treatment for trigeminal neuralgia.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N03AF01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00216",
        "medicine_id": "med-cat-0092",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Carbamazepine 100 mg",
        "reference_source": "NLEM 2022 (N03AF01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00217",
        "medicine_id": "med-cat-0092",
        "strength": "200 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Carbamazepine 200 mg",
        "reference_source": "NLEM 2022 (N03AF01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00218",
        "medicine_id": "med-cat-0092",
        "strength": "400 mg CR",
        "dosage_form": "Controlled Release Tablet",
        "route": "Oral",
        "composition": "Carbamazepine 400 mg Controlled Release",
        "reference_source": "NLEM 2022 (N03AF01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0093",
    "display_name": "Phenytoin Sodium",
    "generic_name": "Phenytoin Sodium",
    "active_ingredient": "Phenytoin Sodium",
    "composition": "Phenytoin Sodium 50 mg",
    "category": "Epilepsy and Seizures",
    "strength_form": "50 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Hydantoin derivative stabilizing neuronal membranes against repetitive firing in status epilepticus.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N03AB02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00219",
        "medicine_id": "med-cat-0093",
        "strength": "50 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Phenytoin Sodium 50 mg",
        "reference_source": "NLEM 2022 (N03AB02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00220",
        "medicine_id": "med-cat-0093",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Phenytoin Sodium 100 mg",
        "reference_source": "NLEM 2022 (N03AB02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00221",
        "medicine_id": "med-cat-0093",
        "strength": "50 mg/mL",
        "dosage_form": "Injection",
        "route": "Intravenous",
        "composition": "Phenytoin Sodium 50 mg per mL (2 mL / 5 mL)",
        "reference_source": "NLEM 2022 (N03AB02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0094",
    "display_name": "Clobazam",
    "generic_name": "Clobazam",
    "active_ingredient": "Clobazam",
    "composition": "Clobazam 5 mg",
    "category": "Epilepsy and Seizures",
    "strength_form": "5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "1,5-benzodiazepine positive allosteric modulator of GABA-A receptors for refractory epilepsy.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N05BA09), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00222",
        "medicine_id": "med-cat-0094",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Clobazam 5 mg",
        "reference_source": "NLEM 2022 (N05BA09), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00223",
        "medicine_id": "med-cat-0094",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Clobazam 10 mg",
        "reference_source": "NLEM 2022 (N05BA09), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0095",
    "display_name": "Lamotrigine",
    "generic_name": "Lamotrigine",
    "active_ingredient": "Lamotrigine",
    "composition": "Lamotrigine 25 mg",
    "category": "Epilepsy and Seizures",
    "strength_form": "25 mg Dispersible Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Phenyltriazine sodium channel blocker for partial seizures and Lennox-Gastaut syndrome.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N03AX09), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00224",
        "medicine_id": "med-cat-0095",
        "strength": "25 mg",
        "dosage_form": "Dispersible Tablet",
        "route": "Oral",
        "composition": "Lamotrigine 25 mg",
        "reference_source": "NLEM 2022 (N03AX09), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00225",
        "medicine_id": "med-cat-0095",
        "strength": "50 mg",
        "dosage_form": "Dispersible Tablet",
        "route": "Oral",
        "composition": "Lamotrigine 50 mg",
        "reference_source": "NLEM 2022 (N03AX09), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00226",
        "medicine_id": "med-cat-0095",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Lamotrigine 100 mg",
        "reference_source": "NLEM 2022 (N03AX09), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0096",
    "display_name": "Olanzapine",
    "generic_name": "Olanzapine",
    "active_ingredient": "Olanzapine",
    "composition": "Olanzapine 2.5 mg",
    "category": "Mental Health",
    "strength_form": "2.5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IM",
    "description": "Second-generation atypical antipsychotic antagonist of 5-HT2A and D2 receptors for schizophrenia.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N05AH03), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00227",
        "medicine_id": "med-cat-0096",
        "strength": "2.5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Olanzapine 2.5 mg",
        "reference_source": "NLEM 2022 (N05AH03), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00228",
        "medicine_id": "med-cat-0096",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Olanzapine 5 mg",
        "reference_source": "NLEM 2022 (N05AH03), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00229",
        "medicine_id": "med-cat-0096",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Olanzapine 10 mg",
        "reference_source": "NLEM 2022 (N05AH03), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0097",
    "display_name": "Risperidone",
    "generic_name": "Risperidone",
    "active_ingredient": "Risperidone",
    "composition": "Risperidone 1 mg",
    "category": "Mental Health",
    "strength_form": "1 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Benzisoxazole atypical antipsychotic for acute and maintenance therapy of schizophrenia and bipolar mania.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N05AX08), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00230",
        "medicine_id": "med-cat-0097",
        "strength": "1 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Risperidone 1 mg",
        "reference_source": "NLEM 2022 (N05AX08), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00231",
        "medicine_id": "med-cat-0097",
        "strength": "2 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Risperidone 2 mg",
        "reference_source": "NLEM 2022 (N05AX08), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00232",
        "medicine_id": "med-cat-0097",
        "strength": "4 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Risperidone 4 mg",
        "reference_source": "NLEM 2022 (N05AX08), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00233",
        "medicine_id": "med-cat-0097",
        "strength": "1 mg/mL",
        "dosage_form": "Oral Solution",
        "route": "Oral",
        "composition": "Risperidone 1 mg per mL (30 mL)",
        "reference_source": "NLEM 2022 (N05AX08), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0098",
    "display_name": "Haloperidol",
    "generic_name": "Haloperidol",
    "active_ingredient": "Haloperidol",
    "composition": "Haloperidol 1.5 mg",
    "category": "Mental Health",
    "strength_form": "1.5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IM",
    "description": "First-generation high-potency butyrophenone dopamine D2 antagonist for acute psychotic agitation.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N05AD01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00234",
        "medicine_id": "med-cat-0098",
        "strength": "1.5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Haloperidol 1.5 mg",
        "reference_source": "NLEM 2022 (N05AD01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00235",
        "medicine_id": "med-cat-0098",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Haloperidol 5 mg",
        "reference_source": "NLEM 2022 (N05AD01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00236",
        "medicine_id": "med-cat-0098",
        "strength": "5 mg/mL",
        "dosage_form": "Injection",
        "route": "Intramuscular",
        "composition": "Haloperidol 5 mg per mL",
        "reference_source": "NLEM 2022 (N05AD01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0099",
    "display_name": "Quetiapine",
    "generic_name": "Quetiapine",
    "active_ingredient": "Quetiapine Fumarate",
    "composition": "Quetiapine Fumarate equivalent to Quetiapine 25 mg",
    "category": "Mental Health",
    "strength_form": "25 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Atypical dibenzothiazepine antipsychotic for bipolar depression and schizophrenia.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N05AH04), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00237",
        "medicine_id": "med-cat-0099",
        "strength": "25 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Quetiapine Fumarate equivalent to Quetiapine 25 mg",
        "reference_source": "NLEM 2022 (N05AH04), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00238",
        "medicine_id": "med-cat-0099",
        "strength": "50 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Quetiapine Fumarate equivalent to Quetiapine 50 mg",
        "reference_source": "NLEM 2022 (N05AH04), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00239",
        "medicine_id": "med-cat-0099",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Quetiapine Fumarate equivalent to Quetiapine 100 mg",
        "reference_source": "NLEM 2022 (N05AH04), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00240",
        "medicine_id": "med-cat-0099",
        "strength": "200 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Quetiapine Fumarate equivalent to Quetiapine 200 mg",
        "reference_source": "NLEM 2022 (N05AH04), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0100",
    "display_name": "Aripiprazole",
    "generic_name": "Aripiprazole",
    "active_ingredient": "Aripiprazole",
    "composition": "Aripiprazole 5 mg",
    "category": "Mental Health",
    "strength_form": "5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Partial agonist at dopamine D2 and serotonin 5-HT1A receptors for schizophrenia and major depressive episodes.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC N05AX12, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00241",
        "medicine_id": "med-cat-0100",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Aripiprazole 5 mg",
        "reference_source": "WHO ATC N05AX12, IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00242",
        "medicine_id": "med-cat-0100",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Aripiprazole 10 mg",
        "reference_source": "WHO ATC N05AX12, IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00243",
        "medicine_id": "med-cat-0100",
        "strength": "15 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Aripiprazole 15 mg",
        "reference_source": "WHO ATC N05AX12, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0101",
    "display_name": "Lithium Carbonate",
    "generic_name": "Lithium Carbonate",
    "active_ingredient": "Lithium Carbonate",
    "composition": "Lithium Carbonate 300 mg",
    "category": "Mental Health",
    "strength_form": "300 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Inorganic salt mood stabilizer for acute mania and maintenance in bipolar affective disorder.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N05AN01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00244",
        "medicine_id": "med-cat-0101",
        "strength": "300 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Lithium Carbonate 300 mg",
        "reference_source": "NLEM 2022 (N05AN01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00245",
        "medicine_id": "med-cat-0101",
        "strength": "400 mg SR",
        "dosage_form": "Sustained Release Tablet",
        "route": "Oral",
        "composition": "Lithium Carbonate 400 mg Sustained Release",
        "reference_source": "NLEM 2022 (N05AN01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0102",
    "display_name": "Escitalopram",
    "generic_name": "Escitalopram",
    "active_ingredient": "Escitalopram Oxalate",
    "composition": "Escitalopram Oxalate equivalent to Escitalopram 5 mg",
    "category": "Anxiety and Depression",
    "strength_form": "5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Pure S-enantiomer selective serotonin reuptake inhibitor (SSRI) for major depressive disorder and generalized anxiety.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N06AB10), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00246",
        "medicine_id": "med-cat-0102",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Escitalopram Oxalate equivalent to Escitalopram 5 mg",
        "reference_source": "NLEM 2022 (N06AB10), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00247",
        "medicine_id": "med-cat-0102",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Escitalopram Oxalate equivalent to Escitalopram 10 mg",
        "reference_source": "NLEM 2022 (N06AB10), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00248",
        "medicine_id": "med-cat-0102",
        "strength": "20 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Escitalopram Oxalate equivalent to Escitalopram 20 mg",
        "reference_source": "NLEM 2022 (N06AB10), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0103",
    "display_name": "Sertraline",
    "generic_name": "Sertraline",
    "active_ingredient": "Sertraline Hydrochloride",
    "composition": "Sertraline Hydrochloride equivalent to Sertraline 25 mg",
    "category": "Anxiety and Depression",
    "strength_form": "25 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "SSRI antidepressant for panic disorder, obsessive-compulsive disorder, and post-traumatic stress.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N06AB06), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00249",
        "medicine_id": "med-cat-0103",
        "strength": "25 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Sertraline Hydrochloride equivalent to Sertraline 25 mg",
        "reference_source": "NLEM 2022 (N06AB06), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00250",
        "medicine_id": "med-cat-0103",
        "strength": "50 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Sertraline Hydrochloride equivalent to Sertraline 50 mg",
        "reference_source": "NLEM 2022 (N06AB06), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00251",
        "medicine_id": "med-cat-0103",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Sertraline Hydrochloride equivalent to Sertraline 100 mg",
        "reference_source": "NLEM 2022 (N06AB06), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0104",
    "display_name": "Fluoxetine",
    "generic_name": "Fluoxetine",
    "active_ingredient": "Fluoxetine Hydrochloride",
    "composition": "Fluoxetine Hydrochloride equivalent to Fluoxetine 20 mg",
    "category": "Anxiety and Depression",
    "strength_form": "20 mg Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Long half-life SSRI for major depressive disorder, bulimia nervosa, and panic disorders.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N06AB03), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00252",
        "medicine_id": "med-cat-0104",
        "strength": "20 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Fluoxetine Hydrochloride equivalent to Fluoxetine 20 mg",
        "reference_source": "NLEM 2022 (N06AB03), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0105",
    "display_name": "Clonazepam",
    "generic_name": "Clonazepam",
    "active_ingredient": "Clonazepam",
    "composition": "Clonazepam 0.25 mg",
    "category": "Anxiety and Depression",
    "strength_form": "0.25 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "High-potency benzodiazepine enhancing GABAergic neurotransmission for severe panic disorder.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N03AE01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00253",
        "medicine_id": "med-cat-0105",
        "strength": "0.25 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Clonazepam 0.25 mg",
        "reference_source": "NLEM 2022 (N03AE01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00254",
        "medicine_id": "med-cat-0105",
        "strength": "0.5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Clonazepam 0.5 mg",
        "reference_source": "NLEM 2022 (N03AE01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00255",
        "medicine_id": "med-cat-0105",
        "strength": "1 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Clonazepam 1 mg",
        "reference_source": "NLEM 2022 (N03AE01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00256",
        "medicine_id": "med-cat-0105",
        "strength": "2 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Clonazepam 2 mg",
        "reference_source": "NLEM 2022 (N03AE01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0106",
    "display_name": "Alprazolam",
    "generic_name": "Alprazolam",
    "active_ingredient": "Alprazolam",
    "composition": "Alprazolam 0.25 mg",
    "category": "Anxiety and Depression",
    "strength_form": "0.25 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Triazolobenzodiazepine for short-term symptomatic relief of acute situational anxiety and panic attacks.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N05BA12), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00257",
        "medicine_id": "med-cat-0106",
        "strength": "0.25 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Alprazolam 0.25 mg",
        "reference_source": "NLEM 2022 (N05BA12), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00258",
        "medicine_id": "med-cat-0106",
        "strength": "0.5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Alprazolam 0.5 mg",
        "reference_source": "NLEM 2022 (N05BA12), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0107",
    "display_name": "Amitriptyline",
    "generic_name": "Amitriptyline",
    "active_ingredient": "Amitriptyline Hydrochloride",
    "composition": "Amitriptyline Hydrochloride 10 mg",
    "category": "Anxiety and Depression",
    "strength_form": "10 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Tricyclic antidepressant inhibiting norepinephrine and serotonin reuptake, used in neuropathic pain and depression.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N06AA09), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00259",
        "medicine_id": "med-cat-0107",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Amitriptyline Hydrochloride 10 mg",
        "reference_source": "NLEM 2022 (N06AA09), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00260",
        "medicine_id": "med-cat-0107",
        "strength": "25 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Amitriptyline Hydrochloride 25 mg",
        "reference_source": "NLEM 2022 (N06AA09), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00261",
        "medicine_id": "med-cat-0107",
        "strength": "50 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Amitriptyline Hydrochloride 50 mg",
        "reference_source": "NLEM 2022 (N06AA09), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0108",
    "display_name": "Glucosamine Sulfate",
    "generic_name": "Glucosamine Sulfate",
    "active_ingredient": "Glucosamine Sulfate Potassium Chloride",
    "composition": "Glucosamine Sulfate 500 mg",
    "category": "Bone and Joint Diseases",
    "strength_form": "500 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Amino monosaccharide serving as biochemical precursor for glycosaminoglycans in articular cartilage.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC M01AX05, IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00262",
        "medicine_id": "med-cat-0108",
        "strength": "500 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Glucosamine Sulfate 500 mg",
        "reference_source": "WHO ATC M01AX05, IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00263",
        "medicine_id": "med-cat-0108",
        "strength": "750 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Glucosamine Sulfate 750 mg",
        "reference_source": "WHO ATC M01AX05, IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0109",
    "display_name": "Chondroitin Sulfate",
    "generic_name": "Chondroitin Sulfate",
    "active_ingredient": "Chondroitin Sulfate Sodium",
    "composition": "Chondroitin Sulfate Sodium 400 mg",
    "category": "Bone and Joint Diseases",
    "strength_form": "400 mg Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Sulfated glycosaminoglycan providing structural resistance against compressive forces in cartilage.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC M01AX25, IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00264",
        "medicine_id": "med-cat-0109",
        "strength": "400 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Chondroitin Sulfate Sodium 400 mg",
        "reference_source": "WHO ATC M01AX25, IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0110",
    "display_name": "Diacerein",
    "generic_name": "Diacerein",
    "active_ingredient": "Diacerein",
    "composition": "Diacerein 50 mg",
    "category": "Bone and Joint Diseases",
    "strength_form": "50 mg Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Anthraquinone derivative inhibiting interleukin-1 beta in symptomatic slow-acting osteoarthritis.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC M01AX21, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00265",
        "medicine_id": "med-cat-0110",
        "strength": "50 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Diacerein 50 mg",
        "reference_source": "WHO ATC M01AX21, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0111",
    "display_name": "Hyaluronic Acid",
    "generic_name": "Hyaluronic Acid",
    "active_ingredient": "Sodium Hyaluronate",
    "composition": "Sodium Hyaluronate 10 mg/mL (2 mL prefilled syringe)",
    "category": "Bone and Joint Diseases",
    "strength_form": "20 mg/2 mL Pre-filled Syringe Injection",
    "dosage_form": "Injection",
    "route": "Intra-articular",
    "description": "Viscoelastic polysaccharide replenishing synovial fluid elastoviscosity in knee osteoarthritis.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC M09AX01, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00266",
        "medicine_id": "med-cat-0111",
        "strength": "20 mg/2 mL",
        "dosage_form": "Pre-filled Syringe Injection",
        "route": "Intra-articular",
        "composition": "Sodium Hyaluronate 10 mg/mL (2 mL prefilled syringe)",
        "reference_source": "WHO ATC M09AX01, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0112",
    "display_name": "Collagen Peptide",
    "generic_name": "Collagen Peptide",
    "active_ingredient": "Hydrolyzed Collagen Peptide Type II",
    "composition": "Hydrolyzed Collagen Peptides 10 g with Glucosamine 1500 mg",
    "category": "Bone and Joint Diseases",
    "strength_form": "10 g Sachet Powder for Oral Suspension",
    "dosage_form": "Sachet",
    "route": "Oral",
    "description": "Bioactive collagen peptide complex stimulating chondrocyte extracellular matrix synthesis.",
    "combination_ingredients": null,
    "reference_source": "Nutraceutical Standard, FSSAI",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00267",
        "medicine_id": "med-cat-0112",
        "strength": "10 g Sachet",
        "dosage_form": "Powder for Oral Suspension",
        "route": "Oral",
        "composition": "Hydrolyzed Collagen Peptides 10 g with Glucosamine 1500 mg",
        "reference_source": "Nutraceutical Standard, FSSAI",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0113",
    "display_name": "Rosehip Extract",
    "generic_name": "Rosehip Extract",
    "active_ingredient": "Standardized Rosehip Extract (Rosa canina)",
    "composition": "Standardized Rosehip Extract 275 mg",
    "category": "Bone and Joint Diseases",
    "strength_form": "275 mg Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Galactolipid containing herbal formulation reducing joint stiffness and inflammation.",
    "combination_ingredients": null,
    "reference_source": "Herbal Pharmacopoeia",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00268",
        "medicine_id": "med-cat-0113",
        "strength": "275 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Standardized Rosehip Extract 275 mg",
        "reference_source": "Herbal Pharmacopoeia",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0114",
    "display_name": "Methotrexate",
    "generic_name": "Methotrexate",
    "active_ingredient": "Methotrexate Sodium",
    "composition": "Methotrexate Sodium 2.5 mg",
    "category": "Arthritis and Rheumatology",
    "strength_form": "2.5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / Parenteral",
    "description": "Anchor disease-modifying antirheumatic drug (DMARD) for active rheumatoid arthritis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (L01BA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00269",
        "medicine_id": "med-cat-0114",
        "strength": "2.5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Methotrexate Sodium 2.5 mg",
        "reference_source": "NLEM 2022 (L01BA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00270",
        "medicine_id": "med-cat-0114",
        "strength": "7.5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Methotrexate Sodium 7.5 mg",
        "reference_source": "NLEM 2022 (L01BA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00271",
        "medicine_id": "med-cat-0114",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Methotrexate Sodium 10 mg",
        "reference_source": "NLEM 2022 (L01BA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00272",
        "medicine_id": "med-cat-0114",
        "strength": "50 mg/2 mL",
        "dosage_form": "Injection",
        "route": "IM / SC",
        "composition": "Methotrexate Sodium 25 mg per mL",
        "reference_source": "NLEM 2022 (L01BA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0115",
    "display_name": "Hydroxychloroquine",
    "generic_name": "Hydroxychloroquine",
    "active_ingredient": "Hydroxychloroquine Sulfate",
    "composition": "Hydroxychloroquine Sulfate 200 mg",
    "category": "Arthritis and Rheumatology",
    "strength_form": "200 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Antimalarial and immunomodulatory agent for systemic lupus erythematosus and rheumatoid arthritis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (P01BA02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00273",
        "medicine_id": "med-cat-0115",
        "strength": "200 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Hydroxychloroquine Sulfate 200 mg",
        "reference_source": "NLEM 2022 (P01BA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00274",
        "medicine_id": "med-cat-0115",
        "strength": "400 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Hydroxychloroquine Sulfate 400 mg",
        "reference_source": "NLEM 2022 (P01BA02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0116",
    "display_name": "Sulfasalazine",
    "generic_name": "Sulfasalazine",
    "active_ingredient": "Sulfasalazine",
    "composition": "Sulfasalazine 500 mg",
    "category": "Arthritis and Rheumatology",
    "strength_form": "500 mg Gastro-resistant Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Cleaved in colon into 5-aminosalicylic acid and sulfapyridine for peripheral spondyloarthropathies.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A07EC01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00275",
        "medicine_id": "med-cat-0116",
        "strength": "500 mg",
        "dosage_form": "Gastro-resistant Tablet",
        "route": "Oral",
        "composition": "Sulfasalazine 500 mg",
        "reference_source": "NLEM 2022 (A07EC01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0117",
    "display_name": "Leflunomide",
    "generic_name": "Leflunomide",
    "active_ingredient": "Leflunomide",
    "composition": "Leflunomide 10 mg",
    "category": "Arthritis and Rheumatology",
    "strength_form": "10 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Pyrimidine synthesis inhibitor (dihydroorotate dehydrogenase) reducing autoimmune lymphocyte proliferation.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (L04AA13), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00276",
        "medicine_id": "med-cat-0117",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Leflunomide 10 mg",
        "reference_source": "NLEM 2022 (L04AA13), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00277",
        "medicine_id": "med-cat-0117",
        "strength": "20 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Leflunomide 20 mg",
        "reference_source": "NLEM 2022 (L04AA13), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0118",
    "display_name": "Colchicine",
    "generic_name": "Colchicine",
    "active_ingredient": "Colchicine",
    "composition": "Colchicine 0.5 mg",
    "category": "Arthritis and Rheumatology",
    "strength_form": "0.5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Alkaloid binding tubulin to block neutrophil migration and crystal phagocytosis in acute gout.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (M04AC01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00278",
        "medicine_id": "med-cat-0118",
        "strength": "0.5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Colchicine 0.5 mg",
        "reference_source": "NLEM 2022 (M04AC01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0119",
    "display_name": "Febuxostat",
    "generic_name": "Febuxostat",
    "active_ingredient": "Febuxostat",
    "composition": "Febuxostat 40 mg",
    "category": "Arthritis and Rheumatology",
    "strength_form": "40 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Potent non-purine selective xanthine oxidase inhibitor reducing hyperuricemia in chronic gout.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (M04AA03), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00279",
        "medicine_id": "med-cat-0119",
        "strength": "40 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Febuxostat 40 mg",
        "reference_source": "NLEM 2022 (M04AA03), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00280",
        "medicine_id": "med-cat-0119",
        "strength": "80 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Febuxostat 80 mg",
        "reference_source": "NLEM 2022 (M04AA03), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0120",
    "display_name": "Allopurinol",
    "generic_name": "Allopurinol",
    "active_ingredient": "Allopurinol",
    "composition": "Allopurinol 100 mg",
    "category": "Arthritis and Rheumatology",
    "strength_form": "100 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Purine analog xanthine oxidase inhibitor for primary and secondary chronic hyperuricemia.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (M04AA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00281",
        "medicine_id": "med-cat-0120",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Allopurinol 100 mg",
        "reference_source": "NLEM 2022 (M04AA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00282",
        "medicine_id": "med-cat-0120",
        "strength": "300 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Allopurinol 300 mg",
        "reference_source": "NLEM 2022 (M04AA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0121",
    "display_name": "Betamethasone Dipropionate",
    "generic_name": "Betamethasone Dipropionate",
    "active_ingredient": "Betamethasone Dipropionate",
    "composition": "Betamethasone Dipropionate 0.05% w/w (20 g)",
    "category": "Skin Diseases",
    "strength_form": "0.05% w/w Cream",
    "dosage_form": "Cream",
    "route": "Topical",
    "description": "Potent topical corticosteroid for relief of inflammatory and pruritic manifestations of corticosteroid-responsive dermatoses.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (D07AC01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00283",
        "medicine_id": "med-cat-0121",
        "strength": "0.05% w/w",
        "dosage_form": "Cream",
        "route": "Topical",
        "composition": "Betamethasone Dipropionate 0.05% w/w (20 g)",
        "reference_source": "NLEM 2022 (D07AC01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00284",
        "medicine_id": "med-cat-0121",
        "strength": "0.05% w/w",
        "dosage_form": "Ointment",
        "route": "Topical",
        "composition": "Betamethasone Dipropionate 0.05% w/w (20 g)",
        "reference_source": "NLEM 2022 (D07AC01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0122",
    "display_name": "Clobetasol Propionate",
    "generic_name": "Clobetasol Propionate",
    "active_ingredient": "Clobetasol Propionate",
    "composition": "Clobetasol Propionate 0.05% w/w (15 g)",
    "category": "Skin Diseases",
    "strength_form": "0.05% w/w Cream",
    "dosage_form": "Cream",
    "route": "Topical",
    "description": "Super-high potency topical corticosteroid for recalcitrant dermatoses and severe plaque psoriasis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (D07AD01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00285",
        "medicine_id": "med-cat-0122",
        "strength": "0.05% w/w",
        "dosage_form": "Cream",
        "route": "Topical",
        "composition": "Clobetasol Propionate 0.05% w/w (15 g)",
        "reference_source": "NLEM 2022 (D07AD01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00286",
        "medicine_id": "med-cat-0122",
        "strength": "0.05% w/w",
        "dosage_form": "Ointment",
        "route": "Topical",
        "composition": "Clobetasol Propionate 0.05% w/w (15 g)",
        "reference_source": "NLEM 2022 (D07AD01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0123",
    "display_name": "Mupirocin",
    "generic_name": "Mupirocin",
    "active_ingredient": "Mupirocin",
    "composition": "Mupirocin 2% w/w in water-soluble base (5 g / 15 g)",
    "category": "Skin Diseases",
    "strength_form": "2% w/w Ointment",
    "dosage_form": "Ointment",
    "route": "Topical",
    "description": "RNA synthetase inhibitor topical antibiotic for primary impetigo and folliculitis due to MRSA and S. aureus.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (D06AX09), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00287",
        "medicine_id": "med-cat-0123",
        "strength": "2% w/w",
        "dosage_form": "Ointment",
        "route": "Topical",
        "composition": "Mupirocin 2% w/w in water-soluble base (5 g / 15 g)",
        "reference_source": "NLEM 2022 (D06AX09), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0124",
    "display_name": "Fusidic Acid",
    "generic_name": "Fusidic Acid",
    "active_ingredient": "Fusidic Acid",
    "composition": "Fusidic Acid 2% w/w (10 g / 15 g)",
    "category": "Skin Diseases",
    "strength_form": "2% w/w Cream",
    "dosage_form": "Cream",
    "route": "Topical",
    "description": "Bactericidal topical steroid antibiotic inhibiting bacterial protein synthesis for staphylococcal pyoderma.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (D06AX01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00288",
        "medicine_id": "med-cat-0124",
        "strength": "2% w/w",
        "dosage_form": "Cream",
        "route": "Topical",
        "composition": "Fusidic Acid 2% w/w (10 g / 15 g)",
        "reference_source": "NLEM 2022 (D06AX01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0125",
    "display_name": "Calamine Lotion",
    "generic_name": "Calamine Lotion",
    "active_ingredient": "Calamine and Zinc Oxide",
    "composition": "Calamine 15% w/v with Zinc Oxide 5% w/v (100 mL bottle)",
    "category": "Skin Diseases",
    "strength_form": "15% + 5% w/v Topical Lotion",
    "dosage_form": "Lotion",
    "route": "Topical",
    "description": "Topical antipruritic and mild astringent soothing sunburn, eczema, and contact dermatitis.",
    "combination_ingredients": "Calamine 15% + Zinc Oxide 5%",
    "reference_source": "NLEM 2022 (D02AB), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00289",
        "medicine_id": "med-cat-0125",
        "strength": "15% + 5% w/v",
        "dosage_form": "Topical Lotion",
        "route": "Topical",
        "composition": "Calamine 15% w/v with Zinc Oxide 5% w/v (100 mL bottle)",
        "reference_source": "NLEM 2022 (D02AB), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0126",
    "display_name": "Permethrin",
    "generic_name": "Permethrin",
    "active_ingredient": "Permethrin",
    "composition": "Permethrin 5% w/w (30 g / 60 g tube)",
    "category": "Skin Diseases",
    "strength_form": "5% w/w Topical Cream",
    "dosage_form": "Cream",
    "route": "Topical",
    "description": "Synthetic pyrethroid neurotoxic to Sarcoptes scabiei mites for treatment of scabies and pediculosis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (P03AC04), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00290",
        "medicine_id": "med-cat-0126",
        "strength": "5% w/w",
        "dosage_form": "Topical Cream",
        "route": "Topical",
        "composition": "Permethrin 5% w/w (30 g / 60 g tube)",
        "reference_source": "NLEM 2022 (P03AC04), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00291",
        "medicine_id": "med-cat-0126",
        "strength": "5% w/v",
        "dosage_form": "Topical Lotion",
        "route": "Topical",
        "composition": "Permethrin 5% w/v (50 mL / 100 mL bottle)",
        "reference_source": "NLEM 2022 (P03AC04), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0127",
    "display_name": "Silver Sulfadiazine",
    "generic_name": "Silver Sulfadiazine",
    "active_ingredient": "Silver Sulfadiazine",
    "composition": "Silver Sulfadiazine 1% w/w (50 g / 250 g jar)",
    "category": "Skin Diseases",
    "strength_form": "1% w/w Cream",
    "dosage_form": "Cream",
    "route": "Topical",
    "description": "Broad-spectrum topical antimicrobial for prophylaxis and treatment of burn wound sepsis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (D06BA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00292",
        "medicine_id": "med-cat-0127",
        "strength": "1% w/w",
        "dosage_form": "Cream",
        "route": "Topical",
        "composition": "Silver Sulfadiazine 1% w/w (50 g / 250 g jar)",
        "reference_source": "NLEM 2022 (D06BA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0128",
    "display_name": "Carboxymethylcellulose",
    "generic_name": "Carboxymethylcellulose",
    "active_ingredient": "Sodium Carboxymethylcellulose",
    "composition": "Sodium Carboxymethylcellulose 0.5% w/v (10 mL)",
    "category": "Eye Diseases",
    "strength_form": "0.5% w/v Eye Drops Solution",
    "dosage_form": "Eye Drops",
    "route": "Ophthalmic",
    "description": "Mucomimetic ophthalmic lubricant providing tear film stabilization in dry eye syndrome.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (S01XA20), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00293",
        "medicine_id": "med-cat-0128",
        "strength": "0.5% w/v",
        "dosage_form": "Eye Drops Solution",
        "route": "Ophthalmic",
        "composition": "Sodium Carboxymethylcellulose 0.5% w/v (10 mL)",
        "reference_source": "NLEM 2022 (S01XA20), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00294",
        "medicine_id": "med-cat-0128",
        "strength": "1% w/v",
        "dosage_form": "Eye Drops Solution",
        "route": "Ophthalmic",
        "composition": "Sodium Carboxymethylcellulose 1.0% w/v (10 mL)",
        "reference_source": "NLEM 2022 (S01XA20), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0129",
    "display_name": "Moxifloxacin Eye Drops",
    "generic_name": "Moxifloxacin Eye Drops",
    "active_ingredient": "Moxifloxacin Hydrochloride",
    "composition": "Moxifloxacin Hydrochloride equivalent to Moxifloxacin 0.5% w/v (5 mL)",
    "category": "Eye Diseases",
    "strength_form": "0.5% w/v Eye Drops",
    "dosage_form": "Eye Drops",
    "route": "Ophthalmic",
    "description": "Fourth-generation fluoroquinolone ophthalmic solution for bacterial conjunctivitis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (S01AE07), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00295",
        "medicine_id": "med-cat-0129",
        "strength": "0.5% w/v",
        "dosage_form": "Eye Drops",
        "route": "Ophthalmic",
        "composition": "Moxifloxacin Hydrochloride equivalent to Moxifloxacin 0.5% w/v (5 mL)",
        "reference_source": "NLEM 2022 (S01AE07), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0130",
    "display_name": "Timolol Maleate",
    "generic_name": "Timolol Maleate",
    "active_ingredient": "Timolol Maleate",
    "composition": "Timolol Maleate equivalent to Timolol 0.25% w/v (5 mL)",
    "category": "Eye Diseases",
    "strength_form": "0.25% w/v Eye Drops",
    "dosage_form": "Eye Drops",
    "route": "Ophthalmic",
    "description": "Nonselective beta-adrenergic blocker reducing aqueous humor secretion in open-angle glaucoma.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (S01ED01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00296",
        "medicine_id": "med-cat-0130",
        "strength": "0.25% w/v",
        "dosage_form": "Eye Drops",
        "route": "Ophthalmic",
        "composition": "Timolol Maleate equivalent to Timolol 0.25% w/v (5 mL)",
        "reference_source": "NLEM 2022 (S01ED01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00297",
        "medicine_id": "med-cat-0130",
        "strength": "0.5% w/v",
        "dosage_form": "Eye Drops",
        "route": "Ophthalmic",
        "composition": "Timolol Maleate equivalent to Timolol 0.5% w/v (5 mL)",
        "reference_source": "NLEM 2022 (S01ED01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0131",
    "display_name": "Brimonidine Tartrate",
    "generic_name": "Brimonidine Tartrate",
    "active_ingredient": "Brimonidine Tartrate",
    "composition": "Brimonidine Tartrate 0.15% w/v (5 mL)",
    "category": "Eye Diseases",
    "strength_form": "0.15% w/v Eye Drops",
    "dosage_form": "Eye Drops",
    "route": "Ophthalmic",
    "description": "Selective alpha-2 adrenoceptor agonist decreasing aqueous production and increasing uveoscleral outflow.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC S01EA05, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00298",
        "medicine_id": "med-cat-0131",
        "strength": "0.15% w/v",
        "dosage_form": "Eye Drops",
        "route": "Ophthalmic",
        "composition": "Brimonidine Tartrate 0.15% w/v (5 mL)",
        "reference_source": "WHO ATC S01EA05, IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00299",
        "medicine_id": "med-cat-0131",
        "strength": "0.2% w/v",
        "dosage_form": "Eye Drops",
        "route": "Ophthalmic",
        "composition": "Brimonidine Tartrate 0.2% w/v (5 mL)",
        "reference_source": "WHO ATC S01EA05, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0132",
    "display_name": "Tobramycin Eye Drops",
    "generic_name": "Tobramycin Eye Drops",
    "active_ingredient": "Tobramycin",
    "composition": "Tobramycin 0.3% w/v (5 mL)",
    "category": "Eye Diseases",
    "strength_form": "0.3% w/v Eye Drops",
    "dosage_form": "Eye Drops",
    "route": "Ophthalmic",
    "description": "Aminoglycoside ophthalmic antibiotic for external superficial ocular infections.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (S01AA12), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00300",
        "medicine_id": "med-cat-0132",
        "strength": "0.3% w/v",
        "dosage_form": "Eye Drops",
        "route": "Ophthalmic",
        "composition": "Tobramycin 0.3% w/v (5 mL)",
        "reference_source": "NLEM 2022 (S01AA12), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0133",
    "display_name": "Latanoprost",
    "generic_name": "Latanoprost",
    "active_ingredient": "Latanoprost",
    "composition": "Latanoprost 50 mcg/mL (0.005% w/v, 2.5 mL)",
    "category": "Eye Diseases",
    "strength_form": "0.005% w/v Eye Drops",
    "dosage_form": "Eye Drops",
    "route": "Ophthalmic",
    "description": "Prostaglandin F2-alpha analog increasing uveoscleral outflow in elevated intraocular pressure.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (S01EE01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00301",
        "medicine_id": "med-cat-0133",
        "strength": "0.005% w/v",
        "dosage_form": "Eye Drops",
        "route": "Ophthalmic",
        "composition": "Latanoprost 50 mcg/mL (0.005% w/v, 2.5 mL)",
        "reference_source": "NLEM 2022 (S01EE01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0134",
    "display_name": "Xylometazoline",
    "generic_name": "Xylometazoline",
    "active_ingredient": "Xylometazoline Hydrochloride",
    "composition": "Xylometazoline Hydrochloride 0.05% w/v (10 mL)",
    "category": "Ear, Nose and Throat Diseases",
    "strength_form": "0.05% w/v Paediatric Nasal Drops",
    "dosage_form": "Nasal Drops",
    "route": "Nasal",
    "description": "Imidazoline sympathomimetic nasal vasoconstrictor for rapid relief of acute rhinitis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (R01AA07), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00302",
        "medicine_id": "med-cat-0134",
        "strength": "0.05% w/v",
        "dosage_form": "Paediatric Nasal Drops",
        "route": "Nasal",
        "composition": "Xylometazoline Hydrochloride 0.05% w/v (10 mL)",
        "reference_source": "NLEM 2022 (R01AA07), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00303",
        "medicine_id": "med-cat-0134",
        "strength": "0.1% w/v",
        "dosage_form": "Adult Nasal Spray",
        "route": "Nasal",
        "composition": "Xylometazoline Hydrochloride 0.1% w/v (10 mL)",
        "reference_source": "NLEM 2022 (R01AA07), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0135",
    "display_name": "Fluticasone Furoate Nasal Spray",
    "generic_name": "Fluticasone Furoate Nasal Spray",
    "active_ingredient": "Fluticasone Furoate",
    "composition": "Fluticasone Furoate 27.5 mcg per actuation (120 sprays)",
    "category": "Ear, Nose and Throat Diseases",
    "strength_form": "27.5 mcg/spray Metered Nasal Spray",
    "dosage_form": "Nasal Spray",
    "route": "Nasal",
    "description": "Synthetic trifluorinated corticosteroid for seasonal and perennial allergic rhinitis.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC R01AD12, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00304",
        "medicine_id": "med-cat-0135",
        "strength": "27.5 mcg/spray",
        "dosage_form": "Metered Nasal Spray",
        "route": "Nasal",
        "composition": "Fluticasone Furoate 27.5 mcg per actuation (120 sprays)",
        "reference_source": "WHO ATC R01AD12, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0136",
    "display_name": "Paradichlorobenzene + Benzocaine",
    "generic_name": "Paradichlorobenzene + Benzocaine",
    "active_ingredient": "Paradichlorobenzene and Benzocaine",
    "composition": "Paradichlorobenzene 2% w/v + Benzocaine 2.7% w/v + Chlorbutol 5% w/v in oily base (10 mL)",
    "category": "Ear, Nose and Throat Diseases",
    "strength_form": "2% + 2.7% w/v Otic Solution Drops",
    "dosage_form": "Ear Drops",
    "route": "Otic",
    "description": "Ceruminolytic ear drops softening impacted ear wax with local surface anesthesia.",
    "combination_ingredients": "Paradichlorobenzene 2% + Benzocaine 2.7% + Chlorbutol 5%",
    "reference_source": "IP 2022",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00305",
        "medicine_id": "med-cat-0136",
        "strength": "2% + 2.7% w/v",
        "dosage_form": "Otic Solution Drops",
        "route": "Otic",
        "composition": "Paradichlorobenzene 2% w/v + Benzocaine 2.7% w/v + Chlorbutol 5% w/v in oily base (10 mL)",
        "reference_source": "IP 2022",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0137",
    "display_name": "Chlorhexidine Mouthwash",
    "generic_name": "Chlorhexidine Mouthwash",
    "active_ingredient": "Chlorhexidine Gluconate",
    "composition": "Chlorhexidine Gluconate Solution equivalent to Chlorhexidine Gluconate 0.2% w/v (150 mL)",
    "category": "Ear, Nose and Throat Diseases",
    "strength_form": "0.2% w/v Oral Rinse / Mouthwash",
    "dosage_form": "Mouthwash",
    "route": "Oral Mucosal",
    "description": "Bisbiguanide antiseptic reducing oral bacterial flora and preventing gingivitis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A01AB03), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00306",
        "medicine_id": "med-cat-0137",
        "strength": "0.2% w/v",
        "dosage_form": "Oral Rinse / Mouthwash",
        "route": "Oral Mucosal",
        "composition": "Chlorhexidine Gluconate Solution equivalent to Chlorhexidine Gluconate 0.2% w/v (150 mL)",
        "reference_source": "NLEM 2022 (A01AB03), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0138",
    "display_name": "Povidone-Iodine Gargle",
    "generic_name": "Povidone-Iodine Gargle",
    "active_ingredient": "Povidone-Iodine",
    "composition": "Povidone-Iodine 2% w/v (0.2% available iodine) in flavored base (100 mL)",
    "category": "Ear, Nose and Throat Diseases",
    "strength_form": "2% w/v Antiseptic Gargle Solution",
    "dosage_form": "Gargle",
    "route": "Oral Mucosal",
    "description": "Broad-spectrum antiseptic microbicide for pharyngitis, tonsillitis, and stomatitis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (R02AA15), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00307",
        "medicine_id": "med-cat-0138",
        "strength": "2% w/v",
        "dosage_form": "Antiseptic Gargle Solution",
        "route": "Oral Mucosal",
        "composition": "Povidone-Iodine 2% w/v (0.2% available iodine) in flavored base (100 mL)",
        "reference_source": "NLEM 2022 (R02AA15), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0139",
    "display_name": "Ciprofloxacin + Dexamethasone Ear Drops",
    "generic_name": "Ciprofloxacin + Dexamethasone Ear Drops",
    "active_ingredient": "Ciprofloxacin and Dexamethasone",
    "composition": "Ciprofloxacin Hydrochloride eq. to Ciprofloxacin 0.3% w/v + Dexamethasone 0.1% w/v (10 mL)",
    "category": "Ear, Nose and Throat Diseases",
    "strength_form": "0.3% + 0.1% w/v Otic Suspension Drops",
    "dosage_form": "Ear Drops",
    "route": "Otic",
    "description": "Otic antibacterial and anti-inflammatory combination for acute otitis externa and tympanostomy tube otorrhea.",
    "combination_ingredients": "Ciprofloxacin 0.3% + Dexamethasone 0.1%",
    "reference_source": "CDSCO Approved FDC, WHO ATC S02CA06",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00308",
        "medicine_id": "med-cat-0139",
        "strength": "0.3% + 0.1% w/v",
        "dosage_form": "Otic Suspension Drops",
        "route": "Otic",
        "composition": "Ciprofloxacin Hydrochloride eq. to Ciprofloxacin 0.3% w/v + Dexamethasone 0.1% w/v (10 mL)",
        "reference_source": "CDSCO Approved FDC, WHO ATC S02CA06",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0140",
    "display_name": "Amoxicillin",
    "generic_name": "Amoxicillin",
    "active_ingredient": "Amoxicillin Trihydrate",
    "composition": "Amoxicillin Trihydrate equivalent to Amoxicillin 250 mg",
    "category": "Bacterial Infections",
    "strength_form": "250 mg Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Moderate-spectrum bactericidal beta-lactam aminopenicillin for respiratory and soft tissue infections.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J01CA04), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00309",
        "medicine_id": "med-cat-0140",
        "strength": "250 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Amoxicillin Trihydrate equivalent to Amoxicillin 250 mg",
        "reference_source": "NLEM 2022 (J01CA04), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00310",
        "medicine_id": "med-cat-0140",
        "strength": "500 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Amoxicillin Trihydrate equivalent to Amoxicillin 500 mg",
        "reference_source": "NLEM 2022 (J01CA04), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00311",
        "medicine_id": "med-cat-0140",
        "strength": "125 mg/5 mL",
        "dosage_form": "Dry Syrup",
        "route": "Oral",
        "composition": "Amoxicillin Trihydrate equivalent to Amoxicillin 125 mg per 5 mL",
        "reference_source": "NLEM 2022 (J01CA04), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0141",
    "display_name": "Amoxicillin + Clavulanic Acid",
    "generic_name": "Amoxicillin + Clavulanic Acid",
    "active_ingredient": "Amoxicillin Trihydrate and Potassium Clavulanate",
    "composition": "Amoxicillin Trihydrate equivalent to Amoxicillin 500 mg + Potassium Clavulanate equivalent to Clavulanic Acid 125 mg",
    "category": "Bacterial Infections",
    "strength_form": "500 mg + 125 mg Film-coated Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Beta-lactam protected by suicide beta-lactamase inhibitor for resistant ENT, odontogenic, and RTI infections.",
    "combination_ingredients": "Amoxicillin 500 mg + Clavulanic Acid 125 mg / 875 mg + 125 mg",
    "reference_source": "NLEM 2022 (J01CR02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00312",
        "medicine_id": "med-cat-0141",
        "strength": "500 mg + 125 mg",
        "dosage_form": "Film-coated Tablet",
        "route": "Oral",
        "composition": "Amoxicillin Trihydrate equivalent to Amoxicillin 500 mg + Potassium Clavulanate equivalent to Clavulanic Acid 125 mg",
        "reference_source": "NLEM 2022 (J01CR02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00313",
        "medicine_id": "med-cat-0141",
        "strength": "875 mg + 125 mg",
        "dosage_form": "Film-coated Tablet",
        "route": "Oral",
        "composition": "Amoxicillin Trihydrate 875 mg + Potassium Clavulanate 125 mg",
        "reference_source": "NLEM 2022 (J01CR02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00314",
        "medicine_id": "med-cat-0141",
        "strength": "1000 mg + 200 mg",
        "dosage_form": "Powder for Injection",
        "route": "Intravenous",
        "composition": "Amoxicillin Sodium 1000 mg + Potassium Clavulanate 200 mg",
        "reference_source": "NLEM 2022 (J01CR02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00315",
        "medicine_id": "med-cat-0141",
        "strength": "200 mg + 28.5 mg/5 mL",
        "dosage_form": "Dry Syrup",
        "route": "Oral",
        "composition": "Amoxicillin 200 mg + Clavulanic Acid 28.5 mg per 5 mL",
        "reference_source": "NLEM 2022 (J01CR02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0142",
    "display_name": "Azithromycin",
    "generic_name": "Azithromycin",
    "active_ingredient": "Azithromycin Dihydrate",
    "composition": "Azithromycin Dihydrate equivalent to Azithromycin 250 mg",
    "category": "Bacterial Infections",
    "strength_form": "250 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Semisynthetic azalide macrolide with high tissue penetration for atypical pneumonia and urethritis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J01FA10), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00316",
        "medicine_id": "med-cat-0142",
        "strength": "250 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Azithromycin Dihydrate equivalent to Azithromycin 250 mg",
        "reference_source": "NLEM 2022 (J01FA10), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00317",
        "medicine_id": "med-cat-0142",
        "strength": "500 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Azithromycin Dihydrate equivalent to Azithromycin 500 mg",
        "reference_source": "NLEM 2022 (J01FA10), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00318",
        "medicine_id": "med-cat-0142",
        "strength": "100 mg/5 mL",
        "dosage_form": "Oral Suspension",
        "route": "Oral",
        "composition": "Azithromycin 100 mg per 5 mL",
        "reference_source": "NLEM 2022 (J01FA10), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00319",
        "medicine_id": "med-cat-0142",
        "strength": "200 mg/5 mL",
        "dosage_form": "Oral Suspension",
        "route": "Oral",
        "composition": "Azithromycin 200 mg per 5 mL",
        "reference_source": "NLEM 2022 (J01FA10), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0143",
    "display_name": "Ciprofloxacin",
    "generic_name": "Ciprofloxacin",
    "active_ingredient": "Ciprofloxacin Hydrochloride",
    "composition": "Ciprofloxacin Hydrochloride equivalent to Ciprofloxacin 250 mg",
    "category": "Bacterial Infections",
    "strength_form": "250 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Bactericidal fluoroquinolone inhibiting bacterial DNA gyrase and topoisomerase IV.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J01MA02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00320",
        "medicine_id": "med-cat-0143",
        "strength": "250 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Ciprofloxacin Hydrochloride equivalent to Ciprofloxacin 250 mg",
        "reference_source": "NLEM 2022 (J01MA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00321",
        "medicine_id": "med-cat-0143",
        "strength": "500 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Ciprofloxacin Hydrochloride equivalent to Ciprofloxacin 500 mg",
        "reference_source": "NLEM 2022 (J01MA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00322",
        "medicine_id": "med-cat-0143",
        "strength": "200 mg/100 mL",
        "dosage_form": "IV Infusion",
        "route": "Intravenous",
        "composition": "Ciprofloxacin 2 mg/mL (200 mg per 100 mL bottle)",
        "reference_source": "NLEM 2022 (J01MA02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0144",
    "display_name": "Cefixime",
    "generic_name": "Cefixime",
    "active_ingredient": "Cefixime Trihydrate",
    "composition": "Cefixime Trihydrate equivalent to Cefixime 100 mg",
    "category": "Bacterial Infections",
    "strength_form": "100 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Oral third-generation cephalosporin highly stable to beta-lactamases for uncomplicated UTI and enteric fever.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J01DD08), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00323",
        "medicine_id": "med-cat-0144",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Cefixime Trihydrate equivalent to Cefixime 100 mg",
        "reference_source": "NLEM 2022 (J01DD08), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00324",
        "medicine_id": "med-cat-0144",
        "strength": "200 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Cefixime Trihydrate equivalent to Cefixime 200 mg",
        "reference_source": "NLEM 2022 (J01DD08), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00325",
        "medicine_id": "med-cat-0144",
        "strength": "50 mg/5 mL",
        "dosage_form": "Dry Syrup",
        "route": "Oral",
        "composition": "Cefixime 50 mg per 5 mL",
        "reference_source": "NLEM 2022 (J01DD08), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0145",
    "display_name": "Ceftriaxone",
    "generic_name": "Ceftriaxone",
    "active_ingredient": "Ceftriaxone Sodium",
    "composition": "Ceftriaxone Sodium equivalent to Ceftriaxone 250 mg",
    "category": "Bacterial Infections",
    "strength_form": "250 mg Powder for Injection",
    "dosage_form": "Injection",
    "route": "IV / IM",
    "description": "Broad-spectrum parenteral third-generation cephalosporin for bacterial meningitis and severe sepsis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J01DD04), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00326",
        "medicine_id": "med-cat-0145",
        "strength": "250 mg",
        "dosage_form": "Powder for Injection",
        "route": "IV / IM",
        "composition": "Ceftriaxone Sodium equivalent to Ceftriaxone 250 mg",
        "reference_source": "NLEM 2022 (J01DD04), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00327",
        "medicine_id": "med-cat-0145",
        "strength": "500 mg",
        "dosage_form": "Powder for Injection",
        "route": "IV / IM",
        "composition": "Ceftriaxone Sodium equivalent to Ceftriaxone 500 mg",
        "reference_source": "NLEM 2022 (J01DD04), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00328",
        "medicine_id": "med-cat-0145",
        "strength": "1000 mg",
        "dosage_form": "Powder for Injection",
        "route": "IV / IM",
        "composition": "Ceftriaxone Sodium equivalent to Ceftriaxone 1 g",
        "reference_source": "NLEM 2022 (J01DD04), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0146",
    "display_name": "Doxycycline",
    "generic_name": "Doxycycline",
    "active_ingredient": "Doxycycline Hyclate",
    "composition": "Doxycycline Hyclate equivalent to Doxycycline 100 mg",
    "category": "Bacterial Infections",
    "strength_form": "100 mg Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Broad-spectrum tetracycline derivative for rickettsial infections, cholera, leptospirosis, and acne.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J01AA02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00329",
        "medicine_id": "med-cat-0146",
        "strength": "100 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Doxycycline Hyclate equivalent to Doxycycline 100 mg",
        "reference_source": "NLEM 2022 (J01AA02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0147",
    "display_name": "Fluconazole",
    "generic_name": "Fluconazole",
    "active_ingredient": "Fluconazole",
    "composition": "Fluconazole 50 mg",
    "category": "Antifungal Medicines",
    "strength_form": "50 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Triazole antifungal inhibiting fungal 14-alpha-demethylase for candidiasis and cryptococcal meningitis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J02AC01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00330",
        "medicine_id": "med-cat-0147",
        "strength": "50 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Fluconazole 50 mg",
        "reference_source": "NLEM 2022 (J02AC01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00331",
        "medicine_id": "med-cat-0147",
        "strength": "150 mg",
        "dosage_form": "Single Dose Tablet",
        "route": "Oral",
        "composition": "Fluconazole 150 mg",
        "reference_source": "NLEM 2022 (J02AC01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00332",
        "medicine_id": "med-cat-0147",
        "strength": "200 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Fluconazole 200 mg",
        "reference_source": "NLEM 2022 (J02AC01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00333",
        "medicine_id": "med-cat-0147",
        "strength": "2 mg/mL",
        "dosage_form": "IV Infusion",
        "route": "Intravenous",
        "composition": "Fluconazole 200 mg per 100 mL IV bottle",
        "reference_source": "NLEM 2022 (J02AC01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0148",
    "display_name": "Itraconazole",
    "generic_name": "Itraconazole",
    "active_ingredient": "Itraconazole",
    "composition": "Itraconazole pellets 100 mg",
    "category": "Antifungal Medicines",
    "strength_form": "100 mg Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Synthetic triazole for systemic onychomycosis, histoplasmosis, and resistant dermatophytosis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J02AC02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00334",
        "medicine_id": "med-cat-0148",
        "strength": "100 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Itraconazole pellets 100 mg",
        "reference_source": "NLEM 2022 (J02AC02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00335",
        "medicine_id": "med-cat-0148",
        "strength": "200 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Itraconazole pellets 200 mg",
        "reference_source": "NLEM 2022 (J02AC02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0149",
    "display_name": "Clotrimazole",
    "generic_name": "Clotrimazole",
    "active_ingredient": "Clotrimazole",
    "composition": "Clotrimazole 1% w/w (20 g / 30 g)",
    "category": "Antifungal Medicines",
    "strength_form": "1% w/w Topical Cream",
    "dosage_form": "Cream",
    "route": "Topical / Vaginal",
    "description": "Broad-spectrum imidazole for superficial tinea cruris, tinea pedis, and vulvovaginal candidiasis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (D01AC01), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00336",
        "medicine_id": "med-cat-0149",
        "strength": "1% w/w",
        "dosage_form": "Topical Cream",
        "route": "Topical",
        "composition": "Clotrimazole 1% w/w (20 g / 30 g)",
        "reference_source": "NLEM 2022 (D01AC01), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00337",
        "medicine_id": "med-cat-0149",
        "strength": "1% w/w",
        "dosage_form": "Absorbent Topical Powder",
        "route": "Topical",
        "composition": "Clotrimazole 1% w/w in dusting base (100 g)",
        "reference_source": "NLEM 2022 (D01AC01), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00338",
        "medicine_id": "med-cat-0149",
        "strength": "100 mg",
        "dosage_form": "Vaginal Tablet (Pessary)",
        "route": "Vaginal",
        "composition": "Clotrimazole 100 mg",
        "reference_source": "NLEM 2022 (D01AC01), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0150",
    "display_name": "Terbinafine",
    "generic_name": "Terbinafine",
    "active_ingredient": "Terbinafine Hydrochloride",
    "composition": "Terbinafine Hydrochloride equivalent to Terbinafine 250 mg",
    "category": "Antifungal Medicines",
    "strength_form": "250 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / Topical",
    "description": "Allylamine antifungal inhibiting squalene epoxidase for fungal infections of the nails and skin.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (D01BA02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00339",
        "medicine_id": "med-cat-0150",
        "strength": "250 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Terbinafine Hydrochloride equivalent to Terbinafine 250 mg",
        "reference_source": "NLEM 2022 (D01BA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00340",
        "medicine_id": "med-cat-0150",
        "strength": "1% w/w",
        "dosage_form": "Topical Cream",
        "route": "Topical",
        "composition": "Terbinafine Hydrochloride 1% w/w (15 g)",
        "reference_source": "NLEM 2022 (D01BA02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0151",
    "display_name": "Ketoconazole",
    "generic_name": "Ketoconazole",
    "active_ingredient": "Ketoconazole",
    "composition": "Ketoconazole 2% w/v (60 mL / 100 mL)",
    "category": "Antifungal Medicines",
    "strength_form": "2% w/v Medicated Scalp Shampoo",
    "dosage_form": "Shampoo",
    "route": "Topical / Oral",
    "description": "Imidazole derivative for seborrheic dermatitis, dandruff, and pityriasis versicolor.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (D01AC08), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00341",
        "medicine_id": "med-cat-0151",
        "strength": "2% w/v",
        "dosage_form": "Medicated Scalp Shampoo",
        "route": "Topical",
        "composition": "Ketoconazole 2% w/v (60 mL / 100 mL)",
        "reference_source": "NLEM 2022 (D01AC08), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00342",
        "medicine_id": "med-cat-0151",
        "strength": "2% w/w",
        "dosage_form": "Topical Cream",
        "route": "Topical",
        "composition": "Ketoconazole 2% w/w (30 g)",
        "reference_source": "NLEM 2022 (D01AC08), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00343",
        "medicine_id": "med-cat-0151",
        "strength": "200 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Ketoconazole 200 mg",
        "reference_source": "NLEM 2022 (D01AC08), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0152",
    "display_name": "Amphotericin B",
    "generic_name": "Amphotericin B",
    "active_ingredient": "Amphotericin B (Liposomal)",
    "composition": "Liposomal Amphotericin B 50 mg with sterile diluent",
    "category": "Antifungal Medicines",
    "strength_form": "50 mg Powder for Injection (Liposomal)",
    "dosage_form": "Injection",
    "route": "Intravenous",
    "description": "Polyene macrolide binding fungal ergosterol for life-threatening systemic mucormycosis and leishmaniasis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J02AA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00344",
        "medicine_id": "med-cat-0152",
        "strength": "50 mg",
        "dosage_form": "Powder for Injection (Liposomal)",
        "route": "Intravenous",
        "composition": "Liposomal Amphotericin B 50 mg with sterile diluent",
        "reference_source": "NLEM 2022 (J02AA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0153",
    "display_name": "Acyclovir",
    "generic_name": "Acyclovir",
    "active_ingredient": "Acyclovir",
    "composition": "Acyclovir 200 mg",
    "category": "Antiviral Medicines",
    "strength_form": "200 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV / Topical",
    "description": "Guanosine analog DNA polymerase inhibitor for herpes simplex encephalitis and varicella zoster.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J05AB01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00345",
        "medicine_id": "med-cat-0153",
        "strength": "200 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Acyclovir 200 mg",
        "reference_source": "NLEM 2022 (J05AB01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00346",
        "medicine_id": "med-cat-0153",
        "strength": "400 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Acyclovir 400 mg",
        "reference_source": "NLEM 2022 (J05AB01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00347",
        "medicine_id": "med-cat-0153",
        "strength": "800 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Acyclovir 800 mg",
        "reference_source": "NLEM 2022 (J05AB01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00348",
        "medicine_id": "med-cat-0153",
        "strength": "250 mg",
        "dosage_form": "Powder for Injection",
        "route": "Intravenous",
        "composition": "Acyclovir Sodium equivalent to Acyclovir 250 mg",
        "reference_source": "NLEM 2022 (J05AB01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00349",
        "medicine_id": "med-cat-0153",
        "strength": "5% w/w",
        "dosage_form": "Topical Cream",
        "route": "Topical",
        "composition": "Acyclovir 5% w/w (5 g)",
        "reference_source": "NLEM 2022 (J05AB01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0154",
    "display_name": "Valacyclovir",
    "generic_name": "Valacyclovir",
    "active_ingredient": "Valacyclovir Hydrochloride",
    "composition": "Valacyclovir Hydrochloride equivalent to Valacyclovir 500 mg",
    "category": "Antiviral Medicines",
    "strength_form": "500 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "L-valyl ester prodrug of acyclovir with enhanced bioavailability for herpes zoster (shingles).",
    "combination_ingredients": null,
    "reference_source": "WHO ATC J05AB11, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00350",
        "medicine_id": "med-cat-0154",
        "strength": "500 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Valacyclovir Hydrochloride equivalent to Valacyclovir 500 mg",
        "reference_source": "WHO ATC J05AB11, IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00351",
        "medicine_id": "med-cat-0154",
        "strength": "1000 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Valacyclovir Hydrochloride equivalent to Valacyclovir 1000 mg",
        "reference_source": "WHO ATC J05AB11, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0155",
    "display_name": "Oseltamivir",
    "generic_name": "Oseltamivir",
    "active_ingredient": "Oseltamivir Phosphate",
    "composition": "Oseltamivir Phosphate equivalent to Oseltamivir 75 mg",
    "category": "Antiviral Medicines",
    "strength_form": "75 mg Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Neuraminidase inhibitor preventing viral release from infected cells in influenza A and B.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J05AH02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00352",
        "medicine_id": "med-cat-0155",
        "strength": "75 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Oseltamivir Phosphate equivalent to Oseltamivir 75 mg",
        "reference_source": "NLEM 2022 (J05AH02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00353",
        "medicine_id": "med-cat-0155",
        "strength": "12 mg/mL",
        "dosage_form": "Powder for Oral Suspension",
        "route": "Oral",
        "composition": "Oseltamivir 12 mg per mL (75 mL)",
        "reference_source": "NLEM 2022 (J05AH02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0156",
    "display_name": "Remdesivir",
    "generic_name": "Remdesivir",
    "active_ingredient": "Remdesivir",
    "composition": "Remdesivir 100 mg lyophilized powder",
    "category": "Antiviral Medicines",
    "strength_form": "100 mg Powder for Injection",
    "dosage_form": "Injection",
    "route": "Intravenous",
    "description": "Adenosine nucleotide prodrug inhibiting viral RNA-dependent RNA polymerase in severe viral pneumonitis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J05AB16), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00354",
        "medicine_id": "med-cat-0156",
        "strength": "100 mg",
        "dosage_form": "Powder for Injection",
        "route": "Intravenous",
        "composition": "Remdesivir 100 mg lyophilized powder",
        "reference_source": "NLEM 2022 (J05AB16), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0157",
    "display_name": "Tenofovir Disoproxil Fumarate",
    "generic_name": "Tenofovir Disoproxil Fumarate",
    "active_ingredient": "Tenofovir Disoproxil Fumarate",
    "composition": "Tenofovir Disoproxil Fumarate 300 mg",
    "category": "Antiviral Medicines",
    "strength_form": "300 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Nucleotide reverse transcriptase inhibitor for chronic hepatitis B and HIV-1 combination therapy.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J05AF07), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00355",
        "medicine_id": "med-cat-0157",
        "strength": "300 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Tenofovir Disoproxil Fumarate 300 mg",
        "reference_source": "NLEM 2022 (J05AF07), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0158",
    "display_name": "Sofosbuvir",
    "generic_name": "Sofosbuvir",
    "active_ingredient": "Sofosbuvir",
    "composition": "Sofosbuvir 400 mg",
    "category": "Antiviral Medicines",
    "strength_form": "400 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Pangenotypic direct-acting NS5B polymerase inhibitor for curative therapy of chronic hepatitis C.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J05AP08), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00356",
        "medicine_id": "med-cat-0158",
        "strength": "400 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Sofosbuvir 400 mg",
        "reference_source": "NLEM 2022 (J05AP08), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0159",
    "display_name": "Isoniazid",
    "generic_name": "Isoniazid",
    "active_ingredient": "Isoniazid (INH)",
    "composition": "Isoniazid 100 mg",
    "category": "Tuberculosis",
    "strength_form": "100 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Essential bactericidal anti-tubercular drug blocking mycolic acid cell wall synthesis in M. tuberculosis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J04AC01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00357",
        "medicine_id": "med-cat-0159",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Isoniazid 100 mg",
        "reference_source": "NLEM 2022 (J04AC01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00358",
        "medicine_id": "med-cat-0159",
        "strength": "300 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Isoniazid 300 mg",
        "reference_source": "NLEM 2022 (J04AC01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0160",
    "display_name": "Rifampicin",
    "generic_name": "Rifampicin",
    "active_ingredient": "Rifampicin",
    "composition": "Rifampicin 150 mg",
    "category": "Tuberculosis",
    "strength_form": "150 mg Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Semi-synthetic rifamycin antibiotic inhibiting bacterial DNA-dependent RNA polymerase in tuberculosis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J04AB02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00359",
        "medicine_id": "med-cat-0160",
        "strength": "150 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Rifampicin 150 mg",
        "reference_source": "NLEM 2022 (J04AB02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00360",
        "medicine_id": "med-cat-0160",
        "strength": "300 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Rifampicin 300 mg",
        "reference_source": "NLEM 2022 (J04AB02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00361",
        "medicine_id": "med-cat-0160",
        "strength": "450 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Rifampicin 450 mg",
        "reference_source": "NLEM 2022 (J04AB02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00362",
        "medicine_id": "med-cat-0160",
        "strength": "100 mg/5 mL",
        "dosage_form": "Syrup",
        "route": "Oral",
        "composition": "Rifampicin 100 mg per 5 mL",
        "reference_source": "NLEM 2022 (J04AB02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0161",
    "display_name": "Pyrazinamide",
    "generic_name": "Pyrazinamide",
    "active_ingredient": "Pyrazinamide",
    "composition": "Pyrazinamide 500 mg",
    "category": "Tuberculosis",
    "strength_form": "500 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Sterilizing anti-tubercular agent active against semidormant bacilli in acidic intracellular phagosomes.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J04AK01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00363",
        "medicine_id": "med-cat-0161",
        "strength": "500 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Pyrazinamide 500 mg",
        "reference_source": "NLEM 2022 (J04AK01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00364",
        "medicine_id": "med-cat-0161",
        "strength": "750 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Pyrazinamide 750 mg",
        "reference_source": "NLEM 2022 (J04AK01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0162",
    "display_name": "Ethambutol",
    "generic_name": "Ethambutol",
    "active_ingredient": "Ethambutol Hydrochloride",
    "composition": "Ethambutol Hydrochloride 400 mg",
    "category": "Tuberculosis",
    "strength_form": "400 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Bacteriostatic anti-tubercular agent inhibiting arabinosyl transferase and arabinogalactan synthesis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J04AK02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00365",
        "medicine_id": "med-cat-0162",
        "strength": "400 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Ethambutol Hydrochloride 400 mg",
        "reference_source": "NLEM 2022 (J04AK02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00366",
        "medicine_id": "med-cat-0162",
        "strength": "800 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Ethambutol Hydrochloride 800 mg",
        "reference_source": "NLEM 2022 (J04AK02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0163",
    "display_name": "Streptomycin",
    "generic_name": "Streptomycin",
    "active_ingredient": "Streptomycin Sulfate",
    "composition": "Streptomycin Sulfate equivalent to Streptomycin 750 mg",
    "category": "Tuberculosis",
    "strength_form": "750 mg Powder for Injection",
    "dosage_form": "Injection",
    "route": "Intramuscular",
    "description": "Aminoglycoside antibiotic bactericidal against rapidly multiplying extracellular tubercle bacilli.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J01GA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00367",
        "medicine_id": "med-cat-0163",
        "strength": "750 mg",
        "dosage_form": "Powder for Injection",
        "route": "Intramuscular",
        "composition": "Streptomycin Sulfate equivalent to Streptomycin 750 mg",
        "reference_source": "NLEM 2022 (J01GA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00368",
        "medicine_id": "med-cat-0163",
        "strength": "1000 mg",
        "dosage_form": "Powder for Injection",
        "route": "Intramuscular",
        "composition": "Streptomycin Sulfate equivalent to Streptomycin 1 g",
        "reference_source": "NLEM 2022 (J01GA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0164",
    "display_name": "4-FDC (Rifampicin + Isoniazid + Pyrazinamide + Ethambutol)",
    "generic_name": "4-FDC (Rifampicin + Isoniazid + Pyrazinamide + Ethambutol)",
    "active_ingredient": "Rifampicin, Isoniazid, Pyrazinamide, and Ethambutol",
    "composition": "Rifampicin 150 mg + Isoniazid 75 mg + Pyrazinamide 400 mg + Ethambutol Hydrochloride 275 mg",
    "category": "Tuberculosis",
    "strength_form": "150/75/400/275 mg Film-coated Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "WHO national guideline 4-drug fixed-dose combination for intensive phase therapy of pulmonary tuberculosis.",
    "combination_ingredients": "Rifampicin 150 mg + Isoniazid 75 mg + Pyrazinamide 400 mg + Ethambutol 275 mg",
    "reference_source": "NLEM 2022 (J04AM06), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00369",
        "medicine_id": "med-cat-0164",
        "strength": "150/75/400/275 mg",
        "dosage_form": "Film-coated Tablet",
        "route": "Oral",
        "composition": "Rifampicin 150 mg + Isoniazid 75 mg + Pyrazinamide 400 mg + Ethambutol Hydrochloride 275 mg",
        "reference_source": "NLEM 2022 (J04AM06), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0165",
    "display_name": "Tamoxifen",
    "generic_name": "Tamoxifen",
    "active_ingredient": "Tamoxifen Citrate",
    "composition": "Tamoxifen Citrate equivalent to Tamoxifen 10 mg",
    "category": "Cancer and Oncology",
    "strength_form": "10 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Selective estrogen receptor modulator (SERM) for adjuvant hormonal therapy of estrogen-receptor positive breast cancer.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (L02BA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00370",
        "medicine_id": "med-cat-0165",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Tamoxifen Citrate equivalent to Tamoxifen 10 mg",
        "reference_source": "NLEM 2022 (L02BA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00371",
        "medicine_id": "med-cat-0165",
        "strength": "20 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Tamoxifen Citrate equivalent to Tamoxifen 20 mg",
        "reference_source": "NLEM 2022 (L02BA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0166",
    "display_name": "Imatinib",
    "generic_name": "Imatinib",
    "active_ingredient": "Imatinib Mesylate",
    "composition": "Imatinib Mesylate equivalent to Imatinib 100 mg",
    "category": "Cancer and Oncology",
    "strength_form": "100 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Targeted BCR-ABL tyrosine kinase inhibitor for Philadelphia chromosome-positive chronic myeloid leukemia (CML).",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (L01EA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00372",
        "medicine_id": "med-cat-0166",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Imatinib Mesylate equivalent to Imatinib 100 mg",
        "reference_source": "NLEM 2022 (L01EA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00373",
        "medicine_id": "med-cat-0166",
        "strength": "400 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Imatinib Mesylate equivalent to Imatinib 400 mg",
        "reference_source": "NLEM 2022 (L01EA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0167",
    "display_name": "Capecitabine",
    "generic_name": "Capecitabine",
    "active_ingredient": "Capecitabine",
    "composition": "Capecitabine 500 mg",
    "category": "Cancer and Oncology",
    "strength_form": "500 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Oral fluoropyrimidine carbamate prodrug enzymatically converted to 5-fluorouracil in tumor tissues for colorectal cancer.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (L01BC06), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00374",
        "medicine_id": "med-cat-0167",
        "strength": "500 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Capecitabine 500 mg",
        "reference_source": "NLEM 2022 (L01BC06), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0168",
    "display_name": "Paclitaxel",
    "generic_name": "Paclitaxel",
    "active_ingredient": "Paclitaxel",
    "composition": "Paclitaxel 6 mg per mL (5 mL)",
    "category": "Cancer and Oncology",
    "strength_form": "30 mg/5 mL IV Infusion Ampoule",
    "dosage_form": "Injection",
    "route": "Intravenous",
    "description": "Antimicrotubule taxane promoting assembly and stabilization of microtubules in ovarian and breast neoplasms.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (L01CD01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00375",
        "medicine_id": "med-cat-0168",
        "strength": "30 mg/5 mL",
        "dosage_form": "IV Infusion Ampoule",
        "route": "Intravenous",
        "composition": "Paclitaxel 6 mg per mL (5 mL)",
        "reference_source": "NLEM 2022 (L01CD01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00376",
        "medicine_id": "med-cat-0168",
        "strength": "100 mg/16.7 mL",
        "dosage_form": "IV Infusion Vial",
        "route": "Intravenous",
        "composition": "Paclitaxel 6 mg per mL (16.7 mL)",
        "reference_source": "NLEM 2022 (L01CD01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0169",
    "display_name": "Carboplatin",
    "generic_name": "Carboplatin",
    "active_ingredient": "Carboplatin",
    "composition": "Carboplatin 10 mg/mL (15 mL)",
    "category": "Cancer and Oncology",
    "strength_form": "150 mg Injection Vial",
    "dosage_form": "Injection",
    "route": "Intravenous",
    "description": "Second-generation platinum coordination complex forming interstrand DNA crosslinks in solid malignancies.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (L01XA02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00377",
        "medicine_id": "med-cat-0169",
        "strength": "150 mg",
        "dosage_form": "Injection Vial",
        "route": "Intravenous",
        "composition": "Carboplatin 10 mg/mL (15 mL)",
        "reference_source": "NLEM 2022 (L01XA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00378",
        "medicine_id": "med-cat-0169",
        "strength": "450 mg",
        "dosage_form": "Injection Vial",
        "route": "Intravenous",
        "composition": "Carboplatin 10 mg/mL (45 mL)",
        "reference_source": "NLEM 2022 (L01XA02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0170",
    "display_name": "Cisplatin",
    "generic_name": "Cisplatin",
    "active_ingredient": "Cisplatin",
    "composition": "Cisplatin 1 mg per mL (10 mL)",
    "category": "Cancer and Oncology",
    "strength_form": "10 mg/10 mL Injection Vial",
    "dosage_form": "Injection",
    "route": "Intravenous",
    "description": "Inorganic platinum complex causing DNA adduct formation in testicular, ovarian, and lung carcinoma.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (L01XA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00379",
        "medicine_id": "med-cat-0170",
        "strength": "10 mg/10 mL",
        "dosage_form": "Injection Vial",
        "route": "Intravenous",
        "composition": "Cisplatin 1 mg per mL (10 mL)",
        "reference_source": "NLEM 2022 (L01XA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00380",
        "medicine_id": "med-cat-0170",
        "strength": "50 mg/50 mL",
        "dosage_form": "Injection Vial",
        "route": "Intravenous",
        "composition": "Cisplatin 1 mg per mL (50 mL)",
        "reference_source": "NLEM 2022 (L01XA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0171",
    "display_name": "Cyclophosphamide",
    "generic_name": "Cyclophosphamide",
    "active_ingredient": "Cyclophosphamide Monohydrate",
    "composition": "Cyclophosphamide 50 mg",
    "category": "Cancer and Oncology",
    "strength_form": "50 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Alkylating nitrogen mustard crosslinking DNA in lymphomas, leukemias, and severe autoimmune nephropathies.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (L01AA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00381",
        "medicine_id": "med-cat-0171",
        "strength": "50 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Cyclophosphamide 50 mg",
        "reference_source": "NLEM 2022 (L01AA01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00382",
        "medicine_id": "med-cat-0171",
        "strength": "500 mg",
        "dosage_form": "Powder for Injection",
        "route": "Intravenous",
        "composition": "Cyclophosphamide 500 mg with diluent",
        "reference_source": "NLEM 2022 (L01AA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0172",
    "display_name": "Ferrous Ascorbate + Folic Acid",
    "generic_name": "Ferrous Ascorbate + Folic Acid",
    "active_ingredient": "Ferrous Ascorbate and Folic Acid",
    "composition": "Ferrous Ascorbate eq. to Elemental Iron 100 mg + Folic Acid 1.5 mg",
    "category": "Anaemia and Blood Disorders",
    "strength_form": "100 mg + 1.5 mg Film-coated Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Bioavailable chelated iron formulation providing elemental iron and pteroylglutamic acid for iron-deficiency anaemia.",
    "combination_ingredients": "Elemental Iron 100 mg + Folic Acid 1.5 mg",
    "reference_source": "NLEM 2022 (B03AE), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00383",
        "medicine_id": "med-cat-0172",
        "strength": "100 mg + 1.5 mg",
        "dosage_form": "Film-coated Tablet",
        "route": "Oral",
        "composition": "Ferrous Ascorbate eq. to Elemental Iron 100 mg + Folic Acid 1.5 mg",
        "reference_source": "NLEM 2022 (B03AE), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00384",
        "medicine_id": "med-cat-0172",
        "strength": "30 mg + 550 mcg/5 mL",
        "dosage_form": "Syrup",
        "route": "Oral",
        "composition": "Ferrous Ascorbate eq. to Elemental Iron 30 mg + Folic Acid 550 mcg per 5 mL",
        "reference_source": "NLEM 2022 (B03AE), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0173",
    "display_name": "Ferrous Sulfate",
    "generic_name": "Ferrous Sulfate",
    "active_ingredient": "Dried Ferrous Sulfate",
    "composition": "Dried Ferrous Sulfate 200 mg (eq. to 60 mg elemental iron)",
    "category": "Anaemia and Blood Disorders",
    "strength_form": "200 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Standard inorganic iron salt replenishing depleted hemoglobin and myoglobin stores.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (B03AA07), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00385",
        "medicine_id": "med-cat-0173",
        "strength": "200 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Dried Ferrous Sulfate 200 mg (eq. to 60 mg elemental iron)",
        "reference_source": "NLEM 2022 (B03AA07), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0174",
    "display_name": "Folic Acid",
    "generic_name": "Folic Acid",
    "active_ingredient": "Folic Acid",
    "composition": "Folic Acid 5 mg",
    "category": "Anaemia and Blood Disorders",
    "strength_form": "5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Vitamin B9 coenzyme essential for nucleoprotein synthesis, erythropoiesis, and neural tube defect prevention.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (B03BB01), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00386",
        "medicine_id": "med-cat-0174",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Folic Acid 5 mg",
        "reference_source": "NLEM 2022 (B03BB01), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0175",
    "display_name": "Cyanocobalamin",
    "generic_name": "Cyanocobalamin",
    "active_ingredient": "Cyanocobalamin / Methylcobalamin",
    "composition": "Methylcobalamin 500 mcg",
    "category": "Anaemia and Blood Disorders",
    "strength_form": "500 mcg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IM",
    "description": "Bioactive vitamin B12 coenzyme reversing megaloblastic anaemia and peripheral sensory neuropathy.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (B03BA01), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00387",
        "medicine_id": "med-cat-0175",
        "strength": "500 mcg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Methylcobalamin 500 mcg",
        "reference_source": "NLEM 2022 (B03BA01), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00388",
        "medicine_id": "med-cat-0175",
        "strength": "1500 mcg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Methylcobalamin 1500 mcg",
        "reference_source": "NLEM 2022 (B03BA01), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00389",
        "medicine_id": "med-cat-0175",
        "strength": "1000 mcg/mL",
        "dosage_form": "Injection",
        "route": "Intramuscular / IV",
        "composition": "Methylcobalamin 1000 mcg per mL (1 mL / 2 mL)",
        "reference_source": "NLEM 2022 (B03BA01), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0176",
    "display_name": "Iron Sucrose",
    "generic_name": "Iron Sucrose",
    "active_ingredient": "Iron Sucrose Complex",
    "composition": "Iron Sucrose equivalent to 100 mg elemental iron per 5 mL",
    "category": "Anaemia and Blood Disorders",
    "strength_form": "100 mg/5 mL IV Infusion Ampoule",
    "dosage_form": "Injection",
    "route": "Intravenous",
    "description": "Polynuclear iron(III)-hydroxide in sucrose for parenteral treatment of severe iron deficiency when oral iron fails.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (B03AC02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00390",
        "medicine_id": "med-cat-0176",
        "strength": "100 mg/5 mL",
        "dosage_form": "IV Infusion Ampoule",
        "route": "Intravenous",
        "composition": "Iron Sucrose equivalent to 100 mg elemental iron per 5 mL",
        "reference_source": "NLEM 2022 (B03AC02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0177",
    "display_name": "Tranexamic Acid",
    "generic_name": "Tranexamic Acid",
    "active_ingredient": "Tranexamic Acid",
    "composition": "Tranexamic Acid 500 mg",
    "category": "Anaemia and Blood Disorders",
    "strength_form": "500 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Synthetic lysine analog competitive antifibrinolytic preventing plasminogen activation in severe hemorrhage.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (B02AA02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00391",
        "medicine_id": "med-cat-0177",
        "strength": "500 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Tranexamic Acid 500 mg",
        "reference_source": "NLEM 2022 (B02AA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00392",
        "medicine_id": "med-cat-0177",
        "strength": "500 mg/5 mL",
        "dosage_form": "Injection",
        "route": "Intravenous",
        "composition": "Tranexamic Acid 100 mg per mL (5 mL)",
        "reference_source": "NLEM 2022 (B02AA02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0178",
    "display_name": "Cholecalciferol",
    "generic_name": "Cholecalciferol",
    "active_ingredient": "Cholecalciferol (Vitamin D3)",
    "composition": "Cholecalciferol 60,000 International Units",
    "category": "Vitamin Deficiencies",
    "strength_form": "60,000 IU Soft Gelatin Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Fat-soluble secosteroid regulating intestinal calcium and phosphate absorption for bone mineralization.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A11CC05), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00393",
        "medicine_id": "med-cat-0178",
        "strength": "60,000 IU",
        "dosage_form": "Soft Gelatin Capsule",
        "route": "Oral",
        "composition": "Cholecalciferol 60,000 International Units",
        "reference_source": "NLEM 2022 (A11CC05), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00394",
        "medicine_id": "med-cat-0178",
        "strength": "60,000 IU Sachet",
        "dosage_form": "Oral Granules",
        "route": "Oral",
        "composition": "Cholecalciferol 60,000 IU per 1 g sachet",
        "reference_source": "NLEM 2022 (A11CC05), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00395",
        "medicine_id": "med-cat-0178",
        "strength": "400 IU/mL",
        "dosage_form": "Paediatric Oral Drops",
        "route": "Oral",
        "composition": "Cholecalciferol 400 IU per mL (15 mL)",
        "reference_source": "NLEM 2022 (A11CC05), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0179",
    "display_name": "Ascorbic Acid",
    "generic_name": "Ascorbic Acid",
    "active_ingredient": "Ascorbic Acid and Sodium Ascorbate",
    "composition": "Ascorbic Acid 100 mg + Sodium Ascorbate 450 mg (eq. to 500 mg Vitamin C)",
    "category": "Vitamin Deficiencies",
    "strength_form": "500 mg Chewable Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Water-soluble antioxidant vitamin essential for prolyl hydroxylase, collagen synthesis, and scurvy prevention.",
    "combination_ingredients": "Ascorbic Acid 100 mg + Sodium Ascorbate 450 mg",
    "reference_source": "NLEM 2022 (A11GA01), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00396",
        "medicine_id": "med-cat-0179",
        "strength": "500 mg",
        "dosage_form": "Chewable Tablet",
        "route": "Oral",
        "composition": "Ascorbic Acid 100 mg + Sodium Ascorbate 450 mg (eq. to 500 mg Vitamin C)",
        "reference_source": "NLEM 2022 (A11GA01), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0180",
    "display_name": "Vitamin B-Complex",
    "generic_name": "Vitamin B-Complex",
    "active_ingredient": "Thiamine, Riboflavin, Niacinamide, Pyridoxine, and Cyanocobalamin",
    "composition": "Thiamine Mononitrate 10 mg + Riboflavin 10 mg + Niacinamide 50 mg + Pyridoxine 3 mg + Cyanocobalamin 15 mcg",
    "category": "Vitamin Deficiencies",
    "strength_form": "Therapeutic B-Complex Film-coated Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Balanced therapeutic formulation of water-soluble B vitamins for nutritional neuropathy and glossitis.",
    "combination_ingredients": "B1 10mg + B2 10mg + B3 50mg + B6 3mg + B12 15mcg",
    "reference_source": "NLEM 2022 (A11EA), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00397",
        "medicine_id": "med-cat-0180",
        "strength": "Therapeutic B-Complex",
        "dosage_form": "Film-coated Tablet",
        "route": "Oral",
        "composition": "Thiamine Mononitrate 10 mg + Riboflavin 10 mg + Niacinamide 50 mg + Pyridoxine 3 mg + Cyanocobalamin 15 mcg",
        "reference_source": "NLEM 2022 (A11EA), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0181",
    "display_name": "Thiamine",
    "generic_name": "Thiamine",
    "active_ingredient": "Thiamine Hydrochloride (Vitamin B1)",
    "composition": "Thiamine Hydrochloride 100 mg",
    "category": "Vitamin Deficiencies",
    "strength_form": "100 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Cofactor for carbohydrate decarboxylation treating and preventing Wernicke-Korsakoff syndrome and beriberi.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A11DA01), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00398",
        "medicine_id": "med-cat-0181",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Thiamine Hydrochloride 100 mg",
        "reference_source": "NLEM 2022 (A11DA01), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00399",
        "medicine_id": "med-cat-0181",
        "strength": "100 mg/mL",
        "dosage_form": "Injection",
        "route": "IV / IM",
        "composition": "Thiamine Hydrochloride 100 mg per mL (2 mL)",
        "reference_source": "NLEM 2022 (A11DA01), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0182",
    "display_name": "Pyridoxine",
    "generic_name": "Pyridoxine",
    "active_ingredient": "Pyridoxine Hydrochloride (Vitamin B6)",
    "composition": "Pyridoxine Hydrochloride 50 mg",
    "category": "Vitamin Deficiencies",
    "strength_form": "50 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Cofactor in transamination and decarboxylation preventing peripheral neuropathy during isoniazid antitubercular therapy.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A11HA02), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00400",
        "medicine_id": "med-cat-0182",
        "strength": "50 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Pyridoxine Hydrochloride 50 mg",
        "reference_source": "NLEM 2022 (A11HA02), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00401",
        "medicine_id": "med-cat-0182",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Pyridoxine Hydrochloride 100 mg",
        "reference_source": "NLEM 2022 (A11HA02), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0183",
    "display_name": "Vitamin A",
    "generic_name": "Vitamin A",
    "active_ingredient": "Retinol Palmitate",
    "composition": "Retinol Palmitate 50,000 International Units",
    "category": "Vitamin Deficiencies",
    "strength_form": "50,000 IU Soft Gelatin Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Fat-soluble vitamin required for visual rhodopsin formation and epithelial tissue differentiation.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A11CA01), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00402",
        "medicine_id": "med-cat-0183",
        "strength": "50,000 IU",
        "dosage_form": "Soft Gelatin Capsule",
        "route": "Oral",
        "composition": "Retinol Palmitate 50,000 International Units",
        "reference_source": "NLEM 2022 (A11CA01), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00403",
        "medicine_id": "med-cat-0183",
        "strength": "100,000 IU/mL",
        "dosage_form": "Oral Solution",
        "route": "Oral",
        "composition": "Vitamin A Oral Solution 100,000 IU per mL (2 mL ampoule)",
        "reference_source": "NLEM 2022 (A11CA01), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0184",
    "display_name": "Calcium Carbonate + Vitamin D3",
    "generic_name": "Calcium Carbonate + Vitamin D3",
    "active_ingredient": "Calcium Carbonate and Cholecalciferol",
    "composition": "Calcium Carbonate from oyster shell eq. to elemental Calcium 500 mg + Cholecalciferol 250 IU",
    "category": "Nutritional Supplements",
    "strength_form": "500 mg + 250 IU Film-coated Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "High elemental calcium supplement coupled with vitamin D3 for optimal skeletal mineral density.",
    "combination_ingredients": "Elemental Calcium 500 mg + Cholecalciferol 250 IU",
    "reference_source": "NLEM 2022 (A12AX), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00404",
        "medicine_id": "med-cat-0184",
        "strength": "500 mg + 250 IU",
        "dosage_form": "Film-coated Tablet",
        "route": "Oral",
        "composition": "Calcium Carbonate from oyster shell eq. to elemental Calcium 500 mg + Cholecalciferol 250 IU",
        "reference_source": "NLEM 2022 (A12AX), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0185",
    "display_name": "Zinc Sulfate",
    "generic_name": "Zinc Sulfate",
    "active_ingredient": "Zinc Sulfate Monohydrate",
    "composition": "Zinc Sulfate Monohydrate equivalent to elemental Zinc 20 mg",
    "category": "Nutritional Supplements",
    "strength_form": "20 mg Dispersible Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Essential trace element cofactor for DNA polymerases and wound repair, reducing pediatric diarrhea duration.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A12CB01), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00405",
        "medicine_id": "med-cat-0185",
        "strength": "20 mg",
        "dosage_form": "Dispersible Tablet",
        "route": "Oral",
        "composition": "Zinc Sulfate Monohydrate equivalent to elemental Zinc 20 mg",
        "reference_source": "NLEM 2022 (A12CB01), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00406",
        "medicine_id": "med-cat-0185",
        "strength": "20 mg/5 mL",
        "dosage_form": "Oral Solution",
        "route": "Oral",
        "composition": "Elemental Zinc 20 mg per 5 mL",
        "reference_source": "NLEM 2022 (A12CB01), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0186",
    "display_name": "Protein Powder with Micronutrients",
    "generic_name": "Protein Powder with Micronutrients",
    "active_ingredient": "Hydrolyzed Whey and Soy Protein with Vitamins & Minerals",
    "composition": "Hydrolyzed Whey Protein Concentrate, Soy Isolate, Vitamins A, B, C, D, Iron, and Zinc in 400 g jar",
    "category": "Nutritional Supplements",
    "strength_form": "30% Protein Formula Dietary Supplement Powder",
    "dosage_form": "Oral Powder",
    "route": "Oral",
    "description": "Nutritionally complete high-protein dietary formula supporting muscle repair and post-illness convalescence.",
    "combination_ingredients": null,
    "reference_source": "Nutraceutical Standard, FSSAI",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00407",
        "medicine_id": "med-cat-0186",
        "strength": "30% Protein Formula",
        "dosage_form": "Dietary Supplement Powder",
        "route": "Oral",
        "composition": "Hydrolyzed Whey Protein Concentrate, Soy Isolate, Vitamins A, B, C, D, Iron, and Zinc in 400 g jar",
        "reference_source": "Nutraceutical Standard, FSSAI",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0187",
    "display_name": "Omega-3 Fatty Acids",
    "generic_name": "Omega-3 Fatty Acids",
    "active_ingredient": "Purified Marine Fish Oil (EPA and DHA)",
    "composition": "Fish Lipid Oil 1000 mg providing Eicosapentaenoic Acid (EPA) 180 mg and Docosahexaenoic Acid (DHA) 120 mg",
    "category": "Nutritional Supplements",
    "strength_form": "1000 mg Soft Gelatin Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Essential polyunsaturated fatty acids lowering hypertriglyceridemia and supporting vascular endothelium.",
    "combination_ingredients": "EPA 180 mg + DHA 120 mg",
    "reference_source": "WHO ATC C10AX06, IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00408",
        "medicine_id": "med-cat-0187",
        "strength": "1000 mg",
        "dosage_form": "Soft Gelatin Capsule",
        "route": "Oral",
        "composition": "Fish Lipid Oil 1000 mg providing Eicosapentaenoic Acid (EPA) 180 mg and Docosahexaenoic Acid (DHA) 120 mg",
        "reference_source": "WHO ATC C10AX06, IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0188",
    "display_name": "Magnesium Glycinate",
    "generic_name": "Magnesium Glycinate",
    "active_ingredient": "Magnesium Bisglycinate Chelate",
    "composition": "Magnesium Bisglycinate equivalent to elemental Magnesium 250 mg",
    "category": "Nutritional Supplements",
    "strength_form": "250 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Highly absorbable non-laxative chelated magnesium restoring muscular and neuromuscular excitability.",
    "combination_ingredients": null,
    "reference_source": "Nutraceutical Standard, IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00409",
        "medicine_id": "med-cat-0188",
        "strength": "250 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Magnesium Bisglycinate equivalent to elemental Magnesium 250 mg",
        "reference_source": "Nutraceutical Standard, IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00410",
        "medicine_id": "med-cat-0188",
        "strength": "400 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Magnesium Bisglycinate equivalent to elemental Magnesium 400 mg",
        "reference_source": "Nutraceutical Standard, IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0189",
    "display_name": "Multivitamin with Multiminerals",
    "generic_name": "Multivitamin with Multiminerals",
    "active_ingredient": "Vitamins A, C, D, E, B-Complex with Zinc, Selenium, and Copper",
    "composition": "Vitamins A 2500 IU, C 40 mg, D3 400 IU, E 15 mg, B-Complex with Zinc 12 mg and Selenium 40 mcg",
    "category": "Nutritional Supplements",
    "strength_form": "Complete Daily Formula Tablet / Capsule",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Daily antioxidant and micronutrient maintenance therapy for nutritional optimization.",
    "combination_ingredients": "Essential Vitamins + Trace Minerals Complex",
    "reference_source": "IP 2022",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00411",
        "medicine_id": "med-cat-0189",
        "strength": "Complete Daily Formula",
        "dosage_form": "Tablet / Capsule",
        "route": "Oral",
        "composition": "Vitamins A 2500 IU, C 40 mg, D3 400 IU, E 15 mg, B-Complex with Zinc 12 mg and Selenium 40 mcg",
        "reference_source": "IP 2022",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0190",
    "display_name": "Norethisterone",
    "generic_name": "Norethisterone",
    "active_ingredient": "Norethisterone",
    "composition": "Norethisterone 5 mg",
    "category": "Women's Health",
    "strength_form": "5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Potent 19-nortestosterone synthetic progestogen for dysfunctional uterine bleeding and endometriosis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (G03DC02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00412",
        "medicine_id": "med-cat-0190",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Norethisterone 5 mg",
        "reference_source": "NLEM 2022 (G03DC02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0191",
    "display_name": "Medroxyprogesterone Acetate",
    "generic_name": "Medroxyprogesterone Acetate",
    "active_ingredient": "Medroxyprogesterone Acetate",
    "composition": "Medroxyprogesterone Acetate 10 mg",
    "category": "Women's Health",
    "strength_form": "10 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IM",
    "description": "Synthetic progestin for secondary amenorrhea, abnormal uterine bleeding, and depot contraception.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (G03DA02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00413",
        "medicine_id": "med-cat-0191",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Medroxyprogesterone Acetate 10 mg",
        "reference_source": "NLEM 2022 (G03DA02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00414",
        "medicine_id": "med-cat-0191",
        "strength": "150 mg/mL",
        "dosage_form": "Depot Injection Suspension",
        "route": "Intramuscular",
        "composition": "Medroxyprogesterone Acetate 150 mg per mL (Depot vial)",
        "reference_source": "NLEM 2022 (G03DA02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0192",
    "display_name": "Levonorgestrel",
    "generic_name": "Levonorgestrel",
    "active_ingredient": "Levonorgestrel",
    "composition": "Levonorgestrel 0.75 mg",
    "category": "Women's Health",
    "strength_form": "0.75 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Synthetic second-generation progestin indicated for emergency post-coital contraception within 72 hours.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (G03AC03), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00415",
        "medicine_id": "med-cat-0192",
        "strength": "0.75 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Levonorgestrel 0.75 mg",
        "reference_source": "NLEM 2022 (G03AC03), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00416",
        "medicine_id": "med-cat-0192",
        "strength": "1.5 mg",
        "dosage_form": "Single Dose Tablet",
        "route": "Oral",
        "composition": "Levonorgestrel 1.5 mg",
        "reference_source": "NLEM 2022 (G03AC03), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0193",
    "display_name": "Ethinylestradiol + Levonorgestrel",
    "generic_name": "Ethinylestradiol + Levonorgestrel",
    "active_ingredient": "Ethinylestradiol and Levonorgestrel",
    "composition": "Ethinylestradiol 0.03 mg + Levonorgestrel 0.15 mg (21 active + 7 placebo)",
    "category": "Women's Health",
    "strength_form": "0.03 mg + 0.15 mg Cycle Pack Tablet (28s)",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Combined oral contraceptive pill inhibiting pituitary gonadotropin secretion and preventing ovulation.",
    "combination_ingredients": "Ethinylestradiol 0.03 mg + Levonorgestrel 0.15 mg",
    "reference_source": "NLEM 2022 (G03AA07), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00417",
        "medicine_id": "med-cat-0193",
        "strength": "0.03 mg + 0.15 mg",
        "dosage_form": "Cycle Pack Tablet (28s)",
        "route": "Oral",
        "composition": "Ethinylestradiol 0.03 mg + Levonorgestrel 0.15 mg (21 active + 7 placebo)",
        "reference_source": "NLEM 2022 (G03AA07), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0194",
    "display_name": "Dinoprostone",
    "generic_name": "Dinoprostone",
    "active_ingredient": "Dinoprostone (Prostaglandin E2)",
    "composition": "Dinoprostone 0.5 mg in 3 g prefilled applicator",
    "category": "Women's Health",
    "strength_form": "0.5 mg/3 g Endocervical Gel in Syringe",
    "dosage_form": "Gel",
    "route": "Intracervical",
    "description": "Naturally occurring prostaglandin E2 promoting cervical softening, effacement, and labour induction at term.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (G02AD02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00418",
        "medicine_id": "med-cat-0194",
        "strength": "0.5 mg/3 g",
        "dosage_form": "Endocervical Gel in Syringe",
        "route": "Intracervical",
        "composition": "Dinoprostone 0.5 mg in 3 g prefilled applicator",
        "reference_source": "NLEM 2022 (G02AD02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0195",
    "display_name": "Tranexamic Acid + Mefenamic Acid",
    "generic_name": "Tranexamic Acid + Mefenamic Acid",
    "active_ingredient": "Tranexamic Acid and Mefenamic Acid",
    "composition": "Tranexamic Acid 500 mg + Mefenamic Acid 250 mg",
    "category": "Women's Health",
    "strength_form": "500 mg + 250 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Antifibrinolytic and prostaglandin synthesis inhibitor combination for heavy menstrual bleeding.",
    "combination_ingredients": "Tranexamic Acid 500 mg + Mefenamic Acid 250 mg",
    "reference_source": "CDSCO Approved FDC, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00419",
        "medicine_id": "med-cat-0195",
        "strength": "500 mg + 250 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Tranexamic Acid 500 mg + Mefenamic Acid 250 mg",
        "reference_source": "CDSCO Approved FDC, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0196",
    "display_name": "Tamsulosin",
    "generic_name": "Tamsulosin",
    "active_ingredient": "Tamsulosin Hydrochloride",
    "composition": "Tamsulosin Hydrochloride 0.4 mg MR",
    "category": "Men's Health",
    "strength_form": "0.4 mg Modified Release Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Selective alpha-1A adrenoceptor antagonist relaxing prostatic smooth muscle in benign prostatic hyperplasia (BPH).",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (G04CA02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00420",
        "medicine_id": "med-cat-0196",
        "strength": "0.4 mg",
        "dosage_form": "Modified Release Capsule",
        "route": "Oral",
        "composition": "Tamsulosin Hydrochloride 0.4 mg MR",
        "reference_source": "NLEM 2022 (G04CA02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0197",
    "display_name": "Finasteride",
    "generic_name": "Finasteride",
    "active_ingredient": "Finasteride",
    "composition": "Finasteride 1 mg",
    "category": "Men's Health",
    "strength_form": "1 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Competitive type II 5-alpha reductase inhibitor reducing serum dihydrotestosterone (DHT) for BPH and male androgenic alopecia.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (G04CB01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00421",
        "medicine_id": "med-cat-0197",
        "strength": "1 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Finasteride 1 mg",
        "reference_source": "NLEM 2022 (G04CB01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00422",
        "medicine_id": "med-cat-0197",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Finasteride 5 mg",
        "reference_source": "NLEM 2022 (G04CB01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0198",
    "display_name": "Silodosin",
    "generic_name": "Silodosin",
    "active_ingredient": "Silodosin",
    "composition": "Silodosin 4 mg",
    "category": "Men's Health",
    "strength_form": "4 mg Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Highly selective alpha-1A adrenoceptor antagonist providing rapid relief of lower urinary tract symptoms in BPH.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC G04CA04, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00423",
        "medicine_id": "med-cat-0198",
        "strength": "4 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Silodosin 4 mg",
        "reference_source": "WHO ATC G04CA04, IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00424",
        "medicine_id": "med-cat-0198",
        "strength": "8 mg",
        "dosage_form": "Capsule",
        "route": "Oral",
        "composition": "Silodosin 8 mg",
        "reference_source": "WHO ATC G04CA04, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0199",
    "display_name": "Tadalafil",
    "generic_name": "Tadalafil",
    "active_ingredient": "Tadalafil",
    "composition": "Tadalafil 5 mg",
    "category": "Men's Health",
    "strength_form": "5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Long-acting phosphodiesterase type 5 (PDE-5) inhibitor for erectile dysfunction and benign prostatic hyperplasia.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC G04BE08, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00425",
        "medicine_id": "med-cat-0199",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Tadalafil 5 mg",
        "reference_source": "WHO ATC G04BE08, IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00426",
        "medicine_id": "med-cat-0199",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Tadalafil 10 mg",
        "reference_source": "WHO ATC G04BE08, IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00427",
        "medicine_id": "med-cat-0199",
        "strength": "20 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Tadalafil 20 mg",
        "reference_source": "WHO ATC G04BE08, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0200",
    "display_name": "Sildenafil",
    "generic_name": "Sildenafil",
    "active_ingredient": "Sildenafil Citrate",
    "composition": "Sildenafil Citrate equivalent to Sildenafil 25 mg",
    "category": "Men's Health",
    "strength_form": "25 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Potent PDE-5 inhibitor enhancing cyclic GMP-mediated cavernous arterial dilation in vasculogenic erectile failure.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC G04BE03, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00428",
        "medicine_id": "med-cat-0200",
        "strength": "25 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Sildenafil Citrate equivalent to Sildenafil 25 mg",
        "reference_source": "WHO ATC G04BE03, IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00429",
        "medicine_id": "med-cat-0200",
        "strength": "50 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Sildenafil Citrate equivalent to Sildenafil 50 mg",
        "reference_source": "WHO ATC G04BE03, IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00430",
        "medicine_id": "med-cat-0200",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Sildenafil Citrate equivalent to Sildenafil 100 mg",
        "reference_source": "WHO ATC G04BE03, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0201",
    "display_name": "Tamsulosin + Dutasteride",
    "generic_name": "Tamsulosin + Dutasteride",
    "active_ingredient": "Tamsulosin Hydrochloride and Dutasteride",
    "composition": "Tamsulosin Hydrochloride 0.4 mg MR + Dutasteride 0.5 mg",
    "category": "Men's Health",
    "strength_form": "0.4 mg + 0.5 mg Fixed Dose Combination Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Dual mechanism alpha-blocker and dual 5-AR inhibitor for moderate to severe benign prostatic enlargement.",
    "combination_ingredients": "Tamsulosin 0.4 mg + Dutasteride 0.5 mg",
    "reference_source": "CDSCO Approved FDC, WHO ATC G04CA52",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00431",
        "medicine_id": "med-cat-0201",
        "strength": "0.4 mg + 0.5 mg",
        "dosage_form": "Fixed Dose Combination Capsule",
        "route": "Oral",
        "composition": "Tamsulosin Hydrochloride 0.4 mg MR + Dutasteride 0.5 mg",
        "reference_source": "CDSCO Approved FDC, WHO ATC G04CA52",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0202",
    "display_name": "Isoxsuprine",
    "generic_name": "Isoxsuprine",
    "active_ingredient": "Isoxsuprine Hydrochloride",
    "composition": "Isoxsuprine Hydrochloride 10 mg",
    "category": "Pregnancy-related Medicines",
    "strength_form": "10 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Beta-2 adrenergic agonist uterine relaxant (tocolytic) for uncomplicated threatened abortion and premature labor.",
    "combination_ingredients": null,
    "reference_source": "IP 2022 (G02CA01)",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00432",
        "medicine_id": "med-cat-0202",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Isoxsuprine Hydrochloride 10 mg",
        "reference_source": "IP 2022 (G02CA01)",
        "is_prescription_required": true
      },
      {
        "id": "var-00433",
        "medicine_id": "med-cat-0202",
        "strength": "40 mg SR",
        "dosage_form": "Sustained Release Tablet",
        "route": "Oral",
        "composition": "Isoxsuprine Hydrochloride 40 mg SR",
        "reference_source": "IP 2022 (G02CA01)",
        "is_prescription_required": true
      },
      {
        "id": "var-00434",
        "medicine_id": "med-cat-0202",
        "strength": "5 mg/mL",
        "dosage_form": "Injection",
        "route": "IV / IM",
        "composition": "Isoxsuprine Hydrochloride 5 mg per mL (2 mL)",
        "reference_source": "IP 2022 (G02CA01)",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0203",
    "display_name": "Dydrogesterone",
    "generic_name": "Dydrogesterone",
    "active_ingredient": "Dydrogesterone",
    "composition": "Dydrogesterone 10 mg",
    "category": "Pregnancy-related Medicines",
    "strength_form": "10 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Orally active retro-progesterone with high progestogenic selectivity for luteal support and threatened miscarriage.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (G03DB01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00435",
        "medicine_id": "med-cat-0203",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Dydrogesterone 10 mg",
        "reference_source": "NLEM 2022 (G03DB01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0204",
    "display_name": "Natural Micronized Progesterone",
    "generic_name": "Natural Micronized Progesterone",
    "active_ingredient": "Progesterone (Micronized)",
    "composition": "Natural Micronized Progesterone 200 mg",
    "category": "Pregnancy-related Medicines",
    "strength_form": "200 mg Soft Gelatin Capsule / Vaginal Pessary",
    "dosage_form": "Capsule",
    "route": "Oral / Vaginal",
    "description": "Bioidentical progesterone maintaining decidualization and uterine quiescence in recurrent pregnancy loss.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (G03DA04), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00436",
        "medicine_id": "med-cat-0204",
        "strength": "200 mg",
        "dosage_form": "Soft Gelatin Capsule / Vaginal Pessary",
        "route": "Oral / Vaginal",
        "composition": "Natural Micronized Progesterone 200 mg",
        "reference_source": "NLEM 2022 (G03DA04), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00437",
        "medicine_id": "med-cat-0204",
        "strength": "400 mg",
        "dosage_form": "Vaginal Pessary",
        "route": "Vaginal",
        "composition": "Natural Micronized Progesterone 400 mg",
        "reference_source": "NLEM 2022 (G03DA04), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0205",
    "display_name": "L-Arginine",
    "generic_name": "L-Arginine",
    "active_ingredient": "L-Arginine",
    "composition": "L-Arginine 3 g with Proanthocyanidins 75 mg per sachet",
    "category": "Pregnancy-related Medicines",
    "strength_form": "3 g Sachet Granules for Oral Solution",
    "dosage_form": "Sachet",
    "route": "Oral",
    "description": "Nitric oxide precursor promoting uteroplacental perfusion in intrauterine growth restriction (IUGR) and oligohydramnios.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC A16AA01, IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00438",
        "medicine_id": "med-cat-0205",
        "strength": "3 g Sachet",
        "dosage_form": "Granules for Oral Solution",
        "route": "Oral",
        "composition": "L-Arginine 3 g with Proanthocyanidins 75 mg per sachet",
        "reference_source": "WHO ATC A16AA01, IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0206",
    "display_name": "Doxylamine + Pyridoxine",
    "generic_name": "Doxylamine + Pyridoxine",
    "active_ingredient": "Doxylamine Succinate and Pyridoxine Hydrochloride",
    "composition": "Doxylamine Succinate 10 mg + Pyridoxine Hydrochloride 10 mg + Folic Acid 2.5 mg",
    "category": "Pregnancy-related Medicines",
    "strength_form": "10 mg + 10 mg Delayed Release Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "First-line antiemetic for nausea and vomiting of pregnancy (morning sickness / hyperemesis gravidarum).",
    "combination_ingredients": "Doxylamine Succinate 10 mg + Pyridoxine 10 mg",
    "reference_source": "NLEM 2022 (R06AA), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00439",
        "medicine_id": "med-cat-0206",
        "strength": "10 mg + 10 mg",
        "dosage_form": "Delayed Release Tablet",
        "route": "Oral",
        "composition": "Doxylamine Succinate 10 mg + Pyridoxine Hydrochloride 10 mg + Folic Acid 2.5 mg",
        "reference_source": "NLEM 2022 (R06AA), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0207",
    "display_name": "Betamethasone Sodium Phosphate",
    "generic_name": "Betamethasone Sodium Phosphate",
    "active_ingredient": "Betamethasone Sodium Phosphate",
    "composition": "Betamethasone Sodium Phosphate 4 mg per mL (2 mL / 3 mL ampoule)",
    "category": "Pregnancy-related Medicines",
    "strength_form": "4 mg/mL Injection",
    "dosage_form": "Injection",
    "route": "Intramuscular",
    "description": "Antenatal corticosteroid promoting pulmonary surfactant synthesis and fetal lung maturation in preterm labor.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (H02AB01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00440",
        "medicine_id": "med-cat-0207",
        "strength": "4 mg/mL",
        "dosage_form": "Injection",
        "route": "Intramuscular",
        "composition": "Betamethasone Sodium Phosphate 4 mg per mL (2 mL / 3 mL ampoule)",
        "reference_source": "NLEM 2022 (H02AB01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0208",
    "display_name": "Paracetamol Paediatric Drops",
    "generic_name": "Paracetamol Paediatric Drops",
    "active_ingredient": "Paracetamol",
    "composition": "Paracetamol 100 mg per mL with calibrated dropper (15 mL)",
    "category": "Child Health and Paediatrics",
    "strength_form": "100 mg/mL Paediatric Oral Drops",
    "dosage_form": "Oral Drops",
    "route": "Oral",
    "description": "Concentrated paediatric formulation for weight-based antipyretic dosing in infants.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (N02BE01), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00441",
        "medicine_id": "med-cat-0208",
        "strength": "100 mg/mL",
        "dosage_form": "Paediatric Oral Drops",
        "route": "Oral",
        "composition": "Paracetamol 100 mg per mL with calibrated dropper (15 mL)",
        "reference_source": "NLEM 2022 (N02BE01), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0209",
    "display_name": "Zinc Dispersible",
    "generic_name": "Zinc Dispersible",
    "active_ingredient": "Elemental Zinc (as Zinc Sulfate)",
    "composition": "Zinc Sulfate Monohydrate equivalent to elemental Zinc 20 mg",
    "category": "Child Health and Paediatrics",
    "strength_form": "20 mg Dispersible Tablet",
    "dosage_form": "Dispersible Tablet",
    "route": "Oral",
    "description": "WHO essential paediatric treatment for reduction of acute watery diarrhoea severity and duration.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A12CB01), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00442",
        "medicine_id": "med-cat-0209",
        "strength": "20 mg",
        "dosage_form": "Dispersible Tablet",
        "route": "Oral",
        "composition": "Zinc Sulfate Monohydrate equivalent to elemental Zinc 20 mg",
        "reference_source": "NLEM 2022 (A12CB01), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0210",
    "display_name": "Albendazole Paediatric Suspension",
    "generic_name": "Albendazole Paediatric Suspension",
    "active_ingredient": "Albendazole",
    "composition": "Albendazole 200 mg per 5 mL (10 mL bottle)",
    "category": "Child Health and Paediatrics",
    "strength_form": "200 mg/5 mL Oral Suspension",
    "dosage_form": "Oral Suspension",
    "route": "Oral",
    "description": "Paediatric anthelmintic formulation for deworming against Ascaris lumbricoides and Enterobius vermicularis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (P02CA03), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00443",
        "medicine_id": "med-cat-0210",
        "strength": "200 mg/5 mL",
        "dosage_form": "Oral Suspension",
        "route": "Oral",
        "composition": "Albendazole 200 mg per 5 mL (10 mL bottle)",
        "reference_source": "NLEM 2022 (P02CA03), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00444",
        "medicine_id": "med-cat-0210",
        "strength": "400 mg",
        "dosage_form": "Chewable Tablet",
        "route": "Oral",
        "composition": "Albendazole 400 mg",
        "reference_source": "NLEM 2022 (P02CA03), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0211",
    "display_name": "Amoxicillin Paediatric Drops",
    "generic_name": "Amoxicillin Paediatric Drops",
    "active_ingredient": "Amoxicillin Trihydrate",
    "composition": "Amoxicillin Trihydrate equivalent to Amoxicillin 100 mg per mL (10 mL)",
    "category": "Child Health and Paediatrics",
    "strength_form": "100 mg/mL Dry Powder for Oral Drops",
    "dosage_form": "Oral Drops",
    "route": "Oral",
    "description": "Broad-spectrum aminopenicillin oral drops for infantile bacterial otitis media and chest infections.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J01CA04), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00445",
        "medicine_id": "med-cat-0211",
        "strength": "100 mg/mL",
        "dosage_form": "Dry Powder for Oral Drops",
        "route": "Oral",
        "composition": "Amoxicillin Trihydrate equivalent to Amoxicillin 100 mg per mL (10 mL)",
        "reference_source": "NLEM 2022 (J01CA04), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0212",
    "display_name": "Cetirizine Paediatric Syrup",
    "generic_name": "Cetirizine Paediatric Syrup",
    "active_ingredient": "Cetirizine Hydrochloride",
    "composition": "Cetirizine Hydrochloride 5 mg per 5 mL (30 mL / 60 mL)",
    "category": "Child Health and Paediatrics",
    "strength_form": "5 mg/5 mL Oral Syrup",
    "dosage_form": "Syrup",
    "route": "Oral",
    "description": "Paediatric antihistamine syrup for childhood allergic rhinitis, atopic dermatitis, and urticaria.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (R06AE07), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00446",
        "medicine_id": "med-cat-0212",
        "strength": "5 mg/5 mL",
        "dosage_form": "Oral Syrup",
        "route": "Oral",
        "composition": "Cetirizine Hydrochloride 5 mg per 5 mL (30 mL / 60 mL)",
        "reference_source": "NLEM 2022 (R06AE07), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00447",
        "medicine_id": "med-cat-0212",
        "strength": "10 mg/mL",
        "dosage_form": "Paediatric Drops",
        "route": "Oral",
        "composition": "Cetirizine Hydrochloride 10 mg per mL (15 mL)",
        "reference_source": "NLEM 2022 (R06AE07), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0213",
    "display_name": "Vitamin D3 Paediatric Drops",
    "generic_name": "Vitamin D3 Paediatric Drops",
    "active_ingredient": "Cholecalciferol",
    "composition": "Cholecalciferol 400 International Units per mL (15 mL / 30 mL)",
    "category": "Child Health and Paediatrics",
    "strength_form": "400 IU/mL Paediatric Drops",
    "dosage_form": "Oral Drops",
    "route": "Oral",
    "description": "Daily prophylaxis against nutritional rickets and hypocalcemia in exclusive breastfeeding.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A11CC05), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00448",
        "medicine_id": "med-cat-0213",
        "strength": "400 IU/mL",
        "dosage_form": "Paediatric Drops",
        "route": "Oral",
        "composition": "Cholecalciferol 400 International Units per mL (15 mL / 30 mL)",
        "reference_source": "NLEM 2022 (A11CC05), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0214",
    "display_name": "Cetirizine",
    "generic_name": "Cetirizine",
    "active_ingredient": "Cetirizine Hydrochloride",
    "composition": "Cetirizine Hydrochloride 5 mg",
    "category": "Allergy and Immunology",
    "strength_form": "5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Selective second-generation peripheral H1 receptor antagonist for seasonal allergic rhinitis and chronic urticaria.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (R06AE07), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00449",
        "medicine_id": "med-cat-0214",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Cetirizine Hydrochloride 5 mg",
        "reference_source": "NLEM 2022 (R06AE07), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00450",
        "medicine_id": "med-cat-0214",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Cetirizine Hydrochloride 10 mg",
        "reference_source": "NLEM 2022 (R06AE07), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0215",
    "display_name": "Fexofenadine",
    "generic_name": "Fexofenadine",
    "active_ingredient": "Fexofenadine Hydrochloride",
    "composition": "Fexofenadine Hydrochloride 120 mg",
    "category": "Allergy and Immunology",
    "strength_form": "120 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Active carboxylic acid metabolite of terfenadine with zero central sedative liability for allergic rhinoconjunctivitis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (R06AX26), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00451",
        "medicine_id": "med-cat-0215",
        "strength": "120 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Fexofenadine Hydrochloride 120 mg",
        "reference_source": "NLEM 2022 (R06AX26), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00452",
        "medicine_id": "med-cat-0215",
        "strength": "180 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Fexofenadine Hydrochloride 180 mg",
        "reference_source": "NLEM 2022 (R06AX26), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00453",
        "medicine_id": "med-cat-0215",
        "strength": "30 mg/5 mL",
        "dosage_form": "Suspension",
        "route": "Oral",
        "composition": "Fexofenadine Hydrochloride 30 mg per 5 mL",
        "reference_source": "NLEM 2022 (R06AX26), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0216",
    "display_name": "Loratadine",
    "generic_name": "Loratadine",
    "active_ingredient": "Loratadine",
    "composition": "Loratadine 10 mg",
    "category": "Allergy and Immunology",
    "strength_form": "10 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Long-acting tricyclic peripheral histamine H1-antagonist for perennial allergic rhinitis and chronic dermatoses.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (R06AX13), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00454",
        "medicine_id": "med-cat-0216",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Loratadine 10 mg",
        "reference_source": "NLEM 2022 (R06AX13), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00455",
        "medicine_id": "med-cat-0216",
        "strength": "5 mg/5 mL",
        "dosage_form": "Syrup",
        "route": "Oral",
        "composition": "Loratadine 5 mg per 5 mL",
        "reference_source": "NLEM 2022 (R06AX13), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0217",
    "display_name": "Dexamethasone",
    "generic_name": "Dexamethasone",
    "active_ingredient": "Dexamethasone Sodium Phosphate",
    "composition": "Dexamethasone 0.5 mg",
    "category": "Allergy and Immunology",
    "strength_form": "0.5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Extremely potent long-acting glucocorticoid with minimal mineralocorticoid activity for severe anaphylaxis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (H02AB02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00456",
        "medicine_id": "med-cat-0217",
        "strength": "0.5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Dexamethasone 0.5 mg",
        "reference_source": "NLEM 2022 (H02AB02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00457",
        "medicine_id": "med-cat-0217",
        "strength": "4 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Dexamethasone 4 mg",
        "reference_source": "NLEM 2022 (H02AB02), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00458",
        "medicine_id": "med-cat-0217",
        "strength": "4 mg/mL",
        "dosage_form": "Injection",
        "route": "IV / IM",
        "composition": "Dexamethasone Sodium Phosphate eq. to 4 mg Dexamethasone Phosphate per mL (2 mL)",
        "reference_source": "NLEM 2022 (H02AB02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0218",
    "display_name": "Prednisolone",
    "generic_name": "Prednisolone",
    "active_ingredient": "Prednisolone",
    "composition": "Prednisolone 5 mg",
    "category": "Allergy and Immunology",
    "strength_form": "5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Intermediate-acting glucocorticoid for acute allergic conditions, severe asthma exacerbations, and autoimmune disorders.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (H02AB06), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00459",
        "medicine_id": "med-cat-0218",
        "strength": "5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Prednisolone 5 mg",
        "reference_source": "NLEM 2022 (H02AB06), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00460",
        "medicine_id": "med-cat-0218",
        "strength": "10 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Prednisolone 10 mg",
        "reference_source": "NLEM 2022 (H02AB06), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00461",
        "medicine_id": "med-cat-0218",
        "strength": "20 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Prednisolone 20 mg",
        "reference_source": "NLEM 2022 (H02AB06), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00462",
        "medicine_id": "med-cat-0218",
        "strength": "5 mg/5 mL",
        "dosage_form": "Oral Syrup",
        "route": "Oral",
        "composition": "Prednisolone 5 mg per 5 mL",
        "reference_source": "NLEM 2022 (H02AB06), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0219",
    "display_name": "Hydrocortisone",
    "generic_name": "Hydrocortisone",
    "active_ingredient": "Hydrocortisone Sodium Succinate",
    "composition": "Hydrocortisone Sodium Succinate equivalent to Hydrocortisone 100 mg",
    "category": "Allergy and Immunology",
    "strength_form": "100 mg Powder for Injection",
    "dosage_form": "Injection",
    "route": "IV / IM",
    "description": "Short-acting physiological glucocorticoid for acute adrenal insufficiency and emergency status asthmaticus.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (H02AB09), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00463",
        "medicine_id": "med-cat-0219",
        "strength": "100 mg",
        "dosage_form": "Powder for Injection",
        "route": "Intravenous / IM",
        "composition": "Hydrocortisone Sodium Succinate equivalent to Hydrocortisone 100 mg",
        "reference_source": "NLEM 2022 (H02AB09), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00464",
        "medicine_id": "med-cat-0219",
        "strength": "200 mg",
        "dosage_form": "Powder for Injection",
        "route": "Intravenous / IM",
        "composition": "Hydrocortisone Sodium Succinate equivalent to Hydrocortisone 200 mg",
        "reference_source": "NLEM 2022 (H02AB09), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0220",
    "display_name": "Nitrofurantoin",
    "generic_name": "Nitrofurantoin",
    "active_ingredient": "Nitrofurantoin",
    "composition": "Nitrofurantoin (Macrobid dual release) 100 mg",
    "category": "Urinary Tract Disorders",
    "strength_form": "100 mg Modified Release Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Bactericidal nitrofuran synthetic antibacterial concentrating in urine for acute uncomplicated cystitis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J01XE01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00465",
        "medicine_id": "med-cat-0220",
        "strength": "100 mg",
        "dosage_form": "Modified Release Capsule",
        "route": "Oral",
        "composition": "Nitrofurantoin (Macrobid dual release) 100 mg",
        "reference_source": "NLEM 2022 (J01XE01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00466",
        "medicine_id": "med-cat-0220",
        "strength": "50 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Nitrofurantoin 50 mg",
        "reference_source": "NLEM 2022 (J01XE01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0221",
    "display_name": "Norfloxacin",
    "generic_name": "Norfloxacin",
    "active_ingredient": "Norfloxacin",
    "composition": "Norfloxacin 400 mg",
    "category": "Urinary Tract Disorders",
    "strength_form": "400 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Synthetic broad-spectrum fluoroquinolone antibacterial primarily excreted renally for urinary tract sepsis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J01MA06), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00467",
        "medicine_id": "med-cat-0221",
        "strength": "400 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Norfloxacin 400 mg",
        "reference_source": "NLEM 2022 (J01MA06), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0222",
    "display_name": "Fosfomycin",
    "generic_name": "Fosfomycin",
    "active_ingredient": "Fosfomycin Trometamol",
    "composition": "Fosfomycin Trometamol equivalent to Fosfomycin 3 g",
    "category": "Urinary Tract Disorders",
    "strength_form": "3 g Sachet Granules for Oral Solution",
    "dosage_form": "Sachet",
    "route": "Oral",
    "description": "Single-dose bactericidal cell wall synthesis inhibitor for uncomplicated lower urinary tract infection.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (J01XX01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00468",
        "medicine_id": "med-cat-0222",
        "strength": "3 g Sachet",
        "dosage_form": "Granules for Oral Solution",
        "route": "Oral",
        "composition": "Fosfomycin Trometamol equivalent to Fosfomycin 3 g",
        "reference_source": "NLEM 2022 (J01XX01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0223",
    "display_name": "Potassium Citrate + Citric Acid",
    "generic_name": "Potassium Citrate + Citric Acid",
    "active_ingredient": "Potassium Citrate and Citric Acid Monohydrate",
    "composition": "Potassium Citrate 1100 mg + Citric Acid Monohydrate 334 mg per 5 mL (100 mL / 200 mL)",
    "category": "Urinary Tract Disorders",
    "strength_form": "1100 mg + 334 mg/5 mL Urinary Alkalinizer Liquid",
    "dosage_form": "Oral Solution",
    "route": "Oral",
    "description": "Systemic urinary alkalinizer reducing urinary uric acid and calcium oxalate precipitation in nephrolithiasis.",
    "combination_ingredients": "Potassium Citrate 1100 mg + Citric Acid 334 mg / 5 mL",
    "reference_source": "NLEM 2022 (G04BC), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00469",
        "medicine_id": "med-cat-0223",
        "strength": "1100 mg + 334 mg/5 mL",
        "dosage_form": "Urinary Alkalinizer Liquid",
        "route": "Oral",
        "composition": "Potassium Citrate 1100 mg + Citric Acid Monohydrate 334 mg per 5 mL (100 mL / 200 mL)",
        "reference_source": "NLEM 2022 (G04BC), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0224",
    "display_name": "Flavoxate",
    "generic_name": "Flavoxate",
    "active_ingredient": "Flavoxate Hydrochloride",
    "composition": "Flavoxate Hydrochloride 200 mg",
    "category": "Urinary Tract Disorders",
    "strength_form": "200 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Synthetic urinary tract antispasmodic counteracting detrusor hyperreflexia, dysuria, and urgency.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC G04BD02, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00470",
        "medicine_id": "med-cat-0224",
        "strength": "200 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Flavoxate Hydrochloride 200 mg",
        "reference_source": "WHO ATC G04BD02, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0225",
    "display_name": "Phenazopyridine",
    "generic_name": "Phenazopyridine",
    "active_ingredient": "Phenazopyridine Hydrochloride",
    "composition": "Phenazopyridine Hydrochloride 100 mg",
    "category": "Urinary Tract Disorders",
    "strength_form": "100 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Topical urinary analgesic acting directly on the urinary tract mucosa to relieve burning dysuria.",
    "combination_ingredients": null,
    "reference_source": "WHO ATC G04BX06, IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00471",
        "medicine_id": "med-cat-0225",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Phenazopyridine Hydrochloride 100 mg",
        "reference_source": "WHO ATC G04BX06, IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00472",
        "medicine_id": "med-cat-0225",
        "strength": "200 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Phenazopyridine Hydrochloride 200 mg",
        "reference_source": "WHO ATC G04BX06, IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0226",
    "display_name": "Alendronate Sodium",
    "generic_name": "Alendronate Sodium",
    "active_ingredient": "Alendronate Sodium Trihydrate",
    "composition": "Alendronate Sodium equivalent to Alendronic Acid 70 mg",
    "category": "Bone Health and Osteoporosis",
    "strength_form": "70 mg Once-Weekly Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Nitrogenous bisphosphonate binding bone hydroxyapatite and inhibiting farnesyl pyrophosphate synthase in osteoclasts.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (M05BA04), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00473",
        "medicine_id": "med-cat-0226",
        "strength": "70 mg",
        "dosage_form": "Once-Weekly Tablet",
        "route": "Oral",
        "composition": "Alendronate Sodium equivalent to Alendronic Acid 70 mg",
        "reference_source": "NLEM 2022 (M05BA04), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0227",
    "display_name": "Ibandronate Sodium",
    "generic_name": "Ibandronate Sodium",
    "active_ingredient": "Ibandronic Acid Monosodium",
    "composition": "Ibandronic Acid 150 mg",
    "category": "Bone Health and Osteoporosis",
    "strength_form": "150 mg Once-Monthly Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Third-generation amino-bisphosphonate for postmenopausal osteoporosis reduction of vertebral fracture risk.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (M05BA06), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00474",
        "medicine_id": "med-cat-0227",
        "strength": "150 mg",
        "dosage_form": "Once-Monthly Tablet",
        "route": "Oral",
        "composition": "Ibandronic Acid 150 mg",
        "reference_source": "NLEM 2022 (M05BA06), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00475",
        "medicine_id": "med-cat-0227",
        "strength": "3 mg/3 mL",
        "dosage_form": "IV Injection",
        "route": "Intravenous",
        "composition": "Ibandronate 1 mg per mL (3 mL prefilled syringe)",
        "reference_source": "NLEM 2022 (M05BA06), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0228",
    "display_name": "Zoledronic Acid",
    "generic_name": "Zoledronic Acid",
    "active_ingredient": "Zoledronic Acid Monohydrate",
    "composition": "Zoledronic Acid 4 mg per 5 mL vial",
    "category": "Bone Health and Osteoporosis",
    "strength_form": "4 mg/5 mL Infusion Concentrate",
    "dosage_form": "Injection",
    "route": "Intravenous",
    "description": "Most potent nitrogenous bisphosphonate administered once yearly for severe established osteoporosis and Paget disease.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (M05BA08), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00476",
        "medicine_id": "med-cat-0228",
        "strength": "4 mg/5 mL",
        "dosage_form": "Infusion Concentrate",
        "route": "Intravenous",
        "composition": "Zoledronic Acid 4 mg per 5 mL vial",
        "reference_source": "NLEM 2022 (M05BA08), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00477",
        "medicine_id": "med-cat-0228",
        "strength": "5 mg/100 mL",
        "dosage_form": "Ready-to-use IV Infusion",
        "route": "Intravenous",
        "composition": "Zoledronic Acid 5 mg per 100 mL bottle",
        "reference_source": "NLEM 2022 (M05BA08), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0229",
    "display_name": "Teriparatide",
    "generic_name": "Teriparatide",
    "active_ingredient": "Recombinant Human Parathyroid Hormone (1-34)",
    "composition": "Teriparatide 250 mcg/mL (20 mcg per actuation, 2.4 mL cartridge)",
    "category": "Bone Health and Osteoporosis",
    "strength_form": "20 mcg/dose Pre-filled Pen Injector",
    "dosage_form": "Injection",
    "route": "Subcutaneous",
    "description": "Anabolic bone-forming agent stimulating osteoblasts preferentially over osteoclasts in high-risk fractures.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (H05AA02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00478",
        "medicine_id": "med-cat-0229",
        "strength": "20 mcg/dose",
        "dosage_form": "Pre-filled Pen Injector",
        "route": "Subcutaneous",
        "composition": "Teriparatide 250 mcg/mL (20 mcg per actuation, 2.4 mL cartridge)",
        "reference_source": "NLEM 2022 (H05AA02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0230",
    "display_name": "Calcitriol",
    "generic_name": "Calcitriol",
    "active_ingredient": "1,25-Dihydroxycholecalciferol (Calcitriol)",
    "composition": "Calcitriol 0.25 mcg",
    "category": "Bone Health and Osteoporosis",
    "strength_form": "0.25 mcg Soft Gelatin Capsule",
    "dosage_form": "Capsule",
    "route": "Oral",
    "description": "Biologically active hormonal form of vitamin D3 promoting renal tubular and intestinal calcium resorption in renal osteodystrophy.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A11CC04), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00479",
        "medicine_id": "med-cat-0230",
        "strength": "0.25 mcg",
        "dosage_form": "Soft Gelatin Capsule",
        "route": "Oral",
        "composition": "Calcitriol 0.25 mcg",
        "reference_source": "NLEM 2022 (A11CC04), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00480",
        "medicine_id": "med-cat-0230",
        "strength": "0.5 mcg",
        "dosage_form": "Soft Gelatin Capsule",
        "route": "Oral",
        "composition": "Calcitriol 0.5 mcg",
        "reference_source": "NLEM 2022 (A11CC04), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0231",
    "display_name": "Raloxifene",
    "generic_name": "Raloxifene",
    "active_ingredient": "Raloxifene Hydrochloride",
    "composition": "Raloxifene Hydrochloride 60 mg",
    "category": "Bone Health and Osteoporosis",
    "strength_form": "60 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Second-generation selective estrogen receptor modulator maintaining bone density with antagonist effects on breast tissue.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (G03XC01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00481",
        "medicine_id": "med-cat-0231",
        "strength": "60 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Raloxifene Hydrochloride 60 mg",
        "reference_source": "NLEM 2022 (G03XC01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0232",
    "display_name": "Adrenaline",
    "generic_name": "Adrenaline",
    "active_ingredient": "Adrenaline (Epinephrine) Bitartrate",
    "composition": "Adrenaline Tartrate equivalent to 1 mg Adrenaline per mL (1 mL ampoule)",
    "category": "Emergency and Critical Care",
    "strength_form": "1 mg/mL Injection Ampoule (1:1000)",
    "dosage_form": "Injection",
    "route": "IM / IV / SC",
    "description": "Endogenous catecholamine alpha and beta agonist for emergency resuscitation in cardiac arrest and severe anaphylaxis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C01CA24), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00482",
        "medicine_id": "med-cat-0232",
        "strength": "1 mg/mL",
        "dosage_form": "Injection Ampoule (1:1000)",
        "route": "Intramuscular / IV",
        "composition": "Adrenaline Tartrate equivalent to 1 mg Adrenaline per mL (1 mL ampoule)",
        "reference_source": "NLEM 2022 (C01CA24), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0233",
    "display_name": "Atropine Sulfate",
    "generic_name": "Atropine Sulfate",
    "active_ingredient": "Atropine Sulfate Monohydrate",
    "composition": "Atropine Sulfate 0.6 mg per mL (1 mL)",
    "category": "Emergency and Critical Care",
    "strength_form": "0.6 mg/mL Injection Ampoule",
    "dosage_form": "Injection",
    "route": "IV / IM",
    "description": "Competitive muscarinic antagonist for emergency treatment of symptomatic hemodynamically unstable sinus bradycardia.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A03BA01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00483",
        "medicine_id": "med-cat-0233",
        "strength": "0.6 mg/mL",
        "dosage_form": "Injection Ampoule",
        "route": "Intravenous",
        "composition": "Atropine Sulfate 0.6 mg per mL (1 mL)",
        "reference_source": "NLEM 2022 (A03BA01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0234",
    "display_name": "Amiodarone",
    "generic_name": "Amiodarone",
    "active_ingredient": "Amiodarone Hydrochloride",
    "composition": "Amiodarone Hydrochloride 100 mg",
    "category": "Emergency and Critical Care",
    "strength_form": "100 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral / IV",
    "description": "Class III antiarrhythmic blocking potassium, sodium, and calcium channels in pulseless VT and VF.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C01BD01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00484",
        "medicine_id": "med-cat-0234",
        "strength": "100 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Amiodarone Hydrochloride 100 mg",
        "reference_source": "NLEM 2022 (C01BD01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00485",
        "medicine_id": "med-cat-0234",
        "strength": "200 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Amiodarone Hydrochloride 200 mg",
        "reference_source": "NLEM 2022 (C01BD01), IP",
        "is_prescription_required": true
      },
      {
        "id": "var-00486",
        "medicine_id": "med-cat-0234",
        "strength": "150 mg/3 mL",
        "dosage_form": "Injection Ampoule",
        "route": "Intravenous",
        "composition": "Amiodarone Hydrochloride 50 mg per mL (3 mL)",
        "reference_source": "NLEM 2022 (C01BD01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0235",
    "display_name": "Noradrenaline",
    "generic_name": "Noradrenaline",
    "active_ingredient": "Norepinephrine Bitartrate",
    "composition": "Norepinephrine Bitartrate equivalent to Norepinephrine 2 mg per mL",
    "category": "Emergency and Critical Care",
    "strength_form": "2 mg/mL IV Infusion Ampoule (4 mg/2 mL)",
    "dosage_form": "Injection",
    "route": "Intravenous",
    "description": "Potent peripheral alpha-1 vasoconstrictor and beta-1 inotrope for septic shock and persistent hypotension.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C01CA03), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00487",
        "medicine_id": "med-cat-0235",
        "strength": "2 mg/mL",
        "dosage_form": "IV Infusion Ampoule (4 mg/2 mL)",
        "route": "Intravenous",
        "composition": "Norepinephrine Bitartrate equivalent to Norepinephrine 2 mg per mL",
        "reference_source": "NLEM 2022 (C01CA03), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0236",
    "display_name": "Dopamine",
    "generic_name": "Dopamine",
    "active_ingredient": "Dopamine Hydrochloride",
    "composition": "Dopamine Hydrochloride 40 mg per mL (5 mL)",
    "category": "Emergency and Critical Care",
    "strength_form": "200 mg/5 mL Injection Ampoule",
    "dosage_form": "Injection",
    "route": "Intravenous",
    "description": "Inotropic sympathomimetic amine correcting hemodynamic imbalances in cardiogenic and distributive shock.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (C01CA04), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00488",
        "medicine_id": "med-cat-0236",
        "strength": "200 mg/5 mL",
        "dosage_form": "Injection Ampoule",
        "route": "Intravenous",
        "composition": "Dopamine Hydrochloride 40 mg per mL (5 mL)",
        "reference_source": "NLEM 2022 (C01CA04), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0237",
    "display_name": "Mannitol",
    "generic_name": "Mannitol",
    "active_ingredient": "Mannitol",
    "composition": "D-Mannitol 20 g per 100 mL (100 mL / 350 mL bottle)",
    "category": "Emergency and Critical Care",
    "strength_form": "20% w/v IV Infusion Bottle",
    "dosage_form": "Injection",
    "route": "Intravenous",
    "description": "Osmotic diuretic reducing dangerously elevated intracranial pressure (ICP) and cerebral edema.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (B05BC01), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00489",
        "medicine_id": "med-cat-0237",
        "strength": "20% w/v",
        "dosage_form": "IV Infusion Bottle",
        "route": "Intravenous",
        "composition": "D-Mannitol 20 g per 100 mL (100 mL / 350 mL bottle)",
        "reference_source": "NLEM 2022 (B05BC01), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0238",
    "display_name": "Naloxone",
    "generic_name": "Naloxone",
    "active_ingredient": "Naloxone Hydrochloride",
    "composition": "Naloxone Hydrochloride 0.4 mg per mL (1 mL)",
    "category": "Emergency and Critical Care",
    "strength_form": "0.4 mg/mL Injection Ampoule",
    "dosage_form": "Injection",
    "route": "IV / IM",
    "description": "Pure competitive opioid antagonist displacing opioids from mu receptors in acute narcotic overdose and respiratory depression.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (V03AB15), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00490",
        "medicine_id": "med-cat-0238",
        "strength": "0.4 mg/mL",
        "dosage_form": "Injection Ampoule",
        "route": "Intravenous / IM",
        "composition": "Naloxone Hydrochloride 0.4 mg per mL (1 mL)",
        "reference_source": "NLEM 2022 (V03AB15), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0239",
    "display_name": "Albendazole",
    "generic_name": "Albendazole",
    "active_ingredient": "Albendazole",
    "composition": "Albendazole 400 mg",
    "category": "General Medicines",
    "strength_form": "400 mg Chewable Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Broad-spectrum benzimidazole anthelmintic inhibiting tubulin polymerization in intestinal helminthiasis.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (P02CA03), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00491",
        "medicine_id": "med-cat-0239",
        "strength": "400 mg",
        "dosage_form": "Chewable Tablet",
        "route": "Oral",
        "composition": "Albendazole 400 mg",
        "reference_source": "NLEM 2022 (P02CA03), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00492",
        "medicine_id": "med-cat-0239",
        "strength": "200 mg/5 mL",
        "dosage_form": "Oral Suspension",
        "route": "Oral",
        "composition": "Albendazole 200 mg per 5 mL (10 mL)",
        "reference_source": "NLEM 2022 (P02CA03), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0240",
    "display_name": "Povidone-Iodine",
    "generic_name": "Povidone-Iodine",
    "active_ingredient": "Povidone-Iodine",
    "composition": "Povidone-Iodine 5% w/w (0.5% available iodine) (15 g / 250 g)",
    "category": "General Medicines",
    "strength_form": "5% w/w Antiseptic Ointment",
    "dosage_form": "Ointment",
    "route": "Topical",
    "description": "Topical antiseptic microbicide releasing free iodine for antisepsis of cuts, abrasions, and superficial wounds.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (D08AG02), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00493",
        "medicine_id": "med-cat-0240",
        "strength": "5% w/w",
        "dosage_form": "Antiseptic Ointment",
        "route": "Topical",
        "composition": "Povidone-Iodine 5% w/w (0.5% available iodine) (15 g / 250 g)",
        "reference_source": "NLEM 2022 (D08AG02), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00494",
        "medicine_id": "med-cat-0240",
        "strength": "10% w/v",
        "dosage_form": "Surgical Solution",
        "route": "Topical",
        "composition": "Povidone-Iodine 10% w/v (100 mL / 500 mL)",
        "reference_source": "NLEM 2022 (D08AG02), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0241",
    "display_name": "Hydrogen Peroxide",
    "generic_name": "Hydrogen Peroxide",
    "active_ingredient": "Hydrogen Peroxide",
    "composition": "Hydrogen Peroxide Solution 3% w/v (equivalent to 10-20 volumes oxygen, 100 mL)",
    "category": "General Medicines",
    "strength_form": "3% w/v (20 Vol) Topical Solution",
    "dosage_form": "Topical Solution",
    "route": "Topical",
    "description": "Oxidizing cleansing antiseptic producing effervescent mechanical debridement in infected wounds.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (D08AX01), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00495",
        "medicine_id": "med-cat-0241",
        "strength": "3% w/v (20 Vol)",
        "dosage_form": "Topical Solution",
        "route": "Topical",
        "composition": "Hydrogen Peroxide Solution 3% w/v (equivalent to 10-20 volumes oxygen, 100 mL)",
        "reference_source": "NLEM 2022 (D08AX01), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0242",
    "display_name": "Lindane",
    "generic_name": "Lindane",
    "active_ingredient": "Gamma Benzene Hexachloride (Lindane)",
    "composition": "Gamma Benzene Hexachloride 1% w/v (100 mL)",
    "category": "General Medicines",
    "strength_form": "1% w/v Topical Lotion",
    "dosage_form": "Lotion",
    "route": "Topical",
    "description": "Chlorinated hydrocarbon ectoparasiticide for second-line management of scabies infestation.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (P03AB02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00496",
        "medicine_id": "med-cat-0242",
        "strength": "1% w/v",
        "dosage_form": "Topical Lotion",
        "route": "Topical",
        "composition": "Gamma Benzene Hexachloride 1% w/v (100 mL)",
        "reference_source": "NLEM 2022 (P03AB02), IP",
        "is_prescription_required": true
      }
    ]
  },
  {
    "id": "med-cat-0243",
    "display_name": "Senna Extract",
    "generic_name": "Senna Extract",
    "active_ingredient": "Standardized Calcium Sennosides",
    "composition": "Calcium Sennosides equivalent to Sennosides A & B 7.5 mg",
    "category": "General Medicines",
    "strength_form": "7.5 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "Stimulant anthraquinone laxative hydrolysed by gut flora to rheinanthrone, increasing peristalsis in acute constipation.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A06AB06), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00497",
        "medicine_id": "med-cat-0243",
        "strength": "7.5 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Calcium Sennosides equivalent to Sennosides A & B 7.5 mg",
        "reference_source": "NLEM 2022 (A06AB06), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00498",
        "medicine_id": "med-cat-0243",
        "strength": "15 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Calcium Sennosides equivalent to Sennosides A & B 15 mg",
        "reference_source": "NLEM 2022 (A06AB06), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0244",
    "display_name": "Activated Charcoal",
    "generic_name": "Activated Charcoal",
    "active_ingredient": "Medicinal Activated Charcoal",
    "composition": "Activated Charcoal 250 mg",
    "category": "General Medicines",
    "strength_form": "250 mg Tablet",
    "dosage_form": "Tablet",
    "route": "Oral",
    "description": "High surface area porous carbon adsorbent trapping toxic ingestions and poisonings in the GI tract.",
    "combination_ingredients": null,
    "reference_source": "NLEM 2022 (A07BA01), IP",
    "is_prescription_required": false,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00499",
        "medicine_id": "med-cat-0244",
        "strength": "250 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Activated Charcoal 250 mg",
        "reference_source": "NLEM 2022 (A07BA01), IP",
        "is_prescription_required": false
      },
      {
        "id": "var-00500",
        "medicine_id": "med-cat-0244",
        "strength": "500 mg",
        "dosage_form": "Tablet",
        "route": "Oral",
        "composition": "Activated Charcoal 500 mg",
        "reference_source": "NLEM 2022 (A07BA01), IP",
        "is_prescription_required": false
      }
    ]
  },
  {
    "id": "med-cat-0245",
    "display_name": "Dextrose 5% in Normal Saline",
    "generic_name": "Dextrose 5% in Normal Saline",
    "active_ingredient": "Dextrose (Glucose) and Sodium Chloride",
    "composition": "Dextrose Anhydrous 50 g/L with Sodium Chloride 9 g/L (500 mL IV bottle)",
    "category": "General Medicines",
    "strength_form": "5% + 0.9% w/v IV Infusion Fluid (500 mL)",
    "dosage_form": "IV Infusion",
    "route": "Intravenous",
    "description": "Parenteral fluid replenishing carbohydrate calories and extracellular sodium and chloride deficits.",
    "combination_ingredients": "Dextrose 5% w/v + Sodium Chloride 0.9% w/v",
    "reference_source": "NLEM 2022 (B05BB02), IP",
    "is_prescription_required": true,
    "catalogue_status": "ACTIVE",
    "created_at": "2026-01-01T00:00:00.000Z",
    "variants": [
      {
        "id": "var-00501",
        "medicine_id": "med-cat-0245",
        "strength": "5% + 0.9% w/v",
        "dosage_form": "IV Infusion Fluid (500 mL)",
        "route": "Intravenous",
        "composition": "Dextrose Anhydrous 50 g/L with Sodium Chloride 9 g/L (500 mL IV bottle)",
        "reference_source": "NLEM 2022 (B05BB02), IP",
        "is_prescription_required": true
      }
    ]
  }
];

/**
 * FEATURE 3: Case-Insensitive and Spelling-Exact Search
 * - Ignore uppercase and lowercase differences
 * - Trim unnecessary spaces at the beginning and end
 * - Exact spelling ONLY: No fuzzy matching, no automatic typo correction
 * - E.g. "paracetamol", "PARACETAMOL", "Paracetamol" match Paracetamol
 * - E.g. "paracetmol", "metfornin" return ZERO results
 */
export function searchCatalogMedicines(query: string, categoryFilter?: string): Medicine[] {
  const trimmed = query.trim().toLowerCase();
  
  let list = PREDEFINED_MEDICINES;
  if (categoryFilter && categoryFilter.trim() && categoryFilter !== 'All Categories') {
    const normCat = categoryFilter.trim().toLowerCase();
    list = list.filter(m => m.category.toLowerCase() === normCat);
  }

  if (!trimmed) {
    return list;
  }

  return list.filter(m => {
    const normGeneric = m.generic_name.trim().toLowerCase();
    const normDisplay = m.display_name.trim().toLowerCase();
    const normActive = (m.active_ingredient || '').trim().toLowerCase();
    const normCat = m.category.trim().toLowerCase();

    // Exact match on generic name, display name, active ingredient, or category
    if (
      normGeneric === trimmed ||
      normDisplay === trimmed ||
      normActive === trimmed ||
      normCat === trimmed
    ) {
      return true;
    }

    // Exact match on variant formulation (e.g. "Paracetamol 500 mg" or "Paracetamol 500 mg Tablet")
    if (m.variants && m.variants.length > 0) {
      return m.variants.some(v => {
        const withStrength = `${normGeneric} ${v.strength.toLowerCase()}`;
        const withForm = `${normGeneric} ${v.strength.toLowerCase()} ${v.dosage_form.toLowerCase()}`;
        return withStrength === trimmed || withForm === trimmed;
      });
    }

    return false;
  });
}

/**
 * Retrieve all medicines in a specific therapeutic category
 */
export function getMedicinesByCategory(categoryName: string): Medicine[] {
  const normCat = categoryName.trim().toLowerCase();
  return PREDEFINED_MEDICINES.filter(m => m.category.toLowerCase() === normCat);
}

/**
 * Resolves a disease search term (e.g. "BP", "Sugar", "Diabetes", "Heart", "Fever", "Pain")
 * or category name to matching therapeutic categories and their medicines.
 */
export function getMedicinesForDiseaseOrCategory(keywordOrCategory: string): {
  categoryName: string;
  medicines: Medicine[];
} | null {
  const norm = (keywordOrCategory || '').trim().toLowerCase();
  if (!norm) return null;

  // Direct category match
  const exactCat = THERAPEUTIC_CATEGORIES.find(c => c.name.toLowerCase() === norm);
  if (exactCat) {
    return {
      categoryName: exactCat.name,
      medicines: getMedicinesByCategory(exactCat.name),
    };
  }

  // Common aliases and disease terms
  if (norm === 'bp' || norm === 'blood pressure' || norm === 'hypertension') {
    const cat = THERAPEUTIC_CATEGORIES.find(c => c.name.includes('Blood Pressure'))!;
    return { categoryName: cat.name, medicines: getMedicinesByCategory(cat.name) };
  }
  if (norm === 'sugar' || norm === 'diabetes' || norm === 'blood sugar') {
    const cat = THERAPEUTIC_CATEGORIES.find(c => c.name.includes('Diabetes'))!;
    return { categoryName: cat.name, medicines: getMedicinesByCategory(cat.name) };
  }
  if (norm === 'heart' || norm === 'cardiac' || norm === 'heart attack') {
    const cat = THERAPEUTIC_CATEGORIES.find(c => c.name.includes('Heart Diseases')) || THERAPEUTIC_CATEGORIES[2];
    return { categoryName: cat.name, medicines: getMedicinesByCategory(cat.name) };
  }
  if (norm === 'fever' || norm === 'temperature' || norm === 'pyrexia') {
    const cat = THERAPEUTIC_CATEGORIES.find(c => c.name.includes('Fever'))!;
    return { categoryName: cat.name, medicines: getMedicinesByCategory(cat.name) };
  }
  if (norm === 'pain' || norm === 'pain relief' || norm === 'body pain' || norm === 'headache') {
    const cat = THERAPEUTIC_CATEGORIES.find(c => c.name.includes('Pain Relief'))!;
    return { categoryName: cat.name, medicines: getMedicinesByCategory(cat.name) };
  }
  if (norm === 'cold' || norm === 'cough' || norm === 'cold and cough') {
    const cat = THERAPEUTIC_CATEGORIES.find(c => c.name.includes('Cold and Cough'))!;
    return { categoryName: cat.name, medicines: getMedicinesByCategory(cat.name) };
  }
  if (norm === 'asthma' || norm === 'copd' || norm === 'breathing') {
    const cat = THERAPEUTIC_CATEGORIES.find(c => c.name.includes('Asthma and COPD'))!;
    return { categoryName: cat.name, medicines: getMedicinesByCategory(cat.name) };
  }
  if (norm === 'thyroid') {
    const cat = THERAPEUTIC_CATEGORIES.find(c => c.name.includes('Thyroid Disorders'))!;
    return { categoryName: cat.name, medicines: getMedicinesByCategory(cat.name) };
  }
  if (norm === 'acidity' || norm === 'gastric' || norm === 'gas') {
    const cat = THERAPEUTIC_CATEGORIES.find(c => c.name.includes('Gastric Problems and Acidity'))!;
    return { categoryName: cat.name, medicines: getMedicinesByCategory(cat.name) };
  }
  if (norm === 'kidney') {
    const cat = THERAPEUTIC_CATEGORIES.find(c => c.name.includes('Kidney Diseases'))!;
    return { categoryName: cat.name, medicines: getMedicinesByCategory(cat.name) };
  }
  if (norm === 'liver') {
    const cat = THERAPEUTIC_CATEGORIES.find(c => c.name.includes('Liver Diseases'))!;
    return { categoryName: cat.name, medicines: getMedicinesByCategory(cat.name) };
  }
  if (norm === 'skin') {
    const cat = THERAPEUTIC_CATEGORIES.find(c => c.name.includes('Skin Diseases'))!;
    return { categoryName: cat.name, medicines: getMedicinesByCategory(cat.name) };
  }
  if (norm === 'eye') {
    const cat = THERAPEUTIC_CATEGORIES.find(c => c.name.includes('Eye Diseases'))!;
    return { categoryName: cat.name, medicines: getMedicinesByCategory(cat.name) };
  }

  // Partial match against category names
  const partialCat = THERAPEUTIC_CATEGORIES.find(c => c.name.toLowerCase().includes(norm));
  if (partialCat) {
    return { categoryName: partialCat.name, medicines: getMedicinesByCategory(partialCat.name) };
  }

  return null;
}

/**
 * Compute counts of catalog medicines per category
 */
export function getCategoryCounts(medicines: Medicine[] = PREDEFINED_MEDICINES): Record<string, number> {
  const counts: Record<string, number> = {};
  THERAPEUTIC_CATEGORIES.forEach(c => {
    counts[c.name] = 0;
  });
  medicines.forEach(m => {
    if (counts[m.category] !== undefined) {
      counts[m.category]++;
    } else {
      const matched = THERAPEUTIC_CATEGORIES.find(c => 
        c.name.toLowerCase() === m.category.toLowerCase() ||
        c.name.toLowerCase().includes(m.category.toLowerCase()) ||
        m.category.toLowerCase().includes(c.name.toLowerCase())
      );
      if (matched) {
        counts[matched.name]++;
      } else {
        counts[m.category] = (counts[m.category] || 0) + 1;
      }
    }
  });
  return counts;
}
