// components/HelpSupportModal.tsx

import { AppTheme } from '@/constants/theme';
import { Box, Button, ButtonText, Heading, HStack, Input, InputField, Pressable, ScrollView, Text, VStack, Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectDragIndicatorWrapper, SelectDragIndicator, SelectItem } from '@gluestack-ui/themed';
import { Modal, Dimensions, Alert } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeProvider';

const { height: screenHeight } = Dimensions.get("window");

// Data
const faqData = [
  { id: 1, question: "How do I join a queue?", answer: "Simply scan the QR code at any participating business to instantly join their queue." },
  { id: 2, question: "Can I leave a queue once I've joined?", answer: "Yes, you can leave any queue at any time by tapping the 'Leave Queue' button on your ticket." },
  { id: 3, question: "How accurate are the wait time estimates?", answer: "Wait times are calculated in real-time based on current queue length and average service time." },
  { id: 4, question: "What if I miss my turn?", answer: "You'll receive notifications when it's almost your turn. If you miss it, you may need to rejoin the queue." },
  { id: 5, question: "Is QVuew free to use?", answer: "Yes, QVuew is completely free for customers. Some businesses may offer premium features." }
];

const userGuideSteps = [
  { id: 1, icon: "smartphone", title: "Download & Sign Up", description: "Download QVuew from your app store and create your account with email or phone number." },
  { id: 2, icon: "location-on", title: "Enable Location", description: "Allow location access to discover nearby businesses and get accurate wait times." },
  { id: 3, icon: "qr-code-scanner", title: "Scan QR Code", description: "Find the QR code at any participating business and scan it with the in-app scanner." },
  { id: 4, icon: "gps-fixed", title: "Select Services", description: "Choose the services you need and see pricing upfront before joining the queue." },
  { id: 5, icon: "schedule", title: "Track Your Position", description: "Monitor your queue position in real-time and receive notifications when it's your turn." }
];

const issueTypes = [
  "App Crash",
  "Queue Not Working", 
  "Payment Issue",
  "Login Problem",
  "Notification Issue",
  "Business Not Found",
  "Other"
];

interface HelpSupportModalProps {
  isVisible: boolean;
  onClose: () => void;
}

type ViewType = 'main' | 'faq' | 'userGuide' | 'reportIssue';

export const HelpSupportModal: React.FC<HelpSupportModalProps> = ({
  isVisible,
  onClose,
}) => {
  const { isDark } = useTheme();
  
  // States
  const [currentView, setCurrentView] = useState<ViewType>('main');
  const [reportData, setReportData] = useState({
    issueType: '',
    description: ''
  });

  const resetStates = () => {
    setCurrentView('main');
    setReportData({ issueType: '', description: '' });
  };

  const handleClose = () => {
    resetStates();
    onClose();
  };

  const handleReportIssue = () => {
    if (!reportData.issueType.trim() || !reportData.description.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    console.log("Issue reported:", reportData);
    Alert.alert('Success', 'Your issue has been reported. We will get back to you soon.', [
      { text: 'OK', onPress: () => setCurrentView('main') }
    ]);
    setReportData({ issueType: '', description: '' });
  };

  const renderHelpItem = (
    icon: string,
    iconColor: string,
    iconBg: string,
    title: string,
    subtitle: string,
    onPress: () => void
  ) => (
    <Pressable onPress={onPress}>
      <HStack
        alignItems="center"
        space="md"
        backgroundColor={isDark ? AppTheme.colors.gray[800] : "#ffffff"}
        borderRadius={AppTheme.borderRadius.xl}
        p={AppTheme.spacing.lg}
        mb={AppTheme.spacing.sm}
        shadowColor="#000000"
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.05}
        shadowRadius={2}
        elevation={2}
      >
        <Box
          w={40}
          h={40}
          backgroundColor={iconBg}
          borderRadius={AppTheme.borderRadius.lg}
          alignItems="center"
          justifyContent="center"
        >
          <Icon name={icon} size={20} color={iconColor} />
        </Box>

        <VStack flex={1}>
          <Text
            fontSize={AppTheme.typography.fontSizes.md}
            fontWeight="600"
            color={isDark ? AppTheme.colors.gray[100] : AppTheme.colors.gray[900]}
          >
            {title}
          </Text>
          <Text
            fontSize={AppTheme.typography.fontSizes.sm}
            color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
          >
            {subtitle}
          </Text>
        </VStack>

        <Icon name="chevron-right" size={24} color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[500]} />
      </HStack>
    </Pressable>
  );

  const getHeaderConfig = () => {
    switch (currentView) {
      case 'faq':
        return { title: 'Frequently Asked Questions', color: AppTheme.colors.blue[600] };
      case 'userGuide':
        return { title: 'User Guide', color: AppTheme.colors.orange[600] };
      case 'reportIssue':
        return { title: 'Report an Issue', color: AppTheme.colors.error[600] };
      default:
        return { title: 'Help & Support', color: AppTheme.colors.success[600] };
    }
  };

  const headerConfig = getHeaderConfig();

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <Box flex={1} backgroundColor="rgba(0,0,0,0.5)" justifyContent="flex-end">
        <Box
          backgroundColor={isDark ? AppTheme.colors.gray[900] : "#ffffff"}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          height={screenHeight * 0.85}
        >
          {/* Header */}
          <Box
            backgroundColor={headerConfig.color}
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            p={AppTheme.spacing.lg}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <HStack alignItems="center" space="md">
                {currentView !== 'main' && (
                  <Pressable onPress={() => setCurrentView('main')} p={AppTheme.spacing.xs}>
                    <Icon name="arrow-back" size={24} color="#ffffff" />
                  </Pressable>
                )}
                <VStack>
                  <Text
                    fontSize={AppTheme.typography.fontSizes.lg}
                    fontWeight="700"
                    color="#ffffff"
                  >
                    {headerConfig.title}
                  </Text>
                  {currentView === 'main' && (
                    <Text
                      fontSize={AppTheme.typography.fontSizes.sm}
                      color="rgba(255,255,255,0.8)"
                    >
                      Get assistance when you need it
                    </Text>
                  )}
                </VStack>
              </HStack>
              <Pressable onPress={handleClose} p={AppTheme.spacing.xs}>
                <Icon name="close" size={24} color="#ffffff" />
              </Pressable>
            </HStack>
          </Box>

          {/* Content */}
          <ScrollView 
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: AppTheme.spacing.lg, paddingBottom: AppTheme.spacing.xl }}
            showsVerticalScrollIndicator={false}
          >
            {currentView === 'main' && (
              <VStack space="sm">
                {renderHelpItem(
                  'help-outline',
                  '#ffffff',
                  AppTheme.colors.blue[500],
                  'Frequently Asked Questions',
                  'Find answers to common questions',
                  () => setCurrentView('faq')
                )}

                {renderHelpItem(
                  'menu-book',
                  '#ffffff',
                  AppTheme.colors.orange[500],
                  'User Guide',
                  'Learn how to use QVuew',
                  () => setCurrentView('userGuide')
                )}

                {renderHelpItem(
                  'bug-report',
                  '#ffffff',
                  AppTheme.colors.error[500],
                  'Report an Issue',
                  'Let us know about problems',
                  () => setCurrentView('reportIssue')
                )}
              </VStack>
            )}

            {currentView === 'faq' && (
              <VStack space="md">
                {faqData.map((faq) => (
                  <Box
                    key={faq.id}
                    backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.blue[50]}
                    borderRadius={AppTheme.borderRadius.lg}
                    p={AppTheme.spacing.lg}
                  >
                    <Text
                      fontSize={AppTheme.typography.fontSizes.md}
                      fontWeight="700"
                      color={isDark ? AppTheme.colors.gray[100] : AppTheme.colors.gray[900]}
                      mb={AppTheme.spacing.sm}
                    >
                      {faq.question}
                    </Text>
                    <Text
                      fontSize={AppTheme.typography.fontSizes.sm}
                      color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[600]}
                      lineHeight={20}
                    >
                      {faq.answer}
                    </Text>
                  </Box>
                ))}
              </VStack>
            )}

            {currentView === 'userGuide' && (
              <VStack space="md">
                {userGuideSteps.map((step) => (
                  <Box
                    key={step.id}
                    backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.orange[50]}
                    borderRadius={AppTheme.borderRadius.lg}
                    p={AppTheme.spacing.lg}
                  >
                    <HStack alignItems="flex-start" space="md">
                      <Box
                        w={40}
                        h={40}
                        backgroundColor={AppTheme.colors.orange[100]}
                        borderRadius={AppTheme.borderRadius.lg}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon name={step.icon} size={20} color={AppTheme.colors.orange[600]} />
                      </Box>

                      <VStack flex={1}>
                        <Text
                          fontSize={AppTheme.typography.fontSizes.md}
                          fontWeight="700"
                          color={isDark ? AppTheme.colors.gray[100] : AppTheme.colors.gray[900]}
                          mb={AppTheme.spacing.xs}
                        >
                          {step.title}
                        </Text>
                        <Text
                          fontSize={AppTheme.typography.fontSizes.sm}
                          color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[600]}
                          lineHeight={20}
                        >
                          {step.description}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            )}

            {currentView === 'reportIssue' && (
              <VStack space="lg">
                {/* Issue Type */}
                <VStack space="xs">
                  <Text
                    fontSize={AppTheme.typography.fontSizes.sm}
                    fontWeight="600"
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    Issue Type
                  </Text>
                  <Box
                    backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.gray[50]}
                    borderRadius={AppTheme.borderRadius.lg}
                    borderWidth={1}
                    borderColor={isDark ? AppTheme.colors.gray[600] : AppTheme.colors.gray[300]}
                  >
                    <Select
                      selectedValue={reportData.issueType}
                      onValueChange={(value) => setReportData(prev => ({ ...prev, issueType: value }))}
                    >
                      <SelectTrigger>
                        <HStack alignItems="center" justifyContent="space-between" px={AppTheme.spacing.md} py={AppTheme.spacing.sm}>
                          <SelectInput 
                            placeholder="Select issue type"
                            color={isDark ? AppTheme.colors.gray[100] : AppTheme.colors.gray[900]}
                          />
                          <SelectIcon>
                            <Icon name="keyboard-arrow-down" size={20} color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[500]} />
                          </SelectIcon>
                        </HStack>
                      </SelectTrigger>
                      <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                          <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                          </SelectDragIndicatorWrapper>
                          {issueTypes.map((type) => (
                            <SelectItem key={type} label={type} value={type} />
                          ))}
                        </SelectContent>
                      </SelectPortal>
                    </Select>
                  </Box>
                </VStack>

                {/* Description */}
                <VStack space="xs">
                  <Text
                    fontSize={AppTheme.typography.fontSizes.sm}
                    fontWeight="600"
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    Description
                  </Text>
                  <Box
                    backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.gray[50]}
                    borderRadius={AppTheme.borderRadius.lg}
                    borderWidth={1}
                    borderColor={isDark ? AppTheme.colors.gray[600] : AppTheme.colors.gray[300]}
                    minHeight={120}
                  >
                    <Input variant="outline" borderWidth={0} backgroundColor="transparent">
                      <InputField
                        placeholder="Please describe the issue in detail..."
                        value={reportData.description}
                        onChangeText={(text) => setReportData(prev => ({ ...prev, description: text }))}
                        multiline={true}
                        numberOfLines={6}
                        color={isDark ? AppTheme.colors.gray[100] : AppTheme.colors.gray[900]}
                        placeholderTextColor={isDark ? AppTheme.colors.gray[500] : AppTheme.colors.gray[500]}
                        textAlignVertical="top"
                        p={AppTheme.spacing.md}
                      />
                    </Input>
                  </Box>
                  <Text
                    fontSize={AppTheme.typography.fontSizes.xs}
                    color={isDark ? AppTheme.colors.gray[500] : AppTheme.colors.gray[500]}
                  >
                    Include any relevant details that might help us resolve your issue.
                  </Text>
                </VStack>

                {/* Submit Button */}
                <Button
                  backgroundColor={AppTheme.colors.error[600]}
                  borderRadius={AppTheme.borderRadius.lg}
                  h={48}
                  onPress={handleReportIssue}
                  mt={AppTheme.spacing.lg}
                >
                  <ButtonText color="#ffffff" fontWeight="600">
                    Submit Report
                  </ButtonText>
                </Button>
              </VStack>
            )}
          </ScrollView>
        </Box>
      </Box>
    </Modal>
  );
};
