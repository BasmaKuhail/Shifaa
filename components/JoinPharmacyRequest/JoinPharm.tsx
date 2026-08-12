import Input from "@/components/register/input";
import EmptyPetrolBtn from "@/components/adminDashboard/requests/EpmtyPetrolBtn";
import { showAlert } from "@/components/alerts/AlertContainer";
import { UserContext } from "@/contexts/UserContext";
import { joinPharm } from "@/services/joinPharmcy";
import { PharmaciesResult, searchPharmacies } from "@/services/pharmacies";
import { validateInput } from "@/utils/ValidateInput";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import Dropdown from "../pharmacyDashboard/addMedicine/DropDownInput";
import PetrolBtn from "../pharmacyDashboard/PharmacyInfo/invitePopup/PetrolBtn";

const SEARCH_DEBOUNCE_MS = 500;

export default function JoinPharmacy() {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    pharmacyId: "",
    userName: "",
    phoneNum: "",
    email: "",
    message: "",
  });
  const [pharmacies, setPharmacies] = useState<PharmaciesResult>();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingPharmacy, setIsLoadingPharmacy] = useState(false);
  const [pharmacyError, setPharmacyError] = useState("");
  const latestRequestIdRef = useRef(0);

  useEffect(() => {
    if (!user) return;
    setFormData((current) => ({
      ...current,
      userName: `${user.firstName} ${user.lastName}`,
      phoneNum: user.mobileNum ?? "",
      email: user.email ?? "",
    }));
  }, [user]);

  const fetchPharmacies = useCallback(async (input: string) => {
    const requestId = ++latestRequestIdRef.current;
    setIsLoadingPharmacy(true);
    setPharmacyError("");

    try {
      setPharmacies(await searchPharmacies({ input, page: 1, sortDescending: false }));
    } catch {
      if (requestId !== latestRequestIdRef.current) return;
      setPharmacies(undefined);
      setPharmacyError("تعذر تحميل قائمة الصيدليات");
    } finally {
      if (requestId === latestRequestIdRef.current) setIsLoadingPharmacy(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void fetchPharmacies(searchQuery), SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timeoutId);
  }, [searchQuery, fetchPharmacies]);

  const handleReset = () => {
    latestRequestIdRef.current += 1;
    setFormData((current) => ({ ...current, pharmacyId: "", message: "" }));
    setSearchQuery("");
  };

  const handleSubmit = async () => {
    const messageIsValid = formData.message.trim() !== "";
    if (!formData.pharmacyId || !messageIsValid) {
      showAlert({
        type: "Error",
        title: "خطأ",
        message: "يرجى اختيار الصيدلية وكتابة الرسالة",
      });
      return;
    }
    console.log({ pharmacy_id: Number(formData.pharmacyId), message: formData.message.trim() })

    try {
      await joinPharm({ pharmacy_id: Number(formData.pharmacyId), message: formData.message.trim() });
      showAlert({ type: "Success", title: "تم بنجاح", message: "تم إرسال طلب الانضمام" });
      handleReset();
    } catch (error: unknown) {
      let errorMessage = "تعذر إرسال طلب الانضمام";

      showAlert({ type: "Error", title: "خطأ", message: errorMessage });
    }
  };

  return (
    <div dir="rtl" className="flex w-full flex-col gap-10">
      <p className="text-27px font-semibold">انضمام لصيدلية</p>
        <div className="flex w-full flex-col px-10">
          <div className="text-inpt text-black-500">
            <Dropdown
              label="اسم الصيدلية"
              placeholder="ابحث عن إحدى الصيدليات المسجلة"
              value={formData.pharmacyId}
              options={(pharmacies?.pharmacies ?? []).map((pharmacy) => ({
                label: pharmacy.name,
                value: String(pharmacy.id),
              }))}
              onChange={(pharmacyId) => setFormData((current) => ({ ...current, pharmacyId }))}
              onSearchChange={setSearchQuery}
              isTrue={Boolean(formData.pharmacyId)}
              loading={isLoadingPharmacy}
              errorMsg={pharmacyError}
              noResultsText="لا توجد صيدليات بهذا الاسم"
            />
            <p>المعلومات الشخصية</p>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <Input label="الاسم" type="text" inputText="الاسم" value={formData.userName} onChange={() => {}} isTrue={true} editable={false} />
              {/* <Input
                label="رقم الهاتف"
                type="number"
                inputText="رقم الهاتف"
                value={formData.phoneNum}
                onChange={(value) => setFormData((current) => ({ ...current, phoneNum: typeof value === "string" ? value : "" }))}
                isTrue={validateInput(formData.phoneNum, "mobile").isValid}
                errorMsg={validateInput(formData.phoneNum, "mobile").errorMsg}
              /> */}
              <Input label="الإيميل" type="email" inputText="الإيميل" value={formData.email} onChange={() => {}} isTrue={true} editable={false} />
              
            </div>
            <Input
                label="الرسالة"
                type="textarea"
                inputText="اكتب رسالتك هنا"
                value={formData.message}
                onChange={(value) => setFormData((current) => ({ ...current, message: typeof value === "string" ? value : "" }))}
                isTrue={formData.message.trim() !== ""}
                errorMsg={formData.message.trim()}
              />
          </div>
        </div>
      <div className="flex flex-row gap-5">
        <PetrolBtn text="إرسال" onClick={handleSubmit} />
        <EmptyPetrolBtn text="إلغاء" onClick={handleReset} />
      </div>
    </div>
  );
}
