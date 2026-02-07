import { View, TextInput, Text, StyleSheet } from 'react-native';

type CustomInputProps = {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    keyboardType?: 'default' | 'numeric' | 'email-address';
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: '#111827',
        backgroundColor: '#fff',
    },
});

export const CustomInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
}: CustomInputProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#9ca3af"
                keyboardType={keyboardType}
            />
        </View>
    );
};
