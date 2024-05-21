'use client'
import { revalidateRoles, updateRole } from '@/app/services/roleService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../../node_modules/react-bootstrap/esm/Button';
import Form from '../../../../node_modules/react-bootstrap/esm/Form';
import Modal from '../../../../node_modules/react-bootstrap/esm/Modal';
import useSWR, { mutate } from '../../../../node_modules/swr/dist/core/index';

interface IProps{
    showModalUpdate: boolean;
setShowModalUpdate: (value: boolean) => void;

  role: IRole | null;
setRole: (value: IRole | null) => void;
}

function UpdateRole(props: IProps) {
 const {showModalUpdate, setShowModalUpdate,role,setRole} = props;
  const [roleId, setRoleId] = useState<number>(0);
  const [roleName, setRoleName] = useState<string>("");
  const [roleDescription, setRoleDescription] = useState<string>("");

  useEffect(() => {
    if(role && role.roleId){
        setRoleId(role.roleId);
        setRoleName(role.roleName);
        setRoleDescription(role.roleDescription);
    }
},[role])



const handleSubmit = async () => {
  try {
    const response = await updateRole(roleId, roleName, roleDescription);
    if (typeof response === 'string') {
      toast.success(response);
    } else {
      toast.success("Update Roles Success");
    }
    revalidateRoles(); // Revalidate the roles data
    handleCloseModal();
  } catch (error) {
    toast.error("Update Error");
    console.error(error);
  }
};
const handleCloseModal = () => {
    setShowModalUpdate(false)
   }
  return (
    <>


<Modal show={showModalUpdate} onHide={() => handleCloseModal()} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Delete Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>

<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  <Form.Label>Role Id</Form.Label>
  <Form.Control readOnly 
type="number" 
placeholder="Please enter product price !!!" 
value={roleId} 
onChange={(e:any) => setRoleId(parseInt(e.target.value))}
/>
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  <Form.Label>Role Name</Form.Label>
  <Form.Control  type="text"  value={roleName} onChange={(e:any) => setRoleName(e.target.value)}/>
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  <Form.Label>Role Description</Form.Label>
  <Form.Control  type="text"  value={roleDescription} onChange={(e:any) => setRoleDescription(e.target.value)}/>
</Form.Group>
</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateRole;