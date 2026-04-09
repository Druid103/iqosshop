import React from 'react';
import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Image,
  Button,
} from 'semantic-ui-react';
import '../css/style.css';
import type { BookObjType } from '../../type/bookTypes';
type BookProps = {
  book: BookObjType;
};
export default function IcosUi({ book }: BookProps): React.JSX.Element {
  return (
    <Card className="card">
      <Image className="foto" src={book.img} />
      <CardContent>
        <CardHeader>{book.title}</CardHeader>
        <CardMeta>
          <span className="date">{book.read ? 'Прочитано' : 'Не прочитано'}</span>
        </CardMeta>
        <div className="scroll">
          <CardDescription>{book.info}</CardDescription>
        </div>
      </CardContent>
      <CardContent extra>
        <Button />
      </CardContent>
    </Card>
  );
}
