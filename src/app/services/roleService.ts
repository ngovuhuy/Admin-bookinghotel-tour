import useSWR, { mutate } from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export const useRoles = () => {
  const { data, error } = useSWR('https://localhost:7132/getRoles', fetcher);
  return { roles: data, error };
};

export const createRole = async (roleName: string, roleDescription: string) => {
  const response = await fetch('https://localhost:7132/createRole', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ roleName, roleDescription })
  });

  if (!response.ok) {
    throw new Error('Failed to create role');
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    return response.text(); // Handle non-JSON response
  }
};
export const updateRole = async (roleId: number, roleName: string, roleDescription: string) => {
  const response = await fetch('https://localhost:7132/updateRole', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ roleId, roleName, roleDescription })
  });

  if (!response.ok) {
    throw new Error('Failed to update role');
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    return response.text(); // Handle non-JSON response
  }
};

export const deleteRole = async (roleId: number) => {
  const response = await fetch(`https://localhost:7132/deleteRole/${roleId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete role');
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    return response.text(); // Handle non-JSON response
  }
};
// Function to trigger the data revalidation
export const revalidateRoles = () => mutate('https://localhost:7132/getRoles');
