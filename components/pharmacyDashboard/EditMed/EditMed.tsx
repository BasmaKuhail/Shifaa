"use client";

import Input from "@/components/register/input";
import EmptyPetrolBtn from "@/components/adminDashboard/requests/EpmtyPetrolBtn";
import Card from "../PharmacyInfo/CardContainer";
import PetrolBtn from "../PharmacyInfo/invitePopup/PetrolBtn";
import Dropdown from "../addMedicine/DropDownInput";
import AddImage from "../addMedicine/AddImage";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";

import {
  editMedicine,
  getMedicineDetails,
  Medicine,
} from "@/services/medication";

import { showAlert } from "@/components/alerts/AlertContainer";
import { getDosageFormImage } from "@/config/medicationFormImages";

type MedicineFormData = Omit<
  Medicine,
  "medication_photo"
> & {
  medication_photo: string | File | null;
};

type EditableMedicineField =
  | "trade_name"
  | "dosage_form"
  | "strength";

const initialMedicineData: MedicineFormData = {
  id: 0,
  scientific_name: "",
  trade_name: "",
  dosage_form: "",
  strength: "",
  price: null,
  medication_photo: null,
  is_available: false,
};

export default function EditMed() {
  const router = useRouter();

  const [medicineData, setMedicineData] =
    useState<MedicineFormData>(initialMedicineData);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [hasError, setHasError] =
    useState(false);

  const loadedMedicineRef =
    useRef<string | null>(null);

  const [imageSource, setImageSource] =
    useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const medicineId = Number(
      router.query.id,
    );

    const pharmacyId = Number(
      router.query.pharmacy_id,
    );

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
        message:
          "بيانات الدواء أو الصيدلية غير صالحة",
      });

      return;
    }

    const requestKey =
      `${pharmacyId}-${medicineId}`;

    if (
      loadedMedicineRef.current ===
      requestKey
    ) {
      return;
    }

    loadedMedicineRef.current =
      requestKey;

    const fetchMedicineDetails =
      async () => {
        try {
          setIsLoading(true);
          setHasError(false);

          const medicine =
            await getMedicineDetails(
              pharmacyId,
              medicineId,
            );

          setImageSource(
            medicine?.medication_photo ||
              null,
          );

          if (!medicine) {
            loadedMedicineRef.current =
              null;

            setHasError(true);

            showAlert({
              type: "Error",
              title: "خطأ",
              message:
                "لم يتم العثور على الدواء",
            });

            return;
          }

          setMedicineData({
            ...medicine,
            strength:
              medicine.strength ?? "",
            medication_photo:
              medicine.medication_photo ??
              null,
          });
        } catch (error) {
          console.error(
            "Failed to load medicine details:",
            error,
          );

          loadedMedicineRef.current =
            null;

          setHasError(true);

          showAlert({
            type: "Error",
            title: "خطأ",
            message:
              "لم نتمكن من تحميل بيانات الدواء",
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

  const handleFieldChange = (
    field: EditableMedicineField,
    value: string,
  ) => {
    setMedicineData(
      (previousData) => ({
        ...previousData,
        [field]: value,
      }),
    );
  };

  const createStringChangeHandler =
    (
      field: EditableMedicineField,
    ) =>
    (
      value: string | File | null,
    ) => {
      if (
        typeof value !== "string"
      ) {
        return;
      }

      handleFieldChange(
        field,
        value,
      );
    };

  const handlePriceChange = (
    value: string | File | null,
  ) => {
    if (
      typeof value !== "string"
    ) {
      return;
    }

    if (value.trim() === "") {
      setMedicineData(
        (previousData) => ({
          ...previousData,
          price: null,
        }),
      );

      return;
    }

    const numericPrice =
      Number(value);

    setMedicineData(
      (previousData) => ({
        ...previousData,
        price: Number.isFinite(
          numericPrice,
        )
          ? numericPrice
          : null,
      }),
    );
  };

  const handleImageChange = (
    file: File | null,
  ) => {
    setMedicineData(
      (previousData) => ({
        ...previousData,
        medication_photo: file,
      }),
    );
  };

  const handleReset = () => {
    void router.back();
  };

  const handleSubmit =
    async () => {
      const medicineId = Number(
        router.query.id,
      );

      const pharmacyId = Number(
        router.query.pharmacy_id,
      );

      if (
        !Number.isInteger(
          medicineId,
        ) ||
        medicineId <= 0 ||
        !Number.isInteger(
          pharmacyId,
        ) ||
        pharmacyId <= 0
      ) {
        showAlert({
          type: "Error",
          title: "خطأ",
          message:
            "بيانات الدواء أو الصيدلية غير صالحة",
        });

        return;
      }

      const tradeName =
        medicineData.trade_name.trim();

      const dosageForm =
        medicineData.dosage_form.trim();

      const strength =
        medicineData.strength?.trim() ??
        "";

      if (
        !tradeName ||
        !dosageForm ||
        !strength ||
        medicineData.price === null
      ) {
        showAlert({
          type: "Hint",
          title: "تلميح",
          message:
            "الرجاء تعبئة جميع الحقول المطلوبة",
        });

        return;
      }

      if (
        !Number.isFinite(
          medicineData.price,
        ) ||
        medicineData.price <= 0
      ) {
        showAlert({
          type: "Hint",
          title: "تلميح",
          message:
            "السعر يجب أن يكون عدداً موجباً",
        });

        return;
      }

      try {
        setIsSubmitting(true);

        await editMedicine({
          pharmacyId,
          medicineId,
          medicine: {
            trade_name:
              tradeName,

            dosage_form:
              dosageForm,

            strength,

            price:
              medicineData.price,

            is_available:
              medicineData.is_available,

            medication_photo:
              medicineData.medication_photo instanceof
              File
                ? medicineData.medication_photo
                : null,
          },
        });

        showAlert({
          type: "Success",
          title: "نجاح!",
          message:
            "تم تعديل بيانات الدواء بنجاح",
        });

        void router.push(
          `/pharmacy-dashboard/my-medicines/${medicineId}?pharmacy_id=${pharmacyId}`,
        );
      } catch (error) {
        console.error(
          "Failed to edit medicine:",
          error,
        );

        let errorMessage =
          "تعذر تعديل بيانات الدواء";

        if (
          axios.isAxiosError(
            error,
          )
        ) {
          console.error(
            "Validation response:",
            error.response?.data,
          );

          const responseData =
            error.response
              ?.data as
              | {
                  message?: string;
                  errors?: Record<
                    string,
                    string[]
                  >;
                }
              | undefined;

          const firstValidationError =
            responseData?.errors
              ? Object.values(
                  responseData.errors,
                ).flat()[0]
              : undefined;

          errorMessage =
            firstValidationError ??
            responseData?.message ??
            errorMessage;
        }

        showAlert({
          type: "Error",
          title: "خطأ!",
          message: errorMessage,
        });
      } finally {
        setIsSubmitting(false);
      }
    };

  if (isLoading) {
    return (
      <div
        dir="rtl"
        className="mt-13 flex w-full"
      >
        <p>
          جاري تحميل بيانات الدواء...
        </p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div
        dir="rtl"
        className="mt-13 flex w-full"
      >
        <p>
          تعذر عرض بيانات الدواء
        </p>
      </div>
    );
  }

  const defaultImage =
    getDosageFormImage(
      medicineData.dosage_form,
    );

  const imageToDisplay =
    imageSource ?? defaultImage;

  const isDefaultImage =
    !imageSource &&
    Boolean(defaultImage);

  return (
    <div
      dir="rtl"
      className="mt-13 mb-40 flex w-full flex-col gap-10"
    >
      <p className="text-27px font-semibold">
        تعديل الدواء
      </p>

      <Card title="معلومات الدواء">
        <div className="flex w-full flex-col px-10">
          <div className="text-inpt text-black-500">
            <Dropdown
              label="الاسم العلمي"
              placeholder=""
              value={String(
                medicineData.id,
              )}
              options={[
                {
                  label:
                    medicineData.scientific_name,
                  value: String(
                    medicineData.id,
                  ),
                },
              ]}
              onChange={() =>
                undefined
              }
              isTrue={Boolean(
                medicineData.scientific_name,
              )}
              editable={false}
            />

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="الاسم التجاري"
                type="text"
                inputText="الاسم التجاري"
                value={
                  medicineData.trade_name
                }
                onChange={createStringChangeHandler(
                  "trade_name",
                )}
                isTrue={Boolean(
                  medicineData.trade_name,
                )}
                editable
                errorMsg=""
              />

              <Input
                label="الشكل"
                type="text"
                inputText="الشكل الدوائي"
                value={
                  medicineData.dosage_form
                }
                onChange={createStringChangeHandler(
                  "dosage_form",
                )}
                isTrue={Boolean(
                  medicineData.dosage_form,
                )}
                editable
                errorMsg=""
              />

              <Input
                label="التركيز"
                type="text"
                inputText="التركيز"
                value={
                  medicineData.strength ??
                  ""
                }
                onChange={createStringChangeHandler(
                  "strength",
                )}
                isTrue={Boolean(
                  medicineData.strength,
                )}
                editable
                errorMsg=""
              />

              <Input
                label="السعر"
                type="number"
                inputText="السعر"
                value={
                  medicineData.price !==
                  null
                    ? String(
                        medicineData.price,
                      )
                    : ""
                }
                onChange={
                  handlePriceChange
                }
                isTrue={
                  medicineData.price !==
                    null &&
                  medicineData.price > 0
                }
                editable
                errorMsg=""
              />
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <label className="text-right text-sm font-bold">
                صورة الدواء
              </label>

              {imageToDisplay ? (
                <>
                  <Image
                    src={
                      imageToDisplay
                    }
                    alt="medicine photo"
                    width={200}
                    height={400}
                    className="mt-4 rounded-[14px] border object-contain"
                  />

                  {isDefaultImage && (
                    <p className="text-inpt text-black-500">
                      ملاحظة: هذه
                      صورة مضافة
                      تلقائياً من
                      موقعنا بناء
                      على نوع
                      الدواء
                    </p>
                  )}
                </>
              ) : (
                <p>
                  لا توجد صورة لهذا
                  الدواء
                </p>
              )}

              <p className="text-inpt text-black-500">
                ملاحظة: تقبل أنواع
                الصور التالية: png,
                jpeg, jpg
              </p>

              <AddImage
                label="تغيير الصورة"
                onImageChange={
                  handleImageChange
                }
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-row gap-5">
        <PetrolBtn
          text={
            isSubmitting
              ? "جاري الحفظ..."
              : "حفظ التغييرات"
          }
          onClick={() => {
            if (
              !isSubmitting
            ) {
              void handleSubmit();
            }
          }}
        />

        <EmptyPetrolBtn
          text="إلغاء"
          onClick={handleReset}
        />
      </div>
    </div>
  );
}