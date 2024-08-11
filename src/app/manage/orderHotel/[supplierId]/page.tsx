/* eslint-disable @next/next/no-img-element */
"use client";

import BookingDetail from "@/app/components/OrderHotel/booking_detail";
import orderHotelDetailService from "@/app/services/orderHotelDetailService";
import orderHotelHeaderService, {
  toggleOrderHotelHeaderStatus,
} from "@/app/services/orderHotelHeaderService";
import "../../../../../public/css/user.css";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";

const OrderHotel = ({ params }: { params: { supplierId: string } }) => {
  const [showModalBookingDetail, setShowModalBookingDetail] =
    useState<boolean>(false);
  const [orderHotelHeaders, setOrderHotelHeaders] = useState<
    IOrderHotelHeader[]
  >([]);
  const [orderHotelHeader, setOrderHotelHeader] =
    useState<IOrderHotelHeader | null>(null);
  const [orderHotelDetail, setOrderHotelDetail] =
    useState<IOrderHotelDetail | null>(null);
  const [hotelDetails, setHotelDetails] = useState<{
    [key: number]: IOrderHotelDetail[];
  }>({});
  const [selectedOrderHotelHeader, setSelectedOrderHotelHeader] =
    useState<IOrderHotelHeader | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const fetcher = async () => {
    const headers =
      await orderHotelHeaderService.getOrderHotelHeaderBySupplierIdAdmin(
        Number(params.supplierId)
      );
    setOrderHotelHeaders(headers);
    const detailPromises = headers.map((header) =>
      orderHotelDetailService.getOrderHotelDetailByOrderHotelHeaderId(header.id)
    );

    const detailsArray = (await Promise.all(detailPromises))
      .filter(Boolean)
      .flat();
    const detailsMap: { [key: number]: IOrderHotelDetail[] } = {};

    detailsArray.forEach((detail) => {
      if (!detailsMap[detail.orderHotelHeaderlId]) {
        detailsMap[detail.orderHotelHeaderlId] = [];
      }
      detailsMap[detail.orderHotelHeaderlId].push(detail);
    });
    setHotelDetails(detailsMap);
    return { headers, details: detailsMap };
  };
  const handleImageClick = (orderHotelHeader: IOrderHotelHeader) => {
    setSelectedOrderHotelHeader(orderHotelHeader);
    setShowPopup(true);
  };
  const toggleStatus = async (id: number) => {
    setLoading(true);
    try {
      await toggleOrderHotelHeaderStatus(id);
      setShowPopup(false);
      mutate("orderHotelData");
      toast.success("Success");
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to toggle order hotel status");
    } finally {
      setLoading(false);
    }
  };
  const { data, error } = useSWR("orderHotelData", fetcher);

  const totalPages = Math.ceil(orderHotelHeaders.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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

  const currentHeaders = orderHotelHeaders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  const { headers, details } = data;

  return (
    <div className="relative">
      <div className="search-add ">
        <div className="search-hotel flex">
          <input
            type="text"
            placeholder="Search........."
            className="input-hotel pl-3"
          />
          <img src="/image/search.png" alt="" />
        </div>
      </div>
      <div className="table-hotel pt-8">
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-start text-sm font-light text-surface dark:text-white border-solid">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10 bk-top-table">
                    <tr className="text-center">
                      <th scope="col" className="px-6 py-4">
                        BookingId
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Full Name
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Total Price
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Process
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Completed
                      </th>
                      <th scope="col" className="px-6 py-4">
                        View Detail
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentHeaders.filter(header => header.process == "Success").length > 0 ? (
                      currentHeaders.filter(header => header.process == "Success").map((header) => {
                        const detail = details[header.id] || [];
                        const checkInDate = new Date(header.checkInDate);
                        const checkOutDate = new Date(header.checkOutDate);
                        const formattedCheckInTime =
                          checkInDate.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          });
                        const formattedCheckOutTime =
                          checkOutDate.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          });
                        return (
                          <tr
                            key={header.id}
                            className="border-b border-neutral-200 dark:border-white/10 text-center"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {header.id}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {header.fullName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {header.email}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {header.totalPrice}
                            </td>
                            <td
                              className={`whitespace-nowrap px-6 py-4 ${
                                header.process ? "color-active" : "color-stop"
                              }`}
                            >
                              {header.process ? "Success" : "Pending..."}
                            </td>
                            <td
                              className={`whitespace-nowrap px-6 py-4 ${
                                header.completed ? "color-active" : "color-stop"
                              }`}
                            >
                              {header.completed ? "Success" : "Pending..."}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="flex justify-center">
                                <img
                                  className="w-5 h-5 cursor-pointer"
                                  src="/image/viewdetail.png"
                                  alt="View Detail"
                                  onClick={() => {
                                    setOrderHotelHeader(header);
                                    setOrderHotelDetail(details[header.id][0]);
                                    setShowModalBookingDetail(true);
                                  }}
                                />
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 flex">
                            {header.completed === false && (
                                <img
                                  onClick={() => handleImageClick(header)}
                                  className="w-5 h-5 cursor-pointer ml-2"
                                  src="/image/greenTick.png"
                                  alt="Ban"
                                />
                              )}
                              {showPopup &&
                                selectedOrderHotelHeader?.id == header.id && (
                                  <div className="fixed inset-0 z-10 flex items-center justify-center ">
                                    {/* Nền mờ */}
                                    <div className="fixed inset-0 bg-black opacity-50"></div>

                                    {/* Nội dung của popup */}
                                    <div className="relative bg-white p-8 rounded-lg">
                                      <p className="color-black font-bold text-2xl">
                                        Do you want to{" "}
                                        {header.completed ? "confirm" : "confirm"}{" "}
                                        this order {header.id} ?
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
                                            toggleStatus(header.id)
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
                          colSpan={12}
                          className="text-center py-4 text-red-600 font-bold"
                        >
                          No bookings found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="pagination mt-4 flex justify-between items-center font-semibold">
                  <div>
                    <span className="ml-8">{currentPage} of {totalPages}</span>
                  </div>
                  <div className="flex items-center mr-8">
                    <img className="w-3 h-3 cursor-pointer" src="/image/left.png" alt="Previous" onClick={handlePrevPage} />
                    {Array.from({ length: totalPages }, (_, index) => (
                      <p
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`mb-0 mx-2 cursor-pointer ${currentPage === index + 1 ? 'active' : ''}`}
                      >
                        {index + 1}
                      </p>
                    ))}
                    <img className="w-3 h-3 cursor-pointer" src="/image/right2.png" alt="Next" onClick={handleNextPage} />
                  </div>
                </div>
                {/* <UpdateBooking
                  showModalEditBooking={showModalEdit}
                  setShowModalEditBooking={setShowModalEdit}
                  orderHotelHeader={orderHotelHeader}
                  setOrderHotelHeader={setOrderHotelHeaders}
                  orderHotelDetail={orderHotelDetail}
                  setOrderHotelDetail={setOrderHotelDetail}
                /> */}
                <BookingDetail
                  showModalBookingDetail={showModalBookingDetail}
                  setShowModalBookingDetail={setShowModalBookingDetail}
                  orderHotelHeader={orderHotelHeader}
                  setOrderHotelHeader={setOrderHotelHeaders}
                  orderHotelDetail={orderHotelDetail}
                  setOrderHotelDetail={setOrderHotelDetail}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderHotel;
