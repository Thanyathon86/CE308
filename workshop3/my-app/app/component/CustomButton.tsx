import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type CustomButtonProps = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
};

const styles = StyleSheet.create({
    buttonBase: {
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    textBase: {
        color: '#fff',
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 0.3,
    },
    // Variants
    primary: {
        backgroundColor: '#3b82f6',
    },
    secondary: {
        backgroundColor: '#6b7280',
    },
    danger: {
        backgroundColor: '#ef4444',
    },
    // Sizes
    sm: {
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    md: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    lg: {
        paddingHorizontal: 20,
        paddingVertical: 14,
    },
    textSm: {
        fontSize: 12,
    },
    textMd: {
        fontSize: 14,
    },
    textLg: {
        fontSize: 16,
    },
});

export const CustomButton = ({
    title,
    onPress,
    variant = "primary",
    size = "md",
}: CustomButtonProps) => {
    const variantStyle = {
        primary: styles.primary,
        secondary: styles.secondary,
        danger: styles.danger,
    }[variant];

    const sizeStyle = {
        sm: styles.sm,
        md: styles.md,
        lg: styles.lg,
    }[size];

    const textSizeStyle = {
        sm: styles.textSm,
        md: styles.textMd,
        lg: styles.textLg,
    }[size];

    return (
        <TouchableOpacity
            style={[styles.buttonBase, variantStyle, sizeStyle]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[styles.textBase, textSizeStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};
