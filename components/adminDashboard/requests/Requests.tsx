import StatusHolder from "@/components/pharmacyDashboard/MedicineRequests/StatusHolder";
import Card from "@/components/pharmacyDashboard/PharmacyInfo/CardContainer";
import Row from "@/components/pharmacyDashboard/PharmacyInfo/pharmacistsTable/Row";
import { useContext, useEffect, useState } from "react";
import Interact from "./Interact";
import { AdminRequestContext } from "@/contexts/AdminPharmacistsRequestsContext";
import { useRouter } from "next/router";
import { AdminPharmacyRequestContext } from "@/contexts/AdminPharmcyRequestsContext";
import PharmacistsRequests from "./JoinPharmacistRequests";
import CreatePharmReq from "./PharmacyRequests";
export default function Requests() {
    const { pharmacyRequests, loadingPharm, errorPharm } = useContext(AdminPharmacyRequestContext);

    return(
        <div className="flex flex-col gap-10 mt-13 mb-40 w-full">
            <p className="font-semibold text-27px">إدارة الدعوات</p>
            <Card title="طلبات الانضمام كصيدلي" scrollable>
                <PharmacistsRequests/>
            </Card>
            <Card title="طلبات انشاء صيدلية" scrollable>
                <CreatePharmReq/>
            </Card>
        </div>
    )
}