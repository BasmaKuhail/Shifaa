import { alertType } from "@/types/Alert";
import { toast, ToastContainer } from "react-toastify";

type AppAlertProps = {
    type: alertType;
    title: string;
    message?: string;
};
const alertStyles: Record<alertType, string> = {
  Success: "bg-bg-Success border-border-Success",
  Warning: "bg-bg-Warning border-border-Warning",
  Error: "bg-bg-Error border-border-Error",
  Hint: "bg-bg-Hint border-border-Hint",
};

function AppAlert({ type, title, message }: AppAlertProps) {
    return (
    <div
        dir="rtl"
        className={`
            flex w-full min-w-[320px] flex-col border-1 px-5 py-4 shadow-md rounded-[8px] text-black text-inpt
            ${alertStyles[type]}
        `}
    >
            <strong>{title}</strong>
            <p className="text-black-500">{message}</p>
        </div>
    );
}

export function showAlert(alert: AppAlertProps) {
    toast(<AppAlert {...alert} />, {
        className: "!bg-transparent !p-0 !shadow-none",
        progressClassName: "app-toast-progress",
        icon: false,
        closeButton: false,
    });
}

export function AppToastContainer() {
    return (
    <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        limit={3}
        toastClassName="!bg-transparent !p-0 !shadow-none !font-[var(--font-tajawal)]"
        // bodyClassName="!m-0 !p-0 !font-[var(--font-tajawal)]"
    />
    );
}