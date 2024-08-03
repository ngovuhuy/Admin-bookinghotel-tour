/* eslint-disable @next/next/no-img-element */
"use client";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import orderTourHeaderService, { toggleOrderTourStatus } from "@/app/services/orderTourHeaderService";
import "../../../../../public/css/user.css";
import orderTourDetailService from "@/app/services/orderTourDetailService";
import TourOrderDetail from "@/app/components/OrderTour/tour_order_detail";
import { toast } from "react-toastify";

const OrderTour = ({ params }: { params: { supplierId: string } }) => {
  const [showModalTourOrderDetail, setShowModalTourOrderDetail] =
    useState<boolean>(false);
  const [orderTourHeaders, setOrderTourHeaders] = useState<IOrderTourHeader[]>(
    []
  );
  const [orderTourHeader, setOrderTourHeader] =
    useState<IOrderTourHeader | null>(null);
  const [orderTourDetail, setOrderTourDetail] =
    useState<IOrderTourDetail | null>(null);
  const [tourDetails, setTourDetails] = useState<{
    [key: number]: IOrderTourDetail[];
  }>({});
  const [selectedOrderTourHeader, setSelectedOrderTourHeader] = useState<IOrderTourHeader | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const fetcher = async () => {
    const headers =
      await orderTourHeaderService.getOrderTourHeaderBySupplierIdAdmin(
        Number(params.supplierId)
      );
    setOrderTourHeaders(headers);
    const detailPromises = headers.map((header) =>
      orderTourDetailService.getOrderTourDetailByOrderTourHeaderId(header.id)
    );

    const detailsArray = (await Promise.all(detailPromises))
      .filter(Boolean)
      .flat();
    const detailsMap: { [key: number]: IOrderTourDetail[] } = {};

    detailsArray.forEach((detail) => {
      if (!detailsMap[detail.orderTourHeaderlId]) {
        detailsMap[detail.orderTourHeaderlId] = [];
      }
      detailsMap[detail.orderTourHeaderlId].push(detail);
    });
    setTourDetails(detailsMap);
    return { headers, details: detailsMap };
  };
  const handleImageClick = (orderTourHeader: IOrderTourHeader) => {
    setSelectedOrderTourHeader(orderTourHeader);
    setShowPopup(true);
  };
  const toggleStatus = async (id: number) => {
    setLoading(true);
    try {
      await toggleOrderTourStatus(id);
      setShowPopup(false);
      mutate("orderTourData");
      toast.success("Success");
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to toggle order tour status");
    } finally {
      setLoading(false);
    }
  };
  const { data, error } = useSWR("orderTourData", fetcher);
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
                        TourOrderId
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Full Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Total Price
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Supplier
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
                    {orderTourHeaders.filter(header => header.process == "Paid").length > 0 ? (
                      orderTourHeaders.filter(header => header.process == "Paid").map((header) => {
                        const detail = details[header.id] || [];
                        const tourOrderDate = new Date(header.tourOrderDate);
                        const formattedTourOrderDate =
                          tourOrderDate.toLocaleDateString(undefined, {
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
                            <td className="whitespace-nowrap px-6 py-4 font-semibold">
                              {header.supplierId}
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
                                    setOrderTourHeader(header);
                                    setOrderTourDetail(details[header.id][0]);
                                    setShowModalTourOrderDetail(true);
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
                                selectedOrderTourHeader?.id == header.id && (
                                  <div className="fixed inset-0 z-10 flex items-center justify-center ">
                                    {/* Nền mờ */}
                                    <div className="fixed inset-0 bg-black opacity-50"></div>

                                    {/* Nội dung của popup */}
                                    <div className="relative bg-white p-8 rounded-lg">
                                      <p className="color-black font-bold text-2xl">
                                        Do you want to{" "}
                                        {header.completed ? "confirm" : "confirm"}{" "}
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
                          colSpan={9}
                          className="text-center py-4 text-red-600 font-bold"
                        >
                          No tour orders found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* <UpdateTourOrder
                      showModalEditTourOrder={showModalEdit}
                      setShowModalEditTourOrder={setShowModalEdit}
                      tourOrder={tourOrder}
                      setTourOrder={setTourOrder}
                    /> */}
                <TourOrderDetail
                  showModalTourOrderDetail={showModalTourOrderDetail}
                  setShowModalTourOrderDetail={setShowModalTourOrderDetail}
                  orderTourHeader={orderTourHeader}
                  setOrderTourHeader={setOrderTourHeaders}
                  orderTourDetail={orderTourDetail}
                  setOrderTourDetail={setOrderTourDetail}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderTour;
