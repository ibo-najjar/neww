import React from "react";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
  Link,
  Font,
} from "@react-pdf/renderer";
import AliceFont from "../assets/Fonts/Alice-Regular.ttf";
import { height } from "@mui/system";
import noPic from "../assets/nopic.png";
import courier from "../assets/Fonts/cour.ttf";

Font.register({
  family: "courier",
  src: courier,
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  headerContainer: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#112131",
    borderBottomStyle: "solid",
    //alignItems: "stretch",
    //width: "100%",
  },
  headerDetailColumn: {
    flexDirection: "column",
    flexGrow: 9,
    textTransform: "uppercase",
  },
  headerLinkColumn: {
    flexDirection: "column",
    flexGrow: 2,
    alignSelf: "flex-end",
    justifySelf: "flex-end",
  },
  headerName: {
    fontSize: 24,
    fontFamily: "courier",
  },
  headerSubtitle: {
    fontSize: 10,
    justifySelf: "flex-end",
  },
  headerLink: {
    fontSize: 10,
    color: "black",
    textDecoration: "none",
    alignSelf: "flex-end",
    justifySelf: "flex-end",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  mainImage: {
    marginBottom: 10,
    width: "100px",
    height: "100px",
  },
  mainTallImage: {
    marginBottom: 10,
    width: "100px",
    height: "210px",
  },
  mainLeftColumn: {
    flexDirection: "column",
    width: 120,
    paddingTop: 30,
    paddingRight: 15,
  },
  mainRightColumn: {
    flexDirection: "column",
    width: 120,
    paddingTop: 30,
    paddingRight: 15,
  },
  infoContainer: {
    padding: 15,
    paddingTop: 30,
  },
  infoRow: {
    fontSize: "23px",
    fontFamily: "courier",
    textAlign: "right",
    maxWidth: 200,
  },
});

const CastsPdf = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/*header*/}
        <View style={styles.headerContainer}>
          <View style={styles.headerDetailColumn}>
            <Text style={styles.headerName}>Luke Skywalker سهخلغ</Text>
            <Text style={styles.headerSubtitle}>Jedi Master</Text>
          </View>
          <View style={styles.headerLinkColumn}></View>
        </View>
        {/*main*/}
        <View style={styles.mainContainer}>
          <View style={styles.mainRightColumn}>
            <Image src={noPic} style={styles.mainTallImage} />
            <Image src={noPic} style={styles.mainImage} />
          </View>
          <View style={styles.mainLeftColumn}>
            <Image src={noPic} style={styles.mainImage} />
            <Image src={noPic} style={styles.mainImage} />
            <Image src={noPic} style={styles.mainImage} />
          </View>
          {/*info*/}
          <View style={styles.infoContainer}>
            <Text style={styles.infoRow}>الاسم : ششسميي مس</Text>
            <Text style={styles.infoRow}>الاسم : شبيسمس</Text>
            <Text style={styles.infoRow}>الاسم : شبيسمس</Text>
            <Text style={styles.infoRow}>الاسم : شبيسمس</Text>
            <Text style={styles.infoRow}>الاسم : شبيسمس</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CastsPdf;
