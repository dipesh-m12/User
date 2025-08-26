import { AppTheme } from '@/constants/theme';
import { Box, Button, ButtonText, HStack, Input, InputField, Pressable, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { Alert, Dimensions, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { HistoryTicket } from '../constants/history';
import { useTheme } from './ThemeProvider';

const { height: screenHeight } = Dimensions.get('window');

interface HistoryDetailModalProps {
    ticket: HistoryTicket | null;
    isVisible: boolean;
    onClose: () => void;
}

// ✅ Rating Labels for Dynamic Display
const ratingLabels = ['Poor', 'Fair', 'Average', 'Good', 'Excellent'];

export const HistoryDetailModal: React.FC<HistoryDetailModalProps> = ({
    ticket,
    isVisible,
    onClose
}) => {
    const { isDark } = useTheme();
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    if (!ticket) return null;

    const formatDate = (date: Date): string => {
        return new Intl.DateTimeFormat('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(date);
    };

    const renderStarRating = () => (
        <VStack space="sm" alignItems="center" mb={AppTheme.spacing.lg}>
            <HStack space="xs" alignItems="center" justifyContent="center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Pressable key={star} onPress={() => setRating(star)}>
                        <Icon
                            name="star"
                            size={40}
                            color={star <= rating ? "#FFB800" : AppTheme.colors.gray[300]}
                        />
                    </Pressable>
                ))}
            </HStack>

            {/* ✅ Dynamic Rating Label */}
            <Text
                fontSize={AppTheme.typography.fontSizes.lg}
                fontWeight="600"
                color={rating > 0 ? AppTheme.colors.blue[600] : isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                textAlign="center"
                mt={AppTheme.spacing.sm}
            >
                {rating > 0 ? ratingLabels[rating - 1] : 'Tap a star to rate'}
            </Text>
        </VStack>
    );

    const submitFeedback = () => {
        if (rating === 0) {
            Alert.alert('Rating Required', 'Please select a rating before submitting.');
            return;
        }

        Alert.alert(
            'Thank you!',
            `Your feedback for ${ticket.businessName} has been submitted.`,
            [{ text: 'OK', onPress: onClose }]
        );
    };

    return (
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
                    // ✅ Increased Opening Size - Now 95% of screen height
                    height={screenHeight * 0.75}
                    minHeight={600}
                >
                    {/* Header */}
                    <Box p={AppTheme.spacing.lg} borderBottomWidth={1} borderBottomColor={isDark ? AppTheme.colors.gray[700] : AppTheme.colors.gray[200]}>
                        <HStack justifyContent="space-between" alignItems="flex-start">
                            <HStack alignItems="center" space="md" flex={1}>
                                {/* Business Icon */}
                                <Box
                                    w={50}
                                    h={50}
                                    backgroundColor={AppTheme.colors.gray[200]}
                                    borderRadius={AppTheme.borderRadius.lg}
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Text
                                        fontSize={AppTheme.typography.fontSizes.lg}
                                        fontWeight="700"
                                        color={AppTheme.colors.gray[700]}
                                    >
                                        {ticket.businessName.charAt(0)}
                                    </Text>
                                </Box>

                                <VStack flex={1}>
                                    <Text
                                        fontSize={AppTheme.typography.fontSizes.lg}
                                        fontWeight="700"
                                        color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.gray[900]}
                                        mb={AppTheme.spacing.xs}
                                    >
                                        {ticket.businessName}
                                    </Text>

                                    <Box
                                        backgroundColor={AppTheme.colors.success[200]}
                                        borderRadius={AppTheme.borderRadius.sm}
                                        px={AppTheme.spacing.sm}
                                        py={2}
                                        alignSelf="flex-start"
                                    >
                                        <Text
                                            fontSize={AppTheme.typography.fontSizes.xs}
                                            color={AppTheme.colors.success[600]}
                                            fontWeight="600"
                                        >
                                            {ticket.status}
                                        </Text>
                                    </Box>
                                </VStack>
                            </HStack>

                            <Pressable onPress={onClose} p={AppTheme.spacing.xs}>
                                <Icon name="close" size={24} color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]} />
                            </Pressable>
                        </HStack>
                    </Box>

                    {/* Scrollable Content */}
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ paddingBottom: AppTheme.spacing.xl }}
                        showsVerticalScrollIndicator={false}
                    >
                        <VStack px={AppTheme.spacing.lg} py={AppTheme.spacing.lg} space="xl">

                            {/* Visit Details */}
                            <VStack space="sm">
                                <Text
                                    fontSize={AppTheme.typography.fontSizes.md}
                                    fontWeight="700"
                                    color={isDark ? AppTheme.colors.gray[200] : AppTheme.colors.gray[800]}
                                    mb={AppTheme.spacing.sm}
                                >
                                    Visit Details
                                </Text>

                                <VStack space="sm">
                                    <HStack justifyContent="space-between" py={AppTheme.spacing.xs}>
                                        <Text
                                            fontSize={AppTheme.typography.fontSizes.sm}
                                            color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                                            fontWeight="500"
                                        >
                                            Date & Time
                                        </Text>
                                        <Text
                                            fontSize={AppTheme.typography.fontSizes.sm}
                                            color={isDark ? AppTheme.colors.gray[200] : AppTheme.colors.gray[800]}
                                            textAlign="right"
                                            flex={1}
                                            ml={AppTheme.spacing.md}
                                        >
                                            {formatDate(ticket.completedDate)}
                                        </Text>
                                    </HStack>

                                    <HStack justifyContent="space-between" py={AppTheme.spacing.xs}>
                                        <Text
                                            fontSize={AppTheme.typography.fontSizes.sm}
                                            color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                                            fontWeight="500"
                                        >
                                            Queue Position
                                        </Text>
                                        <Text
                                            fontSize={AppTheme.typography.fontSizes.sm}
                                            color={isDark ? AppTheme.colors.gray[200] : AppTheme.colors.gray[800]}
                                            fontWeight="600"
                                        >
                                            #{ticket.queuePosition}
                                        </Text>
                                    </HStack>

                                    <HStack justifyContent="space-between" py={AppTheme.spacing.xs}>
                                        <Text
                                            fontSize={AppTheme.typography.fontSizes.sm}
                                            color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                                            fontWeight="500"
                                        >
                                            Wait Time
                                        </Text>
                                        <Text
                                            fontSize={AppTheme.typography.fontSizes.sm}
                                            color={isDark ? AppTheme.colors.gray[200] : AppTheme.colors.gray[800]}
                                        >
                                            {ticket.waitTime} minutes
                                        </Text>
                                    </HStack>
                                </VStack>
                            </VStack>

                            {/* Services */}
                            <VStack space="sm">
                                <Text
                                    fontSize={AppTheme.typography.fontSizes.md}
                                    fontWeight="700"
                                    color={isDark ? AppTheme.colors.gray[200] : AppTheme.colors.gray[800]}
                                    mb={AppTheme.spacing.sm}
                                >
                                    Services
                                </Text>

                                <VStack space="sm">
                                    {ticket.services.map((service) => (
                                        <HStack key={service.id} justifyContent="space-between" alignItems="center" py={AppTheme.spacing.sm}>
                                            <VStack flex={1}>
                                                <Text
                                                    fontSize={AppTheme.typography.fontSizes.md}
                                                    fontWeight="600"
                                                    color={isDark ? AppTheme.colors.gray[100] : AppTheme.colors.gray[900]}
                                                >
                                                    {service.name}
                                                </Text>
                                                <Text
                                                    fontSize={AppTheme.typography.fontSizes.sm}
                                                    color={AppTheme.colors.blue[600]}
                                                    mt={AppTheme.spacing.xs}
                                                >
                                                    Est. time: {service.duration} mins
                                                </Text>
                                            </VStack>
                                            <Text
                                                fontSize={AppTheme.typography.fontSizes.md}
                                                fontWeight="700"
                                                color={AppTheme.colors.blue[600]}
                                            >
                                                ₹{service.price}
                                            </Text>
                                        </HStack>
                                    ))}
                                </VStack>

                                {/* ✅ Enhanced Total with Light Blue Highlight Box */}
                                <Box
                                    backgroundColor={AppTheme.colors.blue[50]}
                                    borderRadius={AppTheme.borderRadius.lg}
                                    p={AppTheme.spacing.md}
                                    mt={AppTheme.spacing.md}
                                    borderWidth={2}
                                    borderColor={AppTheme.colors.blue[200]}
                                    shadowColor="#000000"
                                    shadowOffset={{ width: 0, height: 2 }}
                                    shadowOpacity={0.1}
                                    shadowRadius={4}
                                    elevation={3}
                                >
                                    <HStack justifyContent="space-between" alignItems="center">
                                        <Text
                                            fontSize={AppTheme.typography.fontSizes.lg}
                                            fontWeight="700"
                                            color={AppTheme.colors.blue[900]}
                                        >
                                            Total
                                        </Text>
                                        <Text
                                            fontSize={AppTheme.typography.fontSizes['lg']}
                                            fontWeight="700"
                                            color={AppTheme.colors.blue[700]}
                                        >
                                            ₹{ticket.totalAmount}
                                        </Text>
                                    </HStack>
                                </Box>
                            </VStack>

                            {/* ✅ Enhanced Feedback Section */}
                            <VStack space="lg">
                                <Text
                                    fontSize={AppTheme.typography.fontSizes.lg}
                                    fontWeight="700"
                                    color={isDark ? AppTheme.colors.gray[200] : AppTheme.colors.gray[800]}
                                >
                                    Your Feedback
                                </Text>

                                <VStack space="md">
                                    <Text
                                        fontSize={AppTheme.typography.fontSizes.md}
                                        color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                                        textAlign="center"
                                    >
                                        How was your experience at {ticket.businessName}?
                                    </Text>

                                    <VStack space="sm" alignItems="center">
                                        <Text
                                            fontSize={AppTheme.typography.fontSizes.md}
                                            fontWeight="600"
                                            color={isDark ? AppTheme.colors.gray[200] : AppTheme.colors.gray[800]}
                                            textAlign="center"
                                            mb={AppTheme.spacing.sm}
                                        >
                                            Rate your experience
                                        </Text>
                                        {renderStarRating()}
                                    </VStack>

                                    <VStack space="sm">
                                        <Text
                                            fontSize={AppTheme.typography.fontSizes.sm}
                                            fontWeight="600"
                                            color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                                        >
                                            Additional Comments (Optional)
                                        </Text>
                                        <Box
                                            backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.gray[50]}
                                            borderRadius={AppTheme.borderRadius.lg}
                                            borderWidth={1}
                                            borderColor={isDark ? AppTheme.colors.gray[600] : AppTheme.colors.gray[300]}
                                            p={AppTheme.spacing.md}
                                            minHeight={120}
                                        >
                                            <Input variant="outline" borderWidth={0} backgroundColor="transparent">
                                                <InputField
                                                    placeholder="Tell us more about your experience..."
                                                    value={feedback}
                                                    onChangeText={setFeedback}
                                                    multiline={true}
                                                    numberOfLines={5}
                                                    color={isDark ? AppTheme.colors.gray[100] : AppTheme.colors.gray[900]}
                                                    placeholderTextColor={isDark ? AppTheme.colors.gray[500] : AppTheme.colors.gray[500]}
                                                    textAlignVertical="top"
                                                />
                                            </Input>
                                        </Box>
                                        <Text
                                            fontSize={AppTheme.typography.fontSizes.xs}
                                            color={isDark ? AppTheme.colors.gray[500] : AppTheme.colors.gray[500]}
                                        >
                                            Share your thoughts to help improve the service • {feedback.length}/500
                                        </Text>
                                    </VStack>

                                    {/* Submit Feedback Button */}
                                    <Button
                                        backgroundColor={rating > 0 ? AppTheme.colors.blue[600] : AppTheme.colors.gray[400]}
                                        borderRadius={AppTheme.borderRadius.lg}
                                        h={52}
                                        onPress={submitFeedback}
                                        isDisabled={rating === 0}
                                        mt={AppTheme.spacing.md}
                                    >
                                        <ButtonText
                                            color="#ffffff"
                                            fontWeight="700"
                                            fontSize={AppTheme.typography.fontSizes.md}
                                        >
                                            Submit Feedback
                                        </ButtonText>
                                    </Button>
                                </VStack>
                            </VStack>
                        </VStack>
                    </ScrollView>

                    {/* Fixed Bottom Close Button */}
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
    );
};
