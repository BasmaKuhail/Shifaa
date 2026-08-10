import aidKit from "@/public/icons/aidKit.svg"
import blog from "@/public/icons/blog.svg"
import contact from "@/public/icons/contact.svg"

import med from "@/public/icons/med.svg"
import brain from "@/public/icons/brain.svg"
import time from "@/public/icons/time.svg"


export const services =[
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


export const tipsArr =[
    {num: 1, title: "البحث بالاسم", text: "أدخل الاسم التجاري أو العلمي للدواء الذي تحتاجه."},
    {num: 2, title: "تصفية النتائج", text: "حدد بحثك حسب الموقع، الشكل الدوائي، السعر، وغيرها."},
    {num: 3, title: "قارن الأدوية", text: "قارن بين النتائج وتعرف على أقرب صيدلية يتوفر بها الدواء."},
    {num: 4, title: "اطلب توفير الدواء", text: " لم تجد ما تحتاجه؟ اطلب توفيره من الصيدليات المجاورة."},
]

export const featuresArr =[
    {logo:med, text: " ابحث عن الأدوية في أي صيدلية بقطاع غزة، وقدم طلباً ولو لم يكن الدواء مدرجاً."},
    {logo:brain, text: " عزز معرفتك الصحية من خلال مدونتنا!"},
    {logo:time, text: "اعثر على الأدوية بسرعة، ودعك من عناء التنقل الطويل بين الصيدليات."},
]