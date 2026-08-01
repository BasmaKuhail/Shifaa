"use client";
import Input from "@/components/register/input";
import EmptyPetrolBtn from "@/components/adminDashboard/requests/EpmtyPetrolBtn";
import Card from "../PharmacyInfo/CardContainer";
import PetrolBtn from "../PharmacyInfo/invitePopup/PetrolBtn";
import Dropdown from "./DropDownInput";
import AddImage from "./AddImage";

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
    // addMed,
  addMedicine,
  getMedicines,
  Medicine,
} from "@/services/medication";
import { showAlert } from "@/components/alerts/AlertContainer";
import { ApplicationFile } from "@/types/PharmacistApplication";
import { PharmacyContext } from "@/contexts/PharmacyDataContext";

export type MedicineFormData = {
    id:number,
  scientific_name: string;
  trade_name: string;
  dosage_form: string;
  strength: string;
  price: string;
  image?: ApplicationFile
};

const initialMedicineData: MedicineFormData = {
  id: 0,
  scientific_name: "",
  trade_name: "",
  dosage_form: "",
  strength: "",
  price: "",
};

const SEARCH_DEBOUNCE_MS = 500;

export default function AddMed() {
  const {pharmacy, loading} = useContext(PharmacyContext);

  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [selectedMedicineId, setSelectedMedicineId] = useState("");
  const [medicineData, setMedicineData] = useState<MedicineFormData>(initialMedicineData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingMedicines, setIsLoadingMedicines] = useState(false);
  const [medicinesError, setMedicinesError] = useState("");

  const latestRequestIdRef = useRef(0);

  const fetchMedicines = useCallback(async (search: string) => {
      const requestId = ++latestRequestIdRef.current;

      setIsLoadingMedicines(true);
      setMedicinesError("");

      try {
        const response = await getMedicines({
          page: 1,
          perPage: 50,
          search,
        });

        // Ignore a response if a newer request was started.
        if (
          requestId !== latestRequestIdRef.current
        ) {
          return;
        }

        setMedicines(response.data);
      } catch (error) {
        if (
          requestId !== latestRequestIdRef.current
        ) {
          return;
        }

        console.error(
          "Failed to load medicines:",
          error,
        );

        setMedicines([]);
        setMedicinesError(
          "تعذر تحميل قائمة الأدوية",
        );
      } finally {
        if (
          requestId === latestRequestIdRef.current
        ) {
          setIsLoadingMedicines(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchMedicines(searchQuery);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchQuery, fetchMedicines]);

  const availableMedicines = useMemo(() => {
    if (!selectedMedicine) {
      return medicines;
    }

    const selectedMedicineExists = medicines.some(
      (medicine) =>
        medicine.id === selectedMedicine.id,
    );

    if (selectedMedicineExists) {
      return medicines;
    }

    return [selectedMedicine, ...medicines];
  }, [medicines, selectedMedicine]);

  const scientificNameOptions = useMemo(
    () =>
      availableMedicines.map((medicine) => ({
        // Including more details avoids multiple identical
        label: [
          medicine.scientific_name,
        //   medicine.trade_name,
          medicine.strength,
          medicine.dosage_form,
        ]
          .filter(Boolean)
          .join(" - "),
        value: String(medicine.id),
      })),
    [availableMedicines],
  );

  const handleMedicineChange = (
    medicineId: string,
  ) => {
    const selected =
      availableMedicines.find(
        (medicine) =>
          String(medicine.id) === medicineId,
      ) ?? null;

    if (!selected) {
      setSelectedMedicineId("");
      setSelectedMedicine(null);
      setMedicineData(initialMedicineData);
      return;
    }

    setSelectedMedicineId(medicineId);
    setSelectedMedicine(selected);

    setMedicineData({
        id:selected.id,
      scientific_name: selected.scientific_name,
      trade_name: selected.trade_name,
      dosage_form: selected.dosage_form,
      strength: selected.strength ?? "",
      price: "",
    });
  };

  const handleFieldChange = (
    field: keyof MedicineFormData,
    value: string,
  ) => {
    setMedicineData((previousData) => ({
      ...previousData,
      [field]: value,
    }));
  };

  const createStringChangeHandler =
    (field: keyof MedicineFormData) =>
    (value: string | File | null) => {
      if (typeof value === "string") {
        handleFieldChange(field, value);
      }
    };

  const handleReset = () => {
    latestRequestIdRef.current += 1;

    setSelectedMedicineId("");
    setSelectedMedicine(null);
    setMedicineData(initialMedicineData);
    setSearchQuery("");
    setMedicinesError("");

    void fetchMedicines("");
  };

const handleSubmit = async () => {
    if(medicineData.scientific_name === "" || 
        medicineData.trade_name === "" || 
        medicineData.dosage_form === "" ||
        medicineData.price=== "" ||
        medicineData.strength === ""
    ){
        showAlert({
            type:"Hint",
            title:"تلميح",
            message:"الرجاء تعبئة جميع الحقول المطلوبة"

        })
        return }
  const globalMedicineId = Number(selectedMedicineId);
  const price = Number(medicineData.price);

  if (
    !Number.isInteger(globalMedicineId) ||
    globalMedicineId <= 0
  ) {
    setMedicinesError("يرجى اختيار الدواء");
    return;
  }

  if (!Number.isFinite(price) || price <= 0) {
    showAlert({
            type:"Hint",
            title:"تلميح",
            message:"السعر يجب ان يكون عدد موجب"

        })
    return;
  }
 if(!loading && pharmacy){
    try {
    const response = await addMedicine({
      pharmacyId: pharmacy?.id,
      medicine: {
        global_medicine_id: globalMedicineId,
        price,
      },
    });

    console.log(response);

    setSelectedMedicineId("");
    setSelectedMedicine(null);
    setMedicineData(initialMedicineData);
    showAlert({
            type:"Success",
            title:"تجح!",
            message:"تم اضافة الدواء بنجاح!"

        })
  } catch (error) {
    console.error("Failed to add medicine:", error);
    // showAlert({
    //         type:"Error",
    //         title:"خطأ!",
    //         message:error.message || "حدث خطأ"

    //     })
  }
 }else{
    showAlert({
        type:"Error",
        title:"خطأ",
        message:"تعذر ايجاد الصيدلية!"
    })
 }
  
};

  return (
    <div
      dir="rtl"
      className="mt-13 mb-40 flex w-full flex-col gap-10"
    >
      <p className="text-27px font-semibold">
        إضافة دواء
      </p>

      <Card title="معلومات الدواء الأساسية">
        <div className="flex w-full flex-col px-10">
          <div className="text-inpt text-black-500">
            <Dropdown
              label="الاسم العلمي"
              placeholder="ابحث عن الاسم العلمي"
              value={selectedMedicineId}
              options={scientificNameOptions}
              onChange={handleMedicineChange}
              onSearchChange={setSearchQuery}
              isTrue={Boolean(selectedMedicineId)}
              editable
              loading={isLoadingMedicines}
              errorMsg={medicinesError}
              noResultsText="لا توجد أدوية مطابقة"
            />

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="الاسم التجاري"
                type="text"
                inputText="الاسم التجاري"
                value={medicineData.trade_name}
                onChange={createStringChangeHandler(
                  "trade_name",
                )}
                isTrue={Boolean(
                  medicineData.trade_name,
                )}
                errorMsg=""
                editable={Boolean(
                  medicineData.scientific_name,
                )}
              />

              <Input
                label="الشكل"
                type="text"
                inputText="الشكل الدوائي"
                value={medicineData.dosage_form}
                onChange={createStringChangeHandler(
                  "dosage_form",
                )}
                isTrue={Boolean(
                  medicineData.dosage_form,
                )}
                editable={Boolean(
                  medicineData.scientific_name,
                )}
                errorMsg=""
              />

              <Input
                label="التركيز"
                type="text"
                inputText="التركيز"
                value={medicineData.strength}
                onChange={createStringChangeHandler(
                  "strength",
                )}
                isTrue={Boolean(
                  medicineData.strength,
                )}
                editable={Boolean(
                  medicineData.scientific_name,
                )}
                errorMsg=""
              />

              <Input
                label="السعر"
                type="number"
                inputText="أدخل السعر"
                value={medicineData.price}
                onChange={createStringChangeHandler(
                  "price",
                )}
                isTrue={Boolean(medicineData.price)}
                editable={Boolean(
                  selectedMedicineId,
                )}
                errorMsg=""
              />

              
            </div>
            <div className="flex flex-col gap-2 mt-3">
                <label className="text-sm font-bold text-right">صورة الدواء (اختياري)</label>
            <p className="text-inpt text-black-500">
            ملاحظة: تقبل أنواع الصور التالية: png,
            jpeg, jpg
          </p>
          <AddImage label="صورة 1" /></div>
          </div>
        </div>
      </Card>

      <div className="flex flex-row gap-5">
        <PetrolBtn
          text="إضافة"
          onClick={handleSubmit}
        />

        <EmptyPetrolBtn
          text="إلغاء"
          onClick={handleReset}
        />
      </div>
    </div>
  );
}