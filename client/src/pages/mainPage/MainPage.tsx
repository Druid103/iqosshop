import React, { useEffect } from 'react';
import BookUi from '../ui/BookUi';
import '../css/style.css';
import { bookArrShema } from '../../type/bookTypes';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';
export default function MainPage(): React.JSX.Element {
  const { books, setBooks } = useAppContext();
  useEffect(() => {
    axios
      .get('/api/icos')
      .then(({ data }) => {
        const validateBook = icosArrShema.parse(data);
        seticoss(validateicos);
      })
      .catch((error: unknown) => console.error(error));
  }, [setIcoss]);
  const deleteHandler = async (icosId: number): Promise<void> => {
    try {
      const res = await axios.delete(`/api/icoss/${String(icosId)}`);
      if (res.status === 200) {
        setIcoss((prev) => prev.filter((el) => el.id !== icosId));
      }
    } catch (error) {
      console.error('Ошибка в хэндлере delete', error);
    }
  };
  return (
    <div className="rasmap">
      {icoss.map((icos) => (
        <div key={icos.id}>
          <icosUi icos={icos} deleteHandler={deleteHandler} />
        </div>
      ))}
    </div>
  );
}
