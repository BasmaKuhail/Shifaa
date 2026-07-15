import { createContext, useState, useEffect, ReactNode, useContext, useCallback } from "react";
import { Pharmacy } from "@/types/PharmacyType";
import { getPharmacyById } from "@/services/pharmacy";
import { UserContext } from "./UserContext";


interface PharmacyrContextType {
  pharmacy: Pharmacy | null;
  setPharmacy: (pharmacy: Pharmacy | null) => void;
  loading: boolean;
  
}

export const PharmacyContext = createContext<PharmacyrContextType>({
  pharmacy: null,
  setPharmacy: () => {},
  loading: true,
});

export const PharmacyProvider = ({ children }: { children: ReactNode }) => {
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);
  const [loading, setLoading] = useState(true);

  const {user, loading:userLoading} = useContext(UserContext);

  const pharmId = user?.pharmacy_id;
  const fetchPharmacy = useCallback(async () => {
    if (!pharmId) {
      setPharmacy(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await getPharmacyById(pharmId); 
      setPharmacy(data);
      console.log(data)
    } catch (err: any) {
      console.error("Error fetching pharmacy data:", err);
    } finally {
      setLoading(false);
    }
  },[pharmId]);

  useEffect(() => {
    if (userLoading) {
      return;
    }

    void fetchPharmacy();
  }, [userLoading, fetchPharmacy]);

  useEffect(() => {
    const handleOnline = () => {
      const token = localStorage.getItem("token");
      if (token && !pharmacy) {
        fetchPharmacy();
      }
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [pharmacy]);

  return (
    <PharmacyContext.Provider value={{ pharmacy, setPharmacy, loading }}>
      {children}
    </PharmacyContext.Provider>
  );
};