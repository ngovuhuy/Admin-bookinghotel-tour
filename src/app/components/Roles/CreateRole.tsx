'use client'
import { createRole, revalidateRoles } from '@/app/services/roleService';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Button from '../../../../node_modules/react-bootstrap/esm/Button';
import Form from '../../../../node_modules/react-bootstrap/esm/Form';
import Modal from '../../../../node_modules/react-bootstrap/esm/Modal';
import { mutate } from '../../../../node_modules/swr/dist/core/index';


interface Iprops {
    showModalCreate: boolean;
setShowModalCreate: (value: boolean) => void;
}
function CreateRole(props: Iprops) {
    // npm i --save-exact react-toastify@9.1.3
    const {showModalCreate, setShowModalCreate} = props;
    const [roleName, setRoleName] = useState<string>("");
    const [roleDescription, SetRoleDescription] = useState<string>("");

    const handleSubmit = async () => {
      if (!roleName) {
        toast.error("Please enter a role name!!!");
        return;
      }
      if (!roleDescription) {
        toast.error("Please enter a role description!!!");
        return;
      }
  
      try {
        const response = await createRole(roleName, roleDescription);
        if (typeof response === 'string') {
          toast.success(response);
        } else {
          toast.success("Create Role Success");
        }
        handleCloseModal();
        revalidateRoles();
        console.log(revalidateRoles);
      } catch (error) {
        toast.error("Failed to create role");
        console.error(error);
      }
    };

   const handleCloseModal = () => {
    setRoleName("");
    SetRoleDescription("");
    setShowModalCreate(false)
   }
  return (
    <>
      <Modal className='pt-36' show={showModalCreate} onHide={() => handleCloseModal()} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
     <div className="">
     <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1" >
        <Form.Label>Role Name</Form.Label>
        <Form.Control type="text" placeholder="Please enter role name !!!" value={roleName} onChange={(e:any) => setRoleName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
        <Form.Label>Role Description</Form.Label>
        <Form.Control type="text" placeholder="Please enter role description !!!" value={roleDescription} onChange={(e:any) => SetRoleDescription(e.target.value)} />
      </Form.Group>
     </div>
    </Form>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateRole;