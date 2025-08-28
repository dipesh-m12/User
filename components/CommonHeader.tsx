// components/CommonHeader.tsx
import { AppTheme } from '@/constants/theme';
import { Box, Heading, HStack, Text, VStack } from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeProvider';

export const CommonHeader: React.FC = () => {
    const { isDark } = useTheme();

    // Dynamic colors based on theme
    const backgroundColor = isDark ? AppTheme.colors.dark.background : "#ffffff";
    const headingColor = isDark ? AppTheme.colors.text.dark.primary : AppTheme.colors.text.primary;
    const subTextColor = isDark ? AppTheme.colors.text.dark.secondary : AppTheme.colors.text.secondary;
    const iconBg = isDark ? AppTheme.colors.dark.surface : AppTheme.colors.blue[600];
    const iconColor = isDark ? AppTheme.colors.dark.accent : "#ffffff";

    return (
        <>
            <StatusBar
                style={isDark ? "light" : "dark"}
                backgroundColor={backgroundColor}
            />

            <Box
                backgroundColor={backgroundColor}
                px={AppTheme.spacing.lg}
                pt={70} // Adjust for status bar height
                pb={AppTheme.spacing.md}
                shadowColor="#000000"
                shadowOffset={{ width: 0, height: 1 }}
                shadowOpacity={0.08}
                shadowRadius={3}
                elevation={3}
            >
                <HStack alignItems="center" justifyContent="space-between">
                    {/* Title + Subtitle */}
                    <VStack flex={1}>
                        <Heading
                            size="xl"
                            color={headingColor}
                            fontWeight="700"
                            mb={2}
                        >
                            QVuew Scanner
                        </Heading>
                        <Text
                            color={subTextColor}
                            fontSize={AppTheme.typography.fontSizes.sm}
                        >
                            Scan QR codes to join queues
                        </Text>
                    </VStack>

                    {/* Icon Button */}
                    <Box
                        backgroundColor={iconBg}
                        borderRadius={12}
                        p={12}
                    >
                        <Icon name="qr-code" size={24} color={iconColor} />
                    </Box>
                </HStack>
            </Box>
        </>
    );
};
