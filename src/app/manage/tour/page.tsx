/* eslint-disable @next/next/no-img-element */
// my-new-page.js
"use client";
import React, { useEffect, useState } from "react";
import tourService, {
  revalidateTours,
  toggleTourStatus,
} from "@/app/services/tourService";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import "../../../../public/css/tour.css";
import { ITour } from "@/app/entitis/tour";
import DetailTour from "@/app/components/Tour/DetailTour";

const TourList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTour, setSelectedTour] = useState<ITour | null>(null);
  const [tour, setTour] = useState<ITour | null>(null);
  const [showTourDetail, setShowTourDetail] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: tourList = [], error } = useSWR("tourList", () =>
    tourService.getTours()
  );
  const [filteredTourList, setFilteredTourList] = useState<ITour[]>(tourList);

  useEffect(() => {
    if (tourList) {
      const filteredTours = tourList.filter((tour: ITour) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
          tour.tourName?.toLowerCase().includes(lowerCaseQuery) ||
          tour.tourId?.toString().toLowerCase().includes(lowerCaseQuery)
        );
      });
      setFilteredTourList(filteredTours);
      setCurrentPage(1);
    }
  }, [searchQuery, tourList]);

  const handleImageClick = (tour: ITour) => {
    setSelectedTour(tour);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedTour(null);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [toursPerPage] = useState(5);

  if (error) {
    return <div>Error loading tours</div>;
  }

  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = filteredTourList.slice(indexOfFirstTour, indexOfLastTour);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredTourList.length / toursPerPage);
  const toggleStatus = async (tourId: number) => {
    setLoading(true);
    try {
      await toggleTourStatus(tourId);
      setShowPopup(false);
      mutate("tourList");
      toast.success("Success");
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to toggle tour status");
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="relative">
      <div className="search-add">
        <div className="search-hotel flex">
          <input
            type="text"
            placeholder="Search........."
            className="input-hotel pl-3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img src="/image/search.png" alt="" />
        </div>
      </div>
      <div className="table-hotel">
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-start text-sm font-light text-surface dark:text-white border-solid">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10 bk-top-table">
                    <tr className="text-center">
                      <th scope="col" className="px-6 py-4">
                        TourId
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Tour Time
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Manage Tour Order
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        View Detail
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTours.length > 0 ? (
                      currentTours.map((item, index) => {
                        const tourTimeDate = new Date(item.tourTime);
                        const formattedTourTime =
                          tourTimeDate.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          });

                        return (
                          <tr
                            key={index}
                            className="border-b border-neutral-200 dark:border-white/10 text-center"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-black">
                              {item.tourId}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold text-black">
                              {item.tourName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold text-black">
                              {formattedTourTime}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <Link
                                className="flex justify-center"
                                href={`/manage/orderTour/${item.supplierId}`}
                              >
                                <img
                                  className="w-5"
                                  src="/image/viewdetail.png"
                                  alt="View Order Tour"
                                />
                              </Link>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 flex justify-center">
                              <Link href="#" className="">
                                <img
                                  onClick={() => {
                                    setTour(item);
                                    setShowTourDetail(true);
                                  }}
                                  className="w-5"
                                  src="/image/viewdetail.png"
                                  alt="View Detail"
                                />
                              </Link>
                            </td>
                            <td
                              className={`whitespace-nowrap px-6 py-4 ${
                                item.status ? "color-active" : "color-stop"
                              }`}
                            >
                              {item.status ? "Active" : "Stopped"}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 flex justify-center">
                              <div className="">
                                <img
                                  className="w-5 h-5 cursor-pointer ml-3"
                                  onClick={() => handleImageClick(item)}
                                  src={
                                    item.status
                                      ? "/image/unlock.png"
                                      : "/image/lock.png"
                                  }
                                  alt={item.status ? "Ban" : "Unban"}
                                />
                              </div>

                              {showPopup &&
                                selectedTour?.tourId === item.tourId && (
                                  <div className="fixed inset-0 z-10 flex items-center justify-center ">
                                    {/* Nền mờ */}
                                    <div className="fixed inset-0 bg-black opacity-50"></div>

                                    {/* Nội dung của popup */}
                                    <div className="relative bg-white p-8 rounded-lg">
                                      <p className="color-black font-bold text-2xl">
                                        Do you want to{" "}
                                        {item.status ? "lock" : "unlock"} this{" "}
                                        {item.tourName}?
                                      </p>
                                      <div className="button-kichhoat pt-4">
                                        <button
                                          className="button-exit mr-2"
                                          onClick={() => setShowPopup(false)}
                                        >
                                          Exit
                                        </button>
                                        <button
                                          className="button-yes"
                                          onClick={() =>
                                            toggleStatus(item.tourId)
                                          }
                                        >
                                          Yes
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={9}
                          className="text-center py-4 text-red-600 font-bold"
                        >
                          No tours found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="pagination mt-4 flex justify-between items-center font-semibold">
                  <div>
                    <span className="ml-8">
                      {currentPage} of {totalPages}
                    </span>
                  </div>
                  <div className="flex items-center mr-8">
                    <img
                      className="w-3 h-3 cursor-pointer"
                      src="/image/left.png"
                      alt="Previous"
                      onClick={handlePrevPage}
                    />
                    {Array.from({ length: totalPages }, (_, index) => (
                      <p
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`mb-0 mx-2 cursor-pointer ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        {index + 1}
                      </p>
                    ))}
                    <img
                      className="w-3 h-3 cursor-pointer"
                      src="/image/right2.png"
                      alt="Next"
                      onClick={handleNextPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DetailTour
        showTourDetail={showTourDetail}
        setShowTourDetail={setShowTourDetail}
        tour={tour}
        setTour={setTour}
      />
    </div>
  );
};

export default TourList;
