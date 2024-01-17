import { useEffect, useState } from "react";
import { addApartment, getApartments } from "../../../utils/APIcalls";
import styles from "./apartmentsScreen.module.css";
import { ApartmentType } from "../../../utils/types";
import { useRouter } from "next/router";
import { Button, Modal, Form, Input, InputNumber, Checkbox } from "antd";

function Apartments() {
  const [apartmentsList, setapartmentsList] = useState<ApartmentType[]>([]);
  const router = useRouter();
  const redirect = (apartmentId: number) => {
    const currentPath = router.asPath;
    const concatenatedPath = currentPath + `/${apartmentId}`;
    router.push(concatenatedPath);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyboard, setKeyboard] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (values: any) => {
    // Values contain the form data
    values = { ...values, finished: keyboard };
    await addApartment(values).then((res) => {
      if (res.data) {
        setapartmentsList(res.data.data);
        handleCancel();
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      getApartments()
        .then((res) => {
          if (res.data.data) {
            setapartmentsList(res.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <Modal
          title="Apartment Details"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            name="wrap"
            labelCol={{ flex: "110px" }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
          >
            <Form.Item
              label="compound"
              name="compound"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="address"
              name="address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="zipcode"
              name="zipcode"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} />
            </Form.Item>

            <Form.Item
              label="bedrooms"
              name="bedrooms"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} max={10} />
            </Form.Item>

            <Form.Item
              label="bathrooms"
              name="bathrooms"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} max={10} />
            </Form.Item>

            <Form.Item label="price" name="price" rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>

            <Form.Item label="finished" name="finished">
              <Checkbox
                onChange={() => {
                  setKeyboard(!keyboard);
                }}
                checked={keyboard}
              ></Checkbox>
            </Form.Item>

            <Form.Item label=" ">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className={styles.header_container}>
        <h2 className={styles.header}>Apartments :</h2>
        <button className={styles.add} onClick={showModal}>
          + Add apartment
        </button>
      </div>
      <div className={styles.apartments_list}>
        {apartmentsList.map((apartment: ApartmentType) => {
          return (
            <div key={apartment.id} className={styles.apartment_container}>
              <p>Address : {apartment.address}</p>
              <p>Price : {apartment.price}</p>
              <button
                className={styles.details}
                onClick={() => redirect(apartment.id!)}
              >
                Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Apartments;
