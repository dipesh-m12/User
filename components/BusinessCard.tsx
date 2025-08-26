import { AppTheme } from '@/constants/theme';
import { Box, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeProvider';
import type { Business } from '../constants/exploreMockData';

interface BusinessCardProps {
  business: Business;
  onPress: () => void;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business, onPress }) => {
  const { isDark } = useTheme();

  return (
    <Pressable onPress={onPress} mb={AppTheme.spacing.md}>
      <Box
        backgroundColor={isDark ? AppTheme.colors.gray[800] : "#ffffff"}
        borderRadius={AppTheme.borderRadius.xl}
        p={AppTheme.spacing.md}
        shadowColor="#000000"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={4}
        elevation={3}
      >
        <HStack space="md" alignItems="flex-start">
          {/* Business Image/Icon */}
          <Box
            w={60}
            h={60}
            backgroundColor={AppTheme.colors.gray[200]}
            borderRadius={AppTheme.borderRadius.lg}
            alignItems="center"
            justifyContent="center"
          >
            <Icon 
              name={business.category === 'Beauty & Wellness' ? 'spa' : 
                    business.category === 'Restaurant' ? 'restaurant' :
                    business.category === 'Healthcare' ? 'local-hospital' : 'business'}
              size={24} 
              color={AppTheme.colors.blue[600]} 
            />
          </Box>

          {/* Business Info */}
          <VStack flex={1} space="xs">
            <HStack justifyContent="space-between" alignItems="flex-start">
              <VStack flex={1}>
                <HStack alignItems="center" space="xs">
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.md}
                    fontWeight="600"
                    color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.gray[900]}
                    flex={1}
                  >
                    {business.name}
                  </Text>
                  {business.isPremium && (
                    <Box
                      backgroundColor="#FFB800"
                      borderRadius={AppTheme.borderRadius.sm}
                      px={AppTheme.spacing.xs}
                      py={2}
                    >
                      <Text 
                        fontSize={AppTheme.typography.fontSizes.xs}
                        fontWeight="700"
                        color="#000000"
                      >
                        PREMIUM
                      </Text>
                    </Box>
                  )}
                </HStack>
                
                <Text 
                  fontSize={AppTheme.typography.fontSizes.sm}
                  color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                >
                  {business.category}
                </Text>
              </VStack>
            </HStack>

            {/* Rating and Distance */}
            <HStack alignItems="center" space="md">
              <HStack alignItems="center" space="xs">
                <Icon name="star" size={16} color="#FFB800" />
                <Text 
                  fontSize={AppTheme.typography.fontSizes.sm}
                  fontWeight="500"
                  color={isDark ? AppTheme.colors.gray[200] : AppTheme.colors.gray[700]}
                >
                  {business.rating}
                </Text>
              </HStack>
              
              <HStack alignItems="center" space="xs">
                <Icon 
                  name="location-on" 
                  size={16} 
                  color={isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[600]} 
                />
                <Text 
                  fontSize={AppTheme.typography.fontSizes.sm}
                  color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                >
                  {business.distance} mi
                </Text>
              </HStack>

              {business.isLiveQueue && (
                <HStack alignItems="center" space="xs">
                  <Box w={8} h={8} backgroundColor={AppTheme.colors.success[500]} borderRadius={4} />
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.xs}
                    color={AppTheme.colors.success[600]}
                    fontWeight="500"
                  >
                    Live queue data
                  </Text>
                </HStack>
              )}
            </HStack>

            {/* Queue Info */}
            <HStack space="md" mt={AppTheme.spacing.xs}>
              <Box
                backgroundColor="#FFF3CD"
                borderRadius={AppTheme.borderRadius.sm}
                px={AppTheme.spacing.sm}
                py={AppTheme.spacing.xs}
              >
                <Text fontSize={AppTheme.typography.fontSizes.xs} color="#856404" fontWeight="500">
                  {business.queueCount} in queue
                </Text>
              </Box>
              
              <Box
                backgroundColor="#E1F5FE"
                borderRadius={AppTheme.borderRadius.sm}
                px={AppTheme.spacing.sm}
                py={AppTheme.spacing.xs}
              >
                <Text fontSize={AppTheme.typography.fontSizes.xs} color="#01579B" fontWeight="500">
                  {business.estimatedWait} mins wait
                </Text>
              </Box>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};
