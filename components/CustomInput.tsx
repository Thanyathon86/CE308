import { View, Text, TextInput } from "react-native";
import { useState } from "react";

type CustomInputProps = {
  label?: string;
  error?: string;
  hasError?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  touched?: boolean;
} & React.ComponentProps<typeof TextInput>;

export default function CustomInput({ label, error, hasError, maxLength, showCharCount, touched, ...props }: CustomInputProps) {
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (text: string) => {
    setCharCount(text.length);
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  };

  return (
    <View className="w-full mb-4">
      <View className="flex-row justify-between items-center mb-2">
        {label && (
          <Text className="text-gray-700 font-semibold text-base">
            {label}
          </Text>
        )}
        {showCharCount && maxLength && (
          <Text className="text-gray-500 text-sm font-medium">
            {charCount}/{maxLength}
          </Text>
        )}
      </View>

      <TextInput
        className={`
          w-full px-4 py-3 rounded-lg border-2
          ${touched && hasError ? "border-red-500" : "border-gray-300"}
          ${props.editable === false ? "bg-gray-100" : "bg-white"}
          text-base text-gray-800
        `}
        placeholderTextColor="#9CA3AF"
        maxLength={maxLength}
        onChangeText={handleTextChange}
        {...props}
      />

      {touched && hasError && error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}