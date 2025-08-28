// components/LanguageSelectionModal.tsx
import { AppTheme } from '@/constants/theme';
import { Box, HStack, Pressable, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { Modal, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeProvider';

const { height: screenHeight } = Dimensions.get('window');

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'od', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ' }
];

interface LanguageSelectionModalProps {
  isVisible: boolean;
  currentLanguage: string;
  onSelect: (language: string) => void;
  onClose: () => void;
}

export const LanguageSelectionModal: React.FC<LanguageSelectionModalProps> = ({
  isVisible,
  currentLanguage,
  onSelect,
  onClose
}) => {
  const { isDark } = useTheme();

  const handleLanguageSelect = (langCode: string) => {
    onSelect(langCode);
    onClose();
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
          height={screenHeight * 0.7}
        >
          {/* Header */}
          <Box
            backgroundColor={AppTheme.colors.success[500]}
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            p={AppTheme.spacing.lg}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <HStack alignItems="center" space="sm">
                <Box
                  backgroundColor="rgba(255,255,255,0.2)"
                  borderRadius={AppTheme.borderRadius.lg}
                  p={8}
                >
                  <Icon name="language" size={20} color="#ffffff" />
                </Box>
                <Text
                  fontSize={AppTheme.typography.fontSizes.lg}
                  fontWeight="700"
                  color="#ffffff"
                >
                  Select Language
                </Text>
              </HStack>
              <Pressable onPress={onClose} p={AppTheme.spacing.xs}>
                <Icon name="close" size={24} color="#ffffff" />
              </Pressable>
            </HStack>
          </Box>

          {/* Language List */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: AppTheme.spacing.lg }}
            showsVerticalScrollIndicator={false}
          >
            <VStack space="xs">
              {languages.map((language) => (
                <Pressable
                  key={language.code}
                  onPress={() => handleLanguageSelect(language.code)}
                >
                  <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    backgroundColor={
                      currentLanguage === language.code 
                        ? AppTheme.colors.success[50] 
                        : (isDark ? AppTheme.colors.gray[800] : "#ffffff")
                    }
                    borderWidth={currentLanguage === language.code ? 2 : 1}
                    borderColor={
                      currentLanguage === language.code 
                        ? AppTheme.colors.success[500] 
                        : (isDark ? AppTheme.colors.gray[700] : AppTheme.colors.gray[200])
                    }
                    borderRadius={AppTheme.borderRadius.lg}
                    p={AppTheme.spacing.md}
                    mb={AppTheme.spacing.xs}
                  >
                    <VStack>
                      <Text
                        fontSize={AppTheme.typography.fontSizes.md}
                        fontWeight="600"
                        color={
                          currentLanguage === language.code 
                            ? AppTheme.colors.success[700] 
                            : (isDark ? AppTheme.colors.gray[100] : AppTheme.colors.gray[900])
                        }
                      >
                        {language.name}
                      </Text>
                      <Text
                        fontSize={AppTheme.typography.fontSizes.lg}
                        color={
                          currentLanguage === language.code 
                            ? AppTheme.colors.success[600] 
                            : (isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600])
                        }
                      >
                        {language.nativeName}
                      </Text>
                    </VStack>
                    
                    {currentLanguage === language.code && (
                      <Box
                        backgroundColor={AppTheme.colors.success[500]}
                        borderRadius={12}
                        w={24}
                        h={24}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon name="check" size={16} color="#ffffff" />
                      </Box>
                    )}
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </ScrollView>
        </Box>
      </Box>
    </Modal>
  );
};
