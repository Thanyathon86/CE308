import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
  error?: string;
  touched?: boolean;
}

export default function CustomCheckbox({
  label,
  checked,
  onPress,
  error,
  touched,
}: CheckboxProps) {
  return (
    <View className="w-full mb-4">
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className={`flex-row items-center p-4 rounded-lg border-2 ${
          touched && error ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"
        }`}
      >
        <View
          className={`w-6 h-6 rounded mr-3 items-center justify-center border-2 ${
            checked
              ? "bg-blue-600 border-blue-600"
              : "bg-white border-gray-400"
          }`}
        >
          {checked && (
            <Ionicons name="checkmark" size={16} color="white" />
          )}
        </View>
        <Text
          className={`flex-1 text-base ${
            checked ? "text-gray-800 font-semibold" : "text-gray-700"
          }`}
        >
          {label}
        </Text>
      </TouchableOpacity>

      {touched && error && (
        <Text className="text-red-500 text-sm mt-2">
          {error}
        </Text>
      )}
    </View>
  );
}
