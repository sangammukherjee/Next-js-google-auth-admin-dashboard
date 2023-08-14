"use client";

import Card from "../card";
import { FaUsers } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { BsFillPersonCheckFill } from "react-icons/bs";
import YearlyAnalyticsChart from "../YearlyAnalyticsChart";
import VisitorsAnalytics from "../VisitorsAnalytics";
import DeviceAnalytics from "../DeviceAnalytics";

export default function DashboardLayout({ allVisitors, allProducts }) {
  console.log(allProducts, allVisitors);
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
        <Card
          icon={<FaUsers size={25} />}
          data={
            allVisitors && allVisitors.length
              ? allVisitors.reduce(
                  (acc, visitorItem) =>
                    parseInt(acc + visitorItem.premiumUserNo),
                  0
                )
              : 0
          }
          label={"Total Premium Visitors"}
        />
        <Card
          data={allProducts && allProducts.length}
          icon={<MdOutlineProductionQuantityLimits size={25} />}
          label={"Total Products"}
        />
        <Card
          data={
            allProducts && allProducts.length
              ? allProducts.reduce(
                  (acc, productItem) => parseInt(acc + productItem.sales),
                  0
                )
              : 0
          }
          label={"Total Sales"}
          icon={<BiMoneyWithdraw size={25} />}
        />
        <Card
          data={
            allVisitors && allVisitors.length
              ? allVisitors.reduce(
                  (acc, visitorItem) => parseInt(acc + visitorItem.visitors),
                  0
                )
              : 0
          }
          label={"Total Visitors"}
          icon={<BsFillPersonCheckFill size={25} />}
        />
      </div>
      <div className="mt-44 grid-cols-12 grid gap-4 md:mt-6 md:gap-6 2xl:mt-7 2xl:gap-7">
        <YearlyAnalyticsChart
          allProducts={
            allProducts && allProducts.length
              ? allProducts.map((productItem) => ({
                  ...productItem,
                  revenue:
                    productItem.price * productItem.sales -
                    productItem.sales * 10,
                  cost: productItem.sales * 10,
                }))
              : []
          }
        />
        <VisitorsAnalytics
          allVisitors={allVisitors && allVisitors.length ? allVisitors : []}
        />
      </div>
      <div className="cols-span-12">
        <DeviceAnalytics
          allVisitors={allVisitors && allVisitors.length ? allVisitors : []}
        />
      </div>
    </div>
  );
}
