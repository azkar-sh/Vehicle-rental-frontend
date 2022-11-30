/* eslint-disable no-unused-vars */
import React from "react";
// import PP from "../../assets/img/photoProfile.png";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Header from "../../component/Header";
import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser, getUserById } from "../../stores/actions/user";
import Personal from "../../component/Personal/Personal";
// import { Toast, ToastContainer } from "react-bootstrap";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile1() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoading, setIsloading] = useState(false);
  const userData = useSelector((state) => state.user);
  const user = userData.data;
  console.log(userData);
  console.log(user);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    address: user.address,
    birthDate: user.birthDate,
  });
  const [imagePreview, setImagePreview] = useState("");
  // const [showToast, setShowToast] = useState(true);

  const updateHandler = () => {
    const formData = new FormData();
    for (const data in form) {
      formData.append(data, form[data]);
    }
    dispatch(editUser(id, formData))
      .then(() => {
        dispatch(getUserById(id));

        toast.success("Success Update Profile", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.msg, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const handleChangeForm = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, [name]: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="row">
          <div className="d-flex justify-content-between mt-5">
            <Button variant="light">
              <span className="profile-title">Profile</span>
            </Button>
          </div>

          {userData.isLoading ? (
            <div className="container-spinner-profile">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden" />
              </div>
            </div>
          ) : (
            <>
              <div className="col-12 d-flex flex-column gap-5 align-items-center px-5 mt-5">
                <div
                  className="d-flex profile-image-wrapper justify-content-center align-items-center rounded-circle overflow-hidden position-relative"
                  style={{ width: "200px", height: "200px" }}
                >
                  <img
                    src={
                      form.image
                        ? imagePreview
                        : user.image
                        ? process.env.REACT_APP_CLOUDINARY_URL_IMAGE +
                          user.image
                        : process.env.REACT_APP_CLOUDINARY_DEFAULT_IMAGE
                    }
                    className="img-fluid"
                    alt="photoProfile"
                  />
                  <label
                    htmlFor="image"
                    className="btn btn-warning profile-edit-image position-absolute top-50 end-0"
                  >
                    <input
                      id="image"
                      type="file"
                      name="image"
                      className="w-100 h-100 d-none"
                      onChange={handleChangeForm}
                    />
                    <Icon icon="bx:pencil" className="profile-icon" />
                  </label>
                </div>
                <Personal data={user} />
                <div className="col-3 d-flex justify-content-between my-4">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      checked={form.gender === "male" ? true : false}
                      onChange={handleChangeForm}
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      checked={form.gender === "female" ? true : false}
                      onChange={handleChangeForm}
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <span className="my-4 ps-5 profile-contacts">Contacts</span>
              <div className="col-12 px-5">
                <span className="profile-input-title">Email adress :</span>
                <InputGroup className="my-3">
                  <Form.Control
                    placeholder="Email"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    className="profile-input"
                    defaultValue={form.email}
                    name="email"
                    onChange={handleChangeForm}
                    readOnly
                  />
                </InputGroup>
              </div>
              <div className="col-12 px-5">
                <span className="profile-input-title">Adress :</span>
                <InputGroup className="my-3">
                  <Form.Control
                    placeholder="Address"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    className="profile-input"
                    defaultValue={form.address}
                    name="address"
                    onChange={handleChangeForm}
                  />
                </InputGroup>
              </div>
              <div className="col-12 px-5">
                <span className="profile-input-title">Mobile number :</span>
                <InputGroup className="my-3">
                  <Form.Control
                    placeholder="Phone"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    className="profile-input"
                    defaultValue={form.phone}
                    name="phone"
                    onChange={handleChangeForm}
                  />
                </InputGroup>
              </div>
              <span className="my-4 ps-5 profile-contacts">Identity</span>
              <div className="col-6 px-5">
                <span className="profile-input-title">Display name :</span>
                <InputGroup className="my-3">
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    className="profile-input"
                    defaultValue={form.name}
                    name="name"
                    onChange={handleChangeForm}
                  />
                </InputGroup>
              </div>
              <div className="col-6 px-5">
                <span className="profile-input-title">DD/MM/YY :</span>
                <InputGroup className="my-3">
                  <Form.Control
                    type="date"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    className="profile-input"
                    defaultValue={
                      form.birthDate
                        ? moment(user.birthDate).format("DD/MM/YYYY")
                        : null
                    }
                    name="birthDate"
                    onChange={handleChangeForm}
                  />
                </InputGroup>
              </div>
              <div className="col-12 d-flex justify-content-between my-5 px-5">
                <button
                  className="gold-buttons d-flex d-md-block"
                  onClick={updateHandler}
                >
                  {!userData.isLoadingUpdate ? (
                    "Simpan"
                  ) : (
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    >
                      <span className="visually-hidden" />
                    </div>
                  )}
                </button>
                <button className="black-buttons px-5 py-2 d-none d-md-block">
                  {!userData.isLoadingUpdate ? (
                    "Edit Password"
                  ) : (
                    <div
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                    >
                      <span className="visually-hidden" />
                    </div>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
