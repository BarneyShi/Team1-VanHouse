import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
  YAxis,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import LoadingSpinner from "../LoadingSpinner";
import { daysFromNow } from "../../utils";

export default function Charts({ posts }) {
  const [daysBeforeNow, setDays] = useState([]);
  useEffect(() => {
    if (posts) {
      const datesArr = posts.map((p) => p.date);
      const daysArr = daysFromNow(datesArr);
      const data = [0, 1, 2, 3, 4, 5, 6, 7].map((e) => ({
        days: e,
        DailyPosts: 0,
      }));
      daysArr.forEach((e) => {
        if (e >= 0 && e <= 7) {
          data[e].DailyPosts += 1;
        }
      });
      setDays([...data]);
    }
  }, [posts]);
  return posts ? (
    <>
      <ResponsiveContainer width="90%" aspect={2.8}>
        <BarChart
          data={daysBeforeNow}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            dataKey="days"
            label={{
              value: "Days before today",
              position: "insideBottomRight",
              dy: 10,
            }}
          />
          <YAxis
            label={{ value: "Amount", position: "insideLeft", angle: -90 }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="DailyPosts" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  ) : (
    <LoadingSpinner />
  );
}

Charts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      address: PropTypes.string,
      postalCode: PropTypes.string,
      price: PropTypes.number,
      paymentPeriod: PropTypes.string,
      bedrooms: PropTypes.string,
      bathrooms: PropTypes.string,
      sqft: PropTypes.string,
      leaseLength: PropTypes.string,
      pets: PropTypes.bool,
      utilities: PropTypes.bool,
      laundry: PropTypes.bool,
      furnished: PropTypes.bool,
      images: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
