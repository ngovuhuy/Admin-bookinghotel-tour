import useSWR, { mutate } from 'swr';
import { BASE_URL } from './hotelService';


const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const useServices = () => {
  const { data, error } = useSWR(`${BASE_URL}/getServices`, fetcher);
  return { services: data, error };
};

export const createService = async (serviceName: string, serviceDescription: string, serviceImage: string) => {
  const response = await fetch(`${BASE_URL}/createService`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ serviceName, serviceDescription, serviceImage })
  });

  if (!response.ok) {
    throw new Error('Failed to create service');
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    return response.text(); // Handle non-JSON response
  }
};

export const updateService = async (serviceId: number, serviceName: string, serviceDescription: string, serviceImage: string) => {
  const response = await fetch(`${BASE_URL}/updateService`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ serviceId, serviceName, serviceDescription, serviceImage })
  });

  if (!response.ok) {
    throw new Error('Failed to update service');
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    return response.text(); // Handle non-JSON response
  }
};

export const deleteService = async (serviceId: number) => {
  const response = await fetch(`${BASE_URL}/deleteService/${serviceId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete service');
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
