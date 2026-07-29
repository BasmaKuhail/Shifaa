import { useBreadcrumb } from "@/contexts/BreadcrumbContext"
import { useEffect } from "react"

export default function RequestMedication(){
    const { setCrumbs } = useBreadcrumb()
        useEffect(() => {
            setCrumbs([
                { title: "الصفحة الرئيسية", link: "/" },
                { title: "تعديل الحساب", link: "/editProfile" }
            ])
        }, [])
    return(
        <div>
                       
        </div>
    )
}
