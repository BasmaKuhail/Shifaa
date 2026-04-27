import { User } from "@/types/UserType";
import ProfileIcon from "../ProfileIcon";

type ProfileProps = {
    user : User
}

export default function Profile({user}:ProfileProps){
    return(
        <div dir="ltr" className="flex flex-row gap-2 mr-[12px]">
            <div className="relative">
                <div className="flex flex-col cursor-pointer">
                    <ProfileIcon imageUrl={user.avatar} width={40} isCircle={false}/>
                </div>
                <div className="bg-online p-1 w-[11px] h-[11px] rounded-full absolute right-0 bottom-0"></div>
            </div>
            <div className="flex flex-col gap-0">
                <p className="text-input">{user.firstName}</p>
                <p className="text-12px text-black-500">{user.user_type}</p>
            </div>
        </div>
    )
}