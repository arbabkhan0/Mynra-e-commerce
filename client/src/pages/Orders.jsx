import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getOrders } from "../api";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  padding: 20px 30px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  background: ${({ theme }) => theme.bg};
`;

const Section = styled.div`
  max-width: 1400px;
  width: 100%;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OrderCard = styled.div`
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: ${({ theme }) => theme.card};
`;

const OrderId = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`;

const OrderDetail = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    setLoading(true);
    const token = localStorage.getItem("krist-app-token");
    if (token) {
      await getOrders(token).then((res) => {
        setOrders(res.data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Container>
      <Section>
        <Title>My Orders</Title>
        {loading ? (
          <CircularProgress />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {orders.length === 0 ? (
              <p style={{ textAlign: "center" }}>No orders found.</p>
            ) : (
              orders.map((order) => (
                <OrderCard key={order._id}>
                  <OrderId>Order ID: {order._id}</OrderId>
                  <OrderDetail>
                    <span>Status: {order.status}</span>
                    <span>Amount: ${order.total_amount?.$numberDecimal || order.total_amount}</span>
                  </OrderDetail>
                  <OrderDetail>
                    <span>Address: {order.address}</span>
                  </OrderDetail>
                </OrderCard>
              ))
            )}
          </div>
        )}
      </Section>
    </Container>
  );
};

export default Orders;
