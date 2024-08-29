import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
  },
  // headerText: {
  //   fontSize: 20,
  //   color: "green",
  //   fontWeight: "bold",
  // },

  headerText: {
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
    marginLeft: 10,
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "#666666",
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    color: "#333333",
    textTransform: "uppercase",
  },
  table: {
    width: "100%",
    borderBottom: 0,
    borderRight: 0,
    borderLeft: 1,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    borderLeftWidth: 0,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 10,
    fontWeight: "bold",
    width: "16.666%",
    textAlign: "center",
    backgroundColor: "#DEDEDE",
  },
  tableCol: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 8,
    width: "16.666%",
    textAlign: "center",
  },

  tableColHeaderDescription: {
    borderLeftWidth: 0,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 10,
    fontWeight: "bold",
    width: "80%",
    textAlign: "center",
    backgroundColor: "#DEDEDE",
  },
  tableColDescription: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 8,
    width: "80%",
    textAlign: "center",
  },
  tbody2: { flex: 2, borderRightWidth: 1 },
  logo: {
    width: 100,
    height: 100,
  },
  signatureContainerCenter: {
    marginTop: 40,
    flexDirection: "column",
    alignItems: "center",
    marginRight: 20,
  },
  signatureContainer: {
    marginTop: 40,
    flexDirection: "column",
    alignItems: "flex-end",
    marginRight: 20,
  },
  signatureLine: {
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    marginTop: 8,
    borderStyle: "dashed",
  },
  signatureText: {
    fontSize: 10,
    color: "#333333",
  },
});

const Footer = () => (
  <Text style={styles.footer}>© 2024 .lk copyright all right reserved.</Text>
);

const FruitTypeReport = ({ dataList }) => {
  const reportDateTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Colombo",
  });
  return (
    <Document>
      <Page size="Letter" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <View style={styles.headerTextContainer}>
              {/* <Image src={logo} style={styles.logo} /> */}
              <Text style={styles.headerText}>AgriPeace</Text>
            </View>
            <Text style={styles.reportDateTime}>{reportDateTime}</Text>
          </View>
          <Text style={styles.heading}>Plant Details</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Plant Name</Text>
              <Text style={styles.tableColHeader}>Date</Text>
              <Text style={styles.tableColHeaderDescription}>Description</Text>
              <Text style={styles.tableColHeaderDescription}>Climate</Text>
              <Text style={styles.tableColHeaderDescription}>Soil pH</Text>
              <Text style={styles.tableColHeaderDescription}>
                Land Preparation
              </Text>
              <Text style={styles.tableColHeaderDescription}>Fertilizers</Text>
            </View>
            {dataList.map((plant, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{plant.name}</Text>
                <Text style={styles.tableCol}>{formatDate(plant.date)}</Text>
                <Text style={styles.tableColDescription}>
                  {plant.description}
                </Text>

                <Text style={styles.tableCol}>{plant.climate}</Text>
                <Text style={styles.tableCol}>{plant.soilPh}</Text>
                <Text style={styles.tableCol}>{plant.landPreparation}</Text>
                <Text style={styles.tableCol}>{plant.fertilizers}</Text>
              </View>
            ))}
          </View>
          <View style={styles.signatureContainer}>
            <View style={styles.signatureContainerCenter}>
              <View style={styles.signatureLine} />
              <Text style={styles.signatureText}>Signature</Text>
            </View>
          </View>
        </View>
        <Footer />
      </Page>
    </Document>
  );
};

// Function to format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default FruitTypeReport;
