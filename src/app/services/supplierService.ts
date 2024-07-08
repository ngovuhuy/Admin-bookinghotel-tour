import useSWR, { mutate } from 'swr';
import { BASE_URL } from './hotelService';


const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const revalidateSupplier = () => mutate(`${BASE_URL}/getSuppliers`);

export const useSuppliers = () => {
  const { data, error } = useSWR(`${BASE_URL}/getSuppliers`, fetcher);
  return { suppliers: data, error };
};

export const toggleSupplierStatus = async (supplierId: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/toggleSupplierStatus`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ supplierId })
    });

    if (!response.ok) {
      throw new Error('Failed to toggle supplier status');
    }
  } catch (error: any) {
    throw new Error('Failed to toggle supplier status: ' + error.message);
  }
};

export const createSupplier = async (
  supplierName: string,
  email: string,
  phone: string,
  address: string,
  password: string,
  status: boolean,
  isVerify: boolean,
  roleId: number
) => {
  const response = await fetch(`${BASE_URL}/createSupplier`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ supplierName, email, phone, address, password, status, isVerify, roleId })
  });

  if (!response.ok) {
    throw new Error('Failed to create Supplier');
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    return response.text();
  }
};

// Function to trigger the data revalidation
export const revalidateServices = () => mutate(`${BASE_URL}/getServices`);
