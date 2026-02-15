import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface Dish {
    id: string;
    name: string;
    category: string;
    price: number;
    calories: number;
    available: boolean;
}

export default function Menu() {
    const dishes: Dish[] = [
        { id: '1', name: 'Grilled Chicken Salad', category: 'High Protein', price: 180, calories: 320, available: true },
        { id: '2', name: 'Protein Smoothie', category: 'High Protein', price: 90, calories: 250, available: true },
        { id: '3', name: 'Quinoa Bowl', category: 'Vegan', price: 150, calories: 380, available: true },
        { id: '4', name: 'Greek Yogurt Parfait', category: 'Low Carb', price: 120, calories: 200, available: false },
        { id: '5', name: 'Turkey Wrap', category: 'High Protein', price: 160, calories: 340, available: true },
        { id: '6', name: 'Keto Buddha Bowl', category: 'Keto', price: 200, calories: 420, available: true },
        { id: '7', name: 'Avocado Toast', category: 'Vegan', price: 140, calories: 290, available: true },
    ];

    const handleAddNewItem = () => {
        console.log('Add new item');
        // TODO: Navigate to add item screen
    };

    const handleEditDish = (dishId: string) => {
        console.log('Edit dish:', dishId);
        // TODO: Navigate to edit dish screen
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'High Protein':
                return '#3B82F6';
            case 'Vegan':
                return Colors.primary;
            case 'Keto':
                return '#F59E0B';
            case 'Low Carb':
                return '#8B5CF6';
            default:
                return '#6B7280';
        }
    };

    const renderDish = ({ item }: { item: Dish }) => (
        <View style={styles.dishCard}>
            <View style={styles.dishHeader}>
                <View style={styles.dishMainInfo}>
                    <Text style={styles.dishName}>{item.name}</Text>
                    <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
                        <Text style={styles.categoryText}>{item.category}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditDish(item.id)}
                >
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.dishDetails}>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Price</Text>
                    <Text style={styles.priceValue}>₹{item.price}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Calories</Text>
                    <Text style={styles.detailValue}>{item.calories} kcal</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Status</Text>
                    <Text style={[styles.statusText, { color: item.available ? Colors.primary : '#EF4444' }]}>
                        {item.available ? 'Available' : 'Unavailable'}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Menu Management</Text>
                <Text style={styles.subtitle}>Manage dishes for your franchise</Text>
            </View>

            {/* Add New Item Button */}
            <View style={styles.addButtonContainer}>
                <TouchableOpacity style={styles.addButton} onPress={handleAddNewItem}>
                    <Text style={styles.addButtonText}>+ Add New Item</Text>
                </TouchableOpacity>
            </View>

            {/* Dishes List */}
            <FlatList
                data={dishes}
                renderItem={renderDish}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        backgroundColor: '#fff',
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    title: {
        fontSize: 24,
        fontFamily: Typography.bold,
        color: '#1A1A1A',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: Typography.regular,
        color: '#6B7280',
    },
    addButtonContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    addButton: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.sm,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#fff',
    },
    listContent: {
        padding: Spacing.md,
    },
    dishCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    dishHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.sm,
    },
    dishMainInfo: {
        flex: 1,
        marginRight: Spacing.sm,
    },
    dishName: {
        fontSize: 16,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
        marginBottom: Spacing.xs,
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    categoryText: {
        fontSize: 10,
        fontFamily: Typography.bold,
        color: '#fff',
        letterSpacing: 0.5,
    },
    editButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    editButtonText: {
        fontSize: 12,
        fontFamily: Typography.semiBold,
        color: '#fff',
    },
    dishDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: Spacing.sm,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    detailItem: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 11,
        fontFamily: Typography.medium,
        color: '#9CA3AF',
        marginBottom: 4,
    },
    priceValue: {
        fontSize: 16,
        fontFamily: Typography.bold,
        color: Colors.primary,
    },
    detailValue: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
    },
    statusText: {
        fontSize: 12,
        fontFamily: Typography.semiBold,
    },
});