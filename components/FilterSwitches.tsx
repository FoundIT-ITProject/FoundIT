import React from "react";
import { View, Switch, Text, StyleSheet } from "react-native";

interface FilterSwitchesProps {
  selectedStatus: string | null;
  handleStatusFilter: (status: string | null) => void;
}

const FilterSwitches: React.FC<FilterSwitchesProps> = ({
  selectedStatus,
  handleStatusFilter,
}) => {
  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterRow}>
        <Text style={styles.filterText}>Every Item</Text>
        <Switch
          value={selectedStatus === null}
          onValueChange={() => handleStatusFilter(null)}
        />
      </View>
      <View style={styles.filterRow}>
        <Text style={styles.filterText}>Lost Items</Text>
        <Switch
          value={selectedStatus === "lost"}
          onValueChange={() => handleStatusFilter("lost")}
        />
      </View>
      <View style={styles.filterRow}>
        <Text style={styles.filterText}>Redeemed Items</Text>
        <Switch
          value={selectedStatus === "pending"}
          onValueChange={() => handleStatusFilter("pending")}
        />
      </View>
      <View style={styles.filterRow}>
        <Text style={styles.filterText}>Found Items</Text>
        <Switch
          value={selectedStatus === "found"}
          onValueChange={() => handleStatusFilter("found")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
  },
  filterRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 10,
  },
  filterText: {
    fontWeight: "500",
    fontSize: 16,
    marginRight: 10,
  },
});

export default FilterSwitches;
