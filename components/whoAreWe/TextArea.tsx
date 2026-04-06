import Text from "./TextItem";
import vision from "@/public/icons/about/vision.svg"
import mission from "@/public/icons/about/mission.svg"
export default function TextArea(){
    return(
        <div dir="rtl" className="flex flex-row items-center justify-between gap-12 px-20">
            <div className="flex flex-col gap-2 items-center w-full">
                <Text icon={mission} title="مهمتنا" text="تخفيف معاناة المرضى في قطاع غزة من خلال توفير منصة رقمية سريعة، وموثوقة، وموحدة للوصول إلى الأدوية. نحن نهدف إلى إنقاذ الأرواح عبر تقليل الوقت والجهد المبذول في البحث عن العلاجات النادرة، وضمان قدرة كل مريض على العثور على دوائه بكرامة وسهولة."/>
            </div>

            <div className="w-[3px] h-[200px] bg-gradient-to-b from-[#3E94B9] to-[#04B6FF]"/>

            <div className="flex flex-col gap-2 items-center w-full">
                <Text icon={vision} title="رؤيتنا" text="أن نصبح المرجع الرقمي الرائد للرعاية الصحية في فلسطين، وتعزيز مجتمع تلتقي فيه التكنولوجيا والخبرة الطبية. نحن نتصور مستقبلاً تكون فيه البيانات الصيدلانية شفافة، والتوعية الصحية متاحة للجميع، ولا يضطر فيه أي مريض أبداً للكفاح بمفرده للعثور على دواء منقذ للحياة."/>
            </div>
        </div>
    )
}