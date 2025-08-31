// components/SelectServicesModal.tsx
import { AppTheme } from "@/constants/theme";
import {
  Box,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "./ThemeProvider";

interface Business {
  id: string;
  name: string;
  category: string;
  services: {
    id: string;
    name: string;
    price: number;
    duration: number;
    description: string;
  }[];
}

interface SelectServicesModalProps {
  visible: boolean;
  business: Business | null;
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
  onCancel: () => void;
  onJoinQueue: () => void;
}

export const SelectServicesModal: React.FC<SelectServicesModalProps> = ({
  visible,
  business,
  selectedServices,
  onToggleService,
  onCancel,
  onJoinQueue,
}) => {
  const { isDark } = useTheme();

  if (!business) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <Box flex={1} backgroundColor="rgba(0,0,0,0.5)" justifyContent="flex-end">
        <Box
          backgroundColor={isDark ? AppTheme.colors.gray[900] : "#ffffff"}
          borderTopLeftRadius={24}
          borderTopRightRadius={24}
          maxHeight="85%"
          minHeight="80%"
        >
          {/* ✅ FIXED: Separate Header Section */}
          <Box
            backgroundColor={AppTheme.colors.blue[600]}
            borderTopLeftRadius={24}
            borderTopRightRadius={24}
            px={AppTheme.spacing.lg}
            py={AppTheme.spacing.lg}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <HStack alignItems="center" space="sm">
                <Box
                  backgroundColor="rgba(255,255,255,0.2)"
                  borderRadius={8}
                  p={8}
                >
                  <Icon name="store" size={16} color="#ffffff" />
                </Box>
                <VStack>
                  <Text color="#ffffff" fontWeight="700" fontSize={18}>
                    Select Services
                  </Text>
                  <Text
                    color="rgba(255,255,255,0.9)"
                    fontSize={14}
                    fontWeight="600"
                  >
                    {business.name}
                  </Text>
                  <Text color="rgba(255,255,255,0.8)" fontSize={12}>
                    {business.category}
                  </Text>
                </VStack>
              </HStack>

              <Pressable onPress={onCancel} p={AppTheme.spacing.xs}>
                <Icon name="close" size={24} color="#ffffff" />
              </Pressable>
            </HStack>
          </Box>

          {/* ✅ FIXED: Scrollable Content Section */}
          <ScrollView
            flex={1}
            contentContainerStyle={{
              paddingHorizontal: AppTheme.spacing.lg,
              paddingVertical: AppTheme.spacing.lg,
            }}
            showsVerticalScrollIndicator={false}
          >
            <Text
              color={
                isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]
              }
              mb={AppTheme.spacing.lg}
              fontSize={14}
            >
              Select one or more services to add to your queue
            </Text>

            {/* ✅ FIXED: Proper Multiple Selection List */}
            <VStack space="md">
              {business.services.map((service) => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <Pressable
                    key={service.id}
                    onPress={() => onToggleService(service.id)}
                    backgroundColor={
                      isSelected
                        ? AppTheme.colors.blue[50]
                        : isDark
                        ? AppTheme.colors.gray[800]
                        : "#ffffff"
                    }
                    borderWidth={2}
                    borderColor={
                      isSelected
                        ? AppTheme.colors.blue[500]
                        : AppTheme.colors.gray[300]
                    }
                    borderRadius={16}
                    p={AppTheme.spacing.lg}
                  >
                    <HStack
                      alignItems="flex-start"
                      justifyContent="space-between"
                    >
                      <VStack flex={1}>
                        {/* Service Name with Check Icon */}
                        <HStack alignItems="center" space="sm" mb={4}>
                          <Text
                            color={
                              isSelected
                                ? AppTheme.colors.blue[600]
                                : isDark
                                ? AppTheme.colors.gray[100]
                                : AppTheme.colors.blue[900]
                            }
                            fontWeight="700"
                            fontSize={16}
                          >
                            {service.name}
                          </Text>
                          {isSelected && (
                            <Box
                              backgroundColor={AppTheme.colors.blue[600]}
                              borderRadius={10}
                              w={20}
                              h={20}
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Icon name="check" size={12} color="#ffffff" />
                            </Box>
                          )}
                        </HStack>

                        {/* Price */}
                        <Text
                          color={AppTheme.colors.blue[600]}
                          fontWeight="600"
                          fontSize={16}
                          mb={4}
                        >
                          ₹{service.price}
                        </Text>

                        {/* Description */}
                        <Text
                          color={
                            isDark
                              ? AppTheme.colors.gray[400]
                              : AppTheme.colors.gray[600]
                          }
                          fontSize={14}
                          lineHeight={18}
                        >
                          {service.description}
                        </Text>
                      </VStack>

                      {/* Duration */}
                      <VStack alignItems="center" ml={AppTheme.spacing.md}>
                        <Icon
                          name="schedule"
                          size={16}
                          color={AppTheme.colors.gray[500]}
                        />
                        <Text
                          color={AppTheme.colors.gray[500]}
                          fontSize={12}
                          mt={2}
                        >
                          {service.duration} mins
                        </Text>
                      </VStack>
                    </HStack>
                  </Pressable>
                );
              })}
            </VStack>
          </ScrollView>

          {/* ✅ FIXED: Separate Action Bar at Bottom */}
          <Box
            backgroundColor={isDark ? AppTheme.colors.gray[900] : "#ffffff"}
            px={AppTheme.spacing.lg}
            py={AppTheme.spacing.lg}
            borderTopWidth={1}
            borderTopColor={
              isDark ? AppTheme.colors.gray[700] : AppTheme.colors.gray[200]
            }
          >
            <VStack space="md">
              {/* Cancel Button */}
              <Pressable
                onPress={onCancel}
                backgroundColor={AppTheme.colors.gray[300]}
                borderRadius={AppTheme.borderRadius.lg}
                py={14}
                alignItems="center"
              >
                <Text
                  color={AppTheme.colors.gray[700]}
                  fontWeight="700"
                  fontSize={16}
                >
                  Cancel
                </Text>
              </Pressable>

              {/* Join Queue Button */}
              <Pressable
                onPress={onJoinQueue}
                backgroundColor={
                  selectedServices.length > 0
                    ? AppTheme.colors.blue[600]
                    : AppTheme.colors.gray[400]
                }
                borderRadius={AppTheme.borderRadius.lg}
                py={14}
                alignItems="center"
                disabled={selectedServices.length === 0}
              >
                <Text color="#ffffff" fontWeight="700" fontSize={16}>
                  Join Queue ({selectedServices.length} service
                  {selectedServices.length !== 1 ? "s" : ""})
                </Text>
              </Pressable>
            </VStack>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
