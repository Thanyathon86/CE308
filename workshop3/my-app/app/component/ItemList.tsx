import { View, ScrollView, StyleSheet } from 'react-native';
import { ItemCard } from './ItemCard';

type Item = {
    id: string;
    productName: string;
    price: number;
    pcs: number;
    btnSize?: "sm" | "md" | "lg";
    btnColor?: "primary" | "secondary" | "danger";
};

type ItemListProps = {
    items: Item[];
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    scrollContent: {
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 16,
    },
});

export const ItemList = ({ items }: ItemListProps) => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.scrollContent}>
                {items.map((item) => (
                    <ItemCard
                        key={item.id}
                        productName={item.productName}
                        price={item.price}
                        pcs={item.pcs}
                        btnSize={item.btnSize}
                        btnColor={item.btnColor}
                    />
                ))}
            </View>
        </ScrollView>
    );
};