// components/SecurityModal.tsx

import { AppTheme } from '@/constants/theme';
import { Box, Button, ButtonText, HStack, Input, InputField, Pressable, ScrollView, Switch, Text, VStack } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { Alert, Dimensions, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ConfirmationModal } from './ConfirmationModal';
import { useTheme } from './ThemeProvider';

const { height: screenHeight } = Dimensions.get("window");

interface SecurityModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({
    isVisible,
    onClose,
}) => {
    const { isDark } = useTheme();

    // States
    const [currentView, setCurrentView] = useState<'main' | 'changePassword'>('main');
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showLogoutAllModal, setShowLogoutAllModal] = useState(false);

    // Password states
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const resetPasswordFields = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
    };

    const handleClose = () => {
        setCurrentView('main');
        resetPasswordFields();
        onClose();
    };

    const handleUpdatePassword = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }

        Alert.alert('Success', 'Password updated successfully', [
            { text: 'OK', onPress: () => setCurrentView('main') }
        ]);
        resetPasswordFields();
    };

    const renderPasswordInput = (
        label: string,
        value: string,
        onChangeText: (text: string) => void,
        showPassword: boolean,
        toggleShowPassword: () => void
    ) => (
        <VStack space="xs" mb={AppTheme.spacing.md}>
            <Text
                fontSize={AppTheme.typography.fontSizes.sm}
                fontWeight="600"
                color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
            >
                {label}
            </Text>
            <Box
                backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.gray[50]}
                borderRadius={AppTheme.borderRadius.lg}
                borderWidth={1}
                borderColor={isDark ? AppTheme.colors.gray[600] : AppTheme.colors.gray[300]}
            >
                <HStack alignItems="center" px={AppTheme.spacing.md}>
                    <Input flex={1} variant="outline" borderWidth={0} backgroundColor="transparent">
                        <InputField
                            value={value}
                            onChangeText={onChangeText}
                            secureTextEntry={!showPassword}
                            placeholder=""
                            color={isDark ? AppTheme.colors.gray[100] : AppTheme.colors.gray[900]}
                        />
                    </Input>
                    <Pressable onPress={toggleShowPassword} p={AppTheme.spacing.xs}>
                        <Icon
                            name={showPassword ? "visibility-off" : "visibility"}
                            size={20}
                            color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[500]}
                        />
                    </Pressable>
                </HStack>
            </Box>
        </VStack>
    );

    const renderSecurityItem = (
        icon: string,
        iconColor: string,
        iconBg: string,
        title: string,
        rightComponent: React.ReactNode,
        subtitle?: string,
        onPress?: () => void
    ) => (
        <Pressable onPress={onPress}>
            <HStack
                alignItems="center"
                space="md"
                backgroundColor={isDark ? AppTheme.colors.gray[800] : "#ffffff"}
                borderRadius={AppTheme.borderRadius.xl}
                p={AppTheme.spacing.lg}
                mb={AppTheme.spacing.sm}
                shadowColor="#000000"
                shadowOffset={{ width: 0, height: 1 }}
                shadowOpacity={0.05}
                shadowRadius={2}
                elevation={2}
            >
                <Box
                    w={40}
                    h={40}
                    backgroundColor={iconBg}
                    borderRadius={AppTheme.borderRadius.lg}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Icon name={icon} size={20} color={iconColor} />
                </Box>

                <VStack flex={1}>
                    <Text
                        fontSize={AppTheme.typography.fontSizes.md}
                        fontWeight="600"
                        color={isDark ? AppTheme.colors.gray[100] : AppTheme.colors.gray[900]}
                    >
                        {title}
                    </Text>
                    {subtitle && (
                        <Text
                            fontSize={AppTheme.typography.fontSizes.sm}
                            color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                        >
                            {subtitle}
                        </Text>
                    )}
                </VStack>

                {rightComponent}
            </HStack>
        </Pressable>
    );

    return (
        <>
            <Modal
                visible={isVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={handleClose}
            >
                <Box flex={1} backgroundColor="rgba(0,0,0,0.5)" justifyContent="flex-end">
                    <Box
                        backgroundColor={isDark ? AppTheme.colors.gray[900] : "#ffffff"}
                        borderTopLeftRadius={20}
                        borderTopRightRadius={20}
                        height={currentView === 'changePassword' ? screenHeight * 0.7 : screenHeight * 0.6}
                    >
                        {/* Header */}
                        <Box
                            backgroundColor={currentView === 'changePassword' ? AppTheme.colors.blue[600] : AppTheme.colors.success[600]}
                            borderTopLeftRadius={20}
                            borderTopRightRadius={20}
                            p={AppTheme.spacing.lg}
                        >
                            <HStack justifyContent="space-between" alignItems="center">
                                <HStack alignItems="center" space="md">
                                    {currentView === 'changePassword' && (
                                        <Pressable onPress={() => setCurrentView('main')} p={AppTheme.spacing.xs}>
                                            <Icon name="arrow-back" size={24} color="#ffffff" />
                                        </Pressable>
                                    )}
                                    <Text
                                        fontSize={AppTheme.typography.fontSizes.lg}
                                        fontWeight="700"
                                        color="#ffffff"
                                    >
                                        {currentView === 'changePassword' ? 'Change Password' : 'Security'}
                                    </Text>
                                </HStack>
                                <Pressable onPress={handleClose} p={AppTheme.spacing.xs}>
                                    <Icon name="close" size={24} color="#ffffff" />
                                </Pressable>
                            </HStack>
                        </Box>

                        {/* Content */}
                        {currentView === 'main' ? (
                            <ScrollView
                                style={{ flex: 1 }}
                                contentContainerStyle={{ padding: AppTheme.spacing.lg }}
                                showsVerticalScrollIndicator={false}
                            >
                                <VStack space="sm">

                                    {renderSecurityItem(
                                        'lock',
                                        '#ffffff',
                                        AppTheme.colors.blue[500],
                                        'Change Password',
                                        <Icon name="chevron-right" size={24} color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[500]} />,
                                        undefined,
                                        () => setCurrentView('changePassword')
                                    )}

                                    {renderSecurityItem(
                                        'security',
                                        '#ffffff',
                                        AppTheme.colors.success[500],
                                        '2-Factor Authentication',
                                        <Switch
                                            value={twoFactorEnabled}
                                            onValueChange={setTwoFactorEnabled}
                                            trackColor={{
                                                false: AppTheme.colors.gray[300],
                                                true: AppTheme.colors.success[500]
                                            }}
                                            thumbColor={twoFactorEnabled ? '#ffffff' : '#ffffff'}
                                        />,
                                        'Currently Disabled',
                                    )}

                                    {renderSecurityItem(
                                        'logout',
                                        '#ffffff',
                                        AppTheme.colors.error[500],
                                        'Log Out from All Devices',
                                        <Icon name="chevron-right" size={24} color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[500]} />,
                                        undefined,
                                        () => setShowLogoutAllModal(true)
                                    )}

                                </VStack>
                            </ScrollView>
                        ) : (
                            <VStack flex={1} p={AppTheme.spacing.lg}>

                                {renderPasswordInput(
                                    'Current Password',
                                    currentPassword,
                                    setCurrentPassword,
                                    showCurrentPassword,
                                    () => setShowCurrentPassword(!showCurrentPassword)
                                )}

                                {renderPasswordInput(
                                    'New Password',
                                    newPassword,
                                    setNewPassword,
                                    showNewPassword,
                                    () => setShowNewPassword(!showNewPassword)
                                )}

                                {renderPasswordInput(
                                    'Confirm New Password',
                                    confirmPassword,
                                    setConfirmPassword,
                                    showConfirmPassword,
                                    () => setShowConfirmPassword(!showConfirmPassword)
                                )}

                                <Box flex={1} />

                                <VStack space="sm">
                                    <Button
                                        backgroundColor={AppTheme.colors.gray[500]}
                                        borderRadius={AppTheme.borderRadius.lg}
                                        h={48}
                                        onPress={() => setCurrentView('main')}
                                    >
                                        <ButtonText color="#ffffff" fontWeight="600">
                                            Cancel
                                        </ButtonText>
                                    </Button>

                                    <Button
                                        backgroundColor={AppTheme.colors.blue[600]}
                                        borderRadius={AppTheme.borderRadius.lg}
                                        h={48}
                                        onPress={handleUpdatePassword}
                                    >
                                        <ButtonText color="#ffffff" fontWeight="600">
                                            Update Password
                                        </ButtonText>
                                    </Button>
                                </VStack>
                            </VStack>
                        )}
                    </Box>
                </Box>
            </Modal>

            {/* Reusable Confirmation Modals */}
            <ConfirmationModal
                isVisible={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={() => {
                    setShowLogoutModal(false);
                    // Handle logout
                }}
                title="Logout Confirmation"
                message="Are you sure you want to logout? You'll need to sign in again."
                confirmText="Logout"
                cancelText="Stay"
                confirmColor={AppTheme.colors.error[500]}
                icon="logout"
            />

            <ConfirmationModal
                isVisible={showLogoutAllModal}
                onClose={() => setShowLogoutAllModal(false)}
                onConfirm={() => {
                    setShowLogoutAllModal(false);
                    // Handle logout all devices logic
                }}
                title="Logout All Devices?"
                message="This will log you out from all devices where you're currently signed in. You'll need to sign in again on each device."
                confirmText="Logout All"
            />
        </>
    );
};
