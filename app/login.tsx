import { AppTheme } from '@/constants/theme';
import {
  ArrowLeftIcon,
  Box,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorText,
  Heading,
  HStack,
  Input,
  InputField,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../components/auth/AuthContext';
import { useTheme } from '../components/ThemeProvider';

const GRADIENTS = {
  background: {
    light: ['#f0f9ff', '#e0f2fe'] as const,
    dark: ['#111827', '#1f2937'] as const,
  },
  button: ['#3b82f6', '#1d4ed8'] as const,
} as const;

export default function LoginScreen() {
  const { login } = useAuth();
  const { isDark } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.emailOrPhone) newErrors.emailOrPhone = 'Email or phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const result = await login({
        email: formData.emailOrPhone,
        password: formData.password,
      });
      if (result.success) {
        console.log('Login successful');
      } else {
        Alert.alert('Login Failed', result.error || 'Please try again');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => console.log('Google login');
  const handleAppleLogin = () => console.log('Apple login');

  return (
    <Box flex={1} backgroundColor={isDark ? AppTheme.colors.gray[900] : AppTheme.colors.blue[50]}>
      <LinearGradient
        colors={isDark ? GRADIENTS.background.dark : GRADIENTS.background.light}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }} // ✅ LEFT TO RIGHT GRADIENT
        style={{ flex: 1 }}
      >
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <VStack flex={1} px={AppTheme.spacing.lg} pt={AppTheme.spacing['2xl']} pb={AppTheme.spacing.xl}>
            {/* Header */}
            <HStack alignItems="center" mb={AppTheme.spacing['2xl']}>
              <Pressable onPress={() => router.back()} mr={AppTheme.spacing.md}>
                <HStack alignItems="center" space="xs">
                  <ArrowLeftIcon
                    size="md"
                    color={isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[600]}
                  />
                  <Text
                    color={isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[600]}
                    fontSize={AppTheme.typography.fontSizes.md}
                    fontWeight="500"
                  >
                    Back
                  </Text>
                </HStack>
              </Pressable>
            </HStack>

            {/* Title Section */}
            <VStack mb={AppTheme.spacing['2xl']}>
              <Heading
                size="3xl"
                color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.blue[900]}
                fontWeight="700"
                mb={AppTheme.spacing.sm}
              >
                Welcome Back
              </Heading>
              <Text
                color={isDark ? AppTheme.colors.blue[300] : AppTheme.colors.blue[600]}
                fontSize={AppTheme.typography.fontSizes.md}
              >
                Sign in to your QVuew account
              </Text>
            </VStack>

            <VStack space="lg">
              {/* Email Field with Icon (icon left) */}
              <FormControl isInvalid={!!errors.emailOrPhone}>
                <Box
                  backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.gray[50]}
                  borderColor={isDark ? AppTheme.colors.gray[700] : AppTheme.colors.gray[300]}
                  borderRadius={AppTheme.borderRadius.lg}
                  borderWidth={1}
                  h={56}
                  justifyContent="center"
                  px={AppTheme.spacing.md}
                >
                  <HStack alignItems="center" flex={1}>
                    <Icon
                      name="email"
                      size={20}
                      color={isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[500]}
                      style={{ marginRight: AppTheme.spacing.sm }}
                    />
                    <Input
                      flex={1}
                      variant="outline"
                      size="lg"
                      borderWidth={0}
                      backgroundColor="transparent"
                    >
                      <InputField
                        placeholder="Enter your email or phone number"
                        value={formData.emailOrPhone}
                        onChangeText={(value) => handleInputChange('emailOrPhone', value)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.gray[900]}
                        fontSize={AppTheme.typography.fontSizes.md}
                        placeholderTextColor={isDark ? AppTheme.colors.gray[500] : AppTheme.colors.gray[400]}
                      />
                    </Input>
                  </HStack>
                </Box>
                {errors.emailOrPhone && (
                  <FormControlError mt={AppTheme.spacing.xs}>
                    <FormControlErrorText color={AppTheme.colors.error[500]} fontSize={AppTheme.typography.fontSizes.sm}>
                      {errors.emailOrPhone}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>

              {/* Password Field (lock icon left, eye icon right) */}
              <FormControl isInvalid={!!errors.password}>
                <Box
                  backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.gray[50]}
                  borderColor={isDark ? AppTheme.colors.gray[700] : AppTheme.colors.gray[300]}
                  borderRadius={AppTheme.borderRadius.lg}
                  borderWidth={1}
                  h={56}
                  justifyContent="center"
                  px={AppTheme.spacing.md}
                >
                  <HStack alignItems="center" flex={1}>
                    <Icon
                      name="lock"
                      size={20}
                      color={isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[500]}
                      style={{ marginRight: AppTheme.spacing.sm }}
                    />
                    <Input
                      flex={1}
                      variant="outline"
                      size="lg"
                      borderWidth={0}
                      backgroundColor="transparent"
                    >
                      <InputField
                        placeholder="Enter your password"
                        value={formData.password}
                        onChangeText={(value) => handleInputChange('password', value)}
                        secureTextEntry={!showPassword}
                        color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.gray[900]}
                        fontSize={AppTheme.typography.fontSizes.md}
                        placeholderTextColor={isDark ? AppTheme.colors.gray[500] : AppTheme.colors.gray[400]}
                      />
                    </Input>
                    <Pressable
                      onPress={() => setShowPassword(!showPassword)}
                      p={AppTheme.spacing.xs}
                      ml={AppTheme.spacing.sm}
                    >
                      <Icon
                        name={showPassword ? "visibility-off" : "visibility"}
                        size={20}
                        color={isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[500]}
                      />
                    </Pressable>
                  </HStack>
                </Box>
                {errors.password && (
                  <FormControlError mt={AppTheme.spacing.xs}>
                    <FormControlErrorText color={AppTheme.colors.error[500]} fontSize={AppTheme.typography.fontSizes.sm}>
                      {errors.password}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>

              {/* Forgot Password */}
              <HStack justifyContent="flex-end" mt={AppTheme.spacing.sm}>
                <Pressable onPress={() => router.push('/forgot-password')}>
                  <Text
                    color={isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[600]}
                    fontSize={AppTheme.typography.fontSizes.sm}
                    fontWeight="500"
                    textDecorationLine="underline"
                  >
                    Forgot Password?
                  </Text>
                </Pressable>
              </HStack>

              {/* Sign In Button with Gradient */}
              <Pressable
                onPress={handleLogin}
                disabled={isSubmitting}
                mt={AppTheme.spacing.lg}
              >
                <LinearGradient
                  colors={GRADIENTS.button}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }} // ✅ Gradient left to right
                  style={{
                    height: 56,
                    borderRadius: AppTheme.borderRadius.lg,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: AppTheme.colors.blue[600],
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 4,
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  <Text
                    color={AppTheme.colors.gray[50]}
                    fontWeight="700"
                    fontSize={AppTheme.typography.fontSizes.md}
                  >
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                  </Text>
                </LinearGradient>
              </Pressable>

              {/* Divider */}
              <HStack alignItems="center" my={AppTheme.spacing.xl}>
                <Box flex={1} height={1} backgroundColor={isDark ? AppTheme.colors.gray[600] : AppTheme.colors.gray[300]} />
                <Text
                  px={AppTheme.spacing.md}
                  color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                  fontSize={AppTheme.typography.fontSizes.sm}
                  fontWeight="500"
                >
                  OR
                </Text>
                <Box flex={1} height={1} backgroundColor={isDark ? AppTheme.colors.gray[600] : AppTheme.colors.gray[300]} />
              </HStack>

              {/* Social Login Buttons */}
              <VStack space="sm">
                <Pressable onPress={handleGoogleLogin}>
                  <Box
                    backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.gray[50]}
                    borderColor={isDark ? AppTheme.colors.gray[600] : AppTheme.colors.gray[300]}
                    borderWidth={1}
                    borderRadius={AppTheme.borderRadius.lg}
                    h={56}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <HStack alignItems="center" space="sm">
                      <Text fontSize={20} fontWeight="700" color="#4285F4">
                        G
                      </Text>
                      <ButtonText
                        color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                        fontWeight="500"
                        fontSize={AppTheme.typography.fontSizes.md}
                      >
                        Continue with Google
                      </ButtonText>
                    </HStack>
                  </Box>
                </Pressable>
                <Pressable onPress={handleAppleLogin}>
                  <Box
                    backgroundColor="#000"
                    borderRadius={AppTheme.borderRadius.lg}
                    h={56}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <HStack alignItems="center" space="sm">
                      <FontAwesome name="apple" size={22} color="#fff" />
                      <ButtonText
                        color="#fff"
                        fontWeight="500"
                        fontSize={AppTheme.typography.fontSizes.md}
                      >
                        Continue with Apple
                      </ButtonText>
                    </HStack>
                  </Box>
                </Pressable>
              </VStack>

              {/* Sign Up Link */}
              <HStack justifyContent="center" alignItems="center" mt={AppTheme.spacing.xl}>
                <Text
                  color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                  fontSize={AppTheme.typography.fontSizes.sm}
                >
                  Don&apos;t have an account?{' '}
                </Text>
                <Pressable onPress={() => router.push('/signup')}>
                  <Text
                    color={isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[600]}
                    fontSize={AppTheme.typography.fontSizes.sm}
                    fontWeight="600"
                    textDecorationLine="underline"
                  >
                    Sign up here
                  </Text>
                </Pressable>
              </HStack>
            </VStack>
          </VStack>
        </ScrollView>
      </LinearGradient>
    </Box>
  );
}
