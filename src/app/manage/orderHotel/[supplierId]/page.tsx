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
  console.log(data);
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
                    {orderHotelHeaders.filter(header => header.process == "Paid").length > 0 ? (
                      orderHotelHeaders.filter(header => header.process == "Paid").map((header) => {
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
                              {header.process ? "Paid" : "Pending..."}
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
                              <img
                                onClick={() => handleImageClick(header)}
                                className="w-5 h-5 cursor-pointer ml-2"
                                src={
                                  header.completed
                                    ? "/image/unlock.png"
                                    : "/image/lock.png"
                                }
                                alt={header.completed ? "Ban" : "Unban"}
                              />
                              {showPopup &&
                                selectedOrderHotelHeader?.id == header.id && (
                                  <div className="fixed inset-0 z-10 flex items-center justify-center ">
                                    {/* Nền mờ */}
                                    <div className="fixed inset-0 bg-black opacity-50"></div>

                                    {/* Nội dung của popup */}
                                    <div className="relative bg-white p-8 rounded-lg">
                                      <p className="color-black font-bold text-2xl">
                                        Do you want to{" "}
                                        {header.completed ? "lock" : "unlock"}{" "}
                                        this {header.id} ?
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
