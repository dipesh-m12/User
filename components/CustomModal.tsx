import { AppTheme } from "@/constants/theme";
import {
  Box,
  Button,
  ButtonText,
  Heading,
  HStack,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { ScrollView } from "react-native";
import { useTheme } from "./ThemeProvider";

interface CustomModalProps {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onClose: () => void;
}

const CustomModal = ({
  title,
  subtitle,
  isOpen,
  onClose,
}: CustomModalProps) => {
  const { isDark } = useTheme();

  if (!isOpen) return null;

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundColor="rgba(0,0,0,0.5)"
      justifyContent="center"
      alignItems="center"
      zIndex={999}
      px={AppTheme.spacing.md}
    >
      <Box
        backgroundColor={isDark ? AppTheme.colors.gray[800] : "#ffffff"}
        borderRadius={AppTheme.borderRadius.xl}
        shadowColor="#000000"
        shadowOffset={{ width: 0, height: 8 }}
        shadowOpacity={0.25}
        shadowRadius={24}
        elevation={15}
        width="100%"
        maxWidth={400}
        maxHeight="80%"
        overflow="hidden"
      >
        {/* Blue Header */}
        <HStack
          alignItems="center"
          justifyContent="space-between"
          px={AppTheme.spacing.lg}
          py={AppTheme.spacing.md}
          backgroundColor={AppTheme.colors.blue[600]}
        >
          <VStack flex={1}>
            <Heading
              size="lg"
              color="#ffffff"
              fontWeight="700"
              mb={subtitle ? AppTheme.spacing.xs : 0}
            >
              {title}
            </Heading>
            {!!subtitle && (
              <Text color="#c7d2fe" fontSize={AppTheme.typography.fontSizes.sm}>
                {subtitle}
              </Text>
            )}
          </VStack>
          <Pressable onPress={onClose} p={AppTheme.spacing.xs}>
            <Text fontSize={20} color="#ffffff" fontWeight="700">
              ✕
            </Text>
          </Pressable>
        </HStack>

        {/* White Content Area */}
        <ScrollView
          style={{
            padding: AppTheme.spacing.lg,
            backgroundColor: isDark ? AppTheme.colors.gray[900] : "#ffffff",
            flexGrow: 0,
          }}
          contentContainerStyle={{ paddingBottom: AppTheme.spacing.lg }}
          showsVerticalScrollIndicator={false}
        >
          <VStack space="lg">
            {/* Getting Started Card */}
            <Box
              backgroundColor={isDark ? `${AppTheme.colors.blue[900]}40` : AppTheme.colors.blue[50]}
              borderRadius={AppTheme.borderRadius.lg}
              p={AppTheme.spacing.lg}
            >
              <HStack alignItems="center" mb={AppTheme.spacing.md}>
                <Box
                  w={40}
                  h={40}
                  backgroundColor={AppTheme.colors.blue[600]}
                  borderRadius={AppTheme.borderRadius.md}
                  alignItems="center"
                  justifyContent="center"
                  mr={AppTheme.spacing.md}
                >
                  <Text color="#ffffff" fontSize={18} fontWeight="700">✓</Text>
                </Box>
                <Heading
                  size="md"
                  color={isDark ? "#ffffff" : AppTheme.colors.gray[900]}
                  fontWeight="700"
                >
                  Getting Started
                </Heading>
              </HStack>

              <Text
                fontSize={AppTheme.typography.fontSizes.sm}
                color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.blue[700]}
                mb={AppTheme.spacing.md}
                lineHeight={20}
              >
                QVuew helps you manage queues efficiently. Here&apos;s how to get started:
              </Text>

              <VStack space="sm">
                <HStack alignItems="flex-start" space="xs">
                  <Text fontSize={14} color={AppTheme.colors.blue[600]} fontWeight="700" mt={2}>•</Text>
                  <Text
                    fontSize={14}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.blue[700]}
                    flex={1}
                    lineHeight={20}
                  >
                    Create your account with basic business information
                  </Text>
                </HStack>
                <HStack alignItems="flex-start" space="xs">
                  <Text fontSize={14} color={AppTheme.colors.blue[600]} fontWeight="700" mt={2}>•</Text>
                  <Text
                    fontSize={14}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.blue[700]}
                    flex={1}
                    lineHeight={20}
                  >
                    Connect your QVuew display device
                  </Text>
                </HStack>
                <HStack alignItems="flex-start" space="xs">
                  <Text fontSize={14} color={AppTheme.colors.blue[600]} fontWeight="700" mt={2}>•</Text>
                  <Text
                    fontSize={14}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.blue[700]}
                    flex={1}
                    lineHeight={20}
                  >
                    Start managing your customer queues
                  </Text>
                </HStack>
              </VStack>
            </Box>

            {/* Account Issues Card */}
            <Box
              backgroundColor={isDark ? `${AppTheme.colors.warning[500]}40` : AppTheme.colors.warning[50]}
              borderRadius={AppTheme.borderRadius.lg}
              p={AppTheme.spacing.lg}
            >
              <HStack alignItems="center" mb={AppTheme.spacing.md}>
                <Box
                  w={40}
                  h={40}
                  backgroundColor={AppTheme.colors.warning[500]}
                  borderRadius={AppTheme.borderRadius.md}
                  alignItems="center"
                  justifyContent="center"
                  mr={AppTheme.spacing.md}
                >
                  <Text color="#ffffff" fontSize={18} fontWeight="700">⚠</Text>
                </Box>
                <Heading
                  size="md"
                  color={isDark ? AppTheme.colors.warning[500] : AppTheme.colors.gray[900]}
                  fontWeight="700"
                >
                  Account Issues
                </Heading>
              </HStack>

              <Text
                fontSize={AppTheme.typography.fontSizes.sm}
                color={isDark ? AppTheme.colors.warning[500] : AppTheme.colors.warning[600]}
                mb={AppTheme.spacing.md}
                lineHeight={20}
              >
                Having trouble with your account?
              </Text>

              <VStack space="sm">
                <HStack alignItems="flex-start" space="xs">
                  <Text fontSize={14} color={AppTheme.colors.warning[500]} fontWeight="700" mt={2}>•</Text>
                  <Text
                    fontSize={14}
                    color={isDark ? AppTheme.colors.warning[500] : AppTheme.colors.warning[600]}
                    flex={1}
                    lineHeight={20}
                  >
                    Forgot password? Use the &quot;Forgot Password&quot; link
                  </Text>
                </HStack>
                <HStack alignItems="flex-start" space="xs">
                  <Text fontSize={14} color={AppTheme.colors.warning[500]} fontWeight="700" mt={2}>•</Text>
                  <Text
                    fontSize={14}
                    color={isDark ? AppTheme.colors.warning[500] : AppTheme.colors.warning[600]}
                    flex={1}
                    lineHeight={20}
                  >
                    Can&apos;t verify phone? Check your SMS messages
                  </Text>
                </HStack>
                <HStack alignItems="flex-start" space="xs">
                  <Text fontSize={14} color={AppTheme.colors.warning[500]} fontWeight="700" mt={2}>•</Text>
                  <Text
                    fontSize={14}
                    color={isDark ? AppTheme.colors.warning[500] : AppTheme.colors.warning[600]}
                    flex={1}
                    lineHeight={20}
                  >
                    Account locked? Contact our support team
                  </Text>
                </HStack>
              </VStack>
            </Box>

            {/* Device Connection Card */}
            <Box
              backgroundColor={isDark ? `${AppTheme.colors.success[500]}40` : AppTheme.colors.success[50]}
              borderRadius={AppTheme.borderRadius.lg}
              p={AppTheme.spacing.lg}
            >
              <HStack alignItems="center" mb={AppTheme.spacing.md}>
                <Box
                  w={40}
                  h={40}
                  backgroundColor={AppTheme.colors.success[500]}
                  borderRadius={AppTheme.borderRadius.md}
                  alignItems="center"
                  justifyContent="center"
                  mr={AppTheme.spacing.md}
                >
                  <Text color="#ffffff" fontSize={18}>⭐</Text>
                </Box>
                <Heading
                  size="md"
                  color={isDark ? AppTheme.colors.success[500] : AppTheme.colors.gray[900]}
                  fontWeight="700"
                >
                  Device Connection
                </Heading>
              </HStack>

              <Text
                fontSize={AppTheme.typography.fontSizes.sm}
                color={isDark ? AppTheme.colors.success[500] : AppTheme.colors.success[600]}
                mb={AppTheme.spacing.md}
                lineHeight={20}
              >
                Need help connecting your device?
              </Text>

              <VStack space="sm">
                <HStack alignItems="flex-start" space="xs">
                  <Text fontSize={14} color={AppTheme.colors.success[500]} fontWeight="700" mt={2}>•</Text>
                  <Text
                    fontSize={14}
                    color={isDark ? AppTheme.colors.success[500] : AppTheme.colors.success[600]}
                    flex={1}
                    lineHeight={20}
                  >
                    Ensure your device is powered on
                  </Text>
                </HStack>
                <HStack alignItems="flex-start" space="xs">
                  <Text fontSize={14} color={AppTheme.colors.success[500]} fontWeight="700" mt={2}>•</Text>
                  <Text
                    fontSize={14}
                    color={isDark ? AppTheme.colors.success[500] : AppTheme.colors.success[600]}
                    flex={1}
                    lineHeight={20}
                  >
                    Enable Bluetooth and WiFi on your phone
                  </Text>
                </HStack>
                <HStack alignItems="flex-start" space="xs">
                  <Text fontSize={14} color={AppTheme.colors.success[500]} fontWeight="700" mt={2}>•</Text>
                  <Text
                    fontSize={14}
                    color={isDark ? AppTheme.colors.success[500] : AppTheme.colors.success[600]}
                    flex={1}
                    lineHeight={20}
                  >
                    Stay within 30 feet of your device
                  </Text>
                </HStack>
              </VStack>
            </Box>

            {/* Close Button */}
            <Box pt={AppTheme.spacing.md}>
              <Button
                onPress={onClose}
                backgroundColor={AppTheme.colors.blue[600]}
                borderRadius={AppTheme.borderRadius.lg}
                h={48}
                mb={AppTheme.spacing.lg} 
                shadowColor={AppTheme.colors.blue[600]}
                shadowOffset={{ width: 0, height: 4 }}
                shadowOpacity={0.3}
                shadowRadius={8}
                elevation={4}
              >
                <ButtonText
                  color="#ffffff"
                  fontWeight="600"
                  fontSize={AppTheme.typography.fontSizes.md}
                >
                  Got it, thanks! ✨

                </ButtonText>
              </Button>
            </Box>
          </VStack>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default CustomModal;
