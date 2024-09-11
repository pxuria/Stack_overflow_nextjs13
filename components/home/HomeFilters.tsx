"use client";

import { HomePageFilters } from "@/constants/filters";
import { Button } from "../ui/button";

const HomeFilters = () => {
  return (
    <div className="mt-10 flex-wrap gap-3 hidden md:flex">
      {HomePageFilters.map((item) => {
        const active = "newest";
        return (
          <Button
            className={`body-medium rounded-lg py-3 shadow-none px-6 capitalize ${
              active === item.value ? "bg-primary-100 text-primary-500" : "bg-light-800 text-light-500"
            }`}
            key={item.value}
            onClick={() => {}}
          >
            {item.name}
          </Button>
        );
      })}
    </div>
  );
};

export default HomeFilters;
