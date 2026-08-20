import SecondaryHeader from "./secondaryHeader/SecondaryHeader";
import SearchHome from "./search/Search";
import Image from "next/image";
import homeBgImg from "@/public/images/homeBgImg.webp"
import Title from "./SectionTitle";
import HeaderText from "./HeaderText";
import SubHeader from "./SubHeader";
import ServiceCotainer from "./Service/ServiceContainer";

import TextSec from "./TextSection/TextSec";
import Work from "./howItWorks/HowItWorks";
import Features from "./FeaturesSec/FeaturesSec";
import MobileHeader from "../header/MobileHeader";
import { useRouter } from "next/navigation";
import { featuresArr, services, tipsArr } from "@/config/homeSec";
import { useState } from "react";

import whoAreWe from "@/public/images/whoAreWe.jpg"
import RequestMed from "@/public/images/RequestMed.png"
import ContatcSec from "./contactForm/ContactFormSec";

export default function Home (){
    const textSec =[
        {
            secTitle:"من نحن", 
            header: [{text: "بالشفاء..",color:"black"}, {text:"تكتمل الحكاية", color:"blue"}],
            paragraphText: "نحن منصة رقمية متخصصة تهدف إلى تنظيم الوصول للمعلومة الدوائية في قطاع غزة. نعمل على توحيد ومركزية بيانات الصيدليات لتمكين المستخدم من البحث والمقارنة والتحقق من التوفر بضغطة زر واحدة. نحن هنا لنحول عناء البحث إلى سهولة الوصول، ولنكون شريكك الموثوق في رحلة التعافي وتوفير التكاليف.",
            button:{btnText:"التعرف على المزيد", onClick:() => router.push("/about-us")},
            image:whoAreWe,
            dir:"rtl"
        },
        {
            secTitle:"طلب الدواء",
            header:[{text: "اطلب دواءك الآن", color:"black"}],
            paragraphText:" إذا لم تجد دواءك، يمكنك تقديم طلب وسوف تعمل أقرب الصيدليات على توفيره لك.",
            button:{btnText:"اطلب الدواء", onClick:() => router.push("/request-medication")},
            image:RequestMed,
            dir:"ltr"
        }
        
    ]
    const router = useRouter()

    return(
        <div className='w-full flex flex-col overflow-x-hidden'>
            <div className="bg-blue-100 relative inline-block ">
                {/* web view */}
                <Image
                    src={homeBgImg}
                    alt='home hero image'
                    width={610.77}
                    className='block lg:pt-[50px] rotate-180 scale-y-[-1]'
                    loading="eager"
                    fetchPriority="high"
                />
                <div className="absolute inset-0 z-10 pt-[75px] hidden lg:block">
                    <div className="px-4 md:px-8 lg:px-20 xl:px-30 pt-4"><SecondaryHeader/></div>
                    
                    <div id="search" className='mt-20'>
                        <SearchHome/>
                    </div>
                </div>
                {/* mobile view */}
                <div className="absolute inset-0 -top-full block lg:hidden w-full flex items-center justify-center">
                    <MobileHeader/>
                </div>
                <div id="search" className='-mt-10 block lg:hidden mb-40'>
                    <SearchHome/>
                </div>
            </div>
            
            <div className="flex flex-col items-center justify-center mt-20 gap-1">
                
                <Title title="خدماتنا" bgColor="blue"/>
                <HeaderText text="نحن معك في كل وقت" color="black"/>
                <SubHeader text="متواجدون دائمًا لمساعدتك في العثور على دوائك" color="black"/>
                <div dir="rtl"  className="flex flex-col md:flex-row lg:flex-row justify-between items-center w-full mt-5 px-4 md:px-8 lg:px-20 xl:px-30 pt-4 gap-5 mb-20">
                    {services.map((srvs, indx) => 
                        <ServiceCotainer key={indx} icon={srvs.icon} header={srvs.header} text={srvs.text} link={srvs.link}/>
                    )}
                </div>
            </div>
            
            {/* text with motion */}
            <div className="px-4 md:px-8 lg:px-20 xl:px-30 pt-4 ">
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
            
            <div className="bg-blue-100 w-full h:fit pt-20 px-4 md:px-8 lg:px-20 xl:px-30 ">
                <div className="lg:mb-40 md:mb-40 mb-20 h-full">
                    <Features featuresArr={featuresArr}/>
                </div>
                <div className="mb-30" id="contact"> 
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