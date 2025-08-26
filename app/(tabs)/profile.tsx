// app/(tabs)/profile.tsx
import { AboutQVuewModal } from '@/components/AboutQVuewModal';
import { PrivacyPolicyModal } from '@/components/PrivacyPolicyModal';
import { AppTheme } from '@/constants/theme';
import { Box, Heading, HStack, Pressable, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HelpSupportModal } from '../../components/HelpSupportModal';
import { SecurityModal } from '../../components/SecurityModal';
import { SettingsModal } from '../../components/SettingsModal';
import { TermsOfServiceModal } from '../../components/TermsOfServiceModal';
import { useTheme } from '../../components/ThemeProvider';
import { mockUser, type User } from '../../constants/profileTypes';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { CommonHeader } from '@/components/CommonHeader';


export default function ProfileScreen() {
    const { isDark } = useTheme();
    const [user] = useState<User>(mockUser);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [showPrivacyPolicyModal, setShowPrivacyPolicyModal] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showSecurityModal, setShowSecurityModal] = useState(false);
    // console.log('showSecurityModal:', showSecurityModal);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);




    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout', style: 'destructive', onPress: () => {
                        // Handle logout logic here
                        Alert.alert('Logged Out', 'You have been successfully logged out.');
                    }
                }
            ]
        );
    };

    const renderMenuItem = (
        icon: string,
        iconColor: string,
        iconBg: string,
        title: string,
        onPress: () => void
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

                <Text
                    flex={1}
                    fontSize={AppTheme.typography.fontSizes.md}
                    fontWeight="500"
                    color={isDark ? AppTheme.colors.gray[100] : AppTheme.colors.gray[900]}
                >
                    {title}
                </Text>

                <Icon
                    name="chevron-right"
                    size={24}
                    color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[500]}
                />
            </HStack>
        </Pressable>
    );

    return (
        <Box flex={1} backgroundColor={isDark ? AppTheme.colors.gray[900] : AppTheme.colors.blue[50]}>
            <CommonHeader />
            <LinearGradient
                colors={isDark ? AppTheme.gradients.dark : AppTheme.gradients.background}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
            >
                <ScrollView flex={1} showsVerticalScrollIndicator={false}>
                    <VStack flex={1} px={AppTheme.spacing.lg} pt={AppTheme.spacing['2xl']} pb={AppTheme.spacing.xl}>


                        {/* Profile Title */}
                        <Heading
                            size="2xl"
                            color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.blue[900]}
                            fontWeight="700"
                            mb={AppTheme.spacing.lg}
                        >
                            Profile
                        </Heading>

                        {/* User Info Card */}
                        <Box
                            backgroundColor={isDark ? AppTheme.colors.gray[800] : "#ffffff"}
                            borderRadius={AppTheme.borderRadius.xl}
                            p={AppTheme.spacing.lg}
                            mb={AppTheme.spacing.lg}
                            shadowColor="#000000"
                            shadowOffset={{ width: 0, height: 2 }}
                            shadowOpacity={0.1}
                            shadowRadius={4}
                            elevation={3}
                        >
                            <HStack alignItems="center" space="md">
                                {/* Profile Avatar */}
                                <Box
                                    w={60}
                                    h={60}
                                    backgroundColor={AppTheme.colors.blue[600]}
                                    borderRadius={AppTheme.borderRadius.full}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Text
                                        fontSize={AppTheme.typography.fontSizes.xl}
                                        fontWeight="700"
                                        color="#ffffff"
                                    >
                                        {user.name.charAt(0)}
                                    </Text>
                                </Box>

                                <VStack flex={1}>
                                    <Text
                                        fontSize={AppTheme.typography.fontSizes.lg}
                                        fontWeight="700"
                                        color={isDark ? AppTheme.colors.gray[100] : AppTheme.colors.gray[900]}
                                        mb={AppTheme.spacing.xs}
                                    >
                                        {user.name}
                                    </Text>
                                    <Text
                                        fontSize={AppTheme.typography.fontSizes.sm}
                                        color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                                    >
                                        {user.email}
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>

                        {/* Menu Items */}
                        <VStack space="xs">

                            {renderMenuItem(
                                'settings',
                                '#ffffff',
                                AppTheme.colors.gray[500],
                                'Settings',
                                () => setShowSettingsModal(true)
                            )}

                            {renderMenuItem(
                                'info',
                                '#ffffff',
                                AppTheme.colors.blue[500],
                                'About QVuew',
                                () => setShowAboutModal(true)
                            )}

                            {renderMenuItem(
                                'privacy-tip',
                                '#ffffff',
                                AppTheme.colors.purple[500],
                                'Privacy Policy',
                                () => setShowPrivacyPolicyModal(true)
                            )}

                            {renderMenuItem(
                                'description',
                                '#ffffff',
                                AppTheme.colors.orange[500],
                                'Terms of Service',
                                () => setShowTermsModal(true)
                            )}

                            {renderMenuItem(
                                'security',
                                '#ffffff',
                                AppTheme.colors.success[500],
                                'Security',

                                () => {
                                    console.log('Security button pressed');
                                    setShowSecurityModal(true)
                                }
                            )}

                            {renderMenuItem(
                                'help',
                                '#ffffff',
                                AppTheme.colors.success[600],
                                'Help & Support',
                                () => setShowHelpModal(true)
                            )}

                            {renderMenuItem(
                                'logout',
                                '#ffffff',
                                AppTheme.colors.error[500],
                                'Logout',
                                () => setShowLogoutModal(true)
                            )}

                        </VStack>
                    </VStack>
                </ScrollView>
                {/* ✅ Modal rendered conditionally outside menu */}
                <ConfirmationModal
                    isVisible={showLogoutModal}
                    onClose={() => setShowLogoutModal(false)}
                    onConfirm={() => {
                        setShowLogoutModal(false);
                        // Handle logout logic
                        Alert.alert('Logged Out', 'You have been successfully logged out.');
                    }}
                    title="Logout Confirmation"
                    message="Are you sure you want to logout? You'll need to sign in again to access your account."
                    confirmText="Logout"
                />

                {/* Settings Modal */}
                <SettingsModal
                    isVisible={showSettingsModal}
                    onClose={() => setShowSettingsModal(false)}
                />
                <AboutQVuewModal isVisible={showAboutModal} onClose={() => setShowAboutModal(false)} />
                <PrivacyPolicyModal
                    isVisible={showPrivacyPolicyModal}
                    onClose={() => setShowPrivacyPolicyModal(false)}
                />
                <TermsOfServiceModal
                    isVisible={showTermsModal}
                    onClose={() => setShowTermsModal(false)}
                />
                {/* Security Modal */}
                <SecurityModal
                    isVisible={showSecurityModal}
                    onClose={() => setShowSecurityModal(false)}
                />
                <HelpSupportModal
                    isVisible={showHelpModal}
                    onClose={() => setShowHelpModal(false)}
                />
            </LinearGradient>
        </Box>
    );
}
