import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Pie,
  PieChart,
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
import { daysFromNow, priceRange } from "../../utils";

export default function Charts({ posts }) {
  const [daysBeforeNow, setDays] = useState([]);
  const [priceStat, setPriceStat] = useState([]);
  useEffect(() => {
    if (posts) {
      const datesArr = posts.map((p) => p.date);
      const priceArr = posts.map((p) => p.price);
      const priceData = priceRange(priceArr);
      setPriceStat([...priceData]);
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
      {/* CITATION: https://codesandbox.io/s/simple-bar-chart-tpz8r?file=/src/App.tsx */}
      <ResponsiveContainer width="90%" aspect={3.2}>
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
      {/* CITATION: https://codesandbox.io/s/simple-area-chart-4ujxw?file=/src/App.tsx:707-1078 */}
      <div>
        <ResponsiveContainer width={400} height={400}>
          <PieChart>
            <Pie
              dataKey="amount"
              data={priceStat}
              cx={200}
              cy={200}
              outerRadius={150}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
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
      date: PropTypes.instanceOf(Date),
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
