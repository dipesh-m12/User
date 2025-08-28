import { AppTheme } from '@/constants/theme';
import {
  Box,
  Button,
  ButtonText,
  Heading,
  HStack,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomModal from "../CustomModal";
import { useTheme } from "../ThemeProvider";

const QVuewIcon = () => {
  const { isDark } = useTheme();
  return (
    <Box
      w={80}
      h={80}
      backgroundColor={isDark ? AppTheme.colors.dark.surface : AppTheme.colors.gray[50]}
      borderRadius={AppTheme.borderRadius.xl}
      alignItems="center"
      justifyContent="center"
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={isDark ? 0.3 : 0.07}
      shadowRadius={8}
      elevation={4}
    >
      <Text
        color={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]}
        fontSize={36}
        fontWeight="700"
      >
        ⊞
      </Text>
    </Box>
  );
};

interface SplashScreenProps {
  goToLogin?: () => void;
  goToSignUp?: () => void;
}

const SplashScreen = ({ goToLogin, goToSignUp }: SplashScreenProps) => {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleLogin = () => goToLogin ? goToLogin() : router.push("/login");
  const handleSignUp = () => goToSignUp ? goToSignUp() : router.push("/signup");
  const handleGoogleSignIn = () => console.log("Google sign-in");
  const handleAppleSignIn = () => console.log("Apple sign-in");

  return (
    <Box
      flex={1}
      backgroundColor={isDark ? AppTheme.colors.dark.background : AppTheme.colors.blue[50]}
    >
      <LinearGradient
        colors={isDark ? AppTheme.gradients.darkBackground : AppTheme.gradients.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      >
        <VStack flex={1} justifyContent="space-between">
          {/* Main Content - Centered */}
          <VStack alignItems="center" px={AppTheme.spacing.lg} flex={1} justifyContent="center">
            {/* Logo Section */}
            <Box mb={AppTheme.spacing.xl}>
              <LinearGradient
                colors={isDark ? AppTheme.gradients.darkButton : AppTheme.gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: AppTheme.borderRadius['2xl'],
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: AppTheme.spacing.lg,
                }}
              >
                <QVuewIcon />
              </LinearGradient>
            </Box>

            <Heading
              size="3xl"
              color={isDark ? AppTheme.colors.text.dark.primary : AppTheme.colors.text.primary}
              textAlign="center"
              fontWeight="700"
              mb={AppTheme.spacing.sm}
            >
              QVuew
            </Heading>
            <Text
              color={isDark ? AppTheme.colors.text.dark.subtle : AppTheme.colors.text.secondary}
              fontSize={AppTheme.typography.fontSizes.lg}
              textAlign="center"
              mb={AppTheme.spacing.xl}
            >
              Your Time Matters — Manage Queues Smartly
            </Text>

            {/* Trust Indicators */}
            <HStack space="md" mb={AppTheme.spacing['2xl']}>
              <Box
                backgroundColor={isDark ? AppTheme.colors.dark.surface : AppTheme.colors.blue[50]}
                borderRadius={AppTheme.borderRadius.full}
                px={AppTheme.spacing.md}
                py={AppTheme.spacing.xs}
                borderWidth={1}
                borderColor={isDark ? AppTheme.colors.dark.border : AppTheme.colors.blue[200]}
              >
                <HStack alignItems="center" space="xs">
                  <Icon
                    name="business-center"
                    size={18}
                    color={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[500]}
                  />
                  <Text
                    fontSize={14}
                    color={isDark ? AppTheme.colors.text.dark.secondary : AppTheme.colors.blue[700]}
                    fontWeight="500"
                  >
                    500+ businesses
                  </Text>
                </HStack>
              </Box>
              <Box
                backgroundColor={isDark ? AppTheme.colors.dark.surface : AppTheme.colors.blue[50]}
                borderRadius={AppTheme.borderRadius.full}
                px={AppTheme.spacing.md}
                py={AppTheme.spacing.xs}
                borderWidth={1}
                borderColor={isDark ? AppTheme.colors.dark.border : AppTheme.colors.blue[200]}
              >
                <HStack alignItems="center" space="xs">
                  <Icon
                    name="security"
                    size={18}
                    color={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[500]}
                  />
                  <Text
                    fontSize={14}
                    color={isDark ? AppTheme.colors.text.dark.secondary : AppTheme.colors.blue[700]}
                    fontWeight="500"
                  >
                    100% Secure
                  </Text>
                </HStack>
              </Box>
            </HStack>
          </VStack>

          {/* Bottom Action Buttons */}
          <VStack px={AppTheme.spacing.lg} pb={AppTheme.spacing['2xl']} space="md">
            <VStack width="100%" maxWidth={350} mx="auto" space="sm">
              {/* Login Button */}
              <Pressable onPress={handleLogin}>
                <LinearGradient
                  colors={isDark ? AppTheme.gradients.darkButton : AppTheme.gradients.button}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: 52,
                    borderRadius: AppTheme.borderRadius.lg,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ButtonText
                    color="#fff"
                    fontWeight="600"
                    fontSize={AppTheme.typography.fontSizes.md}
                  >
                    Login to Your Account
                  </ButtonText>
                </LinearGradient>
              </Pressable>

              {/* Sign Up Button */}
              <Button
                onPress={handleSignUp}
                backgroundColor={isDark ? AppTheme.colors.dark.surface : AppTheme.colors.gray[50]}
                borderRadius={AppTheme.borderRadius.lg}
                borderColor={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]}
                borderWidth={2}
                h={52}
                variant="outline"
              >
                <ButtonText
                  color={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]}
                  fontWeight="600"
                  fontSize={AppTheme.typography.fontSizes.md}
                >
                  Create New Account
                </ButtonText>
              </Button>

              {/* Divider */}
              <HStack alignItems="center" my={AppTheme.spacing.lg}>
                <Box
                  flex={1}
                  height={1}
                  backgroundColor={isDark ? AppTheme.colors.dark.border : AppTheme.colors.gray[300]}
                />
                <Text
                  px={AppTheme.spacing.md}
                  fontSize={AppTheme.typography.fontSizes.sm}
                  color={isDark ? AppTheme.colors.text.dark.subtle : AppTheme.colors.text.subtle}
                  fontWeight="500"
                >
                  or continue with
                </Text>
                <Box
                  flex={1}
                  height={1}
                  backgroundColor={isDark ? AppTheme.colors.dark.border : AppTheme.colors.gray[300]}
                />
              </HStack>

              {/* Social Login Buttons */}
              <HStack space="sm" mb={AppTheme.spacing.lg}>
                <Button
                  flex={1}
                  backgroundColor={isDark ? AppTheme.colors.dark.surface : AppTheme.colors.gray[50]}
                  borderColor={isDark ? AppTheme.colors.dark.border : AppTheme.colors.gray[300]}
                  borderWidth={1}
                  borderRadius={AppTheme.borderRadius.md}
                  h={48}
                  onPress={handleGoogleSignIn}
                  variant="outline"
                >
                  <HStack alignItems="center" space="xs">
                    <Text fontSize={18} fontWeight="700" color="#4285F4">
                      G
                    </Text>
                    <ButtonText
                      color={isDark ? AppTheme.colors.text.dark.secondary : AppTheme.colors.gray[700]}
                      fontWeight="500"
                      fontSize={AppTheme.typography.fontSizes.md}
                    >
                      Google
                    </ButtonText>
                  </HStack>
                </Button>
                <Button
                  flex={1}
                  backgroundColor="#000"
                  borderRadius={AppTheme.borderRadius.md}
                  h={48}
                  onPress={handleAppleSignIn}
                >
                  <HStack alignItems="center" space="xs">
                    <Icon name="apple" size={18} color="#fff" />
                    <ButtonText
                      color="#fff"
                      fontWeight="500"
                      fontSize={AppTheme.typography.fontSizes.md}
                    >
                      Apple
                    </ButtonText>
                  </HStack>
                </Button>
              </HStack>

              {/* Help Link */}
              <HStack justifyContent="center" alignItems="center" mt={AppTheme.spacing.lg}>
                <Pressable onPress={() => setShowHelpModal(true)}>
                  <HStack alignItems="center" space="xs">
                    <Icon
                      name="help-outline"
                      size={16}
                      color={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]}
                    />
                    <Text
                      color={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]}
                      fontSize={14}
                      fontWeight="500"
                      textDecorationLine="underline"
                    >
                      Need Help?
                    </Text>
                  </HStack>
                </Pressable>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
        <CustomModal
          title="Need Help?"
          subtitle="We're here to assist you"
          isOpen={showHelpModal}
          onClose={() => setShowHelpModal(false)}
        />
      </LinearGradient>
    </Box>
  );
};

export default SplashScreen;
