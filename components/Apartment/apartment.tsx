import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApartmentType } from "../../utils/types";
import { getApartmentDetails } from "../../utils/APIcalls";
import styles from "./apartment.module.css";

function Apartments() {
  const router = useRouter();
  const apartmentId = router.asPath.split("/").pop();
  const [apartment, setapartment] = useState<ApartmentType>();

  useEffect(() => {
    const fetchData = async () => {
      if (apartmentId) {
        getApartmentDetails(parseInt(apartmentId))
          .then((res) => {
            if (res.data) {
              setapartment(res.data.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    fetchData();
  }, [apartmentId]);

  return (
    <div className={styles.container}>
      {apartment && (
        <div className={styles.apartment_container} key={apartment.id}>
          <p>Bathrooms : {apartment.bathrooms}</p>
          <p>Bedrooms : {apartment.bedrooms}</p>
          <p>Address : {apartment.address}</p>
          <p>Finished : {apartment.finished ? "✅" : "❌"}</p>
          <p>Price : {apartment.price}</p>
          <p>Zipcode : {apartment.zipcode}</p>
        </div>
      )}
    </div>
  );
}

export default Apartments;
