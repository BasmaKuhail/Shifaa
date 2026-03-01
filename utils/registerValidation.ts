type RegisterData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};
export const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
}
export const validateInput = (value: string, type: 'text' | 'email' | 'password'): boolean => {
    if (type === 'text') {
        return value.trim() !== ''; 
    } else if (type === 'email') {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else if (type === 'password') { 
        return (
            value.length >= 8 &&
            /[A-Za-z]/.test(value) &&   
            /\d/.test(value) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(value)
        );
    }
    return false;
}
export const validateRegister = (userData: RegisterData) => {
    if (!userData.firstName || !userData.lastName || !userData.email || !userData.password || !userData.confirmPassword) {
        // alert("يرجى ملأ جميع الحقول الفارغة");
        return {errorMsg: "يرجى ملأ جميع الحقول الفارغة", isValid: false}
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
        // alert("يرجى إدخال بريد إلكتروني صحيح");
        return {errorMsg: "يرجى إدخال بريد إلكتروني صحيح", isValid: false};
    }

    if (userData.password !== userData.confirmPassword) {
        return {errorMsg: "كلمتا المرور غير متطابقتين", isValid: false};
    }

    if (
        userData.password.length < 8 ||
        !/[A-Za-z]/.test(userData.password) ||
        !/\d/.test(userData.password) ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(userData.password)
    ) {
        return {errorMsg: "كلمة المرور يجب أن تكون 8 أحرف انجليزية أو أكثر وتحتوي على مزيج من الأحرف والأرقام والرموز", isValid: false};
    }

    return null; // valid
};