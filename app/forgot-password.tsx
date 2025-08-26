import { AppTheme } from '@/constants/theme';
import {
  ArrowLeftIcon,
  Box,
  Button,
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
import React, { useState, useRef } from 'react';
import { Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../components/auth/AuthContext';
import { useTheme } from '../components/ThemeProvider';

export default function ForgotPasswordScreen() {
  const { resetPassword } = useAuth();
  const { isDark } = useTheme();
  
  // Multi-step state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // OTP input refs
  const otpRefs = [useRef<any>(null), useRef<any>(null), useRef<any>(null), useRef<any>(null)];
  
  // Form data
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: ['', '', '', ''],
    password: '',
    confirmPassword: ''
  });

  // Form handlers
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newVerificationCode = [...formData.verificationCode];
    newVerificationCode[index] = value;
    
    setFormData(prev => ({
      ...prev,
      verificationCode: newVerificationCode
    }));

    // Auto-focus next input
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  // Step navigation
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!minLength) return "Password must be at least 8 characters";
    if (!hasUpper) return "Password must contain at least one uppercase letter";
    if (!hasLower) return "Password must contain at least one lowercase letter";
    if (!hasNumber) return "Password must contain at least one number";
    if (!hasSpecial) return "Password must contain at least one special character";
    return "";
  };

  // Step 1: Send verification code
  const handleSendCode = async () => {
    if (!formData.email) {
      setErrors({ email: 'Email is required' });
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    setIsSubmitting(true);
    
    // TODO: Backend integration - Send reset code to email
    setTimeout(() => {
      setIsSubmitting(false);
      nextStep();
      Alert.alert('Success', `Verification code sent to ${formData.email}`);
    }, 1500);
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = () => {
    const otpCode = formData.verificationCode.join('');
    if (otpCode.length !== 4) {
      Alert.alert('Error', 'Please enter the complete 4-digit code');
      return;
    }
    
    // TODO: Backend integration - Verify OTP code
    nextStep();
  };

  // Step 3: Reset password
  const handleResetPassword = async () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Backend integration - Reset password with new password
      const result = await resetPassword(formData.email, formData.password);

      if (result.success) {
        Alert.alert(
          'Success', 
          'Password reset successfully!',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/login')
            }
          ]
        );
      } else {
        Alert.alert('Error', result.error || 'Password reset failed');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 1: Email Input
  const renderStep1 = () => (
    <VStack space="lg">
      <VStack mb={AppTheme.spacing.lg}>
        <Heading 
          size="3xl" 
          color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.blue[900]} 
          fontWeight="700"
          mb={AppTheme.spacing.sm}
        >
          Reset Password
        </Heading>
        <Text 
          color={isDark ? AppTheme.colors.blue[300] : AppTheme.colors.blue[600]} 
          fontSize={AppTheme.typography.fontSizes.md}
        >
          Enter your email address and we&apos;ll send you a verification code
        </Text>
      </VStack>

      <VStack space="md">
        <FormControl isInvalid={!!errors.email}>
          <Box
            backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.gray[50]}
            borderColor={isDark ? AppTheme.colors.gray[700] : AppTheme.colors.gray[300]}
            borderRadius={AppTheme.borderRadius.lg}
            borderWidth={1}
            h={56}
            justifyContent="center"
            px={AppTheme.spacing.md}
          >
            <HStack alignItems="center">
              <Icon 
                name="email" 
                size={20} 
                color={isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[500]} 
              />
              <Input flex={1} variant="outline" borderWidth={0} backgroundColor="transparent">
                <InputField
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.gray[900]}
                  fontSize={AppTheme.typography.fontSizes.md}
                  placeholderTextColor={isDark ? AppTheme.colors.gray[500] : AppTheme.colors.gray[400]}
                  ml={AppTheme.spacing.sm}
                />
              </Input>
            </HStack>
          </Box>
          {errors.email && (
            <FormControlError mt={AppTheme.spacing.xs}>
              <FormControlErrorText color={AppTheme.colors.error[500]} fontSize={AppTheme.typography.fontSizes.sm}>
                {errors.email}
              </FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <Pressable onPress={handleSendCode} disabled={isSubmitting} mt={AppTheme.spacing.lg}>
          <LinearGradient
            colors={AppTheme.gradients.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              height: 56,
              borderRadius: AppTheme.borderRadius.lg,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            <Text
              color="#ffffff"
              fontWeight="700"
              fontSize={AppTheme.typography.fontSizes.md}
            >
              {isSubmitting ? 'Sending Code...' : 'Send Verification Code'}
            </Text>
          </LinearGradient>
        </Pressable>
      </VStack>
    </VStack>
  );

  // Step 2: OTP Verification
  const renderStep2 = () => (
    <VStack space="lg">
      <VStack mb={AppTheme.spacing.lg}>
        <Heading 
          size="3xl" 
          color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.blue[900]} 
          fontWeight="700"
          mb={AppTheme.spacing.sm}
        >
          Verify Your Email
        </Heading>
        <Text 
          color={isDark ? AppTheme.colors.blue[300] : AppTheme.colors.blue[600]} 
          fontSize={AppTheme.typography.fontSizes.md}
        >
          We&apos;ve sent a 4-digit code to{' '}
          <Text color={AppTheme.colors.blue[600]} fontWeight="600">
            {formData.email}
          </Text>
        </Text>
      </VStack>

      <VStack space="lg">
        {/* OTP Input */}
        <HStack justifyContent="center" space="sm">
          {formData.verificationCode.map((digit, index) => (
            <Box
              key={index}
              w={48}
              h={48}
              backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.gray[50]}
              borderColor={isDark ? AppTheme.colors.gray[700] : AppTheme.colors.gray[300]}
              borderRadius={AppTheme.borderRadius.lg}
              borderWidth={1}
              justifyContent="center"
              alignItems="center"
            >
              <Input w="100%" h="100%" variant="outline" borderWidth={0} backgroundColor="transparent">
                <InputField
                  ref={otpRefs[index]}
                  textAlign="center"
                  fontSize={AppTheme.typography.fontSizes.lg}
                  fontWeight="700"
                  value={digit}
                  onChangeText={(value) => handleOTPChange(index, value)}
                  keyboardType="numeric"
                  maxLength={1}
                  color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.gray[900]}
                />
              </Input>
            </Box>
          ))}
        </HStack>

        <Pressable onPress={handleVerifyOTP} mt={AppTheme.spacing.lg}>
          <LinearGradient
            colors={AppTheme.gradients.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              height: 56,
              borderRadius: AppTheme.borderRadius.lg,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              color="#ffffff"
              fontWeight="700"
              fontSize={AppTheme.typography.fontSizes.md}
            >
              Verify & Continue
            </Text>
          </LinearGradient>
        </Pressable>
      </VStack>
    </VStack>
  );

  // Step 3: New Password
  const renderStep3 = () => (
    <VStack space="lg">
      <VStack mb={AppTheme.spacing.lg}>
        <Heading 
          size="3xl" 
          color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.blue[900]} 
          fontWeight="700"
          mb={AppTheme.spacing.sm}
        >
          Create New Password
        </Heading>
        <Text 
          color={isDark ? AppTheme.colors.blue[300] : AppTheme.colors.blue[600]} 
          fontSize={AppTheme.typography.fontSizes.md}
        >
          Choose a strong password for your account
        </Text>
      </VStack>

      <VStack space="md">
        {/* New Password Field */}
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
            <HStack alignItems="center">
              <Icon 
                name="lock" 
                size={20} 
                color={isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[500]} 
              />
              <Input flex={1} variant="outline" borderWidth={0} backgroundColor="transparent">
                <InputField
                  placeholder="Enter new password"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  secureTextEntry={!showPassword}
                  color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.gray[900]}
                  fontSize={AppTheme.typography.fontSizes.md}
                  placeholderTextColor={isDark ? AppTheme.colors.gray[500] : AppTheme.colors.gray[400]}
                  ml={AppTheme.spacing.sm}
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

        {/* Confirm Password Field */}
        <FormControl isInvalid={!!errors.confirmPassword}>
          <Box
            backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.gray[50]}
            borderColor={isDark ? AppTheme.colors.gray[700] : AppTheme.colors.gray[300]}
            borderRadius={AppTheme.borderRadius.lg}
            borderWidth={1}
            h={56}
            justifyContent="center"
            px={AppTheme.spacing.md}
          >
            <HStack alignItems="center">
              <Icon 
                name="lock" 
                size={20} 
                color={isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[500]} 
              />
              <Input flex={1} variant="outline" borderWidth={0} backgroundColor="transparent">
                <InputField
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  secureTextEntry={!showPassword}
                  color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.gray[900]}
                  fontSize={AppTheme.typography.fontSizes.md}
                  placeholderTextColor={isDark ? AppTheme.colors.gray[500] : AppTheme.colors.gray[400]}
                  ml={AppTheme.spacing.sm}
                />
              </Input>
            </HStack>
          </Box>
          {errors.confirmPassword && (
            <FormControlError mt={AppTheme.spacing.xs}>
              <FormControlErrorText color={AppTheme.colors.error[500]} fontSize={AppTheme.typography.fontSizes.sm}>
                {errors.confirmPassword}
              </FormControlErrorText>
            </FormControlError>
          )}
        </FormControl>

        <Pressable 
          onPress={handleResetPassword} 
          disabled={isSubmitting} 
          mt={AppTheme.spacing.lg}
        >
          <LinearGradient
            colors={AppTheme.gradients.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              height: 56,
              borderRadius: AppTheme.borderRadius.lg,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            <Text
              color="#ffffff"
              fontWeight="700"
              fontSize={AppTheme.typography.fontSizes.md}
            >
              {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
            </Text>
          </LinearGradient>
        </Pressable>

        {/* Back to Login */}
        <Pressable onPress={() => router.replace('/login')} alignItems="center" mt={AppTheme.spacing.lg}>
          <Text 
            color={isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[600]} 
            fontSize={AppTheme.typography.fontSizes.sm} 
            textDecorationLine="underline"
          >
            Back to Login
          </Text>
        </Pressable>
      </VStack>
    </VStack>
  );

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  return (
    <Box flex={1} backgroundColor={isDark ? AppTheme.colors.gray[900] : AppTheme.colors.blue[50]}>
      <LinearGradient
        colors={isDark ? AppTheme.gradients.dark : AppTheme.gradients.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      >
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <VStack flex={1} px={AppTheme.spacing.lg} pt={AppTheme.spacing['2xl']} pb={AppTheme.spacing.xl}>
            
            {/* Header with Progress */}
            <VStack mb={AppTheme.spacing.xl}>
              <HStack alignItems="center" justifyContent="space-between" mb={AppTheme.spacing.md}>
                <Pressable onPress={goBack}>
                  <HStack alignItems="center" space="xs">
                    <ArrowLeftIcon
                      size="md"
                      color={isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[600]}
                    />
                    <Text 
                      color={isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[600]} 
                      fontWeight="500"
                      fontSize={AppTheme.typography.fontSizes.md}
                    >
                      Back
                    </Text>
                  </HStack>
                </Pressable>
                <Text 
                  color={isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[600]} 
                  fontSize={AppTheme.typography.fontSizes.sm}
                >
                  Step {currentStep} of {totalSteps}
                </Text>
              </HStack>
              
              {/* Progress Bar */}
              <Box
                backgroundColor={isDark ? AppTheme.colors.gray[700] : AppTheme.colors.blue[100]}
                height={4}
                borderRadius={AppTheme.borderRadius.full}
              >
                <LinearGradient
                  colors={AppTheme.gradients.button}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: 4,
                    borderRadius: AppTheme.borderRadius.full,
                    width: `${(currentStep / totalSteps) * 100}%`,
                  }}
                />
              </Box>
            </VStack>

            {/* Render Current Step */}
            {renderStep()}

          </VStack>
        </ScrollView>
      </LinearGradient>
    </Box>
  );
}
