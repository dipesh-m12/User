// components/CommonHeader.tsx
import { AppTheme } from '@/constants/theme';
import { Box, Heading, HStack, Text, VStack } from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const CommonHeader: React.FC = () => {
    return (
        <>
            <StatusBar style="dark" backgroundColor="#ffffff" />
            <Box
                backgroundColor="#ffffff"
                px={AppTheme.spacing.lg}
                pt={70} // Fixed status bar height
                pb={AppTheme.spacing.md}
                // Subtle shadow for depth
                shadowColor="#000000"
                shadowOffset={{ width: 0, height: 1 }}
                shadowOpacity={0.08}
                shadowRadius={3}
                elevation={3}
            >
                <HStack alignItems="center" justifyContent="space-between">
                    <VStack flex={1}>
                        <Heading
                            size="xl"
                            color={AppTheme.colors.blue[900]}
                            fontWeight="700"
                            mb={2}
                        >
                            QVuew Scanner
                        </Heading>
                        <Text
                            color={AppTheme.colors.blue[600]}
                            fontSize={AppTheme.typography.fontSizes.sm}
                        >
                            Scan QR codes to join queues
                        </Text>
                    </VStack>

                    <Box
                        backgroundColor={AppTheme.colors.blue[600]}
                        borderRadius={12}
                        p={12}
                    >
                        <Icon name="qr-code" size={24} color="#ffffff" />
                    </Box>
                </HStack>
            </Box>
        </>
    );
};
