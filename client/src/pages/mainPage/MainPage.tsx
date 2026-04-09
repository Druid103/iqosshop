import React, { useEffect } from 'react';

// import '../css/style.css';

import axios from 'axios';

export default function MainPage(): React.JSX.Element {
  // const { icoss, setIcoss } = useAppContext();
  // useEffect(() => {
  //   axios
  //     .get('/api/icos')
  //     .then(({ data }) => {
  //       const validateBook = icosArrShema.parse(data);
  //       seticoss(validateicos);
  //     })
  //     .catch((error: unknown) => console.error(error));
  // }, [setIcoss]);
  // const deleteHandler = async (icosId: number): Promise<void> => {
  //   try {
  //     const res = await axios.delete(`/api/icoss/${String(icosId)}`);
  //     if (res.status === 200) {
  //       setIcoss((prev) => prev.filter((el) => el.id !== icosId));
  //     }
  //   } catch (error) {
  //     console.error('Ошибка в хэндлере delete', error);
  //   }
  // };
  return (
    <div className="rasmap">
     ICOSSHOP
    </div>
  );
}
