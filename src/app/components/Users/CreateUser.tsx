'use client'
import { useRoles } from '@/app/services/roleService';
import { createUser, revalidateUsers } from '@/app/services/userService';
import {  useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../../node_modules/react-bootstrap/esm/Button';
import Form from '../../../../node_modules/react-bootstrap/esm/Form';
import Modal from '../../../../node_modules/react-bootstrap/esm/Modal';


interface Iprops {
    showUserCreate: boolean;
setShowUserCreate: (value: boolean) => void;
}
function CreateRole(props: Iprops) {
    // npm i --save-exact react-toastify@9.1.3
    const {showUserCreate, setShowUserCreate} = props;
    const [userName  , setUserName] = useState<string>("");
    const [email, SetEmail] = useState<string>("");
    const [phone, SetPhone] = useState<string>("");
    const [address, SetAddress] = useState<string>("");
    const [password, SetPassword] = useState<string>("");
    const [status, SetStatus] = useState<boolean>(true);
    const [isVerify, SetIsVerify] = useState<boolean>(false);
    const [roleId, SetRoleId] = useState<number>(0);


    const { roles, error } = useRoles();
  


    const handleSubmit = async () => {
      if (!userName) {
        toast.error("Please enter a  name!!!");
        return;
      }
      if (!email) {
        toast.error("Please enter a  email!!!");
        return;
      }
      if (!phone) {
        toast.error("Please enter a role phone!!!");
        return;
      }
      if (!password) {
        toast.error("Please enter a role password!!!");
        return;
      }
      if (!roleId) {
        toast.error("Please enter a role role!!!");
        return;
      }
  
      try {
        const response = await createUser(userName, email,phone,address,password,status,isVerify,roleId);
        if (typeof response === 'string') {
          toast.success(response);
        } else {
          toast.success("Create User Success");
        }
        handleCloseModal();
        revalidateUsers();
      } catch (error) {
        toast.error("Failed to create user");
        console.error(error);
      }
    };
    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        SetRoleId(Number(e.target.value)); // Chuyển đổi giá trị từ string sang number
      };
   const handleCloseModal = () => {
    setUserName("");
    SetEmail("");
    SetPhone("");
    SetAddress("");
    SetPassword("");
    setShowUserCreate(false)
   }
  return (
    <>
      <Modal className='ptop-100px' show={showUserCreate} onHide={() => handleCloseModal()} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
     <div className="row">
     <Form.Group className="mb-3 col-6 " controlId="exampleForm.ControlInput1" >
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" placeholder="Please enter user name !!!" value={userName} onChange={(e:any) => setUserName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3 col-6 " controlId="exampleForm.ControlInput1">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Please enter email !!!" value={email} onChange={(e:any) => SetEmail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3 col-6 " controlId="exampleForm.ControlInput1">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="email" placeholder="Please enter phone !!!" value={phone} onChange={(e:any) => SetPhone(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3 col-6 " controlId="exampleForm.ControlInput1">
        <Form.Label>Address</Form.Label>
        <Form.Control type="email" placeholder="Please enter address !!!" value={address} onChange={(e:any) => SetAddress(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
        <Form.Label>Password</Form.Label>
        <Form.Control type="email" placeholder="Please enter password !!!" value={password} onChange={(e:any) => SetPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlSelect1">
  <Form.Label>Role</Form.Label>
  <Form.Select aria-label="Select product category" value={roleId} onChange={handleRoleChange}>
  <option value="">Please choose role!</option>
    {roles && roles.map((role:IRole) => (
      <option key={role.roleId} value={role.roleId}>{role.roleName}</option>
    ))}
  </Form.Select>
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