// components/SettingsModal.tsx
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { AppTheme } from '@/constants/theme';
import { Box, Button, ButtonText, HStack, Pressable, ScrollView, Switch, Text, VStack } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { Alert, Dimensions, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { mockSettings, type SettingsState } from '../constants/profileTypes';
import { LanguageSelectionModal } from './LanguageSelectionModal';
import { PrivacyPolicyModal } from './PrivacyPolicyModal'; // ✅ Import the modal
import { useTheme } from './ThemeProvider';


const { height: screenHeight } = Dimensions.get('window');

interface SettingsModalProps {
    isVisible: boolean;
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
    isVisible,
    onClose
}) => {
    const { isDark, toggleTheme } = useTheme();
    const [settings, setSettings] = useState<SettingsState>(mockSettings);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);



    const updateSetting = (key: keyof SettingsState, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        if (key === 'darkMode') {
            toggleTheme();
        }
    };
    // ✅ Handle Privacy & Security click
    const handlePrivacyClick = () => {
        setShowPrivacyModal(true);
    };
    const deleteAccount = () => {
        setShowDeleteAccountModal(true);
        // Handle account deletion logic here
    };

    // ✅ Handle Privacy modal close
    const handlePrivacyClose = () => {
        setShowPrivacyModal(false);
    };
    const handleLanguageClick = () => {
        setShowLanguageModal(true);
    };

    const handleLanguageClose = () => {
        setShowLanguageModal(false);
    };

    const handleLanguageSelect = (langCode: string) => {
        // update settings state with selected language
        setSettings(prev => ({ ...prev, language: langCode }));
        // here you could also call i18n.changeLanguage(langCode) if using i18next
    };


    const renderSettingItem = (
        icon: string,
        iconColor: string,
        iconBg: string,
        title: string,
        subtitle: string,
        rightComponent: React.ReactNode,
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
                    <Text
                        fontSize={AppTheme.typography.fontSizes.sm}
                        color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                    >
                        {subtitle}
                    </Text>
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
                onRequestClose={onClose}
            >
                <Box flex={1} backgroundColor="rgba(0,0,0,0.5)" justifyContent="flex-end">
                    <Box
                        backgroundColor={isDark ? AppTheme.colors.gray[900] : "#ffffff"}
                        borderTopLeftRadius={20}
                        borderTopRightRadius={20}
                        height={screenHeight * 0.85}
                    >
                        {/* Header */}
                        <Box
                            backgroundColor={AppTheme.colors.blue[600]}
                            borderTopLeftRadius={20}
                            borderTopRightRadius={20}
                            p={AppTheme.spacing.lg}
                        >
                            <HStack justifyContent="space-between" alignItems="center">
                                <HStack alignItems="center" space="md">
                                    <Box
                                        w={40}
                                        h={40}
                                        backgroundColor="rgba(255,255,255,0.2)"
                                        borderRadius={AppTheme.borderRadius.lg}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Icon name="settings" size={20} color="#ffffff" />
                                    </Box>
                                    <VStack>
                                        <Text
                                            fontSize={AppTheme.typography.fontSizes.lg}
                                            fontWeight="700"
                                            color="#ffffff"
                                        >
                                            Settings
                                        </Text>
                                        <Text
                                            fontSize={AppTheme.typography.fontSizes.sm}
                                            color="rgba(255,255,255,0.8)"
                                        >
                                            Manage your preferences
                                        </Text>
                                    </VStack>
                                </HStack>

                                <Pressable onPress={onClose} p={AppTheme.spacing.xs}>
                                    <Icon name="close" size={24} color="#ffffff" />
                                </Pressable>
                            </HStack>
                        </Box>

                        {/* Content */}
                        <ScrollView
                            style={{ flex: 1 }}
                            contentContainerStyle={{ padding: AppTheme.spacing.lg }}
                            showsVerticalScrollIndicator={false}
                        >
                            <VStack space="sm">

                                {/* Push Notifications */}
                                {renderSettingItem(
                                    'notifications-active',
                                    '#ffffff',
                                    AppTheme.colors.blue[500],
                                    'Push Notifications',
                                    'Get notified about queue updates',
                                    <Switch
                                        value={settings.pushNotifications}
                                        onValueChange={(value) => updateSetting('pushNotifications', value)}
                                        trackColor={{
                                            false: AppTheme.colors.gray[300],
                                            true: AppTheme.colors.blue[500]
                                        }}
                                        thumbColor={settings.pushNotifications ? '#ffffff' : '#ffffff'}
                                    />
                                )}
                                {/* Dark Mode */}
                                {renderSettingItem(
                                    'dark-mode',
                                    '#ffffff',
                                    AppTheme.colors.purple[600],
                                    'Dark Mode',
                                    'Switch to dark theme',
                                    <Switch
                                        value={settings.darkMode}
                                        onValueChange={(value) => updateSetting('darkMode', value)}
                                        trackColor={{
                                            false: AppTheme.colors.gray[300],
                                            true: AppTheme.colors.purple[500]
                                        }}
                                        thumbColor={settings.darkMode ? '#ffffff' : '#ffffff'}
                                    />
                                )}

                                {/* Language */}
                                {renderSettingItem(
                                    'language',
                                    '#ffffff',
                                    AppTheme.colors.success[500],
                                    'Language',
                                    settings.language,
                                    <Icon name="chevron-right" size={24} color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[500]}
                                    />, handleLanguageClick
                                )}

                                {/* Privacy & Security */}
                                {renderSettingItem(
                                    'security',
                                    '#ffffff',
                                    AppTheme.colors.error[500],
                                    'Privacy & Security',
                                    'Manage your data',
                                    <Icon name="chevron-right" size={24} color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[500]} />,
                                    handlePrivacyClick
                                )}
                                {/* Delete Account */}
                                {renderSettingItem(
                                    'delete-account',
                                    '#ffffff',
                                    AppTheme.colors.error[500],
                                    'Delete Account',
                                    'Permanently delete your account',
                                    <Icon name="chevron-right" size={24} color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[500]} />,
                                    deleteAccount
                                )}

                            </VStack>
                        </ScrollView>

                        {/* Bottom Close Button */}
                        <Box
                            p={AppTheme.spacing.lg}
                            backgroundColor={isDark ? AppTheme.colors.gray[900] : "#ffffff"}
                            borderTopWidth={1}
                            borderTopColor={isDark ? AppTheme.colors.gray[700] : AppTheme.colors.gray[200]}
                        >
                            <Button
                                backgroundColor={AppTheme.colors.gray[500]}
                                borderRadius={AppTheme.borderRadius.lg}
                                h={48}
                                onPress={onClose}
                            >
                                <ButtonText color="#ffffff" fontWeight="600">
                                    Close
                                </ButtonText>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            <PrivacyPolicyModal isVisible={showPrivacyModal} onClose={handlePrivacyClose} />
            <LanguageSelectionModal
                isVisible={showLanguageModal}
                currentLanguage={settings.language}
                onSelect={handleLanguageSelect}
                onClose={handleLanguageClose}
            />
            <ConfirmationModal
                isVisible={showDeleteAccountModal}
                onClose={() => setShowDeleteAccountModal(false)}
                onConfirm={() => {
                    setShowDeleteAccountModal(false);
                    // Handle delete account logic
                    Alert.alert('Account Deleted', 'Your account has been successfully deleted.');
                }}
                title="Delete Account Confirmation"
                message="Are you sure you want to delete your account? This action cannot be undone."
                confirmText="Delete Account"
            />

        </>
    );
};
