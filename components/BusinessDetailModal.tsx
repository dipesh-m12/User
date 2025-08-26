import { AppTheme } from '@/constants/theme';
import { Box, Button, ButtonText, Heading, HStack, Pressable, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { Dimensions, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import type { Business } from '../constants/exploreMockData';
import { useTheme } from './ThemeProvider';

const { height: screenHeight } = Dimensions.get('window');

interface BusinessDetailModalProps {
  business: Business | null;
  isVisible: boolean;
  onClose: () => void;
  onCallBusiness: () => void;
}

export const BusinessDetailModal: React.FC<BusinessDetailModalProps> = ({
  business,
  isVisible,
  onClose,
  onCallBusiness
}) => {
  const { isDark } = useTheme();

  if (!business) return null;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Box flex={1} backgroundColor="rgba(0,0,0,0.5)" justifyContent="flex-end">

        {/* Modal Container */}
        <Box
          backgroundColor={isDark ? AppTheme.colors.gray[900] : "#ffffff"}
          borderTopLeftRadius={AppTheme.borderRadius.xl}
          borderTopRightRadius={AppTheme.borderRadius.xl}
          maxHeight={screenHeight * 0.9}
          flex={1}
        >

          {/* Header - FIXED */}
          <Box
            backgroundColor={AppTheme.colors.blue[600]}
            borderTopLeftRadius={AppTheme.borderRadius.xl}
            borderTopRightRadius={AppTheme.borderRadius.xl}
            p={AppTheme.spacing.lg}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <VStack flex={1}>
                <HStack alignItems="center" space="xs" mb={AppTheme.spacing.xs}>
                  <Heading size="lg" color="#ffffff" fontWeight="700">
                    {business.name}
                  </Heading>
                  {business.isPremium && (
                    <Box
                      backgroundColor="#FFB800"
                      borderRadius={AppTheme.borderRadius.sm}
                      px={AppTheme.spacing.xs}
                      py={2}
                    >
                      <Text fontSize={AppTheme.typography.fontSizes.xs} fontWeight="700" color="#000000">
                        PREMIUM
                      </Text>
                    </Box>
                  )}
                </HStack>
                <Text color="#ffffff" fontSize={AppTheme.typography.fontSizes.sm} opacity={0.9}>
                  {business.category}
                </Text>
                <Text color="#ffffff" fontSize={AppTheme.typography.fontSizes.sm} opacity={0.8}>
                  {business.address}
                </Text>
              </VStack>

              <Pressable onPress={onClose} p={AppTheme.spacing.xs}>
                <Icon name="close" size={24} color="#ffffff" />
              </Pressable>
            </HStack>
          </Box>

          {/* Stats Bar - FIXED */}
          <Box backgroundColor="#ffffff" p={AppTheme.spacing.md}>
            <HStack justifyContent="space-around">
              <VStack alignItems="center">
                <HStack alignItems="center" space="xs">
                  <Icon name="star" size={20} color="#FFB800" />
                  <Text fontSize={AppTheme.typography.fontSizes.lg} fontWeight="700" color="#FFB800">
                    {business.rating}
                  </Text>
                </HStack>
                <Text fontSize={AppTheme.typography.fontSizes.xs} color={AppTheme.colors.gray[600]}>
                  Rating
                </Text>
              </VStack>

              <VStack alignItems="center">
                <Text fontSize={AppTheme.typography.fontSizes.lg} fontWeight="700" color={AppTheme.colors.success[500]}>
                  {business.distance}
                </Text>
                <Text fontSize={AppTheme.typography.fontSizes.xs} color={AppTheme.colors.gray[600]}>
                  Miles Away
                </Text>
              </VStack>
            </HStack>
          </Box>

          {/* Queue Info - FIXED */}
          <Box backgroundColor={AppTheme.colors.blue[50]} p={AppTheme.spacing.md}>
            <HStack justifyContent="space-around">
              <VStack alignItems="center">
                <Text fontSize={AppTheme.typography.fontSizes.xl} fontWeight="700" color="#FF9800">
                  {business.queueCount}
                </Text>
                <Text fontSize={AppTheme.typography.fontSizes.xs} color={AppTheme.colors.gray[700]}>
                  In Queue
                </Text>
              </VStack>

              <VStack alignItems="center">
                <Text fontSize={AppTheme.typography.fontSizes.xl} fontWeight="700" color="#9C27B0">
                  {business.estimatedWait} mins
                </Text>
                <Text fontSize={AppTheme.typography.fontSizes.xs} color={AppTheme.colors.gray[700]}>
                  Est. Wait
                </Text>
              </VStack>
            </HStack>
          </Box>

          {/* ✅ ALL CONTENT SECTIONS - SCROLLABLE */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingHorizontal: AppTheme.spacing.lg,
              paddingVertical: AppTheme.spacing.lg,
              paddingBottom: AppTheme.spacing.xl
            }}
            showsVerticalScrollIndicator={true}
          >

            {/* 1. OPERATING HOURS SECTION */}
            <VStack mb={AppTheme.spacing.xl}>
              <HStack alignItems="center" space="xs" mb={AppTheme.spacing.md}>
                <Icon name="access-time" size={20} color={AppTheme.colors.gray[700]} />
                <Heading size="md" color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.gray[900]}>
                  Operating Hours
                </Heading>
              </HStack>

              {Object.entries(business.operatingHours).map(([day, hours]) => (
                <HStack key={day} justifyContent="space-between" py={AppTheme.spacing.xs}>
                  <Text
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                    fontWeight="500"
                    minWidth={15}
                  >
                    {day}
                  </Text>
                  <Text
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                  >
                    {hours.open === 'Closed' ? 'Closed' : `${hours.open} - ${hours.close}`}
                  </Text>
                </HStack>
              ))}
            </VStack>

            {/* 2. SERVICES SECTION */}
            <VStack mb={AppTheme.spacing.xl}>
              <Heading size="md" color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.gray[900]} mb={AppTheme.spacing.md}>
                Available Services
              </Heading>

              {business.services.map((service) => (
                <Box
                  key={service.id}
                  backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.gray[50]}
                  borderRadius={AppTheme.borderRadius.lg}
                  p={AppTheme.spacing.md}
                  mb={AppTheme.spacing.sm}
                >
                  <HStack justifyContent="space-between" alignItems="flex-start">
                    <VStack flex={1} mr={AppTheme.spacing.md}>
                      <Text
                        fontSize={AppTheme.typography.fontSizes.md}
                        fontWeight="600"
                        color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.gray[900]}
                        mb={AppTheme.spacing.xs}
                      >
                        {service.name}
                      </Text>
                      <Text
                        fontSize={AppTheme.typography.fontSizes.sm}
                        color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                        mb={AppTheme.spacing.xs}
                      >
                        {service.description}
                      </Text>
                      <Text
                        fontSize={AppTheme.typography.fontSizes.sm}
                        color={AppTheme.colors.blue[600]}
                        fontWeight="500"
                      >
                        {service.duration} mins
                      </Text>
                    </VStack>
                    <Text
                      fontSize={AppTheme.typography.fontSizes.lg}
                      fontWeight="700"
                      color={AppTheme.colors.blue[600]}
                    >
                      ₹{service.price}
                    </Text>
                  </HStack>
                </Box>
              ))}
            </VStack>

            {/* 3. REVIEWS SECTION */}
            <VStack mb={AppTheme.spacing.xl}>
              <Heading size="md" color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.gray[900]} mb={AppTheme.spacing.md}>
                Customer Reviews
              </Heading>

              {business.reviews.map((review) => (
                <Box
                  key={review.id}
                  backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.gray[50]}
                  borderRadius={AppTheme.borderRadius.lg}
                  p={AppTheme.spacing.md}
                  mb={AppTheme.spacing.sm}
                >
                  <HStack alignItems="center" space="md" mb={AppTheme.spacing.sm}>
                    <Box
                      w={40}
                      h={40}
                      backgroundColor={AppTheme.colors.blue[600]}
                      borderRadius={AppTheme.borderRadius.full}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text
                        fontSize={AppTheme.typography.fontSizes.md}
                        fontWeight="700"
                        color="#ffffff"
                      >
                        {review.profilePic}
                      </Text>
                    </Box>

                    <VStack flex={1}>
                      <HStack justifyContent="space-between" alignItems="center">
                        <Text
                          fontSize={AppTheme.typography.fontSizes.sm}
                          fontWeight="600"
                          color={isDark ? AppTheme.colors.gray[200] : AppTheme.colors.gray[800]}
                        >
                          {review.customerName}
                        </Text>
                        <HStack alignItems="center" space="xs">
                          {[...Array(5)].map((_, i) => (
                            <Icon
                              key={i}
                              name="star"
                              size={14}
                              color={i < review.rating ? "#FFB800" : AppTheme.colors.gray[400]}
                            />
                          ))}
                        </HStack>
                      </HStack>
                      <Text
                        fontSize={AppTheme.typography.fontSizes.xs}
                        color={isDark ? AppTheme.colors.gray[500] : AppTheme.colors.gray[500]}
                      >
                        {review.date} • {review.serviceUsed}
                      </Text>
                    </VStack>
                  </HStack>

                  <Text
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                    lineHeight={18}
                  >
                    {review.comment}
                  </Text>
                </Box>
              ))}
            </VStack>

            {/* 4. CONTACT INFO SECTION */}
            <VStack mb={AppTheme.spacing.xl}>
              <Heading size="md" color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.gray[900]} mb={AppTheme.spacing.md}>
                Contact Information
              </Heading>

              <VStack space="md">
                <HStack alignItems="center" space="md">
                  <Icon name="phone" size={20} color={AppTheme.colors.blue[600]} />
                  <Text
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    {business.phone}
                  </Text>
                </HStack>

                <HStack alignItems="center" space="md">
                  <Icon name="email" size={20} color={AppTheme.colors.blue[600]} />
                  <Text
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={AppTheme.colors.blue[600]}
                  >
                    {business.email}
                  </Text>
                </HStack>

                <HStack alignItems="center" space="md">
                  <Icon name="language" size={20} color={AppTheme.colors.blue[600]} />
                  <Text
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={AppTheme.colors.blue[600]}
                  >
                    {business.website}
                  </Text>
                </HStack>
              </VStack>
            </VStack>

            {/* 5. AMENITIES SECTION */}
            <VStack>
              <Heading size="md" color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.gray[900]} mb={AppTheme.spacing.md}>
                Amenities
              </Heading>

              <HStack flexWrap="wrap" space="sm">
                {business.amenities.map((amenity, index) => (
                  <Box
                    key={index}
                    backgroundColor={AppTheme.colors.blue[100]}
                    borderRadius={AppTheme.borderRadius.full}
                    px={AppTheme.spacing.md}
                    py={AppTheme.spacing.sm}
                    mb={AppTheme.spacing.sm}
                  >
                    <Text
                      fontSize={AppTheme.typography.fontSizes.sm}
                      color={AppTheme.colors.blue[700]}
                      fontWeight="500"
                    >
                      {amenity}
                    </Text>
                  </Box>
                ))}
              </HStack>
            </VStack>
          </ScrollView>

          {/* ACTION BUTTONS - FIXED AT BOTTOM */}
          <Box
            p={AppTheme.spacing.lg}
            backgroundColor={isDark ? AppTheme.colors.gray[900] : "#ffffff"}
            borderTopWidth={1}
            borderTopColor={isDark ? AppTheme.colors.gray[700] : AppTheme.colors.gray[200]}
          >
            <Button
              onPress={onClose}
              backgroundColor={AppTheme.colors.gray[500]}
              borderRadius={AppTheme.borderRadius.lg}
              h={40}
              mb={AppTheme.spacing.sm}
            >
              <ButtonText color="#ffffff" fontWeight="600">
                Close
              </ButtonText>
            </Button>

            <Button
              onPress={onCallBusiness}
              backgroundColor={AppTheme.colors.success[500]}
              borderRadius={AppTheme.borderRadius.lg}
              h={52}
            >
              <HStack alignItems="center" space="md">
                <Icon name="phone" size={20} color="#ffffff" />
                <ButtonText color="#ffffff" fontWeight="700" fontSize={AppTheme.typography.fontSizes.md}>
                  Call Business
                </ButtonText>
              </HStack>
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
