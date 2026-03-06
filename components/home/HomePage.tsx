import Header from "../header/Header";
import SecondaryHeader from "../secondaryHeader/SecondaryHeader";
import SearchHome from "./search/Search";
import Image from "next/image";
import homeBgImg from "@/public/images/homeBgImg.png"
import Title from "./SectionTitle";
import HeaderText from "./HeaderText";
import SubHeader from "./SubHeader";
import ServiceCotainer from "./Service/ServiceContainer";

import aidKit from "@/public/icons/aidKit.svg"

const services =[
    {
        icon: aidKit,
        header: "طلب توفير الدواء",
        text:'وفر وقتك وتجنب المشاوير غير الضرورية. إذا لم يكن دواؤك متاحًا، يمكنك طلبه عبر "شفاء"',
        link:"اطلب توفير الدواء"
    }, {
        icon: aidKit,
        header: "طلب توفير الدواء",
        text:'وفر وقتك وتجنب المشاوير غير الضرورية. إذا لم يكن دواؤك متاحًا، يمكنك طلبه عبر "شفاء"',
        link:"اطلب توفير الدواء"
    }, {
        icon: aidKit,
        header: "طلب توفير الدواء",
        text:'وفر وقتك وتجنب المشاوير غير الضرورية. إذا لم يكن دواؤك متاحًا، يمكنك طلبه عبر "شفاء"',
        link:"اطلب توفير الدواء"
    },
]

export default function Home (){
    return(
        <div className='w-full flex flex-col '>
            <div className="fixed top-0 left-0 w-full z-50"><Header /></div>
    
            <div className="bg-blue-100 relative inline-block">
                <Image
                    src={homeBgImg}
                    alt='home '
                    width={610.77}
                    className='block pt-[50px]'
                />
                <div className="absolute inset-0 z-10 pt-[75px]">
                    <SecondaryHeader />
                    <div className='mt-20'>
                        <SearchHome />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-20">
                <Title title="خدماتنا"/>
                <HeaderText text="نحن معك في كل وقت" isBlue={false}/>
                <SubHeader text="متواجدون دائمًا لمساعدتك في العثور على دوائك"/>
                <div className="flex flex-row justify-between items-center w-full mt-5 px-4 md:px-8 lg:px-30 pt-4 gap-8">
                    {services.map((srvs, indx) => 
                        <ServiceCotainer key={indx} icon={srvs.icon} header={srvs.header} text={srvs.text} link={srvs.link}/>
                    )}
                </div>
            </div>
            
            {/* <h1>{t('welcome')}</h1>
            <button
                onClick={() =>
                router.push({ pathname, query }, asPath, { locale: nextLocale })
                }
            >
                Switch to {nextLocale}
            </button> */}
        </div>
    )
}