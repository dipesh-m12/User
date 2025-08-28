import { CommonHeader } from '@/components/CommonHeader';
import { AppTheme } from '@/constants/theme';
import { Box, Heading, HStack, Pressable, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HistoryDetailModal } from '../../components/HistoryDetailModal';
import { useTheme } from '../../components/ThemeProvider';
import { mockHistoryTickets, type HistoryTicket } from '../../constants/history';

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const formatDateShort = (date: Date): string => {
    return new Intl.DateTimeFormat('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(date);
};

export default function HistoryScreen() {
    const { isDark } = useTheme();
    const [selectedTicket, setSelectedTicket] = useState<HistoryTicket | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const handleTicketPress = (ticket: HistoryTicket) => {
        setSelectedTicket(ticket);
        setShowDetailModal(true);
    };

    const renderHistoryCard = (ticket: HistoryTicket) => (
        <Pressable
            key={ticket.id}
            onPress={() => handleTicketPress(ticket)}
            mb={AppTheme.spacing.md}
        >
            <Box
                backgroundColor={isDark ? AppTheme.colors.gray[800] : "#ffffff"}
                borderRadius={AppTheme.borderRadius.xl}
                p={AppTheme.spacing.lg}
                shadowColor="#000000"
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={0.1}
                shadowRadius={4}
                elevation={3}
            >
                <HStack justifyContent="space-between" alignItems="flex-start" mb={AppTheme.spacing.sm}>
                    {/* Left Section */}
                    <VStack flex={1}>
                        <Text
                            fontSize={AppTheme.typography.fontSizes.lg}
                            fontWeight="700"
                            color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.gray[900]}
                            mb={AppTheme.spacing.xs}
                        >
                            {ticket.businessName}
                        </Text>

                        <HStack alignItems="center" space="sm" mb={AppTheme.spacing.xs}>
                            <Text
                                fontSize={AppTheme.typography.fontSizes.sm}
                                color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                            >
                                {ticket.services.length} service{ticket.services.length > 1 ? 's' : ''} • Position #{ticket.queuePosition}
                            </Text>
                        </HStack>

                        <HStack alignItems="center" space="xs">
                            <Box
                                backgroundColor={isDark ? AppTheme.colors.success[900] : AppTheme.colors.success[200]}
                                borderRadius={AppTheme.borderRadius.sm}
                                px={AppTheme.spacing.sm}
                                py={2}
                            >
                                <Text
                                    fontSize={AppTheme.typography.fontSizes.xs}
                                    color={isDark ? AppTheme.colors.success[400] : AppTheme.colors.success[600]}
                                    fontWeight="600"
                                >
                                    {ticket.status}
                                </Text>
                            </Box>
                        </HStack>
                    </VStack>

                    {/* Right Section */}
                    <VStack alignItems="flex-end">
                        <Text
                            fontSize={AppTheme.typography.fontSizes.sm}
                            color={isDark ? AppTheme.colors.gray[500] : AppTheme.colors.gray[500]}
                            mb={AppTheme.spacing.xs}
                        >
                            {formatDateShort(ticket.completedDate)}
                        </Text>
                        <Text
                            fontSize={AppTheme.typography.fontSizes.lg}
                            fontWeight="700"
                            color={isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[600]}
                        >
                            {ticket.totalAmount === 0 ? 'Free' : formatCurrency(ticket.totalAmount)}
                        </Text>
                    </VStack>
                </HStack>

                {/* Chevron */}
                <HStack justifyContent="flex-end" alignItems="center">
                    <Icon
                        name="chevron-right"
                        size={20}
                        color={isDark ? AppTheme.colors.gray[500] : AppTheme.colors.gray[400]}
                    />
                </HStack>
            </Box>
        </Pressable>
    );

    return (
        <Box flex={1} backgroundColor={isDark ? AppTheme.colors.gray[900] : AppTheme.colors.blue[50]}>
            <CommonHeader />
            <LinearGradient
                colors={isDark ? AppTheme.gradients.darkBackground : AppTheme.gradients.background}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
            >
                <ScrollView flex={1} showsVerticalScrollIndicator={false}>
                    <VStack flex={1} px={AppTheme.spacing.lg} pt={AppTheme.spacing['2xl']} pb={AppTheme.spacing.xl}>

                        {/* History Title */}
                        <Heading
                            size="2xl"
                            color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.blue[900]}
                            fontWeight="700"
                            mb={AppTheme.spacing.lg}
                        >
                            History
                        </Heading>

                        {/* History Cards */}
                        <VStack space="md">
                            {mockHistoryTickets.map((ticket) => renderHistoryCard(ticket))}
                        </VStack>

                        {/* Empty State */}
                        {mockHistoryTickets.length === 0 && (
                            <VStack alignItems="center" justifyContent="center" py={AppTheme.spacing['2xl']}>
                                <Icon
                                    name="history"
                                    size={64}
                                    color={isDark ? AppTheme.colors.gray[600] : AppTheme.colors.gray[400]}
                                    style={{ marginBottom: AppTheme.spacing.lg }}
                                />
                                <Text
                                    fontSize={AppTheme.typography.fontSizes.lg}
                                    fontWeight="600"
                                    color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                                    textAlign="center"
                                    mb={AppTheme.spacing.sm}
                                >
                                    No History Yet
                                </Text>
                                <Text
                                    fontSize={AppTheme.typography.fontSizes.sm}
                                    color={isDark ? AppTheme.colors.gray[500] : AppTheme.colors.gray[500]}
                                    textAlign="center"
                                >
                                    Your completed queue tickets will appear here
                                </Text>
                            </VStack>
                        )}
                    </VStack>
                </ScrollView>

                {/* History Detail Modal */}
                <HistoryDetailModal
                    ticket={selectedTicket}
                    isVisible={showDetailModal}
                    onClose={() => setShowDetailModal(false)}
                />
            </LinearGradient>
        </Box>
    );
}
