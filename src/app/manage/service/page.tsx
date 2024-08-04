/* eslint-disable @next/next/no-img-element */
// my-new-page.js
"use client";

import CreateService from "@/app/components/Services/CreateService";
import DeleteService from "@/app/components/Services/DeleteService";
import UpdateService from "@/app/components/Services/UpdateService";
import { useServices } from "@/app/services/service";
import React, { useState } from "react";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const MyNewPage = () => {
  const [service, setService] = useState<IService | null>(null);
  const { services, error } = useServices();
  const [showServiceCreate, setShowServiceCreate] = useState<boolean>(false);
  const [showServiceUpdate, setShowServiceUpdate] = useState<boolean>(false);
  const [showService, setShowService] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPages] = useState(5);
  if (error) return <div>Failed to load</div>;
  if (!services) return <div>Loading...</div>;

  const indexOfLastService = currentPage * servicesPerPages;
  const indexOfFirstService = indexOfLastService - servicesPerPages;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(services.length / servicesPerPages);

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
  // Function để mở modal
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
        <button
          className="ml-8 button-add"
          onClick={() => setShowServiceCreate(true)}
        >
          + Add Service
        </button>
      </div>
      <div className="table-hotel ">
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-start text-sm font-light text-surface dark:text-white">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                    <tr className="text-center bg-ccc">
                      <th scope="col" className="px-6 py-4">
                        ServiceId
                      </th>
                      <th scope="col" className="px-6 py-4">
                        ServiceName
                      </th>
                      <th scope="col" className="px-6 py-4">
                        ServiceDescription
                      </th>
                      <th scope="col" className="px-6 py-4">
                        ServiceImage
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentServices.map((item: IService) => (
                      <tr
                        key={item.serviceId}
                        className="border-b border-neutral-200 dark:border-white/10 text-center font-semibold"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {item.serviceId}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.serviceName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {item.serviceDescription}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex justify-center">
                            <img className="w-6" src={item.serviceImage} alt={item.serviceDescription} />
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex justify-center">
                          <img
                            onClick={() => {
                              setService(item);
                              setShowServiceUpdate(true);
                            }}
                            className="w-5 h-5 cursor-pointer"
                            src="/image/penIcon.png"
                            alt=""
                          />
                          <img
                            onClick={() => {
                              setService(item);
                              setShowService(true);
                            }}
                            className="w-5 h-5 cursor-pointer ml-3"
                            src="/image/trash.png"
                            alt=""
                          />
                          </div>
                          
                        </td>
                      </tr>
                    ))}
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

      <CreateService
        showServiceCreate={showServiceCreate}
        setShowServiceCreate={setShowServiceCreate}
      />
      <UpdateService
        showServiceUpdate={showServiceUpdate}
        setShowServiceUpdate={setShowServiceUpdate}
        service={service}
        setService={setService}
      />
      <DeleteService
        showService={showService}
        setShowService={setShowService}
        service={service}
        setService={setService}
      />
    </div>
  );
};

export default MyNewPage;
