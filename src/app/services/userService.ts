import useSWR, { mutate } from 'swr';
import { BASE_URL } from './hotelService';
// Assuming apiService.js is in the same directory

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const revalidateUsers = () => mutate(`${BASE_URL}/getUsers`);

export const useUsers = () => {
  const { data, error } = useSWR(`${BASE_URL}/getUsers`, fetcher);
  return { users: data, error };
};

export const toggleUserStatus = async (userId: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/toggleUserStatus`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    });

    if (!response.ok) {
      throw new Error('Failed to toggle user status');
    }
  } catch (error: any) {
    throw new Error('Failed to toggle user status: ' + error.message);
  }
};

export const createUser = async (
  userName: string,
  email: string,
  phone: string,
  address: string,
  password: string,
  status: boolean,
  isVerify: boolean,
  roleId: number
) => {
  const response = await fetch(`${BASE_URL}/createUser`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userName, email, phone, address, password, status, isVerify, roleId })
  });

  if (!response.ok) {
    throw new Error('Failed to create User');
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    return response.text(); // Handle non-JSON response
  }
};

// Function to trigger the data revalidation
export const revalidateServices = () => mutate(`${BASE_URL}/getServices`);
