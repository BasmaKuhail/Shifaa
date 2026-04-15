import Row from "./Row";

type TableProps = {
    pharmacistsArr: {name: string, contactNum: string, email: string, address:string, }[];
}
export default function Table({pharmacistsArr}: TableProps){
    return(
        <div className="w-full flex flex-col items-center justify-start gap-3">
            <Row pharmacist={{name: "الاسم", contactNum: "رقم التواصل", email: "البريد الالكتروني", address: "العنوان"}} isFrist={true} />
            {pharmacistsArr.map((pharmacist, index) => (
                <Row key={index} pharmacist={pharmacist} />
            ))}
        </div>
    )
}