import Header from "../header/Header";
import SecondaryHeader from "./secondaryHeader/SecondaryHeader";
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

import med from "@/public/icons/med.svg"
import brain from "@/public/icons/brain.svg"
import time from "@/public/icons/time.svg"

import whoAreWe from "@/public/images/whoAreWe.jpg"
import RequestMed from "@/public/images/RequestMed.png"
import TextSec from "./TextSection/TextSec";
import Work from "./howItWorks/HowItWorks";
import Features from "./FeaturesSec/FeaturesSec";
import ContatcSec from "./contactForm/ContactFormSec";

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

const textSec =[
    {
        secTitle:"من نحن", 
        header: [{text: "بالشفاء..",color:"black"}, {text:"تكتمل الحكاية", color:"blue"}],
        paragraphText: "نحن منصة رقمية متخصصة تهدف إلى تنظيم الوصول للمعلومة الدوائية في قطاع غزة. نعمل على توحيد ومركزية بيانات الصيدليات لتمكين المستخدم من البحث والمقارنة والتحقق من التوفر بضغطة زر واحدة. نحن هنا لنحول عناء البحث إلى سهولة الوصول، ولنكون شريكك الموثوق في رحلة التعافي وتوفير التكاليف.",
        button:{btnText:"التعرف على المزيد", onClick:() => console.log("j")},
        image:whoAreWe,
        dir:"rtl"
    },
    {
        secTitle:"طلب الدواء",
        header:[{text: "اطلب دواءك الآن", color:"black"}],
        paragraphText:" إذا لم تجد دواءك، يمكنك تقديم طلب وسوف تعمل أقرب الصيدليات على توفيره لك.",
        button:{btnText:"اطلب الدواء", onClick:() => console.log("j")},
        image:RequestMed,
        dir:"ltr"
    }
    
]

const tipsArr =[
    {num: 1, title: "البحث بالاسم", text: "أدخل الاسم التجاري أو العلمي للدواء الذي تحتاجه."},
    {num: 2, title: "تصفية النتائج", text: "حدد بحثك حسب الموقع، الشكل الدوائي، السعر، وغيرها."},
    {num: 3, title: "قارن الأدوية", text: "قارن بين النتائج وتعرف على أقرب صيدلية يتوفر بها الدواء."},
    {num: 4, title: "اطلب توفير الدواء", text: " لم تجد ما تحتاجه؟ اطلب توفيره من الصيدليات المجاورة."},
]

const featuresArr =[
    {logo:med, text: " ابحث عن الأدوية في أي صيدلية بقطاع غزة، وقدم طلباً ولو لم يكن الدواء مدرجاً."},
    {logo:brain, text: " عزز معرفتك الصحية من خلال مدونتنا!"},
    {logo:time, text: "اعثر على الأدوية بسرعة، ودعك من عناء التنقل الطويل بين الصيدليات."},
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
                <HeaderText text="نحن معك في كل وقت" color="black"/>
                <SubHeader text="متواجدون دائمًا لمساعدتك في العثور على دوائك" color="black"/>
                <div dir="rtl"  className="flex flex-col md:flex-row lg:flex-row justify-between items-center w-full mt-5 px-4 md:px-8 lg:px-30 pt-4 gap-5 mb-20">
                    {services.map((srvs, indx) => 
                        <ServiceCotainer key={indx} icon={srvs.icon} header={srvs.header} text={srvs.text} link={srvs.link}/>
                    )}
                </div>
            </div>
            
            {/* text with motion */}
            <div className="px-4 md:px-8 lg:px-30 pt-4 ">
                {textSec.map((item, index) => 
                    <TextSec 
                        key={index}
                        secTitle={item.secTitle}
                        header={item.header} 
                        paragraphText= {item.paragraphText}
                        button={item.button}
                        image={item.image}
                        dir={item.dir}
                    />)}
            </div>
           
           <div>
                <Work 
                    title= " آلية العمل" 
                    header={{text: "كيف تعمل منصة شفاء؟", color:"white"}} 
                    subHeader={{text: "ابحث عن دواءك باتباع الخطوات التالية:", color:"white"}}
                    tips = {tipsArr}
                />
           </div>
            
            <div className="bg-blue-100 w-full pt-20 px-4 md:px-8 lg:px-30 ">
                <div className="lg:mb-40 md:mb-40 mb-20">
                    <Features featuresArr={featuresArr}/>
                </div>
                <div className="mb-20">
                    <ContatcSec/>
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