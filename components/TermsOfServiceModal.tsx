// components/TermsOfServiceModal.tsx

import { AppTheme } from '@/constants/theme';
import { Box, Heading, HStack, Pressable, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import { Modal, Dimensions } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeProvider';

const { height: screenHeight } = Dimensions.get("window");

interface TermsOfServiceModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({
  isVisible,
  onClose,
}) => {
  const { isDark } = useTheme();

  // Unicode for bullet points
  const bullet = '\u2022';

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Box flex={1} backgroundColor="rgba(0,0,0,0.5)" justifyContent="flex-end">
        <Box
          backgroundColor={isDark ? AppTheme.colors.gray[900] : "#fff"}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          height={screenHeight * 0.9}
        >
          {/* Header with Orange Background */}
          <Box 
            backgroundColor={AppTheme.colors.orange[600]} 
            borderTopLeftRadius={20} 
            borderTopRightRadius={20} 
            p={AppTheme.spacing.lg}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <Text
                fontSize={AppTheme.typography.fontSizes.lg}
                fontWeight="700"
                color="#fff"
              >
                Terms of Service
              </Text>
              <Pressable onPress={onClose} p={AppTheme.spacing.xs}>
                <Icon name="close" size={24} color="#fff" />
              </Pressable>
            </HStack>
          </Box>

          {/* Content */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: AppTheme.spacing.lg, paddingBottom: AppTheme.spacing.xl }}
            showsVerticalScrollIndicator={false}
          >
            <VStack space="lg">

              {/* Effective Date */}
              <Box>
                <Text 
                  fontSize={AppTheme.typography.fontSizes.md}
                  fontWeight="700" 
                  color={isDark ? "#fff" : AppTheme.colors.gray[900]}
                  mb={AppTheme.spacing.xs}
                >
                  Effective Date: December 2024
                </Text>
                <Text
                  fontSize={AppTheme.typography.fontSizes.sm}
                  color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[600]}
                  lineHeight={20}
                >
                  By using QVuew, you agree to these terms and conditions.
                </Text>
              </Box>

              {/* Service Description */}
              <Box 
                backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.orange[50]} 
                borderRadius={AppTheme.borderRadius.lg} 
                p={AppTheme.spacing.lg}
              >
                <Text 
                  fontSize={AppTheme.typography.fontSizes.md}
                  fontWeight="700" 
                  color={isDark ? "#fff" : AppTheme.colors.gray[900]}
                  mb={AppTheme.spacing.sm}
                >
                  Service Description
                </Text>
                <Text
                  fontSize={AppTheme.typography.fontSizes.sm}
                  color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  lineHeight={20}
                >
                  QVuew provides digital queue management services that allow users to join, track, and manage their position in queues at participating businesses.
                </Text>
              </Box>

              {/* User Responsibilities */}
              <Box 
                backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.orange[50]} 
                borderRadius={AppTheme.borderRadius.lg} 
                p={AppTheme.spacing.lg}
              >
                <Text 
                  fontSize={AppTheme.typography.fontSizes.md}
                  fontWeight="700" 
                  color={isDark ? "#fff" : AppTheme.colors.gray[900]}
                  mb={AppTheme.spacing.sm}
                >
                  User Responsibilities
                </Text>
                <VStack space="xs">
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    {bullet} Provide accurate information during registration
                  </Text>
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    {bullet} Use the service responsibly and lawfully
                  </Text>
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    {bullet} Respect business policies and queue etiquette
                  </Text>
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    {bullet} Keep your account credentials secure
                  </Text>
                </VStack>
              </Box>

              {/* Service Availability */}
              <Box 
                backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.orange[50]} 
                borderRadius={AppTheme.borderRadius.lg} 
                p={AppTheme.spacing.lg}
              >
                <Text 
                  fontSize={AppTheme.typography.fontSizes.md}
                  fontWeight="700" 
                  color={isDark ? "#fff" : AppTheme.colors.gray[900]}
                  mb={AppTheme.spacing.sm}
                >
                  Service Availability
                </Text>
                <Text
                  fontSize={AppTheme.typography.fontSizes.sm}
                  color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  lineHeight={20}
                >
                  While we strive for 99.9% uptime, QVuew services may be temporarily unavailable due to maintenance, updates, or technical issues.
                </Text>
              </Box>

              {/* Limitation of Liability */}
              <Box 
                backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.orange[50]} 
                borderRadius={AppTheme.borderRadius.lg} 
                p={AppTheme.spacing.lg}
              >
                <Text 
                  fontSize={AppTheme.typography.fontSizes.md}
                  fontWeight="700" 
                  color={isDark ? "#fff" : AppTheme.colors.gray[900]}
                  mb={AppTheme.spacing.sm}
                >
                  Limitation of Liability
                </Text>
                <Text
                  fontSize={AppTheme.typography.fontSizes.sm}
                  color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  lineHeight={20}
                >
                  QVuew is not liable for any indirect, incidental, or consequential damages arising from the use of our services.
                </Text>
              </Box>

              {/* Account Termination */}
              <Box 
                backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.orange[50]} 
                borderRadius={AppTheme.borderRadius.lg} 
                p={AppTheme.spacing.lg}
              >
                <Text 
                  fontSize={AppTheme.typography.fontSizes.md}
                  fontWeight="700" 
                  color={isDark ? "#fff" : AppTheme.colors.gray[900]}
                  mb={AppTheme.spacing.sm}
                >
                  Account Termination
                </Text>
                <Text
                  fontSize={AppTheme.typography.fontSizes.sm}
                  color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  lineHeight={20}
                >
                  We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activities.
                </Text>
              </Box>

              {/* Contact Information */}
              <Box 
                backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.orange[50]} 
                borderRadius={AppTheme.borderRadius.lg} 
                p={AppTheme.spacing.lg}
              >
                <Text
                  fontSize={AppTheme.typography.fontSizes.sm}
                  color={AppTheme.colors.orange[600]}
                  lineHeight={20}
                >
                  For questions about these terms, contact us at{'\n'}legal@qvuew.com
                </Text>
              </Box>

              {/* Company Info */}
              <Box>
                <Text
                  fontSize={AppTheme.typography.fontSizes.xs}
                  color={isDark ? AppTheme.colors.gray[500] : AppTheme.colors.gray[500]}
                  textAlign="center"
                  mt={AppTheme.spacing.lg}
                >
                  {'\u00A9'} 2024 QVuew Technologies Pvt. Ltd.{'\n'}
                  Mumbai, India
                </Text>
              </Box>

            </VStack>
          </ScrollView>
        </Box>
      </Box>
    </Modal>
  );
};
