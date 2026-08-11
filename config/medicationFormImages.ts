type DosageFormImageRule = {
  image: string;
  matches: string[];
};

const dosageFormImageRules: DosageFormImageRule[] = [
  {
    image: "/icons/medForms/Cream Ointment Gel Eye Ointment Eye Gel .svg",
    matches: ["cream", "ointment", "eye gel", "gel"],
  },
  {
    image: "/icons/medForms/Eye Drops Contact Lens Solution.svg",
    matches: ["eye drops contact lens solution", "contact lens solution"],
  },
  {
    image: "/icons/medForms/Softgel Capsule.svg",
    matches: ["softgel", "soft gel"],
  },
  {
    image: "/icons/medForms/Injection Prefilled Syringe .svg",
    matches: ["injection", "prefilled syringe"],
  },
  {
    image: "/icons/medForms/Syrup Oral Liquid .svg",
    matches: ["syrup", "oral liquid"],
  },
  {
    image: "/icons/medForms/PowderGranules.svg",
    matches: ["powder", "granule"],
  },
  {
    image: "/icons/medForms/Suppository Vaginal Ovule.svg",
    matches: ["suppository", "vaginal ovule", "ovule"],
  },
  {
    image: "/icons/medForms/Topical Solution Mouth wash .svg",
    matches: ["topical solution mouth wash", "mouth wash"],
  },
  {
    image: "/icons/medForms/Oral Drops Ear Drops.svg",
    matches: ["oral drop", "ear drop"],
  },
  {
    image: "/icons/medForms/Nasal Drops .svg",
    matches: ["nasal drop"],
  },
  {
    image: "/icons/medForms/Nasal Spray.svg",
    matches: ["nasal spray"],
  },
  {
    image: "/icons/medForms/Eye Drops .svg",
    matches: ["eye drop"],
  },
  {
    image: "/icons/medForms/Topical Solution .svg",
    matches: ["topical solution"],
  },
  {
    image: "/icons/medForms/Vaginal Tablet.svg",
    matches: ["vaginal tablet"],
  },
  {
    image: "/icons/medForms/Capsule.svg",
    matches: ["capsule"],
  },
  {
    image: "/icons/medForms/Ampoule.svg",
    matches: ["ampoule", "ampule"],
  },
  {
    image: "/icons/medForms/Inhaler.svg",
    matches: ["inhaler"],
  },
  {
    image: "/icons/medForms/Infusion.svg",
    matches: ["infusion"],
  },
  {
    image: "/icons/medForms/Intrauterine Device .svg",
    matches: ["intrauterine device", "intra uterine device"],
  },
  {
    image: "/icons/medForms/Medical Gauze .svg",
    matches: ["medical gauze", "gauze"],
  },
  {
    image: "/icons/medForms/Medical Implant .svg",
    matches: ["medical implant", "implant"],
  },
  {
    image: "/icons/medForms/Lotion Shampoo .svg",
    matches: ["lotion shampoo", "shampoo"],
  },
  {
    image: "/icons/medForms/Lotion.svg",
    matches: ["lotion"],
  },
  {
    image: "/icons/medForms/Lozenge.svg",
    matches: ["lozenge"],
  },
  {
    image: "/icons/medForms/Patch Plaster.svg",
    matches: ["patch plaster", "plaster", "patch"],
  },
  {
    image: "/icons/medForms/Sachet.svg",
    matches: ["sachet"],
  },
  {
    image: "/icons/medForms/Spray Aerosol .svg",
    matches: ["spray aerosol", "aerosol"],
  },
  {
    image: "/icons/medForms/Spray .svg",
    matches: ["spray"],
  },
  {
    image: "/icons/medForms/Tablet.svg",
    matches: ["tablet"],
  },
  {
    image: "/icons/medForms/Vial.svg",
    matches: ["vial"],
  },
  {
    image: "/icons/medForms/Emulsion.svg",
    matches: ["emulsion"],
  },
  {
    image: "/icons/medForms/Enema.svg",
    matches: ["enema"],
  },
];

const normalizeDosageForm = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const normalizedDosageFormImageRules = dosageFormImageRules.map((rule) => ({
  ...rule,
  matches: rule.matches.map(normalizeDosageForm),
}));

export const getDosageFormImage = (dosageForm?: string | null) => {
  const normalizedDosageForm = normalizeDosageForm(dosageForm ?? "");

  return (
    normalizedDosageFormImageRules.find(({ matches }) =>
      matches.some((match) => normalizedDosageForm.includes(match)),
    )?.image ?? "/icons/medForms/no image.svg"
  );
};
