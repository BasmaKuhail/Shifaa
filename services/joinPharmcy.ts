import api from "@/lib/api"

export const joinPharm = async ({ message, pharmacy_id }: { message: string; pharmacy_id: number }) => {
  const res = await api.post("/pharmacist/join-request", {
    pharmacy_id: pharmacy_id,
    message,
  });
  return res;
};
