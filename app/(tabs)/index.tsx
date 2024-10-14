import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, Filter } from "lucide-react-native";

const initialJobListings = [
  {
    id: "1",
    title: "Registered Nurse",
    company: "City Hospital",
    location: "San Francisco, CA",
  },
  {
    id: "2",
    title: "Medical Assistant",
    company: "Health Clinic",
    location: "New York, NY",
  },
  {
    id: "3",
    title: "Radiologic Technologist",
    company: "Diagnostic Imaging Center",
    location: "London, UK",
  },
  {
    id: "4",
    title: "Pharmacist",
    company: "Pharma Solutions",
    location: "Chicago, IL",
  },
  {
    id: "5",
    title: "Physical Therapist",
    company: "Therapy Group",
    location: "Los Angeles, CA",
  },
];

export default function JobsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobListings, setJobListings] = useState(initialJobListings);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    const filteredJobs = initialJobListings.filter(
      (job) =>
        job.title.toLowerCase().includes(text.toLowerCase()) ||
        job.company.toLowerCase().includes(text.toLowerCase()) ||
        job.location.toLowerCase().includes(text.toLowerCase())
    );
    setJobListings(filteredJobs);
  }, []);

  const renderJobItem = useCallback(
    ({ item }: { item: (typeof initialJobListings)[0] }) => (
      <Pressable
        style={styles.jobCard}
        onPress={() => {
          /* Navigate to job details */
        }}
        accessible={true}
        accessibilityRole="button"
        accessibilityHint="Tap to view job details"
      >
        <Image
          source={{ uri: `https://picsum.photos/seed/${item.id}/50/50` }}
          style={styles.companyLogo}
          accessibilityLabel={`${item.company} logo`}
        />
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.companyName}>{item.company}</Text>
          <Text style={styles.jobLocation}>{item.location}</Text>
        </View>
      </Pressable>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={handleSearch}
            accessibilityLabel="Search jobs"
          />
        </View>
        <Pressable
          style={styles.filterButton}
          onPress={() => {
            /* Handle filter action */
          }}
          accessibilityLabel="Filter jobs"
          accessibilityRole="button"
        >
          <Filter size={20} color="#fff" />
        </Pressable>
      </View>
      <FlatList
        data={jobListings}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyStateText}>
            No jobs found matching your search.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  searchContainer: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#000000",
  },
  filterButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  jobCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  jobLocation: {
    fontSize: 14,
    color: "#8E8E93",
  },
  emptyStateText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});
