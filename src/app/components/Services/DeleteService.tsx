'use client'

import { deleteService, revalidateServices } from '@/app/services/service';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../../node_modules/react-bootstrap/esm/Button';
import Form from '../../../../node_modules/react-bootstrap/esm/Form';
import Modal from '../../../../node_modules/react-bootstrap/esm/Modal';
import useSWR, { mutate } from '../../../../node_modules/swr/dist/core/index';

interface IProps{
    showService: boolean;
setShowService: (value: boolean) => void;

  service: IService | null;
setService: (value: IService | null) => void;
}

function DeleteService(props: IProps) {
 const {showService, setShowService,service,setService} = props;
  const [serviceId, setServiceId] = useState<number>(0);
  const [serviceName, setServiceName] = useState<string>("");
  const [serviceDescription, setServiceDescription] = useState<string>("");
  const [serviceImage, setServiceImage] = useState<string>("");


  useEffect(() => {
    if(service && service.serviceId){
      setServiceId(service.serviceId);
      setServiceName(service.serviceName);
      setServiceDescription(service.serviceDescription);
      setServiceImage(service.serviceImage);
    }
},[service])



const handleSubmit = async () => {
  try {
    const response = await deleteService(serviceId);
    if (typeof response === 'string') {
      toast.success(response);
    } else {
      toast.success("Delete Service Success");
    }
    revalidateServices(); // Revalidate the roles data
    handleCloseModal();
  } catch (error) {
    toast.error("Delete Error");
    console.error(error);
  }
};
const handleCloseModal = () => {
  setShowService(false)
   }
  return (
    <>


<Modal className="pt-44" show={showService} onHide={() => handleCloseModal()} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Delete Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>

<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  <Form.Label>Do you want delete <span className='text-red-500'>{serviceName}</span> Service </Form.Label>
 
</Form.Group>

</Form>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={() => handleSubmit()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteService;