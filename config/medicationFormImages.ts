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
    image: "/icons/medForms/Oral Drops Ear Drops.svg",
    matches: ["oral drop", "ear drop"],
  },
  {
    image: "/icons/medForms/Nasal Drops .svg",
    matches: ["nasal drop"],
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
    image: "/icons/medForms/Lotion.svg",
    matches: ["lotion"],
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
];

const normalizeDosageForm = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export const getDosageFormImage = (dosageForm?: string | null) => {
  const normalizedDosageForm = normalizeDosageForm(dosageForm ?? "");

  return (
    dosageFormImageRules.find(({ matches }) =>
      matches.some((match) => normalizedDosageForm.includes(match)),
    )?.image ?? "/icons/medForms/no image.svg"
  );
};
