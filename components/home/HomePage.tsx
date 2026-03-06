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
import blog from "@/public/icons/blog.svg"
import contact from "@/public/icons/contact.svg"
import { link } from "fs";

const services =[
    {
        icon: aidKit,
        header: "طلب توفير الدواء",
        text:'وفر وقتك وتجنب المشاوير غير الضرورية. إذا لم يكن دواؤك متاحًا، يمكنك طلبه عبر "شفاء"',
        link:"اطلب توفير الدواء"
    }, {
        icon: blog,
        header: "مدونة التوعية الصحية",
        text:'استكشف نصائح طبية وخبرات صحية موثقة ومعتمدة من قِبل أطباء متخصصين.',
        link:"مدونة التوعية الصحية"
    }, {
        icon: contact,
        header: "اتصل بنا",
        text:'هل لديك استفسار أو تحتاج إلى دعم؟ فريقنا متواجد لمساعدتك في أي وقت.',
        link:"اتصل بنا"
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
            <div className="flex flex-col items-center justify-center mt-20 gap-1">
                <Title title="خدماتنا"/>
                <HeaderText text="نحن معك في كل وقت" isBlue={false}/>
                <SubHeader text="متواجدون دائمًا لمساعدتك في العثور على دوائك"/>
                <div dir="rtl"  className="flex flex-col md:flex-row lg:flex-row justify-between items-center w-full mt-5 px-4 md:px-8 lg:px-30 pt-4 gap-5 mb-20">
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