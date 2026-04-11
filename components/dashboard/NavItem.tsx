import { useRouter } from "next/router";

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  link: string;
};
export default function NavItem({ icon: Icon, label, link }: NavItemProps){
    const router = useRouter();
    return(
        <div className={`rounded-[14px] p-2 text-21px flex flex-row gap-3 items-center text-black-1000 cursor-pointer hover:bg-white hover:bg-blue-200 ${router.pathname === link ? "font-bold text-blue-1000" : ""}`} onClick={() => router.push(link)}>
            <Icon className="w-5 h-5" />
            <p className="text-btn">{label}</p>
        </div>
    )
}