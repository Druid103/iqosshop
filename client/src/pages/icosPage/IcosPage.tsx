import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/Hooks';
import { fetchIcossThunk } from '../../entities/icos/lib/thunks';
import IcosCard from '../../widgets/icosCard/IcosCard';

export default function IcosPage(): React.JSX.Element {
  const icos = useAppSelector((store) => store.icoss.icoss);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchIcossThunk());
  }, [dispatch]); // Добавьте зависимости

  return (
    <div className="rasmap">
      {icos.map((item) => (
        <IcosCard key={String(item.id)} icos={item} />
      ))}
    </div>
  );
}