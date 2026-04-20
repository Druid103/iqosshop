import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/Hooks';
import { fetchIcossThunk } from '../../entities/icos/lib/thunks';
import IcosCard from '../../widgets/icosCard/IcosCard';

export default function MainPage(): React.JSX.Element {
  const icos = useAppSelector((store) => store.icoss.icoss);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIcossThunk());
  }, [dispatch]); // Добавьте зависимости

  return (
    <div className="rasmap">
      {icos.map((icos) => (
        <IcosCard key={String(icos.id)} icos={icos} /> // Преобразуем в строку
      ))}
    </div>
  );
}