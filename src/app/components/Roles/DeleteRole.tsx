'use client'
import { deleteRole, revalidateRoles } from '@/app/services/roleService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../../node_modules/react-bootstrap/esm/Button';
import Form from '../../../../node_modules/react-bootstrap/esm/Form';
import Modal from '../../../../node_modules/react-bootstrap/esm/Modal';
import useSWR, { mutate } from '../../../../node_modules/swr/dist/core/index';

interface IProps{
  show: boolean;
  setShow: (v: boolean) => void;

  role: IRole | null;
setRole: (value: IRole | null) => void;
}

function DeleteRole(props: IProps) {
  const {show, setShow,role,setRole}  = props

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
    const response = await deleteRole(roleId);
    if (typeof response === 'string') {
      toast.success(response);
    } else {
      toast.success("Delete Role Success");
    }
    revalidateRoles(); // Revalidate the roles data
    handleCloseModal();
  } catch (error) {
    toast.error("Delete Error");
    console.error(error);
  }
};
const handleCloseModal = () => {
setShow(false)
}
  return (
    <>


      <Modal className='pt-36' show={show} onHide={() => setShow(false)}>
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
  <Form.Control readOnly type="text"  value={roleName} onChange={(e:any) => setRoleName(e.target.value)}/>
</Form.Group>
</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteRole;