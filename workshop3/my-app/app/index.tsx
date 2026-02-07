import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import { CustomInput } from './component/CustomInput';
import { CustomButton } from './component/CustomButton';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    header: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingHorizontal: 12,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 2,
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#6b7280',
        fontWeight: '500',
    },
    scrollContent: {
        paddingHorizontal: 12,
        paddingTop: 16,
        paddingBottom: 24,
    },
    formCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    submitButton: {
        marginTop: 16,
    },
});

export default function Home() {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [pcs, setPcs] = useState('');

    const handleSubmit = () => {
        if (productName && price && pcs) {
            console.log('ข้อมูลสินค้า:', {
                productName,
                price: parseInt(price),
                pcs: parseInt(pcs),
            });
            alert(`สินค้า: ${productName}\nราคา: ${price} บาท\nจำนวน: ${pcs} ชิ้น`);
            setProductName('');
            setPrice('');
            setPcs('');
        } else {
            alert('กรุณากรอกข้อมูลให้ครบ');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>รายการสินค้า</Text>
                <Text style={styles.headerSubtitle}>Product Form</Text>
            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.scrollContent}>
                    <View style={styles.formCard}>
                        <CustomInput
                            label="ชื่อสินค้า"
                            value={productName}
                            onChangeText={setProductName}
                            placeholder="เช่น กล้วย, มะม่วง, แอปเปิ้ล"
                        />
                        <CustomInput
                            label="ราคา"
                            value={price}
                            onChangeText={setPrice}
                            placeholder="ป้อนราคา (บาท)"
                            keyboardType="numeric"
                        />
                        <CustomInput
                            label="จำนวน"
                            value={pcs}
                            onChangeText={setPcs}
                            placeholder="ป้อนจำนวน (ชิ้น)"
                            keyboardType="numeric"
                        />
                        <View style={styles.submitButton}>
                            <CustomButton
                                title="ยืนยัน"
                                onPress={handleSubmit}
                                size="md"
                                variant="primary"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
