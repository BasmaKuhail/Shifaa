import { createContext, useContext, useState } from "react"

type Crumb = { title: string; link: string }
type BreadcrumbContextType = {
    crumbs: Crumb[]
    setCrumbs: React.Dispatch<React.SetStateAction<Crumb[]>>
}

const BreadcrumbContext = createContext<BreadcrumbContextType>({
    crumbs: [],
    setCrumbs: () => {}
})

export const useBreadcrumb = () => useContext(BreadcrumbContext)

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
    const [crumbs, setCrumbs] = useState<Crumb[]>([{ title: "الصفحة الرئيسية", link: "/" }])

    return (
        <BreadcrumbContext.Provider value={{ crumbs, setCrumbs }}>
            {children}
        </BreadcrumbContext.Provider>
    )
}