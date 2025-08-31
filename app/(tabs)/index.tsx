// app/(tabs)/index.tsx
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { AppTheme } from "@/constants/theme";
import {
  Box,
  Heading,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ActiveQueueCard } from "../../components/ActiveQueueCard";
import { useAuth } from "../../components/auth/AuthContext";
import { CommonHeader } from "../../components/CommonHeader";
import { ScanningQRModal } from "../../components/ScanningQRModal";
import { SelectServicesModal } from "../../components/SelectServicesModal";
import { useTheme } from "../../components/ThemeProvider";
import {
  Business,
  comprehensiveMockBusinesses,
} from "../../constants/exploreMockData";

interface QueueData {
  id: string;
  business: Business;
  service: {
    id: string;
    name: string;
    price: number;
    duration: number;
    description: string;
  };
  total: number;
  position: number;
  queueCount: number;
  joinedAgo: string;
  waitTime: string;
}

export default function QRScannerScreen() {
  const { user } = useAuth();
  const { isDark } = useTheme();

  const [showScanningModal, setShowScanningModal] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [currentBusiness, setCurrentBusiness] = useState<Business | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [activeQueues, setActiveQueues] = useState<QueueData[]>([]);
  const [showcallModal, setShowcallModal] = useState(false);
  const [showleaveModal, setShowleaveModal] = useState(false);
  const [selectedQueue, setSelectedQueue] = useState<QueueData | null>(null);

  const handleScanQR = () => {
    setShowScanningModal(true);
    setTimeout(() => {
      setShowScanningModal(false);
      setCurrentBusiness(comprehensiveMockBusinesses[0]);
      setShowServicesModal(true);
    }, 2000);
  };

  const handleToggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleJoinQueue = () => {
    if (selectedServices.length === 0 || !currentBusiness) return;

    const selectedServicesList = currentBusiness.services.filter((s) =>
      selectedServices.includes(s.id)
    );

    const newQueues: QueueData[] = selectedServicesList.map((service) => ({
      id: `${Date.now()}-${service.id}`,
      business: currentBusiness,
      service,
      total: service.price,
      position: Math.floor(Math.random() * 20) + 1,
      queueCount: Math.floor(Math.random() * 15) + 5,
      joinedAgo: "0m ago",
      waitTime: `${Math.floor(Math.random() * 30) + 15}m`,
    }));

    setActiveQueues((prev) => [...prev, ...newQueues]);
    setShowServicesModal(false);
    setSelectedServices([]);
    setCurrentBusiness(null);
  };

  const handleEdit = (queue: QueueData) => {
    // TODO: implement edit logic
  };

  const handleCall = (queue: QueueData) => {
    setSelectedQueue(queue);
    setShowcallModal(true);
  };

  const handleLeave = (queue: QueueData) => {
    setSelectedQueue(queue);
    setShowleaveModal(true);
  };

  return (
    <>
      <Box
        flex={1}
        backgroundColor={
          isDark ? AppTheme.colors.gray[900] : AppTheme.colors.blue[50]
        }
      >
        <CommonHeader />
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
              pt={AppTheme.spacing.lg}
              pb={AppTheme.spacing.xl}
            >
              {/* Active Queues */}
              {activeQueues.length > 0 && (
                <VStack mb={AppTheme.spacing.xl}>
                  <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    mb={AppTheme.spacing.md}
                  >
                    <Heading
                      size="lg"
                      color={
                        isDark
                          ? AppTheme.colors.text.dark.primary
                          : AppTheme.colors.text.primary
                      }
                      fontWeight="700"
                    >
                      Active Queues
                    </Heading>
                    <Box
                      backgroundColor={
                        isDark
                          ? AppTheme.colors.success[900]
                          : AppTheme.colors.success[100]
                      }
                      borderRadius={AppTheme.borderRadius.full}
                      px={AppTheme.spacing.sm}
                      py={4}
                    >
                      <Text
                        color={AppTheme.colors.success[600]}
                        fontSize={AppTheme.typography.fontSizes.xs}
                        fontWeight="600"
                      >
                        • {activeQueues.length} Active Queue
                        {activeQueues.length > 1 ? "s" : ""}
                      </Text>
                    </Box>
                  </HStack>
                  <Text
                    color={
                      isDark
                        ? AppTheme.colors.text.dark.secondary
                        : AppTheme.colors.text.secondary
                    }
                    fontSize={AppTheme.typography.fontSizes.sm}
                    mb={AppTheme.spacing.lg}
                  >
                    Your current queue positions
                  </Text>

                  {activeQueues.map((queue) => (
                    <ActiveQueueCard
                      key={queue.id}
                      queue={queue}
                      onEdit={handleEdit}
                      onCall={handleCall}
                      onLeave={handleLeave}
                    />
                  ))}
                </VStack>
              )}

              {/* Welcome Card */}
              <Box
                backgroundColor={isDark ? AppTheme.colors.gray[800] : "#FFFFFF"}
                borderRadius={AppTheme.borderRadius.xl}
                p={AppTheme.spacing.lg}
                mb={AppTheme.spacing.xl}
                shadowColor="#000"
                shadowOffset={{ width: 0, height: 4 }}
                shadowOpacity={isDark ? 0.3 : 0.1}
                shadowRadius={8}
                elevation={4}
              >
                <HStack space="md" alignItems="flex-start">
                  <Box
                    w={48}
                    h={48}
                    backgroundColor={AppTheme.colors.blue[600]}
                    borderRadius={AppTheme.borderRadius.lg}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon name="qr-code" size={24} color="#fff" />
                  </Box>

                  <VStack flex={1}>
                    <Heading
                      size="lg"
                      color={
                        isDark
                          ? AppTheme.colors.text.dark.primary
                          : AppTheme.colors.text.primary
                      }
                      fontWeight="600"
                      mb={AppTheme.spacing.xs}
                    >
                      Welcome back,{"\n"}
                      {user?.firstName || "Krishna"}{" "}
                      {user?.lastName || "Agrawal"}!
                    </Heading>
                    <Text
                      color={
                        isDark
                          ? AppTheme.colors.blue[300]
                          : AppTheme.colors.blue[600]
                      }
                      fontSize={AppTheme.typography.fontSizes.sm}
                      mb={AppTheme.spacing.sm}
                    >
                      Ready to skip the wait?
                    </Text>
                    <Text
                      color={
                        isDark
                          ? AppTheme.colors.text.dark.secondary
                          : AppTheme.colors.text.secondary
                      }
                      fontSize={AppTheme.typography.fontSizes.sm}
                      lineHeight={20}
                    >
                      Scan any business QR code to instantly join their queue
                      and receive real-time updates on your position.
                    </Text>
                  </VStack>
                </HStack>
              </Box>

              {/* Scan QR Button */}
              <Pressable onPress={handleScanQR} mb={AppTheme.spacing.xl}>
                <LinearGradient
                  colors={AppTheme.gradients.button}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: AppTheme.borderRadius.xl,
                    paddingVertical: AppTheme.spacing.lg,
                    paddingHorizontal: AppTheme.spacing.lg,
                    shadowColor: AppTheme.colors.blue[600],
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 6,
                  }}
                >
                  <HStack
                    alignItems="center"
                    justifyContent="center"
                    space="md"
                  >
                    <Box
                      backgroundColor="rgba(255,255,255,0.2)"
                      borderRadius={AppTheme.borderRadius.md}
                      p={AppTheme.spacing.md}
                    >
                      <Icon name="photo-camera" size={26} color="#fff" />
                    </Box>
                    <VStack alignItems="flex-start" flex={1}>
                      <Text
                        color="#fff"
                        fontWeight="700"
                        fontSize={AppTheme.typography.fontSizes.xl}
                      >
                        Scan QR Code
                      </Text>
                      <Text
                        color="#fff"
                        fontSize={AppTheme.typography.fontSizes.sm}
                        opacity={0.9}
                      >
                        Point & scan to join queue
                      </Text>
                    </VStack>
                  </HStack>
                </LinearGradient>
              </Pressable>

              {/* Helper text */}
              <Text
                color={
                  isDark ? AppTheme.colors.blue[400] : AppTheme.colors.blue[600]
                }
                fontSize={AppTheme.typography.fontSizes.sm}
                textAlign="center"
                mb={AppTheme.spacing.xl}
              >
                Look for QR codes at participating businesses
              </Text>

              {/* How it works */}
              <Box
                backgroundColor={isDark ? AppTheme.colors.gray[800] : "#FFFFFF"}
                borderRadius={AppTheme.borderRadius.xl}
                p={AppTheme.spacing.lg}
                shadowColor="#000"
                shadowOffset={{ width: 0, height: 4 }}
                shadowOpacity={isDark ? 0.3 : 0.1}
                shadowRadius={8}
                elevation={4}
              >
                <HStack alignItems="center" space="sm" mb={AppTheme.spacing.lg}>
                  <Box
                    w={32}
                    h={32}
                    backgroundColor={AppTheme.colors.blue[600]}
                    borderRadius={AppTheme.borderRadius["2xl"]}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text
                      color="#FFFFFF"
                      fontWeight="700"
                      fontSize={AppTheme.typography.fontSizes.sm}
                    >
                      ?
                    </Text>
                  </Box>
                  <Heading
                    size="md"
                    color={
                      isDark
                        ? AppTheme.colors.text.dark.primary
                        : AppTheme.colors.text.primary
                    }
                    fontWeight="600"
                  >
                    How it works
                  </Heading>
                </HStack>

                <VStack space="lg">
                  {[
                    {
                      step: "1",
                      title: "Scan QR Code",
                      desc: "Find the QR code at any participating business location",
                      bg: AppTheme.colors.blue[600],
                    },
                    {
                      step: "2",
                      title: "Select Services",
                      desc: "Choose from available services and see pricing upfront",
                      bg: "#8B5CF6",
                    },
                    {
                      step: "3",
                      title: "Get Your Ticket",
                      desc: "Receive real-time updates and notifications on your position",
                      bg: AppTheme.colors.success[500],
                    },
                  ].map(({ step, title, desc, bg }) => (
                    <HStack key={step} alignItems="flex-start" space="md">
                      <Box
                        w={40}
                        h={40}
                        backgroundColor={bg}
                        borderRadius={AppTheme.borderRadius.md}
                        alignItems="center"
                        justifyContent="center"
                        shadowColor="#000"
                        shadowOffset={{ width: 0, height: 2 }}
                        shadowOpacity={0.1}
                        shadowRadius={4}
                        elevation={2}
                      >
                        <Text
                          color="#FFFFFF"
                          fontWeight="700"
                          fontSize={AppTheme.typography.fontSizes.md}
                        >
                          {step}
                        </Text>
                      </Box>
                      <VStack flex={1}>
                        <Text
                          color={
                            isDark
                              ? AppTheme.colors.text.dark.primary
                              : AppTheme.colors.text.primary
                          }
                          fontWeight="600"
                          fontSize={AppTheme.typography.fontSizes.md}
                          mb={AppTheme.spacing.xs}
                        >
                          {title}
                        </Text>
                        <Text
                          color={
                            isDark
                              ? AppTheme.colors.text.dark.secondary
                              : AppTheme.colors.text.secondary
                          }
                          fontSize={AppTheme.typography.fontSizes.sm}
                          lineHeight={20}
                        >
                          {desc}
                        </Text>
                      </VStack>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </ScrollView>
        </LinearGradient>

        {/* Modals */}
        <ScanningQRModal
          visible={showScanningModal}
          onCancel={() => setShowScanningModal(false)}
        />

        <SelectServicesModal
          visible={showServicesModal}
          business={currentBusiness}
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
          onCancel={() => {
            setShowServicesModal(false);
            setSelectedServices([]);
            setCurrentBusiness(null);
          }}
          onJoinQueue={handleJoinQueue}
        />
      </Box>

      {/* Confirmation modals */}
      <ConfirmationModal
        isVisible={showcallModal}
        onClose={() => setShowcallModal(false)}
        onConfirm={() => {
          setShowcallModal(false);
        }}
        title="Call Business Owner?"
        message={`This will initiate a call to ${
          selectedQueue?.business.name || "the business"
        }.\nYou can enquire about your queue status or any other concern.`}
        confirmText="Call now"
        cancelText="Cancel"
        confirmColor={AppTheme.colors.success[500]}
        icon="call"
      />

      <ConfirmationModal
        isVisible={showleaveModal}
        onClose={() => setShowleaveModal(false)}
        onConfirm={() => {
          if (selectedQueue) {
            setActiveQueues((prev) =>
              prev.filter((q) => q.id !== selectedQueue.id)
            );
          }
          setShowleaveModal(false);
          setSelectedQueue(null);
        }}
        title="Leave Queue ?"
        message={`Are you sure you want to leave the queue for ${
          selectedQueue?.service.name || "this service"
        } at ${
          selectedQueue?.business.name || "the business"
        }?\nYou will lose your current position (${
          selectedQueue?.position || "-"
        } out of ${selectedQueue?.queueCount || "-"} people).`}
        confirmText="Leave Queue"
        cancelText="Stay in Queue"
        confirmColor={AppTheme.colors.error[500]}
        icon="error"
      />
    </>
  );
}
