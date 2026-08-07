"use client";

import Input from "@/components/register/input";
import Card from "../PharmacyInfo/CardContainer";
import PetrolBtn from "../PharmacyInfo/invitePopup/PetrolBtn";
import Dropdown from "../addMedicine/DropDownInput";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import {
  getMedicineDetails,
  Medicine,
} from "@/services/medication";
import { showAlert } from "@/components/alerts/AlertContainer";
import Image from "next/image";
import ArrowRight from "@/public/icons/error/arrowRight";

const initialMedicineData: Medicine = {
  id: 0,
  scientific_name: "",
  trade_name: "",
  dosage_form: "",
  strength: "",
  price: null,
  medication_photo: null,
};

export default function MedDetails() {
  const router = useRouter();

  const [medicineData, setMedicineData] =
    useState<Medicine>(initialMedicineData);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadedMedicineRef = useRef<string | null>(null);
  const [imageSource, setImageSource] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const medicineId = Number(router.query.id);
    const pharmacyId = Number(router.query.pharmacy_id);

    const hasInvalidParams =
      !Number.isInteger(medicineId) ||
      medicineId <= 0 ||
      !Number.isInteger(pharmacyId) ||
      pharmacyId <= 0;

    if (hasInvalidParams) {
      setHasError(true);
      setIsLoading(false);

      showAlert({
        type: "Error",
        title: "خطأ",
        message: "بيانات الدواء أو الصيدلية غير صالحة",
      });

      return;
    }

    const requestKey = `${pharmacyId}-${medicineId}`;

    if (loadedMedicineRef.current === requestKey) {
      return;
    }

    loadedMedicineRef.current = requestKey;

    const fetchMedicineDetails = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const medicine = await getMedicineDetails(
          pharmacyId,
          medicineId,
        );
        setImageSource(medicine?.medication_photo || null)
        if (!medicine) {
          loadedMedicineRef.current = null;
          setHasError(true);

          showAlert({
            type: "Error",
            title: "خطأ",
            message: "لم يتم العثور على الدواء",
          });

          return;
        }

        setMedicineData(medicine);
      } catch (error) {
        console.error(
          "Failed to load medicine details:",
          error,
        );

        loadedMedicineRef.current = null;
        setHasError(true);

        showAlert({
          type: "Error",
          title: "خطأ",
          message: "لم نتمكن من تحميل بيانات الدواء",
        });
      } finally {
        setIsLoading(false);
      }
    };

    void fetchMedicineDetails();
  }, [
    router.isReady,
    router.query.id,
    router.query.pharmacy_id,
  ]);

  const handleDeleteMedicine = async () => {
    console.log("Delete medicine:", medicineData.id);
  };

  if (isLoading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-64 w-full items-center justify-center"
      >
        <p className="text-black-500">
          جاري تحميل بيانات الدواء...
        </p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div
        dir="rtl"
        className="flex min-h-64 w-full items-center justify-center"
      >
        <p className="text-black-500">
          تعذر عرض بيانات الدواء
        </p>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="mb-40 mt-13 flex w-full flex-col gap-10"
    >
      <div className="flex flex-row items-center gap-5 cursor-pointer ">
        <div onClick={() => router.push("/pharmacy-dashboard/my-medicines")}><ArrowRight className="text-black hover:text-blue-1000" /></div>
        
        <h1 className="text-27px font-semibold">
          بيانات الدواء
        </h1>
      </div>


      <Card title="معلومات الدواء">
        <div className="flex w-full flex-col px-10">
          <div className="text-inpt text-black-500">
            <Dropdown
              label="الاسم العلمي"
              placeholder=""
              value={String(medicineData.id)}
              options={[
                {
                  label: medicineData.scientific_name,
                  value: String(medicineData.id),
                },
              ]}
              onChange={() => undefined}
              isTrue={Boolean(medicineData.scientific_name)}
              editable={false}
            />

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="الاسم التجاري"
                type="text"
                inputText="الاسم التجاري"
                value={medicineData.trade_name}
                onChange={() => undefined}
                isTrue={Boolean(medicineData.trade_name)}
                errorMsg=""
                editable={false}
              />

              <Input
                label="الشكل"
                type="text"
                inputText="الشكل الدوائي"
                value={medicineData.dosage_form}
                onChange={() => undefined}
                isTrue={Boolean(medicineData.dosage_form)}
                errorMsg=""
                editable={false}
              />

              <Input
                label="التركيز"
                type="text"
                inputText="التركيز"
                value={medicineData.strength ?? ""}
                onChange={() => undefined}
                isTrue={Boolean(medicineData.strength)}
                errorMsg=""
                editable={false}
              />

              <Input
                label="السعر"
                type="number"
                inputText="السعر"
                value={
                  medicineData.price !== null
                    ? String(medicineData.price)
                    : ""
                }
                onChange={() => undefined}
                isTrue={
                  medicineData.price !== null &&
                  medicineData.price > 0
                }
                errorMsg=""
                editable={false}
              />
            </div>

            {medicineData.medication_photo && 
            <div className="mt-3 flex flex-col gap-2">
              <label className="text-right text-sm font-bold">
                صورة الدواء
              </label>
              {imageSource ? (
                <Image
                  src={imageSource}
                  alt="medicine photo"
                  width={400}
                  height={400}
                  className="rounded-[14px] border"
                />
              ) : <p>لا توجد صورة لهذا الدواء</p>}
              
            </div>}
          </div>
        </div>
      </Card>

      <div className="flex flex-row gap-5">
        <PetrolBtn
          text="حذف الدواء"
          onClick={handleDeleteMedicine}
        />
      </div>
    </div>
  );
}
