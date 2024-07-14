"use client";
import DetailHotel from "@/app/components/Hotel/DetailHotel";
import hotelService from "@/app/services/hotelService";
import { useUsers } from "@/app/services/userService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
/* eslint-disable @next/next/no-img-element */
const ManageHotel = () => {
  const [hotelList, setHotelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHotelCreate, setShowHotelCreate] = useState<boolean>(false);
  const [showHotelUpdate, setShowHotelUpdate] = useState<boolean>(false);
  const [showHotelDetail, setShowHotelDetail] = useState<boolean>(false);
  const [showHotelAvatar, setShowHotelAvatar] = useState<boolean>(false);
  const [HotelId, setHotelId] = useState(0);
  const [Hotel, setHotel] = useState<IHotel | null>(null);
  const [oldAvatarUrl, setOldAvatarUrl] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelPerPage] = useState(5);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedHotel, setSelectedHotel] = useState<IHotel | null>(null);
  const [imageLoadErrors, setImageLoadErrors] = useState<{
    [key: number]: boolean;
  }>({});

  const [loadingPage, setLoadingPage] = useState(false);

  const handleImageError = (hotelId: number) => {
    setImageLoadErrors((prevErrors) => ({ ...prevErrors, [hotelId]: true }));
  };
  const handleImageClick = (hotel: IHotel) => {
    setSelectedHotel(hotel);
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedHotel(null);
  };

  const handleLockUnlockHotel = async (hotelId: number, isVerify: boolean) => {
    setLoadingPage(true);
    try {
      let response;
      if (isVerify) {
        response = await hotelService.deleteHotel(hotelId);
      } else {
        response = await hotelService.recoverHotelDeleted(hotelId);
      }
      if (response) {
        setShowPopup(false);
        await hotelService.getHotelList().then((data: any) => {
          setHotelList(data);
          setLoading(false);
        });

        toast.success(`Hotel ${isVerify ? "locked" : "unlocked"} successfully`);
      } else {
        throw new Error(`Failed to ${isVerify ? "lock" : "unlock"} hotel`);
      }
    } catch (error) {
      console.error(
        `Error ${isVerify ? "locking" : "unlocking"} hotel:`,
        error
      );
      toast.error(`Failed to ${isVerify ? "lock" : "unlock"} hotel`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    hotelService
      .getHotelList()
      .then((data: any) => {
        setHotelList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hotel list:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleHotelAvatar = async () => {
    setShowHotelAvatar(false);

    hotelService
      .getHotelList()
      .then(async (data: any) => {
        setHotelList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hotel list:", error);
        setError(error);
        setLoading(false);
      });
  };

  //reload sau khi add
  const handleCreateHotel = async () => {
    setShowHotelCreate(false);

    hotelService
      .getHotelList()
      .then((data: any) => {
        setHotelList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hotel list:", error);
        setError(error);
        setLoading(false);
      });
  };
  const handleUpdateHotel = async () => {
    setShowHotelUpdate(false);
    hotelService
      .getHotelList()
      .then((data: any) => {
        setHotelList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hotel list:", error);
        setError(error);
        setLoading(false);
      });
  };

  //delete image from firebase
  //Delete
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading hotels</div>;
  }

  const indexOfLastHotel = currentPage * hotelPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelPerPage;
  const currentHotel = hotelList.slice(indexOfFirstHotel, indexOfLastHotel);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(hotelList.length / hotelPerPage);
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
                        HotelId
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Supplier Name
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Isverify
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Manage Room Order
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Manage Tour Order
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
                    {currentHotel.length > 0 ? (
                      currentHotel.map((item: IHotel, index) => (
                        <tr
                          key={index}
                          className="text-center border-b border-neutral-200 dark:border-white/10"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-black">
                            {item.hotelId}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-semibold text-black">
                            {item.hotelName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-semibold text-black">
                            {item.supplierId}
                          </td>
                          <td
                            className={`whitespace-nowrap px-6 py-4 ${
                              item.isVerify ? "color-active" : "color-stop"
                            }`}
                          >
                            {item.isVerify ? "Active" : "Stopped"}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Link className="flex justify-center" href={`/manage/orderHotel/${item.supplierId}`}>
                              <img
                                className="w-5"
                                src="/image/viewdetail.png"
                                alt="View Order hotel"
                              />
                            </Link>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Link className="flex justify-center" href={`/manage/orderTour/${item.supplierId}`}>
                              <img
                                className="w-5"
                                src="/image/viewdetail.png"
                                alt="View Order Tour"
                              />
                            </Link>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <Link className="flex justify-center" href="#">
                              <img
                                className="w-5"
                                src="/image/viewdetail.png"
                                alt="View Detail"
                                onClick={() => {
                                  setHotel(item);
                                  setShowHotelDetail(true);
                                }}
                              />
                            </Link>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 ">
                            <div className="flex justify-center">
                              <Link href="#" className="flex">
                                <img
                                  className="w-5 h-5 cursor-pointer ml-3"
                                  onClick={() => handleImageClick(item)}
                                  src={
                                    item.isVerify
                                      ? "/image/lock.png"
                                      : "/image/unlock.png"
                                  }
                                  alt={item.isVerify ? "Ban" : "Unban"}
                                />
                              </Link>
                            </div>

                            {showPopup &&
                              selectedHotel?.hotelId === item.hotelId && (
                                <div className="fixed inset-0 z-10 flex items-center justify-center">
                                  <div
                                    className="fixed inset-0 bg-black opacity-50"
                                    onClick={handleClosePopup}
                                  ></div>
                                  <div className="relative bg-white p-8 rounded-lg">
                                    <p className="color-black font-bold text-2xl">
                                      Do you want to{" "}
                                      {item.isVerify ? "lock" : "unlock"} this{" "}
                                      {item.hotelName}?
                                    </p>
                                    <div className="button-kichhoat pt-4">
                                      <Button
                                        className="button-exit mr-2"
                                        onClick={handleClosePopup}
                                        style={{
                                          background: "white",
                                          color: "black",
                                          border: "1px solid #ccc",
                                        }}
                                      >
                                        Exit
                                      </Button>
                                      <Button
                                        className="button-yes"
                                        onClick={() =>
                                          handleLockUnlockHotel(
                                            item.hotelId,
                                            item.isVerify
                                          )
                                        }
                                        style={{
                                          background: "#305A61",
                                          border: "1px solid #ccc",
                                        }}
                                      >
                                        Yes
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={8}
                          className="text-center py-4 text-red-600 font-bold"
                        >
                          No hotels found
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
      <DetailHotel
        showHotelDetail={showHotelDetail}
        setShowHotelDetail={setShowHotelDetail}
        hotel={Hotel}
        setHotel={setHotel}
      />
    </div>
  );
};
export default ManageHotel;
