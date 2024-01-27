import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { Button, Card, Divider } from "react-native-paper";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import axios from "axios";

const Order = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://northwind.vercel.app/api/orders"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }
    return dayjs(date, "YYYY-MM-DDTHH:mm:ss.SSS")
      .locale("tr")
      .format("DD MMMM dddd HH:mm");
  };

  return (
    <View style={{ padding: "3%" }}>
      <Divider style={{ marginBottom: "2%" }} />
      <FlatList
        data={products}
        renderItem={({ item }) => {
          item.orderDate = formatDate(item.orderDate);
          item.requiredDate = formatDate(item.requiredDate);
          item.shippedDate = formatDate(item.shippedDate);

          return (
            <Pressable
              onPress={() => navigation.navigate("OrderDetail", { item })}
            >
              <Card key={item.id}>
                <Card.Cover source={{ uri: "https://picsum.photos/200/300" }} />
                <Card.Title
                  titleStyle={{ fontSize: 25 }}
                  title={item.id}
                  subtitle={item.orderDate}
                />
              </Card>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Order;
