import { CommonHeader } from '@/components/CommonHeader';
import { AppTheme } from '@/constants/theme';
import {
    Box,
    Heading,
    HStack,
    Input,
    InputField,
    Pressable,
    ScrollView,
    Text,
    VStack,
} from '@gluestack-ui/themed';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BusinessCard } from '../../components/BusinessCard';
import { BusinessDetailModal } from '../../components/BusinessDetailModal';
import { useTheme } from '../../components/ThemeProvider';
import {
    comprehensiveMockBusinesses,
    serviceCategories,
    type Business,
} from '../../constants/exploreMockData';

const { width: screenWidth } = Dimensions.get('window');

export default function ExploreScreen() {
    const { isDark } = useTheme();

    // State
    const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
    const [showBusinessModal, setShowBusinessModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Services');
    const [maxDistance, setMaxDistance] = useState(10);
    const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'popularity'>('distance');
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    // Sort options
    const sortOptions = [
        { value: 'distance', label: 'Distance', icon: 'place' },
        { value: 'rating', label: 'Rating', icon: 'star' },
        { value: 'popularity', label: 'Popularity', icon: 'trending-up' }
    ];

    // Filtered and sorted businesses
    const filteredBusinesses = useMemo(() => {
        let filtered = comprehensiveMockBusinesses.filter((business) => {
            const matchesSearch =
                business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                business.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory =
                selectedCategory === 'All Services' ||
                business.category === selectedCategory;
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
            Alert.alert(
                'Call Business',
                `Calling ${selectedBusiness.name} at ${selectedBusiness.phone}`
            );
        }
    };

    const getCurrentSortOption = () => {
        return sortOptions.find(option => option.value === sortBy) || sortOptions[0];
    };

    return (
        <Box
            flex={1}
            backgroundColor={
                isDark ? AppTheme.colors.dark.background : AppTheme.colors.blue[50]
            }
        >
            <CommonHeader />
            <LinearGradient
                colors={isDark ? AppTheme.gradients.darkBackground : AppTheme.gradients.background}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
            >
                <ScrollView flex={1} showsVerticalScrollIndicator={false}>
                    <VStack
                        flex={1}
                        px={AppTheme.spacing.lg}
                        pt={AppTheme.spacing['xl']}
                        pb={AppTheme.spacing.xl}
                    >
                        {/* Explore Section */}
                        <VStack space="lg" mb={AppTheme.spacing.xl}>
                            <Heading
                                size="xl"
                                color={
                                    isDark
                                        ? AppTheme.colors.text.dark.primary
                                        : AppTheme.colors.text.primary
                                }
                                fontWeight="600"
                            >
                                Explore Services Around You
                            </Heading>
                            <Text
                                color={
                                    isDark
                                        ? AppTheme.colors.text.dark.secondary
                                        : AppTheme.colors.text.secondary
                                }
                                fontSize={AppTheme.typography.fontSizes.sm}
                            >
                                Discover nearby businesses and join their queues instantly
                            </Text>
                        </VStack>

                        {/* Location Status */}
                        <Box
                            backgroundColor={
                                isDark ? AppTheme.colors.dark.surface : "#E8F5E8"
                            }
                            borderWidth={1}
                            borderColor='#4CAF50'
                            borderRadius={AppTheme.borderRadius.lg}
                            p={AppTheme.spacing.md}
                            mb={AppTheme.spacing.lg}
                        >
                            <HStack alignItems="center" space="sm">
                                <Icon
                                    name="location-on"
                                    size={20}
                                    color="#4CAF50"
                                />
                                <Text
                                    color={
                                        isDark
                                            ? "#81C784"
                                            : "#2E7D32"
                                    }
                                    fontSize={AppTheme.typography.fontSizes.sm}
                                    fontWeight="600"
                                >
                                    Location Active
                                </Text>
                            </HStack>
                            <Text
                                color={
                                    isDark
                                        ? AppTheme.colors.text.dark.subtle
                                        : "#4CAF50"
                                }
                                fontSize={AppTheme.typography.fontSizes.xs}
                                mt={AppTheme.spacing.xs}
                            >
                                Showing businesses within {maxDistance} miles of your location
                            </Text>
                        </Box>

                        {/* Search Bar */}
                        <Box
                            backgroundColor={
                                isDark ? AppTheme.colors.dark.surface : "#FFFFFF"
                            }
                            borderRadius={AppTheme.borderRadius.lg}
                            borderWidth={1}
                            borderColor={
                                isDark ? AppTheme.colors.dark.border : AppTheme.colors.gray[300]
                            }
                            mb={AppTheme.spacing.md}
                            shadowColor="#000"
                            shadowOffset={{ width: 0, height: 2 }}
                            shadowOpacity={isDark ? 0.3 : 0.1}
                            shadowRadius={4}
                            elevation={2}
                        >
                            <HStack alignItems="center" px={AppTheme.spacing.md}>
                                <Icon
                                    name="search"
                                    size={20}
                                    color={
                                        isDark
                                            ? AppTheme.colors.text.dark.subtle
                                            : AppTheme.colors.gray[500]
                                    }
                                />
                                <Input flex={1} variant="outline" borderWidth={0} backgroundColor="transparent">
                                    <InputField
                                        placeholder="Search businesses, services..."
                                        value={searchQuery}
                                        onChangeText={setSearchQuery}
                                        color={
                                            isDark
                                                ? AppTheme.colors.text.dark.primary
                                                : AppTheme.colors.text.primary
                                        }
                                        fontSize={AppTheme.typography.fontSizes.md}
                                        placeholderTextColor={
                                            isDark
                                                ? AppTheme.colors.text.dark.muted
                                                : AppTheme.colors.text.muted
                                        }
                                        ml={AppTheme.spacing.sm}
                                    />
                                </Input>
                            </HStack>
                        </Box>

                        {/* Category Filter */}
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            mb={AppTheme.spacing.lg}
                        >
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
                                                        ? AppTheme.colors.dark.surface
                                                        : "#FFFFFF"
                                            }
                                            borderRadius={AppTheme.borderRadius.full}
                                            px={AppTheme.spacing.md}
                                            py={AppTheme.spacing.sm}
                                            borderWidth={1}
                                            borderColor={
                                                selectedCategory === category
                                                    ? AppTheme.colors.blue[600]
                                                    : isDark
                                                        ? AppTheme.colors.dark.border
                                                        : AppTheme.colors.gray[300]
                                            }
                                            shadowColor="#000"
                                            shadowOffset={{ width: 0, height: 1 }}
                                            shadowOpacity={isDark ? 0.2 : 0.05}
                                            shadowRadius={2}
                                            elevation={1}
                                        >
                                            <Text
                                                color={
                                                    selectedCategory === category
                                                        ? "#ffffff"
                                                        : isDark
                                                            ? AppTheme.colors.text.dark.secondary
                                                            : AppTheme.colors.text.secondary
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

                        {/* Clean Distance and Sort Controls */}
                        <VStack space="md" mb={AppTheme.spacing.lg}>
                            {/* Distance Slider Section */}
                            <Box
                                backgroundColor={
                                    isDark ? AppTheme.colors.dark.surface : "#FFFFFF"
                                }
                                borderRadius={AppTheme.borderRadius.lg}
                                p={AppTheme.spacing.md}
                                shadowColor="#000"
                                shadowOffset={{ width: 0, height: 2 }}
                                shadowOpacity={isDark ? 0.3 : 0.1}
                                shadowRadius={4}
                                elevation={2}
                            >
                                <VStack space="xs">
                                    <HStack justifyContent="space-between" alignItems="center">
                                        <HStack alignItems="center" space="xs">
                                            <Icon
                                                name="place"
                                                size={18}
                                                color={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]}
                                            />
                                            <Text
                                                fontSize={AppTheme.typography.fontSizes.sm}
                                                color={
                                                    isDark
                                                        ? AppTheme.colors.text.dark.secondary
                                                        : AppTheme.colors.text.secondary
                                                }
                                                fontWeight="500"
                                            >
                                                Distance
                                            </Text>
                                        </HStack>
                                        <Text
                                            fontSize={AppTheme.typography.fontSizes.md}
                                            fontWeight="700"
                                            color={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]}
                                        >
                                            {maxDistance} miles
                                        </Text>
                                    </HStack>

                                    {/* Fixed Slider */}
                                    <Slider
                                        style={{ width: '100%', height: 40 }}
                                        minimumValue={1}
                                        maximumValue={50}
                                        step={1}
                                        value={maxDistance}
                                        onValueChange={setMaxDistance}
                                        minimumTrackTintColor={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]}
                                        maximumTrackTintColor={isDark ? AppTheme.colors.dark.border : AppTheme.colors.gray[300]}
                                        thumbTintColor={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]}
                                    />

                                    <HStack justifyContent="space-between">
                                        <Text
                                            fontSize={AppTheme.typography.fontSizes.xs}
                                            color={
                                                isDark
                                                    ? AppTheme.colors.text.dark.muted
                                                    : AppTheme.colors.text.muted
                                            }
                                        >
                                            1 mile
                                        </Text>
                                        <Text
                                            fontSize={AppTheme.typography.fontSizes.xs}
                                            color={
                                                isDark
                                                    ? AppTheme.colors.text.dark.muted
                                                    : AppTheme.colors.text.muted
                                            }
                                        >
                                            50+ miles
                                        </Text>
                                    </HStack>
                                </VStack>
                            </Box>

                            {/* Sort Dropdown Section */}
                            <VStack space="xs" position="relative">
                                <HStack alignItems="center" space="xs" mb={AppTheme.spacing.xs}>
                                    <Icon
                                        name="sort"
                                        size={18}
                                        color={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]}
                                    />
                                    <Text
                                        fontSize={AppTheme.typography.fontSizes.sm}
                                        color={
                                            isDark
                                                ? AppTheme.colors.text.dark.secondary
                                                : AppTheme.colors.text.secondary
                                        }
                                        fontWeight="500"
                                    >
                                        Sort by
                                    </Text>
                                </HStack>

                                <Pressable onPress={() => setShowSortDropdown(!showSortDropdown)}>
                                    <Box
                                        backgroundColor={
                                            isDark ? AppTheme.colors.dark.surface : "#FFFFFF"
                                        }
                                        borderRadius={AppTheme.borderRadius.lg}
                                        px={AppTheme.spacing.md}
                                        py={AppTheme.spacing.sm}
                                        borderWidth={1}
                                        borderColor={
                                            showSortDropdown
                                                ? isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]
                                                : isDark ? AppTheme.colors.dark.border : AppTheme.colors.gray[300]
                                        }
                                        shadowColor="#000"
                                        shadowOffset={{ width: 0, height: 2 }}
                                        shadowOpacity={isDark ? 0.3 : 0.1}
                                        shadowRadius={4}
                                        elevation={2}
                                    >
                                        <HStack alignItems="center" justifyContent="space-between">
                                            <HStack alignItems="center" space="sm" flex={1}>
                                                <Icon
                                                    name={getCurrentSortOption().icon}
                                                    size={18}
                                                    color={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]}
                                                />
                                                <Text
                                                    fontSize={AppTheme.typography.fontSizes.sm}
                                                    color={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]}
                                                    fontWeight="500"
                                                >
                                                    {getCurrentSortOption().label}
                                                </Text>
                                            </HStack>
                                            <Icon
                                                name={showSortDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                                                size={20}
                                                color={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]}
                                            />
                                        </HStack>
                                    </Box>
                                </Pressable>

                                {/* Dropdown Menu */}
                                {showSortDropdown && (
                                    <Box
                                        position="absolute"
                                        top={85}
                                        left={0}
                                        right={0}
                                        backgroundColor={
                                            isDark ? AppTheme.colors.dark.surface : "#FFFFFF"
                                        }
                                        borderRadius={AppTheme.borderRadius.lg}
                                        borderWidth={1}
                                        borderColor={
                                            isDark ? AppTheme.colors.dark.border : AppTheme.colors.gray[200]
                                        }
                                        shadowColor="#000"
                                        shadowOffset={{ width: 0, height: 4 }}
                                        shadowOpacity={isDark ? 0.3 : 0.15}
                                        shadowRadius={8}
                                        elevation={8}
                                        zIndex={1000}
                                        overflow="hidden"
                                    >
                                        {sortOptions.map((option, index) => (
                                            <Pressable
                                                key={option.value}
                                                onPress={() => {
                                                    setSortBy(option.value as 'distance' | 'rating' | 'popularity');
                                                    setShowSortDropdown(false);
                                                }}
                                            >
                                                <Box
                                                    px={AppTheme.spacing.md}
                                                    py={AppTheme.spacing.sm}
                                                    borderBottomWidth={index < sortOptions.length - 1 ? 1 : 0}
                                                    borderBottomColor={
                                                        isDark ? AppTheme.colors.dark.border : AppTheme.colors.gray[100]
                                                    }
                                                    backgroundColor={
                                                        sortBy === option.value
                                                            ? isDark
                                                                ? AppTheme.colors.dark.background
                                                                : AppTheme.colors.blue[50]
                                                            : "transparent"
                                                    }
                                                >
                                                    <HStack alignItems="center" space="sm">
                                                        <Icon
                                                            name={option.icon}
                                                            size={18}
                                                            color={
                                                                sortBy === option.value
                                                                    ? isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]
                                                                    : isDark ? AppTheme.colors.text.dark.subtle : AppTheme.colors.text.subtle
                                                            }
                                                        />
                                                        <Text
                                                            fontSize={AppTheme.typography.fontSizes.sm}
                                                            color={
                                                                sortBy === option.value
                                                                    ? isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]
                                                                    : isDark ? AppTheme.colors.text.dark.secondary : AppTheme.colors.text.secondary
                                                            }
                                                            fontWeight={sortBy === option.value ? "600" : "400"}
                                                            flex={1}
                                                        >
                                                            {option.label}
                                                        </Text>
                                                        {sortBy === option.value && (
                                                            <Icon
                                                                name="check"
                                                                size={16}
                                                                color={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]}
                                                            />
                                                        )}
                                                    </HStack>
                                                </Box>
                                            </Pressable>
                                        ))}
                                    </Box>
                                )}
                            </VStack>
                        </VStack>

                        {/* Results Count */}
                        <HStack justifyContent="space-between" alignItems="center" mb={AppTheme.spacing.md}>
                            <Text
                                fontSize={AppTheme.typography.fontSizes.sm}
                                color={
                                    isDark
                                        ? AppTheme.colors.text.dark.subtle
                                        : AppTheme.colors.text.subtle
                                }
                            >
                                {filteredBusinesses.length} businesses found
                            </Text>
                            {filteredBusinesses.length > 0 && (
                                <HStack alignItems="center" space="xs">
                                    <Icon
                                        name="filter-list"
                                        size={16}
                                        color={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]}
                                    />
                                    <Text
                                        fontSize={AppTheme.typography.fontSizes.xs}
                                        color={isDark ? AppTheme.colors.dark.accent : AppTheme.colors.blue[600]}
                                        fontWeight="500"
                                    >
                                        Within {maxDistance} miles
                                    </Text>
                                </HStack>
                            )}
                        </HStack>

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
