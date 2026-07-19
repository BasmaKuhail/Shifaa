import Image from "next/image";
import { FormEvent, useContext, useRef, useState } from "react";
import axios from "axios";
import invite from "@/public/icons/phcyInfo/invite.svg";
import searchIcon from "@/public/icons/search.svg";
import Result from "./SearchResults";
import PopupContainer from "../PopUpContainer";
import { searchPharmacists } from "@/services/pharmacist";
import { Pharmacist } from "@/types/Pharmacist";
import { invitePharmacist } from "@/services/pharmacy";
import { PharmacyContext } from "@/contexts/PharmacyDataContext";
import { showAlert } from "@/components/alerts/AlertContainer";

export default function InvitePopup({onClose}: {onClose: () => void}) {
  const {pharmacy, loading} = useContext(PharmacyContext)
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<Pharmacist[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [invitingPharmacistId, setInvitingPharmacistId] = useState<number | null>(null);
  const requestIdRef = useRef(0);

  const handleSearch = async (event: FormEvent<HTMLFormElement>,) => {
    event.preventDefault();

    const normalizedInput = searchInput.trim();

    if (!normalizedInput || isSearching) {
      return;
    }

    const requestId = ++requestIdRef.current;

    try {
      setIsSearching(true);
      setErrorMessage("");

      const response = await searchPharmacists(
        normalizedInput,
        1,
      );

      // Ignore an older request if a newer request has completed.
      if (requestId !== requestIdRef.current) {
        return;
      }

      const pharmacists: Pharmacist[] = Array.isArray(
        response.data,
      )
        ? response.data
        : [];
      console.log(pharmacists);
      const mappedResults: Pharmacist[] =
        pharmacists.map((pharmacist) => ({
          id: pharmacist.id,
          user:{
            name: pharmacist.user.name ?? "",
            email:pharmacist.user.email ?? "",
          },
          phone_number:pharmacist.phone_number ??"",
          
        }));

      // Replace the current results. Do not append.
      console.log(mappedResults);
      setResults(mappedResults);
      
    } catch (error: unknown) {
      if (requestId !== requestIdRef.current) {
        return;
      }

      setResults([]);

      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message ??
            "حدث خطأ أثناء البحث",
        );
      } else {
        setErrorMessage("حدث خطأ غير متوقع");
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setIsSearching(false);
      }
    }
  };
const handleInvite = async (pharmacistId: number) => {
  if (invitingPharmacistId !== null) {
    return;
  }

  if (!pharmacy) {
    setErrorMessage("تعذر تحديد الصيدلية");
    return;
  }

  try {
    setInvitingPharmacistId(pharmacistId);
    setErrorMessage("");

    await invitePharmacist(
      pharmacy.id,
      pharmacistId,
    );

    console.log("Invitation sent to pharmacist:", pharmacistId);
    showAlert({
      type:"Success",
      title:"نجحت في ارسال الدعوة!",
      message:"تم ارسال الدعوة بنجاح"
    })
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      setErrorMessage(
        error.response?.data?.message ??
          Object.values(error.response?.data?.errors)
            .flat()
            .join(" ") ??
          "تعذر إرسال الدعوة",
      );
      showAlert({
        type:"Warning",
        title:"تنبيه",
        message:errorMessage
      })
    } else {
      setErrorMessage(
        "حدث خطأ غير متوقع أثناء إرسال الدعوة",
      );
    }
  } finally {
    setInvitingPharmacistId(null);
  }
};
  return (
    <PopupContainer onClose={onClose}>
      <div className="flex w-full items-center justify-start gap-2">
        <Image src={invite} alt="" />
          <p className="text-lg font-[500]">دعوة صيدلي</p>
      </div>

      <form
        dir="rtl"
        onSubmit={handleSearch}
        className="relative w-full"
      >
        <button
          type="submit"
          disabled={isSearching}
          aria-label="البحث عن صيدلي"
          className="absolute right-5 top-1/2 z-10 -translate-y-1/2 disabled:opacity-50"
        >
          <Image
            src={searchIcon}
            alt=""
            width={15}
          />
        </button>

        <input
          value={searchInput}
          type="search"
          placeholder="ابحث بالاسم أو البريد الإلكتروني أو رقم الهاتف"
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
          className="h-[40px] w-full rounded-[12px] border border-black-200 bg-white px-12 text-right text-black-500 focus:outline-none"
        />
      </form>

      {isSearching && (
        <p className="text-sm text-gray-500"> جاري البحث...</p>
      )}

      {errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}

      {!isSearching && results.length === 0 && searchInput.trim() && !errorMessage && (
        <p className="w-full py-4 text-center text-sm text-gray-500">لم يتم العثور على صيادلة</p>
      )}

    <div
      dir="rtl"
      className="
        flex max-h-[420px] w-full flex-col gap-2
        overflow-y-auto pr-1
      "
    >
      {results.map((result) => (
        <Result
          key={result.id}
          name={result.user.name}
          contactNumber={result.phone_number}
          email={result.user.email}
          isInviting={invitingPharmacistId === result.id}
          onInvite={() => handleInvite(result.id)}
        />
      ))}
    </div>
    </PopupContainer>
  );
}