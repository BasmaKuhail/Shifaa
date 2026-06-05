import Add from "@/public/icons/dashboard/add";
import Dash from "@/public/icons/dashboard/dashboard";
import Pharm from "@/public/icons/dashboard/pharmacy";
import Request from "@/public/icons/dashboard/request";
import Home from "@/public/icons/dashboard/home";
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
        link: "/whoAreWe",
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
export const pharmacistNav = [
    {
        id:1,
        icon:Home,
        label:"الرئيسية",
        link:"/"
    },
    {
        id: 2,
        icon: Dash,
        label: "لوحة التحكم",
        link: "/dashboard"
    },
    {
        id: 3,
        icon: Pharm,
        label: "معلومات الصيدلية",
        link: "/dashboard/pharmInfo"
    },
    {
        id: 4,
        icon: Request,
        label: "الطلبات",
        link: "/dashboard/medicine-requests"
    },
    {
        id: 5,
        icon: Add,
        label: "إضافة دواء",
        link: "/dashboard/add"
    },
    {
        id: 6,
        icon: Request,
        label:"الدعوات",
        link: "/dashboard/invitations"
    }
];

export const adminNav =[
        {
            id:1,
            icon:Home,
            label:"الرئيسية",
            link:"/"
        },
        {
            id: 2,
            icon: Dash,
            label: "لوحة التحكم",
            link: "/admin-dashboard"
        },
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
