import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface GenderOption {
  label: string;
  value: string;
}

interface GenderSelectorProps {
  label?: string;
  selected: string;
  onSelect: (value: string) => void;
  error?: string;
  touched?: boolean;
}

const GENDER_OPTIONS: GenderOption[] = [
  { label: "ชาย", value: "male" },
  { label: "หญิง", value: "female" },
  { label: "ไม่ระบุ", value: "other" },
];

export default function GenderSelector({
  label,
  selected,
  onSelect,
  error,
  touched,
}: GenderSelectorProps) {
  return (
    <View className="w-full mb-4">
      {label && (
        <Text className="text-gray-700 font-semibold mb-3 text-base">
          {label}
        </Text>
      )}

      <View className="flex-row justify-between gap-2">
        {GENDER_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            onPress={() => onSelect(option.value)}
            activeOpacity={0.7}
            className={`flex-1 flex-row items-center justify-center p-3 rounded-lg border-2 ${
              selected === option.value
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 bg-white"
            }`}
          >
            <View
              className={`w-5 h-5 rounded-full mr-2 border-2 items-center justify-center ${
                selected === option.value
                  ? "border-blue-600 bg-blue-600"
                  : "border-gray-400 bg-white"
              }`}
            >
              {selected === option.value && (
                <Ionicons name="checkmark" size={12} color="white" />
              )}
            </View>
            <Text
              className={`text-sm font-medium ${
                selected === option.value
                  ? "text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {touched && error && (
        <Text className="text-red-500 text-sm mt-2">
          {error}
        </Text>
      )}
    </View>
  );
}
