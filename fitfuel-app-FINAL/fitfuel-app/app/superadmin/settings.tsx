import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

export default function Settings() {
    const [enableFranchiseRegistrations, setEnableFranchiseRegistrations] = useState(true);
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);

    const handleManageAdmins = () => {
        console.log('Manage admin accounts');
        // TODO: Navigate to admin management screen
    };

    const handleAddAdmin = () => {
        console.log('Add new admin');
        // TODO: Navigate to add admin screen
    };

    const handleChangePassword = () => {
        console.log('Change password');
        // TODO: Navigate to change password screen
    };

    const handleTwoFactorAuth = () => {
        console.log('Two-factor authentication');
        // TODO: Navigate to 2FA setup screen
    };

    const handleDeactivateSystem = () => {
        console.log('Deactivate system');
        // TODO: Show confirmation modal
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Settings</Text>
                    <Text style={styles.subtitle}>System configuration and preferences</Text>
                </View>

                {/* System Settings Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>System Settings</Text>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>Enable New Franchise Registrations</Text>
                            <Text style={styles.settingDescription}>
                                Allow new franchises to register on the platform
                            </Text>
                        </View>
                        <Switch
                            value={enableFranchiseRegistrations}
                            onValueChange={setEnableFranchiseRegistrations}
                            trackColor={{ false: '#E5E7EB', true: Colors.primary }}
                            thumbColor="#fff"
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>Maintenance Mode</Text>
                            <Text style={styles.settingDescription}>
                                Temporarily disable system access for all users
                            </Text>
                        </View>
                        <Switch
                            value={maintenanceMode}
                            onValueChange={setMaintenanceMode}
                            trackColor={{ false: '#E5E7EB', true: '#F59E0B' }}
                            thumbColor="#fff"
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>Email Notifications</Text>
                            <Text style={styles.settingDescription}>
                                Receive email alerts for important system events
                            </Text>
                        </View>
                        <Switch
                            value={emailNotifications}
                            onValueChange={setEmailNotifications}
                            trackColor={{ false: '#E5E7EB', true: Colors.primary }}
                            thumbColor="#fff"
                        />
                    </View>
                </View>

                {/* Admin Management Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Admin Management</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.actionButton} onPress={handleManageAdmins}>
                            <Text style={styles.actionButtonText}>👥 Manage Admin Accounts</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton} onPress={handleAddAdmin}>
                            <Text style={styles.actionButtonText}>➕ Add New Admin</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Security Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Security</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.actionButton} onPress={handleChangePassword}>
                            <Text style={styles.actionButtonText}>🔒 Change Password</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton} onPress={handleTwoFactorAuth}>
                            <Text style={styles.actionButtonText}>🔐 Two-Factor Authentication</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Danger Zone Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Danger Zone</Text>
                    <View style={styles.dangerContainer}>
                        <Text style={styles.dangerDescription}>
                            Deactivating the system will disable all franchises and user access. This action
                            requires additional confirmation.
                        </Text>
                        <TouchableOpacity
                            style={styles.dangerButton}
                            onPress={handleDeactivateSystem}
                        >
                            <Text style={styles.dangerButtonText}>⛔ Deactivate System</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        padding: Spacing.md,
    },
    header: {
        marginBottom: Spacing.lg,
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
    section: {
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
    sectionTitle: {
        fontSize: 18,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
        marginBottom: Spacing.md,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        marginBottom: Spacing.sm,
    },
    settingInfo: {
        flex: 1,
        marginRight: Spacing.sm,
    },
    settingLabel: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
        marginBottom: 4,
    },
    settingDescription: {
        fontSize: 12,
        fontFamily: Typography.regular,
        color: '#6B7280',
        lineHeight: 16,
    },
    buttonsContainer: {
        gap: Spacing.sm,
    },
    actionButton: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.md,
        borderRadius: 8,
        alignItems: 'center',
    },
    actionButtonText: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#fff',
    },
    dangerContainer: {
        backgroundColor: '#FEF2F2',
        borderRadius: 8,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: '#FEE2E2',
    },
    dangerDescription: {
        fontSize: 13,
        fontFamily: Typography.regular,
        color: '#991B1B',
        lineHeight: 18,
        marginBottom: Spacing.md,
    },
    dangerButton: {
        backgroundColor: '#EF4444',
        paddingVertical: Spacing.md,
        borderRadius: 8,
        alignItems: 'center',
    },
    dangerButtonText: {
        fontSize: 14,
        fontFamily: Typography.bold,
        color: '#fff',
    },
});