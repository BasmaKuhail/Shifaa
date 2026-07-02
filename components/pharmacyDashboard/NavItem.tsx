import { useRouter } from "next/router";

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  link: string;
};
export default function NavItem({ icon: Icon, label, link }: NavItemProps){
    const router = useRouter();
    return(
        <div 
            className={
                `w-full flex flex-row gap-3 p-2 text-21px items-center
                rounded-[5px] text-black-1000 
                cursor-pointer 
                border-r-2 border-transparent
                hover:bg-blue-100 
                ${router.pathname === link ? "text-blue-1000 bg-blue-100 border-r-blue-1000" : ""}
            `} 
            onClick={() => router.push(link)}
        >
            <Icon className="w-5 h-5" />
            <p className="text-btn">{label}</p>
        </div>
    )
}