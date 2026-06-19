export const validateInput = (value: string | File | null, type: 'text' | 'email' | 'password' | 'textarea' | 'file' | 'mobile'): {errorMsg: string, isValid: boolean} => {
    if (type === 'file'){
        if (!value || !(value instanceof File)) return {errorMsg: "يرجى اختيار ملف", isValid: false};
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
        const maxSize = 2 * 1024 * 1024;

        if (!allowedTypes.includes(value.type)) return {errorMsg: "نوع الملف غير مدعوم", isValid: false};
        if (value.size > maxSize) return {errorMsg: "حجم الملف يجب أن يكون أقل من 2MB", isValid: false};

        return {errorMsg: "", isValid: true};
    }
    if (typeof value !== "string") return {errorMsg: "يرجى ملأ جميع الحقول الفارغة", isValid: false};
    if (type === 'mobile') {
        //starts with 05 or +970 0r +972 followed by 7 digits
        const isValid = /^(05|(\+970)|(\+972))\d{8}$/.test(value);
        return {errorMsg: isValid? "": "يرجى إدخال رقم هاتف يبدأ ب05", isValid};
    }
    if (type === 'text') {
        const isValid = value.trim() !== '' && !/\d/.test(value);
        return {errorMsg: isValid? "": "يرجى إدخال نص لا يحتوي على رقم", isValid};
    }
    if (type === 'email') {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
        // console.log("Email validation:", {value, isValid});
        return {errorMsg: isValid? "": "يرجى إدخال بريد إلكتروني صحيح", isValid};
    }
    if (type === 'password') {
        const isValid = (
            value.length >= 8 &&
            /[A-Za-z]/.test(value) &&
            /\d/.test(value) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(value)
        );
        return {isValid, errorMsg: isValid? "": "ادخل كلمة مرور تطابق الشروط"};
    }
    return {errorMsg: "حدث خطأ غير متوقع", isValid: false};
}


export const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
}