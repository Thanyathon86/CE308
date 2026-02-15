import { View, Text, TouchableOpacity, Platform } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

interface DatePickerProps {
  label?: string;
  value: Date | null;
  onDateChange: (date: Date) => void;
  error?: string;
  touched?: boolean;
}

export default function CustomDatePicker({
  label,
  value,
  onDateChange,
  error,
  touched,
}: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const isIOS = Platform.OS === "ios";

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const getAgeText = (): string => {
    if (!value) return "";
    const age = calculateAge(value);
    return `(อายุ ${age} ปี)`;
  };

  return (
    <View className="w-full mb-4">
      {label && (
        <Text className="text-gray-700 font-semibold mb-2 text-base">
          {label}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        activeOpacity={0.7}
        className={`
          w-full px-4 py-3 rounded-lg border-2 flex-row items-center justify-between
          ${touched && error ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"}
        `}
      >
        <View>
          <Text className={`text-base ${!value ? "text-gray-400" : "text-gray-800"}`}>
            {value ? formatDate(value) : "เลือกวันเกิด"}
          </Text>
          {value && (
            <Text className="text-gray-600 text-sm mt-1">
              {getAgeText()}
            </Text>
          )}
        </View>
        <Ionicons
          name="calendar"
          size={20}
          color={touched && error ? "#ef4444" : "#6B7280"}
        />
      </TouchableOpacity>

      {touched && error && (
        <Text className="text-red-500 text-sm mt-2">
          {error}
        </Text>
      )}

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
          onTouchCancel={() => setShowPicker(false)}
        />
      )}

      {showPicker && isIOS && (
        <TouchableOpacity
          onPress={() => setShowPicker(false)}
          className="mt-2 bg-blue-600 rounded-lg py-2 px-4"
        >
          <Text className="text-white text-center font-semibold">เสร็จสิ้น</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
