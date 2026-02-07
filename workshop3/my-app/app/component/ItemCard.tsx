import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomButton } from './CustomButton';

type ItemCardProps = {
    productName: string;
    price: number;
    pcs: number;
    btnSize?: "sm" | "md" | "lg";
    btnColor?: "primary" | "secondary" | "danger";
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 10,
        paddingHorizontal: 12,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    productName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 10,
    },
    infoSection: {
        flex: 1,
    },
    infoDivider: {
        width: 1,
        height: 40,
        backgroundColor: '#d1d5db',
        marginHorizontal: 16,
    },
    infoCenterSection: {
        flex: 1,
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 11,
        color: '#6b7280',
        fontWeight: '600',
        marginBottom: 2,
        textTransform: 'uppercase',
        letterSpacing: 0.3,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
    infoUnit: {
        fontSize: 11,
        color: '#6b7280',
        marginTop: 1,
    },
});

export const ItemCard = ({
    productName,
    price,
    pcs,
    btnSize = "md",
    btnColor = "primary",
}: ItemCardProps) => {
    return (
        <View style={styles.card}>
            <Text style={styles.productName}>{productName}</Text>
            
            <View style={styles.infoContainer}>
                <View style={styles.infoSection}>
                    <Text style={styles.infoLabel}>ราคา</Text>
                    <Text style={styles.infoValue}>{price}</Text>
                    <Text style={styles.infoUnit}>บาท</Text>
                </View>
                <View style={styles.infoDivider} />
                <View style={styles.infoCenterSection}>
                    <Text style={styles.infoLabel}>จำนวน</Text>
                    <Text style={[styles.infoValue, { fontSize: 28 }]}>{pcs}</Text>
                </View>
            </View>
            
            <CustomButton
                title="สั่งซื้อ"
                onPress={() => console.log(`สั่งซื้อ ${productName}`)}
                size={btnSize}
                variant={btnColor}
            />
        </View>
    );
};

