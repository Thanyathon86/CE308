// /app/index.tsx
import "./global.css";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import CustomCheckbox from "../components/CustomCheckbox";
import GenderSelector from "../components/GenderSelector";
import CustomDatePicker from "../components/CustomDatePicker";

// Interface สำหรับข้อมูล Form
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  gender: string;
  birthDate: Date | null;
  agreedToTerms: boolean;
}

// Interface สำหรับ Error Messages
interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  gender?: string;
  birthDate?: string;
  agreedToTerms?: string;
}

export default function Index() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    gender: "",
    birthDate: null,
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [checkboxTouched, setCheckboxTouched] = useState(false);

  const getGenderLabel = (value: string): string => {
    const genderMap: { [key: string]: string } = {
      male: "ชาย",
      female: "หญิง",
      other: "ไม่ระบุ",
    };
    return genderMap[value] || value;
  };

  const formatDateForDisplay = (date: Date | null): string => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // ฟังก์ชัน Validation
  const validateField = (name: string, value: any = ""): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "กรุณากรอกชื่อ-นามสกุล";
        if (value.trim().length < 3) return "ชื่อ-นามสกุลต้องอย่างน้อย 3 ตัวอักษร";
        return undefined;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return "กรุณากรอกอีเมล";
        if (!emailRegex.test(value)) return "รูปแบบอีเมลไม่ถูกต้อง";
        return undefined;
      case "phone":
        const phoneRegex = /^[0-9]{10}$/;
        if (!value.trim()) return "กรุณากรอกเบอร์โทรศัพท์";
        if (!phoneRegex.test(value)) return "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก";
        return undefined;
      case "password":
        if (!value) return "กรุณากรอกรหัสผ่าน";
        if (value.length < 6) return "รหัสผ่านต้องอย่างน้อย 6 ตัวอักษร";
        return undefined;
      case "confirmPassword":
        if (!value) return "กรุณายืนยันรหัสผ่าน";
        if (value !== formData.password) return "รหัสผ่านไม่ตรงกัน";
        return undefined;
      case "address":
        if (!value.trim()) return "กรุณากรอกที่อยู่";
        if (value.trim().length < 10) return "ที่อยู่ต้องอย่างน้อย 10 ตัวอักษร";
        return undefined;
      case "gender":
        if (!value) return "กรุณาเลือกเพศ";
        return undefined;
      case "birthDate":
        if (!formData.birthDate) return "กรุณาเลือกวันเกิด";
        const today = new Date();
        let age = today.getFullYear() - formData.birthDate.getFullYear();
        const monthDiff = today.getMonth() - formData.birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < formData.birthDate.getDate())
        ) {
          age--;
        }
        if (age < 13) return "อายุต้องอย่างน้อย 13 ปี";
        return undefined;
      case "agreedToTerms":
        if (!formData.agreedToTerms) return "กรุณายอมรับข้อตกลงและเงื่อนไข";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    setErrors(newErrors);
    const allTouched: { [key: string]: boolean } = {};
    Object.keys(formData).forEach((key) => { allTouched[key] = true; });
    setTouched(allTouched);
    setCheckboxTouched(true);
    return isValid;
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (!validateForm()) {
      Alert.alert("ข้อมูลไม่ถูกต้อง", "กรุณาตรวจสอบข้อมูลและลองใหม่อีกครั้ง");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("สำเร็จ!", `ลงทะเบียนสำเร็จ\n\nชื่อ: ${formData.fullName}\nเพศ: ${getGenderLabel(formData.gender)}\nวันเกิด: ${formatDateForDisplay(formData.birthDate)}\nอีเมล: ${formData.email}\nที่อยู่: ${formData.address}`, [
        { text: "ตรวจสอบ", onPress: () => console.log(formData) },
        { text: "รีเซ็ตฟอร์ม", onPress: handleReset, style: "cancel" },
      ]);
    }, 2000);
  };

  const handleReset = () => {
    setFormData({ fullName: "", email: "", phone: "", password: "", confirmPassword: "", address: "", gender: "", birthDate: null, agreedToTerms: false });
    setErrors({});
    setTouched({});
    setCheckboxTouched(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className="flex-1 bg-gray-50" contentContainerClassName="pb-8" keyboardShouldPersistTaps="handled">
          <View className="bg-blue-600 pt-16 pb-8 px-6">
            <Text className="text-white text-3xl font-bold">ลงทะเบียนสมาชิก</Text>
            <Text className="text-blue-100 text-base mt-2">กรุณากรอกข้อมูลให้ครบถ้วน</Text>
          </View>

          <View className="px-6 mt-6">
            <CustomInput
              label="ชื่อ-นามสกุล"
              placeholder="ระบุชื่อและนามสกุล"
              value={formData.fullName}
              onChangeText={(v) => handleChange("fullName", v)}
              onBlur={() => handleBlur("fullName")}
              error={errors.fullName}
              touched={touched.fullName}
              autoCapitalize="words"
            />
            <CustomInput
              label="เบอร์โทรศัพท์"
              placeholder="0812345678"
              value={formData.phone}
              onChangeText={(v) => handleChange("phone", v)}
              onBlur={() => handleBlur("phone")}
              error={errors.phone}
              touched={touched.phone}
              keyboardType="phone-pad"
              maxLength={10}
            />
            <GenderSelector
              label="เพศ"
              selected={formData.gender}
              onSelect={(value) => {
                setFormData((prev) => ({ ...prev, gender: value }));
                setTouched((prev) => ({ ...prev, gender: true }));
                const error = validateField("gender", value);
                setErrors((prev) => ({ ...prev, gender: error }));
              }}
              error={errors.gender}
              touched={touched.gender}
            />
            <CustomDatePicker
              label="วันเกิด"
              value={formData.birthDate}
              onDateChange={(date) => {
                setFormData((prev) => ({ ...prev, birthDate: date }));
                setTouched((prev) => ({ ...prev, birthDate: true }));
                const error = validateField("birthDate", "");
                setErrors((prev) => ({ ...prev, birthDate: error }));
              }}
              error={errors.birthDate}
              touched={touched.birthDate}
            />
            <CustomInput
              label="อีเมล"
              placeholder="example@email.com"
              value={formData.email}
              onChangeText={(v) => handleChange("email", v)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <CustomInput
              label="รหัสผ่าน"
              placeholder="อย่างน้อย 6 ตัวอักษร"
              value={formData.password}
              onChangeText={(v) => handleChange("password", v)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              secureTextEntry
              autoCapitalize="none"
            />
            <CustomInput
              label="ยืนยันรหัสผ่าน"
              placeholder="ระบุรหัสผ่านอีกครั้ง"
              value={formData.confirmPassword}
              onChangeText={(v) => handleChange("confirmPassword", v)}
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            <CustomInput
              label="ที่อยู่"
              placeholder="กรุณาระบุที่อยู่อย่างละเอียด"
              value={formData.address}
              onChangeText={(v) => handleChange("address", v)}
              onBlur={() => handleBlur("address")}
              error={errors.address}
              touched={touched.address}
              multiline={true}
              numberOfLines={5}
              maxLength={200}
              showCharCount={true}
              style={{ minHeight: 100, textAlignVertical: "top" }}
            />

            <CustomCheckbox
              label="ฉันยอมรับข้อตกลงและเงื่อนไข"
              checked={formData.agreedToTerms}
              onPress={() => {
                setFormData((prev) => ({
                  ...prev,
                  agreedToTerms: !prev.agreedToTerms,
                }));
                setCheckboxTouched(true);
              }}
              error={errors.agreedToTerms}
              touched={checkboxTouched}
            />

            <View className="mt-4 space-y-3">
              <CustomButton title="ลงทะเบียน" onPress={handleSubmit} loading={isLoading} />
              <CustomButton title="รีเซ็ตฟอร์ม" onPress={handleReset} variant="secondary" disabled={isLoading} />
            </View>

            <View className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <Text className="text-blue-800 font-semibold text-base mb-2">ค่าแนะนำ</Text>
              <Text className="text-blue-700 text-sm leading-5">
                กรอกข้อมูลให้ครบถ้วน{"\n"}
                อีเมลต้องมีรูปแบบที่ถูกต้อง{"\n"}
                เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก{"\n"}
                รหัสผ่านต้องอย่างน้อย 6 ตัวอักษร{"\n"}
                ที่อยู่ต้องอย่างน้อย 10 ตัวอักษร
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}