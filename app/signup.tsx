import { AppTheme } from "@/constants/theme";
import {
  ArrowLeftIcon,
  Box,
  Center,
  Heading,
  HStack,
  Input,
  InputField,
  Pressable,
  ScrollView,
  Text,
  VStack,
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  SelectIcon,
} from "@gluestack-ui/themed";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Modal, Platform, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { z } from "zod";
import { useAuth } from "../components/auth/AuthContext";
import { useTheme } from "../components/ThemeProvider";

import DateTimePicker from "@react-native-community/datetimepicker";

// Zod schema for password validation
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  );

// Age validation
const ageSchema = z
  .number()
  .min(13, "You must be at least 13 years old to create an account");

// Success Modal Component
const SuccessModal = ({
  isVisible,
  onClose,
  phoneNumber,
}: {
  isVisible: boolean;
  onClose: () => void;
  phoneNumber: string;
}) => {
  const { isDark } = useTheme();

  useEffect(() => {
    if (isVisible) {
      // Auto close after exactly 2 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={999}>
      {/* Enhanced blur background for dark mode */}
      <BlurView
        intensity={50}
        tint={isDark ? "dark" : "light"}
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: isDark
            ? "rgba(0, 0, 0, 0.4)"
            : "rgba(255, 255, 255, 0.3)",
        }}
      />

      {/* Modal content */}
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        px={AppTheme.spacing.lg}
      >
        <Box
          backgroundColor={isDark ? AppTheme.colors.dark.surface : "#ffffff"}
          borderRadius={AppTheme.borderRadius["2xl"]}
          p={AppTheme.spacing.xl}
          alignItems="center"
          maxWidth={320}
          width="90%"
          shadowColor={isDark ? "#000000" : "#000000"}
          shadowOffset={{ width: 0, height: 8 }}
          shadowOpacity={isDark ? 0.5 : 0.3}
          shadowRadius={20}
          elevation={10}
        >
          <Box
            w={64}
            h={64}
            backgroundColor={AppTheme.colors.success[500]}
            borderRadius={AppTheme.borderRadius["2xl"]}
            alignItems="center"
            justifyContent="center"
            mb={AppTheme.spacing.lg}
          >
            <Icon name="check" size={32} color="#ffffff" />
          </Box>
          <Heading
            size="xl"
            color={
              isDark
                ? AppTheme.colors.text.dark.primary
                : AppTheme.colors.gray[900]
            }
            mb={AppTheme.spacing.sm}
          >
            Code Sent!
          </Heading>
          <Text
            fontSize={AppTheme.typography.fontSizes.sm}
            color={
              isDark
                ? AppTheme.colors.text.dark.subtle
                : AppTheme.colors.gray[600]
            }
            textAlign="center"
            lineHeight={20}
          >
            We&apos;ve sent a 4-digit verification code to
          </Text>
          <Text
            fontSize={AppTheme.typography.fontSizes.sm}
            color={AppTheme.colors.blue[600]}
            textAlign="center"
            fontWeight="600"
            mt={AppTheme.spacing.xs}
          >
            {phoneNumber}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

// Terms Modal Component
const TermsModal = ({
  isVisible,
  onClose,
  title,
  children,
}: {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  const { isDark } = useTheme();

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor={isDark ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.6)"}
        justifyContent="center"
        alignItems="center"
        zIndex={999}
        px={AppTheme.spacing.md}
      >
        <Box
          backgroundColor={isDark ? AppTheme.colors.dark.surface : "#ffffff"}
          borderColor={isDark ? AppTheme.colors.dark.border : "transparent"}
          borderWidth={isDark ? 1 : 0}
          borderRadius={AppTheme.borderRadius.xl}
          maxHeight="80%"
          width="95%"
          maxWidth={400}
          overflow="hidden"
        >
          {/* Header */}
          <HStack
            alignItems="center"
            justifyContent="space-between"
            px={AppTheme.spacing.lg}
            py={AppTheme.spacing.md}
            backgroundColor={
              isDark
                ? AppTheme.colors.dark.surfaceLight
                : AppTheme.colors.blue[600]
            }
          >
            <Heading size="md" color="#ffffff" fontWeight="700">
              {title}
            </Heading>
            <Pressable onPress={onClose} p={AppTheme.spacing.xs}>
              <Icon name="close" size={20} color="#ffffff" />
            </Pressable>
          </HStack>

          {/* Content */}
          <ScrollView
            style={{
              padding: AppTheme.spacing.lg,
              backgroundColor: isDark
                ? AppTheme.colors.dark.background
                : "#ffffff",
            }}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </Box>
      </Box>
    </Modal>
  );
};

export default function SignupScreen() {
  const { signup } = useAuth();
  const { isDark } = useTheme();

  // Multi-step state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Date picker states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null);
  const [ageError, setAgeError] = useState<string>("");

  // Password validation states
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordError, setPasswordError] = useState("");
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  // OTP input refs for auto-focus
  const otpRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    countryCode: "+91",
    verificationCode: ["", "", "", ""],
    gender: "",
    birthdate: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  // Date picker utility functions
  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    const birthDateTime = new Date(birthDate);
    let age = today.getFullYear() - birthDateTime.getFullYear();
    const monthDiff = today.getMonth() - birthDateTime.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDateTime.getDate())
    ) {
      age--;
    }

    return age;
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (date) {
      const age = calculateAge(date);
      setSelectedDate(date);
      setCalculatedAge(age);

      const formattedDate = formatDate(date);
      setFormData((prev) => ({
        ...prev,
        birthdate: formattedDate,
        age: age.toString(),
      }));

      // Age validation
      if (age < 13) {
        setAgeError("You must be at least 13 years old to create an account");
      } else {
        setAgeError("");
      }
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const getMaxDate = (): Date => {
    const today = new Date();
    return new Date(
      today.getFullYear() - 13,
      today.getMonth(),
      today.getDate()
    );
  };

  const getMinDate = (): Date => {
    const today = new Date();
    return new Date(
      today.getFullYear() - 100,
      today.getMonth(),
      today.getDate()
    );
  };

  // Timer effect for OTP resend
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Form handlers
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    // Password strength validation
    if (field === "password" && typeof value === "string") {
      try {
        passwordSchema.parse(value);
        setPasswordError("");
        setPasswordStrength(5); // Strong
      } catch (error) {
        if (error instanceof z.ZodError) {
          setPasswordError(error.issues[0].message);
          // Calculate strength based on criteria met
          let strength = 0;
          if (value.length >= 8) strength++;
          if (/[A-Z]/.test(value)) strength++;
          if (/[a-z]/.test(value)) strength++;
          if (/\d/.test(value)) strength++;
          if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) strength++;
          setPasswordStrength(strength);
        }
      }
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newVerificationCode = [...formData.verificationCode];
    newVerificationCode[index] = value;

    setFormData((prev) => ({
      ...prev,
      verificationCode: newVerificationCode,
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
      if (currentStep === 2) {
        setShowOTP(false); // Reset OTP view when going back from step 2
      }
    } else {
      router.back();
    }
  };

  // Step 1: Send OTP
  const handleSendOTP = async () => {
    if (!formData.firstName || !formData.lastName || !formData.phoneNumber) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (formData.phoneNumber.length !== 10) {
      Alert.alert("Error", "Phone number must be exactly 10 digits");
      return;
    }

    setIsSubmitting(true);

    // TODO: Backend integration - Send OTP to phone number
    // Replace this simulation with actual API call
    setTimeout(() => {
      setShowSuccessModal(true);
      setIsSubmitting(false);

      // Auto show OTP input after modal closes
      setTimeout(() => {
        setShowOTP(true);
        setResendTimer(22); // 22 seconds as shown in UI
      }, 3000);
    }, 1500);
  };

  // Step 1: Verify OTP
  const handleVerifyOTP = () => {
    const otpCode = formData.verificationCode.join("");
    if (otpCode.length !== 4) {
      Alert.alert("Error", "Please enter the complete 4-digit code");
      return;
    }

    // TODO: Backend integration - Verify OTP code
    // Replace this with actual API call
    nextStep();
  };

  // Step 2: Continue with gender/birthdate (age input removed)
  const handleStep2Continue = () => {
    if (!formData.gender) {
      Alert.alert("Error", "Please select your gender");
      return;
    }

    if (!formData.birthdate || !selectedDate) {
      Alert.alert("Error", "Please select your birthdate");
      return;
    }

    if (calculatedAge !== null && calculatedAge < 13) {
      Alert.alert(
        "Age Restriction",
        "You must be at least 13 years old to create an account"
      );
      return;
    }

    // All validations passed
    nextStep();
  };

  // Final signup submission
  const handleSignup = async () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (!hasAcceptedTerms) {
      Alert.alert(
        "Error",
        "You must agree to the Terms of Service and Privacy Policy"
      );
      return;
    }

    // Validate password strength
    if (passwordError || passwordStrength < 5) {
      Alert.alert("Error", "Please create a stronger password");
      return;
    }

    setIsSubmitting(true);

    try {
      //Todo - backend
      // ✅ Call your AuthContext signup method instead
      const result = await signup({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        gender: formData.gender as "male" | "female" | "other",
        birthdate:
          formData.birthdate ||
          `${new Date().getFullYear() - parseInt(formData.age || "25")}-06-15`,
        agreeToTerms: hasAcceptedTerms,
      });

      if (result.success) {
        // ✅ Don't add navigation here - AuthContext will handle it
        console.log("Account creation successful");
      } else {
        Alert.alert("Error", result.error || "Account creation failed");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get password strength color and label
  const getPasswordStrength = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return { color: AppTheme.colors.error[500], label: "Very Weak" };
      case 2:
        return { color: AppTheme.colors.warning[500], label: "Weak" };
      case 3:
        return { color: "#f59e0b", label: "Fair" };
      case 4:
        return { color: AppTheme.colors.warning[600], label: "Good" };
      case 5:
        return { color: AppTheme.colors.success[500], label: "Strong" };
      default:
        return { color: AppTheme.colors.gray[400], label: "" };
    }
  };

  // Render Steps
  const renderStep1 = () => (
    <VStack space="lg">
      <VStack mb={AppTheme.spacing.lg}>
        <Heading
          size="3xl"
          color={
            isDark
              ? AppTheme.colors.text.dark.primary
              : AppTheme.colors.blue[900]
          }
          fontWeight="700"
          mb={AppTheme.spacing.sm}
        >
          Create Your Account
        </Heading>
        <Text
          color={
            isDark
              ? AppTheme.colors.text.dark.subtle
              : AppTheme.colors.blue[600]
          }
          fontSize={AppTheme.typography.fontSizes.md}
        >
          Let&apos;s get started with your basic information
        </Text>
      </VStack>

      {!showOTP ? (
        <VStack space="md">
          {/* Name Fields */}
          <HStack space="sm">
            <Box
              flex={1}
              backgroundColor={
                isDark ? AppTheme.colors.dark.surface : AppTheme.colors.gray[50]
              }
              borderColor={
                isDark ? AppTheme.colors.dark.border : AppTheme.colors.gray[300]
              }
              borderRadius={AppTheme.borderRadius.lg}
              borderWidth={1}
              h={56}
              justifyContent="center"
              px={AppTheme.spacing.md}
            >
              <HStack alignItems="center">
                <Icon
                  name="person"
                  size={20}
                  color={
                    isDark
                      ? AppTheme.colors.blue[400]
                      : AppTheme.colors.blue[500]
                  }
                />
                <Input
                  flex={1}
                  variant="outline"
                  borderWidth={0}
                  backgroundColor="transparent"
                >
                  <InputField
                    placeholder="First Name"
                    value={formData.firstName}
                    onChangeText={(value) =>
                      handleInputChange("firstName", value)
                    }
                    color={
                      isDark
                        ? AppTheme.colors.text.dark.primary
                        : AppTheme.colors.gray[900]
                    }
                    fontSize={AppTheme.typography.fontSizes.md}
                    placeholderTextColor={
                      isDark
                        ? AppTheme.colors.text.dark.muted
                        : AppTheme.colors.gray[400]
                    }
                    ml={AppTheme.spacing.sm}
                  />
                </Input>
              </HStack>
            </Box>

            <Box
              flex={1}
              backgroundColor={
                isDark ? AppTheme.colors.dark.surface : AppTheme.colors.gray[50]
              }
              borderColor={
                isDark ? AppTheme.colors.dark.border : AppTheme.colors.gray[300]
              }
              borderRadius={AppTheme.borderRadius.lg}
              borderWidth={1}
              h={56}
              justifyContent="center"
              px={AppTheme.spacing.md}
            >
              <HStack alignItems="center">
                <Icon
                  name="person"
                  size={20}
                  color={
                    isDark
                      ? AppTheme.colors.blue[400]
                      : AppTheme.colors.blue[500]
                  }
                />
                <Input
                  flex={1}
                  variant="outline"
                  borderWidth={0}
                  backgroundColor="transparent"
                >
                  <InputField
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChangeText={(value) =>
                      handleInputChange("lastName", value)
                    }
                    color={
                      isDark
                        ? AppTheme.colors.text.dark.primary
                        : AppTheme.colors.gray[900]
                    }
                    fontSize={AppTheme.typography.fontSizes.md}
                    placeholderTextColor={
                      isDark
                        ? AppTheme.colors.text.dark.muted
                        : AppTheme.colors.gray[400]
                    }
                    ml={AppTheme.spacing.sm}
                  />
                </Input>
              </HStack>
            </Box>
          </HStack>

          {/* Phone Number */}
          <Box
            backgroundColor={
              isDark ? AppTheme.colors.dark.surface : AppTheme.colors.gray[50]
            }
            borderColor={
              isDark ? AppTheme.colors.dark.border : AppTheme.colors.gray[300]
            }
            borderRadius={AppTheme.borderRadius.lg}
            borderWidth={1}
            h={56}
            justifyContent="center"
            px={AppTheme.spacing.md}
            style={{
              borderColor: isDark ? AppTheme.colors.dark.border : "#e0e7ff", // Light blue from image
              backgroundColor: isDark
                ? AppTheme.colors.dark.surface
                : "#f9faff", // Light background
            }}
          >
            <HStack alignItems="center" space="sm">
              <Icon
                name="phone"
                size={20}
                color={
                  isDark ? AppTheme.colors.blue[400] : "#3b82f6" // Blue from image
                }
              />
              {/* Country Code with Flag */}
              <Select
                onValueChange={(value) =>
                  handleInputChange("countryCode", value)
                }
                selectedValue={formData.countryCode || "+91"}
                minWidth={70}
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                }}
              >
                <SelectTrigger
                  variant="outline"
                  size="md"
                  style={{
                    borderWidth: 0,
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <SelectInput
                    color={AppTheme.colors.blue[600]}
                    fontWeight="600"
                    fontSize={AppTheme.typography.fontSizes.sm}
                    placeholder="Select country code"
                    value={formData.countryCode || "+91"} // Display selected value
                    editable={false} // Prevent manual input
                  />

                  <SelectIcon
                    as={() => (
                      <Icon
                        name="keyboard-arrow-down"
                        size={16}
                        color={isDark ? AppTheme.colors.blue[400] : "#3b82f6"}
                      />
                    )}
                    mr={AppTheme.spacing.xs}
                  />
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="🇮🇳 +91" value="+91" />
                    <SelectItem label="🇨🇳 +86" value="+86" />
                    <SelectItem label="🇺🇸 +1" value="+1" />
                    <SelectItem label="🇮🇩 +62" value="+62" />
                    <SelectItem label="🇵🇰 +92" value="+92" />
                    <SelectItem label="🇧🇷 +55" value="+55" />
                    <SelectItem label="🇳🇬 +234" value="+234" />
                    <SelectItem label="🇧🇩 +880" value="+880" />
                    <SelectItem label="🇷🇺 +7" value="+7" />
                    <SelectItem label="🇲🇽 +52" value="+52" />
                  </SelectContent>
                </SelectPortal>
              </Select>
              <Box
                width={1}
                height="60%"
                backgroundColor={
                  isDark ? AppTheme.colors.dark.border : "#e0e7ff" // Light blue separator
                }
              />
              <Input
                flex={1}
                variant="outline"
                borderWidth={0}
                backgroundColor="transparent"
                style={{
                  borderColor: "transparent",
                }}
              >
                <InputField
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChangeText={(value) =>
                    handleInputChange("phoneNumber", value)
                  }
                  keyboardType="numeric"
                  maxLength={10}
                  color={
                    isDark ? AppTheme.colors.text.dark.primary : "#6b7280" // Gray placeholder text
                  }
                  fontSize={AppTheme.typography.fontSizes.md}
                  placeholderTextColor={
                    isDark ? AppTheme.colors.text.dark.muted : "#9ca3af" // Light gray placeholder
                  }
                  ml={AppTheme.spacing.sm}
                />
              </Input>
            </HStack>
          </Box>

          <Pressable
            onPress={handleSendOTP}
            disabled={isSubmitting}
            mt={AppTheme.spacing.lg}
          >
            <LinearGradient
              colors={
                isDark
                  ? AppTheme.gradients.darkButton
                  : AppTheme.gradients.button
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: 56,
                borderRadius: AppTheme.borderRadius.lg,
                justifyContent: "center",
                alignItems: "center",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              <Text
                color="#ffffff"
                fontWeight="700"
                fontSize={AppTheme.typography.fontSizes.md}
              >
                {isSubmitting ? "Sending Code..." : "Send Verification Code"}
              </Text>
            </LinearGradient>
          </Pressable>
        </VStack>
      ) : (
        <VStack space="lg">
          <Center>
            <Heading
              size="xl"
              color={
                isDark
                  ? AppTheme.colors.text.dark.primary
                  : AppTheme.colors.blue[900]
              }
              mb={AppTheme.spacing.sm}
              textAlign="center"
            >
              Verify Your Phone
            </Heading>
            <Text
              color={
                isDark
                  ? AppTheme.colors.text.dark.subtle
                  : AppTheme.colors.blue[600]
              }
              textAlign="center"
              fontSize={AppTheme.typography.fontSizes.sm}
            >
              We&apos;ve sent a 4-digit code to +91 {formData.phoneNumber}
            </Text>
          </Center>

          {/* OTP Input */}
          <HStack justifyContent="center" space="sm">
            {formData.verificationCode.map((digit, index) => (
              <Box
                key={index}
                w={48}
                h={48}
                backgroundColor={
                  isDark
                    ? AppTheme.colors.dark.surface
                    : AppTheme.colors.gray[50]
                }
                borderColor={
                  isDark
                    ? AppTheme.colors.dark.border
                    : AppTheme.colors.gray[300]
                }
                borderRadius={AppTheme.borderRadius.lg}
                borderWidth={1}
                justifyContent="center"
                alignItems="center"
              >
                <Input
                  w="100%"
                  h="100%"
                  variant="outline"
                  borderWidth={0}
                  backgroundColor="transparent"
                >
                  <InputField
                    ref={otpRefs[index] as any}
                    textAlign="center"
                    fontSize={AppTheme.typography.fontSizes.lg}
                    fontWeight="700"
                    value={digit}
                    onChangeText={(value) => handleOTPChange(index, value)}
                    keyboardType="numeric"
                    maxLength={1}
                    color={
                      isDark
                        ? AppTheme.colors.text.dark.primary
                        : AppTheme.colors.gray[900]
                    }
                  />
                </Input>
              </Box>
            ))}
          </HStack>

          <Pressable onPress={handleVerifyOTP} mt={AppTheme.spacing.lg}>
            <LinearGradient
              colors={
                isDark
                  ? AppTheme.gradients.darkButton
                  : AppTheme.gradients.button
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                height: 56,
                borderRadius: AppTheme.borderRadius.lg,
                justifyContent: "center",
                alignItems: "center",
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

          <VStack space="sm" alignItems="center">
            <Pressable onPress={() => setShowOTP(false)}>
              <Text
                color={AppTheme.colors.blue[600]}
                fontSize={AppTheme.typography.fontSizes.sm}
                textDecorationLine="underline"
              >
                Change Phone Number
              </Text>
            </Pressable>
            <HStack alignItems="center" space="xs">
              <Text
                color={
                  isDark
                    ? AppTheme.colors.text.dark.muted
                    : AppTheme.colors.gray[600]
                }
                fontSize={AppTheme.typography.fontSizes.sm}
              >
                Didn&apos;t receive code?
              </Text>
              <Pressable
                onPress={() => {
                  if (resendTimer === 0) {
                    setResendTimer(22);
                    Alert.alert("Success", "Verification code sent!");
                  }
                }}
                disabled={resendTimer > 0}
              >
                <Text
                  color={
                    resendTimer > 0
                      ? isDark
                        ? AppTheme.colors.text.dark.muted
                        : AppTheme.colors.gray[400]
                      : AppTheme.colors.blue[600]
                  }
                  fontSize={AppTheme.typography.fontSizes.sm}
                >
                  {resendTimer > 0
                    ? `Resend in ${resendTimer}s`
                    : "Resend Code"}
                </Text>
              </Pressable>
            </HStack>
          </VStack>
        </VStack>
      )}

      <SuccessModal
        isVisible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        phoneNumber={`${formData.countryCode} ${formData.phoneNumber}`}
      />
    </VStack>
  );

  const renderStep2 = () => (
    <VStack space="lg">
      <VStack mb={AppTheme.spacing.lg}>
        <Heading
          size="3xl"
          color={
            isDark
              ? AppTheme.colors.text.dark.primary
              : AppTheme.colors.blue[900]
          }
          fontWeight="700"
          mb={AppTheme.spacing.sm}
        >
          When were you born?
        </Heading>
        <Text
          color={
            isDark
              ? AppTheme.colors.text.dark.subtle
              : AppTheme.colors.blue[600]
          }
          fontSize={AppTheme.typography.fontSizes.md}
        >
          This helps us provide age-appropriate services
        </Text>
      </VStack>

      {/* Gender Selection */}
      <VStack space="sm">
        <Text
          color={
            isDark
              ? AppTheme.colors.text.dark.primary
              : AppTheme.colors.blue[900]
          }
          fontWeight="600"
          fontSize={AppTheme.typography.fontSizes.md}
        >
          Select your gender
        </Text>
        <HStack space="sm">
          {[
            { value: "male", icon: "male", label: "Male" },
            { value: "female", icon: "female", label: "Female" },
            { value: "other", icon: "person", label: "Others" },
          ].map((option) => (
            <Pressable
              key={option.value}
              flex={1}
              onPress={() => handleInputChange("gender", option.value)}
            >
              <Box
                backgroundColor={
                  formData.gender === option.value
                    ? AppTheme.colors.blue[600]
                    : isDark
                    ? AppTheme.colors.dark.surface
                    : AppTheme.colors.gray[50]
                }
                borderColor={
                  formData.gender === option.value
                    ? AppTheme.colors.blue[600]
                    : isDark
                    ? AppTheme.colors.dark.border
                    : AppTheme.colors.gray[300]
                }
                borderWidth={2}
                borderRadius={AppTheme.borderRadius.lg}
                p={AppTheme.spacing.md}
                alignItems="center"
                h={80}
                justifyContent="center"
              >
                <Icon
                  name={option.icon}
                  size={24}
                  color={
                    formData.gender === option.value
                      ? "#ffffff"
                      : isDark
                      ? AppTheme.colors.text.dark.secondary
                      : AppTheme.colors.gray[600]
                  }
                />
                <Text
                  color={
                    formData.gender === option.value
                      ? "#ffffff"
                      : isDark
                      ? AppTheme.colors.text.dark.primary
                      : AppTheme.colors.gray[900]
                  }
                  fontWeight="500"
                  fontSize={AppTheme.typography.fontSizes.sm}
                  mt={AppTheme.spacing.xs}
                >
                  {option.label}
                </Text>
              </Box>
            </Pressable>
          ))}
        </HStack>
      </VStack>

      {/* Birthdate Picker with Age Calculation */}
      <VStack space="sm">
        <Text
          color={
            isDark
              ? AppTheme.colors.text.dark.primary
              : AppTheme.colors.blue[900]
          }
          fontWeight="600"
          fontSize={AppTheme.typography.fontSizes.md}
        >
          When were you born?
        </Text>

        <Pressable onPress={openDatePicker}>
          <Box
            backgroundColor={
              isDark ? AppTheme.colors.dark.surface : AppTheme.colors.gray[50]
            }
            borderColor={
              ageError
                ? AppTheme.colors.error[500]
                : isDark
                ? AppTheme.colors.dark.border
                : AppTheme.colors.gray[300]
            }
            borderRadius={AppTheme.borderRadius.lg}
            borderWidth={ageError ? 2 : 1}
            h={56}
            justifyContent="center"
            px={AppTheme.spacing.md}
          >
            <HStack alignItems="center">
              <Icon
                name="cake"
                size={20}
                color={
                  isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[500]
                }
              />
              <Text
                color={
                  formData.birthdate
                    ? isDark
                      ? AppTheme.colors.text.dark.primary
                      : AppTheme.colors.gray[900]
                    : isDark
                    ? AppTheme.colors.text.dark.muted
                    : AppTheme.colors.gray[400]
                }
                fontSize={AppTheme.typography.fontSizes.md}
                ml={AppTheme.spacing.sm}
              >
                {formData.birthdate || "Select Your Birthdate"}
              </Text>
              <Box flex={1} />
              <Icon
                name="expand-more"
                size={20}
                color={
                  isDark
                    ? AppTheme.colors.text.dark.muted
                    : AppTheme.colors.gray[500]
                }
              />
            </HStack>
          </Box>
        </Pressable>

        {/* Age Display and Error */}
        {calculatedAge !== null && (
          <HStack alignItems="center" space="xs" mt={AppTheme.spacing.xs}>
            <Icon
              name={ageError ? "error" : "check-circle"}
              size={16}
              color={
                ageError
                  ? AppTheme.colors.error[500]
                  : AppTheme.colors.success[500]
              }
            />
            <Text
              fontSize={AppTheme.typography.fontSizes.sm}
              color={
                ageError
                  ? AppTheme.colors.error[500]
                  : AppTheme.colors.success[600]
              }
              fontWeight="500"
            >
              {ageError || `You are ${calculatedAge} years old`}
            </Text>
          </HStack>
        )}

        {/* Date Picker Component */}
        {showDatePicker && (
          <>
            {Platform.OS === "ios" ? (
              // iOS Modal Style
              <Modal
                visible={showDatePicker}
                transparent={true}
                animationType="slide"
              >
                <Box
                  flex={1}
                  backgroundColor={
                    isDark ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.5)"
                  }
                  justifyContent="flex-end"
                >
                  <Box
                    backgroundColor={
                      isDark ? AppTheme.colors.dark.surface : "#ffffff"
                    }
                    borderTopLeftRadius={AppTheme.borderRadius.xl}
                    borderTopRightRadius={AppTheme.borderRadius.xl}
                    p={AppTheme.spacing.lg}
                    borderColor={
                      isDark ? AppTheme.colors.dark.border : "transparent"
                    }
                    borderWidth={isDark ? 1 : 0}
                  >
                    {/* Header */}
                    <HStack
                      justifyContent="space-between"
                      alignItems="center"
                      mb={AppTheme.spacing.md}
                    >
                      <Pressable onPress={() => setShowDatePicker(false)}>
                        <Text
                          color={AppTheme.colors.blue[600]}
                          fontSize={AppTheme.typography.fontSizes.md}
                          fontWeight="600"
                        >
                          Cancel
                        </Text>
                      </Pressable>
                      <Heading
                        size="md"
                        color={
                          isDark
                            ? AppTheme.colors.text.dark.primary
                            : AppTheme.colors.gray[900]
                        }
                      >
                        Select Birthdate
                      </Heading>
                      <Pressable onPress={() => setShowDatePicker(false)}>
                        <Text
                          color={AppTheme.colors.blue[600]}
                          fontSize={AppTheme.typography.fontSizes.md}
                          fontWeight="600"
                        >
                          Done
                        </Text>
                      </Pressable>
                    </HStack>

                    <DateTimePicker
                      value={selectedDate || new Date(2000, 0, 1)}
                      mode="date"
                      display="spinner"
                      onChange={handleDateChange}
                      maximumDate={new Date()}
                      minimumDate={getMinDate()}
                      textColor={isDark ? "#ffffff" : "#000000"}
                      themeVariant={isDark ? "dark" : "light"}
                    />
                  </Box>
                </Box>
              </Modal>
            ) : (
              // Android Native Picker
              <DateTimePicker
                value={selectedDate || new Date(2000, 0, 1)}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
                minimumDate={getMinDate()}
              />
            )}
          </>
        )}
      </VStack>

      <Pressable
        onPress={handleStep2Continue}
        disabled={
          !formData.gender ||
          !formData.birthdate ||
          ageError !== "" ||
          calculatedAge === null ||
          calculatedAge < 13
        }
        mt={AppTheme.spacing.lg}
      >
        <LinearGradient
          colors={
            isDark ? AppTheme.gradients.darkButton : AppTheme.gradients.button
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            height: 56,
            borderRadius: AppTheme.borderRadius.lg,
            justifyContent: "center",
            alignItems: "center",
            opacity:
              !formData.gender ||
              !formData.birthdate ||
              ageError !== "" ||
              calculatedAge === null ||
              calculatedAge < 13
                ? 0.5
                : 1,
          }}
        >
          <Text
            color="#ffffff"
            fontWeight="700"
            fontSize={AppTheme.typography.fontSizes.md}
          >
            Continue
          </Text>
        </LinearGradient>
      </Pressable>
    </VStack>
  );

  const renderStep3 = () => {
    const strength = getPasswordStrength();

    return (
      <VStack space="lg">
        <VStack mb={AppTheme.spacing.lg}>
          <Heading
            size="3xl"
            color={
              isDark
                ? AppTheme.colors.text.dark.primary
                : AppTheme.colors.blue[900]
            }
            fontWeight="700"
            mb={AppTheme.spacing.sm}
          >
            Create Your Password
          </Heading>
          <Text
            color={
              isDark
                ? AppTheme.colors.text.dark.subtle
                : AppTheme.colors.blue[600]
            }
            fontSize={AppTheme.typography.fontSizes.md}
          >
            Choose a strong password to secure your account
          </Text>
        </VStack>

        {/* Email Field */}
        <Box
          backgroundColor={
            isDark ? AppTheme.colors.dark.surface : AppTheme.colors.gray[50]
          }
          borderColor={
            isDark ? AppTheme.colors.dark.border : AppTheme.colors.gray[300]
          }
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
              color={
                isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[500]
              }
            />
            <Input
              flex={1}
              variant="outline"
              borderWidth={0}
              backgroundColor="transparent"
            >
              <InputField
                placeholder="Enter your email address"
                value={formData.email}
                onChangeText={(value) => handleInputChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
                color={
                  isDark
                    ? AppTheme.colors.text.dark.primary
                    : AppTheme.colors.gray[900]
                }
                fontSize={AppTheme.typography.fontSizes.md}
                placeholderTextColor={
                  isDark
                    ? AppTheme.colors.text.dark.muted
                    : AppTheme.colors.gray[400]
                }
                ml={AppTheme.spacing.sm}
              />
            </Input>
          </HStack>
        </Box>

        {/* Password Field */}
        <VStack space="xs">
          <Box
            backgroundColor={
              isDark ? AppTheme.colors.dark.surface : AppTheme.colors.gray[50]
            }
            borderColor={
              isDark ? AppTheme.colors.dark.border : AppTheme.colors.gray[300]
            }
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
                color={
                  isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[500]
                }
              />
              <Input
                flex={1}
                variant="outline"
                borderWidth={0}
                backgroundColor="transparent"
              >
                <InputField
                  placeholder="Create password"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange("password", value)}
                  secureTextEntry={!showPassword}
                  color={
                    isDark
                      ? AppTheme.colors.text.dark.primary
                      : AppTheme.colors.gray[900]
                  }
                  fontSize={AppTheme.typography.fontSizes.md}
                  placeholderTextColor={
                    isDark
                      ? AppTheme.colors.text.dark.muted
                      : AppTheme.colors.gray[400]
                  }
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
                  color={
                    isDark
                      ? AppTheme.colors.blue[400]
                      : AppTheme.colors.blue[500]
                  }
                />
              </Pressable>
            </HStack>
          </Box>

          {/* Password Strength Indicator */}
          {formData.password.length > 0 && (
            <VStack space="xs">
              <HStack space="xs" alignItems="center">
                <Box
                  flex={1}
                  height={4}
                  backgroundColor={
                    isDark
                      ? AppTheme.colors.dark.border
                      : AppTheme.colors.gray[300]
                  }
                  borderRadius={AppTheme.borderRadius.full}
                >
                  <Box
                    height={4}
                    backgroundColor={strength.color}
                    borderRadius={AppTheme.borderRadius.full}
                    width={`${(passwordStrength / 5) * 100}%`}
                  />
                </Box>
                <Text
                  fontSize={AppTheme.typography.fontSizes.xs}
                  color={strength.color}
                  fontWeight="600"
                  minWidth={60}
                >
                  {strength.label}
                </Text>
              </HStack>
              {passwordError && (
                <Text
                  fontSize={AppTheme.typography.fontSizes.xs}
                  color={AppTheme.colors.error[500]}
                >
                  {passwordError}
                </Text>
              )}
            </VStack>
          )}
        </VStack>

        {/* Confirm Password Field */}
        <Box
          backgroundColor={
            isDark ? AppTheme.colors.dark.surface : AppTheme.colors.gray[50]
          }
          borderColor={
            isDark ? AppTheme.colors.dark.border : AppTheme.colors.gray[300]
          }
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
              color={
                isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[500]
              }
            />
            <Input
              flex={1}
              variant="outline"
              borderWidth={0}
              backgroundColor="transparent"
            >
              <InputField
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChangeText={(value) =>
                  handleInputChange("confirmPassword", value)
                }
                secureTextEntry={!showPassword}
                color={
                  isDark
                    ? AppTheme.colors.text.dark.primary
                    : AppTheme.colors.gray[900]
                }
                fontSize={AppTheme.typography.fontSizes.md}
                placeholderTextColor={
                  isDark
                    ? AppTheme.colors.text.dark.muted
                    : AppTheme.colors.gray[400]
                }
                ml={AppTheme.spacing.sm}
              />
            </Input>
          </HStack>
        </Box>

        {/* Terms Checkbox */}
        <HStack alignItems="flex-start" space="sm">
          <Pressable
            onPress={() => setHasAcceptedTerms(!hasAcceptedTerms)}
            mt={2}
          >
            <Box
              w={20}
              h={20}
              backgroundColor={
                hasAcceptedTerms ? AppTheme.colors.blue[600] : "transparent"
              }
              borderColor={
                hasAcceptedTerms
                  ? AppTheme.colors.blue[600]
                  : isDark
                  ? AppTheme.colors.dark.border
                  : AppTheme.colors.gray[300]
              }
              borderWidth={2}
              borderRadius={AppTheme.borderRadius.sm}
              alignItems="center"
              justifyContent="center"
            >
              {hasAcceptedTerms && (
                <Icon name="check" size={14} color="#ffffff" />
              )}
            </Box>
          </Pressable>
          <VStack flex={1}>
            <Text
              color={
                isDark
                  ? AppTheme.colors.text.dark.secondary
                  : AppTheme.colors.gray[700]
              }
              fontSize={AppTheme.typography.fontSizes.sm}
            >
              I agree to the{" "}
              <Text
                color={AppTheme.colors.blue[600]}
                textDecorationLine="underline"
                onPress={() => setShowTermsModal(true)}
              >
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text
                color={AppTheme.colors.blue[600]}
                textDecorationLine="underline"
                onPress={() => setShowPrivacyModal(true)}
              >
                Privacy Policy
              </Text>
            </Text>
          </VStack>
        </HStack>

        <Pressable
          onPress={handleSignup}
          disabled={isSubmitting || !hasAcceptedTerms || passwordStrength < 5}
          mt={AppTheme.spacing.lg}
        >
          <LinearGradient
            colors={
              isDark ? AppTheme.gradients.darkButton : AppTheme.gradients.button
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              height: 56,
              borderRadius: AppTheme.borderRadius.lg,
              justifyContent: "center",
              alignItems: "center",
              opacity:
                isSubmitting || !hasAcceptedTerms || passwordStrength < 5
                  ? 0.5
                  : 1,
            }}
          >
            <Text
              color="#ffffff"
              fontWeight="700"
              fontSize={AppTheme.typography.fontSizes.md}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Text>
          </LinearGradient>
        </Pressable>

        {/* Terms and Privacy Modals */}
        <TermsModal
          isVisible={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          title="Terms of Service"
        >
          <VStack space="md">
            <Heading
              size="lg"
              color={
                isDark
                  ? AppTheme.colors.text.dark.primary
                  : AppTheme.colors.blue[900]
              }
            >
              QVuew Terms of Service
            </Heading>
            <Text
              fontSize={AppTheme.typography.fontSizes.sm}
              color={
                isDark
                  ? AppTheme.colors.text.dark.muted
                  : AppTheme.colors.gray[600]
              }
            >
              Last Updated: April 20, 2025
            </Text>

            <Text
              fontSize={AppTheme.typography.fontSizes.sm}
              color={
                isDark
                  ? AppTheme.colors.text.dark.secondary
                  : AppTheme.colors.gray[700]
              }
            >
              <Text fontWeight="600">1. Acceptance of Terms</Text>
              {"\n"}
              Welcome to QVuew. By accessing or using our queue management
              service, you agree to be bound by these Terms of Service. If you
              do not agree to these terms, please do not use our service.
            </Text>

            <Text
              fontSize={AppTheme.typography.fontSizes.sm}
              color={
                isDark
                  ? AppTheme.colors.text.dark.secondary
                  : AppTheme.colors.gray[700]
              }
            >
              <Text fontWeight="600">2. Description of Service</Text>
              {"\n"}
              QVuew provides businesses with queue management solutions,
              including virtual queue systems, appointment scheduling, and
              customer flow analytics.
            </Text>

            <Text
              fontSize={AppTheme.typography.fontSizes.sm}
              color={
                isDark
                  ? AppTheme.colors.text.dark.secondary
                  : AppTheme.colors.gray[700]
              }
            >
              <Text fontWeight="600">3. Account Registration</Text>
              {"\n"}
              To access certain features of QVuew, you must register for an
              account. You agree to provide accurate information during
              registration and to keep your account information updated.
            </Text>

            <Text
              fontSize={AppTheme.typography.fontSizes.sm}
              color={
                isDark
                  ? AppTheme.colors.text.dark.secondary
                  : AppTheme.colors.gray[700]
              }
            >
              <Text fontWeight="600">4. Contact Information</Text>
              {"\n"}
              If you have questions about these Terms of Service, please contact
              us at support@qvuew.com.
            </Text>
          </VStack>
        </TermsModal>

        <TermsModal
          isVisible={showPrivacyModal}
          onClose={() => setShowPrivacyModal(false)}
          title="Privacy Policy"
        >
          <VStack space="md">
            <Heading
              size="lg"
              color={
                isDark
                  ? AppTheme.colors.text.dark.primary
                  : AppTheme.colors.blue[900]
              }
            >
              QVuew Privacy Policy
            </Heading>
            <Text
              fontSize={AppTheme.typography.fontSizes.sm}
              color={
                isDark
                  ? AppTheme.colors.text.dark.muted
                  : AppTheme.colors.gray[600]
              }
            >
              Last Updated: April 20, 2025
            </Text>

            <Text
              fontSize={AppTheme.typography.fontSizes.sm}
              color={
                isDark
                  ? AppTheme.colors.text.dark.secondary
                  : AppTheme.colors.gray[700]
              }
            >
              <Text fontWeight="600">1. Introduction</Text>
              {"\n"}
              At QVuew, we respect your privacy and are committed to protecting
              your personal data. This Privacy Policy explains how we collect,
              use, and safeguard your information when you use our queue
              management service.
            </Text>

            <Text
              fontSize={AppTheme.typography.fontSizes.sm}
              color={
                isDark
                  ? AppTheme.colors.text.dark.secondary
                  : AppTheme.colors.gray[700]
              }
            >
              <Text fontWeight="600">2. Information We Collect</Text>
              {"\n"}
              We collect information you provide directly to us, such as
              business contact information, business details, account
              credentials, and payment information.
            </Text>

            <Text
              fontSize={AppTheme.typography.fontSizes.sm}
              color={
                isDark
                  ? AppTheme.colors.text.dark.secondary
                  : AppTheme.colors.gray[700]
              }
            >
              <Text fontWeight="600">3. Data Security</Text>
              {"\n"}
              We implement appropriate security measures to protect your
              personal information from unauthorized access, alteration, or
              disclosure. All data is encrypted during transmission and at rest.
            </Text>

            <Text
              fontSize={AppTheme.typography.fontSizes.sm}
              color={
                isDark
                  ? AppTheme.colors.text.dark.secondary
                  : AppTheme.colors.gray[700]
              }
            >
              <Text fontWeight="600">4. Contact Us</Text>
              {"\n"}
              If you have questions about this Privacy Policy, please contact us
              at privacy@qvuew.com.
            </Text>
          </VStack>
        </TermsModal>
      </VStack>
    );
  };

  return (
    <Box
      flex={1}
      backgroundColor={
        isDark ? AppTheme.colors.dark.background : AppTheme.colors.blue[50]
      }
    >
      <LinearGradient
        colors={
          isDark
            ? AppTheme.gradients.darkBackground
            : AppTheme.gradients.background
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      >
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <VStack
            flex={1}
            px={AppTheme.spacing.lg}
            pt={AppTheme.spacing["2xl"]}
            pb={AppTheme.spacing.xl}
          >
            {/* Header with Progress */}
            <VStack mb={AppTheme.spacing.xl}>
              <HStack
                alignItems="center"
                justifyContent="space-between"
                mb={AppTheme.spacing.md}
              >
                <Pressable onPress={goBack}>
                  <HStack alignItems="center" space="xs">
                    <ArrowLeftIcon
                      size="md"
                      color={
                        isDark
                          ? AppTheme.colors.blue[400]
                          : AppTheme.colors.blue[600]
                      }
                    />
                    <Text
                      color={
                        isDark
                          ? AppTheme.colors.blue[400]
                          : AppTheme.colors.blue[600]
                      }
                      fontWeight="500"
                      fontSize={AppTheme.typography.fontSizes.md}
                    >
                      Back
                    </Text>
                  </HStack>
                </Pressable>
                <Text
                  color={
                    isDark
                      ? AppTheme.colors.text.dark.subtle
                      : AppTheme.colors.blue[600]
                  }
                  fontSize={AppTheme.typography.fontSizes.sm}
                >
                  Step {currentStep} of {totalSteps}
                </Text>
              </HStack>

              {/* Progress Bar */}
              <Box
                backgroundColor={
                  isDark
                    ? AppTheme.colors.dark.border
                    : AppTheme.colors.blue[100]
                }
                height={4}
                borderRadius={AppTheme.borderRadius.full}
              >
                <LinearGradient
                  colors={
                    isDark
                      ? AppTheme.gradients.darkButton
                      : AppTheme.gradients.button
                  }
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
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </VStack>
        </ScrollView>
      </LinearGradient>
    </Box>
  );
}
