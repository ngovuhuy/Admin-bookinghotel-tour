"use client";
import DetailHotel from "@/app/components/Hotel/DetailHotel";
import hotelService, { toggleHotelStatus } from "@/app/services/hotelService";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Link from "next/link";
import { mutate } from "../../../../node_modules/swr/dist/core/index";
/* eslint-disable @next/next/no-img-element */
const ManageHotel = () => {
  const [hotelList, setHotelList] = useState([]);
  const [filteredHotelList, setFilteredHotelList] = useState([]);
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
  const [searchQuery, setSearchQuery] = useState("");

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
 
  
  useEffect(() => {
    hotelService
      .getHotelList()
      .then((data: any) => {
        setHotelList(data);
        setFilteredHotelList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hotel list:", error);
        setError(error);
        setLoading(false);
      });
  }, []);
  const loadHotelList = () => {
    setLoading(true);
    hotelService
      .getHotelList()
      .then((data: any) => {
        setHotelList(data);
        setFilteredHotelList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hotel list:", error);
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadHotelList();
  }, []);
  const toggleStatus = async (hotelId: number) => {
    setLoading(true);
    try {
      await toggleHotelStatus(hotelId);
      setShowPopup(false);
      toast.success("Success");
      loadHotelList(); // Load lại danh sách sau khi thay đổi trạng thái
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to toggle hotel  status");
    } finally {
      setLoading(false);
    }
  };

  const handleHotelAvatar = async () => {
    setShowHotelAvatar(false);

    hotelService
      .getHotelList()
      .then(async (data: any) => {
        setHotelList(data);
        setFilteredHotelList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hotel list:", error);
        setError(error);
        setLoading(false);
      });
  };

  const handleCreateHotel = async () => {
    setShowHotelCreate(false);

    hotelService
      .getHotelList()
      .then((data: any) => {
        setHotelList(data);
        setFilteredHotelList(data);
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
        setFilteredHotelList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hotel list:", error);
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const filteredHotels = hotelList.filter((hotel: IHotel) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        hotel.hotelName?.toLowerCase().includes(lowerCaseQuery) ||
        hotel.hotelId?.toString().toLowerCase().includes(lowerCaseQuery)
      );
    });
    setFilteredHotelList(filteredHotels);
    setCurrentPage(1); // Reset to the first page when search query changes
  }, [searchQuery, hotelList]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading hotels</div>;
  }

  const indexOfLastHotel = currentPage * hotelPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelPerPage;
  const currentHotel = filteredHotelList.slice(
    indexOfFirstHotel,
    indexOfLastHotel
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredHotelList.length / hotelPerPage);
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="table-hotel ">
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
                            <Link
                              className="flex justify-center"
                              href={`/manage/orderHotel/${item.supplierId}`}
                            >
                              <img
                                className="w-5"
                                src="/image/viewdetail.png"
                                alt="View Order hotel"
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
                                      ? "/image/unlock.png"
                                      : "/image/lock.png"
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
                                          toggleStatus(item.hotelId)
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
