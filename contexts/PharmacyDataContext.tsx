import { createContext, useState, useEffect, ReactNode } from "react";
import { getMe } from "@/services/auth";
import { User } from "@/types/UserType";
import { Pharmacy } from "@/types/PharmacyType";
import { getPharmacyById } from "@/services/pharmacy";


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

  const fetchPharmacy = async () => {
   
    try {
      const data = await getPharmacyById(8); 
      setPharmacy(data);
      console.log(data)
    } catch (err: any) {
      console.error("Error fetching pharmacy data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPharmacy();
  }, []);

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