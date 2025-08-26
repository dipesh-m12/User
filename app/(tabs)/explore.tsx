import { AppTheme } from '@/constants/theme';
import { Box, Heading, HStack, Input, InputField, Pressable, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BusinessCard } from '../../components/BusinessCard';
import { BusinessDetailModal } from '../../components/BusinessDetailModal';
import { useTheme } from '../../components/ThemeProvider';
import { comprehensiveMockBusinesses, serviceCategories, type Business } from '../../constants/exploreMockData';
import { CommonHeader } from '@/components/CommonHeader';

export default function ExploreScreen() {
    const { isDark } = useTheme();

    // State
    const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
    const [showBusinessModal, setShowBusinessModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Services');
    const [maxDistance, setMaxDistance] = useState(10);
    const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'popularity'>('distance');

    // Filtered and sorted businesses
    const filteredBusinesses = useMemo(() => {
        let filtered = comprehensiveMockBusinesses.filter(business => {
            const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                business.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All Services' || business.category === selectedCategory;
            const withinDistance = business.distance <= maxDistance;

            return matchesSearch && matchesCategory && withinDistance;
        });

        // Sort businesses
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'distance':
                    return a.distance - b.distance;
                case 'rating':
                    return b.rating - a.rating;
                case 'popularity':
                    return b.reviewCount - a.reviewCount;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [searchQuery, selectedCategory, maxDistance, sortBy]);

    const handleBusinessPress = (business: Business) => {
        setSelectedBusiness(business);
        setShowBusinessModal(true);
    };

    const handleCallBusiness = () => {
        if (selectedBusiness) {
            Alert.alert('Call Business', `Calling ${selectedBusiness.name} at ${selectedBusiness.phone}`);
        }
    };

    return (
        <Box flex={1} backgroundColor={isDark ? AppTheme.colors.gray[900] : AppTheme.colors.blue[50]}>
            <CommonHeader />
            <LinearGradient
                colors={isDark ? AppTheme.gradients.dark : AppTheme.gradients.background}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
            >
                <ScrollView flex={1} showsVerticalScrollIndicator={false}>
                    <VStack flex={1} px={AppTheme.spacing.lg} pt={AppTheme.spacing['2xl']} pb={AppTheme.spacing.xl}>

                        {/* Header */}
                       

                        {/* Explore Section */}
                        <VStack space="lg" mb={AppTheme.spacing.xl}>
                            <Heading
                                size="lg"
                                color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.blue[900]}
                                fontWeight="600"
                            >
                                Explore Services Around You
                            </Heading>
                            <Text
                                color={isDark ? AppTheme.colors.blue[300] : AppTheme.colors.blue[600]}
                                fontSize={AppTheme.typography.fontSizes.sm}
                            >
                                Discover nearby businesses and join their queues instantly
                            </Text>
                        </VStack>

                        {/* Location Status */}
                        <Box
                            backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.success[50]}
                            borderRadius={AppTheme.borderRadius.lg}
                            p={AppTheme.spacing.md}
                            mb={AppTheme.spacing.lg}
                        >
                            <HStack alignItems="center" space="sm">
                                <Icon name="location-on" size={20} color={AppTheme.colors.success[500]} />
                                <Text
                                    color={isDark ? AppTheme.colors.success[500] : AppTheme.colors.success[600]}
                                    fontSize={AppTheme.typography.fontSizes.sm}
                                    fontWeight="500"
                                >
                                    Location Active
                                </Text>
                            </HStack>
                            <Text
                                color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.success[600]}
                                fontSize={AppTheme.typography.fontSizes.xs}
                                mt={AppTheme.spacing.xs}
                            >
                                Showing businesses within {maxDistance} miles of your location
                            </Text>
                        </Box>

                        {/* Search Bar */}
                        <Box
                            backgroundColor={isDark ? AppTheme.colors.gray[800] : "#ffffff"}
                            borderRadius={AppTheme.borderRadius.lg}
                            borderWidth={1}
                            borderColor={isDark ? AppTheme.colors.gray[700] : AppTheme.colors.gray[300]}
                            mb={AppTheme.spacing.md}
                        >
                            <HStack alignItems="center" px={AppTheme.spacing.md}>
                                <Icon name="search" size={20} color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[500]} />
                                <Input flex={1} variant="outline" borderWidth={0} backgroundColor="transparent">
                                    <InputField
                                        placeholder="Search businesses, services..."
                                        value={searchQuery}
                                        onChangeText={setSearchQuery}
                                        color={isDark ? AppTheme.colors.gray[50] : AppTheme.colors.gray[900]}
                                        fontSize={AppTheme.typography.fontSizes.md}
                                        placeholderTextColor={isDark ? AppTheme.colors.gray[500] : AppTheme.colors.gray[400]}
                                        ml={AppTheme.spacing.sm}
                                    />
                                </Input>
                            </HStack>
                        </Box>

                        {/* Category Filter */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} mb={AppTheme.spacing.md}>
                            <HStack space="sm">
                                {serviceCategories.map((category) => (
                                    <Pressable
                                        key={category}
                                        onPress={() => setSelectedCategory(category)}
                                    >
                                        <Box
                                            backgroundColor={
                                                selectedCategory === category
                                                    ? AppTheme.colors.blue[600]
                                                    : isDark
                                                        ? AppTheme.colors.gray[800]
                                                        : "#ffffff"
                                            }
                                            borderRadius={AppTheme.borderRadius.full}
                                            px={AppTheme.spacing.md}
                                            py={AppTheme.spacing.sm}
                                            borderWidth={1}
                                            borderColor={
                                                selectedCategory === category
                                                    ? AppTheme.colors.blue[600]
                                                    : isDark
                                                        ? AppTheme.colors.gray[700]
                                                        : AppTheme.colors.gray[300]
                                            }
                                        >
                                            <Text
                                                color={
                                                    selectedCategory === category
                                                        ? "#ffffff"
                                                        : isDark
                                                            ? AppTheme.colors.gray[300]
                                                            : AppTheme.colors.gray[700]
                                                }
                                                fontSize={AppTheme.typography.fontSizes.sm}
                                                fontWeight="500"
                                            >
                                                {category}
                                            </Text>
                                        </Box>
                                    </Pressable>
                                ))}
                            </HStack>
                        </ScrollView>

                        {/* Distance and Sort Controls */}
                        <HStack justifyContent="space-between" alignItems="center" mb={AppTheme.spacing.lg}>
                            <VStack>
                                <Text
                                    fontSize={AppTheme.typography.fontSizes.sm}
                                    color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                                    mb={AppTheme.spacing.xs}
                                >
                                    Distance
                                </Text>
                                <Text
                                    fontSize={AppTheme.typography.fontSizes.md}
                                    fontWeight="600"
                                    color={AppTheme.colors.blue[600]}
                                >
                                    {maxDistance} miles
                                </Text>
                            </VStack>

                            <Pressable>
                                <HStack alignItems="center" space="xs"
                                    backgroundColor={isDark ? AppTheme.colors.gray[800] : "#ffffff"}
                                    borderRadius={AppTheme.borderRadius.lg}
                                    px={AppTheme.spacing.md}
                                    py={AppTheme.spacing.sm}
                                    borderWidth={1}
                                    borderColor={isDark ? AppTheme.colors.gray[700] : AppTheme.colors.gray[300]}
                                >
                                    <Text
                                        fontSize={AppTheme.typography.fontSizes.sm}
                                        color={AppTheme.colors.blue[600]}
                                        fontWeight="500"
                                    >
                                        Distance
                                    </Text>
                                    <Icon name="keyboard-arrow-down" size={16} color={AppTheme.colors.blue[600]} />
                                </HStack>
                            </Pressable>
                        </HStack>

                        {/* Results Count */}
                        <Text
                            fontSize={AppTheme.typography.fontSizes.sm}
                            color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
                            mb={AppTheme.spacing.md}
                        >
                            {filteredBusinesses.length} businesses found
                        </Text>

                        {/* Business List */}
                        <VStack space="md">
                            {filteredBusinesses.map((business) => (
                                <BusinessCard
                                    key={business.id}
                                    business={business}
                                    onPress={() => handleBusinessPress(business)}
                                />
                            ))}
                        </VStack>
                    </VStack>
                </ScrollView>

                {/* Business Detail Modal */}
                <BusinessDetailModal
                    business={selectedBusiness}
                    isVisible={showBusinessModal}
                    onClose={() => setShowBusinessModal(false)}
                    onCallBusiness={handleCallBusiness}
                />
            </LinearGradient>
        </Box>
    );
}
