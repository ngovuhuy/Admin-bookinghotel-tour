'use client'

import { createService, revalidateServices } from '@/app/services/service';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Button from '../../../../node_modules/react-bootstrap/esm/Button';
import Form from '../../../../node_modules/react-bootstrap/esm/Form';
import Modal from '../../../../node_modules/react-bootstrap/esm/Modal';
import { mutate } from '../../../../node_modules/swr/dist/core/index';


interface Iprops {
    showServiceCreate: boolean;
setShowServiceCreate: (value: boolean) => void;
}
function CreateService(props: Iprops) {
    // npm i --save-exact react-toastify@9.1.3
    const {showServiceCreate, setShowServiceCreate} = props;
    const [serviceName, setServiceName] = useState<string>("");
    const [ServiceDescription, SetServiceDescription] = useState<string>("");
    const [ServiceImage, SetServiceImage] = useState<string>("");


    const handleSubmit = async () => {
      if (!showServiceCreate) {
        toast.error("Please enter a serviceName!!!");
        return;
      }
      if (!serviceName) {
        toast.error("Please enter a ServiceDescription!!!");
        return;
      }
      if (!ServiceDescription) {
        toast.error("Please enter a ServiceImage!!!");
        return;
      }
      
      try {
        const response = await createService(serviceName, ServiceDescription,ServiceImage);
        if (typeof response === 'string') {
          toast.success(response);
        } else {
          toast.success("Create Service Success");
        }
        handleCloseModal();
        revalidateServices();
      } catch (error) {
        toast.error("Failed to create service");
        console.error(error);
      }
    };

   const handleCloseModal = () => {
    setServiceName("");
    SetServiceDescription("");
    SetServiceImage("");
    setShowServiceCreate(false)
   }
  return (
    <>
      <Modal className='pt-36' show={showServiceCreate} onHide={() => handleCloseModal()} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
     <div className="">
     <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1" >
        <Form.Label>Service Name</Form.Label>
        <Form.Control type="text" placeholder="Please enter service name !!!" value={serviceName} onChange={(e:any) => setServiceName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
        <Form.Label>Service Description</Form.Label>
        <Form.Control type="text" placeholder="Please enter service description !!!" value={ServiceDescription} onChange={(e:any) => SetServiceDescription(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3 " controlId="exampleForm.ControlInput1">
        <Form.Label>Service Image</Form.Label>
        <Form.Control type="text" placeholder="Please enter service image !!!" value={ServiceImage} onChange={(e:any) => SetServiceImage(e.target.value)} />
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

export default CreateService;