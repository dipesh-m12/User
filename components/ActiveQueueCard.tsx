// components/ActiveQueueCard.tsx
import { Business } from '@/constants/exploreMockData';
import { AppTheme } from '@/constants/theme';
import { Box, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeProvider';

// ✅ Updated interface to match individual service queues
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
  total: number; // Same as service.price for individual services
  position: number;
  queueCount: number;
  joinedAgo: string;
  waitTime: string;
}

interface ActiveQueueCardProps {
  queue: QueueData;
  onEdit: (queue: QueueData) => void;
  onCall: (queue: QueueData) => void;
  onLeave: (queue: QueueData) => void;
}


export const ActiveQueueCard: React.FC<ActiveQueueCardProps> = ({
  queue,
  onEdit,
  onCall,
  onLeave
}) => {
  const { isDark } = useTheme();

  return (
    <Box
      backgroundColor={isDark ? AppTheme.colors.gray[800] : "#ffffff"}
      borderRadius={24}
      p={AppTheme.spacing.lg}
      shadowColor="#000000"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.1}
      shadowRadius={8}
      elevation={5}
      mb={AppTheme.spacing.lg}
    >
      <VStack space="md">
        {/* Business Info */}
        <HStack alignItems="center" space="md" mb={AppTheme.spacing.md}>
          {/* Business Logo on Left */}
          <Box
            w={48}
            h={48}
            backgroundColor={AppTheme.colors.gray[200]}
            borderRadius={24}
            alignItems="center"
            justifyContent="center"

          >
            <Text
              fontSize={18}
              fontWeight="700"
              color={AppTheme.colors.gray[700]}
            >
              {queue.business.name.charAt(0)}
            </Text>
          </Box>

          {/* Business Info on Right */}
          <VStack flex={1} space="xs">
            <Text
              fontSize={18}
              fontWeight="700"
              color={isDark ? AppTheme.colors.gray[100] : AppTheme.colors.blue[900]}
              numberOfLines={1}
            >
              {queue.business.name}
            </Text>

            <Text
              color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
              fontSize={14}
            >
              {queue.queueCount} people in queue
            </Text>

            <Text
              color={isDark ? AppTheme.colors.gray[500] : AppTheme.colors.gray[500]}
              fontSize={12}
            >
              Joined {queue.joinedAgo}
            </Text>
          </VStack>
        </HStack>


        {/* Wait Time */}
        <Box
          backgroundColor="#FFF4E5" // soft orange background
          borderRadius={20}
          px={AppTheme.spacing.md}
          py={AppTheme.spacing.xs}
          alignSelf="flex-start"
          flexDirection="row"
          alignItems="center"
        >
          <Icon name="schedule" size={14} color="#E67E22" />
          <Text
            color="#E67E22"
            fontSize={12}
            fontWeight="600"
            ml={AppTheme.spacing.xs}
          >
            {queue.waitTime} wait
          </Text>
        </Box>

        {/* ✅ Show individual selected service */}
        <VStack mt={AppTheme.spacing.md} space="sm">
          <Text
            color={isDark ? AppTheme.colors.gray[200] : AppTheme.colors.gray[800]}
            fontSize={14}
            fontWeight="700"
            mb={2}
          >
            Selected Services
          </Text>

          {/* Individual service card */}
          <Box
            backgroundColor="#ffffff"
            borderRadius={12}
            px={AppTheme.spacing.md}
            py={AppTheme.spacing.sm}
            className="shadow-md" // nativewind shadow
            elevation={2} // android shadow
          >
            <HStack alignItems="center" justifyContent="space-between">
              <Text color={AppTheme.colors.gray[600]} fontSize={15}>
                {queue.service.name}
              </Text>
              <Text color={AppTheme.colors.blue[600]} fontWeight="600" fontSize={15}>
                ₹{queue.service.price}
              </Text>
            </HStack>
          </Box>

          {/* Total row */}
          <Box
            backgroundColor="#F8F9FF" // light blue background
            borderRadius={12}
            px={AppTheme.spacing.md}
            py={AppTheme.spacing.sm}
            className="shadow-md"
            elevation={2}
          >
            <HStack alignItems="center" justifyContent="space-between">
              <Text fontWeight="700" color={AppTheme.colors.gray[800]} fontSize={15}>
                Total
              </Text>
              <Text fontWeight="700" color={AppTheme.colors.blue[600]} fontSize={15}>
                ₹{queue.total}
              </Text>
            </HStack>
          </Box>
        </VStack>

        {/* Position and Actions */}
        <VStack alignItems="center" space="md" mt={AppTheme.spacing.md}>
          {/* Circle with Position */}
          <Box
            alignItems="center"
            justifyContent="center"
            backgroundColor={AppTheme.colors.blue[600]}
            borderRadius={9999} // makes it a perfect circle
            w={80}
            h={80}

          >
            <Text color="#ffffff" fontWeight="700" fontSize={22}>
              {queue.position}
            </Text>
            <Text color="#ffffff" fontSize={12} fontWeight="600" mt={1}>
              POSITION
            </Text>
          </Box>

          {/* Buttons Row */}
          <HStack space="md" mt={AppTheme.spacing.lg}>
            <Pressable
              onPress={() => onEdit(queue)}
              backgroundColor={AppTheme.colors.blue[500]}
              borderRadius={14}
              w={56}
              h={56}
              alignItems="center"
              justifyContent="center"

            >
              <Icon name="edit" color="#ffffff" size={22} />
            </Pressable>

            <Pressable
              onPress={() => onCall(queue)}
              backgroundColor={AppTheme.colors.success[500]}
              borderRadius={14}
              w={56}
              h={56}
              alignItems="center"
              justifyContent="center"

            >
              <Icon name="call" color="#ffffff" size={22} />
            </Pressable>

            <Pressable
              onPress={() => onLeave(queue)}
              backgroundColor={AppTheme.colors.error[500]}
              borderRadius={14}
              w={56}
              h={56}

              alignItems="center"
              justifyContent="center"

            >
              <Icon name="logout" color="#ffffff" size={22} />
            </Pressable>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};