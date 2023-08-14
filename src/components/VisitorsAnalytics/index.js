"use client";

import { visitorAnalyticsChartOptions } from "@/utils/config";
import ReactApexChart from "react-apexcharts";

function getAllVisitorsByCountry(data, country) {
  if (data && data.length === 0) return 0;

  return data
    .filter((item) => item.location === country)
    .reduce((acc, visitorItem) => acc + visitorItem.visitors, 0);
}
function getAllPremiumVisitorsByCountry(data, country) {
  if (data && data.length === 0) return 0;

  return data
    .filter((item) => item.location === country)
    .reduce((acc, visitorItem) => acc + visitorItem.premiumUserNo, 0);
}

export default function VisitorsAnalytics({ allVisitors }) {
  const uniqueLocation = [...new Set(allVisitors.map((item) => item.location))];
  console.log(uniqueLocation, "allVisitors");

  const maxUniqueLocationToShow = uniqueLocation.slice(
    0,
    uniqueLocation && uniqueLocation.length > 4 ? 4 : uniqueLocation.length
  );

  let updatedOptions = {
    ...visitorAnalyticsChartOptions,
    xaxis: {
      categories: maxUniqueLocationToShow,
    },
  };

  const series = [
    {
      name: "Visitors",
      data: maxUniqueLocationToShow.map((locationItem) =>
        getAllVisitorsByCountry(allVisitors, locationItem)
      ),
    },
    {
      name: "Premium Visitors",
      data: maxUniqueLocationToShow.map((locationItem) =>
        getAllPremiumVisitorsByCountry(allVisitors, locationItem)
      ),
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7 pb-7 shadow sm:px-7.5 xl:col-span-4">
      <div className="flex w-full flex-col flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <p className="font-bold text-primary">Visitors By Country</p>
        <div className="w-full">
          <div id="YearlyAnalyticsChart" className="-ml-5">
            <ReactApexChart
              options={updatedOptions}
              series={series}
              type="area"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
