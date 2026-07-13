import Add from "@/public/icons/dashboard/add"
import Dash from "@/public/icons/dashboard/dashboard";
import Pharm from "@/public/icons/dashboard/pharmacy";
import Request from "@/public/icons/dashboard/request";
import Requests from "@/public/icons/dashboard/requests";
import Home from "@/public/icons/dashboard/home";
import Med from "@/public/icons/dashboard/Med";
import Settings from "@/public/icons/dashboard/settings";
import Help from "@/public/icons/dashboard/help";


export const headerItems = [
    {
        id: 1,
        title: "الصفحة الرئيسية",
        link: "/",
        bold: true,
    },
    {
        id: 2,
        title: "من نحن",
        link: "/about-us",
        bold: false,
    },
    {
        id: 3,
        title: "الصيدليات",
        link: "/pharmacies",
        bold: false,
    },
    // {
    //     id: 4,
    //     title: "مدونة التوعية الصحية",
    //     link: "/blog",
    //     bold: false,
    // },
    {
        id: 5,
        title: "تواصل معنا",
        link: "/#contact",
        bold: false,
    },
    // {
    //     id:6,
    //     title:"اللغة",
    //     link: "#",
    //     bold: false
    // }
]
export const pharmacytNav = [
    {
        id:1,
        icon:Home,
        label:"الرئيسية",
        link:"/"
    },
    // {
    //     id: 2,
    //     icon: Dash,
    //     label: "لوحة التحكم",
    //     link: "/pharmacy-dashboard"
    // },
    {
        id: 3,
        icon: Pharm,
        label: "معلومات الصيدلية",
        link: "/pharmacy-dashboard/pharmInfo"
    },
    {
        id: 4,
        icon: Requests,
        label: "الطلبات",
        link: "/pharmacy-dashboard/medicine-requests"
    },
    {
        id: 5,
        icon: Add,
        label: "إضافة دواء",
        link: "/pharmacy-dashboard/add"
    },
    {
        id: 6,
        icon: Request,
        label:"الدعوات",
        link: "/pharmacy-dashboard/invitations"
    },
    {
        id: 7,
        icon:Med,
        label:"الأدوية",
        link:"/pharmacy-dashboard/medicines"
    }
];

export const adminNav =[
        {
            id:1,
            icon:Home,
            label:"الرئيسية",
            link:"/"
        },
        // {
        //     id: 2,
        //     icon: Dash,
        //     label: "لوحة التحكم",
        //     link: "/admin-dashboard"
        // },
        // {
        //     id: 3,
        //     icon: Pharm,
        //     label: "معلومات الصيدلية",
        //     link: "/pharmInfo"
        // },
        {
            id: 4,
            icon: Request,
            label: "الطلبات",
            link: "/admin-dashboard/requests"
        },
        // {
        //     id: 5,
        //     icon: Add,
        //     label: "إضافة دواء",
        //     link: "/dashboard/add"
        // },
        // {
        //     id:6,
        //     icon: Request,
        //     label:"الدعوات",
        //     link: "/invitations"
        // }
    ];

export const otherDashboardItems =[
    {
        id: 1,
        icon: Help,
        label: "مركز المساعدة",
        link: "/help"
    },
    // {
    //     id: 2,
    //     icon: Settings,
    //     label: "الاعدادات",
    //     link: "/settings"
    // },
]
