'use client'

import { revalidateServices, updateService } from '@/app/services/service';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../../node_modules/react-bootstrap/esm/Button';
import Form from '../../../../node_modules/react-bootstrap/esm/Form';
import Modal from '../../../../node_modules/react-bootstrap/esm/Modal';
import useSWR, { mutate } from '../../../../node_modules/swr/dist/core/index';

interface IProps{
    showServiceUpdate: boolean;
setShowServiceUpdate: (value: boolean) => void;

  service: IService | null;
setService: (value: IService | null) => void;
}

function UpdateService(props: IProps) {
 const {showServiceUpdate, setShowServiceUpdate,service,setService} = props;
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
    const response = await updateService(serviceId, serviceName, serviceDescription,serviceImage);
    if (typeof response === 'string') {
      toast.success(response);
    } else {
      toast.success("Update Service Success");
    }
    revalidateServices(); // Revalidate the roles data
    handleCloseModal();
  } catch (error) {
    toast.error("Update Error");
    console.error(error);
  }
};
const handleCloseModal = () => {
    setShowServiceUpdate(false)
   }
  return (
    <>


<Modal show={showServiceUpdate} onHide={() => handleCloseModal()} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Update Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>

<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  <Form.Label>Service Id</Form.Label>
  <Form.Control readOnly 
type="number" 
placeholder="Please enter product price !!!" 
value={serviceId} 
onChange={(e:any) => setServiceId(parseInt(e.target.value))}
/>
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  <Form.Label>Service Name</Form.Label>
  <Form.Control  type="text"  value={serviceName} onChange={(e:any) => setServiceName(e.target.value)}/>
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  <Form.Label>Service Description</Form.Label>
  <Form.Control  type="text"  value={serviceDescription} onChange={(e:any) => setServiceDescription(e.target.value)}/>
</Form.Group>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  <Form.Label>Service Image</Form.Label>
  <Form.Control  type="text"  value={serviceImage} onChange={(e:any) => setServiceImage(e.target.value)}/>
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

export default UpdateService;