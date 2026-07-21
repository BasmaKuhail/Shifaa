import Image, { StaticImageData } from "next/image";

export type PharmacyNetworkFeatureItem = {
  icon: StaticImageData;
  title: string;
  description: string;
};

export default function PharmacyNetworkFeature({
  icon,
  title,
  description,
}: PharmacyNetworkFeatureItem) {
  return (
    <article className="flex min-w-0 flex-1 items-center gap-4 px-4 py-2 text-right sm:px-6">
      <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-blue-100">
        <Image src={icon} alt="" width={30} height={30} className=" w-auto" />
      </div>
      <div className="min-w-0">
        <h3 className="text-btn font-bold text-black-600">{title}</h3>
        <p className="mt-1 text-inpt leading-5 text-black-500">{description}</p>
      </div>
    </article>
  );
}
