import { AppTheme } from '@/constants/theme';
import {
    Box,
    Heading,
    HStack,
    Pressable,
    ScrollView,
    Text,
    VStack
} from '@gluestack-ui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../components/auth/AuthContext';
import { CommonHeader } from '../../components/CommonHeader';
import { useTheme } from '../../components/ThemeProvider';


export default function QRScannerScreen() {
    const { user } = useAuth();
    const { isDark } = useTheme();

    const handleScanQR = () => {
        // TODO: Implement QR scanner functionality
        Alert.alert('QR Scanner', 'QR Scanner will be implemented here');
    };

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

                        {/* Welcome Card */}
                        <Box
                            backgroundColor={isDark ? AppTheme.colors.gray[800] : "#ffffff"}
                            borderRadius={AppTheme.borderRadius.xl}
                            p={AppTheme.spacing.lg}
                            mb={AppTheme.spacing.xl}
                            shadowColor="#000000"
                            shadowOffset={{ width: 0, height: 4 }}
                            shadowOpacity={0.1}
                            shadowRadius={8}
                            elevation={4}
                        >
                            <HStack space="md" alignItems="flex-start">
                                {/* User Avatar */}
                                <Box
                                    w={48}
                                    h={48}
                                    backgroundColor={AppTheme.colors.blue[600]}
                                    borderRadius={AppTheme.borderRadius.lg}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Icon name="qr-code" size={24} color="#ffffff" />
                                </Box>

                                {/* Welcome Text */}
                                <VStack flex={1}>
                                    <Heading
                                        size="lg"
                                        color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.blue[900]}
                                        fontWeight="600"
                                        mb={AppTheme.spacing.xs}
                                    >
                                        Welcome back,{'\n'}
                                        {user?.firstName || 'Krishna'} {user?.lastName || 'Agrawal'}!
                                    </Heading>
                                    <Text
                                        color={isDark ? AppTheme.colors.blue[300] : AppTheme.colors.blue[600]}
                                        fontSize={AppTheme.typography.fontSizes.sm}
                                        mb={AppTheme.spacing.sm}
                                    >
                                        Ready to skip the wait?
                                    </Text>
                                    <Text
                                        color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                                        fontSize={AppTheme.typography.fontSizes.sm}
                                        lineHeight={20}
                                    >
                                        Scan any business QR code to instantly join their queue and receive real-time updates on your position.
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>

                        {/* Scan QR Code Button */}
                        <Pressable onPress={handleScanQR} mb={AppTheme.spacing.xl}>
                            <LinearGradient
                                colors={AppTheme.gradients.button}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    borderRadius: AppTheme.borderRadius.xl,
                                    paddingVertical: AppTheme.spacing.lg,
                                    paddingHorizontal: AppTheme.spacing.lg,
                                    shadowColor: AppTheme.colors.blue[600],
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 8,
                                    elevation: 6,
                                }}
                            >
                                <HStack alignItems="center" justifyContent="center" space="md">
                                    <Icon name="photo-camera" size={24} color="#ffffff" />
                                    <VStack alignItems="flex-start">
                                        <Text
                                            color="#ffffff"
                                            fontWeight="700"
                                            fontSize={AppTheme.typography.fontSizes.lg}
                                        >
                                            Scan QR Code
                                        </Text>
                                        <Text
                                            color="#ffffff"
                                            fontSize={AppTheme.typography.fontSizes.sm}
                                            opacity={0.9}
                                        >
                                            Point & scan to join queue
                                        </Text>
                                    </VStack>
                                </HStack>
                            </LinearGradient>
                        </Pressable>

                        {/* Helper Text */}
                        <Text
                            color={isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[600]}
                            fontSize={AppTheme.typography.fontSizes.sm}
                            textAlign="center"
                            mb={AppTheme.spacing.xl}
                        >
                            Look for QR codes at participating businesses
                        </Text>

                        {/* How it works Section */}
                        <Box
                            backgroundColor={isDark ? AppTheme.colors.gray[800] : "#ffffff"}
                            borderRadius={AppTheme.borderRadius.xl}
                            p={AppTheme.spacing.lg}
                            shadowColor="#000000"
                            shadowOffset={{ width: 0, height: 4 }}
                            shadowOpacity={0.1}
                            shadowRadius={8}
                            elevation={4}
                        >
                            <HStack alignItems="center" space="sm" mb={AppTheme.spacing.lg}>
                                <Box
                                    w={32}
                                    h={32}
                                    backgroundColor={AppTheme.colors.blue[600]}
                                    borderRadius={AppTheme.borderRadius.lg}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Icon name="help-outline" size={18} color="#ffffff" />
                                </Box>
                                <Heading
                                    size="md"
                                    color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.blue[900]}
                                    fontWeight="600"
                                >
                                    How it works
                                </Heading>
                            </HStack>

                            <VStack space="lg">
                                {/* Step 1 */}
                                <HStack alignItems="flex-start" space="md">
                                    <Box
                                        w={32}
                                        h={32}
                                        backgroundColor={AppTheme.colors.blue[600]}
                                        borderRadius={AppTheme.borderRadius.full}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Text color="#ffffff" fontWeight="700" fontSize={AppTheme.typography.fontSizes.sm}>
                                            1
                                        </Text>
                                    </Box>
                                    <VStack flex={1}>
                                        <Text
                                            color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.blue[900]}
                                            fontWeight="600"
                                            fontSize={AppTheme.typography.fontSizes.md}
                                            mb={AppTheme.spacing.xs}
                                        >
                                            Scan QR Code
                                        </Text>
                                        <Text
                                            color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                                            fontSize={AppTheme.typography.fontSizes.sm}
                                            lineHeight={18}
                                        >
                                            Find the QR code at any participating business location
                                        </Text>
                                    </VStack>
                                </HStack>

                                {/* Step 2 */}
                                <HStack alignItems="flex-start" space="md">
                                    <Box
                                        w={32}
                                        h={32}
                                        backgroundColor="#8B5CF6"
                                        borderRadius={AppTheme.borderRadius.full}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Text color="#ffffff" fontWeight="700" fontSize={AppTheme.typography.fontSizes.sm}>
                                            2
                                        </Text>
                                    </Box>
                                    <VStack flex={1}>
                                        <Text
                                            color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.blue[900]}
                                            fontWeight="600"
                                            fontSize={AppTheme.typography.fontSizes.md}
                                            mb={AppTheme.spacing.xs}
                                        >
                                            Select Services
                                        </Text>
                                        <Text
                                            color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                                            fontSize={AppTheme.typography.fontSizes.sm}
                                            lineHeight={18}
                                        >
                                            Choose from available services and see pricing upfront
                                        </Text>
                                    </VStack>
                                </HStack>

                                {/* Step 3 */}
                                <HStack alignItems="flex-start" space="md">
                                    <Box
                                        w={32}
                                        h={32}
                                        backgroundColor={AppTheme.colors.success[500]}
                                        borderRadius={AppTheme.borderRadius.full}
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Text color="#ffffff" fontWeight="700" fontSize={AppTheme.typography.fontSizes.sm}>
                                            3
                                        </Text>
                                    </Box>
                                    <VStack flex={1}>
                                        <Text
                                            color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.blue[900]}
                                            fontWeight="600"
                                            fontSize={AppTheme.typography.fontSizes.md}
                                            mb={AppTheme.spacing.xs}
                                        >
                                            Get Your Ticket
                                        </Text>
                                        <Text
                                            color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                                            fontSize={AppTheme.typography.fontSizes.sm}
                                            lineHeight={18}
                                        >
                                            Receive real-time updates and notifications on your position
                                        </Text>
                                    </VStack>
                                </HStack>
                            </VStack>
                        </Box>

                    </VStack>
                </ScrollView>
            </LinearGradient>
        </Box>
    );
}
